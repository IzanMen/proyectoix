const crypto = require("crypto");
const tls = require("tls");

function escapeHtml(str) {
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function sha256(value) {
  return crypto.createHash("sha256").update(value.trim().toLowerCase()).digest("hex");
}

function normalizePhone(raw) {
  const digits = String(raw).replace(/\D/g, "");
  if (!digits) return null;
  if (/^[67]\d{8}$/.test(digits)) return `34${digits}`;
  return digits;
}

function buildMimeMessage(opts) {
  const boundary = `boundary_${Date.now()}_${Math.random().toString(36).slice(2)}`;
  const toList = Array.isArray(opts.to) ? opts.to.join(", ") : opts.to;
  const date = new Date().toUTCString();

  return [
    `From: ${opts.from}`,
    `To: ${toList}`,
    `Subject: =?UTF-8?B?${Buffer.from(opts.subject, "utf8").toString("base64")}?=`,
    `Date: ${date}`,
    `MIME-Version: 1.0`,
    `Content-Type: multipart/alternative; boundary="${boundary}"`,
    ``,
    `--${boundary}`,
    `Content-Type: text/html; charset=UTF-8`,
    `Content-Transfer-Encoding: base64`,
    ``,
    Buffer.from(opts.html, "utf8").toString("base64"),
    ``,
    `--${boundary}--`,
    ``,
  ].join("\r\n");
}

function smtpSend(opts) {
  const pass = process.env.GMAIL_APP_PASSWORD ?? "";
  if (!pass) {
    return Promise.reject(
      new Error("GMAIL_APP_PASSWORD must be set to send email via SMTP"),
    );
  }

  return new Promise((resolve, reject) => {
    const user = "sanchezginesizan@gmail.com";

    const socket = tls.connect(
      { host: "smtp.gmail.com", port: 465, servername: "smtp.gmail.com" },
      () => {
        const recipients = Array.isArray(opts.to) ? opts.to : [opts.to];
        const message = buildMimeMessage(opts);

        let buf = "";
        let step = 0;

        const send = (line) => socket.write(`${line}\r\n`);

        const steps = [
          { expect: 220, action: () => send("EHLO smtp.gmail.com") },
          { expect: 250, action: () => send("AUTH LOGIN") },
          { expect: 334, action: () => send(Buffer.from(user, "utf8").toString("base64")) },
          { expect: 334, action: () => send(Buffer.from(pass, "utf8").toString("base64")) },
          { expect: 235, action: () => send(`MAIL FROM:<${user}>`) },
          {
            expect: 250,
            action: () => {
              send(`RCPT TO:<${recipients[0]}>`);
            },
          },
          ...recipients.slice(1).map((r) => ({
            expect: 250,
            action: () => send(`RCPT TO:<${r}>`),
          })),
          { expect: 250, action: () => send("DATA") },
          {
            expect: 354,
            action: () => {
              socket.write(`${message}\r\n.\r\n`);
            },
          },
          {
            expect: 250,
            action: () => {
              send("QUIT");
            },
          },
          {
            expect: 221,
            action: () => {
              socket.destroy();
              resolve();
            },
          },
        ];

        socket.on("data", (chunk) => {
          buf += chunk.toString();

          const lines = buf.split("\r\n");
          buf = lines.pop() ?? "";

          for (const line of lines) {
            if (!line) continue;

            const code = parseInt(line.slice(0, 3), 10);
            if (line[3] === "-") continue;

            const current = steps[step];
            if (!current) {
              socket.destroy();
              reject(new Error(`Unexpected SMTP response at step ${step}: ${line}`));
              return;
            }

            if (code !== current.expect) {
              socket.destroy();
              reject(
                new Error(
                  `SMTP error at step ${step}: expected ${current.expect}, got ${line}`,
                ),
              );
              return;
            }

            step++;
            current.action();
          }
        });
      },
    );

    socket.on("error", (err) => reject(err));
    socket.setTimeout(15000, () => {
      socket.destroy();
      reject(new Error("SMTP connection timed out"));
    });
  });
}

function createTransporter() {
  if (!process.env.GMAIL_APP_PASSWORD && process.env.NODE_ENV !== "production") {
    return {
      sendMail: async (opts) => {
        console.info("[mailer:dev] Email skipped because GMAIL_APP_PASSWORD is not set", {
          to: opts.to,
          subject: opts.subject,
        });
      },
    };
  }

  return {
    sendMail: (opts) => smtpSend(opts),
  };
}

async function sendLeadEventToMeta(input) {
  const accessToken = process.env.META_CAPI_ACCESS_TOKEN;
  if (!accessToken) {
    console.warn("[meta-capi] META_CAPI_ACCESS_TOKEN not set, skipping CAPI event");
    return { ok: false, skipped: true, reason: "missing_access_token" };
  }

  const userData = {};
  if (input.phone) {
    const normalized = normalizePhone(input.phone);
    if (normalized) userData.ph = sha256(normalized);
  }
  if (input.clientIp) userData.client_ip_address = input.clientIp;
  if (input.clientUserAgent) userData.client_user_agent = input.clientUserAgent;
  if (input.fbp) userData.fbp = input.fbp;
  if (input.fbc) userData.fbc = input.fbc;

  const payload = {
    data: [
      {
        event_name: "Lead",
        event_time: Math.floor(Date.now() / 1000),
        event_id: input.eventId,
        event_source_url: input.eventSourceUrl,
        action_source: "website",
        user_data: userData,
      },
    ],
  };

  const testCode = process.env.META_CAPI_TEST_CODE;
  if (testCode) {
    payload.test_event_code = testCode;
  }

  const url = `https://graph.facebook.com/v19.0/2571910166557366/events?access_token=${encodeURIComponent(accessToken)}`;

  try {
    const r = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    const body = await r.text().catch(() => "");
    if (!r.ok) {
      console.error("[meta-capi] error:", r.status, body);
      return { ok: false, status: r.status, body };
    } else {
      console.log("[meta-capi] Lead event sent, event_id:", input.eventId, "response:", body);
      return { ok: true, status: r.status, body };
    }
  } catch (err) {
    console.error("[meta-capi] network error:", err);
    return {
      ok: false,
      error: err instanceof Error ? err.message : String(err),
    };
  }
}

function getJsonBody(req) {
  if (req && typeof req.body === "object" && req.body) return req.body;
  if (typeof req.body === "string") {
    try {
      return JSON.parse(req.body);
    } catch {
      return null;
    }
  }
  return null;
}

function firstHeaderValue(value) {
  return Array.isArray(value) ? value[0] : value;
}

module.exports = {
  escapeHtml,
  createTransporter,
  sendLeadEventToMeta,
  getJsonBody,
  firstHeaderValue,
};

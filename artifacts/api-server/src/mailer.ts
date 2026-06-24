import * as tls from "tls";

interface MailOptions {
  from: string;
  to: string | string[];
  subject: string;
  html: string;
}

function base64(str: string): string {
  return Buffer.from(str, "utf8").toString("base64");
}

function buildMimeMessage(opts: MailOptions): string {
  const boundary = `boundary_${Date.now()}_${Math.random().toString(36).slice(2)}`;
  const toList = Array.isArray(opts.to) ? opts.to.join(", ") : opts.to;
  const date = new Date().toUTCString();

  return [
    `From: ${opts.from}`,
    `To: ${toList}`,
    `Subject: =?UTF-8?B?${base64(opts.subject)}?=`,
    `Date: ${date}`,
    `MIME-Version: 1.0`,
    `Content-Type: multipart/alternative; boundary="${boundary}"`,
    ``,
    `--${boundary}`,
    `Content-Type: text/html; charset=UTF-8`,
    `Content-Transfer-Encoding: base64`,
    ``,
    base64(opts.html),
    ``,
    `--${boundary}--`,
    ``,
  ].join("\r\n");
}

function smtpSend(opts: MailOptions): Promise<void> {
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
        const recipients: string[] = Array.isArray(opts.to)
          ? opts.to
          : [opts.to];
        const message = buildMimeMessage(opts);

        let buf = "";
        let step = 0;

        const send = (line: string) => socket.write(line + "\r\n");

        const steps: Array<{ expect: number; action: () => void }> = [
          { expect: 220, action: () => send(`EHLO smtp.gmail.com`) },
          { expect: 250, action: () => send(`AUTH LOGIN`) },
          { expect: 334, action: () => send(base64(user)) },
          { expect: 334, action: () => send(base64(pass)) },
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
          { expect: 250, action: () => send(`DATA`) },
          {
            expect: 354,
            action: () => {
              socket.write(message + "\r\n.\r\n");
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
              reject(
                new Error(`Unexpected SMTP response at step ${step}: ${line}`),
              );
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

export interface Transporter {
  sendMail(opts: MailOptions): Promise<void>;
}

export function createTransporter(): Transporter {
  if (
    !process.env.GMAIL_APP_PASSWORD &&
    process.env.NODE_ENV !== "production"
  ) {
    return {
      sendMail: async (opts) => {
        console.info(
          "[mailer:dev] Email skipped because GMAIL_APP_PASSWORD is not set",
          {
            to: opts.to,
            subject: opts.subject,
          },
        );
      },
    };
  }

  return {
    sendMail: (opts) => smtpSend(opts),
  };
}

import { Router } from "express";
import { createTransporter } from "../mailer";
import { sendLeadEventToMeta } from "../meta-capi";
import { ObjectStorageService } from "../lib/objectStorage";

const router = Router();

const objectStorageService = new ObjectStorageService();
const MAX_FILE_BYTES = 100 * 1024 * 1024; // 100 MB cap, enforced on the real object
const MAX_FILES_PER_SUBMISSION = 200; // bound metadata lookups per questionnaire

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

router.post("/contact", async (req, res) => {
  try {
    const {
      businessName,
      contact,
      hasWebsite,
      websiteUrl,
      goal,
      budget,
      message,
      privacyAccepted,
      policyVersion,
      acceptedAt,
      eventId,
      fbp,
      fbc,
    } = req.body;

    if (!businessName || !contact || !hasWebsite || !goal || !budget) {
      return res.status(400).json({ message: "Faltan datos obligatorios." });
    }

    const allowedHasWebsite = [
      "Sí, tengo web",
      "No, no tengo web",
    ];
    const allowedGoals = [
      "Que los clientes me llamen o escriban",
      "Que hagan una reserva",
      "Que compren un producto",
      "No lo tengo claro",
    ];
    const allowedBudgets = [
      "500 - 800 €",
      "800 - 1.200 €",
      "1.200 - 2.000 €",
      "+ de 2.000 €",
    ];
    if (
      !allowedHasWebsite.includes(String(hasWebsite)) ||
      !allowedGoals.includes(String(goal)) ||
      !allowedBudgets.includes(String(budget))
    ) {
      return res.status(400).json({ message: "Valores no válidos en el formulario." });
    }

    if (privacyAccepted !== true) {
      return res.status(400).json({
        message:
          "Debes aceptar la política de privacidad para enviar el formulario.",
      });
    }

    const consentRecord = {
      ip: req.ip || "unknown",
      userAgent: req.headers["user-agent"] || "unknown",
      policyVersion: policyVersion ? String(policyVersion) : "unknown",
      acceptedAt: acceptedAt ? String(acceptedAt) : new Date().toISOString(),
      receivedAt: new Date().toISOString(),
    };
    req.log.info({ consentRecord }, "[contact] consent recorded");

    const transporter = createTransporter();

    const safeBusiness = escapeHtml(String(businessName));
    const safeContact = escapeHtml(String(contact));
    const safeWebsite = escapeHtml(String(hasWebsite));
    const safeUrl = websiteUrl ? escapeHtml(String(websiteUrl)) : "";
    const safeGoal = goal ? escapeHtml(String(goal)) : "";
    const safeBudget = budget ? escapeHtml(String(budget)) : "";
    const safeMessage = message
      ? escapeHtml(String(message)).replace(/\n/g, "<br>")
      : "";
    const safePolicyVersion = escapeHtml(consentRecord.policyVersion);
    const safeAcceptedAt = escapeHtml(consentRecord.acceptedAt);

    const subject = `Nuevo lead: ${safeBusiness}`;
    const to = [
      "hola@proyectoix.com",
      "sanchezginesizan@gmail.com",
      "izan@proyectoix.com",
      "xaloc@proyectoix.com",
    ];

    const row = (label: string, value: string) =>
      value
        ? `<div style="margin-bottom: 22px;">
            <p style="color: #c4a4ff; font-size: 11px; text-transform: uppercase; letter-spacing: 2px; margin: 0 0 6px 0;">${label}</p>
            <p style="font-size: 16px; margin: 0; line-height: 1.5;">${value}</p>
          </div>`
        : "";

    const htmlContent = `
      <div style="font-family: 'Helvetica Neue', Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #0a0a0a; color: #fff; padding: 40px; border-radius: 12px;">
        <div style="border-bottom: 2px solid #7c3aed; padding-bottom: 20px; margin-bottom: 30px;">
          <h1 style="font-size: 26px; margin: 0; color: #fff;">Nuevo lead</h1>
          <p style="color: #888; margin-top: 5px; font-size: 14px;">Landing Proyecto IX · Meta Ads</p>
        </div>

        ${row("Negocio", safeBusiness)}
        ${row("WhatsApp", safeContact)}
        ${row("¿Tiene web?", safeWebsite)}
        ${row("URL de su web", safeUrl)}
        ${row("Objetivo", safeGoal)}
        ${row("Presupuesto", safeBudget)}
        ${
          safeMessage
            ? `<div style="margin-bottom: 22px;">
                <p style="color: #c4a4ff; font-size: 11px; text-transform: uppercase; letter-spacing: 2px; margin: 0 0 6px 0;">Comentarios</p>
                <p style="font-size: 15px; margin: 0; line-height: 1.6;">${safeMessage}</p>
              </div>`
            : ""
        }

        <div style="border-top: 1px solid #222; padding-top: 20px; margin-top: 30px;">
          <p style="color: #555; font-size: 12px; margin: 0 0 6px 0;">Enviado desde proyectoix.com</p>
          <p style="color: #555; font-size: 11px; margin: 0;">
            Consentimiento RGPD aceptado · v${safePolicyVersion} · ${safeAcceptedAt}
          </p>
        </div>
      </div>
    `;

    await transporter.sendMail({
      from: '"Proyecto IX" <sanchezginesizan@gmail.com>',
      to,
      subject,
      html: htmlContent,
    });

    if (eventId && typeof eventId === "string") {
      const forwarded = req.headers["x-forwarded-for"];
      const realIp =
        typeof forwarded === "string"
          ? forwarded.split(",")[0].trim()
          : Array.isArray(forwarded)
            ? forwarded[0]?.trim()
            : undefined;

      sendLeadEventToMeta({
        eventId,
        eventSourceUrl:
          (req.headers["referer"] as string) || "https://proyectoix.com/",
        clientIp: realIp || req.ip || undefined,
        clientUserAgent: req.headers["user-agent"] as string | undefined,
        phone: String(contact),
        fbp: typeof fbp === "string" ? fbp : undefined,
        fbc: typeof fbc === "string" ? fbc : undefined,
      // @ts-ignore
      }).catch((err) => req.log.error({ err }, "[meta-capi] unhandled"));
    }

    return res.json({ success: true });
  } catch (error: unknown) {
    // @ts-ignore
    req.log.error({ err: error }, "Error sending email");
    return res.status(500).json({ message: "Error al enviar el mensaje. Inténtalo de nuevo." });
  }
});

const subscribeRateLimit = new Map<string, { count: number; reset: number }>();

router.post("/subscribe", async (req, res) => {
  try {
    const ip = req.ip || "unknown";
    const now = Date.now();
    const window = 60_000;
    const maxAttempts = 5;

    const entry = subscribeRateLimit.get(ip);
    if (entry && now < entry.reset) {
      if (entry.count >= maxAttempts) {
        return res.status(429).json({ message: "Demasiados intentos. Espera un momento." });
      }
      entry.count++;
    } else {
      subscribeRateLimit.set(ip, { count: 1, reset: now + window });
    }

    const { email } = req.body;

    if (!email || typeof email !== "string") {
      return res.status(400).json({ message: "Email obligatorio." });
    }

    const normalized = email.trim().toLowerCase();

    if (normalized.length > 254) {
      return res.status(400).json({ message: "Email no válido." });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(normalized)) {
      return res.status(400).json({ message: "Email no válido." });
    }

    const apiKey = process.env.MAILERLITE_API_KEY;
    const groupId = process.env.MAILERLITE_GROUP_ID;

    if (!apiKey) {
      req.log.error("Missing MAILERLITE_API_KEY");
      return res.status(500).json({ message: "Servicio no configurado. Inténtalo más tarde." });
    }

    const payload: { email: string; groups?: string[] } = {
      email: normalized,
    };
    if (groupId) {
      payload.groups = [groupId];
    }

    const response = await fetch("https://connect.mailerlite.com/api/subscribers", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const errText = await response.text().catch(() => "");
      req.log.error({ status: response.status, body: errText }, "MailerLite API error");
      return res.status(500).json({ message: "No se ha podido registrar. Inténtalo de nuevo." });
    }

    return res.json({ success: true });
  } catch (error: unknown) {
    // @ts-ignore
    req.log.error({ err: error }, "Subscribe error");
    return res.status(500).json({ message: "Error interno. Inténtalo de nuevo." });
  }
});

const cuestionarioRateLimit = new Map<string, { count: number; reset: number }>();

const QUESTIONNAIRE_RECIPIENTS = [
  "izan@proyectoix.com",
  "xaloc@proyectoix.com",
  "hola@proyectoix.com",
];

const OBJECT_PATH_RE = /^\/objects\/uploads\/[0-9a-fA-F-]{36}$/;
const STORAGE_SERVE_BASE = "https://proyectoix.com/api/storage";

interface QuestionnaireFile {
  name?: unknown;
  objectPath?: unknown;
}

interface QuestionnaireItem {
  label?: unknown;
  value?: unknown;
  files?: unknown;
}

interface QuestionnaireSection {
  title?: unknown;
  items?: unknown;
}

router.post("/cuestionario", async (req, res): Promise<void> => {
  try {
    const ip = req.ip || "unknown";
    const now = Date.now();
    const windowMs = 60_000;
    const maxAttempts = 4;

    const entry = cuestionarioRateLimit.get(ip);
    if (entry && now < entry.reset) {
      if (entry.count >= maxAttempts) {
        res.status(429).json({ message: "Demasiados envíos. Espera un momento." });
        return;
      }
      entry.count++;
    } else {
      cuestionarioRateLimit.set(ip, { count: 1, reset: now + windowMs });
    }

    const { sections, privacyAccepted, businessName, policyVersion, acceptedAt } =
      req.body ?? {};

    if (privacyAccepted !== true) {
      res.status(400).json({
        message: "Debes aceptar la política de privacidad para enviar el cuestionario.",
      });
      return;
    }

    if (!Array.isArray(sections) || sections.length === 0 || sections.length > 60) {
      res.status(400).json({ message: "Datos del cuestionario no válidos." });
      return;
    }

    // Collect every referenced object path, then verify each object's REAL size
    // against GCS metadata. The presigned PUT cannot be size-constrained at sign
    // time (the signing sidecar has no content-length-range), so this is where we
    // truly enforce the cap: oversized objects are deleted and their links dropped.
    const referencedPaths = new Set<string>();
    outer: for (const section of sections as QuestionnaireSection[]) {
      if (!section || typeof section !== "object") continue;
      const items = Array.isArray(section.items) ? section.items : [];
      for (const item of items as QuestionnaireItem[]) {
        if (item && typeof item === "object" && Array.isArray(item.files)) {
          for (const f of item.files as QuestionnaireFile[]) {
            if (
              f &&
              typeof f.objectPath === "string" &&
              OBJECT_PATH_RE.test(f.objectPath)
            ) {
              referencedPaths.add(f.objectPath);
              if (referencedPaths.size >= MAX_FILES_PER_SUBMISSION) break outer;
            }
          }
        }
      }
    }

    const allowedPaths = new Set<string>();
    await Promise.all(
      [...referencedPaths].map(async (objectPath) => {
        try {
          const file = await objectStorageService.getObjectEntityFile(objectPath);
          const [meta] = await file.getMetadata();
          const size = Number(meta.size ?? 0);
          if (size > 0 && size <= MAX_FILE_BYTES) {
            allowedPaths.add(objectPath);
          } else if (size > MAX_FILE_BYTES) {
            try {
              await file.delete();
            } catch {
              // best-effort cleanup
            }
            req.log.warn(
              { objectPath, size },
              "[cuestionario] dropped oversized upload",
            );
          }
        } catch {
          // missing/inaccessible object: omit its link
        }
      }),
    );

    const row = (label: string, value: string) =>
      `<div style="margin-bottom: 18px;">
        <p style="color: #c4a4ff; font-size: 11px; text-transform: uppercase; letter-spacing: 1.5px; margin: 0 0 5px 0;">${label}</p>
        <p style="font-size: 15px; margin: 0; line-height: 1.5; color: #f2f2f2;">${value}</p>
      </div>`;

    const renderItem = (item: QuestionnaireItem): string => {
      if (!item || typeof item !== "object") return "";
      const label = escapeHtml(String(item.label ?? "").slice(0, 300));

      if (Array.isArray(item.files)) {
        const links = (item.files as QuestionnaireFile[])
          .filter(
            (f) =>
              f &&
              typeof f.objectPath === "string" &&
              allowedPaths.has(f.objectPath),
          )
          .slice(0, 150)
          .map((f) => {
            const name = escapeHtml(String(f.name ?? "archivo").slice(0, 200));
            const href = STORAGE_SERVE_BASE + String(f.objectPath);
            return `<a href="${href}" style="color: #c4a4ff; word-break: break-all;" target="_blank" rel="noopener">${name}</a>`;
          });
        if (links.length === 0) return "";
        return row(label, links.join("<br>"));
      }

      const value = String(item.value ?? "").trim();
      if (!value) return "";
      const safeValue = escapeHtml(value.slice(0, 20000)).replace(/\n/g, "<br>");
      return row(label, safeValue);
    };

    const sectionsHtml = (sections as QuestionnaireSection[])
      .map((section) => {
        if (!section || typeof section !== "object") return "";
        const title = escapeHtml(String(section.title ?? "").slice(0, 200));
        const items = Array.isArray(section.items) ? section.items : [];
        const itemsHtml = (items as QuestionnaireItem[])
          .slice(0, 400)
          .map(renderItem)
          .join("");
        if (!itemsHtml) return "";
        return `<div style="margin-bottom: 34px;">
            <h2 style="font-size: 17px; color: #fff; border-bottom: 1px solid #7c3aed; padding-bottom: 8px; margin: 0 0 18px 0; text-transform: uppercase; letter-spacing: 1px;">${title}</h2>
            ${itemsHtml}
          </div>`;
      })
      .join("");

    const consentRecord = {
      ip: req.ip || "unknown",
      userAgent: req.headers["user-agent"] || "unknown",
      policyVersion: policyVersion ? String(policyVersion) : "unknown",
      acceptedAt: acceptedAt ? String(acceptedAt) : new Date().toISOString(),
      receivedAt: new Date().toISOString(),
    };
    req.log.info({ consentRecord }, "[cuestionario] consent recorded");

    const safeBusiness = businessName
      ? escapeHtml(String(businessName).slice(0, 200))
      : "Cliente sin nombre";
    const subject = `Cuestionario de inicio: ${safeBusiness}`;

    const htmlContent = `
      <div style="font-family: 'Helvetica Neue', Arial, sans-serif; max-width: 640px; margin: 0 auto; background: #0a0a0a; color: #fff; padding: 40px; border-radius: 12px;">
        <div style="border-bottom: 2px solid #7c3aed; padding-bottom: 20px; margin-bottom: 30px;">
          <h1 style="font-size: 24px; margin: 0; color: #fff;">Cuestionario de inicio</h1>
          <p style="color: #888; margin-top: 6px; font-size: 14px;">${safeBusiness}</p>
        </div>
        ${sectionsHtml || '<p style="color:#888;">El cliente no ha rellenado ningún campo.</p>'}
        <div style="border-top: 1px solid #222; padding-top: 20px; margin-top: 20px;">
          <p style="color: #555; font-size: 12px; margin: 0 0 6px 0;">Enviado desde el cuestionario de proyectoix.com</p>
          <p style="color: #555; font-size: 11px; margin: 0;">
            Consentimiento RGPD aceptado · v${escapeHtml(consentRecord.policyVersion)} · ${escapeHtml(consentRecord.acceptedAt)}
          </p>
        </div>
      </div>
    `;

    const transporter = createTransporter();
    await transporter.sendMail({
      from: '"Proyecto IX" <sanchezginesizan@gmail.com>',
      to: QUESTIONNAIRE_RECIPIENTS,
      subject,
      html: htmlContent,
    });

    res.json({ success: true });
  } catch (error: unknown) {
    // @ts-ignore
    req.log.error({ err: error }, "Error sending questionnaire");
    res
      .status(500)
      .json({ message: "Error al enviar el cuestionario. Inténtalo de nuevo." });
  }
});

export default router;

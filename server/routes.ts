import type { Express } from "express";
import type { Server } from "http";
import { createTransporter } from "./mailer";

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {

  app.post("/api/contact", async (req, res) => {
    try {
      const {
        businessName,
        contact,
        hasWebsite,
        message,
        privacyAccepted,
        policyVersion,
        acceptedAt,
      } = req.body;

      if (!businessName || !contact || !hasWebsite) {
        return res.status(400).json({ message: "Todos los campos son obligatorios." });
      }

      // RGPD: validamos el consentimiento explícito del usuario antes de procesar.
      if (privacyAccepted !== true) {
        return res.status(400).json({
          message:
            "Debes aceptar la política de privacidad para enviar el formulario.",
        });
      }

      // Evidencia mínima de consentimiento (accountability — art. 5.2 RGPD).
      const consentRecord = {
        ip: req.ip || "unknown",
        userAgent: req.headers["user-agent"] || "unknown",
        policyVersion: policyVersion ? String(policyVersion) : "unknown",
        acceptedAt: acceptedAt ? String(acceptedAt) : new Date().toISOString(),
        receivedAt: new Date().toISOString(),
      };
      console.log(
        "[contact] consent recorded:",
        JSON.stringify(consentRecord),
      );

      const transporter = createTransporter();

      const safeBusiness = escapeHtml(String(businessName));
      const safeContact = escapeHtml(String(contact));
      const safeWebsite = escapeHtml(String(hasWebsite));
      const safeMessage = message ? escapeHtml(String(message)).replace(/\n/g, "<br>") : "";
      const safePolicyVersion = escapeHtml(consentRecord.policyVersion);
      const safeAcceptedAt = escapeHtml(consentRecord.acceptedAt);

      const subject = `Nuevo Proyecto: ${safeBusiness}`;
      const to = "hola@proyectoix.com";

      const htmlContent = `
        <div style="font-family: 'Helvetica Neue', Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #0a0a0a; color: #fff; padding: 40px; border-radius: 12px;">
          <div style="border-bottom: 2px solid #7c3aed; padding-bottom: 20px; margin-bottom: 30px;">
            <h1 style="font-size: 28px; margin: 0; color: #fff;">Nuevo Proyecto Potencial</h1>
            <p style="color: #888; margin-top: 5px; font-size: 14px;">Formulario de contacto — IX.</p>
          </div>

          <div style="margin-bottom: 24px;">
            <p style="color: #7c3aed; font-size: 12px; text-transform: uppercase; letter-spacing: 2px; margin-bottom: 6px;">Negocio</p>
            <p style="font-size: 18px; margin: 0;">${safeBusiness}</p>
          </div>

          <div style="margin-bottom: 24px;">
            <p style="color: #7c3aed; font-size: 12px; text-transform: uppercase; letter-spacing: 2px; margin-bottom: 6px;">Contacto</p>
            <p style="font-size: 18px; margin: 0;">${safeContact}</p>
          </div>

          <div style="margin-bottom: 24px;">
            <p style="color: #7c3aed; font-size: 12px; text-transform: uppercase; letter-spacing: 2px; margin-bottom: 6px;">¿Tiene web?</p>
            <p style="font-size: 18px; margin: 0;">${safeWebsite}</p>
          </div>

          ${
            safeMessage
              ? `<div style="margin-bottom: 24px;">
            <p style="color: #7c3aed; font-size: 12px; text-transform: uppercase; letter-spacing: 2px; margin-bottom: 6px;">Qué quiere</p>
            <p style="font-size: 16px; margin: 0; line-height: 1.6;">${safeMessage}</p>
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
        from: '"IX. Studio" <sanchezginesizan@gmail.com>',
        to,
        subject,
        html: htmlContent,
      });

      return res.json({ success: true });
    } catch (error: any) {
      console.error("Error sending email:", error);
      return res.status(500).json({ message: "Error al enviar el mensaje. Inténtalo de nuevo." });
    }
  });

  const subscribeRateLimit = new Map<string, { count: number; reset: number }>();

  app.post("/api/subscribe", async (req, res) => {
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
        console.error("Missing MAILERLITE_API_KEY");
        return res.status(500).json({ message: "Servicio no configurado. Inténtalo más tarde." });
      }

      // IMPORTANTE: NO enviamos `status`. Si lo enviamos ("unconfirmed" o "active")
      // estaríamos forzando el estado y MailerLite NO dispararía el email de
      // confirmación del double opt-in. Al omitir `status`, MailerLite respeta
      // la configuración de double opt-in del panel y envía el email de
      // confirmación automáticamente.
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

      // MailerLite responde 200 si el suscriptor ya existía y 201 si es nuevo.
      // En ambos casos response.ok === true.
      if (!response.ok) {
        const errText = await response.text().catch(() => "");
        console.error("MailerLite API error:", response.status, errText);
        return res.status(500).json({ message: "No se ha podido registrar. Inténtalo de nuevo." });
      }

      return res.json({ success: true });
    } catch (error: any) {
      console.error("Subscribe error:", error);
      return res.status(500).json({ message: "Error interno. Inténtalo de nuevo." });
    }
  });

  return httpServer;
}

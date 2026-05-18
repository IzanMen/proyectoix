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
        websiteUrl,
        goal,
        budget,
        message,
        privacyAccepted,
        policyVersion,
        acceptedAt,
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
      console.log(
        "[contact] consent recorded:",
        JSON.stringify(consentRecord),
      );

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

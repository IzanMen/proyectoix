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
      const { businessName, contact, hasWebsite, goal, values } = req.body;

      if (!businessName || !contact || !hasWebsite || !goal || !values) {
        return res.status(400).json({ message: "Todos los campos son obligatorios." });
      }

      const transporter = createTransporter();

      const safeBusiness = escapeHtml(String(businessName));
      const safeContact = escapeHtml(String(contact));
      const safeWebsite = escapeHtml(String(hasWebsite));
      const safeGoal = escapeHtml(String(goal));
      const safeValues = escapeHtml(String(values));

      const subject = `Nuevo Proyecto: ${safeBusiness}`;
      const to = "prcyecto.ix@gmail.com";

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

          <div style="margin-bottom: 24px;">
            <p style="color: #7c3aed; font-size: 12px; text-transform: uppercase; letter-spacing: 2px; margin-bottom: 6px;">Objetivo</p>
            <p style="font-size: 16px; margin: 0; line-height: 1.6;">${safeGoal}</p>
          </div>

          <div style="margin-bottom: 24px;">
            <p style="color: #7c3aed; font-size: 12px; text-transform: uppercase; letter-spacing: 2px; margin-bottom: 6px;">Valores / Qué transmite</p>
            <p style="font-size: 16px; margin: 0; line-height: 1.6;">${safeValues}</p>
          </div>

          <div style="border-top: 1px solid #222; padding-top: 20px; margin-top: 30px;">
            <p style="color: #555; font-size: 12px;">Enviado desde proyectoix.com</p>
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

  return httpServer;
}

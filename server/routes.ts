import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { getUncachableSendGridClient } from "./sendgrid";

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

      const { client } = await getUncachableSendGridClient();
      const fromEmail = "sanchezginesizan@gmail.com";

      const htmlContent = `
        <div style="font-family: 'Helvetica Neue', Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #0a0a0a; color: #fff; padding: 40px; border-radius: 12px;">
          <div style="border-bottom: 2px solid #7c3aed; padding-bottom: 20px; margin-bottom: 30px;">
            <h1 style="font-size: 28px; margin: 0; color: #fff;">Nuevo Proyecto Potencial</h1>
            <p style="color: #888; margin-top: 5px; font-size: 14px;">Formulario de contacto — IX.</p>
          </div>

          <div style="margin-bottom: 24px;">
            <p style="color: #7c3aed; font-size: 12px; text-transform: uppercase; letter-spacing: 2px; margin-bottom: 6px;">Negocio</p>
            <p style="font-size: 18px; margin: 0;">${businessName}</p>
          </div>

          <div style="margin-bottom: 24px;">
            <p style="color: #7c3aed; font-size: 12px; text-transform: uppercase; letter-spacing: 2px; margin-bottom: 6px;">Contacto</p>
            <p style="font-size: 18px; margin: 0;">${contact}</p>
          </div>

          <div style="margin-bottom: 24px;">
            <p style="color: #7c3aed; font-size: 12px; text-transform: uppercase; letter-spacing: 2px; margin-bottom: 6px;">¿Tiene web?</p>
            <p style="font-size: 18px; margin: 0;">${hasWebsite}</p>
          </div>

          <div style="margin-bottom: 24px;">
            <p style="color: #7c3aed; font-size: 12px; text-transform: uppercase; letter-spacing: 2px; margin-bottom: 6px;">Objetivo</p>
            <p style="font-size: 16px; margin: 0; line-height: 1.6;">${goal}</p>
          </div>

          <div style="margin-bottom: 24px;">
            <p style="color: #7c3aed; font-size: 12px; text-transform: uppercase; letter-spacing: 2px; margin-bottom: 6px;">Valores / Qué transmite</p>
            <p style="font-size: 16px; margin: 0; line-height: 1.6;">${values}</p>
          </div>

          <div style="border-top: 1px solid #222; padding-top: 20px; margin-top: 30px;">
            <p style="color: #555; font-size: 12px;">Enviado desde proyectoix.com</p>
          </div>
        </div>
      `;

      await client.send({
        to: "prcyecto.ix@gmail.com",
        from: fromEmail,
        subject: `Nuevo Proyecto: ${businessName}`,
        html: htmlContent,
      });

      return res.json({ success: true });
    } catch (error: any) {
      console.error("Error sending email:", error);
      if (error.response?.body?.errors) {
        console.error("SendGrid errors:", JSON.stringify(error.response.body.errors));
      }
      return res.status(500).json({ message: "Error al enviar el mensaje. Inténtalo de nuevo." });
    }
  });

  return httpServer;
}

const {
  createTransporter,
  escapeHtml,
  sendLeadEventToMeta,
  getJsonBody,
  firstHeaderValue,
} = require("./_shared");

const ALLOWED_HAS_WEBSITE = [
  "Sí, tengo web",
  "No, no tengo web",
  "Sí, pero quiero cambiarla",
  "No, empiezo de cero",
  "Tengo redes sociales",
];

const ALLOWED_GOALS = [
  "Que los clientes me llamen o escriban",
  "Que hagan una reserva",
  "Que compren un producto",
  "No lo tengo claro",
];

const ALLOWED_BUDGETS = ["500 - 800 €", "800 - 1.200 €", "1.200 - 2.000 €", "+ de 2.000 €"];

module.exports = async function contact(req, res) {
  try {
    const headers = req.headers || {};

    if (req.method !== "POST") {
      res.setHeader("Allow", "POST");
      return res.status(405).json({ message: "Method Not Allowed" });
    }

    const body = getJsonBody(req);
    if (!body) {
      return res.status(400).json({ message: "JSON inválido." });
    }

    const businessName = body.businessName ?? body.business;
    const contact = body.contact ?? body.whatsapp;
    const hasWebsite = body.hasWebsite;
    const websiteUrl = body.websiteUrl;
    const goal = body.goal;
    const budget = body.budget;
    const message = body.message;
    const source = body.source;
    const privacyAccepted = body.privacyAccepted;
    const policyVersion = body.policyVersion;
    const acceptedAt = body.acceptedAt;
    const eventId = body.eventId;
    const fbp = body.fbp;
    const fbc = body.fbc;

    if (!businessName || !contact || !hasWebsite) {
      return res.status(400).json({ message: "Faltan datos obligatorios." });
    }

    const normalizedHasWebsite = String(hasWebsite);
    const normalizedGoal = goal ? String(goal) : "";
    const normalizedBudget = budget ? String(budget) : "";

    if (
      !ALLOWED_HAS_WEBSITE.includes(normalizedHasWebsite) ||
      (normalizedGoal && !ALLOWED_GOALS.includes(normalizedGoal)) ||
      (normalizedBudget && !ALLOWED_BUDGETS.includes(normalizedBudget))
    ) {
      return res.status(400).json({ message: "Valores no válidos en el formulario." });
    }

    if (privacyAccepted !== true) {
      return res.status(400).json({
        message: "Debes aceptar la política de privacidad para enviar el formulario.",
      });
    }

    const consentRecord = {
      ip: firstHeaderValue(headers["x-forwarded-for"]) || req.socket?.remoteAddress || "unknown",
      userAgent: firstHeaderValue(headers["user-agent"]) || "unknown",
      policyVersion: policyVersion ? String(policyVersion) : "unknown",
      acceptedAt: acceptedAt ? String(acceptedAt) : new Date().toISOString(),
      receivedAt: new Date().toISOString(),
    };

    const transporter = createTransporter();

    const safeBusiness = escapeHtml(String(businessName));
    const safeContact = escapeHtml(String(contact));
    const safeWebsite = escapeHtml(normalizedHasWebsite);
    const safeUrl = websiteUrl ? escapeHtml(String(websiteUrl)) : "";
    const safeGoal = normalizedGoal ? escapeHtml(normalizedGoal) : "";
    const safeBudget = normalizedBudget ? escapeHtml(normalizedBudget) : "No especificado";
    const safeSource = source ? escapeHtml(String(source)) : "";
    const safeMessage = message ? escapeHtml(String(message)).replace(/\n/g, "<br>") : "";
    const safePolicyVersion = escapeHtml(consentRecord.policyVersion);
    const safeAcceptedAt = escapeHtml(consentRecord.acceptedAt);

    const row = (label, value) =>
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

        ${row("Origen", safeSource)}
        ${row("Negocio", safeBusiness)}
        ${row("WhatsApp", safeContact)}
        ${row("¿Tiene web?", safeWebsite)}
        ${row("URL de su web", safeUrl)}
        ${row("Objetivo", safeGoal)}
        ${row("Presupuesto", safeBudget)}
        ${safeMessage ? `<div style="margin-bottom: 22px;">
            <p style="color: #c4a4ff; font-size: 11px; text-transform: uppercase; letter-spacing: 2px; margin: 0 0 6px 0;">Comentarios</p>
            <p style="font-size: 15px; margin: 0; line-height: 1.6;">${safeMessage}</p>
          </div>` : ""}

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
      to: ["hola@proyectoix.com", "sanchezginesizan@gmail.com", "izan@proyectoix.com", "xaloc@proyectoix.com"],
      subject: `Nuevo lead: ${safeBusiness}`,
      html: htmlContent,
    });

    if (eventId && typeof eventId === "string") {
      const forwarded = firstHeaderValue(headers["x-forwarded-for"]);
      const realIp = typeof forwarded === "string" ? forwarded.split(",")[0].trim() : undefined;

      sendLeadEventToMeta({
        eventId,
        eventSourceUrl: firstHeaderValue(headers["referer"]) || "https://proyectoix.com/",
        clientIp: realIp || req.socket?.remoteAddress || undefined,
        clientUserAgent: firstHeaderValue(headers["user-agent"]),
        phone: String(contact),
        fbp: typeof fbp === "string" ? fbp : undefined,
        fbc: typeof fbc === "string" ? fbc : undefined,
      }).catch((err) => console.error("[meta-capi] unhandled", err));
    }

    return res.status(200).json({ success: true });
  } catch (error) {
    console.error("Error sending email", error);
    return res.status(500).json({ message: "Error al enviar el mensaje. Inténtalo de nuevo." });
  }
};

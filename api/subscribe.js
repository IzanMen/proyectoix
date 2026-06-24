const { getJsonBody, firstHeaderValue } = require("./_shared");

const subscribeRateLimit = new Map();

module.exports = async function subscribe(req, res) {
  try {
    const headers = req.headers || {};

    if (req.method !== "POST") {
      res.setHeader("Allow", "POST");
      return res.status(405).json({ message: "Method Not Allowed" });
    }

    const ip = firstHeaderValue(headers["x-forwarded-for"]) || req.socket?.remoteAddress || "unknown";
    const now = Date.now();
    const windowMs = 60_000;
    const maxAttempts = 5;

    const entry = subscribeRateLimit.get(ip);
    if (entry && now < entry.reset) {
      if (entry.count >= maxAttempts) {
        return res.status(429).json({ message: "Demasiados intentos. Espera un momento." });
      }
      entry.count++;
    } else {
      subscribeRateLimit.set(ip, { count: 1, reset: now + windowMs });
    }

    const body = getJsonBody(req);
    if (!body) {
      return res.status(400).json({ message: "JSON inválido." });
    }

    const email = body.email;
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
      if (process.env.NODE_ENV !== "production") {
        console.info("[subscribe:dev] MAILERLITE_API_KEY not set, accepting locally", {
          email: normalized,
        });
        return res.status(200).json({ success: true, devMode: true });
      }

      console.error("Missing MAILERLITE_API_KEY");
      return res.status(500).json({ message: "Servicio no configurado. Inténtalo más tarde." });
    }

    const payload = { email: normalized };
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

    const text = await response.text().catch(() => "");
    let data = null;
    try {
      data = text ? JSON.parse(text) : null;
    } catch {
      data = null;
    }

    if (!response.ok) {
      const message =
        (data && (data.message || data.error || data.detail)) ||
        "No se ha podido suscribir.";
      return res.status(response.status).json({ message });
    }

    return res.status(200).json({ success: true });
  } catch (error) {
    console.error("subscribe error", error);
    return res.status(500).json({ message: "Error de conexión. Inténtalo de nuevo." });
  }
};

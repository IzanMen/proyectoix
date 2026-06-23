import type { CampaignContent } from "@/components/campaign/types";

export const peluqueriaMenorca: CampaignContent = {
  slug: "peluqueria-menorca",
  source: "Landing: Peluquería Menorca",
  seo: {
    title: "Webs y reservas online para peluquerías en Menorca · Proyecto IX",
    description:
      "Muestra tu trabajo, transmite una imagen profesional y deja que tus clientes reserven cita online sin llamarte. Cuéntanos cómo funciona tu peluquería.",
  },
  hero: {
    eyebrow: "Proyecto IX · Menorca",
    title: "¿Tienes una peluquería en Menorca?",
    subtitle:
      "Si quieres mostrar mejor tu trabajo, transmitir una imagen más profesional y permitir que tus clientes reserven cita sin tener que llamarte, podemos ayudarte.",
    cta: "Hablar con nosotros",
    trust: [
      "Sin compromiso",
      "100% Menorca",
      "Respuesta en 24h",
      "Te escribimos por WhatsApp",
    ],
  },
  blocks: [
    {
      heading: "Antes de nada, queremos hacerte una pregunta",
      lead: [
        "Cuando una persona escucha hablar de tu peluquería, ¿dónde puede consultar toda la información que necesita?",
      ],
      visual: {
        type: "checklist",
        items: [
          "Tus servicios.",
          "Tus precios.",
          "Tus horarios.",
          "Los trabajos que has realizado.",
          "Las opiniones de otros clientes.",
          "Y, sobre todo, cómo puede reservar una cita.",
        ],
      },
      tail: [
        "Si toda esta información está repartida entre publicaciones, historias destacadas, ficha de Google, mensajes de WhatsApp y llamadas, estás haciendo que reservar sea más complicado de lo necesario.",
      ],
      cta: "Quiero facilitar las reservas",
    },
    {
      heading: "Tu trabajo puede ser excelente…",
      lead: [
        "Pero una persona que todavía no te conoce no lo sabe.",
        "Antes de reservar, necesita comprobar que puede confiar en ti.",
      ],
      visual: {
        type: "chips",
        items: [
          "Quiere ver cómo trabajas.",
          "Qué resultados consigues.",
          "Qué servicios ofreces.",
          "Cómo es tu peluquería.",
          "Y qué opinan las personas que ya han pasado por ella.",
        ],
      },
      tail: [
        "Una página web te permite reunir toda esa información en un mismo sitio y presentarla de una forma clara, cuidada y profesional.",
        "Porque tu imagen en internet debería estar al mismo nivel que el trabajo que realizas dentro de tu peluquería.",
      ],
      cta: "Quiero mostrar mejor mi trabajo",
    },
    {
      heading: "Cada servicio necesita su espacio",
      lead: [
        "No todas las personas están buscando lo mismo.",
        "Algunas quieren un corte de pelo.",
        "Otras buscan un cambio de color, un tratamiento, unas mechas o un peinado para un evento.",
        "En tu web podemos presentar cada servicio de forma clara, explicando:",
      ],
      visual: {
        type: "grid",
        items: [
          "En qué consiste.",
          "Para quién está recomendado.",
          "Cuánto dura aproximadamente.",
          "Cuál es su precio.",
          "Qué resultados puede esperar el cliente.",
          "Cómo puede reservarlo.",
        ],
      },
      tail: [
        "También podemos añadir fotografías de trabajos reales para que el cliente vea lo que puedes hacer antes de pedir cita.",
        "No se trata simplemente de hacer una lista de servicios.",
        "Se trata de conseguir que la persona entienda lo que ofreces y encuentre exactamente lo que necesita.",
      ],
    },
    {
      variant: "scenario",
      heading: "Y después, puede reservar sin llamarte",
      lead: [
        "Imagínate que una persona descubre tu peluquería a las once de la noche.",
        "Le gusta tu trabajo y quiere pedir cita.",
        "Pero está cerrado.",
        "Si para reservar necesita llamarte, tendrá que acordarse de hacerlo al día siguiente.",
        "Y puede que no lo haga.",
        "Con un sistema de reservas integrado en la web, puede consultar los servicios y solicitar o reservar su cita en ese mismo momento.",
        "Sin llamadas.",
        "Sin tener que esperar una respuesta.",
        "Y sin interrumpirte mientras estás atendiendo a otro cliente.",
      ],
      cta: "Quiero recibir reservas desde la web",
    },
    {
      heading: "Menos tiempo gestionando mensajes y llamadas",
      lead: ["Durante el día, probablemente recibes preguntas como:"],
      visual: {
        type: "chips",
        items: [
          "¿Qué horarios tienes disponibles?",
          "¿Cuánto cuestan las mechas?",
          "¿Hacéis tratamientos de queratina?",
          "¿Tenéis hueco esta semana?",
        ],
      },
      tail: [
        "Responder una vez no supone ningún problema.",
        "Pero responder las mismas preguntas constantemente sí consume tiempo.",
        "En la web podemos mostrar la información más importante y resolver las dudas habituales antes de que el cliente contacte contigo.",
        "Además, si utilizas un sistema de reservas online, tus clientes pueden consultar la disponibilidad y reservar sin que tengas que gestionar cada cita manualmente.",
        "Así puedes dedicar menos tiempo al teléfono y más tiempo a tu trabajo.",
      ],
    },
    {
      heading: "Tú decides cómo quieres gestionar las reservas",
      lead: [
        "Podemos adaptar el sistema a la forma de trabajar de tu peluquería.",
        "Por ejemplo, podemos hacer que el cliente:",
      ],
      visual: {
        type: "grid",
        items: [
          "Reserve directamente una hora disponible.",
          "Solicite una cita para que tú la confirmes.",
          "Elija previamente el servicio que necesita.",
          "Reciba una confirmación de su reserva.",
          "Contacte contigo por WhatsApp si tiene alguna duda concreta.",
        ],
      },
      tail: [
        "La solución dependerá de tus servicios, de tu equipo y de cómo organizas actualmente tu agenda.",
      ],
      cta: "Quiero encontrar el sistema adecuado",
    },
    {
      heading: "No se trata solo de tener una web bonita",
      lead: [
        "La web debe ayudarte a presentar mejor tu peluquería y facilitar el trabajo diario.",
        "Por eso, podemos crear un espacio donde tus clientes puedan:",
      ],
      visual: {
        type: "grid",
        items: [
          "Descubrir todos tus servicios.",
          "Consultar precios y duración.",
          "Ver fotografías de tus trabajos.",
          "Conocer al equipo.",
          "Leer opiniones de otros clientes.",
          "Consultar horarios y ubicación.",
          "Resolver sus dudas.",
          "Reservar una cita online.",
        ],
      },
      tail: [
        "Todo organizado para que el cliente encuentre rápidamente lo que necesita y pueda reservar con el menor número de pasos posible.",
      ],
    },
  ],
  form: {
    heading: "Cada peluquería necesita algo diferente",
    lead: [
      "Quizá solo necesites una web sencilla para mostrar tus servicios y recibir reservas.",
      "O quizá necesites una web más completa, con diferentes profesionales, horarios, tratamientos y un sistema de citas automatizado.",
      "Por eso, antes de proponerte una solución, queremos conocer cómo funciona tu peluquería.",
      "Rellena este breve formulario y nos pondremos en contacto contigo directamente por WhatsApp para analizar tu situación y explicarte qué solución tendría sentido para ti.",
    ],
  },
  closing: {
    heading: "¿Tienes otro objetivo diferente?",
    lead: [
      "Cuéntanos tu situación y estudiaremos cómo podemos ayudarte a mejorar la presencia online y la gestión de reservas de tu peluquería.",
    ],
    cta: "Cuéntanos tu situación",
  },
};

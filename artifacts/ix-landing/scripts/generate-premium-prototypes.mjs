import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(scriptDir, "..");
const prototypesPath = path.join(root, "src/content/prototypes.json");
const imagePoolsPath = path.join(root, "src/content/prototype-image-pools.json");
const strategyPath = path.join(root, "src/content/prototype-strategy.json");
const outRoot = path.join(root, "public/prototipos-static");
const cssPath = path.join(outRoot, "premium.css");

const prototypes = JSON.parse(fs.readFileSync(prototypesPath, "utf8"));
const imagePools = JSON.parse(fs.readFileSync(imagePoolsPath, "utf8"));

const categoryProfiles = {
  "Restaurante en Menorca": {
    noun: "restaurante",
    audience: "residentes, viajeros gastronómicos y grupos que buscan una mesa memorable sin perder naturalidad",
    perception: "cocina sólida, sala impecable, producto de temporada y una experiencia mediterránea con criterio",
    promise: "reserva una mesa con cocina de mercado, servicio atento y una carta pensada para repetir",
    cta: "Reservar mesa",
    secondary: "Ver carta",
    proof: ["Producto local seleccionado a diario", "Carta estacional con platos insignia", "Reservas confirmadas por el equipo"],
    services: ["Carta de temporada", "Menú degustación", "Mesa para grupos", "Bodega mediterránea"],
    process: ["Elige fecha", "Confirma alergias", "Recibe recomendación", "Disfruta la mesa"],
    packages: ["Mediodía ejecutivo", "Cena a la carta", "Grupo privado"],
    conversion: "reserva directa por teléfono o WhatsApp",
  },
  "Bar / cafetería en Menorca": {
    noun: "cafetería",
    audience: "clientes de mañana, profesionales, familias y turistas que valoran buen café y ritmo ágil",
    perception: "café de especialidad, producto fresco, barra cuidada y un espacio donde apetece quedarse",
    promise: "desayunos, brunch y café excelente con un servicio rápido, amable y consistente",
    cta: "Ver desayunos",
    secondary: "Cómo llegar",
    proof: ["Café calibrado cada mañana", "Dulce y salado de obrador", "Servicio para llevar sin esperas"],
    services: ["Café de especialidad", "Brunch diario", "Take away", "Mesa de trabajo"],
    process: ["Pide en barra", "Elige mesa", "Recibe al momento", "Vuelve mañana"],
    packages: ["Desayuno rápido", "Brunch completo", "Catering oficina"],
    conversion: "visita al local y pedidos para llevar",
  },
  "Peluquería en Menorca": {
    noun: "salón",
    audience: "personas que quieren un cambio elegante, mantenimiento experto y asesoramiento real",
    perception: "salón premium, diagnóstico honesto, técnica precisa y resultado natural de alta gama",
    promise: "corte, color y tratamiento diseñados para tu cabello, agenda y estilo de vida",
    cta: "Reservar cita",
    secondary: "Diagnóstico",
    proof: ["Colorimetría avanzada", "Agenda por diagnóstico previo", "Rituales de cuidado profesional"],
    services: ["Corte signature", "Color y mechas", "Tratamientos capilares", "Peinado evento"],
    process: ["Diagnóstico", "Diseño técnico", "Servicio", "Plan de mantenimiento"],
    packages: ["Corte experto", "Color premium", "Transformación completa"],
    conversion: "reserva de cita y diagnóstico",
  },
  "Centro de estética en Menorca": {
    noun: "centro de estética",
    audience: "clientes que buscan resultados visibles, privacidad y una experiencia sensorial cuidada",
    perception: "estética avanzada, calma clínica, higiene impecable y tratamientos con seguimiento",
    promise: "tratamientos faciales y corporales con protocolo, medición y una experiencia de bienestar real",
    cta: "Pedir valoración",
    secondary: "Ver tratamientos",
    proof: ["Cabinas privadas", "Protocolos personalizados", "Productos profesionales"],
    services: ["Facial avanzado", "Corporal remodelante", "Rituales relax", "Diagnóstico de piel"],
    process: ["Valoración", "Protocolo", "Tratamiento", "Seguimiento"],
    packages: ["Primera piel", "Plan glow", "Ritual completo"],
    conversion: "valoración estética y reserva",
  },
  "Fisioterapia en Menorca": {
    noun: "clínica de fisioterapia",
    audience: "deportistas, pacientes con dolor persistente y personas que necesitan volver a moverse con seguridad",
    perception: "clínica seria, evaluación precisa, tratamiento activo y recuperación medible",
    promise: "diagnóstico claro, tratamiento manual y ejercicio terapéutico para recuperar confianza",
    cta: "Pedir cita",
    secondary: "Primera visita",
    proof: ["Valoración funcional", "Plan de ejercicios", "Seguimiento de evolución"],
    services: ["Dolor lumbar", "Lesiones deportivas", "Fisioterapia manual", "Readaptación"],
    process: ["Evaluar", "Tratar", "Medir", "Reforzar"],
    packages: ["Primera consulta", "Plan recuperación", "Readaptación deportiva"],
    conversion: "cita de valoración",
  },
  "Entrenador personal en Menorca": {
    noun: "estudio de entrenamiento",
    audience: "personas ocupadas, deportistas amateur y clientes que quieren constancia sin improvisar",
    perception: "entrenamiento privado, métricas claras, energía alta y seguimiento serio",
    promise: "un plan medible para ganar fuerza, bajar grasa y entrenar con intención",
    cta: "Empezar evaluación",
    secondary: "Ver planes",
    proof: ["Sesiones 1:1", "Control de progresos", "Programación semanal"],
    services: ["Fuerza", "Pérdida de grasa", "Movilidad", "Preparación física"],
    process: ["Test inicial", "Plan semanal", "Sesiones guiadas", "Revisión mensual"],
    packages: ["2 días", "3 días", "Performance"],
    conversion: "evaluación inicial",
  },
  "Inmobiliaria local en Menorca": {
    noun: "inmobiliaria",
    audience: "propietarios, compradores exigentes e inversores que necesitan criterio local",
    perception: "cartera selecta, discreción, datos fiables y acompañamiento experto en la isla",
    promise: "compra, venta o valoración con estrategia, visibilidad y negociación profesional",
    cta: "Valorar propiedad",
    secondary: "Ver inmuebles",
    proof: ["Valoraciones con datos", "Fotografía premium", "Acompañamiento legal"],
    services: ["Venta", "Compra", "Inversión", "Valoración"],
    process: ["Analizar", "Preparar", "Lanzar", "Negociar"],
    packages: ["Valoración", "Venta premium", "Búsqueda privada"],
    conversion: "captación de propietarios y leads compradores",
  },
  "Reformas en Menorca": {
    noun: "estudio de reformas",
    audience: "propietarios de viviendas, locales y fincas que quieren una obra controlada",
    perception: "obra ordenada, acabados limpios, planificación transparente y solvencia técnica",
    promise: "reformas con calendario, presupuesto y coordinación para que cada decisión avance",
    cta: "Solicitar visita",
    secondary: "Ver proyectos",
    proof: ["Plan de obra visible", "Proveedores coordinados", "Entrega por fases"],
    services: ["Reforma integral", "Cocinas", "Baños", "Locales"],
    process: ["Visita", "Presupuesto", "Plan de obra", "Entrega"],
    packages: ["Puesta a punto", "Integral vivienda", "Local comercial"],
    conversion: "solicitud de visita técnica",
  },
  "Fontanería / electricidad en Menorca": {
    noun: "servicio técnico",
    audience: "hogares, negocios y administradores que necesitan respuesta rápida y trabajo garantizado",
    perception: "urgencia fiable, técnicos profesionales, claridad de precio y solución duradera",
    promise: "averías e instalaciones con diagnóstico claro, disponibilidad y garantía",
    cta: "Llamar ahora",
    secondary: "Pedir presupuesto",
    proof: ["Respuesta prioritaria", "Material certificado", "Garantía por escrito"],
    services: ["Averías", "Instalaciones", "Boletines", "Mantenimiento"],
    process: ["Aviso", "Diagnóstico", "Reparación", "Garantía"],
    packages: ["Urgencia", "Instalación", "Mantenimiento negocio"],
    conversion: "llamada inmediata",
  },
  "Alquiler de barcos en Menorca": {
    noun: "charter náutico",
    audience: "familias, parejas y grupos que quieren explorar calas con seguridad y estilo",
    perception: "barcos cuidados, rutas exclusivas, patrón experto y experiencia premium sin complicaciones",
    promise: "salidas privadas por Menorca con embarcaciones impecables y rutas según el viento",
    cta: "Reservar salida",
    secondary: "Ver flota",
    proof: ["Rutas según meteorología", "Equipamiento completo", "Check-in sencillo"],
    services: ["Medio día", "Día completo", "Patrón privado", "Sunset"],
    process: ["Elige barco", "Definimos ruta", "Check-in", "Navega"],
    packages: ["Cala express", "Full day", "Sunset premium"],
    conversion: "reserva de salida",
  },
  "Excursiones turísticas en Menorca": {
    noun: "experiencia guiada",
    audience: "viajeros curiosos, familias y grupos que quieren conocer la isla con contexto",
    perception: "rutas auténticas, guías expertos, grupos cuidados y una Menorca menos obvia",
    promise: "experiencias guiadas con historia, paisaje y logística sencilla",
    cta: "Elegir ruta",
    secondary: "Calendario",
    proof: ["Guías locales", "Grupos reducidos", "Rutas por temporada"],
    services: ["Cultura", "Naturaleza", "Atardecer", "Privado"],
    process: ["Escoge ruta", "Reserva plaza", "Recibe punto", "Disfruta"],
    packages: ["Ruta esencial", "Experiencia privada", "Pack familia"],
    conversion: "reserva de excursión",
  },
  "Agroturismo / alojamiento en Menorca": {
    noun: "agroturismo",
    audience: "parejas, familias y viajeros que buscan descanso con estética, silencio y servicio cuidado",
    perception: "alojamiento boutique, calma rural, desayuno memorable y hospitalidad mediterránea",
    promise: "habitaciones, finca y experiencia local para bajar el ritmo sin renunciar al detalle",
    cta: "Consultar disponibilidad",
    secondary: "Ver estancias",
    proof: ["Desayuno de finca", "Habitaciones cuidadas", "Recomendaciones locales"],
    services: ["Habitaciones", "Desayuno", "Piscina", "Experiencias"],
    process: ["Fechas", "Habitación", "Confirmación", "Llegada"],
    packages: ["Escapada", "Semana lenta", "Experiencia privada"],
    conversion: "consulta de disponibilidad",
  },
  "Tienda local en Menorca": {
    noun: "concept store",
    audience: "residentes y visitantes que compran producto con identidad, regalo y diseño",
    perception: "selección curada, objetos con historia, atención experta y estética memorable",
    promise: "una selección local y contemporánea para comprar mejor, regalar bien y volver",
    cta: "Ver selección",
    secondary: "Visitar tienda",
    proof: ["Marcas seleccionadas", "Ediciones limitadas", "Envoltorio cuidado"],
    services: ["Producto local", "Regalos", "Decoración", "Ediciones"],
    process: ["Explora", "Pregunta", "Elige", "Llévalo listo"],
    packages: ["Regalo rápido", "Selección hogar", "Pack corporativo"],
    conversion: "visita a tienda y compra",
  },
  "Clínica dental en Menorca": {
    noun: "clínica dental",
    audience: "familias, adultos y pacientes que buscan confianza, tecnología y trato tranquilo",
    perception: "odontología avanzada, diagnóstico visual, equipo experto y clínica serena",
    promise: "salud dental, estética y prevención con tecnología y explicación clara",
    cta: "Pedir primera visita",
    secondary: "Tratamientos",
    proof: ["Diagnóstico digital", "Plan por fases", "Trato sin prisas"],
    services: ["Implantes", "Ortodoncia", "Estética dental", "Prevención"],
    process: ["Exploración", "Diagnóstico", "Plan", "Tratamiento"],
    packages: ["Primera visita", "Sonrisa estética", "Plan familiar"],
    conversion: "primera visita",
  },
  "Academia en Menorca": {
    noun: "academia",
    audience: "familias, estudiantes y adultos que buscan progreso medible y seguimiento",
    perception: "método estructurado, profesores cercanos, objetivos claros y comunicación constante",
    promise: "clases con plan, ritmo y seguimiento para avanzar sin perder motivación",
    cta: "Solicitar plaza",
    secondary: "Ver cursos",
    proof: ["Grupos reducidos", "Seguimiento familiar", "Objetivos por trimestre"],
    services: ["Refuerzo", "Idiomas", "Exámenes", "Adultos"],
    process: ["Nivel", "Grupo", "Plan", "Seguimiento"],
    packages: ["Refuerzo semanal", "Intensivo", "Preparación examen"],
    conversion: "solicitud de plaza",
  },
  "Autoescuela en Menorca": {
    noun: "autoescuela",
    audience: "jóvenes, adultos y conductores que quieren aprobar con seguridad y horarios claros",
    perception: "formación moderna, profesores pacientes, tecnología útil y progreso visible",
    promise: "teórica y prácticas organizadas para que llegues al examen con confianza",
    cta: "Apuntarme",
    secondary: "Ver permisos",
    proof: ["App de seguimiento", "Prácticas planificadas", "Profesores cercanos"],
    services: ["Permiso B", "Reciclaje", "Intensivos", "Prácticas"],
    process: ["Alta", "Teórica", "Prácticas", "Examen"],
    packages: ["Básico", "Intensivo", "Confianza extra"],
    conversion: "alta de alumno",
  },
  "Fotografía en Menorca": {
    noun: "estudio de fotografía",
    audience: "parejas, marcas y familias que quieren imágenes elegantes, humanas y memorables",
    perception: "dirección artística, luz cuidada, edición premium y experiencia fluida",
    promise: "fotografía con sensibilidad editorial para momentos, marcas y celebraciones",
    cta: "Consultar fecha",
    secondary: "Ver portfolio",
    proof: ["Dirección suave", "Entrega cuidada", "Galería privada"],
    services: ["Bodas", "Retrato", "Marca", "Familia"],
    process: ["Brief", "Sesión", "Edición", "Entrega"],
    packages: ["Sesión breve", "Historia completa", "Campaña marca"],
    conversion: "consulta de fecha",
  },
  "Taller mecánico en Menorca": {
    noun: "taller",
    audience: "conductores, flotas pequeñas y amantes del coche que quieren diagnóstico honesto",
    perception: "taller moderno, transparencia, puntualidad y reparación fiable",
    promise: "mantenimiento y reparación con presupuesto claro, piezas adecuadas y explicación",
    cta: "Pedir cita",
    secondary: "Servicios",
    proof: ["Diagnóstico documentado", "Presupuesto previo", "Historial del vehículo"],
    services: ["Revisión", "Diagnóstico", "Frenos", "Climatización"],
    process: ["Recepción", "Diagnóstico", "Autorización", "Entrega"],
    packages: ["Revisión anual", "Diagnóstico rápido", "Plan flota"],
    conversion: "cita de taller",
  },
  "Limpieza / mantenimiento en Menorca": {
    noun: "empresa de mantenimiento",
    audience: "villas, comunidades, oficinas y negocios que necesitan confianza operativa",
    perception: "equipo profesional, procesos visibles, puntualidad y resultados constantes",
    promise: "limpieza y mantenimiento con planificación, supervisión y comunicación clara",
    cta: "Solicitar presupuesto",
    secondary: "Ver servicios",
    proof: ["Equipos supervisados", "Checklist por servicio", "Respuesta por temporada"],
    services: ["Villas", "Oficinas", "Cristales", "Mantenimiento"],
    process: ["Visita", "Plan", "Equipo", "Control"],
    packages: ["Puntual", "Semanal", "Temporada completa"],
    conversion: "presupuesto de servicio",
  },
  "Eventos en Menorca": {
    noun: "productora de eventos",
    audience: "parejas, empresas y anfitriones que quieren un evento impecable sin cargar con la logística",
    perception: "producción elegante, coordinación total, proveedores premium y ejecución tranquila",
    promise: "diseño y coordinación de eventos con estética, precisión y experiencia invitado",
    cta: "Contar el evento",
    secondary: "Ver formatos",
    proof: ["Dirección integral", "Proveedores curados", "Plan minuto a minuto"],
    services: ["Bodas", "Corporativo", "Celebraciones", "Producción"],
    process: ["Concepto", "Diseño", "Producción", "Celebración"],
    packages: ["Coordinación", "Diseño integral", "Evento privado"],
    conversion: "brief de evento",
  },
};

const brandAngles = [
  "marca de referencia",
  "experiencia boutique",
  "propuesta de servicio privado",
  "operativa de alto rendimiento",
  "firma contemporánea",
];

const palettes = [
  ["#111111", "#f7f1e8", "#b76e3b", "#24302a"],
  ["#08111f", "#f4f7fb", "#68a6ff", "#d9a441"],
  ["#2a1714", "#fff7ef", "#c7472f", "#1d3130"],
  ["#0e1713", "#f3f1df", "#93b76e", "#e1b85f"],
  ["#140f19", "#f6eef8", "#d08cf0", "#9fd4d6"],
  ["#f5f1ea", "#111315", "#556b8e", "#b08b57"],
  ["#071616", "#effaf8", "#49c5b6", "#f2c66d"],
  ["#1d1b16", "#fbf5e8", "#c69c53", "#49635a"],
  ["#101018", "#f8f8ff", "#ff6b6b", "#64d2ff"],
  ["#eef2ed", "#172018", "#6a8f5a", "#b9563f"],
];

const heroLayouts = [
  "split-editorial",
  "full-bleed-reserve",
  "stacked-magazine",
  "asymmetric-panel",
  "cinematic-minimal",
  "service-dashboard",
  "gallery-first",
  "luxury-letter",
  "proof-led",
  "booking-card",
];

const sectionLibrary = [
  "signature",
  "services",
  "process",
  "proof",
  "packages",
  "gallery",
  "testimonial",
  "comparison",
  "team",
  "faq",
  "location",
  "ctaBand",
];

const categorySections = {
  "Restaurante en Menorca": [
    "signature",
    "specific",
    "services",
    "packages",
    "gallery",
    "proof",
    "location",
    "faq",
  ],
  "Bar / cafetería en Menorca": [
    "signature",
    "specific",
    "services",
    "packages",
    "gallery",
    "proof",
    "location",
    "faq",
  ],
  "Peluquería en Menorca": [
    "signature",
    "specific",
    "services",
    "process",
    "gallery",
    "proof",
    "team",
    "faq",
  ],
  "Centro de estética en Menorca": [
    "signature",
    "specific",
    "services",
    "process",
    "proof",
    "packages",
    "team",
    "faq",
  ],
  "Fisioterapia en Menorca": [
    "signature",
    "specific",
    "services",
    "process",
    "proof",
    "team",
    "location",
    "faq",
  ],
  "Entrenador personal en Menorca": [
    "signature",
    "specific",
    "services",
    "process",
    "proof",
    "packages",
    "team",
    "faq",
  ],
  "Inmobiliaria local en Menorca": [
    "signature",
    "specific",
    "services",
    "packages",
    "proof",
    "gallery",
    "location",
    "faq",
  ],
  "Reformas en Menorca": [
    "signature",
    "specific",
    "services",
    "process",
    "proof",
    "gallery",
    "team",
    "faq",
  ],
  "Fontanería / electricidad en Menorca": [
    "signature",
    "specific",
    "services",
    "process",
    "proof",
    "packages",
    "location",
    "faq",
  ],
  "Alquiler de barcos en Menorca": [
    "signature",
    "specific",
    "services",
    "packages",
    "gallery",
    "proof",
    "location",
    "faq",
  ],
  "Excursiones turísticas en Menorca": [
    "signature",
    "specific",
    "services",
    "packages",
    "gallery",
    "proof",
    "location",
    "faq",
  ],
  "Agroturismo / alojamiento en Menorca": [
    "signature",
    "specific",
    "services",
    "packages",
    "gallery",
    "proof",
    "location",
    "faq",
  ],
  "Tienda local en Menorca": [
    "signature",
    "specific",
    "services",
    "packages",
    "gallery",
    "proof",
    "location",
    "faq",
  ],
  "Clínica dental en Menorca": [
    "signature",
    "specific",
    "services",
    "process",
    "proof",
    "team",
    "location",
    "faq",
  ],
  "Academia en Menorca": [
    "signature",
    "specific",
    "services",
    "process",
    "proof",
    "packages",
    "team",
    "faq",
  ],
  "Autoescuela en Menorca": [
    "signature",
    "specific",
    "services",
    "process",
    "proof",
    "packages",
    "location",
    "faq",
  ],
  "Fotografía en Menorca": [
    "signature",
    "specific",
    "services",
    "packages",
    "gallery",
    "proof",
    "team",
    "faq",
  ],
  "Taller mecánico en Menorca": [
    "signature",
    "specific",
    "services",
    "process",
    "proof",
    "packages",
    "location",
    "faq",
  ],
  "Limpieza / mantenimiento en Menorca": [
    "signature",
    "specific",
    "services",
    "process",
    "proof",
    "packages",
    "team",
    "faq",
  ],
  "Eventos en Menorca": [
    "signature",
    "specific",
    "services",
    "packages",
    "gallery",
    "proof",
    "team",
    "faq",
  ],
};

const categoryCopy = {
  "Restaurante en Menorca": {
    nav: "Carta",
    signatureEyebrow: "Cocina",
    signatureTitle: (name) => `${name} sabe a mesa bien elegida.`,
    signatureText: (name) =>
      `${name} presenta una carta de temporada, una sala cuidada y una reserva clara para que el cliente imagine la visita antes de llamar.`,
    servicesEyebrow: "Carta",
    servicesTitle: "Platos, bodega y momentos pensados para venir con hambre.",
    serviceBody:
      "Una propuesta concreta, apetecible y fácil de entender antes de reservar mesa.",
    processEyebrow: "Reserva",
    processBody:
      "Un recorrido sencillo desde la elección de fecha hasta la llegada a la mesa.",
    proofEyebrow: "Producto",
    proofTitle: "Lo que convence está en la carta, la sala y el trato.",
    proofBody:
      "Una señal visible de cocina cuidada que ayuda a decidir dónde comer.",
    packagesEyebrow: "Menús",
    packagesTitle: "Opciones claras para mediodía, cena o grupo.",
    teamTitle: "Una cocina y una sala que sostienen la experiencia.",
    teamText: (name) =>
      `${name} combina producto local, ritmo de servicio y una propuesta gastronómica fácil de recomendar.`,
    locationTitle: "Dónde comer bien en Menorca sin dar vueltas.",
    locationText: (name) =>
      `${name} sitúa la experiencia en la isla: llegada sencilla, ambiente reconocible y una mesa preparada para disfrutar sin prisas.`,
    faqTitle: "Antes de reservar",
    faq: [
      ["¿Conviene reservar?", "Sí. La reserva asegura mesa y permite preparar alergias, preferencias o grupos."],
      ["¿Hay opciones para compartir?", "La carta combina platos principales, entrantes y propuestas pensadas para mesa compartida."],
      ["¿Puedo avisar de alergias?", "Sí. El equipo las revisa antes de confirmar para recomendar la opción adecuada."],
    ],
  },
  "Bar / cafetería en Menorca": {
    nav: "Desayunos",
    signatureEyebrow: "Barra",
    signatureTitle: (name) => `${name} funciona desde el primer café hasta el último bocado.`,
    signatureText: (name) =>
      `${name} enseña horarios, carta corta, desayunos, brunch y take away sin obligar al cliente a preguntar lo básico.`,
    servicesEyebrow: "Desayunos",
    servicesTitle: "Café, dulce, salado y una pausa que entra fácil.",
    serviceBody:
      "Una opción directa para decidir rápido si vienes, te quedas o lo pides para llevar.",
    processEyebrow: "Cómo funciona",
    processBody:
      "Pedido ágil, mesa cómoda y salida rápida cuando el día va con prisa.",
    proofEyebrow: "Ritmo",
    proofTitle: "Lo importante es que el café salga bien cada mañana.",
    proofBody: "Un detalle cotidiano que convierte la visita en costumbre.",
    packagesEyebrow: "Momentos",
    packagesTitle: "Tres formas naturales de pasar por la barra.",
    locationTitle: "Una parada fácil dentro de la rutina de Menorca.",
    locationText: (name) =>
      `${name} deja claro dónde está, cuándo abre y qué puedes pedir sin tener que improvisar.`,
    faqTitle: "Antes de venir",
    faq: [
      ["¿Hay take away?", "Sí. La carta incluye opciones pensadas para llevar sin perder tiempo."],
      ["¿Se puede desayunar tarde?", "La web muestra horarios y momentos de servicio para elegir bien."],
      ["¿Hay opciones dulces y saladas?", "Sí. La propuesta combina café, bollería, tostadas y brunch según temporada."],
    ],
  },
  "Peluquería en Menorca": {
    nav: "Servicios",
    signatureEyebrow: "Estilo",
    signatureTitle: (name) => `${name} empieza por entender el cabello antes de tocarlo.`,
    signatureText: (name) =>
      `${name} necesita mostrar trabajos, servicios, diagnóstico y mantenimiento para que la reserva llegue con expectativas claras.`,
    servicesEyebrow: "Servicios",
    servicesTitle: "Corte, color y cuidado explicados sin tecnicismos vacíos.",
    serviceBody:
      "Un servicio con resultado esperado, duración orientativa y recomendación profesional.",
    processEyebrow: "Cita",
    processBody:
      "Diagnóstico, propuesta técnica y mantenimiento para que el resultado siga funcionando después del salón.",
    proofEyebrow: "Resultados",
    proofTitle: "La confianza entra por trabajos reales y una agenda clara.",
    proofBody:
      "Una garantía de criterio antes de reservar un cambio de imagen.",
    packagesEyebrow: "Tratamientos",
    packagesTitle: "Opciones para mantener, mejorar o transformar el cabello.",
    teamTitle: "Manos expertas, criterio honesto y estilo propio.",
    teamText: (name) =>
      `${name} comunica especialización, asesoramiento y una experiencia de salón cuidada desde la primera cita.`,
    faqTitle: "Antes de la cita",
    faq: [
      ["¿Necesito diagnóstico?", "Para color, cambios grandes o tratamientos, el diagnóstico ayuda a acertar y evitar sorpresas."],
      ["¿Cuánto dura el servicio?", "La duración depende del cabello y del objetivo; se confirma antes de reservar."],
      ["¿Puedo pedir mantenimiento?", "Sí. Cada servicio puede cerrar con una pauta sencilla para cuidar el resultado."],
    ],
  },
  "Centro de estética en Menorca": {
    nav: "Tratamientos",
    signatureEyebrow: "Piel",
    signatureTitle: (name) => `${name} convierte el cuidado en una decisión tranquila.`,
    signatureText: (name) =>
      `${name} explica tratamientos, beneficios, frecuencia y reserva sin prometer magia ni sonar clínicamente frío.`,
    servicesEyebrow: "Tratamientos",
    servicesTitle: "Facial, corporal y bienestar con objetivo claro.",
    serviceBody:
      "Un tratamiento explicado por necesidad, sensación y resultado esperable.",
    processEyebrow: "Protocolo",
    processBody:
      "Valoración, cabina, tratamiento y seguimiento para cuidar la piel con continuidad.",
    proofEyebrow: "Cuidado",
    proofTitle: "Higiene, privacidad y criterio sostienen la confianza.",
    proofBody:
      "Un elemento de seguridad que importa antes de reservar cabina.",
    packagesEyebrow: "Rituales",
    packagesTitle: "Planes pensados para una visita puntual o un cuidado continuo.",
    teamTitle: "Un equipo que mira la piel antes de vender un tratamiento.",
    teamText: (name) =>
      `${name} transmite calma, precisión y una experiencia estética que se entiende antes de entrar en cabina.`,
    faqTitle: "Antes del tratamiento",
    faq: [
      ["¿Cuál es el mejor tratamiento?", "Depende de la piel y del objetivo; la valoración inicial orienta la recomendación."],
      ["¿Hay tratamientos corporales?", "Sí. La web separa facial, corporal y rituales para elegir sin confusión."],
      ["¿Puedo reservar para regalo?", "Sí. Los rituales y bonos se presentan de forma clara para regalar bien."],
    ],
  },
  "Fisioterapia en Menorca": {
    nav: "Tratamientos",
    signatureEyebrow: "Recuperación",
    signatureTitle: (name) => `${name} habla de dolor, movimiento y vuelta a la vida real.`,
    signatureText: (name) =>
      `${name} necesita explicar lesiones, primera visita, tratamiento y seguimiento con seriedad, sin vender sesiones sueltas sin contexto.`,
    servicesEyebrow: "Tratamientos",
    servicesTitle: "Dolor, lesión y readaptación con objetivos medibles.",
    serviceBody:
      "Una línea de tratamiento orientada a valorar, aliviar y recuperar función.",
    processEyebrow: "Recuperación",
    processBody:
      "Evaluar, tratar y reforzar para que el paciente entienda qué está pasando y qué hacer después.",
    proofEyebrow: "Confianza clínica",
    proofTitle: "La diferencia está en valorar antes de tratar.",
    proofBody:
      "Una señal de rigor que convierte la primera cita en un plan.",
    packagesEyebrow: "Planes",
    packagesTitle: "Opciones para una primera visita o una recuperación completa.",
    teamTitle: "Profesionales que explican el cuerpo con claridad.",
    teamText: (name) =>
      `${name} comunica criterio clínico, acompañamiento y seguimiento para volver a moverse con seguridad.`,
    locationTitle: "Una clínica cercana para tratarse sin perder tiempo.",
    locationText: (name) =>
      `${name} facilita ubicación, horarios y acceso para que pedir cita sea sencillo cuando hay dolor.`,
    faqTitle: "Antes de la primera visita",
    faq: [
      ["¿Qué incluye la primera visita?", "Valoración, explicación del problema y propuesta de tratamiento inicial."],
      ["¿Necesito diagnóstico médico?", "No siempre. Si hace falta derivar o pedir pruebas, el equipo lo indicará."],
      ["¿Hay ejercicios para casa?", "Sí. La recuperación suele incluir pautas sencillas para reforzar el tratamiento."],
    ],
  },
  "Entrenador personal en Menorca": {
    nav: "Planes",
    signatureEyebrow: "Entrenamiento",
    signatureTitle: (name) => `${name} convierte entrenar en algo medible y sostenible.`,
    signatureText: (name) =>
      `${name} muestra objetivos, planes, evaluación y seguimiento para que el cliente entienda cómo va a progresar.`,
    servicesEyebrow: "Objetivos",
    servicesTitle: "Fuerza, movilidad y composición corporal con plan.",
    serviceBody:
      "Un objetivo de entrenamiento con sesiones, seguimiento y criterio realista.",
    processEyebrow: "Plan",
    processBody:
      "Evaluación, programación y revisión para que cada semana tenga intención.",
    proofEyebrow: "Progreso",
    proofTitle: "La motivación mejora cuando el avance se ve.",
    proofBody:
      "Una métrica clara para entrenar con menos improvisación.",
    packagesEyebrow: "Planes",
    packagesTitle: "Frecuencias claras para distintos niveles de compromiso.",
    teamTitle: "Acompañamiento cercano sin perder exigencia.",
    teamText: (name) =>
      `${name} comunica energía, método y seguimiento para entrenar con constancia.`,
    faqTitle: "Antes de empezar",
    faq: [
      ["¿Hay evaluación inicial?", "Sí. Sirve para conocer nivel, objetivos, lesiones y disponibilidad."],
      ["¿Puedo entrenar si empiezo de cero?", "Sí. El plan se adapta para progresar con seguridad."],
      ["¿Cuántos días necesito?", "Depende del objetivo; la web presenta frecuencias para elegir con criterio."],
    ],
  },
  "Inmobiliaria local en Menorca": {
    nav: "Inmuebles",
    signatureEyebrow: "Propiedad",
    signatureTitle: (name) => `${name} vende confianza antes de enseñar una vivienda.`,
    signatureText: (name) =>
      `${name} ordena venta, compra, valoración y cartera para propietarios y compradores con expectativas altas.`,
    servicesEyebrow: "Operaciones",
    servicesTitle: "Comprar, vender o valorar con información útil desde el inicio.",
    serviceBody:
      "Una vía clara para propietarios, compradores o inversores que necesitan criterio local.",
    processEyebrow: "Proceso",
    processBody:
      "Valoración, preparación, visitas y negociación con cada fase visible.",
    proofEyebrow: "Mercado local",
    proofTitle: "Los datos y la presentación reducen incertidumbre.",
    proofBody:
      "Una prueba de seriedad para confiar una propiedad o iniciar una búsqueda.",
    packagesEyebrow: "Servicios",
    packagesTitle: "Tres puertas de entrada según lo que necesites resolver.",
    locationTitle: "Criterio local para moverse mejor por Menorca.",
    locationText: (name) =>
      `${name} muestra zonas, tipo de inmueble y acompañamiento para decisiones inmobiliarias con contexto.`,
    faqTitle: "Antes de hablar",
    faq: [
      ["¿Puedo pedir valoración?", "Sí. La valoración permite orientar precio, estrategia y tiempos de venta."],
      ["¿Trabajan búsqueda privada?", "Sí. La web puede captar compradores con necesidades concretas."],
      ["¿Acompañan la documentación?", "Sí. El proceso explica pasos legales y coordinación profesional."],
    ],
  },
  "Reformas en Menorca": {
    nav: "Proyectos",
    signatureEyebrow: "Obra",
    signatureTitle: (name) => `${name} hace que una reforma parezca controlable.`,
    signatureText: (name) =>
      `${name} necesita enseñar tipos de obra, proceso, acabados y forma de presupuestar para reducir miedo antes de pedir visita.`,
    servicesEyebrow: "Reformas",
    servicesTitle: "Cocinas, baños, viviendas y locales con alcance definido.",
    serviceBody:
      "Una intervención concreta con expectativas de obra, coordinación y acabado.",
    processEyebrow: "Obra",
    processBody:
      "Visita, presupuesto, planificación y entrega para que cada fase tenga dueño.",
    proofEyebrow: "Acabados",
    proofTitle: "La confianza en obra se gana con orden visible.",
    proofBody:
      "Una señal de control que ayuda a pedir presupuesto sin miedo.",
    packagesEyebrow: "Tipos de proyecto",
    packagesTitle: "Desde una puesta a punto hasta una reforma integral.",
    teamTitle: "Un equipo que coordina antes de levantar polvo.",
    teamText: (name) =>
      `${name} comunica planificación, proveedores coordinados y acabados que se pueden revisar.`,
    faqTitle: "Antes de presupuestar",
    faq: [
      ["¿Hace falta visita?", "Sí. La visita permite medir, detectar condicionantes y ajustar el alcance."],
      ["¿Se trabaja por fases?", "Sí. Dividir la obra ayuda a controlar tiempos, pagos y decisiones."],
      ["¿Puedo ver trabajos anteriores?", "La galería y los casos ayudan a evaluar estilo y nivel de acabado."],
    ],
  },
  "Fontanería / electricidad en Menorca": {
    nav: "Averías",
    signatureEyebrow: "Urgencias",
    signatureTitle: (name) => `${name} tiene que resolver rápido y explicar claro.`,
    signatureText: (name) =>
      `${name} separa urgencias, instalaciones, mantenimiento y presupuesto para que llamar sea inmediato.`,
    servicesEyebrow: "Servicios técnicos",
    servicesTitle: "Averías, instalaciones y mantenimiento sin rodeos.",
    serviceBody:
      "Una necesidad técnica explicada con respuesta, diagnóstico y garantía.",
    processEyebrow: "Intervención",
    processBody:
      "Aviso, diagnóstico, reparación y garantía para que el cliente sepa qué ocurre.",
    proofEyebrow: "Garantía",
    proofTitle: "Cuando hay una avería, la claridad vale tanto como la rapidez.",
    proofBody:
      "Una señal de confianza antes de abrir la puerta a un técnico.",
    packagesEyebrow: "Modalidades",
    packagesTitle: "Urgencia puntual, instalación o mantenimiento continuo.",
    locationTitle: "Respuesta técnica para hogares y negocios de Menorca.",
    locationText: (name) =>
      `${name} prioriza disponibilidad, zonas de servicio y contacto directo para resolver incidencias.`,
    faqTitle: "Antes de llamar",
    faq: [
      ["¿Atienden urgencias?", "Sí. La web prioriza llamada y WhatsApp para incidencias que no pueden esperar."],
      ["¿Dan presupuesto previo?", "Siempre que el diagnóstico lo permita, se confirma antes de reparar."],
      ["¿Hay garantía?", "Las reparaciones e instalaciones se explican con garantía y materiales adecuados."],
    ],
  },
  "Alquiler de barcos en Menorca": {
    nav: "Flota",
    signatureEyebrow: "Mar",
    signatureTitle: (name) => `${name} vende un día de mar, no solo una embarcación.`,
    signatureText: (name) =>
      `${name} muestra flota, rutas, duración, extras y condiciones para que reservar sea visual y seguro.`,
    servicesEyebrow: "Experiencias",
    servicesTitle: "Rutas, patrón, sunset y salidas según el viento.",
    serviceBody:
      "Una salida con duración, ruta y expectativas claras antes de reservar.",
    processEyebrow: "Reserva",
    processBody:
      "Barco, ruta, check-in y navegación para que el día empiece sin dudas.",
    proofEyebrow: "Seguridad",
    proofTitle: "La mejor ruta depende del mar de ese día.",
    proofBody:
      "Una garantía de experiencia cuidada, no una promesa rígida.",
    packagesEyebrow: "Salidas",
    packagesTitle: "Medio día, día completo o atardecer privado.",
    locationTitle: "Calas, viento y punto de salida bien explicados.",
    locationText: (name) =>
      `${name} orienta al cliente con rutas posibles, embarque y recomendaciones para disfrutar Menorca desde el mar.`,
    faqTitle: "Antes de navegar",
    faq: [
      ["¿La ruta es fija?", "No siempre. Se ajusta al viento y al estado del mar para navegar mejor."],
      ["¿Hay patrón?", "Las salidas pueden explicar opción con patrón o sin patrón según embarcación."],
      ["¿Qué incluye la reserva?", "La reserva detalla duración, extras, combustible y condiciones de cancelación."],
    ],
  },
  "Excursiones turísticas en Menorca": {
    nav: "Rutas",
    signatureEyebrow: "Experiencia",
    signatureTitle: (name) => `${name} convierte una salida en una historia de la isla.`,
    signatureText: (name) =>
      `${name} necesita enseñar rutas, calendario, dificultad, punto de encuentro y tipo de grupo para vender con claridad.`,
    servicesEyebrow: "Rutas",
    servicesTitle: "Naturaleza, cultura y atardeceres con guía local.",
    serviceBody:
      "Una ruta con duración, ritmo y lo que se vive durante la experiencia.",
    processEyebrow: "Reserva",
    processBody:
      "Ruta, plaza, punto de encuentro y guía para llegar sabiendo qué esperar.",
    proofEyebrow: "Guías",
    proofTitle: "La diferencia está en el contexto que no aparece en el mapa.",
    proofBody:
      "Una señal de autenticidad para elegir una excursión con sentido.",
    packagesEyebrow: "Opciones de ruta",
    packagesTitle: "Grupo reducido, privado o plan familiar.",
    locationTitle: "Menorca explicada desde el terreno.",
    locationText: (name) =>
      `${name} sitúa cada experiencia con mapa mental, punto de encuentro y temporada recomendada.`,
    faqTitle: "Antes de la ruta",
    faq: [
      ["¿Dónde empieza?", "Cada ruta muestra punto de encuentro y recomendaciones de llegada."],
      ["¿Qué dificultad tiene?", "La web separa ritmo, duración y público recomendado."],
      ["¿Hay rutas privadas?", "Sí. Las experiencias privadas se pueden presentar para familias o grupos."],
    ],
  },
  "Agroturismo / alojamiento en Menorca": {
    nav: "Estancias",
    signatureEyebrow: "Descanso",
    signatureTitle: (name) => `${name} hace que el viajero se vea llegando.`,
    signatureText: (name) =>
      `${name} necesita habitaciones, disponibilidad, finca, desayuno, servicios y entorno para convertir deseo en consulta.`,
    servicesEyebrow: "Estancias",
    servicesTitle: "Habitaciones, finca y servicios para bajar el ritmo.",
    serviceBody:
      "Un espacio o servicio explicado con comodidad, ambiente y detalle útil.",
    processEyebrow: "Reserva",
    processBody:
      "Fechas, habitación, confirmación y llegada para que planificar sea sencillo.",
    proofEyebrow: "Hospitalidad",
    proofTitle: "El detalle que se nota antes de hacer la maleta.",
    proofBody:
      "Una razón visible para elegir alojamiento y no solo comparar precio.",
    packagesEyebrow: "Escapadas",
    packagesTitle: "Opciones para fin de semana, semana lenta o estancia especial.",
    locationTitle: "Dormir en Menorca con contexto, calma y acceso fácil.",
    locationText: (name) =>
      `${name} comunica ubicación, entorno y recomendaciones para que el huésped imagine la estancia completa.`,
    faqTitle: "Antes de reservar",
    faq: [
      ["¿Cómo consulto disponibilidad?", "El CTA lleva a una consulta clara de fechas y tipo de habitación."],
      ["¿Qué incluye la estancia?", "La estancia muestra desayuno, piscina, servicios y extras relevantes."],
      ["¿Dónde está la finca?", "La ubicación se explica con entorno, distancias y recomendaciones locales."],
    ],
  },
  "Tienda local en Menorca": {
    nav: "Selección",
    signatureEyebrow: "Producto",
    signatureTitle: (name) => `${name} hace que entrar en tienda parezca inevitable.`,
    signatureText: (name) =>
      `${name} necesita mostrar selección, regalos, marcas, horarios y ubicación para convertir curiosidad en visita.`,
    servicesEyebrow: "Selección",
    servicesTitle: "Producto local, regalos y objetos elegidos con criterio.",
    serviceBody:
      "Una categoría de producto con estilo, utilidad y motivo para visitar.",
    processEyebrow: "Compra",
    processBody:
      "Explorar, preguntar, elegir y salir con el regalo resuelto.",
    proofEyebrow: "Curaduría",
    proofTitle: "Una tienda funciona cuando cada objeto parece elegido.",
    proofBody:
      "Una señal de selección real que evita parecer bazar genérico.",
    packagesEyebrow: "Ideas",
    packagesTitle: "Regalos rápidos, hogar y encargos con intención.",
    locationTitle: "Una tienda para descubrir caminando por Menorca.",
    locationText: (name) =>
      `${name} deja claros horarios, zona y razones para acercarse aunque el cliente no busque nada concreto.`,
    faqTitle: "Antes de visitar",
    faq: [
      ["¿Hay productos locales?", "Sí. La selección destaca piezas, marcas y objetos con identidad."],
      ["¿Preparan regalos?", "La web puede explicar envoltorio, packs y encargos."],
      ["¿Dónde está la tienda?", "La ubicación y horarios están visibles para impulsar la visita."],
    ],
  },
  "Clínica dental en Menorca": {
    nav: "Tratamientos",
    signatureEyebrow: "Sonrisa",
    signatureTitle: (name) => `${name} quita miedo antes de pedir cita.`,
    signatureText: (name) =>
      `${name} necesita tratamientos, primera visita, tecnología y equipo explicados con calma y precisión.`,
    servicesEyebrow: "Tratamientos",
    servicesTitle: "Prevención, estética, ortodoncia e implantes con plan.",
    serviceBody:
      "Un tratamiento explicado por necesidad, fases y beneficio para el paciente.",
    processEyebrow: "Primera visita",
    processBody:
      "Exploración, diagnóstico, plan y tratamiento para decidir con información.",
    proofEyebrow: "Diagnóstico",
    proofTitle: "Ver el problema ayuda a confiar en la solución.",
    proofBody:
      "Una señal de tecnología y explicación clara antes de empezar.",
    packagesEyebrow: "Planes",
    packagesTitle: "Opciones para primera visita, estética o cuidado familiar.",
    teamTitle: "Un equipo que explica antes de intervenir.",
    teamText: (name) =>
      `${name} transmite precisión clínica, trato sereno y seguimiento por fases.`,
    locationTitle: "Una clínica cercana para cuidar la salud dental.",
    locationText: (name) =>
      `${name} facilita acceso, horarios y primera visita para pacientes que valoran confianza.`,
    faqTitle: "Antes de la consulta",
    faq: [
      ["¿Qué incluye la primera visita?", "Exploración, diagnóstico inicial y explicación del plan recomendado."],
      ["¿Trabajan estética dental?", "Sí. La web separa estética, salud, ortodoncia e implantes para orientar mejor."],
      ["¿Hay planes por fases?", "Sí. Los tratamientos complejos se explican por fases y prioridades."],
    ],
  },
  "Academia en Menorca": {
    nav: "Cursos",
    signatureEyebrow: "Aprendizaje",
    signatureTitle: (name) => `${name} muestra progreso, no solo clases.`,
    signatureText: (name) =>
      `${name} necesita cursos, niveles, horarios, seguimiento y plazas para que familias y alumnos decidan rápido.`,
    servicesEyebrow: "Cursos",
    servicesTitle: "Refuerzo, idiomas y exámenes con nivel claro.",
    serviceBody:
      "Una línea de aprendizaje con objetivo, ritmo y seguimiento visible.",
    processEyebrow: "Matrícula",
    processBody:
      "Nivel, grupo, plan y seguimiento para avanzar con orden.",
    proofEyebrow: "Progreso",
    proofTitle: "Aprender se entiende mejor cuando el avance se mide.",
    proofBody:
      "Una señal de acompañamiento para familias y alumnos.",
    packagesEyebrow: "Programas",
    packagesTitle: "Semanal, intensivo o preparación específica.",
    teamTitle: "Profesores cercanos con objetivos concretos.",
    teamText: (name) =>
      `${name} comunica método, grupos reducidos y seguimiento sin sonar impersonal.`,
    faqTitle: "Antes de apuntarte",
    faq: [
      ["¿Hay prueba de nivel?", "Sí. Ayuda a ubicar al alumno en el grupo adecuado."],
      ["¿Cómo se informa del progreso?", "El seguimiento se comunica con objetivos, asistencia y evolución."],
      ["¿Hay intensivos?", "Sí. Los cursos pueden separar refuerzo continuo e intensivos por fechas."],
    ],
  },
  "Autoescuela en Menorca": {
    nav: "Permisos",
    signatureEyebrow: "Conducir",
    signatureTitle: (name) => `${name} hace que sacarse el carnet parezca ordenado.`,
    signatureText: (name) =>
      `${name} necesita permisos, teórica, prácticas, profesores y alta clara para captar alumnos sin dudas.`,
    servicesEyebrow: "Permisos",
    servicesTitle: "Teórica, prácticas y reciclaje con horarios claros.",
    serviceBody:
      "Una opción formativa con requisitos, ritmo y siguiente paso definido.",
    processEyebrow: "Carnet",
    processBody:
      "Alta, teórica, prácticas y examen para visualizar todo el camino.",
    proofEyebrow: "Confianza",
    proofTitle: "Aprobar empieza por entender cómo vas a aprender.",
    proofBody:
      "Una señal de acompañamiento para alumnos nuevos o inseguros.",
    packagesEyebrow: "Opciones",
    packagesTitle: "Básico, intensivo o refuerzo para ganar seguridad.",
    locationTitle: "Aprender a conducir con referencias claras en Menorca.",
    locationText: (name) =>
      `${name} muestra zona de prácticas, horarios y contacto para empezar sin vueltas.`,
    faqTitle: "Antes de matricularte",
    faq: [
      ["¿Cómo empiezo?", "El alta explica documentación, teórica y primeras prácticas."],
      ["¿Hay prácticas intensivas?", "Sí. Las opciones pueden adaptarse a disponibilidad y fechas de examen."],
      ["¿Puedo hacer reciclaje?", "Sí. Es útil para recuperar confianza o adaptarse a rutas concretas."],
    ],
  },
  "Fotografía en Menorca": {
    nav: "Portfolio",
    signatureEyebrow: "Mirada",
    signatureTitle: (name) => `${name} vende sensibilidad antes que una sesión.`,
    signatureText: (name) =>
      `${name} necesita portfolio, tipos de sesión, proceso, entrega y consulta de fecha con una estética muy visual.`,
    servicesEyebrow: "Sesiones",
    servicesTitle: "Bodas, retrato, familia y marca con dirección cuidada.",
    serviceBody:
      "Una sesión explicada por momento, estilo, entrega y forma de trabajar.",
    processEyebrow: "Sesión",
    processBody:
      "Brief, sesión, edición y entrega para saber qué ocurre antes y después del disparo.",
    proofEyebrow: "Entrega",
    proofTitle: "La confianza está en ver el estilo antes de reservar.",
    proofBody:
      "Una señal visual de criterio, edición y trato durante la sesión.",
    packagesEyebrow: "Reportajes",
    packagesTitle: "Opciones para una sesión breve o una historia completa.",
    teamTitle: "Una dirección suave para que la imagen parezca natural.",
    teamText: (name) =>
      `${name} comunica mirada editorial, luz cuidada y una experiencia cómoda delante de cámara.`,
    faqTitle: "Antes de la sesión",
    faq: [
      ["¿Cómo consulto fecha?", "El CTA lleva a una consulta con tipo de sesión y disponibilidad."],
      ["¿Cuándo se entregan las fotos?", "La sesión explica plazos, galería privada y número orientativo de imágenes."],
      ["¿Ayudan con la dirección?", "Sí. La dirección durante la sesión evita poses forzadas y mejora el resultado."],
    ],
  },
  "Taller mecánico en Menorca": {
    nav: "Servicios",
    signatureEyebrow: "Taller",
    signatureTitle: (name) => `${name} transmite diagnóstico honesto desde el primer vistazo.`,
    signatureText: (name) =>
      `${name} necesita servicios, cita, presupuesto, reparación y entrega para que el conductor sepa qué esperar.`,
    servicesEyebrow: "Mecánica",
    servicesTitle: "Revisión, diagnóstico y reparación con presupuesto previo.",
    serviceBody:
      "Una necesidad del vehículo con revisión, explicación y autorización clara.",
    processEyebrow: "Cita",
    processBody:
      "Recepción, diagnóstico, autorización y entrega para evitar sorpresas.",
    proofEyebrow: "Transparencia",
    proofTitle: "El coche se deja mejor cuando entiendes la reparación.",
    proofBody:
      "Una señal de confianza para aceptar presupuesto sin dudas.",
    packagesEyebrow: "Mantenimiento",
    packagesTitle: "Revisión, diagnóstico rápido o plan para flotas.",
    locationTitle: "Un taller cercano cuando el coche no puede esperar.",
    locationText: (name) =>
      `${name} facilita cita, ubicación y servicios para mantenimiento o averías en Menorca.`,
    faqTitle: "Antes de traer el coche",
    faq: [
      ["¿Hace falta cita?", "Sí. La cita permite organizar diagnóstico y tiempos de taller."],
      ["¿Dan presupuesto antes?", "Sí. La reparación se autoriza antes de avanzar cuando el diagnóstico está claro."],
      ["¿Trabajan mantenimiento anual?", "Sí. Las revisiones periódicas se explican como una opción clara."],
    ],
  },
  "Limpieza / mantenimiento en Menorca": {
    nav: "Servicios",
    signatureEyebrow: "Mantenimiento",
    signatureTitle: (name) => `${name} aporta tranquilidad operativa.`,
    signatureText: (name) =>
      `${name} necesita servicios, frecuencia, zonas, equipo y supervisión para que propietarios y negocios confíen.`,
    servicesEyebrow: "Servicios",
    servicesTitle: "Villas, oficinas, cristales y temporada con checklist.",
    serviceBody:
      "Un servicio definido por frecuencia, alcance y estándar de revisión.",
    processEyebrow: "Plan de trabajo",
    processBody:
      "Visita, plan, equipo y control para mantener resultados constantes.",
    proofEyebrow: "Supervisión",
    proofTitle: "Lo que importa es que el resultado se repita.",
    proofBody:
      "Una señal de control para delegar llaves, espacios y temporada.",
    packagesEyebrow: "Frecuencias",
    packagesTitle: "Puntual, semanal o temporada completa.",
    teamTitle: "Equipo coordinado, comunicación clara y revisión visible.",
    teamText: (name) =>
      `${name} comunica orden, puntualidad y confianza para viviendas, comunidades y negocios.`,
    faqTitle: "Antes de pedir presupuesto",
    faq: [
      ["¿Hacen visita previa?", "Sí. La visita permite definir alcance, frecuencia y materiales."],
      ["¿Trabajan temporada turística?", "Sí. La planificación por temporada ayuda a cubrir picos de entrada y salida."],
      ["¿Hay checklist?", "Sí. El checklist mantiene el estándar y facilita la supervisión."],
    ],
  },
  "Eventos en Menorca": {
    nav: "Eventos",
    signatureEyebrow: "Celebración",
    signatureTitle: (name) => `${name} hace que organizar parezca ligero.`,
    signatureText: (name) =>
      `${name} necesita formatos, portfolio, proveedores, proceso y consulta de fecha para convertir una idea en evento viable.`,
    servicesEyebrow: "Eventos",
    servicesTitle: "Bodas, celebraciones y marcas con producción cuidada.",
    serviceBody:
      "Un tipo de evento con estética, logística y nivel de acompañamiento definido.",
    processEyebrow: "Producción",
    processBody:
      "Concepto, diseño, proveedores y ejecución para que el día fluya.",
    proofEyebrow: "Coordinación",
    proofTitle: "Un evento se disfruta cuando la logística no se ve.",
    proofBody:
      "Una señal de control para anfitriones que quieren delegar bien.",
    packagesEyebrow: "Producción",
    packagesTitle: "Coordinación, diseño integral o producción privada.",
    teamTitle: "Un equipo que piensa en invitados, tiempos y detalles.",
    teamText: (name) =>
      `${name} comunica gusto, precisión y una red de proveedores preparada para Menorca.`,
    faqTitle: "Antes de contar el evento",
    faq: [
      ["¿Trabajan bodas y empresa?", "Sí. Los formatos separan celebraciones privadas, bodas y eventos corporativos."],
      ["¿Pueden coordinar proveedores?", "Sí. La coordinación permite integrar espacio, decoración, catering, música y tiempos."],
      ["¿Cómo empiezo?", "Con fecha, número de invitados, tipo de evento y nivel de acompañamiento deseado."],
    ],
  },
};

function copyFor(category) {
  return categoryCopy[category] || {
    nav: "Servicios",
    signatureEyebrow: "Propuesta",
    signatureTitle: (name) => `${name} presenta una propuesta clara y fácil de elegir.`,
    signatureText: (name) =>
      `${name} ordena servicios, confianza y contacto para que el cliente entienda rápido el siguiente paso.`,
    servicesEyebrow: "Servicios",
    servicesTitle: "Lo principal explicado con claridad.",
    serviceBody:
      "Una opción concreta con alcance, valor y siguiente paso definido.",
    processEyebrow: "Proceso",
    processBody:
      "Un recorrido claro para decidir con menos dudas y más confianza.",
    proofEyebrow: "Confianza",
    proofTitle: "Señales visibles para decidir mejor.",
    proofBody:
      "Un argumento de profesionalidad que ayuda a elegir con seguridad.",
    packagesEyebrow: "Opciones",
    packagesTitle: "Tres formas de empezar según lo que necesitas.",
    teamTitle: "Un equipo preparado para acompañar la decisión.",
    teamText: (name) =>
      `${name} combina especialización, trato cercano y una forma de trabajar fácil de entender.`,
    locationTitle: "Presencia local, estándar profesional.",
    locationText: (name) =>
      `${name} combina conocimiento de la isla con una presentación clara y cuidada.`,
    faqTitle: "Preguntas antes de decidir",
    faq: [
      ["¿Cómo empiezo?", "El CTA principal te lleva al siguiente paso más útil."],
      ["¿Hay atención personalizada?", "Sí. Cada solicitud se revisa para recomendar la opción adecuada."],
      ["¿Puedo pedir algo especial?", "Sí. Los casos especiales se atienden con una propuesta clara antes de confirmar."],
    ],
  };
}

const categorySpecific = {
  "Restaurante en Menorca": {
    eyebrow: "Carta interactiva",
    title: "Explora la carta por tipo de plato.",
    filters: [["pizzas", "Pizzas"], ["bocatas", "Bocatas"], ["ensaladas", "Ensaladas"], ["postres", "Postres"]],
    items: [
      ["pizzas", "Pizza de sobrasada y miel", "Masa fina · horno fuerte", "Tomate asado, mozzarella, sobrasada local y miel de romero.", "15"],
      ["pizzas", "Pizza marinera", "Blanca · temporada", "Calamar, alcaparras, limón y perejil fresco.", "17"],
      ["bocatas", "Bocata de calamar", "Pan cristal", "Calamar crujiente, alioli suave y hojas verdes.", "12"],
      ["bocatas", "Bocata payés", "Caliente", "Queso curado, tomate, berenjena asada y aceite de oliva.", "10"],
      ["ensaladas", "Ensalada de tomate antiguo", "Fresca", "Tomate de temporada, cebolla encurtida, aceituna y albahaca.", "11"],
      ["ensaladas", "Ensalada de burrata", "Para compartir", "Burrata, rúcula, higos, almendra y vinagreta cítrica.", "14"],
      ["postres", "Greixonera tostada", "Casa", "Crema ligera, caramelo salado y helado de vainilla.", "7"],
      ["postres", "Tarta de queso mahonés", "Horno bajo", "Queso de Mahón, compota de albaricoque y galleta.", "7"],
    ],
  },
  "Bar / cafetería en Menorca": {
    eyebrow: "Carta de barra",
    title: "Filtra desayunos, brunch y take away.",
    filters: [["cafe", "Café"], ["desayunos", "Desayunos"], ["brunch", "Brunch"], ["takeaway", "Take away"]],
    items: [
      ["cafe", "Flat white", "Doble espresso", "Leche texturizada y café calibrado cada mañana.", "3"],
      ["cafe", "Cold brew cítrico", "Frío", "Infusión lenta con naranja y hielo grande.", "4"],
      ["desayunos", "Tostada de tomate", "Clásico", "Pan de masa madre, tomate rallado y aceite local.", "5"],
      ["desayunos", "Croissant planchado", "Dulce", "Mantequilla, crema ligera o chocolate.", "4"],
      ["brunch", "Huevos turcos", "Brunch", "Yogur, mantequilla especiada, hierbas y pan tostado.", "11"],
      ["brunch", "Bowl mediterráneo", "Vegetal", "Hummus, verduras asadas, huevo y semillas.", "10"],
      ["takeaway", "Pack oficina", "Para llevar", "Café, pieza dulce y mini bocata preparado al momento.", "9"],
      ["takeaway", "Limonada de la casa", "Botella", "Limón, hierbabuena y punto justo de azúcar.", "4"],
    ],
  },
  "Peluquería en Menorca": {
    eyebrow: "Lookbook de servicios",
    title: "Elige por objetivo de cabello.",
    filters: [["corte", "Corte"], ["color", "Color"], ["cuidado", "Cuidado"], ["evento", "Evento"]],
    items: [
      ["corte", "Corte signature", "60 min", "Diagnóstico, diseño de forma y acabado adaptado al día a día.", "45"],
      ["corte", "Cambio de estilo", "90 min", "Propuesta completa para transformar largo, volumen o flequillo.", "65"],
      ["color", "Balayage mediterráneo", "3 h", "Luz suave, raíz natural y matiz personalizado.", "140"],
      ["color", "Gloss tonalizante", "45 min", "Brillo, corrección de reflejo y mantenimiento de color.", "38"],
      ["cuidado", "Ritual reparación", "50 min", "Tratamiento de fibra, masaje y sellado de puntas.", "55"],
      ["cuidado", "Plan antiencrespado", "90 min", "Disciplina, hidratación y acabado pulido.", "85"],
      ["evento", "Recogido invitada", "75 min", "Prueba rápida, forma estable y acabado natural.", "70"],
      ["evento", "Peinado ondas", "45 min", "Ondas suaves con fijación ligera y movimiento.", "42"],
    ],
  },
  "Centro de estética en Menorca": {
    eyebrow: "Tratamientos filtrables",
    title: "Encuentra el tratamiento por necesidad.",
    filters: [["facial", "Facial"], ["corporal", "Corporal"], ["relax", "Relax"], ["bonos", "Bonos"]],
    items: [
      ["facial", "Higiene luminosa", "75 min", "Limpieza profunda, extracción suave e hidratación.", "65"],
      ["facial", "Facial vitamina C", "60 min", "Tratamiento antioxidante para tono apagado.", "72"],
      ["corporal", "Drenaje manual", "50 min", "Maniobra ligera para piernas cansadas y retención.", "58"],
      ["corporal", "Ritual reafirmante", "70 min", "Exfoliación, masaje y envoltura tensora.", "78"],
      ["relax", "Masaje calma", "50 min", "Presión media, aromaterapia y cabina privada.", "60"],
      ["relax", "Ritual sal marina", "90 min", "Exfoliación, masaje y descanso sensorial.", "95"],
      ["bonos", "Bono piel nueva", "3 sesiones", "Plan facial de inicio con seguimiento.", "180"],
      ["bonos", "Bono corporal", "5 sesiones", "Trabajo continuo con pauta semanal.", "290"],
    ],
  },
  "Fisioterapia en Menorca": {
    eyebrow: "Área de tratamiento",
    title: "Filtra por dolor, lesión o recuperación.",
    filters: [["dolor", "Dolor"], ["deporte", "Deporte"], ["readaptacion", "Readaptación"], ["prevencion", "Prevención"]],
    items: [
      ["dolor", "Dolor lumbar", "Primera visita", "Valoración funcional, tratamiento manual y ejercicios de control.", "55"],
      ["dolor", "Cervicalgia", "45 min", "Descarga, movilidad y pauta para trabajo de oficina.", "50"],
      ["deporte", "Lesión de rodilla", "Plan", "Evaluación, fuerza progresiva y retorno a carrera.", "60"],
      ["deporte", "Tobillo recurrente", "Plan", "Propiocepción, fuerza y seguridad en apoyo.", "55"],
      ["readaptacion", "Vuelta al entrenamiento", "4 semanas", "Sesiones y ejercicios para recuperar ritmo sin recaídas.", "220"],
      ["readaptacion", "Postoperatorio", "Por fases", "Movilidad, fuerza y control según evolución.", "60"],
      ["prevencion", "Chequeo movilidad", "30 min", "Test breve para detectar limitaciones y compensaciones.", "35"],
      ["prevencion", "Plan espalda", "3 sesiones", "Pauta práctica para reducir recaídas.", "145"],
    ],
  },
  "Entrenador personal en Menorca": {
    eyebrow: "Selector de planes",
    title: "Filtra entrenamientos por objetivo.",
    filters: [["fuerza", "Fuerza"], ["perdida", "Pérdida grasa"], ["movilidad", "Movilidad"], ["rendimiento", "Rendimiento"]],
    items: [
      ["fuerza", "Base fuerza", "2 días/semana", "Técnica, progresión y registro de cargas.", "180"],
      ["fuerza", "Fuerza privada", "1:1", "Sesiones guiadas con seguimiento semanal.", "260"],
      ["perdida", "Cambio composición", "8 semanas", "Entrenamiento, hábitos y medición mensual.", "320"],
      ["perdida", "Plan constancia", "3 días/semana", "Rutina sostenible para agenda ocupada.", "240"],
      ["movilidad", "Reset movilidad", "45 min", "Cadera, espalda, hombro y respiración.", "45"],
      ["movilidad", "Movilidad runner", "4 sesiones", "Trabajo específico para carrera y prevención.", "160"],
      ["rendimiento", "Performance", "3 días/semana", "Fuerza, potencia y planificación de temporada.", "360"],
      ["rendimiento", "Test inicial", "60 min", "Valoración de fuerza, movilidad y objetivos.", "55"],
    ],
  },
  "Inmobiliaria local en Menorca": {
    eyebrow: "Cartera filtrable",
    title: "Explora propiedades por tipo.",
    filters: [["casas", "Casas"], ["fincas", "Fincas"], ["pisos", "Pisos"], ["inversion", "Inversión"]],
    items: [
      ["casas", "Casa de pueblo reformada", "3 hab · patio", "Centro histórico, materiales nobles y entrada de luz.", "485k"],
      ["casas", "Villa cerca del mar", "4 hab · piscina", "Privacidad, terraza amplia y acceso cómodo a cala.", "1.2M"],
      ["fincas", "Finca con terreno", "18.000 m2", "Casa principal, anexos y vistas abiertas.", "890k"],
      ["fincas", "Predio boutique", "Licencia turística", "Potencial de alojamiento y explotación cuidada.", "1.6M"],
      ["pisos", "Ático con terraza", "2 hab", "Vistas despejadas y reforma reciente.", "360k"],
      ["pisos", "Piso puerto", "3 hab", "Ubicación práctica y alta demanda de alquiler.", "420k"],
      ["inversion", "Local esquinero", "Rentabilidad", "Zona de paso, escaparate y contrato estable.", "310k"],
      ["inversion", "Edificio pequeño", "Activo mixto", "Tres unidades y posibilidad de actualización.", "760k"],
    ],
  },
  "Reformas en Menorca": {
    eyebrow: "Comparador de proyectos",
    title: "Filtra reformas por tipo de intervención.",
    filters: [["cocinas", "Cocinas"], ["banos", "Baños"], ["integrales", "Integrales"], ["locales", "Locales"]],
    items: [
      ["cocinas", "Cocina abierta", "4-6 semanas", "Derribo parcial, mobiliario, encimera e iluminación.", "Desde 12k"],
      ["cocinas", "Actualización express", "2 semanas", "Frentes, encimera y pintura sin obra mayor.", "Desde 5k"],
      ["banos", "Baño completo", "3 semanas", "Demolición, instalaciones, porcelánico y mampara.", "Desde 7k"],
      ["banos", "Aseo invitado", "10 días", "Piezas compactas, luz cálida y almacenaje.", "Desde 3k"],
      ["integrales", "Vivienda completa", "10-16 semanas", "Plan de obra, gremios y entrega por fases.", "A medida"],
      ["integrales", "Casa de campo", "Por fases", "Actualización respetando materiales y entorno.", "A medida"],
      ["locales", "Local comercial", "6-10 semanas", "Distribución, acabados, iluminación y fachada.", "A medida"],
      ["locales", "Puesta a punto", "2-4 semanas", "Pintura, suelo, electricidad y detalles visibles.", "Desde 6k"],
    ],
  },
  "Fontanería / electricidad en Menorca": {
    eyebrow: "Panel de incidencias",
    title: "Filtra por urgencia, instalación o mantenimiento.",
    filters: [["urgencias", "Urgencias"], ["instalaciones", "Instalaciones"], ["boletines", "Boletines"], ["mantenimiento", "Mantenimiento"]],
    items: [
      ["urgencias", "Fuga visible", "Prioritario", "Corte, diagnóstico y reparación inicial.", "Aviso"],
      ["urgencias", "Corte eléctrico", "Prioritario", "Revisión de cuadro, línea y seguridad.", "Aviso"],
      ["instalaciones", "Termo eléctrico", "Instalación", "Retirada, montaje y comprobación.", "Desde 180"],
      ["instalaciones", "Puntos de luz", "Vivienda/local", "Nuevas tomas, mecanismos y protección.", "Presupuesto"],
      ["boletines", "Boletín eléctrico", "Trámite", "Revisión, documentación y emisión.", "Desde 160"],
      ["boletines", "Alta agua", "Gestión", "Comprobación y documentación necesaria.", "Consulta"],
      ["mantenimiento", "Comunidad", "Mensual", "Revisión preventiva y pequeñas incidencias.", "Plan"],
      ["mantenimiento", "Negocio temporada", "Preventivo", "Puesta a punto antes de apertura.", "Plan"],
    ],
  },
  "Alquiler de barcos en Menorca": {
    eyebrow: "Catálogo de barcos",
    title: "Filtra la flota por tipo de salida.",
    filters: [["sinpatron", "Sin patrón"], ["conpatron", "Con patrón"], ["premium", "Premium"], ["sunset", "Sunset"]],
    items: [
      ["sinpatron", "Llaut 5.5", "6 pax", "Cómodo, estable y perfecto para calas cercanas.", "Desde 240"],
      ["sinpatron", "Open 6m", "7 pax", "Solárium, toldo y escalera de baño.", "Desde 290"],
      ["conpatron", "Menorca Classic", "8 pax", "Ruta flexible con patrón local.", "Desde 520"],
      ["conpatron", "North Coast", "10 pax", "Día completo con nevera y equipo snorkel.", "Desde 690"],
      ["premium", "Cap Camarat", "9 pax", "Más potencia, confort y navegación suave.", "Desde 820"],
      ["premium", "Llaut premium", "8 pax", "Estética mediterránea y servicio cuidado.", "Desde 760"],
      ["sunset", "Sunset pareja", "2-4 pax", "Salida corta, baño final y atardecer.", "Desde 260"],
      ["sunset", "Sunset grupo", "8 pax", "Música suave, bebidas y patrón.", "Desde 480"],
    ],
  },
  "Excursiones turísticas en Menorca": {
    eyebrow: "Calendario de rutas",
    title: "Filtra experiencias por tipo de plan.",
    filters: [["cultura", "Cultura"], ["naturaleza", "Naturaleza"], ["familia", "Familia"], ["privado", "Privado"]],
    items: [
      ["cultura", "Ciutadella secreta", "2 h", "Historia, patios, leyendas y rincones tranquilos.", "22"],
      ["cultura", "Mahón marítimo", "2.5 h", "Puerto, comercio, miradores y relatos navales.", "24"],
      ["naturaleza", "Camí de Cavalls norte", "Medio día", "Costa salvaje, paradas y lectura del paisaje.", "38"],
      ["naturaleza", "Atardecer entre faros", "3 h", "Ruta suave con cierre de puesta de sol.", "34"],
      ["familia", "Menorca para peques", "2 h", "Actividad ligera con juegos y descubrimiento.", "18"],
      ["familia", "Granja y campo", "Mañana", "Producto local, animales y merienda sencilla.", "28"],
      ["privado", "Ruta a medida", "Grupo privado", "Diseño por intereses, ritmo y logística.", "Desde 180"],
      ["privado", "Experiencia premium", "Día completo", "Guía, transporte y reservas coordinadas.", "Consulta"],
    ],
  },
  "Agroturismo / alojamiento en Menorca": {
    eyebrow: "Disponibilidad de estancias",
    title: "Filtra habitaciones y experiencias.",
    filters: [["habitaciones", "Habitaciones"], ["suites", "Suites"], ["experiencias", "Experiencias"], ["packs", "Packs"]],
    items: [
      ["habitaciones", "Doble calma", "2 pax", "Habitación luminosa, baño privado y vistas al patio.", "Desde 160"],
      ["habitaciones", "Doble jardín", "2 pax", "Salida directa, textiles naturales y silencio.", "Desde 180"],
      ["suites", "Suite terraza", "2 pax", "Terraza privada, salón pequeño y desayuno incluido.", "Desde 240"],
      ["suites", "Suite familiar", "4 pax", "Dos ambientes, baño amplio y acceso a piscina.", "Desde 280"],
      ["experiencias", "Desayuno de finca", "Mañanas", "Producto local, pan, fruta y café servido sin prisa.", "Incluido"],
      ["experiencias", "Cena bajo estrellas", "Reserva", "Mesa privada con menú de temporada.", "Desde 55"],
      ["packs", "Escapada lenta", "2 noches", "Habitación, desayuno y detalle de bienvenida.", "Desde 360"],
      ["packs", "Semana Menorca", "7 noches", "Estancia larga con recomendaciones personalizadas.", "Consulta"],
    ],
  },
  "Tienda local en Menorca": {
    eyebrow: "Catálogo de tienda",
    title: "Filtra productos por intención de compra.",
    filters: [["hogar", "Hogar"], ["regalos", "Regalos"], ["moda", "Moda"], ["local", "Producto local"]],
    items: [
      ["hogar", "Jarrón arcilla", "Pieza única", "Cerámica cálida para mesa o recibidor.", "42"],
      ["hogar", "Lámpara fibras", "Hecha a mano", "Pantalla natural con luz suave.", "86"],
      ["regalos", "Pack bienvenida", "Listo para regalar", "Vela, postal y dulce local.", "29"],
      ["regalos", "Caja celebración", "Personalizable", "Selección bonita para cumpleaños o gracias.", "48"],
      ["moda", "Bolso trenzado", "Verano", "Fibra natural, asa cómoda y cierre interior.", "65"],
      ["moda", "Pañuelo estampado", "Edición limitada", "Color mediterráneo y tejido ligero.", "32"],
      ["local", "Aceite de finca", "Menorca", "Botella pequeña de producción cuidada.", "18"],
      ["local", "Sal aromática", "Cocina", "Mezcla local para pescado, verduras o pan.", "9"],
    ],
  },
  "Clínica dental en Menorca": {
    eyebrow: "Tratamientos dentales",
    title: "Filtra por salud, estética o familia.",
    filters: [["salud", "Salud"], ["estetica", "Estética"], ["ortodoncia", "Ortodoncia"], ["familia", "Familia"]],
    items: [
      ["salud", "Primera visita", "Diagnóstico", "Exploración, radiografía si procede y plan inicial.", "Consulta"],
      ["salud", "Higiene dental", "45 min", "Limpieza profesional y pauta de cuidado.", "Desde 65"],
      ["estetica", "Blanqueamiento", "Plan seguro", "Valoración previa y tratamiento progresivo.", "Desde 220"],
      ["estetica", "Carillas", "Diseño sonrisa", "Plan por piezas, prueba y acabado natural.", "Consulta"],
      ["ortodoncia", "Invisible", "Adultos", "Alineadores, revisiones y simulación.", "Consulta"],
      ["ortodoncia", "Ortodoncia joven", "Seguimiento", "Plan adaptado a crecimiento y hábitos.", "Consulta"],
      ["familia", "Revisión infantil", "Niños", "Exploración amable y prevención.", "Desde 45"],
      ["familia", "Plan familiar", "Anual", "Revisiones y limpieza organizadas para casa.", "Plan"],
    ],
  },
  "Academia en Menorca": {
    eyebrow: "Oferta académica",
    title: "Filtra cursos por edad y objetivo.",
    filters: [["refuerzo", "Refuerzo"], ["idiomas", "Idiomas"], ["examenes", "Exámenes"], ["adultos", "Adultos"]],
    items: [
      ["refuerzo", "Primaria", "2 días/semana", "Hábitos, deberes y comprensión base.", "Desde 70/mes"],
      ["refuerzo", "ESO matemáticas", "Grupo reducido", "Práctica, dudas y preparación de controles.", "Desde 85/mes"],
      ["idiomas", "Inglés kids", "A1-A2", "Juego, conversación y vocabulario útil.", "Desde 75/mes"],
      ["idiomas", "Conversación adultos", "B1-B2", "Sesiones prácticas para ganar fluidez.", "Desde 90/mes"],
      ["examenes", "Selectividad", "Intensivo", "Plan por materia, simulacros y calendario.", "Desde 140/mes"],
      ["examenes", "Cambridge", "B1-C1", "Técnica de examen y speaking guiado.", "Desde 120/mes"],
      ["adultos", "Informática útil", "Nivel inicial", "Herramientas básicas para trabajo diario.", "Consulta"],
      ["adultos", "Catalán práctico", "Grupo pequeño", "Conversación, gramática y trámites.", "Consulta"],
    ],
  },
  "Autoescuela en Menorca": {
    eyebrow: "Permisos y prácticas",
    title: "Filtra la formación que necesitas.",
    filters: [["permiso", "Permisos"], ["teorica", "Teórica"], ["practicas", "Prácticas"], ["reciclaje", "Reciclaje"]],
    items: [
      ["permiso", "Permiso B", "Coche", "Alta, material, teórica y planificación de prácticas.", "Consulta"],
      ["permiso", "Permiso A2", "Moto", "Formación específica y preparación de maniobras.", "Consulta"],
      ["teorica", "Teórica online", "Flexible", "Test, seguimiento y apoyo de profesor.", "Plan"],
      ["teorica", "Intensivo teórico", "2 semanas", "Calendario cerrado y resolución de dudas.", "Plan"],
      ["practicas", "Bono 5 prácticas", "Coche", "Bloque para avanzar con continuidad.", "Pack"],
      ["practicas", "Práctica examen", "Ruta final", "Repaso de maniobras, seguridad y confianza.", "Unidad"],
      ["reciclaje", "Volver a conducir", "Adultos", "Sesiones suaves para recuperar autonomía.", "Consulta"],
      ["reciclaje", "Aparcamiento y ciudad", "Técnico", "Práctica concreta para ganar soltura.", "Consulta"],
    ],
  },
  "Fotografía en Menorca": {
    eyebrow: "Portfolio filtrable",
    title: "Explora sesiones por tipo de historia.",
    filters: [["bodas", "Bodas"], ["retrato", "Retrato"], ["marca", "Marca"], ["familia", "Familia"]],
    items: [
      ["bodas", "Ceremonia íntima", "4 h", "Cobertura esencial con galería cuidada.", "Desde 900"],
      ["bodas", "Historia completa", "10 h", "Preparativos, ceremonia, fiesta y entrega amplia.", "Desde 1.900"],
      ["retrato", "Retrato editorial", "90 min", "Dirección suave, localización y selección final.", "Desde 220"],
      ["retrato", "Perfil profesional", "45 min", "Imagen clara para web, LinkedIn o prensa.", "Desde 120"],
      ["marca", "Campaña local", "Medio día", "Producto, equipo, espacio y narrativa visual.", "Desde 650"],
      ["marca", "Contenido mensual", "Suscripción", "Sesión recurrente para redes y web.", "Plan"],
      ["familia", "Sesión playa", "60 min", "Luz natural, ritmo infantil y galería privada.", "Desde 180"],
      ["familia", "Reunión familiar", "90 min", "Fotos de grupo, detalles y momentos naturales.", "Desde 260"],
    ],
  },
  "Taller mecánico en Menorca": {
    eyebrow: "Servicios de taller",
    title: "Filtra por revisión, avería o flota.",
    filters: [["revision", "Revisión"], ["averia", "Avería"], ["neumaticos", "Neumáticos"], ["flota", "Flota"]],
    items: [
      ["revision", "Revisión anual", "Mantenimiento", "Aceite, filtros, niveles y puntos de seguridad.", "Desde 140"],
      ["revision", "Pre-ITV", "Chequeo", "Luces, frenos, emisiones y estado general.", "Desde 45"],
      ["averia", "Diagnóstico motor", "Equipo diagnosis", "Lectura, prueba y explicación de códigos.", "Desde 55"],
      ["averia", "Frenos", "Seguridad", "Pastillas, discos y líquido si procede.", "Presupuesto"],
      ["neumaticos", "Cambio neumáticos", "Por eje", "Montaje, equilibrado y revisión de presión.", "Consulta"],
      ["neumaticos", "Alineado", "Dirección", "Corrección para desgaste irregular.", "Desde 55"],
      ["flota", "Plan empresa", "Mensual", "Mantenimiento preventivo para varios vehículos.", "Plan"],
      ["flota", "Historial vehículo", "Control", "Registro de trabajos y próximas revisiones.", "Incluido"],
    ],
  },
  "Limpieza / mantenimiento en Menorca": {
    eyebrow: "Planificador de servicios",
    title: "Filtra por espacio y frecuencia.",
    filters: [["villas", "Villas"], ["oficinas", "Oficinas"], ["cristales", "Cristales"], ["temporada", "Temporada"]],
    items: [
      ["villas", "Cambio de huéspedes", "Check-in/out", "Limpieza completa, ropa y revisión visual.", "Plan"],
      ["villas", "Mantenimiento jardín", "Semanal", "Exterior, piscina básica y zonas de paso.", "Plan"],
      ["oficinas", "Limpieza oficina", "2-5 días", "Puestos, baños, suelos y consumibles.", "Plan"],
      ["oficinas", "Puesta a punto", "Puntual", "Limpieza profunda antes de apertura o evento.", "Presupuesto"],
      ["cristales", "Cristales local", "Mensual", "Escaparate, marcos y repaso final.", "Desde 45"],
      ["cristales", "Vivienda completa", "Puntual", "Ventanas, terrazas y zonas altas.", "Presupuesto"],
      ["temporada", "Plan verano", "Mayo-octubre", "Equipo asignado y checklist por servicio.", "Plan"],
      ["temporada", "Guardia incidencias", "Alta demanda", "Respuesta para imprevistos de alojamiento.", "Plan"],
    ],
  },
  "Eventos en Menorca": {
    eyebrow: "Selector de evento",
    title: "Filtra formatos por celebración.",
    filters: [["bodas", "Bodas"], ["corporativo", "Corporativo"], ["privado", "Privado"], ["produccion", "Producción"]],
    items: [
      ["bodas", "Coordinación del día", "Wedding day", "Timing, proveedores y asistencia en la celebración.", "Desde 900"],
      ["bodas", "Diseño integral", "Proyecto completo", "Concepto, estética, proveedores y producción.", "Consulta"],
      ["corporativo", "Lanzamiento de marca", "Empresa", "Espacio, invitados, contenido y ritmo del evento.", "Consulta"],
      ["corporativo", "Cena de equipo", "Privado", "Lugar, menú, decoración y coordinación.", "Consulta"],
      ["privado", "Cumpleaños especial", "Celebración", "Mesa, música, detalles y logística.", "Desde 650"],
      ["privado", "Cena en finca", "Experiencia", "Ambientación, catering y servicio.", "Consulta"],
      ["produccion", "Búsqueda de espacio", "Menorca", "Localización, permisos y coordinación inicial.", "Servicio"],
      ["produccion", "Gestión proveedores", "Integral", "Catering, flores, sonido, mobiliario y timing.", "Servicio"],
    ],
  },
};

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function pick(list, index) {
  return list[((index % list.length) + list.length) % list.length];
}

function seededOrder(list, seed) {
  const copy = [...list];
  for (let i = copy.length - 1; i > 0; i -= 1) {
    const j = (seed * 17 + i * 31 + seed * i) % (i + 1);
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

function pageImages(item, index) {
  const pool = imagePools[item.category] || [];
  const rotated = pool.map((_, i) => pick(pool, i + index));
  return rotated.length ? rotated : [item.heroImage].filter(Boolean);
}

function photoStyle(url) {
  return url ? ` style="--photo:url('${url}')"` : "";
}

function buildStrategy(item, index) {
  const profile = categoryProfiles[item.category];
  const angle = pick(brandAngles, index);
  const hero = pick(heroLayouts, index);
  const sections = [...(categorySections[item.category] || seededOrder(sectionLibrary, index + 1).slice(0, 7))];
  if (item.slug === "094-equip-finca") {
    sections.splice(1, 0, "proof");
    sections.splice(7);
    if (!sections.includes("services")) sections[6] = "services";
  }
  const palette = pick(palettes, index);
  const visualRhythm = [
    "editorial sobrio con módulos amplios y una navegación muy limpia",
    "premium cinematográfico con imágenes grandes, datos de confianza y reserva visible",
    "sistema boutique con bloques compactos, prueba social y llamadas a la acción rápidas",
    "experiencia de marca madura, jerarquía clara y detalles visuales de alto valor",
    "web de captación directa con argumentos ordenados, servicios claros y cierre fuerte",
  ];

  return {
    slug: item.slug,
    name: item.name,
    category: item.category,
    analysis: {
      targetPerception: `${item.name} debe proyectar ${profile.perception}. La marca debe sentirse como una ${angle}, con seguridad operativa y un acabado visual propio de un negocio consolidado.`,
      audience: profile.audience,
      conversionGoal: profile.conversion,
      visualDirection: pick(visualRhythm, index),
      imageCriteria: `Imágenes de ${profile.noun} reales o aspiracionales: espacios, producto, equipo y detalle de servicio. Deben aportar confianza inmediata, no decoración genérica.`,
    },
    structure: {
      hero,
      sections,
      primaryCta: profile.cta,
      secondaryCta: profile.secondary,
    },
    palette,
  };
}

function sentenceCase(text) {
  return text.charAt(0).toUpperCase() + text.slice(1);
}

function heroCopy(item, profile, strategy, index) {
  const openers = [
    `${item.name} marca una nueva referencia en Menorca.`,
    `${item.name}: ${profile.promise}.`,
    `La forma más cuidada de elegir ${profile.noun} en Menorca.`,
    `Un ${profile.noun} diseñado para clientes que notan los detalles.`,
    `${item.name} convierte cada visita en una decisión fácil de repetir.`,
  ];
  return {
    eyebrow: `${item.category} · Menorca`,
    title: pick(openers, index),
    lead: sentenceCase(profile.promise) + ".",
  };
}

function renderHero(item, profile, strategy, images, index) {
  const copy = heroCopy(item, profile, strategy, index);
  const secondaryTarget = categorySpecific[item.category]
    ? "#interactivo"
    : "#servicios";
  const statSets = {
    "Restaurante en Menorca": [["Carta", "de temporada"], ["Bodega", "curada"], ["Reserva", "confirmada"]],
    "Bar / cafetería en Menorca": [["7:30", "apertura"], ["Take", "away"], ["Brunch", "diario"]],
    "Peluquería en Menorca": [["Color", "experto"], ["Cita", "por diagnóstico"], ["Plan", "de cuidado"]],
    "Centro de estética en Menorca": [["Piel", "medida"], ["Cabina", "privada"], ["Plan", "facial"]],
    "Fisioterapia en Menorca": [["1:1", "sesión"], ["Plan", "activo"], ["Evolución", "medida"]],
    "Entrenador personal en Menorca": [["1:1", "coaching"], ["Fuerza", "medible"], ["Plan", "semanal"]],
    "Inmobiliaria local en Menorca": [["Valor", "real"], ["Venta", "premium"], ["Visita", "privada"]],
    "Reformas en Menorca": [["Obra", "planificada"], ["Fases", "claras"], ["Entrega", "cuidada"]],
    "Fontanería / electricidad en Menorca": [["24h", "urgencias"], ["Precio", "claro"], ["Garantía", "escrita"]],
    "Alquiler de barcos en Menorca": [["Ruta", "según viento"], ["Flota", "cuidada"], ["Check-in", "fácil"]],
    "Excursiones turísticas en Menorca": [["Guías", "locales"], ["Grupo", "reducido"], ["Ruta", "curada"]],
    "Agroturismo / alojamiento en Menorca": [["Finca", "boutique"], ["Desayuno", "local"], ["Estancia", "lenta"]],
    "Tienda local en Menorca": [["Selección", "curada"], ["Regalo", "listo"], ["Edición", "limitada"]],
    "Clínica dental en Menorca": [["Digital", "diagnóstico"], ["Plan", "por fases"], ["Trato", "sereno"]],
    "Academia en Menorca": [["Grupos", "reducidos"], ["Nivel", "medido"], ["Progreso", "visible"]],
    "Autoescuela en Menorca": [["App", "seguimiento"], ["Prácticas", "claras"], ["Examen", "seguro"]],
    "Fotografía en Menorca": [["Galería", "privada"], ["Luz", "natural"], ["Entrega", "cuidada"]],
    "Taller mecánico en Menorca": [["Diagnóstico", "claro"], ["Presupuesto", "previo"], ["Entrega", "puntual"]],
    "Limpieza / mantenimiento en Menorca": [["Checklist", "por servicio"], ["Equipo", "supervisado"], ["Plan", "temporal"]],
    "Eventos en Menorca": [["Diseño", "integral"], ["Timing", "preciso"], ["Producción", "total"]],
  };
  const stats = statSets[item.category] || [["24h", "respuesta"], ["4.9/5", "valoración"], ["Plan", "claro"]];

  return `
    <header class="hero hero-${strategy.structure.hero}">
      <div class="inner hero-inner">
        <div class="hero-copy">
          <p class="eyebrow">${escapeHtml(item.category)}</p>
          <h1>${escapeHtml(copy.title)}</h1>
          <p class="lead">${escapeHtml(copy.lead)}</p>
          <div class="actions">
            <a class="btn primary" href="#contacto">${escapeHtml(profile.cta)}</a>
            <a class="btn ghost" href="${secondaryTarget}">${escapeHtml(profile.secondary)}</a>
          </div>
        </div>
        <div class="hero-media">
          <img src="${images[0]}" alt="${escapeHtml(item.name)}" loading="eager">
        </div>
        <div class="hero-stats">
          ${stats
            .map(([value, label]) => `<div><strong>${value}</strong><span>${label}</span></div>`)
            .join("")}
        </div>
      </div>
    </header>`;
}

function renderSignature(item, profile, strategy, images, index) {
  const copy = copyFor(item.category);
  return `
    <section class="section signature"${photoStyle(pick(images, index + 1))}>
      <div class="inner signature-inner">
        <div>
          <p class="eyebrow">${escapeHtml(copy.signatureEyebrow)}</p>
          <h2>${escapeHtml(copy.signatureTitle(item.name))}</h2>
        </div>
        <p>${escapeHtml(copy.signatureText(item.name, profile, strategy))}</p>
      </div>
    </section>`;
}

function renderSpecific(item, _profile, _strategy, images, index) {
  const specific = categorySpecific[item.category];
  if (!specific) return "";

  const name = `specific-${item.slug}`;
  const filterRules = specific.filters
    .map(
      ([key]) =>
        `#${name}-${key}:checked ~ .interactive-grid article:not([data-filter="${key}"]){display:none}#${name}-${key}:checked ~ .filter-controls label[for="${name}-${key}"]{background:var(--ink);color:var(--paper);border-color:var(--ink)}`,
    )
    .join("") +
    `#${name}-all:checked ~ .filter-controls label[for="${name}-all"]{background:var(--ink);color:var(--paper);border-color:var(--ink)}`;

  return `
    <section id="interactivo" class="section interactive">
      <div class="inner">
        <div class="section-head">
          <p class="eyebrow">${escapeHtml(specific.eyebrow)}</p>
          <h2>${escapeHtml(specific.title)}</h2>
        </div>
        <div class="interactive-shell">
          <style>${filterRules}</style>
          <input class="filter-input" id="${name}-all" name="${name}" type="radio" checked>
          ${specific.filters
            .map(
              ([key]) =>
                `<input class="filter-input" id="${name}-${key}" name="${name}" type="radio">`,
            )
            .join("")}
          <div class="filter-controls" aria-label="Filtros">
            <label for="${name}-all">Todo</label>
            ${specific.filters
              .map(([key, label]) => `<label for="${name}-${key}">${escapeHtml(label)}</label>`)
              .join("")}
          </div>
          <div class="interactive-grid">
            ${specific.items
              .map(
                ([filter, title, meta, description, price], itemIndex) => `
              <article data-filter="${escapeHtml(filter)}"${photoStyle(pick(images, index + itemIndex))}>
                <div>
                  <span>${escapeHtml(meta)}</span>
                  <h3>${escapeHtml(title)}</h3>
                  <p>${escapeHtml(description)}</p>
                </div>
                <strong>${escapeHtml(price)}</strong>
              </article>`,
              )
              .join("")}
          </div>
        </div>
      </div>
    </section>`;
}

function renderServices(item, profile, _strategy, images, index) {
  const copy = copyFor(item.category);
  return `
    <section id="servicios" class="section services">
      <div class="inner">
        <div class="section-head">
          <p class="eyebrow">${escapeHtml(copy.servicesEyebrow)}</p>
          <h2>${escapeHtml(copy.servicesTitle)}</h2>
        </div>
        <div class="card-grid">
          ${profile.services
            .map(
              (service, i) => `
            <article${photoStyle(pick(images, index + i))}>
              <span>${String(i + 1).padStart(2, "0")}</span>
              <h3>${escapeHtml(service)}</h3>
              <p>${escapeHtml(copy.serviceBody)}</p>
            </article>`,
            )
            .join("")}
        </div>
      </div>
    </section>`;
}

function renderProcess(item, profile, images, index) {
  const copy = copyFor(item.category);
  return `
    <section class="section process">
      <div class="inner">
        <p class="eyebrow">${escapeHtml(copy.processEyebrow)}</p>
        <div class="steps">
          ${profile.process
            .map(
              (step, i) => `
            <div${photoStyle(pick(images, index + i + 1))}>
              <span>${i + 1}</span>
              <h3>${escapeHtml(step)}</h3>
              <p>${escapeHtml(copy.processBody)}</p>
            </div>`,
            )
            .join("")}
        </div>
      </div>
    </section>`;
}

function renderProof(item, profile, images, index) {
  const copy = copyFor(item.category);
  return `
    <section class="section proof">
      <div class="inner proof-inner">
        <div class="proof-panel"${photoStyle(pick(images, index + 2))}>
          <p class="eyebrow">${escapeHtml(copy.proofEyebrow)}</p>
          <h2>${escapeHtml(copy.proofTitle)}</h2>
        </div>
        ${profile.proof
          .map((proof, i) => `<div class="proof-item"${photoStyle(pick(images, index + i + 3))}><strong>${escapeHtml(proof)}</strong><p>${escapeHtml(copy.proofBody)}</p></div>`)
          .join("")}
      </div>
    </section>`;
}

function renderPackages(item, profile, images, index) {
  const copy = copyFor(item.category);
  return `
    <section class="section packages">
      <div class="inner">
        <div class="section-head">
          <p class="eyebrow">${escapeHtml(copy.packagesEyebrow)}</p>
          <h2>${escapeHtml(copy.packagesTitle)}</h2>
        </div>
        <div class="package-grid">
          ${profile.packages
            .map(
              (pack, i) => `
            <article class="${i === 1 ? "featured" : ""}"${photoStyle(pick(images, index + i + 1))}>
              <p>0${i + 1}</p>
              <h3>${escapeHtml(pack)}</h3>
              <span>${i === 1 ? "Recomendado" : "Disponible"}</span>
            </article>`,
            )
            .join("")}
        </div>
      </div>
    </section>`;
}

function renderGallery(images) {
  return `
    <section class="section gallery">
      <div class="inner gallery-inner">
        <div class="gallery-main"><img src="${images[1] || images[0]}" alt="" loading="lazy"></div>
        <div class="gallery-stack">
          <img src="${images[2] || images[0]}" alt="" loading="lazy">
          <img src="${images[3] || images[1] || images[0]}" alt="" loading="lazy">
        </div>
      </div>
    </section>`;
}

function renderTestimonial(item, profile, _strategy, images, index) {
  return `
    <section class="section testimonial"${photoStyle(pick(images, index + 1))}>
      <div class="inner">
        <blockquote>“Todo transmite orden, criterio y una sensación inmediata de estar en buenas manos.”</blockquote>
        <p>Cliente de ${escapeHtml(item.name)}</p>
      </div>
    </section>`;
}

function renderComparison(profile, images, index) {
  return `
    <section class="section comparison">
      <div class="inner comparison-inner">
        <div${photoStyle(pick(images, index + 2))}>
          <p class="eyebrow">Antes</p>
          <h3>Dudas, precios poco claros y demasiadas vueltas.</h3>
        </div>
        <div${photoStyle(pick(images, index + 3))}>
          <p class="eyebrow">Ahora</p>
          <h3>${escapeHtml(sentenceCase(profile.promise))}.</h3>
        </div>
      </div>
    </section>`;
}

function renderTeam(item, profile, images) {
  const copy = copyFor(item.category);
  return `
    <section class="section team">
      <div class="inner team-inner">
        <img src="${images[2] || images[0]}" alt="" loading="lazy">
        <div>
          <p class="eyebrow">Equipo</p>
          <h2>${escapeHtml(copy.teamTitle)}</h2>
          <p>${escapeHtml(copy.teamText(item.name, profile))}</p>
        </div>
      </div>
    </section>`;
}

function renderFaq(item, profile) {
  const copy = copyFor(item.category);
  return `
    <section class="section faq">
      <div class="inner faq-inner">
        <h2>${escapeHtml(copy.faqTitle)}</h2>
        ${copy.faq
          .map(
            ([question, answer], index) =>
              `<details ${index === 0 ? "open" : ""}><summary>${escapeHtml(question)}</summary><p>${escapeHtml(answer)}</p></details>`,
          )
          .join("")}
      </div>
    </section>`;
}

function renderLocation(item, profile, _strategy, images, index) {
  const copy = copyFor(item.category);
  return `
    <section class="section location"${photoStyle(pick(images, index + 1))}>
      <div class="inner location-inner">
        <div>
          <p class="eyebrow">Menorca</p>
          <h2>${escapeHtml(copy.locationTitle)}</h2>
        </div>
        <p>${escapeHtml(copy.locationText(item.name, profile))}</p>
      </div>
    </section>`;
}

function renderCtaBand(item, profile, _strategy, images, index) {
  return `
    <section id="contacto" class="section cta-band"${photoStyle(pick(images, index + 2))}>
      <div class="inner">
        <p class="eyebrow">Siguiente paso</p>
        <h2>${escapeHtml(profile.cta)} con ${escapeHtml(item.name)}</h2>
        <p>${escapeHtml(sentenceCase(profile.promise))}.</p>
        <a class="btn primary dark" href="tel:+34971000000">${escapeHtml(profile.cta)}</a>
      </div>
    </section>`;
}

function renderFooter() {
  return `
    <footer class="site-footer">
      <p>Web creada por <a href="https://proyectoix.com" target="_blank" rel="noreferrer">Proyecto IX</a></p>
    </footer>`;
}

const renderers = {
  signature: renderSignature,
  specific: renderSpecific,
  services: renderServices,
  process: (_item, profile, _strategy, images, index) =>
    renderProcess(_item, profile, images, index),
  proof: (_item, profile, _strategy, images, index) =>
    renderProof(_item, profile, images, index),
  packages: (_item, profile, _strategy, images, index) =>
    renderPackages(_item, profile, images, index),
  gallery: (_item, _profile, _strategy, images) => renderGallery(images),
  testimonial: renderTestimonial,
  comparison: (_item, profile, _strategy, images, index) =>
    renderComparison(profile, images, index),
  team: (item, profile, _strategy, images) => renderTeam(item, profile, images),
  faq: (item, profile) => renderFaq(item, profile),
  location: renderLocation,
  ctaBand: renderCtaBand,
};

function renderCss() {
  return `
@import url("https://fonts.googleapis.com/css2?family=Archivo:wght@400;600;800;900&family=Fraunces:opsz,wght@9..144,500;9..144,800&family=Inter:wght@400;600;700;800&family=Manrope:wght@400;600;800&family=Syne:wght@600;700;800&display=swap");
*{box-sizing:border-box}html{scroll-behavior:smooth}body{margin:0;font-family:var(--font-body);color:var(--ink);background:var(--paper);overflow-x:hidden}a{color:inherit;text-decoration:none}img{display:block;max-width:100%;height:auto}h1,h2,h3,p{margin-top:0}p{line-height:1.65}.site{--radius:clamp(16px,2vw,30px);--content-max:1480px;min-height:100vh;background:radial-gradient(circle at 8% 8%,color-mix(in srgb,var(--accent) 18%,transparent),transparent 28%),linear-gradient(135deg,var(--paper),color-mix(in srgb,var(--paper) 85%,var(--soft)))}.nav{position:fixed;z-index:20;top:16px;left:50%;transform:translateX(-50%);width:min(var(--content-max),calc(100% - 32px));display:flex;align-items:center;justify-content:space-between;gap:16px;padding:10px 14px;border:1px solid color-mix(in srgb,var(--ink) 18%,transparent);border-radius:999px;background:color-mix(in srgb,var(--paper) 94%,white 8%);backdrop-filter:blur(18px);box-shadow:0 20px 60px #00000022}.brand{font-weight:900;letter-spacing:-.03em}.nav div{display:flex;gap:8px;align-items:center}.nav a:not(.brand){padding:9px 12px;border-radius:999px;font-size:.85rem;font-weight:800;color:color-mix(in srgb,var(--ink) 86%,transparent)}.nav a:not(.brand):hover{background:color-mix(in srgb,var(--ink) 9%,transparent);color:var(--ink)}.back{border:1px solid color-mix(in srgb,var(--ink) 12%,transparent)}.hero{min-height:100svh;padding:110px clamp(18px,5vw,72px) 52px}.inner{width:min(var(--content-max),100%);margin-inline:auto}.hero-inner{display:grid;gap:clamp(24px,4vw,56px);align-items:center}.hero-copy{position:relative;z-index:2}.eyebrow{text-transform:uppercase;letter-spacing:.18em;font-size:.74rem;font-weight:900;color:color-mix(in srgb,var(--accent) 58%,var(--ink));margin-bottom:14px}.hero h1{font-family:var(--font-display);font-size:clamp(2.7rem,5.2vw,6.4rem);line-height:.88;letter-spacing:-.065em;max-width:980px;margin-bottom:24px}.lead{font-size:clamp(1.08rem,1.8vw,1.45rem);max-width:680px;color:color-mix(in srgb,var(--ink) 88%,transparent)}.actions{display:flex;flex-wrap:wrap;gap:12px;margin-top:28px}.btn{display:inline-flex;align-items:center;justify-content:center;min-height:46px;padding:0 18px;border-radius:999px;font-weight:900;border:1px solid color-mix(in srgb,var(--ink) 15%,transparent);transition:transform .2s,box-shadow .2s,background .2s}.btn:hover{transform:translateY(-2px)}.primary{background:var(--ink);color:var(--paper);box-shadow:0 18px 40px #00000020}.ghost{background:#fff;color:#111;border-color:#00000024;backdrop-filter:blur(10px);box-shadow:0 12px 32px #00000018}.dark{background:#111;color:#fff}.hero-media{position:relative;border-radius:var(--radius);overflow:hidden;min-height:420px;box-shadow:0 30px 90px #00000026}.hero-media img{width:100%;height:100%;min-height:420px;object-fit:cover}.hero-stats{display:grid;grid-template-columns:repeat(3,1fr);gap:10px}.hero-stats div{border:1px solid color-mix(in srgb,var(--ink) 18%,transparent);border-radius:18px;padding:16px;background:color-mix(in srgb,var(--paper) 94%,white 8%)}.hero-stats strong{display:block;font-size:1.8rem;line-height:1;color:var(--ink)}.hero-stats span{font-size:.86rem;color:color-mix(in srgb,var(--ink) 82%,transparent);font-weight:700}.section{padding:clamp(54px,8vw,116px) clamp(18px,5vw,72px)}.section h2{font-family:var(--font-display);font-size:clamp(2rem,4.4vw,5rem);line-height:.95;letter-spacing:-.055em;margin-bottom:18px}.section-head{display:flex;justify-content:space-between;align-items:end;gap:24px;margin-bottom:26px}.section-head h2{max-width:760px;text-align:right;margin-left:auto}.signature-inner{display:grid;grid-template-columns:minmax(0,1.1fr) minmax(280px,.9fr);gap:clamp(24px,5vw,70px);align-items:end;position:relative;overflow:hidden}.signature-inner:after{content:"";min-height:360px;border-radius:var(--radius);background:linear-gradient(#00000010,#00000025),var(--photo) center/cover;box-shadow:0 28px 70px #00000020}.signature-inner p:last-child{font-size:clamp(1.05rem,1.8vw,1.35rem);color:color-mix(in srgb,var(--ink) 88%,transparent)}.card-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:12px}.card-grid article,.proof-item,.package-grid article,.steps div,.faq details{border:1px solid color-mix(in srgb,var(--ink) 18%,transparent);border-radius:var(--radius);padding:22px;background:color-mix(in srgb,var(--paper) 96%,white 12%);box-shadow:0 18px 50px #00000012}.card-grid article,.proof-item,.package-grid article,.steps div{position:relative;overflow:hidden}.card-grid article:before,.proof-item:before,.steps div:before{content:"";display:block;height:112px;margin:-22px -22px 18px;background:linear-gradient(#00000005,#00000030),var(--photo) center/cover}.card-grid span,.steps span,.package-grid p{font-family:monospace;color:color-mix(in srgb,var(--accent) 55%,var(--ink));font-weight:900}.card-grid h3,.steps h3,.package-grid h3{font-size:1.25rem;margin-bottom:10px}.card-grid p,.proof-item p,.faq p{color:color-mix(in srgb,var(--ink) 86%,transparent)}.package-grid p,.package-grid span{color:#fff}.process .steps span{color:#fff}.process{background:var(--ink);color:var(--paper)}.process .eyebrow{color:#fff}.steps{display:grid;grid-template-columns:repeat(4,1fr);gap:14px}.steps div{background:color-mix(in srgb,var(--paper) 9%,transparent);border-color:color-mix(in srgb,var(--paper) 16%,transparent)}.steps p{color:color-mix(in srgb,var(--paper) 90%,transparent)}.proof-inner{display:grid;grid-template-columns:1.2fr repeat(3,1fr);gap:14px}.proof-panel{position:relative;overflow:hidden;border-radius:var(--radius);padding:28px;background:var(--accent);color:#fff;min-height:320px;display:flex;flex-direction:column;justify-content:end}.proof-panel:before{content:"";position:absolute;inset:0;background:linear-gradient(180deg,#00000073,#000000df),var(--photo) center/cover;z-index:0}.proof-panel>*{position:relative;z-index:1}.proof-panel .eyebrow{color:#fff}.proof-item strong{display:block;font-size:1.1rem;margin-bottom:10px}.packages{background:color-mix(in srgb,var(--soft) 24%,var(--paper))}.package-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:14px}.package-grid article{min-height:250px;display:flex;flex-direction:column;justify-content:space-between;color:#fff;background:linear-gradient(180deg,#0000008c,#000000ee),var(--photo) center/cover}.package-grid .featured{background:linear-gradient(180deg,#00000094,#000000f2),var(--photo) center/cover;color:#fff;transform:translateY(-10px)}.package-grid span{font-weight:900;color:#fff}.interactive{background:color-mix(in srgb,var(--paper) 92%,white 10%)}.interactive-shell{display:grid;gap:22px}.filter-input{position:absolute;opacity:0;pointer-events:none}.filter-controls{display:flex;flex-wrap:wrap;gap:10px}.filter-controls label{cursor:pointer;min-height:42px;display:inline-flex;align-items:center;justify-content:center;border:1px solid color-mix(in srgb,var(--ink) 18%,transparent);border-radius:999px;background:color-mix(in srgb,var(--paper) 98%,white 8%);color:color-mix(in srgb,var(--ink) 88%,transparent);padding:0 15px;font-weight:900;transition:background .2s,color .2s,border-color .2s,transform .2s}.filter-controls label:hover{transform:translateY(-1px);border-color:color-mix(in srgb,var(--ink) 38%,transparent)}.interactive-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:14px}.interactive-grid article{position:relative;overflow:hidden;min-height:260px;border:1px solid color-mix(in srgb,var(--ink) 16%,transparent);border-radius:var(--radius);padding:18px;display:flex;flex-direction:column;justify-content:space-between;background:linear-gradient(180deg,#00000052,#000000e8),var(--photo) center/cover;color:#fff;box-shadow:0 18px 50px #00000018}.interactive-grid article span{font-size:.78rem;font-weight:900;text-transform:uppercase;letter-spacing:.12em;color:#fff}.interactive-grid article h3{font-size:1.25rem;margin:10px 0 8px}.interactive-grid article p{color:#fff;margin-bottom:16px}.interactive-grid article strong{align-self:flex-start;border-radius:999px;background:#fff;color:#111;padding:8px 11px;font-weight:900}.gallery-inner{display:grid;grid-template-columns:1.4fr .8fr;gap:14px}.gallery img{width:100%;height:100%;object-fit:cover;border-radius:var(--radius);min-height:260px}.gallery-stack{display:grid;gap:14px}.testimonial{position:relative;overflow:hidden;padding-left:clamp(28px,12vw,180px);padding-right:clamp(28px,12vw,180px);text-align:center;color:#fff;background:linear-gradient(#000000d6,#000000d6),var(--photo) center/cover}.testimonial blockquote{font-family:var(--font-display);font-size:clamp(2rem,4.5vw,5.4rem);line-height:1;letter-spacing:-.055em;margin:0 0 22px}.comparison-inner{display:grid;grid-template-columns:1fr 1fr;gap:14px}.comparison-inner>div{padding:clamp(24px,4vw,46px);border-radius:var(--radius);background:linear-gradient(180deg,#000000b8,#000000f0),var(--photo) center/cover;color:#fff;min-height:340px;display:flex;flex-direction:column;justify-content:end}.comparison-inner>div+div{background:linear-gradient(180deg,#000000a8,#000000e8),var(--photo) center/cover}.comparison-inner h3{font-family:var(--font-display);font-size:clamp(1.8rem,3.2vw,3.7rem);line-height:1;letter-spacing:-.045em}.team-inner{display:grid;grid-template-columns:.8fr 1fr;gap:clamp(24px,5vw,70px);align-items:center}.team-inner img{border-radius:var(--radius);width:100%;height:520px;object-fit:cover}.faq-inner{display:grid;grid-template-columns:.8fr 1.2fr;gap:14px}.faq-inner h2{grid-row:span 3}.faq summary{font-weight:900;cursor:pointer}.location{position:relative;overflow:hidden;background:linear-gradient(90deg,color-mix(in srgb,var(--paper) 98%,white 8%),color-mix(in srgb,var(--paper) 92%,white 6%)),var(--photo) right center/50% 100% no-repeat}.location-inner{display:grid;grid-template-columns:1fr 1fr;gap:24px;align-items:center}.right-column-copy{align-self:center;justify-self:end;text-align:right;max-width:620px}.signature-inner>p:last-child,.team-inner>div,.location-inner>p{align-self:center;justify-self:end;text-align:right;max-width:620px}.team-inner>div .eyebrow{margin-left:auto}.cta-band{position:relative;overflow:hidden;text-align:center;background:linear-gradient(#000000d8,#000000d8),var(--photo) center/cover;color:#fff}.cta-band .eyebrow{color:#fff}.cta-band p{margin-left:auto;margin-right:auto;max-width:680px;color:#fff}.site-footer{padding:22px clamp(18px,5vw,72px);background:#050505;color:#ffffffb8;text-align:center;font-size:.88rem;font-weight:700}.site-footer a{color:#fff;text-decoration:underline;text-underline-offset:4px}.hero-split-editorial .hero-inner{grid-template-columns:1.05fr .95fr}.hero-full-bleed-reserve{position:relative;isolation:isolate}.hero-full-bleed-reserve .hero-inner{grid-template-columns:1fr}.hero-full-bleed-reserve .hero-media{position:absolute;inset:0;border-radius:0;z-index:0;min-height:100%;filter:saturate(.95)}.hero-full-bleed-reserve .hero-media:after{content:"";position:absolute;inset:0;background:linear-gradient(90deg,#000000f0,#000000a8)}.hero-full-bleed-reserve .hero-copy{color:#fff;max-width:820px}.hero-full-bleed-reserve .ghost{background:#fff;color:#111;border-color:#ffffffcc}.hero-full-bleed-reserve .lead{color:#fff}.hero-full-bleed-reserve .hero-stats{position:relative;z-index:2;color:#fff;max-width:760px}.hero-full-bleed-reserve .hero-stats div{background:#000000d4;border-color:#ffffff78}.hero-full-bleed-reserve .hero-stats strong,.hero-full-bleed-reserve .hero-stats span{color:#fff}.hero-stacked-magazine .hero-inner{grid-template-columns:1fr}.hero-stacked-magazine .hero-media{min-height:58vh}.hero-asymmetric-panel .hero-inner{grid-template-columns:.8fr 1.2fr}.hero-asymmetric-panel .hero-copy{padding:clamp(22px,4vw,46px);border-radius:var(--radius);background:color-mix(in srgb,var(--paper) 72%,transparent);box-shadow:0 24px 80px #00000018}.hero-cinematic-minimal{background:var(--ink);color:#fff}.hero-cinematic-minimal .hero-inner{grid-template-columns:1.1fr .9fr}.hero-cinematic-minimal .lead{color:#fff}.hero-service-dashboard .hero-inner{grid-template-columns:1fr 1fr}.hero-service-dashboard .hero-stats{grid-column:1 / -1}.hero-gallery-first .hero-inner{grid-template-columns:.9fr 1.1fr}.hero-gallery-first .hero-media{order:-1}.hero-luxury-letter .hero-inner{grid-template-columns:1fr .75fr}.hero-luxury-letter h1{font-family:Fraunces,serif;font-weight:800}.hero-proof-led .hero-inner{grid-template-columns:1fr 1fr}.hero-proof-led .hero-stats{grid-column:1;grid-row:2}.hero-booking-card .hero-inner{grid-template-columns:1fr .9fr}.hero-booking-card .hero-copy:after{content:"Reserva prioritaria";display:block;width:max-content;margin-top:20px;padding:12px 16px;border-radius:999px;background:#111;color:#fff;font-weight:900}@media (max-width:920px){.hero h1{font-size:2.05rem;line-height:1;max-width:100%;overflow-wrap:break-word}.hero-copy,.lead{max-width:100%}.lead{font-size:1.02rem}.nav{top:10px;width:calc(100% - 20px)}.nav div{display:none}.hero-inner,.signature-inner,.proof-inner,.gallery-inner,.comparison-inner,.team-inner,.faq-inner,.location-inner{grid-template-columns:1fr}.signature-inner:after{min-height:260px}.hero{padding-top:96px}.hero-stats{grid-template-columns:1fr;max-width:100%}.hero-media,.hero-media img{min-height:340px}.hero-full-bleed-reserve .hero-media{position:absolute;min-height:100%}.card-grid,.steps,.package-grid,.interactive-grid{grid-template-columns:1fr}.proof{display:grid}.section-head{display:block}.section-head h2{text-align:left;margin-left:0}.team-inner img{height:360px}.location{background:linear-gradient(#ffffffe8,#ffffffe8),var(--photo) center/cover}.signature-inner>p:last-child,.team-inner>div,.location-inner>p{text-align:left;justify-self:stretch;max-width:none}.team-inner>div .eyebrow{margin-left:0}.package-grid .featured{transform:none}}`;
}

function renderPage(item, index) {
  const profile = categoryProfiles[item.category];
  const copy = copyFor(item.category);
  const navTarget = categorySpecific[item.category] ? "#interactivo" : "#servicios";
  const strategy = buildStrategy(item, index);
  const images = pageImages(item, index);
  const [ink, paper, accent, soft] = strategy.palette;
  const fontBody = pick(["Inter, system-ui, sans-serif", "Manrope, system-ui, sans-serif", "Archivo, system-ui, sans-serif"], index);
  const fontDisplay = pick(["Syne, system-ui, sans-serif", "Fraunces, Georgia, serif", "Archivo, system-ui, sans-serif"], index + 1);
  const sections = strategy.structure.sections
    .map((key) => renderers[key](item, profile, strategy, images, index))
    .join("\n");

  return {
    strategy,
    html: `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="robots" content="noindex,nofollow">
  <meta name="googlebot" content="noindex,nofollow">
  <meta name="description" content="${escapeHtml(profile.promise)}">
  <title>${escapeHtml(item.title)}</title>
  <link rel="stylesheet" href="/prototipos-static/premium.css">
  <style>:root{--ink:${ink};--paper:${paper};--accent:${accent};--soft:${soft};--font-body:${fontBody};--font-display:${fontDisplay}}</style>
</head>
<body>
  <main class="site">
    <nav class="nav">
      <a class="brand" href="/plantillas">${escapeHtml(item.name)}</a>
      <div>
        <a href="${navTarget}">${escapeHtml(copy.nav)}</a>
        <a href="#contacto">${escapeHtml(profile.cta)}</a>
        <a class="back" href="/plantillas">Índice</a>
      </div>
    </nav>
    ${renderHero(item, profile, strategy, images, index)}
    ${sections}
    ${
      strategy.structure.sections.includes("ctaBand")
        ? ""
        : renderCtaBand(item, profile, strategy, images, index)
    }
    ${renderFooter()}
  </main>
</body>
</html>`,
  };
}

fs.mkdirSync(outRoot, { recursive: true });
fs.writeFileSync(cssPath, renderCss());

const strategies = [];
for (const [index, item] of prototypes.entries()) {
  const { html, strategy } = renderPage(item, index);
  const dir = path.join(outRoot, item.slug);
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(path.join(dir, "index.html"), html);
  strategies.push(strategy);
}

fs.writeFileSync(strategyPath, `${JSON.stringify(strategies, null, 2)}\n`);
console.log(`Generated ${prototypes.length} premium prototypes`);
console.log(`Wrote ${path.relative(root, strategyPath)}`);

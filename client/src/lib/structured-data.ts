const SITE_URL = "https://proyectoix.com";

export const organizationLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": `${SITE_URL}/#organization`,
  name: "Proyecto IX",
  alternateName: ["IX", "Proyecto IX Studio"],
  url: SITE_URL,
  logo: {
    "@type": "ImageObject",
    url: `${SITE_URL}/favicon.png`,
    width: 512,
    height: 512,
  },
  image: `${SITE_URL}/opengraph.jpg`,
  description:
    "Estudio de diseño y desarrollo web en Menorca. Webs a medida, rápidas, con SEO local e inteligencia artificial integrada.",
  email: "hola@proyectoix.com",
  founder: [
    {
      "@type": "Person",
      "@id": `${SITE_URL}/#izan`,
      name: "Izan Sánchez",
      givenName: "Izan",
      jobTitle: "Desarrollo y rendimiento",
      worksFor: { "@id": `${SITE_URL}/#organization` },
      knowsAbout: ["Desarrollo web", "React", "Rendimiento web", "Frontend"],
    },
    {
      "@type": "Person",
      "@id": `${SITE_URL}/#xaloc`,
      name: "Xaloc",
      givenName: "Xaloc",
      jobTitle: "Estrategia y producto",
      worksFor: { "@id": `${SITE_URL}/#organization` },
      knowsAbout: ["Estrategia digital", "Marketing", "UX", "Conversión"],
    },
  ],
  sameAs: ["https://www.instagram.com/proyecto.ix/"],
  areaServed: {
    "@type": "AdministrativeArea",
    name: "Menorca",
  },
};

export const localBusinessLd = {
  "@context": "https://schema.org",
  "@type": ["LocalBusiness", "ProfessionalService"],
  "@id": `${SITE_URL}/#localbusiness`,
  name: "Proyecto IX",
  image: `${SITE_URL}/opengraph.jpg`,
  url: SITE_URL,
  email: "hola@proyectoix.com",
  priceRange: "€€",
  description:
    "Agencia de diseño y desarrollo web en Menorca. SEO local, marketing digital y webs a medida para negocios pequeños y medianos.",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Maó",
    addressRegion: "Islas Baleares",
    addressCountry: "ES",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 39.8885,
    longitude: 4.2658,
  },
  areaServed: [
    { "@type": "AdministrativeArea", name: "Menorca" },
    { "@type": "City", name: "Maó" },
    { "@type": "City", name: "Ciutadella de Menorca" },
    { "@type": "City", name: "Alaior" },
    { "@type": "City", name: "Es Mercadal" },
    { "@type": "City", name: "Ferreries" },
    { "@type": "City", name: "Sant Lluís" },
    { "@type": "AdministrativeArea", name: "Islas Baleares" },
  ],
  knowsAbout: [
    "Diseño web Menorca",
    "Desarrollo web Menorca",
    "Marketing Menorca",
    "Agencia de marketing Menorca",
    "Posicionamiento SEO local",
    "SEO Menorca",
    "WordPress",
    "React",
    "Inteligencia artificial",
  ],
  openingHoursSpecification: {
    "@type": "OpeningHoursSpecification",
    dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
    opens: "09:00",
    closes: "19:00",
  },
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Servicios de Proyecto IX",
    itemListElement: [
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Diseño web a medida en Menorca",
          serviceType: "Diseño web",
          areaServed: "Menorca",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Desarrollo web profesional en Menorca",
          serviceType: "Desarrollo web",
          areaServed: "Menorca",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Posicionamiento SEO local en Menorca",
          serviceType: "SEO",
          areaServed: "Menorca",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Marketing digital y estrategia online",
          serviceType: "Marketing digital",
          areaServed: "Menorca",
        },
      },
    ],
  },
};

export const websiteLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${SITE_URL}/#website`,
  name: "Proyecto IX",
  url: SITE_URL,
  inLanguage: "es-ES",
  publisher: { "@id": `${SITE_URL}/#organization` },
};

export function webPageLd(opts: {
  url: string;
  name: string;
  description: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${opts.url}#webpage`,
    url: opts.url,
    name: opts.name,
    description: opts.description,
    inLanguage: "es-ES",
    isPartOf: { "@id": `${SITE_URL}/#website` },
    about: { "@id": `${SITE_URL}/#organization` },
    primaryImageOfPage: `${SITE_URL}/opengraph.jpg`,
  };
}

export function breadcrumbLd(items: Array<{ name: string; url: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

export function faqPageLd(faqs: Array<{ question: string; answer: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map(({ question, answer }) => ({
      "@type": "Question",
      name: question,
      acceptedAnswer: {
        "@type": "Answer",
        text: answer,
      },
    })),
  };
}

export const SITE_URL_CONST = SITE_URL;

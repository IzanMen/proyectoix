import { SubscribePage } from "@/components/landing/SubscribePage";
import { webPageLd, breadcrumbLd } from "@/lib/structured-data";

export default function EmailDiario() {
  return (
    <SubscribePage
      seo={{
        title: "Email diario · Proyecto IX | Sigue el avance del proyecto",
        description:
          "Recibe cada día un email breve para ver cómo avanza Proyecto IX desde dentro: decisiones, aprendizajes, errores y progreso real.",
        canonical: "https://proyectoix.com/email-diario",
        jsonLd: [
          webPageLd({
            url: "https://proyectoix.com/email-diario",
            name: "Email diario · Proyecto IX",
            description:
              "Un email diario para seguir desde dentro cómo avanza Proyecto IX.",
          }),
          breadcrumbLd([
            { name: "Inicio", url: "https://proyectoix.com/" },
            {
              name: "Email diario",
              url: "https://proyectoix.com/email-diario",
            },
          ]),
        ],
      }}
      successTitle="Estás dentro"
      successMessage="Te acabamos de mandar un email de confirmación. Pulsa el enlace dentro para verificar tu email."
      successImportant="IMPORTANTE: si no lo has recibido, revisa tu carpeta de PROMOCIONES."
      successBox="Después de confirmar, recibirás el email diario de Proyecto IX"
      headline="Sigue Proyecto IX desde dentro"
      intro="Un email diario para ver cómo avanza Proyecto IX mientras ocurre: lo que construimos, lo que aprendemos, lo que sale bien y lo que todavía estamos ajustando."
      offerLabel="Lo que vas a recibir:"
      offerTitle="Un diario abierto de Proyecto IX + consejos de marketing y RRSS para negocios locales."
      offerBody="Correos cortos, honestos y accionables sobre webs, clientes, decisiones, aprendizajes y el camino de levantar un negocio desde Menorca."
      buttonLabel="Quiero seguir el proyecto"
      afterSubmitIntro="Cada día te enviaremos una pieza breve sobre:"
      bullets={[
        "Avances reales de Proyecto IX: webs, campañas, procesos y decisiones.",
        "Aprendizajes de negocio, diseño, ventas e inteligencia artificial aplicados de verdad.",
        "La historia de Izan y Xaloc montando Proyecto IX desde cero en Menorca.",
      ]}
      author="Escrito por Izan, desde Menorca. Sin spam."
    />
  );
}

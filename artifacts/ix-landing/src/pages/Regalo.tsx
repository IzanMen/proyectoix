import { SubscribePage } from "@/components/landing/SubscribePage";
import { webPageLd, breadcrumbLd } from "@/lib/structured-data";

export default function Regalo() {
  return (
    <SubscribePage
      seo={{
        title:
          "Tu guía gratuita · Proyecto IX | Los 5 errores que arruinan tu web",
        description:
          "Descarga gratis la guía: los 5 errores que cometen el 90% de las webs en Menorca y cómo solucionarlos. Solo tienes que dejar tu email.",
        canonical: "https://proyectoix.com/regalo",
        jsonLd: [
          webPageLd({
            url: "https://proyectoix.com/regalo",
            name: "Tu guía gratuita · Proyecto IX",
            description:
              "Guía gratuita: los 5 errores que cometen el 90% de las webs en Menorca y cómo solucionarlos.",
          }),
          breadcrumbLd([
            { name: "Inicio", url: "https://proyectoix.com/" },
            { name: "Guía gratuita", url: "https://proyectoix.com/regalo" },
          ]),
        ],
      }}
      successTitle="Guía en camino"
      successMessage="Te acabamos de mandar un email de confirmación. Pulsa el enlace dentro para verificar tu email."
      successImportant="IMPORTANTE: Si no lo has recibido, revisa tu carpeta de PROMOCIONES."
      successBox="Después de confirmar, recibirás la GUÍA GRATUITA"
      headline="Aquí tienes la guía gratuita"
      intro={
        <>
          Si acabas de ver el vídeo, ya sabes los 5 errores que hacen que tu web
          no traiga clientes. <b>Pero necesitas saber cómo solucionarlos.</b>
        </>
      }
      offerLabel="Lo que recibes:"
      offerTitle="«Los 5 errores que cometen el 90% de las webs (y cómo solucionarlos paso a paso)»"
      offerBody="Una guía directa que puedes aplicar hoy mismo. Sin técnicas raras, sin costes extra."
      buttonLabel="Quiero la guía"
      afterSubmitIntro="También entrarás en nuestro email diario, donde enviamos cada día un mensaje en el que contamos:"
      bullets={[
        "Técnicas para atraer más clientes a tu negocio.",
        "Cómo evoluciona nuestra historia: 2 chavales de 16 y 17 años montando un negocio desde 0 en Menorca.",
      ]}
      author="Escrito por Izan y Xaloc, desde Menorca. Sin spam, sin técnicas raras."
    />
  );
}

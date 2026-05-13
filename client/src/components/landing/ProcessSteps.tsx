import { motion } from "framer-motion";
import { ClipboardList, Search, MessageSquare, Sparkles } from "lucide-react";
import { FadeIn } from "../layout/FadeIn";

const steps = [
  {
    icon: ClipboardList,
    n: "01",
    title: "Rellenas el formulario",
    text: "5 preguntas. Menos de 1 minuto. Nos cuentas lo básico de tu negocio y de tu web.",
  },
  {
    icon: Search,
    n: "02",
    title: "Analizamos tu caso",
    text: "Revisamos tu web (o tu situación si no tienes) y preparamos los puntos clave que debe cumplir tu web.",
  },
  {
    icon: MessageSquare,
    n: "03",
    title: "Te escribimos por WhatsApp",
    text: "Te explicamos qué debe tener tu web y resolvemos tus dudas. Sin rodeos. Sin compromiso.",
  },
];

export function ProcessSteps() {
  return (
    <section
      aria-labelledby="process-title"
      className="relative py-24 md:py-32 overflow-hidden border-t border-white/5"
    >
      <div className="relative z-10 w-full max-w-6xl mx-auto px-6 md:px-12">
        <FadeIn>
          <div className="text-center mb-14">
            <span className="inline-flex items-center gap-2 px-3 py-1 mb-6 rounded-full bg-white/5 border border-white/10 text-white/65 text-[11px] tracking-widest uppercase">
              Siguientes pasos
            </span>
            <h2
              id="process-title"
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-display font-bold tracking-tight text-white leading-[1.05]"
            >
              Qué pasa cuando rellenas el formulario.
            </h2>
          </div>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6">
          {steps.map((s, i) => (
            <motion.div
              key={s.n}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="relative rounded-2xl border border-white/10 bg-gradient-to-b from-white/[0.04] to-transparent p-7 md:p-8 hover:border-[hsl(270,100%,60%)]/40 transition-colors"
              data-testid={`card-step-${s.n}`}
            >
              <div className="flex items-start justify-between mb-6">
                <div className="w-12 h-12 rounded-xl bg-[hsl(270,100%,60%)]/10 border border-[hsl(270,100%,60%)]/30 flex items-center justify-center text-[hsl(270,100%,80%)]">
                  <s.icon className="w-6 h-6" />
                </div>
                <span className="text-3xl font-display font-bold text-white/15">
                  {s.n}
                </span>
              </div>
              <h3 className="text-xl md:text-2xl font-display font-bold text-white mb-3">
                {s.title}
              </h3>
              <p className="text-white/60 text-sm md:text-base leading-relaxed">
                {s.text}
              </p>
            </motion.div>
          ))}
        </div>

        <FadeIn delay={0.3}>
          <p className="mt-10 text-center text-white/55 text-sm md:text-base max-w-2xl mx-auto leading-relaxed">
            Si tras esa conversación tiene sentido, te enviamos un presupuesto
            adaptado a tu caso. Si no, no pasa nada.{" "}
            <span className="text-white/80">No te perseguimos.</span>
          </p>
        </FadeIn>

        <FadeIn delay={0.4}>
          <div className="mt-10 max-w-3xl mx-auto rounded-2xl border border-[hsl(270,100%,60%)]/30 bg-[hsl(270,100%,60%)]/[0.06] p-6 md:p-7 flex items-start gap-4">
            <div className="shrink-0 w-10 h-10 rounded-full bg-[hsl(270,100%,60%)]/20 flex items-center justify-center text-[hsl(270,100%,80%)]">
              <Sparkles className="w-5 h-5" />
            </div>
            <p className="text-white text-base md:text-lg leading-relaxed">
              Nos encargamos de todo el proceso.{" "}
              <span className="text-white/65">
                Tú solo nos cuentas qué necesitas.
              </span>
            </p>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

import { motion } from "framer-motion";
import { Code2, Target, Instagram, MapPin, ExternalLink } from "lucide-react";
import { FadeIn } from "../layout/FadeIn";

interface FounderProps {
  name: string;
  age: number;
  role: string;
  tag: string;
  icon: typeof Code2;
  delay?: number;
}

function FounderCard({ name, age, role, tag, icon: Icon, delay = 0 }: FounderProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay }}
      className="relative group rounded-2xl border border-white/10 bg-gradient-to-b from-white/[0.04] to-transparent p-6 md:p-8 overflow-hidden hover:border-[hsl(270,100%,60%)]/40 transition-colors"
      data-testid={`card-founder-${name.toLowerCase()}`}
    >
      <div
        className="absolute -top-12 -right-12 w-40 h-40 rounded-full bg-[hsl(270,100%,60%)]/20 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        aria-hidden="true"
      />

      <div className="relative flex items-start justify-between mb-6">
        <div className="w-14 h-14 rounded-xl bg-[hsl(270,100%,60%)]/10 border border-[hsl(270,100%,60%)]/30 flex items-center justify-center text-[hsl(270,100%,80%)]">
          <Icon className="w-7 h-7" />
        </div>
        <span className="text-[11px] font-mono text-white/40 uppercase tracking-widest">
          {age} años
        </span>
      </div>

      <h3 className="relative text-3xl md:text-4xl font-display font-bold text-white">
        {name}
      </h3>
      <p className="relative mt-1 text-[hsl(270,100%,80%)] text-sm font-medium">
        {role}
      </p>

      <p className="relative mt-5 text-white/65 text-base leading-relaxed">
        {tag}
      </p>
    </motion.div>
  );
}

const stats = [
  { value: "+30", label: "webs construidas" },
  { value: "100%", label: "en Menorca" },
  { value: "16-17", label: "años con hambre" },
];

export function AboutVisual() {
  return (
    <section
      aria-labelledby="about-title"
      className="relative py-24 md:py-32 overflow-hidden border-t border-white/5"
    >
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-[hsl(270,100%,60%)]/5 rounded-full blur-[120px]" />
      </div>

      <div className="relative z-10 w-full max-w-6xl mx-auto px-6 md:px-12">
        <FadeIn>
          <div className="text-center mb-14">
            <span className="inline-flex items-center gap-2 px-3 py-1 mb-6 rounded-full bg-white/5 border border-white/10 text-white/65 text-[11px] tracking-widest uppercase">
              <MapPin className="w-3 h-3" />
              Menorca
            </span>
            <h2
              id="about-title"
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-display font-bold tracking-tight text-white leading-[1.05]"
            >
              Somos{" "}
              <span className="bg-gradient-to-r from-white via-[hsl(270,100%,80%)] to-white bg-clip-text text-transparent">
                Izan y Xaloc
              </span>
              .
              <br />
              <span className="text-white/45">Dos chavales de Menorca.</span>
            </h2>
          </div>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6 mb-12">
          <FounderCard
            name="Izan"
            age={17}
            role="Desarrollo & técnica"
            tag="Programa desde los 12. Sabe qué funciona y qué no."
            icon={Code2}
          />
          <FounderCard
            name="Xaloc"
            age={16}
            role="Estrategia & objetivo"
            tag="Hace que la web exista para algo. Y que lo cumpla."
            icon={Target}
            delay={0.1}
          />
        </div>

        <FadeIn delay={0.2}>
          <div className="rounded-2xl border border-white/10 bg-white/[0.02] backdrop-blur-sm p-6 md:p-8">
            <div className="grid grid-cols-1 md:grid-cols-[1fr,auto,1fr] gap-6 md:gap-8 items-center">
              <div className="grid grid-cols-3 gap-4">
                {stats.map((s) => (
                  <div key={s.label} className="text-center">
                    <div className="text-2xl md:text-3xl font-display font-bold text-white">
                      {s.value}
                    </div>
                    <p className="mt-1 text-white/50 text-[11px] md:text-xs leading-tight">
                      {s.label}
                    </p>
                  </div>
                ))}
              </div>

              <div
                className="hidden md:block w-px h-16 bg-white/10"
                aria-hidden="true"
              />

              <div className="text-center md:text-left">
                <p className="text-white/65 text-sm md:text-base leading-relaxed mb-3">
                  Lo documentamos todo en Instagram. Puedes ver exactamente
                  cómo trabajamos antes de hablar con nosotros.
                </p>
                <a
                  href="https://www.instagram.com/proyecto.ix/"
                  target="_blank"
                  rel="noopener noreferrer"
                  data-testid="link-about-instagram"
                  className="group inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-white text-black text-sm font-bold hover:scale-[1.02] transition-transform"
                >
                  <Instagram className="w-4 h-4" />
                  @proyecto.ix
                  <ExternalLink className="w-3.5 h-3.5 opacity-60 group-hover:opacity-100 transition-opacity" />
                </a>
              </div>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

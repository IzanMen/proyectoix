import { Link } from "wouter";
import { motion } from "framer-motion";
import { InteractiveBackground } from "@/components/layout/InteractiveBackground";

export default function Confirmado() {
  return (
    <div className="relative min-h-screen bg-background text-foreground overflow-hidden">
      <InteractiveBackground />

      <div className="relative z-10 flex flex-col min-h-screen">
        <header className="px-6 py-6 md:px-12">
          <Link href="/">
            <a
              className="text-2xl font-bold tracking-tight hover-elevate inline-block px-2 py-1 rounded"
              data-testid="link-home"
            >
              IX.
            </a>
          </Link>
        </header>

        <main className="flex-1 flex items-center justify-center px-6 py-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-2xl text-center"
          >
            <h1
              className="text-4xl md:text-6xl font-bold mb-6 leading-tight"
              data-testid="text-confirmed-title"
            >
              Tu email ya está{" "}
              <span style={{ color: "hsl(270, 100%, 60%)" }}>confirmado</span>.
            </h1>
            <p
              className="text-lg md:text-xl text-muted-foreground mb-10"
              data-testid="text-confirmed-message"
            >
              Mañana recibirás nuestro primer email diario.
            </p>
            <Link href="/">
              <a
                className="inline-block px-8 py-4 rounded-full font-semibold text-white transition-all hover-elevate"
                style={{ backgroundColor: "hsl(270, 100%, 60%)" }}
                data-testid="link-back-home"
              >
                Volver al inicio
              </a>
            </Link>
          </motion.div>
        </main>
      </div>
    </div>
  );
}

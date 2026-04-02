import { Link } from "wouter";
import { AlertCircle } from "lucide-react";
import { FadeIn } from "@/components/layout/FadeIn";

export default function NotFound() {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-background text-foreground">
      <div className="max-w-md mx-4 text-center">
        <FadeIn>
          <div className="flex justify-center mb-6">
            <AlertCircle className="h-12 w-12 text-white/20" />
          </div>
          <h1 className="text-4xl font-display font-bold mb-4">404</h1>
          <p className="text-white/60 mb-8">
            Página no encontrada.
          </p>
          
          <Link href="/" className="inline-block px-6 py-3 bg-white text-black font-medium text-sm rounded-sm hover:bg-white/90 transition-colors">
              Volver al inicio
          </Link>
        </FadeIn>
      </div>
    </div>
  );
}

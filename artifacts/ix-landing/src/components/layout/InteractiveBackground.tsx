import { useEffect, useRef, useState } from "react";

type Mode = "idle" | "static" | "animate";

const STATIC_GRADIENT =
  "radial-gradient(60% 50% at 80% 20%, rgba(140,20,255,0.15), transparent 70%), " +
  "radial-gradient(50% 50% at 20% 80%, rgba(120,40,255,0.12), transparent 70%)";

export function InteractiveBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // On touch / coarse-pointer devices (mobile) the mouse interaction is wasted
  // and the continuous canvas animation hurts performance, so we render a
  // static gradient instead. Same for users who prefer reduced motion.
  const [mode, setMode] = useState<Mode>(() => {
    if (typeof window === "undefined") return "idle";
    const prefersReduced = window.matchMedia?.(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const coarsePointer = window.matchMedia?.("(pointer: coarse)").matches;
    if (prefersReduced || coarsePointer || window.innerWidth < 768) {
      return "static";
    }
    return "idle";
  });

  // Retrasamos el montaje de la animación hasta que el navegador esté ocioso
  // para no penalizar el LCP de la primera carga.
  useEffect(() => {
    if (mode !== "idle") return;
    const w = window as Window &
      typeof globalThis & {
        requestIdleCallback?: (
          cb: () => void,
          opts?: { timeout: number },
        ) => number;
      };
    let cancelled = false;
    const onReady = () => {
      if (!cancelled) setMode("animate");
    };
    if (typeof w.requestIdleCallback === "function") {
      w.requestIdleCallback(onReady, { timeout: 1500 });
      return () => {
        cancelled = true;
      };
    }
    const t = window.setTimeout(onReady, 800);
    return () => {
      cancelled = true;
      window.clearTimeout(t);
    };
  }, [mode]);

  useEffect(() => {
    if (mode !== "animate") return;
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = window.innerWidth;
    let height = window.innerHeight;
    let rafId = 0;

    const handleResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    const mouse = { x: 0, y: 0 };
    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };
    window.addEventListener("mousemove", handleMouseMove);

    const particles: Particle[] = [];
    const particleCount = Math.min(width * 0.08, 100);

    class Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;

      constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.vx = (Math.random() - 0.5) * 0.2;
        this.vy = (Math.random() - 0.5) * 0.2;
        this.size = Math.random() * 1.5 + 0.5;
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;

        if (this.x < 0 || this.x > width) this.vx *= -1;
        if (this.y < 0 || this.y > height) this.vy *= -1;

        const dx = mouse.x - this.x;
        const dy = mouse.y - this.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const maxDistance = 200;

        if (distance < maxDistance) {
          const forceDirectionX = dx / distance;
          const forceDirectionY = dy / distance;
          const force = (maxDistance - distance) / maxDistance;
          const directionX = forceDirectionX * force * 0.5;
          const directionY = forceDirectionY * force * 0.5;

          this.x -= directionX;
          this.y -= directionY;
        }
      }

      draw() {
        if (!ctx) return;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(255, 255, 255, 0.9)";
        ctx.fill();

        if (Math.random() > 0.9) {
          ctx.shadowBlur = 10;
          ctx.shadowColor = "white";
          ctx.fill();
          ctx.shadowBlur = 0;
        }
      }
    }

    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }

    const animate = () => {
      ctx.clearRect(0, 0, width, height);

      const gradient = ctx.createRadialGradient(
        width * 0.8,
        height * 0.2,
        0,
        width * 0.8,
        height * 0.2,
        width * 0.6,
      );
      gradient.addColorStop(0, "rgba(140, 20, 255, 0.15)");
      gradient.addColorStop(0.5, "rgba(80, 0, 160, 0.08)");
      gradient.addColorStop(1, "transparent");
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, width, height);

      const gradient2 = ctx.createRadialGradient(
        width * 0.2,
        height * 0.8,
        0,
        width * 0.2,
        height * 0.8,
        width * 0.5,
      );
      gradient2.addColorStop(0, "rgba(120, 40, 255, 0.12)");
      gradient2.addColorStop(1, "transparent");
      ctx.fillStyle = gradient2;
      ctx.fillRect(0, 0, width, height);

      particles.forEach((particle) => {
        particle.update();
        particle.draw();
      });

      ctx.lineWidth = 1;

      for (let i = 0; i < particles.length; i++) {
        for (let j = i; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 150) {
            ctx.beginPath();
            const opacity = 1 - distance / 150;
            ctx.strokeStyle = `rgba(255, 255, 255, ${0.15 * opacity})`;
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }

      rafId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [mode]);

  if (mode === "static") {
    return (
      <div
        className="fixed inset-0 z-0 pointer-events-none bg-[#050505]"
        aria-hidden="true"
        style={{ backgroundImage: STATIC_GRADIENT }}
      />
    );
  }

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-0 pointer-events-none bg-[#050505]"
      aria-hidden="true"
    />
  );
}

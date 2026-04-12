"use client";

import { useEffect, useRef } from "react";
import type { Locale } from "@/lib/content";

type PoDustOrbProps = {
  locale: Locale;
  quote?: string;
};

type Particle = {
  angle: number;
  distance: number;
  size: number;
  speed: number;
  wobble: number;
  wobbleOffset: number;
  color: string;
  alpha: number;
};

const words = {
  pt: ["Arte", "Bem-estar", "Mobilidade", "Natureza", "Inclusão"],
  en: ["Art", "Well-being", "Mobility", "Nature", "Inclusion"],
} as const;

const palette = [
  "rgba(155, 55, 53, 1)",
  "rgba(214, 177, 132, 0.95)",
  "rgba(239, 230, 220, 0.95)",
  "rgba(255, 255, 255, 0.85)",
  "rgba(120, 189, 175, 0.75)",
];

export default function PoDustOrb({ locale, quote }: PoDustOrbProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const mouseRef = useRef({ x: 0, y: 0, active: false });

  useEffect(() => {
    const canvas = canvasRef.current;
    const wrapper = wrapperRef.current;
    if (!canvas || !wrapper) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrame = 0;
    let width = 0;
    let height = 0;
    let dpr = Math.min(window.devicePixelRatio || 1, 2);

    const particles: Particle[] = Array.from({ length: 180 }, (_, index) => ({
      angle: (Math.PI * 2 * index) / 180 + Math.random() * 0.5,
      distance: 0.25 + Math.random() * 0.75,
      size: 1 + Math.random() * 2.8,
      speed: 0.00012 + Math.random() * 0.00035,
      wobble: 8 + Math.random() * 16,
      wobbleOffset: Math.random() * Math.PI * 2,
      color: palette[Math.floor(Math.random() * palette.length)],
      alpha: 0.35 + Math.random() * 0.55,
    }));

    const resize = () => {
      const rect = wrapper.getBoundingClientRect();
      width = rect.width;
      height = rect.height;

      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const handleMove = (event: MouseEvent) => {
      const rect = wrapper.getBoundingClientRect();
      mouseRef.current = {
        x: event.clientX - rect.left,
        y: event.clientY - rect.top,
        active: true,
      };
    };

    const handleLeave = () => {
      mouseRef.current.active = false;
    };

    const drawGlowCircle = (
      x: number,
      y: number,
      r: number,
      fill: string,
      blur: number
    ) => {
      ctx.beginPath();
      ctx.shadowColor = fill;
      ctx.shadowBlur = blur;
      ctx.fillStyle = fill;
      ctx.arc(x, y, r, 0, Math.PI * 2);
      ctx.fill();
      ctx.shadowBlur = 0;
    };

    const animate = (time: number) => {
      ctx.clearRect(0, 0, width, height);

      const cx = width * 0.56;
      const cy = height * 0.5;
      const orbRadius = Math.min(width, height) * 0.34;

      const mouseX = mouseRef.current.active ? (mouseRef.current.x - width / 2) / width : 0;
      const mouseY = mouseRef.current.active ? (mouseRef.current.y - height / 2) / height : 0;

      const halo = ctx.createRadialGradient(cx, cy, orbRadius * 0.08, cx, cy, orbRadius * 1.5);
      halo.addColorStop(0, "rgba(214, 177, 132, 0.12)");
      halo.addColorStop(0.35, "rgba(155, 55, 53, 0.14)");
      halo.addColorStop(0.7, "rgba(155, 55, 53, 0.05)");
      halo.addColorStop(1, "rgba(44, 37, 42, 0)");

      ctx.beginPath();
      ctx.fillStyle = halo;
      ctx.arc(cx, cy, orbRadius * 1.5, 0, Math.PI * 2);
      ctx.fill();

      drawGlowCircle(cx, cy, orbRadius * 0.96, "rgba(255,255,255,0.03)", 38);
      drawGlowCircle(cx, cy, orbRadius * 0.66, "rgba(214,177,132,0.06)", 30);

      for (const particle of particles) {
        const drift = time * particle.speed;
        const angle = particle.angle + drift;

        const wobble =
          Math.sin(time * 0.0008 + particle.wobbleOffset) * particle.wobble +
          Math.cos(time * 0.00045 + particle.wobbleOffset) * (particle.wobble * 0.45);

        const radius = particle.distance * orbRadius + wobble;

        let x = cx + Math.cos(angle) * radius + mouseX * 18 * particle.distance;
        let y =
          cy +
          Math.sin(angle) * radius * 0.84 +
          mouseY * 18 * particle.distance;

        const dx = x - cx;
        const dy = y - cy;
        const distRatio = Math.sqrt(dx * dx + dy * dy) / orbRadius;
        const depthAlpha = Math.max(0.15, 1 - distRatio * 0.55);

        ctx.beginPath();
        ctx.fillStyle = particle.color.replace(/[\d.]+\)$/g, `${particle.alpha * depthAlpha})`);
        ctx.arc(x, y, particle.size, 0, Math.PI * 2);
        ctx.fill();

        ctx.beginPath();
        ctx.fillStyle = particle.color.replace(/[\d.]+\)$/g, `${particle.alpha * 0.22 * depthAlpha})`);
        ctx.arc(x, y, particle.size * 2.3, 0, Math.PI * 2);
        ctx.fill();
      }

      animationFrame = window.requestAnimationFrame(animate);
    };

    resize();
    animationFrame = window.requestAnimationFrame(animate);

    window.addEventListener("resize", resize);
    wrapper.addEventListener("mousemove", handleMove);
    wrapper.addEventListener("mouseleave", handleLeave);

    return () => {
      window.removeEventListener("resize", resize);
      wrapper.removeEventListener("mousemove", handleMove);
      wrapper.removeEventListener("mouseleave", handleLeave);
      window.cancelAnimationFrame(animationFrame);
    };
  }, []);

  const labels = words[locale];

  return (
    <div
      ref={wrapperRef}
      className="group relative h-[58vh] min-h-[420px] w-full md:h-[78vh] md:min-h-[560px]"
    >
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />

      <div className="pointer-events-none absolute inset-0 hidden md:block">
        <span className="absolute left-[10%] top-[16%] rounded-full border border-white/10 px-3 py-1 text-xs text-white/60 backdrop-blur-sm transition group-hover:text-white/80">
          {labels[0]}
        </span>
        <span className="absolute right-[10%] top-[18%] rounded-full border border-white/10 px-3 py-1 text-xs text-white/60 backdrop-blur-sm transition group-hover:text-white/80">
          {labels[1]}
        </span>
        <span className="absolute right-[8%] bottom-[22%] rounded-full border border-white/10 px-3 py-1 text-xs text-white/60 backdrop-blur-sm transition group-hover:text-white/80">
          {labels[2]}
        </span>
        <span className="absolute left-[14%] bottom-[18%] rounded-full border border-white/10 px-3 py-1 text-xs text-white/60 backdrop-blur-sm transition group-hover:text-white/80">
          {labels[3]}
        </span>
        <span className="absolute left-[42%] top-[8%] rounded-full border border-white/10 px-3 py-1 text-xs text-white/60 backdrop-blur-sm transition group-hover:text-white/80">
          {labels[4]}
        </span>
      </div>

      {quote ? (
        <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 p-8 md:p-10">
          <p className="max-w-md text-xl leading-relaxed text-white/80 md:text-2xl">
            {quote}
          </p>
        </div>
      ) : null}
    </div>
  );
}
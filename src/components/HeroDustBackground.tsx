"use client";

import { useEffect, useRef } from "react";

type DustParticle = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  driftX: number;
  driftY: number;
  size: number;
  color: string;
  alpha: number;
};

const colors = [
  "255,255,255",
  "239,230,220",
  "214,177,132",
  "155,55,53",
  "120,189,175",
];

export default function HeroDustBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const mouseRef = useRef({
    x: 0,
    y: 0,
    active: false,
  });

  useEffect(() => {
    const canvas = canvasRef.current;
    const wrapper = wrapperRef.current;
    if (!canvas || !wrapper) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrame = 0;
    let width = 0;
    let height = 0;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    const particles: DustParticle[] = Array.from({ length: 260 }, () => ({
      x: Math.random() * 1600,
      y: Math.random() * 900,
      vx: (Math.random() - 0.5) * 0.22,
      vy: (Math.random() - 0.5) * 0.16,
      driftX: 0,
      driftY: 0,
      size: 0.8 + Math.random() * 2.8,
      color: colors[Math.floor(Math.random() * colors.length)],
      alpha: 0.14 + Math.random() * 0.42,
    }));

    const resizeCanvas = () => {
      const rect = wrapper.getBoundingClientRect();
      width = rect.width;
      height = rect.height;

      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      for (const p of particles) {
        p.x = Math.random() * width;
        p.y = Math.random() * height;
      }
    };

    const handleMove = (event: MouseEvent) => {
  const rect = wrapper.getBoundingClientRect();
  mouseRef.current = {
    x: event.clientX - rect.left,
    y: event.clientY - rect.top,
    active:
      event.clientX >= rect.left &&
      event.clientX <= rect.right &&
      event.clientY >= rect.top &&
      event.clientY <= rect.bottom,
  };
};

    const handleLeave = () => {
      mouseRef.current.active = false;
    };

    const drawDust = (
      x: number,
      y: number,
      size: number,
      color: string,
      alpha: number
    ) => {
      ctx.beginPath();
      ctx.fillStyle = `rgba(${color}, ${alpha})`;
      ctx.arc(x, y, size, 0, Math.PI * 2);
      ctx.fill();

      ctx.beginPath();
      ctx.fillStyle = `rgba(${color}, ${alpha * 0.1})`;
      ctx.arc(x, y, size * 2.1, 0, Math.PI * 2);
      ctx.fill();
    };

    const animate = () => {
      ctx.clearRect(0, 0, width, height);

      for (const particle of particles) {
        if (mouseRef.current.active) {
          const dx = particle.x - mouseRef.current.x;
          const dy = particle.y - mouseRef.current.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 170) {
            const force = (170 - dist) / 170;
            particle.driftX += (dx / (dist || 1)) * force * 0.45;
            particle.driftY += (dy / (dist || 1)) * force * 0.45;
          }
        }

        particle.x += particle.vx + particle.driftX;
        particle.y += particle.vy + particle.driftY;

        particle.driftX *= 0.965;
        particle.driftY *= 0.965;

        if (particle.x <= 0) {
          particle.x = 0;
          particle.vx = Math.abs(particle.vx) * 0.98;
          particle.driftX = Math.abs(particle.driftX) * 0.75;
        } else if (particle.x >= width) {
          particle.x = width;
          particle.vx = -Math.abs(particle.vx) * 0.98;
          particle.driftX = -Math.abs(particle.driftX) * 0.75;
        }

        if (particle.y <= 0) {
          particle.y = 0;
          particle.vy = Math.abs(particle.vy) * 0.98;
          particle.driftY = Math.abs(particle.driftY) * 0.75;
        } else if (particle.y >= height) {
          particle.y = height;
          particle.vy = -Math.abs(particle.vy) * 0.98;
          particle.driftY = -Math.abs(particle.driftY) * 0.75;
        }

        drawDust(particle.x, particle.y, particle.size, particle.color, particle.alpha);
      }

      animationFrame = window.requestAnimationFrame(animate);
    };

    resizeCanvas();
    animate();

    window.addEventListener("resize", resizeCanvas);
    window.addEventListener("mousemove", handleMove);
window.addEventListener("mouseleave", handleLeave);

    return () => {
      window.removeEventListener("resize", resizeCanvas);
     window.removeEventListener("mousemove", handleMove);
window.removeEventListener("mouseleave", handleLeave);
      window.cancelAnimationFrame(animationFrame);
    };
  }, []);

  return (
    <div ref={wrapperRef} className="absolute inset-0 z-0 overflow-hidden">
      <div className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_15%_85%,rgba(155,55,53,0.42),transparent_24%),radial-gradient(circle_at_82%_14%,rgba(214,177,132,0.08),transparent_14%),linear-gradient(180deg,rgba(44,37,42,0.92)_0%,rgba(44,37,42,0.96)_100%)]" />

      <canvas ref={canvasRef} className="absolute inset-0 z-[1] h-full w-full" />
    </div>
  );
}
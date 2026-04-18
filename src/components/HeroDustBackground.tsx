"use client";

import { useEffect, useRef } from "react";

type Particle = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
  a: number;
  color: string;
};

const COLORS = [
  "rgba(255,255,255,0.62)",
  "rgba(221,206,176,0.5)",
  "rgba(121,166,160,0.36)",
  "rgba(155,55,53,0.22)",
];

export default function HeroDustBackground() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const initialContainer = containerRef.current;
    const initialCanvas = canvasRef.current;

    if (!initialContainer || !initialCanvas) return;

    const maybeCtx = initialCanvas.getContext("2d");
    if (!maybeCtx) return;

    const ctx: CanvasRenderingContext2D = maybeCtx;

    let animationFrame = 0;
    let width = 0;
    let height = 0;
    let dpr = 1;

    const pointer = {
      x: 0,
      y: 0,
      active: false,
    };

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const particles: Particle[] = [];

    function resize() {
      const container = containerRef.current;
      const canvas = canvasRef.current;
      if (!container || !canvas) return;

      const rect = container.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      dpr = Math.min(window.devicePixelRatio || 1, 2);

      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      particles.length = 0;

      const count = prefersReducedMotion
        ? 18
        : width < 768
          ? 28
          : width < 1200
            ? 42
            : 56;

      for (let i = 0; i < count; i += 1) {
        particles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * 0.18,
          vy: (Math.random() - 0.5) * 0.14,
          r: Math.random() * 2.8 + 1.1,
          a: Math.random() * 0.55 + 0.18,
          color: COLORS[Math.floor(Math.random() * COLORS.length)],
        });
      }
    }

    function drawBackground() {
      const gradient = ctx.createLinearGradient(0, 0, width, height);
      gradient.addColorStop(0, "#241f24");
      gradient.addColorStop(0.42, "#30282f");
      gradient.addColorStop(1, "#2a242b");

      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, width, height);

      const glowLeft = ctx.createRadialGradient(
        width * 0.15,
        height * 0.82,
        0,
        width * 0.15,
        height * 0.82,
        width * 0.42
      );
      glowLeft.addColorStop(0, "rgba(155,55,53,0.26)");
      glowLeft.addColorStop(1, "rgba(155,55,53,0)");

      ctx.fillStyle = glowLeft;
      ctx.fillRect(0, 0, width, height);

      const glowRight = ctx.createRadialGradient(
        width * 0.82,
        height * 0.2,
        0,
        width * 0.82,
        height * 0.2,
        width * 0.34
      );
      glowRight.addColorStop(0, "rgba(221,206,176,0.14)");
      glowRight.addColorStop(1, "rgba(221,206,176,0)");

      ctx.fillStyle = glowRight;
      ctx.fillRect(0, 0, width, height);

      const textFade = ctx.createLinearGradient(0, 0, width * 0.52, 0);
      textFade.addColorStop(0, "rgba(0,0,0,0.24)");
      textFade.addColorStop(1, "rgba(0,0,0,0)");

      ctx.fillStyle = textFade;
      ctx.fillRect(0, 0, width, height);
    }

    function drawParticles() {
      for (const p of particles) {
        let driftX = 0;
        let driftY = 0;

        if (pointer.active && !prefersReducedMotion) {
          const dx = p.x - pointer.x;
          const dy = p.y - pointer.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 140 && distance > 0.001) {
            const force = (140 - distance) / 140;
            driftX = (dx / distance) * force * 0.22;
            driftY = (dy / distance) * force * 0.22;
          }
        }

        p.x += p.vx + driftX;
        p.y += p.vy + driftY;

        if (p.x < -10) p.x = width + 10;
        if (p.x > width + 10) p.x = -10;
        if (p.y < -10) p.y = height + 10;
        if (p.y > height + 10) p.y = -10;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r * 2.5, 0, Math.PI * 2);
        ctx.fillStyle = p.color.replace(/[\d.]+\)\s*$/, `${p.a * 0.08})`);
        ctx.fill();

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = p.color.replace(/[\d.]+\)\s*$/, `${p.a})`);
        ctx.fill();
      }
    }

    function render() {
      drawBackground();
      drawParticles();
      animationFrame = window.requestAnimationFrame(render);
    }

    function handlePointerMove(event: PointerEvent) {
      const container = containerRef.current;
      if (!container) return;

      const rect = container.getBoundingClientRect();
      pointer.x = event.clientX - rect.left;
      pointer.y = event.clientY - rect.top;
      pointer.active = true;
    }

    function handlePointerLeave() {
      pointer.active = false;
    }

    resize();
    render();

    window.addEventListener("resize", resize);
    initialContainer.addEventListener("pointermove", handlePointerMove);
    initialContainer.addEventListener("pointerleave", handlePointerLeave);

    return () => {
      window.cancelAnimationFrame(animationFrame);
      window.removeEventListener("resize", resize);
      initialContainer.removeEventListener("pointermove", handlePointerMove);
      initialContainer.removeEventListener("pointerleave", handlePointerLeave);
    };
  }, []);

  return (
    <div ref={containerRef} className="absolute inset-0 overflow-hidden">
      <canvas ref={canvasRef} className="absolute inset-0" />
    </div>
  );
}
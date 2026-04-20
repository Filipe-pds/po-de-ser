"use client";

import { useEffect, useRef } from "react";

type ParticleLayer = "dust" | "glow" | "spark";

type Particle = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  alpha: number;
  depth: number;
  phase: number;
  color: string;
  layer: ParticleLayer;
};

const PALETTE = [
  "255,248,240", // soft white
  "245,229,202", // warm cream
  "224,188,132", // warm gold
  "140,188,179", // visible teal
  "187,91,88", // soft red
  "121,166,160", // muted teal
  "155,55,53", // brand red
];

function randomBetween(min: number, max: number) {
  return Math.random() * (max - min) + min;
}

function pick<T>(items: T[]) {
  return items[Math.floor(Math.random() * items.length)];
}

export default function HeroDustBackground() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const initialContainer = containerRef.current;
    const initialCanvas = canvasRef.current;

    if (!initialContainer || !initialCanvas) return;

    const maybeContext = initialCanvas.getContext("2d");
    if (!maybeContext) return;

    const ctx: CanvasRenderingContext2D = maybeContext;
    const safeContainer = initialContainer;
    const safeCanvas = initialCanvas;

    const reducedMotionQuery = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    );
    const coarsePointerQuery = window.matchMedia("(pointer: coarse)");

    let animationFrame = 0;
    let resizeObserver: ResizeObserver | null = null;
    let width = 0;
    let height = 0;
    let dpr = 1;
    let isMobile = false;
    let prefersReducedMotion = reducedMotionQuery.matches;

    const pointer = {
      x: 0,
      y: 0,
      targetX: 0,
      targetY: 0,
      active: false,
    };

    const particles: Particle[] = [];

    function createDustParticle(): Particle {
      const depth = randomBetween(0.2, 1.3);
      return {
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * (0.04 + depth * 0.08),
        vy: (Math.random() - 0.5) * (0.035 + depth * 0.06),
        radius: 0.5 + Math.random() * 1.55 + depth * 0.5,
        alpha: 0.11 + Math.random() * 0.28,
        depth,
        phase: Math.random() * Math.PI * 2,
        color: pick(PALETTE),
        layer: "dust",
      };
    }

    function createGlowParticle(): Particle {
      const depth = randomBetween(0.5, 1.35);
      return {
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.035,
        vy: (Math.random() - 0.5) * 0.03,
        radius: 12 + Math.random() * 22,
        alpha: 0.06 + Math.random() * 0.15,
        depth,
        phase: Math.random() * Math.PI * 2,
        color: pick(PALETTE),
        layer: "glow",
      };
    }

    function createSparkParticle(): Particle {
      const depth = randomBetween(0.4, 1.1);
      return {
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.018,
        vy: (Math.random() - 0.5) * 0.018,
        radius: 1.2 + Math.random() * 2.2,
        alpha: 0.18 + Math.random() * 0.2,
        depth,
        phase: Math.random() * Math.PI * 2,
        color: pick(["255,248,240", "245,229,202", "140,188,179", "187,91,88"]),
        layer: "spark",
      };
    }

    function rebuildParticles() {
      particles.length = 0;

      const dustCount = prefersReducedMotion
        ? 26
        : isMobile
          ? 72
          : width < 1200
            ? 120
            : 170;

      const glowCount = prefersReducedMotion
        ? 6
        : isMobile
          ? 10
          : width < 1200
            ? 16
            : 24;

      const sparkCount = prefersReducedMotion
        ? 10
        : isMobile
          ? 18
          : width < 1200
            ? 30
            : 42;

      for (let i = 0; i < dustCount; i += 1) particles.push(createDustParticle());
      for (let i = 0; i < glowCount; i += 1) particles.push(createGlowParticle());
      for (let i = 0; i < sparkCount; i += 1) particles.push(createSparkParticle());
    }

    function resize() {
      const container = containerRef.current;
      const canvas = canvasRef.current;
      if (!container || !canvas) return;

      const rect = container.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      isMobile = width < 768 || coarsePointerQuery.matches;

      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      rebuildParticles();
    }

    function drawBackground(time: number) {
      const gradient = ctx.createLinearGradient(0, 0, width, height);
      gradient.addColorStop(0, "#120b13");
      gradient.addColorStop(0.2, "#23111d");
      gradient.addColorStop(0.55, "#312633");
      gradient.addColorStop(1, "#4a4346");

      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, width, height);

      const leftRed = ctx.createRadialGradient(
        width * 0.12,
        height * 0.78,
        0,
        width * 0.12,
        height * 0.78,
        width * 0.55
      );
      leftRed.addColorStop(0, "rgba(155,55,53,0.42)");
      leftRed.addColorStop(0.38, "rgba(187,91,88,0.18)");
      leftRed.addColorStop(1, "rgba(155,55,53,0)");

      ctx.fillStyle = leftRed;
      ctx.fillRect(0, 0, width, height);

      const rightCream = ctx.createRadialGradient(
        width * 0.82,
        height * 0.22,
        0,
        width * 0.82,
        height * 0.22,
        width * 0.42
      );
      rightCream.addColorStop(0, "rgba(245,229,202,0.26)");
      rightCream.addColorStop(0.5, "rgba(245,229,202,0.09)");
      rightCream.addColorStop(1, "rgba(245,229,202,0)");

      ctx.fillStyle = rightCream;
      ctx.fillRect(0, 0, width, height);

      const centerTeal = ctx.createRadialGradient(
        width * 0.62,
        height * 0.62,
        0,
        width * 0.62,
        height * 0.62,
        width * 0.26
      );
      centerTeal.addColorStop(0, "rgba(140,188,179,0.14)");
      centerTeal.addColorStop(1, "rgba(140,188,179,0)");

      ctx.fillStyle = centerTeal;
      ctx.fillRect(0, 0, width, height);

      const pulse = 0.025 + Math.sin(time * 0.00022) * 0.015;
      ctx.fillStyle = `rgba(255,255,255,${pulse})`;
      ctx.fillRect(0, 0, width, height);

      const leftReadable = ctx.createLinearGradient(0, 0, width * 0.56, 0);
      leftReadable.addColorStop(0, "rgba(0,0,0,0.26)");
      leftReadable.addColorStop(0.65, "rgba(0,0,0,0.08)");
      leftReadable.addColorStop(1, "rgba(0,0,0,0)");

      ctx.fillStyle = leftReadable;
      ctx.fillRect(0, 0, width, height);
    }

    function drawParticles(time: number) {
      pointer.x += (pointer.targetX - pointer.x) * 0.05;
      pointer.y += (pointer.targetY - pointer.y) * 0.05;

      for (const p of particles) {
        const floatX = Math.sin(time * 0.00025 + p.phase) * 0.15 * p.depth;
        const floatY = Math.cos(time * 0.0002 + p.phase) * 0.13 * p.depth;

        let driftX = 0;
        let driftY = 0;

        if (pointer.active && !prefersReducedMotion) {
          const dx = p.x - pointer.x;
          const dy = p.y - pointer.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 200 && distance > 0.001) {
            const force = (200 - distance) / 200;
            driftX = (dx / distance) * force * 0.26 * p.depth;
            driftY = (dy / distance) * force * 0.26 * p.depth;
          }
        }

        p.x += p.vx + floatX + driftX * 0.02;
        p.y += p.vy + floatY + driftY * 0.02;

        if (p.x < -50) p.x = width + 50;
        if (p.x > width + 50) p.x = -50;
        if (p.y < -50) p.y = height + 50;
        if (p.y > height + 50) p.y = -50;

        if (p.layer === "glow") {
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.radius * 2.1, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(${p.color},${p.alpha * 0.22})`;
          ctx.fill();

          ctx.beginPath();
          ctx.arc(p.x, p.y, p.radius * 0.65, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(${p.color},${p.alpha * 0.5})`;
          ctx.fill();
          continue;
        }

        if (p.layer === "spark") {
          const sparkle = 0.52 + Math.sin(time * 0.002 + p.phase) * 0.38;

          ctx.beginPath();
          ctx.arc(p.x, p.y, p.radius * 1.9, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(${p.color},${p.alpha * 0.13 * sparkle})`;
          ctx.fill();

          ctx.beginPath();
          ctx.arc(p.x, p.y, p.radius * 0.66, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(${p.color},${p.alpha * sparkle})`;
          ctx.fill();
          continue;
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius * 2.5, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${p.color},${p.alpha * 0.1})`;
        ctx.fill();

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${p.color},${p.alpha})`;
        ctx.fill();
      }
    }

    function render(time: number) {
      drawBackground(time);
      drawParticles(time);
      animationFrame = window.requestAnimationFrame(render);
    }

    function handlePointerMove(event: PointerEvent) {
      const container = containerRef.current;
      if (!container || prefersReducedMotion) return;

      const rect = container.getBoundingClientRect();
      pointer.targetX = event.clientX - rect.left;
      pointer.targetY = event.clientY - rect.top;
      pointer.active = true;
    }

    function handlePointerLeave() {
      pointer.active = false;
      pointer.targetX = width * 0.5;
      pointer.targetY = height * 0.5;
    }

    function handleReducedMotionChange(event: MediaQueryListEvent) {
      prefersReducedMotion = event.matches;
      resize();
    }

    resize();
    handlePointerLeave();
    render(0);

    resizeObserver = new ResizeObserver(() => resize());
    resizeObserver.observe(safeContainer);

    reducedMotionQuery.addEventListener("change", handleReducedMotionChange);
    safeContainer.addEventListener("pointermove", handlePointerMove);
    safeContainer.addEventListener("pointerleave", handlePointerLeave);

    return () => {
      window.cancelAnimationFrame(animationFrame);
      resizeObserver?.disconnect();
      reducedMotionQuery.removeEventListener("change", handleReducedMotionChange);
      safeContainer.removeEventListener("pointermove", handlePointerMove);
      safeContainer.removeEventListener("pointerleave", handlePointerLeave);

      safeCanvas.width = 0;
      safeCanvas.height = 0;
    };
  }, []);

  return (
    <div ref={containerRef} className="absolute inset-0 overflow-hidden">
      <canvas ref={canvasRef} className="absolute inset-0" />
    </div>
  );
}
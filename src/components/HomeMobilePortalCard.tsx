"use client";

import Link from "next/link";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import PortalGrowth from "@/components/PortalGrowth";

type PortalVariant = "about" | "projects" | "opportunities";

type HomeMobilePortalCardProps = {
  href: string;
  title: string;
  hoverText: string;
  variant: PortalVariant;
};

const mobilePortalTheme: Record<
  PortalVariant,
  {
    border: string;
    glow: string;
    core: string;
    mist: string;
    spark: string;
    background: string;
  }
> = {
  about: {
    border: "rgba(245,229,202,0.72)",
    glow:
      "0 0 0 1px rgba(245,229,202,0.18), 0 0 22px rgba(245,229,202,0.16), inset 0 0 14px rgba(255,255,255,0.04)",
    core:
      "radial-gradient(circle at 50% 35%, rgba(245,229,202,0.12), rgba(37,30,34,0.86) 55%, rgba(15,12,15,1) 100%)",
    mist:
      "radial-gradient(circle at 50% 46%, rgba(245,229,202,0.08), transparent 52%)",
    spark: "rgba(245,229,202,0.76)",
    background: "linear-gradient(180deg, #33272d 0%, #211b20 100%)",
  },
  projects: {
    border: "rgba(210,150,159,0.78)",
    glow:
      "0 0 0 1px rgba(210,150,159,0.20), 0 0 26px rgba(210,150,159,0.24), 0 0 48px rgba(121,166,160,0.10), inset 0 0 16px rgba(255,255,255,0.05)",
    core:
      "radial-gradient(circle at 50% 35%, rgba(210,150,159,0.16), rgba(38,24,38,0.86) 55%, rgba(12,10,16,1) 100%)",
    mist:
      "radial-gradient(circle at 50% 48%, rgba(255,255,255,0.04), transparent 56%)",
    spark: "rgba(224,188,132,0.82)",
    background: "linear-gradient(180deg, #2d2330 0%, #17131a 100%)",
  },
  opportunities: {
    border: "rgba(170,214,206,0.78)",
    glow:
      "0 0 0 1px rgba(170,214,206,0.20), 0 0 24px rgba(170,214,206,0.22), inset 0 0 16px rgba(255,255,255,0.05)",
    core:
      "radial-gradient(circle at 50% 35%, rgba(170,214,206,0.16), rgba(23,30,38,0.84) 55%, rgba(9,12,18,1) 100%)",
    mist:
      "radial-gradient(circle at 50% 46%, rgba(121,166,160,0.10), transparent 54%)",
    spark: "rgba(170,214,206,0.84)",
    background: "linear-gradient(180deg, #2b313b 0%, #171d24 100%)",
  },
};

const mobileSparkMap: Record<
  PortalVariant,
  { left: string; top: string; size: number }[]
> = {
  about: [
    { left: "16%", top: "22%", size: 5 },
    { left: "30%", top: "48%", size: 6 },
    { left: "24%", top: "72%", size: 7 },
  ],
  projects: [
    { left: "46%", top: "16%", size: 5 },
    { left: "60%", top: "44%", size: 6 },
    { left: "44%", top: "72%", size: 5 },
  ],
  opportunities: [
    { left: "74%", top: "22%", size: 5 },
    { left: "66%", top: "48%", size: 6 },
    { left: "58%", top: "72%", size: 7 },
  ],
};

export default function HomeMobilePortalCard({
  href,
  title,
  hoverText,
  variant,
}: HomeMobilePortalCardProps) {
  const theme = mobilePortalTheme[variant];
  const ref = useRef<HTMLAnchorElement | null>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 92%", "end 24%"],
  });

  const { scrollYProgress: centerProgress } = useScroll({
    target: ref,
    offset: ["center end", "center start"],
  });

  const mistOpacity = useTransform(scrollYProgress, [0, 0.22, 0.55, 1], [0.45, 0.6, 0.88, 1]);
  const sparkOpacity = useTransform(scrollYProgress, [0, 0.22, 0.58, 1], [0.22, 0.4, 0.82, 0.95]);
  const sparkScale = useTransform(scrollYProgress, [0, 0.3, 0.65, 1], [0.82, 0.92, 1, 1.08]);

  const portalScale = useTransform(scrollYProgress, [0, 0.22, 0.6, 1], [0.94, 0.965, 1, 1.03]);
  const portalY = useTransform(scrollYProgress, [0, 0.22, 0.6, 1], [10, 6, 0, -2]);

  const textOpacity = useTransform(scrollYProgress, [0, 0.28, 0.6, 1], [0.7, 0.82, 0.96, 1]);
  const textY = useTransform(scrollYProgress, [0, 0.28, 0.6, 1], [12, 8, 2, 0]);

  const growthPosition =
    variant === "about"
      ? "absolute -left-[54%] -top-[10%] h-[124%] w-[116%]"
      : variant === "opportunities"
        ? "absolute -right-[54%] -top-[10%] h-[124%] w-[116%]"
        : "absolute -left-[20%] -top-[8%] h-[122%] w-[142%]";

  const portalTop = variant === "projects" ? "top-[48%]" : "top-[46%]";
  const outerSize =
    variant === "projects"
      ? "h-[48%] w-[36%]"
      : "h-[46%] w-[35%]";
  const coreSize =
    variant === "projects"
      ? "h-[34%] w-[25%]"
      : "h-[33%] w-[24%]";

  return (
    <Link
      ref={ref}
      href={href}
      className="relative block overflow-hidden rounded-[2rem] border border-black/8 md:hidden"
      style={{
        background: theme.background,
        boxShadow: "0 10px 28px rgba(0,0,0,0.08)",
      }}
    >
      <motion.div
        className="absolute inset-0"
        style={{
          background: theme.mist,
          opacity: mistOpacity,
        }}
      />

      <div className="relative h-[21rem]">
        {mobileSparkMap[variant].map((spark, index) => (
          <motion.span
            key={`${variant}-mobile-${index}`}
            className="absolute rounded-full"
            style={{
              left: spark.left,
              top: spark.top,
              width: spark.size,
              height: spark.size,
              background: theme.spark,
              boxShadow: `0 0 14px ${theme.spark}`,
              opacity: sparkOpacity,
              scale: sparkScale,
            }}
          />
        ))}

        <motion.div
          className={`absolute left-1/2 ${portalTop} -translate-x-1/2 -translate-y-1/2 rounded-t-[999px] rounded-b-[2rem] ${outerSize}`}
          style={{
            scale: portalScale,
            y: portalY,
          }}
        >
          <div className={`${growthPosition} pointer-events-none overflow-visible`}>
            <PortalGrowth variant={variant} progress={centerProgress} mobile />
          </div>

          <div
            className="absolute inset-0 rounded-t-[999px] rounded-b-[2rem]"
            style={{
              border: `1px solid ${theme.border}`,
              boxShadow: theme.glow,
            }}
          />
        </motion.div>

        <motion.div
          className={`absolute left-1/2 ${portalTop} -translate-x-1/2 -translate-y-1/2 rounded-t-[999px] rounded-b-[1.5rem] ${coreSize}`}
          style={{
            background: theme.core,
            boxShadow: "inset 0 0 22px rgba(255,255,255,0.05)",
            scale: portalScale,
            y: portalY,
          }}
        />

        <motion.div
          className="absolute inset-x-0 bottom-0 p-6"
          style={{
            opacity: textOpacity,
            y: textY,
          }}
        >
          <h3 className="text-3xl font-semibold text-white">{title}</h3>
          <p className="mt-3 text-sm text-white/84">{hoverText} →</p>
        </motion.div>
      </div>
    </Link>
  );
}
"use client";

import Link from "next/link";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
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
    { left: "18%", top: "24%", size: 5 },
    { left: "34%", top: "58%", size: 6 },
    { left: "20%", top: "78%", size: 7 },
  ],
  projects: [
    { left: "46%", top: "18%", size: 5 },
    { left: "58%", top: "56%", size: 6 },
    { left: "42%", top: "82%", size: 5 },
  ],
  opportunities: [
    { left: "72%", top: "26%", size: 5 },
    { left: "64%", top: "56%", size: 6 },
    { left: "56%", top: "80%", size: 7 },
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

  const isInView = useInView(ref, {
    amount: 0.45,
    once: false,
    margin: "-10% 0px -10% 0px",
  });

  const growthPosition =
    variant === "about"
      ? "absolute -left-[42%] top-[6%] h-[108%] w-[90%]"
      : variant === "opportunities"
        ? "absolute -right-[42%] top-[6%] h-[108%] w-[90%]"
        : "absolute -left-[16%] top-[0%] h-[112%] w-[132%]";

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
        style={{ background: theme.mist }}
        animate={{
          opacity: isInView ? 1 : 0.65,
        }}
        transition={{ duration: 0.6, ease: "easeOut" }}
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
            }}
            animate={{
              opacity: isInView ? 0.9 : 0.45,
              scale: isInView ? 1 : 0.85,
            }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          />
        ))}

        <motion.div
          className="absolute left-1/2 top-[54%] h-[46%] w-[34%] -translate-x-1/2 -translate-y-1/2 rounded-t-[999px] rounded-b-[2rem]"
          animate={{
            scale: isInView ? 1 : 0.97,
          }}
          transition={{ duration: 0.45, ease: "easeOut" }}
        >
          <div className={`${growthPosition} pointer-events-none overflow-visible`}>
            <PortalGrowth variant={variant} active={isInView} />
          </div>

          <div
            className="absolute inset-0 rounded-t-[999px] rounded-b-[2rem]"
            style={{
              border: `1px solid ${theme.border}`,
              boxShadow: theme.glow,
            }}
          />
        </motion.div>

        <div
          className="absolute left-1/2 top-[54%] h-[33%] w-[24%] -translate-x-1/2 -translate-y-1/2 rounded-t-[999px] rounded-b-[1.5rem]"
          style={{
            background: theme.core,
            boxShadow: "inset 0 0 22px rgba(255,255,255,0.05)",
          }}
        />

        <motion.div
          className="absolute inset-x-0 bottom-0 p-6"
          animate={{
            opacity: isInView ? 1 : 0.82,
            y: isInView ? 0 : 6,
          }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <h3 className="text-3xl font-semibold text-white">{title}</h3>
          <p className="mt-3 text-sm text-white/84">{hoverText} →</p>
        </motion.div>
      </div>
    </Link>
  );
}
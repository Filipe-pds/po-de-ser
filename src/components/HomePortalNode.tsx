"use client";

import { useState } from "react";
import Link from "next/link";
import PortalGrowth from "@/components/PortalGrowth";

type PortalVariant = "about" | "projects" | "opportunities";

type HomePortalNodeProps = {
  href: string;
  title: string;
  hoverText: string;
  variant: PortalVariant;
  align: "left" | "center" | "right";
  tall?: boolean;
};

const portalTheme: Record<
  PortalVariant,
  {
    border: string;
    glow: string;
    glowHover: string;
    core: string;
    coreHover: string;
    spark: string;
    title: string;
    zoneTint: string;
    mist: string;
  }
> = {
  about: {
    border: "rgba(245,229,202,0.72)",
    glow:
      "0 0 0 1px rgba(245,229,202,0.18), 0 0 22px rgba(245,229,202,0.16), inset 0 0 14px rgba(255,255,255,0.04)",
    glowHover:
      "0 0 0 1px rgba(245,229,202,0.34), 0 0 42px rgba(245,229,202,0.24), inset 0 0 20px rgba(255,255,255,0.08)",
    core:
      "radial-gradient(circle at 50% 35%, rgba(245,229,202,0.12), rgba(37,30,34,0.86) 55%, rgba(15,12,15,1) 100%)",
    coreHover:
      "radial-gradient(circle at 50% 35%, rgba(245,229,202,0.20), rgba(49,36,40,0.82) 55%, rgba(15,12,15,1) 100%)",
    spark: "rgba(245,229,202,0.76)",
    title: "#fffaf4",
    zoneTint:
      "radial-gradient(circle at 28% 42%, rgba(155,55,53,0.18), transparent 34%), radial-gradient(circle at 36% 72%, rgba(245,229,202,0.08), transparent 28%)",
    mist:
      "radial-gradient(circle at 50% 46%, rgba(245,229,202,0.08), transparent 52%)",
  },
  projects: {
    border: "rgba(210,150,159,0.78)",
    glow:
      "0 0 0 1px rgba(210,150,159,0.20), 0 0 26px rgba(210,150,159,0.24), 0 0 48px rgba(121,166,160,0.10), inset 0 0 16px rgba(255,255,255,0.05)",
    glowHover:
      "0 0 0 1px rgba(210,150,159,0.40), 0 0 50px rgba(210,150,159,0.34), 0 0 72px rgba(121,166,160,0.18), inset 0 0 22px rgba(255,255,255,0.08)",
    core:
      "radial-gradient(circle at 50% 35%, rgba(210,150,159,0.16), rgba(38,24,38,0.86) 55%, rgba(12,10,16,1) 100%)",
    coreHover:
      "radial-gradient(circle at 50% 35%, rgba(210,150,159,0.26), rgba(48,26,42,0.80) 55%, rgba(12,10,16,1) 100%)",
    spark: "rgba(224,188,132,0.82)",
    title: "#fff8f7",
    zoneTint:
      "radial-gradient(circle at 50% 26%, rgba(210,150,159,0.18), transparent 26%), radial-gradient(circle at 50% 80%, rgba(121,166,160,0.10), transparent 28%)",
    mist:
      "radial-gradient(circle at 50% 48%, rgba(255,255,255,0.04), transparent 56%)",
  },
  opportunities: {
    border: "rgba(170,214,206,0.78)",
    glow:
      "0 0 0 1px rgba(170,214,206,0.20), 0 0 24px rgba(170,214,206,0.22), inset 0 0 16px rgba(255,255,255,0.05)",
    glowHover:
      "0 0 0 1px rgba(170,214,206,0.40), 0 0 48px rgba(170,214,206,0.30), inset 0 0 22px rgba(255,255,255,0.08)",
    core:
      "radial-gradient(circle at 50% 35%, rgba(170,214,206,0.16), rgba(23,30,38,0.84) 55%, rgba(9,12,18,1) 100%)",
    coreHover:
      "radial-gradient(circle at 50% 35%, rgba(170,214,206,0.26), rgba(31,39,48,0.80) 55%, rgba(9,12,18,1) 100%)",
    spark: "rgba(170,214,206,0.84)",
    title: "#f4fffc",
    zoneTint:
      "radial-gradient(circle at 72% 40%, rgba(170,214,206,0.18), transparent 32%), radial-gradient(circle at 64% 76%, rgba(245,229,202,0.06), transparent 26%)",
    mist:
      "radial-gradient(circle at 50% 46%, rgba(121,166,160,0.10), transparent 54%)",
  },
};

const sparkMap: Record<
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

export default function HomePortalNode({
  href,
  title,
  hoverText,
  variant,
  align,
  tall = false,
}: HomePortalNodeProps) {
  const theme = portalTheme[variant];
  const [active, setActive] = useState(false);

  const alignClasses =
    align === "left"
      ? "items-start text-left"
      : align === "right"
        ? "items-end text-right"
        : "items-center text-center";

  const portalSize = tall
    ? "h-[58%] w-[26%] md:h-[64%] md:w-[28%]"
    : "h-[45%] w-[24%] md:h-[49%] md:w-[24%]";

  const coreSize = tall
    ? "h-[41%] w-[18%] md:h-[47%] md:w-[20%]"
    : "h-[30%] w-[16%] md:h-[34%] md:w-[16%]";

  return (
    <Link
      href={href}
      onMouseEnter={() => setActive(true)}
      onMouseLeave={() => setActive(false)}
      onFocus={() => setActive(true)}
      onBlur={() => setActive(false)}
      className={`group absolute inset-0 z-10 hidden overflow-hidden rounded-[2rem] md:flex ${alignClasses}`}
    >
      <div
        className="absolute inset-0 opacity-0 transition-opacity duration-[1100ms] ease-out group-hover:opacity-100"
        style={{ background: theme.zoneTint }}
      />

      <div
        className="absolute inset-0 opacity-80 transition-opacity duration-700 group-hover:opacity-100"
        style={{ background: theme.mist }}
      />

      <PortalGrowth variant={variant} active={active} tall={tall} />

      {sparkMap[variant].map((spark, index) => (
        <span
          key={`${variant}-${index}`}
          className="absolute rounded-full opacity-80 transition-all duration-500 group-hover:scale-125 group-hover:opacity-100"
          style={{
            left: spark.left,
            top: spark.top,
            width: spark.size,
            height: spark.size,
            background: theme.spark,
            boxShadow: `0 0 14px ${theme.spark}`,
          }}
        />
      ))}

      <div className="absolute inset-x-0 top-[10%] px-8">
        <h3
          className="text-[2.1rem] font-semibold tracking-[-0.02em]"
          style={{ color: theme.title }}
        >
          {title}
        </h3>

        <div className="mt-3 overflow-hidden">
          <p className="translate-y-3 text-sm text-white/0 transition-all duration-500 group-hover:translate-y-0 group-hover:text-white/88 md:text-base">
            {hoverText} →
          </p>
        </div>
      </div>

      <div
        className={`absolute left-1/2 top-[60%] -translate-x-1/2 -translate-y-1/2 rounded-t-[999px] rounded-b-[2.2rem] transition-all duration-[420ms] ease-out group-hover:scale-[1.05] ${portalSize}`}
      >
        <div
          className="absolute inset-0 rounded-t-[999px] rounded-b-[2.2rem]"
          style={{
            border: `1px solid ${theme.border}`,
            boxShadow: theme.glow,
          }}
        />
        <div
          className="absolute inset-0 rounded-t-[999px] rounded-b-[2.2rem] opacity-0 transition-opacity duration-[420ms] ease-out group-hover:opacity-100"
          style={{
            border: `1px solid ${theme.border}`,
            boxShadow: theme.glowHover,
          }}
        />
      </div>

      <div
        className={`absolute left-1/2 top-[60%] -translate-x-1/2 -translate-y-1/2 rounded-t-[999px] rounded-b-[1.7rem] transition-all duration-[420ms] ease-out group-hover:scale-[1.03] ${coreSize}`}
        style={{
          background: theme.core,
          boxShadow: "inset 0 0 20px rgba(255,255,255,0.05)",
        }}
      />
      <div
        className={`absolute left-1/2 top-[60%] -translate-x-1/2 -translate-y-1/2 rounded-t-[999px] rounded-b-[1.7rem] opacity-0 transition-opacity duration-[420ms] ease-out group-hover:opacity-100 ${coreSize}`}
        style={{
          background: theme.coreHover,
          boxShadow: "inset 0 0 26px rgba(255,255,255,0.08)",
        }}
      />

      <div
        className="absolute left-1/2 top-[84%] h-8 w-[34%] -translate-x-1/2 rounded-full blur-2xl"
        style={{ background: "rgba(255,255,255,0.06)" }}
      />
    </Link>
  );
}
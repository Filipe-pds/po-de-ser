"use client";

import { motion, type Variants } from "framer-motion";

type PortalVariant = "about" | "projects" | "opportunities";

type PortalGrowthProps = {
  variant: PortalVariant;
  active: boolean;
  tall?: boolean;
};

const palettes: Record<
  PortalVariant,
  {
    vine: string;
    vineGlow: string;
    leaf: string;
    leafAlt: string;
  }
> = {
  about: {
    vine: "rgba(214, 188, 145, 0.84)",
    vineGlow: "rgba(245, 229, 202, 0.22)",
    leaf: "rgba(184, 146, 98, 0.88)",
    leafAlt: "rgba(214, 188, 145, 0.76)",
  },
  projects: {
    vine: "rgba(197, 144, 150, 0.88)",
    vineGlow: "rgba(210, 150, 159, 0.22)",
    leaf: "rgba(136, 165, 128, 0.88)",
    leafAlt: "rgba(204, 163, 120, 0.8)",
  },
  opportunities: {
    vine: "rgba(151, 207, 192, 0.88)",
    vineGlow: "rgba(170, 214, 206, 0.22)",
    leaf: "rgba(146, 200, 186, 0.88)",
    leafAlt: "rgba(194, 220, 191, 0.76)",
  },
};

const containerVariants: Variants = {
  closed: {
    opacity: 0.42,
  },
  open: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.04,
    },
  },
};

const vineVariants: Variants = {
  closed: {
    pathLength: 0,
    opacity: 0,
  },
  open: {
    pathLength: 1,
    opacity: 1,
    transition: {
      duration: 0.8,
      ease: "easeOut",
    },
  },
};

const leafVariants: Variants = {
  closed: {
    scale: 0.45,
    opacity: 0,
    rotate: -8,
  },
  open: {
    scale: 1,
    opacity: 1,
    rotate: 0,
    transition: {
      duration: 0.38,
      ease: "easeOut",
    },
  },
};

export default function PortalGrowth({
  variant,
  active,
  tall = false,
}: PortalGrowthProps) {
  const palette = palettes[variant];

  return (
    <motion.div
      className="pointer-events-none absolute inset-0 overflow-visible"
      variants={containerVariants}
      animate={active ? "open" : "closed"}
    >
      <motion.svg
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        className="absolute inset-0 h-full w-full overflow-visible"
        animate={
          active
            ? {
                y: [0, -1, 0],
              }
            : {
                y: 0,
              }
        }
        transition={{
          duration: 4,
          repeat: active ? Infinity : 0,
          ease: "easeInOut",
        }}
      >
        <defs>
          <filter id={`glow-${variant}`} x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="1.3" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {variant === "about" && (
          <>
            <motion.path
              d="M 8 96 C 10 82, 14 70, 20 60 C 24 53, 27 44, 28 30"
              fill="none"
              stroke={palette.vine}
              strokeWidth="1.15"
              strokeLinecap="round"
              filter={`url(#glow-${variant})`}
              variants={vineVariants}
            />
            <motion.path
              d="M 18 88 C 22 78, 26 68, 31 56 C 34 49, 36 41, 36 26"
              fill="none"
              stroke={palette.vine}
              strokeWidth="0.9"
              strokeLinecap="round"
              filter={`url(#glow-${variant})`}
              variants={vineVariants}
            />
            <motion.path
              d="M 20 60 C 25 57, 29 53, 34 48"
              fill="none"
              stroke={palette.vine}
              strokeWidth="0.78"
              strokeLinecap="round"
              filter={`url(#glow-${variant})`}
              variants={vineVariants}
            />

            <motion.ellipse
              cx="26"
              cy="67"
              rx="1.8"
              ry="4.8"
              fill={palette.leaf}
              transform="rotate(-8 26 67)"
              variants={leafVariants}
            />
            <motion.ellipse
              cx="33"
              cy="55"
              rx="1.55"
              ry="4.2"
              fill={palette.leafAlt}
              transform="rotate(24 33 55)"
              variants={leafVariants}
            />
            <motion.ellipse
              cx="22"
              cy="77"
              rx="1.45"
              ry="3.7"
              fill={palette.leafAlt}
              transform="rotate(-14 22 77)"
              variants={leafVariants}
            />
          </>
        )}

        {variant === "projects" && (
          <>
            <motion.path
              d="M 28 96 C 30 86, 33 76, 40 66 C 47 56, 49 46, 49 28"
              fill="none"
              stroke={palette.vine}
              strokeWidth="1.15"
              strokeLinecap="round"
              filter={`url(#glow-${variant})`}
              variants={vineVariants}
            />
            <motion.path
              d="M 72 96 C 70 84, 66 74, 59 64 C 53 55, 51 45, 51 28"
              fill="none"
              stroke={palette.vine}
              strokeWidth="1.15"
              strokeLinecap="round"
              filter={`url(#glow-${variant})`}
              variants={vineVariants}
            />
            <motion.path
              d="M 50 96 C 50 88, 50 80, 50 72"
              fill="none"
              stroke={palette.vine}
              strokeWidth="0.82"
              strokeLinecap="round"
              filter={`url(#glow-${variant})`}
              variants={vineVariants}
            />

            <motion.ellipse
              cx="39"
              cy="67"
              rx="1.8"
              ry="4.3"
              fill={palette.leaf}
              transform="rotate(-30 39 67)"
              variants={leafVariants}
            />
            <motion.ellipse
              cx="61"
              cy="65"
              rx="1.8"
              ry="4.3"
              fill={palette.leafAlt}
              transform="rotate(28 61 65)"
              variants={leafVariants}
            />
            <motion.ellipse
              cx="45"
              cy="52"
              rx="1.55"
              ry="3.6"
              fill={palette.leafAlt}
              transform="rotate(18 45 52)"
              variants={leafVariants}
            />
            <motion.ellipse
              cx="56"
              cy="50"
              rx="1.55"
              ry="3.6"
              fill={palette.leaf}
              transform="rotate(-18 56 50)"
              variants={leafVariants}
            />
          </>
        )}

        {variant === "opportunities" && (
          <>
            <motion.path
              d="M 92 96 C 90 82, 86 70, 80 60 C 76 53, 73 44, 72 30"
              fill="none"
              stroke={palette.vine}
              strokeWidth="1.15"
              strokeLinecap="round"
              filter={`url(#glow-${variant})`}
              variants={vineVariants}
            />
            <motion.path
              d="M 82 88 C 78 78, 74 68, 69 56 C 66 49, 64 41, 64 26"
              fill="none"
              stroke={palette.vine}
              strokeWidth="0.9"
              strokeLinecap="round"
              filter={`url(#glow-${variant})`}
              variants={vineVariants}
            />
            <motion.path
              d="M 80 60 C 75 57, 71 53, 66 48"
              fill="none"
              stroke={palette.vine}
              strokeWidth="0.78"
              strokeLinecap="round"
              filter={`url(#glow-${variant})`}
              variants={vineVariants}
            />

            <motion.ellipse
              cx="74"
              cy="67"
              rx="1.8"
              ry="4.8"
              fill={palette.leaf}
              transform="rotate(8 74 67)"
              variants={leafVariants}
            />
            <motion.ellipse
              cx="67"
              cy="55"
              rx="1.55"
              ry="4.2"
              fill={palette.leafAlt}
              transform="rotate(-24 67 55)"
              variants={leafVariants}
            />
            <motion.ellipse
              cx="78"
              cy="77"
              rx="1.45"
              ry="3.7"
              fill={palette.leafAlt}
              transform="rotate(14 78 77)"
              variants={leafVariants}
            />
          </>
        )}
      </motion.svg>
    </motion.div>
  );
}
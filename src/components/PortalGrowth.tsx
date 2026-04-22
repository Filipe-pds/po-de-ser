"use client";

import {
  motion,
  useTransform,
  type MotionValue,
  type Variants,
} from "framer-motion";

type PortalVariant = "about" | "projects" | "opportunities";

type PortalGrowthProps = {
  variant: PortalVariant;
  progress?: MotionValue<number>;
  active?: boolean;
  tall?: boolean;
  mobile?: boolean;
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
  progress,
  active = false,
  tall = false,
  mobile = false,
}: PortalGrowthProps) {
  const palette = palettes[variant];
  const isScrollMode = Boolean(progress);

  const filterId = `glow-${variant}-${mobile ? "mobile" : "desktop"}-${tall ? "tall" : "base"}`;

  if (!isScrollMode) {
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
            <filter id={filterId} x="-50%" y="-50%" width="200%" height="200%">
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
                filter={`url(#${filterId})`}
                variants={vineVariants}
              />
              <motion.path
                d="M 18 88 C 22 78, 26 68, 31 56 C 34 49, 36 41, 36 26"
                fill="none"
                stroke={palette.vine}
                strokeWidth="0.9"
                strokeLinecap="round"
                filter={`url(#${filterId})`}
                variants={vineVariants}
              />
              <motion.path
                d="M 20 60 C 25 57, 29 53, 34 48"
                fill="none"
                stroke={palette.vine}
                strokeWidth="0.78"
                strokeLinecap="round"
                filter={`url(#${filterId})`}
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
                filter={`url(#${filterId})`}
                variants={vineVariants}
              />
              <motion.path
                d="M 72 96 C 70 84, 66 74, 59 64 C 53 55, 51 45, 51 28"
                fill="none"
                stroke={palette.vine}
                strokeWidth="1.15"
                strokeLinecap="round"
                filter={`url(#${filterId})`}
                variants={vineVariants}
              />
              <motion.path
                d="M 50 96 C 50 88, 50 80, 50 72"
                fill="none"
                stroke={palette.vine}
                strokeWidth="0.82"
                strokeLinecap="round"
                filter={`url(#${filterId})`}
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
                filter={`url(#${filterId})`}
                variants={vineVariants}
              />
              <motion.path
                d="M 82 88 C 78 78, 74 68, 69 56 C 66 49, 64 41, 64 26"
                fill="none"
                stroke={palette.vine}
                strokeWidth="0.9"
                strokeLinecap="round"
                filter={`url(#${filterId})`}
                variants={vineVariants}
              />
              <motion.path
                d="M 80 60 C 75 57, 71 53, 66 48"
                fill="none"
                stroke={palette.vine}
                strokeWidth="0.78"
                strokeLinecap="round"
                filter={`url(#${filterId})`}
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

  const sourceProgress = progress!;

  const rootOpacity = useTransform(
    sourceProgress,
    [0, 0.16, 0.5, 0.84, 1],
    [0.12, 0.42, 1, 0.42, 0.12]
  );

  const floatY = useTransform(
    sourceProgress,
    [0, 0.5, 1],
    [0, -1, 0]
  );

  const vinePrimary = useTransform(
    sourceProgress,
    [0, 0.18, 0.5, 0.82, 1],
    [0, 0.55, 1, 0.55, 0]
  );

  const vineSecondary = useTransform(
    sourceProgress,
    [0, 0.26, 0.56, 0.86, 1],
    [0, 0.35, 0.9, 0.35, 0]
  );

  const vineBranch = useTransform(
    sourceProgress,
    [0, 0.34, 0.62, 0.9, 1],
    [0, 0.18, 0.82, 0.18, 0]
  );

  const vineOpacityPrimary = useTransform(
    sourceProgress,
    [0, 0.18, 0.5, 0.82, 1],
    [0, 0.55, 1, 0.55, 0]
  );

  const vineOpacitySecondary = useTransform(
    sourceProgress,
    [0, 0.24, 0.56, 0.86, 1],
    [0, 0.35, 0.94, 0.35, 0]
  );

  const vineOpacityBranch = useTransform(
    sourceProgress,
    [0, 0.32, 0.62, 0.9, 1],
    [0, 0.18, 0.84, 0.18, 0]
  );

  const leafScale = useTransform(
    sourceProgress,
    [0, 0.38, 0.66, 0.92, 1],
    [0.45, 0.64, 1, 0.64, 0.45]
  );

  const leafOpacity = useTransform(
    sourceProgress,
    [0, 0.34, 0.64, 0.9, 1],
    [0, 0.22, 1, 0.22, 0]
  );

  const leafRotateLeft = useTransform(
    sourceProgress,
    [0, 0.64, 1],
    [-16, 0, -16]
  );

  const leafRotateRight = useTransform(
    sourceProgress,
    [0, 0.64, 1],
    [16, 0, 16]
  );

  return (
    <motion.div
      className="pointer-events-none absolute inset-0 overflow-visible"
      style={{ opacity: rootOpacity }}
    >
      <motion.svg
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        className="absolute inset-0 h-full w-full overflow-visible"
        style={{ y: floatY }}
      >
        <defs>
          <filter id={filterId} x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="1.3" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {variant === "about" && mobile && (
          <>
            <motion.path
              d="M 8 92 C 10 78, 14 66, 20 54 C 25 42, 31 28, 40 16 C 47 8, 58 8, 67 10"
              fill="none"
              stroke={palette.vine}
              strokeWidth="1.18"
              strokeLinecap="round"
              filter={`url(#${filterId})`}
              style={{ pathLength: vinePrimary, opacity: vineOpacityPrimary }}
            />
            <motion.path
              d="M 14 84 C 18 72, 22 60, 28 48 C 34 36, 41 26, 50 20"
              fill="none"
              stroke={palette.vine}
              strokeWidth="0.95"
              strokeLinecap="round"
              filter={`url(#${filterId})`}
              style={{ pathLength: vineSecondary, opacity: vineOpacitySecondary }}
            />
            <motion.path
              d="M 24 58 C 31 56, 38 52, 45 47"
              fill="none"
              stroke={palette.vine}
              strokeWidth="0.82"
              strokeLinecap="round"
              filter={`url(#${filterId})`}
              style={{ pathLength: vineBranch, opacity: vineOpacityBranch }}
            />

            <motion.ellipse
              cx="29"
              cy="64"
              rx="1.9"
              ry="5"
              fill={palette.leaf}
              style={{ scale: leafScale, opacity: leafOpacity, rotate: leafRotateLeft, transformOrigin: "29px 64px" }}
            />
            <motion.ellipse
              cx="39"
              cy="49"
              rx="1.6"
              ry="4.3"
              fill={palette.leafAlt}
              style={{ scale: leafScale, opacity: leafOpacity, rotate: leafRotateRight, transformOrigin: "39px 49px" }}
            />
            <motion.ellipse
              cx="20"
              cy="77"
              rx="1.5"
              ry="3.8"
              fill={palette.leafAlt}
              style={{ scale: leafScale, opacity: leafOpacity, rotate: leafRotateLeft, transformOrigin: "20px 77px" }}
            />
          </>
        )}

        {variant === "opportunities" && mobile && (
          <>
            <motion.path
              d="M 92 92 C 90 78, 86 66, 80 54 C 75 42, 69 28, 60 16 C 53 8, 42 8, 33 10"
              fill="none"
              stroke={palette.vine}
              strokeWidth="1.18"
              strokeLinecap="round"
              filter={`url(#${filterId})`}
              style={{ pathLength: vinePrimary, opacity: vineOpacityPrimary }}
            />
            <motion.path
              d="M 86 84 C 82 72, 78 60, 72 48 C 66 36, 59 26, 50 20"
              fill="none"
              stroke={palette.vine}
              strokeWidth="0.95"
              strokeLinecap="round"
              filter={`url(#${filterId})`}
              style={{ pathLength: vineSecondary, opacity: vineOpacitySecondary }}
            />
            <motion.path
              d="M 76 58 C 69 56, 62 52, 55 47"
              fill="none"
              stroke={palette.vine}
              strokeWidth="0.82"
              strokeLinecap="round"
              filter={`url(#${filterId})`}
              style={{ pathLength: vineBranch, opacity: vineOpacityBranch }}
            />

            <motion.ellipse
              cx="71"
              cy="64"
              rx="1.9"
              ry="5"
              fill={palette.leaf}
              style={{ scale: leafScale, opacity: leafOpacity, rotate: leafRotateRight, transformOrigin: "71px 64px" }}
            />
            <motion.ellipse
              cx="61"
              cy="49"
              rx="1.6"
              ry="4.3"
              fill={palette.leafAlt}
              style={{ scale: leafScale, opacity: leafOpacity, rotate: leafRotateLeft, transformOrigin: "61px 49px" }}
            />
            <motion.ellipse
              cx="80"
              cy="77"
              rx="1.5"
              ry="3.8"
              fill={palette.leafAlt}
              style={{ scale: leafScale, opacity: leafOpacity, rotate: leafRotateRight, transformOrigin: "80px 77px" }}
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
              filter={`url(#${filterId})`}
              style={{ pathLength: vinePrimary, opacity: vineOpacityPrimary }}
            />
            <motion.path
              d="M 72 96 C 70 84, 66 74, 59 64 C 53 55, 51 45, 51 28"
              fill="none"
              stroke={palette.vine}
              strokeWidth="1.15"
              strokeLinecap="round"
              filter={`url(#${filterId})`}
              style={{ pathLength: vinePrimary, opacity: vineOpacityPrimary }}
            />
            <motion.path
              d="M 50 96 C 50 88, 50 80, 50 72"
              fill="none"
              stroke={palette.vine}
              strokeWidth="0.82"
              strokeLinecap="round"
              filter={`url(#${filterId})`}
              style={{ pathLength: vineSecondary, opacity: vineOpacitySecondary }}
            />

            <motion.ellipse
              cx="39"
              cy="67"
              rx="1.8"
              ry="4.3"
              fill={palette.leaf}
              style={{ scale: leafScale, opacity: leafOpacity, rotate: leafRotateLeft, transformOrigin: "39px 67px" }}
            />
            <motion.ellipse
              cx="61"
              cy="65"
              rx="1.8"
              ry="4.3"
              fill={palette.leafAlt}
              style={{ scale: leafScale, opacity: leafOpacity, rotate: leafRotateRight, transformOrigin: "61px 65px" }}
            />
            <motion.ellipse
              cx="45"
              cy="52"
              rx="1.55"
              ry="3.6"
              fill={palette.leafAlt}
              style={{ scale: leafScale, opacity: leafOpacity, rotate: leafRotateRight, transformOrigin: "45px 52px" }}
            />
            <motion.ellipse
              cx="56"
              cy="50"
              rx="1.55"
              ry="3.6"
              fill={palette.leaf}
              style={{ scale: leafScale, opacity: leafOpacity, rotate: leafRotateLeft, transformOrigin: "56px 50px" }}
            />
          </>
        )}
      </motion.svg>
    </motion.div>
  );
}
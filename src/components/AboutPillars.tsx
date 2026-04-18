"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { useMemo, useState } from "react";
import type { Locale } from "@/lib/content";

type AboutPillarsProps = {
  locale: Locale;
};

type IconKey =
  | "art"
  | "wellbeing"
  | "mobility"
  | "sustainability"
  | "inclusion";

type PillarItem = {
  id: string;
  icon: IconKey;
  title: string;
  text: string;
};

function round(value: number, decimals = 3) {
  return Number(value.toFixed(decimals));
}

function polarToCartesian(cx: number, cy: number, r: number, angle: number) {
  const radians = ((angle - 90) * Math.PI) / 180;

  return {
    x: round(cx + r * Math.cos(radians)),
    y: round(cy + r * Math.sin(radians)),
  };
}

function donutSlicePath(
  cx: number,
  cy: number,
  outerRadius: number,
  innerRadius: number,
  startAngle: number,
  endAngle: number
) {
  const outerStart = polarToCartesian(cx, cy, outerRadius, startAngle);
  const outerEnd = polarToCartesian(cx, cy, outerRadius, endAngle);
  const innerEnd = polarToCartesian(cx, cy, innerRadius, endAngle);
  const innerStart = polarToCartesian(cx, cy, innerRadius, startAngle);

  const largeArcFlag = endAngle - startAngle > 180 ? 1 : 0;

  return [
    `M ${outerStart.x} ${outerStart.y}`,
    `A ${outerRadius} ${outerRadius} 0 ${largeArcFlag} 1 ${outerEnd.x} ${outerEnd.y}`,
    `L ${innerEnd.x} ${innerEnd.y}`,
    `A ${innerRadius} ${innerRadius} 0 ${largeArcFlag} 0 ${innerStart.x} ${innerStart.y}`,
    "Z",
  ].join(" ");
}

function PillarGlyphPaths({ icon }: { icon: IconKey }) {
  switch (icon) {
    case "art":
      return (
        <>
          <path d="M12 3.5c-4.9 0-8.5 3.3-8.5 7.7 0 3.2 2.4 5.3 5 5.3h1.3c.5 0 .9.4.9.9 0 .5-.2.8-.4 1.2-.2.3-.3.6-.3 1 0 1.2 1 1.9 2.3 1.9 5 0 8.2-4 8.2-9 0-5-3.6-8-8.5-8Z" />
          <circle cx="7.4" cy="10" r="1" fill="currentColor" stroke="none" />
          <circle cx="10.1" cy="7.8" r="1" fill="currentColor" stroke="none" />
          <circle cx="13.4" cy="7.6" r="1" fill="currentColor" stroke="none" />
          <circle cx="15.9" cy="10.3" r="1" fill="currentColor" stroke="none" />
        </>
      );

    case "wellbeing":
      return (
        <>
          <path d="M9.3 19.8h5.4" />
          <path d="M10.2 16.8h3.6" />
          <path d="M12 3.5c-3.8 0-6.8 2.9-6.8 6.6 0 2.3 1 4.1 2.7 5.5.8.6 1.3 1.3 1.5 2.1h5.2c.2-.8.7-1.5 1.5-2.1 1.7-1.4 2.7-3.2 2.7-5.5 0-3.7-3-6.6-6.8-6.6Z" />
          <path d="M12 9.2c-.6-1-2.7-1.2-3.2.6-.4 1.3.6 2.5 3.2 4.2 2.6-1.7 3.6-2.9 3.2-4.2-.5-1.8-2.6-1.6-3.2-.6Z" />
        </>
      );

    case "mobility":
      return <path d="M3.5 13.2 20.5 6.5 17 17 13 13.5 9.5 20l-.7-.3 1.7-7.6-7-1.2Z" />;

    case "sustainability":
      return (
        <>
          <path d="M12.2 20c5.1 0 8.3-4 8.3-9.7-4.8 0-8.1 1.8-9.9 4.8-.8 1.3-1.2 2.8-1.4 4.9.9 0 1.8 0 3-.1Z" />
          <path d="M11.7 19.9c-.2-4.3 1.1-7.2 5.7-10.5" />
          <path d="M9.3 18.5c-3.4 0-5.8-2.5-5.8-6.2 3.3 0 5.7 1.3 7 3.8" />
        </>
      );

    case "inclusion":
      return (
        <>
          <path d="M4 14.8c1.4-1.2 2.6-1.5 3.8-1.5 1.7 0 2.5.8 4 .8 1.1 0 2-.4 2.8-1 .8-.6 1.7-.9 2.6-.9 1.2 0 2.1.4 2.8 1.3" />
          <path d="M4.7 17.6h6.8c1 0 1.8-.2 2.6-.8l2.8-2.1c.4-.3.9-.4 1.3-.4 1.1 0 1.8.8 1.8 1.8 0 .6-.2 1.1-.7 1.5l-3.1 2.4c-1.1.9-2.2 1.3-3.8 1.3H8.8c-1.2 0-2.1-.3-3.3-1.2l-1.8-1.4" />
          <path d="M12.5 7.2c-.6-.9-2.4-1.1-2.9.5-.3 1.1.5 2 2.9 3.5 2.3-1.5 3.1-2.4 2.8-3.5-.5-1.6-2.2-1.4-2.8-.5Z" />
        </>
      );

    default:
      return null;
  }
}

function PillarIcon({
  icon,
  className = "",
}: {
  icon: IconKey;
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <PillarGlyphPaths icon={icon} />
    </svg>
  );
}

export default function AboutPillars({ locale }: AboutPillarsProps) {
  const content =
    locale === "pt"
      ? {
          eyebrow: "Os nossos pilares",
          title: "As áreas que atravessam a nossa visão.",
          intro:
            "Estas dimensões aparecem de formas diferentes em cada projeto, mas fazem parte da base do que construímos.",
          pillars: [
            {
              id: "art",
              icon: "art" as const,
              title: "Arte e Criatividade",
              text: "Usamos a expressão artística como ferramenta de descoberta, comunicação, imaginação e criação coletiva. A arte permite explorar emoções, ideias e relações de forma viva, sensível e participativa.",
            },
            {
              id: "wellbeing",
              icon: "wellbeing" as const,
              title: "Saúde, Bem-estar e Mindfulness",
              text: "Valorizamos espaços onde a presença, o cuidado, a escuta e o equilíbrio emocional fazem parte da experiência. O bem-estar não surge como algo separado, mas como uma condição importante para aprender e conviver.",
            },
            {
              id: "mobility",
              icon: "mobility" as const,
              title: "Mobilidade Internacional",
              text: "Promovemos oportunidades que ligam jovens, culturas e novas perspetivas através de experiências internacionais significativas. A mobilidade é, para nós, uma forma de encontro, abertura e transformação.",
            },
            {
              id: "sustainability",
              icon: "sustainability" as const,
              title: "Sustentabilidade",
              text: "Integramos uma atenção ao ambiente, aos recursos e às formas como vivemos em comunidade de forma mais consciente. Procuramos trazer esta dimensão para os projetos de forma prática e sensível.",
            },
            {
              id: "inclusion",
              icon: "inclusion" as const,
              title: "Inclusão e Diversidade",
              text: "Queremos criar contextos onde diferentes pessoas, histórias e formas de ser possam encontrar espaço, participação e pertença. A diversidade é parte da riqueza humana que queremos valorizar.",
            },
          ] satisfies PillarItem[],
        }
      : {
          eyebrow: "Our pillars",
          title: "The areas that shape our vision.",
          intro:
            "These dimensions appear in different ways across our projects, but they are part of the foundation of what we build.",
          pillars: [
            {
              id: "art",
              icon: "art" as const,
              title: "Art and Creativity",
              text: "We use artistic expression as a tool for discovery, communication, imagination, and collective creation. Art helps us explore emotions, ideas, and relationships in a living, sensitive, and participatory way.",
            },
            {
              id: "wellbeing",
              icon: "wellbeing" as const,
              title: "Health, Well-being and Mindfulness",
              text: "We value spaces where presence, care, listening, and emotional balance are part of the experience. Well-being is not something separate, but an important condition for learning and living together.",
            },
            {
              id: "mobility",
              icon: "mobility" as const,
              title: "International Mobility",
              text: "We promote opportunities that connect young people, cultures, and new perspectives through meaningful international experiences. For us, mobility is a way of encounter, openness, and transformation.",
            },
            {
              id: "sustainability",
              icon: "sustainability" as const,
              title: "Sustainability",
              text: "We integrate attention to the environment, to resources, and to the ways we live together more consciously. We try to bring this dimension into projects in practical and sensitive ways.",
            },
            {
              id: "inclusion",
              icon: "inclusion" as const,
              title: "Inclusion and Diversity",
              text: "We want to create contexts where different people, stories, and ways of being can find space, participation, and belonging. Diversity is part of the human richness we want to value.",
            },
          ] satisfies PillarItem[],
        };

  const [activeIndex, setActiveIndex] = useState(0);
  const active = content.pillars[activeIndex];

  const slices = useMemo(() => {
    const sliceCount = content.pillars.length;
    const sliceAngle = 360 / sliceCount;
    const gap = 2.5;

    return content.pillars.map((pillar, index) => {
      const startAngle = round(index * sliceAngle + gap / 2);
      const endAngle = round((index + 1) * sliceAngle - gap / 2);
      const midAngle = round((startAngle + endAngle) / 2);

      return {
        ...pillar,
        index,
        startAngle,
        endAngle,
        midAngle,
      };
    });
  }, [content.pillars]);

  return (
    <section className="bg-[var(--soft)]">
      <div className="mx-auto max-w-6xl px-6 py-20">
        <motion.div
          initial={{ opacity: 0, y: 34 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.38 }}
          transition={{ duration: 1.05, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-3xl"
        >
          <p className="text-sm uppercase tracking-[0.22em] text-[var(--brand)]">
            {content.eyebrow}
          </p>
          <h2 className="mt-3 text-3xl font-semibold text-[var(--ink)] md:text-4xl">
            {content.title}
          </h2>
          <p className="mt-4 text-lg leading-8 text-[var(--muted)]">
            {content.intro}
          </p>
        </motion.div>

        <div className="mt-10 lg:hidden">
          <div className="grid gap-3">
            {content.pillars.map((pillar, index) => {
              const isActive = index === activeIndex;

              return (
                <motion.button
                  key={pillar.id}
                  type="button"
                  initial={{ opacity: 0, y: 22 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.24 }}
                  transition={{
                    duration: 0.82,
                    delay: index * 0.08,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  onClick={() => setActiveIndex(index)}
                  className={`flex items-center gap-4 rounded-[1.25rem] px-4 py-4 text-left transition ${
                    isActive
                      ? "bg-[var(--brand)] text-white shadow-sm"
                      : "bg-white text-[var(--ink)] ring-1 ring-black/5"
                  }`}
                >
                  <span
                    className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${
                      isActive
                        ? "bg-white/15 text-white"
                        : "bg-[var(--cream)] text-[#79a6a0]"
                    }`}
                  >
                    <PillarIcon icon={pillar.icon} className="h-5 w-5" />
                  </span>
                  <span className="text-base font-medium">{pillar.title}</span>
                </motion.button>
              );
            })}
          </div>

          <div className="mt-6 overflow-hidden rounded-[1.75rem] bg-white p-6 shadow-sm ring-1 ring-black/5">
            <AnimatePresence mode="wait">
              <motion.div
                key={active.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.22 }}
              >
                <div className="flex items-center gap-4">
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[var(--cream)] text-[#79a6a0]">
                    <PillarIcon icon={active.icon} className="h-6 w-6" />
                  </span>
                  <h3 className="text-2xl font-semibold leading-tight text-[var(--ink)]">
                    {active.title}
                  </h3>
                </div>
                <p className="mt-4 leading-7 text-[var(--muted)]">{active.text}</p>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        <div className="mt-14 hidden lg:grid lg:grid-cols-[0.95fr_1.05fr] lg:items-center lg:gap-14">
          <motion.div
            initial={{ opacity: 0, y: 34, scale: 0.96, rotate: -4 }}
            whileInView={{ opacity: 1, y: 0, scale: 1, rotate: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 1.05, ease: [0.22, 1, 0.36, 1] }}
            className="flex items-center justify-center"
          >
            <div className="relative h-[26rem] w-[26rem]">
              <svg
                viewBox="0 0 400 400"
                className="h-full w-full drop-shadow-[0_12px_24px_rgba(0,0,0,0.08)]"
                aria-label={content.title}
              >
                {slices.map((slice) => {
                  const isActive = slice.index === activeIndex;
                  const path = donutSlicePath(
                    200,
                    200,
                    170,
                    78,
                    slice.startAngle,
                    slice.endAngle
                  );
                  const iconPoint = polarToCartesian(200, 200, 124, slice.midAngle);

                  return (
                    <g key={slice.id}>
                      <path
                        d={path}
                        fill={isActive ? "var(--brand)" : "#f7f2eb"}
                        stroke="rgba(44,37,42,0.08)"
                        strokeWidth="1.5"
                        className="cursor-pointer transition-all duration-150"
                        onMouseEnter={() => setActiveIndex(slice.index)}
                        onClick={() => setActiveIndex(slice.index)}
                      />

                      <svg
                        x={iconPoint.x - 18}
                        y={iconPoint.y - 18}
                        width="36"
                        height="36"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke={isActive ? "#ffffff" : "#79a6a0"}
                        strokeWidth="1.7"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        style={{ pointerEvents: "none" }}
                      >
                        <PillarGlyphPaths icon={slice.icon} />
                      </svg>
                    </g>
                  );
                })}

                <circle
                  cx="200"
                  cy="200"
                  r="70"
                  fill="#ddceb0"
                  stroke="rgba(44,37,42,0.06)"
                  strokeWidth="1.5"
                />
              </svg>

              <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
                <div className="relative h-28 w-28">
                  <Image
                    src="/branding/head-png.png"
                    alt="Pó de Ser"
                    fill
                    sizes="112px"
                    className="object-contain"
                  />
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 34 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{
              duration: 1.0,
              delay: 0.12,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            <div className="overflow-hidden rounded-[2rem] bg-white p-8 shadow-sm ring-1 ring-black/5">
              <AnimatePresence mode="wait">
                <motion.div
                  key={active.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.22 }}
                >
                  <div className="flex items-center gap-4">
                    <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-[var(--cream)] text-[#79a6a0]">
                      <PillarIcon icon={active.icon} className="h-7 w-7" />
                    </span>
                    <h3 className="text-3xl font-semibold leading-tight text-[var(--ink)]">
                      {active.title}
                    </h3>
                  </div>

                  <p className="mt-5 text-lg leading-8 text-[var(--muted)]">
                    {active.text}
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
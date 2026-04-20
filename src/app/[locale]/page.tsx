import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import ScrollReveal from "@/components/ScrollReveal";
import HeroDustBackground from "@/components/HeroDustBackground";
import HomePortalNode from "@/components/HomePortalNode";
import { locales, type Locale } from "@/lib/content";
import HomeMobilePortalCard from "@/components/HomeMobilePortalCard";

type PortalVariant = "about" | "projects" | "opportunities";

const mobilePortalTheme: Record<
  PortalVariant,
  {
    border: string;
    glow: string;
    core: string;
    mist: string;
    spark: string;
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

function MobilePortalCard({
  href,
  title,
  hoverText,
  variant,
}: {
  href: string;
  title: string;
  hoverText: string;
  variant: PortalVariant;
}) {
  const theme = mobilePortalTheme[variant];

  return (
    <Link
      href={href}
      className="group relative block overflow-hidden rounded-[2rem] border border-black/8 md:hidden"
      style={{
        background:
          variant === "about"
            ? "linear-gradient(180deg, #33272d 0%, #211b20 100%)"
            : variant === "projects"
              ? "linear-gradient(180deg, #2d2330 0%, #17131a 100%)"
              : "linear-gradient(180deg, #2b313b 0%, #171d24 100%)",
        boxShadow: "0 10px 28px rgba(0,0,0,0.08)",
      }}
    >
      <div className="absolute inset-0" style={{ background: theme.mist }} />

      <div className="relative h-[21rem]">
        {mobileSparkMap[variant].map((spark, index) => (
          <span
            key={`${variant}-mobile-${index}`}
            className="absolute rounded-full opacity-80"
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

        <div
          className="absolute left-1/2 top-[54%] h-[46%] w-[34%] -translate-x-1/2 -translate-y-1/2 rounded-t-[999px] rounded-b-[2rem]"
          style={{
            border: `1px solid ${theme.border}`,
            boxShadow: theme.glow,
          }}
        />
        <div
          className="absolute left-1/2 top-[54%] h-[33%] w-[24%] -translate-x-1/2 -translate-y-1/2 rounded-t-[999px] rounded-b-[1.5rem]"
          style={{
            background: theme.core,
            boxShadow: "inset 0 0 22px rgba(255,255,255,0.05)",
          }}
        />

        <div className="absolute inset-x-0 bottom-0 p-6">
          <h3 className="text-3xl font-semibold text-white">{title}</h3>
          <p className="mt-3 text-sm text-white/84">{hoverText} →</p>
        </div>
      </div>
    </Link>
  );
}

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!locales.includes(locale as Locale)) {
    notFound();
  }

  const currentLocale = locale as Locale;

  const copy =
    currentLocale === "pt"
      ? {
          heroSubtitle:
            "Arte, bem-estar e mobilidade internacional com um ritmo humano.",
          dustLines: [
            { normal: "Este Pó não é", accent: "um pó qualquer." },
            { normal: "Vem de", accent: "ti." },
            { normal: "De uma partícula nasce", accent: "uma nova forma de Ser." },
          ],
          aboutTitle: "Sobre",
          aboutHover: "Conhecer melhor a associação",
          projectsTitle: "Projetos",
          projectsHover: "Descobrir o que temos vindo a criar",
          opportunitiesTitle: "Oportunidades",
          opportunitiesHover: "Ver candidaturas e próximas experiências",
        }
      : {
          heroSubtitle:
            "Art, well-being, and international mobility with a human rhythm.",
          dustLines: [
            { normal: "This Dust is not", accent: "just any dust." },
            { normal: "It comes from", accent: "you." },
            {
              normal: "From a particle, there emerges",
              accent: "a new way of Being.",
            },
          ],
          aboutTitle: "About",
          aboutHover: "Get to know the association better",
          projectsTitle: "Projects",
          projectsHover: "Discover what we have been creating",
          opportunitiesTitle: "Opportunities",
          opportunitiesHover: "See open calls and upcoming experiences",
        };

  return (
    <>
      <Navbar locale={currentLocale} />

      <main className="bg-[var(--cream)]">
        <section className="relative min-h-[calc(100svh-72px)] overflow-hidden text-white">
          <HeroDustBackground />

          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(15,12,15,0.14),rgba(15,12,15,0.05)_26%,rgba(15,12,15,0.07)_70%,rgba(247,241,232,0.02)_100%)]" />
          <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-b from-transparent via-[rgba(247,241,232,0.08)] to-[var(--cream)]" />

          <div className="relative z-10 mx-auto flex min-h-[calc(100svh-72px)] max-w-6xl items-center justify-center px-6">
            <ScrollReveal className="max-w-4xl text-center" y={22}>
              <div className="mx-auto w-full max-w-[22rem] md:max-w-[26rem]">
                <div className="relative mx-auto aspect-[1.2/1] w-full">
                  <Image
                    src="/branding/logo-better.png"
                    alt="Pó de Ser"
                    fill
                    priority
                    className="object-contain"
                  />
                </div>
              </div>

              <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-white/88 md:text-[2rem] md:leading-[1.25]">
                {copy.heroSubtitle}
              </p>
            </ScrollReveal>
          </div>
        </section>

        <section className="bg-[var(--cream)]">
          <div className="mx-auto max-w-6xl px-6 py-16 md:py-20">
            <ScrollReveal className="mx-auto max-w-6xl text-center">
              <div className="space-y-3 md:space-y-4">
                {copy.dustLines.map((line, index) => (
                  <p
                    key={index}
                    className="text-[clamp(2.5rem,6.6vw,6rem)] leading-[0.95] tracking-[-0.04em] text-[var(--ink)]"
                  >
                    <span>{line.normal} </span>
                    <span className="font-serif italic text-[rgba(155,55,53,0.50)]">
                      {line.accent}
                    </span>
                  </p>
                ))}
              </div>
            </ScrollReveal>
          </div>
        </section>

        <section className="relative">
<div className="mx-auto grid max-w-6xl gap-5 px-6 py-12 md:hidden">
  <ScrollReveal>
    <HomeMobilePortalCard
      href={`/${currentLocale}/about`}
      title={copy.aboutTitle}
      hoverText={copy.aboutHover}
      variant="about"
    />
  </ScrollReveal>

  <ScrollReveal delay={0.05}>
    <HomeMobilePortalCard
      href={`/${currentLocale}/projects`}
      title={copy.projectsTitle}
      hoverText={copy.projectsHover}
      variant="projects"
    />
  </ScrollReveal>

  <ScrollReveal delay={0.1}>
    <HomeMobilePortalCard
      href={`/${currentLocale}/opportunities`}
      title={copy.opportunitiesTitle}
      hoverText={copy.opportunitiesHover}
      variant="opportunities"
    />
  </ScrollReveal>
</div>

          <div className="relative hidden h-[44rem] w-full overflow-hidden md:block">
            <div
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(180deg, #221a24 0%, #2a2630 44%, #26303a 100%)",
              }}
            />
            <div
              className="absolute inset-0"
              style={{
                background:
                  "radial-gradient(circle at 18% 34%, rgba(155,55,53,0.16), transparent 24%), radial-gradient(circle at 80% 26%, rgba(170,214,206,0.14), transparent 22%), radial-gradient(circle at 50% 70%, rgba(210,150,159,0.08), transparent 20%)",
              }}
            />

            <div className="absolute left-[4%] top-[10%] h-[72%] w-[28%]">
              <HomePortalNode
                href={`/${currentLocale}/about`}
                title={copy.aboutTitle}
                hoverText={copy.aboutHover}
                variant="about"
                align="left"
              />
            </div>

            <div className="absolute left-1/2 top-[4%] h-[86%] w-[28%] -translate-x-1/2">
              <HomePortalNode
                href={`/${currentLocale}/projects`}
                title={copy.projectsTitle}
                hoverText={copy.projectsHover}
                variant="projects"
                align="center"
                tall
              />
            </div>

            <div className="absolute right-[4%] top-[10%] h-[72%] w-[28%]">
              <HomePortalNode
                href={`/${currentLocale}/opportunities`}
                title={copy.opportunitiesTitle}
                hoverText={copy.opportunitiesHover}
                variant="opportunities"
                align="right"
              />
            </div>

            <svg
              viewBox="0 0 1200 700"
              className="pointer-events-none absolute inset-0 h-full w-full"
              preserveAspectRatio="none"
              aria-hidden="true"
            >
              <path
                d="M 600 0 C 520 110 420 210 310 300"
                fill="none"
                stroke="rgba(255,255,255,0.11)"
                strokeWidth="1.4"
              />
              <path
                d="M 600 0 C 680 110 780 210 890 300"
                fill="none"
                stroke="rgba(255,255,255,0.11)"
                strokeWidth="1.4"
              />
              <path
                d="M 310 300 C 392 408 432 540 470 700"
                fill="none"
                stroke="rgba(255,255,255,0.09)"
                strokeWidth="1.4"
              />
              <path
                d="M 890 300 C 808 408 768 540 730 700"
                fill="none"
                stroke="rgba(255,255,255,0.09)"
                strokeWidth="1.4"
              />
            </svg>
          </div>
        </section>
      </main>

      <Footer locale={currentLocale} />
    </>
  );
}
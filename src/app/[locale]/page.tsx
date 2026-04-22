import Image from "next/image";
import { notFound } from "next/navigation";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import ScrollReveal from "@/components/ScrollReveal";
import HeroDustBackground from "@/components/HeroDustBackground";
import HomePortalNode from "@/components/HomePortalNode";
import HomeMobilePortalCard from "@/components/HomeMobilePortalCard";
import { locales, type Locale } from "@/lib/content";

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
            "Sê o que quiseres, sê tu mesmo.",
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
            "Be anything, be yourself.",
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
                    sizes="(max-width: 768px) 22rem, 26rem"
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

          <div className="pointer-events-none absolute inset-x-0 top-0 z-10 hidden h-32 bg-gradient-to-b from-[var(--cream)] via-[rgba(247,241,232,0.72)] to-transparent md:block" />
          <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 hidden h-36 bg-gradient-to-b from-transparent via-[rgba(34,26,36,0.16)] to-[var(--cream)] md:block" />

          <div className="relative hidden h-[46rem] w-full overflow-hidden md:block">
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
                d="M 600 -10 C 560 84 468 178 334 286"
                fill="none"
                stroke="rgba(245,229,202,0.14)"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
              <path
                d="M 600 -10 C 640 84 732 178 866 286"
                fill="none"
                stroke="rgba(245,229,202,0.14)"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
              <path
                d="M 600 54 C 546 142 476 218 362 320"
                fill="none"
                stroke="rgba(182,64,52,0.10)"
                strokeWidth="1.1"
                strokeLinecap="round"
              />
              <path
                d="M 600 54 C 654 142 724 218 838 320"
                fill="none"
                stroke="rgba(121,166,160,0.10)"
                strokeWidth="1.1"
                strokeLinecap="round"
              />
              <path
                d="M 334 286 C 404 376 438 508 474 700"
                fill="none"
                stroke="rgba(245,229,202,0.11)"
                strokeWidth="1.4"
                strokeLinecap="round"
              />
              <path
                d="M 866 286 C 796 376 762 508 726 700"
                fill="none"
                stroke="rgba(245,229,202,0.11)"
                strokeWidth="1.4"
                strokeLinecap="round"
              />
            </svg>
          </div>
        </section>
      </main>

      <Footer locale={currentLocale} />
    </>
  );
}
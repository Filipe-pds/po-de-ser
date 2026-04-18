import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import ScrollReveal from "@/components/ScrollReveal";
import ParallaxImage from "@/components/ParallaxImage";
import DustEasterEgg from "@/components/DustEasterEgg";
import HeroDustBackground from "@/components/HeroDustBackground";
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
          heroEyebrow: "Associação juvenil · Palmela",
          heroTitle: "Pó de Ser",
          heroSubtitle:
            "Arte, bem-estar e mobilidade internacional com sentido humano.",
          heroIntro:
            "Criamos experiências onde jovens podem explorar criatividade, ligação humana, natureza, emoções e aprendizagem internacional de forma viva e significativa.",

          introTitle: "Pequena introdução",
          introText:
            "Fundada em 2022 e profundamente ligada ao Erasmus+, a Pó de Ser desenvolve projetos locais e internacionais para jovens, unindo arte, cuidado humano, participação e novas perspetivas.",

          identityTitle: "Um pequeno retrato",
          identityText:
            "A Pó de Ser cruza arte, bem-estar, mobilidade internacional, natureza, sustentabilidade e consciência emocional em experiências desenhadas para aproximar pessoas e abrir caminhos de descoberta, criação e encontro.",

          areasEyebrow: "Áreas que atravessam o nosso trabalho",
          areasTitle: "O que habita os nossos projetos",
          areas: [
            {
              title: "Arte e Criatividade",
              text: "Expressão artística como espaço de descoberta, comunicação e criação coletiva.",
            },
            {
              title: "Bem-estar e Emoções",
              text: "Processos que valorizam presença, escuta, autoconsciência e cuidado humano.",
            },
            {
              title: "Mobilidade Internacional",
              text: "Experiências interculturais que ligam jovens, territórios e novas formas de aprender.",
            },
            {
              title: "Natureza e Sustentabilidade",
              text: "Contacto com o ambiente e atenção a formas mais equilibradas de viver em comunidade.",
            },
          ],

          erasmusEyebrow: "Erasmus+",
          erasmusTitle: "Um ponto de partida essencial",
          erasmusText1:
            "A história da Pó de Ser está profundamente ligada ao Erasmus+. Foi neste universo que encontrámos oportunidades de aprendizagem, encontro e transformação que inspiraram a criação da associação.",
          erasmusText2:
            "Hoje, o Erasmus+ continua a ser um foco central do nosso trabalho, não apenas como programa de mobilidade, mas como espaço de educação não-formal, participação juvenil, interculturalidade e crescimento humano.",

          exploreEyebrow: "Explorar",
          exploreTitle: "Três portas de entrada",
          exploreCards: [
            {
              title: "Sobre",
              text: "Conhece melhor a identidade, a história e os pilares que atravessam a Pó de Ser.",
              href: `/${currentLocale}/about`,
              label: "Entrar",
            },
            {
              title: "Projetos",
              text: "Descobre os processos, experiências e iniciativas que temos vindo a criar.",
              href: `/${currentLocale}/projects`,
              label: "Ver projetos",
            },
            {
              title: "Oportunidades",
              text: "Consulta candidaturas abertas, intercâmbios, formações e outras possibilidades.",
              href: `/${currentLocale}/opportunities`,
              label: "Ver oportunidades",
            },
          ],

          impactEyebrow: "Impacto",
          impact: [
            { value: "Palmela", label: "Base local" },
            { value: "2022", label: "Ano de criação" },
            { value: "Erasmus+", label: "Foco central" },
            { value: "Arte · Bem-estar · Mobilidade", label: "Universo de trabalho" },
          ],
        }
      : {
          heroEyebrow: "Youth association · Palmela",
          heroTitle: "Pó de Ser",
          heroSubtitle:
            "Art, well-being, and international mobility with human meaning.",
          heroIntro:
            "We create experiences where young people can explore creativity, human connection, nature, emotions, and international learning in a meaningful and alive way.",

          introTitle: "A small introduction",
          introText:
            "Founded in 2022 and deeply connected to Erasmus+, Pó de Ser develops local and international projects for young people, bringing together art, human care, participation, and new perspectives.",

          identityTitle: "A small portrait",
          identityText:
            "Pó de Ser brings together art, well-being, international mobility, nature, sustainability, and emotional awareness in experiences designed to connect people and open paths of discovery, creation, and encounter.",

          areasEyebrow: "Areas that shape our work",
          areasTitle: "What lives inside our projects",
          areas: [
            {
              title: "Art and Creativity",
              text: "Artistic expression as a space for discovery, communication, and collective creation.",
            },
            {
              title: "Well-being and Emotions",
              text: "Processes that value presence, listening, self-awareness, and human care.",
            },
            {
              title: "International Mobility",
              text: "Intercultural experiences that connect young people, territories, and new ways of learning.",
            },
            {
              title: "Nature and Sustainability",
              text: "Contact with the environment and attention to more balanced ways of living in community.",
            },
          ],

          erasmusEyebrow: "Erasmus+",
          erasmusTitle: "An essential starting point",
          erasmusText1:
            "Pó de Ser’s story is deeply connected to Erasmus+. It was through this universe that we found learning, encounter, and transformation opportunities that inspired the creation of the association.",
          erasmusText2:
            "Today, Erasmus+ remains a central focus of our work, not only as a mobility programme, but as a space for non-formal education, youth participation, interculturality, and human growth.",

          exploreEyebrow: "Explore",
          exploreTitle: "Three entry points",
          exploreCards: [
            {
              title: "About",
              text: "Get to know the identity, story, and pillars that shape Pó de Ser.",
              href: `/${currentLocale}/about`,
              label: "Enter",
            },
            {
              title: "Projects",
              text: "Discover the processes, experiences, and initiatives we have been creating.",
              href: `/${currentLocale}/projects`,
              label: "See projects",
            },
            {
              title: "Opportunities",
              text: "Check open calls, exchanges, training courses, and other possibilities.",
              href: `/${currentLocale}/opportunities`,
              label: "See opportunities",
            },
          ],

          impactEyebrow: "Impact",
          impact: [
            { value: "Palmela", label: "Local base" },
            { value: "2022", label: "Founded" },
            { value: "Erasmus+", label: "Main focus" },
            { value: "Art · Well-being · Mobility", label: "Working universe" },
          ],
        };

  return (
    <>
      <Navbar locale={currentLocale} />

      <main>
        <section className="relative overflow-hidden text-white">
          <HeroDustBackground />

          <div className="relative z-10 mx-auto flex min-h-[72vh] max-w-6xl items-center px-6 py-18 md:min-h-[78vh] md:py-24">
            <div className="grid w-full gap-10 lg:grid-cols-[1fr_340px] lg:items-end">
              <ScrollReveal className="max-w-4xl" y={28}>
                <p className="mb-4 text-sm uppercase tracking-[0.22em] text-white/80">
                  {copy.heroEyebrow}
                </p>

                <h1 className="max-w-4xl text-5xl leading-[1.02] font-semibold text-white md:text-7xl">
                  {copy.heroTitle}
                </h1>

                <p className="mt-6 max-w-3xl text-2xl leading-tight text-white/88 md:text-3xl">
                  {copy.heroSubtitle}
                </p>

                <p className="mt-6 max-w-2xl text-lg leading-8 text-white/78">
                  {copy.heroIntro}
                </p>
              </ScrollReveal>

              <ScrollReveal delay={0.1}>
                <div className="rounded-[2rem] bg-white/10 p-6 shadow-sm ring-1 ring-white/15 backdrop-blur-md">
                  <p className="text-sm uppercase tracking-[0.22em] text-white/76">
                    {copy.introTitle}
                  </p>
                  <p className="mt-4 leading-7 text-white/86">{copy.introText}</p>

                  <div className="mt-5 flex flex-wrap gap-2 text-xs uppercase tracking-[0.14em] text-white/72">
                    <span className="rounded-full border border-white/20 px-3 py-1">
                      Palmela
                    </span>
                    <span className="rounded-full border border-white/20 px-3 py-1">
                      Erasmus+
                    </span>
                    <span className="rounded-full border border-white/20 px-3 py-1">
                      Art
                    </span>
                    <span className="rounded-full border border-white/20 px-3 py-1">
                      Well-being
                    </span>
                  </div>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </section>

        <section className="bg-white">
          <div className="mx-auto max-w-6xl px-6 py-20">
            <div className="grid gap-10 lg:grid-cols-[220px_minmax(0,1fr)] lg:gap-16 lg:items-center">
              <ScrollReveal className="flex items-center justify-start">
                <div className="relative aspect-square w-[150px] sm:w-[170px] lg:w-[190px]">
                  <Image
                    src="/branding/head-png.png"
                    alt="Pó de Ser logo"
                    fill
                    sizes="190px"
                    className="object-contain"
                  />
                </div>
              </ScrollReveal>

              <ScrollReveal delay={0.06}>
                <p className="text-sm uppercase tracking-[0.22em] text-[var(--brand)]">
                  {copy.identityTitle}
                </p>
                <p className="mt-6 text-lg leading-8 text-[var(--muted)]">
                  {copy.identityText}
                </p>
              </ScrollReveal>
            </div>
          </div>
        </section>

        <section className="bg-[var(--cream)]">
          <div className="mx-auto max-w-6xl px-6 py-20">
            <ScrollReveal className="max-w-3xl">
              <p className="text-sm uppercase tracking-[0.22em] text-[var(--brand)]">
                {copy.areasEyebrow}
              </p>
              <h2 className="mt-3 text-3xl font-semibold text-[var(--ink)] md:text-4xl">
                {copy.areasTitle}
              </h2>
            </ScrollReveal>

            <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
              {copy.areas.map((area, index) => (
                <ScrollReveal key={area.title} delay={index * 0.06}>
                  <article className="rounded-[1.5rem] bg-white p-6 ring-1 ring-black/5">
                    <h3 className="text-xl font-semibold text-[var(--ink)]">
                      {area.title}
                    </h3>
                    <p className="mt-3 leading-7 text-[var(--muted)]">
                      {area.text}
                    </p>
                  </article>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-white">
          <div className="mx-auto max-w-6xl px-6 py-20">
            <div className="grid gap-10 lg:grid-cols-[0.42fr_0.58fr] lg:items-start">
              <ScrollReveal>
                <div className="overflow-hidden rounded-[2rem] shadow-sm ring-1 ring-black/5">
                  <ParallaxImage
                    src="/about/about-erasmus.jpg"
                    alt="Pó de Ser and Erasmus+"
                    sizes="(max-width: 1024px) 100vw, 40vw"
                    wrapperClassName="aspect-[4/3]"
                    imageClassName="object-cover"
                    offset={20}
                  />
                </div>
              </ScrollReveal>

              <ScrollReveal delay={0.06}>
                <p className="text-sm uppercase tracking-[0.22em] text-[var(--brand)]">
                  {copy.erasmusEyebrow}
                </p>
                <h2 className="mt-3 text-3xl font-semibold text-[var(--ink)] md:text-4xl">
                  {copy.erasmusTitle}
                </h2>

                <p className="mt-6 text-lg leading-8 text-[var(--muted)]">
                  {copy.erasmusText1}
                </p>

                <p className="mt-5 text-lg leading-8 text-[var(--muted)]">
                  {copy.erasmusText2}
                </p>
              </ScrollReveal>
            </div>
          </div>
        </section>

        <section className="bg-[var(--soft)]">
          <div className="mx-auto max-w-6xl px-6 py-20">
            <ScrollReveal className="max-w-3xl">
              <p className="text-sm uppercase tracking-[0.22em] text-[var(--brand)]">
                {copy.exploreEyebrow}
              </p>
              <h2 className="mt-3 text-3xl font-semibold text-[var(--ink)] md:text-4xl">
                {copy.exploreTitle}
              </h2>
            </ScrollReveal>

            <div className="mt-10 grid gap-6 md:grid-cols-3">
              {copy.exploreCards.map((card, index) => (
                <ScrollReveal key={card.title} delay={index * 0.08}>
                  <Link
                    href={card.href}
                    className="group block rounded-[1.75rem] bg-white p-6 shadow-sm ring-1 ring-black/5 transition-transform duration-300 hover:-translate-y-1"
                  >
                    <h3 className="text-2xl font-semibold text-[var(--ink)]">
                      {card.title}
                    </h3>
                    <p className="mt-4 leading-7 text-[var(--muted)]">
                      {card.text}
                    </p>
                    <p className="mt-6 text-sm font-medium text-[var(--brand)] transition group-hover:translate-x-1">
                      {card.label} →
                    </p>
                  </Link>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-[var(--ink)] text-white">
          <div className="mx-auto max-w-6xl px-6 py-16">
            <ScrollReveal>
              <p className="text-sm uppercase tracking-[0.22em] text-white/72">
                {copy.impactEyebrow}
              </p>
            </ScrollReveal>

            <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
              {copy.impact.map((item, index) => (
                <ScrollReveal key={item.label} delay={index * 0.05}>
                  <div className="rounded-[1.5rem] bg-white/6 p-6 ring-1 ring-white/10 backdrop-blur-sm">
                    <p className="text-2xl font-semibold text-white">{item.value}</p>
                    <p className="mt-2 text-sm leading-6 text-white/72">{item.label}</p>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

      </main>

      <Footer locale={currentLocale} />
    </>
  );
}
import Image from "next/image";
import { notFound } from "next/navigation";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import AboutPillars from "@/components/AboutPillars";
import DustEasterEgg from "@/components/DustEasterEgg";
import ParallaxImage from "@/components/ParallaxImage";
import ScrollReveal from "@/components/ScrollReveal";
import { teamMembers } from "@/data/team";
import { locales, type Locale } from "@/lib/content";

export default async function AboutPage({
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
          heroEyebrow: "Sobre",
          heroTitle: "Pó de Ser",
          heroIntro:
            "Associação juvenil de Palmela, Portugal, que cruza arte, bem-estar e mobilidade internacional.",

          identityTitle: "Quem somos",
          identityText1:
            "Fundada em dezembro de 2022, em Palmela, Portugal, a Pó de Ser é uma associação juvenil que cria experiências onde arte, bem-estar e mobilidade internacional se encontram de forma humana, sensível e transformadora.",
          identityText2:
            "Desenvolvemos projetos locais e internacionais que ligam pessoas, ideias e percursos diferentes. Trabalhamos sobretudo através da educação não-formal e da participação juvenil, criando contextos vivos, acessíveis e significativos para os jovens.",

          storyTitle: "O que nos move",
          storyLead:
            "Acreditamos que aprender também pode ser criar, sentir, partilhar e parar para escutar.",
          storyText1:
            "Queremos criar experiências onde os jovens se relacionem consigo próprios, com os outros e com o mundo de forma mais consciente, criativa e participativa. Para isso, trabalhamos com expressão artística, cuidado humano, escuta, presença e ligação.",
          storyText2:
            "Interessa-nos a forma como a criatividade, emoções e bem-estar se cruzam no crescimento pessoal e coletivo, valorizando também o contacto com a natureza e a sustentabilidade.",

          erasmusTitle: "Erasmus+ como ponto de partida",
          erasmusText1:
            "A história da Pó de Ser está profundamente ligada ao Erasmus+. Foi neste universo que encontrámos oportunidades de aprendizagem, encontro e transformação que nos inspiraram a criar a associação.",
          erasmusText2:
            "Hoje, o Erasmus+ continua a ser o foco principal do nosso trabalho: não apenas como programa de mobilidade, mas como espaço de educação, participação juvenil, interculturalidade e crescimento humano. A partir dele, criamos projetos que promovem encontros significativos para os jovens e para as comunidades onde participam.",

          teamTitle: "Equipa",
          teamIntro:
            "A Pó de Ser é construída por pessoas com diferentes sensibilidades, percursos e competências, unidas pela vontade de criar oportunidades significativas para jovens.",

          emailLabel: "Email",
          instagramLabel: "Instagram",
          linkedinLabel: "LinkedIn",
          websiteLabel: "Website",
        }
      : {
          heroEyebrow: "About",
          heroTitle: "Pó de Ser",
          heroIntro:
            "A youth association from Palmela, Portugal, connecting art, well-being, and international mobility.",

          identityTitle: "Who we are",
          identityText1:
            "Founded in December 2022, in Palmela, Portugal, Pó de Ser is a youth association that creates experiences where art, well-being, and international mobility meet in a human, sensitive, and transformative way.",
          identityText2:
            "We develop local and international projects that connect different people, ideas, and paths. We work mainly through non-formal education and youth participation, creating living, accessible, and meaningful contexts for young people.",

          storyTitle: "What moves us",
          storyLead:
            "We believe learning can also mean creating, feeling, sharing and taking time to listen.",
          storyText1:
            "We aim to create experiences where young people can connect with themselves, with others and with the world in a more conscious, creative and participatory way. To do this, we work with artistic expression, human care, listening, presence and connection.",
          storyText2:
            "We are especially interested in how creativity, emotions and well-being come together in personal and collective growth, while also valuing contact with nature and sustainability.",

          erasmusTitle: "Erasmus+ as a starting point",
          erasmusText1:
            "The story of Pó de Ser is deeply connected to Erasmus+. It was within this universe that we found opportunities for learning, connection and transformation, which inspired us to create the association.",
          erasmusText2:
            "Today, Erasmus+ remains the main focus of our work: not only as a mobility programme, but as a space for education, youth participation, interculturality and human growth. Through it, we create projects that foster meaningful encounters for young people and the communities they take part in.",

          teamTitle: "Team",
          teamIntro:
            "Pó de Ser is built by people with different sensitivities, paths, and skills, united by the desire to create meaningful opportunities for young people.",

          emailLabel: "Email",
          instagramLabel: "Instagram",
          linkedinLabel: "LinkedIn",
          websiteLabel: "Website",
        };

  return (
    <>
      <Navbar locale={currentLocale} />

      <main>
        <section className="relative min-h-[calc(100svh-72px)] overflow-hidden bg-[var(--ink)] text-white">
          <Image
            src="/about/about-cover.jpg"
            alt="Pó de Ser team"
            fill
            priority
            sizes="100vw"
            className="object-cover object-[center_25%]"
          />

          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(15,12,15,0.18),rgba(15,12,15,0.10)_24%,rgba(15,12,15,0.34)_68%,rgba(15,12,15,0.82)_100%)]" />
          <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-b from-transparent via-[rgba(247,241,232,0.08)] to-[var(--cream)]" />

          <div className="relative mx-auto flex min-h-[calc(100svh-72px)] max-w-6xl items-end px-6 py-14 md:py-18">
            <ScrollReveal className="max-w-3xl" y={24}>
              <p className="mb-4 text-sm uppercase tracking-[0.22em] text-white/80">
                {copy.heroEyebrow}
              </p>

              <h1 className="text-5xl leading-[1.02] font-semibold md:text-7xl">
                {copy.heroTitle}
              </h1>

              <p className="mt-6 max-w-3xl text-lg leading-8 text-white/82">
                {copy.heroIntro}
              </p>
            </ScrollReveal>
          </div>
        </section>

        <section className="bg-white">
          <div className="mx-auto max-w-6xl px-6 py-20">
            <div className="grid gap-10 lg:grid-cols-[220px_minmax(0,1fr)] lg:gap-16 lg:items-center">
              <ScrollReveal className="flex flex-col items-start">
                <p className="text-sm uppercase tracking-[0.22em] text-[var(--brand)]">
                  {copy.identityTitle}
                </p>

                <div className="mt-8 relative aspect-square w-[150px] sm:w-[170px] lg:w-[190px]">
                  <Image
                    src="/branding/logo-better.png"
                    alt="Pó de Ser logo"
                    fill
                    sizes="190px"
                    className="object-contain"
                  />
                </div>
              </ScrollReveal>

              <ScrollReveal delay={0.06}>
                <p className="text-lg leading-8 text-[var(--muted)]">
                  {copy.identityText1}
                </p>

                <p className="mt-5 text-lg leading-8 text-[var(--muted)]">
                  {copy.identityText2}
                </p>
              </ScrollReveal>
            </div>
          </div>
        </section>

        <section className="bg-[var(--cream)]">
          <div className="mx-auto max-w-6xl px-6 py-20">
            <ScrollReveal className="max-w-6xl">
              <h2 className="max-w-5xl text-3xl leading-tight font-semibold text-[var(--ink)] md:text-5xl md:leading-[1.08]">
                {copy.storyLead}
              </h2>

                
            </ScrollReveal>

<div className="mt-14 grid gap-10 lg:grid-cols-[0.58fr_0.42fr] lg:items-start">
                <ScrollReveal>
                  <p className="mt-4 text-sm uppercase tracking-[0.22em] text-[var(--brand)]">
                  {copy.storyTitle}
                </p>

                <p className="mt-5 text-lg leading-8 text-[var(--muted)]">
                  {copy.storyText1}
                </p>

                <p className="mt-5 text-lg leading-8 text-[var(--muted)]">
                  {copy.storyText2}
                </p>
              </ScrollReveal>

              <ScrollReveal delay={0.08}>
                <div className="overflow-hidden rounded-[2rem] shadow-sm ring-1 ring-black/5">
                  <ParallaxImage
                    src="/about/about-story.jpg"
                    alt="Pó de Ser"
                    sizes="(max-width: 1024px) 100vw, 40vw"
                    wrapperClassName="aspect-[4/3]"
                    imageClassName="object-cover"
                    offset={22}
                  />
                </div>
              </ScrollReveal>
            </div>

            <div className="mt-20 grid gap-10 lg:grid-cols-[0.42fr_0.58fr] lg:items-start">
              <ScrollReveal>
                <div className="overflow-hidden rounded-[2rem] shadow-sm ring-1 ring-black/5">
                  <ParallaxImage
                    src="/about/about-erasmus.jpg"
                    alt="Pó de Ser and Erasmus+"
                    sizes="(max-width: 1024px) 100vw, 40vw"
                    wrapperClassName="aspect-[4/3]"
                    imageClassName="object-cover"
                    offset={22}
                  />
                </div>
              </ScrollReveal>

              <ScrollReveal delay={0.06}>
                <p className="text-sm uppercase tracking-[0.22em] text-[var(--brand)]">
                  {copy.erasmusTitle}
                </p>

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

        <AboutPillars locale={currentLocale} />

        <section className="bg-white">
          <div className="mx-auto max-w-6xl px-6 py-20">
            <ScrollReveal className="max-w-3xl">
              <h2 className="text-3xl font-semibold text-[var(--ink)] md:text-4xl">
                {copy.teamTitle}
              </h2>
              <p className="mt-4 text-lg leading-8 text-[var(--muted)]">
                {copy.teamIntro}
              </p>
            </ScrollReveal>

            <div className="mt-14 grid gap-x-10 gap-y-16 md:grid-cols-2 xl:grid-cols-3">
              {teamMembers.map((member, index) => (
                <ScrollReveal key={member.name} delay={index * 0.1}>
                  <article className="relative">
                    <div className="group relative">
                      <div className="relative aspect-[4/4] overflow-visible">
                        <div className="relative h-full w-full overflow-hidden rounded-t-[1.75rem] bg-[var(--cream)]">
                          <Image
                            src={member.image}
                            alt={member.name}
                            fill
                            sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                            className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                          />
                          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/8 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                        </div>

                        {member.creatureLeft ? (
                          <Image
                            src={member.creatureLeft}
                            alt={member.creatureLeftAlt || "Creature"}
                            width={member.creatureLeftSize || 150}
                            height={member.creatureLeftSize || 150}
                            className={`pointer-events-none absolute z-10 hidden rotate-[-14deg] opacity-0 transition-all duration-500 group-hover:opacity-100 md:block ${
                              member.creatureLeftClass ||
                              "left-[-1.25rem] top-[2.5rem] group-hover:left-[-2rem] group-hover:top-[-0.75rem]"
                            }`}
                          />
                        ) : null}

                        {member.creatureRight ? (
                          <Image
                            src={member.creatureRight}
                            alt={member.creatureRightAlt || "Creature"}
                            width={member.creatureRightSize || 150}
                            height={member.creatureRightSize || 150}
                            className={`pointer-events-none absolute z-10 hidden rotate-[14deg] opacity-0 transition-all duration-500 group-hover:opacity-100 md:block ${
                              member.creatureRightClass ||
                              "right-[-1.25rem] top-[2.5rem] group-hover:right-[-2rem] group-hover:top-[-0.75rem]"
                            }`}
                          />
                        ) : null}

                        {member.foregroundImage ? (
                          <Image
                            src={member.foregroundImage}
                            alt={member.name}
                            fill
                            sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                            className="pointer-events-none absolute inset-0 z-20 object-cover"
                          />
                        ) : null}
                      </div>

                      <div className="rounded-b-[1.75rem] bg-white p-6 shadow-sm ring-1 ring-black/5">
                        <h3 className="text-2xl font-semibold text-[var(--ink)]">
                          {member.name}
                        </h3>

                        <p className="mt-2 text-sm uppercase tracking-[0.16em] text-[var(--brand)]">
                          {member.role[currentLocale]}
                        </p>

                        <p className="mt-4 leading-7 text-[var(--muted)]">
                          {member.bio[currentLocale]}
                        </p>

                        {member.links ? (
                          <div className="mt-5 flex flex-wrap gap-3">
                            {member.links.email ? (
                              <a
                                href={`mailto:${member.links.email}`}
                                className="rounded-full border border-[var(--ink)] px-4 py-2 text-sm text-[var(--ink)] transition hover:bg-[var(--ink)] hover:text-white"
                              >
                                {copy.emailLabel}
                              </a>
                            ) : null}

                            {member.links.instagram ? (
                              <a
                                href={member.links.instagram}
                                target="_blank"
                                rel="noreferrer"
                                className="rounded-full border border-[var(--brand)] px-4 py-2 text-sm text-[var(--brand)] transition hover:bg-[var(--brand)] hover:text-white"
                              >
                                {copy.instagramLabel}
                              </a>
                            ) : null}

                            {member.links.linkedin ? (
                              <a
                                href={member.links.linkedin}
                                target="_blank"
                                rel="noreferrer"
                                className="rounded-full border border-[var(--brand)] px-4 py-2 text-sm text-[var(--brand)] transition hover:bg-[var(--brand)] hover:text-white"
                              >
                                {copy.linkedinLabel}
                              </a>
                            ) : null}

                            {member.links.website ? (
                              <a
                                href={member.links.website}
                                target="_blank"
                                rel="noreferrer"
                                className="rounded-full border border-[var(--brand)] px-4 py-2 text-sm text-[var(--brand)] transition hover:bg-[var(--brand)] hover:text-white"
                              >
                                {copy.websiteLabel}
                              </a>
                            ) : null}
                          </div>
                        ) : null}
                      </div>
                    </div>
                  </article>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        <DustEasterEgg locale={currentLocale} />
      </main>

      <Footer locale={currentLocale} />
    </>
  );
}
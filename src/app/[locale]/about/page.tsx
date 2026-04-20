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
            "Associação juvenil de Palmela que cruza arte, bem-estar e mobilidade internacional.",

          identityTitle: "Quem somos",
          identityText1:
            "Fundada em dezembro de 2022, em Palmela, a Pó de Ser é uma associação juvenil que cria experiências onde arte, bem-estar, mobilidade internacional e participação se cruzam de forma humana, sensível e transformadora.",
          identityText2:
            "A partir de Palmela, desenvolvemos projetos locais e internacionais que aproximam pessoas, ideias e percursos diferentes. Interessa-nos criar contextos onde a criatividade, a consciência emocional, o contacto com a natureza, a sustentabilidade e a ligação humana façam parte do caminho. Para nós, estas dimensões não aparecem separadas: encontram-se na forma como aprendemos, convivemos e crescemos.",

          storyTitle: "O que nos move",
          storyLead:
            "Acreditamos que aprender também pode ser criar, sentir, partilhar e parar para escutar.",
          storyText1:
            "Queremos contribuir para experiências onde os jovens se possam relacionar consigo próprios, com os outros e com o mundo de forma mais consciente, criativa e participativa. Trabalhamos a partir da educação não-formal, da expressão artística, da mobilidade internacional e do cuidado humano, procurando criar processos que deixem marca não só nas competências, mas também na forma de estar.",
          storyText2:
            "Interessa-nos especialmente a ligação entre criatividade, emoções, bem-estar e presença. Ao mesmo tempo, valorizamos a relação com a natureza e uma atenção à sustentabilidade como parte de uma vida mais equilibrada, sensível e responsável.",

          erasmusTitle: "Erasmus+ como ponto de partida",
          erasmusText1:
            "A história da Pó de Ser está profundamente ligada ao Erasmus+. Foi neste universo que encontrámos oportunidades de aprendizagem, encontro e transformação que nos inspiraram a criar a associação. Hoje, o Erasmus+ continua a ser o foco principal do nosso trabalho, não apenas como programa de mobilidade, mas como espaço de educação, participação juvenil, interculturalidade e crescimento humano.",
          erasmusText2:
            "É a partir dele que desenhamos muitos dos nossos projetos, intercâmbios, formações e experiências internacionais, sempre com a intenção de criar contextos vivos, acessíveis e significativos para os jovens. Procuramos também que essas experiências abram espaço para a criatividade, a consciência emocional, o contacto com a natureza, a sustentabilidade e formas mais humanas de viver em comunidade.",

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
            "A youth association from Palmela connecting art, well-being, and international mobility.",

          identityTitle: "Who we are",
          identityText1:
            "Founded in December 2022, in Palmela, Pó de Ser is a youth association that creates experiences where art, well-being, international mobility, and participation meet in a human, sensitive, and transformative way.",
          identityText2:
            "From Palmela, we develop local and international projects that bring together different people, ideas, and paths. We are interested in creating contexts where creativity, emotional awareness, contact with nature, sustainability, and human connection are part of the journey. For us, these dimensions do not appear separately: they meet in the way we learn, relate, and grow.",

          storyTitle: "What moves us",
          storyLead:
            "We believe learning can also mean creating, feeling, sharing, and pausing to listen.",
          storyText1:
            "We want to contribute to experiences where young people can relate to themselves, to others, and to the world in a more conscious, creative, and participatory way. We work through non-formal education, artistic expression, international mobility, and human care, aiming to create processes that leave a mark not only on skills, but also on ways of being.",
          storyText2:
            "We are especially interested in the connection between creativity, emotions, well-being, and presence. At the same time, we value the relationship with nature and an attention to sustainability as part of a more balanced, sensitive, and responsible way of living.",

          erasmusTitle: "Erasmus+ as a starting point",
          erasmusText1:
            "Pó de Ser’s story is deeply connected to Erasmus+. It was in this universe that we found learning, encounter, and transformation opportunities that inspired us to create the association. Today, Erasmus+ remains the main focus of our work, not only as a mobility programme, but as a space for education, youth participation, interculturality, and human growth.",
          erasmusText2:
            "From that foundation, we design many of our projects, exchanges, training courses, and international experiences, always with the intention of creating living, accessible, and meaningful contexts for young people. We also try to ensure that these experiences open space for creativity, emotional awareness, contact with nature, sustainability, and more human ways of living in community.",

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
            <div className="grid gap-10 lg:grid-cols-[0.58fr_0.42fr] lg:items-start">
              <ScrollReveal>
                <p className="text-sm uppercase tracking-[0.22em] text-[var(--brand)]">
                  {copy.storyTitle}
                </p>

                <p className="mt-6 text-2xl leading-tight font-semibold text-[var(--ink)] md:text-3xl">
                  {copy.storyLead}
                </p>

                <p className="mt-6 text-lg leading-8 text-[var(--muted)]">
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
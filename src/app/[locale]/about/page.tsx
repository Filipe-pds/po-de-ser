import Link from "next/link";
import { notFound } from "next/navigation";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { locales, type Locale, siteContent } from "@/lib/content";

const aboutPageContent = {
  pt: {
    eyebrow: "Sobre",
    title: "Mais do que uma associação.",
    intro:
      "A Pó de Ser é um espaço de descoberta, crescimento e expressão, criado para apoiar jovens a encontrarem a sua essência e transformá-la em impacto no mundo.",
    originTitle: "Como começou",
    originText:
      "A associação nasceu em Palmela, em 2022, a partir do encontro de amigos marcados por experiências Erasmus+. O desejo comum era simples: criar oportunidades significativas para jovens, com mais verdade, mais humanidade e mais espaço para ser.",
    philosophyTitle: "A ideia por trás de Pó de Ser",
    philosophyText:
      "O nome Pó de Ser carrega duas dimensões. Por um lado, lembra-nos que tudo pode ser. Por outro, fala de algo pequeno, quase invisível, mas cheio de potencial: partículas de identidade, criatividade, sensibilidade e mudança. Acreditamos que cada pessoa traz algo único que merece ser vivido, expresso e partilhado.",
    valuesTitle: "O que nos move",
    values: [
      {
        title: "Autenticidade",
        text: "Queremos criar espaços onde cada pessoa se possa apresentar como é, sem máscaras e com liberdade para explorar a sua identidade.",
      },
      {
        title: "Ligação humana",
        text: "Valorizamos encontros reais, escuta, empatia e processos coletivos onde o crescimento acontece com os outros e não apenas sozinho.",
      },
      {
        title: "Criação com sentido",
        text: "Usamos arte, bem-estar, mobilidade e participação como ferramentas de transformação pessoal e comunitária.",
      },
    ],
    areasTitle: "Áreas de ação",
    closingTitle: "Queremos ajudar jovens a descobrir quem são.",
    closingText:
      "Através de projetos locais e internacionais, queremos apoiar percursos mais conscientes, criativos e ligados ao mundo.",
    cta: "Falar connosco",
  },
  en: {
    eyebrow: "About",
    title: "More than an association.",
    intro:
      "Pó de Ser is a space for discovery, growth, and expression, created to support young people in finding their essence and turning it into impact in the world.",
    originTitle: "How it started",
    originText:
      "The association was born in Palmela in 2022 from the encounter of friends shaped by Erasmus+ experiences. The shared desire was simple: to create meaningful opportunities for young people, with more truth, more humanity, and more space to be.",
    philosophyTitle: "The idea behind Pó de Ser",
    philosophyText:
      "The name Pó de Ser carries two dimensions. On one hand, it suggests that anything can be. On the other, it speaks of something small, almost invisible, yet full of potential: particles of identity, creativity, sensitivity, and change. We believe each person carries something unique that deserves to be lived, expressed, and shared.",
    valuesTitle: "What moves us",
    values: [
      {
        title: "Authenticity",
        text: "We want to create spaces where each person can show up as they are, without masks, and with the freedom to explore their identity.",
      },
      {
        title: "Human connection",
        text: "We value real encounters, listening, empathy, and collective processes where growth happens with others, not only alone.",
      },
      {
        title: "Meaningful creation",
        text: "We use art, well-being, mobility, and participation as tools for personal and community transformation.",
      },
    ],
    areasTitle: "Areas of action",
    closingTitle: "We want to help young people discover who they are.",
    closingText:
      "Through local and international projects, we support more conscious, creative, and connected life paths.",
    cta: "Contact us",
  },
} as const;

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
  const homeContent = siteContent[currentLocale];
  const content = aboutPageContent[currentLocale];

  return (
    <>
      <Navbar locale={currentLocale} />

      <main>
        <section className="bg-[var(--cream)]">
          <div className="mx-auto max-w-6xl px-6 py-20 md:py-28">
            <p className="mb-4 text-sm uppercase tracking-[0.22em] text-[var(--brand)]">
              {content.eyebrow}
            </p>
            <h1 className="max-w-4xl text-5xl leading-[1.05] font-semibold text-[var(--ink)] md:text-7xl">
              {content.title}
            </h1>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-[var(--muted)]">
              {content.intro}
            </p>
          </div>
        </section>

        <section className="bg-white">
          <div className="mx-auto grid max-w-6xl gap-10 px-6 py-20 md:grid-cols-2">
            <div>
              <h2 className="text-3xl font-semibold text-[var(--ink)]">
                {content.originTitle}
              </h2>
              <p className="mt-4 leading-8 text-[var(--muted)]">
                {content.originText}
              </p>
            </div>

            <div className="rounded-[2rem] bg-[var(--ink)] p-8 text-white">
              <h2 className="text-3xl font-semibold">
                {content.philosophyTitle}
              </h2>
              <p className="mt-4 leading-8 text-white/80">
                {content.philosophyText}
              </p>
            </div>
          </div>
        </section>

        <section className="bg-[var(--soft)]">
          <div className="mx-auto max-w-6xl px-6 py-20">
            <h2 className="text-3xl font-semibold text-[var(--ink)]">
              {content.valuesTitle}
            </h2>

            <div className="mt-10 grid gap-6 md:grid-cols-3">
              {content.values.map((value) => (
                <article
                  key={value.title}
                  className="rounded-[1.75rem] bg-white p-6 shadow-sm ring-1 ring-black/5"
                >
                  <h3 className="text-xl font-semibold text-[var(--brand)]">
                    {value.title}
                  </h3>
                  <p className="mt-3 leading-7 text-[var(--muted)]">
                    {value.text}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-white">
          <div className="mx-auto max-w-6xl px-6 py-20">
            <h2 className="text-3xl font-semibold text-[var(--ink)]">
              {content.areasTitle}
            </h2>

            <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {homeContent.pillars.items.map((item) => (
                <article
                  key={item.title}
                  className="rounded-[1.75rem] border border-black/5 bg-[var(--cream)] p-6"
                >
                  <h3 className="text-xl font-semibold text-[var(--brand)]">
                    {item.title}
                  </h3>
                  <p className="mt-3 leading-7 text-[var(--muted)]">
                    {item.description}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-[var(--ink)] text-white">
          <div className="mx-auto max-w-6xl px-6 py-20">
            <h2 className="max-w-3xl text-4xl leading-tight font-semibold">
              {content.closingTitle}
            </h2>
            <p className="mt-4 max-w-3xl text-lg leading-8 text-white/80">
              {content.closingText}
            </p>

            <Link
              href={`/${currentLocale}#contact`}
              className="mt-8 inline-block rounded-full bg-[var(--brand)] px-6 py-3 text-sm font-medium text-white transition hover:opacity-90"
            >
              {content.cta}
            </Link>
          </div>
        </section>
      </main>

      <Footer locale={currentLocale} />
    </>
  );
}
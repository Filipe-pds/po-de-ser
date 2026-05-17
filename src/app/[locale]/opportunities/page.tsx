import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { dictionary } from "@/i18n";
import { locales, type Locale } from "@/lib/content";
import {
  type Opportunity,
  formatAgeRange,
  formatDate,
  formatKind,
  formatProjectDates,
  getLocalizedCountry,
  getLocalizedSummary,
  getOpportunityStatus,
} from "@/lib/opportunities";
import { client } from "@/sanity/client";
import { urlFor } from "@/sanity/image";
import { OPPORTUNITIES_QUERY } from "@/sanity/queries";

function sortByPublishDate(items: Opportunity[]) {
  return [...items].sort((a, b) => {
    const aDate = a.publishDate ? new Date(a.publishDate).getTime() : 0;
    const bDate = b.publishDate ? new Date(b.publishDate).getTime() : 0;
    return bDate - aDate;
  });
}

function SectionHeading({
  eyebrow,
  title,
  text,
}: {
  eyebrow?: string;
  title: string;
  text?: string;
}) {
  return (
    <div className="max-w-3xl">
      {eyebrow ? (
        <p className="mb-3 text-sm uppercase tracking-[0.22em] text-[var(--brand)]">
          {eyebrow}
        </p>
      ) : null}

      <h2 className="text-3xl font-semibold leading-[1.08] text-[var(--ink)] md:text-4xl">
        {title}
      </h2>

      {text ? (
        <p className="mt-4 text-base leading-7 text-[var(--muted)] md:text-lg md:leading-8">
          {text}
        </p>
      ) : null}
    </div>
  );
}

function OpportunityCard({
  item,
  locale,
  status,
}: {
  item: Opportunity;
  locale: Locale;
  status: "open" | "closed";
}) {
  const labels = dictionary[locale].opportunitiesPage;

  const imageUrl = item.thumbnail
    ? urlFor(item.thumbnail).width(1200).height(1800).fit("crop").url()
    : null;

  const displaySummary = getLocalizedSummary(item, locale);
  const displayCountry = getLocalizedCountry(item, locale);
  const displayDeadline = formatDate(item.applicationDeadline, locale);
  const displayProjectDates = formatProjectDates(
    item.projectStartDate,
    item.projectEndDate,
    locale
  );
  const displayAge = formatAgeRange(item.ageMin, item.ageMax, locale);

  const kindTone =
    item.kind === "training-course"
      ? "border-[rgba(170,214,206,0.78)] bg-[rgba(170,214,206,0.32)] text-white"
      : item.kind === "youth-exchange"
        ? "border-[rgba(210,150,159,0.78)] bg-[rgba(210,150,159,0.32)] text-white"
        : item.kind === "esc"
          ? "border-[rgba(224,188,132,0.78)] bg-[rgba(224,188,132,0.32)] text-white"
          : "border-white/25 bg-white/18 text-white";

  return (
    <article
      className={`group relative flex h-full min-h-[34rem] overflow-hidden rounded-[2rem] ring-1 ring-black/5 shadow-[0_14px_34px_rgba(0,0,0,0.06)] ${
        status === "closed" ? "opacity-85" : ""
      }`}
    >
      {imageUrl ? (
        <Image
          src={imageUrl}
          alt={item.title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
          className="object-cover object-center transition duration-700 group-hover:scale-[1.03]"
        />
      ) : (
        <div className="absolute inset-0 bg-[linear-gradient(180deg,#44323a_0%,#252028_100%)]" />
      )}

      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(20,16,20,0.10)_0%,rgba(20,16,20,0.34)_20%,rgba(20,16,20,0.72)_58%,rgba(20,16,20,0.95)_100%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.08),transparent_32%)]" />

      <div className="relative z-10 flex h-full min-h-[34rem] w-full flex-col p-6 text-white md:p-7">
        <div className="flex flex-wrap items-center gap-3">
          {item.kind ? (
            <span
              className={`rounded-full border px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-[0.16em] shadow-[0_4px_14px_rgba(0,0,0,0.12)] backdrop-blur-sm ${kindTone}`}
            >
              {formatKind(item.kind, locale)}
            </span>
          ) : null}

          {displayCountry ? (
            <span className="rounded-full border border-white/22 bg-black/24 px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-white/95 backdrop-blur-sm">
              {displayCountry}
            </span>
          ) : null}
        </div>

        <div className="mt-16">
          <h3 className="text-3xl font-semibold leading-tight">{item.title}</h3>

          {displayProjectDates ? (
            <div className="mt-4 inline-flex max-w-full rounded-full border border-white/16 bg-black/22 px-4 py-2 text-sm font-semibold text-white/96 shadow-[0_6px_20px_rgba(0,0,0,0.12)] backdrop-blur-sm">
              <span>{displayProjectDates}</span>
            </div>
          ) : null}

          {displaySummary ? (
            <p className="mt-5 max-w-[35ch] leading-7 text-white/84">
              {displaySummary}
            </p>
          ) : null}

          <div className="mt-6 space-y-2 text-sm text-white/88">
            {displayAge ? (
              <p>
                <span className="font-semibold text-white">{labels.age}:</span>{" "}
                {displayAge}
              </p>
            ) : null}

            {displayDeadline ? (
              <p>
                <span className="font-semibold text-white">
                  {labels.deadline}:
                </span>{" "}
                {displayDeadline}
              </p>
            ) : null}
          </div>
        </div>

        <div className="mt-auto pt-7">
          <div className="flex flex-wrap gap-3">
            {item.infopackUrl ? (
              <a
                href={item.infopackUrl}
                target="_blank"
                rel="noreferrer"
                className="rounded-full border border-white/35 bg-white/10 px-4 py-2 text-sm text-white backdrop-blur-sm transition hover:bg-white hover:text-[var(--ink)]"
              >
                {labels.infopack}
              </a>
            ) : null}

            {status === "open" && item.applicationUrl ? (
              <a
                href={item.applicationUrl}
                target="_blank"
                rel="noreferrer"
                className="rounded-full bg-[var(--brand)] px-4 py-2 text-sm text-white transition hover:opacity-90"
              >
                {labels.apply}
              </a>
            ) : null}

            {item.instagramUrl ? (
              <a
                href={item.instagramUrl}
                target="_blank"
                rel="noreferrer"
                className="rounded-full border border-white/35 bg-white/10 px-4 py-2 text-sm text-white backdrop-blur-sm transition hover:bg-white hover:text-[var(--ink)]"
              >
                {labels.instagram}
              </a>
            ) : null}
          </div>
        </div>
      </div>
    </article>
  );
}

function InfoCard({
  title,
  text,
}: {
  title: string;
  text: string;
}) {
  return (
    <article className="rounded-[1.75rem] bg-white/82 p-6 shadow-sm ring-1 ring-black/5 backdrop-blur-sm md:p-7">
      <h3 className="text-xl font-semibold text-[var(--brand)]">{title}</h3>
      <p className="mt-4 leading-7 text-[var(--muted)]">{text}</p>
    </article>
  );
}

export default async function OpportunitiesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!locales.includes(locale as Locale)) {
    notFound();
  }

  const currentLocale = locale as Locale;
  const labels = dictionary[currentLocale].opportunitiesPage;

  const pageCopy =
    currentLocale === "pt"
      ? {
          eyebrow: "Oportunidades",
          title: "Do Pó nascem novas formas de Ser.",
intro:
  "Intercâmbios juvenis, cursos de formação e outras experiências internacionais.",
          openEyebrow: "Candidaturas",
          explainEyebrow: "Erasmus+",
          explainTitle: "O que é o Erasmus+?",
          explainIntro:
            "O Erasmus+ é o programa da União Europeia para a educação, formação, juventude e desporto. No campo da juventude, apoia experiências de aprendizagem não-formal, mobilidade internacional, intercâmbio, desenvolvimento de competências e cooperação entre organizações.",
          erasmusCard1Title: "Em geral",
          erasmusCard1Text:
            "Para muitas pessoas, Erasmus+ é a primeira oportunidade de viajar com propósito, conhecer outras realidades e aprender num contexto internacional acessível. Não se trata apenas de viajar — trata-se de participar, conviver, refletir e crescer.",
          erasmusCard2Title: "Youth Exchanges",
          erasmusCard2Text:
            "Os Youth Exchanges juntam grupos de jovens de diferentes países para viver um programa de aprendizagem não-formal sobre um tema comum. Costumam incluir workshops, debates, dinâmicas, jogos, atividades criativas e momentos de intercâmbio cultural.",
          erasmusCard3Title: "Training Courses",
          erasmusCard3Text:
            "As Training Courses e outras mobilidades para youth workers focam-se mais no desenvolvimento profissional e metodológico. Podem incluir formação, seminários, workshops, job shadowing, peer learning e networking entre pessoas e organizações que trabalham com jovens.",
          resourcesTitle: "Links úteis",
          resourcesIntro:
            "Se quiseres perceber melhor o programa, consultar informação oficial ou explorar a Agência Nacional em Portugal, estes são bons pontos de partida.",
          generalLink: "Página oficial Erasmus+",
          youthExchangesLink: "Youth Exchanges",
          trainingCoursesLink: "Youth worker mobility",
          agencyTitle: "Agência Nacional em Portugal",
          agencyText:
            "Em Portugal, a informação oficial para juventude, desporto e Corpo Europeu de Solidariedade está disponível em Juventude.pt.",
          agencyLink: "Abrir Juventude.pt",
          closedTitle: "Oportunidades anteriores",
          helpTitle: "Não sabes por onde começar?",
          helpText:
            "Se tens dúvidas sobre alguma oportunidade, sobre o que é um Youth Exchange, ou se isto pode fazer sentido para ti, fala connosco.",
          contact: "Contactar",
        }
      : {
          eyebrow: "Opportunities",
          title: "From Dust, new ways of Being emerge.",
intro:
  "Youth Exchanges, Training Courses, and other international experiences.",
          openEyebrow: "Applications",
          explainEyebrow: "Erasmus+",
          explainTitle: "What is Erasmus+?",
          explainIntro:
            "Erasmus+ is the European Union programme for education, training, youth, and sport. In the youth field, it supports non-formal learning, international mobility, skill development, exchange, and cooperation between organisations.",
          erasmusCard1Title: "In general",
          erasmusCard1Text:
            "For many people, Erasmus+ is a first opportunity to travel with purpose, meet other realities, and learn in an accessible international setting. It is not only about travelling — it is about participating, sharing, reflecting, and growing.",
          erasmusCard2Title: "Youth Exchanges",
          erasmusCard2Text:
            "Youth Exchanges bring together groups of young people from different countries to take part in a non-formal learning programme around a shared theme. They often include workshops, debates, games, creative activities, and intercultural exchange.",
          erasmusCard3Title: "Training Courses",
          erasmusCard3Text:
            "Training Courses and other youth worker mobility activities focus more on professional and methodological development. They can include training, seminars, workshops, job shadowing, peer learning, and networking among people and organisations working with young people.",
          resourcesTitle: "Useful links",
          resourcesIntro:
            "If you want to understand the programme better, read official information, or explore the National Agency in Portugal, these are good places to start.",
          generalLink: "Official Erasmus+ page",
          youthExchangesLink: "Youth Exchanges",
          trainingCoursesLink: "Youth worker mobility",
          agencyTitle: "National Agency in Portugal",
          agencyText:
            "In Portugal, official information for youth, sport, and the European Solidarity Corps is available through Juventude.pt.",
          agencyLink: "Open Juventude.pt",
          closedTitle: "Past opportunities",
          helpTitle: "Not sure where to start?",
          helpText:
            "If you have questions about an opportunity, about what a Youth Exchange is, or whether this could make sense for you, talk to us.",
          contact: "Contact",
        };

  const opportunities = await client.fetch<Opportunity[]>(
    OPPORTUNITIES_QUERY,
    {},
    { next: { revalidate: 60 } }
  );

  const openItems = sortByPublishDate(
    opportunities.filter((item) => getOpportunityStatus(item) === "open")
  );

  const closedItems = sortByPublishDate(
    opportunities.filter((item) => getOpportunityStatus(item) === "closed")
  );

  const shouldShowMembershipNote = openItems.some(
    (item) => item.showMembershipNote
  );

  return (
    <>
      <Navbar locale={currentLocale} />

      <main className="bg-[var(--cream)]">
        <section className="relative min-h-[calc(100svh-72px)] overflow-hidden text-white">
          <Image
            src="/opportunities/cover3.jpg"
            alt={pageCopy.title}
            fill
            priority
            sizes="100vw"
            className="object-cover object-[50%_70%]"
          />

          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(15,12,15,0.74)_0%,rgba(15,12,15,0.50)_34%,rgba(15,12,15,0.18)_62%,rgba(15,12,15,0.30)_100%)]" />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(15,12,15,0.08)_0%,rgba(15,12,15,0.16)_34%,rgba(15,12,15,0.58)_100%)]" />

          <div className="relative z-10 mx-auto flex min-h-[calc(100svh-72px)] max-w-6xl items-end px-6 pb-16 pt-24 md:pb-20">
            <div className="max-w-3xl">
              <p className="mb-3 text-sm uppercase tracking-[0.22em] text-white/82">
                {pageCopy.eyebrow}
              </p>

              <h1 className="max-w-[11ch] text-4xl font-semibold leading-[1.02] text-white md:text-6xl">
                {pageCopy.title}
              </h1>

              <p className="mt-5 max-w-[34rem] text-base leading-7 text-white/84 md:text-lg md:leading-8">
                {pageCopy.intro}
              </p>
            </div>
          </div>

          <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-b from-transparent via-[rgba(247,241,232,0.08)] to-[var(--cream)]" />
        </section>

        <section id="open-opportunities" className="bg-[var(--cream)]">
          <div className="mx-auto max-w-6xl px-6 py-12 md:py-14">
            <SectionHeading
              eyebrow={pageCopy.openEyebrow}
              title={labels.openTitle}
            />

            {openItems.length === 0 ? (
              <div className="mt-8 rounded-[1.75rem] bg-white/78 p-8 shadow-sm ring-1 ring-black/5 backdrop-blur-sm">
                <p className="text-[var(--muted)]">{labels.empty}</p>
              </div>
            ) : (
              <>
              <div className="mt-10 grid items-stretch gap-6 md:grid-cols-2 xl:grid-cols-3">                  {openItems.map((item) => (
                    <OpportunityCard
                      key={item._id}
                      item={item}
                      locale={currentLocale}
                      status="open"
                    />
                  ))}
                </div>

                <aside className="mt-8 rounded-[1.75rem] bg-white/74 p-5 text-sm leading-6 text-[var(--muted)] shadow-sm ring-1 ring-black/5 backdrop-blur-sm md:p-6">
                  <p>
                    <span className="font-medium text-[var(--brand)]">
                      {labels.fundingTitle}:
                    </span>{" "}
                    {labels.fundingText}
                  </p>

                  <p className="mt-2">{labels.refundText}</p>

                  {shouldShowMembershipNote ? (
                    <p className="mt-3 border-t border-black/5 pt-3">
                      <span className="font-medium text-[var(--brand)]">
                        {labels.membershipTitle}:
                      </span>{" "}
                      {labels.membershipText}
                    </p>
                  ) : null}
                </aside>
              </>
            )}
          </div>
        </section>

<section id="erasmus-explained" className="bg-white/40">
  <div className="mx-auto max-w-6xl px-6 py-14 md:py-16">
    <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
      <div className="max-w-2xl">
        <p className="mb-3 text-sm uppercase tracking-[0.22em] text-[var(--brand)]">
          Erasmus+
        </p>

        <h2 className="text-3xl font-semibold leading-[1.08] text-[var(--ink)] md:text-4xl">
          {currentLocale === "pt" ? "O que é o Erasmus+?" : "What is Erasmus+?"}
        </h2>

        <p className="mt-4 text-base leading-7 text-[var(--muted)] md:text-lg md:leading-8">
          {currentLocale === "pt"
            ? "O Erasmus+ é o programa da União Europeia que apoia oportunidades de aprendizagem, mobilidade e cooperação. Na área da juventude, permite a participação em experiências internacionais de educação não-formal, encontro intercultural e desenvolvimento pessoal."
            : "Erasmus+ is the European Union programme that supports learning, mobility, and cooperation opportunities. In the youth field, it enables participation in international non-formal education experiences, intercultural exchange, and personal development."}
        </p>
      </div>

      <div className="grid gap-5 md:grid-cols-2">
        <article className="rounded-[1.6rem] bg-white/78 p-6 shadow-sm ring-1 ring-black/5 backdrop-blur-sm md:p-7">
          <h3 className="text-xl font-semibold text-[var(--brand)]">
            {currentLocale === "pt" ? "Intercâmbios juvenis" : "Youth Exchanges"}
          </h3>

          <p className="mt-4 leading-7 text-[var(--muted)]">
            {currentLocale === "pt"
              ? "Reúnem grupos de jovens de diferentes países para explorar um tema comum através de workshops, dinâmicas, atividades criativas, reflexão e intercâmbio cultural."
              : "They bring together groups of young people from different countries to explore a shared theme through workshops, group dynamics, creative activities, reflection, and intercultural exchange."}
          </p>
        </article>

        <article className="rounded-[1.6rem] bg-white/78 p-6 shadow-sm ring-1 ring-black/5 backdrop-blur-sm md:p-7">
          <h3 className="text-xl font-semibold text-[var(--brand)]">
            {currentLocale === "pt" ? "Cursos de formação" : "Training Courses"}
          </h3>

          <p className="mt-4 leading-7 text-[var(--muted)]">
            {currentLocale === "pt"
              ? "Destinam-se sobretudo a youth workers, facilitadores e pessoas ativas no trabalho com jovens, com foco na aprendizagem de métodos, partilha de práticas e criação de novas parcerias."
              : "They are mainly for youth workers, facilitators, and people active in youth work, with a focus on learning methods, sharing practices, and building new partnerships."}
          </p>
        </article>
      </div>
    </div>

    <div className="mt-10 rounded-[1.75rem] bg-white/72 p-6 shadow-sm ring-1 ring-black/5 backdrop-blur-sm md:p-7">
      <p className="text-sm leading-6 text-[var(--muted)]">
        {currentLocale === "pt"
          ? "Para perceber melhor como funciona, consulta aqui a informação oficial."
          : "To understand how it works better, explore the official information here."}
      </p>

      <div className="mt-5 grid gap-4 md:grid-cols-2">
        <a
          href="https://erasmus-plus.ec.europa.eu/"
          target="_blank"
          rel="noreferrer"
          className="flex min-h-[8.5rem] items-center justify-center rounded-[1.4rem] border border-black/5 bg-[var(--cream)]/70 p-5 transition hover:border-[var(--brand)]/30 hover:bg-white"
          aria-label={
            currentLocale === "pt"
              ? "Abrir página oficial Erasmus+"
              : "Open official Erasmus+ page"
          }
        >
          <Image
            src="/opportunities/logo-erasmus.png"
            alt="Erasmus+ / European Union"
            width={210}
            height={80}
            className="h-auto max-h-14 w-auto object-contain md:max-h-16"
          />
        </a>

        <a
          href="https://www.juventude.pt/pt/"
          target="_blank"
          rel="noreferrer"
          className="flex min-h-[8.5rem] items-center justify-center rounded-[1.4rem] border border-black/5 bg-[var(--cream)]/70 p-5 transition hover:border-[var(--brand)]/30 hover:bg-white"
          aria-label={
            currentLocale === "pt"
              ? "Abrir Juventude.pt"
              : "Open Juventude.pt"
          }
        >
          <Image
            src="/opportunities/logo-na.png"
            alt="Agência Nacional Erasmus+ Juventude / Desporto e Corpo Europeu de Solidariedade"
            width={260}
            height={90}
            className="h-auto max-h-14 w-auto object-contain md:max-h-16"
          />
        </a>
      </div>
    </div>
  </div>
</section>

        {closedItems.length > 0 ? (
          <section className="bg-white/45">
            <div className="mx-auto max-w-6xl px-6 py-14 md:py-16">
              <SectionHeading title={pageCopy.closedTitle} />

<div className="mt-10 grid items-stretch gap-6 md:grid-cols-2 xl:grid-cols-3">                {closedItems.map((item) => (

                  <OpportunityCard
                    key={item._id}
                    item={item}
                    locale={currentLocale}
                    status="closed"
                  />
                ))}
              </div>
            </div>
          </section>
        ) : null}

        <section className="bg-[var(--cream)] pb-16 pt-4 md:pb-20">
          <div className="mx-auto max-w-6xl px-6">
            <div className="overflow-hidden rounded-[2rem] bg-[linear-gradient(180deg,#231b24_0%,#2b2631_52%,#25303a_100%)] px-6 py-10 text-white shadow-[0_18px_50px_rgba(0,0,0,0.10)] md:px-10 md:py-12">
              <div className="max-w-3xl">
                <h2 className="text-3xl font-semibold leading-tight md:text-4xl">
                  {pageCopy.helpTitle}
                </h2>

                <p className="mt-4 text-base leading-7 text-white/82 md:text-lg md:leading-8">
                  {pageCopy.helpText}
                </p>

                <Link
                  href={`/${currentLocale}/contact`}
                  className="mt-8 inline-flex rounded-full bg-[var(--brand)] px-6 py-3 text-sm font-medium text-white transition hover:opacity-90"
                >
                  {pageCopy.contact}
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer locale={currentLocale} />
    </>
  );
}
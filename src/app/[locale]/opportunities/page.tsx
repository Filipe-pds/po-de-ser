import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { locales, type Locale } from "@/lib/content";
import {
  type Opportunity,
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

const pageContent = {
  pt: {
    eyebrow: "Oportunidades",
    title: "Candidaturas e oportunidades da Pó de Ser.",
    intro:
      "Aqui encontras as candidaturas abertas e também algumas recentemente fechadas, para que ainda possas consultar o infopack.",
    applicationsTitle: "Applications",
    empty: "De momento não há oportunidades visíveis.",
    infopack: "Infopack",
    apply: "Application Form",
    instagram: "Instagram",
    deadline: "Data limite",
    projectDates: "Datas do projeto",
    closedBanner: "Closed Applications",
    contact: "Entrar em contacto",
  },
  en: {
    eyebrow: "Opportunities",
    title: "Applications and opportunities by Pó de Ser.",
    intro:
      "Here you can find open applications and also some recently closed ones, so you can still access the infopack.",
    applicationsTitle: "Applications",
    empty: "There are no visible opportunities at the moment.",
    infopack: "Infopack",
    apply: "Application Form",
    instagram: "Instagram",
    deadline: "Application deadline",
    projectDates: "Project dates",
    closedBanner: "Closed Applications",
    contact: "Contact us",
  },
} as const;

function sortVisibleItems(a: { item: Opportunity; status: "open" | "closed" }, b: { item: Opportunity; status: "open" | "closed" }) {
  const order = { open: 0, closed: 1 };
  if (order[a.status] !== order[b.status]) {
    return order[a.status] - order[b.status];
  }

  const aDate = a.item.publishDate ? new Date(a.item.publishDate).getTime() : 0;
  const bDate = b.item.publishDate ? new Date(b.item.publishDate).getTime() : 0;

  return bDate - aDate;
}

function ApplicationCard({
  item,
  locale,
  labels,
  status,
}: {
  item: Opportunity;
  locale: Locale;
  labels: (typeof pageContent)[Locale];
  status: "open" | "closed";
}) {
  const imageUrl = item.thumbnail
    ? urlFor(item.thumbnail).width(900).height(600).fit("crop").url()
    : null;

  const displaySummary = getLocalizedSummary(item, locale);
  const displayCountry = getLocalizedCountry(item, locale);
  const displayDeadline = formatDate(item.applicationDeadline, locale);
  const displayProjectDates = formatProjectDates(
    item.projectStartDate,
    item.projectEndDate,
    locale
  );

  return (
    <article
      className={`relative overflow-hidden rounded-[1.75rem] bg-white shadow-sm ring-1 ring-black/5 ${
        status === "closed" ? "opacity-70" : ""
      }`}
    >
      {status === "closed" ? (
        <div className="pointer-events-none absolute right-[-42px] top-5 z-20 rotate-45 bg-[var(--ink)] px-12 py-1 text-xs font-medium text-white">
          {labels.closedBanner}
        </div>
      ) : null}

      {imageUrl ? (
        <div className="relative aspect-[16/10]">
          <Image
            src={imageUrl}
            alt={item.title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
            className="object-cover"
          />
        </div>
      ) : null}

      <div className="p-6">
        <div className="flex flex-wrap items-center gap-3">
          {item.kind ? (
            <span className="rounded-full bg-[var(--cream)] px-3 py-1 text-xs text-[var(--muted)]">
              {formatKind(item.kind, locale)}
            </span>
          ) : null}

          {displayCountry ? (
            <span className="text-sm uppercase tracking-[0.16em] text-[var(--brand)]">
              {displayCountry}
            </span>
          ) : null}
        </div>

        <h3 className="mt-4 text-2xl font-semibold text-[var(--ink)]">
          {item.title}
        </h3>

        {displaySummary ? (
          <p className="mt-4 leading-7 text-[var(--muted)]">{displaySummary}</p>
        ) : null}

        {displayProjectDates ? (
          <p className="mt-4 text-sm font-medium text-[var(--muted)]">
            {labels.projectDates}: {displayProjectDates}
          </p>
        ) : null}

        {displayDeadline ? (
          <p className="mt-2 text-sm font-medium text-[var(--brand)]">
            {labels.deadline}: {displayDeadline}
          </p>
        ) : null}

        <div className="mt-6 flex flex-wrap gap-3">
          {item.infopackUrl ? (
            <a
              href={item.infopackUrl}
              target="_blank"
              rel="noreferrer"
              className="rounded-full border border-[var(--ink)] px-4 py-2 text-sm text-[var(--ink)] transition hover:bg-[var(--ink)] hover:text-white"
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
              className="rounded-full border border-[var(--brand)] px-4 py-2 text-sm text-[var(--brand)] transition hover:bg-[var(--brand)] hover:text-white"
            >
              {labels.instagram}
            </a>
          ) : null}
        </div>
      </div>
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
  const labels = pageContent[currentLocale];

  const opportunities = await client.fetch<Opportunity[]>(
    OPPORTUNITIES_QUERY,
    {},
    { next: { revalidate: 60 } }
  );

  const visibleItems = opportunities
    .map((item) => ({
      item,
      status: getOpportunityStatus(item),
    }))
    .filter(
      (entry): entry is { item: Opportunity; status: "open" | "closed" } =>
        entry.status === "open" || entry.status === "closed"
    )
    .sort(sortVisibleItems);

  return (
    <>
      <Navbar locale={currentLocale} />

      <main>
        <section className="bg-[var(--cream)]">
          <div className="mx-auto max-w-6xl px-6 py-20 md:py-28">
            <p className="mb-4 text-sm uppercase tracking-[0.22em] text-[var(--brand)]">
              {labels.eyebrow}
            </p>
            <h1 className="max-w-5xl text-5xl leading-[1.05] font-semibold text-[var(--ink)] md:text-7xl">
              {labels.title}
            </h1>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-[var(--muted)]">
              {labels.intro}
            </p>
          </div>
        </section>

        <section className="bg-white">
          <div className="mx-auto max-w-6xl px-6 py-20">
            <h2 className="text-3xl font-semibold text-[var(--ink)]">
              {labels.applicationsTitle}
            </h2>

            {visibleItems.length === 0 ? (
              <p className="mt-6 text-[var(--muted)]">{labels.empty}</p>
            ) : (
              <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                {visibleItems.map(({ item, status }) => (
                  <ApplicationCard
                    key={item._id}
                    item={item}
                    locale={currentLocale}
                    labels={labels}
                    status={status}
                  />
                ))}
              </div>
            )}
          </div>
        </section>

        <section className="bg-[var(--ink)] text-white">
          <div className="mx-auto max-w-6xl px-6 py-20">
            <h2 className="text-4xl font-semibold leading-tight">
              {currentLocale === "pt"
                ? "Tens dúvidas sobre a candidatura?"
                : "Do you have questions about the application?"}
            </h2>

            <p className="mt-4 max-w-3xl text-lg leading-8 text-white/80">
              {currentLocale === "pt"
                ? "Podes sempre falar connosco diretamente para perceber melhor o perfil do projeto, condições ou processo."
                : "You can always contact us directly to better understand the project profile, conditions, or process."}
            </p>

            <Link
              href={`/${currentLocale}#contact`}
              className="mt-8 inline-block rounded-full bg-[var(--brand)] px-6 py-3 text-sm font-medium text-white transition hover:opacity-90"
            >
              {labels.contact}
            </Link>
          </div>
        </section>
      </main>

      <Footer locale={currentLocale} />
    </>
  );
}
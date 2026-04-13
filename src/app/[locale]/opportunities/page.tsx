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

function ApplicationCard({
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

  return (
    <article
      className={`group relative min-h-[34rem] overflow-hidden rounded-[1.75rem] shadow-sm ring-1 ring-black/5 ${
        status === "closed" ? "opacity-75" : ""
      }`}
    >
      {imageUrl ? (
        <Image
          src={imageUrl}
          alt={item.title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
          className="object-cover object-center"
        />
      ) : (
        <div className="absolute inset-0 bg-[var(--soft)]" />
      )}

      <div className="absolute inset-0 bg-gradient-to-t from-[var(--ink)] via-[var(--ink)]/72 to-[var(--ink)]/18" />

      {status === "closed" ? (
        <div className="absolute right-4 top-4 z-20 rounded-full bg-white/90 px-3 py-1 text-xs font-medium text-[var(--ink)] shadow-sm">
          {labels.closedBanner}
        </div>
      ) : null}

      <div className="relative z-10 flex min-h-[34rem] flex-col p-6 text-white">
        <div className="flex flex-wrap items-center gap-3">
          {item.kind ? (
            <span className="rounded-full bg-white/15 px-3 py-1 text-xs backdrop-blur-sm">
              {formatKind(item.kind, locale)}
            </span>
          ) : null}

          {displayCountry ? (
            <span className="text-sm uppercase tracking-[0.16em] text-white/90">
              {displayCountry}
            </span>
          ) : null}
        </div>

        <div className="mt-20">
          <h3 className="text-3xl font-semibold leading-tight">{item.title}</h3>

          {displayProjectDates ? (
            <p className="mt-2 text-base font-medium text-white/95">
              {displayProjectDates}
            </p>
          ) : null}

          {displaySummary ? (
            <p className="mt-4 max-w-[34ch] leading-7 text-white/84">
              {displaySummary}
            </p>
          ) : null}

          <div className="mt-4 space-y-2 text-sm text-white/88">
            {displayAge ? (
              <p>
                <span className="font-medium">{labels.age}:</span> {displayAge}
              </p>
            ) : null}

            {displayDeadline ? (
              <p className="text-white/78">
                <span className="font-medium">{labels.deadline}:</span> {displayDeadline}
              </p>
            ) : null}
          </div>
        </div>

        <div className="mt-auto pt-6">
          <div className="flex flex-wrap gap-3">
            {item.infopackUrl ? (
              <a
                href={item.infopackUrl}
                target="_blank"
                rel="noreferrer"
                className="rounded-full border border-white/40 bg-white/10 px-4 py-2 text-sm text-white backdrop-blur-sm transition hover:bg-white hover:text-[var(--ink)]"
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
                className="rounded-full border border-white/40 bg-white/10 px-4 py-2 text-sm text-white backdrop-blur-sm transition hover:bg-white hover:text-[var(--ink)]"
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

function ErasmusCard({
  title,
  text,
}: {
  title: string;
  text: string;
}) {
  return (
    <article className="rounded-[1.75rem] bg-white p-6 shadow-sm ring-1 ring-black/5">
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
  const t = dictionary[currentLocale].opportunitiesPage;

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

      <main>
        <section className="bg-[var(--cream)]">
          <div className="mx-auto max-w-6xl px-6 py-8 md:py-10">
            <p className="mb-3 text-sm uppercase tracking-[0.22em] text-[var(--brand)]">
              {t.eyebrow}
            </p>

            <h1 className="max-w-3xl text-4xl leading-[1.08] font-semibold text-[var(--ink)] md:text-5xl">
              {t.title}
            </h1>

            <p className="mt-4 max-w-2xl text-base leading-7 text-[var(--muted)] md:text-lg">
              {t.intro}
            </p>

            <a
              href="#erasmus-explained"
              className="mt-5 inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-medium text-[var(--ink)] ring-1 ring-black/5 transition hover:bg-[var(--ink)] hover:text-white"
            >
              <span>{t.erasmusCta}</span>
              <span aria-hidden="true">→</span>
            </a>
          </div>
        </section>

        <section id="open-applications" className="bg-white">
          <div className="mx-auto max-w-6xl px-6 py-10">
            <h2 className="text-3xl font-semibold text-[var(--ink)]">
              {t.openTitle}
            </h2>

            {openItems.length === 0 ? (
              <p className="mt-6 text-[var(--muted)]">{t.empty}</p>
            ) : (
              <>
                <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                  {openItems.map((item) => (
                    <ApplicationCard
                      key={item._id}
                      item={item}
                      locale={currentLocale}
                      status="open"
                    />
                  ))}
                </div>

                <div className="mt-8 rounded-[1.5rem] bg-[var(--cream)] px-5 py-4 text-sm leading-6 text-[var(--muted)] ring-1 ring-black/5">
                  <p>
                    <span className="font-medium text-[var(--brand)]">
                      {t.fundingTitle}:
                    </span>{" "}
                    {t.fundingText}
                  </p>

                  <p className="mt-2">{t.refundText}</p>

                  {shouldShowMembershipNote ? (
                    <p className="mt-3 border-t border-black/5 pt-3">
                      <span className="font-medium text-[var(--brand)]">
                        {t.membershipTitle}:
                      </span>{" "}
                      {t.membershipText}
                    </p>
                  ) : null}
                </div>
              </>
            )}
          </div>
        </section>

        <section id="erasmus-explained" className="bg-[var(--soft)]">
          <div className="mx-auto max-w-6xl px-6 py-14">
            <div className="max-w-3xl">
              <h2 className="text-3xl font-semibold text-[var(--ink)]">
                {t.erasmusTitle}
              </h2>
              <p className="mt-4 text-lg leading-8 text-[var(--muted)]">
                {t.erasmusIntro}
              </p>
            </div>

            <div className="mt-10 grid gap-6 md:grid-cols-3">
              <ErasmusCard
                title={t.erasmusCard1Title}
                text={t.erasmusCard1Text}
              />
              <ErasmusCard
                title={t.erasmusCard2Title}
                text={t.erasmusCard2Text}
              />
              <ErasmusCard
                title={t.erasmusCard3Title}
                text={t.erasmusCard3Text}
              />
            </div>
          </div>
        </section>

        {closedItems.length > 0 ? (
          <section className="bg-white">
            <div className="mx-auto max-w-6xl px-6 py-14">
              <h2 className="text-3xl font-semibold text-[var(--ink)]">
                {t.closedTitle}
              </h2>

              <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                {closedItems.map((item) => (
                  <ApplicationCard
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

        <section className="bg-[var(--ink)] text-white">
          <div className="mx-auto max-w-6xl px-6 py-20">
            <h2 className="text-4xl font-semibold leading-tight">
              {t.helpTitle}
            </h2>

            <p className="mt-4 max-w-3xl text-lg leading-8 text-white/80">
              {t.helpText}
            </p>

            <Link
              href={`/${currentLocale}#contact`}
              className="mt-8 inline-block rounded-full bg-[var(--brand)] px-6 py-3 text-sm font-medium text-white transition hover:opacity-90"
            >
              {t.contact}
            </Link>
          </div>
        </section>
      </main>

      <Footer locale={currentLocale} />
    </>
  );
}
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
      className={`group relative min-h-[35rem] overflow-hidden rounded-[2rem] ring-1 ring-black/5 shadow-[0_14px_34px_rgba(0,0,0,0.06)] ${
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

      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(20,16,20,0.10)_0%,rgba(20,16,20,0.36)_22%,rgba(20,16,20,0.72)_58%,rgba(20,16,20,0.94)_100%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.08),transparent_32%)]" />

      {status === "closed" ? (
        <div className="absolute right-4 top-4 z-20 rounded-full bg-white/92 px-3 py-1 text-xs font-medium text-[var(--ink)] shadow-sm">
          {labels.closedBanner}
        </div>
      ) : null}

      <div className="relative z-10 flex min-h-[35rem] flex-col p-6 text-white md:p-7">
        <div className="flex flex-wrap items-center gap-3">
          {item.kind ? (
            <span className="rounded-full border border-white/15 bg-white/10 px-3 py-1 text-xs backdrop-blur-sm">
              {formatKind(item.kind, locale)}
            </span>
          ) : null}

          {displayCountry ? (
            <span className="text-xs uppercase tracking-[0.18em] text-white/88">
              {displayCountry}
            </span>
          ) : null}
        </div>

        <div className="mt-16">
          <h3 className="text-3xl font-semibold leading-tight">{item.title}</h3>

          {displayProjectDates ? (
            <p className="mt-3 text-base font-medium text-white/94">
              {displayProjectDates}
            </p>
          ) : null}

          {displaySummary ? (
            <p className="mt-4 max-w-[35ch] leading-7 text-white/84">
              {displaySummary}
            </p>
          ) : null}

          <div className="mt-5 space-y-2 text-sm text-white/88">
            {displayAge ? (
              <p>
                <span className="font-medium text-white">{labels.age}:</span>{" "}
                {displayAge}
              </p>
            ) : null}

            {displayDeadline ? (
              <p>
                <span className="font-medium text-white">{labels.deadline}:</span>{" "}
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

function ErasmusCard({
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

      <main className="bg-[var(--cream)]">
        <section className="relative overflow-hidden border-b border-black/5">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(122,45,45,0.10),transparent_42%)]" />
          <div className="absolute left-[8%] top-10 h-28 w-28 rounded-full bg-[rgba(122,45,45,0.06)] blur-3xl" />
          <div className="absolute right-[10%] top-24 h-32 w-32 rounded-full bg-[rgba(80,116,116,0.06)] blur-3xl" />

          <div className="relative mx-auto max-w-6xl px-6 pb-12 pt-10 md:pb-14 md:pt-12">
            <p className="mb-3 text-sm uppercase tracking-[0.22em] text-[var(--brand)]">
              {t.eyebrow}
            </p>

            <h1 className="max-w-4xl text-4xl font-semibold leading-[1.04] text-[var(--ink)] md:text-6xl">
              {t.title}
            </h1>

            <p className="mt-5 max-w-2xl text-base leading-7 text-[var(--muted)] md:text-lg md:leading-8">
              {t.intro}
            </p>

            <div className="mt-7 flex flex-wrap gap-3">
              <a
                href="#open-applications"
                className="inline-flex items-center gap-2 rounded-full bg-[var(--brand)] px-5 py-3 text-sm font-medium text-white transition hover:opacity-90"
              >
                <span>{t.openTitle}</span>
                <span aria-hidden="true">↓</span>
              </a>

              <a
                href="#erasmus-explained"
                className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-white/70 px-5 py-3 text-sm font-medium text-[var(--ink)] backdrop-blur-sm transition hover:border-[var(--brand)] hover:text-[var(--brand)]"
              >
                <span>{t.erasmusCta}</span>
                <span aria-hidden="true">→</span>
              </a>
            </div>
          </div>
        </section>

        <section id="open-applications" className="relative">
          <div className="pointer-events-none absolute inset-x-0 top-0 hidden h-24 bg-gradient-to-b from-[var(--cream)] to-transparent md:block" />

          <div className="mx-auto max-w-6xl px-6 py-12 md:py-14">
            <SectionHeading title={t.openTitle} />

            {openItems.length === 0 ? (
              <div className="mt-8 rounded-[1.75rem] bg-white/78 p-8 shadow-sm ring-1 ring-black/5 backdrop-blur-sm">
                <p className="text-[var(--muted)]">{t.empty}</p>
              </div>
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

                <aside className="mt-8 rounded-[1.75rem] bg-white/74 p-5 text-sm leading-6 text-[var(--muted)] shadow-sm ring-1 ring-black/5 backdrop-blur-sm md:p-6">
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
                </aside>
              </>
            )}
          </div>
        </section>

        <section id="erasmus-explained" className="bg-white/45">
          <div className="mx-auto max-w-6xl px-6 py-14 md:py-16">
            <SectionHeading title={t.erasmusTitle} text={t.erasmusIntro} />

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
          <section className="bg-[var(--cream)]">
            <div className="mx-auto max-w-6xl px-6 py-14 md:py-16">
              <SectionHeading title={t.closedTitle} />

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

        <section className="bg-[var(--cream)] pb-16 pt-4 md:pb-20">
          <div className="mx-auto max-w-6xl px-6">
            <div className="overflow-hidden rounded-[2rem] bg-[linear-gradient(180deg,#231b24_0%,#2b2631_52%,#25303a_100%)] px-6 py-10 text-white shadow-[0_18px_50px_rgba(0,0,0,0.10)] md:px-10 md:py-12">
              <div className="max-w-3xl">
                <h2 className="text-3xl font-semibold leading-tight md:text-4xl">
                  {t.helpTitle}
                </h2>

                <p className="mt-4 text-base leading-7 text-white/82 md:text-lg md:leading-8">
                  {t.helpText}
                </p>

                <Link
                  href={`/${currentLocale}/contact`}
                  className="mt-8 inline-flex rounded-full bg-[var(--brand)] px-6 py-3 text-sm font-medium text-white transition hover:opacity-90"
                >
                  {t.contact}
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
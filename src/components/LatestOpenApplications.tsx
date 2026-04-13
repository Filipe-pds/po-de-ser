import Image from "next/image";
import Link from "next/link";
import { type Locale } from "@/lib/content";
import { dictionary } from "@/i18n";
import {
  type Opportunity,
  formatDate,
  formatProjectDates,
  getLocalizedCountry,
  getLocalizedSummary,
  getOpportunityStatus,
} from "@/lib/opportunities";
import { client } from "@/sanity/client";
import { urlFor } from "@/sanity/image";
import { OPPORTUNITIES_QUERY } from "@/sanity/queries";

type DisplayCard =
  | {
      type: "opportunity";
      status: "open" | "closed";
      item: Opportunity;
    }
  | {
      type: "placeholder";
    };

function sortByPublishDate(items: Opportunity[]) {
  return [...items].sort((a, b) => {
    const aDate = a.publishDate ? new Date(a.publishDate).getTime() : 0;
    const bDate = b.publishDate ? new Date(b.publishDate).getTime() : 0;
    return bDate - aDate;
  });
}

function buildDisplayCards(opportunities: Opportunity[]): DisplayCard[] {
  const openItems = sortByPublishDate(
    opportunities.filter((item) => getOpportunityStatus(item) === "open")
  );
  const closedItems = sortByPublishDate(
    opportunities.filter((item) => getOpportunityStatus(item) === "closed")
  );

  const cards: DisplayCard[] = [];

  if (openItems.length >= 3) {
    return openItems.slice(0, 3).map((item) => ({
      type: "opportunity",
      status: "open",
      item,
    }));
  }

  if (openItems.length === 2) {
    cards.push(
      ...openItems.slice(0, 2).map((item) => ({
        type: "opportunity" as const,
        status: "open" as const,
        item,
      }))
    );
    cards.push({ type: "placeholder" });
    return cards;
  }

  if (openItems.length === 1) {
    cards.push({
      type: "opportunity",
      status: "open",
      item: openItems[0],
    });

    if (closedItems[0]) {
      cards.push({
        type: "opportunity",
        status: "closed",
        item: closedItems[0],
      });
    }

    cards.push({ type: "placeholder" });
    return cards.slice(0, 3);
  }

  if (closedItems[0]) {
    cards.push({
      type: "opportunity",
      status: "closed",
      item: closedItems[0],
    });
  }

  if (closedItems[1]) {
    cards.push({
      type: "opportunity",
      status: "closed",
      item: closedItems[1],
    });
  }

  cards.push({ type: "placeholder" });

  return cards.slice(0, 3);
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
  const labels = dictionary[locale].latestOpenApplications;

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
      className={`relative min-w-[85vw] snap-start overflow-hidden rounded-[1.75rem] bg-[var(--soft)] shadow-sm ring-1 ring-black/5 md:min-w-0 ${
        status === "closed" ? "opacity-70" : ""
      }`}
    >
      {status === "closed" ? (
        <div className="pointer-events-none absolute right-[-28px] top-4 z-20 rotate-45 bg-[var(--ink)] px-10 py-1 text-xs font-medium text-white">
          {labels.closedBanner}
        </div>
      ) : null}

      {imageUrl ? (
        <div className="relative aspect-[16/10]">
          <Image
            src={imageUrl}
            alt={item.title}
            fill
            sizes="(max-width: 768px) 85vw, (max-width: 1280px) 50vw, 33vw"
            className="object-cover"
          />
        </div>
      ) : null}

      <div className="p-6">
        {displayCountry ? (
          <p className="text-sm uppercase tracking-[0.16em] text-[var(--brand)]">
            {displayCountry}
          </p>
        ) : null}

        <h3 className="mt-3 text-2xl font-semibold text-[var(--ink)]">
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
        </div>
      </div>
    </article>
  );
}

function PlaceholderCard({ locale }: { locale: Locale }) {
  const labels = dictionary[locale].latestOpenApplications;

  return (
    <article className="min-w-[85vw] snap-start rounded-[1.75rem] border border-dashed border-[var(--brand)]/30 bg-[var(--cream)] p-6 md:min-w-0">
      <p className="text-sm uppercase tracking-[0.16em] text-[var(--brand)]/80">
        {labels.comingSoonEyebrow}
      </p>

      <h3 className="mt-3 text-2xl font-semibold text-[var(--ink)]">
        {labels.comingSoonTitle}
      </h3>

      <p className="mt-4 leading-7 text-[var(--muted)]">
        {labels.comingSoonText}
      </p>

      <div className="mt-6">
        <Link
          href={`/${locale}/opportunities`}
          className="inline-block rounded-full bg-[var(--ink)] px-5 py-3 text-sm font-medium text-white transition hover:opacity-90"
        >
          {labels.all}
        </Link>
      </div>
    </article>
  );
}

export default async function LatestOpenApplications({
  locale,
}: {
  locale: Locale;
}) {
  const labels = dictionary[locale].latestOpenApplications;

  const opportunities = await client.fetch<Opportunity[]>(
    OPPORTUNITIES_QUERY,
    {},
    { next: { revalidate: 60 } }
  );

  const openCount = opportunities.filter(
    (item) => getOpportunityStatus(item) === "open"
  ).length;

  const cards = buildDisplayCards(opportunities);

  const sectionTitle = openCount > 0 ? labels.titleOpen : labels.titleRecent;
  const sectionIntro = openCount > 0 ? labels.introOpen : labels.introRecent;

  return (
    <section className="bg-white">
      <div className="mx-auto max-w-6xl px-6 py-20">
        <div className="max-w-3xl">
          <h2 className="text-3xl font-semibold text-[var(--ink)]">
            {sectionTitle}
          </h2>
          <p className="mt-4 text-lg leading-8 text-[var(--muted)]">
            {sectionIntro}
          </p>
        </div>

        <div className="mt-10 flex snap-x snap-mandatory gap-6 overflow-x-auto pb-2 md:grid md:grid-cols-2 md:overflow-visible xl:grid-cols-3">
          {cards.map((card, index) => {
            if (card.type === "placeholder") {
              return (
                <PlaceholderCard
                  key={`placeholder-${index}`}
                  locale={locale}
                />
              );
            }

            return (
              <OpportunityCard
                key={`${card.status}-${card.item._id}`}
                item={card.item}
                locale={locale}
                status={card.status}
              />
            );
          })}
        </div>

        <div className="mt-10">
          <Link
            href={`/${locale}/opportunities`}
            className="inline-block rounded-full bg-[var(--ink)] px-6 py-3 text-sm font-medium text-white transition hover:opacity-90"
          >
            {labels.all}
          </Link>
        </div>
      </div>
    </section>
  );
}
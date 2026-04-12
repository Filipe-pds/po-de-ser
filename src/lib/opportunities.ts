import type { Locale } from "@/lib/content";

export type Opportunity = {
  _id: string;
  title: string;
  slug?: { current?: string };
  thumbnail?: any;
  summary?: string;
  summaryEn?: string;
  kind?: "youth-exchange" | "training-course" | "esc" | "other";
  country?: string;
  countryEn?: string;
  city?: string;
  projectStartDate?: string;
  projectEndDate?: string;
  publishDate?: string;
  applicationDeadline?: string;
  archiveAfterDays?: number;
  statusMode?: "auto" | "open" | "closed" | "past";
  featured?: boolean;
  infopackUrl?: string;
  applicationUrl?: string;
  instagramUrl?: string;
};

export function getOpportunityStatus(item: Opportunity): "open" | "closed" | "past" {
  if (item.statusMode === "open") return "open";
  if (item.statusMode === "closed") return "closed";
  if (item.statusMode === "past") return "past";

  if (!item.applicationDeadline) return "open";

  const now = new Date();
  const deadline = new Date(item.applicationDeadline);

  if (Number.isNaN(deadline.getTime())) return "open";
  if (now <= deadline) return "open";

  const keepDays = item.archiveAfterDays ?? 14;
  const archiveDate = new Date(deadline);
  archiveDate.setDate(archiveDate.getDate() + keepDays);

  if (now <= archiveDate) return "closed";
  return "past";
}

export function getLocalizedSummary(item: Opportunity, locale: Locale) {
  if (locale === "en") return item.summaryEn || item.summary || "";
  return item.summary || item.summaryEn || "";
}

export function getLocalizedCountry(item: Opportunity, locale: Locale) {
  if (locale === "en") return item.countryEn || item.country || "";
  return item.country || item.countryEn || "";
}

export function formatDate(dateString: string | undefined, locale: Locale) {
  if (!dateString) return "";
  const date = new Date(dateString);

  if (Number.isNaN(date.getTime())) return "";

  return new Intl.DateTimeFormat(locale === "pt" ? "pt-PT" : "en-US", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(date);
}

export function formatProjectDates(
  startDate: string | undefined,
  endDate: string | undefined,
  locale: Locale
) {
  const start = formatDate(startDate, locale);
  const end = formatDate(endDate, locale);

  if (start && end) return `${start} → ${end}`;
  if (start) return start;
  if (end) return end;
  return "";
}

export function formatKind(kind: Opportunity["kind"], locale: Locale) {
  const labels = {
    pt: {
      "youth-exchange": "Intercâmbio Juvenil",
      "training-course": "Curso de Formação",
      esc: "ESC",
      other: "Outro",
    },
    en: {
      "youth-exchange": "Youth Exchange",
      "training-course": "Training Course",
      esc: "ESC",
      other: "Other",
    },
  } as const;

  if (!kind) return "";
  return labels[locale][kind] || kind;
}
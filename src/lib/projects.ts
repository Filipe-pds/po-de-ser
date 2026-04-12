import type { Locale } from "@/lib/content";

export type Project = {
  _id: string;
  title: string;
  slug?: { current?: string };
  coverImage?: any;
  summary?: string;
  summaryEn?: string;
  kind?: "youth-exchange" | "training-course" | "ka2" | "local-activity" | "other";
  status?: "implemented" | "ongoing" | "planned";
  country?: string;
  countryEn?: string;
  city?: string;
  startDate?: string;
  endDate?: string;
  year?: string;
  featured?: boolean;
  mainInfoUrl?: string;
};

export function getLocalizedProjectSummary(project: Project, locale: Locale) {
  if (locale === "en") return project.summaryEn || project.summary || "";
  return project.summary || project.summaryEn || "";
}

export function getLocalizedProjectCountry(project: Project, locale: Locale) {
  if (locale === "en") return project.countryEn || project.country || "";
  return project.country || project.countryEn || "";
}

export function formatProjectDate(dateString: string | undefined, locale: Locale) {
  if (!dateString) return "";
  const date = new Date(dateString);

  if (Number.isNaN(date.getTime())) return "";

  return new Intl.DateTimeFormat(locale === "pt" ? "pt-PT" : "en-US", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(date);
}

export function formatProjectDateRange(
  startDate: string | undefined,
  endDate: string | undefined,
  locale: Locale
) {
  const start = formatProjectDate(startDate, locale);
  const end = formatProjectDate(endDate, locale);

  if (start && end) return `${start} → ${end}`;
  if (start) return start;
  if (end) return end;
  return "";
}

export function formatProjectKind(kind: Project["kind"], locale: Locale) {
  const labels = {
    pt: {
      "youth-exchange": "Intercâmbio Juvenil",
      "training-course": "Curso de Formação",
      ka2: "KA2 / Parceria",
      "local-activity": "Atividade Local",
      other: "Outro",
    },
    en: {
      "youth-exchange": "Youth Exchange",
      "training-course": "Training Course",
      ka2: "KA2 / Partnership",
      "local-activity": "Local Activity",
      other: "Other",
    },
  } as const;

  if (!kind) return "";
  return labels[locale][kind] || kind;
}

export function formatProjectStatus(status: Project["status"], locale: Locale) {
  const labels = {
    pt: {
      implemented: "Implementado",
      ongoing: "Em curso",
      planned: "Planeado",
    },
    en: {
      implemented: "Implemented",
      ongoing: "Ongoing",
      planned: "Planned",
    },
  } as const;

  if (!status) return "";
  return labels[locale][status] || status;
}
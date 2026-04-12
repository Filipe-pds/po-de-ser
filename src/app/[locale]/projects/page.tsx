import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { locales, type Locale } from "@/lib/content";
import {
  type Project,
  formatProjectDateRange,
  formatProjectKind,
  formatProjectStatus,
  getLocalizedProjectCountry,
  getLocalizedProjectSummary,
} from "@/lib/projects";
import { client } from "@/sanity/client";
import { urlFor } from "@/sanity/image";
import { PROJECTS_QUERY } from "@/sanity/queries";

const pageContent = {
  pt: {
    eyebrow: "Projetos",
    title: "Experiências que criam impacto.",
    intro:
      "Os nossos projetos nascem da vontade de criar experiências significativas para jovens, onde arte, bem-estar, mobilidade internacional, criatividade e ligação humana se cruzam.",
    empty: "Ainda não há projetos publicados.",
    dates: "Datas",
    info: "Mais informação",
    contact: "Entrar em contacto",
    closingTitle: "Cada projeto é um convite para descobrir, sentir e criar.",
    closingText:
      "Estamos a construir um percurso onde os projetos não são apenas atividades, mas experiências transformadoras.",
  },
  en: {
    eyebrow: "Projects",
    title: "Experiences that create impact.",
    intro:
      "Our projects are born from the desire to create meaningful experiences for young people, where art, well-being, international mobility, creativity, and human connection meet.",
    empty: "There are no published projects yet.",
    dates: "Dates",
    info: "More info",
    contact: "Contact us",
    closingTitle: "Each project is an invitation to discover, feel, and create.",
    closingText:
      "We are building a path where projects are not just activities, but transformative experiences.",
  },
} as const;

export default async function ProjectsPage({
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

  const projects = await client.fetch<Project[]>(
    PROJECTS_QUERY,
    {},
    { next: { revalidate: 60 } }
  );

  return (
    <>
      <Navbar locale={currentLocale} />

      <main>
        <section className="bg-[var(--cream)]">
          <div className="mx-auto max-w-6xl px-6 py-20 md:py-28">
            <p className="mb-4 text-sm uppercase tracking-[0.22em] text-[var(--brand)]">
              {labels.eyebrow}
            </p>
            <h1 className="max-w-4xl text-5xl leading-[1.05] font-semibold text-[var(--ink)] md:text-7xl">
              {labels.title}
            </h1>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-[var(--muted)]">
              {labels.intro}
            </p>
          </div>
        </section>

        <section className="bg-white">
          <div className="mx-auto max-w-6xl px-6 py-20">
            {projects.length === 0 ? (
              <p className="text-[var(--muted)]">{labels.empty}</p>
            ) : (
              <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
                {projects.map((project) => {
                  const imageUrl = project.coverImage
                    ? urlFor(project.coverImage).width(900).height(600).fit("crop").url()
                    : null;

                  const displaySummary = getLocalizedProjectSummary(project, currentLocale);
                  const displayCountry = getLocalizedProjectCountry(project, currentLocale);
                  const displayDates = formatProjectDateRange(
                    project.startDate,
                    project.endDate,
                    currentLocale
                  );
                  const displayKind = formatProjectKind(project.kind, currentLocale);
                  const displayStatus = formatProjectStatus(project.status, currentLocale);

                  return (
                    <article
                      key={project._id}
                      className="overflow-hidden rounded-[1.75rem] bg-[var(--soft)] shadow-sm ring-1 ring-black/5"
                    >
                      {imageUrl ? (
                        <div className="relative aspect-[16/10]">
                          <Image
                            src={imageUrl}
                            alt={project.title}
                            fill
                            sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                            className="object-cover"
                          />
                        </div>
                      ) : null}

                      <div className="p-6">
                        <div className="flex flex-wrap items-center gap-3">
                          {displayKind ? (
                            <span className="rounded-full bg-[var(--cream)] px-3 py-1 text-xs text-[var(--muted)]">
                              {displayKind}
                            </span>
                          ) : null}

                          {displayStatus ? (
                            <span className="rounded-full border border-[var(--brand)]/20 px-3 py-1 text-xs text-[var(--brand)]">
                              {displayStatus}
                            </span>
                          ) : null}
                        </div>

                        {displayCountry ? (
                          <p className="mt-4 text-sm uppercase tracking-[0.16em] text-[var(--brand)]">
                            {displayCountry}
                          </p>
                        ) : null}

                        <h2 className="mt-3 text-2xl font-semibold text-[var(--ink)]">
                          {project.title}
                        </h2>

                        {displaySummary ? (
                          <p className="mt-4 leading-7 text-[var(--muted)]">
                            {displaySummary}
                          </p>
                        ) : null}

                        {displayDates ? (
                          <p className="mt-4 text-sm font-medium text-[var(--muted)]">
                            {labels.dates}: {displayDates}
                          </p>
                        ) : null}

                        {project.year ? (
                          <p className="mt-2 text-sm text-[var(--muted)]">
                            {project.year}
                          </p>
                        ) : null}

                        {project.mainInfoUrl ? (
                          <div className="mt-6">
                            <a
                              href={project.mainInfoUrl}
                              target="_blank"
                              rel="noreferrer"
                              className="inline-block rounded-full bg-[var(--ink)] px-5 py-3 text-sm font-medium text-white transition hover:opacity-90"
                            >
                              {labels.info}
                            </a>
                          </div>
                        ) : null}
                      </div>
                    </article>
                  );
                })}
              </div>
            )}
          </div>
        </section>

        <section className="bg-[var(--ink)] text-white">
          <div className="mx-auto max-w-6xl px-6 py-20">
            <h2 className="max-w-3xl text-4xl leading-tight font-semibold">
              {labels.closingTitle}
            </h2>
            <p className="mt-4 max-w-3xl text-lg leading-8 text-white/80">
              {labels.closingText}
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
import Image from "next/image";
import { notFound } from "next/navigation";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { dictionary } from "@/i18n";
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

function getProjectSortValue(project: Project) {
  const primaryDate = project.endDate ?? project.startDate;

  if (primaryDate) {
    const parsed = new Date(primaryDate).getTime();
    if (!Number.isNaN(parsed)) return parsed;
  }

  if (project.year) {
    const yearNumber =
      typeof project.year === "number" ? project.year : Number(project.year);

    if (!Number.isNaN(yearNumber)) {
      return new Date(`${yearNumber}-12-31`).getTime();
    }
  }

  return 0;
}

function sortProjects(items: Project[]) {
  return [...items].sort((a, b) => getProjectSortValue(b) - getProjectSortValue(a));
}

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
  const t = dictionary[currentLocale].projectsPage;

  const pageCopy =
    currentLocale === "pt"
      ? {
          eyebrow: "Projetos",
          title: "O que fomos criando.",
          intro:
            "Experiências, encontros e processos que nasceram do caminho que temos feito.",
          coordinatedEyebrow: "Coordenados por nós",
          coordinatedText:
            "Os projetos abaixo foram coordenados pela Pó de Ser e desenvolvidos a partir da nossa visão, prática e experiência.",
        }
      : {
          eyebrow: "Projects",
          title: "What we have been creating.",
          intro:
            "Experiences, encounters, and processes that have emerged from the path we have been making.",
          coordinatedEyebrow: "Coordinated by us",
          coordinatedText:
            "The projects below were coordinated by Pó de Ser and developed through our vision, practice, and experience.",
        };

  const projects = await client.fetch<Project[]>(
    PROJECTS_QUERY,
    {},
    { next: { revalidate: 60 } }
  );

  const sortedProjects = sortProjects(projects);

  const heroImageUrl = "/projects/cover.jpg";

  return (
    <>
      <Navbar locale={currentLocale} />

      <main className="bg-[var(--cream)]">
        <section className="relative min-h-[calc(100svh-72px)] overflow-hidden text-white">
          {heroImageUrl ? (
            <Image
              src={heroImageUrl}
              alt={pageCopy.title}
              fill
              priority
              sizes="100vw"
              className="object-cover object-[50%_22%]"
            />
          ) : (
            <div className="absolute inset-0 bg-[linear-gradient(180deg,#2d2330_0%,#1a161d_100%)]" />
          )}

          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(15,12,15,0.70)_0%,rgba(15,12,15,0.46)_34%,rgba(15,12,15,0.18)_62%,rgba(15,12,15,0.28)_100%)]" />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(15,12,15,0.08)_0%,rgba(15,12,15,0.16)_34%,rgba(15,12,15,0.60)_100%)]" />

          <div className="relative z-10 mx-auto flex min-h-[calc(100svh-72px)] max-w-6xl items-end px-6 pb-16 pt-24 md:pb-20">
            <div className="max-w-3xl">
              <p className="mb-3 text-sm uppercase tracking-[0.22em] text-white/82">
                {pageCopy.eyebrow}
              </p>

              <h1 className="max-w-[10ch] text-4xl font-semibold leading-[1.02] text-white md:text-6xl">
                {pageCopy.title}
              </h1>

              <p className="mt-5 max-w-[34rem] text-base leading-7 text-white/84 md:text-lg md:leading-8">
                {pageCopy.intro}
              </p>
            </div>
          </div>

          <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-b from-transparent via-[rgba(247,241,232,0.08)] to-[var(--cream)]" />
        </section>

        <section className="bg-[var(--cream)]">
          <div className="mx-auto max-w-6xl px-6 py-12 md:py-14">
<div className="mb-12 max-w-6xl">
  <p className="text-lg leading-8 text-[var(--ink)] md:text-[1.45rem] md:leading-[1.7]">
    {currentLocale === "pt"
      ? "Aqui encontras projetos desenvolvidos pela Pó de Ser, como coordenadora ou parceira."
      : "Here you can find projects developed by Pó de Ser, as coordinator or partner."}
  </p>
</div>

            {sortedProjects.length === 0 ? (
              <div className="rounded-[1.75rem] bg-white/78 p-8 shadow-sm ring-1 ring-black/5 backdrop-blur-sm">
                <p className="text-[var(--muted)]">{t.empty}</p>
              </div>
            ) : (
              <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
                {sortedProjects.map((project) => {
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
                      className="flex h-full flex-col overflow-hidden rounded-[1.9rem] bg-white shadow-sm ring-1 ring-black/5"
                    >
                      {imageUrl ? (
                        <div className="relative aspect-[16/10] overflow-hidden">
                          <Image
                            src={imageUrl}
                            alt={project.title}
                            fill
                            sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                            className="object-cover transition duration-700 hover:scale-[1.03]"
                          />
                        </div>
                      ) : (
                        <div className="aspect-[16/10] bg-[var(--soft)]" />
                      )}

                      <div className="flex flex-1 flex-col p-6">
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
                            {t.dates}: {displayDates}
                          </p>
                        ) : project.year ? (
                          <p className="mt-4 text-sm font-medium text-[var(--muted)]">
                            {project.year}
                          </p>
                        ) : null}

                        {project.mainInfoUrl ? (
                          <div className="mt-auto pt-6">
                            <a
                              href={project.mainInfoUrl}
                              target="_blank"
                              rel="noreferrer"
                              className="inline-block rounded-full bg-[var(--ink)] px-5 py-3 text-sm font-medium text-white transition hover:opacity-90"
                            >
                              {t.info}
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
      </main>

      <Footer locale={currentLocale} />
    </>
  );
}
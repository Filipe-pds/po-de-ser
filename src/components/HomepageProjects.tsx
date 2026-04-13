import Image from "next/image";
import Link from "next/link";
import type { Locale } from "@/lib/content";
import { dictionary } from "@/i18n";
import {
  type Project,
  getLocalizedProjectCountry,
  getLocalizedProjectSummary,
} from "@/lib/projects";
import { client } from "@/sanity/client";
import { urlFor } from "@/sanity/image";
import { PROJECTS_QUERY } from "@/sanity/queries";

export default async function HomepageProjects({
  locale,
}: {
  locale: Locale;
}) {
  const t = dictionary[locale].home.projects;

  const projects = await client.fetch<Project[]>(
    PROJECTS_QUERY,
    {},
    { next: { revalidate: 60 } }
  );

  const featuredProjects =
    projects.filter((project) => project.featured).slice(0, 3).length > 0
      ? projects.filter((project) => project.featured).slice(0, 3)
      : projects.slice(0, 3);

  return (
    <section id="projects" className="bg-[var(--soft)]">
      <div className="mx-auto max-w-6xl px-6 py-20">
        <div className="max-w-3xl">
          <h2 className="text-3xl font-semibold text-[var(--ink)]">
            {t.title}
          </h2>
          <p className="mt-4 text-lg leading-8 text-[var(--muted)]">
            {t.intro}
          </p>
        </div>

        {featuredProjects.length === 0 ? (
          <p className="mt-8 text-[var(--muted)]">{t.empty}</p>
        ) : (
          <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {featuredProjects.map((project) => {
              const imageUrl = project.coverImage
                ? urlFor(project.coverImage).width(900).height(600).fit("crop").url()
                : null;

              const summary = getLocalizedProjectSummary(project, locale);
              const country = getLocalizedProjectCountry(project, locale);

              return (
                <article
                  key={project._id}
                  className="overflow-hidden rounded-[1.75rem] bg-white shadow-sm ring-1 ring-black/5"
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
                    {country ? (
                      <p className="text-sm uppercase tracking-[0.16em] text-[var(--brand)]">
                        {country}
                      </p>
                    ) : null}

                    <h3 className="mt-3 text-2xl font-semibold text-[var(--ink)]">
                      {project.title}
                    </h3>

                    {summary ? (
                      <p className="mt-4 leading-7 text-[var(--muted)]">
                        {summary}
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

        <div className="mt-10">
          <Link
            href={`/${locale}/projects`}
            className="inline-block rounded-full bg-[var(--brand)] px-6 py-3 text-sm font-medium text-white transition hover:opacity-90"
          >
            {t.all}
          </Link>
        </div>
      </div>
    </section>
  );
}
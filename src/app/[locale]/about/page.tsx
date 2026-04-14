import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { teamMembers } from "@/data/team";
import { dictionary } from "@/i18n";
import { locales, type Locale } from "@/lib/content";

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!locales.includes(locale as Locale)) {
    notFound();
  }

  const currentLocale = locale as Locale;
  const t = dictionary[currentLocale];

  const teamSection =
    currentLocale === "pt"
      ? {
          title: "Equipa",
          intro:
            "A Pó de Ser é construída por pessoas com diferentes experiências, sensibilidades e competências, unidas pela vontade de criar oportunidades significativas para jovens.",
        }
      : {
          title: "Team",
          intro:
            "Pó de Ser is built by people with different experiences, sensitivities, and skills, united by the desire to create meaningful opportunities for young people.",
        };

  return (
    <>
      <Navbar locale={currentLocale} />

      <main>
        <section className="bg-[var(--cream)]">
          <div className="mx-auto max-w-6xl px-6 py-20 md:py-28">
            <p className="mb-4 text-sm uppercase tracking-[0.22em] text-[var(--brand)]">
              {t.aboutPage.eyebrow}
            </p>
            <h1 className="max-w-4xl text-5xl leading-[1.05] font-semibold text-[var(--ink)] md:text-7xl">
              {t.aboutPage.title}
            </h1>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-[var(--muted)]">
              {t.aboutPage.intro}
            </p>
            <p className="mt-4 max-w-3xl text-lg leading-8 text-[var(--muted)]">
              {t.aboutPage.intro2}
            </p>
          </div>
        </section>

        <section className="bg-white">
          <div className="mx-auto max-w-6xl px-6 py-20">
            <h2 className="text-3xl font-semibold text-[var(--ink)]">
              {t.aboutPage.focusTitle}
            </h2>

            <div className="mt-8 grid gap-4 md:grid-cols-2">
              {t.aboutPage.focusItems.map((item) => (
                <div
                  key={item}
                  className="rounded-[1.5rem] bg-[var(--soft)] p-6 ring-1 ring-black/5"
                >
                  <p className="leading-7 text-[var(--muted)]">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-[var(--soft)]">
          <div className="mx-auto max-w-6xl px-6 py-20">
            <h2 className="mb-10 text-3xl font-semibold text-[var(--ink)]">
              {t.home.pillars.title}
            </h2>

            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {t.home.pillars.items.map((item) => (
                <article
                  key={item.title}
                  className="rounded-[1.75rem] bg-white p-6 shadow-sm ring-1 ring-black/5"
                >
                  <h3 className="text-xl font-semibold text-[var(--brand)]">
                    {item.title}
                  </h3>
                  <p className="mt-3 leading-7 text-[var(--muted)]">
                    {item.description}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-white">
          <div className="mx-auto max-w-6xl px-6 py-20">
            <h2 className="mb-10 text-3xl font-semibold text-[var(--ink)]">
              {t.home.impact.title}
            </h2>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
              {t.home.impact.stats.map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-[1.5rem] border border-black/5 bg-[var(--cream)] p-6"
                >
                  <p className="text-3xl font-semibold text-[var(--brand)]">
                    {stat.value}
                  </p>
                  <p className="mt-2 text-sm leading-6 text-[var(--muted)]">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-[var(--soft)]">
          <div className="mx-auto max-w-6xl px-6 py-20">
            <div className="max-w-3xl">
              <h2 className="text-3xl font-semibold text-[var(--ink)]">
                {teamSection.title}
              </h2>
              <p className="mt-4 text-lg leading-8 text-[var(--muted)]">
                {teamSection.intro}
              </p>
            </div>

            <div className="mt-14 grid gap-x-10 gap-y-16 md:grid-cols-2 xl:grid-cols-3">
              {teamMembers.map((member) => (
                <article key={member.name} className="relative">
                  <div className="group relative">
                    <div className="relative aspect-[4/4] overflow-visible">
                      <div className="relative h-full w-full overflow-hidden rounded-t-[1.75rem] bg-[var(--cream)]">
                        <Image
                          src={member.image}
                          alt={member.name}
                          fill
                          sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                          className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                        />

                        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/8 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                      </div>

                      {member.creatureLeft ? (
                        <Image
                          src={member.creatureLeft}
                          alt={member.creatureLeftAlt || "Creature"}
                          width={member.creatureLeftSize || 150}
                          height={member.creatureLeftSize || 150}
                          className={`pointer-events-none absolute z-10 hidden rotate-[-14deg] opacity-0 transition-all duration-500 group-hover:opacity-100 md:block ${
                            member.creatureLeftClass ||
                            "left-[-1.25rem] top-[2.5rem] group-hover:left-[-2rem] group-hover:top-[-0.75rem]"
                          }`}
                        />
                      ) : null}

                      {member.creatureRight ? (
                        <Image
                          src={member.creatureRight}
                          alt={member.creatureRightAlt || "Creature"}
                          width={member.creatureRightSize || 150}
                          height={member.creatureRightSize || 150}
                          className={`pointer-events-none absolute z-10 hidden rotate-[14deg] opacity-0 transition-all duration-500 group-hover:opacity-100 md:block ${
                            member.creatureRightClass ||
                            "right-[-1.25rem] top-[2.5rem] group-hover:right-[-2rem] group-hover:top-[-0.75rem]"
                          }`}
                        />
                      ) : null}

                      {member.foregroundImage ? (
                        <Image
                          src={member.foregroundImage}
                          alt={member.name}
                          fill
                          sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                          className="pointer-events-none absolute inset-0 z-20 object-cover"
                        />
                      ) : null}
                    </div>

                    <div className="rounded-b-[1.75rem] bg-white p-6 shadow-sm ring-1 ring-black/5">
                      <h3 className="text-2xl font-semibold text-[var(--ink)]">
                        {member.name}
                      </h3>

                      <p className="mt-2 text-sm uppercase tracking-[0.16em] text-[var(--brand)]">
                        {member.role[currentLocale]}
                      </p>

                      <p className="mt-4 leading-7 text-[var(--muted)]">
                        {member.bio[currentLocale]}
                      </p>

                      {member.links ? (
                        <div className="mt-5 flex flex-wrap gap-3">
                          {member.links.email ? (
                            <a
                              href={`mailto:${member.links.email}`}
                              className="rounded-full border border-[var(--ink)] px-4 py-2 text-sm text-[var(--ink)] transition hover:bg-[var(--ink)] hover:text-white"
                            >
                              Email
                            </a>
                          ) : null}

                          {member.links.instagram ? (
                            <a
                              href={member.links.instagram}
                              target="_blank"
                              rel="noreferrer"
                              className="rounded-full border border-[var(--brand)] px-4 py-2 text-sm text-[var(--brand)] transition hover:bg-[var(--brand)] hover:text-white"
                            >
                              Instagram
                            </a>
                          ) : null}

                          {member.links.linkedin ? (
                            <a
                              href={member.links.linkedin}
                              target="_blank"
                              rel="noreferrer"
                              className="rounded-full border border-[var(--brand)] px-4 py-2 text-sm text-[var(--brand)] transition hover:bg-[var(--brand)] hover:text-white"
                            >
                              LinkedIn
                            </a>
                          ) : null}

                          {member.links.website ? (
                            <a
                              href={member.links.website}
                              target="_blank"
                              rel="noreferrer"
                              className="rounded-full border border-[var(--brand)] px-4 py-2 text-sm text-[var(--brand)] transition hover:bg-[var(--brand)] hover:text-white"
                            >
                              Website
                            </a>
                          ) : null}
                        </div>
                      ) : null}
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-[var(--ink)] text-white">
          <div className="mx-auto max-w-6xl px-6 py-20">
            <h2 className="max-w-3xl text-4xl leading-tight font-semibold">
              {t.aboutPage.ctaTitle}
            </h2>
            <p className="mt-4 max-w-3xl text-lg leading-8 text-white/80">
              {t.aboutPage.ctaText}
            </p>

            <Link
              href={`/${currentLocale}/projects`}
              className="mt-8 inline-block rounded-full bg-[var(--brand)] px-6 py-3 text-sm font-medium text-white transition hover:opacity-90"
            >
              {t.aboutPage.ctaButton}
            </Link>
          </div>
        </section>
      </main>

      <Footer locale={currentLocale} />
    </>
  );
}
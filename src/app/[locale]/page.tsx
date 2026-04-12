import Link from "next/link";
import { notFound } from "next/navigation";
import Footer from "@/components/Footer";
import HeroDustBackground from "@/components/HeroDustBackground";
import Navbar from "@/components/Navbar";
import LatestOpenApplications from "@/components/LatestOpenApplications";
import { locales, type Locale, siteContent } from "@/lib/content";
import { homeData } from "@/lib/home-data";

export default async function LocalizedHomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!locales.includes(locale as Locale)) {
    notFound();
  }

  const currentLocale = locale as Locale;
  const content = siteContent[currentLocale];
  const extra = homeData[currentLocale];

  return (
    <>
      <Navbar locale={currentLocale} />

      <main>
        <section className="relative overflow-hidden text-white">
          <HeroDustBackground />

          <div className="relative z-10 mx-auto flex min-h-[calc(100svh-92px)] max-w-6xl items-center px-6 py-16 md:py-24">
            <div className="max-w-3xl">
              <p className="mb-4 text-sm uppercase tracking-[0.22em] text-white/80">
                {content.hero.eyebrow}
              </p>

              <h1 className="max-w-3xl text-5xl leading-[1.02] font-semibold text-white md:text-7xl">
                {content.hero.title}
              </h1>

              <p className="mt-6 max-w-2xl text-lg leading-8 text-white/75">
                {content.hero.subtitle}
              </p>

              <p className="mt-8 max-w-xl text-xl leading-9 text-white/82">
                {content.about.quote}
              </p>

              <div className="mt-10 flex flex-wrap gap-4">
                <Link
                  href={`/${currentLocale}/about`}
                  className="rounded-full bg-[var(--brand)] px-6 py-3 text-sm font-medium text-white transition hover:opacity-90"
                >
                  {content.hero.ctaPrimary}
                </Link>
                <Link
                  href={`/${currentLocale}#contact`}
                  className="rounded-full border border-white/20 px-6 py-3 text-sm font-medium text-white transition hover:bg-white hover:text-[var(--ink)]"
                >
                  {content.hero.ctaSecondary}
                </Link>
              </div>
            </div>
          </div>
        </section>

        <LatestOpenApplications locale={currentLocale} />

        <section id="about" className="bg-white">
          <div className="mx-auto max-w-6xl px-6 py-20">
            <div className="max-w-3xl">
              <p className="mb-4 text-sm uppercase tracking-[0.22em] text-[var(--brand)]">
                {content.about.title}
              </p>
              <p className="text-2xl leading-10 text-[var(--ink)]">
                {content.about.text}
              </p>
            </div>
          </div>
        </section>

        <section id="pillars" className="bg-[var(--soft)]">
          <div className="mx-auto max-w-6xl px-6 py-20">
            <h2 className="mb-10 text-3xl font-semibold text-[var(--ink)]">
              {content.pillars.title}
            </h2>

            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {content.pillars.items.map((item) => (
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

        <section id="impact" className="bg-white">
          <div className="mx-auto max-w-6xl px-6 py-20">
            <h2 className="mb-10 text-3xl font-semibold text-[var(--ink)]">
              {content.impact.title}
            </h2>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
              {content.impact.stats.map((stat) => (
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

        <section id="projects" className="bg-[var(--soft)]">
          <div className="mx-auto max-w-6xl px-6 py-20">
            <div className="max-w-3xl">
              <h2 className="text-3xl font-semibold text-[var(--ink)]">
                {extra.projectsTitle}
              </h2>
              <p className="mt-4 text-lg leading-8 text-[var(--muted)]">
                {extra.projectsIntro}
              </p>
            </div>

            <div className="mt-10 grid gap-6 md:grid-cols-3">
              {extra.projects.map((project) => (
                <article
                  key={project.title}
                  className="rounded-[1.75rem] bg-white p-6 shadow-sm ring-1 ring-black/5"
                >
                  <p className="text-sm uppercase tracking-[0.18em] text-[var(--brand)]">
                    {project.year}
                  </p>
                  <h3 className="mt-3 text-2xl font-semibold text-[var(--ink)]">
                    {project.title}
                  </h3>
                  <p className="mt-4 leading-7 text-[var(--muted)]">
                    {project.text}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="contact" className="bg-[var(--ink)] text-white">
          <div className="mx-auto max-w-6xl px-6 py-20">
            <div className="max-w-3xl">
              <h2 className="text-3xl font-semibold">{content.contact.title}</h2>
              <p className="mt-4 text-lg leading-8 text-white/80">
                {content.contact.text}
              </p>

              <div className="mt-8 flex flex-wrap gap-4">
                <a
                  href={`mailto:${content.contact.email}`}
                  className="rounded-full bg-[var(--brand)] px-6 py-3 text-sm font-medium text-white transition hover:opacity-90"
                >
                  {content.contact.button}
                </a>
                <a
                  href={content.contact.instagram}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-full border border-white/20 px-6 py-3 text-sm font-medium text-white transition hover:bg-white hover:text-[var(--ink)]"
                >
                  Instagram
                </a>
                <a
                  href={content.contact.facebook}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-full border border-white/20 px-6 py-3 text-sm font-medium text-white transition hover:bg-white hover:text-[var(--ink)]"
                >
                  Facebook
                </a>
              </div>

              <div className="mt-8 space-y-2 text-white/80">
                <p>{content.contact.email}</p>
                <p>{content.contact.projectEmail}</p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer locale={currentLocale} />
    </>
  );
}
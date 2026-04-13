import Link from "next/link";
import { notFound } from "next/navigation";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
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
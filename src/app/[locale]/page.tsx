import Link from "next/link";
import { notFound } from "next/navigation";
import Footer from "@/components/Footer";
import HeroDustBackground from "@/components/HeroDustBackground";
import HomepageProjects from "@/components/HomepageProjects";
import Navbar from "@/components/Navbar";
import LatestOpenApplications from "@/components/LatestOpenApplications";
import { dictionary } from "@/i18n";
import { locales, type Locale } from "@/lib/content";

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
  const t = dictionary[currentLocale];

  return (
    <>
      <Navbar locale={currentLocale} />

      <main>
        <section className="relative overflow-hidden text-white">
          <HeroDustBackground />

          <div className="relative z-10 mx-auto flex min-h-[calc(100svh-92px)] max-w-6xl items-center px-6 py-16 md:py-24">
            <div className="max-w-3xl">
              <p className="mb-4 text-sm uppercase tracking-[0.22em] text-white/80">
                {t.home.hero.eyebrow}
              </p>

              <h1 className="max-w-3xl text-5xl leading-[1.02] font-semibold text-white md:text-7xl">
                {t.home.hero.title}
              </h1>

              <p className="mt-6 max-w-2xl text-lg leading-8 text-white/75">
                {t.home.hero.subtitle}
              </p>

              <p className="mt-8 max-w-xl text-xl leading-9 text-white/82">
                {t.home.hero.quote}
              </p>

              <div className="mt-10 flex flex-wrap gap-4">
                <Link
                  href={`/${currentLocale}/about`}
                  className="rounded-full bg-[var(--brand)] px-6 py-3 text-sm font-medium text-white transition hover:opacity-90"
                >
                  {t.home.hero.ctaPrimary}
                </Link>
                <Link
                  href={`/${currentLocale}#contact`}
                  className="rounded-full border border-white/20 px-6 py-3 text-sm font-medium text-white transition hover:bg-white hover:text-[var(--ink)]"
                >
                  {t.home.hero.ctaSecondary}
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section id="about" className="bg-white">
          <div className="mx-auto max-w-6xl px-6 py-20">
            <div className="max-w-3xl">
              <p className="mb-4 text-sm uppercase tracking-[0.22em] text-[var(--brand)]">
                {t.home.about.title}
              </p>
              <p className="text-2xl leading-10 text-[var(--ink)]">
                {t.home.about.text}
              </p>

              <Link
                href={`/${currentLocale}/about`}
                className="mt-8 inline-block rounded-full bg-[var(--ink)] px-6 py-3 text-sm font-medium text-white transition hover:opacity-90"
              >
                {t.navbar.about}
              </Link>
            </div>
          </div>
        </section>

        <LatestOpenApplications locale={currentLocale} />

        <HomepageProjects locale={currentLocale} />

        <section id="contact" className="bg-[var(--ink)] text-white">
          <div className="mx-auto max-w-6xl px-6 py-20">
            <div className="max-w-3xl">
              <h2 className="text-3xl font-semibold">{t.home.contact.title}</h2>
              <p className="mt-4 text-lg leading-8 text-white/80">
                {t.home.contact.text}
              </p>

              <div className="mt-8 flex flex-wrap gap-4">
                <a
                  href="mailto:info@podeser.pt"
                  className="rounded-full bg-[var(--brand)] px-6 py-3 text-sm font-medium text-white transition hover:opacity-90"
                >
                  {t.home.contact.button}
                </a>
                <a
                  href="https://www.instagram.com/po.de.ser/"
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-full border border-white/20 px-6 py-3 text-sm font-medium text-white transition hover:bg-white hover:text-[var(--ink)]"
                >
                  Instagram
                </a>
                <a
                  href="https://www.facebook.com/po.de.ser.ngo/"
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-full border border-white/20 px-6 py-3 text-sm font-medium text-white transition hover:bg-white hover:text-[var(--ink)]"
                >
                  Facebook
                </a>
              </div>

              <div className="mt-8 space-y-2 text-white/80">
                <p>info@podeser.pt</p>
                <p>projects@podeser.pt</p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer locale={currentLocale} />
    </>
  );
}
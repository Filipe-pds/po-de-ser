import Link from "next/link";
import { Locale, siteContent } from "@/lib/content";
import Logo from "./Logo";

type NavbarProps = {
  locale: Locale;
};

export default function Navbar({ locale }: NavbarProps) {
  const content = siteContent[locale];
  const otherLocale = locale === "pt" ? "en" : "pt";

  return (
    <header className="sticky top-0 z-50 border-b border-black/5 bg-[var(--cream)]/85 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
        <Logo locale={locale} />

        <nav className="hidden items-center gap-8 md:flex">
<Link href={`/${locale}/about`} className="text-sm text-[var(--ink)] transition hover:text-[var(--brand)]">            {content.nav.about}
          </Link>
          <Link href={`/${locale}#pillars`} className="text-sm text-[var(--ink)] transition hover:text-[var(--brand)]">
            {content.nav.pillars}
          </Link>
          <Link href={`/${locale}#impact`} className="text-sm text-[var(--ink)] transition hover:text-[var(--brand)]">
            {content.nav.impact}
          </Link>
<Link href={`/${locale}/projects`} className="text-sm text-[var(--ink)] transition hover:text-[var(--brand)]">            Projetos
          </Link>
          <Link href={`/${locale}#contact`} className="text-sm text-[var(--ink)] transition hover:text-[var(--brand)]">
            {content.nav.contact}
          </Link>
        </nav>

        <Link
          href={`/${otherLocale}`}
          className="rounded-full border border-[var(--brand)] px-4 py-2 text-sm text-[var(--brand)] transition hover:bg-[var(--brand)] hover:text-white"
        >
          {content.nav.language}
        </Link>
      </div>
    </header>
  );
}
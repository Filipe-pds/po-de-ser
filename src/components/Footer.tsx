import Link from "next/link";
import type { Locale } from "@/lib/content";
import { dictionary } from "@/i18n";

export default function Footer({ locale }: { locale: Locale }) {
  const t = dictionary[locale].footer;

  return (
    <footer className="border-t border-black/5 bg-[var(--cream)]">
      <div className="mx-auto max-w-6xl px-6 py-14">
        <div className="grid gap-10 md:grid-cols-[1.4fr_0.8fr_0.8fr]">
          <div>
            <h3 className="text-2xl font-semibold tracking-[0.16em] text-[var(--brand)]">
              PÓ DE SER
            </h3>
            <p className="mt-4 max-w-md leading-7 text-[var(--muted)]">
              {t.description}
            </p>
          </div>

          <div>
            <h4 className="text-sm uppercase tracking-[0.18em] text-[var(--brand)]">
              {t.navigation}
            </h4>
            <div className="mt-4 flex flex-col gap-3 text-[var(--ink)]">
              <Link href={`/${locale}/about`} className="transition hover:text-[var(--brand)]">
                {t.about}
              </Link>
              <Link href={`/${locale}/projects`} className="transition hover:text-[var(--brand)]">
                {t.projects}
              </Link>
              <Link href={`/${locale}/opportunities`} className="transition hover:text-[var(--brand)]">
                {t.opportunities}
              </Link>
              <Link href={`/${locale}#contact`} className="transition hover:text-[var(--brand)]">
                {t.contact}
              </Link>
            </div>
          </div>

          <div>
            <h4 className="text-sm uppercase tracking-[0.18em] text-[var(--brand)]">
              {t.contact}
            </h4>
            <div className="mt-4 space-y-3 text-[var(--ink)]">
              <p>info@podeser.pt</p>
              <p>projects@podeser.pt</p>
              <a
                href="https://www.instagram.com/po.de.ser/"
                target="_blank"
                rel="noreferrer"
                className="block transition hover:text-[var(--brand)]"
              >
                Instagram
              </a>
              <a
                href="https://www.facebook.com/po.de.ser.ngo/"
                target="_blank"
                rel="noreferrer"
                className="block transition hover:text-[var(--brand)]"
              >
                Facebook
              </a>
            </div>
          </div>
        </div>

        <div className="mt-10 border-t border-black/5 pt-6 text-sm text-[var(--muted)]">
          © {new Date().getFullYear()} Pó de Ser. {t.rights}
        </div>
      </div>
    </footer>
  );
}
"use client";

import Link from "next/link";
import type { Locale } from "@/lib/content";
import { dictionary } from "@/i18n";

function InstagramIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className="h-[17px] w-[17px]"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="3.5" y="3.5" width="17" height="17" rx="4.5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.8" fill="currentColor" stroke="none" />
    </svg>
  );
}

function FacebookIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className="h-[17px] w-[17px]"
      fill="currentColor"
    >
      <path d="M13.5 21v-7h2.4l.4-3h-2.8V9.1c0-.9.3-1.6 1.6-1.6H16.5V4.9c-.2 0-.9-.1-1.8-.1-2.9 0-4.7 1.7-4.7 4.8V11H7.5v3H10v7h3.5Z" />
    </svg>
  );
}

export default function Footer({ locale }: { locale: Locale }) {
  const t = dictionary[locale].footer;

  const privacyLabel = locale === "pt" ? "Privacidade & Cookies" : "Privacy & Cookies";
  const cookieSettingsLabel = locale === "pt" ? "Definições de cookies" : "Cookie settings";
  const madeByLabel = locale === "pt" ? "Website por Filipe Freire" : "Website by Filipe Freire";

  const openCookieSettings = () => {
    window.dispatchEvent(new CustomEvent("open-cookie-settings"));
  };

  return (
    <footer className="border-t border-black/5 bg-[var(--cream)]">
      <div className="mx-auto max-w-6xl px-6 py-8 md:py-10">
        <div className="grid gap-8 md:grid-cols-[1.25fr_1fr_auto] md:items-start">
          <div className="max-w-xl">
            <h3 className="text-2xl font-semibold tracking-[0.16em] text-[var(--brand)]">
              PÓ DE SER
            </h3>

            <p className="mt-3 leading-8 text-[var(--muted)]">
              {t.description}
            </p>
          </div>

          <div>
            <h4 className="text-sm uppercase tracking-[0.18em] text-[var(--brand)]">
              {t.navigation}
            </h4>

            <div className="mt-4 grid gap-x-8 gap-y-3 text-[var(--ink)] sm:grid-cols-2">
              <Link
                href={`/${locale}/about`}
                className="transition hover:text-[var(--brand)]"
              >
                {t.about}
              </Link>

              <Link
                href={`/${locale}/projects`}
                className="transition hover:text-[var(--brand)]"
              >
                {t.projects}
              </Link>

              <Link
                href={`/${locale}/opportunities`}
                className="transition hover:text-[var(--brand)]"
              >
                {t.opportunities}
              </Link>

              <Link
                href={`/${locale}/contact`}
                className="transition hover:text-[var(--brand)]"
              >
                {t.contact}
              </Link>

              <Link
                href={`/${locale}/privacy-cookies`}
                className="transition hover:text-[var(--brand)]"
              >
                {privacyLabel}
              </Link>

              <button
                type="button"
                onClick={openCookieSettings}
                className="w-fit text-left transition hover:text-[var(--brand)]"
              >
                {cookieSettingsLabel}
              </button>
            </div>
          </div>

          <div className="flex items-center gap-3 md:justify-end">
            <a
              href="https://www.instagram.com/po.de.ser/"
              target="_blank"
              rel="noreferrer"
              aria-label="Instagram"
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-black/10 text-[var(--ink)] transition hover:border-[var(--brand)] hover:text-[var(--brand)]"
            >
              <InstagramIcon />
            </a>

            <a
              href="https://www.facebook.com/po.de.ser.ngo/"
              target="_blank"
              rel="noreferrer"
              aria-label="Facebook"
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-black/10 text-[var(--ink)] transition hover:border-[var(--brand)] hover:text-[var(--brand)]"
            >
              <FacebookIcon />
            </a>
          </div>
        </div>

        <div className="mt-8 flex flex-col gap-2 border-t border-black/5 pt-5 text-sm text-[var(--muted)] md:flex-row md:items-center md:justify-between">
          <p>
            © {new Date().getFullYear()} Pó de Ser. {t.rights}
          </p>
          <p>{madeByLabel}</p>
        </div>
      </div>
    </footer>
  );
}
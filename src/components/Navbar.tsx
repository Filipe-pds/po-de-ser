"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, useScroll, useSpring } from "framer-motion";
import type { Locale } from "@/lib/content";
import { dictionary } from "@/i18n";

type NavbarProps = {
  locale: Locale;
};

const MotionDiv = motion.div;

function switchLocaleInPath(pathname: string, nextLocale: Locale) {
  const segments = pathname.split("/").filter(Boolean);

  if (segments.length === 0) {
    return `/${nextLocale}`;
  }

  if (segments[0] === "pt" || segments[0] === "en") {
    segments[0] = nextLocale;
    return `/${segments.join("/")}`;
  }

  return `/${nextLocale}/${segments.join("/")}`;
}

export default function Navbar({ locale }: NavbarProps) {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const labels = dictionary[locale].navbar;
  const otherLocale: Locale = locale === "pt" ? "en" : "pt";
  const tagline =
    locale === "pt"
      ? "Arte • Bem-estar • Mobilidade"
      : "Art • Well-being • Mobility";

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 105,
    damping: 30,
    mass: 0.2,
  });

  const localeHref = useMemo(() => {
    return switchLocaleInPath(pathname || `/${locale}`, otherLocale);
  }, [pathname, otherLocale, locale]);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 12);
    handleScroll();

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileMenuOpen]);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  const closeMenu = () => setIsMobileMenuOpen(false);

  const navLinks = [
    { href: `/${locale}/about`, label: labels.about },
    { href: `/${locale}/projects`, label: labels.projects },
    {
      href: `/${locale}/opportunities`,
      label: labels.opportunities || "Opportunities",
    },
    { href: `/${locale}#contact`, label: labels.contact },
  ];

  return (
    <>
      <MotionDiv
        className="fixed left-0 right-0 top-0 z-[90] h-[3px] origin-left bg-[var(--brand)]"
        style={{ scaleX }}
      />

      <header
        className={`fixed left-0 right-0 top-0 z-[70] transition-all duration-300 ${
          isScrolled || isMobileMenuOpen
            ? "border-b border-black/5 bg-[var(--cream)]/92 shadow-sm backdrop-blur-xl"
            : "bg-[var(--cream)]/80 backdrop-blur-md"
        }`}
      >
        <div className="mx-auto flex h-[72px] max-w-6xl items-center justify-between px-6">
          <Link
            href={`/${locale}`}
            className="z-[80] flex min-w-0 items-center gap-3"
          >
            <Image
              src="/branding/head-png.png"
              alt="Pó de Ser"
              width={52}
              height={52}
              priority
              className="h-10 w-auto shrink-0 object-contain"
            />
            <div className="min-w-0">
              <p className="truncate text-[1.55rem] font-medium tracking-[0.2em] text-[var(--brand)]">
                PÓ DE SER
              </p>
              <p className="truncate text-[0.76rem] text-[var(--muted)]">
                {tagline}
              </p>
            </div>
          </Link>

          <div className="hidden items-center gap-7 md:flex">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-[1rem] text-[var(--ink)] transition-colors hover:text-[var(--brand)]"
              >
                {link.label}
              </Link>
            ))}

            <Link
              href={localeHref}
              className="inline-flex h-10 items-center rounded-full border border-[var(--brand)]/60 px-5 text-sm text-[var(--brand)] transition hover:bg-[var(--brand)] hover:text-white"
            >
              {otherLocale.toUpperCase()}
            </Link>
          </div>

          <button
            onClick={() => setIsMobileMenuOpen((prev) => !prev)}
            className="z-[80] rounded-full border border-black/10 bg-white/70 p-2 text-[var(--ink)] shadow-sm backdrop-blur transition-all hover:bg-white focus:outline-none md:hidden"
            aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
          >
            <svg
              className="h-5 w-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {isMobileMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>

        {isMobileMenuOpen ? (
          <div className="border-t border-black/5 bg-[var(--cream)] md:hidden">
            <div className="mx-auto flex max-w-6xl flex-col gap-5 px-6 py-5">
              <div className="flex flex-col gap-2">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={closeMenu}
                    className="rounded-2xl px-4 py-4 text-2xl font-semibold tracking-tight text-[var(--ink)] transition-colors hover:bg-white"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>

              <div className="border-t border-black/5 pt-4">
                <Link
                  href={localeHref}
                  onClick={closeMenu}
                  className="inline-flex h-10 items-center rounded-full border border-[var(--brand)]/60 px-5 text-sm text-[var(--brand)] transition hover:bg-[var(--brand)] hover:text-white"
                >
                  {otherLocale.toUpperCase()}
                </Link>
              </div>
            </div>
          </div>
        ) : null}
      </header>

      <div className="h-[72px]" />
    </>
  );
}
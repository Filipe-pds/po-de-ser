"use client";

import Link from "next/link";
import Script from "next/script";
import { useEffect, useMemo, useState } from "react";
import { usePathname, useSearchParams } from "next/navigation";

type CookieConsent = "accepted" | "rejected" | null;

const STORAGE_KEY = "podeser_cookie_consent";
const OPEN_SETTINGS_EVENT = "open-cookie-settings";
const ANALYTICS_READY_EVENT = "podeser-ga-ready";

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    [key: `ga-disable-${string}`]: boolean | undefined;
  }
}
function getStoredConsent(): CookieConsent {
  if (typeof window === "undefined") return null;

  const value = window.localStorage.getItem(STORAGE_KEY);

  if (value === "accepted" || value === "rejected") {
    return value;
  }

  return null;
}

function setStoredConsent(value: Exclude<CookieConsent, null>) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(STORAGE_KEY, value);
}

function deleteCookie(name: string) {
  if (typeof document === "undefined") return;

  const hostname = window.location.hostname;
  const parts = hostname.split(".");
  const domains = new Set<string>();

  domains.add(hostname);

  for (let i = 0; i < parts.length - 1; i += 1) {
    domains.add(parts.slice(i).join("."));
  }

  const expires = "Thu, 01 Jan 1970 00:00:00 GMT";

  document.cookie = `${name}=; expires=${expires}; path=/;`;
  document.cookie = `${name}=; expires=${expires}; path=/; domain=${hostname};`;

  domains.forEach((domain) => {
    document.cookie = `${name}=; expires=${expires}; path=/; domain=.${domain};`;
    document.cookie = `${name}=; expires=${expires}; path=/; domain=${domain};`;
  });
}

function clearAnalyticsCookies() {
  if (typeof document === "undefined") return;

  const cookieNames = document.cookie
    .split(";")
    .map((cookie) => cookie.trim().split("=")[0])
    .filter(Boolean);

  cookieNames.forEach((name) => {
    if (
      name === "_ga" ||
      name === "_gid" ||
      name === "_gat" ||
      name.startsWith("_ga_")
    ) {
      deleteCookie(name);
    }
  });
}

export default function CookieBanner({ gaId }: { gaId?: string }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [consent, setConsent] = useState<CookieConsent>(null);
  const [isHydrated, setIsHydrated] = useState(false);
  const [isBannerOpen, setIsBannerOpen] = useState(false);
  const [analyticsReady, setAnalyticsReady] = useState(false);

  useEffect(() => {
    const storedConsent = getStoredConsent();

    setConsent(storedConsent);
    setIsBannerOpen(storedConsent === null);
    setAnalyticsReady(Boolean(window.gtag));
    setIsHydrated(true);
  }, []);

  useEffect(() => {
    const handleOpenSettings = () => {
      setIsBannerOpen(true);
    };

    window.addEventListener(OPEN_SETTINGS_EVENT, handleOpenSettings);

    return () => {
      window.removeEventListener(OPEN_SETTINGS_EVENT, handleOpenSettings);
    };
  }, []);

  useEffect(() => {
    const handleAnalyticsReady = () => {
      setAnalyticsReady(true);
    };

    if (window.gtag) {
      setAnalyticsReady(true);
    }

    window.addEventListener(ANALYTICS_READY_EVENT, handleAnalyticsReady);

    return () => {
      window.removeEventListener(ANALYTICS_READY_EVENT, handleAnalyticsReady);
    };
  }, []);

  const locale = useMemo(() => {
    const firstSegment = pathname.split("/").filter(Boolean)[0];
    return firstSegment === "pt" || firstSegment === "en" ? firstSegment : "en";
  }, [pathname]);

  const isPortuguese = locale === "pt";
  const policyHref = `/${locale}/privacy-cookies`;

  const currentPath = useMemo(() => {
    const query = searchParams.toString();
    return query ? `${pathname}?${query}` : pathname;
  }, [pathname, searchParams]);

  useEffect(() => {
    if (!gaId) return;
    if (consent !== "accepted") return;
    if (!analyticsReady) return;
    if (typeof window === "undefined") return;
    if (!window.gtag) return;

    window[`ga-disable-${gaId}`] = false;

    window.gtag("event", "page_view", {
      page_title: document.title,
      page_location: window.location.href,
      page_path: currentPath,
    });
  }, [analyticsReady, consent, currentPath, gaId]);

  const handleAccept = () => {
    setStoredConsent("accepted");
    setConsent("accepted");
    setIsBannerOpen(false);

    if (gaId) {
      window[`ga-disable-${gaId}`] = false;
    }

    if (window.gtag) {
      setAnalyticsReady(true);
    }
  };

  const handleReject = () => {
    setStoredConsent("rejected");
    setConsent("rejected");
    setIsBannerOpen(false);

    clearAnalyticsCookies();

    if (gaId) {
      window[`ga-disable-${gaId}`] = true;
    }
  };

  const handleClose = () => {
    setIsBannerOpen(false);
  };

  if (!isHydrated) return null;

  return (
    <>
      {consent === "accepted" && gaId ? (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
            strategy="afterInteractive"
          />
          <Script id="podeser-ga" strategy="afterInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){window.dataLayer.push(arguments);}
              window.gtag = gtag;
              window['ga-disable-${gaId}'] = false;
              gtag('js', new Date());
              gtag('config', '${gaId}', { send_page_view: false });
              window.dispatchEvent(new Event('${ANALYTICS_READY_EVENT}'));
            `}
          </Script>
        </>
      ) : null}

      {isBannerOpen ? (
        <div className="fixed inset-x-0 bottom-0 z-[100] p-4 sm:p-6">
          <div className="mx-auto max-w-3xl overflow-hidden rounded-[28px] border border-[#7a2d2d]/15 bg-[#f6f0e7]/95 shadow-2xl backdrop-blur-xl">
            <div className="p-5 sm:p-6">
              <div className="flex items-start justify-between gap-4">
                <div className="max-w-2xl">
                  <p className="mb-2 text-xs uppercase tracking-[0.28em] text-[#9a6b5b]">
                    {isPortuguese ? "Privacidade & cookies" : "Privacy & cookies"}
                  </p>

                  <h2 className="text-xl font-medium leading-tight text-[#2f2525] sm:text-2xl">
                    {isPortuguese
                      ? "Usamos cookies para medir e melhorar a experiência do website."
                      : "We use cookies to measure and improve the website experience."}
                  </h2>

                  <p className="mt-3 text-sm leading-7 text-[#5a4747] sm:text-[15px]">
                    {isPortuguese ? (
                      <>
                        Usamos cookies essenciais para o funcionamento do website e, com a
                        tua permissão, cookies analíticos para perceber como o site é usado.
                        Podes aceitar, recusar, ou rever a tua escolha a qualquer momento.
                        Consulta a{" "}
                        <Link
                          href={policyHref}
                          className="underline decoration-[#7a2d2d]/40 underline-offset-4 transition hover:text-[#7a2d2d]"
                        >
                          página de Privacidade & Cookies
                        </Link>
                        .
                      </>
                    ) : (
                      <>
                        We use essential cookies for the website to function and, with your
                        permission, analytics cookies to understand how the site is used.
                        You can accept, reject, or review your choice at any time. See the{" "}
                        <Link
                          href={policyHref}
                          className="underline decoration-[#7a2d2d]/40 underline-offset-4 transition hover:text-[#7a2d2d]"
                        >
                          Privacy & Cookies page
                        </Link>
                        .
                      </>
                    )}
                  </p>
                </div>

                {consent !== null ? (
                  <button
                    type="button"
                    onClick={handleClose}
                    aria-label={isPortuguese ? "Fechar" : "Close"}
                    className="shrink-0 rounded-full border border-[#7a2d2d]/15 px-3 py-1.5 text-sm text-[#5a4747] transition hover:bg-[#efe5d9] hover:text-[#7a2d2d]"
                  >
                    {isPortuguese ? "Fechar" : "Close"}
                  </button>
                ) : null}
              </div>

              <div className="mt-5 flex flex-col gap-3 sm:mt-6 sm:flex-row sm:flex-wrap">
                <button
                  type="button"
                  onClick={handleAccept}
                  className="inline-flex items-center justify-center rounded-full bg-[#7a2d2d] px-5 py-3 text-sm font-medium text-[#f8f3ec] transition hover:bg-[#682626]"
                >
                  {isPortuguese
                    ? "Aceitar cookies analíticos"
                    : "Accept analytics cookies"}
                </button>

                <button
                  type="button"
                  onClick={handleReject}
                  className="inline-flex items-center justify-center rounded-full border border-[#7a2d2d]/20 bg-transparent px-5 py-3 text-sm font-medium text-[#3b2b2b] transition hover:bg-[#efe5d9]"
                >
                  {isPortuguese ? "Recusar não essenciais" : "Reject non-essential"}
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
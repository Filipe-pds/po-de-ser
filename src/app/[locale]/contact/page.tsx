import Link from "next/link";
import { notFound } from "next/navigation";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import ContactForm from "@/components/ContactForm";
import type { Locale } from "@/lib/content";
import { locales } from "@/lib/content";

const copy = {
  pt: {
    eyebrow: "Contacto",
    title: "Vamos conversar.",
    subtitle: "Se quiseres falar connosco, escreve-nos.",
    note: "Também nos podes contactar diretamente por email ou nas nossas redes sociais.",
    formTitle: "Envia-nos uma mensagem",
    privacyPrefix:
      "Ao enviares este formulário, os teus dados serão usados apenas para responder à tua mensagem. Lê mais em",
    privacyLink: "Privacidade & Cookies",
  },
  en: {
    eyebrow: "Contact",
    title: "Let’s talk.",
    subtitle: "If you’d like to talk with us, write to us.",
    note: "You can also contact us directly by email or through our social media.",
    formTitle: "Send us a message",
    privacyPrefix:
      "By sending this form, your data will only be used to reply to your message. Read more in",
    privacyLink: "Privacy & Cookies",
  },
};

function InstagramIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className="h-[18px] w-[18px]"
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
      className="h-[18px] w-[18px]"
      fill="currentColor"
    >
      <path d="M13.5 21v-7h2.4l.4-3h-2.8V9.1c0-.9.3-1.6 1.6-1.6H16.5V4.9c-.2 0-.9-.1-1.8-.1-2.9 0-4.7 1.7-4.7 4.8V11H7.5v3H10v7h3.5Z" />
    </svg>
  );
}

function DustCluster({
  className,
  particles,
}: {
  className: string;
  particles: Array<{
    left: string;
    top: string;
    size: number;
    color: string;
    blur?: string;
    duration?: string;
    delay?: string;
  }>;
}) {
  return (
    <div className={className} aria-hidden="true">
      {particles.map((particle, index) => (
        <span
          key={index}
          className="absolute rounded-full animate-pulse"
          style={{
            left: particle.left,
            top: particle.top,
            width: particle.size,
            height: particle.size,
            background: particle.color,
            filter: particle.blur ? `blur(${particle.blur})` : undefined,
            animationDuration: particle.duration ?? "5s",
            animationDelay: particle.delay ?? "0s",
            boxShadow:
              particle.size >= 12
                ? `0 0 24px ${particle.color}`
                : `0 0 12px ${particle.color}`,
            opacity: 0.9,
          }}
        />
      ))}
    </div>
  );
}

export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!locales.includes(locale as Locale)) {
    notFound();
  }

  const currentLocale = locale as Locale;
  const page = currentLocale === "pt" ? copy.pt : copy.en;

  return (
    <>
      <Navbar locale={currentLocale} />

      <main className="bg-[var(--cream)] text-[var(--ink)]">
        <section className="relative mx-auto max-w-6xl px-4 pb-8 pt-5 sm:px-6 sm:pb-10 sm:pt-6 md:pb-14 md:pt-6">
          <div className="relative">
            <DustCluster
              className="pointer-events-none absolute -left-10 -top-8 z-20 hidden h-40 w-48 md:block"
              particles={[
                {
                  left: "10%",
                  top: "18%",
                  size: 20,
                  color: "rgba(182, 64, 52, 0.22)",
                  blur: "5px",
                  duration: "7s",
                },
                {
                  left: "28%",
                  top: "8%",
                  size: 10,
                  color: "rgba(224, 179, 108, 0.78)",
                  duration: "5.4s",
                  delay: "0.4s",
                },
                {
                  left: "38%",
                  top: "24%",
                  size: 12,
                  color: "rgba(107, 154, 146, 0.72)",
                  duration: "6.2s",
                  delay: "0.8s",
                },
                {
                  left: "52%",
                  top: "10%",
                  size: 7,
                  color: "rgba(204, 110, 84, 0.9)",
                  duration: "5.8s",
                  delay: "1.1s",
                },
                {
                  left: "62%",
                  top: "28%",
                  size: 5,
                  color: "rgba(224, 179, 108, 0.92)",
                  duration: "4.9s",
                  delay: "0.7s",
                },
                {
                  left: "20%",
                  top: "46%",
                  size: 6,
                  color: "rgba(107, 154, 146, 0.84)",
                  duration: "6.4s",
                  delay: "1.5s",
                },
              ]}
            />

            <DustCluster
              className="pointer-events-none absolute -bottom-8 -right-10 z-20 hidden h-40 w-52 md:block"
              particles={[
                {
                  left: "60%",
                  top: "54%",
                  size: 22,
                  color: "rgba(182, 64, 52, 0.18)",
                  blur: "5px",
                  duration: "7.2s",
                },
                {
                  left: "24%",
                  top: "70%",
                  size: 9,
                  color: "rgba(224, 179, 108, 0.82)",
                  duration: "5.4s",
                  delay: "0.3s",
                },
                {
                  left: "38%",
                  top: "58%",
                  size: 11,
                  color: "rgba(107, 154, 146, 0.78)",
                  duration: "6.1s",
                  delay: "0.9s",
                },
                {
                  left: "72%",
                  top: "36%",
                  size: 7,
                  color: "rgba(204, 110, 84, 0.86)",
                  duration: "5.8s",
                  delay: "1.2s",
                },
                {
                  left: "82%",
                  top: "62%",
                  size: 5,
                  color: "rgba(224, 179, 108, 0.94)",
                  duration: "4.7s",
                  delay: "0.6s",
                },
                {
                  left: "52%",
                  top: "82%",
                  size: 6,
                  color: "rgba(107, 154, 146, 0.82)",
                  duration: "6.6s",
                  delay: "1.4s",
                },
              ]}
            />

            <div className="relative z-10 overflow-hidden rounded-[1.7rem] border border-black/5 bg-white/78 shadow-[0_18px_50px_rgba(0,0,0,0.045)] backdrop-blur-sm sm:rounded-[2rem] md:rounded-[2.2rem]">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(122,45,45,0.035),transparent_40%)]" />

              <div className="relative grid gap-7 px-5 py-6 sm:px-6 sm:py-7 md:px-10 md:py-9 lg:grid-cols-[0.8fr_1.2fr] lg:gap-10 lg:px-12 lg:py-10">
                <div className="flex flex-col justify-between">
                  <div>
                    <p className="text-[0.72rem] uppercase tracking-[0.22em] text-[var(--brand)] sm:text-sm sm:tracking-[0.24em]">
                      {page.eyebrow}
                    </p>

                    <h1 className="mt-4 text-[2.25rem] font-medium leading-[1.02] text-[var(--ink)] sm:mt-5 sm:text-4xl md:text-5xl">
                      {page.title}
                    </h1>

                    <p className="mt-4 max-w-sm text-base leading-7 text-[var(--muted)] sm:text-lg sm:leading-8">
                      {page.subtitle}
                    </p>

                    <p className="mt-3 max-w-sm leading-7 text-[var(--muted)] sm:mt-4 sm:leading-8">
                      {page.note}
                    </p>
                  </div>

                  <div className="mt-8 sm:mt-10">
                    <a
                      href="mailto:info@podeser.pt"
                      className="text-lg text-[var(--ink)] underline decoration-[var(--brand)]/35 underline-offset-4 transition hover:text-[var(--brand)] sm:text-xl"
                    >
                      info@podeser.pt
                    </a>

                    <div className="mt-5 flex items-center gap-3 sm:mt-7">
                      <a
                        href="https://www.instagram.com/po.de.ser/"
                        target="_blank"
                        rel="noreferrer"
                        aria-label="Instagram"
                        className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-black/10 bg-[var(--cream)]/55 text-[var(--ink)] transition hover:border-[var(--brand)] hover:text-[var(--brand)] sm:h-11 sm:w-11"
                      >
                        <InstagramIcon />
                      </a>

                      <a
                        href="https://www.facebook.com/po.de.ser.ngo/"
                        target="_blank"
                        rel="noreferrer"
                        aria-label="Facebook"
                        className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-black/10 bg-[var(--cream)]/55 text-[var(--ink)] transition hover:border-[var(--brand)] hover:text-[var(--brand)] sm:h-11 sm:w-11"
                      >
                        <FacebookIcon />
                      </a>
                    </div>
                  </div>
                </div>

                <div>
                  <h2 className="text-[1.9rem] font-medium leading-tight text-[var(--ink)] sm:text-3xl md:text-4xl">
                    {page.formTitle}
                  </h2>

                  <div className="mt-4 sm:mt-5">
                    <ContactForm locale={currentLocale} />
                  </div>

                  <p className="mt-4 max-w-2xl text-[13px] leading-6 text-[var(--muted)] sm:mt-5 sm:text-sm sm:leading-7">
                    {page.privacyPrefix}{" "}
                    <Link
                      href={`/${currentLocale}/privacy-cookies`}
                      className="underline decoration-[var(--brand)]/35 underline-offset-4 transition hover:text-[var(--brand)]"
                    >
                      {page.privacyLink}
                    </Link>
                    .
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer locale={currentLocale} />
    </>
  );
}
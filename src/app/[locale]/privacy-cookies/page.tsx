import Link from "next/link";
import { notFound } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { locales, type Locale } from "@/lib/content";

const content = {
  pt: {
    eyebrow: "Privacidade & Cookies",
    title: "Dados, cookies e contacto",
    intro:
      "Uma explicação simples sobre como tratamos dados neste website.",
    updated: "Última atualização: abril de 2026",
    cards: [
      {
        title: "Website",
        text: "Usamos apenas dados técnicos necessários para o website funcionar corretamente.",
      },
      {
        title: "Analytics",
        text: "Só usamos Google Analytics se aceitares cookies analíticos.",
      },
      {
        title: "Contacto",
        text: "Se nos enviares uma mensagem, usamos os teus dados apenas para responder.",
      },
    ],
    sections: [
      {
        title: "Quem somos",
        text: "Este website pertence à Associação Pó de Ser Assim, uma associação juvenil sem fins lucrativos sediada em Palmela, Portugal.",
      },
      {
        title: "Que dados podemos tratar",
        text: "Podemos tratar dados técnicos básicos de navegação. Se aceitares cookies analíticos, podemos recolher informação agregada sobre a utilização do website. Se nos contactares, podemos tratar o teu nome, email, assunto e mensagem.",
      },
      {
        title: "Para que usamos os dados",
        text: "Usamos os dados para manter o website funcional, responder a mensagens, acompanhar pedidos de contacto e compreender como melhorar a experiência no website.",
      },
      {
        title: "Cookies",
        text: "Os cookies analíticos são opcionais. Se não os aceitares, podes continuar a usar o website normalmente. Podes alterar a tua escolha a qualquer momento nesta página.",
      },
      {
        title: "Serviços externos",
        text: "Podemos usar serviços externos para alojamento, analytics e formulários de contacto. O formulário pode ser processado por um serviço como o Web3Forms, apenas para entregar a tua mensagem ao nosso email.",
      },
      {
        title: "Os teus direitos",
        text: "Podes pedir acesso, correção ou apagamento dos teus dados, quando aplicável. Para qualquer questão, escreve-nos para info@podeser.pt.",
      },
    ],
    cookieSettings: "Alterar definições de cookies",
    contact: "Contactar",
  },
  en: {
    eyebrow: "Privacy & Cookies",
    title: "Data, cookies, and contact",
    intro:
      "A simple explanation of how we handle data on this website.",
    updated: "Last updated: April 2026",
    cards: [
      {
        title: "Website",
        text: "We only use technical data needed for the website to work properly.",
      },
      {
        title: "Analytics",
        text: "We only use Google Analytics if you accept analytics cookies.",
      },
      {
        title: "Contact",
        text: "If you send us a message, we use your data only to reply.",
      },
    ],
    sections: [
      {
        title: "Who we are",
        text: "This website belongs to Associação Pó de Ser Assim, a non-profit youth association based in Palmela, Portugal.",
      },
      {
        title: "What data we may process",
        text: "We may process basic technical browsing data. If you accept analytics cookies, we may collect aggregated information about website use. If you contact us, we may process your name, email, subject, and message.",
      },
      {
        title: "Why we use the data",
        text: "We use data to keep the website functional, reply to messages, follow up on contact requests, and understand how to improve the website experience.",
      },
      {
        title: "Cookies",
        text: "Analytics cookies are optional. If you do not accept them, you can still use the website normally. You can change your choice at any time on this page.",
      },
      {
        title: "External services",
        text: "We may use external services for hosting, analytics, and contact forms. The form may be processed by a service such as Web3Forms, only to send your message to our email.",
      },
      {
        title: "Your rights",
        text: "You may ask to access, correct, or delete your data, when applicable. For any question, write to us at info@podeser.pt.",
      },
    ],
    cookieSettings: "Change cookie settings",
    contact: "Contact",
  },
};

export default async function PrivacyCookiesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!locales.includes(locale as Locale)) {
    notFound();
  }

  const currentLocale = locale as Locale;
  const page = currentLocale === "pt" ? content.pt : content.en;

  return (
    <>
      <Navbar locale={currentLocale} />

      <main className="bg-[var(--cream)] text-[var(--ink)]">
        <section className="mx-auto max-w-6xl px-6 py-12 md:py-16">
          <div className="max-w-3xl">
            <p className="text-sm uppercase tracking-[0.22em] text-[var(--brand)]">
              {page.eyebrow}
            </p>

            <h1 className="mt-4 text-4xl font-semibold leading-tight md:text-5xl">
              {page.title}
            </h1>

            <p className="mt-4 text-lg leading-8 text-[var(--muted)]">
              {page.intro}
            </p>

            <p className="mt-4 text-sm text-[var(--muted)]">
              {page.updated}
            </p>
          </div>

          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {page.cards.map((card) => (
              <article
                key={card.title}
                className="rounded-[1.5rem] bg-white/78 p-5 shadow-sm ring-1 ring-black/5"
              >
                <h2 className="text-sm uppercase tracking-[0.18em] text-[var(--brand)]">
                  {card.title}
                </h2>

                <p className="mt-3 leading-7 text-[var(--muted)]">
                  {card.text}
                </p>
              </article>
            ))}
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-6 pb-14 md:pb-20">
          <div className="rounded-[2rem] bg-white/72 p-6 shadow-sm ring-1 ring-black/5 md:p-8">
            <div className="grid gap-x-10 gap-y-8 md:grid-cols-2">
              {page.sections.map((section) => (
                <article key={section.title}>
                  <h2 className="text-xl font-semibold text-[var(--ink)]">
                    {section.title}
                  </h2>

                  <p className="mt-3 leading-7 text-[var(--muted)]">
                    {section.text}
                  </p>
                </article>
              ))}
            </div>

            <div className="mt-10 flex flex-wrap gap-3 border-t border-black/5 pt-6">
              <button
                type="button"
                data-cookie-settings
                className="inline-flex items-center justify-center rounded-full bg-[var(--brand)] px-5 py-3 text-sm font-medium text-white transition hover:opacity-90"
              >
                {page.cookieSettings}
              </button>

              <Link
                href={`/${currentLocale}/contact`}
                className="inline-flex items-center justify-center rounded-full border border-black/10 px-5 py-3 text-sm font-medium text-[var(--ink)] transition hover:border-[var(--brand)] hover:text-[var(--brand)]"
              >
                {page.contact}
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer locale={currentLocale} />
    </>
  );
}
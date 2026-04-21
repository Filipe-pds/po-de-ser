import Link from "next/link";

const content = {
  pt: {
    eyebrow: "Privacidade & Cookies",
    title: "Como tratamos dados, cookies e medições no website.",
    intro:
      "Queremos que esta parte seja clara e humana. Nesta página explicamos que dados podem ser tratados quando visitas o website da Pó de Ser, como usamos cookies, e como podes gerir a tua escolha.",
    updatedLabel: "Última atualização",
    updatedValue: "abril de 2026",
    quickCards: [
      {
        title: "Essencial",
        text: "Alguns elementos técnicos podem ser necessários para o website funcionar corretamente.",
      },
      {
        title: "Analítico",
        text: "Só usamos medições analíticas se aceitares cookies analíticos.",
      },
      {
        title: "Contacto",
        text: "Se nos escreveres por email ou formulário, usamos os dados apenas para responder e acompanhar o pedido.",
      },
    ],
    sections: [
      {
        title: "1. Quem somos",
        paragraphs: [
          "Este website pertence à Associação Pó de Ser Assim (“Pó de Ser”), uma associação juvenil sem fins lucrativos sediada em Palmela, Portugal.",
          "Se tiveres alguma questão sobre privacidade ou sobre a forma como tratamos dados, podes contactar-nos através de info@podeser.pt ou projects@podeser.pt.",
        ],
      },
      {
        title: "2. Que dados podemos tratar",
        paragraphs: [
          "Dependendo da forma como interages com o website, podemos tratar diferentes tipos de dados.",
          "Se apenas navegares no website, podemos tratar informação técnica básica necessária para o funcionamento do site e, apenas se deres consentimento, informação analítica sobre a utilização do website.",
          "Se entrares em contacto connosco por email ou através de um formulário de contacto, podemos tratar dados como nome, email, assunto e a mensagem que decidires enviar.",
        ],
      },
      {
        title: "3. Para que usamos esses dados",
        paragraphs: [
          "Usamos dados para manter o website funcional, responder a pedidos de contacto, melhorar a experiência geral do site e compreender, de forma agregada, como o website está a ser utilizado.",
          "Não usamos cookies analíticos nem medições analíticas antes de receber a tua autorização.",
        ],
      },
      {
        title: "4. Cookies",
        paragraphs: [
          "Cookies são pequenos ficheiros de texto guardados no teu dispositivo quando visitas um website.",
          "No nosso website, distinguimos entre cookies estritamente necessários e cookies analíticos.",
          "Os cookies estritamente necessários ajudam o website a funcionar corretamente. Os cookies analíticos ajudam-nos a perceber, de forma geral, quais as páginas mais visitadas, como as pessoas navegam no website e que partes podem ser melhoradas.",
        ],
      },
      {
        title: "5. Cookies analíticos e Google Analytics",
        paragraphs: [
          "Se deres consentimento, podemos usar o Google Analytics para recolher informação estatística e agregada sobre a utilização do website.",
          "Isto pode incluir dados como páginas visitadas, tempo aproximado no site, tipo de dispositivo, navegador e interações gerais com o website.",
          "Tentamos usar esta informação de forma proporcional e apenas para compreender e melhorar o website.",
        ],
      },
      {
        title: "6. Base legal",
        paragraphs: [
          "Quando usas o website com funcionalidades estritamente necessárias, tratamos apenas o que é necessário para disponibilizar o serviço.",
          "Quando aceitas cookies analíticos, a base legal para esse tratamento é o teu consentimento.",
          "Quando nos contactas diretamente, tratamos os dados necessários para responder ao teu pedido e acompanhar a comunicação.",
        ],
      },
      {
        title: "7. Conservação dos dados",
        paragraphs: [
          "Guardamos os dados apenas durante o tempo necessário para cumprir a finalidade para que foram recolhidos.",
          "Mensagens enviadas por contacto podem ser guardadas pelo tempo necessário para responder, acompanhar o pedido e manter um registo básico da comunicação.",
          "Os dados analíticos dependem também das definições dos serviços utilizados e podem ser retidos durante os períodos configurados nessas plataformas.",
        ],
      },
      {
        title: "8. Partilha com terceiros",
        paragraphs: [
          "Podemos recorrer a serviços externos para alojamento do website, medições analíticas e formulários de contacto.",
          "Esses serviços podem tratar alguns dados em nosso nome, apenas na medida necessária para prestar o respetivo serviço técnico.",
          "Quando o formulário de contacto estiver ativo, poderemos usar um prestador externo de envio de formulários, como o Web3Forms, para entregar a tua mensagem de forma segura ao nosso email.",
        ],
      },
      {
        title: "9. Transferências internacionais",
        paragraphs: [
          "Alguns serviços técnicos e analíticos podem envolver tratamento de dados fora do Espaço Económico Europeu, dependendo da infraestrutura dos respetivos fornecedores.",
          "Sempre que isso aconteça, procuramos usar serviços com mecanismos adequados de proteção de dados e salvaguardas contratuais apropriadas.",
        ],
      },
      {
        title: "10. Os teus direitos",
        paragraphs: [
          "Dependendo do caso, podes pedir acesso aos teus dados, retificação, apagamento, limitação do tratamento, oposição ou retirar consentimento relativamente aos cookies analíticos.",
          "Também podes apresentar reclamação junto da autoridade de controlo competente, caso consideres que o tratamento dos teus dados não está conforme.",
        ],
      },
      {
        title: "11. Como alterar a escolha sobre cookies",
        paragraphs: [
          "Podes voltar a abrir as definições de cookies através do link “Definições de cookies” no rodapé do website.",
          "Se retirares o consentimento para cookies analíticos, deixaremos de carregar a medição analítica a partir desse momento.",
        ],
      },
      {
        title: "12. Contacto",
        paragraphs: [
          "Para qualquer questão relacionada com privacidade, cookies ou proteção de dados neste website, escreve-nos para info@podeser.pt ou projects@podeser.pt.",
        ],
      },
    ],
    backToContact: "Ir para Contacto",
    backToHome: "Voltar ao início",
  },
  en: {
    eyebrow: "Privacy & Cookies",
    title: "How we handle data, cookies, and measurement on the website.",
    intro:
      "We want this part to feel clear and human. On this page we explain what data may be processed when you visit the Pó de Ser website, how we use cookies, and how you can manage your choice.",
    updatedLabel: "Last updated",
    updatedValue: "April 2026",
    quickCards: [
      {
        title: "Essential",
        text: "Some technical elements may be necessary for the website to function properly.",
      },
      {
        title: "Analytics",
        text: "We only use analytics measurement if you accept analytics cookies.",
      },
      {
        title: "Contact",
        text: "If you write to us by email or form, we use the data only to reply and follow up on your request.",
      },
    ],
    sections: [
      {
        title: "1. Who we are",
        paragraphs: [
          "This website belongs to Associação Pó de Ser Assim (“Pó de Ser”), a non-profit youth organisation based in Palmela, Portugal.",
          "If you have any question about privacy or about how we process data, you can contact us at info@podeser.pt or projects@podeser.pt.",
        ],
      },
      {
        title: "2. What data we may process",
        paragraphs: [
          "Depending on how you interact with the website, we may process different kinds of data.",
          "If you simply browse the website, we may process basic technical information needed for the site to work and, only if you give consent, analytical information about how the website is used.",
          "If you contact us by email or through a contact form, we may process data such as your name, email, subject, and the message you choose to send.",
        ],
      },
      {
        title: "3. Why we use that data",
        paragraphs: [
          "We use data to keep the website functional, respond to contact requests, improve the overall website experience, and understand in an aggregated way how the website is being used.",
          "We do not use analytics cookies or analytics measurement before receiving your permission.",
        ],
      },
      {
        title: "4. Cookies",
        paragraphs: [
          "Cookies are small text files stored on your device when you visit a website.",
          "On our website, we distinguish between strictly necessary cookies and analytics cookies.",
          "Strictly necessary cookies help the website work properly. Analytics cookies help us understand, in a general way, which pages are most visited, how people move through the site, and which parts may be improved.",
        ],
      },
      {
        title: "5. Analytics cookies and Google Analytics",
        paragraphs: [
          "If you give consent, we may use Google Analytics to collect statistical and aggregated information about website use.",
          "This may include data such as visited pages, approximate time on site, device type, browser, and general interactions with the website.",
          "We try to use this information proportionately and only to understand and improve the website.",
        ],
      },
      {
        title: "6. Legal basis",
        paragraphs: [
          "When you use the website with strictly necessary functionality, we process only what is needed to provide the service.",
          "When you accept analytics cookies, the legal basis for that processing is your consent.",
          "When you contact us directly, we process the data needed to reply to your request and continue that communication if necessary.",
        ],
      },
      {
        title: "7. Data retention",
        paragraphs: [
          "We keep data only for as long as needed to fulfil the purpose for which it was collected.",
          "Messages sent through contact may be kept for the time needed to reply, follow up, and maintain a basic record of the communication.",
          "Analytics data also depends on the settings of the services used and may be retained for the periods configured in those platforms.",
        ],
      },
      {
        title: "8. Sharing with third parties",
        paragraphs: [
          "We may rely on external services for website hosting, analytics measurement, and contact forms.",
          "Those services may process some data on our behalf only to the extent needed to provide the relevant technical service.",
          "When the contact form is active, we may use an external form delivery provider such as Web3Forms to securely send your message to our email.",
        ],
      },
      {
        title: "9. International transfers",
        paragraphs: [
          "Some technical and analytics services may involve processing outside the European Economic Area, depending on the infrastructure of the providers involved.",
          "Whenever that happens, we aim to use services with appropriate data protection mechanisms and contractual safeguards.",
        ],
      },
      {
        title: "10. Your rights",
        paragraphs: [
          "Depending on the situation, you may ask for access to your data, rectification, erasure, restriction of processing, objection, or withdrawal of consent regarding analytics cookies.",
          "You may also lodge a complaint with the competent supervisory authority if you believe your data is not being handled in accordance with applicable rules.",
        ],
      },
      {
        title: "11. How to change your cookie choice",
        paragraphs: [
          "You can reopen cookie settings through the “Cookie settings” link in the website footer.",
          "If you withdraw consent for analytics cookies, we will stop loading analytics measurement from that point onward.",
        ],
      },
      {
        title: "12. Contact",
        paragraphs: [
          "For any question related to privacy, cookies, or data protection on this website, write to us at info@podeser.pt or projects@podeser.pt.",
        ],
      },
    ],
    backToContact: "Go to Contact",
    backToHome: "Back to Home",
  },
};

export default async function PrivacyCookiesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const isPortuguese = locale === "pt";
  const page = isPortuguese ? content.pt : content.en;

  return (
    <main className="min-h-screen bg-[var(--cream)] text-[var(--ink)]">
      <section className="relative overflow-hidden border-b border-black/5">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(122,45,45,0.10),transparent_48%)]" />
        <div className="mx-auto max-w-5xl px-6 py-20 md:py-28">
          <p className="text-xs uppercase tracking-[0.28em] text-[var(--brand)]">
            {page.eyebrow}
          </p>

          <h1 className="mt-4 max-w-4xl text-4xl font-medium leading-tight text-[var(--ink)] md:text-6xl">
            {page.title}
          </h1>

          <p className="mt-6 max-w-3xl text-base leading-8 text-[var(--muted)] md:text-lg">
            {page.intro}
          </p>

          <div className="mt-8 text-sm text-[var(--muted)]">
            <span className="font-medium text-[var(--ink)]">{page.updatedLabel}:</span>{" "}
            {page.updatedValue}
          </div>

          <div className="mt-10 flex flex-wrap gap-4">
            <Link
              href={`/${locale}/contact`}
              className="inline-flex items-center justify-center rounded-full bg-[var(--brand)] px-5 py-3 text-sm font-medium text-white transition hover:opacity-90"
            >
              {page.backToContact}
            </Link>

            <Link
              href={`/${locale}`}
              className="inline-flex items-center justify-center rounded-full border border-black/10 px-5 py-3 text-sm font-medium text-[var(--ink)] transition hover:border-[var(--brand)] hover:text-[var(--brand)]"
            >
              {page.backToHome}
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-6 py-14 md:py-18">
        <div className="grid gap-4 md:grid-cols-3">
          {page.quickCards.map((card) => (
            <div
              key={card.title}
              className="rounded-[28px] border border-black/5 bg-white/60 p-6 shadow-[0_10px_30px_rgba(0,0,0,0.04)] backdrop-blur-sm"
            >
              <p className="text-xs uppercase tracking-[0.22em] text-[var(--brand)]">
                {card.title}
              </p>
              <p className="mt-3 leading-7 text-[var(--muted)]">{card.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-6 pb-20 md:pb-28">
        <div className="space-y-6">
          {page.sections.map((section) => (
            <article
              key={section.title}
              className="rounded-[30px] border border-black/5 bg-white/55 p-6 shadow-[0_10px_30px_rgba(0,0,0,0.035)] backdrop-blur-sm md:p-8"
            >
              <h2 className="text-2xl font-medium leading-tight text-[var(--ink)]">
                {section.title}
              </h2>

              <div className="mt-4 space-y-4">
                {section.paragraphs.map((paragraph, index) => (
                  <p
                    key={`${section.title}-${index}`}
                    className="leading-8 text-[var(--muted)]"
                  >
                    {paragraph}
                  </p>
                ))}
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
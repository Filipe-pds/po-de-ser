import { Locale, siteContent } from "@/lib/content";

type FooterProps = {
  locale: Locale;
};

export default function Footer({ locale }: FooterProps) {
  const content = siteContent[locale];

  return (
    <footer className="border-t border-black/5 bg-white">
      <div className="mx-auto flex max-w-6xl flex-col gap-3 px-6 py-8 text-sm text-[var(--muted)] md:flex-row md:items-center md:justify-between">
        <p>{content.footer.line}</p>
        <p>© {new Date().getFullYear()} Pó de Ser</p>
      </div>
    </footer>
  );
}
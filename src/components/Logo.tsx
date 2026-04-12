import Image from "next/image";
import Link from "next/link";
import { Locale } from "@/lib/content";

type LogoProps = {
  locale: Locale;
};

export default function Logo({ locale }: LogoProps) {
  return (
    <Link href={`/${locale}`} className="flex items-center gap-3">
      <Image
        src="/branding/logo-better.png"
        alt="Pó de Ser logo"
        width={90}
        height={90}
        priority
        className="h-14 w-auto shrink-0 object-contain md:h-16"
      />
      <div className="flex flex-col">
        <span className="text-lg font-semibold tracking-[0.18em] uppercase text-[var(--brand)]">
          Pó de Ser
        </span>
        <span className="text-xs text-[var(--muted)]">
          Art • Well-being • Mobility
        </span>
      </div>
    </Link>
  );
}
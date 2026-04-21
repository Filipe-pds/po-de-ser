import type { Metadata } from "next";
import { Suspense } from "react";
import CookieBanner from "@/components/CookieBanner";
import "./globals.css";

export const metadata: Metadata = {
  title: "Pó de Ser",
  description:
    "Pó de Ser — art, well-being, human connection, and international opportunities for young people.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const gaId = process.env.NEXT_PUBLIC_GA_ID;

  return (
    <html lang="en">
      <body>
        {children}
        <Suspense fallback={null}>
          <CookieBanner gaId={gaId} />
        </Suspense>
      </body>
    </html>
  );
}
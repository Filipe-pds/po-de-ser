import type { Metadata } from "next";
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
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
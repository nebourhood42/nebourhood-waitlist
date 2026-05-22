import type { Metadata, Viewport } from "next";
import { Lato } from "next/font/google";
import "./globals.css";

const lato = Lato({
  variable: "--font-lato",
  weight: ['100', '300', '400', "700", "900"]
});

export const metadata: Metadata = {
  title: "Nebourhood",
  description: "Nebourhood Waitlist",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  userScalable: false
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
       suppressHydrationWarning
      className={`${lato.variable} antialiased scroll-smooth`}
    >
      <body>{children}</body>
    </html>
  );
}

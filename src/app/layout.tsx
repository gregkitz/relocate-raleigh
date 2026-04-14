import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://relocateraleigh.com'),
  title: "Relocate Raleigh | The Tech Relocation Guide",
  description: "Keep your tech career. Upgrade your life. A local insider's guide to Raleigh-Durham for West Coast tech families.",
  openGraph: {
    title: "Relocate Raleigh | The Tech Relocation Guide",
    description: "Keep your tech career. Upgrade your life. A local insider's guide to Raleigh-Durham for West Coast tech families.",
    url: "https://relocateraleigh.com",
    siteName: "Relocate Raleigh",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Relocate Raleigh | The Tech Relocation Guide",
    description: "Keep your tech career. Upgrade your life. A local insider's guide to Raleigh-Durham for West Coast tech families.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}

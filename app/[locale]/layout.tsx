import type { Metadata } from "next";
import { JetBrains_Mono, Noto_Serif_TC } from "next/font/google";
import { notFound } from "next/navigation";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { routing, type Locale } from "@/i18n/routing";
import { pageMetadata, SITE_URL } from "@/lib/metadata";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import LocalBusinessJsonLd from "@/components/LocalBusinessJsonLd";
import "../globals.css";

// Body text uses the system TC stack (see globals.css) — self-hosting a full
// CJK sans adds ~300KB of render-blocking @font-face CSS for little visual
// gain. The serif display font stays as a webfont since it carries the brand.
const notoSerifTC = Noto_Serif_TC({
  variable: "--font-noto-serif-tc",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  weight: ["500"],
});

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "home" });
  return {
    metadataBase: new URL(SITE_URL),
    ...pageMetadata({
      locale: locale as Locale,
      path: "/",
      title: t("metaTitle"),
      description: t("metaDescription"),
    }),
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }
  setRequestLocale(locale);

  return (
    <html
      lang={locale}
      className={`${notoSerifTC.variable} ${jetbrainsMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-screen flex-col">
        <LocalBusinessJsonLd />
        <NextIntlClientProvider>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}

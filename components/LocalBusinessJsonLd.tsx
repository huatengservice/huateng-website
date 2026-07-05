import { SITE_URL } from "@/lib/metadata";

// LocalBusiness structured data for local-search SEO ("水電 附近" queries)
export default function LocalBusinessJsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "Plumber",
    name: "華騰工程行",
    alternateName: "Hua Teng Engineering",
    url: SITE_URL,
    logo: `${SITE_URL}/logo.svg`,
    telephone: "+886-938-969-739",
    address: {
      "@type": "PostalAddress",
      addressLocality: "大溪區",
      addressRegion: "桃園市",
      addressCountry: "TW",
    },
    areaServed: "桃園市大溪區及鄰近地區",
    openingHours: "Mo-Su 00:00-24:00",
    knowsAbout: [
      "水電維修",
      "漏水處理",
      "電路檢修",
      "老屋管線汰換",
      "甲級室內配線技術士",
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

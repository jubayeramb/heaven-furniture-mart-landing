import { site } from "@/lib/site";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export function JsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "FurnitureStore",
    name: site.name,
    description:
      "Bespoke furniture and interior styling studio in Chattogram, Bangladesh. Custom sofas, beds, dining and office furniture with free design consultation.",
    url: siteUrl,
    image: `${siteUrl}/og.jpg`,
    telephone: site.phone.e164,
    email: site.email,
    foundingDate: String(site.founded),
    founder: { "@type": "Person", name: site.founder, jobTitle: site.founderTitle },
    address: {
      "@type": "PostalAddress",
      streetAddress: `${site.address.street} (${site.address.landmark})`,
      addressLocality: site.address.city,
      addressCountry: "BD",
    },
    areaServed: "Chattogram, Bangladesh",
    priceRange: "$$$",
    sameAs: site.socials.map((s) => s.href),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

import type { Metadata, Viewport } from "next";
import { Inter, Instrument_Serif } from "next/font/google";
import { site } from "@/lib/site";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const display = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-display",
  display: "swap",
});

const description =
  "Yacine Belkhouche builds high-performance business platforms: custom management systems on Supabase, sub-second Next.js frontends, and search architecture engineered to rank. Engineering degree in Artificial Intelligence, University of Tlemcen.";

export const metadata: Metadata = {
  metadataBase: new URL(site.domain),
  title: {
    default: `${site.name} | ${site.role}`,
    template: `%s | ${site.name}`,
  },
  description,
  keywords: [
    "Next.js developer",
    "Supabase developer",
    "business management system",
    "web performance optimization",
    "technical SEO",
    "AI engineer",
    "full-stack freelancer",
    "custom web application",
  ],
  authors: [{ name: site.name, url: site.domain }],
  creator: site.name,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: site.domain,
    siteName: site.name,
    title: `${site.name} | ${site.role}`,
    description,
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} | ${site.role}`,
    description,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
};

export const viewport: Viewport = {
  themeColor: "#f5f6f2",
  colorScheme: "light",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: site.name,
  description,
  url: site.domain,
  email: site.email,
  telephone: site.phoneHref.replace("tel:", ""),
  areaServed: "Worldwide",
  founder: {
    "@type": "Person",
    name: site.name,
    jobTitle: site.role,
    alumniOf: {
      "@type": "CollegeOrUniversity",
      name: "University of Tlemcen",
    },
  },
  knowsAbout: [
    "Next.js",
    "Supabase",
    "Web performance optimization",
    "Technical SEO",
    "Artificial Intelligence",
  ],
  makesOffer: [
    { "@type": "Offer", itemOffered: { "@type": "Service", name: "Business Management Systems" } },
    { "@type": "Offer", itemOffered: { "@type": "Service", name: "High-Performance Web Development" } },
    { "@type": "Offer", itemOffered: { "@type": "Service", name: "Technical SEO" } },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${inter.variable} ${display.variable}`}>
      <body className="grain antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <a
          href="#work"
          className="sr-only focus:not-sr-only focus:fixed focus:left-6 focus:top-6 focus:z-[100] focus:rounded-full focus:bg-gold focus:px-5 focus:py-2 focus:text-sm focus:font-medium focus:text-canvas"
        >
          Skip to content
        </a>
        {children}
      </body>
    </html>
  );
}

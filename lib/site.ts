const FALLBACK_DOMAIN = "https://yacinebelkhouche.com";

/**
 * Resolve the canonical origin.
 *
 * `??` only falls back on null/undefined, so an env var that exists but is
 * empty produced "", and `new URL("")` in app/layout.tsx failed the whole
 * production build. This tolerates empty values, a missing protocol
 * ("example.com") and a trailing path, and falls back to the URLs Vercel
 * injects so a fresh deploy has correct canonicals before anything is set by
 * hand.
 */
function resolveDomain(): string {
  const candidates = [
    process.env.NEXT_PUBLIC_SITE_URL,
    process.env.NEXT_PUBLIC_VERCEL_PROJECT_PRODUCTION_URL,
    process.env.NEXT_PUBLIC_VERCEL_URL,
    FALLBACK_DOMAIN,
  ];

  for (const candidate of candidates) {
    const raw = candidate?.trim();
    if (!raw) continue;
    try {
      return new URL(/^https?:\/\//i.test(raw) ? raw : `https://${raw}`).origin;
    } catch {
      // Malformed value; fall through to the next candidate.
    }
  }

  return FALLBACK_DOMAIN;
}

export const site = {
  name: "Yacine Belkhouche",
  role: "AI Engineer & Full-Stack Web Architect",
  domain: resolveDomain(),
  email: "yacine.belkhouche23@gmail.com",
  /** Swap the extension here if you save the photo as a .png instead. */
  profileImage: "/profile.jpg",
  phoneDisplay: "0672128799",
  phoneIntl: "+213 672 12 87 99",
  phoneHref: "tel:+213672128799",
  location: "Tlemcen, Algeria · working with clients worldwide",
  availability: "Accepting 2 new client projects this quarter",
} as const;

export const stats = [
  { value: "2+", label: "Years freelancing", sub: "Delivered end to end, solo" },
  { value: "AI", label: "Engineering degree", sub: "University of Tlemcen" },
  { value: "<1s", label: "Typical LCP", sub: "On the builds I ship" },
  { value: "100%", label: "Client-owned code", sub: "No lock-in, ever" },
] as const;

export const stack = [
  "Next.js",
  "React",
  "TypeScript",
  "Supabase",
  "PostgreSQL",
  "Tailwind CSS",
  "Node.js",
  "Python",
  "PyTorch",
  "Edge Functions",
  "Vercel",
  "REST & Webhooks",
  "Core Web Vitals",
  "Schema.org",
] as const;

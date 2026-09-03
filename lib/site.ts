export const site = {
  name: "Yacine Belkhouche",
  role: "AI Engineer & Full-Stack Web Architect",
  domain: process.env.NEXT_PUBLIC_SITE_URL ?? "https://yacinebelkhouche.com",
  email: "yacine.belkhouche23@gmail.com",
  /** Swap the extension here if you save the photo as a .png instead. */
  profileImage: "/profile.jpg",
  phoneDisplay: "0672128799",
  phoneIntl: "+213 672 12 87 99",
  phoneHref: "tel:+213672128799",
  location: "Tlemcen, Algeria — working with clients worldwide",
  availability: "Accepting 2 new client projects this quarter",
} as const;

export const stats = [
  { value: "2+", label: "Years freelancing", sub: "Delivered end to end, solo" },
  { value: "MSc", label: "Artificial Intelligence", sub: "University of Tlemcen" },
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

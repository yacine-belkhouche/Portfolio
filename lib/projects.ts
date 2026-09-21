export type Project = {
  slug: string;
  name: string;
  /** The name in its own script, shown beside the Latin one. */
  nativeName?: { text: string; lang: string };
  sector: string;
  /** Shown as a chip. Use it to be honest about anything that is not a finished client build. */
  status?: string;
  url: string;
  image: string;
  imageAlt: string;
  summary: string;
  highlights: string[];
  stack: string[];
};

// Screenshots in public/projects/ are 1200x750 captures of each live homepage.
export const projects: Project[] = [
  {
    slug: "dteeduc",
    name: "DTEeduc",
    sector: "Private school · Tlemcen",
    url: "https://dteeduc.vercel.app",
    image: "/projects/dteeduc.jpg",
    imageAlt:
      "The DTEeduc homepage: a navy and gold hero reading “L’excellence académique, enracinée à Tlemcen”",
    summary:
      "The online home of Drici Tani Education, a private school running from preschool to the Baccalauréat, with pre-registration so enrolment starts on the website rather than at the front desk.",
    highlights: [
      "Pre-registrations go through a Server Action into Supabase. Row-level security lets a visitor add a registration but never read one back.",
      "One program catalog drives both the form’s options and the server’s validation, so the two can never drift apart.",
      "The database and server functions are pinned to Paris, a short hop from Algeria, instead of Vercel’s default US East region.",
    ],
    stack: ["Next.js", "Tailwind CSS", "Framer Motion", "Supabase"],
  },
  {
    slug: "bing-fitness",
    name: "Bing Fitness",
    sector: "Personal-training studio · Toronto",
    status: "Platform prototype",
    url: "https://bing-fitness.vercel.app",
    image: "/projects/bing-fitness.jpg",
    imageAlt:
      "The Bing Fitness homepage, with a “next opening” booking card over a training photo",
    summary:
      "A booking engine, client portal and coach dashboard for Coach Bing’s studio in North York, built to replace a booking form that ended in a WeChat follow-up.",
    highlights: [
      "Open slots are computed in Postgres from the coach’s weekly hours minus existing bookings, and each booking takes a lock so two clients can never claim the same hour.",
      "Clients get a portal with their package balance, a measurements log with trend charts, and private before-and-after progress photos.",
      "The coach side covers the schedule, lead follow-up, KPIs and package assignment, all behind Supabase Auth and row-level security.",
    ],
    stack: ["Next.js 16", "TypeScript", "shadcn/ui", "Supabase", "next-intl"],
  },
  {
    slug: "lamssat-tlemcen",
    name: "Lamssat Tlemcen",
    nativeName: { text: "لمسات تلمسان", lang: "ar" },
    sector: "Restaurant · Tlemcen",
    url: "https://lamssat-tlemcen.vercel.app",
    image: "/projects/lamssat-tlemcen.jpg",
    imageAlt:
      "The Lamssat Tlemcen homepage in deep green and gold, headed “The table your grandmother would recognise”",
    summary:
      "A site for a Tlemcen restaurant cooking the city’s traditional repertoire, with a live menu and a reservation book that will not overbook the room.",
    highlights: [
      "A Postgres function checks the 80-cover dining room across a 90-minute window either side of each request, and turns an overbooking away with a clear message.",
      "Guests can only ever create a pending reservation. Row-level security rejects anything else, and only staff accounts can read the reservation book.",
      "The menu is fetched from Supabase on the server and refreshed every 10 minutes, so price changes go live without a redeploy.",
    ],
    stack: ["Next.js 15", "TypeScript", "Zod", "Supabase"],
  },
];

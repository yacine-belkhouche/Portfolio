import { NextResponse } from "next/server";
import { getSupabaseAdminClient } from "@/lib/supabase/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/** Naive per-instance rate limit — enough to blunt casual form spam. */
const hits = new Map<string, number[]>();
const WINDOW_MS = 60_000;
const MAX_PER_WINDOW = 4;

function rateLimited(ip: string) {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  if (hits.size > 5000) hits.clear();
  return recent.length > MAX_PER_WINDOW;
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export async function POST(request: Request) {
  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    request.headers.get("x-real-ip") ??
    "unknown";

  if (rateLimited(ip)) {
    return NextResponse.json(
      { error: "Too many requests. Please try again shortly." },
      { status: 429 }
    );
  }

  let payload: Record<string, unknown>;
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const str = (v: unknown) => (typeof v === "string" ? v.trim() : "");

  // Honeypot: real people never fill a hidden field.
  if (str(payload.company_website)) {
    return NextResponse.json({ ok: true });
  }

  const name = str(payload.name).slice(0, 120);
  const email = str(payload.email).slice(0, 200);
  const company = str(payload.company).slice(0, 160) || null;
  const budget = str(payload.budget).slice(0, 60) || null;
  const service = str(payload.service).slice(0, 80) || null;
  const message = str(payload.message).slice(0, 4000);

  const errors: Record<string, string> = {};
  if (name.length < 2) errors.name = "Please tell me your name.";
  if (!EMAIL_RE.test(email)) errors.email = "That email doesn't look right.";
  if (message.length < 12)
    errors.message = "A sentence or two about the project, please.";

  if (Object.keys(errors).length) {
    return NextResponse.json({ errors }, { status: 422 });
  }

  const supabase = getSupabaseAdminClient();
  if (!supabase) {
    return NextResponse.json(
      {
        error:
          "The enquiry database isn't configured yet. Please email me directly and I'll reply the same day.",
      },
      { status: 503 }
    );
  }

  const { error } = await supabase.from("leads").insert({
    name,
    email,
    company,
    budget,
    service,
    message,
    source: "portfolio-contact-form",
    user_agent: request.headers.get("user-agent")?.slice(0, 400) ?? null,
  });

  if (error) {
    console.error("[contact] insert failed:", error.message);
    return NextResponse.json(
      { error: "Something went wrong saving your message. Please email me directly." },
      { status: 500 }
    );
  }

  return NextResponse.json({ ok: true });
}

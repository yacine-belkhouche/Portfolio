import { site } from "@/lib/site";

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative border-t border-hairline py-14">
      <div className="container-x">
        <div className="flex flex-col gap-10 lg:flex-row lg:items-start lg:justify-between">
          <div className="max-w-sm">
            <p className="font-display text-2xl text-bone">
              Yacine Belkhouche
            </p>
            <p className="mt-3 text-[13px] leading-relaxed text-muted">
              AI Engineer and full-stack web architect building fast,
              well-structured platforms for businesses that depend on them.
            </p>
            <p className="mt-4 text-[12px] text-muted/80">{site.location}</p>
          </div>

          <div className="grid grid-cols-2 gap-x-12 gap-y-8 sm:grid-cols-3">
            <div>
              <p className="text-[10px] uppercase tracking-[0.2em] text-muted">
                Sections
              </p>
              <ul className="mt-4 space-y-2.5 text-[13px]">
                {[
                  { href: "#about", label: "About" },
                  { href: "#services", label: "Services" },
                  { href: "#process", label: "Process" },
                  { href: "#contact", label: "Contact" },
                ].map((l) => (
                  <li key={l.href}>
                    <a
                      href={l.href}
                      className="text-muted transition-colors duration-300 hover:text-bone"
                    >
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <p className="text-[10px] uppercase tracking-[0.2em] text-muted">
                Services
              </p>
              <ul className="mt-4 space-y-2.5 text-[13px] text-muted">
                <li>Management systems</li>
                <li>Performance builds</li>
                <li>Technical SEO</li>
              </ul>
            </div>

            <div className="col-span-2 sm:col-span-1">
              <p className="text-[10px] uppercase tracking-[0.2em] text-muted">
                Direct
              </p>
              <ul className="mt-4 space-y-2.5 text-[13px]">
                <li>
                  <a
                    href={site.phoneHref}
                    className="text-bone transition-colors duration-300 hover:text-gold"
                  >
                    {site.phoneDisplay}
                  </a>
                </li>
                <li>
                  <a
                    href={"mailto:" + site.email}
                    className="break-all text-bone transition-colors duration-300 hover:text-gold"
                  >
                    {site.email}
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-hairline pt-7 text-[12px] text-muted sm:flex-row sm:items-center sm:justify-between">
          <p>© {year} Yacine Belkhouche. All rights reserved.</p>
          <p>Built with Next.js, Tailwind CSS and Supabase.</p>
        </div>
      </div>
    </footer>
  );
}

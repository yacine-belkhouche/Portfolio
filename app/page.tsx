import { About } from "@/components/about";
import { Contact } from "@/components/contact";
import { Hero } from "@/components/hero";
import { Process } from "@/components/process";
import { ScrollProgress } from "@/components/motion-primitives";
import { Services } from "@/components/services";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

export default function Home() {
  return (
    <>
      <ScrollProgress />
      <SiteHeader />
      <main>
        <Hero />
        <About />
        <div className="container-x">
          <div className="rule" />
        </div>
        <Services />
        <div className="container-x">
          <div className="rule" />
        </div>
        <Process />
        <Contact />
      </main>
      <SiteFooter />
    </>
  );
}

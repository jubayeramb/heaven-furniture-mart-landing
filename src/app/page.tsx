import { Bespoke } from "@/components/Bespoke";
import { Collections } from "@/components/Collections";
import { FinalCta } from "@/components/FinalCta";
import { Footer } from "@/components/Footer";
import { Hero } from "@/components/Hero";
import { Intro } from "@/components/Intro";
import { JsonLd } from "@/components/JsonLd";
import { Nav } from "@/components/Nav";
import { Proof } from "@/components/Proof";
import { StickyCta } from "@/components/StickyCta";
import { Trust } from "@/components/Trust";

export default function Home() {
  return (
    <>
      <JsonLd />
      <Nav />
      <main className="flex-1">
        <Hero />
        <Intro />
        <Trust />
        <Collections />
        <Bespoke />
        <Proof />
        <FinalCta />
      </main>
      <Footer />
      <StickyCta />
    </>
  );
}

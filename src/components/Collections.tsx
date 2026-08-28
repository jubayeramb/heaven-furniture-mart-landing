import Image, { type StaticImageData } from "next/image";
import living from "@/assets/images/living.jpg";
import bedroom from "@/assets/images/bedroom.jpg";
import dining from "@/assets/images/dining.jpg";
import office from "@/assets/images/office.jpg";
import { collections } from "@/lib/site";
import { CtaButton } from "./CtaButton";
import { Reveal } from "./Reveal";

const images: Record<(typeof collections)[number]["id"], { src: StaticImageData; alt: string }> = {
  living: { src: living, alt: "Cream sofa set with a carved wooden coffee table and marble side table" },
  bedroom: { src: bedroom, alt: "Emerald green velvet bed with a channel-tufted headboard" },
  dining: { src: dining, alt: "Marble-top dining table with burgundy leather dining chairs" },
  office: { src: office, alt: "Executive desk and ergonomic chair in a bright corner office" },
};

export function Collections() {
  return (
    <section id="collections" className="bg-ivory-100 py-24 md:py-32 lg:py-40">
      <div className="container-x">
        <Reveal className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="eyebrow text-brass-600">Collections</p>
            <h2 className="mt-5 text-[clamp(2.2rem,4vw,3.6rem)] leading-[1.05] text-brown-950">
              A glimpse of what we make
            </h2>
          </div>
          <p className="max-w-md text-[1.0625rem] leading-relaxed text-brown-700 md:text-right">
            Not a catalogue — a starting point. Every piece can be re-proportioned, re-upholstered
            or redrawn for your home.
          </p>
        </Reveal>

        <div className="mt-14 grid grid-cols-1 gap-4 min-[22.5rem]:grid-cols-2 md:gap-6 lg:mb-12 lg:grid-cols-4">
          {collections.map((c, i) => {
            const image = images[c.id];
            return (
              <Reveal
                as="figure"
                key={c.id}
                delay={i * 90}
                className={`group relative overflow-hidden bg-ivory-200 ${i % 2 === 1 ? "lg:translate-y-12" : ""}`}
              >
                <div className="img-zoom aspect-[3/4]">
                  <Image
                    src={image.src}
                    alt={image.alt}
                    placeholder="blur"
                    sizes="(min-width: 1024px) 25vw, 50vw"
                    className="h-full w-full object-cover"
                  />
                </div>
                <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-teal-950/90 via-teal-950/50 to-transparent p-4 pt-20 text-ivory-50 md:p-6">
                  <span className="eyebrow text-brass-300">{String(i + 1).padStart(2, "0")}</span>
                  <h3 className="mt-1 text-2xl leading-tight md:text-3xl">{c.name}</h3>
                  <p className="mt-1.5 text-[0.7rem] tracking-[0.06em] text-ivory-100/70 md:text-xs">
                    {c.items}
                  </p>
                </figcaption>
              </Reveal>
            );
          })}
        </div>

        <Reveal className="mt-16 flex flex-col items-center gap-5 text-center lg:mt-24">
          <p className="max-w-md text-[1.0625rem] text-brown-700">
            Looking for something you don&rsquo;t see here? That is exactly what we do.
          </p>
          <CtaButton variant="teal" />
        </Reveal>
      </div>
    </section>
  );
}

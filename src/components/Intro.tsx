import Image from "next/image";
import intro from "@/assets/images/intro.jpg";
import { site } from "@/lib/site";
import { Reveal } from "./Reveal";

export function Intro() {
  return (
    <section id="studio" className="bg-ivory-100 py-24 md:py-32 lg:py-40">
      <div className="container-x grid gap-16 lg:grid-cols-12 lg:gap-12">
        <Reveal className="flex flex-col justify-center lg:col-span-6 lg:pr-8">
          <p className="eyebrow text-brass-600">The studio</p>
          <h2 className="mt-5 text-[clamp(2.25rem,4.6vw,4rem)] leading-[1.04] text-brown-950">
            Bespoke furniture and interior styling,{" "}
            <em className="font-light italic text-teal-700">from Chattogram.</em>
          </h2>
          <p className="mt-8 max-w-xl text-[1.0625rem] leading-relaxed text-brown-700">
            {site.name} is one of Chattogram&rsquo;s leading bespoke furniture studios. Since{" "}
            {site.founded} we have designed and handcrafted sofas, beds, dining sets and office
            pieces around the way our clients actually live — then styled the rooms they sit in.
          </p>
          <p className="mt-5 max-w-xl text-[1.0625rem] leading-relaxed text-brown-700">
            Nothing here is pulled off a shelf. Every piece is built to your space, your size and
            your taste, and finished by our own craftsmen.
          </p>

          <dl className="mt-12 grid grid-cols-[repeat(auto-fit,minmax(6.5rem,1fr))] items-end gap-x-3 gap-y-6 border-t border-brown-900/10 pt-8 sm:gap-x-6">
            <div>
              <dt className="eyebrow text-brown-500">Founded</dt>
              <dd className="mt-2 font-display text-[1.6rem] text-brown-950 sm:text-3xl md:text-4xl">{site.founded}</dd>
            </div>
            <div>
              <dt className="eyebrow text-brown-500">Homes furnished</dt>
              <dd className="mt-2 font-display text-[1.6rem] text-brown-950 sm:text-3xl md:text-4xl">Hundreds</dd>
            </div>
            <div>
              <dt className="eyebrow text-brown-500">Showroom</dt>
              <dd className="mt-2 font-display text-[1.6rem] text-brown-950 sm:text-3xl md:text-4xl">Agrabad</dd>
            </div>
          </dl>
        </Reveal>

        <Reveal delay={140} className="lg:col-span-6">
          <figure className="relative ml-4 mt-4 lg:ml-8 lg:mt-8">
            <div
              aria-hidden
              className="absolute -left-4 -top-4 h-full w-full border border-brass-400/60 lg:-left-8 lg:-top-8"
            />
            <div className="img-zoom relative aspect-[4/5] overflow-hidden bg-ivory-200">
              <Image
                src={intro}
                alt="Hand-carved solid wood dining chair with striped upholstery at the Heaven Furniture Mart showroom"
                placeholder="blur"
                sizes="(min-width: 1024px) 40vw, 100vw"
                className="h-full w-full object-cover"
              />
            </div>
            <figcaption className="mt-4 text-[0.75rem] tracking-[0.08em] text-brown-500 uppercase">
              Hand-carved dining chair · Agrabad showroom
            </figcaption>
          </figure>
        </Reveal>
      </div>
    </section>
  );
}

import Image from "next/image";
import showroom from "@/assets/images/showroom.jpg";
import { milestones, quote, site } from "@/lib/site";
import { ArrowRightIcon } from "./Icons";
import { Reveal } from "./Reveal";

const mapsHref = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
  `${site.name}, ${site.address.street}, ${site.address.city}`,
)}`;

export function Proof() {
  return (
    <section id="showroom" className="bg-ivory-100 py-24 md:py-32 lg:py-40">
      <div className="container-x">
        <Reveal className="mx-auto max-w-4xl text-center">
          <p className="eyebrow text-brass-600">From the Managing Director</p>
          <blockquote className="mt-8">
            <p className="font-display text-[clamp(1.55rem,3.1vw,2.7rem)] font-light italic leading-[1.28] text-brown-950">
              &ldquo;{quote.text}&rdquo;
            </p>
            <footer className="mt-8 text-[0.8125rem] tracking-[0.1em] text-brown-700 uppercase">
              <span className="font-semibold text-brown-950">{quote.author}</span>
              <span className="mx-2 text-brass-500">·</span>
              {quote.role}
            </footer>
          </blockquote>
        </Reveal>

        <div className="mt-24 grid gap-10 md:mt-32 lg:grid-cols-12 lg:items-center lg:gap-14">
          <Reveal className="lg:order-2 lg:col-span-7">
            <figure className="img-zoom aspect-[16/10] overflow-hidden bg-teal-950 md:aspect-[2.2/1]">
              <Image
                src={showroom}
                alt="The Heaven Furniture Mart showroom on Agrabad Access Road, Chattogram, lit up at night"
                placeholder="blur"
                sizes="(min-width: 1024px) 58vw, 100vw"
                className="h-full w-full object-cover"
              />
            </figure>
          </Reveal>
          <Reveal delay={120} className="lg:col-span-5">
            <p className="eyebrow text-brass-600">The showroom</p>
            <h2 className="mt-5 text-[clamp(2rem,3.6vw,3.3rem)] leading-[1.06] text-brown-950">
              Trusted by hundreds of happy homeowners
            </h2>
            <p className="mt-6 text-[1.0625rem] leading-relaxed text-brown-700">
              Walk through full living, bedroom, dining and office collections at our showroom on
              Agrabad Access Road — then sit down with a designer, free of charge.
            </p>
            <address className="mt-8 text-[0.9375rem] leading-relaxed text-brown-800 not-italic">
              {site.address.landmark}
              <br />
              {site.address.street}, {site.address.city}
            </address>
            <a
              href={mapsHref}
              target="_blank"
              rel="noopener noreferrer"
              className="group mt-5 inline-flex items-center gap-2 text-sm font-semibold tracking-[0.04em] text-teal-700 transition-colors hover:text-brass-600"
            >
              Get directions
              <ArrowRightIcon className="size-4 transition-transform duration-500 ease-luxe group-hover:translate-x-1" />
            </a>
          </Reveal>
        </div>

        <Reveal className="mt-24 md:mt-32">
          <ol className="grid grid-cols-2 gap-x-6 gap-y-10 border-t border-brown-900/10 pt-10 sm:grid-cols-3 lg:grid-cols-5">
            {milestones.map((m) => (
              <li key={m.year}>
                <span className="font-display text-3xl leading-none text-brass-500 md:text-4xl">
                  {m.year}
                </span>
                <p className="mt-3 max-w-[14rem] text-sm leading-relaxed text-brown-700">{m.label}</p>
              </li>
            ))}
          </ol>
        </Reveal>
      </div>
    </section>
  );
}

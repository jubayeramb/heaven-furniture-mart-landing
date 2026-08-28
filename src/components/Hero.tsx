import { getImageProps } from "next/image";
import heroWide from "@/assets/images/hero.jpg";
import heroTall from "@/assets/images/hero-portrait.jpg";
import { site } from "@/lib/site";
import { CtaButton } from "./CtaButton";
import { ArrowDownIcon } from "./Icons";

const alt =
  "A bespoke cream sofa set with a gilded coffee table by Heaven Furniture Mart, styled in a warm living room";

export function Hero() {
  const common = { alt, priority: true, sizes: "100vw", quality: 85, placeholder: "blur" as const };
  const {
    props: { srcSet: wideSrcSet },
  } = getImageProps({ ...common, src: heroWide });
  const {
    props: { srcSet: tallSrcSet, ...img },
  } = getImageProps({ ...common, src: heroTall });

  return (
    <section
      id="hero"
      className="relative isolate flex min-h-[100svh] flex-col overflow-hidden bg-teal-950 text-ivory-100"
    >
      <picture className="absolute inset-0 -z-20 block">
        <source media="(min-width: 768px)" srcSet={wideSrcSet} sizes="100vw" />
        {/* eslint-disable-next-line jsx-a11y/alt-text -- alt is spread from img props */}
        <img
          {...img}
          srcSet={tallSrcSet}
          fetchPriority="high"
          className="h-full w-full animate-kenburns object-cover object-[55%_50%] motion-reduce:animate-none md:object-center"
        />
      </picture>
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-gradient-to-t from-teal-950 via-teal-950/45 to-teal-950/25"
      />
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-gradient-to-r from-teal-950/75 via-teal-950/10 to-transparent"
      />

      <div className="container-x relative flex flex-1 flex-col justify-end pb-14 pt-32 md:pb-16 lg:pb-20">
        <p className="eyebrow animate-fade-up text-brass-300">
          {site.category} · {site.city}
        </p>
        <h1 className="mt-5 max-w-[11ch] animate-fade-up text-[clamp(3rem,9vw,7.25rem)] leading-[0.96] tracking-[-0.015em] text-ivory-50 [animation-delay:120ms]">
          Furniture, <em className="font-light italic text-brass-200">crafted</em> around you.
        </h1>
        <p className="mt-7 max-w-xl animate-fade-up text-[1.0625rem] leading-relaxed text-ivory-100/80 [animation-delay:240ms] md:text-lg">
          Custom sofas, beds, dining and office pieces — designed and handcrafted in Chattogram to
          fit your space, your size and your taste.
        </p>
        <div className="mt-9 flex animate-fade-up flex-col items-start gap-4 [animation-delay:360ms] sm:flex-row sm:items-center sm:gap-6">
          <CtaButton size="lg" />
          <span className="text-[0.8125rem] tracking-[0.04em] text-ivory-100/60">
            Free · No obligation · Replies on WhatsApp
          </span>
        </div>

        <div className="mt-14 hidden animate-fade-up items-center justify-between gap-8 border-t border-ivory-100/15 pt-6 text-[0.75rem] tracking-[0.12em] text-ivory-100/60 uppercase [animation-delay:520ms] lg:flex">
          <ul className="flex flex-wrap items-center gap-x-8 gap-y-2 whitespace-nowrap">
            <li className="text-brass-300">{site.tagline}</li>
            <li>Free design consultation</li>
            <li className="hidden xl:block">Delivery &amp; installation included</li>
            <li>Showroom in Agrabad</li>
          </ul>
          <a
            href="#studio"
            className="group inline-flex shrink-0 items-center gap-2 normal-case tracking-[0.04em] whitespace-nowrap transition-colors hover:text-brass-300"
          >
            <span>Enter the studio</span>
            <ArrowDownIcon className="size-4 transition-transform duration-700 ease-luxe group-hover:translate-y-1" />
          </a>
        </div>
      </div>
    </section>
  );
}

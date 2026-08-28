import Image from "next/image";
import detail from "@/assets/images/bespoke-detail.jpg";
import craft from "@/assets/images/craft.jpg";
import { bespokeSteps } from "@/lib/site";
import { CtaButton } from "./CtaButton";
import { Reveal } from "./Reveal";

export function Bespoke() {
  return (
    <section id="bespoke" className="relative overflow-hidden bg-teal-900 py-24 text-ivory-100 md:py-32 lg:py-40">
      <div
        aria-hidden
        className="pointer-events-none absolute -right-40 -top-40 size-[34rem] rounded-full bg-brass-400/10 blur-3xl"
      />
      <div className="container-x grid gap-16 lg:grid-cols-12 lg:items-center lg:gap-12">
        <Reveal className="lg:col-span-5">
          <p className="eyebrow text-brass-300">Bespoke · Our signature</p>
          <h2 className="mt-5 text-[clamp(2.4rem,5vw,4.6rem)] leading-[1.02] text-ivory-50">
            Built to your space.{" "}
            <em className="font-light italic text-brass-200">Not pulled off a shelf.</em>
          </h2>
          <p className="mt-8 max-w-lg text-[1.0625rem] leading-relaxed text-ivory-100/75">
            Bring us a floor plan, a photograph or just an idea. We design around your walls, your
            windows and the way you live — then craft it in our own workshop in Chattogram.
          </p>

          <ol className="mt-12 space-y-8 border-l border-brass-400/30 pl-8">
            {bespokeSteps.map((s) => (
              <li key={s.step} className="relative">
                <span className="absolute -left-[2.95rem] top-0 font-display text-xl leading-none text-brass-400">
                  {s.step}
                </span>
                <h3 className="font-sans text-[1.0625rem] font-semibold text-ivory-50">{s.title}</h3>
                <p className="mt-1.5 max-w-md text-[0.9375rem] leading-relaxed text-ivory-100/70">
                  {s.body}
                </p>
              </li>
            ))}
          </ol>

          <div className="mt-12">
            <CtaButton size="lg" />
          </div>
        </Reveal>

        <Reveal delay={160} className="lg:col-span-7">
          <div className="relative mb-12 pl-6 sm:pl-10 lg:pl-14">
            <div className="img-zoom aspect-[4/3] overflow-hidden bg-teal-800 lg:aspect-[5/4]">
              <Image
                src={detail}
                alt="Close-up of a royal-blue velvet sofa with hand-carved gilded frame"
                placeholder="blur"
                sizes="(min-width: 1024px) 55vw, 100vw"
                className="h-full w-full object-cover"
              />
            </div>
            <figure className="absolute -bottom-10 left-0 w-[38%] max-w-[15rem] border-[5px] border-teal-900 shadow-[0_30px_60px_-20px_rgba(0,0,0,0.6)]">
              <div className="aspect-[3/4] overflow-hidden bg-teal-800">
                <Image
                  src={craft}
                  alt="A craftsman setting upholstery nails by hand along a sofa frame"
                  placeholder="blur"
                  sizes="(min-width: 1024px) 15rem, 38vw"
                  className="h-full w-full object-cover"
                />
              </div>
            </figure>
            <p className="absolute -bottom-9 right-0 hidden max-w-[15rem] text-right text-[0.75rem] leading-relaxed tracking-[0.06em] text-ivory-100/55 md:block">
              Every nail set by hand. Every frame carved in-house.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

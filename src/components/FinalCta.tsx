import Image from "next/image";
import bg from "@/assets/images/cta-bg.jpg";
import { site } from "@/lib/site";
import { CtaButton } from "./CtaButton";
import { Reveal } from "./Reveal";

export function FinalCta() {
  return (
    <section id="consult" className="relative isolate overflow-hidden bg-teal-950 py-28 text-ivory-50 md:py-40">
      <Image
        src={bg}
        alt=""
        fill
        placeholder="blur"
        sizes="100vw"
        className="-z-20 object-cover opacity-30"
      />
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-gradient-to-b from-teal-950/60 via-teal-950/50 to-teal-950"
      />
      <Reveal className="container-x flex flex-col items-center text-center">
        <p className="eyebrow text-brass-300">Free design consultation</p>
        <h2 className="mt-5 text-[clamp(2.6rem,6.5vw,6rem)] leading-[0.98] tracking-[-0.01em]">
          Let&rsquo;s design <em className="font-light italic text-brass-200">your</em> space.
        </h2>
        <p className="mt-7 max-w-xl text-[1.0625rem] leading-relaxed text-ivory-100/75 md:text-lg">
          Message us on WhatsApp to book a free consultation, or walk into the showroom on Agrabad
          Access Road. We&rsquo;ll take it from there.
        </p>
        <div className="mt-10">
          <CtaButton size="lg" />
        </div>
        <p className="mt-6 text-sm text-ivory-100/60">
          Prefer to call?{" "}
          <a
            href={`tel:${site.phone.e164}`}
            className="text-ivory-50 underline-offset-4 transition-colors hover:text-brass-300 hover:underline"
          >
            {site.phone.display}
          </a>
        </p>
      </Reveal>
    </section>
  );
}

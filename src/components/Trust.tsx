import { trustPoints } from "@/lib/site";
import { Reveal } from "./Reveal";

export function Trust() {
  return (
    <section id="why" className="bg-ivory-50 py-24 md:py-32">
      <div className="container-x grid gap-12 lg:grid-cols-12 lg:gap-16">
        <Reveal className="lg:col-span-4">
          <p className="eyebrow text-brass-600">Why Heaven</p>
          <h2 className="mt-5 text-[clamp(2.2rem,4vw,3.6rem)] leading-[1.05] text-brown-950">
            Why homeowners choose Heaven
          </h2>
          <p className="mt-6 max-w-sm text-[1.0625rem] leading-relaxed text-brown-700">
            Everything a well-made piece of furniture should come with — and usually doesn&rsquo;t.
          </p>
        </Reveal>

        <ol className="grid gap-x-10 sm:grid-cols-2 lg:col-span-8">
          {trustPoints.map((point, i) => (
            <Reveal as="li" key={point.title} delay={i * 70} className="border-t border-brown-900/10 py-7 md:py-8">
              <span className="font-display text-2xl leading-none text-brass-500">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-4 font-sans text-[1.0625rem] font-semibold text-brown-950">
                {point.title}
              </h3>
              <p className="mt-2 text-[0.9375rem] leading-relaxed text-brown-700">{point.body}</p>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}

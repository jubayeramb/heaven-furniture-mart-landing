import { ShowpieceStage } from "./three/ShowpieceStage";
import { Reveal } from "./Reveal";

export function Showpiece() {
  return (
    <section id="showpiece" className="relative bg-teal-950 text-ivory-100">
      <div className="container-x pt-24 md:pt-32">
        <Reveal className="max-w-2xl">
          <p className="eyebrow text-brass-300">Craftsmanship · In the round</p>
          <h2 className="mt-5 text-[clamp(2.4rem,5vw,4.6rem)] leading-[1.02] text-ivory-50">
            Every angle, <em className="font-light italic text-brass-200">considered.</em>
          </h2>
          <p className="mt-6 max-w-xl text-[1.0625rem] leading-relaxed text-ivory-100/75">
            Turn the set as you scroll. Frame, joinery, carving, upholstery — the details you
            only notice from the chair next to it are the ones our workshop obsesses over.
          </p>
        </Reveal>
      </div>
      <ShowpieceStage />
    </section>
  );
}

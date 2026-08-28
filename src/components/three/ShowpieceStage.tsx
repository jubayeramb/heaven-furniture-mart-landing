"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import { Component, useEffect, useRef, useState, type ReactNode } from "react";
import poster from "@/assets/images/showpiece-poster.webp";
import { showpieceCallouts } from "@/lib/site";

const ShowpieceScene = dynamic(() => import("./ShowpieceScene"), { ssr: false });

class SceneBoundary extends Component<{ fallback: ReactNode; children: ReactNode }, { failed: boolean }> {
  state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  render() {
    return this.state.failed ? this.props.fallback : this.props.children;
  }
}

function Poster({ className = "" }: { className?: string }) {
  return (
    <Image
      src={poster}
      alt="A classic cream sofa with two matching carved-frame armchairs"
      placeholder="blur"
      sizes="100vw"
      className={`pointer-events-none absolute inset-0 h-full w-full object-contain object-center ${className}`}
    />
  );
}

/**
 * Pinned viewport that turns a 3D piece as the visitor scrolls through the section.
 * The WebGL scene only loads once the section is near the viewport; until then (and
 * wherever WebGL is unavailable) a rendered poster stands in.
 */
export function ShowpieceStage() {
  const section = useRef<HTMLDivElement>(null);
  const bar = useRef<HTMLDivElement>(null);
  const progress = useRef(0);
  const invalidateRef = useRef<(() => void) | null>(null);
  const [near, setNear] = useState(false);
  const [ready, setReady] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [active, setActive] = useState(-1);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReducedMotion(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  // Load the scene when the section is within ~1.5 screens.
  useEffect(() => {
    const el = section.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setNear(true);
          io.disconnect();
        }
      },
      { rootMargin: "150% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // Scroll → progress. Stored in a ref for the scene, mirrored to state only when the callout changes.
  useEffect(() => {
    const el = section.current;
    if (!el) return;
    let raf = 0;
    const update = () => {
      raf = 0;
      const rect = el.getBoundingClientRect();
      const travel = el.offsetHeight - window.innerHeight;
      const p = travel > 0 ? Math.min(1, Math.max(0, -rect.top / travel)) : 0;
      progress.current = p;
      if (bar.current) bar.current.style.transform = `scaleX(${p})`;
      invalidateRef.current?.();
      const idx = showpieceCallouts.findIndex((c) => p >= c.from && p < c.to);
      setActive((prev) => (prev === idx ? prev : idx));
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  // Once the scene chunk + model have had a moment, fade the poster out.
  useEffect(() => {
    if (!near) return;
    const t = window.setTimeout(() => setReady(true), 900);
    return () => window.clearTimeout(t);
  }, [near]);

  return (
    <div ref={section} className="relative h-[260svh] md:h-[300svh]">
      <div className="sticky top-0 flex h-[100svh] flex-col overflow-hidden">
        <div
          aria-hidden
          className="pointer-events-none absolute left-1/2 top-1/2 size-[70vmin] -translate-x-1/2 -translate-y-1/2 rounded-full bg-brass-400/12 blur-3xl"
        />
        <div className="absolute inset-0">
          {near ? (
            <SceneBoundary fallback={<Poster />}>
              <ShowpieceScene progress={progress} invalidateRef={invalidateRef} reducedMotion={reducedMotion} />
            </SceneBoundary>
          ) : null}
          <Poster className={`transition-opacity duration-1000 ease-luxe ${ready ? "opacity-0" : "opacity-100"}`} />
        </div>

        {/* Callouts */}
        <ol className="pointer-events-none absolute inset-0 z-10">
          {showpieceCallouts.map((c, i) => {
            const on = reducedMotion || active === i;
            return (
              <li
                key={c.title}
                className={`absolute bottom-40 left-5 right-5 max-w-sm transition-[opacity,transform] duration-700 ease-luxe sm:left-8 sm:right-8 ${c.className} ${
                  on ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"
                }`}
                aria-hidden={!on}
              >
                <span className={`mb-3 block h-px w-10 bg-brass-400 ${c.align === "right" ? "md:ml-auto" : ""}`} aria-hidden />
                <h3 className="font-sans text-base font-semibold text-ivory-50">{c.title}</h3>
                <p className="mt-1.5 text-[0.9375rem] leading-relaxed text-ivory-100/70">{c.body}</p>
              </li>
            );
          })}
        </ol>

        {/* Scroll hint + progress */}
        <div className="pointer-events-none absolute inset-x-0 bottom-[4.75rem] z-10 md:bottom-0">
          <div className="container-x flex items-center justify-between pb-6 text-[0.6875rem] tracking-[0.2em] text-ivory-100/50 uppercase">
            <span className={`transition-opacity duration-700 ${active <= 0 && !reducedMotion ? "opacity-100" : "opacity-0"}`}>
              Scroll to turn the set
            </span>
            <span className="hidden sm:inline">Shown: a classic studio set</span>
          </div>
          <div className="h-px w-full bg-ivory-100/10">
            <div ref={bar} className="h-full w-full origin-left bg-brass-400" style={{ transform: "scaleX(0)" }} />
          </div>
        </div>
      </div>
    </div>
  );
}

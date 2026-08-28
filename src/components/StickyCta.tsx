"use client";

import { useEffect, useState } from "react";
import { site } from "@/lib/site";
import { CtaButton } from "./CtaButton";
import { PhoneIcon } from "./Icons";

/** Mobile-only bar that surfaces the single CTA once the hero scrolls away. */
export function StickyCta() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const hero = document.getElementById("hero");
    const footer = document.getElementById("contact");
    if (!hero) return;
    let heroVisible = true;
    let footerVisible = false;
    const sync = () => setVisible(!heroVisible && !footerVisible);
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.target === hero) heroVisible = e.isIntersecting;
          if (e.target === footer) footerVisible = e.isIntersecting;
        }
        sync();
      },
      { threshold: 0.12 },
    );
    io.observe(hero);
    if (footer) io.observe(footer);
    return () => io.disconnect();
  }, []);

  return (
    <div
      aria-hidden={!visible}
      className={`fixed inset-x-0 bottom-0 z-40 border-t border-brass-400/20 bg-teal-950/90 px-4 pt-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] backdrop-blur-md transition-transform duration-500 ease-luxe md:hidden ${
        visible ? "translate-y-0" : "translate-y-full"
      }`}
    >
      <div className="flex items-center gap-3">
        <CtaButton className="flex-1" label="Free Consultation" />
        <a
          href={`tel:${site.phone.e164}`}
          aria-label={`Call ${site.phone.display}`}
          className="inline-flex size-12 shrink-0 items-center justify-center rounded-full border border-ivory-100/25 text-ivory-100 transition-colors hover:border-brass-300 hover:text-brass-300"
        >
          <PhoneIcon className="size-5" />
        </a>
      </div>
    </div>
  );
}

"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { nav, site, whatsappHref } from "@/lib/site";
import logo from "@/assets/images/logo-white.png";
import { CtaButton } from "./CtaButton";
import { WhatsAppIcon } from "./Icons";

export function Nav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const update = () => setScrolled(window.scrollY > 32);
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-[background-color,box-shadow,backdrop-filter] duration-700 ease-luxe ${
        scrolled
          ? "bg-teal-950/80 shadow-[0_1px_0_0_rgba(201,169,106,0.18)] backdrop-blur-md"
          : "bg-transparent"
      }`}
    >
      <div className="container-x flex h-[4.25rem] items-center justify-between gap-6 md:h-20">
        <a href="#hero" className="flex shrink-0 items-center" aria-label={`${site.name} — back to top`}>
          <Image
            src={logo}
            alt={site.name}
            priority
            className="h-7 w-auto md:h-8"
            sizes="140px"
          />
        </a>

        <nav aria-label="Primary" className="hidden items-center gap-9 md:flex">
          {nav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-[0.8125rem] font-medium tracking-[0.06em] text-ivory-100/80 transition-colors duration-300 hover:text-brass-300"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <a
            href={`tel:${site.phone.e164}`}
            className="hidden text-[0.8125rem] font-medium tracking-[0.04em] text-ivory-100/80 transition-colors hover:text-brass-300 lg:block"
          >
            {site.phone.display}
          </a>
          <div className="hidden md:block">
            <CtaButton label="Book a Free Consultation" />
          </div>
          <a
            href={whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-10 items-center gap-2 rounded-full bg-brass-400 px-4 text-[0.75rem] font-semibold tracking-[0.06em] text-brown-950 md:hidden"
          >
            <WhatsAppIcon className="size-4" />
            WhatsApp
          </a>
        </div>
      </div>
    </header>
  );
}

import Image from "next/image";
import logo from "@/assets/images/logo-white.png";
import { site, whatsappHref } from "@/lib/site";
import { FacebookIcon, InstagramIcon, MailIcon, PhoneIcon, PinIcon, WhatsAppIcon, YouTubeIcon } from "./Icons";

const socialIcons = {
  Facebook: FacebookIcon,
  Instagram: InstagramIcon,
  YouTube: YouTubeIcon,
} as const;

const linkClass =
  "inline-flex items-start gap-3 text-[0.9375rem] leading-relaxed text-ivory-100/75 transition-colors hover:text-brass-300";

export function Footer() {
  return (
    <footer id="contact" className="bg-teal-950 text-ivory-100/70">
      <div className="hairline" />
      <div className="container-x grid gap-14 py-16 md:py-20 xl:grid-cols-12">
        <div className="xl:col-span-5">
          <Image src={logo} alt={site.name} className="h-8 w-auto" sizes="160px" />
          <p className="mt-6 font-display text-2xl italic text-brass-200">{site.tagline}</p>
          <p className="mt-4 max-w-sm text-[0.9375rem] leading-relaxed">
            Bespoke furniture and interior styling, designed and handcrafted in Chattogram since{" "}
            {site.founded}.
          </p>
        </div>

        <div className="grid gap-10 sm:grid-cols-2 md:grid-cols-[1.15fr_1.25fr_0.6fr] xl:col-span-7">
          <div>
            <h3 className="eyebrow font-sans text-brass-300">Visit</h3>
            <address className="mt-5 not-italic">
              <a
                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${site.name}, ${site.address.street}, ${site.address.city}`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className={linkClass}
              >
                <PinIcon className="mt-1 size-4 shrink-0 text-brass-400" />
                <span>
                  {site.address.landmark}
                  <br />
                  {site.address.street}
                  <br />
                  {site.address.city}, {site.address.country}
                </span>
              </a>
            </address>
          </div>

          <div>
            <h3 className="eyebrow font-sans text-brass-300">Talk</h3>
            <ul className="mt-5 space-y-3">
              <li>
                <a href={`tel:${site.phone.e164}`} className={linkClass}>
                  <PhoneIcon className="mt-1 size-4 shrink-0 text-brass-400" />
                  <span>{site.phone.display}</span>
                </a>
              </li>
              <li>
                <a href={whatsappHref} target="_blank" rel="noopener noreferrer" className={linkClass}>
                  <WhatsAppIcon className="mt-1 size-4 shrink-0 text-brass-400" />
                  <span>WhatsApp us</span>
                </a>
              </li>
              <li>
                <a href={`mailto:${site.email}`} className={`${linkClass} break-words`}>
                  <MailIcon className="mt-1 size-4 shrink-0 text-brass-400" />
                  <span>{site.email}</span>
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="eyebrow font-sans text-brass-300">Follow</h3>
            <ul className="mt-5 space-y-3">
              {site.socials.map((s) => {
                const Icon = socialIcons[s.name];
                return (
                  <li key={s.name}>
                    <a href={s.href} target="_blank" rel="noopener noreferrer" className={linkClass}>
                      <Icon className="mt-1 size-4 shrink-0 text-brass-400" />
                      <span>{s.name}</span>
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>

      <div className="container-x flex flex-col gap-2 border-t border-ivory-100/10 py-6 text-[0.75rem] tracking-[0.04em] text-ivory-100/45 sm:flex-row sm:items-center sm:justify-between">
        <p>© {new Date().getFullYear()} {site.name}. All rights reserved.</p>
        <p>
          {site.address.street}, {site.address.city}, {site.address.country}
        </p>
      </div>
    </footer>
  );
}

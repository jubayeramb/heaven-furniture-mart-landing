import { whatsappHref } from "@/lib/site";
import { WhatsAppIcon } from "./Icons";

type Props = {
  label?: string;
  variant?: "brass" | "outline" | "teal";
  size?: "md" | "lg";
  className?: string;
};

const variants = {
  brass:
    "bg-brass-400 text-brown-950 shadow-[0_18px_40px_-18px_rgba(201,169,106,0.9)] hover:bg-brass-300 hover:shadow-[0_22px_48px_-16px_rgba(201,169,106,0.9)]",
  outline:
    "border border-ivory-100/35 text-ivory-50 hover:border-brass-300 hover:text-brass-200",
  teal: "bg-teal-900 text-ivory-50 hover:bg-teal-800",
};

const sizes = {
  md: "h-12 px-6 text-[0.8125rem]",
  lg: "h-14 px-8 text-sm",
};

/**
 * The single call-to-action of the page. Every CTA on the site routes here,
 * so the visitor always lands on the same WhatsApp conversation.
 */
export function CtaButton({
  label = "Book a Free Consultation",
  variant = "brass",
  size = "md",
  className = "",
}: Props) {
  return (
    <a
      href={whatsappHref}
      target="_blank"
      rel="noopener noreferrer"
      className={`group inline-flex items-center justify-center gap-2.5 rounded-full font-sans font-semibold tracking-[0.04em] transition-[background-color,color,border-color,box-shadow,transform] duration-500 ease-luxe hover:-translate-y-px active:translate-y-0 ${variants[variant]} ${sizes[size]} ${className}`}
    >
      <WhatsAppIcon className="size-[1.125rem] shrink-0 transition-transform duration-500 ease-luxe group-hover:scale-110" />
      <span className="whitespace-nowrap">{label}</span>
    </a>
  );
}

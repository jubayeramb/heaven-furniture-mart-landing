"use client";

import { useEffect, useRef, type CSSProperties, type ReactNode, type RefObject } from "react";

let observer: IntersectionObserver | null = null;
const onEnter = new WeakMap<Element, () => void>();

function getObserver() {
  if (observer) return observer;
  observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        onEnter.get(entry.target)?.();
        observer?.unobserve(entry.target);
      }
    },
    { rootMargin: "0px 0px -8% 0px", threshold: 0.08 },
  );
  return observer;
}

type Props = {
  as?: "div" | "section" | "article" | "figure" | "li" | "p" | "header" | "footer";
  className?: string;
  /** Stagger offset in ms */
  delay?: number;
  children: ReactNode;
};

/** Fades content up once as it scrolls into view. Renders plainly without JS. */
export function Reveal({ as = "div", className = "", delay = 0, children }: Props) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      el.classList.add("in-view");
      return;
    }
    const io = getObserver();
    onEnter.set(el, () => el.classList.add("in-view"));
    io.observe(el);
    return () => {
      io.unobserve(el);
      onEnter.delete(el);
    };
  }, []);

  // The union of intrinsic tags shares the props we use; narrow for JSX typing.
  const Tag = as as "div";
  const style = delay ? ({ "--reveal-delay": `${delay}ms` } as CSSProperties) : undefined;

  return (
    <Tag ref={ref as RefObject<HTMLDivElement>} className={`reveal ${className}`.trim()} style={style}>
      {children}
    </Tag>
  );
}

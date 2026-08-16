"use client";

import Link from "next/link";
import type { AnchorHTMLAttributes, MouseEvent } from "react";

type ButtonVariant = "primary" | "secondary" | "secondaryOnDark";

type ButtonProps = {
  href: string;
  variant?: ButtonVariant;
  children: React.ReactNode;
} & Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href">;

const base =
  "inline-block rounded-sm px-8 py-4 text-sm tracking-wide transition-opacity duration-200 hover:opacity-85 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold";

const variants: Record<ButtonVariant, string> = {
  primary: "bg-gold text-forest-deep font-medium",
  secondary: "border border-forest text-forest",
  secondaryOnDark: "border border-forest-soft text-pearl",
};

declare global {
  interface Window {
    Calendly?: { initPopupWidget: (options: { url: string }) => void };
  }
}

// Button, not Link, because every use of this component is a call to action with brand-specific
// styling, see docs/PAGE_BLUEPRINTS.md for where "Book a Clarity Call" and its secondary links
// appear sitewide. Calendly links open the real embedded popup widget (Calendly.initPopupWidget,
// script loaded in src/app/layout.tsx), per docs/ARCHITECTURE.md's "Calendly embedded widget"
// spec, not a plain link-out. The href stays a real calendly.com link underneath, so it degrades
// gracefully (opens calendly.com directly) if the widget script hasn't loaded yet or JS is off.
export function Button({
  href,
  variant = "primary",
  children,
  className = "",
  ...props
}: ButtonProps) {
  const classes = `${base} ${variants[variant]} ${className}`;
  const isExternal = /^https?:\/\//.test(href);
  const isCalendly = /^https?:\/\/calendly\.com\//.test(href);

  const handleCalendlyClick = (event: MouseEvent<HTMLAnchorElement>) => {
    if (typeof window !== "undefined" && window.Calendly) {
      event.preventDefault();
      window.Calendly.initPopupWidget({ url: href });
    }
    // If the widget script hasn't loaded yet, let the click fall through to a normal
    // navigation to calendly.com, opened in a new tab, so booking never breaks.
  };

  if (isExternal) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={classes}
        onClick={isCalendly ? handleCalendlyClick : undefined}
        {...props}
      >
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={classes} {...props}>
      {children}
    </Link>
  );
}

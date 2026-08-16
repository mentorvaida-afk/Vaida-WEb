"use client";

import { useState } from "react";
import Link from "next/link";

// Matches the nav in content/homepage-prototype.html, plus Blog which that prototype predates.
const NAV_LINKS = [
  { href: "/about", label: "About" },
  { href: "/the-reset", label: "The Reset" },
  { href: "/the-method", label: "The Method" },
  { href: "/speaking", label: "Speaking" },
  { href: "/books", label: "Books" },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Contact" },
];

export function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="relative px-6 py-7 md:px-[6vw]">
      <div className="flex items-center justify-between">
        <Link href="/" className="font-display text-xl tracking-wide text-forest">
          Always <em className="text-gold not-italic">ENOUGH</em>™
        </Link>

        <nav aria-label="Primary" className="hidden gap-8 text-sm tracking-wide text-forest md:flex">
          {NAV_LINKS.map((link) => (
            <Link key={link.href} href={link.href} className="hover:text-forest-soft">
              {link.label}
            </Link>
          ))}
        </nav>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="mobile-nav"
          className="rounded-sm p-2 text-forest md:hidden"
        >
          <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            {open ? (
              <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            ) : (
              <path d="M4 7h16M4 12h16M4 17h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            )}
          </svg>
        </button>
      </div>

      {open && (
        <nav id="mobile-nav" aria-label="Primary (mobile)" className="mt-4 flex flex-col gap-4 text-forest md:hidden">
          {NAV_LINKS.map((link) => (
            <Link key={link.href} href={link.href} onClick={() => setOpen(false)} className="text-base">
              {link.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}

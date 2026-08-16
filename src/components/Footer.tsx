import Link from "next/link";

// Privacy Policy must be linked from every page's footer, per content/pages/privacy-policy.md's
// own instruction and docs/INSPECTION_CHECKLIST.md check 9 (data protection).
export function Footer() {
  return (
    <footer className="border-t border-line px-6 py-10 text-center text-sm text-ink/60">
      <p>
        <Link href="/privacy-policy" className="underline underline-offset-4">
          Privacy Policy
        </Link>
      </p>
      <p className="mt-3">
        <a href="mailto:hello@alwaysenoughmethod.com" className="underline underline-offset-4">
          hello@alwaysenoughmethod.com
        </a>
      </p>
      <p className="mt-3" suppressHydrationWarning>
        &copy; {new Date().getFullYear()} Always ENOUGH™, Vaida V. Stone
      </p>
    </footer>
  );
}

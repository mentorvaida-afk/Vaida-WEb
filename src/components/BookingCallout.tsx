import Link from "next/link";
import { Button } from "./Button";
import { Eyebrow } from "./Eyebrow";

const CALENDLY_URL = "https://calendly.com/vaidastone";

type BookingCalloutProps = {
  eyebrow?: string;
  heading: string;
  body?: string;
  secondaryHref?: string;
  secondaryLabel?: string;
  tone?: "light" | "dark";
};

// The primary conversion moment, appearing on every page per docs/PAGE_BLUEPRINTS.md.
// CTA label is locked as "Book a Clarity Call" — see docs/BRAND_CONTEXT.md and docs/BUILD_LOG.md
// for the correction from the earlier "Money Clarity Call" wording.
export function BookingCallout({
  eyebrow,
  heading,
  body,
  secondaryHref,
  secondaryLabel,
  tone = "light",
}: BookingCalloutProps) {
  const isDark = tone === "dark";
  return (
    <div className={`text-center ${isDark ? "text-pearl" : "text-forest"}`}>
      {eyebrow && <Eyebrow tone={isDark ? "gold" : "forest"}>{eyebrow}</Eyebrow>}
      <h2 className="font-display mt-4 mb-4 text-3xl md:text-4xl">{heading}</h2>
      {body && (
        <p className={`mx-auto mb-8 max-w-xl ${isDark ? "text-pearl/85" : "text-ink"}`}>{body}</p>
      )}
      <Button href={CALENDLY_URL} variant="primary">
        Book a Clarity Call
      </Button>
      {secondaryHref && secondaryLabel && (
        <div className="mt-4">
          <Link
            href={secondaryHref}
            className={`text-sm underline underline-offset-4 ${
              isDark ? "text-pearl/80" : "text-forest"
            }`}
          >
            {secondaryLabel}
          </Link>
        </div>
      )}
    </div>
  );
}

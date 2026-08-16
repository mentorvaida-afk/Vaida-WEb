type EyebrowProps = {
  children: React.ReactNode;
  tone?: "gold" | "forest";
};

// The small uppercase label above a heading, used throughout Vaida's approved page mockups
// (e.g. "Financial & Emotional Wellbeing", "Just Curious?", "Coming in 2026").
export function Eyebrow({ children, tone = "gold" }: EyebrowProps) {
  const color = tone === "gold" ? "text-gold" : "text-forest";
  return (
    <span className={`block text-xs font-medium uppercase tracking-[0.18em] ${color}`}>
      {children}
    </span>
  );
}

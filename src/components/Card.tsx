type CardProps = {
  children: React.ReactNode;
  className?: string;
  accent?: boolean;
};

// Generic bordered panel, used for testimonials, resource cards, and the Method's six petals.
// The thin forest-to-gold top accent matches every form artifact Vaida already approved
// (content/general-enquiry-form.html, content/speaking-enquiry-form.html).
export function Card({ children, className = "", accent = true }: CardProps) {
  return (
    <div className={`relative rounded-sm border border-line bg-white p-8 ${className}`}>
      {accent && (
        <span
          aria-hidden="true"
          className="absolute inset-x-0 top-0 h-[3px] bg-gradient-to-r from-forest to-gold"
        />
      )}
      {children}
    </div>
  );
}

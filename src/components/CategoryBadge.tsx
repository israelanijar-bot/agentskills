interface CategoryBadgeProps {
  name: string;
  type?: "category" | "skill" | "persona" | "bundle";
  className?: string;
}

const typeColors: Record<string, string> = {
  category: "bg-sand-100 text-ink-700",
  skill: "bg-accent-500/10 text-accent-600",
  persona: "bg-purple-100 text-purple-700",
  bundle: "bg-amber-100 text-amber-700",
};

export default function CategoryBadge({
  name,
  type = "category",
  className = "",
}: CategoryBadgeProps) {
  return (
    <span
      className={`inline-block px-2.5 py-0.5 text-xs font-medium rounded-full ${typeColors[type] ?? typeColors.category} ${className}`}
    >
      {name}
    </span>
  );
}

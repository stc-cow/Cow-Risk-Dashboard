interface RiskBadgeProps {
  risk: "safe" | "risk";
  size?: "sm" | "md" | "lg";
  showIcon?: boolean;
}

export function RiskBadge({ risk, size = "md", showIcon = true }: RiskBadgeProps) {
  const label = risk === "safe" ? "SAFE" : "RISK";
  const cls = risk === "safe" ? "risk-badge-safe" : "risk-badge-critical";
  const sizeCls = size === "sm" ? "text-[10px] px-1.5 py-0.5" : size === "lg" ? "text-sm px-3 py-1.5 font-bold" : "text-xs px-2 py-1";
  const icon = risk === "safe" ? "✓" : "✗";

  return (
    <span className={`inline-flex items-center gap-1 rounded font-semibold tracking-wide uppercase ${cls} ${sizeCls}`}>
      {showIcon && <span>{icon}</span>}
      {label}
    </span>
  );
}

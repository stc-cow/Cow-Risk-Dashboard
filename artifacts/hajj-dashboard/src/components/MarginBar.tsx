interface MarginBarProps {
  label: string;
  value: number;
  unit?: string;
  max?: number;
  risk: "safe" | "warning" | "critical";
}

export function MarginBar({ label, value, unit = "kW", max = 20, risk }: MarginBarProps) {
  const pct = Math.min(Math.max((value / max) * 100, 0), 100);
  const barColor = risk === "safe" ? "bg-emerald-500" : risk === "warning" ? "bg-amber-400" : "bg-red-500";

  return (
    <div className="space-y-1">
      <div className="flex justify-between text-xs">
        <span className="text-muted-foreground font-medium">{label}</span>
        <span className={`font-bold ${risk === "safe" ? "text-emerald-600" : risk === "warning" ? "text-amber-600" : "text-red-600"}`}>
          {value > 0 ? "+" : ""}{value.toFixed(1)} {unit}
        </span>
      </div>
      <div className="h-2 bg-muted rounded-full overflow-hidden">
        <div
          className={`h-full rounded-full transition-all ${barColor}`}
          style={{ width: `${value < 0 ? 5 : pct}%` }}
        />
      </div>
    </div>
  );
}

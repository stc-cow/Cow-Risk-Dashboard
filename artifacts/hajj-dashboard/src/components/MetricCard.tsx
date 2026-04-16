interface MetricCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon?: string;
  color?: "green" | "yellow" | "red" | "blue" | "default";
  large?: boolean;
}

const colorMap = {
  green: "from-emerald-500 to-green-600",
  yellow: "from-amber-400 to-orange-500",
  red: "from-red-500 to-rose-600",
  blue: "from-sky-500 to-blue-600",
  default: "from-slate-500 to-slate-600",
};

export function MetricCard({ title, value, subtitle, icon, color = "default", large = false }: MetricCardProps) {
  return (
    <div className="bg-card border border-card-border rounded-xl p-4 flex flex-col gap-2 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between">
        <span className="text-sm text-muted-foreground font-medium">{title}</span>
        {icon && (
          <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${colorMap[color]} flex items-center justify-center text-white text-sm`}>
            {icon}
          </div>
        )}
      </div>
      <div className={`font-bold text-foreground ${large ? "text-4xl" : "text-2xl"}`}>
        {value}
      </div>
      {subtitle && <div className="text-xs text-muted-foreground">{subtitle}</div>}
    </div>
  );
}

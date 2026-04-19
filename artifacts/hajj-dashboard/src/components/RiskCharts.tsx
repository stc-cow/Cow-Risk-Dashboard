import {
  PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, Radar
} from "recharts";
import type { SiteAnalysis } from "../lib/calculations";

interface RiskChartsProps {
  analyses: SiteAnalysis[];
}

const COLORS = {
  safe: "#00BFB3",
  warning: "#FF9AAD",
  critical: "#E8175D",
};

const STC_PALETTE = ["#E8175D", "#00BFB3", "#4A0E8F", "#FF9AAD", "#6CD5DE", "#8B5EC5"];

export function RiskDistributionPie({ analyses }: RiskChartsProps) {
  const safe = analyses.filter(a => a.overallRisk === "safe").length;
  const warning = analyses.filter(a => a.overallRisk === "warning").length;
  const critical = analyses.filter(a => a.overallRisk === "critical").length;

  const data = [
    { name: "Safe", value: safe, color: COLORS.safe },
    { name: "Warning", value: warning, color: COLORS.warning },
    { name: "Critical", value: critical, color: COLORS.critical },
  ];

  return (
    <div className="bg-card border border-card-border rounded-xl p-4 shadow-sm">
      <div className="font-semibold text-sm mb-3">Overall Risk Distribution</div>
      <ResponsiveContainer width="100%" height={180}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={45}
            outerRadius={70}
            paddingAngle={2}
            dataKey="value"
            label={({ name, value, percent }) => value > 0 ? `${name}: ${value}` : ""}
            labelLine={true}
          >
            {data.map((entry, i) => (
              <Cell key={i} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip formatter={(value) => [`${value} sites`]} />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}

export function RiskTypeBreakdown({ analyses }: RiskChartsProps) {
  const byType: Record<"safe" | "warning" | "critical", number> = { safe: 0, warning: 0, critical: 0 };

  const counts = {
    power: { ...byType },
    cooling: { ...byType },
    battery: { ...byType },
    rectifier: { ...byType },
  };

  for (const a of analyses) {
    for (const s of a.scenarios) {
      counts.power[s.powerRisk]++;
      counts.cooling[s.coolingRisk]++;
      counts.battery[s.batteryRisk]++;
      counts.rectifier[s.rectifierRisk]++;
    }
  }

  const total = analyses.length * 9;

  const data = [
    { category: "Power", safe: counts.power.safe, warning: counts.power.warning, critical: counts.power.critical },
    { category: "Cooling", safe: counts.cooling.safe, warning: counts.cooling.warning, critical: counts.cooling.critical },
    { category: "Battery", safe: counts.battery.safe, warning: counts.battery.warning, critical: counts.battery.critical },
    { category: "Rectifier", safe: counts.rectifier.safe, warning: counts.rectifier.warning, critical: counts.rectifier.critical },
  ];

  return (
    <div className="bg-card border border-card-border rounded-xl p-4 shadow-sm">
      <div className="font-semibold text-sm mb-3">Risk Type Breakdown (All Scenarios)</div>
      <ResponsiveContainer width="100%" height={180}>
        <BarChart data={data} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.05)" />
          <XAxis dataKey="category" tick={{ fontSize: 11 }} />
          <YAxis tick={{ fontSize: 10 }} />
          <Tooltip />
          <Legend iconSize={10} wrapperStyle={{ fontSize: 11 }} />
          <Bar dataKey="safe" name="Safe" fill={COLORS.safe} stackId="a" />
          <Bar dataKey="warning" name="Warning" fill={COLORS.warning} stackId="a" />
          <Bar dataKey="critical" name="Critical" fill={COLORS.critical} stackId="a" radius={[3, 3, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export function LocationRiskChart({ analyses }: RiskChartsProps) {
  const byLoc: Record<string, { safe: number; warning: number; critical: number }> = {};

  for (const a of analyses) {
    const loc = a.site.location;
    if (!byLoc[loc]) byLoc[loc] = { safe: 0, warning: 0, critical: 0 };
    byLoc[loc][a.overallRisk]++;
  }

  const data = Object.entries(byLoc).map(([loc, counts]) => ({
    location: loc.replace("Jeddah Islamic Port", "Jeddah Port").replace("Jeddah-Makkah Highway", "Highway"),
    ...counts,
  }));

  return (
    <div className="bg-card border border-card-border rounded-xl p-4 shadow-sm">
      <div className="font-semibold text-sm mb-3">Risk by Location</div>
      <ResponsiveContainer width="100%" height={200}>
        <BarChart data={data} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.05)" />
          <XAxis dataKey="location" tick={{ fontSize: 9 }} angle={-20} textAnchor="end" height={50} />
          <YAxis tick={{ fontSize: 10 }} />
          <Tooltip />
          <Legend iconSize={10} wrapperStyle={{ fontSize: 11 }} />
          <Bar dataKey="safe" name="Safe" fill={COLORS.safe} stackId="a" />
          <Bar dataKey="warning" name="Warning" fill={COLORS.warning} stackId="a" />
          <Bar dataKey="critical" name="Critical" fill={COLORS.critical} stackId="a" radius={[3, 3, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

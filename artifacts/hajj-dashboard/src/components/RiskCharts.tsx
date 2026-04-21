import {
  PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from "recharts";
import type { SiteAnalysis } from "../lib/calculations";

interface RiskChartsProps {
  analyses: SiteAnalysis[];
}

const COLORS = {
  safe: "#00BFB3",
  risk: "#E8175D",
};

export function RiskDistributionPie({ analyses }: RiskChartsProps) {
  const safe = analyses.filter(a => a.overallRisk === "safe").length;
  const risk = analyses.filter(a => a.overallRisk === "risk").length;

  const data = [
    { name: "Safe", value: safe, color: COLORS.safe },
    { name: "Risk", value: risk, color: COLORS.risk },
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
            label={({ name, value }) => value > 0 ? `${name}: ${value}` : ""}
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
  const byType: Record<"safe" | "risk", number> = { safe: 0, risk: 0 };

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

  const data = [
    { category: "Power",     safe: counts.power.safe,     risk: counts.power.risk },
    { category: "Cooling",   safe: counts.cooling.safe,   risk: counts.cooling.risk },
    { category: "Battery",   safe: counts.battery.safe,   risk: counts.battery.risk },
    { category: "Rectifier", safe: counts.rectifier.safe, risk: counts.rectifier.risk },
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
          <Bar dataKey="risk" name="Risk" fill={COLORS.risk} stackId="a" radius={[3, 3, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export function LocationRiskChart({ analyses }: RiskChartsProps) {
  const byLoc: Record<string, { safe: number; risk: number }> = {};

  for (const a of analyses) {
    const loc = a.site.location;
    if (!byLoc[loc]) byLoc[loc] = { safe: 0, risk: 0 };
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
          <Bar dataKey="risk" name="Risk" fill={COLORS.risk} stackId="a" radius={[3, 3, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

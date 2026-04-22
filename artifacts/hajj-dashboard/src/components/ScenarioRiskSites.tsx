import { Zap, CircuitBoard } from "lucide-react";
import type { SiteAnalysis } from "../lib/calculations";

interface Props {
  analyses: SiteAnalysis[];
}

const SCENARIOS = [6, 7, 8, 9] as const;

const SCENARIO_SHORT: Record<number, string> = {
  6: "S6 — Gen / AC1+AC2 / Normal",
  7: "S7 — Gen / AC1 / Charging",
  8: "S8 — Gen / AC1+AC2 / Charging",
  9: "S9 — Outage / Battery",
};

function Cell({ risk }: { risk: "safe" | "risk" | undefined }) {
  if (!risk) return <td className="px-2 py-2.5 text-center"><span className="text-gray-300 text-xs">—</span></td>;
  return (
    <td className="px-2 py-2.5 text-center">
      <span
        className="inline-flex items-center justify-center w-5 h-5 rounded-full text-white text-[10px] font-bold"
        style={{ background: risk === "risk" ? "#E8175D" : "#00BFB3" }}
        title={risk}
      >
        {risk === "risk" ? "✕" : "✓"}
      </span>
    </td>
  );
}

export function ScenarioRiskSites({ analyses }: Props) {
  const powerRiskSites = analyses.filter(a =>
    SCENARIOS.some(sid => {
      const s = a.scenarios.find(sc => sc.scenarioId === sid);
      return s?.powerRisk === "risk";
    })
  );

  const rectRiskSites = analyses.filter(a =>
    SCENARIOS.some(sid => {
      const s = a.scenarios.find(sc => sc.scenarioId === sid);
      return s?.rectifierRisk === "risk";
    })
  );

  const allRiskSiteIds = new Set([
    ...powerRiskSites.map(a => a.site.id),
    ...rectRiskSites.map(a => a.site.id),
  ]);

  const rows = analyses
    .filter(a => allRiskSiteIds.has(a.site.id))
    .map(a => {
      const byScenario = Object.fromEntries(
        SCENARIOS.map(sid => [sid, a.scenarios.find(sc => sc.scenarioId === sid)])
      );
      return { site: a.site, byScenario };
    });

  function SiteTable({ type }: { type: "power" | "rectifier" }) {
    const filtered = rows.filter(r =>
      SCENARIOS.some(sid => {
        const s = r.byScenario[sid];
        return type === "power" ? s?.powerRisk === "risk" : s?.rectifierRisk === "risk";
      })
    );

    return (
      <div className="bg-white rounded-xl border border-border shadow-sm overflow-hidden">
        <div className="px-4 py-3 border-b border-border flex items-center gap-2"
          style={{ background: type === "power" ? "linear-gradient(135deg,#4a0e8f,#6b21c8)" : "linear-gradient(135deg,#0f4c81,#1a6fb5)" }}>
          {type === "power"
            ? <Zap size={15} className="text-yellow-300" />
            : <CircuitBoard size={15} className="text-cyan-300" />}
          <span className="text-white font-bold text-sm">
            {type === "power" ? "Power Supply" : "Rectifier Supply"} Risk — Scenarios 6–9
          </span>
          <span className="ml-auto text-white/70 text-xs">{filtered.length} site{filtered.length !== 1 ? "s" : ""}</span>
        </div>

        {filtered.length === 0 ? (
          <div className="px-4 py-6 text-center text-sm text-muted-foreground">
            No sites at risk in S6–S9
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="border-b border-border bg-gray-50">
                  <th className="text-left px-4 py-2.5 font-semibold text-gray-600">Site ID</th>
                  <th className="text-left px-4 py-2.5 font-semibold text-gray-600">Location</th>
                  <th className="text-left px-4 py-2.5 font-semibold text-gray-600">Type</th>
                  {SCENARIOS.map(sid => (
                    <th key={sid} className="text-center px-2 py-2.5 font-semibold text-gray-600 whitespace-nowrap">
                      S{sid}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.map((r, idx) => (
                  <tr key={r.site.id}
                    className="border-b border-gray-100 hover:bg-purple-50/40 transition-colors"
                    style={{ background: idx % 2 === 0 ? "white" : "#fafafa" }}>
                    <td className="px-4 py-2.5 font-mono font-semibold text-purple-700">{r.site.id}</td>
                    <td className="px-4 py-2.5 text-gray-700">{r.site.location}</td>
                    <td className="px-4 py-2.5 text-gray-500 capitalize">{r.site.siteType.replace("_", " ")}</td>
                    {SCENARIOS.map(sid => (
                      <Cell
                        key={sid}
                        risk={type === "power"
                          ? r.byScenario[sid]?.powerRisk
                          : r.byScenario[sid]?.rectifierRisk}
                      />
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        <div className="px-4 py-2 border-t border-border bg-gray-50 flex items-center gap-4 flex-wrap text-[10px] text-gray-500">
          {SCENARIOS.map(sid => (
            <span key={sid}><span className="font-semibold">S{sid}</span> — {SCENARIO_SHORT[sid]}</span>
          ))}
          <span className="ml-auto flex items-center gap-3">
            <span className="inline-flex items-center gap-1">
              <span className="w-3 h-3 rounded-full inline-block" style={{ background: "#E8175D" }} /> Risk
            </span>
            <span className="inline-flex items-center gap-1">
              <span className="w-3 h-3 rounded-full inline-block" style={{ background: "#00BFB3" }} /> Safe
            </span>
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <SiteTable type="power" />
      <SiteTable type="rectifier" />
    </div>
  );
}

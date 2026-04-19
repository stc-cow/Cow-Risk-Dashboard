import { useState } from "react";
import type { SiteAnalysis, ScenarioResult } from "../lib/calculations";
import { RiskBadge } from "./RiskBadge";
import { MarginBar } from "./MarginBar";

interface SiteDetailPanelProps {
  analysis: SiteAnalysis;
  onClose: () => void;
}

export function SiteDetailPanel({ analysis, onClose }: SiteDetailPanelProps) {
  const [activeScenario, setActiveScenario] = useState<number>(0);
  const { site, scenarios } = analysis;
  const sc: ScenarioResult = scenarios[activeScenario];

  const formatNum = (n: number, d = 1) => n.toFixed(d);

  return (
    <div className="bg-card border border-card-border rounded-xl shadow-xl overflow-hidden h-full flex flex-col">
      <div className="stc-gradient px-4 py-3 flex items-center justify-between">
        <div>
          <div className="text-white font-bold text-base">{site.id}</div>
          <div className="text-purple-200 text-xs">{site.name}</div>
        </div>
        <div className="flex items-center gap-2">
          <RiskBadge risk={analysis.overallRisk} size="md" />
          <button onClick={onClose} className="text-purple-200 hover:text-white transition-colors ml-2 text-lg font-bold">✕</button>
        </div>
      </div>

      <div className="px-4 py-3 border-b border-border bg-muted/40 grid grid-cols-2 gap-2 text-xs">
        <div><span className="text-muted-foreground">Type:</span> <span className="font-semibold capitalize">{site.siteType.replace("_", " ")}</span></div>
        <div><span className="text-muted-foreground">Power:</span> <span className="font-semibold capitalize">{site.powerConfig.replace(/_/g, " ")}</span></div>
        <div><span className="text-muted-foreground">Generator:</span> <span className="font-semibold">{site.generatorKva} kVA (Age: {site.generatorAge}yr)</span></div>
        <div><span className="text-muted-foreground">Battery:</span> <span className="font-semibold">{site.batteryCapacityAh} Ah {site.batteryType.replace("_", "-")}</span></div>
        <div><span className="text-muted-foreground">AC1:</span> <span className="font-semibold">{(site.ac1CapacityBtu / 1000).toFixed(0)}k BTU/h</span></div>
        <div><span className="text-muted-foreground">AC2:</span> <span className="font-semibold">{site.ac2CapacityBtu ? `${(site.ac2CapacityBtu / 1000).toFixed(0)}k BTU/h` : "—"}</span></div>
        <div><span className="text-muted-foreground">Rectifier:</span> <span className="font-semibold">{site.rectifierCapacityKw} kW</span></div>
        <div><span className="text-muted-foreground">Telecom Load:</span> <span className="font-semibold">{site.telecomLoadAmps} A</span></div>
      </div>

      <div className="px-4 py-2 border-b border-border">
        <div className="text-xs font-semibold text-muted-foreground mb-2 uppercase tracking-wide">Scenario</div>
        <div className="flex flex-wrap gap-1">
          {scenarios.map((s, i) => {
            const worstRisk = [s.powerRisk, s.rectifierRisk, s.batteryRisk, s.coolingRisk].reduce((acc, r) => {
              if (r === "critical") return "critical";
              if (r === "warning" && acc !== "critical") return "warning";
              return acc;
            }, "safe" as "safe" | "warning" | "critical");

            const bg = worstRisk === "safe" ? "bg-emerald-50 border-emerald-200 text-emerald-800" :
              worstRisk === "warning" ? "bg-amber-50 border-amber-200 text-amber-800" :
              "bg-red-50 border-red-200 text-red-800";
            const activeCls = activeScenario === i ? "ring-2 ring-primary ring-offset-1 font-bold" : "";

            return (
              <button
                key={s.scenarioId}
                onClick={() => setActiveScenario(i)}
                className={`px-2 py-1 text-[10px] rounded border transition-all ${bg} ${activeCls}`}
              >
                S{s.scenarioId}
              </button>
            );
          })}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-4 py-3 space-y-4">
        <div>
          <div className="text-xs font-bold text-foreground mb-1 flex items-center gap-2">
            {sc.scenarioName}
          </div>
          <div className="text-[11px] text-muted-foreground mb-3">
            Source: <span className="font-medium capitalize">{sc.powerSource.replace("_", " ")}</span> ·
            Cooling: <span className="font-medium">{sc.coolingConfig === "none" ? "Off" : sc.coolingConfig === "ac1_only" ? "AC1" : "AC1+AC2"}</span> ·
            Battery: <span className="font-medium capitalize">{sc.batteryState.replace("_", " ")}</span>
          </div>

          <div className="grid grid-cols-2 gap-3 mb-4">
            <div className="bg-muted/50 rounded-lg p-2.5">
              <div className="text-[10px] text-muted-foreground mb-1">Power Risk</div>
              <RiskBadge risk={sc.powerRisk} size="sm" />
            </div>
            <div className="bg-muted/50 rounded-lg p-2.5">
              <div className="text-[10px] text-muted-foreground mb-1">Cooling Risk</div>
              <RiskBadge risk={sc.coolingRisk} size="sm" />
            </div>
            <div className="bg-muted/50 rounded-lg p-2.5">
              <div className="text-[10px] text-muted-foreground mb-1">Battery Risk</div>
              <RiskBadge risk={sc.batteryRisk} size="sm" />
            </div>
            <div className="bg-muted/50 rounded-lg p-2.5">
              <div className="text-[10px] text-muted-foreground mb-1">Rectifier Risk</div>
              <RiskBadge risk={sc.rectifierRisk} size="sm" />
            </div>
          </div>

          <div className="space-y-2.5">
            <MarginBar
              label="Power Margin"
              value={sc.powerMarginKw}
              unit="kW"
              max={Math.max(sc.generatorNetPowerKw, 20)}
              risk={sc.powerRisk}
            />
            <MarginBar
              label="Rectifier Margin"
              value={sc.rectifierMarginKw}
              unit="kW"
              max={site.rectifierCapacityKw}
              risk={sc.rectifierRisk}
            />
            <MarginBar
              label="Battery Margin"
              value={sc.batteryMarginKw}
              unit="kW"
              max={sc.batteryMaxPowerKw * 2}
              risk={sc.batteryRisk}
            />
            <MarginBar
              label="Cooling Margin"
              value={sc.coolingMarginBtu / 1000}
              unit="kBTU/h"
              max={site.ac1CapacityBtu / 1000 + (site.ac2CapacityBtu ?? 0) / 1000}
              risk={sc.coolingRisk}
            />
          </div>
        </div>

        <div className="border-t border-border pt-3">
          <div className="text-xs font-semibold text-muted-foreground mb-2 uppercase tracking-wide">Engineering Parameters</div>
          <div className="grid grid-cols-1 gap-1 text-xs">
            <div className="flex justify-between py-0.5">
              <span className="text-muted-foreground">Generator Net Power</span>
              <span className="font-semibold">{formatNum(sc.generatorNetPowerKw)} kW</span>
            </div>
            <div className="flex justify-between py-0.5">
              <span className="text-muted-foreground">Telecom Load</span>
              <span className="font-semibold">{formatNum(sc.telecomLoadKw)} kW</span>
            </div>
            <div className="flex justify-between py-0.5">
              <span className="text-muted-foreground">Telecom Heat</span>
              <span className="font-semibold">{formatNum(sc.telecomHeatBtu / 1000, 1)} kBTU/h</span>
            </div>
            <div className="flex justify-between py-0.5">
              <span className="text-muted-foreground">AC1 Power Consumption</span>
              <span className="font-semibold">{formatNum(sc.ac1PowerKw)} kW</span>
            </div>
            {sc.ac2PowerKw > 0 && (
              <div className="flex justify-between py-0.5">
                <span className="text-muted-foreground">AC2 Power Consumption</span>
                <span className="font-semibold">{formatNum(sc.ac2PowerKw)} kW</span>
              </div>
            )}
            <div className="flex justify-between py-0.5">
              <span className="text-muted-foreground">Total Cooling Capacity</span>
              <span className="font-semibold">{formatNum(sc.totalCoolingCapacityBtu / 1000, 1)} kBTU/h</span>
            </div>
            <div className="flex justify-between py-0.5">
              <span className="text-muted-foreground">Battery Backup Time</span>
              <span className="font-semibold">{formatNum(sc.batteryBackupTimeHours)} hrs</span>
            </div>
            <div className="flex justify-between py-0.5">
              <span className="text-muted-foreground">Battery Max Power</span>
              <span className="font-semibold">{formatNum(sc.batteryMaxPowerKw)} kW</span>
            </div>
            <div className="flex justify-between py-0.5 font-semibold border-t border-border mt-1 pt-1">
              <span className="text-muted-foreground">Total Site Load</span>
              <span>{formatNum(sc.totalSiteLoadKw)} kW</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

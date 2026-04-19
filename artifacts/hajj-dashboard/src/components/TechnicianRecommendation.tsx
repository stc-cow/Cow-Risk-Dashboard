import type { SiteAnalysis } from "../lib/calculations";

interface TechnicianRecommendationProps {
  analyses: SiteAnalysis[];
}

export function TechnicianRecommendation({ analyses }: TechnicianRecommendationProps) {
  const critical = analyses.filter(a => a.overallRisk === "critical");
  const warning = analyses.filter(a => a.overallRisk === "warning");
  const safe = analyses.filter(a => a.overallRisk === "safe");

  const techForCritical = Math.ceil(critical.length / 3);
  const techForWarning = Math.ceil(warning.length / 6);
  const totalTech = techForCritical + techForWarning;

  const byLocation: Record<string, { critical: number; warning: number; safe: number }> = {};
  for (const a of analyses) {
    const loc = a.site.location;
    if (!byLocation[loc]) byLocation[loc] = { critical: 0, warning: 0, safe: 0 };
    byLocation[loc][a.overallRisk]++;
  }

  return (
    <div className="bg-card border border-card-border rounded-xl shadow-sm p-4 space-y-4">
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white text-sm">👷</div>
        <div>
          <div className="font-semibold text-sm">Technician Deployment Plan</div>
          <div className="text-xs text-muted-foreground">Based on risk classification</div>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-3">
        <div className="text-center p-3 rounded-lg border" style={{background:"#fce4ed", borderColor:"#E8175D"}}>
          <div className="text-2xl font-bold" style={{color:"#E8175D"}}>{techForCritical}</div>
          <div className="text-xs font-medium mt-0.5" style={{color:"#b01040"}}>High Risk Techs</div>
          <div className="text-[10px] mt-1" style={{color:"#E8175D"}}>1 per 3 critical sites</div>
        </div>
        <div className="text-center p-3 rounded-lg border" style={{background:"#ffe0e8", borderColor:"#FF9AAD"}}>
          <div className="text-2xl font-bold" style={{color:"#c0506a"}}>{techForWarning}</div>
          <div className="text-xs font-medium mt-0.5" style={{color:"#a03050"}}>Med Risk Techs</div>
          <div className="text-[10px] mt-1" style={{color:"#c0506a"}}>1 per 6 warning sites</div>
        </div>
        <div className="text-center p-3 bg-blue-50 rounded-lg border border-blue-100">
          <div className="text-2xl font-bold text-blue-600">{totalTech}</div>
          <div className="text-xs text-blue-700 font-medium mt-0.5">Total Techs</div>
          <div className="text-[10px] text-blue-500 mt-1">{safe.length} sites remote</div>
        </div>
      </div>

      <div>
        <div className="text-xs font-semibold text-muted-foreground mb-2 uppercase tracking-wide">By Location</div>
        <div className="space-y-1.5">
          {Object.entries(byLocation).map(([loc, counts]) => {
            const total = counts.critical + counts.warning + counts.safe;
            const techNeeded = Math.ceil(counts.critical / 3) + Math.ceil(counts.warning / 6);
            return (
              <div key={loc} className="flex items-center gap-2">
                <div className="text-xs text-muted-foreground w-36 truncate">{loc}</div>
                <div className="flex-1 h-4 bg-muted rounded-full overflow-hidden flex">
                  <div className="h-full" style={{ width: `${(counts.critical / total) * 100}%`, background:"#E8175D" }} />
                  <div className="h-full" style={{ width: `${(counts.warning / total) * 100}%`, background:"#FF9AAD" }} />
                  <div className="h-full" style={{ width: `${(counts.safe / total) * 100}%`, background:"#00BFB3" }} />
                </div>
                <div className="text-xs font-semibold w-12 text-right">{techNeeded > 0 ? `${techNeeded} tech` : "Remote"}</div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

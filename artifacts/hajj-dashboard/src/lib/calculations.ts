export interface SiteConfig {
  id: string;
  name: string;
  location: string;
  lat: number;
  lng: number;
  siteType: "shelter" | "outdoor_cabinet";
  powerConfig: "single_generator" | "commercial_with_backup";

  generatorKva: number;
  generatorAge: number;
  backupGeneratorKva?: number;
  backupGeneratorAge?: number;

  telecomLoadAmps: number;

  ac1CapacityBtu: number;
  ac1Age: number;
  ac2CapacityBtu?: number;
  ac2Age?: number;

  batteryCapacityAh: number;
  batteryType: "lead_acid" | "lithium";
  batteryAge: number;

  rectifierCapacityKw: number;
}

export interface ScenarioResult {
  scenarioId: number;
  scenarioName: string;
  powerSource: "prime" | "backup" | "outage";
  coolingConfig: "ac1_only" | "ac1_ac2" | "none";
  batteryState: "fully_charged" | "charging" | "discharging";

  generatorNetPowerKw: number;
  telecomLoadKw: number;
  telecomHeatBtu: number;

  ac1PowerKw: number;
  ac2PowerKw: number;
  totalCoolingCapacityBtu: number;

  batteryChargingPowerKw: number;
  totalSiteLoadKw: number;

  powerMarginKw: number;
  rectifierMarginKw: number;
  batteryMaxPowerKw: number;
  batteryMarginKw: number;
  coolingMarginBtu: number;
  batteryBackupTimeHours: number;

  powerRisk: "safe" | "warning" | "critical";
  rectifierRisk: "safe" | "warning" | "critical";
  batteryRisk: "safe" | "warning" | "critical";
  coolingRisk: "safe" | "warning" | "critical";

  riskScore: number;
}

export interface SiteAnalysis {
  site: SiteConfig;
  scenarios: ScenarioResult[];
  overallRisk: "safe" | "warning" | "critical";
  worstRiskScore: number;
  technicianNeeded: boolean;
}

const POWER_FACTOR = 0.8;
const ALTERNATOR_EFFICIENCY = 0.87;
const GENERATOR_RISK_FACTOR = 0.9;
const ANNUAL_DEGRADATION = 0.03;
const COOLING_ADJUSTMENT = 0.833;
const COP = 3.5;
const BTU_PER_KW = 3412;
const ANNUAL_AC_DEGRADATION = 0.015;
const BATTERY_VOLTAGE = 50;

function calcGeneratorNetPower(kva: number, age: number): number {
  return kva * POWER_FACTOR * ALTERNATOR_EFFICIENCY * GENERATOR_RISK_FACTOR * (1 - ANNUAL_DEGRADATION * age);
}

function calcTelecomLoadKw(amps: number): number {
  return (amps * 48) / 1000;
}

function calcTelecomHeatBtu(loadKw: number): number {
  return loadKw * BTU_PER_KW;
}

function calcNetCoolingCapacityBtu(capacityBtu: number, age: number): number {
  return capacityBtu * COOLING_ADJUSTMENT * (1 - ANNUAL_AC_DEGRADATION * age);
}

function calcAcPowerKw(netCoolingBtu: number): number {
  return netCoolingBtu / BTU_PER_KW / COP;
}

function calcBatteryEnergyWh(capacityAh: number): number {
  return BATTERY_VOLTAGE * capacityAh;
}

function calcBatteryUsableCapacityWh(
  capacityAh: number,
  batteryType: "lead_acid" | "lithium",
  age: number
): number {
  const energyWh = calcBatteryEnergyWh(capacityAh);
  const dod = batteryType === "lead_acid" ? 0.5 : 0.85;
  const annualDeg = batteryType === "lead_acid" ? 0.2 : 0.1;
  const remaining = Math.max(0, 1 - annualDeg * age);
  return energyWh * dod * remaining;
}

function calcBatteryMaxPowerKw(capacityAh: number, batteryType: "lead_acid" | "lithium"): number {
  const cRate = batteryType === "lead_acid" ? 0.85 : 1.0;
  const maxCurrentA = cRate * capacityAh;
  return (maxCurrentA * BATTERY_VOLTAGE) / 1000;
}

function calcBatteryChargingPowerKw(capacityAh: number, batteryType: "lead_acid" | "lithium"): number {
  const chargeRate = batteryType === "lead_acid" ? 0.5 : 0.8;
  return (chargeRate * capacityAh * BATTERY_VOLTAGE) / 1000;
}

function classifyRisk(margin: number, warningThreshold = 0, criticalMargin = 0): "safe" | "warning" | "critical" {
  if (margin < criticalMargin) return "critical";
  if (margin < warningThreshold) return "warning";
  return "safe";
}

function calcPowerMargin(
  genPower: number,
  telecomLoad: number,
  ac1Power: number,
  ac2Power: number,
  batteryCharging: number,
  coolingConfig: "ac1_only" | "ac1_ac2" | "none",
  batteryState: "fully_charged" | "charging" | "discharging"
): number {
  let load = telecomLoad;
  if (coolingConfig === "ac1_only") load += ac1Power;
  else if (coolingConfig === "ac1_ac2") load += ac1Power + ac2Power;
  if (batteryState === "charging") load += batteryCharging;
  return genPower - load;
}

export function analyzeScenarios(site: SiteConfig): ScenarioResult[] {
  const telecomLoadKw = calcTelecomLoadKw(site.telecomLoadAmps);
  const telecomHeatBtu = calcTelecomHeatBtu(telecomLoadKw);

  const ac1NetBtu = calcNetCoolingCapacityBtu(site.ac1CapacityBtu, site.ac1Age);
  const ac1PowerKw = calcAcPowerKw(ac1NetBtu);

  const ac2NetBtu = site.ac2CapacityBtu ? calcNetCoolingCapacityBtu(site.ac2CapacityBtu, site.ac2Age ?? 0) : 0;
  const ac2PowerKw = site.ac2CapacityBtu ? calcAcPowerKw(ac2NetBtu) : 0;

  const batteryCharging = calcBatteryChargingPowerKw(site.batteryCapacityAh, site.batteryType);
  const batteryMaxPower = calcBatteryMaxPowerKw(site.batteryCapacityAh, site.batteryType);
  const batteryUsableWh = calcBatteryUsableCapacityWh(site.batteryCapacityAh, site.batteryType, site.batteryAge);
  const batteryBackupHours = batteryUsableWh / (telecomLoadKw * 1000);

  const primePower = calcGeneratorNetPower(site.generatorKva, site.generatorAge);
  const backupPower = site.backupGeneratorKva
    ? calcGeneratorNetPower(site.backupGeneratorKva, site.backupGeneratorAge ?? 0)
    : 0;

  const scenarios: Array<{
    id: number;
    name: string;
    powerSource: "prime" | "backup" | "outage";
    coolingConfig: "ac1_only" | "ac1_ac2" | "none";
    batteryState: "fully_charged" | "charging" | "discharging";
  }> = [
    { id: 1, name: "Prime Power / AC1 / Fully Charged", powerSource: "prime", coolingConfig: "ac1_only", batteryState: "fully_charged" },
    { id: 2, name: "Prime Power / AC1+AC2 / Fully Charged", powerSource: "prime", coolingConfig: "ac1_ac2", batteryState: "fully_charged" },
    { id: 3, name: "Prime Power / AC1 / Charging", powerSource: "prime", coolingConfig: "ac1_only", batteryState: "charging" },
    { id: 4, name: "Prime Power / AC1+AC2 / Charging", powerSource: "prime", coolingConfig: "ac1_ac2", batteryState: "charging" },
    { id: 5, name: "Backup Gen / AC1 / Fully Charged", powerSource: "backup", coolingConfig: "ac1_only", batteryState: "fully_charged" },
    { id: 6, name: "Backup Gen / AC1+AC2 / Fully Charged", powerSource: "backup", coolingConfig: "ac1_ac2", batteryState: "fully_charged" },
    { id: 7, name: "Backup Gen / AC1 / Charging", powerSource: "backup", coolingConfig: "ac1_only", batteryState: "charging" },
    { id: 8, name: "Backup Gen / AC1+AC2 / Charging", powerSource: "backup", coolingConfig: "ac1_ac2", batteryState: "charging" },
    { id: 9, name: "Power Outage / Battery Discharge", powerSource: "outage", coolingConfig: "none", batteryState: "discharging" },
  ];

  return scenarios.map((s) => {
    const genPower = s.powerSource === "prime" ? primePower : s.powerSource === "backup" ? backupPower : 0;

    const totalCoolingBtu =
      s.coolingConfig === "ac1_only" ? ac1NetBtu :
      s.coolingConfig === "ac1_ac2" ? ac1NetBtu + ac2NetBtu : 0;

    const acLoad = s.coolingConfig === "ac1_only" ? ac1PowerKw : s.coolingConfig === "ac1_ac2" ? ac1PowerKw + ac2PowerKw : 0;
    const chargeLoad = s.batteryState === "charging" ? batteryCharging : 0;
    const totalLoad = telecomLoadKw + acLoad + chargeLoad;

    let powerMargin = 0;
    let rectifierMargin = 0;
    let batteryMarginKw = 0;
    let coolingMarginBtu = 0;

    if (s.powerSource === "outage") {
      powerMargin = -totalLoad;
      rectifierMargin = site.rectifierCapacityKw - telecomLoadKw;
      batteryMarginKw = batteryMaxPower - telecomLoadKw;
      coolingMarginBtu = -telecomHeatBtu;
    } else {
      powerMargin = genPower - totalLoad;
      rectifierMargin = site.rectifierCapacityKw - telecomLoadKw - chargeLoad;
      batteryMarginKw = batteryMaxPower - telecomLoadKw;
      coolingMarginBtu = totalCoolingBtu - telecomHeatBtu;
    }

    const powerRisk: "safe" | "warning" | "critical" =
      s.powerSource === "outage" ? "critical" :
      powerMargin < 0 ? "critical" :
      powerMargin < 3 ? "warning" : "safe";

    const rectifierRisk: "safe" | "warning" | "critical" =
      rectifierMargin < 0 ? "critical" :
      rectifierMargin < 2 ? "warning" : "safe";

    const batteryRisk: "safe" | "warning" | "critical" =
      s.powerSource === "outage"
        ? (batteryMarginKw < 0 ? "critical" : batteryBackupHours < 2 ? "warning" : "safe")
        : (batteryBackupHours < 2 ? "warning" : "safe");

    const coolingRisk: "safe" | "warning" | "critical" =
      s.coolingConfig === "none" ? "critical" :
      coolingMarginBtu < 0 ? "critical" :
      coolingMarginBtu < 2000 ? "warning" : "safe";

    const riskMap = { safe: 0, warning: 1, critical: 2 };
    const riskScore = riskMap[powerRisk] + riskMap[rectifierRisk] + riskMap[batteryRisk] + riskMap[coolingRisk];

    return {
      scenarioId: s.id,
      scenarioName: s.name,
      powerSource: s.powerSource,
      coolingConfig: s.coolingConfig,
      batteryState: s.batteryState,
      generatorNetPowerKw: genPower,
      telecomLoadKw,
      telecomHeatBtu,
      ac1PowerKw,
      ac2PowerKw,
      totalCoolingCapacityBtu: totalCoolingBtu,
      batteryChargingPowerKw: batteryCharging,
      totalSiteLoadKw: totalLoad,
      powerMarginKw: powerMargin,
      rectifierMarginKw: rectifierMargin,
      batteryMaxPowerKw: batteryMaxPower,
      batteryMarginKw,
      coolingMarginBtu,
      batteryBackupTimeHours: batteryBackupHours,
      powerRisk,
      rectifierRisk,
      batteryRisk,
      coolingRisk,
      riskScore,
    };
  });
}

export function analyzeSite(site: SiteConfig): SiteAnalysis {
  const scenarios = analyzeScenarios(site);
  const worstRiskScore = Math.max(...scenarios.map((s) => s.riskScore));

  const normalScenarios = scenarios.filter((s) => s.powerSource !== "outage");
  const normalMaxRisk = Math.max(...normalScenarios.map((s) => s.riskScore));

  const hasCriticalNormal = normalScenarios.some(
    (s) => s.powerRisk === "critical" || s.coolingRisk === "critical" || s.rectifierRisk === "critical"
  );
  const hasWarningNormal = normalScenarios.some(
    (s) => s.powerRisk === "warning" || s.coolingRisk === "warning" || s.batteryRisk === "warning" || s.rectifierRisk === "warning"
  );

  const batteryBackupHours = scenarios[8].batteryBackupTimeHours;
  const batteryRiskFail = batteryBackupHours < 1;

  const overallRisk: "safe" | "warning" | "critical" =
    hasCriticalNormal || batteryRiskFail
      ? "critical"
      : hasWarningNormal || batteryBackupHours < 3
      ? "warning"
      : "safe";

  return {
    site,
    scenarios,
    overallRisk,
    worstRiskScore,
    technicianNeeded: overallRisk !== "safe",
  };
}

import type { SiteConfig } from "./calculations";

const LOCATIONS = {
  makkah: { lat: 21.3891, lng: 39.8579 },
  haram: { lat: 21.4225, lng: 39.8262 },
  mina: { lat: 21.4133, lng: 39.8931 },
  muzdalifah: { lat: 21.3766, lng: 39.9341 },
  arafat: { lat: 21.3547, lng: 39.9841 },
  jeddah_port: { lat: 21.5433, lng: 39.1728 },
  highway: { lat: 21.48, lng: 39.65 },
};

function spread(base: { lat: number; lng: number }, index: number, count: number, radius = 0.03) {
  const angle = (2 * Math.PI * index) / count;
  const r = radius * (0.3 + 0.7 * Math.random());
  return {
    lat: base.lat + r * Math.cos(angle),
    lng: base.lng + r * Math.sin(angle),
  };
}

function rng(seed: number, min: number, max: number): number {
  const x = Math.sin(seed) * 10000;
  const t = x - Math.floor(x);
  return min + t * (max - min);
}

function pick<T>(arr: T[], seed: number): T {
  const x = Math.sin(seed * 7.7) * 10000;
  const t = x - Math.floor(x);
  return arr[Math.floor(t * arr.length)];
}

const locationGroups: Array<{ key: keyof typeof LOCATIONS; label: string; count: number }> = [
  { key: "makkah", label: "Makkah", count: 18 },
  { key: "haram", label: "Masjid al-Haram", count: 12 },
  { key: "mina", label: "Mina", count: 20 },
  { key: "muzdalifah", label: "Muzdalifah", count: 12 },
  { key: "arafat", label: "Arafat", count: 16 },
  { key: "jeddah_port", label: "Jeddah Islamic Port", count: 8 },
  { key: "highway", label: "Jeddah-Makkah Highway", count: 8 },
];

export function generateSites(): SiteConfig[] {
  const sites: SiteConfig[] = [];
  let globalIdx = 0;

  for (const group of locationGroups) {
    const base = LOCATIONS[group.key];
    for (let i = 0; i < group.count; i++) {
      const seed = globalIdx * 13 + i * 7;
      const pos = spread(base, i, group.count, 0.025);
      const siteType: "shelter" | "outdoor_cabinet" = rng(seed, 0, 1) > 0.45 ? "shelter" : "outdoor_cabinet";
      const powerConfig: "single_generator" | "commercial_with_backup" =
        rng(seed + 1, 0, 1) > 0.4 ? "single_generator" : "commercial_with_backup";
      const batteryType: "lead_acid" | "lithium" = rng(seed + 2, 0, 1) > 0.5 ? "lead_acid" : "lithium";

      const genKva = pick([30, 50, 75, 100, 125], seed + 3);
      const genAge = Math.floor(rng(seed + 4, 0, 8));
      const telecomAmps = Math.floor(rng(seed + 5, 30, 120));
      const ac1Btu = pick([24000, 36000, 48000, 60000, 72000], seed + 6);
      const ac1Age = Math.floor(rng(seed + 7, 0, 4));
      const battAh = pick([150, 200, 300, 500, 700], seed + 8);
      const battAge = Math.floor(rng(seed + 9, 0, 5));
      const rectKw = pick([5, 10, 15, 20, 25], seed + 10);

      const site: SiteConfig = {
        id: `COW-${String(globalIdx + 1).padStart(3, "0")}`,
        name: `${group.label} Site ${i + 1}`,
        location: group.label,
        lat: parseFloat(pos.lat.toFixed(5)),
        lng: parseFloat(pos.lng.toFixed(5)),
        siteType,
        powerConfig,
        generatorKva: genKva,
        generatorAge: genAge,
        telecomLoadAmps: telecomAmps,
        ac1CapacityBtu: ac1Btu,
        ac1Age,
        batteryCapacityAh: battAh,
        batteryType,
        batteryAge: battAge,
        rectifierCapacityKw: rectKw,
      };

      if (siteType === "shelter") {
        site.ac2CapacityBtu = pick([24000, 36000, 48000], seed + 11);
        site.ac2Age = Math.floor(rng(seed + 12, 0, 4));
      }

      if (powerConfig === "commercial_with_backup") {
        site.backupGeneratorKva = pick([30, 50, 75], seed + 13);
        site.backupGeneratorAge = Math.floor(rng(seed + 14, 0, 5));
      }

      sites.push(site);
      globalIdx++;
    }
  }

  return sites;
}

export const ALL_SITES: SiteConfig[] = generateSites();

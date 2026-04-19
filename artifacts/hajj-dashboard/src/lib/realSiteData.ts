import type { SiteConfig } from "./calculations";

// Real Hajj 1447 COW site list with actual GPS coordinates
const RAW_SITES: Array<{ id: string; area: string; lat: number | null; lng: number | null }> = [
  { id: "CWN955", area: "Muzdalifah",     lat: 21.389818,   lng: 39.897434  },
  { id: "CWN996", area: "Arafat",         lat: 21.374231,   lng: 39.980616  },
  { id: "CWN092", area: "Arafat",         lat: 21.333244,   lng: 39.971526  },
  { id: "CWN099", area: "Muzdalifah",     lat: 21.369688,   lng: 39.901264  },
  { id: "CWN208", area: "Muzdalifah",     lat: 21.400017,   lng: 39.91508   },
  { id: "CWN022", area: "Arafat",         lat: 21.337105,   lng: 39.989527  },
  { id: "CWN213", area: "Muzdalifah",     lat: 21.3645,     lng: 39.9082    },
  { id: "CWN970", area: "Mina",           lat: 21.409075,   lng: 39.905872  },
  { id: "CWN062", area: "Muzdalifah",     lat: 21.3818,     lng: 39.89885   },
  { id: "CWN080", area: "Arafat",         lat: 21.378152,   lng: 39.990098  },
  { id: "CWN907", area: "Muzdalifah",     lat: 21.4011089,  lng: 39.9086724 },
  { id: "CWN960", area: "Arafat",         lat: 21.347135,   lng: 39.992573  },
  { id: "CWN101", area: "Muzdalifah",     lat: 21.388356,   lng: 39.927744  },
  { id: "CWN915", area: "Muzdalifah",     lat: 21.383061,   lng: 39.925555  },
  { id: "CWN984", area: "Arafat",         lat: 21.348754,   lng: 39.995701  },
  { id: "CWN997", area: "Muzdalifah",     lat: 21.38314,    lng: 39.904478  },
  { id: "CWN076", area: "Arafat",         lat: 21.3692,     lng: 39.977127  },
  { id: "CWH318", area: "Muzdalifah",     lat: 21.3813332,  lng: 39.9025838 },
  { id: "CWN922", area: "Muzdalifah",     lat: 21.404058,   lng: 39.916064  },
  { id: "CWN073", area: "Arafat",         lat: 21.3738433,  lng: 39.9865483 },
  { id: "CWN038", area: "Arafat",         lat: 21.328514,   lng: 39.961343  },
  { id: "CWN300", area: "Muzdalifah",     lat: 21.386604,   lng: 39.897081  },
  { id: "CWN923", area: "Arafat",         lat: 21.361257,   lng: 39.973944  },
  { id: "CWN959", area: "Mina",           lat: 21.417782,   lng: 39.910356  },
  { id: "CWN992", area: "Muzdalifah",     lat: 21.389249,   lng: 39.906895  },
  { id: "CWN072", area: "Arafat",         lat: 21.34196,    lng: 39.97602   },
  { id: "CWN206", area: "Muzdalifah",     lat: 21.390274,   lng: 39.928265  },
  { id: "CWN205", area: "Muzdalifah",     lat: 21.396241,   lng: 39.914628  },
  { id: "CWN901", area: "Arafat",         lat: 21.372652,   lng: 39.989533  },
  { id: "CWN961", area: "Mina",           lat: 21.398381,   lng: 39.89731   },
  { id: "CWN967", area: "Makkah Remote",  lat: 21.631015,   lng: 40.427249  },
  { id: "CWN998", area: "Makkah Remote",  lat: 21.647214,   lng: 40.389186  },
  { id: "CWN020", area: "Arafat",         lat: 21.35047,    lng: 39.96813   },
  { id: "CWN036", area: "Arafat",         lat: 21.37989,    lng: 39.944133  },
  { id: "CWN085", area: "Arafat",         lat: 21.36681,    lng: 39.96439   },
  { id: "CWN084", area: "Arafat",         lat: 21.342528,   lng: 39.962167  },
  { id: "CWN087", area: "Arafat",         lat: 21.35694,    lng: 39.97782   },
  { id: "CWN075", area: "Arafat",         lat: 21.346996,   lng: 39.957369  },
  { id: "CWN002", area: "Mina",           lat: 21.42045,    lng: 39.87142   },
  { id: "CWN004", area: "Muzdalifah",     lat: 21.387678,   lng: 39.896187  },
  { id: "CWN015", area: "Arafat",         lat: 21.377645,   lng: 39.986816  },
  { id: "CWN068", area: "Muzdalifah",     lat: 21.39217,    lng: 39.91244   },
  { id: "CWN074", area: "Muzdalifah",     lat: 21.388397,   lng: 39.90236   },
  { id: "CWN078", area: "Arafat",         lat: 21.34051,    lng: 39.99548   },
  { id: "CWN083", area: "Arafat",         lat: 21.331372,   lng: 39.965547  },
  { id: "CWN089", area: "Muzdalifah",     lat: 21.384184,   lng: 39.910808  },
  { id: "CWN201", area: "Mina",           lat: 21.4206848,  lng: 39.8809927 },
  { id: "CWN202", area: "Muzdalifah",     lat: 21.397049,   lng: 39.903512  },
  { id: "CWN203", area: "Arafat",         lat: 21.354658,   lng: 39.986218  },
  { id: "CWN212", area: "Arafat",         lat: 21.366124,   lng: 39.984126  },
  { id: "CWN214", area: "Muzdalifah",     lat: 21.39194,    lng: 39.903738  },
  { id: "CWN301", area: "Muzdalifah",     lat: 21.386942,   lng: 39.89955   },
  { id: "CWN777", area: "Mina",           lat: 21.395908,   lng: 39.899677  },
  { id: "CWN903", area: "Arafat",         lat: 21.359944,   lng: 39.947977  },
  { id: "CWN906", area: "Arafat",         lat: 21.37625,    lng: 39.98233   },
  { id: "CWN914", area: "Arafat",         lat: 21.365421,   lng: 39.971661  },
  { id: "CWN951", area: "Arafat",         lat: 21.36258,    lng: 39.96906   },
  { id: "CWN953", area: "Mina",           lat: 21.418835,   lng: 39.892713  },
  { id: "CWN956", area: "Arafat",         lat: 21.3704107,  lng: 39.9854222 },
  { id: "CWN976", area: "Mina",           lat: 21.40275,    lng: 39.89751   },
  { id: "CWN978", area: "Mina",           lat: 21.421776,   lng: 39.891894  },
  { id: "CWN980", area: "Arafat",         lat: 21.371837,   lng: 39.985979  },
  { id: "CWN991", area: "Arafat",         lat: 21.37224,    lng: 39.93826   },
  { id: "CWN994", area: "Mina",           lat: 21.42346,    lng: 39.89534   },
  { id: "CWN050", area: "Arafat",         lat: 21.38536,    lng: 40.00519   },
  { id: "CWN079", area: "Muzdalifah",     lat: 21.3615,     lng: 39.9179    },
  { id: "CWN093", area: "Arafat",         lat: 21.3568,     lng: 39.93535   },
  { id: "CWN001", area: "Arafat",         lat: 21.33728,    lng: 39.957769  },
  { id: "CWN108", area: "Arafat",         lat: 21.34916,    lng: 39.98367   },
  { id: "CWN008", area: "Arafat",         lat: 21.3513851,  lng: 39.9812917 },
  { id: "CWN032", area: "Muzdalifah",     lat: 21.3599709,  lng: 39.9122733 },
  { id: "CWN972", area: "Muzdalifah",     lat: 21.360682,   lng: 39.916155  },
  { id: "CWN211", area: "Muzdalifah",     lat: 21.386633,   lng: 39.911309  },
  { id: "CWN104", area: "Muzdalifah",     lat: 21.376644,   lng: 39.918992  },
  { id: "CWN021", area: "Muzdalifah",     lat: 21.3934192,  lng: 39.9166466 },
  { id: "CWN066", area: "Muzdalifah",     lat: 21.3905912,  lng: 39.9199632 },
  { id: "CWN105", area: "Arafat",         lat: null,        lng: null       },
  { id: "CWN081", area: "Makkah Remote",  lat: 20.99354,    lng: 39.58815   },
  { id: "CWN102", area: "Arafat",         lat: null,        lng: null       },
];

function rng(seed: number, min: number, max: number): number {
  const x = Math.sin(seed * 9301 + 49297) * 233280;
  const t = x - Math.floor(x);
  return min + t * (max - min);
}

function pick<T>(arr: T[], seed: number): T {
  const x = Math.sin(seed * 7.7) * 10000;
  const t = x - Math.floor(x);
  return arr[Math.floor(t * arr.length)];
}

export function buildRealSites(): SiteConfig[] {
  return RAW_SITES.filter(r => r.lat !== null && r.lng !== null).map((r, i) => {
    const seed = i * 17 + r.id.charCodeAt(3);
    const siteType: "shelter" | "outdoor_cabinet" = rng(seed, 0, 1) > 0.45 ? "shelter" : "outdoor_cabinet";
    const powerConfig: "single_generator" | "commercial_with_backup" =
      rng(seed + 1, 0, 1) > 0.4 ? "single_generator" : "commercial_with_backup";
    const batteryType: "lead_acid" | "lithium" = rng(seed + 2, 0, 1) > 0.5 ? "lead_acid" : "lithium";

    const site: SiteConfig = {
      id: r.id,
      name: `${r.area} — ${r.id}`,
      location: r.area,
      lat: r.lat!,
      lng: r.lng!,
      siteType,
      powerConfig,
      generatorKva: pick([30, 50, 75, 100, 125], seed + 3),
      generatorAge: Math.floor(rng(seed + 4, 0, 8)),
      telecomLoadAmps: Math.floor(rng(seed + 5, 30, 120)),
      ac1CapacityBtu: pick([24000, 36000, 48000, 60000, 72000], seed + 6),
      ac1Age: Math.floor(rng(seed + 7, 0, 4)),
      batteryCapacityAh: pick([150, 200, 300, 500, 700], seed + 8),
      batteryType,
      batteryAge: Math.floor(rng(seed + 9, 0, 5)),
      rectifierCapacityKw: pick([5, 10, 15, 20, 25], seed + 10),
    };

    if (siteType === "shelter") {
      site.ac2CapacityBtu = pick([24000, 36000, 48000], seed + 11);
      site.ac2Age = Math.floor(rng(seed + 12, 0, 4));
    }

    if (powerConfig === "commercial_with_backup") {
      site.backupGeneratorKva = pick([30, 50, 75], seed + 13);
      site.backupGeneratorAge = Math.floor(rng(seed + 14, 0, 5));
    }

    // Mark as placeholder safe until real data is uploaded
    site.placeholderSafe = true;

    return site;
  });
}

// Sites without coordinates (kept for reference)
export const SITES_WITHOUT_COORDS = RAW_SITES.filter(r => r.lat === null);

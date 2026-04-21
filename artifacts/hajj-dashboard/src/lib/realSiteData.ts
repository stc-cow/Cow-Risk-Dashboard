import type { SiteConfig } from "./calculations";

// ─── Real Hajj 1447 COW Data ───────────────────────────────────────────────
// Power Source codes:
//   SG = Single Generator (prime power only)
//   SB = SEC (grid) + Backup Generator
//   generatorKva for SB = SEC_Amps × 0.5  (gives correct calcGeneratorNetPower output)
//   generatorAge for SB = 0 (grid never degrades)
// Battery capacity = Ah_per_string × number_of_strings
// telecomLoadAmps = telecomLoadKw × 1000 / 48
// ───────────────────────────────────────────────────────────────────────────

export function buildRealSites(): SiteConfig[] {
  return [
    // ── SHELTER SITES ──────────────────────────────────────────────────────

    // CWN105  SB  Shelter  Arafat  SEC=150A  backupGen=30KVA@0h
    {
      id: "CWN105", name: "Arafat — CWN105", location: "Arafat",
      lat: 21.35622, lng: 39.98477,
      siteType: "shelter", powerConfig: "commercial_with_backup",
      generatorKva: 75,       // SEC 150A × 0.5
      generatorAge: 0,        // grid
      backupGeneratorKva: 30, backupGeneratorAge: 0,
      rectifierCapacityKw: 18,
      ac1CapacityBtu: 36000, ac1Age: 0,
      ac2CapacityBtu: 36000, ac2Age: 0,
      batteryCapacityAh: 600,  // 200Ah × 3 strings
      batteryType: "lead_acid", batteryAge: 0,
      telecomLoadAmps: 175,    // 8.4KW × 1000/48
    },

    // CWN923  SG  Shelter  Arafat  gen=30KVA@3110h≈0yr
    {
      id: "CWN923", name: "Arafat — CWN923", location: "Arafat",
      lat: 21.361257, lng: 39.973944,
      siteType: "shelter", powerConfig: "single_generator",
      generatorKva: 30, generatorAge: 0,
      rectifierCapacityKw: 19.2,
      ac1CapacityBtu: 36000, ac1Age: 0,
      ac2CapacityBtu: 36000, ac2Age: 0,
      batteryCapacityAh: 950,  // 190Ah × 5 strings
      batteryType: "lead_acid", batteryAge: 0,
      telecomLoadAmps: 219,    // 10.5KW × 1000/48
    },

    // CWN991  SB  Shelter  Arafat  SEC=100A  backupGen=30KVA@15578h≈1yr
    {
      id: "CWN991", name: "Arafat — CWN991", location: "Arafat",
      lat: 21.37224, lng: 39.93826,
      siteType: "shelter", powerConfig: "commercial_with_backup",
      generatorKva: 50, generatorAge: 0,
      backupGeneratorKva: 30, backupGeneratorAge: 1,
      rectifierCapacityKw: 19.2,
      ac1CapacityBtu: 48000, ac1Age: 0,
      ac2CapacityBtu: 48000, ac2Age: 0,
      batteryCapacityAh: 800,  // 200Ah × 4 strings
      batteryType: "lead_acid", batteryAge: 0,
      telecomLoadAmps: 175,
    },

    // CWN092  SG  Shelter  Arafat  gen=30KVA@25098h≈2yr  telecom=0
    {
      id: "CWN092", name: "Arafat — CWN092", location: "Arafat",
      lat: 21.333244, lng: 39.971526,
      siteType: "shelter", powerConfig: "single_generator",
      generatorKva: 30, generatorAge: 2,
      rectifierCapacityKw: 16,
      ac1CapacityBtu: 36000, ac1Age: 0,
      ac2CapacityBtu: 36000, ac2Age: 0,
      batteryCapacityAh: 400,  // 200Ah × 2 strings
      batteryType: "lead_acid", batteryAge: 0,
      telecomLoadAmps: 0,
    },

    // CWN076  SG  Shelter  Arafat  gen=30KVA@18324h≈2yr
    {
      id: "CWN076", name: "Arafat — CWN076", location: "Arafat",
      lat: 21.3692, lng: 39.977127,
      siteType: "shelter", powerConfig: "single_generator",
      generatorKva: 30, generatorAge: 2,
      rectifierCapacityKw: 15,
      ac1CapacityBtu: 36000, ac1Age: 0,
      ac2CapacityBtu: 36000, ac2Age: 0,
      batteryCapacityAh: 1400, // 200Ah × 7 strings
      batteryType: "lead_acid", batteryAge: 0,
      telecomLoadAmps: 175,
    },

    // CWN108  SB  Shelter  Arafat  SEC=100A  backupGen=30KVA@42885h≈4yr
    {
      id: "CWN108", name: "Arafat — CWN108", location: "Arafat",
      lat: 21.34916, lng: 39.98367,
      siteType: "shelter", powerConfig: "commercial_with_backup",
      generatorKva: 50, generatorAge: 0,
      backupGeneratorKva: 30, backupGeneratorAge: 4,
      rectifierCapacityKw: 18,
      ac1CapacityBtu: 36000, ac1Age: 0,
      ac2CapacityBtu: 36000, ac2Age: 0,
      batteryCapacityAh: 600,  // 200Ah × 3 strings
      batteryType: "lead_acid", batteryAge: 0,
      telecomLoadAmps: 175,
    },

    // CWN087  SB  Shelter  Arafat  SEC=70A  backupGen=35KVA@0h
    {
      id: "CWN087", name: "Arafat — CWN087", location: "Arafat",
      lat: 21.35694, lng: 39.97782,
      siteType: "shelter", powerConfig: "commercial_with_backup",
      generatorKva: 35, generatorAge: 0,
      backupGeneratorKva: 35, backupGeneratorAge: 0,
      rectifierCapacityKw: 21,
      ac1CapacityBtu: 36000, ac1Age: 0,
      ac2CapacityBtu: 36000, ac2Age: 0,
      batteryCapacityAh: 760,  // 190Ah × 4 strings
      batteryType: "lead_acid", batteryAge: 0,
      telecomLoadAmps: 175,
    },

    // CWN075  SB  Shelter  Arafat  SEC=100A  backupGen=35KVA@1798h≈0yr
    {
      id: "CWN075", name: "Arafat — CWN075", location: "Arafat",
      lat: 21.346996, lng: 39.957369,
      siteType: "shelter", powerConfig: "commercial_with_backup",
      generatorKva: 50, generatorAge: 0,
      backupGeneratorKva: 35, backupGeneratorAge: 0,
      rectifierCapacityKw: 21.6,
      ac1CapacityBtu: 36000, ac1Age: 0,
      ac2CapacityBtu: 36000, ac2Age: 0,
      batteryCapacityAh: 800,
      batteryType: "lead_acid", batteryAge: 0,
      telecomLoadAmps: 175,
    },

    // CWN072  SB  Shelter  Arafat  SEC=100A  backupGen=25KVA@0h
    {
      id: "CWN072", name: "Arafat — CWN072", location: "Arafat",
      lat: 21.34196, lng: 39.97602,
      siteType: "shelter", powerConfig: "commercial_with_backup",
      generatorKva: 50, generatorAge: 0,
      backupGeneratorKva: 25, backupGeneratorAge: 0,
      rectifierCapacityKw: 21.6,
      ac1CapacityBtu: 36000, ac1Age: 0,
      ac2CapacityBtu: 36000, ac2Age: 0,
      batteryCapacityAh: 1475, // 295Ah × 5 strings
      batteryType: "lead_acid", batteryAge: 0,
      telecomLoadAmps: 175,
    },

    // CWN078  SB  Shelter  Arafat  SEC=100A  backupGen=35KVA@0h
    {
      id: "CWN078", name: "Arafat — CWN078", location: "Arafat",
      lat: 21.34051, lng: 39.99548,
      siteType: "shelter", powerConfig: "commercial_with_backup",
      generatorKva: 50, generatorAge: 0,
      backupGeneratorKva: 35, backupGeneratorAge: 0,
      rectifierCapacityKw: 16.2,
      ac1CapacityBtu: 36000, ac1Age: 0,
      ac2CapacityBtu: 36000, ac2Age: 0,
      batteryCapacityAh: 800,
      batteryType: "lead_acid", batteryAge: 0,
      telecomLoadAmps: 175,
    },

    // CWN080  SG  Shelter  Arafat  gen=35KVA@22058h≈2yr  telecom=0
    {
      id: "CWN080", name: "Arafat — CWN080", location: "Arafat",
      lat: 21.378152, lng: 39.990098,
      siteType: "shelter", powerConfig: "single_generator",
      generatorKva: 35, generatorAge: 2,
      rectifierCapacityKw: 21.6,
      ac1CapacityBtu: 36000, ac1Age: 0,
      ac2CapacityBtu: 36000, ac2Age: 0,
      batteryCapacityAh: 760,
      batteryType: "lead_acid", batteryAge: 0,
      telecomLoadAmps: 0,
    },

    // CWN084  SB  Shelter  Arafat  SEC=100A  backupGen=35KVA@0h
    {
      id: "CWN084", name: "Arafat — CWN084", location: "Arafat",
      lat: 21.342528, lng: 39.962167,
      siteType: "shelter", powerConfig: "commercial_with_backup",
      generatorKva: 50, generatorAge: 0,
      backupGeneratorKva: 35, backupGeneratorAge: 0,
      rectifierCapacityKw: 18.9,
      ac1CapacityBtu: 36000, ac1Age: 0,
      ac2CapacityBtu: 36000, ac2Age: 0,
      batteryCapacityAh: 800,
      batteryType: "lead_acid", batteryAge: 0,
      telecomLoadAmps: 219,    // 10.5KW
    },

    // CWN085  SB  Shelter  Arafat  SEC=100A  backupGen=35KVA@0h
    {
      id: "CWN085", name: "Arafat — CWN085", location: "Arafat",
      lat: 21.36681, lng: 39.96439,
      siteType: "shelter", powerConfig: "commercial_with_backup",
      generatorKva: 50, generatorAge: 0,
      backupGeneratorKva: 35, backupGeneratorAge: 0,
      rectifierCapacityKw: 18,
      ac1CapacityBtu: 36000, ac1Age: 0,
      ac2CapacityBtu: 36000, ac2Age: 0,
      batteryCapacityAh: 760,
      batteryType: "lead_acid", batteryAge: 0,
      telecomLoadAmps: 175,
    },

    // CWN073  SB  Shelter  Arafat  SEC=100A  backupGen=45KVA@0h
    {
      id: "CWN073", name: "Arafat — CWN073", location: "Arafat",
      lat: 21.3738433, lng: 39.9865483,
      siteType: "shelter", powerConfig: "commercial_with_backup",
      generatorKva: 50, generatorAge: 0,
      backupGeneratorKva: 45, backupGeneratorAge: 0,
      rectifierCapacityKw: 21.6,
      ac1CapacityBtu: 36000, ac1Age: 0,
      ac2CapacityBtu: 36000, ac2Age: 0,
      batteryCapacityAh: 800,
      batteryType: "lead_acid", batteryAge: 0,
      telecomLoadAmps: 248,    // 11.9KW
    },

    // CWN093  SB  Shelter  Arafat  SEC=200A  backupGen=45KVA@31766h≈3yr
    {
      id: "CWN093", name: "Arafat — CWN093", location: "Arafat",
      lat: 21.3568, lng: 39.93535,
      siteType: "shelter", powerConfig: "commercial_with_backup",
      generatorKva: 100, generatorAge: 0,
      backupGeneratorKva: 45, backupGeneratorAge: 3,
      rectifierCapacityKw: 21,
      ac1CapacityBtu: 36000, ac1Age: 0,
      ac2CapacityBtu: 36000, ac2Age: 0,
      batteryCapacityAh: 1600, // 200Ah × 8 strings
      batteryType: "lead_acid", batteryAge: 0,
      telecomLoadAmps: 219,
    },

    // CWN038  SG  Shelter  Arafat  gen=30KVA@1525h≈0yr  telecom=0
    {
      id: "CWN038", name: "Arafat — CWN038", location: "Arafat",
      lat: 21.328514, lng: 39.961343,
      siteType: "shelter", powerConfig: "single_generator",
      generatorKva: 30, generatorAge: 0,
      rectifierCapacityKw: 12.8,
      ac1CapacityBtu: 48000, ac1Age: 0,
      ac2CapacityBtu: 48000, ac2Age: 0,
      batteryCapacityAh: 1400,
      batteryType: "lead_acid", batteryAge: 0,
      telecomLoadAmps: 0,
    },

    // CWN083  SG  Shelter  Arafat  gen=35KVA@6125h≈0yr
    {
      id: "CWN083", name: "Arafat — CWN083", location: "Arafat",
      lat: 21.331372, lng: 39.965547,
      siteType: "shelter", powerConfig: "single_generator",
      generatorKva: 35, generatorAge: 0,
      rectifierCapacityKw: 18,
      ac1CapacityBtu: 36000, ac1Age: 0,
      ac2CapacityBtu: 36000, ac2Age: 0,
      batteryCapacityAh: 600,
      batteryType: "lead_acid", batteryAge: 0,
      telecomLoadAmps: 175,
    },

    // CWN908  PowerSource=0  Shelter  Arafat  all zeros (pending data)
    {
      id: "CWN908", name: "Arafat — CWN908", location: "Arafat",
      lat: 21.365285, lng: 39.95051,
      siteType: "shelter", powerConfig: "single_generator",
      generatorKva: 0, generatorAge: 0,
      rectifierCapacityKw: 0,
      ac1CapacityBtu: 0, ac1Age: 0,
      batteryCapacityAh: 0,
      batteryType: "lead_acid", batteryAge: 0,
      telecomLoadAmps: 0,
      placeholderSafe: true,   // no data yet
    },

    // CWN102  SB  Shelter  Arafat  SEC=100A  backupGen=45KVA@11794h≈1yr
    {
      id: "CWN102", name: "Arafat — CWN102", location: "Arafat",
      lat: 21.35901, lng: 39.95689,
      siteType: "shelter", powerConfig: "commercial_with_backup",
      generatorKva: 50, generatorAge: 0,
      backupGeneratorKva: 45, backupGeneratorAge: 1,
      rectifierCapacityKw: 19.2,
      ac1CapacityBtu: 36000, ac1Age: 0,
      ac2CapacityBtu: 36000, ac2Age: 0,
      batteryCapacityAh: 1600, // 200Ah × 8 strings
      batteryType: "lead_acid", batteryAge: 0,
      telecomLoadAmps: 219,
    },

    // ── OUTDOOR CABINET SITES ──────────────────────────────────────────────

    // CWN206  SG  Outdoor  Muzdalifah  gen=30KVA@32553h≈3yr  telecom=0
    {
      id: "CWN206", name: "Muzdalifah — CWN206", location: "Muzdalifah",
      lat: 21.390274, lng: 39.928265,
      siteType: "outdoor_cabinet", powerConfig: "single_generator",
      generatorKva: 30, generatorAge: 3,
      rectifierCapacityKw: 24,
      ac1CapacityBtu: 10200, ac1Age: 0,
      batteryCapacityAh: 800,
      batteryType: "lead_acid", batteryAge: 0,
      telecomLoadAmps: 0,
    },

    // CWN956  SB  Outdoor  Arafat  SEC=100A  backupGen=30KVA@0h
    {
      id: "CWN956", name: "Arafat — CWN956", location: "Arafat",
      lat: 21.3704107, lng: 39.9854222,
      siteType: "outdoor_cabinet", powerConfig: "commercial_with_backup",
      generatorKva: 50, generatorAge: 0,
      backupGeneratorKva: 30, backupGeneratorAge: 0,
      rectifierCapacityKw: 15,
      ac1CapacityBtu: 10200, ac1Age: 0,
      batteryCapacityAh: 800,
      batteryType: "lead_acid", batteryAge: 0,
      telecomLoadAmps: 220,    // 10.56KW
    },

    // CWN980  SB  Outdoor  Arafat  SEC=100A  backupGen=30KVA@0h
    {
      id: "CWN980", name: "Arafat — CWN980", location: "Arafat",
      lat: 21.371837, lng: 39.985979,
      siteType: "outdoor_cabinet", powerConfig: "commercial_with_backup",
      generatorKva: 50, generatorAge: 0,
      backupGeneratorKva: 30, backupGeneratorAge: 0,
      rectifierCapacityKw: 18,
      ac1CapacityBtu: 10200, ac1Age: 0,
      batteryCapacityAh: 800,
      batteryType: "lead_acid", batteryAge: 0,
      telecomLoadAmps: 220,
    },

    // CWN951  SB  Outdoor  Arafat  SEC=100A  backupGen=30KVA@0h
    {
      id: "CWN951", name: "Arafat — CWN951", location: "Arafat",
      lat: 21.36258, lng: 39.96906,
      siteType: "outdoor_cabinet", powerConfig: "commercial_with_backup",
      generatorKva: 50, generatorAge: 0,
      backupGeneratorKva: 30, backupGeneratorAge: 0,
      rectifierCapacityKw: 15,
      ac1CapacityBtu: 10200, ac1Age: 0,
      batteryCapacityAh: 800,
      batteryType: "lead_acid", batteryAge: 0,
      telecomLoadAmps: 220,
    },

    // CWN020  SB  Outdoor  Arafat  SEC=100A  backupGen=35KVA@2350h≈0yr
    {
      id: "CWN020", name: "Arafat — CWN020", location: "Arafat",
      lat: 21.35047, lng: 39.96813,
      siteType: "outdoor_cabinet", powerConfig: "commercial_with_backup",
      generatorKva: 50, generatorAge: 0,
      backupGeneratorKva: 35, backupGeneratorAge: 0,
      rectifierCapacityKw: 24,
      ac1CapacityBtu: 10200, ac1Age: 0,
      batteryCapacityAh: 800,
      batteryType: "lead_acid", batteryAge: 0,
      telecomLoadAmps: 275,    // 13.2KW
    },

    // CWN901  SG  Outdoor  Arafat  gen=30KVA@12495h≈1yr  telecom=0
    {
      id: "CWN901", name: "Arafat — CWN901", location: "Arafat",
      lat: 21.372652, lng: 39.989533,
      siteType: "outdoor_cabinet", powerConfig: "single_generator",
      generatorKva: 30, generatorAge: 1,
      rectifierCapacityKw: 18,
      ac1CapacityBtu: 10200, ac1Age: 0,
      batteryCapacityAh: 800,
      batteryType: "lead_acid", batteryAge: 0,
      telecomLoadAmps: 0,
    },

    // CWN203  SB  Outdoor  Arafat  SEC=100A  backupGen=35KVA@0h
    {
      id: "CWN203", name: "Arafat — CWN203", location: "Arafat",
      lat: 21.354658, lng: 39.986218,
      siteType: "outdoor_cabinet", powerConfig: "commercial_with_backup",
      generatorKva: 50, generatorAge: 0,
      backupGeneratorKva: 35, backupGeneratorAge: 0,
      rectifierCapacityKw: 24,
      ac1CapacityBtu: 10200, ac1Age: 0,
      batteryCapacityAh: 800,
      batteryType: "lead_acid", batteryAge: 0,
      telecomLoadAmps: 312,    // 14.96KW
    },

    // CWN914  SB  Outdoor  Arafat  SEC=100A  backupGen=30KVA@0h
    {
      id: "CWN914", name: "Arafat — CWN914", location: "Arafat",
      lat: 21.365421, lng: 39.971661,
      siteType: "outdoor_cabinet", powerConfig: "commercial_with_backup",
      generatorKva: 50, generatorAge: 0,
      backupGeneratorKva: 30, backupGeneratorAge: 0,
      rectifierCapacityKw: 18,
      ac1CapacityBtu: 10200, ac1Age: 0,
      batteryCapacityAh: 800,
      batteryType: "lead_acid", batteryAge: 0,
      telecomLoadAmps: 220,
    },

    // CWN015  SB  Outdoor  Arafat  SEC=100A  backupGen=30KVA@0h
    {
      id: "CWN015", name: "Arafat — CWN015", location: "Arafat",
      lat: 21.377645, lng: 39.986816,
      siteType: "outdoor_cabinet", powerConfig: "commercial_with_backup",
      generatorKva: 50, generatorAge: 0,
      backupGeneratorKva: 30, backupGeneratorAge: 0,
      rectifierCapacityKw: 18,
      ac1CapacityBtu: 10200, ac1Age: 0,
      batteryCapacityAh: 800,
      batteryType: "lead_acid", batteryAge: 0,
      telecomLoadAmps: 220,
    },

    // CWN212  SB  Outdoor  Arafat  SEC=100A  backupGen=35KVA@0h
    {
      id: "CWN212", name: "Arafat — CWN212", location: "Arafat",
      lat: 21.366124, lng: 39.984126,
      siteType: "outdoor_cabinet", powerConfig: "commercial_with_backup",
      generatorKva: 50, generatorAge: 0,
      backupGeneratorKva: 35, backupGeneratorAge: 0,
      rectifierCapacityKw: 21,
      ac1CapacityBtu: 10200, ac1Age: 0,
      batteryCapacityAh: 800,
      batteryType: "lead_acid", batteryAge: 0,
      telecomLoadAmps: 275,
    },

    // CWN992  SB  Outdoor  Muzdalifah  SEC=60A  backupGen=30KVA@0h
    {
      id: "CWN992", name: "Muzdalifah — CWN992", location: "Muzdalifah",
      lat: 21.389249, lng: 39.906895,
      siteType: "outdoor_cabinet", powerConfig: "commercial_with_backup",
      generatorKva: 30, generatorAge: 0,  // 60A × 0.5
      backupGeneratorKva: 30, backupGeneratorAge: 0,
      rectifierCapacityKw: 15,
      ac1CapacityBtu: 10200, ac1Age: 0,
      batteryCapacityAh: 760,  // 190Ah × 4 strings
      batteryType: "lead_acid", batteryAge: 0,
      telecomLoadAmps: 220,
    },

    // CWN205  SG  Outdoor  Muzdalifah  gen=30KVA@3492h≈0yr  telecom=0
    {
      id: "CWN205", name: "Muzdalifah — CWN205", location: "Muzdalifah",
      lat: 21.396241, lng: 39.914628,
      siteType: "outdoor_cabinet", powerConfig: "single_generator",
      generatorKva: 30, generatorAge: 0,
      rectifierCapacityKw: 24,
      ac1CapacityBtu: 10200, ac1Age: 0,
      batteryCapacityAh: 800,
      batteryType: "lead_acid", batteryAge: 0,
      telecomLoadAmps: 0,
    },

    // CWN960  SB  Outdoor  Arafat  SEC=100A  backupGen=45KVA@918h≈0yr  AC1+AC2
    {
      id: "CWN960", name: "Arafat — CWN960", location: "Arafat",
      lat: 21.347135, lng: 39.992573,
      siteType: "outdoor_cabinet", powerConfig: "commercial_with_backup",
      generatorKva: 50, generatorAge: 0,
      backupGeneratorKva: 45, backupGeneratorAge: 0,
      rectifierCapacityKw: 21,
      ac1CapacityBtu: 10200, ac1Age: 0,
      ac2CapacityBtu: 10200, ac2Age: 0,
      batteryCapacityAh: 800,
      batteryType: "lead_acid", batteryAge: 0,
      telecomLoadAmps: 220,
    },

    // CWN984  SG  Outdoor  Arafat  gen=30KVA@9331h≈1yr  AC1+AC2
    {
      id: "CWN984", name: "Arafat — CWN984", location: "Arafat",
      lat: 21.348754, lng: 39.995701,
      siteType: "outdoor_cabinet", powerConfig: "single_generator",
      generatorKva: 30, generatorAge: 1,
      rectifierCapacityKw: 18,
      ac1CapacityBtu: 10200, ac1Age: 0,
      ac2CapacityBtu: 10200, ac2Age: 0,
      batteryCapacityAh: 760,
      batteryType: "lead_acid", batteryAge: 0,
      telecomLoadAmps: 220,
    },

    // CWN996  SG  Outdoor  Arafat  gen=30KVA@19356h≈2yr  telecom=0
    {
      id: "CWN996", name: "Arafat — CWN996", location: "Arafat",
      lat: 21.374231, lng: 39.980616,
      siteType: "outdoor_cabinet", powerConfig: "single_generator",
      generatorKva: 30, generatorAge: 2,
      rectifierCapacityKw: 15,
      ac1CapacityBtu: 10200, ac1Age: 0,
      batteryCapacityAh: 760,
      batteryType: "lead_acid", batteryAge: 0,
      telecomLoadAmps: 0,
    },

    // CWN906  SB  Outdoor  Arafat  SEC=100A  backupGen=30KVA@0h
    {
      id: "CWN906", name: "Arafat — CWN906", location: "Arafat",
      lat: 21.37625, lng: 39.98233,
      siteType: "outdoor_cabinet", powerConfig: "commercial_with_backup",
      generatorKva: 50, generatorAge: 0,
      backupGeneratorKva: 30, backupGeneratorAge: 0,
      rectifierCapacityKw: 18,
      ac1CapacityBtu: 10200, ac1Age: 0,
      batteryCapacityAh: 760,
      batteryType: "lead_acid", batteryAge: 0,
      telecomLoadAmps: 275,    // 13.2KW
    },

    // CWN214  SB  Outdoor  Muzdalifah  SEC=100A  backupGen=35KVA@5091h≈0yr  AC1+AC2
    {
      id: "CWN214", name: "Muzdalifah — CWN214", location: "Muzdalifah",
      lat: 21.39194, lng: 39.903738,
      siteType: "outdoor_cabinet", powerConfig: "commercial_with_backup",
      generatorKva: 50, generatorAge: 0,
      backupGeneratorKva: 35, backupGeneratorAge: 0,
      rectifierCapacityKw: 21,
      ac1CapacityBtu: 10200, ac1Age: 0,
      ac2CapacityBtu: 10200, ac2Age: 0,
      batteryCapacityAh: 760,
      batteryType: "lead_acid", batteryAge: 0,
      telecomLoadAmps: 312,    // 14.96KW
    },

    // CWN903  SB  Outdoor  Arafat  SEC=100A  backupGen=45KVA@8833h≈1yr  AC1+AC2
    {
      id: "CWN903", name: "Arafat — CWN903", location: "Arafat",
      lat: 21.359944, lng: 39.947977,
      siteType: "outdoor_cabinet", powerConfig: "commercial_with_backup",
      generatorKva: 50, generatorAge: 0,
      backupGeneratorKva: 45, backupGeneratorAge: 1,
      rectifierCapacityKw: 18,
      ac1CapacityBtu: 10200, ac1Age: 0,
      ac2CapacityBtu: 10200, ac2Age: 0,
      batteryCapacityAh: 800,
      batteryType: "lead_acid", batteryAge: 0,
      telecomLoadAmps: 275,
    },
  ];
}

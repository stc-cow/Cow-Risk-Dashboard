// ─── Source: attached Excel "Code_Requirements_1776783992977.xlsx" sheet "COWs List" ───────
// Column mapping (0-indexed):
//   col0  = COW ID          col1  = Power Source (SB/SG)
//   col2  = Shelter Type    col3  = Location
//   col4  = Latitude        col5  = Longitude
//   col6  = Single Gen KVA  col7  = Gen Working-hours
//   col8  = SEC Meter Amps  col9  = Backup Gen KVA
//   col10 = Backup Gen hrs  col11 = Rectifier KW
//   col12 = AC1 Btu/h       col13 = AC1 Age yrs
//   col14 = AC2 Btu/h       col15 = AC2 Age yrs
//   col16 = Battery Ah/str  col17 = Strings
//   col18 = Battery Age yrs
//   col21 = Telecom outdoor KW   col22 = Telecom indoor KW
//   col23 = Telecom total KW
//   col24 = Telecom heat Btu/h   (header mislabelled KBtu/h — values ARE Btu/h)
//            → stored as telecomHeatKBtuH = col24 / 1000
//
// generatorKva:
//   SG sites → col6 (generator KVA)
//   SB sites → col8 × 0.5  (SEC Amps → KVA equivalent for engine formula)
// generatorAge:
//   SG → col7 / 8760 (hours → years)   SB → 0
// backupGeneratorAge:  col10 / 8760 (if col10 > 0)
// batteryCapacityAh: col16 × col17   (total strings, DOD applied by engine)
// ────────────────────────────────────────────────────────────────────────────────────────────

import type { SiteConfig } from "./calculations";

export const ALL_SITES: SiteConfig[] = [

  // ── SHELTER SITES ────────────────────────────────────────────────────────────────────────

  {
    id: "CWN105", name: "Arafat — CWN105", location: "Arafat",
    lat: 21.35622, lng: 39.98477,
    siteType: "shelter", powerConfig: "commercial_with_backup",
    generatorKva: 75, generatorAge: 0,
    secCapacityAmp: 150,
    backupGeneratorKva: 30, backupGeneratorAge: 0,
    rectifierCapacityKw: 18,
    ac1CapacityBtu: 36000, ac1Age: 0,
    ac2CapacityBtu: 36000, ac2Age: 0,
    batteryCapacityAh: 600, batteryType: "lead_acid", batteryAge: 0,
    telecomPowerKw: 12,
    telecomHeatKBtuH: 12.283,
  },

  {
    id: "CWN923", name: "Arafat — CWN923", location: "Arafat",
    lat: 21.361257, lng: 39.973944,
    siteType: "shelter", powerConfig: "single_generator",
    generatorKva: 30, generatorAge: 0.36,
    rectifierCapacityKw: 19.2,
    ac1CapacityBtu: 36000, ac1Age: 0,
    ac2CapacityBtu: 36000, ac2Age: 0,
    batteryCapacityAh: 950, batteryType: "lead_acid", batteryAge: 0,
    telecomPowerKw: 15,
    telecomHeatKBtuH: 15.354,
  },

  {
    id: "CWN991", name: "Arafat — CWN991", location: "Arafat",
    lat: 21.37224, lng: 39.93826,
    siteType: "shelter", powerConfig: "commercial_with_backup",
    generatorKva: 50, generatorAge: 0,
    secCapacityAmp: 100,
    backupGeneratorKva: 30, backupGeneratorAge: 1.78,
    rectifierCapacityKw: 19.2,
    ac1CapacityBtu: 48000, ac1Age: 0,
    ac2CapacityBtu: 48000, ac2Age: 0,
    batteryCapacityAh: 800, batteryType: "lead_acid", batteryAge: 0,
    telecomPowerKw: 12,
    telecomHeatKBtuH: 12.283,
  },

  {
    id: "CWN092", name: "Arafat — CWN092", location: "Arafat",
    lat: 21.333244, lng: 39.971526,
    siteType: "shelter", powerConfig: "single_generator",
    generatorKva: 30, generatorAge: 2.87,
    rectifierCapacityKw: 16,
    ac1CapacityBtu: 36000, ac1Age: 0,
    ac2CapacityBtu: 36000, ac2Age: 0,
    batteryCapacityAh: 400, batteryType: "lead_acid", batteryAge: 0,
    telecomPowerKw: 0,
    telecomHeatKBtuH: 0,
  },

  {
    id: "CWN076", name: "Arafat — CWN076", location: "Arafat",
    lat: 21.3692, lng: 39.977127,
    siteType: "shelter", powerConfig: "single_generator",
    generatorKva: 30, generatorAge: 2.09,
    rectifierCapacityKw: 15,
    ac1CapacityBtu: 36000, ac1Age: 0,
    ac2CapacityBtu: 36000, ac2Age: 0,
    batteryCapacityAh: 1400, batteryType: "lead_acid", batteryAge: 0,
    telecomPowerKw: 12,
    telecomHeatKBtuH: 12.283,
  },

  {
    id: "CWN108", name: "Arafat — CWN108", location: "Arafat",
    lat: 21.34916, lng: 39.98367,
    siteType: "shelter", powerConfig: "commercial_with_backup",
    generatorKva: 50, generatorAge: 0,
    secCapacityAmp: 100,
    backupGeneratorKva: 30, backupGeneratorAge: 4.89,
    rectifierCapacityKw: 18,
    ac1CapacityBtu: 36000, ac1Age: 0,
    ac2CapacityBtu: 36000, ac2Age: 0,
    batteryCapacityAh: 600, batteryType: "lead_acid", batteryAge: 0,
    telecomPowerKw: 12,
    telecomHeatKBtuH: 12.283,
  },

  {
    id: "CWN087", name: "Arafat — CWN087", location: "Arafat",
    lat: 21.35694, lng: 39.97782,
    siteType: "shelter", powerConfig: "commercial_with_backup",
    generatorKva: 35, generatorAge: 0,
    secCapacityAmp: 70,
    backupGeneratorKva: 35, backupGeneratorAge: 0,
    rectifierCapacityKw: 21,
    ac1CapacityBtu: 36000, ac1Age: 0,
    ac2CapacityBtu: 36000, ac2Age: 0,
    batteryCapacityAh: 760, batteryType: "lead_acid", batteryAge: 0,
    telecomPowerKw: 12,
    telecomHeatKBtuH: 12.283,
  },

  {
    id: "CWN075", name: "Arafat — CWN075", location: "Arafat",
    lat: 21.346996, lng: 39.957369,
    siteType: "shelter", powerConfig: "commercial_with_backup",
    generatorKva: 50, generatorAge: 0,
    secCapacityAmp: 100,
    backupGeneratorKva: 35, backupGeneratorAge: 0.21,
    rectifierCapacityKw: 21.6,
    ac1CapacityBtu: 36000, ac1Age: 0,
    ac2CapacityBtu: 36000, ac2Age: 0,
    batteryCapacityAh: 800, batteryType: "lead_acid", batteryAge: 0,
    telecomPowerKw: 12,
    telecomHeatKBtuH: 12.283,
  },

  {
    id: "CWN072", name: "Arafat — CWN072", location: "Arafat",
    lat: 21.34196, lng: 39.97602,
    siteType: "shelter", powerConfig: "commercial_with_backup",
    generatorKva: 50, generatorAge: 0,
    secCapacityAmp: 100,
    backupGeneratorKva: 25, backupGeneratorAge: 0,
    rectifierCapacityKw: 21.6,
    ac1CapacityBtu: 36000, ac1Age: 0,
    ac2CapacityBtu: 36000, ac2Age: 0,
    batteryCapacityAh: 1475, batteryType: "lead_acid", batteryAge: 0,
    telecomPowerKw: 12,
    telecomHeatKBtuH: 12.283,
  },

  {
    id: "CWN078", name: "Arafat — CWN078", location: "Arafat",
    lat: 21.34051, lng: 39.99548,
    siteType: "shelter", powerConfig: "commercial_with_backup",
    generatorKva: 50, generatorAge: 0,
    secCapacityAmp: 100,
    backupGeneratorKva: 35, backupGeneratorAge: 0,
    rectifierCapacityKw: 16.2,
    ac1CapacityBtu: 36000, ac1Age: 0,
    ac2CapacityBtu: 36000, ac2Age: 0,
    batteryCapacityAh: 800, batteryType: "lead_acid", batteryAge: 0,
    telecomPowerKw: 12,
    telecomHeatKBtuH: 12.283,
  },

  {
    id: "CWN080", name: "Arafat — CWN080", location: "Arafat",
    lat: 21.378152, lng: 39.990098,
    siteType: "shelter", powerConfig: "single_generator",
    generatorKva: 35, generatorAge: 2.52,
    rectifierCapacityKw: 21.6,
    ac1CapacityBtu: 36000, ac1Age: 0,
    ac2CapacityBtu: 36000, ac2Age: 0,
    batteryCapacityAh: 760, batteryType: "lead_acid", batteryAge: 0,
    telecomPowerKw: 0,
    telecomHeatKBtuH: 0,
  },

  {
    id: "CWN084", name: "Arafat — CWN084", location: "Arafat",
    lat: 21.342528, lng: 39.962167,
    siteType: "shelter", powerConfig: "commercial_with_backup",
    generatorKva: 50, generatorAge: 0,
    secCapacityAmp: 100,
    backupGeneratorKva: 35, backupGeneratorAge: 0,
    rectifierCapacityKw: 18.9,
    ac1CapacityBtu: 36000, ac1Age: 0,
    ac2CapacityBtu: 36000, ac2Age: 0,
    batteryCapacityAh: 800, batteryType: "lead_acid", batteryAge: 0,
    telecomPowerKw: 15,
    telecomHeatKBtuH: 15.354,
  },

  {
    id: "CWN085", name: "Arafat — CWN085", location: "Arafat",
    lat: 21.36681, lng: 39.96439,
    siteType: "shelter", powerConfig: "commercial_with_backup",
    generatorKva: 50, generatorAge: 0,
    secCapacityAmp: 100,
    backupGeneratorKva: 35, backupGeneratorAge: 0,
    rectifierCapacityKw: 18,
    ac1CapacityBtu: 36000, ac1Age: 0,
    ac2CapacityBtu: 36000, ac2Age: 0,
    batteryCapacityAh: 760, batteryType: "lead_acid", batteryAge: 0,
    telecomPowerKw: 12,
    telecomHeatKBtuH: 12.283,
  },

  {
    id: "CWN073", name: "Arafat — CWN073", location: "Arafat",
    lat: 21.3738433, lng: 39.9865483,
    siteType: "shelter", powerConfig: "commercial_with_backup",
    generatorKva: 50, generatorAge: 0,
    secCapacityAmp: 100,
    backupGeneratorKva: 45, backupGeneratorAge: 0,
    rectifierCapacityKw: 21.6,
    ac1CapacityBtu: 36000, ac1Age: 0,
    ac2CapacityBtu: 36000, ac2Age: 0,
    batteryCapacityAh: 800, batteryType: "lead_acid", batteryAge: 0,
    telecomPowerKw: 17,
    telecomHeatKBtuH: 17.401,
  },

  {
    id: "CWN093", name: "Arafat — CWN093", location: "Arafat",
    lat: 21.3568, lng: 39.93535,
    siteType: "shelter", powerConfig: "commercial_with_backup",
    generatorKva: 100, generatorAge: 0,
    secCapacityAmp: 200,
    backupGeneratorKva: 45, backupGeneratorAge: 3.63,
    rectifierCapacityKw: 21,
    ac1CapacityBtu: 36000, ac1Age: 0,
    ac2CapacityBtu: 36000, ac2Age: 0,
    batteryCapacityAh: 1600, batteryType: "lead_acid", batteryAge: 0,
    telecomPowerKw: 15,
    telecomHeatKBtuH: 15.354,
  },

  {
    id: "CWN038", name: "Arafat — CWN038", location: "Arafat",
    lat: 21.328514, lng: 39.961343,
    siteType: "shelter", powerConfig: "single_generator",
    generatorKva: 30, generatorAge: 0.17,
    rectifierCapacityKw: 12.8,
    ac1CapacityBtu: 48000, ac1Age: 0,
    ac2CapacityBtu: 48000, ac2Age: 0,
    batteryCapacityAh: 1400, batteryType: "lead_acid", batteryAge: 0,
    telecomPowerKw: 0,
    telecomHeatKBtuH: 0,
  },

  {
    id: "CWN083", name: "Arafat — CWN083", location: "Arafat",
    lat: 21.331372, lng: 39.965547,
    siteType: "shelter", powerConfig: "single_generator",
    generatorKva: 35, generatorAge: 0.70,
    rectifierCapacityKw: 18,
    ac1CapacityBtu: 36000, ac1Age: 0,
    ac2CapacityBtu: 36000, ac2Age: 0,
    batteryCapacityAh: 600, batteryType: "lead_acid", batteryAge: 0,
    telecomPowerKw: 12,
    telecomHeatKBtuH: 12.283,
  },

  {
    // Placeholder — no electrical data in spreadsheet
    id: "CWN908", name: "Arafat — CWN908", location: "Arafat",
    lat: 21.365285, lng: 39.95051,
    siteType: "shelter", powerConfig: "commercial_with_backup",
    placeholderSafe: true,
    generatorKva: 0, generatorAge: 0,
    rectifierCapacityKw: 0,
    ac1CapacityBtu: 0, ac1Age: 0,
    batteryCapacityAh: 0, batteryType: "lead_acid", batteryAge: 0,
    telecomPowerKw: 0, telecomHeatKBtuH: 0,
  },

  {
    id: "CWN102", name: "Arafat — CWN102", location: "Arafat",
    lat: 21.35901, lng: 39.95689,
    siteType: "shelter", powerConfig: "commercial_with_backup",
    generatorKva: 50, generatorAge: 0,
    secCapacityAmp: 100,
    backupGeneratorKva: 45, backupGeneratorAge: 1.35,
    rectifierCapacityKw: 19.2,
    ac1CapacityBtu: 36000, ac1Age: 0,
    ac2CapacityBtu: 36000, ac2Age: 0,
    batteryCapacityAh: 1600, batteryType: "lead_acid", batteryAge: 0,
    telecomPowerKw: 15,
    telecomHeatKBtuH: 15.354,
  },

  // ── OUTDOOR CABINET SITES ─────────────────────────────────────────────────────────────────

  {
    id: "CWN206", name: "Muzdalifah — CWN206", location: "Muzdalifah",
    lat: 21.390274, lng: 39.928265,
    siteType: "outdoor_cabinet", powerConfig: "single_generator",
    generatorKva: 30, generatorAge: 3.72,
    rectifierCapacityKw: 24,
    ac1CapacityBtu: 10200, ac1Age: 0,
    batteryCapacityAh: 800, batteryType: "lead_acid", batteryAge: 0,
    telecomPowerKw: 0,
    telecomHeatKBtuH: 0,
  },

  {
    id: "CWN956", name: "Arafat — CWN956", location: "Arafat",
    lat: 21.3704107, lng: 39.9854222,
    siteType: "outdoor_cabinet", powerConfig: "commercial_with_backup",
    generatorKva: 50, generatorAge: 0,
    secCapacityAmp: 100,
    backupGeneratorKva: 30, backupGeneratorAge: 0,
    rectifierCapacityKw: 15,
    ac1CapacityBtu: 10200, ac1Age: 0,
    batteryCapacityAh: 800, batteryType: "lead_acid", batteryAge: 0,
    telecomPowerKw: 12,
    telecomHeatKBtuH: 4.913,
  },

  {
    id: "CWN980", name: "Arafat — CWN980", location: "Arafat",
    lat: 21.371837, lng: 39.985979,
    siteType: "outdoor_cabinet", powerConfig: "commercial_with_backup",
    generatorKva: 50, generatorAge: 0,
    secCapacityAmp: 100,
    backupGeneratorKva: 30, backupGeneratorAge: 0,
    rectifierCapacityKw: 18,
    ac1CapacityBtu: 10200, ac1Age: 0,
    batteryCapacityAh: 800, batteryType: "lead_acid", batteryAge: 0,
    telecomPowerKw: 12,
    telecomHeatKBtuH: 4.913,
  },

  {
    id: "CWN951", name: "Arafat — CWN951", location: "Arafat",
    lat: 21.36258, lng: 39.96906,
    siteType: "outdoor_cabinet", powerConfig: "commercial_with_backup",
    generatorKva: 50, generatorAge: 0,
    secCapacityAmp: 100,
    backupGeneratorKva: 30, backupGeneratorAge: 0,
    rectifierCapacityKw: 15,
    ac1CapacityBtu: 10200, ac1Age: 0,
    batteryCapacityAh: 800, batteryType: "lead_acid", batteryAge: 0,
    telecomPowerKw: 12,
    telecomHeatKBtuH: 4.913,
  },

  {
    id: "CWN020", name: "Arafat — CWN020", location: "Arafat",
    lat: 21.35047, lng: 39.96813,
    siteType: "outdoor_cabinet", powerConfig: "commercial_with_backup",
    generatorKva: 50, generatorAge: 0,
    secCapacityAmp: 100,
    backupGeneratorKva: 35, backupGeneratorAge: 0.27,
    rectifierCapacityKw: 24,
    ac1CapacityBtu: 10200, ac1Age: 0,
    batteryCapacityAh: 800, batteryType: "lead_acid", batteryAge: 0,
    telecomPowerKw: 15,
    telecomHeatKBtuH: 6.142,
  },

  {
    id: "CWN901", name: "Arafat — CWN901", location: "Arafat",
    lat: 21.372652, lng: 39.989533,
    siteType: "outdoor_cabinet", powerConfig: "single_generator",
    generatorKva: 30, generatorAge: 1.43,
    rectifierCapacityKw: 18,
    ac1CapacityBtu: 10200, ac1Age: 0,
    batteryCapacityAh: 800, batteryType: "lead_acid", batteryAge: 0,
    telecomPowerKw: 0,
    telecomHeatKBtuH: 0,
  },

  {
    id: "CWN203", name: "Arafat — CWN203", location: "Arafat",
    lat: 21.354658, lng: 39.986218,
    siteType: "outdoor_cabinet", powerConfig: "commercial_with_backup",
    generatorKva: 50, generatorAge: 0,
    secCapacityAmp: 100,
    backupGeneratorKva: 35, backupGeneratorAge: 0,
    rectifierCapacityKw: 24,
    ac1CapacityBtu: 10200, ac1Age: 0,
    batteryCapacityAh: 800, batteryType: "lead_acid", batteryAge: 0,
    telecomPowerKw: 17,
    telecomHeatKBtuH: 6.960,
  },

  {
    id: "CWN914", name: "Arafat — CWN914", location: "Arafat",
    lat: 21.365421, lng: 39.971661,
    siteType: "outdoor_cabinet", powerConfig: "commercial_with_backup",
    generatorKva: 50, generatorAge: 0,
    secCapacityAmp: 100,
    backupGeneratorKva: 30, backupGeneratorAge: 0,
    rectifierCapacityKw: 18,
    ac1CapacityBtu: 10200, ac1Age: 0,
    batteryCapacityAh: 800, batteryType: "lead_acid", batteryAge: 0,
    telecomPowerKw: 12,
    telecomHeatKBtuH: 4.913,
  },

  {
    id: "CWN015", name: "Arafat — CWN015", location: "Arafat",
    lat: 21.377645, lng: 39.986816,
    siteType: "outdoor_cabinet", powerConfig: "commercial_with_backup",
    generatorKva: 50, generatorAge: 0,
    secCapacityAmp: 100,
    backupGeneratorKva: 30, backupGeneratorAge: 0,
    rectifierCapacityKw: 18,
    ac1CapacityBtu: 10200, ac1Age: 0,
    batteryCapacityAh: 800, batteryType: "lead_acid", batteryAge: 0,
    telecomPowerKw: 12,
    telecomHeatKBtuH: 4.913,
  },

  {
    id: "CWN212", name: "Arafat — CWN212", location: "Arafat",
    lat: 21.366124, lng: 39.984126,
    siteType: "outdoor_cabinet", powerConfig: "commercial_with_backup",
    generatorKva: 50, generatorAge: 0,
    secCapacityAmp: 100,
    backupGeneratorKva: 35, backupGeneratorAge: 0,
    rectifierCapacityKw: 21,
    ac1CapacityBtu: 10200, ac1Age: 0,
    batteryCapacityAh: 800, batteryType: "lead_acid", batteryAge: 0,
    telecomPowerKw: 15,
    telecomHeatKBtuH: 6.142,
  },

  {
    id: "CWN992", name: "Muzdalifah — CWN992", location: "Muzdalifah",
    lat: 21.389249, lng: 39.906895,
    siteType: "outdoor_cabinet", powerConfig: "commercial_with_backup",
    generatorKva: 30, generatorAge: 0,
    secCapacityAmp: 60,
    backupGeneratorKva: 30, backupGeneratorAge: 0,
    rectifierCapacityKw: 15,
    ac1CapacityBtu: 10200, ac1Age: 0,
    batteryCapacityAh: 760, batteryType: "lead_acid", batteryAge: 0,
    telecomPowerKw: 12,
    telecomHeatKBtuH: 4.913,
  },

  {
    id: "CWN205", name: "Muzdalifah — CWN205", location: "Muzdalifah",
    lat: 21.396241, lng: 39.914628,
    siteType: "outdoor_cabinet", powerConfig: "single_generator",
    generatorKva: 30, generatorAge: 0.40,
    rectifierCapacityKw: 24,
    ac1CapacityBtu: 10200, ac1Age: 0,
    batteryCapacityAh: 800, batteryType: "lead_acid", batteryAge: 0,
    telecomPowerKw: 0,
    telecomHeatKBtuH: 0,
  },

  {
    id: "CWN960", name: "Arafat — CWN960", location: "Arafat",
    lat: 21.347135, lng: 39.992573,
    siteType: "outdoor_cabinet", powerConfig: "commercial_with_backup",
    generatorKva: 50, generatorAge: 0,
    secCapacityAmp: 100,
    backupGeneratorKva: 45, backupGeneratorAge: 0.10,
    rectifierCapacityKw: 21,
    ac1CapacityBtu: 10200, ac1Age: 0,
    ac2CapacityBtu: 10200, ac2Age: 0,
    batteryCapacityAh: 800, batteryType: "lead_acid", batteryAge: 0,
    telecomPowerKw: 12,
    telecomHeatKBtuH: 4.913,
  },

  {
    id: "CWN984", name: "Arafat — CWN984", location: "Arafat",
    lat: 21.348754, lng: 39.995701,
    siteType: "outdoor_cabinet", powerConfig: "single_generator",
    generatorKva: 30, generatorAge: 1.07,
    rectifierCapacityKw: 18,
    ac1CapacityBtu: 10200, ac1Age: 0,
    ac2CapacityBtu: 10200, ac2Age: 0,
    batteryCapacityAh: 760, batteryType: "lead_acid", batteryAge: 0,
    telecomPowerKw: 12,
    telecomHeatKBtuH: 4.913,
  },

  {
    id: "CWN996", name: "Arafat — CWN996", location: "Arafat",
    lat: 21.374231, lng: 39.980616,
    siteType: "outdoor_cabinet", powerConfig: "single_generator",
    generatorKva: 30, generatorAge: 2.21,
    rectifierCapacityKw: 15,
    ac1CapacityBtu: 10200, ac1Age: 0,
    batteryCapacityAh: 760, batteryType: "lead_acid", batteryAge: 0,
    telecomPowerKw: 0,
    telecomHeatKBtuH: 0,
  },

  {
    id: "CWN906", name: "Arafat — CWN906", location: "Arafat",
    lat: 21.37625, lng: 39.98233,
    siteType: "outdoor_cabinet", powerConfig: "commercial_with_backup",
    generatorKva: 50, generatorAge: 0,
    secCapacityAmp: 100,
    backupGeneratorKva: 30, backupGeneratorAge: 0,
    rectifierCapacityKw: 18,
    ac1CapacityBtu: 10200, ac1Age: 0,
    batteryCapacityAh: 760, batteryType: "lead_acid", batteryAge: 0,
    telecomPowerKw: 15,
    telecomHeatKBtuH: 6.142,
  },

  {
    id: "CWN214", name: "Muzdalifah — CWN214", location: "Muzdalifah",
    lat: 21.39194, lng: 39.903738,
    siteType: "outdoor_cabinet", powerConfig: "commercial_with_backup",
    generatorKva: 50, generatorAge: 0,
    secCapacityAmp: 100,
    backupGeneratorKva: 35, backupGeneratorAge: 0.58,
    rectifierCapacityKw: 21,
    ac1CapacityBtu: 10200, ac1Age: 0,
    ac2CapacityBtu: 10200, ac2Age: 0,
    batteryCapacityAh: 760, batteryType: "lead_acid", batteryAge: 0,
    telecomPowerKw: 17,
    telecomHeatKBtuH: 6.960,
  },

  {
    id: "CWN903", name: "Arafat — CWN903", location: "Arafat",
    lat: 21.359944, lng: 39.947977,
    siteType: "outdoor_cabinet", powerConfig: "commercial_with_backup",
    generatorKva: 50, generatorAge: 0,
    secCapacityAmp: 100,
    backupGeneratorKva: 45, backupGeneratorAge: 1.01,
    rectifierCapacityKw: 18,
    ac1CapacityBtu: 10200, ac1Age: 0,
    ac2CapacityBtu: 10200, ac2Age: 0,
    batteryCapacityAh: 800, batteryType: "lead_acid", batteryAge: 0,
    telecomPowerKw: 15,
    telecomHeatKBtuH: 6.142,
  },

];

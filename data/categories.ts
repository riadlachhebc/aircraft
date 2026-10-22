import { CategoryId, CategoryInfo } from "@/lib/types";

export const CATEGORIES: Record<CategoryId, CategoryInfo> = {
  "air-conditioners": {
    id: "air-conditioners",
    slug: "air-conditioners",
    name: "Air Conditioners",
    shortDescription:
      "Sizing guides, dual-hose thermodynamic comparisons, and real-world efficiency analysis for US residential cooling.",
    metaTitle: "Air Conditioners: Sizing, Dual-Hose Tech & Efficiency | Air Crafted Home",
    metaDescription:
      "Independent guidance on portable and window air conditioners. Learn how to calculate DOE SACC cooling capacity, compare dual-hose models, and minimize electric bills.",
    heroHeadline: "Precision Cooling for Every Room",
    editorialSummary:
      "Cooling a home requires matching mechanical capacity to heat gain. In standard US homes, choosing between portable, window, and mini-split units involves thermodynamic trade-offs like infiltration losses and electrical circuit constraints.",
    keyTopics: [
      "DOE SACC vs ASHRAE BTUs",
      "Single-hose vs dual-hose thermodynamics",
      "Inverter vs single-speed compressors",
      "Condensate auto-evaporation limits",
      "Renter window installation guidelines",
    ],
    standardsBodies: ["US Department of Energy (DOE)", "ENERGY STAR", "AHAM", "ASHRAE Standard 16"],
  },
  heating: {
    id: "heating",
    slug: "heating",
    name: "Heating",
    shortDescription:
      "Electric space heaters, oil-filled radiators, zone heating economics, and essential electrical safety standards.",
    metaTitle: "Electric Space Heating & Zone Warming Guides | Air Crafted Home",
    metaDescription:
      "Calculate supplemental heating costs, evaluate oil-filled vs ceramic heaters, and review NFPA/CPSC electrical safety rules for US 120V household circuits.",
    heroHeadline: "Efficient Supplemental Warmth",
    editorialSummary:
      "Electric resistance heaters convert 100% of electricity into heat (1 watt = 3.412 BTU/h), but electricity is usually more expensive per unit of heat than natural gas or heat pumps. Effective heating requires strategic zone management and rigorous fire safety adherence.",
    keyTopics: [
      "1,500W limit on 120V 15A circuits",
      "Oil-filled radiator thermal inertia",
      "Ceramic convection vs quartz radiant",
      "Thermostat cycling and duty cycles",
      "CPSC 3-foot clearance safety rules",
    ],
    standardsBodies: ["Consumer Product Safety Commission (CPSC)", "Underwriters Laboratories (UL 1278)", "NFPA"],
  },
  "fans-air-circulators": {
    id: "fans-air-circulators",
    slug: "fans-air-circulators",
    name: "Fans & Air Circulators",
    shortDescription:
      "Airflow physics, wind-chill comfort, whole-room vortex dynamics, and quiet bedroom airflow design.",
    metaTitle: "Fans & Air Circulators: Airflow Dynamics & Comfort | Air Crafted Home",
    metaDescription:
      "Understand the difference between tower fans, oscillating desk fans, and whole-room air circulators. Maximize perceived cooling with minimal wattage.",
    heroHeadline: "Targeted Airflow & Perceived Cooling",
    editorialSummary:
      "Fans do not lower ambient room temperature; they cool people through convective heat transfer and sweat evaporation (producing a 4°F to 8°F perceived cooling effect). Understanding CFM, velocity, and room acoustics helps create quiet, draft-free comfort.",
    keyTopics: [
      "Tower fans vs focused vortex circulators",
      "CFM vs air velocity (feet per minute)",
      "Ceiling fan seasonal blade rotation",
      "Acoustic noise ratings (dBA) in bedrooms",
      "HVAC register airflow balancing",
    ],
    standardsBodies: ["AMCA (Air Movement and Control Association)", "DOE Ceiling Fan Standards", "OSHA"],
  },
  "air-quality": {
    id: "air-quality",
    slug: "air-quality",
    name: "Air Quality",
    shortDescription:
      "True HEPA filtration, AHAM CADR sizing, ACH metrics, activated carbon absorption, and indoor humidity balance.",
    metaTitle: "Indoor Air Quality, HEPA Filtration & CADR Sizing | Air Crafted Home",
    metaDescription:
      "Evidence-based indoor air quality guides. Size HEPA air purifiers using AHAM CADR standards, calculate air changes per hour, and manage PM2.5 and VOCs.",
    heroHeadline: "Clean Air Engineered for Health",
    editorialSummary:
      "Indoor air can contain particulate matter (PM2.5, dust, pet dander) and volatile organic compounds (VOCs). Selecting air-cleaning appliances requires understanding CADR ratings, filter replacement economics, and source control.",
    keyTopics: [
      "True HEPA (99.97% @ 0.3 microns) vs HEPA-type",
      "AHAM CADR 2/3 room-size rule",
      "Air Changes per Hour (ACH) for allergies",
      "Activated carbon capacity for gases & VOCs",
      "Relative humidity targets (30% to 50%)",
    ],
    standardsBodies: ["EPA (Environmental Protection Agency)", "AHAM AC-1", "DOE", "ASHRAE Standard 62.2"],
  },
  "energy-efficiency": {
    id: "energy-efficiency",
    slug: "energy-efficiency",
    name: "Energy Efficiency",
    shortDescription:
      "Transparent appliance operating cost formulas, US regional utility rate analysis, and thermal load optimization.",
    metaTitle: "Home Energy Efficiency & Operating Cost Calculators | Air Crafted Home",
    metaDescription:
      "Calculate your actual appliance operating costs with our interactive tool. Discover kilowatt-hour formulas, regional electricity rates, and compressor duty cycles.",
    heroHeadline: "Calculate Every Kilowatt-Hour",
    editorialSummary:
      "Appliance running costs depend on power draw, run hours, duty cycle, and local utility rates. A transparent energy calculation separates marketing promises from actual electric bill impacts.",
    keyTopics: [
      "Nameplate wattage to kWh formulas",
      "Thermostat cycling & compressor duty cycles",
      "US regional EIA electricity rate data",
      "EnergyGuide label interpretation",
      "Vampire / phantom load mitigation",
    ],
    standardsBodies: ["US Energy Information Administration (EIA)", "ENERGY STAR", "DOE Office of Energy Efficiency"],
  },
};

export const CATEGORY_LIST = Object.values(CATEGORIES);

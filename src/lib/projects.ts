/**
 * Delivered project record.
 *
 * IMPORTANT: every entry here is deliberately anonymous. These clients are
 * not ours to name and the drawings are not ours to publish. Describe the
 * building, the systems and the engineering problem. Never the client, and
 * never a location specific enough to identify one.
 *
 * MCD is the first direct client and the only name that may appear on the
 * site, once that project is ready to show.
 */

export type Project = {
  slug: string;
  /** Building type, standing in for the client name. */
  title: string;
  sector: string;
  system: string;
  summary: string;
  /** The engineering problem, which is the part worth reading. */
  detail: string;
  highlights: string[];
};

export const PROJECTS: Project[] = [
  {
    slug: "warehouse-chemical-plant",
    title: "Warehouse and chemical processing facility",
    sector: "Industrial",
    system: "Mechanical systems design",
    summary:
      "Chemical vapour management and environmental control across zones with conflicting requirements.",
    detail:
      "A combined storage and processing facility where product integrity, occupant safety and energy cost pull in different directions. The design separated the building into distinct operational zones so that vapour extraction where it was needed did not force the whole envelope onto the same expensive air change rate.",
    highlights: ["Vapour management", "Zoned ventilation", "Product integrity"],
  },
  {
    slug: "multi-use-commercial-development",
    title: "Multi-use commercial development",
    sector: "Commercial",
    system: "HVAC systems design",
    summary:
      "Retail, office and shared public space under one roof, on one plant.",
    detail:
      "Three occupancy patterns with almost nothing in common, served without oversizing for the worst case. The design balanced comfort against lifecycle cost by letting each use type run on its own schedule rather than holding the entire building at office conditions.",
    highlights: [
      "Mixed occupancy",
      "Lifecycle cost",
      "Operational flexibility",
    ],
  },
  {
    slug: "hotel-chilled-water",
    title: "Full service hotel",
    sector: "Hospitality",
    system: "Centralised chilled water",
    summary:
      "Around the clock reliability, with acoustics treated as a design input rather than an afterthought.",
    detail:
      "Guest rooms and public areas off a central chilled water plant, engineered for continuous operation. Noise was the constraint that shaped the layout: a hotel cannot trade quiet for efficiency, so plant siting, pipe velocities and terminal selection were all driven by the acoustic target.",
    highlights: ["24/7 operation", "Acoustic control", "Energy efficiency"],
  },
  {
    slug: "high-rise-residential-tower",
    title: "High-rise residential tower",
    sector: "Residential",
    system: "VRF with life safety integration",
    summary:
      "Comfort cooling and life safety systems designed as one, not bolted together.",
    detail:
      "A coastal high-rise where humidity drives the load and life safety drives the layout. Lobby smoke extraction, stairwell pressurisation and demand controlled car park ventilation were integrated with the comfort system so that the two sets of requirements resolved in the same shafts.",
    highlights: [
      "Smoke extraction",
      "Stairwell pressurisation",
      "Coastal humidity",
    ],
  },
  {
    slug: "residential-development-mechanical",
    title: "Private residential development",
    sector: "Residential",
    system: "Integrated mechanical systems",
    summary:
      "HVAC, ventilation and life safety across living and shared spaces, designed for the people maintaining it.",
    detail:
      "Maintainability was the governing requirement. Equipment was selected and positioned so that routine servicing does not need scaffolding or a shutdown, which matters more over twenty years than the marginal efficiency gain from a tighter selection.",
    highlights: ["Maintainability", "Life safety", "Energy efficiency"],
  },
  {
    slug: "corporate-offices-retail",
    title: "Corporate offices with retail",
    sector: "Commercial",
    system: "Integrated mechanical systems",
    summary:
      "Climate control, ventilation and life safety across offices, retail and shared facilities.",
    detail:
      "A working building with tenants who change. The design prioritised flexibility, so that a floor can be re-partitioned without re-engineering the distribution, and long term reliability over headline efficiency figures that only hold at full occupancy.",
    highlights: ["Tenant flexibility", "Indoor air quality", "Reliability"],
  },
  {
    slug: "government-offices",
    title: "Government offices",
    sector: "Public",
    system: "VRF with toilet extraction",
    summary:
      "Careful zoning across offices, meeting rooms and public areas with very different occupancy.",
    detail:
      "Public areas load up unpredictably while offices stay steady, so a single zoning strategy would have meant permanent overcooling somewhere. Zones were split by occupancy behaviour rather than by floor plate, with extraction integrated so that air quality held up during peak public use.",
    highlights: [
      "Occupancy zoning",
      "Indoor air quality",
      "Efficient operation",
    ],
  },
  {
    slug: "residential-apartments-vrf",
    title: "Residential apartments",
    sector: "Residential",
    system: "VRF with integrated ventilation",
    summary:
      "Individual climate control per apartment, on shared infrastructure.",
    detail:
      "Residents expect to control their own comfort and to be billed for what they use. The system gives each apartment independent control with ventilation and life safety integrated, without duplicating plant for every unit.",
    highlights: [
      "Individual control",
      "Integrated ventilation",
      "Operational flexibility",
    ],
  },
  {
    slug: "multi-storey-private-residence",
    title: "Multi-storey private residence",
    sector: "Residential",
    system: "VRF and DX across three levels",
    summary:
      "Basement, ground and first floor, each with a different occupancy pattern.",
    detail:
      "A luxury residence where rooms sit empty for long stretches and then fill without warning. Cooling was zoned to match how the house is actually lived in, with quiet operation and controls simple enough that the household uses them correctly.",
    highlights: ["Varied occupancy", "Quiet operation", "Usable controls"],
  },
  {
    slug: "retrofit-buildings",
    title: "Retrofit buildings",
    sector: "Office or commercial",
    system: "MEP",
    summary:
      "Existing buildings brought up to standard without taking them out of service.",
    detail:
      "Retrofit is the hardest kind of mechanical work. The building is occupied, the risers sit where somebody put them decades ago, and the drawings, where they exist at all, stopped matching reality long ago. Survey first, then design against what is actually there rather than what the file says.",
    highlights: [
      "Occupied buildings",
      "Surveyed, not assumed",
      "Phased handover",
    ],
  },
];

/**
 * Designs completed to date. Deliberately larger than PROJECTS.length, because
 * the list above is a selection rather than the whole record.
 */
export const DESIGN_PROJECTS = "30+";

/**
 * The same figure as a number, for anything that has to count or compare.
 * DESIGN_PROJECTS carries the "+" because most of the site is displaying it
 * as text, and the two must be changed together.
 */
export const DESIGN_PROJECTS_COUNT = 30;

export const PROJECT_COUNT = PROJECTS.length;

/**
 * The training programme.
 *
 * Note on what is deliberately absent: no fees, no discount structure and no
 * bank details. Those change, they date the site the moment they do, and they
 * belong in a conversation or a flyer rather than on a page that has to stay
 * true. Every enquiry route here leads to a person.
 */

export const PROGRAMME = {
  name: "HVAC Design",
  promise: "Design. Calculate. Select. Deliver.",
  // Favour may move to four months and run it twice a year, so the site
  // must not quote a figure. Flexible also pushes people to enquire.
  duration: "Flexible",
  mode: "Live virtual classes",
  commitment: "One day per week",
  outcome: "Certificate of completion",
} as const;

export type Module = {
  index: string;
  title: string;
  description: string;
  tools?: string;
};

export const MODULES: Module[] = [
  {
    index: "01",
    title: "Cooling load calculation",
    description:
      "Work out what a building actually needs before anything gets selected. Sensible and latent loads, occupancy assumptions and the judgement calls that decide whether a system is right sized or expensively wrong.",
    tools: "Carrier HAP",
  },
  {
    index: "02",
    title: "Duct design and layout",
    description:
      "Sizing, routing and pressure drop, then laying it out against a real floor plan with real obstructions. Where the theory meets roof hips, fire walls and a ceiling void somebody else has already claimed.",
  },
  {
    index: "03",
    title: "Equipment selection",
    description:
      "Choosing plant against a calculated load rather than a rule of thumb. Schedules, selection criteria, and understanding the cost consequences of each decision over the life of the building.",
  },
  {
    index: "04",
    title: "Chilled water systems",
    description:
      "Central plant, pipe sizing, pumps and distribution. When a chilled water system is the right answer, when it is not, and how to design one that can actually be commissioned.",
  },
  {
    index: "05",
    title: "Air handling units",
    description:
      "AHU design and specification, coil selection and the air side of the system, treated as an engineering problem rather than a catalogue exercise.",
  },
  {
    index: "06",
    title: "Rooftop and packaged systems",
    description:
      "Rooftop units, DX and packaged plant. Structural and access constraints, and the trade-offs that make a rooftop the right or wrong call for a given building.",
  },
];

export const AUDIENCE = [
  "Mechanical engineers",
  "MEP engineers",
  "Project engineers",
  "HVAC technicians and supervisors",
  "Fresh graduates",
  "Anyone working in building services",
] as const;

export const OUTCOMES = [
  {
    title: "Work on real projects",
    body: "You design against live project conditions, not textbook exercises, and leave with a portfolio you can show an employer.",
  },
  {
    title: "Industry standard methods",
    body: "The same tools and standards used on delivered projects, so what you learn transfers to the job on day one.",
  },
  {
    title: "Taught by practising engineers",
    body: "Every module is taught by people who design these systems for a living and have to answer for them on site.",
  },
] as const;

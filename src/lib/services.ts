/**
 * The four things BMG sells. Order matters: training leads, because that is
 * the strength the business is built around and the rest supports it.
 */

export type Service = {
  index: string;
  slug: string;
  title: string;
  summary: string;
  href: string;
};

export const SERVICES: Service[] = [
  {
    index: "01",
    slug: "training",
    title: "MEP training",
    summary:
      "Structured mechanical, electrical and plumbing training that closes the gap between an architectural drawing and a system that works. Engineers leave able to design, calculate, select and deliver.",
    href: "/training",
  },
  {
    index: "02",
    slug: "consultancy",
    title: "Engineering consultancy",
    summary:
      "Technical and commercial judgement on complex building projects. We work with developers, architects and contractors to make mechanical systems a driver of building value rather than a cost centre.",
    href: "/consultancy",
  },
  {
    index: "03",
    slug: "installation",
    title: "MEP installation",
    summary:
      "End to end installation of mechanical, electrical and plumbing systems for commercial, industrial and complex residential projects. Engineered designs turned into working infrastructure.",
    href: "/consultancy",
  },
  {
    index: "04",
    slug: "project-management",
    title: "Project management",
    summary:
      "Oversight that keeps an engineering design intact from drawing to handover, on programme and on budget, with the predictability that lets everyone else plan around it.",
    href: "/consultancy",
  },
];

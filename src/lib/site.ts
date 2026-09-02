/**
 * Single source of truth for the details that appear in more than one place.
 * Change a phone number or a nav label here, not in six components.
 */

export const COMPANY = {
  legalName: "BMG Engineering Limited",
  shortName: "BMG",
  rcNumber: "9085536",
  tagline: "Creating your vision, one design at a time.",
} as const;

export const DOMAIN = "bmgengineeringlimited.com";

export const CONTACT = {
  // TODO: swap to info@bmgengineeringlimited.com once the mailbox is set up.
  email: "bmgengineeringlimited@gmail.com",
  mailto: "mailto:bmgengineeringlimited@gmail.com",
  phone: "+234 906 331 7044",
  tel: "tel:+2349063317044",
} as const;

export const NAV = [
  { label: "Training", href: "/training" },
  { label: "Consultancy", href: "/consultancy" },
  { label: "Projects", href: "/projects" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
] as const;

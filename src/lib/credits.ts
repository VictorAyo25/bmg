/**
 * Photograph attribution.
 *
 * Four of these are CC BY-SA, which obliges us to name the author, state the
 * licence, link to it, and note that the image was changed. That is why the
 * credits page exists and why the footer links to it. Do not remove either
 * without first removing the images.
 *
 * These photographs are atmosphere. They are not BMG projects and must never
 * be captioned, described or arranged so as to suggest they are.
 */

export type PhotoCredit = {
  page: string;
  title: string;
  author: string;
  licence: string;
  licenceUrl: string;
  source: string;
};

const BY_SA_4 = "https://creativecommons.org/licenses/by-sa/4.0/";
const BY_SA_2 = "https://creativecommons.org/licenses/by-sa/2.0/";
const CC0 = "https://creativecommons.org/publicdomain/zero/1.0/";

export const PHOTO_CREDITS: PhotoCredit[] = [
  {
    page: "Home",
    title: "Scan-to-BIM Mechanical Room",
    author: "Oregon State University",
    licence: "CC BY-SA 2.0",
    licenceUrl: BY_SA_2,
    source:
      "https://commons.wikimedia.org/wiki/File:Scan-to-BIM_Mechanical_Room.jpg",
  },
  {
    page: "Training",
    title: "Air handling units in large commercial building, Brisbane",
    author: "Kgbo",
    licence: "CC BY-SA 4.0",
    licenceUrl: BY_SA_4,
    source:
      "https://commons.wikimedia.org/wiki/File:Air_handling_units_in_large_commercial_building,_Brisbane_01.jpg",
  },
  {
    page: "Projects",
    title: "Rooftop air conditioning, Sunnybank Private Hospital, Queensland",
    author: "Kgbo",
    licence: "CC BY-SA 4.0",
    licenceUrl: BY_SA_4,
    source:
      "https://commons.wikimedia.org/wiki/File:Rooftop_air_conditioning,_Sunnybank_Private_Hospital,_Queensland,_01.jpg",
  },
  {
    page: "Consultancy",
    title: "Chiller Plant Interior",
    author: "Mbrickn",
    licence: "CC BY-SA 4.0",
    licenceUrl: BY_SA_4,
    source:
      "https://commons.wikimedia.org/wiki/File:Chiller_Plant_Interior.jpg",
  },
  {
    page: "About",
    title: "Disassembled chiller heat exchanger",
    author: "Rsparks3",
    licence: "CC0",
    licenceUrl: CC0,
    source:
      "https://commons.wikimedia.org/wiki/File:Disassembled_chiller_heat_exchanger.jpg",
  },
];

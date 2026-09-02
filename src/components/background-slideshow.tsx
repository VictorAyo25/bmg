"use client";

import { Slideshow } from "./slideshow";

/**
 * Page header background. Same machinery as the home hero, without the slide
 * buttons, and with a scrim that leans a little harder to the left because
 * page headings sit further up the frame than the home headline does.
 */
export function BackgroundSlideshow({ images }: { images: string[] }) {
  return (
    <Slideshow
      images={images}
      scrim="bg-linear-to-r from-deep from-20% via-deep/75 to-deep/25"
    />
  );
}

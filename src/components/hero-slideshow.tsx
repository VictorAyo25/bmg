"use client";

import { Slideshow } from "./slideshow";

const SLIDES = [
  "/img/hero/01.jpg",
  "/img/hero/02.jpg",
  "/img/hero/03.jpg",
  "/img/hero/04.jpg",
  "/img/hero/05.jpg",
];

export function HeroSlideshow() {
  return <Slideshow images={SLIDES} controls />;
}

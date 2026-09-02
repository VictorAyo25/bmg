"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

export function BackgroundSlideshow({ images }: { images: string[] }) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const handler = (e: MediaQueryListEvent | MediaQueryList) => setReducedMotion(e.matches);
    
    setTimeout(() => handler(mediaQuery), 0);

    mediaQuery.addEventListener("change", handler);
    return () => mediaQuery.removeEventListener("change", handler);
  }, []);

  useEffect(() => {
    if (reducedMotion) return;
    if (images.length <= 1) return;

    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % images.length);
    }, 8000);

    return () => clearInterval(timer);
  }, [reducedMotion, images.length]);

  if (!images || images.length === 0) return null;

  return (
    <>
      {images.map((src, idx) => {
        const isActive = currentSlide === idx;
        return (
          <div
            key={src}
            className={`absolute inset-0 transition-opacity duration-[3000ms] ease-in-out ${
              isActive ? "opacity-100 z-0" : "opacity-0 -z-10"
            }`}
          >
            <Image
              src={src}
              alt=""
              aria-hidden="true"
              fill
              sizes="100vw"
              priority={idx === 0}
              className="object-cover opacity-70 mix-blend-luminosity"
            />
          </div>
        );
      })}
      <div
        aria-hidden
        className="absolute inset-0 z-0 bg-linear-to-r from-deep from-30% via-deep/60 to-transparent pointer-events-none"
      />
      <div
        aria-hidden
        className="absolute inset-0 z-0 bg-linear-to-t from-deep/80 via-transparent to-transparent pointer-events-none"
      />
    </>
  );
}

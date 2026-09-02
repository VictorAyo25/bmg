"use client";

import { useEffect, useState } from "react";

const SLIDES = [
  "/img/hero/01.mp4",
  "/img/hero/02.mp4",
  "/img/hero/03.mp4",
  "/img/hero/04.mp4",
  "/img/hero/05.mp4",
];

export function HeroSlideshow() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
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
    if (isHovered || isFocused) return;

    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % SLIDES.length);
    }, 6000);

    return () => clearInterval(timer);
  }, [reducedMotion, isHovered, isFocused]);

  return (
    <div
      className="absolute inset-0 z-0 bg-deep"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onFocus={() => setIsFocused(true)}
      onBlur={() => setIsFocused(false)}
    >
      {SLIDES.map((src, idx) => {
        const isActive = currentSlide === idx;
        return (
          <div
            key={src}
            className={`absolute inset-0 transition-opacity duration-900 ease-in-out ${
              isActive ? "opacity-100 z-10" : "opacity-0 z-0"
            }`}
          >
            <video
              src={src}
              aria-hidden="true"
              autoPlay
              loop
              muted
              playsInline
              className="object-cover w-full h-full"
            />
          </div>
        );
      })}

      <div
        aria-hidden="true"
        className="absolute inset-0 z-20 bg-linear-to-r from-deep from-25% via-deep/70 to-deep/20 pointer-events-none"
      />

      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30 flex gap-3">
        {SLIDES.map((_, idx) => (
          <button
            key={idx}
            type="button"
            aria-label={`Show slide ${idx + 1} of ${SLIDES.length}`}
            onClick={() => setCurrentSlide(idx)}
            className={`w-12 h-1 transition-all ${
              currentSlide === idx ? "bg-brand-400" : "bg-white/30 hover:bg-white/50"
            }`}
          />
        ))}
      </div>
    </div>
  );
}

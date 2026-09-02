"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { BLUR } from "@/lib/blur";

/**
 * Background slideshow, shared by the home hero and every page header.
 *
 * THE LOADING PROBLEM THIS SOLVES
 *
 * The previous version rendered every slide on first paint. Because the slides
 * are absolutely positioned at full size they are all inside the viewport, so
 * lazy loading never deferred anything: five images began downloading at once
 * and the only one the visitor could actually see had to fight the other four
 * for bandwidth. On a phone that is the difference between a hero appearing
 * immediately and appearing several seconds late.
 *
 * So: slide one loads alone. The rest are not mounted at all until it has
 * decoded and the browser is idle. Nothing competes with the image that
 * matters, and the later slides arrive long before their turn at eight
 * seconds each.
 *
 * Every slide also carries a sixteen pixel inline preview, so the hero is
 * never a bare navy rectangle waiting for a download.
 *
 * Under prefers-reduced-motion the extra slides are never mounted or fetched
 * at all. That is not only motion sensitivity, it is a large bandwidth saving
 * for anyone who has asked for less movement.
 */
export function Slideshow({
  images,
  controls = false,
  interval = 8000,
  className = "",
  scrim = "bg-linear-to-r from-deep from-25% via-deep/70 to-deep/20",
}: {
  images: string[];
  /** Slide buttons. Home hero only, page headers do not need them. */
  controls?: boolean;
  interval?: number;
  className?: string;
  scrim?: string;
}) {
  const [current, setCurrent] = useState(0);
  const [firstLoaded, setFirstLoaded] = useState(false);
  const [restMounted, setRestMounted] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const paused = useRef(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const apply = () => setReducedMotion(mq.matches);
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, []);

  // Bring in the remaining slides only once the first one is done and the
  // browser has nothing better to do.
  useEffect(() => {
    if (!firstLoaded || reducedMotion || images.length < 2) return;

    const w = window as Window &
      typeof globalThis & {
        requestIdleCallback?: (
          cb: () => void,
          o?: { timeout: number },
        ) => number;
        cancelIdleCallback?: (id: number) => void;
      };

    if (w.requestIdleCallback) {
      const id = w.requestIdleCallback(() => setRestMounted(true), {
        timeout: 2500,
      });
      return () => w.cancelIdleCallback?.(id);
    }
    const id = window.setTimeout(() => setRestMounted(true), 1200);
    return () => window.clearTimeout(id);
  }, [firstLoaded, reducedMotion, images.length]);

  // Advancing cannot start before the slides it would advance to exist.
  useEffect(() => {
    if (!restMounted || reducedMotion || images.length < 2) return;
    const timer = window.setInterval(() => {
      if (paused.current) return;
      setCurrent((n) => (n + 1) % images.length);
    }, interval);
    return () => window.clearInterval(timer);
  }, [restMounted, reducedMotion, images.length, interval]);

  if (images.length === 0) return null;

  const visible = restMounted ? images : images.slice(0, 1);

  return (
    <div
      className={`absolute inset-0 z-0 bg-deep ${className}`}
      onMouseEnter={() => (paused.current = true)}
      onMouseLeave={() => (paused.current = false)}
      onFocusCapture={() => (paused.current = true)}
      onBlurCapture={() => (paused.current = false)}
    >
      {visible.map((src, i) => (
        <div
          key={src}
          className={`absolute inset-0 ease-lux transition-opacity duration-[2200ms] ${
            current === i ? "z-10 opacity-100" : "z-0 opacity-0"
          }`}
        >
          <Image
            src={src}
            alt=""
            aria-hidden="true"
            fill
            sizes="100vw"
            priority={i === 0}
            placeholder={BLUR[src] ? "blur" : "empty"}
            blurDataURL={BLUR[src]}
            onLoad={i === 0 ? () => setFirstLoaded(true) : undefined}
            className="object-cover opacity-70 mix-blend-luminosity"
          />
        </div>
      ))}

      <div
        aria-hidden
        className={`pointer-events-none absolute inset-0 z-20 ${scrim}`}
      />

      {controls && images.length > 1 && (
        <div className="absolute bottom-6 left-1/2 z-30 flex -translate-x-1/2 gap-3">
          {images.map((_, i) => (
            <button
              key={i}
              type="button"
              aria-label={`Show slide ${i + 1} of ${images.length}`}
              onClick={() => {
                setRestMounted(true);
                setCurrent(i);
              }}
              className={`ease-lux h-1 w-12 transition-all duration-500 ${
                current === i ? "bg-brand-400" : "bg-white/30 hover:bg-white/50"
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
}

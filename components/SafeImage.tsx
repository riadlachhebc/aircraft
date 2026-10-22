"use client";

import { useState } from "react";
import Image from "next/image";

interface SafeImageProps {
  src: string;
  alt: string;
  categoryId?: string;
  className?: string;
  priority?: boolean;
  aspectRatio?: "video" | "16/10" | "square" | "4/3";
  fill?: boolean;
  width?: number;
  height?: number;
}

const CATEGORY_FALLBACK_MAP: Record<string, string> = {
  "air-conditioners": "/images/fallback-cooling.svg",
  "heating": "/images/fallback-heating.svg",
  "air-quality": "/images/fallback-air-quality.svg",
  "fans-air-circulators": "/images/fallback-airflow.svg",
  "energy-efficiency": "/images/fallback-energy.svg",
};

export function SafeImage({
  src,
  alt,
  categoryId,
  className = "",
  priority = false,
  aspectRatio = "16/10",
  fill = true,
  width,
  height,
}: SafeImageProps) {
  const [hasError, setHasError] = useState(false);

  const fallback =
    (categoryId && CATEGORY_FALLBACK_MAP[categoryId]) ||
    "/images/fallback-generic.svg";

  const resolvedSrc = hasError ? fallback : src || fallback;

  // If using fill mode (default inside responsive aspect-ratio container)
  if (fill) {
    return (
      <div className={`relative w-full h-full overflow-hidden bg-stone-100 ${className}`}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={resolvedSrc}
          alt={alt}
          loading={priority ? "eager" : "lazy"}
          decoding="async"
          onError={() => setHasError(true)}
          className={`h-full w-full object-cover transition duration-300 ${
            hasError ? "object-contain p-4 bg-stone-50" : ""
          }`}
        />
      </div>
    );
  }

  // Explicit dimensions mode
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={resolvedSrc}
      alt={alt}
      width={width || 600}
      height={height || 400}
      loading={priority ? "eager" : "lazy"}
      decoding="async"
      onError={() => setHasError(true)}
      className={`object-cover bg-stone-100 ${className}`}
    />
  );
}

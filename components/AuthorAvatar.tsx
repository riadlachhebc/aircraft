"use client";

import { useState } from "react";
import { User } from "lucide-react";

interface AuthorAvatarProps {
  src?: string;
  name: string;
  size?: "sm" | "md" | "lg";
  className?: string;
}

export function AuthorAvatar({
  src,
  name,
  size = "md",
  className = "",
}: AuthorAvatarProps) {
  const [hasError, setHasError] = useState(false);

  const dimensionClasses = {
    sm: "h-8 w-8 text-xs",
    md: "h-10 w-10 text-sm",
    lg: "h-16 w-16 text-base",
  }[size];

  const pixelDimensions = {
    sm: 32,
    md: 40,
    lg: 64,
  }[size];

  if (hasError || !src) {
    return (
      <div
        className={`${dimensionClasses} rounded-full bg-forest-900 text-white font-bold flex items-center justify-center border-2 border-black shrink-0 ${className}`}
        aria-label={name}
      >
        {name
          .split(" ")
          .map((n) => n[0])
          .join("")
          .slice(0, 2)
          .toUpperCase() || <User className="h-4 w-4" />}
      </div>
    );
  }

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt={name}
      width={pixelDimensions}
      height={pixelDimensions}
      loading="lazy"
      decoding="async"
      onError={() => setHasError(true)}
      className={`${dimensionClasses} rounded-full object-cover border-2 border-black shrink-0 ${className}`}
    />
  );
}

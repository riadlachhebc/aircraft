import Link from "next/link";
import Image from "next/image";

interface LogoProps {
  className?: string;
  variant?: "light" | "dark";
  height?: number;
  priority?: boolean;
}

export function Logo({
  className = "",
  variant = "dark",
  height = 40,
  priority = true,
}: LogoProps) {
  const isLight = variant === "light";
  const src = isLight ? "/logo-light.png" : "/logo.png";
  // The cropped official logo has aspect ratio 950 / 178 (~5.337)
  const calculatedWidth = Math.round(height * (950 / 178));

  return (
    <Link
      href="/"
      className={`inline-flex items-center transition-opacity hover:opacity-90 ${className}`}
      aria-label="Air Crafted Home - Evidence-Based Home Climate & Indoor Comfort"
    >
      <Image
        src={src}
        alt="Air Crafted Home"
        width={calculatedWidth}
        height={height}
        priority={priority}
        className="h-9 sm:h-10 w-auto object-contain"
      />
    </Link>
  );
}

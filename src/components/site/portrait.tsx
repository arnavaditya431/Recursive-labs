import { cn } from "@/lib/utils";

type PortraitProps = {
  src?: string;
  alt: string;
  name: string;
  className?: string;
  imageClassName?: string;
  grayscale?: boolean;
  lazy?: boolean;
};

function initials(name: string) {
  return name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

export function Portrait({
  src,
  alt,
  name,
  className,
  imageClassName,
  grayscale = false,
  lazy = true,
}: PortraitProps) {
  return (
    <div className={cn("relative overflow-hidden bg-secondary", className)}>
      {src ? (
        <img
          src={src}
          alt={alt}
          loading={lazy ? "lazy" : "eager"}
          decoding="async"
          className={cn(
            "h-full w-full object-cover transition-all duration-700",
            grayscale && "grayscale",
            imageClassName,
          )}
        />
      ) : (
        <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-secondary via-background to-primary/20">
          <span className="font-display text-5xl text-foreground/30 md:text-6xl">{initials(name)}</span>
        </div>
      )}
    </div>
  );
}

export function PortraitHero({
  src,
  alt,
  name,
  className,
}: {
  src?: string;
  alt: string;
  name: string;
  className?: string;
}) {
  return (
    <Portrait
      src={src}
      alt={alt}
      name={name}
      className={cn("aspect-[3/4] border hairline", className)}
      lazy={false}
    />
  );
}

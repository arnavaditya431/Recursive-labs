import { cn } from "@/lib/utils";

// Using the newly generated and uploaded image assets

export function LogoFull({ className, iconClassName, wordmarkClassName, ...props }: any) {
  return (
    <img 
      src="/logo-full.png" 
      alt="Recursive Lab" 
      className={cn("h-[30px] sm:h-[36px] md:h-[40px] lg:h-[48px] w-auto object-contain", className)}
      style={{ filter: "brightness(0)", opacity: 0.9 }}
      {...props}
    />
  );
}

export function LogoIcon({ className, ...props }: any) {
  return (
    <img 
      src="/logo-icon.png" 
      alt="Recursive Lab Icon" 
      className={cn("h-[30px] sm:h-[36px] md:h-[40px] lg:h-[48px] w-auto object-contain", className)}
      style={{ filter: "brightness(0)", opacity: 0.9 }}
      {...props}
    />
  );
}

export function LogoWordmark({ className, ...props }: any) {
  // We no longer have a standalone wordmark image, so we fall back to LogoFull 
  // or a visually hidden text if needed. For now, just render LogoFull.
  return <LogoFull className={className} {...props} />;
}

export function LogoLockup({ className, ...props }: any) {
  // Used in the splash screen
  return (
    <img 
      src="/logo-full.png" 
      alt="Recursive Lab" 
      className={cn("h-[48px] sm:h-[64px] md:h-[80px] lg:h-[96px] w-auto object-contain", className)}
      style={{ filter: "brightness(0)", opacity: 0.9 }}
      {...props}
    />
  );
}

export function LogoSvgAsset() {
  return null;
}

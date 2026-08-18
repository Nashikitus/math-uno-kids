"use client";

import * as React from "react";
import * as ProgressoPrimitive from "@radix-ui/react-progress";

import { cn } from "@/lib/utils";

const Progresso = React.forwardRef<
  React.ElementRef<typeof ProgressoPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof ProgressoPrimitive.Root>
>(({ className, value, ...props }, ref) => (
  <ProgressoPrimitive.Root
    ref={ref}
    className={cn("relative h-2 w-full overflow-hidden rounded-full bg-primary/20", className)}
    {...props}
  >
    <ProgressoPrimitive.Indicator
      className="h-full w-full flex-1 bg-primary transition-all"
      style={{ transform: `translateX(-${100 - (value || 0)}%)` }}
    />
  </ProgressoPrimitive.Root>
));
Progresso.displayName = ProgressoPrimitive.Root.displayName;

export { Progresso };

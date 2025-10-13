import { cn } from "@/lib/utils";
import React from "react";

const GradientText = React.forwardRef<
  HTMLSpanElement,
  {
    children: React.ReactNode;
    className?: string;
  }
>(({ children, className }, ref) => {
  return (
    <span
      ref={ref}
      className={cn(
        "bg-gradient-to-r from-primary to-primary/70 text-transparent bg-clip-text",
        className
      )}
    >
      {children}
    </span>
  );
});

GradientText.displayName = "GradientText";

export default GradientText;

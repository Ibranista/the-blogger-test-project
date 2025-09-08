import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cn } from "@/lib/utils";

export interface ContainerProps extends React.HTMLAttributes<HTMLElement> {
  as?: React.ElementType;
  children: React.ReactNode;
}

export function Container({
  as: Component = "div",
  className,
  children,
  ...props
}: ContainerProps) {
  return (
    <Component
      className={cn("min-h-screen bg-background flex flex-col", className)}
      {...props}
    >
      {children}
    </Component>
  );
}

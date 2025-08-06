import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

import { base_font } from "@/fonts/fonts";
import { cn } from "@/lib/utils";

// Define the typography variants using cva
const typographyVariants = cva("", {
  variants: {
    type: {
      title: "font-bold",
      sub: "text-muted-foreground",
    },
    size: {
      xs: "text-xs",
      sm: "text-sm",
      base: "text-base",
      lg: "text-lg",
      xl: "text-xl",
      "2xl": "text-2xl",
      "3xl": "text-3xl",
      "4xl": "text-4xl",
      "5xl": "text-5xl",
    },
    font: {
      base: base_font,
      // You can add more fonts here as needed, e.g.
      // inter: "font-inter",
      // fancy: "font-fancy",
    },
  },
  defaultVariants: {
    type: undefined,
    size: "base",
    font: "base",
  },
});

type TypographyProps<T extends React.ElementType = "p"> =
  React.ComponentPropsWithoutRef<T> &
    VariantProps<typeof typographyVariants> & {
      asChild?: boolean;
    };

export function Typography<T extends React.ElementType = "p">({
  className,
  asChild = false,
  type,
  size,
  font,
  ...props
}: TypographyProps<T>) {
  const Comp = asChild ? Slot : "p";

  return (
    <Comp
      className={cn(typographyVariants({ type, size, font }), className)}
      {...props}
    />
  );
}

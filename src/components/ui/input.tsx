import * as React from "react";

import { cn } from "@/lib/utils";

interface InputProps extends React.ComponentProps<"input"> {
  left?: React.ReactNode;
  right?: React.ReactNode;
  both?: React.ReactNode;
}

function Input(props: InputProps) {
  const { left, right, both, className, type, ...rest } = props;
  return (
    <div className="relative max-w-fit">
      <input
        type={type}
        data-slot="input"
        className={cn(
          "file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input flex h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
          "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
          "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
          {
            "pl-8": left || both,
            "pr-8": right || both,
          },
          className,
        )}
        {...rest}
      />
      {/* Left side */}
      {(left || both) && (
        <span
          style={{
            position: "absolute",
            left: "0.75rem",
            top: "50%",
            transform: "translateY(-50%)",
            pointerEvents: "none",
          }}
        >
          {left || both}
        </span>
      )}
      {/* Right side */}
      {(right || both) && (
        <span
          style={{
            position: "absolute",
            right: "0.75rem",
            top: "50%",
            transform: "translateY(-50%)",
            pointerEvents: "none",
          }}
        >
          {right || both}
        </span>
      )}
    </div>
  );
}

export { Input };

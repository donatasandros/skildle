import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-lg font-semibold shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2 disabled:pointer-events-none [&_svg]:pointer-events-none [&_svg]:shrink-0 border border-transparent",
  {
    variants: {
      variant: {
        primary:
          "bg-emerald-600 text-white hover:bg-emerald-700 disabled:border-gray-200 disabled:text-gray-400 disabled:bg-gray-100",
        secondary:
          "bg-white text-gray-700 hover:bg-gray-50 hover:text-gray-800 border-gray-300 disabled:border-gray-200 disabled:text-gray-400 disabled:bg-white",
      },
      size: {
        sm: "h-9 px-3 py-2 text-sm [&_svg]:size-5 gap-1",
        md: "h-10 py-2.5 px-3.5 text-sm [&_svg]:size-5 gap-1",
        lg: "h-11 py-2.5 px-4 text-base [&_svg]:size-5 gap-1.5",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };

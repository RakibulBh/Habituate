import React from "react";
import { cva, VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils"; // Assuming you have a cn utility for classnames
import { Slot } from "@radix-ui/react-slot";

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#5A4BE8] focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 dark:ring-offset-slate-950 dark:focus-visible:ring-[#5A4BE8]",
  {
    variants: {
      variant: {
        default:
          "bg-white text-[#5A4BE8] hover:bg-[#B8A8F9] dark:bg-slate-50 dark:text-slate-900 dark:hover:bg-slate-50/90",
        destructive:
          "bg-red-500 text-slate-50 hover:bg-red-600 dark:bg-red-900 dark:text-slate-50 dark:hover:bg-red-800",
        outline:
          "border border-[#5A4BE8] bg-white text-[#5A4BE8] hover:bg-[#B8A8F9] dark:border-slate-800 dark:bg-slate-950 dark:text-slate-50 dark:hover:bg-slate-800/90",
        secondary:
          "bg-[#3B3478] text-white hover:bg-[#5941A4] dark:bg-[#3B3478] dark:text-slate-50 dark:hover:bg-[#5941A4]/80",
        ghost:
          "bg-transparent text-[#5A4BE8] hover:bg-[#B8A8F9] dark:text-slate-50 dark:hover:bg-slate-800",
        link: "text-[#5A4BE8] underline-offset-4 hover:underline dark:text-slate-50",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
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
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };

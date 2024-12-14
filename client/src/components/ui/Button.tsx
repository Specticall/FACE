import { ReactNode } from "react";
import { VariantProps, cva } from "class-variance-authority";
import { cn } from "../../lib/utils";
import LoadingSpinner from "./LoadingSpinner";

const styles = cva(
  "cursor-pointer transition-all duration-200 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        primary:
          "bg-gradient-to-r from-[#E5FAFF] to-[#FFE1FA] px-8 py-3 text-slate-700 rounded-full hover:opacity-75",
        secondary:
          "border border-slate-300 px-10 py-2 rounded-full hover:bg-slate-50",
      },
    },
  }
);

type ButtonProps = React.HTMLAttributes<HTMLButtonElement> & {
  disabled?: boolean;
  children: ReactNode;
  isLoading?: boolean;
  variant?: VariantProps<typeof styles>["variant"];
};

export default function Button({
  disabled = false,
  children,
  variant = "primary",
  isLoading = false,
  className,
  ...props
}: ButtonProps) {
  return (
    <button
      {...props}
      className={cn(styles({ variant }), className)}
      disabled={disabled || isLoading}
    >
      {children}

      {/* Add your custom loading component here */}
      {isLoading && <LoadingSpinner size={"sm"} />}
    </button>
  );
}

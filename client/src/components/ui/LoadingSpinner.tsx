import { VariantProps, cva } from "class-variance-authority";
import { cn } from "../../lib/utils";

const styles = cva(
  //////// Your stlyes goes here ///////
  "aspect-square border-black border-b-transparent rounded-full inline-block box-border animate-spin",
  //////// Size Variants ///////
  {
    variants: {
      size: {
        sm: "border-[0.2rem] w-4",
        md: "border-4 w-8",
        lg: "border-8 w-12",
        "3xl": "border-[0.5rem] w-[4rem]",
        massive: "border-[0.75rem] w-[6rem]",
      },
      //////// Color Variants ///////
      color: {
        default: "#fff",
      },
    },
  }
);

//////// Prop Types /////////
type Props = {
  size: VariantProps<typeof styles>["size"];
  className?: string;
} & React.HTMLAttributes<HTMLSpanElement>;

export default function LoadingSpinner({
  size = "sm",
  className,
  ...props
}: Props) {
  return <span {...props} className={cn(styles({ size }), className)}></span>;
}

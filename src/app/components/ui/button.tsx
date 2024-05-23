import { ComponentPropsWithoutRef, ReactNode } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { default as NextLink, LinkProps as NextLinkProps } from "next/link";
import cn from "@/lib/clsx";

const buttonVariants = cva(
  "group inline-flex w-fit px-8 py-3 font-medium text-sm tracking-wider disabled:opacity-50 disabled:scale-100 transition-all duration-300 md:text-base",
  {
    variants: {
      variant: {
        default:
          "bg-white text-zinc-900 hover:bg-red-500 hover:text-zinc-900 disabled:bg-white disabled:text-black",
        success:
          "bg-green-500 text-white hover:bg-opacity-70 disabled:bg-opacity-50 disabled:text-black",
        delete:
          "bg-red-700 text-white hover:bg-opacity-70 disabled:bg-opacity-50 disabled:text-black",
      },
    },
  }
);

type ButtonVariantProps = VariantProps<typeof buttonVariants>;

interface ButtonProps
  extends ComponentPropsWithoutRef<"button">,
    ButtonVariantProps {
  children?: ReactNode;
}

interface LinkProps extends NextLinkProps, ButtonVariantProps {
  children?: ReactNode;
  className?: string;
}

export function Button({
  children,
  variant = "default",
  className,
  ...props
}: Readonly<ButtonProps>) {
  return (
    <button {...props} className={cn(buttonVariants({ variant }), className)}>
      {children}
    </button>
  );
}

export function Link({
  children,
  variant = "default",
  className,
  ...props
}: Readonly<LinkProps>) {
  return (
    <NextLink {...props} className={cn(buttonVariants({ variant }), className)}>
      {children}
    </NextLink>
  );
}

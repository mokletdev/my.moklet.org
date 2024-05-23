import cn from "@/lib/clsx";
import React, { ReactNode } from "react";

interface HeadingTextProps extends React.ComponentPropsWithoutRef<"h1"> {
  children?: ReactNode;
}

export function H1({
  children,
  className,
  ...props
}: Readonly<HeadingTextProps>) {
  return (
    <h1
      {...props}
      className={cn("text-4xl font-bold text-white md:text-7xl " + className)}
    >
      {children}
    </h1>
  );
}

export function H2({
  children,
  className,
  ...props
}: Readonly<HeadingTextProps>) {
  return (
    <h2
      {...props}
      className={cn(
        "text-3xl font-semibold text-white md:text-5xl " + className
      )}
    >
      {children}
    </h2>
  );
}

export function H3({
  children,
  className,
  ...props
}: Readonly<HeadingTextProps>) {
  return (
    <h3
      {...props}
      className={cn(
        "text-xl font-semibold text-white md:text-3xl " + className
      )}
    >
      {children}
    </h3>
  );
}

export function H4({
  children,
  className,
  ...props
}: Readonly<HeadingTextProps>) {
  return (
    <h4
      {...props}
      className={cn("text-lg font-semibold text-white md:text-xl " + className)}
    >
      {children}
    </h4>
  );
}

interface ParagraphProps extends React.ComponentPropsWithoutRef<"p"> {
  children?: ReactNode;
}

export function P({ children, className, ...props }: Readonly<ParagraphProps>) {
  return (
    <p
      {...props}
      className={cn("text-sm text-neutral-400 md:text-base " + className)}
    >
      {children}
    </p>
  );
}

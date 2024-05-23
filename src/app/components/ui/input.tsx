import cn from "@/lib/clsx";
import { cva, type VariantProps } from "class-variance-authority";
import { ComponentPropsWithoutRef } from "react";

const inputVariants = cva(
  "block w-full border border-neutral-400 p-2.5 text-sm focus:border-white focus:ring-white",
  {
    variants: {
      variant: {
        round: "rounded-full",
        normal: "rounded-lg",
      },
    },
  }
);

interface InputProps
  extends ComponentPropsWithoutRef<"input">,
    VariantProps<typeof inputVariants> {
  label: string;
}

export function Input({
  label,
  className,
  variant,
  ...props
}: Readonly<InputProps>) {
  return (
    <div className={cn("block my-1", className)}>
      <label
        htmlFor={props.name}
        className={cn("mb-2 block text-lg font-medium")}
      >
        {label}
      </label>
      <input className={cn(inputVariants({ variant }))} {...props} />
    </div>
  );
}

export function Checkbox({ label, className, ...props }: Readonly<InputProps>) {
  return (
    <label className="cursor-pointer my-1">
      <span className="text-lg font-medium text-gray-900">{label}</span>
      <input type="checkbox" {...props} className="sr-only peer" />
      <div className="ml-1 relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-neutral-600 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-500"></div>
    </label>
  );
}

interface SelectProps extends ComponentPropsWithoutRef<"select"> {
  label: string;
  options: { value: string; label: string }[];
}

export function Select({
  label,
  options,
  className,
  ...props
}: Readonly<SelectProps>) {
  return (
    <div className={cn("block my-1")}>
      <label
        htmlFor={props.name}
        className={cn("mb-2 block text-lg font-medium")}
      >
        {label}
      </label>
      <select className={cn("", className)} {...props}>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}

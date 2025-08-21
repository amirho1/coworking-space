import { Icon } from "@iconify/react/dist/iconify.js";
import { cva } from "class-variance-authority";
import { HTMLAttributes } from "react";

export type Colors = "default" | "purple" | "indigo" | "orange" | "green" | "blue";

export interface IconContainerProps extends HTMLAttributes<HTMLDivElement> {
  icon: string;
  color: Colors;
}

const iconContainerVariants = cva("flex items-center justify-center w-10 h-10  rounded-lg", {
  variants: {
    color: {
      purple: "bg-purple-100 text-purple-600",
      default: "bg-gray-100 text-gray-600",
      indigo: "bg-indigo-100 text-indigo-600",
      orange: "bg-orange-100 text-orange-600",
      green: "bg-green-100 text-green-600",
      blue: "bg-blue-100 text-blue-600",
    },
    size: {
      default: "w-5 h-5",
      sm: "w-3 h-3",
      lg: "w-7 h-7",
    },
  },
  defaultVariants: {
    color: "default",
    size: "default",
  },
});

export default function IconContainer({ icon, color, ...props }: IconContainerProps) {
  return (
    <div className={iconContainerVariants({ color })} {...props}>
      <Icon icon={icon} className={`w-5 h-5`} color={color} />
    </div>
  );
}

"use client";

import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";
import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "premium" | "danger" | "ghost" | "outline" | "secondary";
  size?: "default" | "lg" | "sm";
  isLoading?: boolean;
  icon?: React.ElementType;
}

const Button: React.FC<ButtonProps> = ({
  children,
  className,
  variant = "default",
  size = "default",
  isLoading = false,
  disabled,
  icon: Icon,
  ...props
}) => {
  const baseStyles =
    "inline-flex items-center justify-center whitespace-nowrap rounded-lg text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 active:scale-[0.98]";

  const variants = {
    default:
      "bg-white text-black hover:bg-neutral-200 shadow-lg shadow-white/10 border border-transparent",
    premium:
      "relative bg-gradient-to-b from-blue-700 to-blue-900 border border-blue-600 text-white overflow-hidden shadow-[0_0_20px_-5px_rgba(59,130,246,0.5)] hover:shadow-[0_0_25px_-5px_rgba(59,130,246,0.8)] hover:border-blue-500",
    danger:
      "bg-red-700 text-white hover:bg-red-800 border border-red-600 shadow-lg shadow-red-700/30",
    ghost:
      "bg-transparent text-white hover:bg-white/10 border border-transparent",
    outline:
      "bg-transparent text-white border border-white/20 hover:bg-white/10 hover:border-white/40",
    secondary:
      "relative bg-gradient-to-b from-gray-700 to-gray-800 border border-gray-600 text-white overflow-hidden shadow-[0_0_10px_-3px_rgba(255,255,255,0.3)] hover:shadow-[0_0_15px_-3px_rgba(255,255,255,0.5)] hover:border-gray-500",
  };

  const sizes = {
    default: "h-10 px-5 py-2",
    lg: "h-12 rounded-lg px-8 text-base",
    sm: "h-8 px-3 text-xs",
  };

  return (
    <button
      className={cn(
        baseStyles,
        variants[variant],
        sizes[size],
        isLoading && "opacity-80 cursor-wait",
        className
      )}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
      {!isLoading && Icon && <Icon className="mr-2 h-4 w-4" />}

      {/* Premium shine effect */}
      {(variant === "premium" || variant === "secondary") && !isLoading && (
        <div className="absolute inset-0 flex h-full w-full justify-center transform-[skew(-12deg)_translateX(-100%)] transition-all duration-700 hover:translate-x-full">
          <div
            className={cn(
              "relative h-full w-8",
              variant === "premium" ? "bg-white/20" : "bg-white/10"
            )}
          />
        </div>
      )}

      {children}
    </button>
  );
};

export default Button;

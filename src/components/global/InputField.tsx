import { cn } from "@/lib/utils";
import React from "react";
import { FieldError } from "react-hook-form";

interface InputFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  icon: React.ElementType;
  error?: FieldError;
}

const InputField = React.forwardRef<HTMLInputElement, InputFieldProps>(
  ({ icon: Icon, className, error, ...props }, ref) => (
    <div className="w-full">
      <div
        className={cn(
          "flex items-center rounded-lg border bg-neutral-900/50 focus-within:ring-1 transition-all",
          error
            ? "border-red-500/50 focus-within:border-red-500 focus-within:ring-red-500"
            : "border-neutral-700 focus-within:border-blue-500 focus-within:ring-blue-500"
        )}
      >
        <Icon
          className={cn(
            "ml-4 h-4 w-4",
            error ? "text-red-400" : "text-neutral-500"
          )}
        />
        <input
          ref={ref}
          className={cn(
            "w-full bg-transparent p-3 text-sm text-white placeholder-neutral-500 focus:outline-none",
            className
          )}
          {...props}
        />
      </div>
      {error && (
        <span className="text-xs text-red-400 mt-1 ml-1 animate-in fade-in slide-in-from-top-1">
          {error.message}
        </span>
      )}
    </div>
  )
);
InputField.displayName = "InputField";

export default InputField;
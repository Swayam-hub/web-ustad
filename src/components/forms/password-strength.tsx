"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import {
  getStrengthColor,
  getStrengthLabel,
  passwordChecks,
} from "@/lib/utils/password";
import { Check } from "lucide-react";

interface PasswordStrengthMeterProps {
  password?: string;
}

const PasswordStrengthMeter = ({ password }: PasswordStrengthMeterProps) => {
  if (!password) return null;

  const checks = passwordChecks(password);
  const strengthScore = checks.filter((c) => c.met).length;

  const glowShadow =
    strengthScore === 1
      ? "shadow-[0_0_12px_rgba(255,0,0,0.6)]"
      : strengthScore === 2
      ? "shadow-[0_0_12px_rgba(255,128,0,0.6)]"
      : strengthScore === 3
      ? "shadow-[0_0_12px_rgba(255,255,0,0.6)]"
      : "shadow-[0_0_14px_rgba(0,255,128,0.6)]";

  return (
    <motion.div
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
      className="w-full space-y-3 mt-3"
    >
      {/* Title */}
      <div className="flex justify-between items-center">
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1, ease: "easeOut" }}
          className="text-xs text-neutral-500"
        >
          Password Strength
        </motion.span>

        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.15, ease: "easeOut" }}
          className={cn(
            "text-xs font-medium",
            strengthScore <= 1
              ? "text-red-400"
              : strengthScore === 2
              ? "text-orange-400"
              : strengthScore === 3
              ? "text-yellow-400"
              : "text-green-400"
          )}
        >
          {getStrengthLabel(strengthScore)}
        </motion.span>
      </div>

      {/* Strength Bars */}
      <div className="relative w-full h-2 bg-neutral-900 rounded-full overflow-hidden flex gap-1">
        {[0, 1, 2, 3].map((i) => {
          const active = i < strengthScore;
          return (
            <motion.div
              key={i}
              className={cn(
                "h-full flex-1 rounded-full origin-left",
                active ? getStrengthColor(strengthScore) : "bg-neutral-800",
                active && glowShadow
              )}
              initial={{ scaleX: 0, opacity: 0.3 }}
              animate={{
                scaleX: 1,
                opacity: 1,
                transition: {
                  delay: i * 0.07,
                  duration: 0.35,
                  ease: "easeOut",
                },
              }}
            />
          );
        })}

        {/* Glow Sweep */}
        {strengthScore > 0 && (
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: "100%" }}
            transition={{
              repeat: Infinity,
              duration: 2,
              ease: "linear",
            }}
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent pointer-events-none"
          />
        )}
      </div>

      {/* Checklist */}
      <div className="grid grid-cols-2 gap-y-1 mt-2">
        {checks.map((check, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -6 }}
            animate={{
              opacity: 1,
              x: 0,
              transition: {
                delay: 0.25 + i * 0.05,
                duration: 0.25,
                ease: "easeOut",
              },
            }}
            className="flex items-center gap-2"
          >
            {check.met ? (
              <Check className="h-3.5 w-3.5 text-green-500" />
            ) : (
              <div className="h-1.5 w-1.5 rounded-full bg-neutral-600 ml-[6px]" />
            )}

            <span
              className={cn(
                "text-[11px] tracking-tight",
                check.met ? "text-neutral-300" : "text-neutral-600"
              )}
            >
              {check.label}
            </span>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default PasswordStrengthMeter;

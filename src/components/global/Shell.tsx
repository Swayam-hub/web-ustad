"use client";

import { useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

const movingDotsStyles = `
@keyframes dot-pan {
  0% { background-position: 0 0; }
  100% { background-position: 128px 128px; }
}
`;

export default function ClientShell({
  children,
}: {
  children: React.ReactNode;
}) {
  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      const card = document.getElementById("agency-card");
      if (!card) return;

      const rect = card.getBoundingClientRect();
      card.style.setProperty("--mouse-x", `${e.clientX - rect.left}px`);
      card.style.setProperty("--mouse-y", `${e.clientY - rect.top}px`);
    },
    []
  );

  return (
    <div
      onMouseMove={handleMouseMove}
      className="relative min-h-screen overflow-hidden bg-black selection:bg-blue-500/30"
    >
      <style>{movingDotsStyles}</style>

      {/* Ambient Background */}
      <div className="pointer-events-none fixed inset-0 z-0">
        <div className="absolute -top-40 -left-40 h-[500px] w-[500px] rounded-full bg-blue-900/20 blur-[160px]" />
        <div className="absolute -bottom-40 -right-40 h-[500px] w-[500px] rounded-full bg-purple-900/20 blur-[160px]" />

        {/* Moving dots */}
        <div
          className="absolute inset-0 opacity-[0.12]"
          style={{
            backgroundImage:
              "radial-gradient(rgba(255,255,255,0.4) 1px, transparent 1px)",
            backgroundSize: "32px 32px",
            animation: "dot-pan 40s linear infinite",
            maskImage:
              "radial-gradient(ellipse at center, black 45%, transparent 75%)",
            WebkitMaskImage:
              "radial-gradient(ellipse at center, black 45%, transparent 75%)",
          }}
        />

        {/* Grain */}
        <div
          className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 flex min-h-screen flex-col items-center justify-center px-4">
        {/* Brand */}
        {/* <header className="mb-10 flex items-center gap-2">
          <div className="h-9 w-9 rounded-lg bg-linear-to-br from-white to-neutral-400" />
          <span className="text-2xl font-bold tracking-tight">
            Agency<span className="text-neutral-500">Suite</span>
          </span>
        </header> */}

        {/* Page Transition */}
        <AnimatePresence mode="wait">
          <motion.div
            key={Math.random()}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            className="w-full flex justify-center"
          >
            {children}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

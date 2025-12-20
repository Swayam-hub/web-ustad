"use client";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

const BentoCard= ({ title, description, className, children }: any) => {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      className={`relative overflow-hidden rounded-3xl border border-white/10 bg-zinc-900/50 p-8 backdrop-blur-md ${className}`}
    >
      <div className="relative z-10">
        <h3 className="text-xl font-semibold text-white">{title}</h3>
        <p className="mt-2 text-sm text-gray-400">{description}</p>
      </div>
      <div className="mt-8">{children}</div>
      {/* Subtle Gradient Glow */}
      <div className="absolute -right-10 -top-10 h-32 w-32 bg-purple-500/10 blur-[50px]" />
    </motion.div>
  );
};

export function FeatureGrid() {
  return (
    <section className="py-24 px-6 max-w-7xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 auto-rows-[300px]">
        {/* Large Feature: Website Builder */}
        <BentoCard 
          title="Pixel-Perfect Builder" 
          description="Drag, drop, and deploy. No code, just pure creative freedom."
          className="md:col-span-8 md:row-span-2"
        >
          <div className="relative h-full w-full bg-gradient-to-br from-indigo-500/20 to-transparent rounded-xl border border-white/5 overflow-hidden">
             {/* Mock UI elements here */}
             <div className="absolute top-10 left-10 w-40 h-12 bg-white/10 rounded-lg animate-pulse" />
             <div className="absolute bottom-10 right-10 w-64 h-32 bg-indigo-500/20 rounded-lg border border-indigo-500/30" />
          </div>
        </BentoCard>

        {/* Medium Feature: AI Copywriter */}
        <BentoCard 
          title="AI Marketing Suite" 
          description="Generate high-converting copy in seconds."
          className="md:col-span-4 md:row-span-1"
        />

        {/* Medium Feature: Real-time Analytics */}
        <BentoCard 
          title="Live Analytics" 
          description="Watch your funnel work in real-time."
          className="md:col-span-4 md:row-span-1"
        />
      </div>
    </section>
  );
}
"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export default function Hero() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  // Perspective tilt for the product preview as you scroll
  const rotateX = useTransform(scrollYProgress, [0, 1], [0, 45]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.8]);

  return (
    <section ref={containerRef} className="relative min-h-[150vh] bg-black text-white">
      {/* 1. Kinetic Background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-purple-900/20 via-black to-black" />

      {/* 2. Hero Content */}
      <div className="pt-32 flex flex-col items-center text-center px-6">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-6xl md:text-8xl font-bold tracking-tighter bg-gradient-to-b from-white to-gray-500 bg-clip-text text-transparent"
        >
          Build. Market. <br /> Scale at lightspeed.
        </motion.h1>
        
        <p className="mt-6 text-gray-400 max-w-2xl text-lg md:text-xl">
          The only platform that merges a high-end website builder with an 
          intelligent CRM. Stop duct-taping your marketing stack.
        </p>

        {/* 3. The "No Loose Ends" Product Preview */}
        <motion.div 
          style={{ rotateX, scale, perspective: "1000px" }}
          className="mt-16 w-full max-w-6xl border border-white/10 rounded-2xl bg-zinc-900/50 backdrop-blur-xl overflow-hidden shadow-2xl"
        >
          {/* Mockup of your Website Builder Interface */}
          <div className="h-[500px] w-full bg-zinc-950 flex">
             <aside className="w-64 border-r border-white/5 p-4 hidden md:block">
                <div className="h-4 w-32 bg-white/10 rounded mb-4" />
                <div className="space-y-2">
                   {[1,2,3,4].map(i => <div key={i} className="h-8 w-full bg-white/5 rounded" />)}
                </div>
             </aside>
             <div className="flex-1 p-8">
                <div className="w-full h-full border-2 border-dashed border-white/10 rounded-xl flex items-center justify-center">
                   <span className="text-white/20 font-mono italic">Drag components here...</span>
                </div>
             </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
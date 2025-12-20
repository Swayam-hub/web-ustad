"use client";
import { motion } from "framer-motion";

const stages = ["Visitor", "Lead", "Qualified", "Customer"];

export function CRMPreview() {
  return (
    <section className="py-24 bg-zinc-950 overflow-hidden">
      <div className="max-w-5xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-white mb-4">Turn Traffic into Revenue</h2>
          <p className="text-gray-400">Our CRM tracks every click and automates the follow-up.</p>
        </div>

        <div className="relative flex justify-between items-center py-20 border-y border-white/5">
          {/* Animated Flow Lines */}
          <svg className="absolute inset-0 w-full h-full">
            <motion.path
              d="M 100 100 Q 400 50 800 100"
              fill="none"
              stroke="url(#gradient)"
              strokeWidth="2"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            />
            <defs>
              <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#818cf8" stopOpacity="0" />
                <stop offset="50%" stopColor="#818cf8" stopOpacity="1" />
                <stop offset="100%" stopColor="#818cf8" stopOpacity="0" />
              </linearGradient>
            </defs>
          </svg>

          {stages.map((stage, i) => (
            <motion.div 
              key={stage}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.2 }}
              className="relative z-10 flex flex-col items-center"
            >
              <div className="h-16 w-16 rounded-2xl bg-zinc-900 border border-white/10 flex items-center justify-center shadow-xl mb-4">
                 <div className="h-2 w-2 rounded-full bg-indigo-500 animate-ping" />
              </div>
              <span className="text-sm font-medium text-gray-300">{stage}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
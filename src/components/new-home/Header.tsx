"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Layout, BarChart3, Zap, ChevronDown } from "lucide-react";

const MENU_ITEMS = [
  { 
    title: "Product", 
    content: [
      { name: "Website Builder", icon: <Layout className="w-4 h-4" /> },
      { name: "Marketing CRM", icon: <BarChart3 className="w-4 h-4" /> },
      { name: "AI Automations", icon: <Zap className="w-4 h-4" /> }
    ] 
  },
  { title: "Resources" },
  { title: "Pricing" }
];

export function Navbar() {
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <nav className="fixed top-0 left-0 right-0 z-[100] flex justify-center p-6">
      <motion.div 
        className="flex items-center gap-8 px-6 py-3 bg-zinc-900/50 backdrop-blur-2xl border border-white/10 rounded-full"
        onMouseLeave={() => setHovered(null)}
      >
        <div className="text-white font-bold text-lg mr-4">LUMINA</div>

        <div className="flex gap-2">
          {MENU_ITEMS.map((item, i) => (
            <div 
              key={item.title} 
              onMouseEnter={() => setHovered(i)}
              className="relative px-4 py-2 text-sm text-gray-400 hover:text-white cursor-pointer transition-colors"
            >
              <div className="flex items-center gap-1">
                {item.title} {item.content && <ChevronDown className="w-3 h-3" />}
              </div>

              {/* Hover Highlight Pill */}
              {hovered === i && (
                <motion.div 
                  layoutId="nav-pill"
                  className="absolute inset-0 bg-white/5 rounded-full -z-10"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}

              {/* Mega Menu Dropdown */}
              <AnimatePresence>
                {hovered === i && item.content && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    className="absolute top-full left-0 mt-4 w-64 bg-zinc-900 border border-white/10 rounded-2xl p-4 shadow-2xl"
                  >
                    <div className="grid gap-2">
                      {item.content.map(sub => (
                        <div key={sub.name} className="flex items-center gap-3 p-3 hover:bg-white/5 rounded-xl transition-colors group">
                          <div className="text-indigo-400 group-hover:text-white transition-colors">{sub.icon}</div>
                          <span className="text-gray-300 font-medium">{sub.name}</span>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>

        <div className="flex items-center gap-4 ml-4">
          <button className="text-sm text-gray-400 hover:text-white">Login</button>
          <button className="bg-white text-black text-sm px-5 py-2 rounded-full font-bold hover:bg-gray-200 transition-all">
            Get Started
          </button>
        </div>
      </motion.div>
    </nav>
  );
}
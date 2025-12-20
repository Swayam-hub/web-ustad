"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MousePointer2, Users, Zap, CheckCircle } from "lucide-react";

export default function SideBySideDemo() {
  const [leads, setLeads] = useState([
    { id: 1, name: "Alex River", action: "Viewed Pricing", time: "2m ago" },
    { id: 2, name: "Sarah Chen", action: "Signed Up", time: "Just now" },
  ]);
  const [isTyping, setIsTyping] = useState(false);

  // Simulate a lead coming in when user "builds" a form
  const simulateLead = () => {
    const newLead = {
      id: Date.now(),
      name: "New Visitor",
      action: "Form Captured",
      time: "Just now",
    };
    setLeads([newLead, ...leads.slice(0, 3)]);
  };

  return (
    <section className="py-20 bg-black overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Section Header */}
        <div className="mb-12">
          <span className="text-indigo-500 font-mono text-sm tracking-widest uppercase">Integration</span>
          <h2 className="text-4xl font-bold text-white mt-2">Zero Latency Marketing.</h2>
          <p className="text-gray-400 mt-4 max-w-xl">
            Watch your CRM update the millisecond a visitor interacts with your site. 
            No webhooks, no plugins, no delays.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 h-[600px]">
          
          {/* LEFT: THE WEBSITE BUILDER CANVAS */}
          <div className="relative group rounded-3xl border border-white/10 bg-zinc-900/30 p-1 overflow-hidden">
            <div className="absolute top-4 left-6 flex gap-2 z-20">
              <div className="w-3 h-3 rounded-full bg-red-500/20" />
              <div className="w-3 h-3 rounded-full bg-yellow-500/20" />
              <div className="w-3 h-3 rounded-full bg-green-500/20" />
            </div>
            
            <div className="h-full w-full bg-zinc-950 rounded-[22px] p-8 pt-16 flex flex-col items-center justify-center relative">
              <div className="w-full max-w-md space-y-6">
                <div className="space-y-2">
                  <div className="h-4 w-24 bg-white/10 rounded" />
                  <div className="h-12 w-full bg-white/5 border border-white/10 rounded-xl px-4 flex items-center text-gray-500 italic">
                    <MousePointer2 className="w-4 h-4 mr-2 text-indigo-500" />
                    Enter headline...
                  </div>
                </div>
                
                {/* The Interactive Form */}
                <div className="p-6 rounded-2xl border border-indigo-500/30 bg-indigo-500/5 space-y-4">
                  <h4 className="text-white font-medium">Newsletter Component</h4>
                  <input 
                    type="text" 
                    placeholder="your@email.com"
                    className="w-full bg-black border border-white/10 rounded-lg p-3 text-sm text-white outline-none focus:border-indigo-500 transition-colors"
                    onFocus={() => setIsTyping(true)}
                  />
                  <button 
                    onClick={simulateLead}
                    className="w-full py-3 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg font-semibold transition-all active:scale-95"
                  >
                    Publish & Test
                  </button>
                </div>
              </div>

              {/* Decorative Floating Elements */}
              <motion.div 
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity }}
                className="absolute top-20 right-10 p-3 bg-zinc-800 border border-white/10 rounded-xl shadow-2xl"
              >
                <Zap className="text-yellow-500 w-5 h-5" />
              </motion.div>
            </div>
          </div>

          {/* RIGHT: THE CRM REAL-TIME FEED */}
          <div className="rounded-3xl border border-white/10 bg-zinc-900/30 p-8 flex flex-col">
            <div className="flex justify-between items-center mb-8">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-indigo-500/20 rounded-lg">
                  <Users className="text-indigo-400 w-5 h-5" />
                </div>
                <h3 className="text-xl font-bold text-white">Live Lead Stream</h3>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                <span className="text-xs text-green-500 font-mono">LIVE</span>
              </div>
            </div>

            <div className="flex-1 space-y-4 overflow-hidden relative">
              <AnimatePresence mode="popLayout">
                {leads.map((lead) => (
                  <motion.div
                    key={lead.id}
                    layout
                    initial={{ opacity: 0, x: 20, scale: 0.95 }}
                    animate={{ opacity: 1, x: 0, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="p-4 rounded-2xl bg-white/5 border border-white/5 flex items-center justify-between group hover:border-indigo-500/50 transition-colors"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-500 flex items-center justify-center text-white font-bold text-xs">
                        {lead.name[0]}
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-white">{lead.name}</p>
                        <p className="text-xs text-gray-500">{lead.action}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-[10px] text-gray-600 font-mono mb-1">{lead.time}</p>
                      <CheckCircle className="w-4 h-4 text-green-500 opacity-0 group-hover:opacity-100 transition-opacity ml-auto" />
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>

              {/* Fading bottom mask */}
              <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-zinc-950/50 to-transparent pointer-events-none" />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
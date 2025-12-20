"use client";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Check, Zap } from "lucide-react";
import { useState } from "react";

const plans = [
  { name: "Starter", price: "$0", features: ["3 Projects", "Basic CRM", "Standard Hosting"] },
  { name: "Pro", price: "$49", features: ["Unlimited Projects", "Advanced CRM", "AI Copywriter", "Custom Domains"], recommended: true },
  { name: "Enterprise", price: "Custom", features: ["White-label", "API Access", "Dedicated Support"] },
];

export function Pricing() {
  const [billingCycle, setBillingCycle] = useState("monthly");

  return (
    <section className="py-24 bg-black relative">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          {/* Toggle Switch */}
          <div className="inline-flex items-center p-1 bg-zinc-900 border border-white/10 rounded-full mb-8">
            {["monthly", "yearly"].map((cycle) => (
              <button
                key={cycle}
                onClick={() => setBillingCycle(cycle)}
                className={`px-6 py-2 rounded-full text-sm font-medium transition-all relative ${
                  billingCycle === cycle ? "text-white" : "text-gray-500"
                }`}
              >
                {billingCycle === cycle && (
                  <motion.div layoutId="pill" className="absolute inset-0 bg-indigo-600 rounded-full" />
                )}
                <span className="relative z-10 capitalize">{cycle}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan, i) => (
            <PriceCard key={i} plan={plan} />
          ))}
        </div>
      </div>
    </section>
  );
}

function PriceCard({ plan }: any) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      className={`relative group p-8 rounded-3xl border ${
        plan.recommended ? "border-indigo-500/50 bg-zinc-900/50" : "border-white/10 bg-zinc-950"
      } overflow-hidden`}
    >
      {/* Spotlight Effect */}
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{
          background: useTransform(
            [mouseX, mouseY],
            ([x, y]) => `radial-gradient(600px circle at ${x}px ${y}px, rgba(99, 102, 241, 0.15), transparent 40%)`
          ),
        }}
      />

      <div className="relative z-10">
        <h3 className="text-gray-400 font-medium uppercase tracking-widest text-xs">{plan.name}</h3>
        <div className="mt-4 flex items-baseline">
          <span className="text-5xl font-bold text-white">{plan.price}</span>
          {plan.price !== "Custom" && <span className="text-gray-500 ml-2">/mo</span>}
        </div>
        
        <ul className="mt-8 space-y-4">
          {plan.features.map((f: string) => (
            <li key={f} className="flex items-center text-gray-300 text-sm">
              <Check className="w-4 h-4 mr-3 text-indigo-500" /> {f}
            </li>
          ))}
        </ul>

        <button className={`mt-10 w-full py-4 rounded-xl font-bold transition-all ${
          plan.recommended ? "bg-indigo-600 text-white hover:bg-indigo-500" : "bg-white text-black hover:bg-gray-200"
        }`}>
          Get Started
        </button>
      </div>
    </motion.div>
  );
}
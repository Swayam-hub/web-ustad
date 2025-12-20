"use client";
import { motion } from "framer-motion";

export function Footer1() {
  return (
    <footer className="relative bg-black pt-40 pb-20 overflow-hidden border-t border-white/5">
      {/* The Orbit Background */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[1000px]">
        {[1, 2, 3].map((circle, i) => (
          <motion.div
            key={i}
            initial={{ rotate: 0 }}
            animate={{ rotate: 360 }}
            transition={{ duration: 20 + i * 10, repeat: Infinity, ease: "linear" }}
            className="absolute inset-0 border border-white/5 rounded-full"
            style={{ margin: i * 100 }}
          >
            {/* Orbiting Particles */}
            <div className={`absolute top-0 left-1/2 h-2 w-2 rounded-full bg-indigo-500/40 shadow-[0_0_15px_rgba(99,102,241,0.5)]`} />
          </motion.div>
        ))}
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-5xl md:text-7xl font-bold text-white mb-8 tracking-tighter">
            Ready to evolve?
          </h2>
          <div className="flex flex-col md:flex-row justify-center items-center gap-4">
            <input 
              type="email" 
              placeholder="Enter your work email" 
              className="w-full md:w-80 bg-zinc-900 border border-white/10 px-6 py-4 rounded-2xl text-white outline-none focus:border-indigo-500 transition-all"
            />
            <button className="bg-indigo-600 text-white px-8 py-4 rounded-2xl font-bold hover:bg-indigo-500 transition-all shadow-[0_0_30px_rgba(99,102,241,0.3)]">
              Build Your Site
            </button>
          </div>
        </motion.div>

        {/* Traditional Links with Premium Styling */}
        <div className="mt-40 grid grid-cols-2 md:grid-cols-4 gap-12 text-left pt-20 border-t border-white/5">
          <div className="col-span-2 md:col-span-1">
             <div className="text-white font-bold text-xl mb-4">Lumina CRM</div>
             <p className="text-gray-500 text-sm">Building the future of marketing automation.</p>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-6">Product</h4>
            <ul className="space-y-4 text-sm text-gray-500">
              <li className="hover:text-indigo-400 cursor-pointer transition-colors">Website Builder</li>
              <li className="hover:text-indigo-400 cursor-pointer transition-colors">Marketing CRM</li>
              <li className="hover:text-indigo-400 cursor-pointer transition-colors">AI Content</li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-6">Company</h4>
            <ul className="space-y-4 text-sm text-gray-500">
              <li className="hover:text-indigo-400 cursor-pointer transition-colors">Changelog</li>
              <li className="hover:text-indigo-400 cursor-pointer transition-colors">Careers</li>
              <li className="hover:text-indigo-400 cursor-pointer transition-colors">Privacy</li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-6">Social</h4>
            <div className="flex gap-4">
              <div className="w-10 h-10 rounded-full bg-zinc-900 border border-white/10 flex items-center justify-center hover:bg-white hover:text-black transition-all cursor-pointer">X</div>
              <div className="w-10 h-10 rounded-full bg-zinc-900 border border-white/10 flex items-center justify-center hover:bg-white hover:text-black transition-all cursor-pointer">Li</div>
            </div>
          </div>
        </div>
        
        <div className="mt-20 text-center text-gray-600 text-xs">
          © 2025 Lumina Technologies Inc. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
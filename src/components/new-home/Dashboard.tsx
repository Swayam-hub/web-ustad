"use client";
import { motion } from "framer-motion";
import { Plus, Search, Bell, BarChart2, Globe, Users } from "lucide-react";

export function Dashboard() {
  return (
    <div className="min-h-screen bg-black flex text-zinc-400">
      
      {/* 1. Glass Sidebar */}
      <aside className="w-64 border-r border-white/5 p-6 flex flex-col gap-8">
        <div className="text-white font-bold text-xl tracking-tighter">LUMINA</div>
        <button className="flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white p-3 rounded-xl transition-all shadow-lg shadow-indigo-500/20">
          <Plus className="w-4 h-4" /> <span className="text-sm font-semibold">New Project</span>
        </button>
        
        <nav className="space-y-1">
          {[
            { icon: <Globe className="w-4 h-4" />, label: "Websites" },
            { icon: <Users className="w-4 h-4" />, label: "CRM Leads" },
            { icon: <BarChart2 className="w-4 h-4" />, label: "Analytics" },
          ].map((item) => (
            <div key={item.label} className="flex items-center gap-3 p-3 hover:bg-white/5 rounded-lg hover:text-white cursor-pointer transition-all">
              {item.icon} <span className="text-sm font-medium">{item.label}</span>
            </div>
          ))}
        </nav>
      </aside>

      {/* 2. Main Content Area */}
      <main className="flex-1 flex flex-col">
        {/* Header bar */}
        <header className="h-16 border-b border-white/5 flex items-center justify-between px-8">
          <div className="flex items-center gap-2 text-sm">
            <span>Workspace</span> <span className="text-zinc-600">/</span> <span className="text-white">Main Dashboard</span>
          </div>
          <div className="flex items-center gap-4">
            <Search className="w-4 h-4" />
            <Bell className="w-4 h-4" />
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 border border-white/20" />
          </div>
        </header>

        {/* Dashboard Grid */}
        <section className="p-8 space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <MetricCard title="Total Leads" value="1,284" change="+12.5%" />
            <MetricCard title="Active Visitors" value="42" change="Live" live />
            <MetricCard title="Conversion Rate" value="3.4%" change="-0.8%" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Website Preview Card */}
            <div className="bg-zinc-900/50 border border-white/5 rounded-2xl p-6 h-[400px] relative overflow-hidden group">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-white font-semibold">Active Builder</h3>
                <button className="text-xs bg-white/5 px-3 py-1 rounded-md hover:bg-white/10">Edit Site</button>
              </div>
              <div className="h-full w-full bg-black rounded-t-xl border-x border-t border-white/10 p-4 transition-transform group-hover:scale-105">
                 <div className="h-4 w-1/3 bg-white/10 rounded mb-4" />
                 <div className="h-32 w-full bg-indigo-500/5 rounded-lg border border-dashed border-indigo-500/20" />
              </div>
            </div>

            {/* CRM Feed Card */}
            <div className="bg-zinc-900/50 border border-white/5 rounded-2xl p-6 h-[400px]">
              <h3 className="text-white font-semibold mb-6">Lead Activity</h3>
              <div className="space-y-4">
                {[1, 2, 3, 4].map(i => (
                  <motion.div 
                    key={i} 
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="flex items-center gap-4 p-3 border-b border-white/5 last:border-0"
                  >
                    <div className="w-2 h-2 rounded-full bg-indigo-500" />
                    <div className="text-sm">New Lead from <span className="text-white">Form-1</span></div>
                    <div className="ml-auto text-[10px] text-zinc-600">2m ago</div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

function MetricCard({ title, value, change, live }: any) {
  return (
    <div className="bg-zinc-900/50 border border-white/5 rounded-2xl p-6">
      <div className="text-xs font-medium text-zinc-500 uppercase tracking-wider">{title}</div>
      <div className="mt-2 flex items-baseline justify-between">
        <div className="text-3xl font-bold text-white">{value}</div>
        <div className={`text-xs font-mono ${live ? "text-green-500 animate-pulse" : "text-indigo-400"}`}>
          {change}
        </div>
      </div>
    </div>
  );
}
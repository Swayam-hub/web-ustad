import { cn } from "@/lib/utils";

interface BentoCardProps {
  children: React.ReactNode;
  className?: string;
  title: string;
  subtitle: string;
  icon?: React.ElementType;
  delay?: number;
}


const BentoCard = ({ children, className, title, subtitle, icon: Icon, delay = 0 }: BentoCardProps) => (
  <div 
    className={cn(
      "group relative overflow-hidden rounded-3xl border border-white/10 bg-neutral-900/40 p-6 backdrop-blur-xl transition-all hover:border-white/20 hover:bg-neutral-900/60",
      "flex flex-col",
      className
    )}
    style={{ animationDelay: `${delay}ms` }}
  >
    {/* Card Header */}
    <div className="mb-4 flex items-center gap-3 z-10">
      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/5 border border-white/10 group-hover:bg-blue-500/20 group-hover:border-blue-500/30 transition-colors">
        {Icon && <Icon className="h-5 w-5 text-neutral-400 group-hover:text-blue-400" />}
      </div>
      <div>
        <h3 className="text-sm font-semibold text-white tracking-wide">{title}</h3>
        <p className="text-xs text-neutral-500">{subtitle}</p>
      </div>
    </div>

    {/* Card Content Area */}
    <div className="relative flex-1 rounded-xl bg-black/20 border border-white/5 overflow-hidden z-10">
      {children}
    </div>

    {/* Hover Glow Effect */}
    <div className="pointer-events-none absolute -inset-px opacity-0 transition duration-300 group-hover:opacity-100"
         style={{ background: 'radial-gradient(600px circle at var(--mouse-x, 0) var(--mouse-y, 0), rgba(255,255,255,0.06), transparent 40%)' }}
    />
  </div>
);

export default BentoCard

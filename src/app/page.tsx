"use client";
import React, { useState, MouseEvent } from "react";
import {
  ArrowRight,
  LayoutTemplate,
  Users,
  BarChart3,
  Sparkles,
  MousePointer2,
  MoreHorizontal,
  Plus,
  Zap,
  Key,
  Cloud,
  Shield,
  Rocket,
  Link,
} from "lucide-react";
import { cn } from "@/lib/utils";
import Button from "@/components/global/Button";
import Footer from "@/components/global/Footer";
import Header from "@/components/global/Header";
import BentoCard from "@/components/home/BentoCard";

const movingDotsStyles: string = `
  @keyframes dot-pan {
    0% { background-position: 0 0; }
    100% { background-position: 128px 128px; } /* Diagonal movement maintained */
  }
  @-webkit-keyframes dot-pan {
    0% { background-position: 0 0; }
    100% { background-position: 128px 128px; } /* Diagonal movement maintained with prefix */
  }
`;

// Feature data for the new section
const features = [
  {
    icon: Zap,
    title: "Instant Publishing",
    description:
      "Deploy changes globally in milliseconds. No more waiting for builds.",
  },
  {
    icon: Key,
    title: "Granular Permissions",
    description: "Control exactly who sees and edits what across your teams.",
  },
  {
    icon: Cloud,
    title: "Serverless Hosting",
    description:
      "Scale from 1 to 1 million users without configuring a single server.",
  },
  {
    icon: Shield,
    title: "Enterprise Grade Security",
    description: "Fully compliant and audited for modern security standards.",
  },
  {
    icon: Rocket,
    title: "Built-in SEO Tools",
    description: "Automatic sitemaps, metadata, and schema for top ranking.",
  },
  {
    icon: Link,
    title: "Custom Domain Support",
    description: "Easily connect your existing domain and SSL certificates.",
  },
];

export default function Homepage() {
  const [loadingState, setLoadingState] = useState<boolean>(false);

  // Simulate a loading action for the demo button
  const handleDemoClick = (): void => {
    setLoadingState(true);
    setTimeout(() => setLoadingState(false), 2000);
  };

  // Mouse tracking for spotlight effect on cards
  const handleMouseMove = (e: MouseEvent<HTMLDivElement>): void => {
    // We cast to HTMLCollectionOf<HTMLElement> because getElementsByClassName returns a generic HTMLCollection
    const cards = document.getElementsByClassName(
      "group"
    ) as HTMLCollectionOf<HTMLElement>;
    for (let i = 0; i < cards.length; i++) {
      const card = cards[i];
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      card.style.setProperty("--mouse-x", `${x}px`);
      card.style.setProperty("--mouse-y", `${y}px`);
    }
  };

  return (
    <div
      className="min-h-screen bg-black text-white font-sans selection:bg-blue-500/30"
      onMouseMove={handleMouseMove}
    >
      {/* Inject custom animation styles for the moving dots */}
      <style>{movingDotsStyles}</style>

      {/* Background Ambience */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        {/* Soft Colored Blobs */}
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-blue-900/20 blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-purple-900/10 blur-[120px]" />

        {/* Dot Matrix Pattern with Vignette Mask - Reduced Opacity and Diagonal Panning */}
        <div
          className="absolute inset-0 opacity-[0.15]" // Reduced Opacity
          style={{
            backgroundImage: `radial-gradient(#ffffff 1px, transparent 1px)`,
            backgroundSize: "32px 32px",
            maskImage:
              "radial-gradient(ellipse at center, black 40%, transparent 70%)",
            WebkitMaskImage:
              "radial-gradient(ellipse at center, black 40%, transparent 70%)",
            animation: "dot-pan 30s linear infinite", // Speed maintained for clear movement
            WebkitAnimation: "dot-pan 30s linear infinite",
          }}
        />

        {/* Noise Texture Overlay */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          }}
        />
      </div>

      <Header />
    

      <main className="relative z-10 max-w-7xl mx-auto px-6 py-12 flex flex-col items-center">
        {/* HERO SECTION */}
        <div className="text-center max-w-3xl mb-24 space-y-8">
          <div className="inline-flex items-center rounded-full border border-blue-500/30 bg-blue-500/10 px-3 py-1 text-xs font-medium text-blue-300 backdrop-blur-md">
            <Sparkles className="mr-2 h-3 w-3" />
            V2.0 is now live: AI-Powered Pipelines
          </div>

          <h1 className="text-5xl md:text-7xl font-bold tracking-tight bg-linear-to-b from-white via-white to-neutral-500 bg-clip-text text-transparent pb-2">
            Build the site.
            <br />
            Own the customer.
          </h1>

          <p className="text-lg text-neutral-400 max-w-xl mx-auto leading-relaxed">
            The first platform that merges a framer-like visual builder with a
            HubSpot-grade CRM. Stop stitching tools together.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            {/* DEMONSTRATING THE BUTTON STATES */}
            <Button
              variant="default"
              size="lg"
              onClick={handleDemoClick}
              isLoading={loadingState}
              className="group/btn"
            >
              Start Free Trial{" "}
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
            </Button>

            <Button variant="outline" size="lg" icon={LayoutTemplate}>
              View Templates
            </Button>
          </div>

          <p className="text-xs text-neutral-600 font-medium">
            No credit card required • Unlimited projects • Dark mode included
          </p>
        </div>

        {/* BENTO GRID SECTION */}
        <div className="w-full grid grid-cols-1 md:grid-cols-4 md:grid-rows-3 gap-4 h-auto md:h-[800px] mb-32">
          {/* CARD 1: THE BUILDER (Large) */}
          <BentoCard
            title="Visual Builder"
            subtitle="Drag, drop, and design without limits."
            icon={LayoutTemplate}
            className="md:col-span-3 md:row-span-2"
          >
            {/* MOCK UI: BUILDER */}
            <div className="absolute inset-0 bg-neutral-900 flex flex-col">
              {/* Mock Toolbar */}
              <div className="h-8 border-b border-white/5 flex items-center px-4 gap-2">
                <div className="flex gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-red-500/20 border border-red-500/50"></div>
                  <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/20 border border-yellow-500/50"></div>
                  <div className="w-2.5 h-2.5 rounded-full bg-green-500/20 border border-green-500/50"></div>
                </div>
                <div className="mx-auto w-1/3 h-4 bg-neutral-800 rounded-full text-[8px] flex items-center justify-center text-neutral-500 font-mono">
                  index.tsx
                </div>
              </div>

              <div className="flex flex-1">
                {/* Mock Sidebar */}
                <div className="w-12 border-r border-white/5 flex flex-col items-center py-4 gap-4">
                  {[1, 2, 3, 4].map((i) => (
                    <div
                      key={i}
                      className="w-6 h-6 rounded bg-white/5 hover:bg-white/10 transition-colors"
                    />
                  ))}
                </div>
                {/* Mock Canvas */}
                <div className="flex-1 p-8 bg-[radial-gradient(#ffffff0a_1px,transparent_1px)] bg-size-[16px_16px]">
                  <div className="w-full h-full border-2 border-dashed border-blue-500/30 rounded-lg flex items-center justify-center relative group">
                    <div className="absolute -top-2.5 left-5 bg-blue-600 text-[10px] px-2 py-0.5 rounded text-white opacity-0 group-hover:opacity-100 transition-opacity">
                      Section
                    </div>
                    <div className="text-center space-y-2 pointer-events-none">
                      <h2 className="text-2xl font-bold text-neutral-200">
                        Hero Section
                      </h2>
                      <p className="text-neutral-500 text-sm">
                        Drag elements here
                      </p>
                      <Button
                        size="sm"
                        variant="premium"
                        className="mt-4 pointer-events-auto"
                      >
                        Call to Action
                      </Button>
                    </div>

                    {/* Floating Cursor Animation */}
                    <div className="absolute bottom-10 right-10 animate-bounce">
                      <MousePointer2 className="text-blue-500 h-6 w-6 fill-blue-500/20" />
                      <div className="ml-4 mt-1 bg-blue-500 text-[10px] text-white px-1.5 rounded">
                        You
                      </div>
                    </div>
                  </div>
                </div>
                {/* Mock Properties Panel */}
                <div className="w-48 border-l border-white/5 hidden lg:block bg-neutral-900/80 p-4 space-y-4">
                  <div className="h-2 w-1/2 bg-neutral-800 rounded mb-4" />
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <div className="w-8 h-2 bg-neutral-800 rounded" />
                      <div className="w-16 h-2 bg-neutral-800 rounded" />
                    </div>
                    <div className="w-full h-8 bg-neutral-800 rounded border border-neutral-700/50" />
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <div className="w-12 h-2 bg-neutral-800 rounded" />
                      <div className="w-8 h-2 bg-neutral-800 rounded" />
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <div className="h-8 bg-neutral-800 rounded border border-neutral-700/50" />
                      <div className="h-8 bg-neutral-800 rounded border border-neutral-700/50" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </BentoCard>

          {/* CARD 2: THE CRM (Tall) */}
          <BentoCard
            title="Active Pipeline"
            subtitle="Real-time lead capture."
            icon={Users}
            className="md:col-span-1 md:row-span-2"
          >
            <div className="absolute inset-0 p-4 flex flex-col gap-2 overflow-hidden">
              <div className="text-[10px] font-mono text-neutral-500 mb-2 uppercase tracking-wider">
                Recently Active
              </div>

              {[
                {
                  name: "Sarah Connor",
                  deal: "$4,200",
                  status: "Negotiation",
                  color: "text-orange-400 bg-orange-400/10",
                },
                {
                  name: "TechCorp Inc",
                  deal: "$12,500",
                  status: "Closed Won",
                  color: "text-green-400 bg-green-400/10",
                },
                {
                  name: "Acme Co",
                  deal: "$2,100",
                  status: "Discovery",
                  color: "text-blue-400 bg-blue-400/10",
                },
                {
                  name: "John Wick",
                  deal: "$8,900",
                  status: "Proposal",
                  color: "text-purple-400 bg-purple-400/10",
                },
              ].map((lead, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between p-3 rounded-lg bg-neutral-800/50 border border-white/5 hover:bg-neutral-800 transition-colors cursor-pointer group/item"
                >
                  <div className="flex flex-col">
                    <span className="text-xs font-medium text-neutral-200 group-hover/item:text-white">
                      {lead.name}
                    </span>
                    <span className="text-[10px] text-neutral-500">
                      {lead.deal}
                    </span>
                  </div>
                  <span
                    className={`text-[9px] px-1.5 py-0.5 rounded ${lead.color} border border-white/5`}
                  >
                    {lead.status}
                  </span>
                </div>
              ))}

              {/* Simulated Incoming Lead Animation */}
              <div className="mt-auto p-3 rounded-lg border border-blue-500/30 bg-blue-500/10 flex items-center gap-3 animate-pulse">
                <div className="h-2 w-2 rounded-full bg-blue-400 animate-ping" />
                <span className="text-xs text-blue-200">
                  Syncing new leads...
                </span>
              </div>
            </div>
          </BentoCard>

          {/* CARD 3: ANALYTICS (Small) */}
          <BentoCard
            title="Conversion Rate"
            subtitle="+24% vs last month"
            icon={BarChart3}
            className="md:col-span-1"
          >
            <div className="absolute inset-0 flex items-end justify-between p-4 px-6 pb-0">
              {[30, 45, 35, 60, 55, 75, 85].map((h, i) => (
                <div
                  key={i}
                  className="w-2 bg-neutral-700 rounded-t-sm hover:bg-blue-500 transition-colors duration-300"
                  style={{ height: `${h}%` }}
                />
              ))}
            </div>
          </BentoCard>

          {/* CARD 4: AUTOMATION (Small) */}
          <BentoCard
            title="AI Actions"
            subtitle="Auto-reply to leads"
            icon={Sparkles}
            className="md:col-span-1"
          >
            <div className="absolute inset-0 p-4 flex items-center justify-center">
              <div className="w-full space-y-2">
                <div className="flex items-start gap-2">
                  <div className="h-6 w-6 rounded-full bg-blue-600 flex items-center justify-center">
                    <Sparkles size={12} />
                  </div>
                  <div className="bg-neutral-800 rounded-lg rounded-tl-none p-2 text-[10px] text-neutral-300 border border-white/5">
                    Drafted a follow-up for the enterprise lead.
                  </div>
                </div>
                <div className="flex justify-end">
                  <Button
                    size="sm"
                    variant="secondary"
                    className="h-6 text-[10px] px-2 py-0"
                  >
                    Review
                  </Button>
                </div>
              </div>
            </div>
          </BentoCard>

          {/* CARD 5: INTEGRATIONS (Wide) */}
          <BentoCard
            title="Native Integrations"
            subtitle="Works with your stack"
            icon={MoreHorizontal}
            className="md:col-span-2"
          >
            <div className="absolute inset-0 flex items-center justify-around px-8 opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
              {/* Simple SVG Placeholders for Logos */}
              <div className="h-8 w-8 rounded bg-white/20" />
              <div className="h-8 w-8 rounded bg-white/20" />
              <div className="h-8 w-8 rounded bg-white/20" />
              <div className="h-8 w-8 rounded bg-white/20" />
              <Plus className="text-neutral-600" />
            </div>
          </BentoCard>
        </div>

        {/* NEW SECTION 1: FEATURES GRID */}
        <section className="py-24 w-full">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
            <h2 className="text-4xl font-bold bg-linear-to-r from-white to-neutral-500 bg-clip-text text-transparent">
              Everything you need to ship faster.
            </h2>
            <p className="text-neutral-400 text-lg">
              Stop paying for five different services. Web Ustad consolidates
              your tools into one seamless platform. {/* Updated Name */}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <div
                key={index}
                className="group flex flex-col items-start p-6 rounded-2xl border border-neutral-800 bg-neutral-900/50 hover:border-blue-500/50 transition-all duration-300"
              >
                <div className="p-3 mb-4 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400 group-hover:scale-105 transition-transform">
                  <feature.icon className="h-5 w-5" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">
                  {feature.title}
                </h3>
                <p className="text-neutral-400 text-sm">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* NEW SECTION 2: TESTIMONIAL / FINAL CTA */}
        <section className="py-24 w-full">
          <div className="relative p-12 md:p-16 rounded-3xl bg-neutral-900/50 border border-neutral-800 backdrop-blur-md overflow-hidden">
            {/* Background lighting effect */}
            <div
              className="absolute inset-0 bg-white/5 opacity-10"
              style={{ clipPath: "polygon(0% 0%, 100% 0%, 100% 30%, 0% 30%)" }}
            />

            <div className="relative z-10 max-w-4xl mx-auto text-center space-y-8">
              <p className="text-2xl md:text-3xl font-light italic text-neutral-200 leading-relaxed">
                "Switching to Web Ustad saved our team $5,000 a month and cut
                our deployment time by 80%. It's the future of web building."{" "}
                {/* Updated Name */}
              </p>
              <div className="pt-4">
                <p className="font-semibold text-white">
                  - Jane Doe, CTO of InnovateX
                </p>
                <p className="text-sm text-neutral-500">
                  Fastest growing startup in 2024
                </p>
              </div>

              <Button
                variant="premium"
                size="lg"
                className="group/btn shadow-blue-500/30"
              >
                Get Started Today
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
              </Button>
            </div>
          </div>
        </section>
      </main>


      <Footer />
    </div>
  );
}

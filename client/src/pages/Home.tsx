import React, { useRef, useEffect, useState } from "react";
import { Link } from "wouter";
import Header from "../components/Header";
import { 
  Box, 
  Zap, 
  Settings2, 
  ArrowRight,
  Cpu,
  Layers,
  ShieldCheck,
  Terminal,
  Scissors,
  Database,
  FileText,
  Activity,
  Globe,
  Lock
} from "lucide-react";

const FEATURED_TOOLS = [
  {
    id: "01",
    name: "PARAMETRIX",
    tagline: "CLADDING GEN",
    description: "Algorithmic layout generation for complex multi-face architectural envelopes.",
    color: "#3b82f6",
    icon: Box,
    path: "/tools/parametrix"
  },
  {
    id: "02",
    name: "AutoNestCut",
    tagline: "FABRICATION ENGINE",
    description: "Intelligent cut-list optimization reducing material waste by up to 30%.",
    color: "#10b981",
    icon: Scissors,
    path: "/tools/autonestcut"
  },
  {
    id: "03",
    name: "SPECBASE",
    tagline: "DATA CORE",
    description: "Enterprise-grade specification management for large-scale interior projects.",
    color: "#6366f1",
    icon: Database,
    path: "/tools/specbase"
  },
  {
    id: "04",
    name: "DocMark",
    tagline: "CONTENT ENGINE",
    description: "Real-time markdown editor with live preview and synchronized scrolling.",
    color: "#a855f7",
    icon: FileText,
    path: "/tools/docmark"
  }
];

const SYSTEM_STATS = [
  { label: "Active Nodes", value: "2.4k", icon: Cpu },
  { label: "Precision", value: "99.9%", icon: ShieldCheck },
  { label: "Deployments", value: "12k+", icon: Layers },
  { label: "Global Sync", value: "Ready", icon: Zap },
];

declare global {
  interface Window {
    gsap: any;
    ScrollTrigger: any;
  }
}

export default function Home() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const loadGSAP = async () => {
      const loadScript = (src: string) => new Promise((resolve) => {
        const script = document.createElement('script');
        script.src = src;
        script.onload = resolve;
        document.head.appendChild(script);
      });

      if (!window.gsap) {
        await loadScript("https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js");
        await loadScript("https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/ScrollTrigger.min.js");
      }

      const gsap = window.gsap;
      const ScrollTrigger = window.ScrollTrigger;
      gsap.registerPlugin(ScrollTrigger);

      // Hero Background Text Parallax
      gsap.to(".hero-bg-text", {
        scrollTrigger: {
          trigger: ".hero-section",
          start: "top top",
          end: "bottom top",
          scrub: 1
        },
        x: -200,
        opacity: 0.1
      });

      // Reveal animations for stats
      gsap.from(".stat-card", {
        scrollTrigger: {
          trigger: ".stats-grid",
          start: "top 80%",
        },
        y: 50,
        opacity: 0,
        stagger: 0.1,
        duration: 0.8,
        ease: "power3.out"
      });

      // Feature cards stagger
      gsap.from(".feature-card", {
        scrollTrigger: {
          trigger: ".feature-grid",
          start: "top 80%",
        },
        y: 60,
        opacity: 0,
        stagger: 0.15,
        duration: 1,
        ease: "power3.out"
      });
    };

    loadGSAP();

    return () => {
      const triggers = window.ScrollTrigger?.getAll() || [];
      console.log('[Home] Cleaning up ScrollTrigger instances:', triggers.length);
      triggers.forEach((trigger: any) => trigger.kill());
    };
  }, []);

  return (
    <div className="bg-[#030303] min-h-screen text-white font-sans selection:bg-blue-600 overflow-x-hidden" ref={scrollContainerRef}>
      <Header currentPage="home" />

      {/* 1. Industrial Hero */}
      <section className="hero-section relative h-screen flex flex-col items-start justify-end p-6 md:p-20 overflow-hidden">
        {/* Background Decorative Element */}
        <div className="hero-bg-text absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[40vw] font-black opacity-[0.02] whitespace-nowrap pointer-events-none select-none italic">
          COMPUTE_01
        </div>

        <div className="relative z-10 w-full max-w-5xl space-y-8">
          <div className="inline-flex items-center gap-3 px-4 py-2 bg-blue-600/10 border border-blue-500/20 rounded-full">
            <div className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-pulse"></div>
            <span className="text-[10px] font-black tracking-widest text-blue-500 uppercase">System Online: Riyadh Node</span>
          </div>

          <h1 className="text-6xl md:text-[120px] font-black leading-[0.85] uppercase italic tracking-tighter">
            Next-Gen<br />
            <span className="text-blue-600">Architectural</span><br />
            Intelligence.
          </h1>

          <div className="flex flex-col md:flex-row items-start md:items-center gap-8 pt-10">
            <p className="max-w-sm text-white/40 font-medium text-sm leading-relaxed border-l border-white/10 pl-6">
              Empowering architects in Saudi Arabia with high-precision 
              computational tools and automated BIM workflows.
            </p>
            <div className="flex gap-4 w-full md:w-auto">
              <Link href="/tools">
                <button className="flex-1 md:flex-none bg-white text-black px-8 py-5 rounded-sm font-black text-xs tracking-widest uppercase hover:bg-blue-600 hover:text-white transition-all">
                  Initialize
                </button>
              </Link>
              <Link href="/pricing">
                <button className="flex-1 md:flex-none border border-white/20 text-white px-8 py-5 rounded-sm font-black text-xs tracking-widest uppercase hover:bg-white/5 transition-all">
                  Registry
                </button>
              </Link>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-10 right-10 hidden md:block">
          <div className="flex flex-col items-center gap-4">
            <span className="rotate-90 text-[10px] font-black tracking-widest opacity-20 uppercase">Scroll to explore</span>
            <div className="w-[1px] h-20 bg-gradient-to-b from-white/20 to-transparent"></div>
          </div>
        </div>
      </section>

      {/* 2. Grid-Based Feature Exploration */}
      <section className="py-32 px-6 bg-[#050505]">
        <div className="max-w-7xl mx-auto">
          <div className="feature-grid grid grid-cols-1 md:grid-cols-12 gap-6">

            {/* Header Block */}
            <div className="md:col-span-12 mb-12 flex flex-col md:flex-row md:items-end justify-between border-b border-white/5 pb-12">
              <div className="space-y-4">
                <span className="text-blue-500 text-[10px] font-black tracking-[0.5em] uppercase">Module Spectrum</span>
                <h2 className="text-4xl md:text-6xl font-black uppercase italic tracking-tighter">Available Engines</h2>
              </div>
              <p className="text-white/30 text-xs font-bold uppercase tracking-widest mt-6 md:mt-0">
                Sorted by / System Architecture / Precision
              </p>
            </div>

            {/* Feature Cards in Masonry-ish Grid */}
            {FEATURED_TOOLS.map((tool, idx) => (
              <div 
                key={tool.id}
                className={`${idx % 3 === 0 ? 'md:col-span-8' : 'md:col-span-4'} group relative feature-card`}
                onMouseEnter={() => setHoveredIndex(idx)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                <Link href={tool.path}>
                  <div className="relative h-full min-h-[400px] bg-[#0a0a0c] border border-white/5 rounded-2xl p-10 flex flex-col justify-between overflow-hidden transition-all duration-500 group-hover:border-blue-500/30 cursor-pointer">
                    {/* Decorative Gradient */}
                    <div className="absolute -right-20 -top-20 w-64 h-64 bg-blue-600/10 blur-[100px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>

                    <div className="relative z-10 flex justify-between items-start">
                      <div className="p-4 bg-white/5 rounded-xl group-hover:bg-blue-600 group-hover:text-white transition-all duration-500">
                        <tool.icon size={28} />
                      </div>
                      <span className="text-4xl font-black italic opacity-10 group-hover:opacity-100 group-hover:text-blue-500 transition-all">{tool.id}</span>
                    </div>

                    <div className="relative z-10 space-y-4 mt-20">
                      <span className="text-blue-500 text-[9px] font-black tracking-[0.3em] uppercase">{tool.tagline}</span>
                      <h3 className="text-4xl font-black uppercase italic tracking-tighter leading-none">{tool.name}</h3>
                      <p className={`text-white/40 text-sm leading-relaxed max-w-sm transition-opacity duration-500 ${hoveredIndex === idx ? 'opacity-100' : 'opacity-60'}`}>
                        {tool.description}
                      </p>
                    </div>

                    <div className="relative z-10 pt-10 flex items-center justify-between border-t border-white/5 mt-auto">
                      <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-white/30 group-hover:text-blue-500 transition-colors">
                        Explore Module <ArrowRight size={14} />
                      </div>
                      <div className="flex gap-1">
                        {[1, 2, 3].map(i => <div key={i} className="w-1 h-1 bg-white/10 rounded-full group-hover:bg-blue-500/50"></div>)}
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Terminal Statistics */}
      <section className="py-32 px-6 border-y border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="stats-grid grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-px md:bg-white/5">
            {SYSTEM_STATS.map((stat, i) => (
              <div key={i} className="stat-card bg-[#030303] p-10 flex flex-col items-center text-center space-y-6 group cursor-default">
                <div className="p-4 rounded-full border border-white/5 group-hover:border-blue-500/50 transition-colors">
                  <stat.icon size={20} className="text-white/20 group-hover:text-blue-500" />
                </div>
                <div className="space-y-1">
                  <div className="text-4xl font-black tracking-tighter italic">{stat.value}</div>
                  <div className="text-[10px] font-black uppercase tracking-[0.4em] text-white/20">{stat.label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Contact / CTA Section */}
      <section className="py-40 px-6">
        <div className="max-w-4xl mx-auto text-center space-y-12">
          <div className="space-y-4">
            <div className="text-blue-500 text-[10px] font-black tracking-[0.5em] uppercase">Connect / Deploy</div>
            <h2 className="text-5xl md:text-8xl font-black uppercase italic tracking-tighter">Ready for<br/>The Future?</h2>
          </div>
          <p className="text-white/40 text-lg font-medium max-w-xl mx-auto">
            Bring advanced parametric capabilities to your studio. 
            Custom engine development for Riyadh's most ambitious projects.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-6">
            <Link href="/contact">
              <button className="bg-blue-600 text-white px-12 py-6 rounded-full font-black text-xs tracking-[0.2em] uppercase hover:bg-white hover:text-black transition-all shadow-[0_0_30px_rgba(37,99,235,0.3)]">
                Start Project
              </button>
            </Link>
            <Link href="/tools">
              <button className="border border-white/10 text-white px-12 py-6 rounded-full font-black text-xs tracking-[0.2em] uppercase hover:bg-white/5 transition-all">
                Documentation
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-white/5 bg-[#050505]">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-4">
            <div className="w-8 h-8 bg-white flex items-center justify-center rounded-sm">
              <Terminal size={16} className="text-black" />
            </div>
            <div className="text-sm font-black tracking-[0.3em] uppercase italic">Studio Terminal</div>
          </div>

          <div className="flex items-center gap-6 text-[9px] font-black tracking-[0.4em] text-white/20 uppercase">
            <span>© 2025</span>
            <div className="w-px h-3 bg-white/10"></div>
            <span>Muhamad Shkeir</span>
            <div className="w-px h-3 bg-white/10"></div>
            <span className="text-blue-500/60 hover:text-blue-500 cursor-pointer transition-colors">KSA Node</span>
          </div>

          <div className="flex gap-6 opacity-30 hover:opacity-100 transition-opacity">
            <Globe size={16} className="cursor-pointer hover:text-blue-500 transition-colors" />
            <Activity size={16} className="cursor-pointer hover:text-blue-500 transition-colors" />
            <Lock size={16} className="cursor-pointer hover:text-blue-500 transition-colors" />
          </div>
        </div>
      </footer>

      <style>{`
        /* Custom scrollbar */
        ::-webkit-scrollbar {
          width: 4px;
        }
        ::-webkit-scrollbar-track {
          background: #030303;
        }
        ::-webkit-scrollbar-thumb {
          background: #222;
          border-radius: 10px;
        }
        ::-webkit-scrollbar-thumb:hover {
          background: #3b82f6;
        }
      `}</style>
    </div>
  );
}

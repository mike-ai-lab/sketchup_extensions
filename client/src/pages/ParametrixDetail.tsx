import React, { useEffect, useRef } from "react";
import { Link } from "wouter";
import Header from "../components/Header";
import { 
  ArrowRight, 
  CheckCircle2, 
  Download, 
  Box, 
  Layers, 
  Grid3x3, 
  Scissors, 
  Settings, 
  Star,
  ChevronLeft,
  ShieldCheck,
  Zap
} from "lucide-react";

const FEATURES = [
  {
    icon: Layers,
    title: "Multi-Face Layouts",
    description: "Generate synchronized layouts across multiple selected faces with seamless pattern continuation."
  },
  {
    icon: Scissors,
    title: "Advanced Trimming",
    description: "Automatic boolean trimming ensures perfect fit within complex face boundaries."
  },
  {
    icon: Grid3x3,
    title: "Rail Systems",
    description: "Integrated top and bottom rail generation with customizable dimensions and materials."
  },
  {
    icon: Settings,
    title: "Pattern Control",
    description: "Running bond and stack bond patterns with randomization and start position control."
  }
];

const SPECS = [
  { label: "Version", value: "1.0.0" },
  { label: "Compatibility", value: "SketchUp 2019+" },
  { label: "License", value: "Perpetual / 7-Day Trial" },
  { label: "Architecture", value: "Riyadh-Ready Logic" }
];

declare global {
  interface Window {
    gsap: any;
    ScrollTrigger: any;
  }
}

export default function ParametrixDetail() {
  const containerRef = useRef(null);

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
      ScrollTrigger.normalizeScroll(true);

      const ctx = gsap.context(() => {
        // Hero Entrance
        gsap.from(".reveal", {
          y: 40,
          opacity: 0,
          duration: 1,
          stagger: 0.15,
          ease: "power4.out"
        });

        // Feature Scroll Cards
        gsap.from(".feature-card", {
          scrollTrigger: {
            trigger: ".feature-grid",
            start: "top bottom-=100",
          },
          y: 60,
          opacity: 0,
          stagger: 0.1,
          duration: 0.8,
          ease: "power2.out"
        });
      });
      return () => ctx.revert();
    };
    loadGSAP();
  }, []);

  return (
    <div className="bg-[#050505] min-h-screen text-white font-sans selection:bg-blue-600 overflow-x-hidden">
      <Header currentPage="tools" />

      {/* Hero Section */}
      <section className="pt-28 sm:pt-40 pb-20 px-4 sm:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 sm:gap-20 items-center">
          <div className="space-y-8">
            <div className="reveal inline-flex items-center gap-3 px-3 py-1 bg-blue-500/10 border border-blue-500/20 text-blue-500 text-[10px] font-black uppercase tracking-widest rounded">
              <Zap size={12} /> Featured Extension
            </div>
            
            <h1 className="reveal text-[64px] sm:text-[120px] font-black tracking-tighter leading-[0.8] sm:leading-[0.75] uppercase italic stroke-text break-words">
              Parametrix
            </h1>
            
            <p className="reveal text-lg sm:text-2xl font-medium text-white/60 leading-tight">
              Professional Parametric Cladding <br/>Layout Generator
            </p>

            <p className="reveal text-white/40 leading-relaxed max-w-lg">
              Designed for architects who demand precision. Generate complex multi-face layouts with advanced trimming, rail systems, and pattern synchronization in seconds.
            </p>

            <div className="reveal flex flex-wrap gap-4 pt-4">
              <button className="bg-blue-600 hover:bg-blue-500 text-white px-8 sm:px-10 py-4 sm:py-5 rounded-2xl font-black text-xs tracking-widest uppercase transition-all flex items-center gap-4 active:scale-95 shadow-2xl shadow-blue-600/20">
                Start Free Trial <ArrowRight size={18} />
              </button>
              <button className="bg-white/5 hover:bg-white/10 border border-white/10 text-white px-8 sm:px-10 py-4 sm:py-5 rounded-2xl font-black text-xs tracking-widest uppercase transition-all flex items-center gap-4 active:scale-95">
                <Download size={18} /> Documentation
              </button>
            </div>
            
            <div className="reveal flex items-center gap-6 pt-4 text-[9px] font-bold text-white/20 uppercase tracking-[0.3em]">
              <span className="flex items-center gap-2"><ShieldCheck size={12} className="text-blue-500" /> 7-Day Trial</span>
              <span className="flex items-center gap-2"><ShieldCheck size={12} className="text-blue-500" /> No CC Required</span>
              <span className="flex items-center gap-2"><ShieldCheck size={12} className="text-blue-500" /> $49 Perpetual</span>
            </div>
          </div>

            <div className="reveal relative flex justify-center items-center">
            {/* Geometric Visualization */}
            <div className="w-[280px] h-[280px] sm:w-[500px] sm:h-[500px] bg-[#0c0c0e] border border-white/5 rounded-[40px] sm:rounded-[60px] flex items-center justify-center relative overflow-hidden group">
               <div className="absolute inset-0 bg-blue-600/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
               <Box className="w-28 h-28 sm:w-48 sm:h-48 text-white/5 group-hover:text-blue-500/20 transition-colors duration-700" strokeWidth={0.5} />
               {/* Industrial Overlay */}
               <div className="absolute top-10 left-10 text-[9px] font-mono opacity-20 group-hover:opacity-100 transition-opacity">
                  ID: MOD_PRMTX_001<br/>STATUS: READY_FOR_DEPLOY
               </div>
               <div className="absolute bottom-10 right-10 flex gap-1">
                  {[...Array(3)].map((_, i) => (
                    <div key={i} className="w-1 h-1 bg-blue-500 rounded-full animate-pulse" style={{ animationDelay: `${i*0.2}s` }}></div>
                  ))}
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 sm:py-32 px-4 sm:px-8 bg-[#08080a]">
        <div className="max-w-7xl mx-auto">
          <div className="mb-20 space-y-4">
            <h2 className="text-4xl font-black uppercase italic tracking-tighter">System Features</h2>
            <div className="w-20 h-1 bg-blue-500"></div>
          </div>
          
          <div className="feature-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {FEATURES.map((f, i) => (
              <div key={i} className="feature-card bg-[#0c0c0e] border border-white/5 p-10 rounded-[40px] hover:border-blue-500/50 transition-colors group">
                <div className="w-16 h-16 bg-blue-500/10 rounded-2xl flex items-center justify-center text-blue-500 mb-8 group-hover:bg-blue-500 group-hover:text-white transition-all">
                  <f.icon size={28} />
                </div>
                <h3 className="text-lg font-black uppercase tracking-tight mb-4 italic">{f.title}</h3>
                <p className="text-sm text-white/40 leading-relaxed font-medium">
                  {f.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Specs & Why Parametrix */}
      <section className="py-20 sm:py-32 px-4 sm:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 sm:gap-32">
          <div className="space-y-12">
            <h2 className="text-4xl font-black uppercase italic tracking-tighter">Engine Performance</h2>
            <div className="space-y-8">
              {[
                { t: "Time-Saving Automation", d: "Generate complex layouts in seconds that would take hours manually." },
                { t: "Precision Engineering", d: "Exact measurements and perfect alignment every time." },
                { t: "Flexible Customization", d: "Full control over dimensions, patterns, and materials." }
              ].map((item, i) => (
                <div key={i} className="flex gap-6">
                   <div className="mt-1"><CheckCircle2 className="text-blue-500" size={24} /></div>
                   <div>
                      <h4 className="text-lg font-bold uppercase italic tracking-tight">{item.t}</h4>
                      <p className="text-white/40 text-sm leading-relaxed">{item.d}</p>
                   </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-[#0c0c0e] border border-white/5 p-12 rounded-[50px]">
            <h3 className="text-2xl font-black uppercase italic tracking-tighter mb-10">Technical Specifications</h3>
            <div className="space-y-6">
              {SPECS.map((s, i) => (
                <div key={i} className="flex justify-between items-center py-4 border-b border-white/5 last:border-0">
                  <span className="text-[10px] font-black uppercase tracking-[0.4em] text-white/30">{s.label}</span>
                  <span className="text-sm font-bold text-blue-500 italic uppercase">{s.value}</span>
                </div>
              ))}
            </div>
            <div className="mt-12 pt-12 border-t border-white/5 text-center">
               <Star className="mx-auto mb-4 text-blue-500 fill-blue-500" size={20} />
               <p className="text-[10px] font-black uppercase tracking-[0.3em] opacity-40 italic">Industry standard since v1.0</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer CTA */}
      <div className="flex justify-center py-20 px-4 sm:px-8">
        <footer className="bg-[#0c0c0e] border border-white/5 rounded-[32px] sm:rounded-full px-6 sm:px-12 py-6 shadow-2xl flex flex-col md:flex-row items-center gap-8">
          <div className="flex items-center gap-6 text-[10px] font-black tracking-[0.4em] text-white/30 uppercase">
            <span>© 2025 Studiø</span>
            <div className="w-1 h-1 bg-white/10 rounded-full"></div>
            <span>Muhamad Shkeir</span>
            <div className="w-1 h-1 bg-white/10 rounded-full"></div>
            <span className="text-blue-500">Riyadh, KSA</span>
          </div>
        </footer>
      </div>

      <style>{`
        .stroke-text {
          -webkit-text-stroke: 1px rgba(255,255,255,0.2);
          color: transparent;
        }
        @media (min-width: 1024px) {
          .stroke-text { -webkit-text-stroke: 2px rgba(255,255,255,0.2); }
        }
      `}</style>
    </div>
  );
}

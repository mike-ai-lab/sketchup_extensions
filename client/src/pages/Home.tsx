import React, { useEffect, useRef, useState } from "react";
import { Link } from "wouter";
import Header from "../components/Header";
import { 
  Box, 
  Zap, 
  Settings2, 
  ArrowRight, 
  Star, 
  Sparkles, 
  ChevronLeft, 
  ChevronRight,
  Cpu,
  Layers,
  ShieldCheck,
  MoveDown
} from "lucide-react";

const FEATURED_TOOLS = [
  {
    id: "01",
    name: "PARAMETRIX",
    tagline: "CLADDING GEN",
    description: "Algorithmic layout generation for complex multi-face architectural envelopes.",
    color: "#3b82f6",
    path: "/tools/parametrix"
  },
  {
    id: "02",
    name: "AutoNestCut",
    tagline: "FABRICATION ENGINE",
    description: "Intelligent cut-list optimization reducing material waste by up to 30%.",
    color: "#10b981",
    path: "/tools/autonestcut"
  },
  {
    id: "03",
    name: "SPECBASE",
    tagline: "DATA CORE",
    description: "Enterprise-grade specification management for large-scale interior projects.",
    color: "#6366f1",
    path: "/tools/specbase"
  },
  {
    id: "04",
    name: "DocMark",
    tagline: "CONTENT ENGINE",
    description: "Real-time markdown editor with live preview and synchronized scrolling.",
    color: "#a855f7",
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
  const [activeSlide, setActiveSlide] = useState(0);
  const scrollContainerRef = useRef(null);

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
      gsap.registerPlugin(window.ScrollTrigger);

      // Hero Text Parallax
      gsap.to(".hero-title", {
        scrollTrigger: {
          trigger: ".hero-section",
          start: "top top",
          end: "bottom top",
          scrub: true
        },
        y: 200,
        scale: 0.9,
        opacity: 0
      });

      // Background Pulse
      gsap.to(".bg-glow", {
        opacity: 0.4,
        duration: 3,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
      });
    };

    loadGSAP();
  }, []);

  return (
    <div className="bg-[#050505] min-h-screen text-white font-sans selection:bg-blue-600 overflow-x-hidden" ref={scrollContainerRef}>
      <Header currentPage="home" />

      {/* 1. Cinematic Hero */}
      <section className="hero-section relative h-screen flex flex-col items-center justify-center text-center px-6 overflow-hidden">
        <div className="bg-glow absolute w-[600px] h-[600px] bg-blue-600/20 blur-[150px] rounded-full -z-10"></div>
        
        <div className="hero-title space-y-6">
          <h1 className="text-[10vw] font-black tracking-tighter leading-[0.8] uppercase italic stroke-text">
            Studio<br/><span className="text-white not-italic">Terminal</span>
          </h1>
          <p className="max-w-2xl mx-auto text-white/40 font-medium text-lg leading-relaxed">
            Professional-grade parametric engines and automation scripts designed for 
            the complexity of modern Middle Eastern architecture.
          </p>
          
          <div className="flex justify-center gap-6 pt-10">
            <Link href="/tools">
              <button className="bg-white text-black px-10 py-5 rounded-2xl font-black text-xs tracking-widest uppercase hover:bg-blue-600 hover:text-white transition-all active:scale-95 shadow-2xl">
                Initialize System
              </button>
            </Link>
            <Link href="/pricing">
              <button className="bg-transparent border border-white/10 text-white px-10 py-5 rounded-2xl font-black text-xs tracking-widest uppercase hover:bg-white/5 transition-all active:scale-95">
                View Licenses
              </button>
            </Link>
          </div>
        </div>

        <div className="absolute bottom-12 animate-bounce opacity-20">
          <MoveDown size={24} />
        </div>
      </section>

      {/* 2. Featured Module Carousel (The mechanical scroll) */}
      <section className="py-40 px-6 bg-[#08080a]">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-end mb-20 border-b border-white/5 pb-10">
            <div>
              <span className="text-blue-500 text-[10px] font-black tracking-[0.5em] uppercase">Phase 01</span>
              <h2 className="text-5xl font-black uppercase italic tracking-tighter mt-2">Core Modules</h2>
            </div>
            <div className="flex gap-4">
               <button onClick={() => setActiveSlide(s => Math.max(0, s-1))} className="p-4 border border-white/10 rounded-full hover:bg-white hover:text-black transition-all">
                <ChevronLeft size={20} />
               </button>
               <button onClick={() => setActiveSlide(s => Math.min(FEATURED_TOOLS.length-1, s+1))} className="p-4 border border-white/10 rounded-full hover:bg-white hover:text-black transition-all">
                <ChevronRight size={20} />
               </button>
            </div>
          </div>

          <div className="relative h-[500px] flex items-center overflow-hidden">
            <div 
              className="flex transition-transform duration-1000 ease-[cubic-bezier(0.23,1,0.32,1)]"
              style={{ transform: `translateX(-${activeSlide * 40}%)` }}
            >
              {FEATURED_TOOLS.map((tool, i) => (
                <div key={tool.id} className="min-w-[80%] md:min-w-[40%] px-4">
                  <Link href={tool.path}>
                    <div className="group bg-[#0c0c0e] border border-white/5 p-12 rounded-[50px] h-[450px] flex flex-col justify-between hover:border-blue-500/50 transition-all cursor-pointer relative overflow-hidden">
                      <div className="absolute top-0 right-0 p-8 text-4xl font-black italic opacity-5 group-hover:opacity-10 transition-opacity">
                        {tool.id}
                      </div>
                      <div className="space-y-4">
                        <div className="w-14 h-14 bg-white/5 rounded-2xl flex items-center justify-center group-hover:bg-blue-600 transition-colors">
                          <Box size={24} />
                        </div>
                        <span className="text-blue-500 text-[9px] font-black tracking-widest uppercase block">{tool.tagline}</span>
                        <h3 className="text-4xl font-black uppercase italic tracking-tighter">{tool.name}</h3>
                      </div>
                      <p className="text-white/40 text-sm leading-relaxed max-w-[280px]">
                        {tool.description}
                      </p>
                      <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-blue-500 group-hover:gap-4 transition-all">
                        Deploy Module <ArrowRight size={14} />
                      </div>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 3. System Stats (Mechanical Dashboard) */}
      <section className="py-32 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-4">
          {SYSTEM_STATS.map((stat, i) => (
            <div key={i} className="bg-[#0c0c0e] border border-white/5 p-10 rounded-[40px] flex flex-col items-center text-center space-y-4">
              <stat.icon size={24} className="text-blue-500" />
              <div className="text-3xl font-black tracking-tighter italic">{stat.value}</div>
              <div className="text-[9px] font-black uppercase tracking-[0.3em] text-white/20">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. Global CTA */}
      <section className="py-40 px-6">
        <div className="max-w-7xl mx-auto bg-blue-600 rounded-[80px] p-20 text-center relative overflow-hidden group">
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10"></div>
          <div className="relative z-10 space-y-8">
            <h2 className="text-6xl md:text-8xl font-black uppercase italic tracking-tighter leading-none">
              Transform Your<br/>Design Workflow
            </h2>
            <p className="max-w-xl mx-auto text-white/80 font-medium text-lg">
              Join the new era of architectural computation. High-precision tools 
              curated for professional excellence in Riyadh and beyond.
            </p>
            <button className="bg-black text-white px-16 py-6 rounded-3xl font-black text-sm tracking-widest uppercase hover:bg-white hover:text-black transition-all active:scale-95 shadow-2xl">
              Get Started Now
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-20 px-6 border-t border-white/5">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-10">
          <div className="text-xl font-black tracking-[0.4em] italic uppercase">Studiø</div>
          <div className="flex items-center gap-8 text-[9px] font-black tracking-[0.4em] text-white/20 uppercase">
             <span>© 2025</span>
             <div className="w-1 h-1 bg-white/10 rounded-full"></div>
             <span>Curated for Muhamad</span>
             <div className="w-1 h-1 bg-white/10 rounded-full"></div>
             <span className="text-blue-500">Int. Arch. M.Shkeir</span>
          </div>
        </div>
      </footer>

      <style>{`
        .stroke-text {
          -webkit-text-stroke: 1px rgba(255,255,255,0.15);
          color: transparent;
        }
        @media (min-width: 1024px) {
          .stroke-text { -webkit-text-stroke: 2px rgba(255,255,255,0.15); }
        }
      `}</style>
    </div>
  );
}
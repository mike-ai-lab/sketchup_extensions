import React, { useEffect, useRef, useState } from "react";
import { Link } from "wouter";
import { 
  Code2, 
  Terminal, 
  Layers, 
  Box, 
  Cpu, 
  Zap, 
  DraftingCompass, 
  Wrench,
  ChevronLeft,
  ChevronRight,
  ArrowUpRight
} from "lucide-react";

const UTILITIES = [
  { id: "ruby-01", title: "Spatial Engine", category: "RUBY / SKETCHUP", desc: "Automated volumetric generator for complex massing.", tech: "v2.4", icon: Code2 },
  { id: "lisp-02", title: "Purge Plus", category: "LISP / AUTOCAD", desc: "Deep-cleaning facility for enterprise-scale CAD files.", tech: "v1.0", icon: Terminal },
  { id: "revit-03", title: "Metadata Sync", category: "C# / REVIT", desc: "Bidirectional Excel-to-BIM synchronization module.", tech: "v4.2", icon: Layers },
  { id: "py-04", title: "Batch Baker", category: "PYTHON / 3DS", desc: "Automated light baking for high-fidelity interiors.", tech: "v1.8", icon: Zap },
  { id: "gh-05", title: "Façade Solver", category: "GH / RHINO", desc: "Reactive panelization for complex solar orientations.", tech: "v3.1", icon: Box },
  { id: "cad-06", title: "AIA Layering", category: "VBA / CAD", desc: "Instant standardization of layered architectural data.", tech: "v2.0", icon: Wrench },
  { id: "mesh-07", title: "Decimator", category: "C++ / UTILS", desc: "High-poly mesh optimization for real-time engines.", tech: "v0.9", icon: Cpu },
  { id: "unit-08", title: "Scale Master", category: "JS / WEB", desc: "Global unit conversion for multi-firm collaboration.", tech: "v1.5", icon: DraftingCompass },
];

export default function Utilities() {
  const [activeIndex, setActiveIndex] = useState(0);
  const containerRef = useRef(null);
  const cardRefs = useRef([]);

  const nextSlide = () => setActiveIndex((prev) => (prev + 1) % UTILITIES.map(u => u).length);
  const prevSlide = () => setActiveIndex((prev) => (prev - 1 + UTILITIES.length) % UTILITIES.length);

  useEffect(() => {
    const loadGSAP = async () => {
      const loadScript = (src) => new Promise((resolve) => {
        const script = document.createElement('script');
        script.src = src;
        script.onload = resolve;
        document.head.appendChild(script);
      });

      if (!window.gsap) {
        await loadScript("https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js");
      }

      const gsap = window.gsap;

      UTILITIES.forEach((_, i) => {
        const el = cardRefs.current[i];
        if (!el) return;

        const distance = i - activeIndex;
        const absDistance = Math.abs(distance);
        const isActive = distance === 0;

        // Interactive Carousel Logic
        gsap.to(el, {
          xPercent: distance * 55, // Horizontal spacing
          scale: isActive ? 1 : 0.75 - (absDistance * 0.1),
          zIndex: 100 - absDistance,
          opacity: absDistance > 2 ? 0 : 1 - (absDistance * 0.3),
          rotateY: distance * -15, // 3D Tilt effect
          filter: isActive ? "blur(0px)" : "blur(4px)",
          duration: 0.8,
          ease: "expo.out"
        });

        // Step 2 Expansion Logic for active card only
        const infoRect = el.querySelector('.info-rect');
        const infoContent = el.querySelector('.info-content');
        if (infoRect && infoContent) {
            gsap.to(infoRect, {
                width: isActive ? "450px" : "0px",
                duration: 0.6,
                delay: isActive ? 0.3 : 0,
                ease: "power3.inOut"
            });
            gsap.to(infoContent, {
                opacity: isActive ? 1 : 0,
                duration: 0.4,
                delay: isActive ? 0.6 : 0
            });
        }
      });
    };

    loadGSAP();
  }, [activeIndex]);

  return (
    <div className="bg-[#050505] min-h-screen text-white font-sans overflow-hidden">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 p-10 flex justify-between items-center pointer-events-none">
        <Link href="/tools" className="pointer-events-auto flex items-center gap-4 text-[10px] font-black tracking-[0.5em] text-white/30 hover:text-blue-500 transition-colors uppercase">
          <ChevronLeft size={16} /> Back
        </Link>
        <div className="text-sm font-black tracking-[0.8em] italic opacity-20">UTILITIES // 02</div>
        <div className="w-20"></div>
      </nav>

      {/* Main Perspective Stage */}
      <main className="h-screen flex flex-col items-center justify-center relative perspective-2000">
        <header className="absolute top-24 text-center space-y-4">
            <h1 className="text-7xl font-black tracking-tighter uppercase italic stroke-text">Facilities</h1>
            <p className="text-[10px] font-bold tracking-[0.4em] text-blue-500 uppercase">Interactive Module Browser</p>
        </header>

        <div ref={containerRef} className="relative w-full max-w-5xl h-[450px] flex items-center justify-center">
          {UTILITIES.map((item, i) => (
            <div 
              key={item.id}
              ref={(el) => (cardRefs.current[i] = el)}
              className="absolute flex items-center pointer-events-none"
            >
              {/* Step 1: The Main Module Square */}
              <div className="w-[300px] h-[300px] bg-[#0c0c0e] border border-white/10 rounded-[40px] shadow-2xl flex flex-col items-center justify-center p-10 z-20 pointer-events-auto relative group overflow-hidden">
                <div className="p-6 bg-blue-500/10 rounded-3xl text-blue-500 mb-6 group-hover:scale-110 transition-transform">
                  <item.icon size={48} strokeWidth={1.5} />
                </div>
                <div className="text-center">
                    <span className="text-[9px] font-black tracking-[0.3em] text-blue-500/50 block mb-2">{item.category}</span>
                    <h3 className="text-2xl font-black tracking-tight uppercase leading-none italic">{item.title}</h3>
                </div>
                {/* Visual Gear/Decoration */}
                <div className="absolute -bottom-4 -right-4 w-20 h-20 border border-white/5 rounded-full opacity-20"></div>
              </div>

              {/* Step 2: The Expanding Information Module */}
              <div className="info-rect h-[220px] bg-white text-black -ml-12 pl-20 rounded-r-[35px] overflow-hidden flex items-center w-0 shadow-2xl z-10">
                <div className="info-content opacity-0 whitespace-nowrap pr-12">
                   <h4 className="text-xl font-black uppercase tracking-tighter mb-2 italic">Module Description</h4>
                   <p className="text-sm text-black/60 font-medium max-w-[320px] whitespace-normal leading-tight">
                     {item.desc}
                   </p>
                   <div className="mt-6 flex items-center gap-6">
                      <div className="flex flex-col">
                        <span className="text-[8px] font-black opacity-30 uppercase tracking-widest">Version</span>
                        <span className="text-xs font-mono font-bold text-blue-600">{item.tech}</span>
                      </div>
                      <button className="px-6 py-2 bg-black text-white text-[10px] font-black tracking-widest uppercase rounded-full flex items-center gap-2 hover:bg-blue-600 transition-colors">
                        Deploy <ArrowUpRight size={14} />
                      </button>
                   </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Carousel Controls */}
        <div className="absolute bottom-20 flex items-center gap-12">
            <button onClick={prevSlide} className="w-14 h-14 rounded-full border border-white/10 flex items-center justify-center hover:bg-white hover:text-black transition-all">
                <ChevronLeft size={24} />
            </button>
            <div className="flex gap-3">
                {UTILITIES.map((_, i) => (
                    <div 
                        key={i} 
                        className={`h-1 transition-all duration-500 ${i === activeIndex ? 'w-12 bg-blue-500' : 'w-4 bg-white/10'}`}
                    />
                ))}
            </div>
            <button onClick={nextSlide} className="w-14 h-14 rounded-full border border-white/10 flex items-center justify-center hover:bg-white hover:text-black transition-all">
                <ChevronRight size={24} />
            </button>
        </div>
      </main>

      <style>{`
        .perspective-2000 { perspective: 2000px; }
        .stroke-text { -webkit-text-stroke: 1px rgba(255,255,255,0.2); color: transparent; }
      `}</style>
    </div>
  );
}
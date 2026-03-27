import React, { useRef, useEffect, useState } from "react";
import { Link } from "wouter";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import Header from "../components/Header";
import { 
  Terminal,
  Box,
  ChevronRight,
  Scissors,
  Database,
  FileText,
  Grid3x3
} from "lucide-react";
import { Button } from "@/components/ui/button";

const EXTENSIONS = [
  {
    id: "parametrix",
    name: "PARAMETRIX",
    description: "Professional parametric engine for complex multi-face architectural envelopes. Generate synchronized layouts with advanced trimming and rail systems.",
    tagline: "CLADDING GENERATOR",
    accent: "#3b82f6",
    details: ["Multi-Face", "Rail Systems", "Pattern Control"],
    icon: Box,
    price: "$49"
  },
  {
    id: "autonestcut",
    name: "AutoNestCut",
    description: "Intelligent cut-list optimization reducing material waste by up to 30%. Automated nesting algorithms for workshop efficiency.",
    tagline: "FABRICATION OPTIMIZER",
    accent: "#10b981",
    details: ["Smart Nesting", "Cut Lists", "Material Optimization"],
    icon: Scissors,
    price: "$39"
  },
  {
    id: "specbase",
    name: "SPECBASE",
    description: "AI-powered specification management for large-scale projects. Ask questions in natural language and get instant answers with citations.",
    tagline: "DOCUMENT INTELLIGENCE",
    accent: "#6366f1",
    details: ["AI Search", "Document Analysis", "100% Private"],
    icon: Database,
    price: "Free"
  },
  {
    id: "docmark",
    name: "DocMark",
    description: "Real-time markdown editor with live preview and synchronized scrolling. Perfect for technical documentation and content creation.",
    tagline: "MARKDOWN EDITOR",
    accent: "#a855f7",
    details: ["Live Preview", "Sync Scrolling", "PDF Export"],
    icon: FileText,
    price: "Free"
  },
  {
    id: "utilities",
    name: "Utilities",
    description: "Collection of focused extensions for quick alignment, layer management, array tools, and measurement utilities.",
    tagline: "ESSENTIAL TOOLS",
    accent: "#f59e0b",
    details: ["Quick Align", "Layer Manager", "Array Tools"],
    icon: Grid3x3,
    price: "Free-$15"
  }
];

const Slide = ({ tool, index, progress }: { tool: typeof EXTENSIONS[0], index: number, progress: any }) => {
  // Staggered timing ranges for this specific slide
  // 5 tools at 0%, 25%, 50%, 75%, 100%
  const start = index * 0.25;
  const end = (index + 1) * 0.25;

  // Horizontal translation of the whole slide
  const x = useTransform(progress, [0, 1], ["0%", "-400%"]);
  
  // Nested staggered animations for elements within the slide
  const titleMove = useTransform(progress, [start, start + 0.1, start + 0.15], [200, 0, -50]);
  const descOpacity = useTransform(progress, [start + 0.05, start + 0.12, start + 0.18], [0, 1, 0]);
  const boxRotate = useTransform(progress, [start, end], [0, 360]);
  const boxScale = useTransform(progress, [start, start + 0.1, start + 0.2], [0.5, 1.2, 0.8]);

  return (
    <motion.div 
      style={{ x }}
      className="relative w-screen h-screen flex-shrink-0 flex items-center justify-center px-10 md:px-24"
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 w-full max-w-7xl items-center">
        
        {/* Left: Text Content (Staggered Entrance) */}
        <div className="lg:col-span-7 space-y-8">
          <motion.div style={{ x: titleMove }}>
             <span className="text-[10px] font-black tracking-[0.6em] text-white/20 uppercase">Module // 0{index + 1}</span>
             <h2 className="text-6xl md:text-9xl font-black italic uppercase tracking-tighter leading-none mt-4">
               <span style={{ color: tool.accent }}>{tool.name}</span>
             </h2>
             <span className="text-sm font-black tracking-[0.4em] text-white/40 uppercase mt-2 block">{tool.tagline}</span>
          </motion.div>

          <motion.p 
            style={{ opacity: descOpacity }}
            className="text-white/40 max-w-md text-lg italic font-medium"
          >
            {tool.description}
          </motion.p>

          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="flex flex-wrap gap-4"
          >
            {tool.details.map((d: string, i: number) => (
              <div key={i} className="px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-[9px] font-black uppercase tracking-widest italic">
                {d}
              </div>
            ))}
          </motion.div>

          <div className="pt-10 flex items-center gap-6">
            <Link href={`/tools/${tool.id}`}>
              <Button className="bg-white text-black hover:bg-white/90 px-12 py-8 rounded-full font-black uppercase tracking-widest text-[10px] group shadow-2xl">
                View Details
                <ChevronRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
            <div className="text-2xl font-black" style={{ color: tool.accent }}>{tool.price}</div>
          </div>
        </div>

        {/* Right: Visual 3D Component (Nested Rotation/Scale) */}
        <div className="lg:col-span-5 relative flex justify-center items-center">
           <motion.div 
             style={{ rotate: boxRotate, scale: boxScale }}
             className="relative w-64 h-64 md:w-96 md:h-96"
           >
             <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent blur-3xl opacity-30"></div>
             <div className="relative h-full w-full bg-[#0c0c0e] border border-white/5 rounded-[60px] flex items-center justify-center shadow-2xl overflow-hidden">
                <div className="absolute inset-0 opacity-10">
                  <svg width="100%" height="100%"><pattern id={`g-${index}`} width="30" height="30" patternUnits="userSpaceOnUse"><path d="M 30 0 L 0 0 0 30" fill="none" stroke="white" strokeWidth="0.5"/></pattern><rect width="100%" height="100%" fill={`url(#g-${index})`} /></svg>
                </div>
                <tool.icon size={140} strokeWidth={1} style={{ color: tool.accent }} />
             </div>
           </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

const TimelineDot = ({ index, progress }: { index: number; progress: any }) => {
  const active = useTransform(progress, [index * 0.25, (index + 1) * 0.25], [1, 0.2]);
  return (
    <motion.div style={{ opacity: active }} className="flex items-center gap-4 group cursor-pointer">
      <div className="w-2 h-2 rounded-full bg-white"></div>
      <span className="text-[10px] font-black tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">
        0{index + 1}
      </span>
    </motion.div>
  );
};

export default function Tools() {
  const containerRef = useRef(null);
  const [isSnapping, setIsSnapping] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  
  // Driving the entire timeline with Vertical Scroll
  const { scrollYProgress } = useScroll({
    target: containerRef,
  });

  const smoothProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

  useEffect(() => {
    const media = window.matchMedia("(max-width: 767px)");
    const update = () => setIsMobile(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    if (isMobile) return;

    let snapTimeout: NodeJS.Timeout;
    let lastScrollTime = Date.now();

    const handleScroll = () => {
      lastScrollTime = Date.now();
      clearTimeout(snapTimeout);

      snapTimeout = setTimeout(() => {
        const timeSinceLastScroll = Date.now() - lastScrollTime;
        if (timeSinceLastScroll < 150 || isSnapping) return;

        const scrollTop = window.scrollY;
        const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
        const progress = scrollTop / totalHeight;
        
        // Find nearest snap point - 5 tools at equal intervals: 0%, 25%, 50%, 75%, 100%
        const snapPoints = [0, 0.25, 0.5, 0.75, 1.0];
        const nearest = snapPoints.reduce((prev, curr) => 
          Math.abs(curr - progress) < Math.abs(prev - progress) ? curr : prev
        );
        
        const distance = Math.abs(nearest - progress);
        
        // Only snap if within 8% of a snap point (but not too close to avoid jitter)
        if (distance < 0.08 && distance > 0.001) {
          setIsSnapping(true);
          const targetScroll = nearest * totalHeight;
          
          window.scrollTo({
            top: targetScroll,
            behavior: 'smooth'
          });
          
          setTimeout(() => setIsSnapping(false), 600);
        }
      }, 150);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(snapTimeout);
    };
  }, [isMobile, isSnapping]);

  if (isMobile) {
    return (
      <div className="bg-[#050505] text-white selection:bg-white selection:text-black overflow-x-hidden">
        <Header currentPage="tools" />
        <main className="px-4 pt-24 pb-10 space-y-4">
          <p className="text-[10px] tracking-[0.5em] uppercase font-black text-white/40">Mobile Modules</p>
          <h1 className="text-4xl font-black uppercase italic tracking-tight">Tools</h1>
          <p className="text-sm text-white/60 max-w-md">
            Swipe vertically to browse modules. Animations are optimized for touch to avoid gesture conflicts.
          </p>
          <div className="space-y-4 pt-3">
            {EXTENSIONS.map((tool) => (
              <Link key={tool.id} href={`/tools/${tool.id}`}>
                <article className="rounded-3xl border border-white/10 bg-[#0c0c0e] p-5 space-y-4">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="text-[9px] tracking-[0.4em] uppercase font-black text-white/40">{tool.tagline}</p>
                      <h2 className="text-2xl font-black italic uppercase leading-none mt-2" style={{ color: tool.accent }}>
                        {tool.name}
                      </h2>
                    </div>
                    <tool.icon size={34} color={tool.accent} />
                  </div>
                  <p className="text-sm text-white/60">{tool.description}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex flex-wrap gap-2">
                      {tool.details.map((detail) => (
                        <span key={detail} className="px-2.5 py-1 rounded-lg bg-white/5 text-[9px] uppercase tracking-wider">
                          {detail}
                        </span>
                      ))}
                    </div>
                    <span className="text-sm font-black" style={{ color: tool.accent }}>{tool.price}</span>
                  </div>
                </article>
              </Link>
            ))}
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="bg-[#050505] text-white selection:bg-white selection:text-black overflow-x-hidden">
      <Header currentPage="tools" />

      {/* Progress Timeline Indicator */}
      <div className="fixed left-12 top-1/2 -translate-y-1/2 z-50 hidden md:flex flex-col gap-12">
        {EXTENSIONS.map((_, i) => (
          <TimelineDot key={i} index={i} progress={smoothProgress} />
        ))}
      </div>

      {/* Main Scroll Container (Long Vertical Height) */}
      <div ref={containerRef} className="h-[400vh] relative">
        <div className="sticky top-0 h-screen w-full overflow-hidden flex">
          {EXTENSIONS.map((tool, index) => (
            <Slide key={tool.id} tool={tool} index={index} progress={smoothProgress} />
          ))}
        </div>
      </div>

      {/* Bottom Info Bar */}
      <div className="fixed bottom-12 left-12 right-12 z-50 hidden md:flex justify-between items-end pointer-events-none">
        <div className="flex items-center gap-4 text-[9px] font-black uppercase tracking-[0.4em] text-white/20">
          <Terminal size={14} /> Sequence Timeline Active
        </div>
        <div className="text-[9px] font-black uppercase tracking-[0.4em] text-white/20 text-right">
          © 2025 Studiø / Muhamad Shkeir
        </div>
      </div>
      
      {/* Scroll Guide */}
      <motion.div
        style={{ opacity: useTransform(smoothProgress, [0, 0.05], [1, 0]) }}
        className="fixed bottom-24 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center gap-4"
      >
        <span className="text-[9px] font-black uppercase tracking-[0.6em] text-white/40">Scroll to Explore</span>
        <motion.div 
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="w-[1px] h-12 bg-gradient-to-b from-white to-transparent"
        />
      </motion.div>
    </div>
  );
}

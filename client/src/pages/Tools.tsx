import React, { useRef, useEffect, useState } from "react";
import { Link } from "wouter";
import { motion, useScroll, useTransform, useSpring, MotionValue } from "framer-motion";
import Header from "../components/Header";
import { 
  Terminal,
  Box,
  ChevronRight,
  Scissors,
  Database,
  FileText,
  Grid3x3,
  Brain,
  Sparkles
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
    price: "$49",
    link: "/tools/parametrix"
  },
  {
    id: "autonestcut",
    name: "AutoNestCut",
    description: "Intelligent cut-list optimization reducing material waste by up to 30%. Automated nesting algorithms for workshop efficiency.",
    tagline: "FABRICATION OPTIMIZER",
    accent: "#10b981",
    details: ["Smart Nesting", "Cut Lists", "Material Optimization"],
    icon: Scissors,
    price: "$39",
    link: "/tools/autonestcut"
  },
  {
    id: "specbase",
    name: "SPECBASE",
    description: "AI-powered specification management for large-scale projects. Ask questions in natural language and get instant answers with citations.",
    tagline: "DOCUMENT INTELLIGENCE",
    accent: "#6366f1",
    details: ["AI Search", "Document Analysis", "100% Private"],
    icon: Database,
    price: "Free",
    link: "/tools/specbase"
  },
  {
    id: "constructlm",
    name: "ConstructLM",
    description: "Production-grade RAG system with TRUE local embeddings. Multi-model AI support with 26+ models, zero embedding costs, and complete privacy.",
    tagline: "AI KNOWLEDGE ENGINE",
    accent: "#ec4899",
    details: ["Local RAG", "26+ Models", "Zero API Cost"],
    icon: Brain,
    price: "Free",
    link: "/tools/constructlm"
  },
  {
    id: "mievents",
    name: "MI Events",
    description: "All-in-One AI assistant with voice dictation, image generation, and intelligent chat. Multi-modal AI powered by Google Gemini.",
    tagline: "UNIFIED INTELLIGENCE",
    accent: "#06b6d4",
    details: ["AI Chat", "Voice Dictation", "Image Gen"],
    icon: Sparkles,
    price: "Free",
    link: "/tools/mievents"
  },
  {
    id: "docmark",
    name: "DocMark",
    description: "Real-time markdown editor with live preview and synchronized scrolling. Perfect for technical documentation and content creation.",
    tagline: "MARKDOWN EDITOR",
    accent: "#a855f7",
    details: ["Live Preview", "Sync Scrolling", "PDF Export"],
    icon: FileText,
    price: "Free",
    link: "/tools/docmark"
  },
  {
    id: "utilities",
    name: "Utilities",
    description: "Collection of focused extensions for quick alignment, layer management, array tools, and measurement utilities.",
    tagline: "ESSENTIAL TOOLS",
    accent: "#f59e0b",
    details: ["Quick Align", "Layer Manager", "Array Tools"],
    icon: Grid3x3,
    price: "Free-$15",
    link: "/tools/utilities"
  }
];

interface SlideProps {
  tool: typeof EXTENSIONS[0];
  index: number;
  progress: MotionValue<number>;
}

const Slide = ({ tool, index, progress }: SlideProps) => {
  const totalSlides = 7;
  const actualSnapPoint = index / (totalSlides - 1); // 0, 0.25, 0.5, 0.75, 1.0
  const nextSnapPoint = index < totalSlides - 1 ? (index + 1) / (totalSlides - 1) : 1;
  const prevSnapPoint = index > 0 ? (index - 1) / (totalSlides - 1) : 0;
  
  const x = useTransform(progress, [0, 1], ["0%", `-${(totalSlides - 1) * 100}%`]);
  
  const midToPrev = (actualSnapPoint + prevSnapPoint) / 2;
  const midToNext = (actualSnapPoint + nextSnapPoint) / 2;
  
  // Fix: Clamp contentAlign for last module to prevent jump
  const contentAlign = useTransform(
    progress,
    [
      midToPrev, 
      actualSnapPoint, 
      index === totalSlides - 1 ? 1.0 : midToNext
    ],
    [
      30, 
      0, 
      index === totalSlides - 1 ? 0 : -30
    ]
  );

  const textOpacity = useTransform(
    progress,
    [
      midToPrev,
      actualSnapPoint - 0.02,
      actualSnapPoint,
      actualSnapPoint + 0.02,
      midToNext
    ],
    [0.15, 0.6, 1, 0.6, 0.15]
  );

  // Different animation per module
  let boxRotate, boxScale, titleY, descY, buttonY, buttonScale;

  if (index === 0) {
    boxRotate = useTransform(progress, [prevSnapPoint, actualSnapPoint, nextSnapPoint], [180, 0, -180]);
    boxScale = useTransform(progress, [prevSnapPoint, midToPrev, actualSnapPoint, midToNext, nextSnapPoint], [0.7, 0.9, 1.2, 0.9, 0.7]);
    titleY = useTransform(progress, [midToPrev, actualSnapPoint, midToNext], [80, 0, -80]);
    descY = useTransform(progress, [midToPrev, actualSnapPoint, midToNext], [120, 0, -120]);
    buttonY = useTransform(progress, [midToPrev, actualSnapPoint, midToNext], [150, 0, -150]);
    buttonScale = useTransform(progress, [midToPrev, actualSnapPoint, midToNext], [0.8, 1, 0.8]);
  } else if (index === 1) {
    boxRotate = useTransform(progress, [prevSnapPoint, actualSnapPoint, nextSnapPoint], [360, 0, -360]);
    boxScale = useTransform(progress, [prevSnapPoint, midToPrev, actualSnapPoint, midToNext, nextSnapPoint], [0.6, 0.85, 1.3, 0.85, 0.6]);
    titleY = useTransform(progress, [midToPrev, actualSnapPoint, midToNext], [100, 0, -100]);
    descY = useTransform(progress, [midToPrev, actualSnapPoint, midToNext], [60, 0, -60]);
    buttonY = useTransform(progress, [midToPrev, actualSnapPoint, midToNext], [180, 0, -180]);
    buttonScale = useTransform(progress, [midToPrev, actualSnapPoint, midToNext], [0.7, 1.1, 0.7]);
  } else if (index === 2) {
    boxRotate = useTransform(progress, [prevSnapPoint, midToPrev, actualSnapPoint, midToNext, nextSnapPoint], [90, 45, 0, -45, -90]);
    boxScale = useTransform(progress, [prevSnapPoint, midToPrev, actualSnapPoint, midToNext, nextSnapPoint], [0.75, 1.0, 1.25, 1.0, 0.75]);
    titleY = useTransform(progress, [midToPrev, actualSnapPoint, midToNext], [50, 0, -50]);
    descY = useTransform(progress, [midToPrev, actualSnapPoint, midToNext], [150, 0, -150]);
    buttonY = useTransform(progress, [midToPrev, actualSnapPoint, midToNext], [100, 0, -100]);
    buttonScale = useTransform(progress, [midToPrev, actualSnapPoint, midToNext], [0.85, 1.05, 0.85]);
  } else if (index === 3) {
    boxRotate = useTransform(progress, [prevSnapPoint, actualSnapPoint, nextSnapPoint], [120, 0, -120]);
    boxScale = useTransform(progress, [prevSnapPoint, midToPrev, actualSnapPoint, midToNext, nextSnapPoint], [0.8, 0.95, 1.15, 0.95, 0.8]);
    titleY = useTransform(progress, [midToPrev, actualSnapPoint, midToNext], [70, 0, -70]);
    descY = useTransform(progress, [midToPrev, actualSnapPoint, midToNext], [90, 0, -90]);
    buttonY = useTransform(progress, [midToPrev, actualSnapPoint, midToNext], [130, 0, -130]);
    buttonScale = useTransform(progress, [midToPrev, actualSnapPoint, midToNext], [0.9, 1, 0.9]);
  } else {
    // Last module - stays at max
    boxRotate = useTransform(progress, [prevSnapPoint, actualSnapPoint, Math.min(nextSnapPoint, 1.0)], [120, 0, 0]);
    boxScale = useTransform(progress, [prevSnapPoint, midToPrev, actualSnapPoint, Math.min(midToNext, 1.0), Math.min(nextSnapPoint, 1.0)], [0.8, 0.95, 1.15, 1.15, 1.15]);
    titleY = useTransform(progress, [midToPrev, actualSnapPoint, midToNext], [70, 0, 0]);
    descY = useTransform(progress, [midToPrev, actualSnapPoint, midToNext], [90, 0, 0]);
    buttonY = useTransform(progress, [midToPrev, actualSnapPoint, midToNext], [130, 0, 0]);
    buttonScale = useTransform(progress, [midToPrev, actualSnapPoint, midToNext], [0.9, 1, 1]);
  }

  return (
    <motion.div 
      style={{ x }}
      className="relative w-screen h-screen flex-shrink-0 flex items-center justify-center px-6 sm:px-10 md:px-24"
    >
      <motion.div 
        style={{ x: contentAlign }}
        className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 w-full max-w-7xl items-center"
      >
        <div className="lg:col-span-7 space-y-6 lg:space-y-8 relative z-20">
          <motion.div style={{ y: titleY }} className="relative z-20">
            <span className="text-[10px] font-black tracking-[0.6em] text-white/20 uppercase">{tool.tagline}</span>
            <h2 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-black italic uppercase tracking-tighter leading-none mt-4 whitespace-nowrap overflow-visible">
              <span style={{ color: tool.accent }}>{tool.name}</span>
            </h2>
          </motion.div>

          <motion.p 
            style={{ opacity: textOpacity, y: descY }}
            className="text-white/60 max-w-md text-base sm:text-lg italic font-medium transition-opacity duration-100 relative z-20"
          >
            {tool.description}
          </motion.p>

          <div className="flex flex-wrap gap-3 lg:gap-4 relative z-20">
            {tool.details.map((d, i) => (
              <div key={i} className="px-4 py-1.5 lg:px-5 lg:py-2 bg-white/5 border border-white/10 rounded-full text-[9px] font-black uppercase tracking-widest italic text-white/60">
                {d}
              </div>
            ))}
          </div>

          <motion.div className="pt-4 lg:pt-6 flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6 relative z-20" style={{ y: buttonY, scale: buttonScale }}>
            <Link href={tool.link}>
              <Button className="bg-white text-black hover:bg-white/90 px-10 py-6 lg:px-12 lg:py-8 rounded-full font-black uppercase tracking-widest text-[10px] group shadow-2xl whitespace-nowrap">
                View Details
                <ChevronRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
            <div className="text-2xl lg:text-3xl font-black" style={{ color: tool.accent }}>{tool.price}</div>
          </motion.div>
        </div>

        <div className="lg:col-span-5 relative flex justify-center items-center mt-8 lg:mt-0 z-10">
          <motion.div 
            style={{ 
              rotate: boxRotate, 
              scale: boxScale
            }}
            className="relative w-56 h-56 sm:w-64 sm:h-64 md:w-80 md:h-80 lg:w-96 lg:h-96 transition-all"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent blur-3xl opacity-20"></div>
            <div className="relative h-full w-full bg-[#0c0c0e] border border-white/5 rounded-[40px] md:rounded-[60px] flex items-center justify-center shadow-2xl overflow-hidden">
              <div className="absolute inset-0 opacity-10">
                <svg width="100%" height="100%">
                  <pattern id={`g-${index}`} width="40" height="40" patternUnits="userSpaceOnUse">
                    <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="0.5"/>
                  </pattern>
                  <rect width="100%" height="100%" fill={`url(#g-${index})`} />
                </svg>
              </div>
              <tool.icon size={120} strokeWidth={1} style={{ color: tool.accent }} className="w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 lg:w-40 lg:h-40" />
            </div>
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default function Tools() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [debugProgress, setDebugProgress] = useState(0);
  
  const { scrollYProgress } = useScroll({
    container: scrollContainerRef,
  });

  const smoothProgress = useSpring(scrollYProgress, { 
    stiffness: 80,
    damping: 30,
    mass: 0.5
  });

  useEffect(() => {
    const unsubscribe = smoothProgress.on('change', (v) => setDebugProgress(v));
    return () => unsubscribe();
  }, [smoothProgress]);

  // CRITICAL: Prevent body scroll and restore on unmount
  useEffect(() => {
    // Save original overflow style
    const originalOverflow = document.body.style.overflow;
    const originalHeight = document.body.style.height;
    
    // Disable body scroll while Tools page is mounted
    document.body.style.overflow = 'hidden';
    document.body.style.height = '100vh';
    
    // Debug logging
    console.log('[Tools] Body scroll locked', { originalOverflow, originalHeight });
    
    // Cleanup: Restore original scroll behavior when leaving page
    return () => {
      document.body.style.overflow = originalOverflow;
      document.body.style.height = originalHeight;
      console.log('[Tools] Body scroll restored', { originalOverflow, originalHeight });
    };
  }, []);

  return (
    <div className="bg-[#050505] text-white selection:bg-white selection:text-black h-screen w-full fixed inset-0 font-sans">
      <style>{`
        .snap-container {
          scroll-snap-type: y mandatory;
          overflow-y: scroll;
          overflow-x: hidden;
          height: 100vh;
          width: 100%;
          scrollbar-width: none;
          -ms-overflow-style: none;
          position: relative;
        }
        .snap-container::-webkit-scrollbar {
          display: none;
        }
        .snap-section {
          scroll-snap-align: start;
          scroll-snap-stop: always;
          height: 100vh;
          width: 100%;
          pointer-events: none;
        }
      `}</style>

      <Header currentPage="tools" />

      {/* Progress Dots */}
      <div className="fixed left-12 top-1/2 -translate-y-1/2 z-50 hidden md:flex flex-col gap-12">
        {EXTENSIONS.map((tool, i) => {
          const snapPoint = i / (EXTENSIONS.length - 1);
          const isActive = Math.abs(debugProgress - snapPoint) < 0.05;
          return (
            <motion.div 
              key={i} 
              style={{ opacity: isActive ? 1 : 0.2 }}
              className="flex items-center gap-4 transition-opacity group cursor-pointer"
              onClick={() => {
                const container = scrollContainerRef.current;
                if (container) {
                  container.scrollTo({
                    top: (container.scrollHeight / EXTENSIONS.length) * i,
                    behavior: 'smooth'
                  });
                }
              }}
            >
              <div className="w-2 h-2 rounded-full bg-white"></div>
              <span className="text-[10px] font-black tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">
                {tool.name}
              </span>
            </motion.div>
          );
        })}
      </div>

      <div ref={scrollContainerRef} className="snap-container relative">
        <div className="h-[700vh] relative">
          
          {/* Main Visual Layer */}
          <div className="sticky top-0 h-screen w-full overflow-hidden flex">
            {EXTENSIONS.map((tool, index) => (
              <Slide key={tool.id} tool={tool} index={index} progress={smoothProgress} />
            ))}
          </div>
          
          {/* Physical Snap Sections — pointer-events-none so they don't block button clicks */}
          <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
            {EXTENSIONS.map((tool) => (
              <div key={`snap-${tool.id}`} className="snap-section pointer-events-none" />
            ))}
          </div>
        </div>
      </div>

      {/* Footer Meta */}
      <div className="fixed bottom-12 left-12 right-12 z-50 flex justify-between items-end pointer-events-none">
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
        className="fixed bottom-32 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center gap-4 pointer-events-none"
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

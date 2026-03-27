import React, { useRef, useState } from "react";
import { Link } from "wouter";
import { motion, useScroll, useTransform, useSpring, useMotionValue } from "framer-motion";
import Header from "../components/Header";
import { 
  Box, 
  Lock, 
  Zap, 
  Settings2, 
  ArrowRight, 
  Star, 
  Sparkles, 
  ChevronLeft, 
  ChevronRight 
} from "lucide-react";

const FEATURED_TOOLS = [
  {
    name: "PARAMETRIX",
    description: "Parametric cladding layout generator. Handle complex multi-face geometries with advanced trimming and pattern synchronization.",
    path: "/tools/parametrix",
    color: "#FF4B33"
  },
  {
    name: "AutoNestCut",
    description: "Intelligent cut list generation and nesting optimization. Maximize material efficiency with automated layout algorithms.",
    path: "/tools/autonestcut",
    color: "#33FFB1"
  },
  {
    name: "SPECBASE",
    description: "Comprehensive specification database management. Organize materials, products, and technical data with powerful search.",
    path: "/tools/specbase",
    color: "#3381FF"
  },
  {
    name: "DocMark",
    description: "Professional documentation and markup system. Streamline project annotations, revisions, and technical documentation workflows.",
    path: "/tools/docmark",
    color: "#FFFAFA"
  }
];

const VALUE_PROPS = [
  { icon: Box, title: "Algorithmic Precision", description: "Mathematical accuracy for complex geometries" },
  { icon: Zap, title: "Production Ready", description: "Built for real-world architectural projects" },
  { icon: Settings2, title: "Deep Customization", description: "Extensive parameters for exact control" },
  { icon: Lock, title: "Reliable Output", description: "Consistent results across complex scenarios" },
];

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);
  const carouselRef = useRef<HTMLDivElement>(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState(0);
  const [dragOffset, setDragOffset] = useState(0);

  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);

  const handleMouseMoveGlobal = (e: React.MouseEvent) => {
    const { clientX, clientY } = e;
    const { innerWidth, innerHeight } = window;
    mouseX.set(clientX / innerWidth);
    mouseY.set(clientY / innerHeight);
  };

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const bgColor = useTransform(
    smoothProgress,
    [0, 0.5, 1],
    ["rgba(240, 242, 245, 1)", "rgba(230, 235, 240, 1)", "rgba(220, 225, 235, 1)"]
  );

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1 < FEATURED_TOOLS.length ? prev + 1 : prev));
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 >= 0 ? prev - 1 : prev));

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setDragStart(e.clientX);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    setDragOffset(e.clientX - dragStart);
  };

  const handleMouseUp = () => {
    if (!isDragging) return;
    setIsDragging(false);
    if (dragOffset > 80) prevSlide();
    else if (dragOffset < -80) nextSlide();
    setDragOffset(0);
  };

  const rotateX = useTransform(mouseY, [0, 1], [10, -10]);
  const rotateY = useTransform(mouseX, [0, 1], [-10, 10]);

  return (
    <motion.div 
      className="h-screen overflow-y-scroll overflow-x-hidden snap-y snap-mandatory selection:bg-blue-200" 
      style={{ backgroundColor: bgColor }} 
      ref={containerRef}
      onMouseMove={handleMouseMoveGlobal}
    >
      <Header currentPage="home" />

      {/* Hero Section */}
      <section className="h-screen w-full flex items-center justify-center snap-center px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="text-center max-w-7xl"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-6xl md:text-8xl font-black tracking-tighter leading-[0.9] mb-8 text-slate-900">
            Tools Built for<br />
            <span className="italic" style={{ color: '#0047AB' }}>Precision & Complexity</span>
          </h1>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-slate-600 leading-relaxed">
            Advanced automation and parametric solutions for architectural workflows. 
            Tailored for modern design excellence.
          </p>
          <div className="mt-10 flex justify-center gap-6">
            <Link href="/tools">
              <button className="px-8 py-4 bg-black text-white rounded-full font-bold hover:scale-105 transition-transform flex items-center shadow-xl">
                Explore Tools <ArrowRight className="ml-2 h-4 w-4" />
              </button>
            </Link>
            <Link href="/pricing">
              <button className="px-8 py-4 bg-white border border-slate-200 rounded-full font-bold hover:bg-slate-50 transition-colors shadow-lg">
                View Pricing
              </button>
            </Link>
          </div>
        </motion.div>
      </section>

      {/* Featured Spotlight Carousel */}
      <section className="h-screen w-full flex items-center justify-center snap-center">
        <div className="w-full max-w-4xl relative px-4">
          <motion.div 
            className="overflow-visible rounded-[2.5rem] cursor-grab active:cursor-grabbing"
            style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
            ref={carouselRef}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
          >
            <motion.div
              className="flex"
              animate={{ x: `calc(-${currentSlide * 100}% + ${dragOffset}px)` }}
              transition={isDragging ? { type: "tween", duration: 0 } : { type: "spring", stiffness: 200, damping: 25 }}
            >
              {FEATURED_TOOLS.map((tool, index) => {
                const isLightBg = tool.color === "#FFFAFA";
                const isActive = index === currentSlide;
                const depthFactor = (index - currentSlide);
                const dragFactor = dragOffset * 0.15;

                return (
                  <div key={index} className="w-full flex-shrink-0 p-4" style={{ transformStyle: 'preserve-3d' }}>
                    <motion.div 
                      className="relative min-h-[500px] p-12 md:p-20 flex flex-col justify-center rounded-[2.5rem] overflow-hidden shadow-[0_50px_100px_-20px_rgba(0,0,0,0.3)]"
                      style={{ background: tool.color }}
                      animate={{ 
                        scale: isActive ? 1 : 0.9,
                        opacity: isActive ? 1 : 0.4,
                        rotateY: isActive ? 0 : (depthFactor > 0 ? -15 : 15)
                      }}
                    >
                      <motion.div 
                        className={`absolute -right-16 -bottom-16 text-[25rem] font-black select-none pointer-events-none ${isLightBg ? 'text-black/[0.03]' : 'text-white/[0.07]'}`}
                        animate={{ x: (depthFactor * 150) + dragFactor, z: -100 }}
                      >
                        {index + 1}
                      </motion.div>

                      <div className="relative z-10" style={{ transformStyle: 'preserve-3d' }}>
                        <motion.div 
                          className={`flex items-center space-x-3 mb-8 ${isLightBg ? 'text-slate-400' : 'text-white/60'}`}
                          animate={{ x: (depthFactor * -40) - dragFactor * 0.5, z: 50 }}
                        >
                          <Star className="w-6 h-6 fill-current" />
                          <span className="text-sm font-black uppercase tracking-[0.3em]">Module {index + 1}</span>
                        </motion.div>

                        <motion.h2 
                          className={`text-6xl md:text-8xl font-black mb-8 tracking-tighter leading-none ${isLightBg ? 'text-black' : 'text-white'}`}
                          animate={{ x: (depthFactor * -120) - dragFactor * 1.2, z: 100 }}
                        >
                          {tool.name}
                        </motion.h2>

                        <motion.p 
                          className={`text-xl md:text-2xl mb-12 leading-relaxed max-w-xl font-medium ${isLightBg ? 'text-slate-600' : 'text-white/80'}`}
                          animate={{ x: (depthFactor * -80) - dragFactor * 0.8, z: 70 }}
                        >
                          {tool.description}
                        </motion.p>

                        <motion.div animate={{ x: (depthFactor * -160) - dragFactor * 1.5, z: 150 }}>
                          <Link href={tool.path}>
                            <button className={`group px-12 py-5 rounded-2xl font-black text-sm uppercase tracking-widest transition-all hover:scale-110 active:scale-95 shadow-2xl ${isLightBg ? 'bg-black text-white' : 'bg-white text-black'}`}>
                              View Details <ArrowRight className="ml-3 w-5 h-5 inline group-hover:translate-x-2 transition-transform" />
                            </button>
                          </Link>
                        </motion.div>
                      </div>
                    </motion.div>
                  </div>
                );
              })}
            </motion.div>
          </motion.div>

          <div className="absolute top-1/2 -translate-y-1/2 -left-20 -right-20 justify-between pointer-events-none hidden lg:flex">
            <button onClick={prevSlide} className="pointer-events-auto w-16 h-16 bg-white/10 backdrop-blur-xl border border-white/20 rounded-full shadow-2xl flex items-center justify-center hover:bg-white transition-all">
              <ChevronLeft className="w-8 h-8" />
            </button>
            <button onClick={nextSlide} className="pointer-events-auto w-16 h-16 bg-white/10 backdrop-blur-xl border border-white/20 rounded-full shadow-2xl flex items-center justify-center hover:bg-white transition-all">
              <ChevronRight className="w-8 h-8" />
            </button>
          </div>
        </div>
      </section>

      {/* Latest Release */}
      <section className="h-screen w-full flex items-center justify-center snap-center px-4">
        <div className="bg-white rounded-[3rem] p-12 md:p-16 shadow-2xl flex flex-col md:flex-row items-center gap-12 border border-slate-100 max-w-6xl w-full">
          <div className="w-24 h-24 bg-blue-600 rounded-3xl flex items-center justify-center shadow-lg">
            <Sparkles className="w-12 h-12 text-white" />
          </div>
          <div className="flex-1 text-center md:text-left">
            <h3 className="text-3xl font-black mb-4 tracking-tight">AutoNestCut Now Available</h3>
            <p className="text-slate-500 text-lg max-w-xl">
              The most advanced nesting engine for Rhino and SketchUp. Save up to 30% on material costs instantly.
            </p>
          </div>
          <Link href="/tools">
            <button className="px-10 py-5 bg-black text-white rounded-full font-bold hover:scale-105 transition-transform">
              Get Access
            </button>
          </Link>
        </div>
      </section>

      {/* Value Propositions */}
      <section className="h-screen w-full flex items-center justify-center snap-center px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl">
          {VALUE_PROPS.map((prop, index) => (
            <motion.div 
              key={index} 
              className="bg-white/50 backdrop-blur-md p-10 rounded-[2.5rem] text-center border border-white/20 hover:bg-white transition-colors"
              whileHover={{ y: -10 }}
            >
              <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center mx-auto mb-6 text-blue-600">
                <prop.icon size={32} />
              </div>
              <h3 className="text-xl font-bold mb-3">{prop.title}</h3>
              <p className="text-slate-500">{prop.description}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="h-screen w-full flex items-center justify-center snap-center px-4">
        <div className="relative overflow-hidden rounded-[4rem] bg-black text-white p-20 text-center max-w-7xl w-full h-[80vh] flex flex-col justify-center">
          <motion.div 
            className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-blue-900/40 to-transparent pointer-events-none"
            animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.5, 0.3] }}
            transition={{ duration: 8, repeat: Infinity }}
          />
          <div className="relative z-10">
            <h2 className="text-5xl md:text-7xl font-black mb-8 tracking-tighter">Ready to Transform<br/>Your Workflow?</h2>
            <p className="text-xl text-slate-400 mb-12 max-w-2xl mx-auto font-medium">
              Join thousands of architects pushing the boundaries of what's possible with our parametric tools.
            </p>
            <Link href="/tools">
              <button className="px-12 py-6 bg-blue-600 text-white rounded-full text-xl font-bold hover:bg-blue-500 transition-colors shadow-2xl shadow-blue-500/20">
                Get Started Now
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="h-[20vh] w-full flex items-center justify-center border-t border-slate-200">
        <div className="flex flex-col items-center gap-4 text-slate-400 font-medium uppercase tracking-widest text-[10px]">
          <span>© 2025 STUDIØ</span>
          <span>Developed by Int. Arch. M.Shkeir</span>
        </div>
      </footer>

      <style>{`
        .h-screen::-webkit-scrollbar {
          display: none;
        }
        .h-screen {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </motion.div>
  );
}

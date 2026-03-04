import { Link } from "wouter";
import { motion, useScroll, useTransform, useSpring, useInView } from "framer-motion";
import { Box, Lock, Zap, Settings2, ArrowRight, Star, Sparkles, ChevronLeft, ChevronRight } from "lucide-react";
import { useRef, useState, useEffect } from "react";

// Mock Navigation Component (since it's an external import in your snippet)
const Navigation = () => (
  <nav className="fixed top-0 w-full z-50 p-6 flex justify-between items-center bg-transparent backdrop-blur-sm">
    <div className="font-bold text-xl tracking-tighter">STUDIØ</div>
    <div className="flex gap-6 text-sm font-medium">
      <Link href="/tools">Tools</Link>
      <Link href="/pricing">Pricing</Link>
    </div>
  </nav>
);

export default function Home() {
  const containerRef = useRef(null);
  const carouselRef = useRef(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState(0);
  const [dragOffset, setDragOffset] = useState(0);

  // Scroll Tracking
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Smooth Spring for "GSAP-like" momentum
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  // --- HERO PARALLAX ---
  const heroY = useTransform(smoothProgress, [0, 0.3], [0, -150]);
  const heroOpacity = useTransform(smoothProgress, [0, 0.2], [1, 0]);
  const heroTextScale = useTransform(smoothProgress, [0, 0.3], [1, 0.8]);
  
  // --- BACKGROUND COLOR SHIFT ---
  const bgColor = useTransform(
    smoothProgress,
    [0, 0.5, 1],
    ["rgba(240, 242, 245, 1)", "rgba(230, 235, 240, 1)", "rgba(220, 225, 235, 1)"]
  );

  // --- FEATURED SECTION PARALLAX ---
  const featuredY = useTransform(smoothProgress, [0.1, 0.6], [200, -150]);
  const featuredRotate = useTransform(smoothProgress, [0.1, 0.6], [5, -5]);
  const featuredScale = useTransform(smoothProgress, [0.1, 0.4, 0.6], [0.85, 1, 0.9]);

  // --- RELEASE SECTION PARALLAX (Moves Faster) ---
  const releaseY = useTransform(smoothProgress, [0.3, 0.8], [150, -200]);
  const releaseScale = useTransform(smoothProgress, [0.3, 0.6], [0.9, 1]);

  // --- VALUE PROPS (Staggered Floating) ---
  const propsY = useTransform(smoothProgress, [0.5, 0.9], [100, -100]);

  // --- CTA PARALLAX ---
  const ctaY = useTransform(smoothProgress, [0.7, 1], [150, 0]);
  const ctaScale = useTransform(smoothProgress, [0.8, 1], [0.8, 1]);

  const featuredTools = [
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

  const valueProps = [
    { icon: Box, title: "Algorithmic Precision", description: "Mathematical accuracy for complex geometries" },
    { icon: Zap, title: "Production Ready", description: "Built for real-world architectural projects" },
    { icon: Settings2, title: "Deep Customization", description: "Extensive parameters for exact control" },
    { icon: Lock, title: "Reliable Output", description: "Consistent results across complex scenarios" },
  ];

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1 < featuredTools.length ? prev + 1 : prev));
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
    if (dragOffset > 50) prevSlide();
    else if (dragOffset < -50) nextSlide();
    setDragOffset(0);
  };

  return (
    <motion.div 
      className="h-screen overflow-y-scroll overflow-x-hidden snap-y snap-proximity selection:bg-blue-200" 
      style={{ backgroundColor: bgColor }} 
      ref={containerRef}
    >
      <Navigation />

      {/* Hero Section */}
      <section className="min-h-screen w-full flex items-center justify-center snap-center px-4 sm:px-6 lg:px-8 pt-20">
        <motion.div
          className="text-center relative z-10 max-w-7xl w-full"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
            <h1 className="text-6xl md:text-8xl font-black tracking-tighter leading-[0.9] mb-8">
              Tools Built for<br />
              <span className="italic" style={{ color: '#0047AB' }}>Precision & Complexity</span>
            </h1>
            <p className="mt-4 max-w-2xl mx-auto text-lg text-slate-600 leading-relaxed">
              Advanced automation and parametric solutions for architectural workflows. 
              Tailored for Muhamad's vision of modern design.
            </p>
            <div className="mt-10 flex justify-center gap-6">
              <Link href="/tools">
                <button className="px-8 py-4 bg-black text-white rounded-full font-bold hover:scale-105 transition-transform flex items-center shadow-xl">
                  Explore Tools <ArrowRight className="ml-2 h-5 w-5" />
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
      <section className="min-h-screen w-full flex items-center justify-center snap-center pt-20">
        <motion.div 
          className="w-full max-w-4xl relative px-4"
        >
            <div 
              className="overflow-hidden rounded-[2.5rem] shadow-2xl border border-white/20"
              ref={carouselRef}
            >
              <motion.div
                className="flex"
                animate={{ x: `-${currentSlide * 100}%` }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              >
                {featuredTools.map((tool, index) => {
                  const isLightBg = tool.color === "#FFFAFA";
                  return (
                  <div key={index} className="w-full flex-shrink-0 p-3">
                    <div 
                      className="relative min-h-[450px] p-10 md:p-16 flex flex-col justify-center rounded-[2rem] overflow-hidden"
                      style={{ background: tool.color }}
                    >
                      {/* Inner Parallax Element */}
                      <div 
                        className={`absolute -right-20 -bottom-20 text-[20rem] font-bold select-none ${isLightBg ? 'text-black/5' : 'text-white/10'}`}
                      >
                        {index + 1}
                      </div>

                      <div className="relative z-10">
                        <div className={`flex items-center space-x-3 mb-6 ${isLightBg ? 'text-slate-500' : 'text-white/70'}`}>
                          <Star className="w-5 h-5 fill-current" />
                          <span className="text-sm font-bold uppercase tracking-widest">Featured Module</span>
                        </div>
                        <h2 className={`text-5xl md:text-7xl font-black mb-6 tracking-tighter ${isLightBg ? 'text-black' : 'text-white'}`}>
                          {tool.name}
                        </h2>
                        <p className={`text-xl md:text-2xl mb-10 leading-relaxed max-w-2xl ${isLightBg ? 'text-slate-700' : 'text-white/80'}`}>
                          {tool.description}
                        </p>
                        <Link href={tool.path}>
                          <button className={`px-10 py-4 rounded-full font-bold hover:shadow-2xl transition-all ${isLightBg ? 'bg-black text-white' : 'bg-white text-black'}`}>
                            Learn More
                          </button>
                        </Link>
                      </div>
                    </div>
                  </div>
                  );
                })}
              </motion.div>
            </div>

            {/* Carousel Nav */}
            <div className="absolute top-1/2 -translate-y-1/2 -left-12 -right-12 flex justify-between pointer-events-none">
                <button onClick={prevSlide} className="pointer-events-auto w-12 h-12 bg-white rounded-full shadow-xl flex items-center justify-center hover:scale-110 transition-transform">
                  <ChevronLeft className="w-6 h-6" />
                </button>
                <button onClick={nextSlide} className="pointer-events-auto w-12 h-12 bg-white rounded-full shadow-xl flex items-center justify-center hover:scale-110 transition-transform">
                  <ChevronRight className="w-6 h-6" />
                </button>
          </div>
        </motion.div>
      </section>

      {/* Latest Release */}
      <section className="min-h-screen w-full flex items-center justify-center snap-center px-4">
        <div className="w-full max-w-6xl">
          <div className="bg-white rounded-[3rem] p-12 md:p-16 shadow-2xl flex flex-col md:flex-row items-center gap-12 border border-slate-100">
            <div className="w-24 h-24 bg-blue-600 rounded-3xl flex items-center justify-center shadow-lg shadow-blue-200">
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
        </div>
      </section>

      {/* Value Propositions */}
      <section className="min-h-screen w-full flex items-center justify-center snap-center px-4">
        <div className="w-full max-w-7xl">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {valueProps.map((prop, index) => (
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
        </div>
      </section>

      {/* CTA Section */}
      <section className="min-h-screen w-full flex items-center justify-center snap-center px-4">
        <div className="relative overflow-hidden rounded-[4rem] bg-black text-white p-20 text-center max-w-7xl w-full min-h-[70vh] flex flex-col justify-center">
          {/* Animated Background Blob */}
          <motion.div 
            className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-blue-900/40 to-transparent"
            animate={{ 
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.6, 0.3]
            }}
            transition={{ duration: 8, repeat: Infinity }}
          />

          <div className="relative z-10 px-6">
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
      <footer className="min-h-[20vh] w-full flex items-center justify-center border-t border-slate-200">
        <div className="flex flex-col items-center gap-4 text-slate-400 font-medium uppercase tracking-widest text-xs">
          <span>© 2025 STUDIØ</span>
          <div className="h-8 w-[1px] bg-slate-200" />
          <span>Curated for Muhamad</span>
          <span>Developed by Int. Arch. M.Shkeir</span>
        </div>
      </footer>
      
      {/* Visual Enhancer: Smooth Scroll CSS */}
      <style>{`
        html {
          scroll-behavior: smooth;
        }
        .perspective-1000 {
          perspective: 1000px;
        }
      `}</style>
    </motion.div>
  );
}
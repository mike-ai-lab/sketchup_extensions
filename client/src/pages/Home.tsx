import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { motion, useScroll, useTransform } from "framer-motion";
import { Box, Lock, Zap, Settings2, ArrowRight, Star, Sparkles } from "lucide-react";
import { useRef, useEffect } from "react";
import Navigation from "@/components/Navigation";

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);
  const swiperInitialized = useRef(false);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Parallax transforms for different sections
  const heroY = useTransform(scrollYProgress, [0, 0.3], [0, -50]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  
  const featuredY = useTransform(scrollYProgress, [0.1, 0.5], [100, -50]);
  const featuredScale = useTransform(scrollYProgress, [0.1, 0.3, 0.5], [0.95, 1, 0.98]);
  
  const releaseY = useTransform(scrollYProgress, [0.3, 0.6], [50, -30]);
  
  const valuePropsY = useTransform(scrollYProgress, [0.4, 0.8], [80, -40]);
  
  const ctaY = useTransform(scrollYProgress, [0.6, 1], [60, 0]);
  const ctaOpacity = useTransform(scrollYProgress, [0.6, 0.8], [0, 1]);

  const featuredTools = [
    {
      name: "PARAMETRIX",
      description: "Parametric cladding layout generator. Handle complex multi-face geometries with advanced trimming, rail systems, and pattern synchronization across curved surfaces.",
      path: "/tools/parametrix",
      color: "#3b82f6"
    },
    {
      name: "AutoNestCut",
      description: "Intelligent cut list generation and nesting optimization. Maximize material efficiency with automated layout algorithms and real-time cost calculations.",
      path: "/tools/autonestcut",
      color: "#10b981"
    },
    {
      name: "SPECBASE",
      description: "Comprehensive specification database management. Organize materials, products, and technical data with powerful search and integration capabilities.",
      path: "/tools/specbase",
      color: "#f59e0b"
    }
  ];

  // Initialize Swiper.js for carousel
  useEffect(() => {
    if (swiperInitialized.current) return;
    
    const linkSwiper = document.createElement('link');
    linkSwiper.rel = 'stylesheet';
    linkSwiper.href = 'https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.css';
    document.head.appendChild(linkSwiper);

    const script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.js';
    script.async = true;
    script.onload = () => {
      if ((window as any).Swiper) {
        new (window as any).Swiper(".featuredToolsSwiper", {
          speed: 900,
          parallax: true,
          loop: true,
          grabCursor: true,
          threshold: 5,
          resistanceRatio: 0,
          pagination: {
            el: ".swiper-pagination",
            clickable: true,
          }
        });
        swiperInitialized.current = true;
      }
    };
    document.body.appendChild(script);

    return () => {
      if (document.head.contains(linkSwiper)) document.head.removeChild(linkSwiper);
      if (document.body.contains(script)) document.body.removeChild(script);
    };
  }, []);

  const valueProps = [
    { icon: Box, title: "Algorithmic Precision", description: "Mathematical accuracy for complex geometries" },
    { icon: Zap, title: "Production Ready", description: "Built for real-world architectural projects" },
    { icon: Settings2, title: "Deep Customization", description: "Extensive parameters for exact control" },
    { icon: Lock, title: "Reliable Output", description: "Consistent results across complex scenarios" },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <div className="min-h-screen flex flex-col" style={{ background: 'var(--neuro-bg)' }} ref={containerRef}>
      <Navigation />

      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-32">
        {/* Hero Section */}
        <motion.section 
          className="text-center py-12 sm:py-16"
          style={{ y: heroY, opacity: heroOpacity }}
        >
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-4xl md:text-5xl font-bold tracking-tighter leading-tight"
            style={{ color: 'var(--neuro-text)' }}
          >
            Tools Built for<br />
            <span style={{ color: 'var(--neuro-primary)' }}>Precision & Complexity</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mt-4 max-w-2xl mx-auto text-base"
            style={{ color: 'var(--neuro-text-muted)' }}
          >
            Advanced automation and parametric solutions for architectural workflows. 
            Handle complex geometry, optimize material usage, and accelerate your design process.
          </motion.p>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-6 flex justify-center gap-4"
          >
            <Link href="/tools">
              <button className="neuro-button-primary flex items-center">
                Explore Tools
                <ArrowRight className="ml-2 h-4 w-4" />
              </button>
            </Link>
            <Link href="/pricing">
              <button className="neuro-button flex items-center">
                View Pricing
              </button>
            </Link>
          </motion.div>
        </motion.section>

        {/* Featured Spotlight Carousel */}
        <motion.section 
          className="py-8 flex justify-center px-4"
          style={{ y: featuredY, scale: featuredScale }}
        >
          <style>{`
            .featuredToolsSwiper {
              width: 100%;
              max-width: 1185px;
              overflow: visible;
              padding-bottom: 50px;
            }
            .featuredToolsSwiper .swiper-slide {
              padding: 0 10px;
            }
            .featuredToolsSwiper .card-wrapper {
              border-radius: 48px;
              overflow: hidden;
              transform: translateZ(0);
              -webkit-transform: translateZ(0);
              backface-visibility: hidden;
              -webkit-backface-visibility: hidden;
            }
            .featuredToolsSwiper .card-bg-parallax {
              position: absolute;
              top: 0;
              left: -30%;
              width: 160%;
              height: 100%;
              z-index: 0;
              will-change: transform;
              border-radius: 48px;
            }
            .featuredToolsSwiper .swiper-pagination {
              bottom: 0 !important;
              position: relative !important;
              margin-top: 30px;
            }
            .featuredToolsSwiper .swiper-pagination-bullet {
              width: 12px;
              height: 12px;
              background: var(--neuro-bg);
              opacity: 1;
              box-shadow: 3px 3px 6px var(--neuro-shadow-dark), -3px -3px 6px var(--neuro-shadow-light);
              transition: all 0.3s ease;
            }
            .featuredToolsSwiper .swiper-pagination-bullet-active {
              width: 40px !important;
              border-radius: 6px !important;
            }
          `}</style>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="w-full max-w-[1185px]"
          >
            <div className="swiper featuredToolsSwiper">
              <div className="swiper-wrapper">
                {featuredTools.map((tool, index) => (
                  <div key={index} className="swiper-slide">
                    <div className="card-wrapper">
                      <div className="relative min-h-[400px] lg:min-h-[450px]">
                        <div 
                          className="card-bg-parallax" 
                          style={{ background: tool.color }}
                          data-swiper-parallax="-35%"
                        ></div>
                        <div className="relative z-10 w-full min-h-[400px] lg:min-h-[450px]" 
                          style={{ 
                            background: tool.color, 
                            color: 'white',
                            boxShadow: 'none'
                          }}
                        >
                        <div className="grid grid-cols-1 lg:grid-cols-2 h-full">
                          <div className="p-6 sm:p-8 md:p-12 flex flex-col justify-center order-1">
                            <div className="flex items-center space-x-2 text-white/80 mb-3" data-swiper-parallax="-100">
                              <Star className="w-4 h-4 fill-current" />
                              <span className="text-xs font-semibold uppercase tracking-wider">Featured Extension</span>
                            </div>
                            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 tracking-tight" data-swiper-parallax="-200">{tool.name}</h2>
                            <p className="text-sm sm:text-base md:text-lg text-white/80 mb-6 leading-relaxed" data-swiper-parallax="-300">
                              {tool.description}
                            </p>
                            <div data-swiper-parallax="-400">
                              <Link href={tool.path}>
                                <button 
                                  className="flex items-center px-6 py-3 rounded-2xl font-semibold transition-all duration-300"
                                  style={{ 
                                    background: 'white',
                                    color: tool.color,
                                    boxShadow: '8px 8px 16px rgba(0, 0, 0, 0.2), -8px -8px 16px rgba(255, 255, 255, 0.8)',
                                    border: 'none'
                                  }}
                                  onMouseEnter={(e) => {
                                    e.currentTarget.style.boxShadow = '12px 12px 24px rgba(0, 0, 0, 0.25), -12px -12px 24px rgba(255, 255, 255, 0.9)';
                                    e.currentTarget.style.transform = 'translateY(-2px)';
                                  }}
                                  onMouseLeave={(e) => {
                                    e.currentTarget.style.boxShadow = '8px 8px 16px rgba(0, 0, 0, 0.2), -8px -8px 16px rgba(255, 255, 255, 0.8)';
                                    e.currentTarget.style.transform = 'translateY(0)';
                                  }}
                                >
                                  Learn More
                                  <ArrowRight className="ml-2 h-4 w-4" />
                                </button>
                              </Link>
                            </div>
                          </div>
                          <div className="relative h-48 sm:h-64 lg:h-full min-h-[250px] flex items-center justify-center order-2 pointer-events-none" data-swiper-parallax="-500">
                            {/* Icon placeholder - will be replaced with tool logo */}
                            <div className="text-white/25 text-[140px]">
                              ⚙
                            </div>
                          </div>
                        </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="swiper-pagination"></div>
            </div>
          </motion.div>
        </motion.section>

        {/* Latest Release */}
        <motion.section 
          className="py-6"
          style={{ y: releaseY }}
        >
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="neuro-flat rounded-2xl p-6 flex flex-col md:flex-row items-center justify-between gap-4"
          >
            <div className="flex-1">
              <div className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium mb-2 neuro-badge" style={{ background: 'var(--neuro-primary)', color: 'white' }}>
                <Sparkles className="w-3 h-3 mr-1" />
                New Release
              </div>
              <h3 className="text-xl font-bold mb-1" style={{ color: 'var(--neuro-text)' }}>AutoNestCut Now Available</h3>
              <p className="text-sm" style={{ color: 'var(--neuro-text-muted)' }}>
                Intelligent cut list generation and nesting optimization for efficient material usage
              </p>
            </div>
            <Link href="/tools">
              <button className="neuro-button text-sm">
                Explore Tools
              </button>
            </Link>
          </motion.div>
        </motion.section>

        {/* Value Propositions */}
        <motion.section 
          className="py-12 border-t border-border/40"
          style={{ y: valuePropsY }}
        >
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.5 }}
          >
            {valueProps.map((prop, index) => (
              <motion.div key={index} variants={itemVariants} className="flex flex-col items-center text-center p-3">
                <div className="neuro-icon mb-3">
                  <prop.icon className="h-5 w-5" style={{ color: 'var(--neuro-primary)' }} />
                </div>
                <h3 className="text-base font-medium" style={{ color: 'var(--neuro-text)' }}>{prop.title}</h3>
                <p className="mt-1 text-xs" style={{ color: 'var(--neuro-text-muted)' }}>{prop.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </motion.section>

        {/* CTA Section */}
        <motion.section 
          className="py-12 text-center"
          style={{ y: ctaY, opacity: ctaOpacity }}
        >
          <h2 className="text-2xl font-bold mb-3" style={{ color: 'var(--neuro-text)' }}>Ready to Transform Your Workflow?</h2>
          <p className="text-base mb-6 max-w-2xl mx-auto" style={{ color: 'var(--neuro-text-muted)' }}>
            Join professionals worldwide using our extensions to create better designs faster
          </p>
          <Link href="/tools">
            <button className="neuro-button-primary flex items-center mx-auto">
              Get Started
              <ArrowRight className="ml-2 h-4 w-4" />
            </button>
          </Link>
        </motion.section>
      </div>

      {/* Footer */}
      <div className="flex justify-center py-8 mt-auto px-4">
        <footer className="neuro-nav max-w-4xl">
          <div className="flex items-center gap-2 sm:gap-4 text-xs sm:text-sm flex-wrap justify-center" style={{ color: 'var(--neuro-text-muted)' }}>
            <span>© 2025 Studiø</span>
            <span className="hidden sm:inline">•</span>
            <span className="text-center">Developed by Int. Arch. M.Shkeir</span>
          </div>
        </footer>
      </div>
    </div>
  );
}

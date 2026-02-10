import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { motion, useScroll, useTransform } from "framer-motion";
import { Box, Lock, Zap, Settings2, ArrowRight, Star, Sparkles } from "lucide-react";
import { useRef } from "react";
import Navigation from "@/components/Navigation";

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);
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

        {/* Featured Spotlight */}
        <motion.section 
          className="py-8 flex justify-center px-4"
          style={{ y: featuredY, scale: featuredScale }}
        >
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="w-full max-w-[1185px]"
          >
            <div className="w-full rounded-3xl overflow-hidden neuro-card" style={{ background: 'var(--neuro-primary)', color: 'white' }}>
              <div className="grid grid-cols-1 lg:grid-cols-2">
                <div className="p-6 sm:p-8 md:p-12 flex flex-col justify-center order-1">
                  <div className="flex items-center space-x-2 text-white/80 mb-3">
                    <Star className="w-4 h-4 fill-current" />
                    <span className="text-xs font-semibold uppercase tracking-wider">Featured Extension</span>
                  </div>
                  <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4">PARAMETRIX</h2>
                  <p className="text-sm sm:text-base md:text-lg text-white/80 mb-6 leading-relaxed">
                    Parametric cladding layout generator. Handle complex multi-face geometries with 
                    advanced trimming, rail systems, and pattern synchronization across curved surfaces.
                  </p>
                  <div>
                    <Link href="/tools/parametrix">
                      <button 
                        className="flex items-center px-6 py-3 rounded-2xl font-semibold transition-all duration-300"
                        style={{ 
                          background: 'white',
                          color: 'var(--neuro-primary)',
                          boxShadow: '8px 8px 16px rgba(79, 70, 229, 0.3), -8px -8px 16px rgba(255, 255, 255, 0.8)',
                          border: 'none'
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.boxShadow = '12px 12px 24px rgba(79, 70, 229, 0.4), -12px -12px 24px rgba(255, 255, 255, 0.9)';
                          e.currentTarget.style.transform = 'translateY(-2px)';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.boxShadow = '8px 8px 16px rgba(79, 70, 229, 0.3), -8px -8px 16px rgba(255, 255, 255, 0.8)';
                          e.currentTarget.style.transform = 'translateY(0)';
                        }}
                      >
                        Learn More
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </button>
                    </Link>
                  </div>
                </div>
                <div className="relative h-48 sm:h-64 lg:h-full bg-white/10 flex items-center justify-center order-2">
                  <Box className="w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 text-white/30" />
                  <div className="absolute inset-0 bg-gradient-to-l from-[var(--neuro-primary)]/50 to-transparent"></div>
                </div>
              </div>
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

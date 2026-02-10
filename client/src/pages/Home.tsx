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
    <div className="min-h-screen flex flex-col" ref={containerRef}>
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
          >
            Tools Built for<br />
            <span className="text-primary">Precision & Complexity</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mt-4 max-w-2xl mx-auto text-base text-muted-foreground"
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
              <Button size="default">
                Explore Tools
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Link href="/pricing">
              <Button size="default" variant="outline">
                View Pricing
              </Button>
            </Link>
          </motion.div>
        </motion.section>

        {/* Featured Spotlight */}
        <motion.section 
          className="py-8 flex justify-center"
          style={{ y: featuredY, scale: featuredScale }}
        >
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            style={{ width: '1185px', height: '530px', maxWidth: '100%' }}
          >
            <div className="w-full h-full bg-primary text-primary-foreground rounded-3xl overflow-hidden shadow-[15px_15px_30px_rgba(0,0,0,0.2),-15px_-15px_30px_rgba(255,255,255,0.05)] transition-all duration-200 hover:shadow-[0px_10px_20px_rgba(0,0,0,0.15)] hover:-translate-y-1">
              <div className="grid grid-cols-1 lg:grid-cols-2 h-full">
                <div className="p-8 md:p-12 flex flex-col justify-center">
                  <div className="flex items-center space-x-2 text-primary-foreground/80 mb-3">
                    <Star className="w-4 h-4 fill-current" />
                    <span className="text-xs font-semibold uppercase tracking-wider">Featured Extension</span>
                  </div>
                  <h2 className="text-3xl md:text-4xl font-bold mb-4">PARAMETRIX</h2>
                  <p className="text-base md:text-lg text-primary-foreground/80 mb-6 leading-relaxed">
                    Parametric cladding layout generator. Handle complex multi-face geometries with 
                    advanced trimming, rail systems, and pattern synchronization across curved surfaces.
                  </p>
                  <div>
                    <Link href="/tools/parametrix">
                      <Button size="default" variant="secondary">
                        Learn More
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </Link>
                  </div>
                </div>
                <div className="relative h-64 lg:h-full bg-primary-foreground/10 flex items-center justify-center">
                  <Box className="w-24 h-24 text-primary-foreground/30" />
                  <div className="absolute inset-0 bg-gradient-to-l from-primary/50 to-transparent"></div>
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
            className="border border-border rounded-2xl p-6 bg-secondary/30 flex flex-col md:flex-row items-center justify-between gap-4"
          >
            <div className="flex-1">
              <div className="inline-flex items-center px-3 py-1 rounded-full bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100 text-xs font-medium mb-2">
                <Sparkles className="w-3 h-3 mr-1" />
                New Release
              </div>
              <h3 className="text-xl font-bold mb-1">AutoNestCut Now Available</h3>
              <p className="text-sm text-muted-foreground">
                Intelligent cut list generation and nesting optimization for efficient material usage
              </p>
            </div>
            <Link href="/tools">
              <Button variant="outline" size="sm">
                Explore Tools
              </Button>
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
                <div className="flex items-center justify-center h-10 w-10 rounded-full bg-secondary mb-3">
                  <prop.icon className="h-5 w-5 text-primary" />
                </div>
                <h3 className="text-base font-medium">{prop.title}</h3>
                <p className="mt-1 text-xs text-muted-foreground">{prop.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </motion.section>

        {/* CTA Section */}
        <motion.section 
          className="py-12 text-center"
          style={{ y: ctaY, opacity: ctaOpacity }}
        >
          <h2 className="text-2xl font-bold mb-3">Ready to Transform Your Workflow?</h2>
          <p className="text-base text-muted-foreground mb-6 max-w-2xl mx-auto">
            Join professionals worldwide using our extensions to create better designs faster
          </p>
          <Link href="/tools">
            <Button size="default">
              Get Started
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </motion.section>
      </div>

      {/* Footer */}
      <div className="flex justify-center py-8 mt-auto">
        <footer className="bg-background/80 backdrop-blur-lg border border-border rounded-full px-6 py-3 shadow-lg">
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <span>© 2025 Studiø</span>
            <span className="text-border">•</span>
            <span>Developed by Int. Arch. M.Shkeir</span>
          </div>
        </footer>
      </div>
    </div>
  );
}

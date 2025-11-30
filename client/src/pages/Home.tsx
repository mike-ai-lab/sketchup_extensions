import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { Box, Lock, Zap, Settings2, ArrowRight, Star, Sparkles, CheckCircle2, ShieldCheck } from "lucide-react";

export default function Home() {
  const valueProps = [
    { icon: Box, title: "Lightning Fast", description: "Optimized for performance and speed" },
    { icon: Lock, title: "Reliable & Secure", description: "Built with best practices and security in mind" },
    { icon: Zap, title: "Powerful Automation", description: "Automate repetitive tasks and boost productivity" },
    { icon: Settings2, title: "Expert Support", description: "Dedicated support when you need it" },
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
    <div className="min-h-screen flex flex-col">
      {/* Navigation */}
      <nav className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/">
            <span className="text-2xl font-bold cursor-pointer">Studiø</span>
          </Link>
          <div className="flex items-center gap-6">
            <Link href="/tools">
              <span className="text-sm font-medium cursor-pointer hover:text-primary transition-colors">Tools</span>
            </Link>
            <Link href="/pricing">
              <span className="text-sm font-medium cursor-pointer hover:text-primary transition-colors">Pricing</span>
            </Link>
            <Link href="/contact">
              <span className="text-sm font-medium cursor-pointer hover:text-primary transition-colors">Contact</span>
            </Link>
            <Link href="/dashboard">
              <Button variant="outline" size="sm">Dashboard</Button>
            </Link>
          </div>
        </div>
      </nav>

      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <section className="text-center py-20 sm:py-32">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-4xl md:text-6xl font-bold tracking-tighter leading-tight"
          >
            Professional SketchUp Extensions<br />
            <span className="text-primary">for Modern Workflows</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground"
          >
            Powerful tools designed for architects, designers, and construction professionals. 
            Streamline your workflow and create stunning designs faster than ever before.
          </motion.p>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-8 flex justify-center gap-4"
          >
            <Link href="/tools">
              <Button size="lg">
                Explore Tools
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Link href="/pricing">
              <Button size="lg" variant="outline">
                View Pricing
              </Button>
            </Link>
          </motion.div>
        </section>

        {/* Featured Spotlight */}
        <section className="py-12">
          <motion.div 
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-primary text-primary-foreground rounded-3xl overflow-hidden shadow-2xl"
          >
            <div className="grid grid-cols-1 lg:grid-cols-2">
              <div className="p-8 md:p-16 flex flex-col justify-center">
                <div className="flex items-center space-x-2 text-primary-foreground/80 mb-4">
                  <Star className="w-5 h-5 fill-current" />
                  <span className="text-sm font-semibold uppercase tracking-wider">Featured Extension</span>
                </div>
                <h2 className="text-3xl md:text-5xl font-bold mb-6">PARAMETRIX</h2>
                <p className="text-lg md:text-xl text-primary-foreground/80 mb-8 leading-relaxed">
                  Professional Parametric Cladding Layout Generator for SketchUp. Generate complex 
                  multi-face layouts with advanced trimming, rail systems, and pattern synchronization.
                </p>
                <div>
                  <Link href="/tools/parametrix">
                    <Button size="lg" variant="secondary">
                      Learn More
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Button>
                  </Link>
                </div>
              </div>
              <div className="relative h-64 lg:h-auto bg-primary-foreground/10 flex items-center justify-center">
                <Box className="w-32 h-32 text-primary-foreground/30" />
                <div className="absolute inset-0 bg-gradient-to-l from-primary/50 to-transparent"></div>
              </div>
            </div>
          </motion.div>
        </section>

        {/* Latest Release */}
        <section className="py-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="border border-border rounded-2xl p-8 bg-secondary/30 flex flex-col md:flex-row items-center justify-between gap-6"
          >
            <div className="flex-1">
              <div className="inline-flex items-center px-3 py-1 rounded-full bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100 text-xs font-medium mb-3">
                <Sparkles className="w-3 h-3 mr-1" />
                New Release
              </div>
              <h3 className="text-2xl font-bold mb-2">AutoNestCut Now Available</h3>
              <p className="text-muted-foreground">
                Intelligent cut list generation and nesting optimization for efficient material usage
              </p>
            </div>
            <Link href="/tools">
              <Button variant="outline">
                Explore Tools
              </Button>
            </Link>
          </motion.div>
        </section>

        {/* Value Propositions */}
        <section className="py-16 border-t border-border/40">
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.5 }}
          >
            {valueProps.map((prop, index) => (
              <motion.div key={index} variants={itemVariants} className="flex flex-col items-center text-center p-4">
                <div className="flex items-center justify-center h-12 w-12 rounded-full bg-secondary mb-4">
                  <prop.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-lg font-medium">{prop.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{prop.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </section>

        {/* CTA Section */}
        <section className="py-16 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Transform Your Workflow?</h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Join professionals worldwide using our extensions to create better designs faster
          </p>
          <Link href="/tools">
            <Button size="lg">
              Get Started
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </section>
      </div>

      {/* Footer */}
      <footer className="py-8 px-4 border-t bg-background mt-auto">
        <div className="container mx-auto text-center">
          <p className="text-sm text-muted-foreground mb-2">
            © 2025 Studiø. All rights reserved.
          </p>
          <p className="text-xs text-muted-foreground">
            Developed by Int. Arch. M.Shkeir
          </p>
        </div>
      </footer>
    </div>
  );
}

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Navigation from "@/components/Navigation";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { 
  ArrowRight, CheckCircle2, Download, Scissors, 
  Grid3x3, Layers, Settings, Star 
} from "lucide-react";

export default function AutoNestCutDetail() {
  const features = [
    {
      icon: Scissors,
      title: "Automated Cut Lists",
      description: "Generate optimized cut lists automatically from your SketchUp components"
    },
    {
      icon: Grid3x3,
      title: "Intelligent Nesting",
      description: "Smart nesting algorithms minimize material waste and maximize efficiency"
    },
    {
      icon: Layers,
      title: "Smart Cutting Plans",
      description: "Visual cutting plans with clear labeling and dimensions for workshop use"
    },
    {
      icon: Settings,
      title: "Material Optimization",
      description: "Optimize material usage across multiple sheet sizes and types"
    }
  ];

  const specifications = [
    { label: "Version", value: "1.0.0" },
    { label: "Compatibility", value: "SketchUp 2019 and later" },
    { label: "License Type", value: "Perpetual with 7-day trial" },
    { label: "Support", value: "Email & Documentation" }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />

      {/* Hero Section */}
      <section className="py-16 px-4 bg-gradient-to-b from-primary/5 to-background pt-32">
        <div className="container mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
          >
            <div>
              <Badge className="mb-4">Featured Extension</Badge>
              <h1 className="text-5xl font-bold tracking-tight mb-4">AutoNestCut</h1>
              <p className="text-xl text-muted-foreground mb-6 leading-relaxed">
                Intelligent Cut List & Nesting Optimizer
              </p>
              <p className="text-lg mb-8 leading-relaxed">
                AutoNestCut is designed for woodworkers, fabricators, and manufacturers who need to optimize material usage. Generate automated cut lists with intelligent nesting algorithms that minimize waste and maximize efficiency.
              </p>
              <div className="flex gap-4 flex-wrap">
                <Link href="/purchase/autonestcut">
                  <Button size="lg" className="text-base px-8">
                    Start Free Trial <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <Button size="lg" variant="outline" className="text-base px-8">
                  <Download className="mr-2 h-5 w-5" />
                  Download Documentation
                </Button>
              </div>
              <p className="text-sm text-muted-foreground mt-4">
                7-day free trial • No credit card required • $39 after trial
              </p>
            </div>
            <div className="relative">
              <Card className="border-2">
                <CardContent className="p-8">
                  <div className="aspect-square bg-gradient-to-br from-primary/10 to-primary/5 rounded-lg flex items-center justify-center">
                    <Scissors className="w-32 h-32 text-primary/30" />
                  </div>
                  <p className="text-center text-sm text-muted-foreground mt-4">
                    Extension Preview
                  </p>
                </CardContent>
              </Card>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Powerful Features</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Everything you need for efficient material cutting and optimization
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="h-full">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-center h-12 w-12 rounded-lg bg-primary/10 mb-4">
                      <feature.icon className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                    <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Key Benefits */}
      <section className="py-16 px-4 bg-muted/50">
        <div className="container mx-auto max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">Why Choose AutoNestCut?</h2>
              <div className="space-y-4">
                <div className="flex items-start">
                  <CheckCircle2 className="h-6 w-6 text-primary mr-3 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold mb-1">Reduce Material Waste</h4>
                    <p className="text-muted-foreground">Save up to 30% on material costs with intelligent nesting</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <CheckCircle2 className="h-6 w-6 text-primary mr-3 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold mb-1">Workshop-Ready Plans</h4>
                    <p className="text-muted-foreground">Clear cutting diagrams with labels and dimensions</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <CheckCircle2 className="h-6 w-6 text-primary mr-3 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold mb-1">Multiple Sheet Sizes</h4>
                    <p className="text-muted-foreground">Support for various material sizes and types</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <CheckCircle2 className="h-6 w-6 text-primary mr-3 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold mb-1">Export Options</h4>
                    <p className="text-muted-foreground">Export to CSV, PDF, or print directly from SketchUp</p>
                  </div>
                </div>
              </div>
            </div>
            <Card className="border-2">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold mb-6">Specifications</h3>
                <div className="space-y-4">
                  {specifications.map((spec, index) => (
                    <div key={index} className="flex justify-between items-center py-3 border-b last:border-0">
                      <span className="text-muted-foreground">{spec.label}</span>
                      <span className="font-medium text-right">{spec.value}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Pricing CTA */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-4xl">
          <Card className="border-2 border-primary">
            <CardContent className="p-8 md:p-12 text-center">
              <div className="flex items-center justify-center mb-4">
                <Star className="w-8 h-8 text-primary fill-current" />
              </div>
              <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
              <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
                Try AutoNestCut free for 7 days. No credit card required. 
                Start optimizing your material usage today.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <div className="text-center sm:text-left">
                  <p className="text-4xl font-bold mb-1">$39</p>
                  <p className="text-sm text-muted-foreground">One-time purchase</p>
                </div>
                <Link href="/purchase/autonestcut">
                  <Button size="lg" className="text-base px-8">
                    Start Free Trial <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <div className="flex justify-center py-8">
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

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { 
  ArrowRight, CheckCircle2, Download, Box, Layers, 
  Grid3x3, Scissors, Settings, Star 
} from "lucide-react";

export default function ParametrixDetail() {
  const features = [
    {
      icon: Layers,
      title: "Multi-Face Layouts",
      description: "Generate synchronized layouts across multiple selected faces with seamless pattern continuation"
    },
    {
      icon: Scissors,
      title: "Advanced Trimming",
      description: "Automatic boolean trimming ensures perfect fit within complex face boundaries"
    },
    {
      icon: Grid3x3,
      title: "Rail Systems",
      description: "Integrated top and bottom rail generation with customizable dimensions and materials"
    },
    {
      icon: Settings,
      title: "Pattern Control",
      description: "Running bond and stack bond patterns with randomization and start position control"
    }
  ];

  const specifications = [
    { label: "Version", value: "1.0.0" },
    { label: "SketchUp Compatibility", value: "2019 and later" },
    { label: "License Type", value: "Perpetual with 7-day trial" },
    { label: "Support", value: "Email & Documentation" }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      {/* Navigation */}
      <nav className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/">
            <span className="text-2xl font-bold cursor-pointer">Studiø</span>
          </Link>
          <div className="flex items-center gap-6">
            <Link href="/">
              <span className="text-sm font-medium cursor-pointer hover:text-primary transition-colors">Home</span>
            </Link>
            <Link href="/tools">
              <span className="text-sm font-medium cursor-pointer hover:text-primary transition-colors">Tools</span>
            </Link>
            <Link href="/tutorials">
              <span className="text-sm font-medium cursor-pointer hover:text-primary transition-colors">Tutorials</span>
            </Link>
            <Link href="/pricing">
              <span className="text-sm font-medium cursor-pointer hover:text-primary transition-colors">Pricing</span>
            </Link>
            <Link href="/download">
              <span className="text-sm font-medium cursor-pointer hover:text-primary transition-colors">Download</span>
            </Link>
            <Link href="/faq">
              <span className="text-sm font-medium cursor-pointer hover:text-primary transition-colors">FAQ</span>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="py-16 px-4 bg-gradient-to-b from-primary/5 to-background">
        <div className="container mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
          >
            <div>
              <Badge className="mb-4">Featured Extension</Badge>
              <h1 className="text-5xl font-bold tracking-tight mb-4">PARAMETRIX</h1>
              <p className="text-xl text-muted-foreground mb-6 leading-relaxed">
                Professional Parametric Cladding Layout Generator for SketchUp
              </p>
              <p className="text-lg mb-8 leading-relaxed">
                PARAMETRIX is designed for architects, designers, and construction professionals who need to create precise parametric cladding layouts. Generate complex multi-face layouts with advanced trimming, rail systems, and pattern synchronization.
              </p>
              <div className="flex gap-4 flex-wrap">
                <Link href="/purchase/parametrix">
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
                7-day free trial • No credit card required • $49 after trial
              </p>
            </div>
            <div className="relative">
              <Card className="border-2">
                <CardContent className="p-8">
                  <div className="aspect-square bg-gradient-to-br from-primary/10 to-primary/5 rounded-lg flex items-center justify-center">
                    <Box className="w-32 h-32 text-primary/30" />
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
              Everything you need to create professional parametric cladding layouts
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
              <h2 className="text-3xl font-bold mb-6">Why Choose PARAMETRIX?</h2>
              <div className="space-y-4">
                <div className="flex items-start">
                  <CheckCircle2 className="h-6 w-6 text-primary mr-3 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold mb-1">Time-Saving Automation</h4>
                    <p className="text-muted-foreground">Generate complex layouts in seconds that would take hours manually</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <CheckCircle2 className="h-6 w-6 text-primary mr-3 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold mb-1">Precision Engineering</h4>
                    <p className="text-muted-foreground">Exact measurements and perfect alignment every time</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <CheckCircle2 className="h-6 w-6 text-primary mr-3 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold mb-1">Flexible Customization</h4>
                    <p className="text-muted-foreground">Full control over dimensions, patterns, and materials</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <CheckCircle2 className="h-6 w-6 text-primary mr-3 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold mb-1">Professional Results</h4>
                    <p className="text-muted-foreground">Production-ready layouts trusted by industry professionals</p>
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
                Try PARAMETRIX free for 7 days. No credit card required. 
                Experience the power of professional parametric layouts.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <div className="text-center sm:text-left">
                  <p className="text-4xl font-bold mb-1">$49</p>
                  <p className="text-sm text-muted-foreground">One-time purchase</p>
                </div>
                <Link href="/purchase/parametrix">
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
      <footer className="py-8 px-4 border-t bg-background">
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

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { CheckCircle2, Star, Zap } from "lucide-react";
import Navigation from "@/components/Navigation";

export default function Pricing() {
  const plans = [
    {
      name: "PARAMETRIX",
      price: 49,
      description: "Professional Parametric Cladding Layout Generator",
      features: [
        "Multi-face layout generation",
        "Advanced trimming system", 
        "Rail system integration",
        "Pattern synchronization",
        "Lifetime updates",
        "Email support"
      ],
      popular: true,
      slug: "parametrix"
    },
    {
      name: "AutoNestCut",
      price: 49,
      description: "Intelligent Cut List and Nesting Optimization",
      features: [
        "Automated cut list generation",
        "Material optimization",
        "Nesting algorithms",
        "Export to various formats",
        "Lifetime updates", 
        "Email support"
      ],
      popular: false,
      slug: "autonestcut"
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />

      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 pt-32">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">Simple, Transparent Pricing</h1>
          <p className="max-w-2xl mx-auto text-xl text-muted-foreground">
            One-time purchase, lifetime access. No subscriptions, no hidden fees.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.slug}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className={`relative h-full ${plan.popular ? 'border-2 border-primary' : ''}`}>
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <Badge className="bg-primary text-primary-foreground px-3 py-1">
                      <Star className="w-3 h-3 mr-1 fill-current" />
                      Most Popular
                    </Badge>
                  </div>
                )}
                <CardHeader className="text-center pb-8">
                  <CardTitle className="text-2xl font-bold">{plan.name}</CardTitle>
                  <CardDescription className="text-base">{plan.description}</CardDescription>
                  <div className="mt-4">
                    <span className="text-5xl font-bold">${plan.price}</span>
                    <span className="text-muted-foreground ml-2">one-time</span>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  <ul className="space-y-3">
                    {plan.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start">
                        <CheckCircle2 className="h-5 w-5 text-primary mr-3 mt-0.5 flex-shrink-0" />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="space-y-3 pt-4">
                    <Link href={`/purchase/${plan.slug}`}>
                      <Button 
                        size="lg" 
                        className={`w-full ${plan.popular ? 'bg-primary hover:bg-primary/90' : ''}`}
                      >
                        Start Free Trial
                      </Button>
                    </Link>
                    <p className="text-xs text-center text-muted-foreground">
                      7-day free trial • No credit card required
                    </p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* FAQ Section */}
        <div className="mt-20 max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Frequently Asked Questions</h2>
          <div className="space-y-6">
            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold mb-2">What's included in the trial?</h3>
                <p className="text-muted-foreground">Full access to all features for 7 days. No limitations, no credit card required.</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold mb-2">Do I get lifetime updates?</h3>
                <p className="text-muted-foreground">Yes! Your one-time purchase includes all future updates and bug fixes at no additional cost.</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold mb-2">What versions are supported?</h3>
                <p className="text-muted-foreground">Extensions work with SketchUp 2019 and newer versions, including Pro and Shop.</p>
              </CardContent>
            </Card>
          </div>
        </div>
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
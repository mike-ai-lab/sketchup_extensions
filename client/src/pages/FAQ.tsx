import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { ChevronDown, ChevronUp, MessageCircle } from "lucide-react";
import { useState } from "react";

interface FAQItem {
  question: string;
  answer: string;
  category: string;
}

export default function FAQ() {
  const [openItems, setOpenItems] = useState<number[]>([]);

  const toggleItem = (index: number) => {
    setOpenItems(prev => 
      prev.includes(index) 
        ? prev.filter(i => i !== index)
        : [...prev, index]
    );
  };

  const faqs: FAQItem[] = [
    {
      category: "General",
      question: "What are these extensions?",
      answer: "These are add-on tools that extend functionality and automate complex tasks. They add new modeling capabilities and streamline workflows for architectural and design projects."
    },
    {
      category: "General", 
      question: "Which versions are supported?",
      answer: "Extensions support SketchUp 2019 and newer versions, including Pro, Shop, and Web (where applicable). Compatibility is regularly tested with the latest releases."
    },
    {
      category: "Licensing",
      question: "How does the licensing work?",
      answer: "Each extension requires a unique license key for activation. After purchase, you'll receive a license key that can be used to activate the extension on your computer. The license is perpetual - no recurring fees."
    },
    {
      category: "Licensing",
      question: "Can I use my license on multiple computers?",
      answer: "Each license is for single-user use. You can install the extension on multiple computers you own, but only one instance can be active at a time. For team licenses, please contact us for volume pricing."
    },
    {
      category: "Trial",
      question: "What's included in the free trial?",
      answer: "The 7-day free trial includes full access to all extension features with no limitations. No credit card is required to start your trial. You'll receive a trial license key via email."
    },
    {
      category: "Trial",
      question: "What happens after the trial expires?",
      answer: "After the trial period, the extension will stop working until you purchase a full license. Your work and settings are preserved, so you can continue immediately after purchasing."
    },
    {
      category: "Installation",
      question: "How do I install the extensions?",
      answer: "Download the .rbz file, then in SketchUp go to Window > Extension Manager > Install Extension and select the downloaded file. Restart SketchUp and enter your license key when prompted."
    },
    {
      category: "Installation", 
      question: "I'm having trouble with installation. What should I do?",
      answer: "First, ensure you're using a supported SketchUp version. Try running SketchUp as administrator during installation. If issues persist, check our documentation or contact support with your system details."
    },
    {
      category: "Support",
      question: "What kind of support do you provide?",
      answer: "We provide email support for all licensed users, comprehensive documentation, video tutorials, and regular updates. Premium support with faster response times is available for enterprise customers."
    },
    {
      category: "Support",
      question: "How do I get help if I'm stuck?",
      answer: "Check our tutorials and documentation first. If you need additional help, contact us through the support form with details about your issue, SketchUp version, and what you're trying to accomplish."
    }
  ];

  const categories = [...new Set(faqs.map(faq => faq.category))];

  return (
    <div className="min-h-screen flex flex-col">
      {/* Floating Navigation */}
      <div className="fixed top-6 left-1/2 -translate-x-1/2 z-50">
        <nav className="bg-background/80 backdrop-blur-lg border border-border rounded-full px-6 py-3 shadow-lg">
          <div className="flex items-center gap-8">
            <Link href="/">
              <span className="text-xl font-bold cursor-pointer">Studiø</span>
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
                <span className="text-sm font-medium cursor-pointer text-primary">FAQ</span>
              </Link>
            </div>
          </div>
        </nav>
      </div>

      <div className="container mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-16 pt-24">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">Frequently Asked Questions</h1>
          <p className="max-w-2xl mx-auto text-xl text-muted-foreground">
            Find answers to common questions about the tools and extensions
          </p>
        </div>

        {categories.map((category, categoryIndex) => (
          <div key={category} className="mb-12">
            <h2 className="text-2xl font-bold mb-6 text-primary">{category}</h2>
            <div className="space-y-4">
              {faqs
                .filter(faq => faq.category === category)
                .map((faq, index) => {
                  const globalIndex = faqs.indexOf(faq);
                  const isOpen = openItems.includes(globalIndex);
                  
                  return (
                    <motion.div
                      key={globalIndex}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: (categoryIndex * 0.1) + (index * 0.05) }}
                    >
                      <Card className="overflow-hidden">
                        <button
                          onClick={() => toggleItem(globalIndex)}
                          className="w-full text-left p-6 hover:bg-muted/50 transition-colors"
                        >
                          <div className="flex items-center justify-between">
                            <h3 className="font-semibold text-lg pr-4">{faq.question}</h3>
                            {isOpen ? (
                              <ChevronUp className="h-5 w-5 text-muted-foreground flex-shrink-0" />
                            ) : (
                              <ChevronDown className="h-5 w-5 text-muted-foreground flex-shrink-0" />
                            )}
                          </div>
                        </button>
                        {isOpen && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                          >
                            <CardContent className="pt-0 pb-6 px-6">
                              <p className="text-muted-foreground leading-relaxed">{faq.answer}</p>
                            </CardContent>
                          </motion.div>
                        )}
                      </Card>
                    </motion.div>
                  );
                })}
            </div>
          </div>
        ))}

        {/* Contact Support */}
        <Card className="mt-16 bg-muted/50">
          <CardContent className="p-8 text-center">
            <MessageCircle className="h-12 w-12 text-primary mx-auto mb-4" />
            <h3 className="text-2xl font-bold mb-4">Still Have Questions?</h3>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              Can't find what you're looking for? Our support team is here to help you get the most out of our extensions.
            </p>
            <Link href="/contact">
              <Button size="lg">
                Contact Support
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>

      {/* Footer */}
      <div className="flex justify-center py-8 mt-auto px-4">
        <footer className="bg-background/80 backdrop-blur-lg border border-border rounded-full px-4 sm:px-6 py-3 shadow-lg max-w-4xl">
          <div className="flex items-center gap-2 sm:gap-4 text-xs sm:text-sm text-muted-foreground flex-wrap justify-center">
            <span>© 2025 Studiø</span>
            <span className="text-border hidden sm:inline">•</span>
            <span className="text-center">Developed by Int. Arch. M.Shkeir</span>
          </div>
        </footer>
      </div>
    </div>
  );
}
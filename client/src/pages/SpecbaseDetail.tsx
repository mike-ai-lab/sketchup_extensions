import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { ExternalLink, Lock, FileText, Zap, MessageSquare, Brain, Shield } from "lucide-react";
import Navigation from "@/components/Navigation";

export default function ConstructLMDetail() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />

      {/* Hero Section */}
      <section className="py-20 px-4 bg-gradient-to-b from-background to-secondary/20 pt-32">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <h1 className="text-5xl font-bold tracking-tight mb-4">SPECBASE</h1>
            <p className="text-xl text-muted-foreground mb-8">
              AI-Powered Document Intelligence for Architecture Professionals
            </p>
            <div className="flex gap-4 justify-center">
              <a href="https://specbase.mimevents.com" target="_blank" rel="noopener noreferrer">
                <Button size="lg" className="gap-2">
                  <ExternalLink className="w-4 h-4" />
                  Launch SPECBASE
                </Button>
              </a>
            </div>
            <p className="mt-4 text-sm text-muted-foreground">
              100% Free • No Account Required • Complete Privacy
            </p>
          </motion.div>
        </div>
      </section>

      {/* Value Proposition */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-3xl font-bold mb-6">Work Smarter with Your Project Documents</h2>
          <p className="text-lg text-muted-foreground mb-8">
            SPECBASE helps architecture professionals quickly find information across building codes, 
            specifications, project briefs, and technical documents. Ask questions in natural language 
            and get instant answers with exact source references.
          </p>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-16 px-4 bg-secondary/20">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl font-bold text-center mb-12">Why Architecture Professionals Choose SPECBASE</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <FeatureCard
              icon={<Shield className="w-8 h-8" />}
              title="Your Data Stays Private"
              description="All document processing happens in your browser. Nothing is uploaded to external servers. Your project specifications remain confidential."
            />
            <FeatureCard
              icon={<FileText className="w-8 h-8" />}
              title="Multiple Document Types"
              description="Upload building codes, specifications, project briefs, meeting notes, and technical documents in various formats (PDF, Word, Text, CSV)."
            />
            <FeatureCard
              icon={<Brain className="w-8 h-8" />}
              title="Intelligent Search"
              description="Ask questions naturally like 'What are the fire safety requirements?' and get precise answers pulled from your documents."
            />
            <FeatureCard
              icon={<MessageSquare className="w-8 h-8" />}
              title="Source References"
              description="Every answer shows exactly where the information came from. Hover over citations to see the original text from your documents."
            />
            <FeatureCard
              icon={<Zap className="w-8 h-8" />}
              title="Fast & Efficient"
              description="Get answers in seconds instead of manually searching through hundreds of pages. Save hours on every project."
            />
            <FeatureCard
              icon={<Lock className="w-8 h-8" />}
              title="Works Offline"
              description="After initial setup, SPECBASE works without internet connection. Perfect for site visits and secure environments."
            />
          </div>
        </div>
      </section>

      {/* Use Cases */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-3xl font-bold text-center mb-12">Perfect For</h2>
          <div className="space-y-6">
            <UseCase
              title="Building Code Compliance"
              description="Quickly find specific requirements across multiple building codes and regulations without manual searching."
            />
            <UseCase
              title="Specification Review"
              description="Ask questions about material specifications, performance requirements, and technical standards across project documents."
            />
            <UseCase
              title="Project Brief Analysis"
              description="Extract key requirements, constraints, and client preferences from lengthy project briefs and RFPs."
            />
            <UseCase
              title="Meeting Notes & Documentation"
              description="Search through project meeting notes, design decisions, and correspondence to find specific discussions or agreements."
            />
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 px-4 bg-secondary/20">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
          <div className="space-y-6">
            <Step
              number={1}
              title="Setup Your AI Keys"
              description="Get a free API key from Cerebras (takes 2 minutes). This enables the AI to answer your questions. Keys are stored securely in your browser."
            />
            <Step
              number={2}
              title="Upload Your Documents"
              description="Add your building codes, specifications, project briefs, or any technical documents. Files are processed locally on your computer."
            />
            <Step
              number={3}
              title="Ask Questions"
              description="Type questions in plain language like 'What are the parking requirements?' or 'What materials are specified for the facade?'"
            />
            <Step
              number={4}
              title="Get Instant Answers"
              description="Receive accurate answers with citations showing exactly where the information came from in your documents."
            />
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4 bg-primary text-primary-foreground">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-4xl font-bold mb-4">Ready to Transform Your Workflow?</h2>
          <p className="text-xl mb-8 opacity-90">
            Stop wasting time searching through documents. Get instant answers with SPECBASE.
          </p>
          <a href="https://specbase.mimevents.com" target="_blank" rel="noopener noreferrer">
            <Button size="lg" variant="secondary" className="gap-2">
              <ExternalLink className="w-4 h-4" />
              Launch SPECBASE Now
            </Button>
          </a>
        </div>
      </section>

      {/* Footer */}
      <div className="flex justify-center py-8 px-4">
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

function FeatureCard({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="p-6 border rounded-lg bg-card"
    >
      <div className="text-primary mb-4">{icon}</div>
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <p className="text-sm text-muted-foreground">{description}</p>
    </motion.div>
  );
}

function Step({ number, title, description }: { number: number; title: string; description: string }) {
  return (
    <div className="flex gap-4">
      <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">
        {number}
      </div>
      <div>
        <h3 className="text-lg font-semibold mb-1">{title}</h3>
        <p className="text-muted-foreground">{description}</p>
      </div>
    </div>
  );
}

function UseCase({ title, description }: { title: string; description: string }) {
  return (
    <div className="p-6 border rounded-lg bg-card">
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
    </div>
  );
}

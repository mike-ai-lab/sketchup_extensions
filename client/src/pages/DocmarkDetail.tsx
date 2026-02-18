import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { ExternalLink, FileText, Zap, Eye, Download, Palette, Clock } from "lucide-react";
import Navigation from "@/components/Navigation";

export default function DocmarkDetail() {
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
            <h1 className="text-5xl font-bold tracking-tight mb-4">DocMark</h1>
            <p className="text-xl text-muted-foreground mb-8">
              Real-Time Markdown Editor with Live Preview
            </p>
            <div className="flex gap-4 justify-center">
              <a href="https://docmark.mimevents.com" target="_blank" rel="noopener noreferrer">
                <Button size="lg" className="gap-2">
                  <ExternalLink className="w-4 h-4" />
                  Launch DocMark
                </Button>
              </a>
            </div>
            <p className="mt-4 text-sm text-muted-foreground">
              100% Free • No Account Required • Works Offline
            </p>
          </motion.div>
        </div>
      </section>

      {/* Value Proposition */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-3xl font-bold mb-6">Write Markdown Faster</h2>
          <p className="text-lg text-muted-foreground mb-8">
            DocMark is a fast, browser-based markdown editor with split-pane live preview. 
            Write on the left, see rendered output on the right with synchronized scrolling. 
            Perfect for documentation, technical writing, and content creation.
          </p>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-16 px-4 bg-secondary/20">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl font-bold text-center mb-12">Powerful Features</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <FeatureCard
              icon={<Eye className="w-8 h-8" />}
              title="Live Preview"
              description="See your markdown rendered in real-time as you type. No delays, no refresh needed."
            />
            <FeatureCard
              icon={<Zap className="w-8 h-8" />}
              title="Synchronized Scrolling"
              description="Editor and preview stay perfectly in sync. Scroll one side and the other follows automatically."
            />
            <FeatureCard
              icon={<Palette className="w-8 h-8" />}
              title="Multiple Themes"
              description="Choose from GitHub, GitBook, and VSCode styles. Full dark mode support included."
            />
            <FeatureCard
              icon={<Download className="w-8 h-8" />}
              title="PDF Export"
              description="Generate professional PDFs with custom fonts and styling. Perfect for sharing and printing."
            />
            <FeatureCard
              icon={<Clock className="w-8 h-8" />}
              title="Auto-Save"
              description="Your content automatically saves to browser storage. Never lose your work."
            />
            <FeatureCard
              icon={<FileText className="w-8 h-8" />}
              title="Syntax Highlighting"
              description="Monaco editor with full language support for code blocks and technical content."
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
              title="Technical Documentation"
              description="Write API docs, README files, and technical guides with live preview and syntax highlighting."
            />
            <UseCase
              title="Blog Posts & Articles"
              description="Draft blog posts and articles with instant preview. Export to PDF when ready to publish."
            />
            <UseCase
              title="Project Notes"
              description="Keep project notes, meeting minutes, and design decisions organized in markdown format."
            />
            <UseCase
              title="Content Creation"
              description="Create newsletters, guides, and educational content with professional formatting and styling."
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
              title="Open DocMark"
              description="Launch the editor in your browser. No installation or account needed."
            />
            <Step
              number={2}
              title="Write Markdown"
              description="Type your markdown on the left side. Use standard markdown syntax for formatting."
            />
            <Step
              number={3}
              title="See Live Preview"
              description="Watch your content render in real-time on the right side with perfect synchronization."
            />
            <Step
              number={4}
              title="Export or Save"
              description="Export to PDF, save to your computer, or let auto-save keep your work in the browser."
            />
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4 bg-primary text-primary-foreground">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-4xl font-bold mb-4">Start Writing Markdown Today</h2>
          <p className="text-xl mb-8 opacity-90">
            Fast, simple, and powerful markdown editing with live preview.
          </p>
          <a href="https://docmark.mimevents.com" target="_blank" rel="noopener noreferrer">
            <Button size="lg" variant="secondary" className="gap-2">
              <ExternalLink className="w-4 h-4" />
              Launch DocMark Now
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

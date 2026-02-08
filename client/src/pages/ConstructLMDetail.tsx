import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { ExternalLink, Github, Lock, FileText, Zap, MessageSquare } from "lucide-react";

export default function ConstructLMDetail() {
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
      <section className="py-20 px-4 bg-gradient-to-b from-background to-secondary/20">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <h1 className="text-5xl font-bold tracking-tight mb-4">SPECBASE</h1>
            <p className="text-xl text-muted-foreground mb-8">
              Privacy-First AI Document Chat with RAG
            </p>
            <div className="flex gap-4 justify-center">
              <a href="https://specbase.mimevents.com" target="_blank" rel="noopener noreferrer">
                <Button size="lg" className="gap-2">
                  <ExternalLink className="w-4 h-4" />
                  Launch App
                </Button>
              </a>
              <a href="https://github.com/mike-ai-lab/constructlm" target="_blank" rel="noopener noreferrer">
                <Button size="lg" variant="outline" className="gap-2">
                  <Github className="w-4 h-4" />
                  View Source
                </Button>
              </a>
            </div>
            <p className="mt-4 text-sm text-muted-foreground">
              100% Free • No Account Required • Privacy-First
            </p>
          </motion.div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl font-bold text-center mb-12">Key Features</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <FeatureCard
              icon={<Lock className="w-8 h-8" />}
              title="Privacy-First"
              description="All embeddings generated locally in your browser using Transformers.js. No data sent to external servers for vectorization."
            />
            <FeatureCard
              icon={<FileText className="w-8 h-8" />}
              title="Multi-Document RAG"
              description="Upload TXT, MD, CSV, JSON, and PDF files. Ask questions across all your documents with intelligent retrieval."
            />
            <FeatureCard
              icon={<Zap className="w-8 h-8" />}
              title="Dual AI Models"
              description="Toggle between Google Gemini and Cerebras AI for chat responses. Choose speed or sophistication."
            />
            <FeatureCard
              icon={<MessageSquare className="w-8 h-8" />}
              title="Source Citations"
              description="Every AI response includes exact source references. Hover over citation badges to see the original text."
            />
            <FeatureCard
              icon={<FileText className="w-8 h-8" />}
              title="Markdown Support"
              description="Rich formatting in responses and citations including tables, code blocks, lists, and more."
            />
            <FeatureCard
              icon={<Lock className="w-8 h-8" />}
              title="Offline Capable"
              description="Works without internet after initial model download (~25MB). All data stored locally in IndexedDB."
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
              title="Configure API Keys"
              description="Click settings and add your Cerebras API key (required) and optionally Gemini API key. Keys are stored securely in your browser."
            />
            <Step
              number={2}
              title="Upload Documents"
              description="Click '+ ADD SOURCE' to upload your documents. Files are chunked and embedded locally using Transformers.js."
            />
            <Step
              number={3}
              title="Ask Questions"
              description="Type your question and press Enter. The AI retrieves relevant chunks from your documents and generates an answer."
            />
            <Step
              number={4}
              title="View Citations"
              description="Hover over citation badges to see the exact source text. Click to navigate to the source document."
            />
          </div>
        </div>
      </section>

      {/* Tech Stack */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-3xl font-bold text-center mb-12">Built With</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <TechItem title="React 19" description="Modern UI framework with TypeScript" />
            <TechItem title="Vite 6" description="Lightning-fast build tool" />
            <TechItem title="Transformers.js" description="Local browser-based ML embeddings" />
            <TechItem title="IndexedDB" description="Client-side vector database" />
            <TechItem title="Gemini API" description="Google's generative AI model" />
            <TechItem title="Cerebras API" description="Ultra-fast inference AI" />
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4 bg-primary text-primary-foreground">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-4xl font-bold mb-4">Ready to Try SPECBASE?</h2>
          <p className="text-xl mb-8 opacity-90">
            Start chatting with your documents in seconds. No account required.
          </p>
          <a href="https://specbase.mimevents.com" target="_blank" rel="noopener noreferrer">
            <Button size="lg" variant="secondary" className="gap-2">
              <ExternalLink className="w-4 h-4" />
              Launch App Now
            </Button>
          </a>
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

function TechItem({ title, description }: { title: string; description: string }) {
  return (
    <div className="p-4 border rounded-lg bg-card">
      <h3 className="font-semibold mb-1">{title}</h3>
      <p className="text-sm text-muted-foreground">{description}</p>
    </div>
  );
}

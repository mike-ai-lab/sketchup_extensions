import React, { useEffect, useRef } from "react";
import { Link } from "wouter";
import Header from "../components/Header";
import { 
  GoogleGeminiLogo,
  OpenAILogo,
  AWSLogo,
  GroqLogo,
  CerebrasLogo
} from "../components/CompanyLogos";
import { 
  Brain,
  Lock,
  Zap,
  Database,
  FileText,
  MessageSquare,
  Globe,
  Download,
  CheckCircle2,
  ArrowRight,
  Github,
  ExternalLink
} from "lucide-react";

declare global {
  interface Window {
    gsap: any;
    ScrollTrigger: any;
  }
}

const FEATURES = [
  {
    icon: Lock,
    title: "Privacy-First RAG",
    description: "TRUE local embeddings with Transformers.js. Your documents never leave your machine - all processing happens in your browser."
  },
  {
    icon: Zap,
    title: "Zero Embedding Cost",
    description: "Local browser-based embeddings with no API calls. 100% free semantic search powered by WebAssembly."
  },
  {
    icon: Brain,
    title: "26+ AI Models",
    description: "Switch between Gemini, Groq, Cerebras, OpenAI, and AWS Bedrock. Access to the latest and most powerful models."
  },
  {
    icon: Database,
    title: "Smart Vector Storage",
    description: "IndexedDB-based vector store with semantic search, cosine similarity, and intelligent context management."
  },
  {
    icon: FileText,
    title: "Advanced Document Processing",
    description: "Support for PDF, TXT, CSV, Excel, Markdown, JSON, XML, HTML, and code files with intelligent parsing."
  },
  {
    icon: MessageSquare,
    title: "Multi-Chat Management",
    description: "Create unlimited conversation threads with context-aware responses and automatic token management."
  }
];

const TECH_STACK = [
  { name: "Transformers.js", detail: "Local embeddings (Xenova/all-MiniLM-L6-v2)" },
  { name: "React 19", detail: "Modern UI with TypeScript" },
  { name: "IndexedDB", detail: "Vector storage & semantic search" },
  { name: "Electron", detail: "Desktop & web deployment" },
  { name: "Multi-Model AI", detail: "26+ models across 5 providers" },
  { name: "WebAssembly", detail: "50-100ms embedding performance" }
];

const PROVIDERS = [
  { name: "Google Gemini", models: "5 models", status: "Free tier", Logo: GoogleGeminiLogo },
  { name: "Groq", models: "11 models", status: "Free tier", Logo: GroqLogo },
  { name: "Cerebras", models: "4 models", status: "Free unlimited", Logo: CerebrasLogo },
  { name: "OpenAI", models: "2 models", status: "Paid", Logo: OpenAILogo },
  { name: "AWS Bedrock", models: "4 models", status: "Paid", Logo: AWSLogo }
];

export default function ConstructlmDetail() {
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const loadGSAP = async () => {
      const loadScript = (src: string) => new Promise((resolve) => {
        const script = document.createElement('script');
        script.src = src;
        script.onload = resolve;
        document.head.appendChild(script);
      });

      if (!window.gsap) {
        await loadScript("https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js");
        await loadScript("https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/ScrollTrigger.min.js");
      }

      const gsap = window.gsap;
      const ScrollTrigger = window.ScrollTrigger;
      gsap.registerPlugin(ScrollTrigger);

      // Hero parallax
      gsap.to(".hero-bg", {
        scrollTrigger: {
          trigger: ".hero-section",
          start: "top top",
          end: "bottom top",
          scrub: 1
        },
        y: 200,
        opacity: 0.3
      });

      // Feature cards stagger
      gsap.from(".feature-card", {
        scrollTrigger: {
          trigger: ".features-grid",
          start: "top 80%",
        },
        y: 60,
        opacity: 0,
        stagger: 0.1,
        duration: 0.8,
        ease: "power3.out"
      });

      // Tech stack reveal
      gsap.from(".tech-item", {
        scrollTrigger: {
          trigger: ".tech-stack",
          start: "top 80%",
        },
        x: -50,
        opacity: 0,
        stagger: 0.08,
        duration: 0.6,
        ease: "power2.out"
      });
    };

    loadGSAP();

    return () => {
      const triggers = window.ScrollTrigger?.getAll() || [];
      triggers.forEach((trigger: any) => trigger.kill());
    };
  }, []);

  return (
    <div className="bg-[#030303] min-h-screen text-white font-sans selection:bg-pink-600">
      <Header currentPage="tools" />

      {/* Hero Section */}
      <section ref={heroRef} className="hero-section relative min-h-screen flex items-center justify-center px-6 py-32 overflow-hidden">
        {/* Background decoration */}
        <div className="hero-bg absolute inset-0 opacity-20">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-pink-500/20 rounded-full blur-[120px]"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-[120px]"></div>
        </div>

        <div className="relative z-10 max-w-6xl mx-auto text-center space-y-8">
          <div className="inline-flex items-center gap-3 px-5 py-2 bg-pink-600/10 border border-pink-500/20 rounded-full mb-6">
            <Brain size={16} className="text-pink-500" />
            <span className="text-[10px] font-black tracking-widest text-pink-500 uppercase">AI Knowledge Engine</span>
          </div>

          <h1 className="text-5xl sm:text-6xl md:text-8xl font-black uppercase italic tracking-tighter leading-[0.9]">
            <span className="text-pink-500">ConstructLM</span>
          </h1>

          <p className="text-xl md:text-2xl text-white/60 max-w-3xl mx-auto font-medium">
            Production-grade RAG system with TRUE local embeddings, multi-model AI support, and complete privacy
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-8">
            <a href="https://github.com/yourusername/ConstructLM" target="_blank" rel="noopener noreferrer">
              <button className="w-full sm:w-auto bg-pink-600 text-white hover:bg-pink-500 px-10 py-6 rounded-full font-black text-[10px] tracking-widest uppercase transition-all shadow-2xl flex items-center gap-3 justify-center">
                <Github size={16} />
                View on GitHub
                <ExternalLink size={14} />
              </button>
            </a>
            <a href="#features">
              <button className="w-full sm:w-auto border border-white/20 text-white hover:bg-white/5 px-10 py-6 rounded-full font-black text-[10px] tracking-widest uppercase transition-all flex items-center gap-3 justify-center">
                Explore Features
                <ArrowRight size={14} />
              </button>
            </a>
          </div>

          {/* Key Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-16 max-w-4xl mx-auto">
            <div className="space-y-2">
              <div className="text-3xl md:text-4xl font-black text-pink-500">26+</div>
              <div className="text-[10px] font-black uppercase tracking-widest text-white/40">AI Models</div>
            </div>
            <div className="space-y-2">
              <div className="text-3xl md:text-4xl font-black text-pink-500">100%</div>
              <div className="text-[10px] font-black uppercase tracking-widest text-white/40">Local RAG</div>
            </div>
            <div className="space-y-2">
              <div className="text-3xl md:text-4xl font-black text-pink-500">$0</div>
              <div className="text-[10px] font-black uppercase tracking-widest text-white/40">Embedding Cost</div>
            </div>
            <div className="space-y-2">
              <div className="text-3xl md:text-4xl font-black text-pink-500">50ms</div>
              <div className="text-[10px] font-black uppercase tracking-widest text-white/40">Embedding Speed</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section id="features" className="py-32 px-6 bg-[#050505]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <span className="text-pink-500 text-[10px] font-black tracking-[0.5em] uppercase">Core Capabilities</span>
            <h2 className="text-4xl md:text-6xl font-black uppercase italic tracking-tighter mt-4">What Makes It Different</h2>
          </div>

          <div className="features-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {FEATURES.map((feature, idx) => (
              <div key={idx} className="feature-card bg-[#0a0a0c] border border-white/5 rounded-2xl p-8 hover:border-pink-500/30 transition-all duration-500 group">
                <div className="p-4 bg-pink-600/10 rounded-xl inline-block mb-6 group-hover:bg-pink-600 transition-all duration-500">
                  <feature.icon size={24} className="text-pink-500 group-hover:text-white transition-colors" />
                </div>
                <h3 className="text-xl font-black uppercase italic mb-3">{feature.title}</h3>
                <p className="text-white/50 text-sm leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tech Stack */}
      <section className="py-32 px-6 border-y border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <span className="text-pink-500 text-[10px] font-black tracking-[0.5em] uppercase">Technology</span>
            <h2 className="text-4xl md:text-6xl font-black uppercase italic tracking-tighter mt-4">Built With Modern Stack</h2>
          </div>

          <div className="tech-stack grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-5xl mx-auto">
            {TECH_STACK.map((tech, idx) => (
              <div key={idx} className="tech-item bg-[#0a0a0c] border border-white/5 rounded-xl p-6 flex items-center gap-4">
                <CheckCircle2 size={20} className="text-pink-500 flex-shrink-0" />
                <div>
                  <div className="font-black text-sm">{tech.name}</div>
                  <div className="text-white/40 text-xs">{tech.detail}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* AI Providers */}
      <section className="py-32 px-6 bg-[#050505]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <span className="text-pink-500 text-[10px] font-black tracking-[0.5em] uppercase">Multi-Model Support</span>
            <h2 className="text-4xl md:text-6xl font-black uppercase italic tracking-tighter mt-4">5 AI Providers</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
            {PROVIDERS.map((provider, idx) => (
              <div key={idx} className="bg-[#0a0a0c] border border-white/5 rounded-2xl p-8 text-center hover:border-pink-500/30 transition-all duration-500 flex flex-col items-center justify-center gap-4">
                <provider.Logo className="text-white" />
                <div className="text-pink-500 text-sm font-bold">{provider.models}</div>
                <div className="text-white/40 text-xs uppercase tracking-widest">{provider.status}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-pink-600/5 to-transparent"></div>
        
        <div className="relative z-10 max-w-4xl mx-auto text-center space-y-8">
          <h2 className="text-4xl md:text-6xl font-black uppercase italic tracking-tighter">
            Ready to Build?
          </h2>
          <p className="text-white/60 text-lg max-w-2xl mx-auto">
            Open-source, production-ready, and built for privacy. Start building intelligent document analysis applications today.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a href="https://github.com/yourusername/ConstructLM" target="_blank" rel="noopener noreferrer">
              <button className="w-full sm:w-auto bg-pink-600 text-white hover:bg-pink-500 px-12 py-6 rounded-full font-black text-[10px] tracking-widest uppercase transition-all shadow-2xl flex items-center gap-3 justify-center">
                <Download size={16} />
                Get Started
              </button>
            </a>
            <Link href="/contact">
              <button className="w-full sm:w-auto border border-white/20 text-white hover:bg-white/5 px-12 py-6 rounded-full font-black text-[10px] tracking-widest uppercase transition-all flex items-center gap-3 justify-center">
                Contact Us
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-white/5">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-4">
            <Brain size={24} className="text-pink-500" />
            <span className="font-black tracking-widest uppercase text-sm">ConstructLM</span>
          </div>
          <div className="text-white/40 text-xs">
            Open Source • MIT License • Built with ❤️
          </div>
          <div className="flex gap-6">
            <a href="https://github.com/yourusername/ConstructLM" target="_blank" rel="noopener noreferrer">
              <Github size={18} className="text-white/40 hover:text-pink-500 transition-colors cursor-pointer" />
            </a>
            <Globe size={18} className="text-white/40 hover:text-pink-500 transition-colors cursor-pointer" />
          </div>
        </div>
      </footer>
    </div>
  );
}

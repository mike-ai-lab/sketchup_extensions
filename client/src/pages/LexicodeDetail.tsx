import React, { useEffect, useRef } from "react";
import { Link } from "wouter";
import Header from "../components/Header";
import { 
  Code2,
  FileText,
  Eye,
  Sparkles,
  Zap,
  Download,
  CheckCircle2,
  ArrowRight,
  ExternalLink,
  FileCode,
  Layers,
  Brain,
  Workflow
} from "lucide-react";

declare global {
  interface Window {
    gsap: any;
    ScrollTrigger: any;
  }
}

const FEATURES = [
  {
    icon: FileCode,
    title: "16 File Types",
    description: "Support for TXT, Markdown, DOCX, CSV, XLSX, HTML, CSS, JavaScript, JSON, SVG, XML, Python, Java, C++, SQL, and YAML."
  },
  {
    icon: Brain,
    title: "AI-Powered Assistant",
    description: "Create and edit files with natural language using Groq AI. Generate entire projects with one prompt."
  },
  {
    icon: Code2,
    title: "Monaco Editor",
    description: "VS Code's powerful editor engine with syntax highlighting, IntelliSense, and advanced editing features."
  },
  {
    icon: Eye,
    title: "Real-Time Preview",
    description: "Live preview for Markdown, HTML, SVG, XML, and JSON with split-view editing and 500ms debounce."
  },
  {
    icon: Workflow,
    title: "Multi-File Creation",
    description: "Create entire projects with multiple files in one AI prompt. Perfect for complex document workflows."
  },
  {
    icon: Download,
    title: "Professional Export",
    description: "Export to PDF, DOCX, XLSX, CSV, and TXT formats. Production-ready documents with one click."
  }
];

const FILE_TYPES = [
  "TXT", "Markdown", "DOCX", "CSV", "XLSX", "HTML", "CSS", 
  "JavaScript", "JSON", "SVG", "XML", "Python", "Java", "C++", "SQL", "YAML"
];

const AI_MODELS = [
  { name: "LLAMA 3.3 70B", desc: "Most capable" },
  { name: "LLAMA 3.1 70B", desc: "High quality" },
  { name: "LLAMA 3.1 8B", desc: "Fast & efficient" },
  { name: "MIXTRAL 8X7B", desc: "Balanced" },
  { name: "GEMMA 7B", desc: "Lightweight" },
  { name: "GEMMA2 9B", desc: "Enhanced" }
];

const SPECS = [
  { label: "Version", value: "1.0.0" },
  { label: "Platform", value: "Web + Electron" },
  { label: "License", value: "MIT" },
  { label: "Cost", value: "Free + API Key" }
];

export default function LexicodeDetail() {
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

      gsap.from(".file-type-badge", {
        scrollTrigger: {
          trigger: ".file-types-section",
          start: "top 80%",
        },
        scale: 0.8,
        opacity: 0,
        stagger: 0.05,
        duration: 0.5,
        ease: "back.out(1.7)"
      });
    };

    loadGSAP();

    return () => {
      const triggers = window.ScrollTrigger?.getAll() || [];
      triggers.forEach((trigger: any) => trigger.kill());
    };
  }, []);

  return (
    <div className="bg-[#030303] min-h-screen text-white font-sans selection:bg-emerald-600">
      <Header currentPage="tools" />

      <section ref={heroRef} className="hero-section relative min-h-screen flex items-center justify-center px-6 py-32 overflow-hidden">
        <div className="hero-bg absolute inset-0 opacity-20">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-emerald-500/20 rounded-full blur-[120px]"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-green-500/20 rounded-full blur-[120px]"></div>
        </div>

        <div className="relative z-10 max-w-6xl mx-auto text-center space-y-8">
          <div className="inline-flex items-center gap-3 px-5 py-2 bg-emerald-600/10 border border-emerald-500/20 rounded-full mb-6">
            <Code2 size={16} className="text-emerald-500" />
            <span className="text-[10px] font-black tracking-widest text-emerald-500 uppercase">AI-Powered Editor</span>
          </div>

          <h1 className="text-5xl sm:text-6xl md:text-8xl font-black uppercase italic tracking-tighter leading-[0.9]">
            <span className="text-emerald-500">LexiCode</span>
          </h1>

          <p className="text-xl md:text-2xl text-white/60 max-w-3xl mx-auto font-medium">
            AI-Assisted Document Creation with Monaco Editor, Real-Time Preview, and Multi-Format Export
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-8">
            <button className="w-full sm:w-auto bg-emerald-600 hover:bg-emerald-500 text-white px-12 py-6 rounded-full font-black text-[10px] tracking-widest uppercase transition-all flex items-center gap-3 justify-center active:scale-95 shadow-2xl shadow-emerald-600/20">
              <Download size={16} />
              Download App
              <ArrowRight size={14} />
            </button>
            <a href="https://github.com/yourusername/lexicode" target="_blank" rel="noopener noreferrer">
              <button className="w-full sm:w-auto border border-white/20 text-white hover:bg-white/5 px-10 py-6 rounded-full font-black text-[10px] tracking-widest uppercase transition-all flex items-center gap-3 justify-center">
                View Source
                <ExternalLink size={14} />
              </button>
            </a>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-16 max-w-4xl mx-auto">
            <div className="space-y-2">
              <div className="text-3xl md:text-4xl font-black text-emerald-500">16</div>
              <div className="text-[10px] font-black uppercase tracking-widest text-white/40">File Types</div>
            </div>
            <div className="space-y-2">
              <div className="text-3xl md:text-4xl font-black text-emerald-500">6</div>
              <div className="text-[10px] font-black uppercase tracking-widest text-white/40">AI Models</div>
            </div>
            <div className="space-y-2">
              <div className="text-3xl md:text-4xl font-black text-emerald-500">Live</div>
              <div className="text-[10px] font-black uppercase tracking-widest text-white/40">Preview</div>
            </div>
            <div className="space-y-2">
              <div className="text-3xl md:text-4xl font-black text-emerald-500">Free</div>
              <div className="text-[10px] font-black uppercase tracking-widest text-white/40">Open Source</div>
            </div>
          </div>
        </div>
      </section>

      <section id="features" className="py-32 px-6 bg-[#050505]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <span className="text-emerald-500 text-[10px] font-black tracking-[0.5em] uppercase">Core Capabilities</span>
            <h2 className="text-4xl md:text-6xl font-black uppercase italic tracking-tighter mt-4">Everything You Need</h2>
          </div>

          <div className="features-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {FEATURES.map((feature, idx) => (
              <div key={idx} className="feature-card bg-[#0a0a0c] border border-white/5 rounded-2xl p-8 hover:border-emerald-500/30 transition-all duration-500 group">
                <div className="p-4 bg-emerald-600/10 rounded-xl inline-block mb-6 group-hover:bg-emerald-600 transition-all duration-500">
                  <feature.icon size={24} className="text-emerald-500 group-hover:text-white transition-colors" />
                </div>
                <h3 className="text-xl font-black uppercase italic mb-3">{feature.title}</h3>
                <p className="text-white/50 text-sm leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="file-types-section py-32 px-6 border-y border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <span className="text-emerald-500 text-[10px] font-black tracking-[0.5em] uppercase">Supported Formats</span>
            <h2 className="text-4xl md:text-6xl font-black uppercase italic tracking-tighter mt-4">16 File Types</h2>
          </div>

          <div className="flex flex-wrap justify-center gap-3 max-w-5xl mx-auto">
            {FILE_TYPES.map((type, idx) => (
              <div key={idx} className="file-type-badge bg-[#0a0a0c] border border-white/5 px-6 py-3 rounded-full hover:border-emerald-500/30 transition-all">
                <span className="text-sm font-black uppercase tracking-wider text-emerald-500">{type}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-32 px-6 bg-[#050505]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <span className="text-emerald-500 text-[10px] font-black tracking-[0.5em] uppercase">AI Integration</span>
            <h2 className="text-4xl md:text-6xl font-black uppercase italic tracking-tighter mt-4">6 Groq Models</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {AI_MODELS.map((model, idx) => (
              <div key={idx} className="bg-[#0a0a0c] border border-white/5 rounded-2xl p-8 text-center hover:border-emerald-500/30 transition-all duration-500">
                <div className="text-lg font-black uppercase italic mb-2">{model.name}</div>
                <div className="text-white/40 text-sm">{model.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-32 px-6 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-32">
          <div className="space-y-12">
            <h2 className="text-4xl font-black uppercase italic tracking-tighter">Why LexiCode</h2>
            <div className="space-y-8">
              {[
                { t: "AI-First Workflow", d: "Create entire projects with natural language. Edit files conversationally with intelligent AI assistance." },
                { t: "Professional Editor", d: "Monaco Editor brings VS Code's power to the web with syntax highlighting and IntelliSense." },
                { t: "Multi-Format Export", d: "Export to PDF, DOCX, XLSX, CSV, and more. Production-ready documents with one click." }
              ].map((item, i) => (
                <div key={i} className="flex gap-6">
                   <div className="mt-1"><CheckCircle2 className="text-emerald-500" size={24} /></div>
                   <div>
                      <h4 className="text-lg font-bold uppercase italic tracking-tight">{item.t}</h4>
                      <p className="text-white/40 text-sm leading-relaxed">{item.d}</p>
                   </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-[#0c0c0e] border border-white/5 p-12 rounded-[50px]">
            <h3 className="text-2xl font-black uppercase italic tracking-tighter mb-10">Technical Specifications</h3>
            <div className="space-y-6">
              {SPECS.map((s, i) => (
                <div key={i} className="flex justify-between items-center py-4 border-b border-white/5 last:border-0">
                  <span className="text-[10px] font-black uppercase tracking-[0.4em] text-white/30">{s.label}</span>
                  <span className="text-sm font-bold text-emerald-500 italic uppercase">{s.value}</span>
                </div>
              ))}
            </div>
            <div className="mt-12 pt-12 border-t border-white/5 text-center">
               <Code2 className="mx-auto mb-4 text-emerald-500" size={20} />
               <p className="text-[10px] font-black uppercase tracking-[0.3em] opacity-40 italic">Development Standard</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-32 px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-emerald-600/5 to-transparent"></div>
        
        <div className="relative z-10 max-w-4xl mx-auto text-center space-y-8">
          <h2 className="text-4xl md:text-6xl font-black uppercase italic tracking-tighter">
            Ready to Code?
          </h2>
          <p className="text-white/60 text-lg max-w-2xl mx-auto">
            Download LexiCode and experience AI-powered document creation. Free and open source with your own Groq API key.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button className="w-full sm:w-auto bg-emerald-600 hover:bg-emerald-500 text-white px-12 py-6 rounded-full font-black text-[10px] tracking-widest uppercase transition-all flex items-center gap-3 justify-center active:scale-95 shadow-2xl shadow-emerald-600/20">
              <Download size={16} />
              Download Now
            </button>
            <Link href="/contact">
              <button className="w-full sm:w-auto border border-white/20 text-white hover:bg-white/5 px-12 py-6 rounded-full font-black text-[10px] tracking-widest uppercase transition-all flex items-center gap-3 justify-center">
                Contact Us
              </button>
            </Link>
          </div>
        </div>
      </section>

      <footer className="py-12 px-6 border-t border-white/5">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-4">
            <Code2 size={24} className="text-emerald-500" />
            <span className="font-black tracking-widest uppercase text-sm">LexiCode</span>
          </div>
          <div className="text-white/40 text-xs">
            MIT License • Open Source • Built with ❤️
          </div>
          <div className="flex gap-6">
            <Layers size={18} className="text-white/40 hover:text-emerald-500 transition-colors cursor-pointer" />
          </div>
        </div>
      </footer>
    </div>
  );
}

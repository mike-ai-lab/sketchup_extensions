import React, { useEffect, useRef } from "react";
import { Link } from "wouter";
import Header from "../components/Header";
import { 
  Brain,
  Mic,
  Image as ImageIcon,
  MessageSquare,
  FileText,
  Zap,
  Lock,
  Globe,
  Sparkles,
  CheckCircle2,
  ArrowRight,
  Download,
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
    icon: MessageSquare,
    title: "AI Assistant",
    description: "Multi-file chat interface with context-aware responses. Upload documents, images, and get intelligent answers from Gemini AI."
  },
  {
    icon: Mic,
    title: "Voice Dictation",
    description: "Real-time voice-to-text transcription with AI-powered polishing. Perfect for note-taking and content creation."
  },
  {
    icon: ImageIcon,
    title: "Image Generation",
    description: "Create stunning images from text descriptions. Text-to-image and image-to-image generation with multiple AI models."
  },
  {
    icon: Globe,
    title: "Web Search & Memory",
    description: "Enhanced AI with web search capabilities and conversation memory. Get current information and maintain context."
  },
  {
    icon: FileText,
    title: "Multi-Format Support",
    description: "Support for text, images, PDFs, Excel, CSV, and more. Analyze and process multiple file types seamlessly."
  },
  {
    icon: Lock,
    title: "Privacy First",
    description: "Your API keys stay local. All processing happens on your machine with complete data privacy."
  }
];

const TECH_STACK = [
  { name: "Google Gemini", detail: "Multi-modal AI with vision" },
  { name: "Electron", detail: "Cross-platform desktop app" },
  { name: "React 19", detail: "Modern UI framework" },
  { name: "TypeScript", detail: "Type-safe development" },
  { name: "Web Speech API", detail: "Voice recognition" },
  { name: "Local Storage", detail: "Offline-first architecture" }
];

const SPECS = [
  { label: "Version", value: "2.7.0" },
  { label: "Platform", value: "Windows/Mac/Linux" },
  { label: "License", value: "Proprietary" },
  { label: "Cost", value: "Free + API Key" }
];

export default function SemantraDetail() {
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
    <div className="bg-[#030303] min-h-screen text-white font-sans selection:bg-cyan-600">
      <Header currentPage="tools" />

      <section ref={heroRef} className="hero-section relative min-h-screen flex items-center justify-center px-6 py-32 overflow-hidden">
        <div className="hero-bg absolute inset-0 opacity-20">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/20 rounded-full blur-[120px]"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-[120px]"></div>
        </div>

        <div className="relative z-10 max-w-6xl mx-auto text-center space-y-8">
          <div className="inline-flex items-center gap-3 px-5 py-2 bg-cyan-600/10 border border-cyan-500/20 rounded-full mb-6">
            <Sparkles size={16} className="text-cyan-500" />
            <span className="text-[10px] font-black tracking-widest text-cyan-500 uppercase">Unified Intelligence</span>
          </div>

          <h1 className="text-5xl sm:text-6xl md:text-8xl font-black uppercase italic tracking-tighter leading-[0.9]">
            <span className="text-cyan-500">Semantra</span>
          </h1>

          <p className="text-xl md:text-2xl text-white/60 max-w-3xl mx-auto font-medium">
            All-in-One AI Assistant with Voice Dictation, Image Generation, and Intelligent Chat
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-8">
            <button className="w-full sm:w-auto bg-cyan-600 hover:bg-cyan-500 text-white px-12 py-6 rounded-full font-black text-[10px] tracking-widest uppercase transition-all flex items-center gap-3 justify-center active:scale-95 shadow-2xl shadow-cyan-600/20">
              <Download size={16} />
              Download App
              <ArrowRight size={14} />
            </button>
            <a href="https://github.com/yourusername/mi-events" target="_blank" rel="noopener noreferrer">
              <button className="w-full sm:w-auto border border-white/20 text-white hover:bg-white/5 px-10 py-6 rounded-full font-black text-[10px] tracking-widest uppercase transition-all flex items-center gap-3 justify-center">
                View Source
                <ExternalLink size={14} />
              </button>
            </a>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-16 max-w-4xl mx-auto">
            <div className="space-y-2">
              <div className="text-3xl md:text-4xl font-black text-cyan-500">3-in-1</div>
              <div className="text-[10px] font-black uppercase tracking-widest text-white/40">AI Tools</div>
            </div>
            <div className="space-y-2">
              <div className="text-3xl md:text-4xl font-black text-cyan-500">100%</div>
              <div className="text-[10px] font-black uppercase tracking-widest text-white/40">Private</div>
            </div>
            <div className="space-y-2">
              <div className="text-3xl md:text-4xl font-black text-cyan-500">Free</div>
              <div className="text-[10px] font-black uppercase tracking-widest text-white/40">Core Features</div>
            </div>
            <div className="space-y-2">
              <div className="text-3xl md:text-4xl font-black text-cyan-500">Multi</div>
              <div className="text-[10px] font-black uppercase tracking-widest text-white/40">Platform</div>
            </div>
          </div>
        </div>
      </section>

      <section id="features" className="py-32 px-6 bg-[#050505]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <span className="text-cyan-500 text-[10px] font-black tracking-[0.5em] uppercase">Core Capabilities</span>
            <h2 className="text-4xl md:text-6xl font-black uppercase italic tracking-tighter mt-4">Everything You Need</h2>
          </div>

          <div className="features-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {FEATURES.map((feature, idx) => (
              <div key={idx} className="feature-card bg-[#0a0a0c] border border-white/5 rounded-2xl p-8 hover:border-cyan-500/30 transition-all duration-500 group">
                <div className="p-4 bg-cyan-600/10 rounded-xl inline-block mb-6 group-hover:bg-cyan-600 transition-all duration-500">
                  <feature.icon size={24} className="text-cyan-500 group-hover:text-white transition-colors" />
                </div>
                <h3 className="text-xl font-black uppercase italic mb-3">{feature.title}</h3>
                <p className="text-white/50 text-sm leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-32 px-6 border-y border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <span className="text-cyan-500 text-[10px] font-black tracking-[0.5em] uppercase">Technology</span>
            <h2 className="text-4xl md:text-6xl font-black uppercase italic tracking-tighter mt-4">Built With Modern Stack</h2>
          </div>

          <div className="tech-stack grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-5xl mx-auto">
            {TECH_STACK.map((tech, idx) => (
              <div key={idx} className="tech-item bg-[#0a0a0c] border border-white/5 rounded-xl p-6 flex items-center gap-4">
                <CheckCircle2 size={20} className="text-cyan-500 flex-shrink-0" />
                <div>
                  <div className="font-black text-sm">{tech.name}</div>
                  <div className="text-white/40 text-xs">{tech.detail}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-32 px-6 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-32">
          <div className="space-y-12">
            <h2 className="text-4xl font-black uppercase italic tracking-tighter">Why MI Events</h2>
            <div className="space-y-8">
              {[
                { t: "Unified Workspace", d: "Switch seamlessly between AI chat, voice dictation, and image generation in one app." },
                { t: "Privacy Focused", d: "Your API keys and data stay on your machine. No cloud storage, no tracking." },
                { t: "Multi-Modal AI", d: "Upload images, documents, and get intelligent responses with full context awareness." }
              ].map((item, i) => (
                <div key={i} className="flex gap-6">
                   <div className="mt-1"><CheckCircle2 className="text-cyan-500" size={24} /></div>
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
                  <span className="text-sm font-bold text-cyan-500 italic uppercase">{s.value}</span>
                </div>
              ))}
            </div>
            <div className="mt-12 pt-12 border-t border-white/5 text-center">
               <Brain className="mx-auto mb-4 text-cyan-500" size={20} />
               <p className="text-[10px] font-black uppercase tracking-[0.3em] opacity-40 italic">Intelligence Standard</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-32 px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-cyan-600/5 to-transparent"></div>
        
        <div className="relative z-10 max-w-4xl mx-auto text-center space-y-8">
          <h2 className="text-4xl md:text-6xl font-black uppercase italic tracking-tighter">
            Ready to Start?
          </h2>
          <p className="text-white/60 text-lg max-w-2xl mx-auto">
            Download Semantra and experience the future of unified AI assistance. Free to use with your own API key.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button className="w-full sm:w-auto bg-cyan-600 hover:bg-cyan-500 text-white px-12 py-6 rounded-full font-black text-[10px] tracking-widest uppercase transition-all flex items-center gap-3 justify-center active:scale-95 shadow-2xl shadow-cyan-600/20">
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
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-6">
            <div className="flex items-center gap-4">
              <Brain size={24} className="text-cyan-500" />
              <span className="font-black tracking-widest uppercase text-sm">Semantra</span>
            </div>
            <div className="text-white/40 text-xs">
              Proprietary • Built with ❤️ by IA. Muhamad Shkeir
            </div>
            <div className="flex gap-6">
              <Globe size={18} className="text-white/40 hover:text-cyan-500 transition-colors cursor-pointer" />
            </div>
          </div>
          
          <div className="flex flex-wrap items-center justify-center gap-4 md:gap-6 pt-6 border-t border-white/5">
            <a 
              href="/privacy-policy.html" 
              target="_blank"
              rel="noopener noreferrer"
              className="text-[9px] font-black tracking-[0.4em] text-white/20 uppercase hover:text-white/60 transition-colors"
            >
              Privacy Policy
            </a>
            <div className="w-px h-3 bg-white/10"></div>
            <a 
              href="/terms-of-service.html" 
              target="_blank"
              rel="noopener noreferrer"
              className="text-[9px] font-black tracking-[0.4em] text-white/20 uppercase hover:text-white/60 transition-colors"
            >
              Terms of Service
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}

import Header from "../components/Header";
import { CheckCircle2, ExternalLink, Mic, MessageSquare, FileText, StickyNote, Sparkles, Download } from "lucide-react";

const FEATURES = [
  { icon: Mic, title: "Live Dictation", description: "Real-time speech-to-text into any text field in any Windows app. Browsers, editors, chat apps, IDEs â€” all supported." },
  { icon: FileText, title: "Prompt Rewriter", description: "Speak your rough idea and let Gemini rewrite it into a clean, structured prompt. Auto-copied to clipboard." },
  { icon: StickyNote, title: "Quick Notes", description: "Persistent rich-text notepad with voice dictation, formatting, inline images, and screenshots." },
  { icon: MessageSquare, title: "Voice Conversation", description: "Live two-way audio conversation with Gemini. Real-time floating captions. Native audio output." }
];

const SPECS = [
  { label: "Version", value: "1.0.0" },
  { label: "Platform", value: "Windows 10 / 11" },
  { label: "Runtime", value: "Python 3.10+" },
  { label: "Cost", value: "Free & Open" }
];

const DOWNLOAD_URL = "/downloads/GeminiDictate_v1.0.zip";

export default function GeminiDictateDetail() {
  return (
    <div className="bg-[#050505] min-h-screen text-white font-sans selection:bg-emerald-600 overflow-x-hidden">
      <Header currentPage="tools" />

      {/* Hero */}
      <section className="pt-40 pb-20 px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div className="space-y-8">
            <div className="inline-flex items-center gap-3 px-3 py-1 bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 text-[10px] font-black uppercase tracking-widest rounded">
              <Sparkles size={12} /> AI Voice Interface
            </div>
            <h1 className="text-[90px] font-black tracking-tighter leading-[0.75] uppercase italic stroke-text">
              Gemini<br />Dictate
            </h1>
            <p className="text-2xl font-medium text-white/60 leading-tight">
              Real-Time AI Speech<br />Interface for Windows
            </p>
            <p className="text-white/40 leading-relaxed max-w-lg">
              A floating overlay widget that lets you dictate into any app, rewrite prompts with Gemini, take voice notes, and have live two-way voice conversations, all without leaving your workflow.
            </p>
            <div className="flex flex-wrap gap-4 pt-4">
              <a href={DOWNLOAD_URL} download>
                <button className="bg-emerald-600 hover:bg-emerald-500 text-white px-10 py-5 rounded-2xl font-black text-xs tracking-widest uppercase transition-all flex items-center gap-4 active:scale-95 shadow-2xl shadow-emerald-600/20">
                  Download Free <Download size={18} />
                </button>
              </a>
              <a href="https://github.com/mike-ai-lab/sketchup_extensions" target="_blank" rel="noopener noreferrer">
                <button className="bg-white/5 hover:bg-white/10 border border-white/10 text-white px-10 py-5 rounded-2xl font-black text-xs tracking-widest uppercase transition-all flex items-center gap-4 active:scale-95">
                  <ExternalLink size={18} /> View Source
                </button>
              </a>
            </div>
            <div className="flex items-center gap-6 pt-4 text-[9px] font-bold text-white/20 uppercase tracking-[0.3em]">
              <span className="flex items-center gap-2"><Mic size={12} className="text-emerald-500" /> Windows Only</span>
              <span className="flex items-center gap-2"><Mic size={12} className="text-emerald-500" /> Gemini API</span>
              <span className="flex items-center gap-2"><Mic size={12} className="text-emerald-500" /> 5 Modes</span>
            </div>
          </div>

          <div className="relative flex justify-center items-center">
            <div className="w-[500px] h-[500px] bg-[#0c0c0e] border border-white/5 rounded-[60px] flex items-center justify-center relative overflow-hidden group">
              <div className="absolute inset-0 bg-emerald-600/5 opacity-0 group-hover:opacity-100 transition-opacity" />
              <Mic className="w-48 h-48 text-white/5 group-hover:text-emerald-500/20 transition-colors duration-700" strokeWidth={0.5} />
              <div className="absolute bottom-10 left-10 flex flex-col gap-2">
                {["LIVE", "BUF", "PRO", "NTS", "CONV"].map((m, i) => (
                  <div key={m} className="text-[8px] font-black tracking-widest text-emerald-500/60 border border-emerald-500/20 px-3 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity" style={{ transitionDelay: `${i * 80}ms` }}>
                    {m}
                  </div>
                ))}
              </div>
              <div className="absolute bottom-10 right-10 flex gap-1">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="w-1 h-1 bg-emerald-500 rounded-full animate-pulse" style={{ animationDelay: `${i * 0.2}s` }} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-32 px-8 bg-[#08080a]">
        <div className="max-w-7xl mx-auto">
          <div className="mb-20 space-y-4">
            <h2 className="text-4xl font-black uppercase italic tracking-tighter">System Features</h2>
            <div className="w-20 h-1 bg-emerald-500" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {FEATURES.map((f, i) => (
              <div key={i} className="bg-[#0c0c0e] border border-white/5 p-10 rounded-[40px] hover:border-emerald-500/50 transition-colors group">
                <div className="w-16 h-16 bg-emerald-500/10 rounded-2xl flex items-center justify-center text-emerald-500 mb-8 group-hover:bg-emerald-500 group-hover:text-white transition-all">
                  <f.icon size={28} />
                </div>
                <h3 className="text-lg font-black uppercase tracking-tight mb-4 italic">{f.title}</h3>
                <p className="text-sm text-white/40 leading-relaxed font-medium">{f.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Quick Start + Specs */}
      <section className="py-32 px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-32">
          <div className="space-y-12">
            <h2 className="text-4xl font-black uppercase italic tracking-tighter">Quick Start</h2>
            <div className="space-y-8">
              {[
                { t: "Install Python & dependencies", d: "pip install google-genai pyaudio sounddevice numpy scipy Pillow pystray websockets" },
                { t: "Set your Gemini API key", d: "setx GEMINI_API_KEY your_key_here â€” then restart. Free key at aistudio.google.com." },
                { t: "Launch & press F8", d: "Run INSTALL_GEMINIDICTATE.bat once to create the Desktop shortcut, then press F8 to show the widget." }
              ].map((item, i) => (
                <div key={i} className="flex gap-6">
                  <div className="mt-1"><CheckCircle2 className="text-emerald-500" size={24} /></div>
                  <div>
                    <h4 className="text-lg font-bold uppercase italic tracking-tight">{item.t}</h4>
                    <p className="text-white/40 text-sm leading-relaxed font-mono">{item.d}</p>
                  </div>
                </div>
              ))}
            </div>
            <a href={DOWNLOAD_URL} download>
              <button className="bg-emerald-600 hover:bg-emerald-500 text-white px-10 py-5 rounded-2xl font-black text-xs tracking-widest uppercase transition-all flex items-center gap-4 active:scale-95 shadow-2xl shadow-emerald-600/20 mt-4">
                Download v1.0 <Download size={18} />
              </button>
            </a>
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
              <Mic className="mx-auto mb-4 text-emerald-500" size={20} />
              <p className="text-[10px] font-black uppercase tracking-[0.3em] opacity-40 italic">Voice Intelligence Standard</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <div className="flex justify-center py-20 px-8">
        <footer className="bg-[#0c0c0e] border border-white/5 rounded-full px-12 py-6 shadow-2xl">
          <div className="flex flex-col items-center gap-4">
            <div className="flex items-center gap-6 text-[10px] font-black tracking-[0.4em] text-white/30 uppercase">
              <span>Â© 2025 Studio</span>
              <div className="w-1 h-1 bg-white/10 rounded-full" />
              <span>Muhamad Shkeir</span>
              <div className="w-1 h-1 bg-white/10 rounded-full" />
              <span className="text-emerald-500">Riyadh, KSA</span>
            </div>
            <div className="flex items-center gap-4">
              <a href="/privacy-policy.html" target="_blank" rel="noopener noreferrer" className="text-[9px] font-black tracking-[0.4em] text-white/20 uppercase hover:text-emerald-500 transition-colors">Privacy Policy</a>
              <div className="w-px h-3 bg-white/10" />
              <a href="/terms-of-service.html" target="_blank" rel="noopener noreferrer" className="text-[9px] font-black tracking-[0.4em] text-white/20 uppercase hover:text-emerald-500 transition-colors">Terms of Service</a>
            </div>
          </div>
        </footer>
      </div>

      <style>{`
        .stroke-text { -webkit-text-stroke: 1px rgba(255,255,255,0.2); color: transparent; }
        @media (min-width: 1024px) { .stroke-text { -webkit-text-stroke: 2px rgba(255,255,255,0.2); } }
      `}</style>
    </div>
  );
}


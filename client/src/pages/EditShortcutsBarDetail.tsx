import { useState } from "react";
import { ArrowRight, Download, Keyboard, MousePointer2, Layers, Zap, ShieldCheck, CheckCircle2, Copy } from "lucide-react";
import Header from "../components/Header";
import DownloadModal from "../components/DownloadModal";

const FEATURES = [
  {
    icon: MousePointer2,
    title: "One-Click Edits",
    description: "Cut, Copy, Paste, Paste in Place, and Select All — all triggered from persistent toolbar icons without touching the keyboard.",
  },
  {
    icon: Copy,
    title: "Paste in Place",
    description: "Includes the often-missed Paste in Place command as a dedicated icon, keeping geometry exactly where it belongs.",
  },
  {
    icon: Layers,
    title: "Extensions Menu",
    description: "All commands also appear under the Extensions menu for quick access from anywhere in SketchUp.",
  },
  {
    icon: Zap,
    title: "Zero Config",
    description: "Install and go. No settings, no setup — the toolbar loads automatically every time SketchUp starts.",
  },
];

const SPECS = [
  { label: "Version",   value: "1.1.0" },
  { label: "Platform",  value: "SketchUp 2017+" },
  { label: "OS",        value: "Windows / macOS" },
  { label: "License",   value: "Free" },
  { label: "Format",    value: ".RBZ Extension" },
  { label: "Author",    value: "Muhamad Shkeir" },
];

const TAGS  = ["Edit Commands", "Toolbar Icons", "Keyboard-Free"];
const ACCENT = "#0ea5e9";

export default function EditShortcutsBarDetail() {
  const [modalOpen, setModalOpen] = useState(false);
  return (
    <div className="bg-[#050505] min-h-screen text-white font-sans overflow-x-hidden">
      <Header currentPage="tools" />
      <DownloadModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        fileName="Edit Shortcuts Bar v1.1.0"
        downloadUrl="/downloads/EditShortcutsBar_v1.1.0.rbz"
        accentColor="#0ea5e9"
      />

      {/* Hero */}
      <section className="pt-40 pb-20 px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div className="space-y-8">
            <div
              className="inline-flex items-center gap-3 px-3 py-1 border text-[10px] font-black uppercase tracking-widest rounded"
              style={{ backgroundColor: `${ACCENT}1a`, borderColor: `${ACCENT}33`, color: ACCENT }}
            >
              <Zap size={12} /> Free SketchUp Extension
            </div>

            <h1 className="text-[clamp(52px,8vw,90px)] font-black tracking-tighter leading-[0.75] uppercase italic stroke-text">
              Edit<br />Shortcuts<br />Bar
            </h1>

            <p className="text-white/40 leading-relaxed max-w-lg">
              Adds the most-used edit commands — Cut, Copy, Paste, Paste in Place,
              and Select All — as clickable toolbar icons in SketchUp. Stop hunting
              for keyboard shortcuts mid-workflow.
            </p>

            <div className="flex flex-wrap gap-4 pt-4">
              <button
                onClick={() => setModalOpen(true)}
                className="group flex items-center gap-3 px-8 py-4 font-black text-sm uppercase tracking-widest text-black rounded-full transition-all hover:scale-105"
                style={{ backgroundColor: ACCENT }}
              >
                <Download size={16} />
                Download Free
                <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
              </button>
            </div>

            <div className="flex items-center gap-6 pt-4 text-[9px] font-bold text-white/20 uppercase tracking-[0.3em]">
              {TAGS.map((tag, i) => (
                <span key={i} className="flex items-center gap-2">
                  <ShieldCheck size={12} style={{ color: ACCENT }} /> {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Icon box */}
          <div className="relative flex justify-center items-center">
            <div className="w-[460px] h-[460px] bg-[#0c0c0e] border border-white/5 rounded-[60px] flex items-center justify-center relative overflow-hidden group">
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700"
                style={{ background: `${ACCENT}08` }}
              />
              <Keyboard
                className="w-40 h-40 text-white/5 group-hover:text-white/10 transition-colors duration-700"
                strokeWidth={0.5}
              />
              <div className="absolute bottom-10 right-10 flex gap-1">
                {[0, 1, 2].map(i => (
                  <div key={i} className="w-1 h-1 rounded-full animate-pulse" style={{ backgroundColor: ACCENT, animationDelay: `${i * 0.2}s` }} />
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
            <div className="w-20 h-1" style={{ backgroundColor: ACCENT }} />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {FEATURES.map((f, i) => (
              <div
                key={i}
                className="bg-[#0c0c0e] border border-white/5 p-10 rounded-[40px] transition-colors group"
                onMouseEnter={e => (e.currentTarget.style.borderColor = `${ACCENT}80`)}
                onMouseLeave={e => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.05)")}
              >
                <div className="w-16 h-16 rounded-2xl flex items-center justify-center mb-8" style={{ backgroundColor: `${ACCENT}1a`, color: ACCENT }}>
                  <f.icon size={28} />
                </div>
                <h3 className="text-lg font-black uppercase tracking-tight mb-4 italic">{f.title}</h3>
                <p className="text-sm text-white/40 leading-relaxed font-medium">{f.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Specs */}
      <section className="py-32 px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-32">
          <div className="space-y-12">
            <h2 className="text-4xl font-black uppercase italic tracking-tighter">Why It Exists</h2>
            <div className="space-y-8">
              {[
                { t: "Faster Editing Flow", d: "Keep your hands on the mouse while editing geometry — no more breaking flow to reach the keyboard." },
                { t: "Accessibility First", d: "Useful for users who struggle with keyboard shortcuts due to physical constraints or custom input setups." },
                { t: "Lightweight & Non-Intrusive", d: "No background processes, no settings panels. The toolbar loads once and stays out of the way." },
              ].map((item, i) => (
                <div key={i} className="flex gap-6">
                  <CheckCircle2 size={24} className="mt-1 flex-shrink-0" style={{ color: ACCENT }} />
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
                  <span className="text-sm font-bold italic uppercase" style={{ color: ACCENT }}>{s.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <div className="flex justify-center py-20 px-8">
        <footer className="bg-[#0c0c0e] border border-white/5 rounded-full px-12 py-6 shadow-2xl">
          <div className="flex flex-col items-center gap-4">
            <div className="flex items-center gap-6 text-[10px] font-black tracking-[0.4em] text-white/30 uppercase">
              <span>© 2025 Studiø</span>
              <div className="w-1 h-1 bg-white/10 rounded-full" />
              <span>Muhamad Shkeir</span>
              <div className="w-1 h-1 bg-white/10 rounded-full" />
              <span style={{ color: ACCENT }}>Riyadh, KSA</span>
            </div>
            <div className="flex items-center gap-4">
              <a href="/privacy-policy.html" target="_blank" rel="noopener noreferrer" className="text-[9px] font-black tracking-[0.4em] text-white/20 uppercase hover:text-white/60 transition-colors">Privacy Policy</a>
              <div className="w-px h-3 bg-white/10" />
              <a href="/terms-of-service.html" target="_blank" rel="noopener noreferrer" className="text-[9px] font-black tracking-[0.4em] text-white/20 uppercase hover:text-white/60 transition-colors">Terms of Service</a>
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

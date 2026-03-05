import { Link } from "wouter";
import { Download as DownloadIcon, ChevronLeft, Zap, CheckCircle2 } from "lucide-react";

const EXTENSIONS = [
  { name: "PARAMETRIX", version: "1.0.0", size: "2.4 MB", color: "#3b82f6", slug: "parametrix" },
  { name: "AutoNestCut", version: "1.0.0", size: "1.8 MB", color: "#10b981", slug: "autonestcut" },
  { name: "SPECBASE", version: "2.0.0", size: "Free", color: "#6366f1", slug: "specbase" },
  { name: "DocMark", version: "2.0.0", size: "Free", color: "#a855f7", slug: "docmark" }
];

export default function Download() {
  return (
    <div className="bg-[#050505] min-h-screen text-white font-sans overflow-x-hidden">
      <nav className="fixed top-0 w-full z-50 p-8 flex justify-between items-center bg-[#050505]/80 backdrop-blur-xl border-b border-white/5">
        <Link href="/tools" className="flex items-center gap-4 text-[10px] font-black tracking-[0.4em] text-white/30 hover:text-blue-500 transition-colors uppercase group">
          <ChevronLeft size={16} className="group-hover:-translate-x-2 transition-transform" /> Back
        </Link>
        <div className="text-sm font-black tracking-[0.8em] italic opacity-20">DOWNLOADS</div>
        <div className="w-20"></div>
      </nav>

      <section className="pt-40 pb-20 px-8 max-w-7xl mx-auto text-center">
        <div className="inline-flex items-center gap-3 px-3 py-1 bg-blue-500/10 border border-blue-500/20 text-blue-500 text-[10px] font-black uppercase tracking-widest rounded mb-8">
          <Zap size={12} /> Resources
        </div>
        
        <h1 className="text-[80px] md:text-[120px] font-black tracking-tighter leading-[0.75] uppercase italic stroke-text mb-8">
          Downloads
        </h1>
        
        <p className="text-xl text-white/60 max-w-2xl mx-auto leading-relaxed">
          Get the latest versions of our extensions and tools
        </p>
      </section>

      <section className="py-20 px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {EXTENSIONS.map((ext, i) => (
            <div key={ext.slug} className="bg-[#0c0c0e] border border-white/5 p-10 rounded-[40px] hover:border-blue-500/50 transition-colors">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h3 className="text-2xl font-black uppercase italic tracking-tight mb-2">{ext.name}</h3>
                  <p className="text-sm text-white/40">Version {ext.version}</p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-white/30 uppercase tracking-widest">Size</p>
                  <p className="text-sm font-bold text-blue-500">{ext.size}</p>
                </div>
              </div>
              
              <div className="space-y-3 mb-8">
                <div className="flex items-center gap-2 text-sm text-white/40">
                  <CheckCircle2 size={16} className="text-blue-500" />
                  Extension files (.rbz)
                </div>
                <div className="flex items-center gap-2 text-sm text-white/40">
                  <CheckCircle2 size={16} className="text-blue-500" />
                  Installation guide
                </div>
                <div className="flex items-center gap-2 text-sm text-white/40">
                  <CheckCircle2 size={16} className="text-blue-500" />
                  User documentation
                </div>
              </div>

              <Link href={`/tools/${ext.slug}`}>
                <button className="w-full bg-white/5 hover:bg-white/10 border border-white/10 text-white py-4 rounded-2xl font-black text-xs tracking-widest uppercase transition-all flex items-center justify-center gap-3">
                  <DownloadIcon size={16} /> Get Extension
                </button>
              </Link>
            </div>
          ))}
        </div>
      </section>

      <section className="py-32 px-8 bg-[#08080a]">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-black uppercase italic tracking-tighter mb-12 text-center">Installation Steps</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { num: "01", title: "Download", desc: "Download the .rbz file after purchase or trial" },
              { num: "02", title: "Install", desc: "Use SketchUp Extension Manager to install" },
              { num: "03", title: "Activate", desc: "Enter your license key to activate" }
            ].map((step, i) => (
              <div key={i} className="text-center">
                <div className="text-6xl font-black text-white/5 mb-4">{step.num}</div>
                <h3 className="text-xl font-black uppercase italic mb-2">{step.title}</h3>
                <p className="text-sm text-white/40">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="flex justify-center py-20 px-8">
        <footer className="bg-[#0c0c0e] border border-white/5 rounded-full px-12 py-6 shadow-2xl">
          <div className="flex items-center gap-6 text-[10px] font-black tracking-[0.4em] text-white/30 uppercase">
            <span>© 2025 Studiø</span>
            <div className="w-1 h-1 bg-white/10 rounded-full"></div>
            <span>Muhamad Shkeir</span>
          </div>
        </footer>
      </div>

      <style>{`
        .stroke-text {
          -webkit-text-stroke: 1px rgba(255,255,255,0.2);
          color: transparent;
        }
        @media (min-width: 1024px) {
          .stroke-text { -webkit-text-stroke: 2px rgba(255,255,255,0.2); }
        }
      `}</style>
    </div>
  );
}

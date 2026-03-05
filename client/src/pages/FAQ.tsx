import { Link } from "wouter";
import { ChevronLeft, Zap, ChevronDown } from "lucide-react";
import { useState } from "react";

const FAQS = [
  { q: "What are these extensions?", a: "Add-on tools that extend SketchUp functionality and automate complex tasks for architectural and design projects." },
  { q: "Which versions are supported?", a: "Extensions support SketchUp 2019 and newer versions, including Pro, Shop, and Web (where applicable)." },
  { q: "How does licensing work?", a: "Each extension requires a unique license key. After purchase, you receive a perpetual license with no recurring fees." },
  { q: "Can I use on multiple computers?", a: "Single-user license allows installation on multiple computers you own, but only one active instance at a time." },
  { q: "What's included in the trial?", a: "7-day free trial with full access to all features. No credit card required. Trial license key sent via email." },
  { q: "What happens after trial expires?", a: "Extension stops working until you purchase. Your work and settings are preserved for immediate continuation." },
  { q: "How do I install extensions?", a: "Download .rbz file, go to Window > Extension Manager > Install Extension, select file, restart SketchUp, enter license key." },
  { q: "What support do you provide?", a: "Email support for licensed users, comprehensive documentation, video tutorials, and regular updates." }
];

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <div className="bg-[#050505] min-h-screen text-white font-sans overflow-x-hidden">
      <nav className="fixed top-0 w-full z-50 p-8 flex justify-between items-center bg-[#050505]/80 backdrop-blur-xl border-b border-white/5">
        <Link href="/tools" className="flex items-center gap-4 text-[10px] font-black tracking-[0.4em] text-white/30 hover:text-blue-500 transition-colors uppercase group">
          <ChevronLeft size={16} className="group-hover:-translate-x-2 transition-transform" /> Back
        </Link>
        <div className="text-sm font-black tracking-[0.8em] italic opacity-20">FAQ</div>
        <div className="w-20"></div>
      </nav>

      <section className="pt-40 pb-20 px-8 max-w-7xl mx-auto text-center">
        <div className="inline-flex items-center gap-3 px-3 py-1 bg-blue-500/10 border border-blue-500/20 text-blue-500 text-[10px] font-black uppercase tracking-widest rounded mb-8">
          <Zap size={12} /> Support
        </div>
        
        <h1 className="text-[80px] md:text-[120px] font-black tracking-tighter leading-[0.75] uppercase italic stroke-text mb-8">
          FAQ
        </h1>
        
        <p className="text-xl text-white/60 max-w-2xl mx-auto leading-relaxed">
          Frequently asked questions
        </p>
      </section>

      <section className="py-20 px-8 max-w-4xl mx-auto">
        <div className="space-y-4">
          {FAQS.map((faq, i) => (
            <div key={i} className="bg-[#0c0c0e] border border-white/5 rounded-[30px] overflow-hidden hover:border-blue-500/30 transition-colors">
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="w-full p-8 flex items-center justify-between text-left"
              >
                <h3 className="text-lg font-black uppercase italic tracking-tight pr-4">{faq.q}</h3>
                <ChevronDown className={`w-5 h-5 text-blue-500 transition-transform ${open === i ? 'rotate-180' : ''}`} />
              </button>
              {open === i && (
                <div className="px-8 pb-8">
                  <p className="text-white/60 leading-relaxed">{faq.a}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      <section className="py-20 px-8 max-w-4xl mx-auto">
        <div className="bg-[#0c0c0e] border border-white/5 p-12 rounded-[50px] text-center">
          <h2 className="text-3xl font-black uppercase italic tracking-tight mb-4">Still Have Questions?</h2>
          <p className="text-white/60 mb-8 max-w-xl mx-auto">Can't find what you're looking for? Contact our support team.</p>
          <Link href="/contact">
            <button className="bg-blue-600 hover:bg-blue-500 text-white px-10 py-5 rounded-2xl font-black text-xs tracking-widest uppercase transition-all">
              Contact Support
            </button>
          </Link>
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

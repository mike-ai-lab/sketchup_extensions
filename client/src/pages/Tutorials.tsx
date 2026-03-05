import { Link } from "wouter";
import { ChevronLeft, Zap } from "lucide-react";

const TUTORIALS = [
  {
    name: "PARAMETRIX",
    steps: [
      { title: "Installation & Setup", desc: "Download and install the extension from Extension Manager. Configure initial settings.", media: "https://picsum.photos/seed/param1/800/500" },
      { title: "Basic Configuration", desc: "Set up default parameters and preferences for optimal performance with your workflow.", media: "https://picsum.photos/seed/param2/800/500" },
      { title: "Creating Your First Layout", desc: "Step-by-step guide to creating your first parametric layout using core features.", media: "https://picsum.photos/seed/param3/800/500" },
      { title: "Advanced Features", desc: "Explore pattern synchronization, custom materials, and automated trimming options.", media: "https://picsum.photos/seed/param4/800/500" }
    ]
  },
  {
    name: "AutoNestCut",
    steps: [
      { title: "Getting Started", desc: "Install the extension and familiarize yourself with the interface and basic controls.", media: "https://picsum.photos/seed/nest1/800/500" },
      { title: "Cut List Generation", desc: "Learn how to automatically generate optimized cut lists from your components.", media: "https://picsum.photos/seed/nest2/800/500" },
      { title: "Nesting Optimization", desc: "Master the nesting algorithms to minimize material waste and maximize efficiency.", media: "https://picsum.photos/seed/nest3/800/500" },
      { title: "Export Options", desc: "Export your cutting plans to various formats for workshop use and CNC machines.", media: "https://picsum.photos/seed/nest4/800/500" }
    ]
  }
];

export default function Tutorials() {
  return (
    <div className="bg-[#050505] min-h-screen text-white font-sans overflow-x-hidden">
      <nav className="fixed top-0 w-full z-50 p-8 flex justify-between items-center bg-[#050505]/80 backdrop-blur-xl border-b border-white/5">
        <Link href="/tools" className="flex items-center gap-4 text-[10px] font-black tracking-[0.4em] text-white/30 hover:text-blue-500 transition-colors uppercase group">
          <ChevronLeft size={16} className="group-hover:-translate-x-2 transition-transform" /> Back
        </Link>
        <div className="text-sm font-black tracking-[0.8em] italic opacity-20">TUTORIALS</div>
        <div className="w-20"></div>
      </nav>

      <section className="pt-40 pb-20 px-8 max-w-7xl mx-auto text-center">
        <div className="inline-flex items-center gap-3 px-3 py-1 bg-blue-500/10 border border-blue-500/20 text-blue-500 text-[10px] font-black uppercase tracking-widest rounded mb-8">
          <Zap size={12} /> Learning Resources
        </div>
        
        <h1 className="text-[80px] md:text-[120px] font-black tracking-tighter leading-[0.75] uppercase italic stroke-text mb-8">
          Tutorials
        </h1>
        
        <p className="text-xl text-white/60 max-w-2xl mx-auto leading-relaxed">
          Step-by-step guides to master our tools
        </p>
      </section>

      {TUTORIALS.map((tutorial, tutIdx) => (
        <section key={tutIdx} className={`py-20 px-8 ${tutIdx % 2 === 1 ? 'bg-[#08080a]' : ''}`}>
          <div className="max-w-7xl mx-auto">
            <div className="mb-16">
              <h2 className="text-4xl font-black uppercase italic tracking-tighter mb-2">{tutorial.name}</h2>
              <div className="w-20 h-1 bg-blue-500"></div>
            </div>

            <div className="space-y-20 relative">
              <div className="absolute left-0 top-0 bottom-0 w-px bg-white/5 hidden lg:block"></div>

              {tutorial.steps.map((step, stepIdx) => (
                <div key={stepIdx} className="flex flex-col lg:flex-row gap-8 items-start relative">
                  <div className="hidden lg:flex absolute -left-6 items-center justify-center w-12 h-12 rounded-full bg-[#0c0c0e] border-2 border-blue-500 z-10">
                    <span className="text-sm font-black">{stepIdx + 1}</span>
                  </div>

                  <div className="w-full lg:w-5/12 lg:ml-12">
                    <div className="aspect-video bg-[#0c0c0e] border border-white/5 rounded-[30px] overflow-hidden">
                      <img 
                        src={step.media} 
                        alt={step.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>

                  <div className="w-full lg:w-7/12 py-4">
                    <div className="inline-block lg:hidden px-3 py-1 rounded-lg bg-blue-500/10 text-blue-500 text-xs font-black tracking-wider mb-4">
                      STEP {stepIdx + 1}
                    </div>
                    <h3 className="text-3xl font-black uppercase italic tracking-tight mb-4">{step.title}</h3>
                    <p className="text-white/60 leading-relaxed text-lg">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      ))}

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

import { Link } from "wouter";
import Header from "../components/Header";
import { 
  ArrowRight, CheckCircle2, ExternalLink, MapPin, 
  Navigation, Users, Clock, Database, Zap, Star
} from "lucide-react";

const FEATURES = [
  { icon: MapPin, title: "Real-Time GPS Tracking", description: "Track field team movements with live GPS positioning and route visualization on interactive maps." },
  { icon: Users, title: "Lead Management", description: "Capture, organize, and manage leads with photos, notes, and location data directly from the field." },
  { icon: Navigation, title: "Route Optimization", description: "Plan efficient routes with waypoint queuing and turn-by-turn navigation integration." },
  { icon: Clock, title: "Session Logging", description: "Automatic time tracking and activity logging for each field visit with detailed session reports." }
];

const SPECS = [
  { label: "Version", value: "1.0.0" },
  { label: "Platform", value: "Web + Mobile PWA" },
  { label: "Backend", value: "Firebase Cloud" },
  { label: "Cost", value: "Contact for Pricing" }
];

export default function SiteTrackDetail() {
  return (
    <div className="bg-[#050505] min-h-screen text-white font-sans selection:bg-emerald-600 overflow-x-hidden">
      <Header currentPage="tools" />

      <section className="pt-40 pb-20 px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div className="space-y-8">
            <div className="inline-flex items-center gap-3 px-3 py-1 bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 text-[10px] font-black uppercase tracking-widest rounded">
              <Zap size={12} /> Field Tracking Platform
            </div>
            
            <h1 className="text-[120px] font-black tracking-tighter leading-[0.75] uppercase italic stroke-text">
              SiteTrack
            </h1>
            
            <p className="text-2xl font-medium text-white/60 leading-tight">
              Real-Time Field Team <br/>Tracking & Lead Management
            </p>

            <p className="text-white/40 leading-relaxed max-w-lg">
              SiteTrack Pro is a comprehensive field operations platform that combines GPS tracking, lead management, and cloud synchronization. Built for teams that need reliable location tracking with offline support and real-time data sync.
            </p>

            <div className="flex flex-wrap gap-4 pt-4">
              <a href="https://sitetrack.mimevents.com" target="_blank" rel="noopener noreferrer">
                <button className="bg-emerald-600 hover:bg-emerald-500 text-white px-10 py-5 rounded-2xl font-black text-xs tracking-widest uppercase transition-all flex items-center gap-4 active:scale-95 shadow-2xl shadow-emerald-600/20">
                  Launch SiteTrack <ExternalLink size={18} />
                </button>
              </a>
              <Link href="/contact">
                <button className="bg-white/5 hover:bg-white/10 border border-white/10 text-white px-10 py-5 rounded-2xl font-black text-xs tracking-widest uppercase transition-all flex items-center gap-4 active:scale-95">
                  <ArrowRight size={18} /> Contact Sales
                </button>
              </Link>
            </div>
            
            <div className="flex items-center gap-6 pt-4 text-[9px] font-bold text-white/20 uppercase tracking-[0.3em]">
              <span className="flex items-center gap-2"><Star size={12} className="text-emerald-500 fill-emerald-500" /> Cloud Sync</span>
              <span className="flex items-center gap-2"><Star size={12} className="text-emerald-500 fill-emerald-500" /> Offline Mode</span>
              <span className="flex items-center gap-2"><Star size={12} className="text-emerald-500 fill-emerald-500" /> Mobile PWA</span>
            </div>
          </div>

          <div className="relative flex justify-center items-center">
            <div className="w-[500px] h-[500px] bg-[#0c0c0e] border border-white/5 rounded-[60px] flex items-center justify-center relative overflow-hidden group">
               <div className="absolute inset-0 bg-emerald-600/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
               <MapPin className="w-48 h-48 text-white/5 group-hover:text-emerald-500/20 transition-colors duration-700" strokeWidth={0.5} />
               <div className="absolute top-10 left-10 text-[9px] font-mono opacity-20 group-hover:opacity-100 transition-opacity">
                  ID: MOD_STPRO_003<br/>STATUS: READY_FOR_DEPLOY
               </div>
               <div className="absolute bottom-10 right-10 flex gap-1">
                  {[...Array(3)].map((_, i) => (
                    <div key={i} className="w-1 h-1 bg-emerald-500 rounded-full animate-pulse" style={{ animationDelay: `${i*0.2}s` }}></div>
                  ))}
               </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-32 px-8 bg-[#08080a]">
        <div className="max-w-7xl mx-auto">
          <div className="mb-20 space-y-4">
            <h2 className="text-4xl font-black uppercase italic tracking-tighter">System Features</h2>
            <div className="w-20 h-1 bg-emerald-500"></div>
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

      <section className="py-32 px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-32">
          <div className="space-y-12">
            <h2 className="text-4xl font-black uppercase italic tracking-tighter">Perfect For</h2>
            <div className="space-y-8">
              {[
                { t: "Field Sales Teams", d: "Track sales representatives, manage leads, and optimize territory coverage in real-time with GPS visualization." },
                { t: "Construction Site Management", d: "Monitor site visits, document progress with photos, and coordinate field teams efficiently across multiple locations." },
                { t: "Service & Maintenance", d: "Schedule service calls, track technician locations, and maintain customer visit records with automatic session logging." }
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
               <MapPin className="mx-auto mb-4 text-emerald-500" size={20} />
               <p className="text-[10px] font-black uppercase tracking-[0.3em] opacity-40 italic">Field Operations Standard</p>
            </div>
          </div>
        </div>
      </section>

      <div className="flex justify-center py-20 px-8">
        <footer className="bg-[#0c0c0e] border border-white/5 rounded-full px-12 py-6 shadow-2xl">
          <div className="flex flex-col items-center gap-4">
            <div className="flex items-center gap-6 text-[10px] font-black tracking-[0.4em] text-white/30 uppercase">
              <span>© 2025 Studiø</span>
              <div className="w-1 h-1 bg-white/10 rounded-full"></div>
              <span>Muhamad Shkeir</span>
              <div className="w-1 h-1 bg-white/10 rounded-full"></div>
              <span className="text-emerald-500">Riyadh, KSA</span>
            </div>
            <div className="flex items-center gap-4">
              <a href="/privacy-policy.html" target="_blank" rel="noopener noreferrer" className="text-[9px] font-black tracking-[0.4em] text-white/20 uppercase hover:text-emerald-500 transition-colors">
                Privacy Policy
              </a>
              <div className="w-px h-3 bg-white/10"></div>
              <a href="/terms-of-service.html" target="_blank" rel="noopener noreferrer" className="text-[9px] font-black tracking-[0.4em] text-white/20 uppercase hover:text-emerald-500 transition-colors">
                Terms of Service
              </a>
            </div>
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

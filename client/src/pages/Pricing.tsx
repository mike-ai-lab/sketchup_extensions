import { Link } from "wouter";
import { CheckCircle2, Star, Zap, ArrowRight } from "lucide-react";
import Header from "../components/Header";

const PLANS = [
  {
    name: "PARAMETRIX",
    price: 49,
    description: "Professional Parametric Cladding Layout Generator",
    features: [
      "Multi-face layout generation",
      "Advanced trimming system", 
      "Rail system integration",
      "Pattern synchronization",
      "Lifetime updates",
      "Priority email support"
    ],
    popular: true,
    slug: "parametrix"
  },
  {
    name: "AutoNestCut",
    price: 49,
    description: "Intelligent Cut List and Nesting Optimization",
    features: [
      "Automated cut list generation",
      "Material optimization",
      "Nesting algorithms",
      "Export to various formats",
      "Lifetime updates", 
      "Priority email support"
    ],
    popular: false,
    slug: "autonestcut"
  },
  {
    name: "SPECBASE",
    price: 39,
    description: "Specification Database Management System",
    features: [
      "Material specification database",
      "Quick search and filter",
      "Custom categories",
      "Export specifications",
      "Lifetime updates",
      "Email support"
    ],
    popular: false,
    slug: "specbase"
  }
];

const FAQS = [
  { q: "What's included in the trial?", a: "Full access to all features for 7 days. No limitations, no credit card required." },
  { q: "Do I get lifetime updates?", a: "Yes! Your one-time purchase includes all future updates and bug fixes at no additional cost." },
  { q: "What versions are supported?", a: "Extensions work with SketchUp 2019 and newer versions, including Pro and Shop." },
  { q: "Can I use on multiple computers?", a: "Yes, your license allows installation on up to 3 computers for personal use." }
];

export default function Pricing() {
  return (
    <div className="bg-[#050505] min-h-screen text-white font-sans selection:bg-blue-600 overflow-x-hidden">
      <Header currentPage="pricing" />

      {/* Hero Section */}
      <section className="pt-40 pb-20 px-8 max-w-7xl mx-auto text-center">
        <div className="inline-flex items-center gap-3 px-3 py-1 bg-blue-500/10 border border-blue-500/20 text-blue-500 text-[10px] font-black uppercase tracking-widest rounded mb-8">
          <Zap size={12} /> Simple Pricing
        </div>
        
        <h1 className="text-[80px] md:text-[120px] font-black tracking-tighter leading-[0.75] uppercase italic stroke-text mb-8">
          Pricing
        </h1>
        
        <p className="text-xl text-white/60 max-w-2xl mx-auto leading-relaxed">
          One-time purchase. Lifetime access. No subscriptions, no hidden fees.
        </p>
      </section>

      {/* Pricing Cards */}
      <section className="py-20 px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {PLANS.map((plan, i) => (
            <div 
              key={plan.slug} 
              className={`bg-[#0c0c0e] border rounded-[40px] p-10 relative ${
                plan.popular ? 'border-blue-500' : 'border-white/5'
              } hover:border-blue-500/50 transition-all`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <div className="bg-blue-600 text-white px-4 py-1 rounded-full text-[9px] font-black uppercase tracking-widest flex items-center gap-2">
                    <Star size={10} className="fill-white" /> Most Popular
                  </div>
                </div>
              )}

              <div className="text-center mb-8">
                <h3 className="text-2xl font-black uppercase italic tracking-tight mb-2">{plan.name}</h3>
                <p className="text-sm text-white/40 mb-6">{plan.description}</p>
                <div className="flex items-baseline justify-center gap-2">
                  <span className="text-6xl font-black text-blue-500">${plan.price}</span>
                  <span className="text-white/30 text-sm uppercase tracking-wider">one-time</span>
                </div>
              </div>

              <div className="space-y-4 mb-8">
                {plan.features.map((feature, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <CheckCircle2 className="text-blue-500 mt-0.5 flex-shrink-0" size={18} />
                    <span className="text-sm text-white/60">{feature}</span>
                  </div>
                ))}
              </div>

              <button className={`w-full py-4 rounded-2xl font-black text-xs tracking-widest uppercase transition-all flex items-center justify-center gap-3 ${
                plan.popular 
                  ? 'bg-blue-600 hover:bg-blue-500 text-white shadow-2xl shadow-blue-600/20' 
                  : 'bg-white/5 hover:bg-white/10 border border-white/10 text-white'
              }`}>
                Start Free Trial <ArrowRight size={16} />
              </button>
              
              <p className="text-[9px] text-white/20 text-center mt-4 uppercase tracking-widest">
                7-Day Trial • No CC Required
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-32 px-8 bg-[#08080a]">
        <div className="max-w-4xl mx-auto">
          <div className="mb-20 text-center">
            <h2 className="text-4xl font-black uppercase italic tracking-tighter mb-4">Frequently Asked</h2>
            <div className="w-20 h-1 bg-blue-500 mx-auto"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {FAQS.map((faq, i) => (
              <div key={i} className="bg-[#0c0c0e] border border-white/5 p-8 rounded-[30px] hover:border-blue-500/30 transition-colors">
                <h3 className="text-lg font-black uppercase italic tracking-tight mb-4">{faq.q}</h3>
                <p className="text-sm text-white/40 leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 px-8 max-w-5xl mx-auto text-center">
        <div className="bg-[#0c0c0e] border border-white/5 rounded-[60px] p-16">
          <h2 className="text-5xl font-black uppercase italic tracking-tighter mb-6">Ready to Start?</h2>
          <p className="text-white/40 mb-10 max-w-2xl mx-auto">
            Try any extension free for 7 days. No credit card required. Cancel anytime.
          </p>
          <Link href="/tools">
            <button className="bg-blue-600 hover:bg-blue-500 text-white px-12 py-5 rounded-2xl font-black text-xs tracking-widest uppercase transition-all inline-flex items-center gap-4 shadow-2xl shadow-blue-600/20">
              Browse Extensions <ArrowRight size={18} />
            </button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <div className="flex justify-center py-20 px-8">
        <footer className="bg-[#0c0c0e] border border-white/5 rounded-full px-12 py-6 shadow-2xl flex flex-col md:flex-row items-center gap-8">
          <div className="flex items-center gap-6 text-[10px] font-black tracking-[0.4em] text-white/30 uppercase">
            <span>© 2025 Studiø</span>
            <div className="w-1 h-1 bg-white/10 rounded-full"></div>
            <span>Muhamad Shkeir</span>
            <div className="w-1 h-1 bg-white/10 rounded-full"></div>
            <span className="text-blue-500">Riyadh, KSA</span>
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

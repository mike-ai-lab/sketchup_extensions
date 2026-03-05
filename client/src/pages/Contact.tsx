import { Link } from "wouter";
import { Zap, Send, Mail, MessageSquare } from "lucide-react";
import { useState } from "react";
import Header from "../components/Header";

export default function Contact() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    alert("Message sent! We'll get back to you soon.");
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <div className="bg-[#050505] min-h-screen text-white font-sans overflow-x-hidden">
      <Header currentPage="contact" />

      <section className="pt-40 pb-20 px-8 max-w-7xl mx-auto text-center">
        <div className="inline-flex items-center gap-3 px-3 py-1 bg-blue-500/10 border border-blue-500/20 text-blue-500 text-[10px] font-black uppercase tracking-widest rounded mb-8">
          <Zap size={12} /> Get In Touch
        </div>
        
        <h1 className="text-[80px] md:text-[120px] font-black tracking-tighter leading-[0.75] uppercase italic stroke-text mb-8">
          Contact
        </h1>
        
        <p className="text-xl text-white/60 max-w-2xl mx-auto leading-relaxed">
          Have questions? We're here to help
        </p>
      </section>

      <section className="py-20 px-8 max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="bg-[#0c0c0e] border border-white/5 p-12 rounded-[50px]">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="text-sm font-black uppercase tracking-widest text-white/40 block mb-3">Name</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white placeholder-white/30 focus:outline-none focus:border-blue-500 transition-colors"
                  placeholder="Your full name"
                />
              </div>
              <div>
                <label className="text-sm font-black uppercase tracking-widest text-white/40 block mb-3">Email</label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white placeholder-white/30 focus:outline-none focus:border-blue-500 transition-colors"
                  placeholder="your@email.com"
                />
              </div>
              <div>
                <label className="text-sm font-black uppercase tracking-widest text-white/40 block mb-3">Message</label>
                <textarea
                  required
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  rows={6}
                  className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white placeholder-white/30 focus:outline-none focus:border-blue-500 transition-colors resize-none"
                  placeholder="Tell us about your project or question..."
                />
              </div>
              <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-500 text-white py-5 rounded-2xl font-black text-xs tracking-widest uppercase transition-all flex items-center justify-center gap-3"
              >
                Send Message <Send size={16} />
              </button>
            </form>
          </div>

          <div className="space-y-6">
            <div className="bg-[#0c0c0e] border border-white/5 p-10 rounded-[40px]">
              <div className="w-16 h-16 bg-blue-500/10 rounded-2xl flex items-center justify-center text-blue-500 mb-6">
                <Mail size={28} />
              </div>
              <h3 className="text-xl font-black uppercase italic tracking-tight mb-3">Email Support</h3>
              <p className="text-white/60 leading-relaxed">We typically respond within 24 hours to all inquiries.</p>
            </div>

            <div className="bg-[#0c0c0e] border border-white/5 p-10 rounded-[40px]">
              <div className="w-16 h-16 bg-blue-500/10 rounded-2xl flex items-center justify-center text-blue-500 mb-6">
                <MessageSquare size={28} />
              </div>
              <h3 className="text-xl font-black uppercase italic tracking-tight mb-3">Custom Development</h3>
              <p className="text-white/60 leading-relaxed">Need a custom extension or tool? Let's discuss your requirements.</p>
            </div>

            <div className="bg-blue-600/10 border border-blue-500/20 p-8 rounded-[30px]">
              <h4 className="text-sm font-black uppercase tracking-widest text-blue-500 mb-4">Before You Contact</h4>
              <ul className="space-y-2 text-sm text-white/60">
                <li>• Check our documentation for common questions</li>
                <li>• Include your software version for technical issues</li>
                <li>• Describe your workflow for custom development</li>
              </ul>
            </div>
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

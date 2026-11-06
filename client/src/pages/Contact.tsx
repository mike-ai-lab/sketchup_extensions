import { Link } from "wouter";
import { Send, Mail, MessageSquare, CheckCircle2 } from "lucide-react";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import Header from "../components/Header";

// Formspree endpoint — replace xkjjyeov with your actual form ID if different
const FORMSPREE_ID = "xkjjyeov";

export default function Contact() {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    try {
      const res = await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          message: formData.message,
        }),
      });
      if (res.ok) {
        setStatus("sent");
        setFormData({ name: "", email: "", message: "" });
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  return (
    <div className="bg-[#050505] min-h-screen text-white font-sans overflow-x-hidden">
      <Header currentPage="contact" />

      <section className="pt-40 pb-20 px-8 max-w-7xl mx-auto text-center">
        <h1 className="text-[80px] md:text-[120px] font-black tracking-tighter leading-[0.75] uppercase italic stroke-text mb-8">
          {t('contact.heading')}
        </h1>
        <p className="text-xl text-white/60 max-w-2xl mx-auto leading-relaxed">
          {t('contact.subtitle')}
        </p>
      </section>

      <section className="py-20 px-8 max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="bg-[#0c0c0e] border border-white/5 p-12 rounded-[50px]">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="text-sm font-black uppercase tracking-widest text-white/40 block mb-3">{t('contact.name')}</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white placeholder-white/30 focus:outline-none focus:border-blue-500 transition-colors"
                  placeholder={t('contact.namePlaceholder')}
                />
              </div>
              <div>
                <label className="text-sm font-black uppercase tracking-widest text-white/40 block mb-3">{t('contact.email')}</label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white placeholder-white/30 focus:outline-none focus:border-blue-500 transition-colors"
                  placeholder={t('contact.emailPlaceholder')}
                />
              </div>
              <div>
                <label className="text-sm font-black uppercase tracking-widest text-white/40 block mb-3">{t('contact.message')}</label>
                <textarea
                  required
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  rows={6}
                  className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white placeholder-white/30 focus:outline-none focus:border-blue-500 transition-colors resize-none"
                  placeholder={t('contact.messagePlaceholder')}
                />
              </div>
              <button
                type="submit"
                disabled={status === "sending" || status === "sent"}
                className="w-full bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white py-5 rounded-2xl font-black text-xs tracking-widest uppercase transition-all flex items-center justify-center gap-3"
              >
                {status === "sending" ? "Sending..." : t('contact.send')} <Send size={16} />
              </button>

              {status === "sent" && (
                <div className="flex items-center gap-3 px-6 py-4 bg-green-500/10 border border-green-500/20 rounded-2xl">
                  <CheckCircle2 size={18} className="text-green-400 flex-shrink-0" />
                  <p className="text-sm text-green-400 font-bold">Message sent — we'll be in touch soon.</p>
                </div>
              )}
              {status === "error" && (
                <div className="flex items-center gap-3 px-6 py-4 bg-red-500/10 border border-red-500/20 rounded-2xl">
                  <p className="text-sm text-red-400 font-bold">Something went wrong. Please try again or email us directly.</p>
                </div>
              )}
            </form>
          </div>

          <div className="space-y-6">
            <div className="bg-[#0c0c0e] border border-white/5 p-10 rounded-[40px]">
              <div className="w-16 h-16 bg-blue-500/10 rounded-2xl flex items-center justify-center text-blue-500 mb-6">
                <Mail size={28} />
              </div>
              <h3 className="text-xl font-black uppercase italic tracking-tight mb-3">{t('contact.emailSupport')}</h3>
              <p className="text-white/60 leading-relaxed">{t('contact.emailSupportBody')}</p>
            </div>

            <div className="bg-[#0c0c0e] border border-white/5 p-10 rounded-[40px]">
              <div className="w-16 h-16 bg-blue-500/10 rounded-2xl flex items-center justify-center text-blue-500 mb-6">
                <MessageSquare size={28} />
              </div>
              <h3 className="text-xl font-black uppercase italic tracking-tight mb-3">{t('contact.customDev')}</h3>
              <p className="text-white/60 leading-relaxed">{t('contact.customDevBody')}</p>
            </div>

            <div className="bg-blue-600/10 border border-blue-500/20 p-8 rounded-[30px]">
              <h4 className="text-sm font-black uppercase tracking-widest text-blue-500 mb-4">{t('contact.beforeContact')}</h4>
              <ul className="space-y-2 text-sm text-white/60">
                <li>• {t('contact.tip1')}</li>
                <li>• {t('contact.tip2')}</li>
                <li>• {t('contact.tip3')}</li>
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

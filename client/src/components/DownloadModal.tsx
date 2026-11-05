import { useState, useEffect } from "react";
import { Download, X, Loader2, MapPin, User, Mail, ShieldCheck } from "lucide-react";

const FORMSPREE_ID = "xkjjyeov";
const SERVED_URL = "https://autonestcutserver-moeshks-projects.vercel.app";

interface DownloadModalProps {
  isOpen: boolean;
  onClose: () => void;
  fileName: string;       // display name e.g. "AutoNestCut v2.6.5"
  downloadUrl: string;    // actual file path e.g. "/downloads/AutoNestCut_v26_5.rbz"
  accentColor: string;    // hex e.g. "#10b981"
}

type Status = "idle" | "submitting" | "done" | "error";

export default function DownloadModal({
  isOpen,
  onClose,
  fileName,
  downloadUrl,
  accentColor,
}: DownloadModalProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [country, setCountry] = useState("");
  const [agreed, setAgreed] = useState(false);
  const [status, setStatus] = useState<Status>("idle");

  // Reset form when modal opens
  useEffect(() => {
    if (isOpen) {
      setName("");
      setEmail("");
      setCountry("");
      setAgreed(false);
      setStatus("idle");
    }
  }, [isOpen]);

  // Close on Escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    if (isOpen) window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const canSubmit = name.trim() && email.trim() && country.trim() && agreed && status === "idle";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!canSubmit) return;

    setStatus("submitting");

    try {
      // Fire Formspree (lead record) and confirmation email in parallel
      const [formRes] = await Promise.all([
        fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
          method: "POST",
          headers: { "Content-Type": "application/json", Accept: "application/json" },
          body: JSON.stringify({
            tool: fileName,
            name: name.trim(),
            email: email.trim(),
            country: country.trim(),
            downloadUrl,
          }),
        }),
        fetch(`${SERVED_URL}/send-download-email`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: name.trim(),
            email: email.trim(),
            tool: fileName,
            downloadUrl,
          }),
        }).catch(() => null), // non-blocking — don't fail the flow if email fails
      ]);

      if (!formRes.ok) throw new Error("Formspree error");

      setStatus("done");

      // Trigger actual file download
      const a = document.createElement("a");
      a.href = downloadUrl;
      a.download = downloadUrl.split("/").pop() || "download";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);

      // Close modal after short delay
      setTimeout(onClose, 1800);
    } catch {
      setStatus("error");
    }
  };

  const inputClass =
    "w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-white/20 outline-none focus:border-[var(--accent)] transition-colors";

  return (
    <div
      className="fixed inset-0 z-[999] flex items-center justify-center p-4"
      style={{ backgroundColor: "rgba(0,0,0,0.85)" }}
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div
        className="relative w-full max-w-md bg-[#0c0c0e] border border-white/10 rounded-[40px] p-10 shadow-2xl"
        style={{ "--accent": accentColor } as React.CSSProperties}
      >
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center transition-colors"
        >
          <X size={14} className="text-white/40" />
        </button>

        {status === "done" ? (
          <div className="flex flex-col items-center gap-4 py-6 text-center">
            <div
              className="w-16 h-16 rounded-full flex items-center justify-center"
              style={{ backgroundColor: `${accentColor}20` }}
            >
              <Download size={28} style={{ color: accentColor }} />
            </div>
            <h3 className="text-xl font-black uppercase italic tracking-tighter">Download Starting</h3>
            <p className="text-white/40 text-sm">Thanks! Your download should begin automatically.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Header */}
            <div className="space-y-2">
              <div
                className="inline-flex items-center gap-2 px-2 py-1 rounded text-[10px] font-black uppercase tracking-widest"
                style={{ backgroundColor: `${accentColor}1a`, color: accentColor }}
              >
                <Download size={10} /> Free Download
              </div>
              <h3 className="text-2xl font-black uppercase italic tracking-tighter">{fileName}</h3>
              <p className="text-white/30 text-xs">Quick details before we send you the file.</p>
            </div>

            {/* Fields */}
            <div className="space-y-3">
              <div className="relative">
                <User size={14} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20" />
                <input
                  type="text"
                  placeholder="Full name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className={inputClass + " pl-10"}
                  required
                />
              </div>
              <div className="relative">
                <Mail size={14} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20" />
                <input
                  type="email"
                  placeholder="Email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={inputClass + " pl-10"}
                  required
                />
              </div>
              <div className="relative">
                <MapPin size={14} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20" />
                <input
                  type="text"
                  placeholder="Country"
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                  className={inputClass + " pl-10"}
                  required
                />
              </div>
            </div>

            {/* Responsibility notice */}
            <label className="flex items-start gap-3 cursor-pointer group">
              <div
                className="mt-0.5 w-4 h-4 rounded flex-shrink-0 border flex items-center justify-center transition-colors"
                style={{
                  borderColor: agreed ? accentColor : "rgba(255,255,255,0.15)",
                  backgroundColor: agreed ? `${accentColor}30` : "transparent",
                }}
              >
                {agreed && <ShieldCheck size={10} style={{ color: accentColor }} />}
              </div>
              <input
                type="checkbox"
                className="sr-only"
                checked={agreed}
                onChange={(e) => setAgreed(e.target.checked)}
                required
              />
              <span className="text-[11px] text-white/30 leading-relaxed group-hover:text-white/50 transition-colors">
                I understand this software is provided as-is. I take full responsibility for
                its use and confirm I have read the{" "}
                <a
                  href="/terms-of-service.html"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline hover:text-white/80"
                  style={{ color: accentColor }}
                >
                  Terms of Service
                </a>
                .
              </span>
            </label>

            {status === "error" && (
              <p className="text-red-400 text-xs text-center">Something went wrong. Please try again.</p>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={!canSubmit}
              className="w-full py-4 rounded-full font-black text-sm uppercase tracking-widest text-black flex items-center justify-center gap-3 transition-all disabled:opacity-30 disabled:cursor-not-allowed hover:scale-[1.02] active:scale-[0.98]"
              style={{ backgroundColor: canSubmit ? accentColor : "#555" }}
            >
              {status === "submitting" ? (
                <><Loader2 size={16} className="animate-spin" /> Processing…</>
              ) : (
                <><Download size={16} /> Download {fileName}</>
              )}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

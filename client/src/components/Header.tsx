import { Link } from "wouter";
import { Menu, X } from "lucide-react";
import { useState } from "react";

interface HeaderProps {
  currentPage: "home" | "tools" | "pricing" | "contact";
}

export default function Header({ currentPage }: HeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false);

  const navItems: Array<{ href: string; key: HeaderProps["currentPage"]; label: string }> = [
    { href: "/", key: "home", label: "Home" },
    { href: "/tools", key: "tools", label: "Tools" },
    { href: "/pricing", key: "pricing", label: "Pricing" },
    { href: "/contact", key: "contact", label: "Contact" },
  ];

  return (
    <nav className="fixed top-0 w-full z-50 px-4 py-3 sm:px-6 lg:px-12 lg:pt-2 flex items-center pointer-events-none">
      <Link href="/" className="text-lg sm:text-2xl font-black tracking-[0.2em] sm:tracking-[0.3em] italic uppercase pointer-events-auto">
        Studiø
      </Link>

      <div className="pointer-events-auto hidden md:flex gap-8 text-[9px] font-black uppercase tracking-[0.4em] ml-auto mr-4 lg:mr-20">
        {navItems.map((item) => (
          <Link
            key={item.key}
            href={item.href}
            className={currentPage === item.key ? "text-white" : "text-white/40 hover:text-white transition-colors"}
          >
            {item.label}
          </Link>
        ))}
      </div>

      <button
        type="button"
        onClick={() => setMenuOpen((prev) => !prev)}
        className="pointer-events-auto md:hidden ml-auto w-10 h-10 rounded-xl border border-white/20 bg-black/40 flex items-center justify-center"
        aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
        aria-expanded={menuOpen}
      >
        {menuOpen ? <X size={18} /> : <Menu size={18} />}
      </button>

      {menuOpen && (
        <div className="pointer-events-auto absolute top-14 left-4 right-4 md:hidden rounded-2xl border border-white/10 bg-black/90 backdrop-blur p-3 space-y-1 shadow-2xl">
          {navItems.map((item) => (
            <Link
            key={item.key}
            href={item.href}
            className={`block rounded-xl px-4 py-3 text-xs uppercase tracking-[0.35em] font-black ${
                currentPage === item.key ? "text-white bg-white/10" : "text-white/70"
              }`}
              onClick={() => setMenuOpen(false)}
            >
              {item.label}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
}

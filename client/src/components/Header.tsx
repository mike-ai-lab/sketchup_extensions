import { Link } from "wouter";

interface HeaderProps {
  currentPage: "home" | "tools" | "pricing" | "contact";
}

export default function Header({ currentPage }: HeaderProps) {
  return (
    <nav className="fixed top-0 w-full z-50 p-12 pt-2 flex items-center pointer-events-none">
      <Link href="/" className="text-2xl font-black tracking-[0.3em] italic uppercase pointer-events-auto">Studiø</Link>
      <div className="pointer-events-auto flex gap-8 text-[9px] font-black uppercase tracking-[0.4em] ml-auto mr-20">
        <Link href="/" className={currentPage === "home" ? "text-white" : "text-white/40 hover:text-white transition-colors"}>Home</Link>
        <Link href="/tools" className={currentPage === "tools" ? "text-white" : "text-white/40 hover:text-white transition-colors"}>Tools</Link>
        <Link href="/pricing" className={currentPage === "pricing" ? "text-white" : "text-white/40 hover:text-white transition-colors"}>Pricing</Link>
        <Link href="/contact" className={currentPage === "contact" ? "text-white" : "text-white/40 hover:text-white transition-colors"}>Contact</Link>
      </div>
    </nav>
  );
}

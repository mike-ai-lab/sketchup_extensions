import { useEffect, useRef, useState, type TouchEvent } from "react";
import { Link } from "wouter";
import Header from "../components/Header";
import { 
  Ruler, Layers, Grid3x3, RotateCw, 
  FileCode, AlignCenter, X,
  ChevronLeft,
  ChevronRight,
  Download
} from "lucide-react";

const UTILITIES = [
  { 
    id: "align-01", 
    title: "Quick Align", 
    category: "MODELING / SKETCHUP", 
    description: "Rapidly align components and groups with precision snapping",
    price: "Free",
    downloadUrl: null,
    icon: AlignCenter 
  },
  { 
    id: "layer-02", 
    title: "Layer Manager", 
    category: "ORGANIZATION / SKETCHUP", 
    description: "Advanced layer organization and batch operations",
    price: "Free",
    downloadUrl: null,
    icon: Layers 
  },
  { 
    id: "array-03", 
    title: "Array Tools", 
    category: "MODELING / SKETCHUP", 
    description: "Create linear, circular, and grid arrays with ease",
    price: "$9",
    downloadUrl: null,
    icon: Grid3x3 
  },
  { 
    id: "rotate-04", 
    title: "Rotate Helper", 
    category: "MODELING / SKETCHUP", 
    description: "Precise rotation with angle snapping and visual guides",
    price: "Free",
    downloadUrl: null,
    icon: RotateCw 
  },
  { 
    id: "lsp-05", 
    title: "LSP Exporter", 
    category: "EXPORT / AUTOCAD", 
    description: "Export geometry to AutoCAD LISP format for CAD integration",
    price: "$15",
    downloadUrl: null,
    icon: FileCode 
  },
  { 
    id: "measure-06", 
    title: "Quick Measure", 
    category: "MEASUREMENT / SKETCHUP", 
    description: "Fast measurement tools with annotation capabilities",
    price: "Free",
    downloadUrl: null,
    icon: Ruler 
  },
  { 
    id: "delete-07", 
    title: "Delete Tool", 
    category: "MODELING / SKETCHUP", 
    description: "Enhanced delete functionality with smart selection and cleanup",
    price: "Free",
    downloadUrl: "/downloads/utilities/DeleteTool.rbz",
    icon: X 
  }
];

export default function UtilitiesDetail() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const cardRefs = useRef<Array<HTMLDivElement | null>>([]);
  const touchStartXRef = useRef<number | null>(null);
  const touchStartYRef = useRef<number | null>(null);

  const nextSlide = () => setActiveIndex((prev) => (prev + 1) % UTILITIES.length);
  const prevSlide = () => setActiveIndex((prev) => (prev - 1 + UTILITIES.length) % UTILITIES.length);

  useEffect(() => {
    const media = window.matchMedia("(max-width: 767px)");
    const update = () => setIsMobile(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    if (isMobile) return;

    const loadGSAP = async () => {
      const loadScript = (src: string) => new Promise((resolve) => {
        const script = document.createElement('script');
        script.src = src;
        script.onload = resolve;
        document.head.appendChild(script);
      });

      if (!window.gsap) {
        await loadScript("https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js");
      }

      const gsap = window.gsap;

      UTILITIES.forEach((_, i) => {
        const el = cardRefs.current[i];
        if (!el) return;

        const distance = i - activeIndex;
        const absDistance = Math.abs(distance);
        const isActive = distance === 0;

        gsap.to(el, {
          xPercent: distance * 55,
          scale: isActive ? 1 : 0.75 - (absDistance * 0.1),
          zIndex: 100 - absDistance,
          opacity: absDistance > 2 ? 0 : 1 - (absDistance * 0.3),
          rotateY: distance * -15,
          filter: isActive ? "blur(0px)" : "blur(4px)",
          duration: 0.8,
          ease: "expo.out"
        });

        const infoRect = el.querySelector('.info-rect');
        const infoContent = el.querySelector('.info-content');
        if (infoRect && infoContent) {
            gsap.to(infoRect, {
                width: isActive ? "450px" : "0px",
                duration: 0.6,
                delay: isActive ? 0.3 : 0,
                ease: "power3.inOut"
            });
            gsap.to(infoContent, {
                opacity: isActive ? 1 : 0,
                duration: 0.4,
                delay: isActive ? 0.6 : 0
            });
        }
      });
    };

    loadGSAP();
  }, [activeIndex, isMobile]);

  const handleDownload = (downloadUrl: string | null) => {
    if (downloadUrl) {
      window.location.href = downloadUrl;
    }
  };

  const onTouchStart = (event: TouchEvent<HTMLDivElement>) => {
    touchStartXRef.current = event.touches[0].clientX;
    touchStartYRef.current = event.touches[0].clientY;
  };

  const onTouchEnd = (event: TouchEvent<HTMLDivElement>) => {
    if (touchStartXRef.current == null || touchStartYRef.current == null) return;
    const endX = event.changedTouches[0].clientX;
    const endY = event.changedTouches[0].clientY;
    const deltaX = touchStartXRef.current - endX;
    const deltaY = touchStartYRef.current - endY;
    if (Math.abs(deltaX) > 40 && Math.abs(deltaX) > Math.abs(deltaY)) {
      if (deltaX > 0) nextSlide();
      else prevSlide();
    }
    touchStartXRef.current = null;
    touchStartYRef.current = null;
  };

  return (
    <div className="bg-[#050505] min-h-screen text-white font-sans overflow-hidden">
      <Header currentPage="tools" />

      <main className="h-screen flex flex-col items-center justify-center relative perspective-2000">
        <header className="absolute top-24 text-center space-y-4 px-4">
            <h1 className="text-5xl md:text-7xl font-black tracking-tighter uppercase italic stroke-text">Utilities</h1>
            <p className="text-[10px] font-bold tracking-[0.4em] text-blue-500 uppercase">Interactive Module Browser</p>
        </header>

        <div
          ref={containerRef}
          className="relative w-full max-w-5xl h-[500px] md:h-[450px] flex items-center justify-center touch-pan-y"
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
        >
          {UTILITIES.map((item, i) => (
            <div 
              key={item.id}
              ref={(el) => {
                cardRefs.current[i] = el;
              }}
              className="absolute flex items-center pointer-events-none"
            >
              <div className="w-[260px] h-[260px] md:w-[300px] md:h-[300px] bg-[#0c0c0e] border border-white/10 rounded-[32px] md:rounded-[40px] shadow-2xl flex flex-col items-center justify-center p-8 md:p-10 z-20 pointer-events-auto relative group overflow-hidden">
                <div className="p-6 bg-blue-500/10 rounded-3xl text-blue-500 mb-6 group-hover:scale-110 transition-transform">
                  <item.icon size={48} strokeWidth={1.5} />
                </div>
                <div className="text-center">
                    <span className="text-[9px] font-black tracking-[0.3em] text-blue-500/50 block mb-2">{item.category}</span>
                    <h3 className="text-2xl font-black tracking-tight uppercase leading-none italic">{item.title}</h3>
                </div>
                <div className="absolute -bottom-4 -right-4 w-20 h-20 border border-white/5 rounded-full opacity-20"></div>
              </div>

              <div className="info-rect hidden md:flex h-[220px] bg-white text-black -ml-12 pl-20 rounded-r-[35px] overflow-hidden items-center w-0 shadow-2xl z-10">
                <div className="info-content opacity-0 whitespace-nowrap pr-12">
                   <h4 className="text-xl font-black uppercase tracking-tighter mb-2 italic">Module Description</h4>
                   <p className="text-sm text-black/60 font-medium max-w-[320px] whitespace-normal leading-tight">
                     {item.description}
                   </p>
                   <div className="mt-6 flex items-center gap-6">
                      <div className="flex flex-col">
                        <span className="text-[8px] font-black opacity-30 uppercase tracking-widest">Price</span>
                        <span className="text-xs font-mono font-bold text-blue-600">{item.price}</span>
                      </div>
                      {item.downloadUrl ? (
                        <button 
                          onClick={() => handleDownload(item.downloadUrl)}
                          className="px-6 py-2 bg-black text-white text-[10px] font-black tracking-widest uppercase rounded-full flex items-center gap-2 hover:bg-blue-600 transition-colors"
                        >
                          Download <Download size={14} />
                        </button>
                      ) : (
                        <button 
                          disabled
                          className="px-6 py-2 bg-gray-400 text-white text-[10px] font-black tracking-widest uppercase rounded-full flex items-center gap-2 cursor-not-allowed opacity-50"
                        >
                          Soon <Download size={14} />
                        </button>
                      )}
                   </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {isMobile && (
          <div className="absolute bottom-24 px-5 w-full max-w-sm">
            <div className="rounded-2xl border border-white/15 bg-white/5 p-4">
              <h4 className="text-base font-black uppercase italic tracking-tight">{UTILITIES[activeIndex].title}</h4>
              <p className="text-xs text-white/60 mt-2">{UTILITIES[activeIndex].description}</p>
              <div className="text-[10px] uppercase tracking-[0.2em] text-blue-500 mt-3">{UTILITIES[activeIndex].category}</div>
            </div>
          </div>
        )}

        <div className="absolute bottom-10 md:bottom-20 flex items-center gap-8 md:gap-12">
            <button onClick={prevSlide} className="w-14 h-14 rounded-full border border-white/10 flex items-center justify-center hover:bg-white hover:text-black transition-all">
                <ChevronLeft size={24} />
            </button>
            <div className="flex gap-3">
                {UTILITIES.map((_, i) => (
                    <div 
                        key={i} 
                        className={`h-1 transition-all duration-500 ${i === activeIndex ? 'w-12 bg-blue-500' : 'w-4 bg-white/10'}`}
                    />
                ))}
            </div>
            <button onClick={nextSlide} className="w-14 h-14 rounded-full border border-white/10 flex items-center justify-center hover:bg-white hover:text-black transition-all">
                <ChevronRight size={24} />
            </button>
        </div>
      </main>

      <style>{`
        .perspective-2000 { perspective: 2000px; }
        .stroke-text { -webkit-text-stroke: 1px rgba(255,255,255,0.2); color: transparent; }
      `}</style>
    </div>
  );
}

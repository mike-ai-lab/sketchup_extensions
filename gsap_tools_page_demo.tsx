import React, { useEffect, useRef, useState } from "react";
import { Link } from "wouter";
import { Bookmark, LayoutGrid, Cpu, Palette, Zap, ArrowDown } from "lucide-react";

// Mock data based on your EXTENSIONS import
const EXTENSIONS = {
  "model-gen": { name: "ModelGen Pro", description: "Advanced parametric modeling engine for architectural surfaces and complex geometries." },
  "render-flow": { name: "RenderFlow", description: "Seamless cloud-based rendering pipeline with real-time feedback loops." },
  "space-ai": { name: "SpaceAI", description: "Intelligent floor plan optimization using machine learning constraints." },
  "lume-light": { name: "LumeLight", description: "Physically accurate lighting simulation for interior designers." },
  "arch-docs": { name: "ArchDocs", description: "Automated construction documentation generator from BIM data." },
  "fab-kit": { name: "FabKit", description: "Direct-to-fabrication toolkit for CNC and 3D printing workflows." },
};

const ProductCard = ({ id, name, description, index }) => {
  const [isSaved, setIsSaved] = useState(false);
  const cardRef = useRef(null);

  return (
    <div ref={cardRef} className="tool-card opacity-0 translate-y-20 w-full max-w-[340px] aspect-[4/5]">
      <Link href={`/tools/${id}`}>
        <div className="group relative h-full bg-white dark:bg-[#1a1a1a] rounded-[40px] shadow-xl hover:shadow-2xl transition-all duration-500 flex flex-col overflow-hidden border border-black/5 dark:border-white/5">
          {/* Header Visual */}
          <div className="h-2/5 bg-gradient-to-br from-[#9198e5] to-[#3D6687] relative p-6 overflow-hidden">
            {/* Animated background element */}
            <div className="absolute inset-0 opacity-20 group-hover:scale-110 transition-transform duration-700 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-from)_0%,_transparent_70%)]" />
            
            <div className="absolute top-6 right-6 z-10">
              <button
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setIsSaved(!isSaved);
                }}
                className="w-10 h-10 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center transition-transform hover:scale-110 active:scale-95 border border-white/30"
              >
                <Bookmark className={`w-5 h-5 ${isSaved ? 'fill-white stroke-white' : 'stroke-white'}`} />
              </button>
            </div>
            <div className="mt-auto relative z-10">
                <div className="p-3 bg-white/10 w-fit rounded-2xl backdrop-blur-sm border border-white/10">
                    <Zap className="w-6 h-6 text-white" />
                </div>
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 p-8 flex flex-col relative z-10">
            <div className="mb-4">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 leading-tight group-hover:text-primary transition-colors">
                {name}
              </h3>
              <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed line-clamp-3">
                {description}
              </p>
            </div>
            
            <div className="mt-auto pt-4 flex items-center justify-between border-t border-gray-100 dark:border-white/5">
              <div className="px-4 py-1.5 bg-gray-100 dark:bg-white/5 rounded-full text-[10px] font-black tracking-[0.2em] uppercase text-gray-600 dark:text-gray-300">
                CORE MODULE
              </div>
              <span className="text-[10px] font-mono text-gray-400">BUILD.2025</span>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default function App() {
  const mainRef = useRef(null);
  const horizontalRef = useRef(null);
  const horizontalInnerRef = useRef(null);
  const [gsapReady, setGsapReady] = useState(false);
  const products = Object.entries(EXTENSIONS);

  useEffect(() => {
    // Load GSAP via script tag to ensure it's available in this environment
    const script = document.createElement("script");
    script.src = "https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js";
    script.async = true;
    
    const triggerScript = document.createElement("script");
    triggerScript.src = "https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/ScrollTrigger.min.js";
    triggerScript.async = true;

    script.onload = () => {
      document.head.appendChild(triggerScript);
      triggerScript.onload = () => {
        setGsapReady(true);
      };
    };

    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
      if (document.head.contains(triggerScript)) {
        document.head.removeChild(triggerScript);
      }
    };
  }, []);

  useEffect(() => {
    if (!gsapReady || !window.gsap) return;

    const gsap = window.gsap;
    const ScrollTrigger = window.ScrollTrigger;
    gsap.registerPlugin(ScrollTrigger);

    let ctx = gsap.context(() => {
      // 1. Hero Reveal
      const heroTl = gsap.timeline();
      heroTl.from(".hero-line", {
        y: 120,
        skewY: 7,
        stagger: 0.1,
        duration: 1.2,
        ease: "power4.out"
      }).from(".hero-sub", {
        opacity: 0,
        y: 20,
        duration: 0.8
      }, "-=0.6");

      // 2. Horizontal Scroll Section
      const horizontalSections = gsap.utils.toArray(".horizontal-item");
      gsap.to(horizontalInnerRef.current, {
        x: () => -(horizontalInnerRef.current.scrollWidth - window.innerWidth),
        ease: "none",
        scrollTrigger: {
          trigger: horizontalRef.current,
          pin: true,
          scrub: 1,
          invalidateOnRefresh: true,
          end: () => `+=${horizontalInnerRef.current.scrollWidth}`
        }
      });

      // 3. Grid Stagger Animation
      gsap.to(".tool-card", {
        opacity: 1,
        y: 0,
        stagger: 0.15,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".tools-grid",
          start: "top 85%",
        }
      });

      // 4. Parallax Orbs
      gsap.to(".orb-1", {
        y: -100,
        scrollTrigger: {
            scrub: true
        }
      });
      gsap.to(".orb-2", {
        y: 100,
        scrollTrigger: {
            scrub: true
        }
      });

    }, mainRef);

    return () => ctx.revert();
  }, [gsapReady]);

  return (
    <div ref={mainRef} className="bg-[#fcfcfc] dark:bg-[#080808] min-h-screen font-sans selection:bg-[#9198e5] selection:text-white text-gray-900 dark:text-white overflow-x-hidden">
      
      {/* Decorative Animated Orbs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="orb-1 absolute top-[10%] -left-20 w-[500px] h-[500px] bg-[#9198e5]/10 rounded-full blur-[120px]" />
        <div className="orb-2 absolute bottom-[10%] -right-20 w-[400px] h-[400px] bg-[#3D6687]/10 rounded-full blur-[100px]" />
      </div>

      {/* Modern Navigation */}
      <nav className="fixed top-0 w-full z-[100] p-6 md:p-10 flex justify-between items-center mix-blend-difference">
        <div className="text-2xl font-black tracking-tighter text-white">STUDIØ</div>
        <div className="hidden md:flex gap-12 text-[11px] font-bold uppercase tracking-[0.3em] text-white/70">
          <span className="hover:text-white cursor-pointer transition-colors">Tools</span>
          <span className="hover:text-white cursor-pointer transition-colors">Lab</span>
          <span className="hover:text-white cursor-pointer transition-colors">Archive</span>
        </div>
        <div className="w-10 h-10 bg-white/10 backdrop-blur-md rounded-full flex flex-col items-center justify-center gap-1 cursor-pointer">
            <div className="w-4 h-[1px] bg-white" />
            <div className="w-4 h-[1px] bg-white" />
        </div>
      </nav>

      {/* Hero Section - Split Layout */}
      <section className="relative min-h-screen flex items-center px-6 md:px-20 py-32 z-10">
        <div className="w-full">
          <div className="overflow-hidden mb-2">
            <h1 className="hero-line text-6xl md:text-[10vw] font-black tracking-tighter leading-[0.85] uppercase">
              Digital
            </h1>
          </div>
          <div className="overflow-hidden mb-8">
            <h1 className="hero-line text-6xl md:text-[10vw] font-black tracking-tighter leading-[0.85] uppercase text-transparent bg-clip-text bg-gradient-to-r from-gray-900 via-[#9198e5] to-gray-400 dark:from-white dark:to-gray-600">
              Instruments
            </h1>
          </div>
          
          <div className="hero-sub flex flex-col md:flex-row gap-12 items-start mt-12">
            <p className="text-lg md:text-xl text-gray-500 max-w-md font-medium leading-relaxed">
              Precision extensions curated for high-performance architectural workflows. Designed by Muhamad Shkeir.
            </p>
            <div className="flex flex-col gap-4">
                <div className="flex items-center gap-4 group cursor-pointer">
                    <div className="w-12 h-12 rounded-full border border-gray-200 dark:border-white/10 flex items-center justify-center group-hover:bg-black group-hover:text-white dark:group-hover:bg-white dark:group-hover:text-black transition-all">
                        <ArrowDown className="w-5 h-5" />
                    </div>
                    <span className="text-xs font-bold tracking-widest uppercase">Explore Ecosystem</span>
                </div>
            </div>
          </div>
        </div>
      </section>

      {/* Horizontal Scroll Showcasing Features */}
      <section ref={horizontalRef} className="relative h-screen flex items-center bg-black overflow-hidden">
        <div ref={horizontalInnerRef} className="flex flex-nowrap h-full will-change-transform">
          
          {/* Slide 1 */}
          <div className="horizontal-item w-screen h-full flex-shrink-0 flex items-center justify-center px-6 md:px-20">
            <div className="max-w-7xl w-full grid grid-cols-1 md:grid-cols-2 gap-20 items-center">
              <div className="text-white">
                <div className="w-12 h-[2px] bg-[#9198e5] mb-8" />
                <h2 className="text-5xl md:text-8xl font-black tracking-tighter mb-8 leading-none">
                  PARAMETRIC<br/>CONTROL
                </h2>
                <p className="text-gray-400 text-lg max-w-sm">Direct manipulation of complex geometry through intuitive node-based logic.</p>
              </div>
              <div className="relative aspect-square">
                 <div className="absolute inset-0 bg-[#9198e5]/20 rounded-full blur-[80px] animate-pulse" />
                 <div className="relative h-full border border-white/10 rounded-[60px] flex items-center justify-center backdrop-blur-3xl overflow-hidden">
                    <LayoutGrid className="w-40 h-40 text-white/5" />
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-1/2 h-1/2 border border-[#9198e5]/30 rounded-full rotate-45 animate-[spin_10s_linear_infinite]" />
                        <div className="absolute w-1/3 h-1/3 border border-white/20 rounded-full -rotate-45 animate-[spin_15s_linear_infinite]" />
                    </div>
                 </div>
              </div>
            </div>
          </div>

          {/* Slide 2 */}
          <div className="horizontal-item w-screen h-full flex-shrink-0 flex items-center justify-center px-6 md:px-20 bg-[#0a0a0a]">
            <div className="max-w-7xl w-full grid grid-cols-1 md:grid-cols-2 gap-20 items-center">
              <div className="relative aspect-square order-2 md:order-1">
                 <div className="h-full border border-white/10 rounded-[60px] flex items-center justify-center bg-gradient-to-br from-white/5 to-transparent">
                    <Cpu className="w-40 h-40 text-[#9198e5]/20" />
                 </div>
              </div>
              <div className="text-white order-1 md:order-2">
                <div className="w-12 h-[2px] bg-[#9198e5] mb-8" />
                <h2 className="text-5xl md:text-8xl font-black tracking-tighter mb-8 leading-none">
                  MACHINE<br/>LEARNING
                </h2>
                <p className="text-gray-400 text-lg max-w-sm">Predictive design patterns that learn from your project history to suggest optimal spatial solutions.</p>
              </div>
            </div>
          </div>

          {/* Slide 3 */}
          <div className="horizontal-item w-screen h-full flex-shrink-0 flex items-center justify-center px-6 md:px-20">
            <div className="text-center">
                <h2 className="text-[15vw] font-black text-white/5 leading-none select-none">ARCHITECTURE</h2>
                <h2 className="text-5xl md:text-8xl font-black text-white -mt-[8vw] relative z-10">THE FULL SUITE</h2>
                <p className="text-gray-500 mt-8 tracking-[0.4em] font-bold uppercase">Scroll to view tools</p>
            </div>
          </div>

        </div>
      </section>

      {/* Main Grid Section */}
      <section className="container mx-auto px-6 md:px-20 py-32 md:py-48 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-24 gap-12">
            <div className="max-w-2xl">
                <span className="text-[10px] font-black tracking-[0.4em] uppercase text-[#9198e5] mb-4 block">Catalogue 2025</span>
                <h2 className="text-5xl md:text-7xl font-black tracking-tighter mb-6 uppercase">The Toolset</h2>
                <p className="text-gray-500 text-lg leading-relaxed">
                    Every extension is battle-tested in a professional studio environment to ensure stability and meaningful productivity gains.
                </p>
            </div>
            <div className="flex flex-col gap-6 items-start md:items-end">
                <div className="flex gap-2">
                    <div className="w-2 h-2 rounded-full bg-[#9198e5]" />
                    <div className="w-2 h-2 rounded-full bg-gray-200 dark:bg-white/10" />
                    <div className="w-2 h-2 rounded-full bg-gray-200 dark:bg-white/10" />
                </div>
                <button className="px-10 py-4 bg-black text-white dark:bg-white dark:text-black rounded-full font-bold text-xs uppercase tracking-[0.2em] hover:scale-105 transition-transform shadow-2xl">
                    View Release Notes
                </button>
            </div>
        </div>

        <div className="tools-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-y-20 gap-x-12 justify-items-center">
          {products.map(([key, product], index) => (
            <ProductCard 
              key={key} 
              id={key} 
              name={product.name} 
              description={product.description} 
              index={index} 
            />
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="py-32 bg-gray-50 dark:bg-[#050505] border-t border-black/5 dark:border-white/5">
        <div className="container mx-auto px-6 flex flex-col items-center">
            <div className="text-5xl font-black mb-12 tracking-tighter">STUDIØ</div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-20 mb-20 w-full max-w-4xl text-center md:text-left">
                <div className="flex flex-col gap-4">
                    <h4 className="text-[10px] font-black tracking-widest uppercase opacity-40">Contact</h4>
                    <span className="text-sm font-medium">Hello@studio.com</span>
                </div>
                <div className="flex flex-col gap-4">
                    <h4 className="text-[10px] font-black tracking-widest uppercase opacity-40">Office</h4>
                    <span className="text-sm font-medium">Riyadh, KSA</span>
                </div>
                <div className="flex flex-col gap-4">
                    <h4 className="text-[10px] font-black tracking-widest uppercase opacity-40">Social</h4>
                    <span className="text-sm font-medium">Instagram</span>
                </div>
                <div className="flex flex-col gap-4">
                    <h4 className="text-[10px] font-black tracking-widest uppercase opacity-40">Legal</h4>
                    <span className="text-sm font-medium">Privacy Policy</span>
                </div>
            </div>

            <div className="w-full h-[1px] bg-black/5 dark:bg-white/5 mb-12" />

            <div className="flex flex-col md:flex-row justify-between items-center w-full gap-8">
                <p className="text-[10px] font-bold tracking-widest uppercase opacity-40">© 2025 ALL RIGHTS RESERVED</p>
                <div className="flex items-center gap-6">
                    <span className="text-[11px] font-black">DEVELOPED BY MUHAMAD SHKEIR</span>
                    <div className="w-10 h-10 rounded-full border border-black/10 dark:border-white/10 flex items-center justify-center">
                        <ArrowDown className="w-4 h-4 -rotate-[135deg]" />
                    </div>
                </div>
            </div>
        </div>
      </footer>
    </div>
  );
}
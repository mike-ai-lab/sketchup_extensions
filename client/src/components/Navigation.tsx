import { Link } from "wouter";
import { useState, useRef, useEffect } from "react";
import { ChevronDown } from "lucide-react";

export default function Navigation() {
  const [toolsOpen, setToolsOpen] = useState(false);
  const [resourcesOpen, setResourcesOpen] = useState(false);
  const toolsTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const resourcesTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const tools: Array<{ name: string; path: string } | { divider: true }> = [
    { name: "All Tools", path: "/tools" },
    { divider: true },
    { name: "PARAMETRIX", path: "/tools/parametrix" },
    { name: "AutoNestCut", path: "/tools/autonestcut" },
    { name: "SPECBASE", path: "/tools/specbase" },
    { divider: true },
    { name: "Utilities", path: "/tools/utilities" },
  ];

  const resources = [
    { name: "Downloads", path: "/resources#downloads" },
    { name: "Tutorials", path: "/resources#tutorials" },
    { name: "FAQ", path: "/resources#faq" },
    { name: "Contact", path: "/resources#contact" },
  ];

  const handleToolsEnter = () => {
    if (toolsTimeoutRef.current) {
      clearTimeout(toolsTimeoutRef.current);
    }
    setToolsOpen(true);
  };

  const handleToolsLeave = () => {
    toolsTimeoutRef.current = setTimeout(() => {
      setToolsOpen(false);
    }, 200);
  };

  const handleResourcesEnter = () => {
    if (resourcesTimeoutRef.current) {
      clearTimeout(resourcesTimeoutRef.current);
    }
    setResourcesOpen(true);
  };

  const handleResourcesLeave = () => {
    resourcesTimeoutRef.current = setTimeout(() => {
      setResourcesOpen(false);
    }, 200);
  };

  useEffect(() => {
    return () => {
      if (toolsTimeoutRef.current) clearTimeout(toolsTimeoutRef.current);
      if (resourcesTimeoutRef.current) clearTimeout(resourcesTimeoutRef.current);
    };
  }, []);

  return (
    <div className="fixed top-6 left-1/2 -translate-x-1/2 z-50 px-4 w-full max-w-4xl">
      <nav className="neuro-nav backdrop-blur-sm">
        <div className="flex items-center justify-between gap-3 sm:gap-6 md:gap-8">
          <Link href="/">
            <span className="text-lg sm:text-xl font-bold cursor-pointer text-[var(--neuro-text)]">Studiø</span>
          </Link>
          <div className="flex items-center gap-2 sm:gap-4 md:gap-6 text-xs sm:text-sm">
            <Link href="/">
              <span className="font-medium cursor-pointer hover:text-[var(--neuro-primary)] transition-colors text-red-500 hidden sm:inline">
                Home
              </span>
            </Link>

            {/* Tools Dropdown */}
            <div
              className="relative"
              onMouseEnter={handleToolsEnter}
              onMouseLeave={handleToolsLeave}
            >
              <button 
                className={`text-sm font-medium cursor-pointer transition-all flex items-center gap-1 px-3 py-2 rounded-lg ${
                  toolsOpen 
                    ? 'text-[var(--neuro-primary)] shadow-[inset_3px_3px_6px_var(--neuro-shadow-dark),inset_-3px_-3px_6px_var(--neuro-shadow-light)]' 
                    : 'hover:text-[var(--neuro-primary)] text-[var(--neuro-text)]'
                }`}
              >
                Tools
                <ChevronDown className={`h-3 w-3 transition-transform ${toolsOpen ? 'rotate-180' : ''}`} />
              </button>
              {toolsOpen && (
                <div className="absolute top-full left-1/2 -translate-x-1/2 pt-2 animate-in fade-in slide-in-from-top-2 duration-200">
                  <div className="bg-[var(--neuro-bg)] rounded-2xl p-2 min-w-[180px] shadow-[10px_10px_20px_var(--neuro-shadow-dark),-10px_-10px_20px_var(--neuro-shadow-light)]">
                    {tools.map((item, index) => 
                      'divider' in item ? (
                        <div key={`divider-${index}`} className="h-px bg-[var(--neuro-shadow-dark)] opacity-20 my-2 mx-2" />
                      ) : (
                        <Link key={index} href={item.path}>
                          <span className="block px-4 py-2.5 text-sm font-medium cursor-pointer transition-all rounded-xl hover:shadow-[inset_4px_4px_8px_var(--neuro-shadow-dark),inset_-4px_-4px_8px_var(--neuro-shadow-light)] hover:text-[var(--neuro-primary)] text-[var(--neuro-text)]">
                            {item.name}
                          </span>
                        </Link>
                      )
                    )}
                  </div>
                </div>
              )}
            </div>

            <Link href="/pricing">
              <span className="text-sm font-medium cursor-pointer hover:text-[var(--neuro-primary)] transition-colors text-[var(--neuro-text)]">
                Pricing
              </span>
            </Link>

            {/* Resources Dropdown */}
            <div
              className="relative"
              onMouseEnter={handleResourcesEnter}
              onMouseLeave={handleResourcesLeave}
            >
              <button 
                className={`text-sm font-medium cursor-pointer transition-all flex items-center gap-1 px-3 py-2 rounded-lg ${
                  resourcesOpen 
                    ? 'text-[var(--neuro-primary)] shadow-[inset_3px_3px_6px_var(--neuro-shadow-dark),inset_-3px_-3px_6px_var(--neuro-shadow-light)]' 
                    : 'hover:text-[var(--neuro-primary)] text-[var(--neuro-text)]'
                }`}
              >
                Resources
                <ChevronDown className={`h-3 w-3 transition-transform ${resourcesOpen ? 'rotate-180' : ''}`} />
              </button>
              {resourcesOpen && (
                <div className="absolute top-full left-1/2 -translate-x-1/2 pt-2 animate-in fade-in slide-in-from-top-2 duration-200">
                  <div className="bg-[var(--neuro-bg)] rounded-2xl p-2 min-w-[180px] shadow-[10px_10px_20px_var(--neuro-shadow-dark),-10px_-10px_20px_var(--neuro-shadow-light)]">
                    {resources.map((item, index) => (
                      <Link key={index} href={item.path}>
                        <span className="block px-4 py-2.5 text-sm font-medium cursor-pointer transition-all rounded-xl hover:shadow-[inset_4px_4px_8px_var(--neuro-shadow-dark),inset_-4px_-4px_8px_var(--neuro-shadow-light)] hover:text-[var(--neuro-primary)] text-[var(--neuro-text)]">
                          {item.name}
                        </span>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}

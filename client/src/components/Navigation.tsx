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
    <div className="fixed top-6 left-1/2 -translate-x-1/2 z-50">
      <nav className="bg-background/80 backdrop-blur-lg border border-border rounded-full px-6 py-3 shadow-lg">
        <div className="flex items-center gap-8">
          <Link href="/">
            <span className="text-xl font-bold cursor-pointer">Studiø</span>
          </Link>
          <div className="flex items-center gap-6">
            <Link href="/">
              <span className="text-sm font-medium cursor-pointer hover:text-primary transition-colors">
                Home
              </span>
            </Link>

            {/* Tools Dropdown */}
            <div
              className="relative"
              onMouseEnter={handleToolsEnter}
              onMouseLeave={handleToolsLeave}
            >
              <button className="text-sm font-medium cursor-pointer hover:text-primary transition-colors flex items-center gap-1 py-2">
                Tools
                <ChevronDown className={`h-3 w-3 transition-transform ${toolsOpen ? 'rotate-180' : ''}`} />
              </button>
              {toolsOpen && (
                <div className="absolute top-full left-1/2 -translate-x-1/2 pt-2">
                  <div className="bg-background border border-border rounded-xl shadow-lg py-2 min-w-[180px]">
                    {tools.map((item, index) => 
                      'divider' in item ? (
                        <div key={`divider-${index}`} className="h-px bg-border my-2" />
                      ) : (
                        <Link key={index} href={item.path}>
                          <span className="block px-4 py-2 text-sm hover:bg-muted cursor-pointer transition-colors">
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
              <span className="text-sm font-medium cursor-pointer hover:text-primary transition-colors">
                Pricing
              </span>
            </Link>

            {/* Resources Dropdown */}
            <div
              className="relative"
              onMouseEnter={handleResourcesEnter}
              onMouseLeave={handleResourcesLeave}
            >
              <button className="text-sm font-medium cursor-pointer hover:text-primary transition-colors flex items-center gap-1 py-2">
                Resources
                <ChevronDown className={`h-3 w-3 transition-transform ${resourcesOpen ? 'rotate-180' : ''}`} />
              </button>
              {resourcesOpen && (
                <div className="absolute top-full left-1/2 -translate-x-1/2 pt-2">
                  <div className="bg-background border border-border rounded-xl shadow-lg py-2 min-w-[180px]">
                    {resources.map((item, index) => (
                      <Link key={index} href={item.path}>
                        <span className="block px-4 py-2 text-sm hover:bg-muted cursor-pointer transition-colors">
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

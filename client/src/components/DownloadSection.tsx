import React, { useState } from "react";
import { Download, Monitor, Apple, Smartphone, CheckCircle2, AlertCircle } from "lucide-react";

interface DownloadSectionProps {
  appName: string;
  version: string;
  downloadLinks: {
    windows?: string;
    mac?: string;
    linux?: string;
    web?: string;
  };
  fileSize?: string;
  requirements?: {
    windows?: string;
    mac?: string;
    linux?: string;
  };
}

export default function DownloadSection({
  appName,
  version,
  downloadLinks,
  fileSize = "~150 MB",
  requirements = {
    windows: "Windows 10/11",
    mac: "macOS 10.15+",
    linux: "Ubuntu 20.04+"
  }
}: DownloadSectionProps) {
  const [selectedPlatform, setSelectedPlatform] = useState<"windows" | "mac" | "linux" | "web">("windows");

  const platforms = [
    {
      id: "windows" as const,
      name: "Windows",
      icon: Monitor,
      available: !!downloadLinks.windows,
      requirement: requirements.windows,
      color: "from-blue-600 to-blue-700",
      hoverColor: "hover:from-blue-500 hover:to-blue-600"
    },
    {
      id: "mac" as const,
      name: "macOS",
      icon: Apple,
      available: !!downloadLinks.mac,
      requirement: requirements.mac,
      color: "from-gray-700 to-gray-800",
      hoverColor: "hover:from-gray-600 hover:to-gray-700"
    },
    {
      id: "linux" as const,
      name: "Linux",
      icon: Monitor,
      available: !!downloadLinks.linux,
      requirement: requirements.linux,
      color: "from-orange-600 to-orange-700",
      hoverColor: "hover:from-orange-500 hover:to-orange-600"
    },
    {
      id: "web" as const,
      name: "Web App",
      icon: Smartphone,
      available: !!downloadLinks.web,
      requirement: "Any browser",
      color: "from-purple-600 to-purple-700",
      hoverColor: "hover:from-purple-500 hover:to-purple-600"
    }
  ].filter(p => p.available);

  const currentPlatform = platforms.find(p => p.id === selectedPlatform) || platforms[0];
  const downloadUrl = downloadLinks[selectedPlatform];

  return (
    <section className="py-20 md:py-32 px-6 bg-[#050505] relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-[120px]"></div>
      </div>

      <div className="relative z-10 max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <span className="text-blue-500 text-[10px] font-black tracking-[0.5em] uppercase">Get Started</span>
          <h2 className="text-4xl md:text-6xl font-black uppercase italic tracking-tighter mt-4 mb-6">
            Download {appName}
          </h2>
          <p className="text-white/60 text-lg max-w-2xl mx-auto">
            Free, open-source, and ready to use. Choose your platform below.
          </p>
        </div>

        {/* Platform Selector */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {platforms.map((platform) => (
            <button
              key={platform.id}
              onClick={() => setSelectedPlatform(platform.id)}
              className={`
                relative p-6 rounded-2xl border-2 transition-all duration-300
                ${selectedPlatform === platform.id 
                  ? 'border-blue-500 bg-blue-500/10' 
                  : 'border-white/10 bg-white/5 hover:border-white/20'
                }
              `}
            >
              <platform.icon 
                size={32} 
                className={`mx-auto mb-3 ${selectedPlatform === platform.id ? 'text-blue-500' : 'text-white/60'}`}
              />
              <div className={`font-black text-sm ${selectedPlatform === platform.id ? 'text-white' : 'text-white/60'}`}>
                {platform.name}
              </div>
              {selectedPlatform === platform.id && (
                <div className="absolute -top-2 -right-2 w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                  <CheckCircle2 size={16} className="text-white" />
                </div>
              )}
            </button>
          ))}
        </div>

        {/* Download Card */}
        <div className="bg-[#0a0a0c] border border-white/10 rounded-3xl p-8 md:p-12">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            {/* Info */}
            <div className="flex-1 text-center md:text-left">
              <div className="flex items-center gap-3 justify-center md:justify-start mb-4">
                <currentPlatform.icon size={40} className="text-blue-500" />
                <div>
                  <h3 className="text-2xl font-black">{appName} for {currentPlatform.name}</h3>
                  <p className="text-white/40 text-sm">Version {version}</p>
                </div>
              </div>
              
              <div className="space-y-2 text-sm text-white/60">
                <div className="flex items-center gap-2 justify-center md:justify-start">
                  <CheckCircle2 size={16} className="text-green-500" />
                  <span>Free & Open Source</span>
                </div>
                <div className="flex items-center gap-2 justify-center md:justify-start">
                  <CheckCircle2 size={16} className="text-green-500" />
                  <span>{currentPlatform.requirement}</span>
                </div>
                <div className="flex items-center gap-2 justify-center md:justify-start">
                  <CheckCircle2 size={16} className="text-green-500" />
                  <span>File size: {fileSize}</span>
                </div>
              </div>
            </div>

            {/* Download Button */}
            <div className="flex flex-col gap-4">
              {downloadUrl ? (
                <a href={downloadUrl} download>
                  <button className={`
                    bg-gradient-to-r ${currentPlatform.color} ${currentPlatform.hoverColor}
                    text-white px-12 py-6 rounded-full font-black text-sm tracking-widest uppercase
                    transition-all shadow-2xl flex items-center gap-3 whitespace-nowrap
                  `}>
                    <Download size={20} />
                    Download Now
                  </button>
                </a>
              ) : (
                <button disabled className="bg-gray-700 text-white/40 px-12 py-6 rounded-full font-black text-sm tracking-widest uppercase cursor-not-allowed">
                  Coming Soon
                </button>
              )}
              
              <a 
                href="https://github.com/yourusername/ConstructLM/releases" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-center text-white/40 hover:text-white/60 text-xs transition-colors"
              >
                View all releases →
              </a>
            </div>
          </div>
        </div>

        {/* Installation Note */}
        <div className="mt-8 p-6 bg-yellow-500/10 border border-yellow-500/20 rounded-2xl flex items-start gap-4">
          <AlertCircle size={24} className="text-yellow-500 flex-shrink-0 mt-1" />
          <div className="text-sm">
            <div className="font-bold text-yellow-500 mb-1">First-time installation note</div>
            <p className="text-white/60">
              {selectedPlatform === "windows" && "Windows may show a security warning. Click 'More info' → 'Run anyway' to proceed."}
              {selectedPlatform === "mac" && "macOS may show 'unidentified developer'. Right-click the app → Open → Open to proceed."}
              {selectedPlatform === "linux" && "Make the AppImage executable: chmod +x ConstructLM-*.AppImage"}
              {selectedPlatform === "web" && "No installation required. Just open in your browser and start using."}
            </p>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12">
          <div className="text-center">
            <div className="text-3xl font-black text-blue-500">Free</div>
            <div className="text-xs text-white/40 uppercase tracking-widest mt-1">Forever</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-black text-blue-500">Open</div>
            <div className="text-xs text-white/40 uppercase tracking-widest mt-1">Source</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-black text-blue-500">MIT</div>
            <div className="text-xs text-white/40 uppercase tracking-widest mt-1">License</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-black text-blue-500">v{version}</div>
            <div className="text-xs text-white/40 uppercase tracking-widest mt-1">Latest</div>
          </div>
        </div>
      </div>
    </section>
  );
}

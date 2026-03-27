import React, { useState, useEffect } from "react";
import { Download, Loader2, CheckCircle2 } from "lucide-react";

interface DownloadButtonProps {
  appName: string;
  version: string;
  platform?: 'windows' | 'mac' | 'linux';
  className?: string;
  children?: React.ReactNode;
}

export function DownloadButton({ 
  appName, 
  version, 
  platform = 'windows',
  className = "",
  children 
}: DownloadButtonProps) {
  const [isDownloading, setIsDownloading] = useState(false);
  const [downloadCount, setDownloadCount] = useState<number | null>(null);
  const [downloaded, setDownloaded] = useState(false);

  // Fetch current download count
  useEffect(() => {
    fetch(`/api/downloads/count/${appName}`)
      .then(res => res.json())
      .then(data => setDownloadCount(data.total_downloads))
      .catch(err => console.error('Failed to fetch download count:', err));
  }, [appName]);

  const handleDownload = async () => {
    setIsDownloading(true);
    
    try {
      // Track download and get redirect URL
      const trackingUrl = `/api/downloads/download/${appName}/${version}?platform=${platform}`;
      
      // Open download in new window
      window.open(trackingUrl, '_blank');
      
      // Update UI
      setTimeout(() => {
        setIsDownloading(false);
        setDownloaded(true);
        if (downloadCount !== null) {
          setDownloadCount(downloadCount + 1);
        }
        
        // Reset downloaded state after 3 seconds
        setTimeout(() => setDownloaded(false), 3000);
      }, 1000);
      
    } catch (error) {
      console.error('Download error:', error);
      setIsDownloading(false);
      // Fallback to direct GitHub link
      window.open(`https://github.com/yourusername/ConstructLM/releases/latest`, '_blank');
    }
  };

  return (
    <div className="flex flex-col items-center gap-2">
      <button
        onClick={handleDownload}
        disabled={isDownloading}
        className={`
          bg-pink-600 text-white hover:bg-pink-500 
          px-10 py-6 rounded-full font-black text-[10px] 
          tracking-widest uppercase transition-all shadow-2xl 
          flex items-center gap-3 justify-center
          disabled:opacity-50 disabled:cursor-not-allowed
          ${className}
        `}
      >
        {isDownloading ? (
          <>
            <Loader2 size={16} className="animate-spin" />
            Preparing...
          </>
        ) : downloaded ? (
          <>
            <CheckCircle2 size={16} />
            Downloaded!
          </>
        ) : (
          <>
            <Download size={16} />
            {children || 'Download'}
          </>
        )}
      </button>
      
      {downloadCount !== null && (
        <div className="text-white/40 text-xs">
          {downloadCount.toLocaleString()} downloads
        </div>
      )}
    </div>
  );
}

// Platform-specific download button
export function PlatformDownloadButton({ 
  appName, 
  version,
  className = "" 
}: Omit<DownloadButtonProps, 'platform'>) {
  const [platform, setPlatform] = useState<'windows' | 'mac' | 'linux'>('windows');

  useEffect(() => {
    // Detect user's platform
    const userAgent = navigator.userAgent.toLowerCase();
    if (userAgent.includes('mac')) {
      setPlatform('mac');
    } else if (userAgent.includes('linux')) {
      setPlatform('linux');
    } else {
      setPlatform('windows');
    }
  }, []);

  const platformLabels = {
    windows: 'Download for Windows',
    mac: 'Download for macOS',
    linux: 'Download for Linux'
  };

  return (
    <DownloadButton
      appName={appName}
      version={version}
      platform={platform}
      className={className}
    >
      {platformLabels[platform]}
    </DownloadButton>
  );
}

// Download stats display component
export function DownloadStats({ appName }: { appName: string }) {
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [period, setPeriod] = useState<'7d' | '30d' | '365d'>('30d');

  useEffect(() => {
    fetch(`/api/downloads/stats/${appName}?period=${period}`)
      .then(res => res.json())
      .then(data => {
        setStats(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Failed to fetch stats:', err);
        setLoading(false);
      });
  }, [appName, period]);

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <Loader2 className="animate-spin text-pink-500" size={32} />
      </div>
    );
  }

  if (!stats) {
    return null;
  }

  return (
    <div className="bg-[#0a0a0c] border border-white/5 rounded-2xl p-8">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-black uppercase">Download Statistics</h3>
        <div className="flex gap-2">
          {(['7d', '30d', '365d'] as const).map(p => (
            <button
              key={p}
              onClick={() => setPeriod(p)}
              className={`
                px-4 py-2 rounded-full text-xs font-bold uppercase
                ${period === p 
                  ? 'bg-pink-600 text-white' 
                  : 'bg-white/5 text-white/40 hover:bg-white/10'
                }
              `}
            >
              {p}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        <div className="space-y-2">
          <div className="text-3xl font-black text-pink-500">
            {stats.total_downloads.toLocaleString()}
          </div>
          <div className="text-xs text-white/40 uppercase tracking-widest">
            Total Downloads
          </div>
        </div>

        {stats.by_platform?.map((item: any) => (
          <div key={item.platform} className="space-y-2">
            <div className="text-2xl font-black">
              {item._count.toLocaleString()}
            </div>
            <div className="text-xs text-white/40 uppercase tracking-widest">
              {item.platform}
            </div>
          </div>
        ))}
      </div>

      {stats.by_country && stats.by_country.length > 0 && (
        <div className="mt-8">
          <h4 className="text-sm font-black uppercase mb-4 text-white/60">
            Top Countries
          </h4>
          <div className="space-y-2">
            {stats.by_country.slice(0, 5).map((item: any) => (
              <div key={item.country} className="flex items-center justify-between">
                <span className="text-sm">{item.country}</span>
                <span className="text-sm font-bold text-pink-500">
                  {item._count.toLocaleString()}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

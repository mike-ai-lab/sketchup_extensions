import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { Play, Download, FileText, Video } from "lucide-react";

interface TutorialStep {
  title: string;
  content: string;
  mediaType?: 'image' | 'video' | 'gif';
  mediaUrl?: string;
}

const TutorialSection: React.FC<{ extensionName: string, index: number }> = ({ extensionName, index }) => {
  const steps: TutorialStep[] = [
    {
      title: "Installation & Setup",
      content: "Download and install the extension from the Extension Warehouse or load it manually through the Extension Manager.",
      mediaType: "image",
      mediaUrl: `https://picsum.photos/seed/${extensionName}1/600/400`
    },
    {
      title: "Basic Configuration",
      content: "Configure your preferences and set up the default parameters for optimal performance with your workflow.",
      mediaType: "image", 
      mediaUrl: `https://picsum.photos/seed/${extensionName}2/600/400`
    },
    {
      title: "Creating Your First Layout",
      content: "Step-by-step guide to creating your first parametric layout using the extension's core features.",
      mediaType: "video",
      mediaUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4"
    },
    {
      title: "Advanced Features",
      content: "Explore advanced features like pattern synchronization, custom materials, and automated trimming options.",
      mediaType: "image",
      mediaUrl: `https://picsum.photos/seed/${extensionName}3/600/400`
    }
  ];

  const renderMedia = (step: TutorialStep) => {
    if (step.mediaType === 'video') {
      return (
        <div className="w-full h-full bg-black relative">
          <video 
            src={step.mediaUrl} 
            controls
            className="w-full h-full object-cover"
          />
        </div>
      );
    }
    return (
      <img 
        src={step.mediaUrl || `https://picsum.photos/seed/${extensionName}/600/400`} 
        alt={step.title} 
        className="w-full h-full object-cover" 
      />
    );
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.2 }}
      className="mb-20 border-b border-border/40 pb-12 last:border-0"
    >
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-3xl font-bold">{extensionName}</h2>
        <span className="text-sm text-muted-foreground">Tutorial Suite</span>
      </div>

      <div className="space-y-16 relative">
        <div className="absolute left-4 md:left-0 top-4 bottom-0 w-0.5 bg-border hidden md:block opacity-50"></div>

        {steps.map((step, stepIndex) => (
          <div key={stepIndex} className="flex flex-col md:flex-row gap-8 items-start relative">
            <div className="hidden md:flex absolute -left-[1.6rem] items-center justify-center w-8 h-8 rounded-full bg-secondary border border-border z-10">
              <span className="text-xs font-bold">{stepIndex + 1}</span>
            </div>

            <div className="w-full md:w-5/12 aspect-video bg-secondary rounded-xl overflow-hidden shadow-md ring-1 ring-border">
              {renderMedia(step)}
            </div>
            <div className="w-full md:w-7/12 py-2">
              <span className="inline-block md:hidden px-2 py-1 rounded-md bg-secondary text-secondary-foreground text-xs font-bold tracking-wider mb-3">STEP {stepIndex + 1}</span>
              <h3 className="text-2xl font-medium mb-3 text-foreground">{step.title}</h3>
              <p className="text-muted-foreground leading-relaxed text-lg">{step.content}</p>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

export default function Tutorials() {
  const extensions = [
    { name: "PARAMETRIX", slug: "parametrix" },
    { name: "AutoNestCut", slug: "autonestcut" }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      {/* Floating Navigation */}
      <div className="fixed top-6 left-1/2 -translate-x-1/2 z-50">
        <nav className="bg-background/80 backdrop-blur-lg border border-border rounded-full px-6 py-3 shadow-lg">
          <div className="flex items-center gap-8">
            <Link href="/">
              <span className="text-xl font-bold cursor-pointer">Studiø</span>
            </Link>
            <div className="flex items-center gap-6">
              <Link href="/">
                <span className="text-sm font-medium cursor-pointer hover:text-primary transition-colors">Home</span>
              </Link>
              <Link href="/tools">
                <span className="text-sm font-medium cursor-pointer hover:text-primary transition-colors">Tools</span>
              </Link>
              <Link href="/tutorials">
                <span className="text-sm font-medium cursor-pointer text-primary">Tutorials</span>
              </Link>
              <Link href="/pricing">
                <span className="text-sm font-medium cursor-pointer hover:text-primary transition-colors">Pricing</span>
              </Link>
              <Link href="/download">
                <span className="text-sm font-medium cursor-pointer hover:text-primary transition-colors">Download</span>
              </Link>
              <Link href="/faq">
                <span className="text-sm font-medium cursor-pointer hover:text-primary transition-colors">FAQ</span>
              </Link>
            </div>
          </div>
        </nav>
      </div>

      <div className="container mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-16 pt-24">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">Tutorials</h1>
          <p className="max-w-2xl mx-auto text-xl text-muted-foreground">
            Step-by-step guides to master the tools and boost your productivity
          </p>
        </div>

        {extensions.map((extension, index) => (
          <TutorialSection key={extension.slug} extensionName={extension.name} index={index} />
        ))}
      </div>

      {/* Footer */}
      <div className="flex justify-center py-8 mt-auto">
        <footer className="bg-background/80 backdrop-blur-lg border border-border rounded-full px-6 py-3 shadow-lg">
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <span>© 2025 Studiø</span>
            <span className="text-border">•</span>
            <span>Developed by Int. Arch. M.Shkeir</span>
          </div>
        </footer>
      </div>
    </div>
  );
}
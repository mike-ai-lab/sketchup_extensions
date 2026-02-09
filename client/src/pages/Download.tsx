import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { Download as DownloadIcon, FileText, Shield, CheckCircle2 } from "lucide-react";

export default function Download() {
  const extensions = [
    {
      name: "PARAMETRIX",
      version: "1.0.0",
      description: "Professional Parametric Cladding Layout Generator",
      downloadUrl: "#",
      documentationUrl: "#",
      size: "2.4 MB",
      slug: "parametrix"
    },
    {
      name: "AutoNestCut", 
      version: "1.0.0",
      description: "Intelligent Cut List and Nesting Optimization",
      downloadUrl: "#",
      documentationUrl: "#", 
      size: "1.8 MB",
      slug: "autonestcut"
    },
    {
      name: "ConstructLM",
      version: "1.0.0",
      description: "AI-Powered Document Analysis & Multi-Model Chat Assistant",
      downloadUrl: "/downloads/ConstructLM-Setup-1.0.0.exe",
      documentationUrl: "#",
      size: "~150 MB",
      slug: "constructlm",
      isStandalone: true
    }
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
                <span className="text-sm font-medium cursor-pointer hover:text-primary transition-colors">Tutorials</span>
              </Link>
              <Link href="/pricing">
                <span className="text-sm font-medium cursor-pointer hover:text-primary transition-colors">Pricing</span>
              </Link>
              <Link href="/download">
                <span className="text-sm font-medium cursor-pointer text-primary">Download</span>
              </Link>
              <Link href="/faq">
                <span className="text-sm font-medium cursor-pointer hover:text-primary transition-colors">FAQ</span>
              </Link>
            </div>
          </div>
        </nav>
      </div>

      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 pt-24">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">Downloads</h1>
          <p className="max-w-2xl mx-auto text-xl text-muted-foreground">
            Get the latest versions of extensions and documentation
          </p>
        </div>

        {/* Download Notice */}
        <Card className="mb-12 border-2 border-blue-200 bg-blue-50 dark:border-blue-800 dark:bg-blue-950">
          <CardContent className="p-6">
            <div className="flex items-start space-x-4">
              <Shield className="h-6 w-6 text-blue-600 dark:text-blue-400 mt-1 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-blue-900 dark:text-blue-100 mb-2">License Information</h3>
                <p className="text-blue-800 dark:text-blue-200 text-sm">
                  Extensions require purchase or trial activation. ConstructLM is free to download and requires only an AI provider API key (free options available).
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {extensions.map((extension, index) => (
            <motion.div
              key={extension.slug}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="h-full">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-2xl mb-2">{extension.name}</CardTitle>
                      <CardDescription className="text-base">{extension.description}</CardDescription>
                    </div>
                    <Badge variant="secondary">v{extension.version}</Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-muted-foreground">Version:</span>
                      <p className="font-medium">{extension.version}</p>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Size:</span>
                      <p className="font-medium">{extension.size}</p>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <h4 className="font-semibold">What's Included:</h4>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-center">
                        <CheckCircle2 className="h-4 w-4 text-primary mr-2" />
                        Extension files (.rbz)
                      </li>
                      <li className="flex items-center">
                        <CheckCircle2 className="h-4 w-4 text-primary mr-2" />
                        Installation guide
                      </li>
                      <li className="flex items-center">
                        <CheckCircle2 className="h-4 w-4 text-primary mr-2" />
                        User documentation
                      </li>
                      <li className="flex items-center">
                        <CheckCircle2 className="h-4 w-4 text-primary mr-2" />
                        License key activation
                      </li>
                    </ul>
                  </div>

                  <div className="space-y-3 pt-4 border-t">
                    {extension.isStandalone ? (
                      <a href={extension.downloadUrl} download>
                        <Button size="lg" className="w-full">
                          <DownloadIcon className="mr-2 h-5 w-5" />
                          Download for Windows
                        </Button>
                      </a>
                    ) : (
                      <Link href={`/purchase/${extension.slug}`}>
                        <Button size="lg" className="w-full">
                          <DownloadIcon className="mr-2 h-5 w-5" />
                          Get Extension
                        </Button>
                      </Link>
                    )}
                    <Button variant="outline" size="sm" className="w-full">
                      <FileText className="mr-2 h-4 w-4" />
                      View Documentation
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Installation Instructions */}
        <Card className="mt-16">
          <CardHeader>
            <CardTitle className="text-2xl">Installation Instructions</CardTitle>
            <CardDescription>How to install and activate your extensions</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-xl font-bold text-primary">1</span>
                </div>
                <h3 className="font-semibold mb-2">Download</h3>
                <p className="text-sm text-muted-foreground">Download the .rbz file after purchase or during trial</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-xl font-bold text-primary">2</span>
                </div>
                <h3 className="font-semibold mb-2">Install</h3>
                <p className="text-sm text-muted-foreground">Use SketchUp's Extension Manager to install the .rbz file</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-xl font-bold text-primary">3</span>
                </div>
                <h3 className="font-semibold mb-2">Activate</h3>
                <p className="text-sm text-muted-foreground">Enter your license key to activate the extension</p>
              </div>
            </div>
          </CardContent>
        </Card>
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
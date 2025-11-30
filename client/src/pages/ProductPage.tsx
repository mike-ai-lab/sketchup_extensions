import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link, useParams } from "wouter";
import { ArrowLeft, Download, CheckCircle2, ExternalLink } from "lucide-react";
import { getExtension } from "@shared/extensions";

export default function ProductPage() {
  const params = useParams<{ slug: string }>();
  const extension = getExtension(params.slug || "");

  if (!extension) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-slate-900 mb-4">Extension Not Found</h1>
          <Link href="/">
            <a>
              <Button>Return Home</Button>
            </a>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-slate-50 to-white">
      {/* Navigation */}
      <nav className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/">
            <a className="text-2xl font-bold text-slate-900">SketchUp Extensions</a>
          </Link>
          <div className="flex items-center gap-6">
            <Link href="/contact">
              <a className="text-slate-600 hover:text-slate-900 transition-colors">Contact</a>
            </Link>
            <Link href="/dashboard">
              <a>
                <Button variant="outline">Dashboard</Button>
              </a>
            </Link>
          </div>
        </div>
      </nav>

      {/* Back Button */}
      <div className="container mx-auto px-4 py-6">
        <Link href="/">
          <a className="inline-flex items-center text-slate-600 hover:text-slate-900 transition-colors">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Extensions
          </a>
        </Link>
      </div>

      {/* Product Header */}
      <section className="py-12 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <Badge className="mb-4">{extension.trialDays}-Day Free Trial</Badge>
              <h1 className="text-5xl font-bold text-slate-900 mb-4">{extension.name}</h1>
              <p className="text-2xl text-slate-600 mb-6">{extension.tagline}</p>
              <p className="text-lg text-slate-700 mb-8 leading-relaxed">{extension.description}</p>
              <div className="flex items-center gap-4 mb-8">
                <div>
                  <p className="text-4xl font-bold text-slate-900">${extension.price}</p>
                  <p className="text-sm text-slate-500">One-time payment</p>
                </div>
              </div>
              <div className="flex gap-4 flex-wrap">
                <Link href={`/purchase/${extension.slug}`}>
                  <a>
                    <Button size="lg" className="text-lg px-8">
                      Start Free Trial <Download className="ml-2 h-5 w-5" />
                    </Button>
                  </a>
                </Link>
                {extension.githubUrl && (
                  <a href={extension.githubUrl} target="_blank" rel="noopener noreferrer">
                    <Button size="lg" variant="outline" className="text-lg px-8">
                      View on GitHub <ExternalLink className="ml-2 h-5 w-5" />
                    </Button>
                  </a>
                )}
              </div>
            </div>
            <div className="bg-slate-200 rounded-lg aspect-video flex items-center justify-center">
              <p className="text-slate-500">Extension Preview</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 bg-white">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl font-bold text-slate-900 mb-8">Features</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {extension.features.map((feature, idx) => {
              const [title, description] = feature.split(' - ');
              return (
                <Card key={idx} className="border-2">
                  <CardContent className="pt-6">
                    <div className="flex items-start gap-4">
                      <CheckCircle2 className="h-6 w-6 text-blue-600 flex-shrink-0 mt-1" />
                      <div>
                        <h3 className="font-semibold text-lg text-slate-900 mb-1">{title}</h3>
                        {description && <p className="text-slate-600">{description}</p>}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-blue-600 text-white">
        <div className="container mx-auto text-center max-w-3xl">
          <h2 className="text-4xl font-bold mb-6">Ready to Get Started?</h2>
          <p className="text-xl mb-8 opacity-90">
            Try {extension.name} free for {extension.trialDays} days. No credit card required.
          </p>
          <Link href={`/purchase/${extension.slug}`}>
            <a>
              <Button size="lg" variant="secondary" className="text-lg px-8">
                Start Free Trial <Download className="ml-2 h-5 w-5" />
              </Button>
            </a>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 bg-slate-900 text-slate-400">
        <div className="container mx-auto text-center">
          <p className="mb-2">© 2025 SketchUp Extensions. All rights reserved.</p>
          <p className="text-sm">Developed by Int. Arch. M.Shkeir</p>
        </div>
      </footer>
    </div>
  );
}

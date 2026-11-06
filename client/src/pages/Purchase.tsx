import { Button } from "@/components/ui/button";
import { Link, useParams } from "wouter";
import { ArrowLeft } from "lucide-react";

// Purchase / licensing backend is not yet implemented.
// This page is a placeholder until the extensions, paypal, and licenses
// tRPC routers are added to the server.

export default function Purchase() {
  const params = useParams();
  const slug = params.extensionSlug || params.slug || "";

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#050505] text-white px-6">
      <h1 className="text-4xl font-black uppercase italic tracking-tighter mb-4">Coming Soon</h1>
      <p className="text-white/40 mb-8 text-center max-w-sm">
        The purchase flow for <span className="text-white font-bold">{slug}</span> is being set up.
        Check back soon.
      </p>
      <Link href="/tools">
        <Button variant="outline" className="border-white/20 text-white hover:bg-white/10">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Tools
        </Button>
      </Link>
    </div>
  );
}

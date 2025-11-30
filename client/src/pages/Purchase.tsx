import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link, useParams } from "wouter";
import { motion } from "framer-motion";
import { CheckCircle2, Shield, CreditCard, Download, ArrowLeft } from "lucide-react";
import { trpc } from "@/lib/trpc";
import { toast } from "sonner";
import { useState } from "react";
import { useAuth } from "@/_core/hooks/useAuth";

export default function Purchase() {
  const params = useParams();
  const extensionSlug = params.extensionSlug || params.slug;
  const [isProcessing, setIsProcessing] = useState(false);
  const [email, setEmail] = useState("");
  const { user } = useAuth();

  // Fetch extension details
  const { data: extension, isLoading } = trpc.extensions.getBySlug.useQuery(
    { slug: extensionSlug || "" },
    { enabled: !!extensionSlug }
  );

  const createOrder = trpc.paypal.createOrder.useMutation({
    onSuccess: (data: { orderId: string; approvalUrl: string }) => {
      if (data.approvalUrl) {
        window.location.href = data.approvalUrl;
      }
    },
    onError: (error: any) => {
      toast.error("Failed to create order. Please try again.");
      console.error(error);
      setIsProcessing(false);
    }
  });

  const startTrial = trpc.licenses.generateTrial.useMutation({
    onSuccess: (data: { licenseKey: string; expiresAt: Date; downloadUrl: string | null }) => {
      toast.success("Trial license generated! Check your email.");
      // Redirect to dashboard
      window.location.href = "/dashboard";
    },
    onError: (error: any) => {
      toast.error("Failed to generate trial. Please try again.");
      console.error(error);
    }
  });

  const handlePurchase = () => {
    if (!extension) return;
    setIsProcessing(true);
    createOrder.mutate({ extensionSlug: extension.slug });
  };

  const handleStartTrial = () => {
    if (!extension) return;
    if (!email && !user?.email) {
      toast.error("Please enter your email address");
      return;
    }
    startTrial.mutate({ 
      extensionSlug: extension.slug,
      email: user?.email || email 
    });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Loading...</p>
      </div>
    );
  }

  if (!extension) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <h1 className="text-2xl font-bold mb-4">Extension Not Found</h1>
        <Link href="/tools">
          <Button>Browse Extensions</Button>
        </Link>
      </div>
    );
  }

  const price = (extension.price / 100).toFixed(2);

  return (
    <div className="min-h-screen flex flex-col">
      {/* Navigation */}
      <nav className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/">
            <span className="text-2xl font-bold cursor-pointer">Studiø</span>
          </Link>
          <div className="flex items-center gap-6">
            <Link href="/tools">
              <span className="text-sm font-medium cursor-pointer hover:text-primary transition-colors">Tools</span>
            </Link>
            <Link href="/dashboard">
              <Button variant="outline" size="sm">Dashboard</Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Content */}
      <section className="py-16 px-4 flex-grow">
        <div className="container mx-auto max-w-5xl">
          <Link href={`/tools/${extension.slug}`}>
            <Button variant="ghost" className="mb-8">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to {extension.name}
            </Button>
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <h1 className="text-4xl font-bold mb-4">Get {extension.name}</h1>
                <p className="text-lg text-muted-foreground">
                  {extension.description}
                </p>
              </motion.div>

              {/* Trial Option */}
              <Card className="border-2">
                <CardHeader>
                  <Badge className="w-fit mb-2">Recommended</Badge>
                  <CardTitle>Start with a Free Trial</CardTitle>
                  <CardDescription>
                    Try {extension.name} free for {extension.trialDays} days. No credit card required.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button 
                    size="lg" 
                    className="w-full"
                    onClick={handleStartTrial}
                    disabled={startTrial.isPending}
                  >
                    {startTrial.isPending ? "Generating..." : "Start Free Trial"}
                  </Button>
                  <p className="text-sm text-muted-foreground mt-4 text-center">
                    Full access for {extension.trialDays} days • Cancel anytime
                  </p>
                </CardContent>
              </Card>

              {/* Purchase Option */}
              <Card>
                <CardHeader>
                  <CardTitle>Purchase Full License</CardTitle>
                  <CardDescription>
                    One-time payment for lifetime access
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="mb-6">
                    <p className="text-4xl font-bold mb-2">${price}</p>
                    <p className="text-muted-foreground">One-time purchase • Lifetime updates</p>
                  </div>
                  <Button 
                    size="lg" 
                    variant="outline" 
                    className="w-full"
                    onClick={handlePurchase}
                    disabled={isProcessing || createOrder.isPending}
                  >
                    <CreditCard className="mr-2 h-5 w-5" />
                    {isProcessing || createOrder.isPending ? "Processing..." : "Purchase Now"}
                  </Button>
                  <div className="flex items-center justify-center mt-4 text-sm text-muted-foreground">
                    <Shield className="h-4 w-4 mr-2" />
                    Secure payment via PayPal
                  </div>
                </CardContent>
              </Card>

              {/* What's Included */}
              <Card>
                <CardHeader>
                  <CardTitle>What's Included</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {extension.features && typeof extension.features === 'string' && 
                      JSON.parse(extension.features).map((feature: string, idx: number) => (
                        <li key={idx} className="flex items-start">
                          <CheckCircle2 className="h-5 w-5 text-primary mr-3 mt-0.5 flex-shrink-0" />
                          <span>{feature}</span>
                        </li>
                      ))
                    }
                    <li className="flex items-start">
                      <CheckCircle2 className="h-5 w-5 text-primary mr-3 mt-0.5 flex-shrink-0" />
                      <span>Lifetime updates and bug fixes</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle2 className="h-5 w-5 text-primary mr-3 mt-0.5 flex-shrink-0" />
                      <span>Email support</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle2 className="h-5 w-5 text-primary mr-3 mt-0.5 flex-shrink-0" />
                      <span>Complete documentation</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              <Card className="bg-muted/50">
                <CardContent className="p-6">
                  <h3 className="font-semibold mb-4">Purchase Benefits</h3>
                  <ul className="space-y-3 text-sm">
                    <li className="flex items-start">
                      <Download className="h-4 w-4 text-primary mr-2 mt-0.5 flex-shrink-0" />
                      <span>Instant download after purchase</span>
                    </li>
                    <li className="flex items-start">
                      <Shield className="h-4 w-4 text-primary mr-2 mt-0.5 flex-shrink-0" />
                      <span>Secure licensing system</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle2 className="h-4 w-4 text-primary mr-2 mt-0.5 flex-shrink-0" />
                      <span>Works with SketchUp 2019+</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <h3 className="font-semibold mb-2">Need Help?</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Have questions before purchasing?
                  </p>
                  <Link href="/contact">
                    <Button variant="outline" size="sm" className="w-full">
                      Contact Support
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 border-t bg-background">
        <div className="container mx-auto text-center">
          <p className="text-sm text-muted-foreground mb-2">
            © 2025 Studiø. All rights reserved.
          </p>
          <p className="text-xs text-muted-foreground">
            Developed by Int. Arch. M.Shkeir
          </p>
        </div>
      </footer>
    </div>
  );
}

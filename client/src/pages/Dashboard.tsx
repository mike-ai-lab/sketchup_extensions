import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { Download, Key, Calendar } from "lucide-react";
import Navigation from "@/components/Navigation";

const MOCK_LICENSES = [
  {
    id: 1,
    extension: { name: "PARAMETRIX", description: "Parametric Cladding Layout Generator", downloadUrl: "/downloads/parametrix.rbz" },
    licenseKey: "PRMX-2024-XXXX-XXXX-XXXX",
    status: "active",
    activatedAt: "2024-01-15",
    expiresAt: null
  },
  {
    id: 2,
    extension: { name: "AutoNestCut", description: "Automated Nesting & Cutting Optimization", downloadUrl: null },
    licenseKey: "ANCT-2024-TRIAL-XXXX",
    status: "trial",
    activatedAt: "2024-02-01",
    expiresAt: "2024-02-08"
  }
];

export default function Dashboard() {
  const formatDate = (date: string | null) => {
    if (!date) return "Never";
    return new Date(date).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
  };

  const getStatusBadge = (status: string) => {
    const variants: Record<string, "default" | "secondary" | "destructive" | "outline"> = {
      active: "default",
      trial: "secondary",
      expired: "destructive",
      revoked: "destructive"
    };
    return <Badge variant={variants[status] || "outline"}>{status.toUpperCase()}</Badge>;
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />

      <section className="py-16 px-4 flex-grow pt-32">
        <div className="container mx-auto max-w-6xl">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="mb-12">
            <h1 className="text-4xl font-bold mb-2">License Dashboard</h1>
            <p className="text-lg text-muted-foreground">Manage your extensions and licenses</p>
          </motion.div>

          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-semibold">Active Licenses</h2>
              <Link href="/tools"><Button variant="outline">Browse Extensions</Button></Link>
            </div>

            <div className="grid grid-cols-1 gap-6">
              {MOCK_LICENSES.map((license, index) => (
                <motion.div key={license.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: index * 0.1 }}>
                  <Card>
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div>
                          <CardTitle className="text-xl mb-2">{license.extension.name}</CardTitle>
                          <CardDescription>{license.extension.description}</CardDescription>
                        </div>
                        {getStatusBadge(license.status)}
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                        <div className="flex items-start space-x-3">
                          <Key className="h-5 w-5 text-primary mt-0.5" />
                          <div>
                            <p className="text-sm font-medium mb-1">License Key</p>
                            <p className="text-sm text-muted-foreground font-mono break-all">{license.licenseKey}</p>
                          </div>
                        </div>
                        <div className="flex items-start space-x-3">
                          <Calendar className="h-5 w-5 text-primary mt-0.5" />
                          <div>
                            <p className="text-sm font-medium mb-1">Activated</p>
                            <p className="text-sm text-muted-foreground">{formatDate(license.activatedAt)}</p>
                          </div>
                        </div>
                        <div className="flex items-start space-x-3">
                          <Calendar className="h-5 w-5 text-primary mt-0.5" />
                          <div>
                            <p className="text-sm font-medium mb-1">{license.status === "trial" ? "Trial Expires" : "Expires"}</p>
                            <p className="text-sm text-muted-foreground">{formatDate(license.expiresAt)}</p>
                          </div>
                        </div>
                      </div>
                      <div className="flex gap-3">
                        {license.extension.downloadUrl ? (
                          <Button onClick={() => window.open(license.extension.downloadUrl!, "_blank")}>
                            <Download className="h-4 w-4 mr-2" />Download Extension
                          </Button>
                        ) : (
                          <Button disabled><Download className="h-4 w-4 mr-2" />Coming Soon</Button>
                        )}
                        {license.status === "trial" && (
                          <Link href="/pricing"><Button variant="outline">Upgrade to Full License</Button></Link>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>

          <Card className="mt-12 bg-muted/50">
            <CardContent className="p-8">
              <h3 className="text-lg font-semibold mb-4">Need Help?</h3>
              <p className="text-muted-foreground mb-4">Questions about licenses or need technical support? We're here to help.</p>
              <Link href="/resources#contact"><Button variant="outline">Contact Support</Button></Link>
            </CardContent>
          </Card>
        </div>
      </section>

      <div className="flex justify-center py-8 px-4">
        <footer className="bg-background/80 backdrop-blur-lg border border-border rounded-full px-4 sm:px-6 py-3 shadow-lg max-w-4xl">
          <div className="flex items-center gap-2 sm:gap-4 text-xs sm:text-sm text-muted-foreground flex-wrap justify-center">
            <span>© 2025 Studiø</span>
            <span className="text-border hidden sm:inline">•</span>
            <span className="text-center">Developed by Int. Arch. M.Shkeir</span>
          </div>
        </footer>
      </div>
    </div>
  );
}

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { Download, Key, Calendar, AlertCircle, LogOut } from "lucide-react";
import { trpc } from "@/lib/trpc";
import { useAuth } from "@/_core/hooks/useAuth";
import { getLoginUrl } from "@/const";
import { toast } from "sonner";

export default function Dashboard() {
  const { user, loading, isAuthenticated } = useAuth();
  const logout = trpc.auth.logout.useMutation({
    onSuccess: () => {
      window.location.href = "/";
    }
  });

  // Fetch user's licenses
  const { data: licenses, isLoading: licensesLoading } = trpc.licenses.myLicenses.useQuery(
    undefined,
    { enabled: isAuthenticated }
  );

  if (loading || licensesLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Loading...</p>
      </div>
    );
  }

  if (!isAuthenticated) {
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
              <Link href="/contact">
                <span className="text-sm font-medium cursor-pointer hover:text-primary transition-colors">Contact</span>
              </Link>
            </div>
          </div>
        </nav>

        {/* Login Required */}
        <div className="flex-grow flex items-center justify-center px-4">
          <Card className="max-w-md w-full">
            <CardHeader className="text-center">
              <CardTitle>Sign In Required</CardTitle>
              <CardDescription>
                Please sign in to access your dashboard and manage your licenses
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center">
              <Button size="lg" onClick={() => window.location.href = getLoginUrl()}>
                Sign In
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  const formatDate = (date: Date | string | null) => {
    if (!date) return "N/A";
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric"
    });
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
            <Link href="/contact">
              <span className="text-sm font-medium cursor-pointer hover:text-primary transition-colors">Contact</span>
            </Link>
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => logout.mutate()}
              disabled={logout.isPending}
            >
              <LogOut className="h-4 w-4 mr-2" />
              Sign Out
            </Button>
          </div>
        </div>
      </nav>

      {/* Dashboard Content */}
      <section className="py-16 px-4 flex-grow">
        <div className="container mx-auto max-w-6xl">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-12"
          >
            <h1 className="text-4xl font-bold mb-2">Dashboard</h1>
            <p className="text-lg text-muted-foreground">
              Welcome back, {user?.name || user?.email}
            </p>
          </motion.div>

          {/* Licenses Section */}
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-semibold">Your Licenses</h2>
              <Link href="/tools">
                <Button variant="outline">Browse Extensions</Button>
              </Link>
            </div>

            {!licenses || licenses.length === 0 ? (
              <Card>
                <CardContent className="p-12 text-center">
                  <AlertCircle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-xl font-semibold mb-2">No Licenses Yet</h3>
                  <p className="text-muted-foreground mb-6">
                    Start with a free trial or purchase a license to get started
                  </p>
                  <Link href="/tools">
                    <Button>Explore Extensions</Button>
                  </Link>
                </CardContent>
              </Card>
            ) : (
              <div className="grid grid-cols-1 gap-6">
                {licenses.map((license: any, index: number) => (
                  <motion.div
                    key={license.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <Card>
                      <CardHeader>
                        <div className="flex items-start justify-between">
                          <div>
                            <CardTitle className="text-xl mb-2">
                              {license.extension?.name || "Extension"}
                            </CardTitle>
                            <CardDescription>
                              {license.extension?.description || "SketchUp Extension"}
                            </CardDescription>
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
                              <p className="text-sm text-muted-foreground font-mono break-all">
                                {license.licenseKey}
                              </p>
                            </div>
                          </div>
                          <div className="flex items-start space-x-3">
                            <Calendar className="h-5 w-5 text-primary mt-0.5" />
                            <div>
                              <p className="text-sm font-medium mb-1">Activated</p>
                              <p className="text-sm text-muted-foreground">
                                {formatDate(license.activatedAt)}
                              </p>
                            </div>
                          </div>
                          <div className="flex items-start space-x-3">
                            <Calendar className="h-5 w-5 text-primary mt-0.5" />
                            <div>
                              <p className="text-sm font-medium mb-1">
                                {license.status === "trial" ? "Trial Expires" : "Expires"}
                              </p>
                              <p className="text-sm text-muted-foreground">
                                {license.expiresAt ? formatDate(license.expiresAt) : "Never"}
                              </p>
                            </div>
                          </div>
                        </div>

                        <div className="flex gap-3 flex-wrap">
                          {license.extension?.downloadUrl && (
                            <Button 
                              variant="default"
                              onClick={() => {
                                window.open(license.extension.downloadUrl, "_blank");
                                toast.success("Download started");
                              }}
                            >
                              <Download className="h-4 w-4 mr-2" />
                              Download Extension
                            </Button>
                          )}
                          {license.status === "trial" && (
                            <Link href={`/purchase/${license.extension?.slug}`}>
                              <Button variant="outline">
                                Upgrade to Full License
                              </Button>
                            </Link>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            )}
          </div>

          {/* Help Section */}
          <Card className="mt-12 bg-muted/50">
            <CardContent className="p-8">
              <h3 className="text-lg font-semibold mb-4">Need Help?</h3>
              <p className="text-muted-foreground mb-4">
                If you have any questions about your licenses or need technical support, 
                we're here to help.
              </p>
              <Link href="/contact">
                <Button variant="outline">Contact Support</Button>
              </Link>
            </CardContent>
          </Card>
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

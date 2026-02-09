import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { Mail, MessageSquare, Send } from "lucide-react";
import { useState } from "react";
import { trpc } from "@/lib/trpc";
import { toast } from "sonner";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });

  const submitLead = trpc.leads.submit.useMutation({
    onSuccess: () => {
      toast.success("Message sent successfully! We'll get back to you soon.");
      setFormData({ name: "", email: "", message: "" });
    },
    onError: (error) => {
      toast.error("Failed to send message. Please try again.");
      console.error(error);
    }
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    submitLead.mutate(formData);
  };

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
                <span className="text-sm font-medium cursor-pointer hover:text-primary transition-colors">Download</span>
              </Link>
              <Link href="/faq">
                <span className="text-sm font-medium cursor-pointer hover:text-primary transition-colors">FAQ</span>
              </Link>
            </div>
          </div>
        </nav>
      </div>

      {/* Header */}
      <section className="py-16 px-4 border-b pt-24">
        <div className="container mx-auto max-w-3xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
              Get in Touch
            </h1>
            <p className="text-lg text-muted-foreground">
              Have questions about our extensions? Need custom development? 
              We're here to help.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Form */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Card>
                <CardContent className="p-8">
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                      <Label htmlFor="name">Name *</Label>
                      <Input
                        id="name"
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="Your full name"
                        className="mt-2"
                      />
                    </div>
                    <div>
                      <Label htmlFor="email">Email *</Label>
                      <Input
                        id="email"
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="your@email.com"
                        className="mt-2"
                      />
                    </div>
                    <div>
                      <Label htmlFor="message">Message *</Label>
                      <Textarea
                        id="message"
                        required
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        placeholder="Tell us about your project or question..."
                        className="mt-2 min-h-[150px]"
                      />
                    </div>
                    <Button 
                      type="submit" 
                      size="lg" 
                      className="w-full"
                      disabled={submitLead.isPending}
                    >
                      {submitLead.isPending ? "Sending..." : "Send Message"}
                      <Send className="ml-2 h-4 w-4" />
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </motion.div>

            {/* Info */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="space-y-8"
            >
              <div>
                <h2 className="text-2xl font-bold mb-4">Let's Talk</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Whether you need help with an existing extension, want to discuss custom development, 
                  or have questions about licensing, we're here to assist you.
                </p>
              </div>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <div className="flex items-center justify-center h-10 w-10 rounded-lg bg-primary/10 flex-shrink-0">
                      <Mail className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">Email Support</h3>
                      <p className="text-sm text-muted-foreground">
                        We typically respond within 24 hours
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <div className="flex items-center justify-center h-10 w-10 rounded-lg bg-primary/10 flex-shrink-0">
                      <MessageSquare className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">Custom Development</h3>
                      <p className="text-sm text-muted-foreground">
                        Need a custom extension or tool? Let's discuss your requirements
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <div className="bg-muted/50 rounded-lg p-6">
                <h3 className="font-semibold mb-2">Before You Contact Us</h3>
                <ul className="text-sm text-muted-foreground space-y-2">
                  <li>• Check our documentation for common questions</li>
                  <li>• Include your software version for technical issues</li>
                  <li>• Describe your workflow for custom development inquiries</li>
                </ul>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

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

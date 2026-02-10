import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import Navigation from "@/components/Navigation";
import { Download, BookOpen, HelpCircle, Mail } from "lucide-react";

export default function Resources() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />

      {/* Downloads Section */}
      <section id="downloads" className="py-16 px-4 pt-32">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-12">
            <Download className="h-12 w-12 text-primary mx-auto mb-4" />
            <h1 className="text-4xl font-bold mb-4">Downloads</h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Get the latest versions of our extensions
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            <Card>
              <CardHeader>
                <CardTitle>PARAMETRIX</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">Version 1.0.0</p>
                <Button className="w-full">
                  <Download className="mr-2 h-4 w-4" />
                  Download
                </Button>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>AutoNestCut</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">Version 1.0.0</p>
                <Button className="w-full">
                  <Download className="mr-2 h-4 w-4" />
                  Download
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Tutorials Section */}
      <section id="tutorials" className="py-16 px-4 bg-muted/50">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-12">
            <BookOpen className="h-12 w-12 text-primary mx-auto mb-4" />
            <h2 className="text-4xl font-bold mb-4">Tutorials</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Step-by-step guides to get you started
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
            <Card>
              <CardHeader>
                <CardTitle>Getting Started</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">Learn the basics of installation and setup</p>
                <Button variant="outline" className="w-full">View Tutorial</Button>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Advanced Features</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">Explore advanced capabilities and workflows</p>
                <Button variant="outline" className="w-full">View Tutorial</Button>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Tips & Tricks</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">Pro tips to maximize your productivity</p>
                <Button variant="outline" className="w-full">View Tutorial</Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-16 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-12">
            <HelpCircle className="h-12 w-12 text-primary mx-auto mb-4" />
            <h2 className="text-4xl font-bold mb-4">Frequently Asked Questions</h2>
          </div>
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger>How do I install the extensions?</AccordionTrigger>
              <AccordionContent>
                Download the .rbz file and install it through Extension Manager in SketchUp.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger>What versions are supported?</AccordionTrigger>
              <AccordionContent>
                Our extensions support SketchUp 2019 and later versions.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger>Do you offer refunds?</AccordionTrigger>
              <AccordionContent>
                Yes, we offer a 30-day money-back guarantee on all purchases.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-4">
              <AccordionTrigger>How do I get support?</AccordionTrigger>
              <AccordionContent>
                Contact us through the form below or email us directly at support@studio.com
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-16 px-4 bg-muted/50">
        <div className="container mx-auto max-w-2xl">
          <div className="text-center mb-12">
            <Mail className="h-12 w-12 text-primary mx-auto mb-4" />
            <h2 className="text-4xl font-bold mb-4">Contact Us</h2>
            <p className="text-lg text-muted-foreground">
              Have questions? We're here to help
            </p>
          </div>
          <Card>
            <CardContent className="p-6">
              <form className="space-y-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">Name</label>
                  <Input placeholder="Your name" />
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">Email</label>
                  <Input type="email" placeholder="your@email.com" />
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">Message</label>
                  <Textarea placeholder="How can we help?" rows={5} />
                </div>
                <Button className="w-full">Send Message</Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <div className="flex justify-center py-8">
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

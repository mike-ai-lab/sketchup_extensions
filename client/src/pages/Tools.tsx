import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { EXTENSIONS } from "@shared/extensions";

interface ProductCardProps {
  id: string;
  name: string;
  description: string;
  index: number;
}

const ProductCard: React.FC<ProductCardProps> = ({ id, name, description, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -5, boxShadow: "0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)" }}
      className="bg-card border border-border rounded-xl overflow-hidden flex flex-col"
    >
      <div className="bg-secondary aspect-video flex items-center justify-center">
        <div className="text-6xl text-muted-foreground/20">📦</div>
      </div>
      <div className="p-6 flex-grow flex flex-col">
        <h3 className="text-xl font-semibold text-card-foreground">{name}</h3>
        <p className="mt-2 text-muted-foreground text-sm flex-grow line-clamp-3">{description}</p>
        <Link href={`/tools/${id}`}>
          <Button variant="secondary" className="mt-6 w-full">
            View Details
          </Button>
        </Link>
      </div>
    </motion.div>
  );
};

export default function Tools() {
  const products = Object.entries(EXTENSIONS);

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
            <Link href="/pricing">
              <span className="text-sm font-medium cursor-pointer hover:text-primary transition-colors">Pricing</span>
            </Link>
            <Link href="/contact">
              <span className="text-sm font-medium cursor-pointer hover:text-primary transition-colors">Contact</span>
            </Link>
            <Link href="/dashboard">
              <Button variant="outline" size="sm">Dashboard</Button>
            </Link>
          </div>
        </div>
      </nav>

      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold tracking-tight">Our Tools</h1>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
            Professional SketchUp extensions designed to streamline your workflow
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map(([key, product], index) => (
            <ProductCard 
              key={key} 
              id={key} 
              name={product.name} 
              description={product.description} 
              index={index} 
            />
          ))}
        </div>
      </div>

      {/* Footer */}
      <footer className="py-8 px-4 border-t bg-background mt-auto">
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

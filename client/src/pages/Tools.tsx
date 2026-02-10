import { Link } from "wouter";
import { motion } from "framer-motion";
import { EXTENSIONS } from "@shared/extensions";
import { Bookmark } from "lucide-react";
import { useState } from "react";
import Navigation from "@/components/Navigation";

interface ProductCardProps {
  id: string;
  name: string;
  description: string;
  index: number;
}

const ProductCard: React.FC<ProductCardProps> = ({ id, name, description, index }) => {
  const [isSaved, setIsSaved] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.08 }}
      className="w-[252px] h-[265px]"
    >
      <Link href={`/tools/${id}`}>
        <div className="w-full h-full bg-white dark:bg-card rounded-[30px] shadow-[15px_15px_30px_#bebebe,-15px_-15px_30px_#ffffff] dark:shadow-[15px_15px_30px_rgba(0,0,0,0.2),-15px_-15px_30px_rgba(255,255,255,0.05)] transition-all duration-200 hover:shadow-[0px_10px_20px_rgba(0,0,0,0.15)] hover:-translate-y-1 cursor-pointer overflow-hidden flex flex-col">
          {/* Image Section with Gradient */}
          <div className="w-full h-[132.5px] bg-primary flex items-start justify-end p-5 flex-shrink-0">
            <button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setIsSaved(!isSaved);
              }}
              className="w-[30px] h-[30px] bg-white rounded-[10px] flex items-center justify-center transition-transform duration-200 hover:scale-110 hover:rotate-[10deg]"
            >
              <Bookmark 
                className={`w-[15px] h-[15px] transition-all duration-200 ${
                  isSaved ? 'fill-[#ced8de] stroke-[#ced8de]' : 'stroke-[#ced8de]'
                }`}
              />
            </button>
          </div>

          {/* Text Section */}
          <div className="flex-1 px-5 py-4 flex flex-col justify-between">
            <div>
              <h3 className="text-[15px] font-semibold text-black dark:text-white mb-1 leading-tight">
                {name}
              </h3>
              <p className="text-[#999999] text-[13px] leading-snug line-clamp-2">
                {description}
              </p>
            </div>
            <div className="w-fit px-2.5 py-1.5 bg-[#e3fff9] dark:bg-[#e3fff9]/10 rounded-[10px] flex items-center gap-2">
              <svg className="w-[17px] h-[17px] flex-shrink-0" viewBox="0 0 512 512" fill="none">
                <path d="M165,68.715l-26.327-26.327l37.363-37.363c3.739-3.739,9.801-3.739,13.54,0l12.786,12.786c3.739,3.739,3.739,9.801,0,13.54L165,68.715z" fill="#3D6687"/>
                <path d="M234.998,101.725l-26.327-26.327l37.363-37.363c3.739-3.739,9.801-3.739,13.54,0l12.786,12.786c3.739,3.739,3.739,9.801,0,13.54L234.998,101.725z" fill="#3D6687"/>
                <path d="M104.914,432.283c-17.494,8.348-35.767-9.925-27.419-27.419c18.554-38.883,42.253-75.095,70.46-107.661L341.791,73.417c28.676-33.108,69.054-53.832,112.672-57.831l11.885-1.089c16.568-1.519,30.453,12.365,28.935,28.934l-1.089,11.885c-3.999,43.617-24.724,83.995-57.831,112.672L212.576,361.824C180.009,390.03,143.799,413.73,104.914,432.283z" fill="#61AFF6"/>
              </svg>
              <span className="text-[13px] font-medium text-[#9198e5]">
                Extension
              </span>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default function Tools() {
  const products = Object.entries(EXTENSIONS);

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />

      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 pt-32">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold tracking-tight">Tools</h1>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
            Professional extensions designed to streamline complex design workflows
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center">
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

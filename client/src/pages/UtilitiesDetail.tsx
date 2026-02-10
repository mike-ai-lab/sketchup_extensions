import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import Navigation from "@/components/Navigation";
import { useState, useMemo } from "react";
import { 
  Ruler, Layers, Grid3x3, RotateCw, 
  FileCode, AlignCenter, Download, X, CheckCircle2, Search 
} from "lucide-react";

export default function UtilitiesDetail() {
  const [selectedUtility, setSelectedUtility] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [selectedPrice, setSelectedPrice] = useState<string>("All");
  const [showAvailableOnly, setShowAvailableOnly] = useState(false);

  const categories = ["All", "Modeling", "Organization", "Export", "Measurement"];
  const priceFilters = ["All", "Free", "Paid"];

  const utilities = [
    {
      icon: AlignCenter,
      title: "Quick Align",
      description: "Rapidly align components and groups with precision snapping",
      category: "Modeling",
      price: "Free",
      downloadUrl: null,
      fullDescription: "Quick Align is a powerful alignment tool that helps you precisely position components and groups in your SketchUp models. With intelligent snapping and multiple alignment modes, you can align objects to edges, centers, or custom points with ease.",
      features: [
        "Multiple alignment modes (left, center, right, top, middle, bottom)",
        "Smart snapping to edges and centers",
        "Batch alignment for multiple objects",
        "Keyboard shortcuts for quick access",
        "Undo/redo support"
      ],
      requirements: "SketchUp 2019 or later"
    },
    {
      icon: Layers,
      title: "Layer Manager",
      description: "Advanced layer organization and batch operations",
      category: "Organization",
      price: "Free",
      downloadUrl: null,
      fullDescription: "Layer Manager provides advanced layer organization capabilities with batch operations, search functionality, and visual hierarchy management. Perfect for complex models with many layers.",
      features: [
        "Batch layer operations (show/hide, lock/unlock)",
        "Search and filter layers",
        "Layer hierarchy visualization",
        "Quick layer assignment",
        "Export/import layer configurations"
      ],
      requirements: "SketchUp 2019 or later"
    },
    {
      icon: Grid3x3,
      title: "Array Tools",
      description: "Create linear, circular, and grid arrays with ease",
      category: "Modeling",
      price: "$9",
      downloadUrl: null,
      fullDescription: "Array Tools enables you to create complex patterns and arrays with precision. Generate linear, circular, and grid arrays with full control over spacing, rotation, and distribution.",
      features: [
        "Linear arrays with custom spacing",
        "Circular arrays with rotation control",
        "Grid arrays with row/column configuration",
        "Preview before creation",
        "Component instance support"
      ],
      requirements: "SketchUp 2019 or later"
    },
    {
      icon: RotateCw,
      title: "Rotate Helper",
      description: "Precise rotation with angle snapping and visual guides",
      category: "Modeling",
      price: "Free",
      downloadUrl: null,
      fullDescription: "Rotate Helper simplifies rotation operations with visual guides, angle snapping, and precise input controls. Perfect for creating symmetrical designs and precise angular adjustments.",
      features: [
        "Visual rotation guides",
        "Angle snapping (15°, 30°, 45°, 90°)",
        "Custom angle input",
        "Rotation around custom points",
        "Real-time preview"
      ],
      requirements: "SketchUp 2019 or later"
    },
    {
      icon: FileCode,
      title: "LSP Exporter",
      description: "Export geometry to AutoCAD LISP format for CAD integration",
      category: "Export",
      price: "$15",
      downloadUrl: null,
      fullDescription: "LSP Exporter bridges SketchUp and AutoCAD by exporting your geometry as AutoCAD LISP scripts. Maintain geometry accuracy and layer organization when transferring models to CAD workflows.",
      features: [
        "Export to .LSP format",
        "Preserve layer structure",
        "Maintain geometry accuracy",
        "Support for lines, arcs, and polylines",
        "Compatible with AutoCAD 2018+",
        "Batch export multiple objects"
      ],
      requirements: "SketchUp 2019 or later, AutoCAD 2018+"
    },
    {
      icon: Ruler,
      title: "Quick Measure",
      description: "Fast measurement tools with annotation capabilities",
      category: "Measurement",
      price: "Free",
      downloadUrl: null,
      fullDescription: "Quick Measure provides fast and accurate measurement tools with annotation capabilities. Create dimension lines, measure distances, and add notes directly in your model.",
      features: [
        "Quick distance measurements",
        "Dimension line creation",
        "Angle measurements",
        "Area calculations",
        "Annotation tools",
        "Export measurements to CSV"
      ],
      requirements: "SketchUp 2019 or later"
    },
    {
      icon: X,
      title: "Delete Tool",
      description: "Enhanced delete functionality with smart selection and cleanup",
      category: "Modeling",
      price: "Free",
      downloadUrl: "/downloads/utilities/DeleteTool.rbz",
      fullDescription: "Delete Tool enhances SketchUp's native delete functionality with smart selection, batch operations, and automatic cleanup. Remove unwanted geometry quickly while maintaining model integrity.",
      features: [
        "Smart selection of related geometry",
        "Batch delete operations",
        "Automatic cleanup of orphaned edges",
        "Undo/redo support",
        "Keyboard shortcuts",
        "Safe delete with confirmation"
      ],
      requirements: "SketchUp 2019 or later"
    }
  ];

  // Filtering logic
  const filteredUtilities = useMemo(() => {
    return utilities.filter(utility => {
      // Search filter
      const matchesSearch = searchQuery === "" || 
        utility.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        utility.description.toLowerCase().includes(searchQuery.toLowerCase());

      // Category filter
      const matchesCategory = selectedCategory === "All" || utility.category === selectedCategory;

      // Price filter
      const matchesPrice = selectedPrice === "All" || 
        (selectedPrice === "Free" && utility.price === "Free") ||
        (selectedPrice === "Paid" && utility.price !== "Free");

      // Availability filter
      const matchesAvailability = !showAvailableOnly || utility.downloadUrl !== null;

      return matchesSearch && matchesCategory && matchesPrice && matchesAvailability;
    });
  }, [searchQuery, selectedCategory, selectedPrice, showAvailableOnly, utilities]);

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />

      {/* Hero Section */}
      <section className="py-16 px-4 bg-gradient-to-b from-primary/5 to-background pt-32">
        <div className="container mx-auto max-w-7xl text-center">
          <Badge className="mb-4">Utility Extensions</Badge>
          <h1 className="text-5xl font-bold tracking-tight mb-4">Utilities Collection</h1>
          <p className="text-xl text-muted-foreground mb-6 max-w-3xl mx-auto leading-relaxed">
            A collection of smaller, focused extensions designed to enhance your SketchUp workflow. 
            From quick alignment tools to CAD export utilities.
          </p>
        </div>
      </section>

      {/* Utilities Grid */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-7xl">
          {/* Search and Filters */}
          <div className="mb-8 space-y-4">
            {/* Search Bar */}
            <div className="relative max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search utilities..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>

            {/* Filters */}
            <div className="flex flex-wrap gap-4 items-center">
              {/* Category Filter */}
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium">Category:</span>
                <div className="flex gap-2">
                  {categories.map((category) => (
                    <Button
                      key={category}
                      variant={selectedCategory === category ? "default" : "outline"}
                      size="sm"
                      onClick={() => setSelectedCategory(category)}
                    >
                      {category}
                    </Button>
                  ))}
                </div>
              </div>

              {/* Price Filter */}
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium">Price:</span>
                <div className="flex gap-2">
                  {priceFilters.map((price) => (
                    <Button
                      key={price}
                      variant={selectedPrice === price ? "default" : "outline"}
                      size="sm"
                      onClick={() => setSelectedPrice(price)}
                    >
                      {price}
                    </Button>
                  ))}
                </div>
              </div>

              {/* Availability Toggle */}
              <Button
                variant={showAvailableOnly ? "default" : "outline"}
                size="sm"
                onClick={() => setShowAvailableOnly(!showAvailableOnly)}
              >
                <Download className="mr-2 h-4 w-4" />
                Available Only
              </Button>

              {/* Results Count */}
              <span className="text-sm text-muted-foreground ml-auto">
                {filteredUtilities.length} {filteredUtilities.length === 1 ? 'utility' : 'utilities'} found
              </span>
            </div>
          </div>

          {/* Utilities Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredUtilities.length > 0 ? (
              filteredUtilities.map((utility, index) => {
                const originalIndex = utilities.indexOf(utility);
                return (
                  <Card 
                    key={originalIndex} 
                    className="hover:shadow-[0px_10px_20px_rgba(0,0,0,0.15)] hover:-translate-y-1 transition-all duration-200 cursor-pointer flex flex-col h-full relative"
                    onClick={() => setSelectedUtility(originalIndex)}
                  >
                    {utility.downloadUrl && (
                      <div className="absolute top-3 right-3 z-10">
                        <Badge variant="default" className="bg-green-600 hover:bg-green-700">
                          Available
                        </Badge>
                      </div>
                    )}
                    <CardHeader className="flex-shrink-0">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center justify-center h-12 w-12 rounded-lg bg-primary/10">
                          <utility.icon className="h-6 w-6 text-primary" />
                        </div>
                        <Badge variant={utility.price === "Free" ? "secondary" : "default"}>
                          {utility.price}
                        </Badge>
                      </div>
                      <CardTitle className="text-xl">{utility.title}</CardTitle>
                      <Badge variant="outline" className="w-fit mt-2">
                        {utility.category}
                      </Badge>
                    </CardHeader>
                    <CardContent className="flex flex-col flex-1">
                      <p className="text-muted-foreground mb-4 flex-1">{utility.description}</p>
                      <Button 
                        variant="outline"
                        className="w-full mt-auto"
                      >
                        Read More
                      </Button>
                    </CardContent>
                  </Card>
                );
              })
            ) : (
              <div className="col-span-full text-center py-12">
                <p className="text-lg text-muted-foreground">No utilities found matching your filters.</p>
                <Button 
                  variant="outline" 
                  className="mt-4"
                  onClick={() => {
                    setSearchQuery("");
                    setSelectedCategory("All");
                    setSelectedPrice("All");
                    setShowAvailableOnly(false);
                  }}
                >
                  Clear Filters
                </Button>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Utility Detail Modal */}
      <Dialog open={selectedUtility !== null} onOpenChange={(open) => !open && setSelectedUtility(null)}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-hidden rounded-2xl">
          {selectedUtility !== null && (
            <div className="overflow-y-auto max-h-[calc(90vh-2rem)] pr-2 custom-scrollbar">
              <DialogHeader>
                <div className="flex items-center gap-4 mb-4">
                  <div className="flex items-center justify-center h-16 w-16 rounded-lg bg-primary/10">
                    {(() => {
                      const Icon = utilities[selectedUtility].icon;
                      return <Icon className="h-8 w-8 text-primary" />;
                    })()}
                  </div>
                  <div className="flex-1">
                    <DialogTitle className="text-2xl">{utilities[selectedUtility].title}</DialogTitle>
                    <div className="flex items-center gap-2 mt-2">
                      <Badge variant="outline">{utilities[selectedUtility].category}</Badge>
                      <Badge variant={utilities[selectedUtility].price === "Free" ? "secondary" : "default"}>
                        {utilities[selectedUtility].price}
                      </Badge>
                    </div>
                  </div>
                </div>
                <DialogDescription className="text-base leading-relaxed">
                  {utilities[selectedUtility].fullDescription}
                </DialogDescription>
              </DialogHeader>

              <div className="space-y-6 mt-6">
                {/* Features */}
                <div>
                  <h3 className="text-lg font-semibold mb-3">Features</h3>
                  <div className="space-y-2">
                    {utilities[selectedUtility].features.map((feature, idx) => (
                      <div key={idx} className="flex items-start gap-2">
                        <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                        <span className="text-muted-foreground">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Requirements */}
                <div>
                  <h3 className="text-lg font-semibold mb-2">Requirements</h3>
                  <p className="text-muted-foreground">{utilities[selectedUtility].requirements}</p>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3 pt-4 border-t">
                  {utilities[selectedUtility].price === "Free" ? (
                    utilities[selectedUtility].downloadUrl ? (
                      <a href={utilities[selectedUtility].downloadUrl!} download className="flex-1">
                        <Button className="w-full" size="lg">
                          <Download className="mr-2 h-5 w-5" />
                          Download Free
                        </Button>
                      </a>
                    ) : (
                      <Button className="flex-1" size="lg" disabled>
                        <Download className="mr-2 h-5 w-5" />
                        Coming Soon
                      </Button>
                    )
                  ) : (
                    <>
                      <Button className="flex-1" size="lg">
                        Purchase {utilities[selectedUtility].price}
                      </Button>
                      <Button variant="outline" size="lg">
                        <Download className="mr-2 h-5 w-5" />
                        Try Demo
                      </Button>
                    </>
                  )}
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* LSP Export Special Section */}
      <section className="py-16 px-4 bg-muted/50">
        <div className="container mx-auto max-w-5xl">
          <Card className="border-2">
            <CardContent className="p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                <div>
                  <Badge className="mb-4">CAD Integration</Badge>
                  <h2 className="text-3xl font-bold mb-4">LSP Exporter</h2>
                  <p className="text-muted-foreground mb-6 leading-relaxed">
                    Bridge the gap between SketchUp and AutoCAD with our LSP Exporter. 
                    Export your SketchUp geometry as AutoCAD LISP scripts for seamless 
                    integration with CAD workflows.
                  </p>
                  <div className="space-y-3 mb-6">
                    <div className="flex items-center gap-2">
                      <FileCode className="h-5 w-5 text-primary" />
                      <span>Export to .LSP format</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <FileCode className="h-5 w-5 text-primary" />
                      <span>Compatible with AutoCAD 2018+</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <FileCode className="h-5 w-5 text-primary" />
                      <span>Preserves geometry and layers</span>
                    </div>
                  </div>
                  <Button size="lg">
                    Purchase for $15 <Download className="ml-2 h-5 w-5" />
                  </Button>
                </div>
                <div className="bg-gradient-to-br from-primary/10 to-primary/5 rounded-lg p-8 flex items-center justify-center">
                  <FileCode className="w-32 h-32 text-primary/30" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Bundle Offer */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-4xl">
          <Card className="border-2 border-primary">
            <CardContent className="p-8 text-center">
              <h2 className="text-3xl font-bold mb-4">Utilities Bundle</h2>
              <p className="text-lg text-muted-foreground mb-6">
                Get all paid utilities at a discounted price
              </p>
              <div className="flex items-center justify-center gap-4 mb-6">
                <span className="text-2xl text-muted-foreground line-through">$24</span>
                <span className="text-4xl font-bold text-primary">$19</span>
                <Badge>Save $5</Badge>
              </div>
              <Button size="lg" className="text-base px-8">
                Purchase Bundle
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Footer */}
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

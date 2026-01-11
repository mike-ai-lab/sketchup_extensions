/**
 * Extension metadata configuration
 * This file serves as the single source of truth for extension information
 * Update this file when swapping extension versions or adding new extensions
 */

export interface ExtensionMetadata {
  slug: string;
  name: string;
  tagline: string;
  description: string;
  price: number; // in USD
  trialDays: number;
  features: string[];
  demoVideoUrl?: string;
  documentationUrl?: string;
  githubUrl?: string;
  downloadUrl?: string;
  iconUrl?: string;
  screenshots?: string[];
}

export const EXTENSIONS: Record<string, ExtensionMetadata> = {
  parametrix: {
    slug: "parametrix",
    name: "PARAMETRIX",
    tagline: "Professional Parametric Cladding Layout Generator",
    description:
      "PARAMETRIX is a professional SketchUp extension designed for architects, designers, and construction professionals who need to create precise parametric cladding layouts. Generate complex multi-face layouts with advanced trimming, rail systems, and pattern synchronization.",
    price: 49.0,
    trialDays: 7,
    features: [
      "Multi-Face Layouts - Synchronized layouts across multiple faces",
      "Advanced Trimming - Automatic boolean trimming for perfect fit",
      "Rail Systems - Integrated top and bottom rail generation",
      "Pattern Control - Running bond and stack bond patterns",
      "Preset Management - Save and load configuration presets",
      "Single-Row Mode - Generate single horizontal rows",
      "Professional Components - Proper 2D behavior and wall cutting",
    ],
    githubUrl: "https://github.com/mike-ai-lab/parametrix",
    screenshots: [],
  },
  autonestcut: {
    slug: "autonestcut",
    name: "AutoNestCut",
    tagline: "Intelligent Cut List and Nesting Optimization",
    description:
      "AutoNestCut is a powerful SketchUp extension that generates optimized cutting lists and automatically nests parts for efficient material usage. Perfect for woodworkers, furniture makers, and fabricators.",
    price: 49.0,
    trialDays: 7,
    features: [
      "Automatic Cut List Generation - Extract all components with dimensions",
      "Intelligent Nesting - Optimize material usage and reduce waste",
      "Material Management - Track different materials and thicknesses",
      "Export Options - CSV, PDF, and interactive HTML reports",
      "Assembly Viewer - Visualize component relationships",
      "Grain Direction - Respect wood grain orientation",
    ],
    githubUrl: "https://github.com/mike-ai-lab/cutlist",
    screenshots: [],
  },
};

/**
 * Get extension by slug
 */
export function getExtension(slug: string): ExtensionMetadata | undefined {
  return EXTENSIONS[slug];
}

/**
 * Get all active extensions
 */
export function getAllExtensions(): ExtensionMetadata[] {
  return Object.values(EXTENSIONS);
}

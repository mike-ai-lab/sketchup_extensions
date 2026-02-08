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
    description: "PARAMETRIX is a professional SketchUp extension designed for architects, designers, and construction professionals who need to create precise parametric cladding layouts. Generate complex multi-face layouts with advanced trimming, rail systems, and pattern synchronization.",
    price: 49.00,
    trialDays: 7,
    features: [
      "Multi-Face Layouts - Synchronized layouts across multiple faces",
      "Advanced Trimming - Automatic boolean trimming for perfect fit",
      "Rail Systems - Integrated top and bottom rail generation",
      "Pattern Control - Running bond and stack bond patterns",
      "Preset Management - Save and load configuration presets",
      "Single-Row Mode - Generate single horizontal rows",
      "Professional Components - Proper 2D behavior and wall cutting"
    ],
    githubUrl: "https://github.com/mike-ai-lab/parametrix",
    screenshots: []
  },
  autonestcut: {
    slug: "autonestcut",
    name: "AutoNestCut",
    tagline: "Intelligent Cut List and Nesting Optimization",
    description: "AutoNestCut is a powerful SketchUp extension that generates optimized cutting lists and automatically nests parts for efficient material usage. Perfect for woodworkers, furniture makers, and fabricators.",
    price: 49.00,
    trialDays: 7,
    features: [
      "Automatic Cut List Generation - Extract all components with dimensions",
      "Intelligent Nesting - Optimize material usage and reduce waste",
      "Material Management - Track different materials and thicknesses",
      "Export Options - CSV, PDF, and interactive HTML reports",
      "Assembly Viewer - Visualize component relationships",
      "Grain Direction - Respect wood grain orientation"
    ],
    githubUrl: "https://github.com/mike-ai-lab/cutlist",
    screenshots: []
  },
  constructlm: {
    slug: "constructlm",
    name: "SPECBASE",
    tagline: "Privacy-First AI Document Chat with RAG",
    description: "SPECBASE is a browser-based AI workspace that lets you upload documents and ask questions with intelligent source citations. All embeddings are generated locally for complete privacy - no data sent to external servers.",
    price: 0,
    trialDays: 0,
    features: [
      "Privacy-First - Local browser embeddings, no data sent to servers",
      "Multi-Document RAG - Upload TXT, MD, CSV, JSON, and PDF files",
      "Dual AI Models - Toggle between Gemini and Cerebras AI",
      "Source Citations - Every answer includes exact source references",
      "Markdown Support - Rich formatting in responses and citations",
      "Chat History - Manage multiple conversation sessions",
      "Offline Capable - Works without internet after initial model download"
    ],
    downloadUrl: "https://specbase.mimevents.com",
    githubUrl: "https://github.com/mike-ai-lab/constructlm",
    screenshots: []
  }
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

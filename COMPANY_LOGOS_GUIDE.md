# Company Logos Implementation Guide

## ✅ What I've Done

Created a reusable `CompanyLogos.tsx` component with logos for all AI providers used in ConstructLM.

## 📦 Component Location

`client/src/components/CompanyLogos.tsx`

## 🎨 Available Logo Components

### 1. **GoogleGeminiLogo**
- Uses official Gemini sparkle SVG from Google's CDN
- Includes "Gemini" text label
- Usage: `<GoogleGeminiLogo />`

### 2. **OpenAILogo**
- SVG path for OpenAI's official logo
- Includes "OpenAI" text label
- Usage: `<OpenAILogo />`

### 3. **AWSLogo**
- SVG path for AWS official logo
- Includes "AWS" text label
- Usage: `<AWSLogo />`

### 4. **GroqLogo**
- Custom gradient badge (orange to red)
- "G" letter in white
- Includes "Groq" text label
- Usage: `<GroqLogo />`

### 5. **CerebrasLogo**
- Custom gradient badge (blue to purple)
- "C" letter in white
- Includes "Cerebras" text label
- Usage: `<CerebrasLogo />`

## 🚀 How to Use

### Basic Usage
```tsx
import { GoogleGeminiLogo, OpenAILogo, GroqLogo } from "@/components/CompanyLogos";

function MyComponent() {
  return (
    <div>
      <GoogleGeminiLogo />
      <OpenAILogo />
      <GroqLogo />
    </div>
  );
}
```

### With Custom Styling
```tsx
<GoogleGeminiLogo className="opacity-60 hover:opacity-100" />
```

### Generic Logo Component
```tsx
import { CompanyLogo } from "@/components/CompanyLogos";

<CompanyLogo name="google" className="h-8" />
<CompanyLogo name="openai" className="h-8" />
```

## 📍 Where It's Used

Currently implemented in:
- `client/src/pages/ConstructlmDetail.tsx` - AI Providers section

## 🎯 How to Get More Logos

### Option 1: Official Brand Resources (Best)
1. **Google**: https://www.google.com/permissions/logos-trademarks/
2. **OpenAI**: https://openai.com/brand
3. **AWS**: https://aws.amazon.com/architecture/icons/
4. **Groq**: https://groq.com/press/ (check for brand assets)
5. **Cerebras**: https://cerebras.ai/press (check for media kit)

### Option 2: Simple Icons (3000+ Logos)
Website: https://simpleicons.org/

**CDN Usage:**
```html
<!-- Direct CDN -->
<img src="https://cdn.simpleicons.org/google" alt="Google" />
<img src="https://cdn.simpleicons.org/openai" alt="OpenAI" />
<img src="https://cdn.simpleicons.org/amazonaws" alt="AWS" />
```

**Available Icons:**
- `google` - Google
- `openai` - OpenAI
- `amazonaws` - AWS
- `anthropic` - Anthropic (Claude)
- `meta` - Meta
- `microsoft` - Microsoft
- Search for more at simpleicons.org

### Option 3: Vector Logo Zone
Website: https://www.vectorlogo.zone/

Free SVG logos with proper licensing.

### Option 4: Extract from Website
1. Visit company website
2. Right-click logo → "Inspect Element"
3. Find `<img>` or `<svg>` tag
4. Copy SVG code or image URL
5. Add to your component

## 🔧 Adding New Logos

### Method 1: Add to CompanyLogos.tsx

```tsx
export const NewCompanyLogo = ({ className = "" }: { className?: string }) => (
  <div className={`flex items-center gap-2 ${className}`}>
    <img 
      src="https://company-cdn.com/logo.svg"
      alt="Company Name"
      className="h-6 w-6"
    />
    <span className="font-bold">Company Name</span>
  </div>
);
```

### Method 2: Use SVG Path

```tsx
export const NewCompanyLogo = ({ className = "" }: { className?: string }) => (
  <div className={`flex items-center gap-2 ${className}`}>
    <svg className="h-6 w-6" viewBox="0 0 24 24" fill="currentColor">
      <path d="YOUR_SVG_PATH_HERE"/>
    </svg>
    <span className="font-bold">Company Name</span>
  </div>
);
```

### Method 3: Custom Gradient Badge

```tsx
export const NewCompanyLogo = ({ className = "" }: { className?: string }) => (
  <div className={`flex items-center gap-2 ${className}`}>
    <div className="h-6 w-6 bg-gradient-to-br from-blue-500 to-green-500 rounded flex items-center justify-center">
      <span className="text-white font-black text-xs">N</span>
    </div>
    <span className="font-bold">New Company</span>
  </div>
);
```

## ⚖️ Legal Considerations

### Trademark Usage Guidelines:
1. **Use official logos** when available from brand resources
2. **Don't modify** official logos (colors, proportions, etc.)
3. **Provide attribution** if required by brand guidelines
4. **Check license** before using third-party logo sources
5. **Fair use** - Generally OK for:
   - Showing integration/compatibility
   - Educational purposes
   - Factual representation

### Safe Practices:
- ✅ Use official brand assets
- ✅ Link to company website
- ✅ Use "as-is" without modification
- ✅ Include proper alt text
- ❌ Don't imply endorsement
- ❌ Don't modify official logos
- ❌ Don't use in misleading ways

## 🎨 Styling Tips

### Consistent Sizing
```tsx
// All logos same height
<GoogleGeminiLogo className="h-6" />
<OpenAILogo className="h-6" />
<GroqLogo className="h-6" />
```

### Dark Mode Support
```tsx
// Invert colors for dark backgrounds
<img 
  src="logo.svg" 
  className="dark:invert" 
/>
```

### Hover Effects
```tsx
<div className="opacity-60 hover:opacity-100 transition-opacity">
  <GoogleGeminiLogo />
</div>
```

### Grid Layout
```tsx
<div className="grid grid-cols-3 gap-6">
  <GoogleGeminiLogo />
  <OpenAILogo />
  <GroqLogo />
</div>
```

## 📚 Resources

### Logo Databases:
- **Simple Icons**: https://simpleicons.org/ (3000+ brand logos)
- **Vector Logo Zone**: https://www.vectorlogo.zone/
- **Seeklogo**: https://seeklogo.com/
- **Brandfetch**: https://brandfetch.com/

### SVG Tools:
- **SVGOMG**: https://jakearchibald.github.io/svgomg/ (optimize SVGs)
- **SVG to JSX**: https://svg2jsx.com/ (convert SVG to React)

### Brand Guidelines:
- **Google**: https://about.google/brand-resource-center/
- **OpenAI**: https://openai.com/brand
- **AWS**: https://aws.amazon.com/trademark-guidelines/
- **Microsoft**: https://www.microsoft.com/en-us/legal/intellectualproperty/trademarks

## 🔄 Next Steps

1. **Test the logos** - Check ConstructLM detail page
2. **Add more logos** - If you need additional companies
3. **Optimize SVGs** - Use SVGOMG to reduce file size
4. **Check licenses** - Verify you can use each logo
5. **Update documentation** - Add any new logos to this guide

## 💡 Pro Tips

1. **Use SVG over PNG** - Scalable, smaller file size, better quality
2. **Lazy load images** - Use `loading="lazy"` for performance
3. **Provide fallbacks** - Text-based logos if image fails to load
4. **Cache CDN logos** - They're fast and cached globally
5. **Test on mobile** - Ensure logos are readable at small sizes

---

**Created:** March 27, 2026  
**Component:** `client/src/components/CompanyLogos.tsx`  
**Status:** ✅ Ready to use

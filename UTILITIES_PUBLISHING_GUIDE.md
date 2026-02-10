# Utilities Publishing Guide

## Overview
This guide explains how to add and publish new utility extensions to your website.

## Directory Structure
```
public/
  downloads/
    utilities/
      DeleteTool.rbz          ✓ Published
      [YourUtility].rbz       → Add new utilities here
```

## How to Publish a New Utility

### Step 1: Add the RBZ File
1. Place your `.rbz` file in `public/downloads/utilities/`
2. Use a descriptive filename (e.g., `QuickAlign.rbz`, `LayerManager.rbz`)

### Step 2: Update UtilitiesDetail.tsx
Open `client/src/pages/UtilitiesDetail.tsx` and add your utility to the `utilities` array:

```typescript
{
  icon: YourIcon,                    // Import from lucide-react
  title: "Your Tool Name",
  description: "Short description for the card",
  category: "Modeling",              // Modeling, Organization, Export, Measurement
  price: "Free",                     // "Free" or "$X"
  downloadUrl: "/downloads/utilities/YourFile.rbz",  // Path to your file
  fullDescription: "Detailed description shown in modal",
  features: [
    "Feature 1",
    "Feature 2",
    "Feature 3"
  ],
  requirements: "SketchUp 2019 or later"
}
```

### Step 3: Test Locally
1. Run `npm run dev`
2. Navigate to http://localhost:5174/tools/utilities
3. Click on your utility card
4. Test the download button

### Step 4: Deploy
```bash
git add .
git commit -m "Add [UtilityName] to utilities"
git push origin main
```

Netlify will automatically deploy your changes.

## Current Published Utilities

### Delete Tool ✓
- **File**: `DeleteTool.rbz`
- **Status**: Published
- **Category**: Modeling
- **Price**: Free
- **Download URL**: `/downloads/utilities/DeleteTool.rbz`

## Utilities Coming Soon

The following utilities are listed but not yet available for download:
- Quick Align
- Layer Manager
- Array Tools ($9)
- Rotate Helper
- LSP Exporter ($15)
- Quick Measure

## Visual Indicators

- **Green "Available" Badge**: Shows on cards with downloadable files
- **"Coming Soon" Button**: Shows in modal for utilities without files
- **Download Button**: Active download link for published utilities

## Best Practices

1. **File Naming**: Use PascalCase without spaces (e.g., `DeleteTool.rbz`)
2. **File Size**: Keep RBZ files under 5MB for faster downloads
3. **Testing**: Always test downloads locally before deploying
4. **Documentation**: Include clear feature lists and requirements
5. **Icons**: Choose appropriate Lucide icons that represent the tool's function

## Paid Utilities

For paid utilities (price !== "Free"):
- Set `downloadUrl: null` initially
- Implement payment flow before enabling downloads
- Consider adding demo versions

## Support

For issues or questions about publishing utilities, check:
- The utilities array structure in `UtilitiesDetail.tsx`
- File paths in the `public/downloads/utilities/` directory
- Console errors in browser DevTools

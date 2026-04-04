# Tool Distribution Strategy for MIM Events

## Current Situation
- Multiple tools scattered across different directories
- Each tool has its own GitHub repository
- Website needs to distribute these tools to users
- Need centralized management and tracking

## Recommended Distribution Architecture

### Option 1: GitHub Releases (Recommended for Desktop Apps)
**Best for:** Semantra, LexiCode, ConstructLM, Parametrix

#### Setup:
1. **Each tool has its own GitHub repository**
   - `github.com/mimevents/semantra`
   - `github.com/mimevents/lexicode`
   - `github.com/mimevents/constructlm`
   - `github.com/mimevents/parametrix`

2. **Use GitHub Releases for distribution**
   ```
   Semantra v2.7.0
   ├── Semantra-Setup-2.7.0.exe (Windows)
   ├── Semantra-2.7.0.dmg (macOS)
   └── Semantra-2.7.0.AppImage (Linux)
   ```

3. **Website acts as a smart redirector**
   - User clicks "Download" on mimevents.com
   - Backend tracks the download
   - Redirects to GitHub release URL
   - No need to host large files on your server

#### Implementation:
```typescript
// server/routes/downloads.ts
const DOWNLOAD_URLS = {
  'semantra': {
    'windows': (version: string) => 
      `https://github.com/mimevents/semantra/releases/download/v${version}/Semantra-Setup-${version}.exe`,
    'mac': (version: string) => 
      `https://github.com/mimevents/semantra/releases/download/v${version}/Semantra-${version}.dmg`,
    'linux': (version: string) => 
      `https://github.com/mimevents/semantra/releases/download/v${version}/Semantra-${version}.AppImage`
  },
  'lexicode': {
    'windows': (version: string) => 
      `https://github.com/mimevents/lexicode/releases/download/v${version}/LexiCode-Setup-${version}.exe`,
    'mac': (version: string) => 
      `https://github.com/mimevents/lexicode/releases/download/v${version}/LexiCode-${version}.dmg`,
    'linux': (version: string) => 
      `https://github.com/mimevents/lexicode/releases/download/v${version}/LexiCode-${version}.AppImage`
  },
  'constructlm': {
    'windows': (version: string) => 
      `https://github.com/mimevents/constructlm/releases/download/v${version}/ConstructLM-Setup-${version}.exe`,
    'mac': (version: string) => 
      `https://github.com/mimevents/constructlm/releases/download/v${version}/ConstructLM-${version}.dmg`,
    'linux': (version: string) => 
      `https://github.com/mimevents/constructlm/releases/download/v${version}/ConstructLM-${version}.AppImage`
  }
};
```

### Option 2: CDN Hosting (For Smaller Files)
**Best for:** SketchUp extensions (.rbz files), utilities

#### Setup:
1. **Use Vercel Blob Storage or AWS S3**
   - Upload files to cloud storage
   - Get permanent URLs
   - Fast global distribution

2. **File structure:**
   ```
   /downloads/
   ├── parametrix/
   │   ├── v1.0.0/
   │   │   └── Parametrix-1.0.0.rbz
   │   └── v1.1.0/
   │       └── Parametrix-1.1.0.rbz
   ├── utilities/
   │   ├── DeleteTool.rbz
   │   ├── AlignTool.rbz
   │   └── LayerManager.rbz
   ```

### Option 3: Hybrid Approach (Recommended)
**Combine both methods:**

1. **Desktop Apps → GitHub Releases**
   - Semantra
   - LexiCode
   - ConstructLM

2. **SketchUp Extensions → CDN/Vercel**
   - Parametrix
   - Utilities
   - Small tools

3. **Web Apps → Direct Links**
   - DocMark (hosted on docmark.mimevents.com)
   - SpecBase (hosted on specbase.mimevents.com)

## Implementation Steps

### Step 1: Create GitHub Repositories
```bash
# For each tool, create a new repo
gh repo create mimevents/semantra --public
gh repo create mimevents/lexicode --public
gh repo create mimevents/constructlm --public
gh repo create mimevents/parametrix --public
```

### Step 2: Set Up Build & Release Automation
Create `.github/workflows/release.yml` in each repo:

```yaml
name: Build and Release

on:
  push:
    tags:
      - 'v*'

jobs:
  build:
    runs-on: ${{ matrix.os }}
    strategy:
      matrix:
        os: [windows-latest, macos-latest, ubuntu-latest]
    
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
      
      - name: Install dependencies
        run: npm install
      
      - name: Build
        run: npm run build
      
      - name: Package
        run: npm run package
      
      - name: Upload Release Asset
        uses: actions/upload-release-asset@v1
        with:
          upload_url: ${{ github.event.release.upload_url }}
          asset_path: ./dist/${{ matrix.os }}/app.exe
          asset_name: App-${{ matrix.os }}.exe
          asset_content_type: application/octet-stream
```

### Step 3: Update Website Download System

Create a centralized configuration file:

```typescript
// shared/downloads-config.ts
export interface ToolDownload {
  id: string;
  name: string;
  type: 'github' | 'cdn' | 'web';
  currentVersion: string;
  platforms: ('windows' | 'mac' | 'linux')[];
  urls: {
    windows?: string | ((version: string) => string);
    mac?: string | ((version: string) => string);
    linux?: string | ((version: string) => string);
  };
  githubRepo?: string;
  size?: {
    windows?: string;
    mac?: string;
    linux?: string;
  };
}

export const TOOLS: Record<string, ToolDownload> = {
  semantra: {
    id: 'semantra',
    name: 'Semantra',
    type: 'github',
    currentVersion: '2.7.0',
    platforms: ['windows', 'mac', 'linux'],
    githubRepo: 'mimevents/semantra',
    urls: {
      windows: (v) => `https://github.com/mimevents/semantra/releases/download/v${v}/Semantra-Setup-${v}.exe`,
      mac: (v) => `https://github.com/mimevents/semantra/releases/download/v${v}/Semantra-${v}.dmg`,
      linux: (v) => `https://github.com/mimevents/semantra/releases/download/v${v}/Semantra-${v}.AppImage`
    },
    size: {
      windows: '85 MB',
      mac: '92 MB',
      linux: '88 MB'
    }
  },
  lexicode: {
    id: 'lexicode',
    name: 'LexiCode',
    type: 'github',
    currentVersion: '1.0.0',
    platforms: ['windows', 'mac', 'linux'],
    githubRepo: 'mimevents/lexicode',
    urls: {
      windows: (v) => `https://github.com/mimevents/lexicode/releases/download/v${v}/LexiCode-Setup-${v}.exe`,
      mac: (v) => `https://github.com/mimevents/lexicode/releases/download/v${v}/LexiCode-${v}.dmg`,
      linux: (v) => `https://github.com/mimevents/lexicode/releases/download/v${v}/LexiCode-${v}.AppImage`
    }
  },
  constructlm: {
    id: 'constructlm',
    name: 'ConstructLM',
    type: 'github',
    currentVersion: '1.0.0',
    platforms: ['windows', 'mac', 'linux'],
    githubRepo: 'mimevents/constructlm',
    urls: {
      windows: (v) => `https://github.com/mimevents/constructlm/releases/download/v${v}/ConstructLM-Setup-${v}.exe`,
      mac: (v) => `https://github.com/mimevents/constructlm/releases/download/v${v}/ConstructLM-${v}.dmg`,
      linux: (v) => `https://github.com/mimevents/constructlm/releases/download/v${v}/ConstructLM-${v}.AppImage`
    }
  },
  parametrix: {
    id: 'parametrix',
    name: 'Parametrix',
    type: 'cdn',
    currentVersion: '1.0.0',
    platforms: ['windows'], // SketchUp extension
    urls: {
      windows: 'https://mimevents.com/downloads/parametrix/Parametrix-1.0.0.rbz'
    },
    size: {
      windows: '2.5 MB'
    }
  },
  docmark: {
    id: 'docmark',
    name: 'DocMark',
    type: 'web',
    currentVersion: '2.0.0',
    platforms: [],
    urls: {
      windows: 'https://docmark.mimevents.com'
    }
  }
};
```

### Step 4: Update Download Button Component

```typescript
// client/src/components/DownloadButton.tsx
import { TOOLS } from '@/shared/downloads-config';

export function SmartDownloadButton({ toolId }: { toolId: string }) {
  const tool = TOOLS[toolId];
  
  if (!tool) return null;
  
  if (tool.type === 'web') {
    return (
      <a href={tool.urls.windows} target="_blank">
        <button>Launch {tool.name}</button>
      </a>
    );
  }
  
  if (tool.type === 'github' || tool.type === 'cdn') {
    return (
      <PlatformDownloadButton 
        appName={toolId}
        version={tool.currentVersion}
      />
    );
  }
}
```

## Publishing Workflow

### For New Tool Release:

1. **Build the tool in its own directory**
   ```bash
   cd F:/gemini_dictation_and_assistant
   npm run build
   npm run package
   ```

2. **Create GitHub Release**
   ```bash
   git tag v2.7.0
   git push origin v2.7.0
   
   # Upload built files to GitHub release
   gh release create v2.7.0 \
     ./dist/Semantra-Setup-2.7.0.exe \
     ./dist/Semantra-2.7.0.dmg \
     ./dist/Semantra-2.7.0.AppImage \
     --title "Semantra v2.7.0" \
     --notes "Release notes here"
   ```

3. **Update website configuration**
   ```typescript
   // In your website repo
   // shared/downloads-config.ts
   semantra: {
     currentVersion: '2.7.0', // Update this
     // URLs automatically point to new version
   }
   ```

4. **Deploy website**
   ```bash
   git commit -m "Update Semantra to v2.7.0"
   git push
   # Vercel auto-deploys
   ```

## Benefits of This Approach

✅ **Separation of Concerns**
- Each tool has its own repo and development cycle
- Website just needs to know the version number
- No need to copy large files into website repo

✅ **Scalability**
- Add new tools by just updating config
- GitHub handles bandwidth and CDN
- Free hosting for open-source projects

✅ **Analytics**
- Track downloads through your backend
- Know which versions are popular
- Geographic distribution data

✅ **Version Management**
- Easy to maintain multiple versions
- Users can download older versions if needed
- Clear release history

✅ **Automation**
- GitHub Actions builds and releases automatically
- Website updates with config change
- No manual file uploads

## Next Steps

1. **Immediate:** Create GitHub repos for each tool
2. **Short-term:** Set up GitHub Actions for automated builds
3. **Medium-term:** Implement download tracking in your backend
4. **Long-term:** Add auto-update functionality to desktop apps

## Example: Publishing Semantra

```bash
# 1. In Semantra directory
cd F:/gemini_dictation_and_assistant
git init
git remote add origin https://github.com/mimevents/semantra.git

# 2. Build
npm run build
npm run electron:build

# 3. Create release
git tag v2.7.0
git push origin v2.7.0
gh release create v2.7.0 ./dist-build/*.exe --title "Semantra v2.7.0"

# 4. Update website
cd C:/Users/Administrator/sketchup_extensions----MAIN/sketchup_extensions
# Edit shared/downloads-config.ts
git commit -m "Add Semantra v2.7.0"
git push

# Done! Website now distributes Semantra
```

## Cost Analysis

- **GitHub Releases:** FREE (unlimited for public repos)
- **Vercel Blob Storage:** FREE tier: 500MB, then $0.15/GB
- **Bandwidth:** GitHub provides free CDN
- **Your Server:** Only tracks downloads (minimal cost)

## Recommendation

Use **GitHub Releases** for all desktop applications. It's free, reliable, and provides global CDN. Your website becomes a beautiful storefront that tracks analytics while GitHub handles the heavy lifting of file distribution.

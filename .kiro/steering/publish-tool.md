# Publish a New Tool — Agent Runbook

This file is the single source of truth for publishing a new tool to the Studiø website.
When the user says anything like "publish tool X", "add tool Y", or "integrate new tool Z",
follow every step below in order. Do not skip steps.

---

## Philosophy: Extract First, Ask Second

Before asking the user anything, determine the tool type and read its source code.
Most fields can be derived automatically. Only ask the user for the small set of
fields that are genuinely subjective design or marketing decisions.
Ask all required fields in a single message — never one at a time.

---

## Step 0 — Determine Tool Type

Read the source folder the user points you to and classify:

| Type | Signals |
|---|---|
| **SketchUp Extension (.rbz)** | Contains a `.rb` loader file + companion Ruby folder. Uses `Sketchup::Extension.new`, `UI::Toolbar`, `UI::Command`. |
| **Desktop App** | Has `package.json` with `electron` dependency, or is a Python app (`.py` entry point, `requirements.txt`), or a compiled binary. |
| **Web App** | Has `package.json` without Electron, framework files (React/Vue/Next/Vite), no `.rb` files. |

Once classified, jump to the matching extraction section below (0A, 0B, or 0C).

---

## Step 0A — Extract from SketchUp Extension Source

Use PowerShell — file tools cannot read outside the workspace.

### Read the loader file
```powershell
Get-ChildItem "<EXT_FOLDER>" -Filter "*.rb" -Depth 0
Get-Content "<EXT_FOLDER>\<loader_name>.rb"
```

Extract from `Sketchup::Extension.new(...)` and its property assignments:

| Source pattern | Extracted field |
|---|---|
| `Sketchup::Extension.new("<name>", ...)` first arg | `TOOL_NAME` |
| `ext.version = "x.x.x"` | `VERSION` |
| `ext.description = "..."` | `DESCRIPTION_DRAFT` |
| `ext.creator = "..."` | `AUTHOR` |
| `ext.copyright = "..."` | `COPYRIGHT` |
| Loader filename stem | `LOADER_FILE_STEM` |
| Companion subfolder name | `EXTENSION_FOLDER_NAME` |

Derive `TOOL_ID` from the companion folder name: lowercase, strip spaces/dashes/underscores.
Example: `edit_shortcuts_bar` → `editshortcutsbar`. Derive `TOOL_ROUTE` as `/tools/{TOOL_ID}`.

### Read the main plugin file
```powershell
Get-Content "<EXT_FOLDER>\<EXTENSION_FOLDER_NAME>\main.rb"
```

Extract:

| Source pattern | Extracted field |
|---|---|
| `UI::Toolbar.new("<name>")` | Confirms tool name |
| Each `UI::Command.new("<label>") { ... }` + `.tooltip` | One feature entry each |
| `.large_icon` / `.small_icon` paths | Available icon names |
| License/trial check code (`Sketchup.read_default`, `LicenseManager`, etc.) | `IS_PAID` = true if found |

Build `FEATURES_DRAFT` from commands. Build `SPECS_DRAFT`:
- Version: from loader
- Platform: `SketchUp 2017+` (adjust if version guards found)
- OS: `Windows / macOS`
- License: `Free` (no license checks) or `Commercial` (license checks present)
- Format: `.RBZ Extension`
- Author: from loader

### Check for README and icons
```powershell
Get-ChildItem "<EXT_FOLDER>" -Filter "README*" -Recurse | Get-Content
Get-ChildItem "<EXT_FOLDER>" -Include "*.png","*.svg" -Recurse | Select-Object Name
```

README description is usually better than `ext.description` for the website.

---

## Step 0B — Extract from Desktop App Source

Use PowerShell to read outside the workspace.

### Node/Electron app
```powershell
Get-Content "<APP_FOLDER>\package.json"
```

Extract:

| `package.json` field | Extracted field |
|---|---|
| `"name"` | `TOOL_ID` (sanitize: lowercase, no spaces) |
| `"version"` | `VERSION` |
| `"description"` | `DESCRIPTION_DRAFT` |
| `"author"` | `AUTHOR` |
| `"license"` | `LICENSE` |
| `"main"` or `"electron"` key present | Confirms Electron app |
| `"dependencies"` — check for `electron` | `IS_ELECTRON` = true |
| `"scripts"."build"` | Build command reference |

Check for pricing signals:
```powershell
Get-ChildItem "<APP_FOLDER>" -Include "*.js","*.ts" -Recurse | Select-String -Pattern "license|trial|payment|stripe|lemonsqueezy|gumroad" -CaseSensitive:$false | Select-Object -First 10
```

`IS_PAID` = true if payment/license references found.

### Python app
```powershell
Get-Content "<APP_FOLDER>\requirements.txt"  # or pyproject.toml
Get-ChildItem "<APP_FOLDER>" -Filter "*.py" -Depth 0 | Get-Content  # entry point
```

Extract from the entry point `.py` file:
- App name from `__title__`, `APP_NAME`, window title, or top-level docstring
- Version from `__version__` or `VERSION` constant
- Description from docstring or README
- Dependencies from `requirements.txt`

Build `SPECS_DRAFT`:
- Version: extracted
- Platform: `Windows 10 / 11` (default) or `macOS` or `Cross-Platform`
- Runtime: `Python 3.x+` (check `python_requires` or shebang)
- License: from `package.json` / `LICENSE` file
- Format: `.exe Installer` / `.zip Archive` / `Python Script`
- Author: extracted or ask user

### Check for README (all desktop types)
```powershell
Get-ChildItem "<APP_FOLDER>" -Filter "README*" | Get-Content
```

README is the richest source for features, setup steps, and description.

---

## Step 0C — Extract from Web App Source

Use PowerShell to read outside the workspace.

### Read package.json
```powershell
Get-Content "<APP_FOLDER>\package.json"
```

Extract:

| `package.json` field | Extracted field |
|---|---|
| `"name"` | `TOOL_ID` |
| `"version"` | `VERSION` |
| `"description"` | `DESCRIPTION_DRAFT` |
| `"author"` | `AUTHOR` |
| `"license"` | `LICENSE` |
| Framework deps (react, vue, next, nuxt, svelte, astro) | `FRAMEWORK` |
| `"homepage"` | `LIVE_URL` (if already deployed) |
| `"repository"` | `GITHUB_URL` |

### Scan for features and pricing signals
```powershell
# Read the main entry component
Get-ChildItem "<APP_FOLDER>\src" -Filter "App.*" -Recurse | Get-Content

# Check for pricing/payment code
Get-ChildItem "<APP_FOLDER>" -Include "*.js","*.ts","*.tsx","*.jsx" -Recurse | Select-String -Pattern "stripe|lemonsqueezy|gumroad|paywall|premium|pro plan" -CaseSensitive:$false | Select-Object -First 10

# Check for API key requirements
Get-ChildItem "<APP_FOLDER>" -Include "*.env*","*.md" -Recurse | Select-String -Pattern "API_KEY|OPENAI|GEMINI|GROQ" | Select-Object -First 5
```

Build `SPECS_DRAFT`:
- Version: extracted
- Platform: `Web Browser`
- Framework: detected (e.g. `React + Vite`)
- License: from `package.json`
- Hosting: `Self-Hosted` / `Netlify` / `Vercel` (check for config files)
- Cost: `Free + API Key` if AI API required, `Free` if standalone, or extracted from pricing page

### Check README
```powershell
Get-ChildItem "<APP_FOLDER>" -Filter "README*" | Get-Content
```

---

## What You Must Ask the User

After extracting everything above, present a concise summary of what was found,
then ask only for these fields — **in a single message**:

| Field | Why it can't be extracted | Example |
|---|---|---|
| `TOOL_ACCENT_COLOR` | Design decision, no code equivalent | `#f59e0b` |
| `TOOL_TAGLINE` | Marketing copy, not in source | `RAPID PROTOTYPER` |
| `DETAIL_TAGS` | Marketing pills, not in source | `["Multi-Face", "Rail Systems", "Pattern Control"]` |
| `DESCRIPTION_CONFIRMED` | Extracted draft may be too terse — confirm or rewrite | — |
| `FEATURES_CONFIRMED` | Draft lacks Lucide icons — user assigns icons to each feature | — |
| `GITHUB_URL` | Not stored in extension source | `https://github.com/...` or `null` |
| `TOOL_PRICE` | Business decision | `Free` / `$49` / `Free + API Key` |
| `LIVE_URL` *(web apps only)* | May be in package.json but not always | `https://myapp.netlify.app` or `null` |
| `DOWNLOAD_FILE_PATH` *(desktop/RBZ only)* | Path to the distributable file, or confirm it needs to be built | `C:\...\MyTool_v1.0.zip` |

**Existing accent colors to avoid (already in use):**
`#3b82f6` (Parametrix) · `#10b981` (AutoNestCut) · `#6366f1` (SpecBase) · `#ec4899` (ConstructLM) ·
`#06b6d4` (Semantra) · `#10b981` (LexiCode) · `#a855f7` (DocMark) · `#10b981` (SiteTrack) ·
`#f59e0b` (Utilities) · `#10b981` (GeminiDictate) · `#0ea5e9` (Edit Shortcuts Bar)

---

## Step 1 — Package the Distributable (if applicable)

> **Download infrastructure is already set up.** The `DownloadModal` component
> (`client/src/components/DownloadModal.tsx`) handles everything globally:
> - Collects name / email / country from the user
> - Posts the lead to Formspree (ID: `xkjjyeov`) → you receive an email per download
> - Fires a branded confirmation email to the user via the Served backend
>   (`https://autonestcutserver-moeshks-projects.vercel.app/send-download-email`)
>
> **You only need to:** put the file in `client/public/downloads/`, pass the right props to
> `DownloadModal`, and wire a `useState` + button. That's it — no other email or lead config needed.
>
> **Critical:** always use `client/public/downloads/` — NOT root `public/downloads/`.
> Vite's `publicDir` is `client/public/`, so only files there get bundled into `dist/public/`
> and served on Vercel. Files in root `public/` are invisible in production.

### 1A — SketchUp Extension → RBZ

An RBZ is a ZIP renamed `.rbz`. SketchUp requires the loader `.rb` and companion folder at the archive root.

**Required internal structure:**
```
<loader_name>.rb
<extension_folder_name>/
  main.rb
  icons/
  ...
```

```powershell
$src     = "<EXT_FOLDER>"
$staging = "C:\Users\Administrator\Desktop\rbz_staging"
$name    = "<TOOL_NAME_NO_SPACES>_v<VERSION>"   # e.g. EditShortcutsBar_v1.1.0

if (Test-Path $staging) { Remove-Item $staging -Recurse -Force }

New-Item -ItemType Directory -Path "$staging\<ext_folder>\icons" -Force | Out-Null
Copy-Item "$src\<loader>.rb"             "$staging\<loader>.rb"
Copy-Item "$src\<ext_folder>\main.rb"    "$staging\<ext_folder>\main.rb"
Copy-Item "$src\<ext_folder>\icons\*"   "$staging\<ext_folder>\icons\"

$zip = "$staging\_out.zip"
Compress-Archive -Path "$staging\<loader>.rb","$staging\<ext_folder>" -DestinationPath $zip
Copy-Item $zip "C:\Users\Administrator\Desktop\$name.rbz"

# Verify archive contents
Add-Type -AssemblyName System.IO.Compression.FileSystem
$z = [System.IO.Compression.ZipFile]::OpenRead("C:\Users\Administrator\Desktop\$name.rbz")
$z.Entries | ForEach-Object { Write-Host $_.FullName }
$z.Dispose()

Remove-Item $staging -Recurse -Force
```

Copy into the workspace:
```powershell
New-Item -ItemType Directory -Path ".\client\public\downloads" -Force
Copy-Item "C:\Users\Administrator\Desktop\$name.rbz" ".\client\public\downloads\$name.rbz" -Force
Get-Item ".\client\public\downloads\$name.rbz"   # verify size
```

Set `DOWNLOAD_URL = /downloads/$name.rbz`.

### 1B — Desktop App → ZIP or Installer

If the app already has a built distributable (`.exe`, `.zip`, `.dmg`, `.AppImage`):
```powershell
# Copy directly into workspace downloads
New-Item -ItemType Directory -Path ".\public\downloads" -Force
Copy-Item "<PATH_TO_BUILT_FILE>" ".\public\downloads\<TOOL_NAME>_v<VERSION>.<ext>" -Force
Get-Item ".\public\downloads\<TOOL_NAME>_v<VERSION>.<ext>"
```

If it needs to be built first, run the build command found in `package.json` scripts or README, then copy the output.

```powershell
New-Item -ItemType Directory -Path ".\client\public\downloads" -Force
Copy-Item "<PATH_TO_BUILT_FILE>" ".\client\public\downloads\<TOOL_NAME>_v<VERSION>.<ext>" -Force
Get-Item ".\client\public\downloads\<TOOL_NAME>_v<VERSION>.<ext>"
```

Set `DOWNLOAD_URL = /downloads/<TOOL_NAME>_v<VERSION>.<ext>`.

### 1C — Web App → No file needed

Web apps link to a live URL instead of a download. Set `DOWNLOAD_URL = null` and use `LIVE_URL` in the CTA button instead.

---

## Step 2 — Create the Detail Page

Create `client/src/pages/{TOOL_NAME}Detail.tsx`.

The page structure is the same for all tool types but the CTA section differs.
Follow the template below, then apply the CTA variant for your tool type.

```tsx
import { useState } from "react";
import { ArrowRight, Download, ExternalLink, {TOOL_ICON}, {FEATURE_ICONS}, Zap, ShieldCheck, CheckCircle2 } from "lucide-react";
import Header from "../components/Header";
import DownloadModal from "../components/DownloadModal";

const FEATURES = [
  { icon: IconName, title: "...", description: "..." },
  // 3–4 total
];

const SPECS = [
  { label: "Version",   value: "{VERSION}" },
  { label: "Platform",  value: "..." },         // SketchUp 2017+ / Windows 10+ / Web Browser
  { label: "License",   value: "..." },         // Free / MIT / Commercial
  { label: "Format",    value: "..." },         // .RBZ Extension / .exe / Web App
  { label: "Author",    value: "{AUTHOR}" },
  // add relevant rows
];

const TAGS  = {DETAIL_TAGS};
const ACCENT = "{TOOL_ACCENT_COLOR}";

export default function {TOOL_NAME}Detail() {
  const [modalOpen, setModalOpen] = useState(false);
  return (
    <div className="bg-[#050505] min-h-screen text-white font-sans overflow-x-hidden">
      <Header currentPage="tools" />

      {/* Download modal — handles Formspree lead capture + Resend confirmation email automatically */}
      {/* Only include if DOWNLOAD_URL is not null */}
      <DownloadModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        fileName="{TOOL_NAME} v{VERSION}"
        downloadUrl="{DOWNLOAD_URL}"
        accentColor="{TOOL_ACCENT_COLOR}"
      />

      {/* Hero */}
      <section className="pt-40 pb-20 px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div className="space-y-8">
            {/* Badge */}
            <div
              className="inline-flex items-center gap-3 px-3 py-1 border text-[10px] font-black uppercase tracking-widest rounded"
              style={{ backgroundColor: `${ACCENT}1a`, borderColor: `${ACCENT}33`, color: ACCENT }}
            >
              <Zap size={12} /> {TOOL_TAGLINE}
            </div>

            {/* Title */}
            <h1 className="text-[clamp(52px,8vw,90px)] font-black tracking-tighter leading-[0.75] uppercase italic stroke-text">
              {TOOL_NAME}
            </h1>

            {/* Description */}
            <p className="text-white/40 leading-relaxed max-w-lg">{DESCRIPTION_CONFIRMED}</p>

            {/* ── CTA — pick one variant below ── */}
            <div className="flex flex-wrap gap-4 pt-4">
              {/* VARIANT A: Free download (RBZ or desktop app) — opens DownloadModal */}
              <button
                onClick={() => setModalOpen(true)}
                className="group flex items-center gap-3 px-8 py-4 font-black text-sm uppercase tracking-widest text-black rounded-full transition-all hover:scale-105"
                style={{ backgroundColor: ACCENT }}
              >
                <Download size={16} /> Download Free
                <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
              </button>

              {/* VARIANT B: Paid / trial (desktop or web app) */}
              {/* 
              <button onClick={() => setModalOpen(true)} className="group flex items-center gap-3 px-8 py-4 font-black text-sm uppercase tracking-widest text-black rounded-full transition-all hover:scale-105" style={{ backgroundColor: ACCENT }}>
                <Zap size={16} /> Start Trial
                <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
              </button>
              <a href="{BUY_URL}" className="flex items-center gap-3 px-8 py-4 font-black text-sm uppercase tracking-widest rounded-full border transition-all hover:scale-105" style={{ borderColor: `${ACCENT}40`, color: ACCENT }}>
                Buy {TOOL_PRICE}
              </a>
              */}

              {/* VARIANT C: Web app — open live URL (no modal needed) */}
              {/*
              <a href="{LIVE_URL}" target="_blank" rel="noopener noreferrer" className="group flex items-center gap-3 px-8 py-4 font-black text-sm uppercase tracking-widest text-black rounded-full transition-all hover:scale-105" style={{ backgroundColor: ACCENT }}>
                <ExternalLink size={16} /> Open App
                <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
              </a>
              */}

              {/* GitHub link (all types, if GITHUB_URL is not null) */}
              {/*
              <a href="{GITHUB_URL}" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 px-8 py-4 font-black text-sm uppercase tracking-widest rounded-full border border-white/10 text-white/50 hover:text-white hover:border-white/30 transition-all">
                <ExternalLink size={14} /> View Source
              </a>
              */}
            </div>

            {/* Tags */}
            <div className="flex items-center gap-6 pt-4 text-[9px] font-bold text-white/20 uppercase tracking-[0.3em]">
              {TAGS.map((tag, i) => (
                <span key={i} className="flex items-center gap-2">
                  <ShieldCheck size={12} style={{ color: ACCENT }} /> {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Icon box */}
          <div className="relative flex justify-center items-center">
            <div className="w-[460px] h-[460px] bg-[#0c0c0e] border border-white/5 rounded-[60px] flex items-center justify-center relative overflow-hidden group">
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700" style={{ background: `${ACCENT}08` }} />
              <{TOOL_ICON} className="w-40 h-40 text-white/5 group-hover:text-white/10 transition-colors duration-700" strokeWidth={0.5} />
              <div className="absolute bottom-10 right-10 flex gap-1">
                {[0, 1, 2].map(i => (
                  <div key={i} className="w-1 h-1 rounded-full animate-pulse" style={{ backgroundColor: ACCENT, animationDelay: `${i * 0.2}s` }} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-32 px-8 bg-[#08080a]">
        <div className="max-w-7xl mx-auto">
          <div className="mb-20 space-y-4">
            <h2 className="text-4xl font-black uppercase italic tracking-tighter">System Features</h2>
            <div className="w-20 h-1" style={{ backgroundColor: ACCENT }} />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {FEATURES.map((f, i) => (
              <div
                key={i}
                className="bg-[#0c0c0e] border border-white/5 p-10 rounded-[40px] transition-colors group"
                onMouseEnter={e => (e.currentTarget.style.borderColor = `${ACCENT}80`)}
                onMouseLeave={e => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.05)')}
              >
                <div className="w-16 h-16 rounded-2xl flex items-center justify-center mb-8" style={{ backgroundColor: `${ACCENT}1a`, color: ACCENT }}>
                  <f.icon size={28} />
                </div>
                <h3 className="text-lg font-black uppercase tracking-tight mb-4 italic">{f.title}</h3>
                <p className="text-sm text-white/40 leading-relaxed font-medium">{f.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Specs */}
      <section className="py-32 px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-32">
          <div className="space-y-12">
            <h2 className="text-4xl font-black uppercase italic tracking-tighter">Why It Exists</h2>
            <div className="space-y-8">
              {[
                { t: "Benefit 1", d: "Description." },
                { t: "Benefit 2", d: "Description." },
                { t: "Benefit 3", d: "Description." }
              ].map((item, i) => (
                <div key={i} className="flex gap-6">
                  <CheckCircle2 size={24} className="mt-1 flex-shrink-0" style={{ color: ACCENT }} />
                  <div>
                    <h4 className="text-lg font-bold uppercase italic tracking-tight">{item.t}</h4>
                    <p className="text-white/40 text-sm leading-relaxed">{item.d}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="bg-[#0c0c0e] border border-white/5 p-12 rounded-[50px]">
            <h3 className="text-2xl font-black uppercase italic tracking-tighter mb-10">Technical Specifications</h3>
            <div className="space-y-6">
              {SPECS.map((s, i) => (
                <div key={i} className="flex justify-between items-center py-4 border-b border-white/5 last:border-0">
                  <span className="text-[10px] font-black uppercase tracking-[0.4em] text-white/30">{s.label}</span>
                  <span className="text-sm font-bold italic uppercase" style={{ color: ACCENT }}>{s.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <div className="flex justify-center py-20 px-8">
        <footer className="bg-[#0c0c0e] border border-white/5 rounded-full px-12 py-6 shadow-2xl">
          <div className="flex flex-col items-center gap-4">
            <div className="flex items-center gap-6 text-[10px] font-black tracking-[0.4em] text-white/30 uppercase">
              <span>© 2025 Studiø</span>
              <div className="w-1 h-1 bg-white/10 rounded-full" />
              <span>Muhamad Shkeir</span>
              <div className="w-1 h-1 bg-white/10 rounded-full" />
              <span style={{ color: ACCENT }}>Riyadh, KSA</span>
            </div>
            <div className="flex items-center gap-4">
              <a href="/privacy-policy.html" target="_blank" rel="noopener noreferrer" className="text-[9px] font-black tracking-[0.4em] text-white/20 uppercase hover:text-white/60 transition-colors">Privacy Policy</a>
              <div className="w-px h-3 bg-white/10" />
              <a href="/terms-of-service.html" target="_blank" rel="noopener noreferrer" className="text-[9px] font-black tracking-[0.4em] text-white/20 uppercase hover:text-white/60 transition-colors">Terms of Service</a>
            </div>
          </div>
        </footer>
      </div>

      <style>{`
        .stroke-text { -webkit-text-stroke: 1px rgba(255,255,255,0.2); color: transparent; }
        @media (min-width: 1024px) { .stroke-text { -webkit-text-stroke: 2px rgba(255,255,255,0.2); } }
      `}</style>
    </div>
  );
}
```

### Web App extra section — Setup / Quick Start

Web apps and desktop apps with a required setup step (API keys, dependencies) should add a
Quick Start section between the Features and Specs sections. Replace "Why It Exists" with it:

```tsx
{/* Quick Start — for web/desktop apps with setup requirements */}
<section className="py-32 px-8 max-w-7xl mx-auto">
  <div className="grid grid-cols-1 lg:grid-cols-2 gap-32">
    <div className="space-y-12">
      <h2 className="text-4xl font-black uppercase italic tracking-tighter">Quick Start</h2>
      <div className="space-y-8">
        {[
          { t: "Step 1 title", d: "Step 1 description." },
          { t: "Step 2 title", d: "Step 2 description." },
          { t: "Step 3 title", d: "Step 3 description." }
        ].map((item, i) => (
          <div key={i} className="flex gap-6">
            <CheckCircle2 size={24} className="mt-1 flex-shrink-0" style={{ color: ACCENT }} />
            <div>
              <h4 className="text-lg font-bold uppercase italic tracking-tight">{item.t}</h4>
              <p className="text-white/40 text-sm leading-relaxed font-mono">{item.d}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
    {/* ... specs panel same as above ... */}
  </div>
</section>
```

---

## Step 3 — Register the Route in App.tsx

File: `client/src/App.tsx`

```tsx
// Add with other detail page imports:
import {TOOL_NAME}Detail from "./pages/{TOOL_NAME}Detail";

// Add inside <Switch> with other /tools/* routes:
<Route path="{TOOL_ROUTE}" component={{TOOL_NAME}Detail} />
```

---

## Step 4 — Add to the Tools Page Carousel

File: `client/src/pages/Tools.tsx`

Append to the end of the `EXTENSIONS` array:

```tsx
{
  id: "{TOOL_ID}",
  name: "{TOOL_NAME}",
  description: "{DESCRIPTION_CONFIRMED}",
  tagline: "{TOOL_TAGLINE}",
  accent: "{TOOL_ACCENT_COLOR}",
  details: {DETAIL_TAGS},
  icon: {TOOL_ICON},
  price: "{TOOL_PRICE}",
  link: "{TOOL_ROUTE}"
}
```

Add the icon to the lucide-react import at the top if not already there.

**Animation note:** The `Slide` component has hardcoded variants for indexes 0–3. Anything appended
beyond index 3 falls into the generic `else` branch — no changes needed. Never insert at 0–3.

---

## Step 5 — Add to the Home Page Feature Grid

File: `client/src/pages/Home.tsx`

Read the current `FEATURED_TOOLS` array to find the last `id` number, then increment:

```tsx
{
  id: "XX",     // next sequential number, e.g. "12"
  name: "{TOOL_NAME}",
  tagline: "{TOOL_TAGLINE}",
  description: "{DESCRIPTION_CONFIRMED}",
  color: "{TOOL_ACCENT_COLOR}",
  icon: {TOOL_ICON},
  path: "{TOOL_ROUTE}"
}
```

Add the icon to the lucide-react import if missing.
Grid width alternates automatically based on `idx % 3 === 0` — no manual adjustment needed.

---

## Step 6 — Add to Pricing (only if IS_PAID = true)

File: `client/src/pages/Pricing.tsx`

```tsx
{
  name: "{TOOL_NAME}",
  price: {PRICE_NUMBER},      // number only, e.g. 49
  description: "{DESCRIPTION_CONFIRMED}",
  features: [
    "Feature one",
    // up to 6
  ],
  popular: false,
  slug: "{TOOL_ID}"
}
```

Skip entirely if `IS_PAID = false`.

---

## Step 7 — Verify TypeScript & Build

```powershell
pnpm run check
pnpm run build
```

Fix all errors before committing. A broken build must never be pushed.

---

## Step 8 — Commit

Stage only the files changed in this workflow:

```powershell
git add client/src/pages/{TOOL_NAME}Detail.tsx
git add client/src/App.tsx
git add client/src/pages/Tools.tsx
git add client/src/pages/Home.tsx
# if paid:
git add client/src/pages/Pricing.tsx
# if download file added:
git add client/public/downloads/
```

```powershell
git commit -m "feat: publish {TOOL_NAME} — detail page, routes, home/tools integration"
```

> **PowerShell note:** Do NOT chain commands with `&&` — it is not valid in PowerShell.
> Run each `git` command on its own line, or use `;` as the separator.

---

## Step 9 — Deploy

Push to `main`. Both Netlify and Vercel auto-deploy on push.

```powershell
git push origin main
```

After ~2 min, verify on production:
- `{TOOL_ROUTE}` loads on hard refresh (no 404)
- Download link works / live URL opens
- Tool appears in carousel and home grid

---

## Step 10 — Post-Deploy Checklist

- [ ] Detail page renders correctly at 375px mobile width
- [ ] Tool appears in the Tools carousel
- [ ] Tool appears in the Home feature grid
- [ ] Download / Open App link works
- [ ] GitHub link opens correct repo (if provided)
- [ ] `pnpm run check` is clean
- [ ] No console errors in browser

---

## Design Rules — Do Not Break These

| Rule | Detail |
|---|---|
| Background | `#050505` page · `#08080a` alternate sections · `#0c0c0e` cards |
| Typography | `font-black`, `uppercase`, `italic`, `tracking-tighter` on all headings |
| Title | `.stroke-text` on `<h1>` — transparent fill, white stroke |
| Accent | One color per tool. Used for badge, icon bg, spec values, CTA, accent dots |
| Rounding | Cards `rounded-[40px]` · spec panel `rounded-[50px]` · footer `rounded-full` |
| Feature grid | 4 cols desktop (`lg:grid-cols-4`) · 2 tablet · 1 mobile |
| Header | Always `<Header currentPage="tools" />` |
| Footer | Always include the inline footer with Privacy Policy + Terms of Service links |

---

## Common Mistakes to Avoid

- **Forgetting to import the icon** in `Tools.tsx` or `Home.tsx`
- **Accent color collision** — check the list in the "What You Must Ask" section
- **`ScrollTrigger.normalizeScroll(true)`** — never add this; breaks other pages
- **`scrollRestoration` in detail pages** — App.tsx handles this globally
- **Inserting into Tools.tsx at index 0–3** — always append to end
- **Missing route in App.tsx** — page exists but hard-refresh 404s
- **Broken build before commit** — always run `pnpm run check` + `pnpm run build` first
- **Web app with no live URL** — if the app isn't hosted yet, note it clearly and use a "Coming Soon" CTA or GitHub link instead

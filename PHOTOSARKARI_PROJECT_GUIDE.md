# PhotoSarkari — Complete Project Instruction Set

> **All-in-One Indian Government ID Photo Tool**
> Status: MVP scaffolded ✅ | Next: AI background removal + face detection
> Last updated: March 28, 2026

---

## Table of contents

1. [Project overview](#1-project-overview)
2. [What's done so far](#2-whats-done-so-far)
3. [Architecture & tech stack](#3-architecture--tech-stack)
4. [Document presets reference](#4-document-presets-reference)
5. [Implementation phases](#5-implementation-phases)
6. [Phase 1: AI background removal (NEXT)](#6-phase-1-ai-background-removal)
7. [Phase 2: Face detection & auto-crop](#7-phase-2-face-detection--auto-crop)
8. [Phase 3: Print sheet PDF generator](#8-phase-3-print-sheet-pdf-generator)
9. [Phase 4: Aadhaar PDF merger](#9-phase-4-aadhaar-pdf-merger)
10. [Phase 5: Signature resizer](#10-phase-5-signature-resizer)
11. [Phase 6: Compliance checker](#11-phase-6-compliance-checker)
12. [Phase 7: SEO pages](#12-phase-7-seo-pages)
13. [Phase 8: Hindi & regional languages](#13-phase-8-hindi--regional-languages)
14. [Phase 9: Monetization setup](#14-phase-9-monetization-setup)
15. [Phase 10: Deployment & launch](#15-phase-10-deployment--launch)
16. [Promotion playbook](#16-promotion-playbook)
17. [Competitor analysis summary](#17-competitor-analysis-summary)
18. [Technical reference](#18-technical-reference)
19. [Claude Code prompts bank](#19-claude-code-prompts-bank)

---

## 1. Project overview

### What is PhotoSarkari?

A free, client-side web tool that helps Indians resize, crop, compress, and format photos for government ID documents (Aadhaar, PAN, Passport, Voter ID, Driving License) and exam application forms (SSC, UPSC, Railway, IBPS, NEET, JEE). 

**Key differentiators vs 15+ competitors:**
- AI background removal — runs in browser, free, unlimited (competitors either don't have it or use paid APIs)
- Face detection — auto-centers face with correct government-required ratio (nobody does this)
- All Indian IDs in one tool — most competitors serve 1-3 document types only
- Modern mobile-first UI — every competitor looks like 2012
- 100% client-side — no server uploads, total privacy, zero API costs
- Signature resizing + Aadhaar PDF merger + print sheet generator — bundled utilities

### Business model

- **Primary revenue:** Google AdSense (India RPM: ₹50-150 per 1,000 views)
- **Secondary:** Premium tier ₹49/month (no ads + batch processing)
- **Tertiary:** Affiliate links to photo printing services (Printo.in, Zoomin)
- **Target:** ₹15,000-45,000/month at 10K daily visitors (conservative)

### Target users

1. **Government exam aspirants** — SSC, Railway, UPSC, IBPS candidates filling online forms (millions/year)
2. **Citizens applying for IDs** — PAN card, Aadhaar update, Passport, Voter ID, DL
3. **Cyber café / CSC operators** — 300,000+ Common Service Centers processing forms daily
4. **Students** — College admission forms, scholarship applications

### Investment

- **Total cost: ₹0** (everything client-side, Vercel free tier)
- **Optional: ₹150-400/year** for a .in domain (using vercel.app URL for now)

---

## 2. What's done so far

### ✅ Completed
- [x] Next.js 14 project scaffolded with App Router + Tailwind CSS
- [x] Homepage with document selector grid (photo + signature categories)
- [x] Dynamic `/tool/[slug]` routes for each document type
- [x] `presets.ts` with all Indian ID photo specifications
- [x] `PhotoProcessor.tsx` component with upload, crop, resize, compress, download
- [x] Canvas-based image processing with KB-target compression
- [x] Mobile-first responsive design
- [x] App running on localhost:3001

### 🔲 Not yet done (in priority order)
- [ ] AI background removal (@imgly/background-removal)
- [ ] Face detection auto-crop (face-api.js)
- [ ] Print sheet PDF generator (jsPDF)
- [ ] Aadhaar front+back PDF merger
- [ ] Signature resizer enhancements
- [ ] Compliance checker (warns about issues)
- [ ] SEO landing pages (15-20 pages)
- [ ] Hindi + regional language toggle
- [ ] Google AdSense integration
- [ ] Vercel deployment
- [ ] Social media promotion content

---

## 3. Architecture & tech stack

### Stack

| Layer | Technology | Cost | Purpose |
|-------|-----------|------|---------|
| Framework | Next.js 14 (App Router) | Free | SSR for SEO, React, file-based routing |
| Styling | Tailwind CSS | Free | Rapid UI, mobile-first utilities |
| Hosting | Vercel (free tier) | Free | 100GB bandwidth/month, auto SSL, CDN |
| AI Background Removal | @imgly/background-removal | Free | ONNX model in browser via WASM, no API |
| Face Detection | face-api.js | Free | TensorFlow.js-based, runs in browser |
| Image Processing | Canvas API (browser native) | Free | Crop, resize, compress, DPI embed |
| PDF Generation | jsPDF | Free | Print sheets, Aadhaar merger |
| Analytics | Vercel Analytics (free tier) | Free | Basic traffic tracking |
| Monetization | Google AdSense | Free | Display ads, earns revenue |

### Why everything is client-side

This is the critical architectural decision. ALL image processing happens in the user's browser:

1. **Zero API costs** — Competitors using remove.bg pay ~$0.20/image. At 1K users/day = $200/month. Our cost: ₹0.
2. **Privacy as feature** — "Your photo never leaves your device" is a trust signal for government documents.
3. **Infinite scale** — No server to overload. Vercel only serves static HTML/JS/CSS.
4. **Works offline** — After first visit (model cached), tool works without internet.
5. **Vercel free tier is enough** — 100GB serves ~500K-1M page loads since we're only serving static assets.

### Project structure

```
photosarkari/
├── src/
│   ├── app/
│   │   ├── page.tsx                    # Homepage with document grid
│   │   ├── layout.tsx                  # Root layout, metadata, fonts
│   │   ├── tool/
│   │   │   └── [slug]/
│   │   │       └── page.tsx            # Dynamic tool page per document
│   │   ├── guide/                      # [PLANNED] SEO blog pages
│   │   │   ├── aadhaar-photo-size/
│   │   │   │   └── page.tsx
│   │   │   ├── pan-card-photo-resize/
│   │   │   │   └── page.tsx
│   │   │   └── ...
│   │   └── globals.css
│   ├── components/
│   │   ├── PhotoProcessor.tsx          # Main tool component (client)
│   │   ├── DocumentCard.tsx            # Homepage card component
│   │   ├── BackgroundRemover.tsx       # [PLANNED] AI BG removal
│   │   ├── FaceDetector.tsx            # [PLANNED] Auto face crop
│   │   ├── PrintSheetGenerator.tsx     # [PLANNED] PDF print layout
│   │   ├── AadhaarMerger.tsx           # [PLANNED] Front+back PDF
│   │   └── ComplianceChecker.tsx       # [PLANNED] Photo validation
│   └── lib/
│       ├── presets.ts                  # All document specifications
│       ├── imageUtils.ts              # [PLANNED] Shared canvas helpers
│       └── constants.ts               # [PLANNED] App-wide constants
├── public/
│   ├── models/                        # [PLANNED] face-api.js models
│   └── og-image.png                   # [PLANNED] Social sharing image
├── package.json
├── tailwind.config.ts
├── tsconfig.json
└── next.config.js
```

---

## 4. Document presets reference

These are the exact government specifications. Each preset must be accurate — wrong specs = rejected applications.

### Photo presets

| Document | Width (px) | Height (px) | Physical Size | Max KB | DPI | Aspect |
|----------|-----------|-------------|---------------|--------|-----|--------|
| Aadhaar Card | 350 | 450 | 3.5×4.5 cm | 50 | 200 | Portrait (taller) |
| PAN Card (NSDL) | 197 | 276 | 2.5×3.5 cm | 50 | 200 | Portrait |
| PAN Card (UTI) | 197 | 276 | 2.5×3.5 cm | 50 | 200 | Portrait |
| Indian Passport | 600 | 600 | 51×51 mm | 300 | 300 | Square |
| Voter ID (EPIC) | 200 | 230 | ~2.5×2.9 cm | 50 | 200 | Portrait |
| Driving License | 200 | 230 | ~2.5×2.9 cm | 100 | 200 | Portrait |
| SSC Exam | 200 | 230 | ~2.5×2.9 cm | 50 | 200 | Portrait |
| Railway (RRB) | 200 | 230 | ~2.5×2.9 cm | 50 | 200 | Portrait |
| UPSC | 200 | 230 | ~2.5×2.9 cm | 40 | 200 | Portrait |
| IBPS/Bank | 200 | 230 | ~2.5×2.9 cm | 50 | 200 | Portrait |
| NEET | 200 | 230 | ~2.5×2.9 cm | 50 | 200 | Portrait |
| JEE Main | 200 | 230 | ~2.5×2.9 cm | 50 | 200 | Portrait |

### Signature presets

| Document | Width (px) | Height (px) | Physical Size | Max KB | DPI | Aspect |
|----------|-----------|-------------|---------------|--------|-----|--------|
| PAN Signature | 354 | 157 | 4.5×2.0 cm | 50 | 200 | Landscape (wider) |
| SSC Signature | 400 | 180 | ~5.0×2.3 cm | 30 | 200 | Landscape |
| IBPS Signature | 140 | 60 | ~1.8×0.8 cm | 20 | 200 | Landscape |
| UPSC Signature | 400 | 180 | ~5.0×2.3 cm | 30 | 200 | Landscape |

### CRITICAL: Common rejection reasons

- **Aadhaar is PORTRAIT (3.5×4.5cm), PAN is PORTRAIT but different ratio (2.5×3.5cm)** — they look similar but are NOT interchangeable
- **Passport is SQUARE (51×51mm)** — the only square one
- **PAN signature is LANDSCAPE, PAN photo is PORTRAIT** — opposite orientations
- File size limits are STRICT — 50.1KB gets rejected, aim for 45-48KB to be safe
- JPEG only — PNG, HEIC, WebP all get rejected on government portals
- White or very light gray background only — colored backgrounds auto-rejected

---

## 5. Implementation phases

### Phase overview

| Phase | Feature | Priority | Effort | Impact |
|-------|---------|----------|--------|--------|
| 1 | AI background removal | CRITICAL | 2-3 hours | Kills every competitor |
| 2 | Face detection auto-crop | HIGH | 2-3 hours | Unique feature, saves user time |
| 3 | Print sheet PDF | HIGH | 1-2 hours | Users take to print shop |
| 4 | Aadhaar PDF merger | MEDIUM | 1-2 hours | Big use case for PAN applications |
| 5 | Signature resizer | MEDIUM | 1 hour | Already partially done in presets |
| 6 | Compliance checker | MEDIUM | 2 hours | Trust builder, reduces rejections |
| 7 | SEO pages | CRITICAL | 4-6 hours | How you get traffic — THE growth engine |
| 8 | Hindi + languages | MEDIUM | 2-3 hours | Doubles addressable audience |
| 9 | Monetization (AdSense) | HIGH | 1 hour | Apply when you have 1K+ daily visitors |
| 10 | Deploy to Vercel | CRITICAL | 30 mins | Go live |

---

## 6. Phase 1: AI background removal

### What & why

Replace photo background with plain white using an AI model running entirely in the browser. This is the #1 differentiator — no competitor offers free, unlimited, client-side background removal.

### Library: @imgly/background-removal

- **How it works:** Downloads a ~30MB ONNX model (once, cached), runs inference via WebAssembly in browser
- **Quality:** Comparable to remove.bg
- **Speed:** 3-8 seconds on mid-range phone, 1-3 seconds on desktop
- **Cost:** ₹0 forever — no API calls
- **Privacy:** Image never leaves the device

### Installation

```bash
npm install @imgly/background-removal
```

### Implementation code pattern

```typescript
// src/components/BackgroundRemover.tsx
"use client";

import { removeBackground } from "@imgly/background-removal";
import { useState } from "react";

interface Props {
  imageFile: File;
  onResult: (resultBlob: Blob) => void;
}

export function BackgroundRemover({ imageFile, onResult }: Props) {
  const [status, setStatus] = useState<"idle" | "loading" | "processing" | "done" | "error">("idle");
  const [progress, setProgress] = useState(0);

  const handleRemoveBackground = async () => {
    try {
      setStatus("loading");
      
      const imageBlob = new Blob([await imageFile.arrayBuffer()], { type: imageFile.type });
      
      setStatus("processing");
      const resultBlob = await removeBackground(imageBlob, {
        progress: (key, current, total) => {
          if (total > 0) setProgress(Math.round((current / total) * 100));
        },
      });

      // Draw result on canvas with white background
      const img = new Image();
      const url = URL.createObjectURL(resultBlob);
      img.onload = () => {
        const canvas = document.createElement("canvas");
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext("2d")!;
        
        // White background first
        ctx.fillStyle = "#FFFFFF";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        // Transparent image on top
        ctx.drawImage(img, 0, 0);
        
        canvas.toBlob((blob) => {
          if (blob) onResult(blob);
          setStatus("done");
        }, "image/jpeg", 0.95);
        
        URL.revokeObjectURL(url);
      };
      img.src = url;
      
    } catch (err) {
      console.error("Background removal failed:", err);
      setStatus("error");
    }
  };

  return (
    <div>
      <button onClick={handleRemoveBackground} disabled={status === "processing"}>
        {status === "idle" && "Remove Background"}
        {status === "loading" && "Loading AI model..."}
        {status === "processing" && `Processing... ${progress}%`}
        {status === "done" && "✓ Background Removed"}
        {status === "error" && "Failed — Try manual crop"}
      </button>
      <p className="text-xs text-gray-500">
        🔒 100% private — your photo never leaves your device
      </p>
    </div>
  );
}
```

### Integration with PhotoProcessor

After the user uploads a photo:
1. Show "Remove Background" toggle (default: ON)
2. If ON → run background removal → replace source image with result
3. Then show crop overlay on the clean white-background image
4. If background removal fails (old phone) → gracefully fall back to manual crop

### Next.js config needed

The ONNX model files need to be served. Add to `next.config.js`:

```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  // Required for @imgly/background-removal WASM files
  webpack: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      "sharp$": false,
      "onnxruntime-node$": false,
    };
    return config;
  },
};

module.exports = nextConfig;
```

### Claude Code prompt for this phase

```
Install @imgly/background-removal and integrate it into PhotoProcessor.

npm install @imgly/background-removal

In PhotoProcessor.tsx:
1. Add a toggle "AI Background Removal" (default ON) above the preview
2. After image upload, if toggle is ON, run removeBackground() from @imgly/background-removal
3. Show progress: "Loading AI model..." then "Removing background... X%"
4. After removal, draw the transparent result onto a canvas with white fill first
5. Replace the working image with this white-background version
6. Then proceed with crop/resize as normal
7. If removal fails, catch error, show "Background removal unavailable on this device" and continue with original image
8. Add text below: "🔒 Your photo never leaves your device"

Update next.config.js to handle WASM:
- Set sharp and onnxruntime-node to false in webpack resolve aliases

Make sure it works with npm run dev — test with a real photo upload.
```

---

## 7. Phase 2: Face detection & auto-crop

### What & why

Automatically detect the face position and center the crop so the face occupies 70-80% of the photo height — the standard government requirement. Users currently crop manually and often get rejections because the face is too small or off-center.

### Library: face-api.js

- **Size:** ~6MB models
- **Speed:** <1 second detection
- **Runs in:** Browser (TensorFlow.js)
- **Cost:** Free

### Installation

```bash
npm install face-api.js
```

Download the model files (SSD MobileNet v1) and place in `/public/models/`:
- `ssd_mobilenetv1_model-weights_manifest.json`
- `ssd_mobilenetv1_model-shard1` (and shard2)

### Implementation logic

```typescript
import * as faceapi from "face-api.js";

// Load models (once, on component mount)
await faceapi.nets.ssdMobilenetv1.loadFromUri("/models");

// Detect face in uploaded image
const img = document.getElementById("uploaded-image") as HTMLImageElement;
const detections = await faceapi.detectSingleFace(img);

if (detections) {
  const { x, y, width, height } = detections.box;
  
  // Calculate crop area where face = 70-80% of frame height
  const faceHeightRatio = 0.75; // face should be 75% of photo height
  const targetHeight = height / faceHeightRatio;
  const targetWidth = targetHeight * (presetWidth / presetHeight); // maintain aspect ratio
  
  // Center crop on face
  const cropX = x + width / 2 - targetWidth / 2;
  const cropY = y - (targetHeight - height) * 0.3; // 30% space above face
  
  // Set crop overlay to these coordinates
  setCropArea({ x: cropX, y: cropY, width: targetWidth, height: targetHeight });
}
```

### Claude Code prompt for this phase

```
Add face detection to PhotoProcessor using face-api.js.

npm install face-api.js

1. Download SSD MobileNet v1 model files and place in /public/models/ directory
2. On component mount, load face detection model from /models/
3. After image upload (and after background removal if enabled), detect single face
4. If face detected:
   - Calculate crop area where face occupies ~75% of frame height
   - Center horizontally on face
   - Position with ~30% space above face (forehead room)
   - Lock crop to preset aspect ratio
   - Auto-set the crop overlay to this position
   - User can still adjust manually by dragging
5. If no face detected:
   - Show "No face detected — position manually" message
   - Default to center crop
6. Show "Face detected ✓" indicator when successful
```

---

## 8. Phase 3: Print sheet PDF generator

### What & why

Generate a PDF with 4, 6, or 8 identical photos arranged on standard photo paper (4R = 4×6 inches). User downloads PDF, takes to local print shop, pays ₹5-10 for prints. Saves ₹50-200 vs studio.

### Library: jsPDF

```bash
npm install jspdf
```

### Implementation logic

```typescript
import jsPDF from "jspdf";

function generatePrintSheet(imageDataUrl: string, count: 4 | 6 | 8) {
  // 4R photo paper: 4×6 inches = 101.6×152.4 mm
  const pdf = new jsPDF({ orientation: "landscape", unit: "mm", format: [101.6, 152.4] });
  
  const photoWidth = 35; // mm (passport size)
  const photoHeight = 45;
  const gap = 3;
  
  // Calculate grid positions
  const cols = count <= 4 ? 2 : 3;
  const rows = count <= 4 ? 2 : 2;
  
  const startX = (152.4 - (cols * photoWidth + (cols - 1) * gap)) / 2;
  const startY = (101.6 - (rows * photoHeight + (rows - 1) * gap)) / 2;
  
  for (let i = 0; i < count; i++) {
    const col = i % cols;
    const row = Math.floor(i / cols);
    const x = startX + col * (photoWidth + gap);
    const y = startY + row * (photoHeight + gap);
    pdf.addImage(imageDataUrl, "JPEG", x, y, photoWidth, photoHeight);
  }
  
  pdf.save("photosarkari-print-sheet.pdf");
}
```

### Claude Code prompt

```
Add a print sheet PDF generator to the tool page.

npm install jspdf

After the user processes their photo:
1. Show a "Generate Print Sheet" section with options: 4 photos, 6 photos, 8 photos
2. On click, use jsPDF to create a PDF:
   - Paper size: 4R (4×6 inches / 101.6×152.4 mm) landscape
   - Arrange N copies of the processed photo in a grid with 3mm gaps
   - Center the grid on the page
   - Add a light gray cutting guide border around each photo (0.25px dashed line)
3. Auto-download the PDF as "photosarkari-print-sheet.pdf"
4. Show text: "Take this PDF to any photo print shop — ₹5-10 for professional prints"
```

---

## 9. Phase 4: Aadhaar PDF merger

### What & why

When applying for a PAN card online (NSDL/UTI portal), you need to upload Aadhaar as address/identity proof as a SINGLE PDF. But Aadhaar has two sides. Users need to photograph both sides and merge into one PDF. This is a massive pain point — PanCardSize.com and SarkariDNATools.com already offer this, proving demand.

### Implementation

```typescript
import jsPDF from "jspdf";

function mergeAadhaarPDF(frontImage: string, backImage: string) {
  const pdf = new jsPDF({ orientation: "landscape", unit: "mm", format: "a4" });
  
  // Front on left half
  pdf.addImage(frontImage, "JPEG", 10, 30, 130, 75);
  pdf.text("Aadhaar Card — Front", 75, 25, { align: "center" });
  
  // Back on right half
  pdf.addImage(backImage, "JPEG", 155, 30, 130, 75);
  pdf.text("Aadhaar Card — Back", 220, 25, { align: "center" });
  
  pdf.save("aadhaar-combined.pdf");
}
```

### Claude Code prompt

```
Add an Aadhaar PDF Merger utility.

Create a new route: /tools/aadhaar-merger with its own page.
Also add a link to it from the homepage under a "Utilities" section.

The page should:
1. Have two upload areas: "Upload Aadhaar FRONT" and "Upload Aadhaar BACK"
2. Each upload shows a preview with crop handles (locked to ID card aspect ratio ~85.6×54mm)
3. "Merge & Download PDF" button creates a single-page landscape A4 PDF using jsPDF:
   - Front image on left half, Back image on right half
   - Light heading text above each: "Front" and "Back"
   - Auto-download as "aadhaar-combined.pdf"
4. Show: "This PDF is accepted for PAN card, bank, and government applications"
```

---

## 10. Phase 5: Signature resizer

Signatures are already in the presets (PAN signature, SSC signature, etc.). This phase is about making the signature UX better:

### Claude Code prompt

```
Improve the signature resizing experience in PhotoProcessor:

1. When a signature preset is selected (category === "signature"):
   - Change upload text to "Upload Signature Photo"
   - Add guidance: "Sign on white paper, photograph clearly, avoid shadows"
   - Auto-invert if signature is light on dark background
   - Auto-enhance contrast to make signature crisp
   - Compress more aggressively (signatures can handle lower quality)
2. Add a "Clean Signature" button that:
   - Converts to grayscale
   - Increases contrast
   - Makes near-white pixels pure white
   - Makes near-black pixels darker
   This creates a clean, professional-looking signature from a phone photo
```

---

## 11. Phase 6: Compliance checker

### What & why

Before download, warn the user if their photo will likely be rejected. Builds trust and reduces support requests.

### Checks to implement

```typescript
interface ComplianceIssue {
  severity: "error" | "warning";
  message: string;
  messageHindi: string;
}

function checkCompliance(canvas: HTMLCanvasElement, preset: Preset): ComplianceIssue[] {
  const issues: ComplianceIssue[] = [];
  const ctx = canvas.getContext("2d")!;
  const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  
  // Check 1: Background not white enough
  // Sample corners — if average RGB > 240, it's fine
  
  // Check 2: Image too dark (underexposed)
  // Calculate average brightness — warn if below threshold
  
  // Check 3: File size will exceed limit
  // Already known from compression step
  
  // Check 4: Face too small (if face detection available)
  // Face height < 60% of frame = warning
  
  // Check 5: Image is wrong orientation
  // Landscape when portrait expected, or vice versa
  
  return issues;
}
```

### Claude Code prompt

```
Add a compliance checker that runs before download in PhotoProcessor:

1. After processing, before showing download button, run these checks:
   - Background whiteness: sample 4 corner regions (20x20px each), check if average RGB > 230. If not: warning "Background may not be white enough for government portal"
   - Brightness: calculate average pixel brightness. If < 100: warning "Photo appears too dark"
   - File size: if compressed size > preset.maxKB: error "File size exceeds limit"
   - Orientation: if image is landscape but preset needs portrait (or vice versa): error "Wrong orientation"
2. Show results as colored badges:
   - Green checkmark: "✓ Compliance check passed"
   - Yellow warning: "⚠ [issue] — may be rejected"
   - Red error: "✗ [issue] — will be rejected"
3. Allow download even with warnings, block download on errors
```

---

## 12. Phase 7: SEO pages

### This is THE growth engine

Traffic will come from Google searches. Each page targets a specific long-tail keyword.

### Pages to create (in priority order)

| Page URL | Target keyword | Monthly searches (est.) |
|----------|---------------|------------------------|
| /guide/aadhaar-photo-size | aadhaar card photo size in pixels | 20K+ |
| /guide/pan-card-photo-resize | pan card photo resize online | 15K+ |
| /guide/passport-photo-size-india | passport size photo india | 25K+ |
| /guide/ssc-photo-resize | ssc photo resize 20kb | 10K+ |
| /guide/pan-signature-size | pan card signature size | 12K+ |
| /guide/photo-compress-50kb | photo compress to 50kb online | 20K+ |
| /guide/voter-id-photo-size | voter id photo size | 5K+ |
| /guide/upsc-photo-size | upsc photo size requirements | 8K+ |
| /guide/railway-exam-photo | rrb exam photo size | 8K+ |
| /guide/aadhaar-vs-pan-photo | aadhaar pan card photo difference | 5K+ |
| /guide/nsdl-vs-uti-pan | nsdl vs uti pan photo signature | 5K+ |
| /guide/ibps-photo-size | ibps photo resize | 6K+ |
| /guide/neet-photo-size | neet photo size requirements | 8K+ |
| /guide/photo-compress-20kb | photo compress to 20kb | 10K+ |
| /guide/passport-photo-background | passport photo background remover free | 8K+ |

### Each page structure

```
1. H1: "[Document] Photo Size Requirements 2026 — Free Resize Tool"
2. Embedded tool (pre-loaded with correct preset)
3. Detailed specification section:
   - Exact dimensions (px, cm, mm)
   - File size limit
   - DPI requirement
   - Background rules
   - Do's and Don'ts with examples
4. Step-by-step guide with screenshots
5. FAQ section (5-8 questions, schema markup for Google rich results)
6. Related tools links (cross-linking between pages)
7. Hindi translation section at bottom
```

### Claude Code prompt for first SEO page

```
Create an SEO-optimized guide page at /guide/aadhaar-photo-size/page.tsx

The page should have:
1. Metadata: title "Aadhaar Card Photo Size 2026 — Exact Pixels, KB & Free Resize Tool | PhotoSarkari"
   description "Aadhaar card photo size is 3.5×4.5 cm (350×450 pixels) at 200 DPI, max 50KB in JPEG. Free online tool to resize your Aadhaar photo instantly."

2. Content sections:
   - H1: "Aadhaar Card Photo Size Requirements 2026"
   - Quick specs box: dimensions, KB, DPI, format, background color
   - Embedded PhotoProcessor component pre-loaded with aadhaar preset
   - "Complete Specification Guide" section with detailed text
   - "Common Rejection Reasons" section
   - "Aadhaar vs PAN vs Passport — Size Comparison" table
   - "How to Take an Aadhaar Photo at Home" guide
   - FAQ section with JSON-LD schema markup for Google
   - CTA: "Try our free Aadhaar photo resizer tool above"

3. Internal links to other guide pages
4. Hindi summary at bottom

Make it comprehensive — 1500+ words of genuinely useful content. This page needs to rank on Google.
```

---

## 13. Phase 8: Hindi & regional languages

### Implementation approach

Use Next.js internationalization with a simple JSON-based system:

```typescript
// src/lib/i18n.ts
const translations = {
  en: {
    upload: "Upload Photo",
    removeBackground: "Remove Background",
    download: "Download",
    processing: "Processing...",
    privacyNote: "Your photo never leaves your device",
    // ... 50-100 strings
  },
  hi: {
    upload: "फोटो अपलोड करें",
    removeBackground: "बैकग्राउंड हटाएं",
    download: "डाउनलोड करें",
    processing: "प्रोसेस हो रहा है...",
    privacyNote: "आपकी फोटो आपके डिवाइस से बाहर नहीं जाती",
  }
};
```

Start with English + Hindi only. Add Tamil, Telugu, Malayalam, Kannada later based on traffic data.

---

## 14. Phase 9: Monetization setup

### Google AdSense

1. Apply at adsense.google.com (need 1K+ daily visitors first, apply in Month 2-3)
2. Ad placement strategy:
   - One banner above the tool (leaderboard 728×90)
   - One below the download button (rectangle 300×250)
   - One in the guide content (in-article)
   - NEVER inside the tool itself — don't annoy users mid-workflow
3. Use `next/script` to load AdSense lazily (don't hurt page speed)

### Premium tier (later)

- No ads + batch processing (up to 10 photos at once)
- ₹49/month via Razorpay (Indian payment gateway)
- Only implement after 5K+ daily visitors

---

## 15. Phase 10: Deployment & launch

### Deploy to Vercel

```bash
# From project root
git init
git add .
git commit -m "PhotoSarkari MVP — Indian ID photo tool"

# Push to GitHub (create repo first)
git remote add origin https://github.com/YOUR_USERNAME/photosarkari.git
git push -u origin main

# Connect to Vercel
# Go to vercel.com → New Project → Import from GitHub → Select repo
# Framework: Next.js (auto-detected)
# Deploy
```

Your app will be live at `photosarkari.vercel.app` in ~2 minutes.

### Post-deploy checklist

- [ ] Test every document preset on mobile
- [ ] Test background removal on a real selfie
- [ ] Test download on Android Chrome (most common browser)
- [ ] Check page speed on Google PageSpeed Insights (target: 90+)
- [ ] Submit sitemap to Google Search Console
- [ ] Add Open Graph image for social sharing

---

## 16. Promotion playbook

### Week 1-2: SEO foundation (₹0)

- Publish 5 SEO guide pages (Aadhaar, PAN, Passport, SSC, UPSC)
- Submit sitemap to Google Search Console
- Submit URL to Bing Webmaster Tools
- Internal linking between all pages

### Week 2-3: Community seeding (₹0)

**Reddit** (spend 15 min/day):
- r/India — post as "I built a free tool for..."
- r/developersIndia — "Show & Tell" thread
- r/IndianGaming — tech-savvy users who'll appreciate clean UI

**Quora** (spend 15 min/day):
- Answer every question about "how to resize photo for Aadhaar/PAN/SSC"
- Include link naturally: "I built a free tool that does this: [link]"
- Target Hindi Quora too

**Facebook Groups** (spend 10 min/day):
- SSC CGL Preparation, Railway Exam Preparation, UPSC aspirants groups
- Post during exam application windows: "Free tool to resize photos for [exam] form"

**Telegram Groups**:
- Government job preparation channels
- CSC operator groups

### Week 3+: YouTube Shorts / Instagram Reels (₹0)

Create 15-30 second screen recordings:
- "PAN card photo rejected? Fix in 10 seconds" → show tool
- "Aadhaar photo size secret most people don't know"
- "Why your SSC form photo keeps getting rejected"
- Record on phone, edit with CapCut (free), post in Hindi + English

### Week 5+: Cyber café / CSC network

- Create a printable A4 poster: "FREE Photo Resize Tool — photosarkari.vercel.app"
- Share in CSC operator WhatsApp groups
- Consider a "Café Mode" with batch processing

### Ongoing: Exam season spikes

Track the exam calendar. Create specific posts 1 week before each major exam's application deadline:
- SSC CGL: June-July application window
- SSC CHSL: March-April
- Railway NTPC: varies
- IBPS PO: August-September
- UPSC: February-March

---

## 17. Competitor analysis summary

### 15 competitors mapped — key weaknesses

| Competitor | Traffic | Has AI BG Removal? | All IDs? | Modern UI? | Key weakness |
|-----------|---------|-------------------|----------|-----------|--------------|
| PassportPhotoSizeMaker.com | Medium | No | Partial | No | Manual everything, heavy ads |
| PanCardSize.com | Medium | No | PAN only | Decent | Only PAN, no AI |
| PanCardResizer.com | Medium | No | PAN only | No | Outdated, single-purpose |
| AllCardResizer.in | Medium | Basic | Yes | No | Tries everything, chaotic UX |
| RKResize.com | Low | No | Partial | No | Resize-only, no intelligence |
| PhotoResizer.co.in | Medium | No | Partial | Decent | No AI, no auto-crop |
| ResizeKB.tech | Medium | No | Aadhaar only | OK | Great SEO, limited scope |
| SarkariDNATools.com | Low | Basic | Partial | Good | Newest but limited |
| FreePassportPhoto.in | Medium | Yes (paid API) | Yes | Good | Uses remove.bg (costly) |
| PassportSizePhoto.in | Low | No | Partial | OK | Hindi support but limited |
| imResizer.com | High | Yes | No | Good | Not India-focused |
| PhotoGov.net | High | Yes | No | Good | Expensive, not India-specific |
| PhotoAid.com | High | Yes | No | Good | Paid, not India-specific |
| IDPhotoDIY.com | Medium | Basic | No | OK | Generic, not India-focused |
| Pi7 Image Tool | Low | No | Partial | OK | Limited features |

### Your advantage over ALL of them

1. **Free AI background removal (client-side)** — most have none, FreePassportPhoto.in uses paid API
2. **Face detection auto-crop** — nobody has this
3. **All Indian IDs + all exam forms** — nobody covers everything well
4. **Modern mobile-first UI** — every competitor looks outdated
5. **Zero cost to run** — no API bills, infinite scaling
6. **Privacy** — no server uploads
7. **Print sheet generator** — only 1 competitor has it
8. **Aadhaar PDF merger** — only 2 competitors have it
9. **Compliance checker** — nobody has it

---

## 18. Technical reference

### Canvas API — KB-precise compression

```typescript
async function compressToTargetKB(
  canvas: HTMLCanvasElement,
  targetKB: number
): Promise<Blob> {
  let low = 0.1;
  let high = 1.0;
  let bestBlob: Blob | null = null;
  
  // Binary search for optimal quality
  for (let i = 0; i < 8; i++) {
    const mid = (low + high) / 2;
    const blob = await new Promise<Blob>((resolve) => {
      canvas.toBlob((b) => resolve(b!), "image/jpeg", mid);
    });
    
    const sizeKB = blob.size / 1024;
    
    if (sizeKB <= targetKB) {
      bestBlob = blob;
      low = mid; // Try higher quality
    } else {
      high = mid; // Need more compression
    }
  }
  
  return bestBlob!;
}
```

### DPI metadata embedding

JPEG files don't inherently store DPI in Canvas API output. To embed DPI:

```typescript
// After generating JPEG blob, modify JFIF header to include DPI
function embedDPI(jpegBlob: Blob, dpi: number): Promise<Blob> {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onload = () => {
      const arr = new Uint8Array(reader.result as ArrayBuffer);
      // JFIF header DPI is at bytes 13-14 (X density) and 15-16 (Y density)
      // Byte 12 is density unit: 1 = dots per inch
      if (arr[12] !== undefined) {
        arr[12] = 1; // density unit = DPI
        arr[13] = (dpi >> 8) & 0xFF;
        arr[14] = dpi & 0xFF;
        arr[15] = (dpi >> 8) & 0xFF;
        arr[16] = dpi & 0xFF;
      }
      resolve(new Blob([arr], { type: "image/jpeg" }));
    };
    reader.readAsArrayBuffer(jpegBlob);
  });
}
```

### Useful links

- @imgly/background-removal docs: https://github.com/nicholascelestin/background-removal-js
- face-api.js docs: https://github.com/justadudewhohacks/face-api.js
- jsPDF docs: https://github.com/parallax/jsPDF
- Indian passport photo specs: https://www.passportindia.gov.in/
- UIDAI Aadhaar specs: https://uidai.gov.in/
- NSDL PAN specs: https://www.onlineservices.nsdl.com/paam/endUserRegisterContact.html

---

## 19. Claude Code prompts bank

Copy-paste these prompts into Claude Code in order. Each builds on the previous.

### Prompt 1: AI Background Removal
*(See Phase 1 above — the full prompt is in that section)*

### Prompt 2: Face Detection
*(See Phase 2 above)*

### Prompt 3: Print Sheet
*(See Phase 3 above)*

### Prompt 4: Aadhaar Merger
*(See Phase 4 above)*

### Prompt 5: Compliance Checker
*(See Phase 6 above)*

### Prompt 6: First SEO Page
*(See Phase 7 above)*

### Prompt 7: Hindi Support

```
Add Hindi language toggle to the app.

1. Create src/lib/i18n.ts with English and Hindi translations for all UI strings
2. Add a language toggle button (EN | हिं) in the header
3. Use React context to provide current language throughout the app
4. Translate: all button labels, instructions, preset names, compliance messages
5. Keep preset technical specs (pixel dimensions, KB) in English numerals
6. Add lang="hi" attribute when Hindi is selected for SEO
```

### Prompt 8: AdSense Integration

```
Add Google AdSense placeholder slots to the app.

1. Create an AdBanner component that renders a div with data-ad-slot attribute
2. Place one ad banner:
   - Above the tool on the tool page (leaderboard size)
   - Below the download button (rectangle size)
   - In guide pages between sections (in-article)
3. Use next/script to load AdSense script lazily
4. Add a comment placeholder: "Replace AD_CLIENT_ID and AD_SLOT_ID after AdSense approval"
5. Do NOT show ads inside the tool workflow (between upload and download)
```

### Prompt 9: Deploy Preparation

```
Prepare the app for production deployment on Vercel:

1. Add proper favicon (Indian flag colors: saffron, white, green)
2. Add Open Graph meta tags with a social sharing image
3. Add robots.txt allowing all crawlers
4. Add sitemap.xml with all pages
5. Add structured data (JSON-LD) for the tool pages — SoftwareApplication schema
6. Optimize images with next/image where applicable
7. Add error boundary for graceful failures
8. Test: npm run build — fix any build errors
```

---

*This document is the single source of truth for the PhotoSarkari project. Update it as features are completed.*

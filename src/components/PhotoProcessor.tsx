"use client";

import { useRef, useState, useCallback, useEffect } from "react";
import { Preset } from "@/lib/presets";

type Props = { preset: Preset };
type CropBox = { x: number; y: number; w: number; h: number };
type BgStatus = "idle" | "loading-model" | "removing" | "ready" | "error" | "unsupported";
type FaceStatus = "idle" | "loading" | "detected" | "not-found" | "error";

const PREVIEW_SIZE = 380;

export default function PhotoProcessor({ preset }: Props) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const previewCanvasRef = useRef<HTMLCanvasElement>(null);

  // Image refs — keep original and processed separate
  type ImgSource = HTMLImageElement | HTMLCanvasElement;
  const displayImgRef = useRef<ImgSource | null>(null);
  const originalImgRef = useRef<HTMLImageElement | null>(null);
  const processedImgRef = useRef<ImgSource | null>(null);

  const cropRef = useRef<CropBox>({ x: 0, y: 0, w: 0, h: 0 });
  const dragState = useRef<{
    active: boolean;
    startX: number;
    startY: number;
    origCrop: CropBox;
  }>({ active: false, startX: 0, startY: 0, origCrop: { x: 0, y: 0, w: 0, h: 0 } });

  const [isDragging, setIsDragging] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [outputKB, setOutputKB] = useState<number | null>(null);
  const [hasImage, setHasImage] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [finalBlobUrl, setFinalBlobUrl] = useState<string | null>(null);

  // AI background removal
  const [bgEnabled, setBgEnabled] = useState(true);
  const [bgColor, setBgColor] = useState<string>(preset.bgColor || "#FFFFFF");
  const [bgStatus, setBgStatus] = useState<BgStatus>("idle");
  const [bgTime, setBgTime] = useState<number | null>(null);
  const [showingOriginal, setShowingOriginal] = useState(false);

  const [isCleanSignature, setIsCleanSignature] = useState(preset.category === "signature");

  useEffect(() => {
    setBgColor(preset.bgColor || "#FFFFFF");
    setBgEnabled(preset.category === "photo");
    setIsCleanSignature(preset.category === "signature");
  }, [preset]);

  // Face detection
  const [faceStatus, setFaceStatus] = useState<FaceStatus>("idle");
  const faceModelLoaded = useRef(false);
  const faceBoxRef = useRef<{ x: number; y: number; w: number; h: number } | null>(null);

  // Print sheet data URL (set after each successful download)
  const lastDataUrlRef = useRef<string | null>(null);

  // ─── Drawing ────────────────────────────────────────────────────────────────

  const drawPreview = useCallback(() => {
    const canvas = previewCanvasRef.current;
    const img = displayImgRef.current;
    if (!canvas || !img) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.fillStyle = bgColor;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    if (preset.category === "signature" && isCleanSignature && !showingOriginal) {
      ctx.filter = "grayscale(100%) contrast(160%) brightness(110%)";
    }

    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
    ctx.filter = "none";

    const { x, y, w, h } = cropRef.current;

    const startY = Math.max(0, y);
    const endY = Math.min(canvas.height, y + h);
    const startX = Math.max(0, x);
    const endX = Math.min(canvas.width, x + w);

    ctx.fillStyle = "rgba(0,0,0,0.45)";
    ctx.fillRect(0, 0, canvas.width, startY);
    ctx.fillRect(0, endY, canvas.width, canvas.height - endY);
    ctx.fillRect(0, startY, startX, endY - startY);
    ctx.fillRect(endX, startY, canvas.width - endX, endY - startY);

    ctx.strokeStyle = "#f59e0b";
    ctx.lineWidth = 2;
    ctx.strokeRect(x, y, w, h);

    ctx.strokeStyle = "rgba(245,158,11,0.4)";
    ctx.lineWidth = 1;
    for (let i = 1; i < 3; i++) {
      ctx.beginPath();
      ctx.moveTo(x + (w / 3) * i, y);
      ctx.lineTo(x + (w / 3) * i, y + h);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(x, y + (h / 3) * i);
      ctx.lineTo(x + w, y + (h / 3) * i);
      ctx.stroke();
    }

    const s = 10;
    ctx.fillStyle = "#f59e0b";
    [[x, y], [x + w - s, y], [x, y + h - s], [x + w - s, y + h - s]].forEach(
      ([cx, cy]) => ctx.fillRect(cx, cy, s, s)
    );
  }, [bgColor, preset.category, isCleanSignature, showingOriginal]);

  useEffect(() => {
    if (hasImage) drawPreview();
  }, [bgColor, hasImage, drawPreview]);

  const initCrop = useCallback(
    (cw: number, ch: number, isPerfectMatch: boolean = false) => {
      const ar = preset.width / preset.height;
      let w: number, h: number;
      if (isPerfectMatch) { w = cw; h = ch; }
      else if (cw / ch > ar) { h = ch * 0.9; w = h * ar; }
      else { w = cw * 0.9; h = w / ar; }
      cropRef.current = { x: (cw - w) / 2, y: (ch - h) / 2, w, h };
    },
    [preset.width, preset.height]
  );

  const applySmartCrop = useCallback(
    (mode: "strict" | "portrait") => {
      const faceBox = faceBoxRef.current;
      const canvas = previewCanvasRef.current;
      const srcImg = displayImgRef.current;
      if (!canvas || !srcImg || !faceBox) return;

      const { x: fx, y: fy, w: fw, h: fh } = faceBox;
      let targetH, targetW;

      if (mode === "strict") {
        const heightBasedH = fh / 0.70;
        const heightBasedW = heightBasedH * (preset.width / preset.height);
        const minWForEars = fw / 0.85;

        if (heightBasedW < minWForEars) {
          targetW = minWForEars;
          targetH = targetW / (preset.width / preset.height);
        } else {
          targetH = heightBasedH;
          targetW = heightBasedW;
        }
      } else {
        targetH = fh / 0.45;
        targetW = targetH * (preset.width / preset.height);
      }

      // Center horizontally
      let cx = (fx + fw / 2) - targetW / 2;
      // Headroom: strict ~ 18% above face
      const headroom = mode === "strict" ? targetH * 0.18 : targetH * 0.25;
      let cy = fy - headroom;

      // Clamp
      cx = Math.max(0, Math.min(canvas.width - targetW, cx));
      cy = Math.max(0, Math.min(canvas.height - targetH, cy));
      const cw = Math.min(targetW, canvas.width - cx);
      const ch = Math.min(targetH, canvas.height - cy);

      cropRef.current = { x: cx, y: cy, w: cw, h: ch };
      drawPreview();
    },
    [preset.width, preset.height, initCrop, drawPreview]
  );

  const fitCanvas = useCallback((img: HTMLImageElement) => {
    const canvas = previewCanvasRef.current;
    if (!canvas) return { cw: 0, ch: 0 };
    const iw = img.naturalWidth || img.width;
    const ih = img.naturalHeight || img.height;
    const ar = iw / ih;
    const cw = ar >= 1 ? PREVIEW_SIZE : Math.round(PREVIEW_SIZE * ar);
    const ch = ar >= 1 ? Math.round(PREVIEW_SIZE / ar) : PREVIEW_SIZE;
    canvas.width = cw;
    canvas.height = ch;
    return { cw, ch };
  }, []);

  // ─── Phase 2: Face detection auto-crop ──────────────────────────────────────

  const runFaceDetection = useCallback(
    async (src: ImgSource) => {
      setFaceStatus("loading");
      try {
        const faceapi = await import("face-api.js");
        if (!faceModelLoaded.current) {
          await faceapi.nets.tinyFaceDetector.loadFromUri("/models");
          faceModelLoaded.current = true;
        }

        const detection = await faceapi.detectSingleFace(
          src as HTMLImageElement,
          new faceapi.TinyFaceDetectorOptions({ inputSize: 416, scoreThreshold: 0.5 })
        );

        if (!detection) {
          setFaceStatus("not-found");
          return;
        }

        const canvas = previewCanvasRef.current!;
        const srcW = src instanceof HTMLCanvasElement ? src.width : (src.naturalWidth || src.width);
        const srcH = src instanceof HTMLCanvasElement ? src.height : (src.naturalHeight || src.height);
        const scaleX = canvas.width / srcW;
        const scaleY = canvas.height / srcH;

        // Face bounding box in preview canvas coordinate space
        const fx = detection.box.x * scaleX;
        const fy = detection.box.y * scaleY;
        const fw = detection.box.width * scaleX;
        const fh = detection.box.height * scaleY;

        faceBoxRef.current = { x: fx, y: fy, w: fw, h: fh };
        
        applySmartCrop("strict");
        setFaceStatus("detected");
      } catch (err) {
        console.error("Face detection error:", err);
        setFaceStatus("error");
      }
    },
    [applySmartCrop]
  );

  // ─── AI background removal ───────────────────────────────────────────────────

  const runBgRemoval = useCallback(
    async (file: File, isPerfectMatch: boolean = false) => {
      setBgStatus("loading-model");
      const t0 = Date.now();
      try {
        const { removeBackground } = await import("@imgly/background-removal");
        setBgStatus("removing");

        const transparentBlob = await removeBackground(file, {
          publicPath: "https://staticimgly.com/@imgly/background-removal-data/1.7.0/dist/",
        });
        const bitmap = await createImageBitmap(transparentBlob);

        // Validate the model detected a subject (not an all-transparent result)
        const sampleCanvas = document.createElement("canvas");
        sampleCanvas.width = Math.min(32, bitmap.width);
        sampleCanvas.height = Math.min(32, bitmap.height);
        const sampleCtx = sampleCanvas.getContext("2d")!;
        sampleCtx.drawImage(bitmap, 0, 0, sampleCanvas.width, sampleCanvas.height);
        const { data } = sampleCtx.getImageData(0, 0, sampleCanvas.width, sampleCanvas.height);
        let hasContent = false;
        for (let i = 3; i < data.length; i += 4) {
          if (data[i] > 10) { hasContent = true; break; }
        }
        if (!hasContent) {
          bitmap.close();
          throw new Error("Background removal produced no foreground subject");
        }

        // Composite onto white background
        const offscreen = document.createElement("canvas");
        offscreen.width = bitmap.width;
        offscreen.height = bitmap.height;
        const offCtx = offscreen.getContext("2d")!;
        offCtx.fillStyle = "#FFFFFF";
        offCtx.fillRect(0, 0, offscreen.width, offscreen.height);
        offCtx.drawImage(bitmap, 0, 0);
        bitmap.close();

        processedImgRef.current = offscreen;
        displayImgRef.current = offscreen;
        setShowingOriginal(false);
        drawPreview();

        setBgTime(Math.round((Date.now() - t0) / 100) / 10);
        setBgStatus("ready");

        // Face detection is now strictly opt-in via user button. We no longer force it.
      } catch (err) {
        console.error("BG removal error:", err);
        const msg = String(err);
        setBgStatus(
          msg.includes("SharedArrayBuffer") || msg.includes("wasm") || msg.includes("Worker")
            ? "unsupported"
            : "error"
        );
        displayImgRef.current = originalImgRef.current;
        drawPreview();
        if (preset.category === "photo" && originalImgRef.current && !isPerfectMatch) runFaceDetection(originalImgRef.current);
      }
    },
    [drawPreview, runFaceDetection, preset.category]
  );

  // ─── Image upload ────────────────────────────────────────────────────────────

  const loadImage = useCallback(
    (file: File) => {
      setErrorMsg(null);
      setOutputKB(null);
      setBgStatus("idle");
      setBgTime(null);
      setShowingOriginal(false);
      setFaceStatus("idle");
      setFinalBlobUrl(null);
      processedImgRef.current = null;
      lastDataUrlRef.current = null;
      faceBoxRef.current = null;

      const reader = new FileReader();
      reader.onload = (e) => {
        const img = new Image();
        img.onload = () => {
          originalImgRef.current = img;
          displayImgRef.current = img;
          const { cw, ch } = fitCanvas(img);
          
          const imgRatio = (img.naturalWidth || img.width) / (img.naturalHeight || img.height);
          const presetRatio = preset.width / preset.height;
          const isPerfectMatch = Math.abs(imgRatio - presetRatio) < 0.02;
          
          // Default: "Zoom Out (Pad)" — show the entire image inside the target
          // aspect ratio, adding white padding where needed. Nothing is cropped.
          const ar = preset.width / preset.height;
          let boxW: number, boxH: number;
          if (isPerfectMatch) {
            boxW = cw; boxH = ch;
          } else if (cw / ch > ar) {
            // Image is wider than target → expand height to fit full width
            boxW = cw; boxH = boxW / ar;
          } else {
            // Image is taller than target → expand width to fit full height
            boxH = ch; boxW = boxH * ar;
          }
          cropRef.current = { x: (cw - boxW) / 2, y: (ch - boxH) / 2, w: boxW, h: boxH };
          setHasImage(true);
          drawPreview();
          if (preset.category === "photo") {
            runBgRemoval(file, isPerfectMatch);
          }
        };
        img.src = e.target?.result as string;
      };
      reader.readAsDataURL(file);
    },
    [bgEnabled, fitCanvas, initCrop, drawPreview, runBgRemoval, runFaceDetection, preset.width, preset.height, preset.category]
  );

  // ─── Before / After toggle ───────────────────────────────────────────────────

  const showProcessed = useCallback(() => {
    if (!processedImgRef.current) return;
    displayImgRef.current = processedImgRef.current;
    setShowingOriginal(false);
    drawPreview();
  }, [drawPreview]);

  const showOriginal = useCallback(() => {
    if (!originalImgRef.current) return;
    displayImgRef.current = originalImgRef.current;
    setShowingOriginal(true);
    drawPreview();
  }, [drawPreview]);

  // ─── Drag & drop ─────────────────────────────────────────────────────────────

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragging(false);
      const file = e.dataTransfer.files[0];
      if (file?.type.startsWith("image/")) loadImage(file);
    },
    [loadImage]
  );

  const handleFileChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) loadImage(file);
    },
    [loadImage]
  );

  // ─── Crop drag (mouse + touch) ───────────────────────────────────────────────

  const getPos = (canvas: HTMLCanvasElement, cx: number, cy: number) => {
    const r = canvas.getBoundingClientRect();
    return {
      x: (cx - r.left) * (canvas.width / r.width),
      y: (cy - r.top) * (canvas.height / r.height),
    };
  };

  const onPointerDown = useCallback((clientX: number, clientY: number) => {
    const canvas = previewCanvasRef.current;
    if (!canvas) return;
    const pos = getPos(canvas, clientX, clientY);
    const { x, y, w, h } = cropRef.current;
    if (pos.x >= x && pos.x <= x + w && pos.y >= y && pos.y <= y + h) {
      dragState.current = { active: true, startX: pos.x, startY: pos.y, origCrop: { x, y, w, h } };
      setFinalBlobUrl(null);
    }
  }, []);

  const onPointerMove = useCallback(
    (clientX: number, clientY: number) => {
      if (!dragState.current.active) return;
      const canvas = previewCanvasRef.current;
      if (!canvas) return;
      const pos = getPos(canvas, clientX, clientY);
      const { startX, startY, origCrop } = dragState.current;
      const minX = Math.min(0, canvas.width - origCrop.w);
      const maxX = Math.max(0, canvas.width - origCrop.w);
      const minY = Math.min(0, canvas.height - origCrop.h);
      const maxY = Math.max(0, canvas.height - origCrop.h);
      cropRef.current = {
        ...origCrop,
        x: Math.max(minX, Math.min(maxX, origCrop.x + pos.x - startX)),
        y: Math.max(minY, Math.min(maxY, origCrop.y + pos.y - startY)),
      };
      drawPreview();
    },
    [drawPreview]
  );

  const onPointerUp = useCallback(() => { dragState.current.active = false; }, []);

  useEffect(() => {
    const canvas = previewCanvasRef.current;
    if (!canvas) return;
    const md = (e: MouseEvent) => onPointerDown(e.clientX, e.clientY);
    const mm = (e: MouseEvent) => onPointerMove(e.clientX, e.clientY);
    const mu = () => onPointerUp();
    const ts = (e: TouchEvent) => { onPointerDown(e.touches[0].clientX, e.touches[0].clientY); if (dragState.current.active) e.preventDefault(); };
    const tm = (e: TouchEvent) => { if (!dragState.current.active) return; e.preventDefault(); onPointerMove(e.touches[0].clientX, e.touches[0].clientY); };
    const te = () => onPointerUp();
    canvas.addEventListener("mousedown", md);
    window.addEventListener("mousemove", mm);
    window.addEventListener("mouseup", mu);
    canvas.addEventListener("touchstart", ts, { passive: false });
    window.addEventListener("touchmove", tm, { passive: false });
    window.addEventListener("touchend", te);
    return () => {
      canvas.removeEventListener("mousedown", md);
      window.removeEventListener("mousemove", mm);
      window.removeEventListener("mouseup", mu);
      canvas.removeEventListener("touchstart", ts);
      window.removeEventListener("touchmove", tm);
      window.removeEventListener("touchend", te);
    };
  }, [onPointerDown, onPointerMove, onPointerUp]);

  // ─── Compression ─────────────────────────────────────────────────────────────

  const compressToTargetKB = (canvas: HTMLCanvasElement, targetKB: number): Promise<Blob> =>
    new Promise((resolve, reject) => {
      let lo = 0.1, hi = 1.0, attempts = 0;
      const tryQ = (q: number) => {
        canvas.toBlob((blob) => {
          if (!blob) { reject(new Error("toBlob failed")); return; }
          attempts++;
          if (attempts > 12 || hi - lo < 0.02) { resolve(blob); return; }
          if (blob.size <= targetKB * 1024) { lo = q; tryQ((q + hi) / 2); }
          else { hi = q; tryQ((lo + q) / 2); }
        }, "image/jpeg", q);
      };
      tryQ(0.85);
    });

  // ─── Process & Download ───────────────────────────────────────────────────────

  const handleProcess = useCallback(async () => {
    const img = displayImgRef.current;
    const previewCanvas = previewCanvasRef.current;
    if (!img || !previewCanvas) return;
    setIsProcessing(true);
    setErrorMsg(null);
    try {
      const { x, y, w, h } = cropRef.current;

      const srcW = img instanceof HTMLCanvasElement ? img.width : (img.naturalWidth || img.width);
      const srcH = img instanceof HTMLCanvasElement ? img.height : (img.naturalHeight || img.height);
      const sx = srcW / previewCanvas.width;
      const sy = srcH / previewCanvas.height;

      const cropX = Math.round(x * sx);
      const cropY = Math.round(y * sy);
      const cropW = Math.max(1, Math.round(w * sx));
      const cropH = Math.max(1, Math.round(h * sy));

      // Step 1: extract crop region (3-arg drawImage avoids source-clipping issues)
      const crop = document.createElement("canvas");
      crop.width = cropW;
      crop.height = cropH;
      const cropCtx = crop.getContext("2d")!;
      cropCtx.fillStyle = "#FFFFFF";
      cropCtx.fillRect(0, 0, cropW, cropH);
      cropCtx.drawImage(img, -cropX, -cropY);

      // Step 2: scale cropped region to output dimensions
      const out = document.createElement("canvas");
      out.width = preset.width;
      out.height = preset.height;
      const ctx = out.getContext("2d")!;
      ctx.fillStyle = bgColor;
      ctx.fillRect(0, 0, preset.width, preset.height);
      
      if (preset.category === "signature" && isCleanSignature) {
        ctx.filter = "grayscale(100%) contrast(160%) brightness(110%)";
      }
      ctx.drawImage(crop, 0, 0, preset.width, preset.height);
      ctx.filter = "none";

      const blob = await compressToTargetKB(out, preset.maxKB);
      const finalKB = Math.round(blob.size / 1024);

      lastDataUrlRef.current = out.toDataURL("image/jpeg", 0.92);
      setOutputKB(finalKB);
      const blobUrl = URL.createObjectURL(blob);
      setFinalBlobUrl(blobUrl);

      // Auto-download immediately — user should not need a second click
      const a = document.createElement("a");
      a.href = blobUrl;
      a.download = `${preset.slug}-${preset.category}.jpeg`;
      a.click();

    } catch (err) {
      setErrorMsg("Processing failed. Please try again.");
      console.error(err);
    } finally {
      setIsProcessing(false);
    }
  }, [preset, isCleanSignature]);

  const triggerDownload = useCallback(() => {
    if (!finalBlobUrl) return;
    const a = document.createElement("a");
    a.href = finalBlobUrl;
    a.download = `${preset.slug}-${preset.category}.jpeg`;
    a.click();
  }, [finalBlobUrl, preset.slug, preset.category]);

  // ─── Phase 3: Print sheet PDF ────────────────────────────────────────────────

  const handlePrintSheet = useCallback(async (count: 4 | 6 | 8) => {
    const dataUrl = lastDataUrlRef.current;
    if (!dataUrl) return;
    try {
      const { default: jsPDF } = await import("jspdf");
      // 4R photo paper: 4×6 inches = 101.6×152.4mm, landscape orientation
      const pdf = new jsPDF({ orientation: "landscape", unit: "mm", format: [101.6, 152.4] });

      // Derive physical photo size from preset aspect ratio, capped at 45mm tall
      const photoH = 45;
      const photoW = Math.round(photoH * (preset.width / preset.height) * 10) / 10;
      const gap = 2;
      const paperW = 152.4, paperH = 101.6;

      // Clamp to what physically fits on 4R paper
      const maxCols = Math.max(1, Math.floor((paperW + gap) / (photoW + gap)));
      const maxRows = Math.max(1, Math.floor((paperH + gap) / (photoH + gap)));
      const cols = Math.min(count, maxCols, Math.ceil(count / maxRows));
      const rows = Math.min(Math.ceil(count / cols), maxRows);
      const actualCount = cols * rows;

      const gridW = cols * photoW + (cols - 1) * gap;
      const gridH = rows * photoH + (rows - 1) * gap;
      const startX = (paperW - gridW) / 2;
      const startY = (paperH - gridH) / 2;

      for (let i = 0; i < actualCount; i++) {
        const col = i % cols;
        const row = Math.floor(i / cols);
        const px = startX + col * (photoW + gap);
        const py = startY + row * (photoH + gap);
        pdf.addImage(dataUrl, "JPEG", px, py, photoW, photoH);
        // Dashed cutting guide
        pdf.setDrawColor(180, 180, 180);
        pdf.setLineWidth(0.15);
        pdf.rect(px, py, photoW, photoH, "S");
      }

      pdf.save(`photosarkari-print-${count}photos.pdf`);
    } catch (err) {
      console.error("Print sheet error:", err);
    }
  }, [preset.width, preset.height]);

  // ─── Reset ────────────────────────────────────────────────────────────────────

  const handleReset = useCallback(() => {
    setHasImage(false);
    setOutputKB(null);
    setErrorMsg(null);
    setBgStatus("idle");
    setBgTime(null);
    setShowingOriginal(false);
    setFaceStatus("idle");
    setFinalBlobUrl(null);
    displayImgRef.current = null;
    originalImgRef.current = null;
    processedImgRef.current = null;
    lastDataUrlRef.current = null;
    faceBoxRef.current = null;
    dragState.current = { active: false, startX: 0, startY: 0, origCrop: { x: 0, y: 0, w: 0, h: 0 } };
    if (fileInputRef.current) fileInputRef.current.value = "";
  }, []);

  // ─── Derived state ────────────────────────────────────────────────────────────

  const aiWorking = bgStatus === "loading-model" || bgStatus === "removing";
  const faceWorking = faceStatus === "loading";
  const canProcess = !isProcessing && !aiWorking && !faceWorking;

  const bgStatusContent = (() => {
    if (bgStatus === "idle") return null;
    if (bgStatus === "loading-model") return { type: "info" as const, msg: "Loading AI model… (first time only, ~30MB)" };
    if (bgStatus === "removing") return { type: "info" as const, msg: "Removing background…" };
    if (bgStatus === "ready") return { type: "success" as const, msg: `AI Ready ✓ — Background removed in ${bgTime}s` };
    if (bgStatus === "error") return { type: "warn" as const, msg: "Background removal failed. You can still crop and resize manually." };
    if (bgStatus === "unsupported") return { type: "warn" as const, msg: "Background removal not supported on this device. You can still crop and resize manually." };
    return null;
  })();


  // ─── Render ───────────────────────────────────────────────────────────────────

  return (
    <div className="max-w-lg mx-auto">
      {/* Target Specs Card */}
      <div className="mb-4 rounded-[var(--radius)] p-4"
           style={{ background: "var(--surface)", border: "1px solid var(--border)", boxShadow: "var(--shadow-card)" }}>
        <h2 className="text-xs font-bold mb-2" style={{ fontFamily: "var(--font-heading)", color: "var(--text-primary)" }}>Target Requirements</h2>
        <div className="flex flex-wrap gap-2 text-xs">
          <span className="rounded-lg px-2.5 py-1 font-medium" style={{ background: "var(--saffron-glow)", color: "var(--saffron)" }}>
            {preset.width} × {preset.height} px
          </span>
          <span className="rounded-lg px-2.5 py-1 font-medium" style={{ background: "var(--green-soft)", color: "var(--green)" }}>
            Max {preset.maxKB} KB
          </span>
          <span className="rounded-lg px-2.5 py-1 font-medium" style={{ background: "#f0f0f5", color: "var(--text-secondary)" }}>JPEG</span>
        </div>
      </div>

      {preset.category === "signature" && (
        <div className="mb-4 rounded-[var(--radius)] px-4 py-3 flex items-center justify-between gap-3"
             style={{ background: "var(--surface)", border: "1px solid var(--border)", boxShadow: "var(--shadow-card)" }}>
          <div>
            <p className="text-sm font-semibold" style={{ color: "var(--text-primary)" }}>Clean Signature (High Contrast)</p>
            <p className="text-xs mt-0.5" style={{ color: "var(--text-muted)" }}>
              Removes paper shadows and makes ink crisp for portals
            </p>
          </div>
          <button
            role="switch"
            aria-checked={isCleanSignature}
            onClick={() => { setIsCleanSignature((v) => !v); setFinalBlobUrl(null); }}
            className={`relative flex-shrink-0 w-11 h-6 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-offset-1 ${
              isCleanSignature ? "" : "bg-gray-300"
            }`}
            style={isCleanSignature ? { background: "var(--saffron)" } : undefined}
          >
            <span
              className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform ${
                isCleanSignature ? "translate-x-5" : ""
              }`}
            />
          </button>
        </div>
      )}

      {/* Dropzone */}
      {!hasImage && (
        <div
          onDrop={handleDrop}
          onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
          onDragLeave={() => setIsDragging(false)}
          onClick={() => fileInputRef.current?.click()}
          className="border-2 border-dashed rounded-[var(--radius)] p-10 text-center cursor-pointer transition-all"
          style={{
            borderColor: isDragging ? "var(--saffron)" : "rgba(0,0,0,0.12)",
            background: isDragging ? "var(--saffron-glow)" : "var(--surface)",
          }}
        >
          <div className="flex flex-col items-center gap-3">
            <div className="w-14 h-14 rounded-2xl flex items-center justify-center"
                 style={{ background: "var(--saffron-glow)" }}>
              <svg className="w-7 h-7" style={{ color: "var(--saffron)" }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <div>
              <p className="font-semibold text-sm" style={{ color: "var(--text-primary)" }}>
                {preset.category === "signature" ? "Upload Signature Photo" : "Drop your photo here"}
              </p>
              <p className="text-sm mt-1" style={{ color: "var(--text-muted)" }}>
                {preset.category === "signature" ? "Sign on blank white paper & snap a clear photo" : "or click to browse from your device"}
              </p>
            </div>
            <p className="text-[11px]" style={{ color: "var(--text-muted)" }}>JPG, PNG, WEBP supported</p>
          </div>
          <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={handleFileChange} />
        </div>
      )}

      {/* Preview + controls — always in DOM so previewCanvasRef is valid when loadImage runs */}
      <div className={`space-y-3 ${hasImage ? "" : "hidden"}`}>
        {/* AI background removal status */}
        {bgStatusContent && (
          <div
            className={`flex items-center gap-2 rounded-lg px-4 py-2.5 text-sm ${
              bgStatusContent.type === "success"
                ? "bg-green-50 border border-green-200 text-green-700"
                : bgStatusContent.type === "warn"
                ? "bg-amber-50 border border-amber-200 text-amber-700"
                : "bg-blue-50 border border-blue-200 text-blue-700"
            }`}
          >
            {aiWorking ? (
              <svg className="w-4 h-4 animate-spin flex-shrink-0" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
              </svg>
            ) : bgStatusContent.type === "success" ? (
              <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            ) : (
              <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            )}
            <span>{bgStatusContent.msg}</span>
          </div>
        )}

        {/* Before / After toggle */}
        {bgStatus === "ready" && (
          <div className="flex items-center gap-1.5 p-0.5 rounded-full" style={{ background: "#f0f0f5" }}>
            <button
              onClick={showProcessed}
              className="text-xs px-3 py-1.5 rounded-full font-medium transition-all"
              style={!showingOriginal ? { background: "var(--navy)", color: "white" } : { color: "var(--text-muted)" }}
            >
              Background Removed
            </button>
            <button
              onClick={showOriginal}
              className="text-xs px-3 py-1.5 rounded-full font-medium transition-all"
              style={showingOriginal ? { background: "var(--navy)", color: "white" } : { color: "var(--text-muted)" }}
            >
              Original
            </button>
          </div>
        )}

        {/* Canvas */}
        <div className="rounded-[var(--radius)] p-3 flex flex-col items-center" style={{ background: "#f0f0f5" }}>
          <p className="text-xs mb-2 text-center" style={{ color: "var(--text-muted)" }}>
            {aiWorking || faceWorking
              ? "Processing your photo…"
              : "Drag the highlighted area to adjust the crop"}
          </p>
          <canvas
            ref={previewCanvasRef}
            className="rounded-lg cursor-move max-w-full touch-none"
            style={{ maxHeight: "380px" }}
          />
        </div>


        {/* Download success */}
        {outputKB !== null && (
          <div className="flex items-center gap-2 rounded-lg px-4 py-2.5"
               style={{ background: "var(--green-soft)", border: "1px solid rgba(13,148,101,0.15)" }}>
            <svg className="w-4 h-4 flex-shrink-0" style={{ color: "var(--green)" }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            <p className="text-sm" style={{ color: "var(--green)" }}>
              Downloaded!{" "}
              <span className="font-semibold">{outputKB} KB</span>{" "}
              (max {preset.maxKB} KB)
            </p>
          </div>
        )}

        {/* Phase 3: Print sheet — photo presets only, appears after first successful download */}
        {preset.category === "photo" && outputKB !== null && (
          <div className="rounded-[var(--radius)] px-4 py-3"
               style={{ background: "var(--surface)", border: "1px solid var(--border)", boxShadow: "var(--shadow-card)" }}>
            <p className="text-sm font-bold mb-0.5" style={{ fontFamily: "var(--font-heading)", color: "var(--text-primary)" }}>
              Generate Print Sheet (PDF)
            </p>
            <p className="text-xs mb-3" style={{ color: "var(--text-muted)" }}>
              4R paper (4×6 in) with cutting guides &middot; Take to any print shop
            </p>
            <div className="flex gap-2">
              {([4, 6, 8] as const).map((n) => (
                <button
                  key={n}
                  onClick={() => handlePrintSheet(n)}
                  className="flex-1 py-2 rounded-lg text-sm font-medium transition-all hover:-translate-y-0.5"
                  style={{ border: "1px solid var(--border)", color: "var(--text-secondary)", background: "var(--surface)" }}
                >
                  {n} photos
                </button>
              ))}
            </div>
          </div>
        )}

        {errorMsg && (
          <div className="rounded-lg px-4 py-2.5" style={{ background: "#fef2f2", border: "1px solid rgba(220,38,38,0.15)" }}>
            <p className="text-sm" style={{ color: "#dc2626" }}>{errorMsg}</p>
          </div>
        )}

        {/* Action buttons */}
        <div className="flex gap-3">
          <button
            onClick={finalBlobUrl ? triggerDownload : handleProcess}
            disabled={!canProcess}
            className="flex-1 text-white font-semibold py-3 px-6 rounded-xl transition-all text-base flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            style={{ background: finalBlobUrl ? "var(--green)" : "var(--saffron)", fontFamily: "var(--font-heading)" }}
          >
            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
            {isProcessing
              ? "Analyzing..."
              : aiWorking
              ? "AI Working..."
              : faceWorking
              ? "Detecting Face..."
              : finalBlobUrl
              ? "Download Again"
              : "Download Photo"}
          </button>
          <button
            onClick={handleReset}
            className="px-4 py-3 rounded-xl text-sm font-medium transition-colors"
            style={{ border: "1px solid var(--border)", color: "var(--text-secondary)", background: "var(--surface)" }}
          >
            Change
          </button>
        </div>

        <p className="text-[11px] text-center" style={{ color: "var(--text-muted)" }}>
          Final: {preset.width}×{preset.height} px &middot; max {preset.maxKB} KB &middot; JPEG
        </p>
      </div>
    </div>
  );
}

"use client";

import { useRef, useState, useCallback, useEffect } from "react";
import { Preset } from "@/lib/presets";

type Props = {
  preset: Preset;
};

type CropBox = {
  x: number;
  y: number;
  w: number;
  h: number;
};

export default function PhotoProcessor({ preset }: Props) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const previewCanvasRef = useRef<HTMLCanvasElement>(null);
  const sourceImgRef = useRef<HTMLImageElement | null>(null);

  const [isDragging, setIsDragging] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [outputKB, setOutputKB] = useState<number | null>(null);
  const [hasImage, setHasImage] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // Crop state on the preview canvas
  const cropRef = useRef<CropBox>({ x: 0, y: 0, w: 0, h: 0 });
  const dragState = useRef<{
    active: boolean;
    startX: number;
    startY: number;
    origCrop: CropBox;
  }>({ active: false, startX: 0, startY: 0, origCrop: { x: 0, y: 0, w: 0, h: 0 } });

  const PREVIEW_SIZE = 380; // preview canvas width

  // Draw the preview with crop overlay
  const drawPreview = useCallback(() => {
    const canvas = previewCanvasRef.current;
    const img = sourceImgRef.current;
    if (!canvas || !img) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

    const crop = cropRef.current;

    // Dim outside crop
    ctx.fillStyle = "rgba(0,0,0,0.45)";
    ctx.fillRect(0, 0, canvas.width, crop.y);
    ctx.fillRect(0, crop.y + crop.h, canvas.width, canvas.height - crop.y - crop.h);
    ctx.fillRect(0, crop.y, crop.x, crop.h);
    ctx.fillRect(crop.x + crop.w, crop.y, canvas.width - crop.x - crop.w, crop.h);

    // Crop border
    ctx.strokeStyle = "#f59e0b";
    ctx.lineWidth = 2;
    ctx.strokeRect(crop.x, crop.y, crop.w, crop.h);

    // Rule-of-thirds lines
    ctx.strokeStyle = "rgba(245,158,11,0.4)";
    ctx.lineWidth = 1;
    for (let i = 1; i < 3; i++) {
      ctx.beginPath();
      ctx.moveTo(crop.x + (crop.w / 3) * i, crop.y);
      ctx.lineTo(crop.x + (crop.w / 3) * i, crop.y + crop.h);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(crop.x, crop.y + (crop.h / 3) * i);
      ctx.lineTo(crop.x + crop.w, crop.y + (crop.h / 3) * i);
      ctx.stroke();
    }

    // Corner handles
    const handleSize = 10;
    ctx.fillStyle = "#f59e0b";
    const corners = [
      [crop.x, crop.y],
      [crop.x + crop.w - handleSize, crop.y],
      [crop.x, crop.y + crop.h - handleSize],
      [crop.x + crop.w - handleSize, crop.y + crop.h - handleSize],
    ];
    corners.forEach(([cx, cy]) => ctx.fillRect(cx, cy, handleSize, handleSize));
  }, []);

  const initCrop = useCallback(
    (canvasW: number, canvasH: number) => {
      const aspectRatio = preset.width / preset.height;
      let w: number, h: number;
      if (canvasW / canvasH > aspectRatio) {
        h = canvasH * 0.9;
        w = h * aspectRatio;
      } else {
        w = canvasW * 0.9;
        h = w / aspectRatio;
      }
      cropRef.current = {
        x: (canvasW - w) / 2,
        y: (canvasH - h) / 2,
        w,
        h,
      };
    },
    [preset.width, preset.height]
  );

  const loadImage = useCallback(
    (file: File) => {
      setErrorMsg(null);
      setOutputKB(null);
      const reader = new FileReader();
      reader.onload = (e) => {
        const img = new Image();
        img.onload = () => {
          sourceImgRef.current = img;
          const canvas = previewCanvasRef.current;
          if (!canvas) return;

          // Set canvas size maintaining aspect ratio within PREVIEW_SIZE
          const imgAspect = img.width / img.height;
          let cw: number, ch: number;
          if (imgAspect >= 1) {
            cw = PREVIEW_SIZE;
            ch = Math.round(PREVIEW_SIZE / imgAspect);
          } else {
            ch = PREVIEW_SIZE;
            cw = Math.round(PREVIEW_SIZE * imgAspect);
          }
          canvas.width = cw;
          canvas.height = ch;

          initCrop(cw, ch);
          setHasImage(true);
          drawPreview();
        };
        img.src = e.target?.result as string;
      };
      reader.readAsDataURL(file);
    },
    [initCrop, drawPreview]
  );

  // Drag & drop on the drop zone
  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragging(false);
      const file = e.dataTransfer.files[0];
      if (file && file.type.startsWith("image/")) {
        loadImage(file);
      }
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

  // Mouse/touch events on the preview canvas for dragging crop
  const getCanvasPos = (
    canvas: HTMLCanvasElement,
    clientX: number,
    clientY: number
  ) => {
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    return {
      x: (clientX - rect.left) * scaleX,
      y: (clientY - rect.top) * scaleY,
    };
  };

  const onPointerDown = useCallback((clientX: number, clientY: number) => {
    const canvas = previewCanvasRef.current;
    if (!canvas) return;
    const pos = getCanvasPos(canvas, clientX, clientY);
    const crop = cropRef.current;
    if (
      pos.x >= crop.x &&
      pos.x <= crop.x + crop.w &&
      pos.y >= crop.y &&
      pos.y <= crop.y + crop.h
    ) {
      dragState.current = {
        active: true,
        startX: pos.x,
        startY: pos.y,
        origCrop: { ...crop },
      };
    }
  }, []);

  const onPointerMove = useCallback(
    (clientX: number, clientY: number) => {
      if (!dragState.current.active) return;
      const canvas = previewCanvasRef.current;
      if (!canvas) return;
      const pos = getCanvasPos(canvas, clientX, clientY);
      const ds = dragState.current;
      const dx = pos.x - ds.startX;
      const dy = pos.y - ds.startY;
      let nx = ds.origCrop.x + dx;
      let ny = ds.origCrop.y + dy;
      // Clamp within canvas
      nx = Math.max(0, Math.min(canvas.width - ds.origCrop.w, nx));
      ny = Math.max(0, Math.min(canvas.height - ds.origCrop.h, ny));
      cropRef.current = { ...ds.origCrop, x: nx, y: ny };
      drawPreview();
    },
    [drawPreview]
  );

  const onPointerUp = useCallback(() => {
    dragState.current.active = false;
  }, []);

  // Attach mouse/touch listeners
  useEffect(() => {
    const canvas = previewCanvasRef.current;
    if (!canvas) return;

    const mouseDown = (e: MouseEvent) => onPointerDown(e.clientX, e.clientY);
    const mouseMove = (e: MouseEvent) => onPointerMove(e.clientX, e.clientY);
    const mouseUp = () => onPointerUp();
    const touchStart = (e: TouchEvent) => {
      e.preventDefault();
      onPointerDown(e.touches[0].clientX, e.touches[0].clientY);
    };
    const touchMove = (e: TouchEvent) => {
      e.preventDefault();
      onPointerMove(e.touches[0].clientX, e.touches[0].clientY);
    };
    const touchEnd = () => onPointerUp();

    canvas.addEventListener("mousedown", mouseDown);
    window.addEventListener("mousemove", mouseMove);
    window.addEventListener("mouseup", mouseUp);
    canvas.addEventListener("touchstart", touchStart, { passive: false });
    window.addEventListener("touchmove", touchMove, { passive: false });
    window.addEventListener("touchend", touchEnd);

    return () => {
      canvas.removeEventListener("mousedown", mouseDown);
      window.removeEventListener("mousemove", mouseMove);
      window.removeEventListener("mouseup", mouseUp);
      canvas.removeEventListener("touchstart", touchStart);
      window.removeEventListener("touchmove", touchMove);
      window.removeEventListener("touchend", touchEnd);
    };
  }, [onPointerDown, onPointerMove, onPointerUp]);

  const compressToTargetKB = (
    canvas: HTMLCanvasElement,
    targetKB: number
  ): Promise<Blob> => {
    return new Promise((resolve, reject) => {
      const targetBytes = targetKB * 1024;
      let lo = 0.1;
      let hi = 1.0;
      let attempts = 0;

      const tryQuality = (q: number) => {
        canvas.toBlob(
          (blob) => {
            if (!blob) {
              reject(new Error("Canvas toBlob failed"));
              return;
            }
            attempts++;
            if (attempts > 12 || hi - lo < 0.02) {
              resolve(blob);
              return;
            }
            if (blob.size <= targetBytes) {
              lo = q;
              tryQuality((q + hi) / 2);
            } else {
              hi = q;
              tryQuality((lo + q) / 2);
            }
          },
          "image/jpeg",
          q
        );
      };
      tryQuality(0.85);
    });
  };

  const handleProcess = useCallback(async () => {
    const img = sourceImgRef.current;
    const previewCanvas = previewCanvasRef.current;
    if (!img || !previewCanvas) return;

    setIsProcessing(true);
    setErrorMsg(null);

    try {
      const crop = cropRef.current;
      // Scale crop coords back to original image coords
      const scaleX = img.width / previewCanvas.width;
      const scaleY = img.height / previewCanvas.height;

      const srcX = crop.x * scaleX;
      const srcY = crop.y * scaleY;
      const srcW = crop.w * scaleX;
      const srcH = crop.h * scaleY;

      // Output canvas at exact preset dimensions
      const outCanvas = document.createElement("canvas");
      outCanvas.width = preset.width;
      outCanvas.height = preset.height;
      const ctx = outCanvas.getContext("2d");
      if (!ctx) throw new Error("Canvas context unavailable");

      // White background
      ctx.fillStyle = preset.bgColor;
      ctx.fillRect(0, 0, preset.width, preset.height);
      ctx.drawImage(img, srcX, srcY, srcW, srcH, 0, 0, preset.width, preset.height);

      const blob = await compressToTargetKB(outCanvas, preset.maxKB);
      const kb = Math.round(blob.size / 1024);
      setOutputKB(kb);

      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${preset.slug}-photo.jpeg`;
      a.click();
      URL.revokeObjectURL(url);
    } catch (err) {
      setErrorMsg("Processing failed. Please try again.");
      console.error(err);
    } finally {
      setIsProcessing(false);
    }
  }, [preset]);

  return (
    <div className="max-w-lg mx-auto">
      {/* Dropzone */}
      {!hasImage && (
        <div
          onDrop={handleDrop}
          onDragOver={(e) => {
            e.preventDefault();
            setIsDragging(true);
          }}
          onDragLeave={() => setIsDragging(false)}
          onClick={() => fileInputRef.current?.click()}
          className={`border-2 border-dashed rounded-2xl p-10 text-center cursor-pointer transition-colors ${
            isDragging
              ? "border-blue-500 bg-blue-50"
              : "border-gray-300 bg-gray-50 hover:border-blue-400 hover:bg-blue-50"
          }`}
        >
          <div className="flex flex-col items-center gap-3">
            <svg
              className="w-12 h-12 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
            <div>
              <p className="font-semibold text-gray-700">
                Drop your photo here
              </p>
              <p className="text-sm text-gray-500 mt-1">
                or click to browse from your device
              </p>
            </div>
            <p className="text-xs text-gray-400">
              JPG, PNG, WEBP supported
            </p>
          </div>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleFileChange}
          />
        </div>
      )}

      {/* Preview canvas */}
      {hasImage && (
        <div className="space-y-4">
          <div className="bg-gray-100 rounded-xl p-3 flex flex-col items-center">
            <p className="text-xs text-gray-500 mb-2 text-center">
              Drag the highlighted area to adjust the crop
            </p>
            <canvas
              ref={previewCanvasRef}
              className="rounded-lg cursor-move max-w-full touch-none"
              style={{ maxHeight: "380px" }}
            />
          </div>

          {/* Output info */}
          {outputKB !== null && (
            <div className="flex items-center gap-2 bg-green-50 border border-green-200 rounded-lg px-4 py-2">
              <svg
                className="w-4 h-4 text-green-600 flex-shrink-0"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
              <p className="text-sm text-green-700">
                Downloaded! Output size:{" "}
                <span className="font-semibold">{outputKB} KB</span>{" "}
                (max {preset.maxKB} KB)
              </p>
            </div>
          )}

          {errorMsg && (
            <div className="bg-red-50 border border-red-200 rounded-lg px-4 py-2">
              <p className="text-sm text-red-700">{errorMsg}</p>
            </div>
          )}

          <div className="flex gap-3">
            <button
              onClick={handleProcess}
              disabled={isProcessing}
              className="flex-1 bg-amber-500 hover:bg-amber-600 disabled:bg-amber-300 text-white font-semibold py-3 px-6 rounded-xl transition-colors text-base"
            >
              {isProcessing ? "Processing…" : "Process & Download"}
            </button>
            <button
              onClick={() => {
                setHasImage(false);
                setOutputKB(null);
                setErrorMsg(null);
                sourceImgRef.current = null;
                if (fileInputRef.current) fileInputRef.current.value = "";
              }}
              className="px-4 py-3 rounded-xl border border-gray-300 text-gray-600 hover:bg-gray-50 transition-colors text-sm"
            >
              Change
            </button>
          </div>

          <p className="text-xs text-gray-400 text-center">
            Final: {preset.width}×{preset.height} px • max {preset.maxKB} KB •
            JPEG
          </p>
        </div>
      )}
    </div>
  );
}

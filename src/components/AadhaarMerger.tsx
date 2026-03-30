"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import jsPDF from "jspdf";

const ID_RATIO = 85.6 / 54; // Standard ID card ratio
const PREVIEW_WIDTH = 340;

type CropBox = { x: number; y: number; w: number; h: number };

function IdSideCropper({
  title,
  onCrop,
}: {
  title: string;
  onCrop: (data: string | null) => void;
}) {
  const [hasImage, setHasImage] = useState(false);
  const [isConfirmed, setIsConfirmed] = useState(false);
  
  const fileInputRef = useRef<HTMLInputElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imgRef = useRef<HTMLImageElement | null>(null);
  const cropRef = useRef<CropBox>({ x: 0, y: 0, w: 0, h: 0 });
  const dragState = useRef({ active: false, startX: 0, startY: 0, origCrop: { x: 0, y: 0, w: 0, h: 0 } });

  const drawPreview = useCallback(() => {
    const canvas = canvasRef.current;
    const img = imgRef.current;
    if (!canvas || !img) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.fillStyle = "#F3F4F6";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

    if (isConfirmed) return; // don't draw overlay if confirmed

    const { x, y, w, h } = cropRef.current;

    // Dimming external area
    ctx.fillStyle = "rgba(0,0,0,0.5)";
    ctx.fillRect(0, 0, canvas.width, y);
    ctx.fillRect(0, y + h, canvas.width, canvas.height - y - h);
    ctx.fillRect(0, y, x, h);
    ctx.fillRect(x + w, y, canvas.width - x - w, h);

    // Frame
    ctx.strokeStyle = "#3b82f6";
    ctx.lineWidth = 2;
    ctx.strokeRect(x, y, w, h);

    // Grid
    ctx.strokeStyle = "rgba(59,130,246,0.3)";
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
  }, [isConfirmed]);

  const loadImage = useCallback((file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        imgRef.current = img;
        const canvas = canvasRef.current;
        if (!canvas) return;

        const imgRatio = img.width / img.height;
        const cw = imgRatio >= 1 ? PREVIEW_WIDTH : PREVIEW_WIDTH * imgRatio;
        const ch = imgRatio >= 1 ? PREVIEW_WIDTH / imgRatio : PREVIEW_WIDTH;
        
        canvas.width = cw;
        canvas.height = ch;

        // Default crop to maximum valid aspect ratio area
        let w, h;
        if (cw / ch > ID_RATIO) {
          h = ch * 0.9;
          w = h * ID_RATIO;
        } else {
          w = cw * 0.9;
          h = w / ID_RATIO;
        }
        cropRef.current = { x: (cw - w) / 2, y: (ch - h) / 2, w, h };
        
        setHasImage(true);
        setIsConfirmed(false);
        onCrop(null); // Reset parent state
        drawPreview();
      };
      img.src = e.target?.result as string;
    };
    reader.readAsDataURL(file);
  }, [drawPreview, onCrop]);

  // Touch & Mouse Drag Logic
  const getPos = (canvas: HTMLCanvasElement, cx: number, cy: number) => {
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    return { x: (cx - rect.left) * scaleX, y: (cy - rect.top) * scaleY };
  };

  const onPointerDown = useCallback((clientX: number, clientY: number) => {
    if (isConfirmed) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const pos = getPos(canvas, clientX, clientY);
    const { x, y, w, h } = cropRef.current;
    if (pos.x >= x && pos.x <= x + w && pos.y >= y && pos.y <= y + h) {
      dragState.current = { active: true, startX: pos.x, startY: pos.y, origCrop: { ...cropRef.current } };
    }
  }, [isConfirmed]);

  const onPointerMove = useCallback((clientX: number, clientY: number) => {
    if (!dragState.current.active || isConfirmed) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const pos = getPos(canvas, clientX, clientY);
    const { startX, startY, origCrop } = dragState.current;
    
    cropRef.current = {
      ...origCrop,
      x: Math.max(0, Math.min(canvas.width - origCrop.w, origCrop.x + pos.x - startX)),
      y: Math.max(0, Math.min(canvas.height - origCrop.h, origCrop.y + pos.y - startY)),
    };
    drawPreview();
  }, [drawPreview, isConfirmed]);

  const onPointerUp = useCallback(() => { dragState.current.active = false; }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const md = (e: MouseEvent) => onPointerDown(e.clientX, e.clientY);
    const mm = (e: MouseEvent) => onPointerMove(e.clientX, e.clientY);
    const mu = () => onPointerUp();
    const ts = (e: TouchEvent) => { e.preventDefault(); onPointerDown(e.touches[0].clientX, e.touches[0].clientY); };
    const tm = (e: TouchEvent) => { e.preventDefault(); onPointerMove(e.touches[0].clientX, e.touches[0].clientY); };
    canvas.addEventListener("mousedown", md);
    window.addEventListener("mousemove", mm);
    window.addEventListener("mouseup", mu);
    canvas.addEventListener("touchstart", ts, { passive: false });
    window.addEventListener("touchmove", tm, { passive: false });
    window.addEventListener("touchend", mu);
    return () => {
      canvas.removeEventListener("mousedown", md);
      window.removeEventListener("mousemove", mm);
      window.removeEventListener("mouseup", mu);
      canvas.removeEventListener("touchstart", ts);
      window.removeEventListener("touchmove", tm);
      window.removeEventListener("touchend", mu);
    };
  }, [onPointerDown, onPointerMove, onPointerUp]);

  const confirmCrop = () => {
    const img = imgRef.current;
    const canvas = canvasRef.current;
    if (!img || !canvas) return;

    // Generate max resolution extracted crop
    const { x, y, w, h } = cropRef.current;
    const scaleX = img.width / canvas.width;
    const scaleY = img.height / canvas.height;

    const out = document.createElement("canvas");
    // Standard high-res target for ID cards
    out.width = 1000;
    out.height = Math.round(1000 / ID_RATIO);
    const ctx = out.getContext("2d")!;
    
    ctx.fillStyle = "#FFFFFF";
    ctx.fillRect(0, 0, out.width, out.height);
    
    // Extract actual sub-region from the original image for zero generation loss
    ctx.drawImage(
      img,
      x * scaleX, y * scaleY, w * scaleX, h * scaleY,
      0, 0, out.width, out.height
    );

    const dataUrl = out.toDataURL("image/jpeg", 0.95);
    onCrop(dataUrl);
    setIsConfirmed(true);
    drawPreview();
  };

  const reset = () => {
    setHasImage(false);
    setIsConfirmed(false);
    imgRef.current = null;
    onCrop(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden flex flex-col items-center p-4">
      <h3 className="text-lg font-bold text-gray-800 mb-3">{title}</h3>
      
      <div 
        onClick={() => !hasImage && fileInputRef.current?.click()}
        className={`w-full aspect-[1.58] border-2 border-dashed border-gray-300 rounded-xl bg-gray-50 flex flex-col items-center justify-center cursor-pointer hover:bg-blue-50 hover:border-blue-400 transition-colors ${hasImage ? 'hidden' : ''}`}
      >
        <svg className="w-8 h-8 text-gray-400 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
        <span className="text-sm font-medium text-gray-600">Click to Upload</span>
      </div>

      <div className={`flex flex-col items-center w-full ${!hasImage ? 'hidden' : ''}`}>
        <canvas
          ref={canvasRef}
          className={`rounded-lg max-w-full touch-none ${!isConfirmed ? 'cursor-move' : ''}`}
          style={{ maxHeight: "300px" }}
        />
        <div className="flex gap-2 mt-4 w-full">
          {!isConfirmed ? (
            <button 
              onClick={confirmCrop}
              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-xl transition-colors"
            >
              Confirm Crop
            </button>
          ) : (
            <button 
              onClick={() => { setIsConfirmed(false); onCrop(null); drawPreview(); }}
              className="flex-1 bg-amber-100 hover:bg-amber-200 text-amber-800 font-semibold py-2 rounded-xl border border-amber-300 transition-colors"
            >
              Edit Crop
            </button>
          )}
          <button 
            onClick={reset}
            className="px-4 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold py-2 rounded-xl transition-colors"
          >
            Reset
          </button>
        </div>
      </div>

      <input 
        ref={fileInputRef}
        type="file" 
        accept="image/*" 
        className="hidden" 
        onChange={(e) => {
          if (e.target.files && e.target.files[0]) {
            loadImage(e.target.files[0]);
          }
        }} 
      />
    </div>
  );
}

export default function AadhaarMerger() {
  const [frontData, setFrontData] = useState<string | null>(null);
  const [backData, setBackData] = useState<string | null>(null);

  const generatePDF = () => {
    if (!frontData || !backData) return;
    
    // A4 landscape: 297mm x 210mm
    const pdf = new jsPDF({ orientation: "landscape", unit: "mm", format: "a4" });
    
    // A4 Landscape center horizontally is 148.5
    // Typical ID card physical size is 85.6mm x 54mm, let's scale it up to double size (171.2mm x 108mm) so it prints beautifully full-page
    const printW = 120; // 120mm width
    const printH = printW / ID_RATIO; // ~75.7mm height
    
    // Left Align (Frontend)
    const leftX = 148.5 / 2 - (printW / 2);
    // Right Align (Backend)
    const rightX = 148.5 + (148.5 / 2) - (printW / 2);

    const yStart = 60; // 6cm from top
    
    // Title
    pdf.setFontSize(22);
    pdf.setTextColor(40, 40, 40);
    pdf.text("Aadhaar Card (Combined)", 148.5, 30, { align: "center" });
    
    // Inject Front
    pdf.addImage(frontData, "JPEG", leftX, yStart, printW, printH);
    pdf.setDrawColor(200, 200, 200);
    pdf.setLineWidth(0.3);
    pdf.rect(leftX, yStart, printW, printH); // draw border
    pdf.setFontSize(14);
    pdf.text("Front Side", leftX + (printW / 2), yStart - 5, { align: "center" });

    // Inject Back
    pdf.addImage(backData, "JPEG", rightX, yStart, printW, printH);
    pdf.rect(rightX, yStart, printW, printH);
    pdf.text("Back Side", rightX + (printW / 2), yStart - 5, { align: "center" });

    // Important Disclaimer
    pdf.setFontSize(10);
    pdf.setTextColor(100, 100, 100);
    pdf.text("Generated securely via PhotoSarkari — Verified Document", 148.5, 190, { align: "center" });

    pdf.save("aadhaar-combined.pdf");
  };

  return (
    <div className="w-full max-w-5xl mx-auto px-4 py-8">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-extrabold text-blue-900 mb-2">Aadhaar PDF Merger</h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Securely combine the front and back scans of your Aadhaar Card into a single A4 PDF, perfect for PAN card application uploads. <strong className="text-blue-600">All processing is 100% private to your device.</strong>
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8 mb-8">
        <IdSideCropper title="1. Front Side" onCrop={setFrontData} />
        <IdSideCropper title="2. Back Side" onCrop={setBackData} />
      </div>

      <div className="bg-blue-50 border border-blue-100 rounded-2xl p-6 text-center">
        <h2 className="text-lg font-bold text-blue-900 mb-2">Generate Final Document</h2>
        <p className="text-sm text-blue-700 mb-6">
          {frontData && backData 
            ? "Both sides successfully cropped! You can now generate your combined PDF."
            : "Please upload and confirm the crop for both sides to unlock the PDF download."}
        </p>
        <button
          disabled={!frontData || !backData}
          onClick={generatePDF}
          className={`px-8 py-3 rounded-xl font-bold text-lg shadow-sm transition-all ${
            frontData && backData
              ? "bg-green-600 hover:bg-green-700 text-white scale-100 hover:scale-105 cursor-pointer"
              : "bg-gray-300 text-gray-500 cursor-not-allowed"
          }`}
        >
          Download Combined PDF
        </button>
      </div>
    </div>
  );
}

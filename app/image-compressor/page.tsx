"use client";
import { useState, useCallback, useRef } from "react";

type Format = "jpeg" | "png" | "webp";
type Quality = "high" | "medium" | "low";

const QUALITY_MAP: Record<Quality, number> = { high: 0.9, medium: 0.7, low: 0.4 };
const QUALITY_CONFIG: Record<Quality, { label: string; hint: string; savings: string }> = {
  high:   { label: "High quality",       hint: "Minimal loss",     savings: "~30% smaller" },
  medium: { label: "Balanced",           hint: "Recommended",      savings: "~60% smaller" },
  low:    { label: "Max compression",    hint: "Smallest file",    savings: "~80% smaller" },
};

function fmt(bytes: number) {
  return bytes < 1024 * 1024
    ? `${(bytes / 1024).toFixed(1)} KB`
    : `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
}

export default function ImageCompressorTool() {
  const [selectedFile, setSelectedFile]   = useState<File | null>(null);
  const [preview, setPreview]             = useState<string | null>(null);
  const [quality, setQuality]             = useState<Quality>("medium");
  const [format, setFormat]               = useState<Format>("jpeg");
  const [processing, setProcessing]       = useState(false);
  const [result, setResult]               = useState<{ url: string; size: string; name: string; originalSize: string } | null>(null);
  const [error, setError]                 = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const isPngConversion = format === "png";


  const handleFile = useCallback((file: File) => {
    if (!file.type.startsWith("image/")) {
      setError("Please upload a valid image file.");
      return;
    }
    setError(null);
    setResult(null);
    setSelectedFile(file);
    const url = URL.createObjectURL(file);
    setPreview(url);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) handleFile(file);
  }, [handleFile]);

const handleCompress = useCallback(async () => {
  if (!selectedFile || !preview) return;

  setProcessing(true);
  setError(null);

  try {
    const img = new Image();
    img.src = preview;

    await new Promise<void>((res, rej) => {
      img.onload = () => res();
      img.onerror = () => rej(new Error("Failed to load image"));
    });

    const canvas = document.createElement("canvas");

    const maxWidth = quality === "low" ? 1600 : quality === "medium" ? 2000 : 2600;
    const maxHeight = quality === "low" ? 1600 : quality === "medium" ? 2000 : 2600;

    let width = img.naturalWidth;
    let height = img.naturalHeight;

    const scale = Math.min(maxWidth / width, maxHeight / height, 1);
    width = Math.round(width * scale);
    height = Math.round(height * scale);

    canvas.width = width;
    canvas.height = height;

    const ctx = canvas.getContext("2d");
    if (!ctx) throw new Error("Canvas not supported");

    if (format === "jpeg") {
      ctx.fillStyle = "#ffffff";
      ctx.fillRect(0, 0, width, height);
    }

    ctx.drawImage(img, 0, 0, width, height);

    const mimeType =
      format === "jpeg"
        ? "image/jpeg"
        : format === "png"
        ? "image/png"
        : "image/webp";

    let blob: Blob;

    if (format === "png") {
      blob = await new Promise<Blob>((res, rej) => {
        canvas.toBlob((b) => (b ? res(b) : rej(new Error("PNG conversion failed"))), "image/png");
      });
    } else {
      const qualitySteps =
        quality === "high"
          ? [0.82, 0.76, 0.7]
          : quality === "medium"
          ? [0.68, 0.6, 0.52, 0.45]
          : [0.5, 0.4, 0.32, 0.25];

      let bestBlob: Blob | null = null;

      for (const q of qualitySteps) {
        const attempt = await new Promise<Blob>((res, rej) => {
          canvas.toBlob(
            (b) => (b ? res(b) : rej(new Error("Compression failed"))),
            mimeType,
            q
          );
        });

        bestBlob = attempt;

        if (attempt.size < selectedFile.size * 0.8) {
          break;
        }
      }

      if (!bestBlob) {
        throw new Error("Compression failed");
      }

      blob = bestBlob;
    }

    const isConversionOnly =
      (selectedFile.type === "image/jpeg" && format === "png") ||
      (selectedFile.type === "image/png" && format === "jpeg") ||
      (selectedFile.type === "image/png" && format === "webp") ||
      (selectedFile.type === "image/jpeg" && format === "webp");

    if (!isConversionOnly && format !== "png" && blob.size >= selectedFile.size) {
      setError(
        "This image is already optimized, so the new file would not be smaller. Try WebP or lower quality."
      );
      setResult(null);
      return;
    }

    const ext = format === "jpeg" ? "jpg" : format;
    const baseName = selectedFile.name.replace(/\.[^.]+$/, "");
    const outName = `${baseName}_${format === "png" ? "converted" : "compressed"}.${ext}`;
    const url = URL.createObjectURL(blob);

    setResult({
      url,
      size: fmt(blob.size),
      name: outName,
      originalSize: fmt(selectedFile.size),
    });
  } catch (e: unknown) {
    setError(e instanceof Error ? e.message : "Compression failed.");
  } finally {
    setProcessing(false);
  }
}, [selectedFile, preview, quality, format]);




  const handleDownload = () => {
    if (!result) return;
    const a = document.createElement("a");
    a.href = result.url;
    a.download = result.name;
    a.click();
  };

  const handleReset = () => {
    if (result?.url) URL.revokeObjectURL(result.url);
    if (preview) URL.revokeObjectURL(preview);
    setSelectedFile(null);
    setPreview(null);
    setResult(null);
    setError(null);
    setProcessing(false);
  };

  const formats: { key: Format; label: string; hint: string }[] = [
    { key: "jpeg", label: "JPEG", hint: "Best for photos" },
    { key: "png", label: "PNG", hint: "Best for transparency, not smaller photos" },
    { key: "webp", label: "WebP", hint: "Modern & tiny" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 flex items-center justify-center p-4">
      <div className="w-full max-w-xl">

        {/* Header */}
        <div className="mb-8 text-center">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-teal-600/10 border border-teal-500/20 mb-4">
            <svg className="w-7 h-7 text-teal-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-white tracking-tight">Image Compressor</h1>
          <p className="text-slate-400 text-sm mt-1">Compress images without sacrificing quality</p>
        </div>

        {/* Main card */}
        <div className="bg-slate-900/80 border border-slate-700/60 rounded-2xl p-6 shadow-2xl backdrop-blur-sm space-y-5">

          {/* Controls — only before result */}
          {!result && !processing && (
            <>
              {/* Quality */}
              <div>
                <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">Quality</p>
                <div className="grid grid-cols-3 gap-2">
                  {(["high", "medium", "low"] as Quality[]).map((q) => {
                    const cfg = QUALITY_CONFIG[q];
                    const active = quality === q;
                    return (
                      <button
                        key={q}
                        onClick={() => setQuality(q)}
                        className={`relative text-left p-3 rounded-xl border transition-all duration-150 ${
                          active
                            ? "border-teal-500 bg-teal-500/10"
                            : "border-slate-700/60 hover:border-slate-600 bg-slate-800/40"
                        }`}
                      >
                        {q === "medium" && (
                          <span className="absolute -top-2 left-1/2 -translate-x-1/2 text-[10px] font-semibold bg-teal-600 text-white px-2 py-0.5 rounded-full">
                            Best
                          </span>
                        )}
                        <p className={`text-xs font-semibold leading-tight ${active ? "text-teal-300" : "text-slate-300"}`}>
                          {cfg.label}
                        </p>
                        <p className={`text-xs mt-0.5 ${active ? "text-teal-400/80" : "text-slate-500"}`}>
                          {cfg.savings}
                        </p>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Output format */}
              <div>
                <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">Output format</p>
                <div className="grid grid-cols-3 gap-2">
                  {formats.map((f) => {
                    const active = format === f.key;
                    return (
                      <button
                        key={f.key}
                        onClick={() => setFormat(f.key)}
                        className={`text-left p-3 rounded-xl border transition-all duration-150 ${
                          active
                            ? "border-teal-500 bg-teal-500/10"
                            : "border-slate-700/60 hover:border-slate-600 bg-slate-800/40"
                        }`}
                      >
                        <p className={`text-sm font-bold ${active ? "text-teal-300" : "text-slate-300"}`}>
                          {f.label}
                        </p>
                        <p className={`text-xs mt-0.5 ${active ? "text-teal-400/80" : "text-slate-500"}`}>
                          {f.hint}
                        </p>
                      </button>
                    );
                  })}
                </div>
              </div>
            </>
          )}

          {/* Drop zone / preview */}
          {!selectedFile && !processing && !result && (
            <div
              onDrop={handleDrop}
              onDragOver={(e) => e.preventDefault()}
              onClick={() => inputRef.current?.click()}
              className="flex flex-col items-center justify-center gap-3 border-2 border-dashed border-slate-700 hover:border-teal-500/50 rounded-xl p-10 cursor-pointer transition-colors duration-200 bg-slate-800/20 hover:bg-teal-500/5"
            >
              <div className="w-12 h-12 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center">
                <svg className="w-5 h-5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                    d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <div className="text-center">
                <p className="text-sm font-semibold text-slate-300">Drop your image here</p>
                <p className="text-xs text-slate-500 mt-1">PNG, JPG, WebP, GIF up to 20MB · or click to browse</p>
              </div>
              <input
                ref={inputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => { const f = e.target.files?.[0]; if (f) handleFile(f); }}
              />
            </div>
          )}

          {/* Image preview */}
          {preview && selectedFile && !result && (
            <div className="rounded-xl overflow-hidden border border-slate-700/60 bg-slate-800/40">
              <div className="flex items-center justify-between px-4 py-2 border-b border-slate-700/60">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-slate-600" />
                  <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Preview</p>
                </div>
                <span className="text-xs text-slate-500 font-mono">{fmt(selectedFile.size)}</span>
              </div>
              <div className="p-3 flex items-center justify-center bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHZpZXdCb3g9IjAgMCAyMCAyMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAiIGhlaWdodD0iMTAiIGZpbGw9IiMxZTI5M2IiLz48cmVjdCB4PSIxMCIgeT0iMTAiIHdpZHRoPSIxMCIgaGVpZ2h0PSIxMCIgZmlsbD0iIzFlMjkzYiIvPjxyZWN0IHg9IjEwIiB5PSIwIiB3aWR0aD0iMTAiIGhlaWdodD0iMTAiIGZpbGw9IiMwZjE3MmEiLz48cmVjdCB4PSIwIiB5PSIxMCIgd2lkdGg9IjEwIiBoZWlnaHQ9IjEwIiBmaWxsPSIjMGYxNzJhIi8+PC9zdmc+')]">
                <img src={preview} alt="Preview" className="max-h-48 max-w-full object-contain rounded-lg" />
              </div>
            </div>
          )}

          {/* Processing */}
          {processing && (
            <div className="flex flex-col items-center justify-center gap-3 py-8">
              <div className="w-12 h-12 rounded-full border-2 border-teal-500/30 border-t-teal-400 animate-spin" />
              <p className="text-sm text-slate-400 font-medium">Compressing image…</p>
            </div>
          )}

          {/* Error */}
          {error && (
            <div className="flex items-start gap-3 bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-3">
              <svg className="w-4 h-4 text-red-400 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <p className="text-xs text-red-400 font-medium">{error}</p>
            </div>
          )}

          {/* Compress button */}
          {selectedFile && !processing && !result && !error && (
            <button
              onClick={handleCompress}
              className="flex items-center justify-center gap-2 w-full bg-teal-600 hover:bg-teal-500 active:bg-teal-700 text-white font-semibold px-5 py-3 rounded-xl transition-all duration-150 shadow-lg shadow-teal-600/20"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
              </svg>
              Compress Image
            </button>
          )}

          {/* Result */}
          {result && (
            <div className="space-y-3">
              {/* Size comparison */}
              <div className="grid grid-cols-3 gap-2 text-center">
                <div className="bg-slate-800/60 rounded-xl px-3 py-2.5">
                  <p className="text-xs text-slate-500 mb-0.5">Original</p>
                  <p className="text-sm font-semibold text-slate-300">{result.originalSize}</p>
                </div>
                <div className="flex items-center justify-center">
                  <svg className="w-4 h-4 text-slate-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </div>
                <div className="bg-teal-500/10 border border-teal-500/20 rounded-xl px-3 py-2.5">
                  <p className="text-xs text-teal-400/70 mb-0.5">Compressed</p>
                  <p className="text-sm font-semibold text-teal-400">{result.size}</p>
                </div>
              </div>

              <button
                onClick={handleDownload}
                className="flex items-center justify-center gap-2 w-full bg-emerald-600 hover:bg-emerald-500 active:bg-emerald-700 text-white font-semibold px-5 py-3 rounded-xl transition-all duration-150 shadow-lg shadow-emerald-600/20"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                    d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
                Download {result.name}
              </button>

              <button
                onClick={handleReset}
                className="w-full text-slate-400 hover:text-slate-200 text-sm font-medium py-2 transition-colors"
              >
                Compress another image
              </button>
            </div>
          )}
        </div>

        {/* Feature pills */}
        {!selectedFile && !processing && !result && (
          <div className="mt-4 flex flex-wrap justify-center gap-2">
            {["Browser-side only", "3 output formats", "No upload needed"].map((f) => (
              <div
                key={f}
                className="flex items-center gap-1.5 bg-slate-800/60 border border-slate-700/40 rounded-full px-3.5 py-1.5"
              >
                <span className="text-teal-400 text-xs">✦</span>
                <span className="text-xs font-medium text-slate-300">{f}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
"use client";
import { useState, useCallback, useRef } from "react";
import FileUpload from "@/components/FileUpload";

export default function JpgToPngTool() {
  const [processing, setProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [result, setResult] = useState<{ name: string; url: string; size: string; originalSize?: string } | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const handleFileSelect = useCallback((file: File) => {
    setSelectedFile(file);
    setResult(null);
    setError(null);
    const url = URL.createObjectURL(file);
    setPreview(url);
  }, []);

  const handleConvert = useCallback(async () => {
    if (!selectedFile || !preview) return;
    setProcessing(true);
    setProgress(0);
    setError(null);

    try {
      setProgress(20);
      await new Promise((r) => setTimeout(r, 200));

      const img = new Image();
      img.src = preview;
      await new Promise<void>((resolve, reject) => {
        img.onload = () => resolve();
        img.onerror = () => reject(new Error("Failed to load image"));
      });

      setProgress(50);

      const canvas = document.createElement("canvas");
      canvas.width = img.naturalWidth;
      canvas.height = img.naturalHeight;
      const ctx = canvas.getContext("2d");
      if (!ctx) throw new Error("Canvas not supported");
      ctx.drawImage(img, 0, 0);

      setProgress(80);

      const blob = await new Promise<Blob>((resolve, reject) => {
        canvas.toBlob((b) => {
          if (b) resolve(b);
          else reject(new Error("Conversion failed"));
        }, "image/png");
      });

      setProgress(100);

      const fmt = (bytes: number) =>
        bytes < 1024 * 1024
          ? `${(bytes / 1024).toFixed(1)} KB`
          : `${(bytes / (1024 * 1024)).toFixed(2)} MB`;

      const outName = selectedFile.name.replace(/\.(jpg|jpeg)$/i, ".png");
      const url = URL.createObjectURL(blob);

      setResult({
        name: outName,
        url,
        size: fmt(blob.size),
        originalSize: fmt(selectedFile.size),
      });
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : "Conversion failed. Try a different image.");
    } finally {
      setProcessing(false);
    }
  }, [selectedFile, preview]);

  const handleReset = () => {
    if (result?.url) URL.revokeObjectURL(result.url);
    if (preview) URL.revokeObjectURL(preview);
    setSelectedFile(null);
    setResult(null);
    setError(null);
    setProgress(0);
    setPreview(null);
  };

  const handleDownload = () => {
    if (!result) return;
    const a = document.createElement("a");
    a.href = result.url;
    a.download = result.name;
    a.click();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 flex items-center justify-center p-4">
      <div className="w-full max-w-xl">

        {/* Header */}
        <div className="mb-8 text-center">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-rose-600/10 border border-rose-500/20 mb-4">
            <svg className="w-7 h-7 text-rose-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-white tracking-tight">JPG to PNG</h1>
          <p className="text-slate-400 text-sm mt-1">Convert JPEG images to lossless PNG format</p>
        </div>

        {/* Main Card */}
        <div className="bg-slate-900/80 border border-slate-700/60 rounded-2xl p-6 shadow-2xl backdrop-blur-sm space-y-5">

          {/* Preview */}
          {preview && !processing && !result && (
            <div className="rounded-xl overflow-hidden border border-slate-700/60 bg-slate-800/40">
              <div className="flex items-center gap-2 px-4 py-2 border-b border-slate-700/60">
                <div className="w-2 h-2 rounded-full bg-slate-600" />
                <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Preview</p>
              </div>
              <div className="p-3 flex items-center justify-center bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHZpZXdCb3g9IjAgMCAyMCAyMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAiIGhlaWdodD0iMTAiIGZpbGw9IiMxZTI5M2IiLz48cmVjdCB4PSIxMCIgeT0iMTAiIHdpZHRoPSIxMCIgaGVpZ2h0PSIxMCIgZmlsbD0iIzFlMjkzYiIvPjxyZWN0IHg9IjEwIiB5PSIwIiB3aWR0aD0iMTAiIGhlaWdodD0iMTAiIGZpbGw9IiMwZjE3MmEiLz48cmVjdCB4PSIwIiB5PSIxMCIgd2lkdGg9IjEwIiBoZWlnaHQ9IjEwIiBmaWxsPSIjMGYxNzJhIi8+PC9zdmc+')]">
                <img src={preview} alt="Preview" className="max-h-48 max-w-full object-contain rounded-lg" />
              </div>
            </div>
          )}

          <FileUpload
            accept=".jpg,.jpeg"
            maxSizeMB={20}
            onFileSelect={handleFileSelect}
            label="Drop your JPG/JPEG here"
            sublabel="Supports .jpg and .jpeg files up to 20MB"
            processing={processing}
            progress={progress}
            result={result}
            error={error}
            onReset={handleReset}
          />

          {/* Convert button */}
          {selectedFile && !processing && !result && !error && (
            <button
              onClick={handleConvert}
              className="flex items-center justify-center gap-2 w-full bg-rose-600 hover:bg-rose-500 active:bg-rose-700 text-white font-semibold px-5 py-3 rounded-xl transition-all duration-150 shadow-lg shadow-rose-600/20"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              Convert to PNG
            </button>
          )}

          {/* Result */}
          {result && (
            <div className="space-y-3">
              {/* Size comparison */}
              {result.originalSize && (
                <div className="grid grid-cols-3 gap-2 text-center">
                  <div className="bg-slate-800/60 rounded-xl px-3 py-2.5">
                    <p className="text-xs text-slate-500 mb-0.5">JPG size</p>
                    <p className="text-sm font-semibold text-slate-300">{result.originalSize}</p>
                  </div>
                  <div className="flex items-center justify-center">
                    <svg className="w-4 h-4 text-slate-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </div>
                  <div className="bg-rose-500/10 border border-rose-500/20 rounded-xl px-3 py-2.5">
                    <p className="text-xs text-rose-400/70 mb-0.5">PNG size</p>
                    <p className="text-sm font-semibold text-rose-400">{result.size}</p>
                  </div>
                </div>
              )}

              <button
                onClick={handleDownload}
                className="flex items-center justify-center gap-2 w-full bg-emerald-600 hover:bg-emerald-500 active:bg-emerald-700 text-white font-semibold px-5 py-3 rounded-xl transition-all duration-150 shadow-lg shadow-emerald-600/20"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
                Download {result.name}
              </button>

              <button
                onClick={handleReset}
                className="w-full text-slate-400 hover:text-slate-200 text-sm font-medium py-2 transition-colors"
              >
                Convert another image
              </button>
            </div>
          )}
        </div>

        {/* Feature pills */}
        {!selectedFile && !processing && !result && (
          <div className="mt-4 flex flex-wrap justify-center gap-2">
            {["Lossless output", "Transparency support", "Instant download"].map((f) => (
              <div
                key={f}
                className="flex items-center gap-1.5 bg-slate-800/60 border border-slate-700/40 rounded-full px-3.5 py-1.5"
              >
                <span className="text-rose-400 text-xs">✦</span>
                <span className="text-xs font-medium text-slate-300">{f}</span>
              </div>
            ))}
          </div>
        )}

        <canvas ref={canvasRef} className="hidden" />
      </div>
    </div>
  );
}
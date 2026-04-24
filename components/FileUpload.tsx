"use client";
import { useRef, useState, useCallback } from "react";
import { Upload, File, X, CheckCircle2, AlertCircle } from "lucide-react";

interface FileUploadProps {
  accept: string;
  maxSizeMB?: number;
  onFileSelect: (file: File) => void;
  label?: string;
  sublabel?: string;
  processing?: boolean;
  progress?: number;
  result?: { name: string; url: string; size: string } | null;
  error?: string | null;
  onReset?: () => void;
}

export default function FileUpload({
  accept,
  maxSizeMB = 50,
  onFileSelect,
  label = "Drop your file here",
  sublabel,
  processing = false,
  progress = 0,
  result = null,
  error = null,
  onReset,
}: FileUploadProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [dragActive, setDragActive] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleFile = useCallback(
    (file: File) => {
      if (file.size > maxSizeMB * 1024 * 1024) {
        alert(`File size exceeds ${maxSizeMB}MB limit.`);
        return;
      }
      setSelectedFile(file);
      onFileSelect(file);
    },
    [maxSizeMB, onFileSelect]
  );

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setDragActive(false);
      const file = e.dataTransfer.files[0];
      if (file) handleFile(file);
    },
    [handleFile]
  );

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleFile(file);
  };

  const handleReset = () => {
    setSelectedFile(null);
    if (inputRef.current) inputRef.current.value = "";
    onReset?.();
  };

  const formatSize = (bytes: number) => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  // Result state
  if (result) {
    return (
      <div className="border-2 border-green-300 bg-green-50 rounded-2xl p-8 text-center">
        <CheckCircle2 className="w-12 h-12 text-green-500 mx-auto mb-4" />
        <h3 className="text-lg font-semibold text-slate-900 mb-1">Conversion Complete!</h3>
        <p className="text-slate-500 text-sm mb-6">{result.name} · {result.size}</p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <a
            href={result.url}
            download={result.name}
            className="btn-primary"
          >
            Download {result.name}
          </a>
          <button onClick={handleReset} className="btn-secondary">
            Convert Another File
          </button>
        </div>
      </div>
    );
  }

  // Processing state
  if (processing) {
    return (
      <div className="border-2 border-blue-200 bg-blue-50 rounded-2xl p-8 text-center">
        <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <File className="w-6 h-6 text-blue-600 animate-pulse" />
        </div>
        <h3 className="text-lg font-semibold text-slate-900 mb-1">Processing...</h3>
        <p className="text-slate-500 text-sm mb-6">{selectedFile?.name}</p>
        <div className="w-full bg-blue-100 rounded-full h-2.5 mb-2 overflow-hidden">
          <div
            className="h-full rounded-full progress-shimmer transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>
        <p className="text-xs text-slate-400">{progress}% complete</p>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="border-2 border-red-200 bg-red-50 rounded-2xl p-8 text-center">
        <AlertCircle className="w-12 h-12 text-red-400 mx-auto mb-4" />
        <h3 className="text-lg font-semibold text-slate-900 mb-1">Something went wrong</h3>
        <p className="text-red-500 text-sm mb-6">{error}</p>
        <button onClick={handleReset} className="btn-secondary">
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div
      className={`border-2 border-dashed rounded-2xl p-10 text-center cursor-pointer transition-all duration-200 ${
        dragActive
          ? "border-blue-500 bg-blue-50 scale-[1.01]"
          : "border-slate-300 bg-white hover:border-blue-400 hover:bg-slate-50"
      }`}
      onDragOver={(e) => { e.preventDefault(); setDragActive(true); }}
      onDragLeave={() => setDragActive(false)}
      onDrop={handleDrop}
      onClick={() => inputRef.current?.click()}
    >
      <input
        ref={inputRef}
        type="file"
        accept={accept}
        className="hidden"
        onChange={handleInputChange}
      />

      {selectedFile ? (
        <div>
          <div className="w-14 h-14 bg-blue-100 rounded-xl flex items-center justify-center mx-auto mb-4">
            <File className="w-7 h-7 text-blue-600" />
          </div>
          <p className="font-semibold text-slate-900 mb-1">{selectedFile.name}</p>
          <p className="text-sm text-slate-400 mb-4">{formatSize(selectedFile.size)}</p>
          <button
            onClick={(e) => { e.stopPropagation(); handleReset(); }}
            className="inline-flex items-center gap-1 text-sm text-slate-400 hover:text-red-500 transition-colors"
          >
            <X className="w-3.5 h-3.5" /> Remove
          </button>
        </div>
      ) : (
        <div>
          <div className="w-14 h-14 bg-blue-50 border-2 border-blue-200 rounded-xl flex items-center justify-center mx-auto mb-4">
            <Upload className="w-7 h-7 text-blue-500" />
          </div>
          <p className="text-lg font-semibold text-slate-900 mb-1">{label}</p>
          <p className="text-slate-400 text-sm mb-4">
            {sublabel || `or click to browse · Max ${maxSizeMB}MB`}
          </p>
          <span className="inline-block bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold px-5 py-2.5 rounded-lg transition-colors shadow-sm">
            Choose File
          </span>
        </div>
      )}
    </div>
  );
}
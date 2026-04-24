"use client";

import { useCallback, useEffect, useState } from "react";
import { Document, Packer, Paragraph, TextRun } from "docx";
import FileUpload from "@/components/FileUpload";

const loadPdfJs = async () => {
  const pdfjsLib = await import("pdfjs-dist");

  pdfjsLib.GlobalWorkerOptions.workerSrc = new URL(
    "pdfjs-dist/build/pdf.worker.min.mjs",
    import.meta.url
  ).toString();

  return pdfjsLib;
};


type ConversionResult = {
  name: string;
  url: string;
  size: string;
};

export default function PdfToWordTool() {
  const [processing, setProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [result, setResult] = useState<ConversionResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  useEffect(() => {
    return () => {
      if (result?.url) {
        URL.revokeObjectURL(result.url);
      }
    };
  }, [result]);

  const handleFileSelect = useCallback((file: File) => {
    if (result?.url) {
      URL.revokeObjectURL(result.url);
    }

    setSelectedFile(file);
    setResult(null);
    setError(null);
    setProgress(0);
  }, [result]);

  const extractPdfText = useCallback(async (file: File) => {
  const pdfjsLib = await loadPdfJs();
  const buffer = await file.arrayBuffer();

  const loadingTask = pdfjsLib.getDocument({
    data: buffer,
    useWorkerFetch: false,
    isEvalSupported: false,
  });

  const pdf = await loadingTask.promise;
  const pages: string[][] = [];

  for (let pageNumber = 1; pageNumber <= pdf.numPages; pageNumber += 1) {
    const page = await pdf.getPage(pageNumber);
    const textContent = await page.getTextContent();

    const items = textContent.items
      .filter((item: any) => "str" in item && item.str.trim())
      .map((item: any) => ({
        text: item.str,
        x: item.transform[4],
        y: item.transform[5],
      }))
      .sort((a, b) => {
        if (Math.abs(b.y - a.y) > 3) return b.y - a.y;
        return a.x - b.x;
      });

    const lines: { y: number; parts: typeof items }[] = [];

    for (const item of items) {
      const existingLine = lines.find((line) => Math.abs(line.y - item.y) < 3);

      if (existingLine) {
        existingLine.parts.push(item);
      } else {
        lines.push({ y: item.y, parts: [item] });
      }
    }

    const pageLines = lines
      .sort((a, b) => b.y - a.y)
      .map((line) =>
        line.parts
          .sort((a, b) => a.x - b.x)
          .map((part) => part.text)
          .join(" ")
          .replace(/\s+/g, " ")
          .trim()
      )
      .filter(Boolean);

    pages.push(pageLines);

    const progressValue = Math.min(
      90,
      Math.round((pageNumber / pdf.numPages) * 75) + 10
    );
    setProgress(progressValue);
  }

  return pages;
}, []);


const buildDocxBlob = useCallback(async (pages: string[][]) => {
  const sections = pages.map((pageLines, index) => ({
    children: [
      new Paragraph({
        children: [
          new TextRun({
            text: `Page ${index + 1}`,
            bold: true,
            size: 28,
          }),
        ],
        spacing: { after: 200 },
      }),
      ...pageLines.map(
        (line) =>
          new Paragraph({
            children: [
              new TextRun({
                text: line,
                size: 22,
              }),
            ],
            spacing: { after: 120 },
          })
      ),
    ],
  }));

  const doc = new Document({ sections });
  return Packer.toBlob(doc);
}, []);

  const handleConvert = useCallback(async () => {
    if (!selectedFile) {
      return;
    }

    setProcessing(true);
    setProgress(5);
    setError(null);

    try {
      const pages = await extractPdfText(selectedFile);
      setProgress(92);

      const blob = await buildDocxBlob(pages);
      const fileName = selectedFile.name.replace(/\.pdf$/i, ".docx");
      const url = URL.createObjectURL(blob);
      const size = `${(blob.size / 1024).toFixed(1)} KB`;

      setProgress(100);
      setResult({ name: fileName, url, size });
    } catch (conversionError) {
      console.error(conversionError);
      setError(
        "Conversion failed. If this PDF is scanned, OCR support is required before it can become an editable Word file."
      );
    } finally {
      setProcessing(false);
    }
  }, [buildDocxBlob, extractPdfText, selectedFile]);

  const handleReset = useCallback(() => {
    if (result?.url) {
      URL.revokeObjectURL(result.url);
    }

    setSelectedFile(null);
    setResult(null);
    setError(null);
    setProgress(0);
  }, [result]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 p-4">
      <div className="w-full max-w-xl">
        <div className="mb-8 text-center">
          <div className="mb-4 inline-flex h-14 w-14 items-center justify-center rounded-2xl border border-blue-500/20 bg-blue-600/10">
            <svg
              className="h-7 w-7 text-blue-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-white">
            PDF to Word
          </h1>
          <p className="mt-1 text-sm text-slate-400">
            Convert your PDF files into editable `.docx` documents
          </p>
        </div>

        <div className="rounded-2xl border border-slate-700/60 bg-slate-900/80 p-6 shadow-2xl backdrop-blur-sm">
          <FileUpload
            accept=".pdf"
            maxSizeMB={50}
            onFileSelect={handleFileSelect}
            label="Drop your PDF here"
            sublabel="Supports PDF files up to 50MB · or click to browse"
            processing={processing}
            progress={progress}
            result={result}
            error={error}
            onReset={handleReset}
          />

          {selectedFile && !processing && !result && (
            <div className="mt-5 flex flex-col gap-3 sm:flex-row">
              <button
                onClick={handleConvert}
                className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white shadow-lg shadow-blue-600/20 transition-all duration-150 hover:bg-blue-500 hover:shadow-blue-500/30 active:bg-blue-700"
              >
                <svg
                  className="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
                  />
                </svg>
                Convert to Word
              </button>
              <button
                onClick={handleReset}
                className="flex items-center justify-center gap-2 rounded-xl border border-slate-700/50 bg-slate-800 px-5 py-3 font-medium text-slate-300 transition-all duration-150 hover:bg-slate-700 active:bg-slate-900 sm:w-auto"
              >
                <svg
                  className="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
                Clear
              </button>
            </div>
          )}

          {result && (
            <div className="mt-5">
              <button
                onClick={() => {
                  const anchor = document.createElement("a");
                  anchor.href = result.url;
                  anchor.download = result.name;
                  anchor.click();
                }}
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-600 px-5 py-3 font-semibold text-white shadow-lg shadow-emerald-600/20 transition-all duration-150 hover:bg-emerald-500"
              >
                <svg
                  className="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                  />
                </svg>
                Download {result.name}
                <span className="text-xs font-normal text-emerald-200">
                  ({result.size})
                </span>
              </button>
              <button
                onClick={handleReset}
                className="mt-3 w-full py-2 text-sm font-medium text-slate-400 transition-colors hover:text-slate-200"
              >
                Convert another file
              </button>
            </div>
          )}
        </div>

        {!selectedFile && !processing && !result && (
          <div className="mt-4 flex flex-wrap justify-center gap-2">
            {[
              { label: "Editable .docx output", icon: "✦" },
              { label: "No fake downloads", icon: "✦" },
              { label: "Browser-side conversion", icon: "✦" },
            ].map((feature) => (
              <div
                key={feature.label}
                className="flex items-center gap-1.5 rounded-full border border-slate-700/40 bg-slate-800/60 px-3.5 py-1.5"
              >
                <span className="text-xs text-blue-400">{feature.icon}</span>
                <span className="text-xs font-medium text-slate-300">
                  {feature.label}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
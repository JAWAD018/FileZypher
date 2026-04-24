"use client";
import { useState, useCallback } from "react";
import { CheckCircle2, AlertCircle, Copy, Minimize2, Maximize2, Trash2, RotateCcw } from "lucide-react";

type Mode = "format" | "minify" | "validate";

function syntaxHighlight(json: string): string {
  return json
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(
      /("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g,
      (match) => {
        let cls = "text-amber-400";
        if (/^"/.test(match)) {
          cls = /:$/.test(match) ? "text-sky-400 font-medium" : "text-emerald-400";
        } else if (/true|false/.test(match)) {
          cls = "text-violet-400";
        } else if (/null/.test(match)) {
          cls = "text-slate-500";
        }
        return `<span class="${cls}">${match}</span>`;
      }
    );
}

export default function JsonFormatterTool() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [mode, setMode] = useState<Mode>("format");
  const [status, setStatus] = useState<"idle" | "valid" | "invalid">("idle");
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);
  const [indentSize, setIndentSize] = useState(2);

  const process = useCallback(
    (value: string, currentMode: Mode = mode, indent: number = indentSize) => {
      if (!value.trim()) {
        setOutput("");
        setStatus("idle");
        setError("");
        return;
      }
      try {
        const parsed = JSON.parse(value);
        setStatus("valid");
        setError("");
        if (currentMode === "format") {
          setOutput(JSON.stringify(parsed, null, indent));
        } else if (currentMode === "minify") {
          setOutput(JSON.stringify(parsed));
        } else {
          setOutput("valid");
        }
      } catch (e: unknown) {
        setStatus("invalid");
        setOutput("");
        setError(e instanceof Error ? e.message : "Invalid JSON");
      }
    },
    [mode, indentSize]
  );

  const handleInput = (value: string) => { setInput(value); process(value); };
  const handleModeChange = (newMode: Mode) => { setMode(newMode); process(input, newMode, indentSize); };
  const handleIndentChange = (size: number) => { setIndentSize(size); process(input, mode, size); };

  const handleCopy = async () => {
    if (!output) return;
    await navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleClear = () => { setInput(""); setOutput(""); setStatus("idle"); setError(""); };

  const handleSample = () => {
    const sample = JSON.stringify(
      {
        name: "Toolify",
        version: "1.0.0",
        tools: ["pdf-to-word", "compress-pdf", "jpg-to-png", "json-formatter"],
        free: true,
        users: 10000000,
        meta: { author: "Toolify Team", license: "MIT" },
      },
      null,
      2
    );
    setInput(sample);
    process(sample);
  };

  const isValid = status === "valid";
  const isInvalid = status === "invalid";

  const modeConfig = [
    { key: "format" as Mode, label: "Format", icon: <Maximize2 className="w-3.5 h-3.5" /> },
    { key: "minify" as Mode, label: "Minify", icon: <Minimize2 className="w-3.5 h-3.5" /> },
    { key: "validate" as Mode, label: "Validate", icon: <CheckCircle2 className="w-3.5 h-3.5" /> },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 p-4 flex flex-col">
      <div className="w-full max-w-5xl mx-auto flex flex-col gap-4">

        {/* Header */}
        <div className="text-center pt-6 pb-2">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-amber-500/10 border border-amber-500/20 mb-4">
            <svg className="w-7 h-7 text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-white tracking-tight">JSON Formatter</h1>
          <p className="text-slate-400 text-sm mt-1">Format, minify, and validate JSON instantly</p>
        </div>

        {/* Toolbar */}
        <div className="bg-slate-900/80 border border-slate-700/60 rounded-2xl px-4 py-3 backdrop-blur-sm flex flex-wrap items-center gap-3">
          {/* Mode tabs */}
          <div className="flex rounded-xl border border-slate-700/60 overflow-hidden text-sm">
            {modeConfig.map((m) => (
              <button
                key={m.key}
                onClick={() => handleModeChange(m.key)}
                className={`flex items-center gap-1.5 px-4 py-2 font-semibold transition-colors ${
                  mode === m.key
                    ? "bg-amber-500 text-slate-950"
                    : "bg-transparent text-slate-400 hover:text-slate-200 hover:bg-slate-800/60"
                }`}
              >
                {m.icon}
                {m.label}
              </button>
            ))}
          </div>

          {/* Indent */}
          {mode === "format" && (
            <div className="flex items-center gap-2 text-sm">
              <span className="text-slate-500 font-medium text-xs">Indent:</span>
              {[2, 4].map((size) => (
                <button
                  key={size}
                  onClick={() => handleIndentChange(size)}
                  className={`w-8 h-8 rounded-lg font-mono font-bold text-xs transition-colors ${
                    indentSize === size
                      ? "bg-amber-500/20 text-amber-400 border border-amber-500/30"
                      : "bg-slate-800 text-slate-400 hover:bg-slate-700 border border-slate-700/60"
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          )}

          {/* Status badge */}
          {status !== "idle" && (
            <div className={`flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg ${
              isValid
                ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                : "bg-red-500/10 text-red-400 border border-red-500/20"
            }`}>
              {isValid
                ? <CheckCircle2 className="w-3.5 h-3.5" />
                : <AlertCircle className="w-3.5 h-3.5" />}
              {isValid ? "Valid JSON" : "Invalid JSON"}
            </div>
          )}

          <div className="ml-auto flex gap-2">
            <button
              onClick={handleSample}
              className="flex items-center gap-1.5 text-xs font-semibold text-slate-400 hover:text-slate-200 bg-slate-800/60 hover:bg-slate-700/60 border border-slate-700/60 px-3 py-2 rounded-lg transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" /> Sample
            </button>
            <button
              onClick={handleClear}
              className="flex items-center gap-1.5 text-xs font-semibold text-red-400 hover:text-red-300 bg-red-500/10 hover:bg-red-500/20 border border-red-500/20 px-3 py-2 rounded-lg transition-colors"
            >
              <Trash2 className="w-3.5 h-3.5" /> Clear
            </button>
          </div>
        </div>

        {/* Error bar */}
        {isInvalid && error && (
          <div className="flex items-start gap-3 bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-3">
            <AlertCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
            <div>
              <p className="text-xs font-semibold text-red-400">Parse Error</p>
              <p className="text-xs text-red-400/80 font-mono mt-0.5">{error}</p>
            </div>
          </div>
        )}

        {/* Editor panels */}
        <div className="grid lg:grid-cols-2 gap-4">

          {/* Input */}
          <div className="bg-slate-900/80 border border-slate-700/60 rounded-2xl overflow-hidden backdrop-blur-sm flex flex-col">
            <div className="flex items-center justify-between px-4 py-3 border-b border-slate-700/60">
              <div className="flex items-center gap-2">
                <div className="flex gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-slate-700" />
                  <div className="w-2.5 h-2.5 rounded-full bg-slate-700" />
                  <div className="w-2.5 h-2.5 rounded-full bg-slate-700" />
                </div>
                <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider ml-1">Input</span>
              </div>
              <span className="text-xs text-slate-600 font-mono">{input.length} chars</span>
            </div>
            <textarea
              value={input}
              onChange={(e) => handleInput(e.target.value)}
              placeholder={'Paste your JSON here...\n\n{\n  "example": true\n}'}
              className={`flex-1 w-full h-80 p-4 font-mono text-sm resize-none outline-none bg-transparent text-slate-300 placeholder:text-slate-700 leading-relaxed ${
                isInvalid ? "border-l-2 border-red-500" : ""
              }`}
              spellCheck={false}
            />
          </div>

          {/* Output */}
          <div className="bg-slate-900/80 border border-slate-700/60 rounded-2xl overflow-hidden backdrop-blur-sm flex flex-col">
            <div className="flex items-center justify-between px-4 py-3 border-b border-slate-700/60">
              <div className="flex items-center gap-2">
                <div className="flex gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-slate-700" />
                  <div className="w-2.5 h-2.5 rounded-full bg-slate-700" />
                  <div className="w-2.5 h-2.5 rounded-full bg-slate-700" />
                </div>
                <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider ml-1">Output</span>
              </div>
              {output && mode !== "validate" && (
                <button
                  onClick={handleCopy}
                  className={`flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg transition-colors ${
                    copied
                      ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
                      : "bg-slate-800 text-slate-400 hover:text-slate-200 border border-slate-700/60 hover:bg-slate-700"
                  }`}
                >
                  <Copy className="w-3 h-3" />
                  {copied ? "Copied!" : "Copy"}
                </button>
              )}
            </div>
            <div className="flex-1 h-80 overflow-auto p-4">
              {output === "valid" ? (
                <div className="flex flex-col items-center justify-center h-full gap-3 text-center">
                  <div className="w-14 h-14 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center">
                    <CheckCircle2 className="w-7 h-7 text-emerald-400" />
                  </div>
                  <div>
                    <p className="font-semibold text-white text-base">Valid JSON</p>
                    <p className="text-slate-500 text-sm mt-1">Your JSON is well-formed and syntactically correct.</p>
                  </div>
                </div>
              ) : output ? (
                <pre
                  className="font-mono text-sm leading-relaxed text-slate-300 whitespace-pre-wrap break-all"
                  dangerouslySetInnerHTML={{ __html: syntaxHighlight(output) }}
                />
              ) : (
                <p className="text-slate-700 text-sm font-mono">Output will appear here...</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
"use client";
import Link from "next/link";
import { useState } from "react";
import { Menu, X, Zap, ChevronDown } from "lucide-react";

const tools = [
  { label: "PDF to Word", href: "/pdf-to-word" },
  { label: "Compress PDF", href: "/compress-pdf" },
  { label: "JPG to PNG", href: "/jpg-to-png" },
  { label: "Image Compressor", href: "/image-compressor" },
  { label: "JSON Formatter", href: "/json-formatter" },
];

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center shadow-sm group-hover:bg-blue-700 transition-colors">
              <Zap className="w-4 h-4 text-white" />
            </div>
            <span className="text-xl font-bold text-slate-900" style={{ fontFamily: "'Syne', sans-serif" }}>
              Tooli<span className="text-blue-600">fy</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1">
            <div className="relative">
              <button
                onMouseEnter={() => setDropdownOpen(true)}
                onMouseLeave={() => setDropdownOpen(false)}
                className="flex items-center gap-1 px-4 py-2 text-sm font-medium text-slate-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
              >
                Tools <ChevronDown className="w-3.5 h-3.5" />
              </button>
              {dropdownOpen && (
                <div
                  onMouseEnter={() => setDropdownOpen(true)}
                  onMouseLeave={() => setDropdownOpen(false)}
                  className="absolute top-full left-0 mt-1 w-52 bg-white rounded-xl shadow-xl border border-slate-200 py-2 z-50"
                >
                  {tools.map((t) => (
                    <Link
                      key={t.href}
                      href={t.href}
                      className="block px-4 py-2.5 text-sm text-slate-700 hover:bg-blue-50 hover:text-blue-700 transition-colors"
                    >
                      {t.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
            <Link href="/blog" className="px-4 py-2 text-sm font-medium text-slate-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
              Blog
            </Link>
            <Link href="/privacy" className="px-4 py-2 text-sm font-medium text-slate-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
              Privacy
            </Link>
          </nav>

          {/* Mobile toggle */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden border-t border-slate-200 bg-white px-4 py-4 space-y-1">
          {tools.map((t) => (
            <Link
              key={t.href}
              href={t.href}
              onClick={() => setMobileOpen(false)}
              className="block px-4 py-2.5 text-sm text-slate-700 hover:bg-blue-50 hover:text-blue-700 rounded-lg"
            >
              {t.label}
            </Link>
          ))}
          <Link href="/blog" onClick={() => setMobileOpen(false)} className="block px-4 py-2.5 text-sm text-slate-700 hover:bg-blue-50 hover:text-blue-700 rounded-lg">
            Blog
          </Link>
          <Link href="/privacy" onClick={() => setMobileOpen(false)} className="block px-4 py-2.5 text-sm text-slate-700 hover:bg-blue-50 hover:text-blue-700 rounded-lg">
            Privacy
          </Link>
        </div>
      )}
    </header>
  );
}
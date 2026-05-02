import Link from "next/link";
import { Zap, Computer, Bird } from "lucide-react";

const toolLinks = [
  { label: "PDF to Word", href: "/pdf-to-word" },
  { label: "JPG to PNG", href: "/jpg-to-png" },
  { label: "Image Compressor", href: "/image-compressor" },
  { label: "JSON Formatter", href: "/json-formatter" },
];

const blogLinks = [
  { label: "PDF to Word Guide", href: "/blog/pdf-to-word-without-losing-formatting" },
  { label: "Best Image Compressors", href: "/blog/best-free-image-compressor-online" },
  { label: "Reduce PDF Size for Email", href: "/blog/reduce-pdf-size-for-email" },
];

export default function Footer() {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="bg-slate-900 text-slate-400 ">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div className="md:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <Zap className="w-4 h-4 text-white" />
              </div>
              <span className="text-xl font-bold text-white" style={{ fontFamily: "'Syne', sans-serif" }}>
                File<span className="text-blue-400">Zypher</span>
              </span>
            </Link>
            <p className="text-sm leading-relaxed mb-5">
              Free, fast online tools for everyday file tasks. No login. No watermarks. No limits.
            </p>
            <div className="flex gap-3">
              <a href="#" aria-label="GitHub" className="w-8 h-8 bg-slate-800 hover:bg-slate-700 rounded-lg flex items-center justify-center transition-colors">
                <Computer className="w-4 h-4" />
              </a>
              <a href="#" aria-label="Twitter" className="w-8 h-8 bg-slate-800 hover:bg-slate-700 rounded-lg flex items-center justify-center transition-colors">
                <Bird className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Tools */}
          <div>
            <h3 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Tools</h3>
            <ul className="space-y-2.5">
              {toolLinks.map((t) => (
                <li key={t.href}>
                  <Link href={t.href} className="text-sm hover:text-blue-400 transition-colors">
                    {t.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Blog */}
          <div>
            <h3 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Blog</h3>
            <ul className="space-y-2.5">
              {blogLinks.map((b) => (
                <li key={b.href}>
                  <Link href={b.href} className="text-sm hover:text-blue-400 transition-colors">
                    {b.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Company</h3>
            <ul className="space-y-2.5">
              <li><Link href="/privacy" className="text-sm hover:text-blue-400 transition-colors">Privacy Policy</Link></li>
              <li><Link href="/terms" className="text-sm hover:text-blue-400 transition-colors">Terms of Service</Link></li>
              <li><Link href="/gdpr" className="text-sm hover:text-blue-400 transition-colors">GDPR</Link></li>
              <li><Link href="/cookies" className="text-sm hover:text-blue-400 transition-colors">Cookie Policy</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-800 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm">© {currentYear} Toolify. All rights reserved.</p>
          <p className="text-xs text-slate-500">Files are processed locally in your browser. We never store your data.</p>
        </div>
      </div>
    </footer>
  );
}

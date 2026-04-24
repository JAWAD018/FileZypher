import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Clock, Calendar } from "lucide-react";

export const metadata: Metadata = {
  title: "How to Convert PDF to Word Without Losing Formatting",
  description:
    "Step-by-step guide to converting PDF to Word while keeping fonts, tables, and layout intact. Covers text-based PDFs, scanned docs, and common formatting issues.",
  alternates: { canonical: "https://filezypher.vercel.app/blog/pdf-to-word-without-losing-formatting" },
  openGraph: {
    title: "Convert PDF to Word Without Losing Formatting – Toolify Blog",
    type: "article",
  },
};

const steps = [
  {
    n: "01",
    title: "Confirm it's a text-based PDF",
    body: "Open it in your browser or PDF viewer and try to select text. If you can highlight individual words, you're good to go.",
  },
  {
    n: "02",
    title: "Remove password protection",
    body: "If the PDF is protected, most converters won't be able to access the content. Remove the password in Adobe Acrobat or an online tool before converting.",
  },
  {
    n: "03",
    title: "Use Toolify's free converter",
    body: null,
    link: { label: "filezypher.vercel.app/pdf-to-word", href: "/pdf-to-word" },
    suffix: "— runs in your browser, no upload, no privacy risk.",
  },
  {
    n: "04",
    title: "Review headings after conversion",
    body: "The most common issue is heading styles applied inconsistently. Spend two minutes in Word applying H1, H2 etc. using the Styles panel.",
  },
  {
    n: "05",
    title: "Check tables",
    body: "Simple tables usually convert well. Complex tables with merged or nested cells may need manual adjustment.",
  },
  {
    n: "06",
    title: "Relink images if needed",
    body: "Embedded images are generally preserved but may shift slightly. Use Word's image positioning tools to anchor them correctly.",
  },
];

const issues = [
  {
    title: "Fonts look different",
    body: "If the original PDF uses a font not installed on your computer, Word substitutes a similar one. Fix: install the original font, or manually reapply it after conversion.",
  },
  {
    title: "Text is in text boxes instead of normal paragraphs",
    body: "This happens with complex column layouts. The converter places each text block in a separate text box to preserve position. Cut the text, paste into a regular paragraph, then reformat.",
  },
  {
    title: "Numbers and bullets look wrong",
    body: "Lists in PDFs are sometimes stored as plain text (e.g. \"1. Item\"). The converter may not recognise them as lists. Apply Word's List Bullet or List Number style to fix.",
  },
];

export default function PdfToWordBlogPost() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-14">

        {/* Breadcrumb */}
        <nav className="text-sm text-slate-600 mb-8 flex items-center gap-2">
          <Link href="/" className="hover:text-blue-400 transition-colors">Home</Link>
          <span className="text-slate-700">/</span>
          <Link href="/blog" className="hover:text-blue-400 transition-colors">Blog</Link>
          <span className="text-slate-700">/</span>
          <span className="text-slate-400">PDF to Word Formatting</span>
        </nav>

        {/* Meta row */}
        <div className="flex items-center gap-3 mb-5">
          <span className="text-xs font-semibold bg-blue-500/10 text-blue-400 border border-blue-500/20 px-2.5 py-1 rounded-full">PDF</span>
          <span className="text-xs text-slate-500 flex items-center gap-1"><Clock className="w-3 h-3" /> 5 min read</span>
          <span className="text-xs text-slate-500 flex items-center gap-1"><Calendar className="w-3 h-3" /> April 2025</span>
        </div>

        {/* Title */}
        <h1 className="text-4xl font-bold text-white mb-5 leading-tight tracking-tight" style={{ fontFamily: "'Syne', sans-serif" }}>
          How to Convert PDF to Word Without Losing Formatting
        </h1>
        <p className="text-lg text-slate-400 mb-12 leading-relaxed border-l-2 border-blue-500/40 pl-4">
          Nothing is more frustrating than converting a perfectly formatted PDF into Word and getting back a jumbled mess. Here's how to do it right.
        </p>

        <article className="space-y-10 text-slate-300 text-[15px] leading-relaxed">

          {/* Section 1 */}
          <section>
            <h2 className="text-xl font-bold text-white mb-3" style={{ fontFamily: "'Syne', sans-serif" }}>
              Why Does Formatting Break in PDF Conversion?
            </h2>
            <p>
              PDFs don't store content the way Word documents do. A PDF is essentially a set of instructions for drawing shapes, lines, and text on a page — it doesn't know the difference between a heading and body text.
            </p>
            <p className="mt-3">
              When a converter reads this and tries to reconstruct a Word document, it has to make educated guesses about headings, tables, and multi-column layouts. These guesses are getting better, but they're not perfect.
            </p>
          </section>

          {/* Section 2 — two PDF types */}
          <section>
            <h2 className="text-xl font-bold text-white mb-4" style={{ fontFamily: "'Syne', sans-serif" }}>
              The Two Types of PDFs (and Why It Matters)
            </h2>
            <div className="grid sm:grid-cols-2 gap-3">
              {[
                {
                  label: "Text-based PDFs",
                  color: "border-blue-500/20 bg-blue-500/5",
                  badge: "bg-blue-500/10 text-blue-400 border-blue-500/20",
                  body: "Created directly from Word, Google Docs, or InDesign. The file contains actual text data. These convert cleanly and are what Toolify handles best.",
                },
                {
                  label: "Scanned PDFs",
                  color: "border-amber-500/20 bg-amber-500/5",
                  badge: "bg-amber-500/10 text-amber-400 border-amber-500/20",
                  body: "Created by photographing or scanning a physical document. Contains images, not text. Requires OCR — a separate, more complex process.",
                },
              ].map((t) => (
                <div key={t.label} className={`rounded-xl border p-4 ${t.color}`}>
                  <span className={`text-xs font-semibold border px-2 py-0.5 rounded-full ${t.badge}`}>{t.label}</span>
                  <p className="text-sm text-slate-400 mt-3 leading-relaxed">{t.body}</p>
                </div>
              ))}
            </div>
            <p className="mt-4 text-sm text-slate-400">
              To check which type you have: try selecting text in your PDF viewer. If you can highlight individual words, it's text-based. If the cursor draws a box over the whole page, it's a scanned image.
            </p>
          </section>

          {/* Section 3 — steps */}
          <section>
            <h2 className="text-xl font-bold text-white mb-5" style={{ fontFamily: "'Syne', sans-serif" }}>
              Step-by-Step: Getting the Best Conversion Results
            </h2>
            <div className="space-y-3">
              {steps.map((s) => (
                <div key={s.n} className="flex gap-4 bg-slate-900/60 border border-slate-700/60 rounded-xl p-4">
                  <span className="text-xs font-bold text-blue-400 font-mono mt-0.5 shrink-0">{s.n}</span>
                  <div>
                    <p className="font-semibold text-white text-sm mb-1">{s.title}</p>
                    {s.body && <p className="text-slate-400 text-sm leading-relaxed">{s.body}</p>}
                    {s.link && (
                      <p className="text-slate-400 text-sm leading-relaxed">
                        Upload at{" "}
                        <Link href={s.link.href} className="text-blue-400 hover:text-blue-300 underline underline-offset-2 transition-colors">
                          {s.link.label}
                        </Link>{" "}
                        {s.suffix}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Section 4 — common issues */}
          <section>
            <h2 className="text-xl font-bold text-white mb-4" style={{ fontFamily: "'Syne', sans-serif" }}>
              Common Formatting Issues and How to Fix Them
            </h2>
            <div className="space-y-3">
              {issues.map((issue) => (
                <div key={issue.title} className="bg-slate-900/60 border border-slate-700/60 rounded-xl p-5">
                  <h3 className="font-semibold text-white mb-1.5 text-[15px]">{issue.title}</h3>
                  <p className="text-slate-400 text-sm leading-relaxed">{issue.body}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Section 5 */}
          <section>
            <h2 className="text-xl font-bold text-white mb-3" style={{ fontFamily: "'Syne', sans-serif" }}>
              When to Use a Different Approach
            </h2>
            <p className="text-slate-400 text-sm leading-relaxed">
              If your PDF is a scanned document, a free browser-based converter won't help much. You'll need an OCR tool. Adobe Acrobat Pro has built-in OCR. Free alternatives include Google Drive (which can OCR PDFs when opened in Google Docs) and Tesseract.
            </p>
          </section>

          {/* Summary callout */}
          <div className="bg-blue-500/5 border border-blue-500/20 rounded-2xl p-6">
            <h3 className="font-bold text-white mb-2 text-[15px]">Summary</h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              For text-based PDFs, a good converter like Toolify will preserve formatting surprisingly well. The main issues — heading styles, font substitution, and complex table layouts — can be fixed quickly in Word. For scanned PDFs, you need OCR, which is a different tool entirely.
            </p>
          </div>
        </article>

        {/* CTA */}
        <div className="mt-12 bg-slate-900/80 border border-slate-700/60 rounded-2xl p-7 backdrop-blur-sm">
          <div className="inline-flex items-center gap-2 bg-slate-800/60 border border-slate-700/40 rounded-full px-3 py-1 mb-4">
            <span className="text-blue-400 text-xs">✦</span>
            <span className="text-xs font-medium text-slate-400">Free tool</span>
          </div>
          <h3 className="font-bold text-white mb-2 text-lg" style={{ fontFamily: "'Syne', sans-serif" }}>
            Ready to convert your PDF?
          </h3>
          <p className="text-slate-400 text-sm mb-5">Free, instant, no signup. Your file never leaves your browser.</p>
          <Link
            href="/pdf-to-word"
            className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white font-semibold px-5 py-2.5 rounded-xl transition-all duration-150 shadow-lg shadow-blue-600/20 text-sm"
          >
            Convert PDF to Word <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Related */}
        <div className="mt-10">
          <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-4">Related Articles</h3>
          <div className="space-y-3">
            {[
              { title: "How to Reduce PDF Size for Email Attachments", href: "/blog/reduce-pdf-size-for-email" },
              { title: "Best Free Image Compressor Online in 2025",     href: "/blog/best-free-image-compressor-online" },
            ].map((p) => (
              <Link
                key={p.href}
                href={p.href}
                className="flex items-center justify-between p-4 bg-slate-900/60 border border-slate-700/60 rounded-xl hover:border-slate-600 transition-colors group"
              >
                <span className="text-sm font-semibold text-slate-300 group-hover:text-white transition-colors">{p.title}</span>
                <ArrowRight className="w-4 h-4 text-slate-600 group-hover:text-blue-400 transition-colors shrink-0 ml-3" />
              </Link>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
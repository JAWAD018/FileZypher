import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Clock, Calendar } from "lucide-react";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "How to Reduce PDF Size for Email Attachments",
  description:
    "Learn how to compress a PDF for email without ruining quality. Step-by-step tips for Gmail, Outlook, large PDFs, scanned files, and keeping documents under attachment limits.",
  alternates: { canonical: "https://toolify.io/blog/reduce-pdf-size-for-email" },
  openGraph: {
    title: "How to Reduce PDF Size for Email Attachments – Toolify Blog",
    type: "article",
  },
};

const steps = [
  {
    n: "01",
    title: "Check your email attachment limit",
    body: "Most email providers have strict upload caps. Gmail typically allows up to 25 MB per email, while some business inboxes and contact forms allow far less.",
  },
  {
    n: "02",
    title: "Measure the current PDF size",
    body: "Before compressing, check the file size in File Explorer or Finder. Knowing whether your PDF is 8 MB or 80 MB helps you choose the right level of compression.",
  },
  {
    n: "03",
    title: "Use Toolify's free PDF compressor",
    body: null,
    link: { label: "toolify.io/compress-pdf", href: "/compress-pdf" },
    suffix: "— fast, browser-based, and ideal for shrinking PDFs before sending them by email.",
  },
  {
    n: "04",
    title: "Choose the lowest size that still looks professional",
    body: "For contracts, resumes, invoices, and forms, readability matters more than perfect visual fidelity. Compress until the file is small enough, then quickly review text and images.",
  },
  {
    n: "05",
    title: "Re-save scanned PDFs carefully",
    body: "Scanned PDFs are often huge because each page is stored as an image. Compression helps a lot, but aggressive settings can make small text blurry.",
  },
  {
    n: "06",
    title: "Send or split the file if needed",
    body: "If your PDF is still too large after compression, split it into multiple files or use a share link instead of attaching the full document directly.",
  },
];

const issues = [
  {
    title: "The PDF is still too large after compression",
    body: "This usually happens with image-heavy or scanned PDFs. Try stronger compression, remove unnecessary pages, or split the file into smaller parts before emailing.",
  },
  {
    title: "Text looks blurry after compressing",
    body: "The compression level is too aggressive. Re-compress using a lighter setting so small fonts, signatures, and tables stay readable.",
  },
  {
    title: "Images look washed out or low quality",
    body: "Large photos inside PDFs are usually the main source of file size. Reduce them carefully. For resumes or reports, you can usually lower image quality without affecting usability.",
  },
];

export default function ReducePdfSizeForEmailBlogPost() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-14">
        {/* Breadcrumb */}
        <nav className="text-sm text-slate-600 mb-8 flex items-center gap-2">
          <Link href="/" className="hover:text-blue-400 transition-colors">
            Home
          </Link>
          <span className="text-slate-700">/</span>
          <Link href="/blog" className="hover:text-blue-400 transition-colors">
            Blog
          </Link>
          <span className="text-slate-700">/</span>
          <span className="text-slate-400">Reduce PDF Size for Email</span>
        </nav>

        {/* Meta row */}
        <div className="flex items-center gap-3 mb-5">
          <span className="text-xs font-semibold bg-blue-500/10 text-blue-400 border border-blue-500/20 px-2.5 py-1 rounded-full">
            PDF
          </span>
          <span className="text-xs text-slate-500 flex items-center gap-1">
            <Clock className="w-3 h-3" /> 6 min read
          </span>
          <span className="text-xs text-slate-500 flex items-center gap-1">
            <Calendar className="w-3 h-3" /> April 2025
          </span>
        </div>

        {/* Title */}
        <h1
          className="text-4xl font-bold text-white mb-5 leading-tight tracking-tight"
          style={{ fontFamily: "'Syne', sans-serif" }}
        >
          How to Reduce PDF Size for Email Attachments
        </h1>
        <p className="text-lg text-slate-400 mb-12 leading-relaxed border-l-2 border-blue-500/40 pl-4">
          Large PDFs are one of the most common reasons emails fail to send.
          Here&apos;s how to compress a PDF for email without making it look
          terrible.
        </p>

        <article className="space-y-10 text-slate-300 text-[15px] leading-relaxed">
          {/* Section 1 */}
          <section>
            <h2
              className="text-xl font-bold text-white mb-3"
              style={{ fontFamily: "'Syne', sans-serif" }}
            >
              Why PDF Files Become Too Large for Email
            </h2>
            <p>
              Most oversized PDFs are large because they contain high-resolution
              images, scanned pages, embedded fonts, or unnecessary metadata.
              Even a short document can become huge if every page is stored as a
              full-page image.
            </p>
            <p className="mt-3">
              Email services care about total attachment size, not page count.
              That&apos;s why a 3-page scanned PDF can be harder to send than a
              30-page text-based report.
            </p>
          </section>

          {/* Section 2 */}
          <section>
            <h2
              className="text-xl font-bold text-white mb-4"
              style={{ fontFamily: "'Syne', sans-serif" }}
            >
              Common Email Attachment Limits
            </h2>
            <div className="grid sm:grid-cols-2 gap-3">
              {[
                {
                  label: "Standard email providers",
                  color: "border-blue-500/20 bg-blue-500/5",
                  badge: "bg-blue-500/10 text-blue-400 border-blue-500/20",
                  body: "Services like Gmail often allow attachments up to 25 MB, but the effective usable limit can be lower once encoding overhead is added.",
                },
                {
                  label: "Work inboxes and forms",
                  color: "border-amber-500/20 bg-amber-500/5",
                  badge: "bg-amber-500/10 text-amber-400 border-amber-500/20",
                  body: "Company inboxes, HR systems, and support portals often set lower limits like 5 MB or 10 MB, especially for resumes and application documents.",
                },
              ].map((t) => (
                <div key={t.label} className={`rounded-xl border p-4 ${t.color}`}>
                  <span
                    className={`text-xs font-semibold border px-2 py-0.5 rounded-full ${t.badge}`}
                  >
                    {t.label}
                  </span>
                  <p className="text-sm text-slate-400 mt-3 leading-relaxed">
                    {t.body}
                  </p>
                </div>
              ))}
            </div>
            <p className="mt-4 text-sm text-slate-400">
              Best practice: compress your PDF below the maximum limit instead of
              aiming right at it. That gives you a safer margin for sending.
            </p>
          </section>

          {/* Section 3 */}
          <section>
            <h2
              className="text-xl font-bold text-white mb-5"
              style={{ fontFamily: "'Syne', sans-serif" }}
            >
              Step-by-Step: How to Compress a PDF for Email
            </h2>
            <div className="space-y-3">
              {steps.map((s) => (
                <div
                  key={s.n}
                  className="flex gap-4 bg-slate-900/60 border border-slate-700/60 rounded-xl p-4"
                >
                  <span className="text-xs font-bold text-blue-400 font-mono mt-0.5 shrink-0">
                    {s.n}
                  </span>
                  <div>
                    <p className="font-semibold text-white text-sm mb-1">
                      {s.title}
                    </p>
                    {s.body && (
                      <p className="text-slate-400 text-sm leading-relaxed">
                        {s.body}
                      </p>
                    )}
                    {s.link && (
                      <p className="text-slate-400 text-sm leading-relaxed">
                        Start at{" "}
                        <Link
                          href={s.link.href}
                          className="text-blue-400 hover:text-blue-300 underline underline-offset-2 transition-colors"
                        >
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

          {/* Section 4 */}
          <section>
            <h2
              className="text-xl font-bold text-white mb-4"
              style={{ fontFamily: "'Syne', sans-serif" }}
            >
              Common Problems When Reducing PDF Size
            </h2>
            <div className="space-y-3">
              {issues.map((issue) => (
                <div
                  key={issue.title}
                  className="bg-slate-900/60 border border-slate-700/60 rounded-xl p-5"
                >
                  <h3 className="font-semibold text-white mb-1.5 text-[15px]">
                    {issue.title}
                  </h3>
                  <p className="text-slate-400 text-sm leading-relaxed">
                    {issue.body}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* Section 5 */}
          <section>
            <h2
              className="text-xl font-bold text-white mb-3"
              style={{ fontFamily: "'Syne', sans-serif" }}
            >
              Best PDF Types for Email
            </h2>
            <p className="text-slate-400 text-sm leading-relaxed">
              The easiest PDFs to email are text-based documents like invoices,
              contracts, letters, and resumes exported directly from Word or
              Google Docs. These are usually compact already and compress well.
              Scanned PDFs, brochures, portfolios, and image-heavy reports are
              much more likely to exceed email size limits.
            </p>
          </section>

          {/* Section 6 */}
          <section>
            <h2
              className="text-xl font-bold text-white mb-3"
              style={{ fontFamily: "'Syne', sans-serif" }}
            >
              Quick Tips to Make a PDF Smaller Before Sending
            </h2>
            <ul className="space-y-2 text-slate-400 text-sm leading-relaxed">
              <li>Remove unnecessary pages before exporting.</li>
              <li>Compress scanned documents more aggressively than text PDFs.</li>
              <li>Export resumes and reports as standard PDFs, not print-quality PDFs.</li>
              <li>Use image compression before placing large images into the PDF.</li>
              <li>Double-check readability after compression, especially signatures and tables.</li>
            </ul>
          </section>

          {/* Summary callout */}
          <div className="bg-blue-500/5 border border-blue-500/20 rounded-2xl p-6">
            <h3 className="font-bold text-white mb-2 text-[15px]">Summary</h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              If your PDF is too large for email, the fix is usually simple:
              compress images, reduce scan-heavy pages, and aim for a smaller
              file than the attachment limit requires. For most people, a fast
              browser-based PDF compressor is the easiest way to make a file
              email-ready in under a minute.
            </p>
          </div>
        </article>

        {/* CTA */}
        <div className="mt-12 bg-slate-900/80 border border-slate-700/60 rounded-2xl p-7 backdrop-blur-sm">
          <div className="inline-flex items-center gap-2 bg-slate-800/60 border border-slate-700/40 rounded-full px-3 py-1 mb-4">
            <span className="text-blue-400 text-xs">✦</span>
            <span className="text-xs font-medium text-slate-400">Free tool</span>
          </div>
          <h3
            className="font-bold text-white mb-2 text-lg"
            style={{ fontFamily: "'Syne', sans-serif" }}
          >
            Need to shrink a PDF before sending it?
          </h3>
          <p className="text-slate-400 text-sm mb-5">
            Compress your PDF in seconds. No signup, no installation, no hassle.
          </p>
          <Link
            href="/compress-pdf"
            className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white font-semibold px-5 py-2.5 rounded-xl transition-all duration-150 shadow-lg shadow-blue-600/20 text-sm"
          >
            Compress PDF <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Related */}
        <div className="mt-10">
          <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-4">
            Related Articles
          </h3>
          <div className="space-y-3">
            {[
              {
                title: "How to Convert PDF to Word Without Losing Formatting",
                href: "/blog/pdf-to-word-without-losing-formatting",
              },
              {
                title: "Best Free Image Compressor Online in 2025",
                href: "/blog/best-free-image-compressor-online",
              },
            ].map((p) => (
              <Link
                key={p.href}
                href={p.href}
                className="flex items-center justify-between p-4 bg-slate-900/60 border border-slate-700/60 rounded-xl hover:border-slate-600 transition-colors group"
              >
                <span className="text-sm font-semibold text-slate-300 group-hover:text-white transition-colors">
                  {p.title}
                </span>
                <ArrowRight className="w-4 h-4 text-slate-600 group-hover:text-blue-400 transition-colors shrink-0 ml-3" />
              </Link>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

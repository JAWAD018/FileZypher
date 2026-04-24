import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Clock } from "lucide-react";

export const metadata: Metadata = {
  title: "Blog – File Conversion Tips, Guides & Tutorials",
  description:
    "Learn how to convert, compress, and manage files efficiently. Practical guides on PDF conversion, image compression, developer tools, and more.",
  alternates: { canonical: "https://filezypher.vercel.app/blog" },
};

const posts = [
  {
    title: "How to Convert PDF to Word Without Losing Formatting",
    excerpt:
      "Converting a PDF to Word seems simple, but formatting loss is a common frustration. This guide explains how PDF-to-Word conversion works, what can go wrong, and how to get the cleanest result every time.",
    href: "/blog/pdf-to-word-without-losing-formatting",
    category: "PDF",
    accent: "text-blue-400",
    badge: "bg-blue-500/10 text-blue-400 border border-blue-500/20",
    readTime: "5 min read",
    date: "April 2025",
  },
  {
    title: "Best Free Image Compressor Online in 2025",
    excerpt:
      "We compared the top free image compression tools available in 2025. From browser-based tools to CLI options, here's what actually works — and what the trade-offs are.",
    href: "/blog/best-free-image-compressor-online",
    category: "Image",
    accent: "text-teal-400",
    badge: "bg-teal-500/10 text-teal-400 border border-teal-500/20",
    readTime: "6 min read",
    date: "March 2025",
  },
  {
    title: "How to Reduce PDF Size for Email Attachments",
    excerpt:
      "Gmail, Outlook, and Yahoo all cap attachment sizes. Here's a practical walkthrough of the fastest ways to get your PDF under the limit without sacrificing readability.",
    href: "/blog/reduce-pdf-size-for-email",
    category: "PDF",
    accent: "text-violet-400",
    badge: "bg-violet-500/10 text-violet-400 border border-violet-500/20",
    readTime: "4 min read",
    date: "February 2025",
  },
];

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-16">

        {/* Header */}
        <div className="mb-12">
          <div className="inline-flex items-center gap-2 bg-slate-800/60 border border-slate-700/40 rounded-full px-3.5 py-1.5 mb-6">
            <span className="text-teal-400 text-xs">✦</span>
            <span className="text-xs font-medium text-slate-300">Guides & Tutorials</span>
          </div>
          <h1 className="text-4xl font-bold text-white mb-3 tracking-tight" style={{ fontFamily: "'Syne', sans-serif" }}>
            The Toolify Blog
          </h1>
          <p className="text-slate-400 text-lg max-w-xl leading-relaxed">
            Practical guides on PDF conversion, image compression, and developer file tools. Written for humans, not search engines.
          </p>
        </div>

        {/* Posts */}
        <div className="space-y-4">
          {posts.map((post) => (
            <Link
              key={post.href}
              href={post.href}
              className="group block bg-slate-900/80 border border-slate-700/60 rounded-2xl p-7 hover:border-slate-600 hover:-translate-y-0.5 transition-all duration-200 backdrop-blur-sm"
            >
              {/* Meta row */}
              <div className="flex items-center gap-3 mb-4">
                <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${post.badge}`}>
                  {post.category}
                </span>
                <span className="text-xs text-slate-500 flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  {post.readTime}
                </span>
                <span className="text-xs text-slate-600">{post.date}</span>
              </div>

              {/* Title */}
              <h2
                className={`text-xl font-bold text-white group-hover:${post.accent} transition-colors mb-2 leading-snug`}
                style={{ fontFamily: "'Syne', sans-serif" }}
              >
                {post.title}
              </h2>

              {/* Excerpt */}
              <p className="text-slate-400 text-sm leading-relaxed mb-5">{post.excerpt}</p>

              {/* CTA */}
              <span className={`inline-flex items-center gap-1.5 text-sm font-semibold ${post.accent} group-hover:gap-2.5 transition-all duration-150`}>
                Read article <ArrowRight className="w-3.5 h-3.5" />
              </span>
            </Link>
          ))}
        </div>

        {/* Footer note */}
        <p className="mt-10 text-center text-xs text-slate-600">
          More articles coming soon · <span className="text-slate-500">Updated monthly</span>
        </p>
      </div>
    </div>
  );
}
import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  Code2,
  FileText,
  Image as ImageIcon,
  Minimize2,
  Shield,
  Sparkles,
  Star,
  Users,
  Zap,
} from "lucide-react";
import ToolCard from "@/components/ToolCard";

export const metadata: Metadata = {
  title: "FileZypher - Free Online File Converter & Utility Tools",
  description:
    "Free online tools to convert, compress, and format files. PDF to Word, image compressor, JSON formatter, and more. No login required. Works in your browser.",
};

const tools = [
  {
    icon: FileText,
    iconBg: "bg-rose-100",
    iconColor: "text-rose-600",
    badge: "PDF",
    badgeColor: "bg-rose-100 text-rose-700",
    title: "PDF to Word Converter",
    description:
      "Convert PDF files into editable Word documents in seconds while keeping fonts, spacing, and layout intact.",
    href: "/pdf-to-word",
    keywords: ["free", "docx", "editable"],
  },
  // {
  //   icon: Minimize2,
  //   iconBg: "bg-amber-100",
  //   iconColor: "text-amber-600",
  //   badge: "PDF",
  //   badgeColor: "bg-amber-100 text-amber-700",
  //   title: "Compress PDF",
  //   description:
  //     "Shrink large PDFs for email, uploads, and sharing without the muddy text and blurry pages.",
  //   href: "/compress-pdf",
  //   keywords: ["reduce size", "optimize", "email"],
  // },
  {
    icon: ImageIcon,
    iconBg: "bg-sky-100",
    iconColor: "text-sky-600",
    badge: "Image",
    badgeColor: "bg-sky-100 text-sky-700",
    title: "JPG to PNG Converter",
    description:
      "Turn JPEG images into PNG files with crisp quality and support for transparent backgrounds.",
    href: "/jpg-to-png",
    keywords: ["convert", "lossless", "transparent"],
  },
  {
    icon: ImageIcon,
    iconBg: "bg-fuchsia-100",
    iconColor: "text-fuchsia-600",
    badge: "Image",
    badgeColor: "bg-fuchsia-100 text-fuchsia-700",
    title: "Image Compressor",
    description:
      "Compress JPG, PNG, and WebP images while keeping them clean, fast-loading, and presentation-ready.",
    href: "/image-compressor",
    keywords: ["jpg", "png", "webp", "optimize"],
  },
  {
    icon: Code2,
    iconBg: "bg-emerald-100",
    iconColor: "text-emerald-600",
    badge: "Developer",
    badgeColor: "bg-emerald-100 text-emerald-700",
    title: "JSON Formatter",
    description:
      "Validate, prettify, and minify JSON instantly with syntax-aware formatting and error feedback.",
    href: "/json-formatter",
    keywords: ["validate", "beautify", "minify"],
  },
];

const stats = [
  { value: "10M+", label: "Files Processed" },
  { value: "190+", label: "Countries Reached" },
  { value: "4.9/5", label: "Average Rating" },
  { value: "100%", label: "Free to Use" },
];

const blogPosts = [
  {
    title: "How to Convert PDF to Word Without Losing Formatting",
    excerpt:
      "A practical guide to preserving tables, spacing, and fonts when turning PDFs into editable files.",
    href: "/blog/pdf-to-word-without-losing-formatting",
    category: "PDF",
  },
  {
    title: "Best Free Image Compressor Online in 2025",
    excerpt:
      "A breakdown of what actually matters when you want smaller images without soft edges and washed-out color.",
    href: "/blog/best-free-image-compressor-online",
    category: "Image",
  },
  {
    title: "How to Reduce PDF Size for Email Attachments",
    excerpt:
      "Send polished PDFs through Gmail and Outlook without hitting file-size limits or hurting readability.",
    href: "/blog/reduce-pdf-size-for-email",
    category: "PDF",
  },
  {
  title: "JSON Formatter: What It Is, How to Use It, and Why Developers Need One",
  excerpt:
    "Beautify, validate, and minify JSON with ease. Learn how a JSON formatter helps debug APIs, fix syntax errors, and make raw JSON readable.",
  href: "/blog/json-formatter-guide-blog-post",
  category: "Developer",
},

  
];

const trustPoints = [
  {
    icon: Shield,
    title: "Privacy First",
    desc: "Files are processed in your browser, so your uploads stay on your device.",
    accent: "bg-sky-100 text-sky-700",
  },
  {
    icon: Zap,
    title: "Fast by Design",
    desc: "No waiting on slow server queues. Most tools begin working as soon as you drop in a file.",
    accent: "bg-emerald-100 text-emerald-700",
  },
  {
    icon: Users,
    title: "Made for Everyone",
    desc: "Simple enough for first-time users and reliable enough for daily work.",
    accent: "bg-amber-100 text-amber-700",
  },
];

export default function HomePage() {
  return (
    <main className="bg-[#f7efe7] text-slate-900">
      <section className="relative overflow-hidden border-b border-slate-900/10 bg-[linear-gradient(135deg,#0f172a_0%,#102544_45%,#123b63_100%)] text-white">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(56,189,248,0.28),transparent_35%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,rgba(251,191,36,0.18),transparent_28%)]" />

        <div className="relative mx-auto max-w-6xl px-4 pb-20 pt-20 sm:px-6 lg:px-8 lg:pb-24">
          <div className="mx-auto max-w-3xl text-center">
            <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm font-medium text-sky-100 backdrop-blur">
              <Sparkles className="h-4 w-4" />
              Free file tools. No login. No watermarks.
            </div>

            <h1
              className="text-5xl font-bold leading-[0.95] tracking-tight sm:text-6xl lg:text-7xl"
              style={{ fontFamily: "'Syne', sans-serif" }}
            >
              File tools that feel
              <span className="block text-cyan-300">instant, private, and easy</span>
            </h1>

            <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-slate-200 sm:text-xl">
              Convert PDFs, compress images, and clean up data in seconds. Everything runs in your browser, so you stay in control from start to finish.
            </p>

            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link
                href="/pdf-to-word"
                className="inline-flex min-h-[56px] items-center gap-2 rounded-2xl bg-[#ffd166] px-8 py-4 text-base font-semibold text-slate-950 transition hover:-translate-y-0.5 hover:bg-[#ffdf8a]"
              >
                Try PDF to Word
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/json-formatter"
                className="inline-flex min-h-[56px] items-center gap-2 rounded-2xl border border-white/20 bg-white/8 px-8 py-4 text-base font-semibold text-white transition hover:bg-white/14"
              >
                Open JSON Formatter
              </Link>
            </div>
          </div>

          <div className="mt-14 grid grid-cols-2 gap-4 sm:grid-cols-4">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="rounded-3xl border border-white/10 bg-white/10 p-5 text-center shadow-[0_20px_60px_rgba(15,23,42,0.18)] backdrop-blur-sm"
              >
                <div
                  className="text-3xl font-bold text-white"
                  style={{ fontFamily: "'Syne', sans-serif" }}
                >
                  {stat.value}
                </div>
                <div className="mt-1 text-sm text-slate-300">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="tools" className="relative py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-2xl">
              <p className="mb-3 text-sm font-semibold uppercase tracking-[0.25em] text-sky-700">
                Popular Tools
              </p>
              <h2
                className="text-3xl font-bold sm:text-4xl"
                style={{ fontFamily: "'Syne', sans-serif" }}
              >
                Pick a tool and get to work right away
              </h2>
            </div>
            <p className="max-w-2xl text-base leading-7 text-slate-600 sm:text-lg">
              Fast, browser-based utilities for the jobs people repeat every day: converting, compressing, formatting, and sharing files without friction.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
            {tools.map((tool) => (
              <ToolCard key={tool.href} {...tool} />
            ))}
          </div>
        </div>
      </section>

      <section className="bg-slate-950 py-20 text-white">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 max-w-2xl">
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.25em] text-cyan-300">
              Why People Trust FileZypher
            </p>
            <h2
              className="text-3xl font-bold sm:text-4xl"
              style={{ fontFamily: "'Syne', sans-serif" }}
            >
              Privacy-friendly tools with less waiting and less clutter
            </h2>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {trustPoints.map(({ icon: Icon, title, desc, accent }) => (
              <div
                key={title}
                className="rounded-3xl border border-white/10 bg-white/5 p-7 shadow-[0_25px_70px_rgba(2,6,23,0.32)]"
              >
                <div className={`mb-5 inline-flex h-14 w-14 items-center justify-center rounded-2xl ${accent}`}>
                  <Icon className="h-7 w-7" />
                </div>
                <h3
                  className="text-xl font-bold text-white"
                  style={{ fontFamily: "'Syne', sans-serif" }}
                >
                  {title}
                </h3>
                <p className="mt-3 text-sm leading-7 text-slate-300">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 sm:py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="mb-3 text-sm font-semibold uppercase tracking-[0.25em] text-sky-700">
                From the Blog
              </p>
              <h2
                className="text-3xl font-bold text-slate-900"
                style={{ fontFamily: "'Syne', sans-serif" }}
              >
                Tips that help your files work better
              </h2>
              <p className="mt-2 text-slate-600">
                Short guides for file conversion, compression, and cleaner everyday workflows.
              </p>
            </div>
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-sm font-semibold text-sky-700 transition hover:text-sky-800"
            >
              View all articles
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
            {blogPosts.map((post) => (
              <Link
                key={post.href}
                href={post.href}
                className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-slate-200 bg-white p-6 shadow-[0_14px_45px_rgba(15,23,42,0.06)] transition duration-300 hover:-translate-y-1.5 hover:border-sky-300 hover:shadow-[0_24px_70px_rgba(14,116,144,0.16)]"
              >
                <span className="mb-5 inline-flex w-fit rounded-full bg-sky-100 px-3 py-1 text-xs font-semibold text-sky-700">
                  {post.category}
                </span>
                <h3 className="text-xl font-bold leading-snug text-slate-900 transition-colors group-hover:text-sky-700">
                  {post.title}
                </h3>
                <p className="mt-3 line-clamp-3 text-sm leading-7 text-slate-600">
                  {post.excerpt}
                </p>
                <div className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-sky-700">
                  Read article
                  <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-slate-200 bg-[linear-gradient(135deg,#0369a1_0%,#0f766e_100%)] py-18 text-white sm:py-20">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6">
          <Star className="mx-auto h-8 w-8 text-amber-300" />
          <h2
            className="mt-4 text-3xl font-bold sm:text-4xl"
            style={{ fontFamily: "'Syne', sans-serif" }}
          >
            Loved by millions for everyday file tasks
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg leading-8 text-cyan-50">
            FileZypher keeps file utilities simple: fast tools, zero signup friction, and a homepage that points people straight to the job they need done.
          </p>
          <Link
            href="/pdf-to-word"
            className="mt-8 inline-flex min-h-[56px] items-center gap-2 rounded-2xl bg-white px-8 py-4 font-semibold text-sky-800 transition hover:bg-slate-100"
          >
            Get Started Free
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </main>
  );
}
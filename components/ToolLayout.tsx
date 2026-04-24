import Link from "next/link";
import { ArrowRight, Shield, Zap, Lock } from "lucide-react";
import type { ReactNode } from "react";

interface RelatedTool {
  label: string;
  href: string;
  description: string;
}

interface FAQItem {
  q: string;
  a: string;
}

interface ToolLayoutProps {
  badge: string;
  badgeColor?: string;
  title: string;
  description: string;
  toolArea: ReactNode;
  howToSteps: { title: string; desc: string }[];
  contentTitle: string;
  contentBody: ReactNode;
  faqs: FAQItem[];
  relatedTools: RelatedTool[];
}

const trustBadges = [
  { icon: Shield, label: "100% Secure" },
  { icon: Zap, label: "Instant Processing" },
  { icon: Lock, label: "No Login Required" },
];

export default function ToolLayout({
  badge,
  badgeColor = "bg-blue-100 text-blue-700",
  title,
  description,
  toolArea,
  howToSteps,
  contentTitle,
  contentBody,
  faqs,
  relatedTools,
}: ToolLayoutProps) {
  return (
    <div className="min-h-screen">
      {/* Hero */}
     <section className="bg-gradient-to-b from-blue-50 to-white pt-14 pb-20">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_30%_50%,#3b82f6,transparent_70%)]" />
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_70%_50%,#06b6d4,transparent_70%)]" />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center relative z-10">
          <span className={`inline-block text-xs font-bold px-3 py-1.5 rounded-full mb-5 ${badgeColor}`}>
            {badge}
          </span>
          <h1 className="text-4xl sm:text-5xl font-bold mb-5 leading-tight" style={{ fontFamily: "'Syne', sans-serif" }}>
            {title}
          </h1>
          <p className="text-lg text-slate-300 max-w-2xl mx-auto mb-8 leading-relaxed">
            {description}
          </p>
          <div className="flex flex-wrap justify-center gap-6 text-sm text-slate-400">
            {trustBadges.map(({ icon: Icon, label }) => (
              <span key={label} className="flex items-center gap-2">
                <Icon className="w-4 h-4 text-blue-600" /> {label}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Ad slot (top)
      <div className="max-w-5xl mx-auto px-4 sm:px-6 -mt-6 mb-6">
        <div className="adsense-slot">Advertisement</div>
      </div> */}

      {/* Tool Area */}
      <section className="max-w-3xl mx-auto px-4 sm:px-6 mb-16">
        {toolArea}
      </section>

      {/* How to Use */}
      <section className="bg-white border-y border-slate-200 py-14 mb-14">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <h2 className="text-2xl font-bold text-slate-900 mb-8 text-center" style={{ fontFamily: "'Syne', sans-serif" }}>
            How to Use This Tool
          </h2>
          <div className="grid sm:grid-cols-3 gap-6">
            {howToSteps.map((step, i) => (
              <div key={i} className="flex gap-4">
                <div className="w-9 h-9 shrink-0 bg-blue-600 text-white rounded-xl flex items-center justify-center text-sm font-bold">
                  {i + 1}
                </div>
                <div>
                  <h3 className="font-semibold text-slate-900 mb-1" style={{ fontFamily: "'Syne', sans-serif" }}>
                    {step.title}
                  </h3>
                  <p className="text-sm text-slate-500 leading-relaxed">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SEO Content + FAQ */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 mb-16 grid lg:grid-cols-3 gap-10">
        {/* Content */}
        <article className="lg:col-span-2 prose-tool">
          <h2>{contentTitle}</h2>
          {contentBody}
        </article>

        {/* Sidebar */}
        <aside className="lg:col-span-1 space-y-6">
          {/* Related Tools */}
          <div className="bg-white rounded-2xl border border-slate-200 p-5">
            <h3 className="font-bold text-slate-900 mb-4 text-sm uppercase tracking-wider" style={{ fontFamily: "'Syne', sans-serif" }}>
              Related Tools
            </h3>
            <ul className="space-y-2">
              {relatedTools.map((t) => (
                <li key={t.href}>
                  <Link
                    href={t.href}
                    className="group flex items-center justify-between p-3 rounded-xl hover:bg-blue-50 transition-colors"
                  >
                    <div>
                      <p className="text-sm font-semibold text-slate-800 group-hover:text-blue-700">{t.label}</p>
                      <p className="text-xs text-slate-400">{t.description}</p>
                    </div>
                    <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-blue-500 shrink-0" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Ad slot (sidebar) */}
          {/* <div className="adsense-slot" style={{ minHeight: 250 }}>Advertisement</div> */}
        </aside>
      </div>

      {/* FAQ */}
      <section className="max-w-3xl mx-auto px-4 sm:px-6 mb-16">
        <h2 className="text-2xl font-bold text-slate-900 mb-6" style={{ fontFamily: "'Syne', sans-serif" }}>
          Frequently Asked Questions
        </h2>
        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <details key={i} className="group bg-white border border-slate-200 rounded-xl overflow-hidden">
              <summary className="px-6 py-4 font-semibold text-slate-900 cursor-pointer list-none flex items-center justify-between hover:bg-slate-50 transition-colors">
                {faq.q}
                <span className="text-slate-500 group-open:rotate-180 transition-transform text-lg ml-4 shrink-0">▾</span>
              </summary>
              <div className="px-6 pb-4 text-slate-600 text-sm leading-relaxed border-t border-slate-100 pt-4">
                {faq.a}
              </div>
            </details>
          ))}
        </div>
      </section>
    </div>
  );
}
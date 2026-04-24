import Link from "next/link";
import { ArrowRight, type LucideIcon } from "lucide-react";

interface ToolCardProps {
  icon: LucideIcon;
  iconBg: string;
  iconColor: string;
  badge: string;
  badgeColor: string;
  title: string;
  description: string;
  href: string;
  keywords: string[];
}

export default function ToolCard({
  icon: Icon,
  iconBg,
  iconColor,
  badge,
  badgeColor,
  title,
  description,
  href,
  keywords,
}: ToolCardProps) {
  return (
    <Link href={href} className="tool-card group block">
      <div className={`w-12 h-12 ${iconBg} rounded-xl flex items-center justify-center mb-4`}>
        <Icon className={`w-6 h-6 ${iconColor}`} />
      </div>
      <div className="flex items-center gap-2 mb-2">
        <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${badgeColor}`}>{badge}</span>
      </div>
      <h3 className="text-lg font-bold text-slate-900 mb-2 group-hover:text-blue-700 transition-colors" style={{ fontFamily: "'Syne', sans-serif" }}>
        {title}
      </h3>
      <p className="text-sm text-slate-500 leading-relaxed mb-4">{description}</p>
      <div className="flex flex-wrap gap-1.5 mb-4">
        {keywords.map((k) => (
          <span key={k} className="text-xs bg-slate-100 text-slate-500 px-2 py-0.5 rounded-full">{k}</span>
        ))}
      </div>
      <span className="inline-flex items-center gap-1 text-sm font-semibold text-blue-600 group-hover:gap-2 transition-all">
        Use Tool <ArrowRight className="w-3.5 h-3.5" />
      </span>
    </Link>
  );
}
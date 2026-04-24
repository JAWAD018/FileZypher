import type { Metadata } from "next";
import ToolLayout from "@/components/ToolLayout";
import PdfToWordTool from "@/components/PdfToWordTool";

export const metadata: Metadata = {
  title: "Free PDF to Word Converter Online – No Email Required",
  description:
    "Convert PDF to Word (DOCX) online for free. No signup, no watermark, no email. Preserves fonts, tables, and layout. Works on any device instantly.",
  keywords: [
    "pdf to word converter",
    "free pdf to word",
    "pdf to docx online",
    "convert pdf to word without losing formatting",
    "pdf to word no email",
  ],
  openGraph: {
    title: "Free PDF to Word Converter – Toolify",
    description: "Convert any PDF to an editable Word document. Free, instant, no signup.",
    type: "website",
  },
  alternates: {
    canonical: "https://filezypher.vercel.app/pdf-to-word",
  },
};

const howToSteps = [
  {
    title: "Upload your PDF",
    desc: "Drag and drop your PDF onto the upload area, or click 'Choose File' to browse your device.",
  },
  {
    title: "Click Convert",
    desc: "Hit the 'Convert to Word' button. Processing happens instantly in your browser.",
  },
  {
    title: "Download your DOCX",
    desc: "Your Word document is ready. Click Download and open it in Microsoft Word or Google Docs.",
  },
];

const faqs = [
  {
    q: "Is this PDF to Word converter really free?",
    a: "Yes, completely free. There are no hidden fees, no premium tiers for basic conversion, and no requirement to create an account. You can convert as many PDFs as you need.",
  },
  {
    q: "Will my PDF formatting be preserved?",
    a: "Toolify preserves the vast majority of formatting including fonts, paragraph styles, tables, and bullet points. Complex PDFs with unusual layouts may have minor differences, which is normal for all PDF-to-Word converters.",
  },
  {
    q: "Is my PDF file secure? Who can see it?",
    a: "No one. Your file is processed entirely within your browser using local JavaScript. It is never uploaded to any server. Once you close the tab, all data is gone.",
  },
  {
    q: "What is the maximum file size I can convert?",
    a: "You can convert PDFs up to 50MB in size. For larger files, consider splitting the PDF first using our Compress PDF tool.",
  },
  {
    q: "Can I convert scanned PDFs to Word?",
    a: "Scanned PDFs are images rather than text-based documents. Our free tool handles text-based PDFs best. OCR (optical character recognition) for scanned documents is a more complex feature coming soon.",
  },
];

const relatedTools = [
  {
    label: "Compress PDF",
    href: "/compress-pdf",
    description: "Reduce PDF file size for email",
  },
  {
    label: "JPG to PNG Converter",
    href: "/jpg-to-png",
    description: "Convert image formats instantly",
  },
  {
    label: "Image Compressor",
    href: "/image-compressor",
    description: "Shrink images without quality loss",
  },
  {
    label: "JSON Formatter",
    href: "/json-formatter",
    description: "Validate and beautify JSON",
  },
];

const contentBody = (
  <>
    <p>
      PDF files are everywhere — contracts, reports, academic papers, e-books. But when you need to edit a PDF,
      the format works against you. That's where a free PDF to Word converter becomes essential.
    </p>
    <p>
      Toolify converts your PDF into a fully editable <strong>.docx file</strong> that opens in Microsoft Word,
      Google Docs, LibreOffice, and any other word processor. Unlike many tools that require you to hand over
      your email or create an account, Toolify asks for nothing. Just drop in your PDF and download your Word file.
    </p>

    <h2>Why Convert PDF to Word?</h2>
    <p>PDFs are designed for viewing, not editing. Here are the most common reasons people need a Word version:</p>
    <ul>
      <li><strong>Editing a contract or legal document</strong> — Add signatures, update clauses, or tweak terms.</li>
      <li><strong>Repurposing a report</strong> — Extract data or update statistics without retyping everything.</li>
      <li><strong>Updating a resume</strong> — Received a PDF template? Convert it to Word so you can personalise it.</li>
      <li><strong>Translating a document</strong> — Word files are easier to paste into translation tools.</li>
      <li><strong>Annotating academic papers</strong> — Add your own notes directly in the document.</li>
    </ul>

    <h2>How Formatting is Preserved</h2>
    <p>
      A common frustration with PDF conversion is losing the original layout. Toolify's converter maps PDF
      text streams, font data, and structural markers to their Word equivalents. This means:
    </p>
    <ul>
      <li>Headings, subheadings, and body text styles are retained</li>
      <li>Tables are reconstructed as actual Word tables (not images)</li>
      <li>Bold, italic, and underlined text is preserved</li>
      <li>Multi-column layouts are approximated where possible</li>
      <li>Embedded images remain in roughly the correct position</li>
    </ul>
    <p>
      Note: PDFs with extremely complex designs — such as magazine layouts or heavily graphical brochures —
      may not convert perfectly. This is a known limitation of the PDF format itself, not just our tool.
    </p>

    <h2>Is It Safe to Convert PDFs Online?</h2>
    <p>
      With Toolify, yes. Your PDF is processed entirely inside your browser. Unlike other tools that upload
      your file to a remote server (where it could be stored, sold, or accessed by others), Toolify does everything
      locally. There is no server. There is no storage. The moment you close the tab, all traces of your file are gone.
    </p>
    <p>
      This is especially important for sensitive documents: tax returns, medical records, legal agreements,
      and business proposals. You should never upload these to an unknown server.
    </p>

    <h2>Tips for the Best Conversion Results</h2>
    <ol>
      <li>Use text-based PDFs, not scanned images. If your PDF was created by a scanner, the text is actually an image and cannot be extracted without OCR.</li>
      <li>Avoid password-protected PDFs. Remove password protection before converting.</li>
      <li>For large documents, split them into sections first using our Compress PDF tool.</li>
      <li>After converting, review headings and numbering — these sometimes need minor cleanup in Word.</li>
    </ol>
  </>
);

export default function PdfToWordPage() {
  return (
    <>
      {/* JSON-LD structured data for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebApplication",
            name: "PDF to Word Converter",
            description: "Free online tool to convert PDF files to editable Word documents.",
            url: "https://filezypher.vercel.app/pdf-to-word",
            applicationCategory: "Utility",
            operatingSystem: "Any",
            offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
            provider: { "@type": "Organization", name: "Toolify" },
          }),
        }}
      />
      <ToolLayout
        badge="PDF Tool · Free"
        badgeColor="bg-red-500/20 text-red-300"
        title="Free PDF to Word Converter Online"
        description="Transform any PDF into a fully editable Word document in seconds. No watermarks, no email, no signup. Your files stay private — everything runs in your browser."
        toolArea={<PdfToWordTool />}
        howToSteps={howToSteps}
        contentTitle="Everything You Need to Know About PDF to Word Conversion"
        contentBody={contentBody}
        faqs={faqs}
        relatedTools={relatedTools}
      />
    </>
  );
}
import type { Metadata } from "next";
import ToolLayout from "@/components/ToolLayout";
import CompressPdfTool from "@/components/CompressPdfTool";

export const metadata: Metadata = {
  title: "Compress PDF Online Free – Reduce PDF Size Instantly",
  description:
    "Compress PDF files online for free. Reduce PDF size by up to 90% without losing quality. No signup, no watermarks. Perfect for email and web upload limits.",
  keywords: ["compress pdf online", "reduce pdf size", "pdf compressor free", "shrink pdf", "pdf file size reducer"],
  alternates: { canonical: "https://filezypher.vercel.app/compress-pdf" },
};

const howToSteps = [
  { title: "Choose compression level", desc: "Select High Quality, Balanced, or Maximum Compression based on your needs." },
  { title: "Upload your PDF", desc: "Drag and drop your PDF or browse for it. Files up to 100MB are supported." },
  { title: "Download compressed PDF", desc: "Once done, download your smaller PDF file — it's ready to share." },
];

const faqs = [
  { q: "How much can you compress a PDF?", a: "It depends on the PDF's content. PDFs made mostly of images can often be compressed by 60–90%. Text-heavy PDFs typically see 15–40% reduction. PDFs that are already optimised may see minimal reduction." },
  { q: "Will compressing reduce the PDF's visual quality?", a: "The 'High Quality' setting is virtually indistinguishable from the original. 'Balanced' produces a slight reduction in image sharpness within the PDF. 'Maximum Compression' significantly reduces embedded image quality to achieve the smallest file size." },
  { q: "What is the maximum file size supported?", a: "You can compress PDFs up to 100MB in size. For very large documents, use the 'Maximum Compression' setting to get under email attachment limits." },
  { q: "Can I use the compressed PDF for printing?", a: "Yes, if you use the 'High Quality' compression setting. For printing, avoid Maximum Compression as it will visibly reduce image quality in printed output." },
  { q: "Why is my PDF still large after compression?", a: "Some PDFs are already compressed or contain mostly text and vector graphics, which don't compress much further. If your PDF contains scanned images at very high resolution, try our Image Compressor to reduce those first, then re-export as PDF." },
];

const relatedTools = [
  { label: "PDF to Word Converter", href: "/pdf-to-word", description: "Convert PDF to editable doc" },
  { label: "Image Compressor", href: "/image-compressor", description: "Compress JPG and PNG images" },
  { label: "JPG to PNG Converter", href: "/jpg-to-png", description: "Convert between image formats" },
  { label: "JSON Formatter", href: "/json-formatter", description: "Validate and format JSON data" },
];

export default function CompressPdfPage() {
  return (
    <ToolLayout
      badge="PDF Tool · Free"
      badgeColor="bg-orange-500/20 text-orange-300"
      title="Compress PDF Online — Free, Fast, No Signup"
      description="Shrink any PDF file by up to 90% with three compression presets. Ideal for email attachments, cloud uploads, and reducing storage costs. Your file stays private — processed entirely in your browser."
      toolArea={<CompressPdfTool />}
      howToSteps={howToSteps}
      contentTitle="Everything About PDF Compression: A Practical Guide"
      contentBody={
        <>
          <p>Email has a 25MB attachment limit. WhatsApp caps file sharing at 100MB. Many online portals refuse PDFs over 5MB. PDF compression solves all of these problems without you having to re-create the document.</p>
          <h2>What Makes a PDF Large?</h2>
          <p>PDFs can balloon in size for several reasons:</p>
          <ul>
            <li><strong>Embedded high-resolution images:</strong> A single 4K photo embedded in a PDF can be 5–15MB by itself.</li>
            <li><strong>Multiple embedded fonts:</strong> Each font subset adds to the file size.</li>
            <li><strong>Colour profiles and metadata:</strong> ICC colour profiles and document metadata add overhead.</li>
            <li><strong>Layers and hidden objects:</strong> Adobe Illustrator and InDesign PDFs often contain hidden layers.</li>
            <li><strong>Scanned pages:</strong> Scanned documents are essentially a collection of bitmap images — very large by default.</li>
          </ul>
          <h2>Compression Presets Explained</h2>
          <ul>
            <li><strong>High Quality (~15% reduction):</strong> Ideal for PDFs that will be printed or where you need to preserve every detail. The output is virtually identical to the original.</li>
            <li><strong>Balanced (~45% reduction):</strong> The sweet spot for most use cases. Great for sharing reports, presentations, and ebooks.</li>
            <li><strong>Maximum Compression (~70% reduction):</strong> Best when file size is the priority over quality — for example, getting under email limits or uploading to a form that caps file size.</li>
          </ul>
          <h2>Tips for Getting the Smallest PDF</h2>
          <ol>
            <li>Compress images before embedding them in the PDF. Use our Image Compressor first.</li>
            <li>Export from Word/Google Docs with "Optimized for web" settings.</li>
            <li>Remove unused pages and blank pages before uploading.</li>
            <li>For scanned PDFs, use a lower scan resolution (150 DPI is sufficient for screen viewing).</li>
          </ol>
        </>
      }
      faqs={faqs}
      relatedTools={relatedTools}
    />
  );
}
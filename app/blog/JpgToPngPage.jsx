import type { Metadata } from "next";
import ToolLayout from "@/components/ToolLayout";
import JpgToPngTool from "@/components/JpgToPngTool";

export const metadata: Metadata = {
  title: "Free JPG to PNG Converter Online – No Quality Loss",
  description:
    "Convert JPG to PNG online for free. Lossless conversion with full transparency support. No watermarks, no account needed. Works in your browser instantly.",
  keywords: ["jpg to png converter", "jpeg to png online", "convert jpg to png free", "jpg png lossless"],
  alternates: { canonical: "https://filezypher.vercel.app/jpg-to-png" },
};

const howToSteps = [
  { title: "Upload your JPG", desc: "Drop a .jpg or .jpeg file onto the upload area, or click to browse." },
  { title: "Preview the image", desc: "See a preview of your image before converting to confirm it's the right file." },
  { title: "Download PNG", desc: "Hit Convert, then download your lossless PNG file instantly." },
];

const faqs = [
  { q: "Why convert JPG to PNG?", a: "PNG is a lossless format that supports transparency (alpha channel). Use PNG for logos, icons, screenshots, and images where you need a transparent background or pixel-perfect quality. JPG is better for photos where file size matters more than transparency." },
  { q: "Does the conversion reduce image quality?", a: "No. Converting from JPG to PNG is lossless in the sense that the PNG will be an exact pixel-for-pixel copy of the JPG input. Note that JPG compression happens when the original JPG is saved, so some quality may already be lost before you upload." },
  { q: "Will the PNG be larger than the JPG?", a: "Usually yes. PNG uses lossless compression, which tends to produce larger files than JPG's lossy compression. For photos, PNGs can be 2–5× the size of the equivalent JPG." },
  { q: "Is my image uploaded to a server?", a: "Never. The conversion uses the HTML5 Canvas API directly in your browser. Your image data never leaves your device." },
  { q: "Can I convert PNG back to JPG?", a: "Our Image Compressor tool allows you to export images in various formats including JPG. We also plan a dedicated PNG to JPG converter soon." },
];

const relatedTools = [
  { label: "Image Compressor", href: "/image-compressor", description: "Compress PNG and JPG images" },
  { label: "PDF to Word", href: "/pdf-to-word", description: "Convert PDF to editable Word" },
  { label: "Compress PDF", href: "/compress-pdf", description: "Reduce PDF file size" },
  { label: "JSON Formatter", href: "/json-formatter", description: "Validate and format JSON" },
];

export default function JpgToPngPage() {
  return (
    <ToolLayout
      badge="Image Tool · Free"
      badgeColor="bg-blue-500/20 text-blue-300"
      title="Free JPG to PNG Converter Online"
      description="Convert any JPEG image to a lossless PNG file in seconds. Retain every pixel, add transparency support, and download instantly — no account, no watermark, no nonsense."
      toolArea={<JpgToPngTool />}
      howToSteps={howToSteps}
      contentTitle="JPG vs PNG: When and Why to Convert"
      contentBody={
        <>
          <p>JPEG and PNG serve different purposes. Understanding the difference helps you choose the right format for each project and avoid unnecessarily large files or quality loss.</p>
          <h2>The Key Differences</h2>
          <ul>
            <li><strong>Compression:</strong> JPG uses lossy compression (some data is discarded). PNG uses lossless compression (no data lost).</li>
            <li><strong>Transparency:</strong> PNG supports transparent backgrounds. JPG does not.</li>
            <li><strong>File size:</strong> JPG files are smaller for photographs. PNG files are better for graphics with sharp edges and flat colours.</li>
            <li><strong>Use cases:</strong> Use JPG for photos; use PNG for logos, icons, UI screenshots, and images with text.</li>
          </ul>
          <h2>Common Use Cases for JPG to PNG Conversion</h2>
          <p>Here are the most common reasons developers and designers convert JPGs to PNG:</p>
          <ul>
            <li>Removing a white background from a product photo to place it on a coloured website</li>
            <li>Preserving screenshot quality for documentation or tutorials</li>
            <li>Preparing images for use in presentation slides where white backgrounds would look wrong</li>
            <li>Converting photos for use in graphic design tools that prefer lossless source files</li>
          </ul>
          <h2>Privacy: Your Images Stay Private</h2>
          <p>Toolify's JPG to PNG converter uses the HTML5 Canvas API to do all processing directly in your browser. There are zero server requests — your images are never uploaded anywhere. This matters for product photos, personal images, and confidential design assets.</p>
        </>
      }
      faqs={faqs}
      relatedTools={relatedTools}
    />
  );
}
import type { Metadata } from "next";
import ToolLayout from "@/components/ToolLayout";
import JsonFormatterTool from "@/components/JsonFormatterTool";

export const metadata: Metadata = {
  title: "JSON Formatter, Validator & Beautifier – Free Online Tool",
  description:
    "Format, validate, and minify JSON online for free. Instantly beautify messy JSON with syntax highlighting. No ads. No limits. Works offline in your browser.",
  keywords: [
    "json formatter",
    "json validator online",
    "json beautifier",
    "json minifier",
    "format json online free",
    "json syntax checker",
  ],
  alternates: {
    canonical: "https://filezypher.vercel.app/json-formatter",
  },
  openGraph: {
    title: "JSON Formatter & Validator – Free | Toolify",
    description: "Format, validate, and minify JSON instantly. Syntax highlighted output.",
  },
};

const howToSteps = [
  {
    title: "Paste your JSON",
    desc: "Paste raw JSON into the input panel on the left. You can also load a sample with one click.",
  },
  {
    title: "Choose an action",
    desc: "Select Format (prettify), Minify (compress), or Validate to check for syntax errors.",
  },
  {
    title: "Copy the result",
    desc: "Click Copy to put the formatted output onto your clipboard, ready to paste anywhere.",
  },
];

const faqs = [
  {
    q: "What is a JSON formatter and why do I need one?",
    a: "A JSON formatter (also called a JSON beautifier or pretty-printer) takes minified or poorly indented JSON and reformats it with consistent spacing and line breaks. This makes it far easier to read and debug. Developers use it daily when working with APIs, configuration files, and data logs.",
  },
  {
    q: "Can I use this JSON formatter offline?",
    a: "Yes. Once the page has loaded, all processing happens in your browser using JavaScript. There are no server requests. You can even save the page and use it without an internet connection.",
  },
  {
    q: "Does the formatter support large JSON files?",
    a: "It handles JSON of any size that your browser can hold in memory. For most practical use cases — API responses, config files, log entries — this is effectively unlimited. Very large files (100MB+) may be slow depending on your device.",
  },
  {
    q: "What is the difference between Format and Minify?",
    a: "Format (beautify) adds whitespace, newlines, and indentation to make JSON human-readable. Minify removes all unnecessary whitespace to produce the smallest possible JSON string — useful for APIs and storage where every byte counts.",
  },
  {
    q: "Does the validator tell me exactly where the error is?",
    a: "Yes. When the JSON is invalid, we display the exact error message from the browser's JSON parser, which usually includes the character position where the syntax error was found.",
  },
];

const relatedTools = [
  {
    label: "PDF to Word Converter",
    href: "/pdf-to-word",
    description: "Convert PDFs to editable documents",
  },
  {
    label: "Image Compressor",
    href: "/image-compressor",
    description: "Compress images without quality loss",
  },
  {
    label: "JPG to PNG Converter",
    href: "/jpg-to-png",
    description: "Convert image formats in one click",
  },
  {
    label: "Compress PDF",
    href: "/compress-pdf",
    description: "Shrink PDF size for email",
  },
];

const contentBody = (
  <>
    <p>
      JSON (JavaScript Object Notation) is the lingua franca of the modern web. Every REST API, every config file,
      every NoSQL database stores data as JSON. And yet raw JSON from an API response or a minified build is almost
      unreadable — a wall of text with no indentation.
    </p>
    <p>
      Toolify's JSON formatter solves this in one click. Paste your JSON, click Format, and you instantly get a
      colour-coded, properly indented document. It is one of the most-used tools in any developer's daily workflow.
    </p>

    <h2>When to Use the JSON Formatter</h2>
    <ul>
      <li><strong>Debugging API responses</strong> — Copy the response from Postman or DevTools and paste it here for a readable view.</li>
      <li><strong>Editing configuration files</strong> — package.json, tsconfig.json, ESLint configs. Keep them clean.</li>
      <li><strong>Validating third-party data</strong> — Quickly confirm that incoming JSON is well-formed before feeding it to your application.</li>
      <li><strong>Preparing data for storage</strong> — Minify JSON before storing in a database or sending over the wire to save bandwidth.</li>
      <li><strong>Code reviews</strong> — Format JSON snippets before pasting them into pull requests or documentation.</li>
    </ul>

    <h2>Understanding Common JSON Errors</h2>
    <p>The validator will tell you exactly what went wrong. Here are the most common JSON syntax errors:</p>
    <ul>
      <li><strong>Trailing commas</strong> — JSON (unlike JavaScript) does not allow a comma after the last item in an object or array.</li>
      <li><strong>Single quotes</strong> — All strings in JSON must use double quotes, not single quotes.</li>
      <li><strong>Unquoted keys</strong> — Object keys must always be strings in double quotes.</li>
      <li><strong>Comments</strong> — JSON does not support <code>// comments</code> or <code>/* comments */</code>.</li>
      <li><strong>Undefined or NaN values</strong> — JSON only supports null, not JavaScript's undefined or NaN.</li>
    </ul>

    <h2>Format vs. Minify: When to Use Which</h2>
    <p>
      Formatting is for humans — it's what you use when reading, debugging, or editing JSON. Minifying is for machines
      — it strips whitespace to reduce file size, which speeds up network requests and saves storage space.
    </p>
    <p>
      A typical API response might be 4KB formatted. Minified, it might be 2.5KB. Over thousands of requests, this
      adds up significantly. Most production APIs return minified JSON for this reason.
    </p>

    <h2>Privacy and Security</h2>
    <p>
      Developers often work with sensitive JSON: authentication tokens, database records, personally identifiable information.
      With Toolify, your JSON never leaves your browser. It is processed entirely by client-side JavaScript with no
      network request of any kind. This makes Toolify safe to use even with confidential production data.
    </p>
  </>
);

export default function JsonFormatterPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebApplication",
            name: "JSON Formatter and Validator",
            description: "Free online JSON formatter, beautifier, minifier and validator with syntax highlighting.",
            url: "https://filezypher.vercel.app/json-formatter",
            applicationCategory: "DeveloperApplication",
            operatingSystem: "Any",
            offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
          }),
        }}
      />
      <ToolLayout
        badge="Developer Tool · Free"
        badgeColor="bg-green-500/20 text-green-300"
        title="JSON Formatter, Validator & Beautifier"
        description="Instantly format messy JSON into readable, colour-coded output. Validate syntax, minify for production, or beautify for debugging — all in your browser, with zero data sent to any server."
        toolArea={<JsonFormatterTool />}
        howToSteps={howToSteps}
        contentTitle="The Developer's Guide to JSON Formatting and Validation"
        contentBody={contentBody}
        faqs={faqs}
        relatedTools={relatedTools}
      />
    </>
  );
}

export const metadata = {
  title: "Privacy Policy",
  description: "Learn how Toolify handles your data and protects your privacy.",
};

export default function PrivacyPage() {
  return (
    <div className="max-w-3xl mx-auto px-6 py-16 text-slate-300">
      <h1 className="text-3xl font-bold text-white mb-6">Privacy Policy</h1>

      <p className="mb-4">
        At Toolify, your privacy is important to us. We do not store or upload your files.
        All processing happens locally in your browser.
      </p>

      <h2 className="text-xl text-white mt-8 mb-3">Information We Collect</h2>
      <p className="mb-4">
        We may collect basic analytics data such as page visits, device type, and usage patterns.
        This helps us improve our services.
      </p>

      <h2 className="text-xl text-white mt-8 mb-3">File Processing</h2>
      <p className="mb-4">
        All files are processed locally in your browser. We do not upload or store your files on our servers.
      </p>

      <h2 className="text-xl text-white mt-8 mb-3">Third-Party Services</h2>
      <p className="mb-4">
        We may use third-party analytics tools (like Google Analytics) to understand usage trends.
      </p>

      <h2 className="text-xl text-white mt-8 mb-3">Contact</h2>
      <p>If you have any questions, contact us at support@toolify.com</p>
    </div>
  );
}
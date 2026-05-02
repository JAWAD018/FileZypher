
export const metadata = {
  title: "Cookie Policy",
  description: "Learn how Toolify uses cookies.",
};

export default function CookiePage() {
  return (
    <div className="max-w-3xl mx-auto px-6 py-16 text-slate-300">
      <h1 className="text-3xl font-bold text-white mb-6">Cookie Policy</h1>

      <p className="mb-4">
        We use cookies to improve your experience.
      </p>

      <h2 className="text-xl text-white mt-8 mb-3">What Are Cookies</h2>
      <p className="mb-4">
        Cookies are small text files stored on your device.
      </p>

      <h2 className="text-xl text-white mt-8 mb-3">How We Use Cookies</h2>
      <ul className="list-disc ml-6 space-y-2">
        <li>Analytics</li>
        <li>Performance tracking</li>
      </ul>

      <h2 className="text-xl text-white mt-8 mb-3">Control</h2>
      <p>
        You can disable cookies in your browser settings.
      </p>
    </div>
  );
}
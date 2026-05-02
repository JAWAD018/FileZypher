
export const metadata = {
  title: "GDPR Compliance",
  description: "How Toolify complies with GDPR regulations.",
};

export default function GDPRPage() {
  return (
    <div className="max-w-3xl mx-auto px-6 py-16 text-slate-300">
      <h1 className="text-3xl font-bold text-white mb-6">GDPR Compliance</h1>

      <p className="mb-4">
        Toolify complies with the General Data Protection Regulation (GDPR).
      </p>

      <h2 className="text-xl text-white mt-8 mb-3">Your Rights</h2>
      <ul className="list-disc ml-6 space-y-2">
        <li>Right to access your data</li>
        <li>Right to delete your data</li>
        <li>Right to restrict processing</li>
      </ul>

      <h2 className="text-xl text-white mt-8 mb-3">Data Handling</h2>
      <p className="mt-3">
        Since all files are processed locally, we do not store personal data.
      </p>
    </div>
  );
}
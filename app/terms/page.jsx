
export const metadata = {
  title: "Terms of Service",
  description: "Terms and conditions for using Toolify.",
};

export default function TermsPage() {
  return (
    <div className="max-w-3xl mx-auto px-6 py-16 text-slate-300">
      <h1 className="text-3xl font-bold text-white mb-6">Terms of Service</h1>

      <p className="mb-4">
        By using Toolify, you agree to these terms.
      </p>

      <h2 className="text-xl text-white mt-8 mb-3">Use of Service</h2>
      <p className="mb-4">
        You agree not to misuse our tools or attempt to disrupt the service.
      </p>

      <h2 className="text-xl text-white mt-8 mb-3">No Guarantees</h2>
      <p className="mb-4">
        We provide tools “as is” without warranties of any kind.
      </p>

      <h2 className="text-xl text-white mt-8 mb-3">Limitation of Liability</h2>
      <p className="mb-4">
        Toolify is not responsible for any data loss or damages resulting from use of the service.
      </p>

      <h2 className="text-xl text-white mt-8 mb-3">Changes</h2>
      <p>
        We may update these terms at any time.
      </p>
    </div>
  );
}
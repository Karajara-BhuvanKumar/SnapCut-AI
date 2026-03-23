import Layout from "@/components/Layout";

const TermsAndConditions = () => {
  return (
    <Layout>
      <section className="py-24">
        <div className="container max-w-5xl mx-auto">
          <h1 className="font-display text-4xl md:text-5xl font-bold mb-4">Terms and Conditions</h1>
          <h2 className="font-display text-2xl font-bold mb-2">Service Usage</h2>
          <p className="text-muted-foreground mb-4">
            SnapCut AI provides AI-powered background removal services. Users must not misuse the platform.
          </p>
          <h2 className="font-display text-2xl font-bold mb-2">User Responsibility</h2>
          <p className="text-muted-foreground mb-4">
            You are responsible for the images you upload. You must not upload illegal, copyrighted, or harmful content.
          </p>
          <h2 className="font-display text-2xl font-bold mb-2">Account Usage</h2>
          <p className="text-muted-foreground mb-4">
            You are responsible for maintaining the confidentiality of your account credentials.
          </p>
          <h2 className="font-display text-2xl font-bold mb-2">Payments</h2>
          <p className="text-muted-foreground mb-4">
            All payments are processed securely. Pricing may change at any time.
          </p>
          <h2 className="font-display text-2xl font-bold mb-2">Limitation of Liability</h2>
          <p className="text-muted-foreground mb-4">
            SnapCut AI is not liable for:
            <ul className="list-disc list-inside ml-4">
              <li>Data loss</li>
              <li>Service interruptions</li>
              <li>Misuse of the platform</li>
            </ul>
          </p>
          <h2 className="font-display text-2xl font-bold mb-2">Termination</h2>
          <p className="text-muted-foreground mb-4">
            We reserve the right to suspend or terminate accounts that violate our policies.
          </p>
          <h2 className="font-display text-2xl font-bold mb-2">Changes to Terms</h2>
          <p className="text-muted-foreground mb-4">
            We may update these terms at any time without prior notice.
          </p>
          <h2 className="font-display text-2xl font-bold mb-2">Contact</h2>
          <p className="text-muted-foreground">
            For any queries:
            <br />
            support@snapcutai.com
          </p>
        </div>
      </section>
    </Layout>
  );
};

export default TermsAndConditions;
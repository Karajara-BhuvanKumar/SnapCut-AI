import Layout from "@/components/Layout";

const PrivacyPolicy = () => {
  return (
    <Layout>
      <section className="py-24">
        <div className="container max-w-5xl mx-auto">
          <h1 className="font-display text-4xl md:text-5xl font-bold mb-4">Privacy Policy</h1>
          <p className="text-muted-foreground mb-4">
            At SnapCut AI, we value your privacy and are committed to protecting your personal information.
          </p>
          <h2 className="font-display text-2xl font-bold mb-2">Information We Collect</h2>
          <p className="text-muted-foreground mb-4">
            We may collect basic information such as your name, email address, and usage data when you use our platform.
          </p>
          <h2 className="font-display text-2xl font-bold mb-2">How We Use Your Information</h2>
          <p className="text-muted-foreground mb-4">
            We use your information to:
            <ul className="list-disc list-inside ml-4">
              <li>Provide and improve our services</li>
              <li>Process transactions</li>
              <li>Communicate important updates</li>
            </ul>
          </p>
          <h2 className="font-display text-2xl font-bold mb-2">Image Data Handling</h2>
          <p className="text-muted-foreground mb-4">
            All uploaded images are processed securely. We do not store images permanently. Files are automatically deleted after processing or within 24 hours.
          </p>
          <h2 className="font-display text-2xl font-bold mb-2">Data Security</h2>
          <p className="text-muted-foreground mb-4">
            We implement industry-standard security measures to protect your data.
          </p>
          <h2 className="font-display text-2xl font-bold mb-2">Third-Party Services</h2>
          <p className="text-muted-foreground mb-4">
            We use third-party services such as Cloudinary and payment gateways. These services may process your data as required to provide functionality.
          </p>
          <h2 className="font-display text-2xl font-bold mb-2">Your Rights</h2>
          <p className="text-muted-foreground mb-4">
            You can request deletion of your data at any time by contacting us.
          </p>
          <h2 className="font-display text-2xl font-bold mb-2">Contact</h2>
          <p className="text-muted-foreground">
            For privacy-related concerns, contact us at:
            <br />
            Email: support@snapcutai.com
          </p>
        </div>
      </section>
    </Layout>
  );
};

export default PrivacyPolicy;
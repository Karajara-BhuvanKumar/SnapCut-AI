import Layout from "@/components/Layout";

const ContactUs = () => {
  return (
    <Layout>
      <section className="py-24">
        <div className="container max-w-5xl mx-auto">
          <h1 className="font-display text-4xl md:text-5xl font-bold mb-4">Contact Us</h1>
          <p className="text-muted-foreground mb-4">
            If you have any questions or need support, feel free to reach out.
          </p>
          <p className="text-muted-foreground mb-2">
            <span className="font-bold">Trade Name:</span> SnapCut AI
          </p>
          <p className="text-muted-foreground mb-2">
            <span className="font-bold">Email:</span> support@snapcutai.com
          </p>
          <p className="text-muted-foreground mb-2">
            <span className="font-bold">Phone:</span> +91-XXXXXXXXXX
          </p>
          <p className="text-muted-foreground mb-4">
            <span className="font-bold">Address:</span>
            <br />
            Your Address Here
            <br />
            City, State, PIN Code
            <br />
            India
          </p>
          <p className="text-muted-foreground">
            We typically respond within 24 hours.
          </p>
        </div>
      </section>
    </Layout>
  );
};

export default ContactUs;
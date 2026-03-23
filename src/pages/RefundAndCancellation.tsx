import Layout from "@/components/Layout";

const RefundAndCancellation = () => {
  return (
    <Layout>
      <section className="py-24">
        <div className="container max-w-5xl mx-auto">
          <h1 className="font-display text-4xl md:text-5xl font-bold mb-4">Refund and Cancellation Policy</h1>
          <h2 className="font-display text-2xl font-bold mb-2">Subscriptions</h2>
          <p className="text-muted-foreground mb-4">
            All subscription payments are non-refundable once the service has been activated.
          </p>
          <h2 className="font-display text-2xl font-bold mb-2">Credits</h2>
          <p className="text-muted-foreground mb-4">
            Purchased credits are non-refundable and non-transferable.
          </p>
          <h2 className="font-display text-2xl font-bold mb-2">Cancellation</h2>
          <p className="text-muted-foreground mb-4">
            Users may cancel their subscription at any time. The cancellation will take effect at the end of the billing cycle.
          </p>
          <h2 className="font-display text-2xl font-bold mb-2">Exceptions</h2>
          <p className="text-muted-foreground mb-4">
            Refunds may be considered only in cases of:
            <ul className="list-disc list-inside ml-4">
              <li>Duplicate payments</li>
              <li>Technical issues preventing service usage</li>
            </ul>
          </p>
          <p className="text-muted-foreground mb-4">
            To request a refund, contact:
            <br />
            Email: support@snapcutai.com
          </p>
          <p className="text-muted-foreground">
            SnapCut AI reserves the right to refuse refund requests that do not meet the above criteria.
          </p>
        </div>
      </section>
    </Layout>
  );
};

export default RefundAndCancellation;
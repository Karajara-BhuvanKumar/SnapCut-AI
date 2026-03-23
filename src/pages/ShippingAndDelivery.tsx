import Layout from "@/components/Layout";

const ShippingAndDelivery = () => {
  return (
    <Layout>
      <section className="py-24">
        <div className="container max-w-5xl mx-auto">
          <h1 className="font-display text-4xl md:text-5xl font-bold mb-4">Shipping and Delivery Policy</h1>
          <p className="text-muted-foreground mb-4">
            SnapCut AI is a digital service platform.
          </p>
          <p className="text-muted-foreground mb-4">
            No physical products are shipped.
          </p>
          <p className="text-muted-foreground mb-4">
            All services are delivered instantly through our web application after successful payment.
          </p>
          <p className="text-muted-foreground mb-4">
            Users can access their processed images immediately after background removal.
          </p>
          <p className="text-muted-foreground">
            For any issues with service delivery, please contact:
            <br />
            support@snapcutai.com
          </p>
        </div>
      </section>
    </Layout>
  );
};

export default ShippingAndDelivery;
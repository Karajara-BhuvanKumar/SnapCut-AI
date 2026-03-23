import Layout from "@/components/Layout";
import { Check } from "lucide-react";

const featuresList = [
  {
    title: "AI-Powered Accuracy",
    description: "Our advanced AI precisely detects and removes backgrounds from any image, leaving clean, crisp cutouts.",
  },
  {
    title: "Instant Processing",
    description: "Get your background-removed images in seconds, not minutes. Perfect for high-volume workflows.",
  },
  {
    title: "High-Quality Output",
    description: "Download your images in high resolution with transparent or custom backgrounds, ready for any use.",
  },
  {
    title: "Batch Processing",
    description: "Process multiple images at once, saving you valuable time and effort.",
  },
  {
    title: "Easy-to-Use Interface",
    description: "Drag, drop, and get results. Our intuitive design makes background removal simple for everyone.",
  },
  {
    title: "Multiple Export Formats",
    description: "Save your images in various formats including JPG, PNG, and WEBP.",
  },
  {
    title: "API Access",
    description: "Integrate our powerful background removal technology directly into your applications with our robust API.",
  },
  {
    title: "Secure & Private",
    description: "Your images are processed securely and deleted automatically after a short period.",
  },
];

const Features = () => {
  return (
    <Layout>
      <section className="py-24">
        <div className="container max-w-5xl mx-auto text-center">
          <h1 className="font-display text-4xl md:text-5xl font-bold mb-4">
            Unlock the Power of <span className="gradient-text">SnapCut AI Features</span>
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto mb-12">
            Discover how SnapCut AI can streamline your workflow with cutting-edge background removal technology.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 text-left">
            {featuresList.map((feature, index) => (
              <div key={index} className="bg-card p-6 rounded-lg shadow-lg">
                <div className="flex items-center mb-4">
                  <Check className="h-6 w-6 text-primary mr-3" />
                  <h3 className="font-display text-xl font-semibold">{feature.title}</h3>
                </div>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Features;
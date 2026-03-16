import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Layout from "@/components/Layout";
import { Upload, Zap, Download, Shield, Image, Clock, Code, CreditCard } from "lucide-react";

const HeroSection = () => (
  <section className="relative overflow-hidden py-24 md:py-36">
    {/* Glow effects */}
    <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-primary/10 blur-[120px] animate-pulse-glow" />
    <div className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full bg-accent/10 blur-[120px] animate-pulse-glow" style={{ animationDelay: "1.5s" }} />

    <div className="container relative text-center max-w-4xl mx-auto">
      <div className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-muted/40 px-4 py-1.5 text-sm text-muted-foreground mb-8">
        <Zap className="h-3.5 w-3.5 text-secondary" />
        AI-Powered Background Removal
      </div>
      <h1 className="font-display text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.1] mb-6">
        Remove Backgrounds{" "}
        <span className="gradient-text">Instantly</span>
      </h1>
      <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10">
        Upload any image. Our AI removes the background in seconds. Download a clean, transparent PNG — ready for any use.
      </p>
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
        <Link to="/dashboard">
          <Button variant="gradient" size="xl">
            <Upload className="h-5 w-5" />
            Remove Background Free
          </Button>
        </Link>
        <Link to="/pricing">
          <Button variant="outline" size="xl">View Pricing</Button>
        </Link>
      </div>
      <p className="mt-6 text-sm text-muted-foreground">No signup required for your first 5 images</p>
    </div>
  </section>
);

const HowItWorks = () => {
  const steps = [
    { icon: Upload, title: "Upload", description: "Drag & drop or select your image. Supports JPG, PNG, WEBP up to 10MB." },
    { icon: Zap, title: "AI Processes", description: "Our AI detects and removes the background in under 5 seconds." },
    { icon: Download, title: "Download", description: "Get your transparent PNG instantly. Ready for any project." },
  ];
  return (
    <section className="py-24 border-t border-border/30">
      <div className="container">
        <div className="text-center mb-16">
          <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">How It Works</h2>
          <p className="text-muted-foreground max-w-lg mx-auto">Three simple steps to a perfect cutout.</p>
        </div>
        <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          {steps.map((step, i) => (
            <div key={i} className="glass-card rounded-xl p-8 text-center glow-hover">
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl gradient-bg mb-5">
                <step.icon className="h-6 w-6 text-primary-foreground" />
              </div>
              <h3 className="font-display text-lg font-semibold mb-2">{step.title}</h3>
              <p className="text-sm text-muted-foreground">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Features = () => {
  const features = [
    { icon: Zap, title: "Lightning Fast", desc: "Results in under 5 seconds powered by state-of-the-art AI." },
    { icon: Image, title: "Pixel-Perfect", desc: "Preserves fine details like hair, fur, and transparent objects." },
    { icon: Shield, title: "Secure & Private", desc: "Images auto-delete after 24 hours. No permanent storage." },
    { icon: Clock, title: "Batch Processing", desc: "Process multiple images at once with our Pro plan." },
    { icon: Code, title: "Developer API", desc: "Integrate background removal into your own apps via REST API." },
    { icon: CreditCard, title: "Flexible Pricing", desc: "Free tier, subscriptions, and pay-per-use credit packs." },
  ];
  return (
    <section className="py-24 bg-card/20 border-t border-border/30">
      <div className="container">
        <div className="text-center mb-16">
          <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
            Built for <span className="gradient-text">Professionals</span>
          </h2>
          <p className="text-muted-foreground max-w-lg mx-auto">Everything you need for production-quality background removal.</p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {features.map((f, i) => (
            <div key={i} className="glass-card rounded-xl p-6 glow-hover">
              <f.icon className="h-8 w-8 text-primary mb-4" />
              <h3 className="font-display font-semibold mb-2">{f.title}</h3>
              <p className="text-sm text-muted-foreground">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const CTASection = () => (
  <section className="py-24 border-t border-border/30">
    <div className="container text-center max-w-2xl mx-auto">
      <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
        Ready to Remove Backgrounds?
      </h2>
      <p className="text-muted-foreground mb-8">
        Join thousands of designers, marketers, and e-commerce sellers using SnapCut AI.
      </p>
      <Link to="/dashboard">
        <Button variant="gradient" size="xl">
          Get Started Free
        </Button>
      </Link>
    </div>
  </section>
);

const Index = () => (
  <Layout>
    <HeroSection />
    <HowItWorks />
    <Features />
    <CTASection />
  </Layout>
);

export default Index;

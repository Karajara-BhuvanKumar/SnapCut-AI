import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Layout from "@/components/Layout";
import {
  ArrowRight,
  BadgeCheck,
  Clock3,
  Download,
  Image,
  Layers,
  Shield,
  Sparkles,
  Upload,
  Wand2,
} from "lucide-react";

const HeroSection = () => (
  <section className="relative overflow-hidden py-24">
    <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,hsl(var(--primary)/0.18),transparent_55%)]" />
    <div className="absolute left-0 top-24 h-64 w-64 rounded-full bg-secondary/20 blur-[110px]" />
    <div className="absolute right-0 bottom-8 h-72 w-72 rounded-full bg-accent/20 blur-[120px]" />

    <div className="container relative">
      <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
        <div>
          <span className="mb-6 inline-flex items-center gap-2 rounded-full border border-border/60 bg-card/40 px-4 py-1.5 text-sm text-muted-foreground">
            <Sparkles className="h-4 w-4 text-secondary" />
            AI Background Removal for Creators
          </span>
          <h1 className="font-display text-4xl font-extrabold leading-tight md:text-6xl">
            Create clean product photos in{" "}
            <span className="gradient-text">seconds</span>.
          </h1>
          <p className="mt-5 max-w-xl text-base text-muted-foreground md:text-lg">
            Remove image backgrounds with one click, keep sharp edges, and download transparent PNGs ready for stores, ads, and social media.
          </p>
          <div className="mt-8 flex flex-col gap-4 sm:flex-row">
            <Link to="/register">
              <Button variant="gradient" size="xl">
                Start Free
                <ArrowRight className="h-5 w-5" />
              </Button>
            </Link>
            <Link to="/pricing">
              <Button variant="outline" size="xl">View Pricing</Button>
            </Link>
          </div>
          <div className="mt-8 grid max-w-lg grid-cols-3 gap-4 text-sm">
            <div className="rounded-xl border border-border/60 bg-card/40 px-4 py-3">
              <p className="font-semibold text-foreground">5 free</p>
              <p className="text-muted-foreground">credits daily</p>
            </div>
            <div className="rounded-xl border border-border/60 bg-card/40 px-4 py-3">
              <p className="font-semibold text-foreground">under 5s</p>
              <p className="text-muted-foreground">average speed</p>
            </div>
            <div className="rounded-xl border border-border/60 bg-card/40 px-4 py-3">
              <p className="font-semibold text-foreground">HD PNG</p>
              <p className="text-muted-foreground">transparent output</p>
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-border/60 bg-card/60 p-6 shadow-2xl backdrop-blur-xl">
          <div className="mb-5 flex items-center justify-between">
            <p className="font-display text-lg font-semibold">Quick Preview</p>
            <span className="rounded-full bg-primary/15 px-3 py-1 text-xs text-primary">Live AI</span>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="rounded-xl border border-border/60 bg-muted/30 p-4">
              <p className="mb-3 text-xs uppercase tracking-wide text-muted-foreground">Original</p>
              <div className="h-40 rounded-lg bg-gradient-to-b from-muted/70 to-card" />
            </div>
            <div className="rounded-xl border border-border/60 bg-muted/30 p-4">
              <p className="mb-3 text-xs uppercase tracking-wide text-muted-foreground">Removed</p>
              <div className="h-40 rounded-lg bg-[linear-gradient(45deg,hsl(var(--muted))_25%,transparent_25%,transparent_50%,hsl(var(--muted))_50%,hsl(var(--muted))_75%,transparent_75%,transparent)] bg-[length:24px_24px]" />
            </div>
          </div>
          <div className="mt-4 space-y-2 rounded-xl border border-border/60 bg-background/50 p-4 text-sm">
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Edge Quality</span>
              <span className="font-semibold text-foreground">Excellent</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Processing Time</span>
              <span className="font-semibold text-foreground">3.8s</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
);

const HowItWorks = () => {
  const steps = [
    { icon: Upload, title: "1. Upload", description: "Drag and drop JPG, PNG, or WEBP images up to 10MB." },
    { icon: Wand2, title: "2. Remove", description: "Our AI detects subjects and removes background automatically." },
    { icon: Download, title: "3. Download", description: "Get a high-resolution transparent image ready to publish." },
  ];
  return (
    <section className="border-t border-border/30 py-24">
      <div className="container">
        <div className="text-center mb-16">
          <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">How It Works</h2>
          <p className="text-muted-foreground max-w-lg mx-auto">Three simple steps to get clean, store-ready images.</p>
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
    { icon: Clock3, title: "Fast Turnaround", desc: "From upload to final PNG in a few seconds." },
    { icon: Image, title: "Crisp Edges", desc: "Keeps complex edges like hair and transparent surfaces." },
    { icon: Layers, title: "Studio Ready", desc: "Perfect for product listings and ad creatives." },
    { icon: Shield, title: "Safe Processing", desc: "Built with secure auth and project-based access." },
  ];

  const trustPoints = [
    "No design skills needed",
    "One-click workflow",
    "Works on mobile and desktop",
    "Ready for e-commerce catalogs",
  ];

  return (
    <section className="bg-card/20 border-t border-border/30 py-24">
      <div className="container">
        <div className="text-center mb-16">
          <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
            Built for teams that ship visual content fast
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Designers, marketers, and store owners use SnapCut AI to produce clean images without manual editing.
          </p>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 max-w-6xl mx-auto">
          {features.map((f, i) => (
            <div key={i} className="glass-card rounded-xl p-6 glow-hover">
              <f.icon className="h-8 w-8 text-primary mb-4" />
              <h3 className="font-display font-semibold mb-2">{f.title}</h3>
              <p className="text-sm text-muted-foreground">{f.desc}</p>
            </div>
          ))}
        </div>

        <div className="mx-auto mt-10 grid max-w-4xl gap-3 sm:grid-cols-2">
          {trustPoints.map((point) => (
            <div key={point} className="flex items-center gap-3 rounded-lg border border-border/50 bg-background/40 px-4 py-3 text-sm">
              <BadgeCheck className="h-4 w-4 text-secondary" />
              <span>{point}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const CTASection = () => (
  <section className="border-t border-border/30 py-24">
    <div className="container">
      <div className="mx-auto max-w-4xl rounded-2xl border border-border/60 bg-card/50 p-10 text-center shadow-2xl backdrop-blur-xl">
        <h2 className="font-display text-3xl font-bold md:text-4xl">
          Ready to make product images look premium?
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
          Create your account and start with free daily credits. Upgrade anytime when you need more volume.
        </p>
        <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
          <Link to="/register">
            <Button variant="gradient" size="xl">Create Free Account</Button>
          </Link>
          <Link to="/login">
            <Button variant="outline" size="xl">Sign In</Button>
          </Link>
        </div>
      </div>
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

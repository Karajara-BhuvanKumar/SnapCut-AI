import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Check } from "lucide-react";
import { Link } from "react-router-dom";

const plans = [
  {
    name: "Free",
    price: "₹0",
    period: "forever",
    description: "Perfect for trying out SnapCut AI.",
    features: ["5 images per day", "Standard quality", "JPG, PNG, WEBB support", "Max 10MB per image"],
    cta: "Get Started",
    variant: "outline" as const,
    popular: false,
  },
  {
    name: "Pro",
    price: "₹499",
    period: "/month",
    description: "For professionals who need unlimited access.",
    features: ["Unlimited images", "HD quality output", "Batch processing", "Priority processing", "API access", "24/7 support"],
    cta: "Upgrade to Pro",
    variant: "gradient" as const,
    popular: true,
  },
  {
    name: "Credits",
    price: "₹99",
    period: "per 50 credits",
    description: "Pay only for what you use.",
    features: ["50 image credits", "HD quality output", "No expiry", "API access"],
    cta: "Buy Credits",
    variant: "outline" as const,
    popular: false,
  },
];

const Pricing = () => (
  <Layout>
    <section className="py-24">
      <div className="container max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="font-display text-4xl md:text-5xl font-bold mb-4">
            Simple, Transparent <span className="gradient-text">Pricing</span>
          </h1>
          <p className="text-muted-foreground max-w-lg mx-auto">
            Start free. Upgrade when you need more.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {plans.map((plan) => (
            <Card
              key={plan.name}
              className={`relative flex flex-col ${
                plan.popular ? "border-primary/50 shadow-lg shadow-primary/10" : ""
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 gradient-bg rounded-full px-4 py-1 text-xs font-semibold text-primary-foreground">
                  Most Popular
                </div>
              )}
              <CardHeader>
                <CardTitle className="font-display">{plan.name}</CardTitle>
                <CardDescription>{plan.description}</CardDescription>
                <div className="mt-4">
                  <span className="text-4xl font-bold">{plan.price}</span>
                  <span className="text-muted-foreground text-sm ml-1">{plan.period}</span>
                </div>
              </CardHeader>
              <CardContent className="flex-1">
                <ul className="space-y-3">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-center gap-2 text-sm">
                      <Check className="h-4 w-4 text-secondary shrink-0" />
                      <span className="text-muted-foreground">{f}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter>
                <Link to="/dashboard" className="w-full">
                  <Button variant={plan.variant} className="w-full" size="lg">
                    {plan.cta}
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  </Layout>
);

export default Pricing;

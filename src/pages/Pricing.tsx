import { Check } from "lucide-react";
import { Link } from "react-router-dom";
import { useEffect } from "react"; // Import useEffect
import { useToast } from "@/hooks/use-toast"; // Import useToast
import Layout from "@/components/Layout"; // Import Layout
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"; // Import Card components
import { Button } from "@/components/ui/button"; // Import Button component

const loadScript = (src: string) => {
  return new Promise((resolve) => {
    const script = document.createElement("script");
    script.src = src;
    script.onload = () => {
      resolve(true);
    };
    script.onerror = () => {
      resolve(false);
    };
    document.body.appendChild(script);
  });
};

declare global {
  interface Window {
    Razorpay: any;
  }
}

const plans = [
  {
    name: "Free",
    description: "Perfect for trying out SnapCut AI.",
    price: "₹0",
    period: "forever",
    features: [
      "5 images per day",
      "Standard quality",
      "JPG, PNG, WEBB support",
      "Max 10MB per image",
    ],
    cta: "Get Started",
    variant: "outline",
  },
  {
    name: "Pro",
    description: "For professionals who need unlimited access.",
    price: "₹499",
    period: "/month",
    features: [
      "Unlimited images",
      "HD quality output",
      "Batch processing",
      "Priority processing",
      "API access",
      "24/7 support",
    ],
    cta: "Upgrade to Pro",
    variant: "default",
    popular: true,
  },
  {
    name: "Credits",
    description: "Pay only for what you use.",
    price: "₹99",
    period: "per 50 credits",
    features: [
      "50 image credits",
      "HD quality output",
      "No expiry",
      "API access",
    ],
    cta: "Buy Credits",
    variant: "outline",
  },
];

const Pricing = () => {
  const { toast } = useToast(); // Initialize toast

  useEffect(() => {
    // The script is now loaded by the displayRazorpay function
  }, []);

  const displayRazorpay = async (amount: string, description: string) => {
    const res = await loadScript("https://checkout.razorpay.com/v1/checkout.js");

    if (!res) {
      toast({
        title: "Payment Failed",
        description: "Razorpay SDK failed to load. Are you online?",
        variant: "destructive",
      });
      return;
    }

    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY_ID,
      amount: amount,
      currency: "INR",
      name: "SnapCut AI",
      description: description,
      // image: "/logo.png", // Temporarily removed to debug CORS issue
      handler: function (response: any) {
        toast({
          title: "Payment Successful",
          description: `Payment ID: ${response.razorpay_payment_id}`,
        });
        // You would typically verify the payment on your backend here
      },
      prefill: {
        name: "User Name", // Replace with actual user name
        email: "user@example.com", // Replace with actual user email
        contact: "9999999999", // Replace with actual user contact
      },
      notes: {
        address: "Razorpay Corporate Office",
      },
      theme: {
        color: "#3399cc",
      },
    };

    const paymentObject = new (window as any).Razorpay(options);
    paymentObject.open();
  };

  return (
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
                  {plan.name === "Pro" ? (
                    <Button variant={plan.variant} className="w-full" size="lg" onClick={() => displayRazorpay("49900", "Pro Plan Subscription")}>
                      {plan.cta}
                    </Button>
                  ) : plan.name === "Credits" ? (
                    <Button variant={plan.variant} className="w-full" size="lg" onClick={() => displayRazorpay("9900", "50 Credits Purchase")}>
                      {plan.cta}
                    </Button>
                  ) : (
                    <Link to="/dashboard" className="w-full">
                      <Button variant={plan.variant} className="w-full" size="lg">
                        {plan.cta}
                      </Button>
                    </Link>
                  )}
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Pricing;

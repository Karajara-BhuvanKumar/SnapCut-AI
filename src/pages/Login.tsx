import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/lib/supabase";
import { useState } from "react";
import type { FormEvent } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { ArrowRight, CheckCircle2, Lock, Mail, Sparkles } from "lucide-react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();
  const location = useLocation();

  const redirectTo = (location.state as { from?: { pathname?: string } } | null)?.from?.pathname || "/dashboard";

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);

    const { error } = await supabase.auth.signInWithPassword({
      email: email.trim(),
      password,
    });

    if (error) {
      const normalized = error.message.toLowerCase();
      if (normalized.includes("invalid login credentials")) {
        toast({
          title: "Invalid email or password",
          description: "If this account exists, use Forgot Password to reset your password.",
          variant: "destructive",
        });
      } else if (normalized.includes("email not confirmed")) {
        toast({
          title: "Email not verified",
          description: "Please open your inbox and verify your email before signing in.",
          variant: "destructive",
        });
      } else {
        toast({ title: "Sign in failed", description: error.message, variant: "destructive" });
      }
      setIsLoading(false);
      return;
    }

    toast({ title: "Welcome back", description: "You are signed in successfully.", variant: "success" });
    navigate(redirectTo, { replace: true });
  };

  return (
    <Layout hideFooter>
      <div className="container py-10 md:py-14">
        <div className="mx-auto grid max-w-6xl overflow-hidden rounded-2xl border border-border/60 bg-card/40 shadow-2xl backdrop-blur-xl lg:grid-cols-2">
          <div className="relative hidden lg:block">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,hsl(var(--primary)/0.25),transparent_60%)]" />
            <div className="absolute -left-20 bottom-10 h-64 w-64 rounded-full bg-accent/25 blur-[120px]" />
            <div className="relative flex h-full flex-col justify-between p-10">
              <div className="space-y-3">
                <span className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-background/40 px-3 py-1 text-xs text-muted-foreground">
                  <Sparkles className="h-3.5 w-3.5 text-secondary" />
                  SnapCut AI
                </span>
                <h2 className="font-display text-4xl font-bold leading-tight">
                  Start creating clean, professional visuals.
                </h2>
                <p className="max-w-md text-sm text-muted-foreground">
                  Sign in to continue processing images, download transparent PNGs, and manage your history in one place.
                </p>
              </div>
              <div className="space-y-3 text-sm">
                {["Fast one-click processing", "Secure cloud auth", "Daily free credits"].map((item) => (
                  <div key={item} className="flex items-center gap-2 text-muted-foreground">
                    <CheckCircle2 className="h-4 w-4 text-secondary" />
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="p-6 sm:p-10">
            <div className="mb-8">
              <h1 className="font-display text-3xl font-bold">Welcome back</h1>
              <p className="mt-2 text-sm text-muted-foreground">Sign in to your account and continue editing images.</p>
            </div>

            <form className="space-y-5" onSubmit={handleSubmit}>
              <div>
                <Label htmlFor="email">Email</Label>
                <div className="relative mt-1.5">
                  <Mail className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="you@example.com"
                    className="pl-10"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="password">Password</Label>
                  <Link to="/forgot-password" className="text-xs font-medium text-primary hover:underline">
                    Forgot password?
                  </Link>
                </div>
                <div className="relative mt-1.5">
                  <Lock className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    id="password"
                    type="password"
                    placeholder="Enter your password"
                    className="pl-10"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
              </div>
              <Button variant="gradient" className="w-full" size="lg" type="submit" disabled={isLoading}>
                {isLoading ? "Signing In..." : "Sign In"}
                {!isLoading && <ArrowRight className="h-4 w-4" />}
              </Button>
            </form>

            <p className="mt-6 text-center text-sm text-muted-foreground">
              Do not have an account?{" "}
              <Link to="/register" className="font-medium text-primary hover:underline">Create one</Link>
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Login;

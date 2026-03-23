import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/lib/supabase";
import { useState } from "react";
import type { FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowRight, CheckCircle2, Circle, Lock, Mail, Sparkles, User } from "lucide-react";

const Register = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();
  const hasMinLength = password.length >= 8;
  const hasUppercase = /[A-Z]/.test(password);
  const hasNumber = /\d/.test(password);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!hasMinLength || !hasUppercase || !hasNumber) {
      toast({
        title: "Weak password",
        description: "Use at least 8 chars, with one uppercase and one number.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    const { error } = await supabase.auth.signUp({
      email: email.trim(),
      password,
      options: {
        data: {
          full_name: fullName.trim(),
        },
      },
    });

    if (error) {
      toast({ title: "Signup failed", description: error.message, variant: "destructive" });
      setIsLoading(false);
      return;
    }

    toast({
      title: "Account created",
      description: "Signup successful. Please verify your email if prompted, then sign in.",
      variant: "success",
    });

    setIsLoading(false);
    navigate("/login");
  };

  return (
    <Layout hideFooter>
      <div className="container py-10 md:py-14">
        <div className="mx-auto grid max-w-6xl overflow-hidden rounded-2xl border border-border/60 bg-card/40 shadow-2xl backdrop-blur-xl lg:grid-cols-2">
          <div className="relative hidden lg:block">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,hsl(var(--secondary)/0.22),transparent_60%)]" />
            <div className="absolute -left-20 bottom-10 h-64 w-64 rounded-full bg-primary/25 blur-[110px]" />
            <div className="relative flex h-full flex-col justify-between p-10">
              <div className="space-y-3">
                <span className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-background/40 px-3 py-1 text-xs text-muted-foreground">
                  <Sparkles className="h-3.5 w-3.5 text-secondary" />
                  Free to Start
                </span>
                <h2 className="font-display text-4xl font-bold leading-tight">
                  Start creating amazing product photos.
                </h2>
                <p className="max-w-md text-sm text-muted-foreground">
                  Create your account to unlock your dashboard, process images faster, and track your exports.
                </p>
              </div>

              <div className="space-y-3 text-sm">
                {["5 free credits every day", "No card needed to begin", "High-quality transparent PNG output"].map((item) => (
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
              <h1 className="font-display text-3xl font-bold">Create your account</h1>
              <p className="mt-2 text-sm text-muted-foreground">Start removing backgrounds for free.</p>
            </div>

            <form className="space-y-5" onSubmit={handleSubmit}>
              <div>
                <Label htmlFor="name">Full Name</Label>
                <div className="relative mt-1.5">
                  <User className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    id="name"
                    placeholder="John Doe"
                    className="pl-10"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    required
                  />
                </div>
              </div>
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
                <Label htmlFor="password">Password</Label>
                <div className="relative mt-1.5">
                  <Lock className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    id="password"
                    type="password"
                    placeholder="Enter secure password"
                    className="pl-10"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
                <div className="mt-3 space-y-2 text-xs">
                  {[
                    { label: "At least 8 characters", ok: hasMinLength },
                    { label: "Contains a number", ok: hasNumber },
                    { label: "Contains uppercase", ok: hasUppercase },
                  ].map((rule) => (
                    <div key={rule.label} className="flex items-center gap-2">
                      {rule.ok ? (
                        <CheckCircle2 className="h-3.5 w-3.5 text-secondary" />
                      ) : (
                        <Circle className="h-3.5 w-3.5 text-muted-foreground" />
                      )}
                      <span className={rule.ok ? "text-secondary" : "text-muted-foreground"}>{rule.label}</span>
                    </div>
                  ))}
                </div>
              </div>
              <Button variant="gradient" className="w-full" size="lg" type="submit" disabled={isLoading}>
                {isLoading ? "Creating Account..." : "Create Account"}
                {!isLoading && <ArrowRight className="h-4 w-4" />}
              </Button>
            </form>

            <p className="mt-6 text-center text-sm text-muted-foreground">
              Already have an account?{" "}
              <Link to="/login" className="font-medium text-primary hover:underline">Sign in</Link>
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Register;

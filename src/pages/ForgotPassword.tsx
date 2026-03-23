import { useState, type FormEvent } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Mail, Sparkles } from "lucide-react";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/lib/supabase";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);

    const { error } = await supabase.auth.resetPasswordForEmail(email.trim(), {
      redirectTo: `${window.location.origin}/reset-password`,
    });

    if (error) {
      toast({ title: "Unable to send link", description: error.message, variant: "destructive" });
      setIsLoading(false);
      return;
    }

    toast({
      title: "Reset link sent",
      description: "Check your email inbox and open the reset link.",
      variant: "success",
    });
    setIsLoading(false);
  };

  return (
    <Layout hideFooter>
      <div className="container py-10 md:py-14">
        <div className="mx-auto w-full max-w-xl rounded-2xl border border-border/60 bg-card/40 p-6 shadow-2xl backdrop-blur-xl sm:p-10">
          <div className="mb-8 text-center">
            <span className="mx-auto mb-4 inline-flex items-center gap-2 rounded-full border border-border/60 bg-background/40 px-3 py-1 text-xs text-muted-foreground">
              <Sparkles className="h-3.5 w-3.5 text-secondary" />
              Account Recovery
            </span>
            <h1 className="font-display text-3xl font-bold">Forgot your password?</h1>
            <p className="mt-2 text-sm text-muted-foreground">Enter your email to receive a secure reset link.</p>
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
            <Button variant="gradient" className="w-full" size="lg" type="submit" disabled={isLoading}>
              {isLoading ? "Sending..." : "Send Reset Link"}
              {!isLoading && <ArrowRight className="h-4 w-4" />}
            </Button>
          </form>

          <p className="mt-6 text-center text-sm text-muted-foreground">
            Remembered your password?{" "}
            <Link to="/login" className="font-medium text-primary hover:underline">Back to sign in</Link>
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default ForgotPassword;

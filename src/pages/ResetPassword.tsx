import { useEffect, useState, type FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowRight, CheckCircle2, Circle, Lock } from "lucide-react";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/lib/supabase";

const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isRecoveryReady, setIsRecoveryReady] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const hasMinLength = password.length >= 8;
  const hasUppercase = /[A-Z]/.test(password);
  const hasNumber = /\d/.test(password);

  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event) => {
      if (event === "PASSWORD_RECOVERY" || event === "SIGNED_IN") {
        setIsRecoveryReady(true);
      }
    });

    const init = async () => {
      const { data } = await supabase.auth.getSession();
      if (data.session) {
        setIsRecoveryReady(true);
      }
    };

    init();

    return () => subscription.unsubscribe();
  }, []);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      toast({ title: "Passwords do not match", description: "Please re-enter both fields.", variant: "destructive" });
      return;
    }

    if (!hasMinLength || !hasUppercase || !hasNumber) {
      toast({
        title: "Weak password",
        description: "Use at least 8 chars, with one uppercase and one number.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    const { error } = await supabase.auth.updateUser({ password });

    if (error) {
      toast({ title: "Reset failed", description: error.message, variant: "destructive" });
      setIsLoading(false);
      return;
    }

    toast({ title: "Password updated", description: "You can now log in with your new password.", variant: "success" });
    setIsLoading(false);
    navigate("/login", { replace: true });
  };

  return (
    <Layout hideFooter>
      <div className="container py-10 md:py-14">
        <div className="mx-auto w-full max-w-xl rounded-2xl border border-border/60 bg-card/40 p-6 shadow-2xl backdrop-blur-xl sm:p-10">
          <div className="mb-8 text-center">
            <h1 className="font-display text-3xl font-bold">Set new password</h1>
            <p className="mt-2 text-sm text-muted-foreground">
              {isRecoveryReady ? "Create a strong password for your account." : "Open this page from the email reset link."}
            </p>
          </div>

          {!isRecoveryReady ? (
            <div className="rounded-xl border border-border/60 bg-background/40 p-4 text-sm text-muted-foreground">
              This reset link is not active yet. Please open the latest reset email and use that link again.
              <div className="mt-3">
                <Link to="/forgot-password" className="font-medium text-primary hover:underline">Request a new link</Link>
              </div>
            </div>
          ) : (
            <form className="space-y-5" onSubmit={handleSubmit}>
              <div>
                <Label htmlFor="password">New Password</Label>
                <div className="relative mt-1.5">
                  <Lock className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    id="password"
                    type="password"
                    placeholder="Enter new password"
                    className="pl-10"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <div className="relative mt-1.5">
                  <Lock className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    id="confirmPassword"
                    type="password"
                    placeholder="Re-enter new password"
                    className="pl-10"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                  />
                </div>
              </div>
              <div className="space-y-2 text-xs">
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
              <Button variant="gradient" className="w-full" size="lg" type="submit" disabled={isLoading}>
                {isLoading ? "Updating..." : "Update Password"}
                {!isLoading && <ArrowRight className="h-4 w-4" />}
              </Button>
            </form>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default ResetPassword;

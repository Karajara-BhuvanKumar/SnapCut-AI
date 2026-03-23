import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import logo from "@/assets/logo.png";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, signOut } = useAuth();
  const { toast } = useToast();
  const isActive = (path: string) => location.pathname === path;

  const handleSignOut = async () => {
    try {
      await signOut();
      toast({ title: "Signed out", description: "You are logged out successfully.", variant: "success" });
      navigate("/login");
    } catch (error) {
      const message = error instanceof Error ? error.message : "Failed to sign out.";
      toast({ title: "Sign out failed", description: message, variant: "destructive" });
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-border/50 bg-background/80 backdrop-blur-xl">
      <div className="container flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center gap-2.5">
          <img src={logo} alt="SnapCut AI" className="h-9 w-9 rounded-lg" />
          <span className="font-display text-xl font-bold gradient-text">SnapCut AI</span>
        </Link>

        <div className="hidden md:flex items-center gap-10">
          {[
            { to: "/", label: "Home" },
            { to: "/pricing", label: "Pricing" },
            { to: "/features", label: "Features" },
            { to: "/history", label: "History" },
          ].map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={`text-sm font-medium transition-colors hover:text-primary ${
                isActive(link.to) ? "text-primary" : "text-muted-foreground"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-3">
          {user ? (
            <>
              <Link to="/dashboard">
                <Button variant="gradient" size="sm">Dashboard</Button>
              </Link>
              <Button variant="ghost" size="sm" onClick={handleSignOut}>Sign out</Button>
            </>
          ) : (
            <>
              <Link to="/login">
                <Button variant="ghost" size="sm">Log in</Button>
              </Link>
              <Link to="/register">
                <Button variant="gradient" size="sm">Get Started</Button>
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

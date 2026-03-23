import { Link } from "react-router-dom";
import logo from "@/assets/logo.png";

const Footer = () => (
  <footer className="border-t border-border/50 bg-card/30">
    <div className="container py-12">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
        <div className="col-span-2 md:col-span-1">
          <Link to="/" className="flex items-center gap-2 mb-4">
            <img src={logo} alt="SnapCut AI" className="h-8 w-8 rounded-lg" />
            <span className="font-display text-lg font-bold gradient-text">SnapCut AI</span>
          </Link>
          <p className="text-sm text-muted-foreground">
            AI-powered background removal in seconds. Built for designers, marketers, and e-commerce.
          </p>
        </div>
        {[
          {
            title: "Product",
            links: [
              { label: "Features", to: "/features" },
              { label: "Pricing", to: "/pricing" },
              { label: "API", to: "/api-docs" },
            ],
          },
          {
            title: "Company",
            links: [
              { label: "About", to: "/about" },
              { label: "Blog", to: "/blog" },
              { label: "Contact", to: "/contact" },
            ],
          },
          {
            title: "Legal",
            links: [
              { label: "Privacy Policy", to: "/privacy-policy" },
              { label: "Refund and Cancellation", to: "/refund-cancellation" },
              { label: "Contact Us", to: "/contact-us" },
              { label: "Shipping & Delivery", to: "/shipping-delivery" },
              { label: "Terms and Conditions", to: "/terms-conditions" },
            ],
          },
        ].map((section) => (
          <div key={section.title}>
            <h4 className="font-display font-semibold text-sm mb-4">{section.title}</h4>
            <ul className="space-y-2">
              {section.links.map((sectionLink) => (
                <li key={sectionLink.to}>
                  <Link
                    to={sectionLink.to}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                    onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                  >
                    {sectionLink.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="mt-10 pt-6 border-t border-border/50 text-center text-sm text-muted-foreground">
        © {new Date().getFullYear()} SnapCut AI. All rights reserved.
      </div>
    </div>
  </footer>
);

export default Footer;

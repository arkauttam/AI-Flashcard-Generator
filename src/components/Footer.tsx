import { Brain, Twitter, Github, Linkedin, Mail, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";

const footerLinks = {
  product: [
    { name: "Features", href: "#features" },
    { name: "Pricing", href: "#pricing" },
    { name: "API", href: "#api" },
    { name: "Integrations", href: "#integrations" }
  ],
  company: [
    { name: "About", href: "#about" },
    { name: "Blog", href: "#blog" },
    { name: "Careers", href: "#careers" },
    { name: "Contact", href: "#contact" }
  ],
  resources: [
    { name: "Documentation", href: "#docs" },
    { name: "Help Center", href: "#help" },
    { name: "Community", href: "#community" },
    { name: "Status", href: "#status" }
  ],
  legal: [
    { name: "Privacy", href: "#privacy" },
    { name: "Terms", href: "#terms" },
    { name: "Cookie Policy", href: "#cookies" },
    { name: "Security", href: "#security" }
  ]
};

const socialLinks = [
  { icon: Twitter, href: "#twitter", label: "Twitter" },
  { icon: Github, href: "#github", label: "GitHub" },
  { icon: Linkedin, href: "#linkedin", label: "LinkedIn" },
  { icon: Mail, href: "#email", label: "Email" }
];

export const Footer = () => {
  return (
    <footer className="relative border-t border-primary/10">
      {/* Background Effects */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-40 left-1/2 transform -translate-x-1/2 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-primary opacity-50" />
      </div>

      <div className="container mx-auto px-4 pt-16 pb-8 relative z-10">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 mb-12">
          {/* Brand Section */}
          <div className="lg:col-span-2 space-y-6 animate-fade-in">
            <div className="flex items-center space-x-3">
              <div className="p-2 rounded-xl bg-gradient-primary">
                <Brain className="w-8 h-8 text-white" />
              </div>
              <span className="text-3xl font-display font-black text-gradient">
                FlashAI
              </span>
            </div>
            <p className="text-muted-foreground leading-relaxed max-w-sm">
              Transform any content into intelligent flashcards with the power of AI. 
              Learn smarter, not harder.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social, index) => (
                <Button
                  key={index}
                  variant="ghost"
                  size="sm"
                  className="w-10 h-10 p-0 glass-morphism hover:bg-primary/20 hover:scale-110 transition-all duration-300 group"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <social.icon className="w-4 h-4 group-hover:text-primary transition-colors duration-300" />
                  <span className="sr-only">{social.label}</span>
                </Button>
              ))}
            </div>
          </div>

          {/* Links Sections */}
          {Object.entries(footerLinks).map(([category, links], categoryIndex) => (
            <div key={category} className="space-y-4 animate-slide-up" style={{ animationDelay: `${categoryIndex * 0.1}s` }}>
              <h3 className="font-display font-semibold text-gradient capitalize">
                {category}
              </h3>
              <ul className="space-y-3">
                {links.map((link, linkIndex) => (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      className="text-muted-foreground hover:text-secondary transition-colors duration-300 text-sm hover:translate-x-1 transform transition-transform inline-block"
                      style={{ transitionDelay: `${linkIndex * 0.05}s` }}
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Newsletter Section */}
        <div className="border-t border-primary/10 pt-8 mb-8 animate-fade-in" style={{ animationDelay: '0.6s' }}>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
            <div className="space-y-2">
              <h3 className="text-xl font-display font-semibold text-gradient">
                Stay Updated
              </h3>
              <p className="text-muted-foreground text-sm">
                Get the latest updates on new features and learning tips.
              </p>
            </div>
            <div className="flex space-x-3 max-w-sm w-full md:w-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 glass-morphism border border-primary/20 focus:border-primary/40 focus:ring-2 focus:ring-primary/20 rounded-xl bg-background/50 backdrop-blur-sm transition-all duration-300 text-sm"
              />
              <Button
                size="sm"
                className="bg-gradient-primary hover:shadow-glow-primary transition-all duration-300 px-6 font-medium whitespace-nowrap"
              >
                Subscribe
              </Button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-primary/10 pt-8 flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0 animate-fade-in" style={{ animationDelay: '0.8s' }}>
          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
            <span>© 2025 FlashAI. Made with</span>
            <Heart className="w-4 h-4 text-red-500 animate-pulse" />
            <span>for learners everywhere.</span>
          </div>
          <div className="flex items-center space-x-6 text-sm text-muted-foreground">
            <span>Powered by AI</span>
            <span>•</span>
            <span>Privacy First</span>
            <span>•</span>
            <span>Secure & Fast</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
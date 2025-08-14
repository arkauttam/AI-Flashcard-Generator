import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Brain, Menu, X, Sparkles, Zap, Settings, User } from "lucide-react";

export const FloatingNavbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { label: "AI Models", href: "#models", icon: Brain },
    { label: "Features", href: "#features", icon: Sparkles },
    { label: "Testimonials", href: "#testimonials", icon: Zap },
  ];

  return (
    <nav className={`
      fixed top-6 left-1/2 transform -translate-x-1/2 z-50 transition-all duration-700 ease-premium
      ${isScrolled ? 'w-[95%] max-w-7xl' : 'w-[90%] max-w-5xl'}
    `}>
      <div className={`
        backdrop-blur-xl rounded-3xl px-8 py-4 transition-all duration-700 ease-premium
        ${isScrolled ? 'shadow-xl scale-95' : 'shadow-lg'}
        border border-primary/20
      `}>
        <div className="flex items-center justify-between">
          {/* Enhanced Logo */}
          <div className="flex items-center space-x-4 cursor-pointer">
            <div className="relative">
              <div className="w-10 h-10 bg-gradient-primary rounded-xl flex items-center justify-center shadow-glow-primary animate-glow">
                <Brain className="w-5 h-5 text-white" />
              </div>
            </div>
            <div className="hidden sm:block space-y-1">
              <h1 className="text-xl font-display font-bold text-gradient">
                FlashAI
              </h1>
              <Badge className="bg-gradient-accent text-white border-0 text-xs px-2 py-0.5">
                AI Powered
              </Badge>
            </div>
          </div>

          {/* Enhanced Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <a
                  key={item.label}
                  href={item.href}
                  className="flex items-center space-x-2 px-4 py-2 rounded-xl text-lg font-semibold text-primary transition-all duration-300 hover:bg-primary/10 group"
                >
                  <Icon className="w-4 h-4 group-hover:scale-110 transition-transform duration-300" />
                  <span>{item.label}</span>
                </a>
              );
            })}
          </div>

          {/* Premium Action Buttons */}
          <div className="hidden lg:flex items-center space-x-3">
            <Button className="hover:bg-gradient-primary transition-all duration-300 font-semibold"disabled>
              <Settings className="w-4 h-4 mr-2" />
              Settings
            </Button>
            <Button className="bg-gradient-primary hover:shadow-glow-primary transition-all duration-300 hover-lift font-semibold"disabled>
              <User className="w-4 h-4 mr-2" />
              Sign In
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="sm"
            className="lg:hidden"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? (
              <X className="w-5 h-5" />
            ) : (
              <Menu className="w-5 h-5" />
            )}
          </Button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden mt-4 pt-4 border-t border-white/10 animate-slide-up">
            <div className="flex flex-col space-y-3">
              {navItems.map((item) => {
                const Icon = item.icon;
                return (
                  <a
                    key={item.label}
                    href={item.href}
                    className="flex items-center space-x-3 p-2 rounded-lg hover:bg-white/10 transition-colors duration-200"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <Icon className="w-4 h-4" />
                    <span className="text-sm font-medium">{item.label}</span>
                  </a>
                );
              })}
              <div className="flex flex-col space-y-2 pt-3 border-t border-white/10">
                <Button className="hover:bg-gradient-primary transition-all duration-300 font-semibold"disabled>
                  <Settings className="w-4 h-4 mr-2" />
                  Settings
                </Button>
                <Button className="hover:bg-gradient-primary transition-all duration-300 font-semibold"disabled>
                  <User className="w-4 h-4 mr-2" />
                  Sign In
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};
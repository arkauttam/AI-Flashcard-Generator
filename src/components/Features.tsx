import { Brain, Zap, Download, Target, Clock, Shield } from "lucide-react";
import { Card } from "@/components/ui/card";

const features = [
  {
    icon: Brain,
    title: "AI-Powered Generation",
    description: "Advanced AI analyzes your content and creates optimized flashcards for maximum retention",
    gradient: "from-primary to-primary-variant"
  },
  {
    icon: Zap,
    title: "Instant Processing",
    description: "Generate hundreds of flashcards in seconds from any text content",
    gradient: "from-secondary to-secondary-variant"
  },
  {
    icon: Target,
    title: "Smart Learning",
    description: "Personalized flashcards tailored to your learning style and knowledge level",
    gradient: "from-accent to-accent-variant"
  },
  {
    icon: Download,
    title: "Multiple Formats",
    description: "Export your flashcards as PDF, CSV, or JSON for use across any platform",
    gradient: "from-primary-variant to-secondary"
  },
  {
    icon: Clock,
    title: "Time Efficient",
    description: "Transform hours of manual work into minutes of automated generation",
    gradient: "from-secondary-variant to-accent"
  },
  {
    icon: Shield,
    title: "Privacy First",
    description: "Your content is processed securely and never stored on our servers",
    gradient: "from-accent-variant to-primary"
  }
];

export const Features = () => {
  return (
    <section id="features" className="py-24 w-full max-w-7xl mx-auto space-y-12 px-6">
      {/* Background Effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/3 left-1/6 w-64 h-64 bg-primary/10 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-1/3 right-1/6 w-80 h-80 bg-secondary/10 rounded-full blur-3xl animate-float-delayed" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center space-y-6 mb-20 animate-fade-in">
          <div className="inline-block">
            <span className="glass-morphism px-6 py-3 rounded-full text-sm font-medium text-primary border border-primary/20">
              ✨ Powerful Features
            </span>
          </div>
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-display font-black text-gradient">
            Everything You Need
          </h2>
          <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Advanced AI technology meets intuitive design to create the ultimate learning companion
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card
              key={index}
              className={`cursor-pointer group relative p-8 glass-morphism border border-primary/20 hover:border-primary/40 transition-all duration-700 hover-lift animate-scale-in overflow-hidden`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Background Gradient */}
              <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-5 group-hover:opacity-10 transition-opacity duration-700`} />
              
              {/* Icon */}
              <div className={`relative mb-6 w-16 h-16 rounded-2xl bg-gradient-to-br ${feature.gradient} p-4 group-hover:scale-110 transition-transform duration-500`}>
                <feature.icon className="w-full h-full text-white" />
              </div>

              {/* Content */}
              <div className="relative space-y-4">
                <h3 className="text-2xl font-display font-bold text-gradient group-hover:text-primary transition-colors duration-500">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed group-hover:text-foreground/80 transition-colors duration-500">
                  {feature.description}
                </p>
              </div>

              {/* Hover Effect */}
              <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-700" />
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
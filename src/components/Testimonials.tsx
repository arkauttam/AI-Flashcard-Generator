import { Card } from "@/components/ui/card";
import { Avatar } from "@/components/ui/avatar";
import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    name: "Sarah Chen",
    role: "Medical Student",
    avatar: "SC",
    content: "FlashAI transformed my study routine. I can create hundreds of flashcards from my textbooks in minutes instead of hours. My retention rate has improved by 40%!",
    rating: 5,
    gradient: "from-primary to-primary-variant"
  },
  {
    name: "Marcus Rodriguez",
    role: "Language Teacher",
    avatar: "MR",
    content: "As an educator, this tool is invaluable. I create personalized flashcard sets for each of my classes. The AI understands context perfectly and generates meaningful questions.",
    rating: 5,
    gradient: "from-secondary to-secondary-variant"
  },
  {
    name: "Emily Watson",
    role: "Law Student",
    avatar: "EW",
    content: "The export features are amazing! I can use my flashcards across different apps and study methods. FlashAI has become an essential part of my exam preparation.",
    rating: 5,
    gradient: "from-accent to-accent-variant"
  },
  {
    name: "David Kim",
    role: "Corporate Trainer",
    avatar: "DK",
    content: "I use FlashAI to create training materials for new employees. The quality of questions generated is consistently impressive and saves our team countless hours.",
    rating: 5,
    gradient: "from-primary-variant to-secondary"
  },
  {
    name: "Lisa Thompson",
    role: "Graduate Student",
    avatar: "LT",
    content: "The AI understands complex academic content better than any tool I've tried. It extracts the most important concepts and creates perfect study questions.",
    rating: 5,
    gradient: "from-secondary-variant to-accent"
  },
  {
    name: "Alex Johnson",
    role: "Professional Learner",
    avatar: "AJ",
    content: "FlashAI helped me pass my certification exams with flying colors. The personalized approach to flashcard generation is simply brilliant.",
    rating: 5,
    gradient: "from-accent-variant to-primary"
  }
];

export const Testimonials = () => {
  return (
    <section id="testimonials" className="relative overflow-hidden py-24 w-full max-w-7xl mx-auto space-y-12 px-6">
      {/* Background Effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-pulse-slow" />
        <div className="absolute bottom-1/4 left-1/4 w-80 h-80 bg-secondary/5 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '2s' }} />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center space-y-6 mb-20 animate-fade-in">
          <div className="inline-block">
            <span className="glass-morphism px-6 py-3 rounded-full text-sm font-medium text-secondary border border-secondary/20">
              💬 User Stories
            </span>
          </div>
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-display font-black text-gradient">
            Loved by Learners
          </h2>
          <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Join thousands of students and professionals who have transformed their learning experience
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card
              key={index}
              className={`group relative p-8 glass-morphism border border-primary/20 hover:border-primary/40 transition-all duration-700 hover-lift animate-scale-in overflow-hidden`}
              style={{ animationDelay: `${index * 0.15}s` }}
            >
              {/* Background Gradient */}
              <div className={`absolute inset-0 bg-gradient-to-br ${testimonial.gradient} opacity-5 group-hover:opacity-10 transition-opacity duration-700`} />
              
              {/* Quote Icon */}
              <div className="relative mb-6">
                <Quote className="w-8 h-8 text-primary/40 group-hover:text-primary/60 transition-colors duration-500" />
              </div>

              {/* Content */}
              <div className="relative space-y-6">
                <p className="text-foreground/80 leading-relaxed italic group-hover:text-foreground transition-colors duration-500">
                  "{testimonial.content}"
                </p>

                {/* Rating */}
                <div className="flex space-x-1">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-4 h-4 fill-yellow-400 text-yellow-400 group-hover:scale-110 transition-transform duration-300"
                      style={{ transitionDelay: `${i * 0.1}s` }}
                    />
                  ))}
                </div>

                {/* Author */}
                <div className="flex items-center space-x-4">
                  <Avatar className={`w-12 h-12 items-center flex justify-center bg-gradient-to-br ${testimonial.gradient} text-white font-semibold group-hover:scale-110 transition-transform duration-500`}>
                    {testimonial.avatar}
                  </Avatar>
                  <div>
                    <div className="font-display font-semibold text-gradient">
                      {testimonial.name}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {testimonial.role}
                    </div>
                  </div>
                </div>
              </div>

              {/* Hover Effect */}
              <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-secondary to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-700" />
            </Card>
          ))}
        </div>

        {/* Stats */}
        <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8 animate-fade-in" style={{ animationDelay: '0.8s' }}>
          {[
            { number: "50K+", label: "Happy Users" },
            { number: "2M+", label: "Flashcards Created" },
            { number: "95%", label: "Success Rate" },
            { number: "4.9/5", label: "User Rating" }
          ].map((stat, index) => (
            <div key={index} className="text-center space-y-2 group cursor-pointer">
              <div className="text-4xl md:text-5xl font-display font-black text-secondary/75 group-hover:scale-110 transition-transform duration-500">
                {stat.number}
              </div>
              <div className="text-muted-foreground font-medium">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
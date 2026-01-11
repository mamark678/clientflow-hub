import { Star } from "lucide-react";

const testimonials = [
  {
    quote:
      "ClientFlow saved me from a potentially embarrassing situation. I was about to share confidential files with the wrong client!",
    name: "Sarah Johnson",
    role: "Executive Virtual Assistant",
    avatar: "SJ",
    rating: 5,
  },
  {
    quote:
      "I manage 8 clients and was drowning in tabs. ClientFlow brought order to my chaos. It's now essential to my workflow.",
    name: "Michael Chen",
    role: "Freelance Project Manager",
    avatar: "MC",
    rating: 5,
  },
  {
    quote:
      "The one-click switching is a game-changer. I estimate I save at least 30 minutes every day with this extension.",
    name: "Emily Rodriguez",
    role: "Virtual Assistant Agency Owner",
    avatar: "ER",
    rating: 5,
  },
];

const TestimonialsSection = () => {
  return (
    <section className="py-20 px-4 bg-muted/50">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16">
          <span className="inline-block text-sm font-semibold text-primary uppercase tracking-wider mb-3">
            Testimonials
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Loved by virtual assistants
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Join hundreds of VAs who have already transformed their workflow.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-card p-8 rounded-2xl border border-border hover:shadow-lg transition-all duration-300"
            >
              <div className="flex gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-5 h-5 fill-yellow-400 text-yellow-400"
                  />
                ))}
              </div>
              <p className="text-foreground leading-relaxed mb-6">
                "{testimonial.quote}"
              </p>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full gradient-primary flex items-center justify-center text-primary-foreground font-semibold">
                  {testimonial.avatar}
                </div>
                <div>
                  <p className="font-semibold text-foreground">
                    {testimonial.name}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {testimonial.role}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;

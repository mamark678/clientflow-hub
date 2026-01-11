import { Button } from "@/components/ui/button";
import { Download, Play } from "lucide-react";
import { Link } from "react-router-dom";

interface HeroSectionProps { }

const HeroSection = ({ }: HeroSectionProps) => {
  const scrollToDemo = () => {
    document.querySelector("#demo")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative pt-32 pb-20 px-4 gradient-hero overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-secondary/5 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto max-w-6xl relative">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          {/* Content */}
          <div className="flex-1 text-center lg:text-left animate-slide-up">
            <div className="inline-flex items-center gap-2 bg-accent px-4 py-2 rounded-full mb-6">
              <span className="w-2 h-2 bg-primary rounded-full animate-pulse" />
              <span className="text-sm font-medium text-accent-foreground">
                Now Available for Edge
              </span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-foreground leading-tight mb-6">
              Stop Sending Client A's{" "}
              <span className="text-gradient">Files to Client B</span>
            </h1>

            <p className="text-lg md:text-xl text-muted-foreground max-w-xl mx-auto lg:mx-0 mb-8">
              The context-switching tool built for VAs managing 3+ clients.
              One-click workspace switching, zero embarrassing mix-ups.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Link to="/download">
                <Button variant="hero" size="lg">
                  Download Extension
                  <Download className="w-5 h-5 ml-2" />
                </Button>
              </Link>
              <Button variant="heroOutline" size="lg" onClick={scrollToDemo}>
                <Play className="w-5 h-5 mr-2" />
                Watch Demo
              </Button>
            </div>

            <p className="text-sm text-muted-foreground mt-6">
              ✓ Free during beta &nbsp; ✓ No credit card required
            </p>
          </div>

          {/* Hero Image */}
          <div className="flex-1 w-full max-w-lg lg:max-w-none animate-float">
            <div className="relative">
              <div className="absolute inset-0 gradient-primary opacity-20 blur-3xl rounded-3xl" />
              <div className="relative bg-card rounded-2xl shadow-xl border border-border overflow-hidden">
                <div className="bg-muted px-4 py-3 flex items-center gap-2 border-b border-border">
                  <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-destructive/60" />
                    <div className="w-3 h-3 rounded-full bg-yellow-500/60" />
                    <div className="w-3 h-3 rounded-full bg-green-500/60" />
                  </div>
                  <div className="flex-1 text-center text-xs text-muted-foreground">
                    ClientFlow Extension
                  </div>
                </div>
                <div className="p-6 space-y-4">
                  {/* Client workspace cards */}
                  {[
                    { name: "Acme Corp", color: "bg-primary", active: true },
                    { name: "TechStart Inc", color: "bg-secondary", active: false },
                    { name: "Design Studio", color: "bg-green-500", active: false },
                  ].map((client, i) => (
                    <div
                      key={i}
                      className={`flex items-center gap-3 p-4 rounded-lg border-2 transition-all cursor-pointer ${client.active
                          ? "border-primary bg-accent"
                          : "border-border hover:border-primary/50"
                        }`}
                    >
                      <div
                        className={`w-10 h-10 rounded-lg ${client.color} flex items-center justify-center text-white font-bold`}
                      >
                        {client.name[0]}
                      </div>
                      <div className="flex-1">
                        <p className="font-medium text-foreground">{client.name}</p>
                        <p className="text-sm text-muted-foreground">
                          {client.active ? "Currently active" : "Click to switch"}
                        </p>
                      </div>
                      {client.active && (
                        <div className="w-3 h-3 bg-primary rounded-full animate-pulse" />
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;

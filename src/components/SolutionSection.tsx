import { Settings, MousePointerClick, ShieldCheck } from "lucide-react";

const steps = [
  {
    number: "01",
    icon: Settings,
    title: "Set up client workspaces once",
    description:
      "Configure each client's accounts, bookmarks, and preferred tools. Do it once, forget about it.",
  },
  {
    number: "02",
    icon: MousePointerClick,
    title: "One-click switch between clients",
    description:
      "Switch your entire browser context instantly. All tabs, logins, and bookmarks update automatically.",
  },
  {
    number: "03",
    icon: ShieldCheck,
    title: "Never cross-contaminate again",
    description:
      "Visual indicators show which client you're working for. No more guessing, no more mistakes.",
  },
];

const SolutionSection = () => {
  return (
    <section id="how-it-works" className="py-20 px-4 bg-muted/50">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16">
          <span className="inline-block text-sm font-semibold text-primary uppercase tracking-wider mb-3">
            How It Works
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Three steps to{" "}
            <span className="text-gradient">organized workflows</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            ClientFlow makes context-switching seamless. Set up once, switch instantly,
            work confidently.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <div
              key={index}
              className="relative group"
            >
              {/* Connector line */}
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-16 left-[60%] w-[80%] h-0.5 bg-gradient-to-r from-primary/30 to-transparent" />
              )}
              
              <div className="bg-card p-8 rounded-2xl border border-border hover:border-primary/30 hover:shadow-lg transition-all duration-300 relative">
                <div className="flex items-center gap-4 mb-6">
                  <span className="text-5xl font-bold text-primary/20">
                    {step.number}
                  </span>
                  <div className="w-14 h-14 rounded-xl gradient-primary flex items-center justify-center shadow-md">
                    <step.icon className="w-7 h-7 text-primary-foreground" />
                  </div>
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-3">
                  {step.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Before/After comparison */}
        <div className="mt-20 grid md:grid-cols-2 gap-8">
          <div className="p-8 rounded-2xl bg-destructive/5 border border-destructive/20">
            <h3 className="text-lg font-semibold text-destructive mb-4 flex items-center gap-2">
              <span className="text-2xl">❌</span> Before ClientFlow
            </h3>
            <div className="space-y-3">
              {[
                "20+ browser tabs across different clients",
                "Constant double-checking which account you're in",
                "Accidental cross-posting to wrong channels",
                "Hours lost to context-switching overhead",
              ].map((item, i) => (
                <p key={i} className="text-muted-foreground flex items-start gap-2">
                  <span className="text-destructive mt-1">•</span>
                  {item}
                </p>
              ))}
            </div>
          </div>

          <div className="p-8 rounded-2xl bg-primary/5 border border-primary/20">
            <h3 className="text-lg font-semibold text-primary mb-4 flex items-center gap-2">
              <span className="text-2xl">✨</span> After ClientFlow
            </h3>
            <div className="space-y-3">
              {[
                "One clean workspace per client",
                "Visual indicators show active client",
                "Instant switching with one click",
                "Peace of mind, every single time",
              ].map((item, i) => (
                <p key={i} className="text-muted-foreground flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  {item}
                </p>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SolutionSection;

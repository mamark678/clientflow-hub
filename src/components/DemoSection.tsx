import { Play } from "lucide-react";

const DemoSection = () => {
  return (
    <section id="demo" className="py-20 px-4 bg-background">
      <div className="container mx-auto max-w-4xl">
        <div className="text-center mb-12">
          <span className="inline-block text-sm font-semibold text-primary uppercase tracking-wider mb-3">
            See It In Action
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Watch how ClientFlow works
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            See how easy it is to switch between clients without the chaos.
          </p>
        </div>

        {/* Video placeholder */}
        <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-border">
          <div className="aspect-video bg-gradient-to-br from-primary/10 to-secondary/10 flex items-center justify-center">
            {/* Placeholder for video embed */}
            <div className="text-center">
              <button className="group w-20 h-20 rounded-full gradient-primary flex items-center justify-center shadow-lg hover:shadow-glow transition-all duration-300 mb-4">
                <Play className="w-8 h-8 text-primary-foreground ml-1 group-hover:scale-110 transition-transform" />
              </button>
              <p className="text-muted-foreground">
                Demo video coming soon
              </p>
            </div>
          </div>
          
          {/* Decorative browser frame */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-0 left-0 right-0 h-10 bg-muted/80 backdrop-blur-sm flex items-center px-4 gap-2">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-destructive/40" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/40" />
                <div className="w-3 h-3 rounded-full bg-green-500/40" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DemoSection;

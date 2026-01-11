import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const CTASection = () => {

  return (
    <section className="py-24 px-4 bg-background relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] gradient-primary opacity-5 blur-3xl rounded-full" />
      </div>

      <div className="container mx-auto max-w-3xl relative">
        <div className="text-center">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Ready to work <span className="text-gradient">smarter</span>?
          </h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-xl mx-auto">
            Get ClientFlow today and experience stress-free client management.
          </p>

          <div className="flex justify-center">
            <Button
              className="h-14 px-8 text-lg"
              variant="hero"
              size="lg"
              onClick={() => window.open("https://microsoftedge.microsoft.com/addons/detail/[YOUR-EXTENSION-ID]", "_blank")}
            >
              Download for Edge
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </div>

          <p className="text-sm text-muted-foreground mt-6">
            Free during beta. No account required.
          </p>
        </div>
      </div>
    </section>
  );
};

export default CTASection;

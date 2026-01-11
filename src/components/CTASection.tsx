import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { Loader2, ArrowRight } from "lucide-react";

const CTASection = () => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [waitlistCount] = useState(500);
  const { toast } = useToast();

  const validateEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateEmail(email)) {
      toast({
        title: "Invalid email",
        description: "Please enter a valid email address.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    // TODO: Connect to backend when Cloud is enabled
    setTimeout(() => {
      setEmail("");
      toast({
        title: "You're on the list! 🎉",
        description: "We'll notify you when ClientFlow launches.",
      });
      setIsLoading(false);
    }, 1000);
  };

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
            Join the waitlist and be the first to experience stress-free client management.
          </p>

          <form
            onSubmit={handleSubmit}
            className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto mb-6"
          >
            <Input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="h-14 text-base"
              disabled={isLoading}
            />
            <Button
              type="submit"
              variant="hero"
              size="lg"
              className="h-14 px-8"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Joining...
                </>
              ) : (
                <>
                  Join Waitlist
                  <ArrowRight className="w-5 h-5" />
                </>
              )}
            </Button>
          </form>

          <p className="text-sm text-muted-foreground">
            Join <span className="font-semibold text-foreground">{waitlistCount.toLocaleString()}+</span> VAs on the waitlist
          </p>
          <p className="text-xs text-muted-foreground mt-2">
            We respect your inbox. Updates only.
          </p>
        </div>
      </div>
    </section>
  );
};

export default CTASection;

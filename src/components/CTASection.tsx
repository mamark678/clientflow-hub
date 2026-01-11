import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { Loader2, ArrowRight } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

const CTASection = () => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [waitlistCount, setWaitlistCount] = useState(500);
  const { toast } = useToast();

  useEffect(() => {
    const fetchCount = async () => {
      const { count, error } = await supabase
        .from("waitlist")
        .select("*", { count: "exact", head: true });
      
      if (!error && count !== null) {
        setWaitlistCount(500 + count);
      }
    };
    fetchCount();
  }, []);

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

    try {
      const { error } = await supabase
        .from("waitlist")
        .insert([{ email, source: "cta-section" }]);

      if (error) {
        if (error.code === "23505") {
          toast({
            title: "Already on the list!",
            description: "This email is already registered on our waitlist.",
          });
        } else {
          throw error;
        }
      } else {
        setEmail("");
        setWaitlistCount((prev) => prev + 1);
        toast({
          title: "You're on the list! 🎉",
          description: "We'll notify you when ClientFlow launches.",
        });
      }
    } catch (error) {
      toast({
        title: "Something went wrong",
        description: "Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
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

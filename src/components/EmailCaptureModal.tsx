import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { CheckCircle2, Mail } from "lucide-react";
import { useState } from "react";

interface EmailCaptureModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const EmailCaptureModal = ({ isOpen, onClose }: EmailCaptureModalProps) => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
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
      setIsSuccess(true);
      toast({
        title: "You're on the list!",
        description: "We'll notify you when ClientFlow launches.",
      });
      setIsLoading(false);
    }, 1000);
  };

  const handleClose = () => {
    setEmail("");
    setIsSuccess(false);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md">
        {isSuccess ? (
          <div className="flex flex-col items-center text-center py-6 animate-scale-in">
            <div className="w-16 h-16 rounded-full bg-accent flex items-center justify-center mb-4">
              <CheckCircle2 className="w-8 h-8 text-primary" />
            </div>
            <DialogHeader>
              <DialogTitle className="text-2xl">You're on the list!</DialogTitle>
              <DialogDescription className="text-base mt-2">
                Check your email for a confirmation. We'll notify you when ClientFlow is ready to launch.
              </DialogDescription>
            </DialogHeader>
            <Button variant="hero" className="mt-6" onClick={handleClose}>
              Got it!
            </Button>
          </div>
        ) : (
          <>
            <DialogHeader>
              <div className="w-12 h-12 rounded-full bg-accent flex items-center justify-center mb-2">
                <Mail className="w-6 h-6 text-primary" />
              </div>
              <DialogTitle className="text-2xl">Join the Waitlist</DialogTitle>
              <DialogDescription className="text-base">
                Be the first to know when ClientFlow launches. No spam, just updates.
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="mt-4 space-y-4">
              <Input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="h-12"
                disabled={isLoading}
              />
              <Button
                type="submit"
                variant="hero"
                className="w-full"
                size="lg"
                disabled={isLoading}
              >
              </Button>
            </form>
            <p className="text-xs text-muted-foreground text-center mt-4">
              We respect your inbox. Updates only, no spam.
            </p>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default EmailCaptureModal;

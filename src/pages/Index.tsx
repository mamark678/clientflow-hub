import { useState } from "react";
import { Helmet } from "react-helmet-async";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import ProblemSection from "@/components/ProblemSection";
import SolutionSection from "@/components/SolutionSection";
import DemoSection from "@/components/DemoSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";
import EmailCaptureModal from "@/components/EmailCaptureModal";

const Index = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <Helmet>
        <title>ClientFlow - Stop Context-Switching Chaos | Chrome Extension for VAs</title>
        <meta
          name="description"
          content="The Chrome extension that helps Virtual Assistants manage multiple clients without mixing up accounts, files, or workspaces. Join 500+ VAs on the waitlist."
        />
        <meta property="og:title" content="ClientFlow - Stop Context-Switching Chaos" />
        <meta
          property="og:description"
          content="The Chrome extension that helps Virtual Assistants manage multiple clients without mixing up accounts."
        />
        <meta property="og:type" content="website" />
        <link rel="canonical" href="https://clientflow.app" />
      </Helmet>

      <div className="min-h-screen bg-background">
        <Navbar onOpenWaitlist={() => setIsModalOpen(true)} />
        <HeroSection onOpenWaitlist={() => setIsModalOpen(true)} />
        <ProblemSection />
        <SolutionSection />
        <DemoSection />
        <TestimonialsSection />
        <CTASection />
        <Footer />
        <EmailCaptureModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        />
      </div>
    </>
  );
};

export default Index;

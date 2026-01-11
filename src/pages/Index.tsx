import CommentsSection from "@/components/CommentsSection";
import CTASection from "@/components/CTASection";
import DemoSection from "@/components/DemoSection";
import Footer from "@/components/Footer";
import HeroSection from "@/components/HeroSection";
import Navbar from "@/components/Navbar";
import ProblemSection from "@/components/ProblemSection";
import SolutionSection from "@/components/SolutionSection";
import { Helmet } from "react-helmet-async";

const Index = () => {
  return (
    <>
      <Helmet>
        <title>ClientFlow - Stop Context-Switching Chaos | Chrome Extension for VAs</title>
        <meta
          name="description"
          content="The Chrome extension that helps Virtual Assistants manage multiple clients without mixing up accounts, files, or workspaces."
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
        <Navbar />
        <HeroSection />
        <ProblemSection />
        <SolutionSection />
        <DemoSection />
        <CommentsSection />
        <CTASection />
        <Footer />
      </div>
    </>
  );
};

export default Index;

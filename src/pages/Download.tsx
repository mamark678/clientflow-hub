import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Chrome, Download as DownloadIcon, HelpCircle, Settings, Zap } from "lucide-react";
import { Helmet } from "react-helmet-async";

const steps = [
  {
    number: 1,
    icon: DownloadIcon,
    title: "Click 'Add to Chrome'",
    description: "Click the button below to open the Chrome Web Store and add ClientFlow to your browser.",
  },
  {
    number: 2,
    icon: Settings,
    title: "Pin the extension",
    description: "Click the puzzle icon in Chrome, then pin ClientFlow for easy access.",
  },
  {
    number: 3,
    icon: Zap,
    title: "Set up your first client",
    description: "Open ClientFlow and add your first client workspace. You're ready to go!",
  },
];

const faqs = [
  {
    question: "Which browsers does ClientFlow support?",
    answer: "ClientFlow is currently available for Edge. I am working on other browser versions and plan to release them soon.",
  },
  {
    question: "Is my data secure?",
    answer: "Yes! ClientFlow stores all your workspace configurations locally in your browser. We never have access to your client data, login credentials, or browsing activity.",
  },
  {
    question: "Can I use ClientFlow on multiple devices?",
    answer: "Currently, each installation is device-specific. Cloud sync across devices is on our roadmap for a future update.",
  },
  {
    question: "The extension isn't switching tabs correctly. What should I do?",
    answer: "Try refreshing the page or restarting Chrome. If the issue persists, right-click the extension icon, select 'Manage Extension', toggle it off and on, then reload your tabs.",
  },
  {
    question: "How do I uninstall ClientFlow?",
    answer: "Right-click the ClientFlow icon in your Chrome toolbar, select 'Remove from Chrome', and confirm. Your data will be removed with the extension.",
  },
];

const DownloadPage = () => {
  return (
    <>
      <Helmet>
        <title>Download ClientFlow - Chrome Extension for Virtual Assistants</title>
        <meta
          name="description"
          content="Download the ClientFlow Chrome extension and start managing multiple clients without context-switching chaos."
        />
      </Helmet>

      <div className="min-h-screen bg-background">
        <Navbar />

        {/* Hero */}
        <section className="pt-32 pb-16 px-4 gradient-hero">
          <div className="container mx-auto max-w-4xl text-center">
            <div className="inline-flex items-center gap-2 bg-primary/10 px-4 py-2 rounded-full mb-6">
              <Chrome className="w-5 h-5 text-primary" />
              <span className="text-sm font-medium text-primary">Chrome Extension</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              Download ClientFlow
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
              Get started in less than a minute. Install the extension, set up your first client, and never mix up workspaces again.
            </p>
            <Button
              variant="hero"
              size="lg"
              className="h-16 px-10 text-lg"
              onClick={() => window.open("https://chrome.google.com/webstore", "_blank")}
            >
              <Chrome className="w-6 h-6" />
              Add to Browser — It's Free
            </Button>
          </div>
        </section>

        {/* Installation Steps */}
        <section className="py-20 px-4 bg-background">
          <div className="container mx-auto max-w-4xl">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground text-center mb-12">
              Installation Steps
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              {steps.map((step) => (
                <div key={step.number} className="text-center">
                  <div className="relative inline-block mb-6">
                    <div className="w-16 h-16 rounded-2xl gradient-primary flex items-center justify-center shadow-lg">
                      <step.icon className="w-8 h-8 text-primary-foreground" />
                    </div>
                    <span className="absolute -top-2 -right-2 w-8 h-8 bg-secondary rounded-full flex items-center justify-center text-secondary-foreground font-bold text-sm">
                      {step.number}
                    </span>
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">
                    {step.title}
                  </h3>
                  <p className="text-muted-foreground">{step.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Quick Start Guide */}
        <section className="py-20 px-4 bg-muted/50">
          <div className="container mx-auto max-w-4xl">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground text-center mb-4">
              Quick Start Guide
            </h2>
            <p className="text-muted-foreground text-center mb-12 max-w-2xl mx-auto">
              After installation, here's how to get the most out of ClientFlow.
            </p>

            <div className="bg-card rounded-2xl border border-border p-8 space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <span className="text-primary font-semibold">1</span>
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-1">Create your first workspace</h3>
                  <p className="text-muted-foreground">
                    Click the ClientFlow icon, then "Add Client". Give it a name and choose a color for easy identification.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <span className="text-primary font-semibold">2</span>
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-1">Add accounts and bookmarks</h3>
                  <p className="text-muted-foreground">
                    Within each workspace, save the client's key URLs, account logins, and frequently used tools.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <span className="text-primary font-semibold">3</span>
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-1">Switch contexts instantly</h3>
                  <p className="text-muted-foreground">
                    Click on any client workspace to switch. Your tabs and context will update automatically.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-20 px-4 bg-background">
          <div className="container mx-auto max-w-3xl">
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 bg-accent px-4 py-2 rounded-full mb-4">
                <HelpCircle className="w-5 h-5 text-primary" />
                <span className="text-sm font-medium text-accent-foreground">FAQ</span>
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-foreground">
                Frequently Asked Questions
              </h2>
            </div>

            <Accordion type="single" collapsible className="space-y-4">
              {faqs.map((faq, index) => (
                <AccordionItem
                  key={index}
                  value={`item-${index}`}
                  className="bg-card rounded-xl border border-border px-6"
                >
                  <AccordionTrigger className="text-left font-semibold hover:no-underline">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
};

export default DownloadPage;

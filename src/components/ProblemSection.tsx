import { FolderSync, MessageSquareWarning, FileX2 } from "lucide-react";

const problems = [
  {
    icon: FolderSync,
    title: "Logged into wrong Google Drive",
    description:
      "You're uploading files and suddenly realize you're in the wrong client's account. Again.",
  },
  {
    icon: MessageSquareWarning,
    title: "Sent Slack to wrong workspace",
    description:
      "That awkward moment when you send a message about Client A to Client B's Slack channel.",
  },
  {
    icon: FileX2,
    title: "Mixed up client files and folders",
    description:
      "Confusion leads to errors. Errors lead to awkward apology emails. Sound familiar?",
  },
];

const ProblemSection = () => {
  return (
    <section className="py-20 px-4 bg-background">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Sound familiar?
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Managing multiple clients means juggling multiple accounts, tabs, and contexts.
            One wrong click can cost you hours—or worse, a client.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {problems.map((problem, index) => (
            <div
              key={index}
              className="group p-8 rounded-2xl bg-card border border-border hover:border-primary/30 hover:shadow-lg transition-all duration-300"
            >
              <div className="w-14 h-14 rounded-xl bg-destructive/10 flex items-center justify-center mb-6 group-hover:bg-destructive/20 transition-colors">
                <problem.icon className="w-7 h-7 text-destructive" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-3">
                {problem.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {problem.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProblemSection;

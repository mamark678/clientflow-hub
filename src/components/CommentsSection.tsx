import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { MessageCircle, User } from "lucide-react";
import { useState } from "react";

interface Comment {
    id: number;
    name: string;
    content: string;
    date: string;
    likes: number;
}

const CommentsSection = () => {
    const [comments, setComments] = useState<Comment[]>([]);
    const [newComment, setNewComment] = useState("");
    const [newName, setNewName] = useState("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!newComment.trim() || !newName.trim()) return;

        const comment: Comment = {
            id: comments.length + 1,
            name: newName,
            content: newComment,
            date: "Just now",
            likes: 0,
        };

        setComments([comment, ...comments]);
        setNewComment("");
        setNewName("");
    };

    return (
        <section className="py-20 px-4 bg-muted/50">
            <div className="container mx-auto max-w-4xl">
                <div className="text-center mb-12">
                    <span className="inline-block text-sm font-semibold text-primary uppercase tracking-wider mb-3">
                        Community
                    </span>
                    <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                        Comment Your Thoughts, Feedback, or Suggestions
                    </h2>
                    <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                        Share your thoughts and experiences with other virtual assistants.
                    </p>
                </div>

                <div className="space-y-8">
                    {/* Comment Form */}
                    <Card className="border-primary/20 bg-background/60 backdrop-blur-sm">
                        <CardHeader className="pb-4">
                            <h3 className="text-lg font-semibold flex items-center gap-2">
                                <MessageCircle className="w-5 h-5 text-primary" />
                                Leave a Comment
                            </h3>
                        </CardHeader>
                        <CardContent>
                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div className="grid gap-4 md:grid-cols-2">
                                    <div className="space-y-2">
                                        <Input
                                            placeholder="Your Name"
                                            value={newName}
                                            onChange={(e) => setNewName(e.target.value)}
                                            className="bg-background"
                                            required
                                        />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <Textarea
                                        placeholder="Share your thoughts..."
                                        value={newComment}
                                        onChange={(e) => setNewComment(e.target.value)}
                                        className="min-h-[100px] bg-background"
                                        required
                                    />
                                </div>
                                <div className="flex justify-end">
                                    <Button type="submit" className="w-full md:w-auto">
                                        Post Comment
                                    </Button>
                                </div>
                            </form>
                        </CardContent>
                    </Card>

                    {/* Comments List */}
                    <div className="space-y-4">
                        {comments.map((comment) => (
                            <Card key={comment.id} className="overflow-hidden hover:shadow-md transition-shadow">
                                <CardContent className="p-6">
                                    <div className="flex gap-4">
                                        <Avatar className="w-10 h-10 border-2 border-primary/10">
                                            <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${comment.name}`} />
                                            <AvatarFallback>
                                                <User className="w-5 h-5 text-muted-foreground" />
                                            </AvatarFallback>
                                        </Avatar>
                                        <div className="flex-1 space-y-2">
                                            <div className="flex items-center justify-between">
                                                <div className="flex items-center gap-2">
                                                    <h4 className="font-semibold text-foreground">{comment.name}</h4>
                                                    <span className="text-xs text-muted-foreground">•</span>
                                                    <span className="text-xs text-muted-foreground">{comment.date}</span>
                                                </div>
                                            </div>
                                            <p className="text-muted-foreground leading-relaxed">
                                                {comment.content}
                                            </p>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default CommentsSection;

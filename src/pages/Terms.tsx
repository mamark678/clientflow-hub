import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { Helmet } from "react-helmet-async";

const Terms = () => {
    return (
        <>
            <Helmet>
                <title>Terms of Service | ClientFlow</title>
                <meta name="description" content="Terms of Service for ClientFlow" />
            </Helmet>
            <div className="min-h-screen bg-background flex flex-col">
                <Navbar onOpenWaitlist={() => { }} />
                <main className="flex-grow container mx-auto px-4 py-8 max-w-4xl">
                    <h1 className="text-4xl font-bold mb-8">Terms of Service</h1>
                    <div className="prose dark:prose-invert max-w-none space-y-6">
                        <p>Last updated: {new Date().toLocaleDateString()}</p>

                        <section>
                            <h2 className="text-2xl font-semibold mb-4">1. Agreement to Terms</h2>
                            <p>
                                By accessing our website or using our browser extension, you agree to be bound by these Terms of Service.
                                If you do not agree to these terms, please do not use our services.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-semibold mb-4">2. Intellectual Property Rights</h2>
                            <p>
                                Unless otherwise indicated, the Site and the extension are our proprietary property and all source code,
                                databases, functionality, software, website designs, audio, video, text, photographs, and graphics on the Site
                                and extension (collectively, the "Content") and the trademarks, service marks, and logos contained therein
                                (the "Marks") are owned or controlled by us or licensed to us, and are protected by copyright and trademark laws.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-semibold mb-4">3. User Representations</h2>
                            <p>
                                By using the Site or extension, you represent and warrant that:
                            </p>
                            <ul className="list-disc pl-6 space-y-2">
                                <li>All registration information you submit will be true, accurate, current, and complete.</li>
                                <li>You will maintain the accuracy of such information and promptly update such registration information as necessary.</li>
                                <li>You have the legal capacity and you agree to comply with these Terms of Service.</li>
                                <li>You will not use the Site or extension for any illegal or unauthorized purpose.</li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="text-2xl font-semibold mb-4">4. Prohibited Activities</h2>
                            <p>
                                You may not access or use the Site or extension for any purpose other than that for which we make the Site and extension available.
                                The Site and extension may not be used in connection with any commercial endeavors except those that are specifically endorsed or approved by us.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-semibold mb-4">5. Modifications and Interruptions</h2>
                            <p>
                                We reserve the right to change, modify, or remove the contents of the Site or extension at any time or for any reason at our sole discretion without notice.
                                We also reserve the right to modify or discontinue all or part of the services without notice at any time.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-semibold mb-4">6. Contact Us</h2>
                            <p>
                                If you have any questions about these Terms of Service, please contact us at hello@clientflow.app.
                            </p>
                        </section>
                    </div>
                </main>
                <Footer />
            </div>
        </>
    );
};

export default Terms;

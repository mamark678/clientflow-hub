import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { Helmet } from "react-helmet-async";

const Privacy = () => {
    return (
        <>
            <Helmet>
                <title>Privacy Policy | ClientFlow</title>
                <meta name="description" content="Privacy Policy for ClientFlow" />
            </Helmet>
            <div className="min-h-screen bg-background flex flex-col">
                <Navbar />
                <main className="flex-grow container mx-auto px-4 py-8 max-w-4xl">
                    <h1 className="text-4xl font-bold mb-8">Privacy Policy</h1>
                    <div className="prose dark:prose-invert max-w-none space-y-6">
                        <p>Last updated: {new Date().toLocaleDateString()}</p>

                        <section>
                            <h2 className="text-2xl font-semibold mb-4">1. Introduction</h2>
                            <p>
                                Welcome to ClientFlow ("we," "our," or "us"). We respect your privacy and are committed to protecting your personal data.
                                This privacy policy explains how our browser extension and website collect, use, and protect your information.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-semibold mb-4">2. Extension Permissions & Data</h2>
                            <p className="mb-4">
                                The ClientFlow browser extension requires specific permissions to function:
                            </p>
                            <ul className="list-disc pl-6 space-y-2">
                                <li><strong>Tabs:</strong> Required to open new tabs for your client tools. We do not track your browsing history.</li>
                                <li><strong>Storage:</strong> Used to store your preferences and client data locally on your device.</li>
                                <li><strong>Host Permissions:</strong>
                                    <ul className="list-circle pl-6 mt-1">
                                        <li><em>*.supabase.co:</em> To sync your data securely if you choose to sign in.</li>
                                        <li><em>cdn.jsdelivr.net:</em> To load essential libraries securely.</li>
                                    </ul>
                                </li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="text-2xl font-semibold mb-4">3. Data Collection & Usage</h2>
                            <p className="mb-4">
                                We prioritize data minimization. Here is what we collect:
                            </p>
                            <div className="space-y-4">
                                <div>
                                    <h3 className="font-semibold text-lg">Local Data (No Account)</h3>
                                    <p>If you use ClientFlow without signing in, all your client data (names, colors, tool URLs) is stored locally on your device using your browser's local storage. We do not have access to this data.</p>
                                </div>
                                <div>
                                    <h3 className="font-semibold text-lg">Synced Data (With Account)</h3>
                                    <p>If you create an account, we store your client configurations in our secure database (Supabase) to enable synchronization across your devices.</p>
                                </div>
                                <div>
                                    <h3 className="font-semibold text-lg">Google Account Indexing</h3>
                                    <p>Our "Auto-detect Account Index" feature runs entirely on your device. When you paste a Google URL, the extension locally parses it to extract the account index (e.g., /u/1/). This information is never sent to our servers except as part of your saved client configuration.</p>
                                </div>
                            </div>
                        </section>

                        <section>
                            <h2 className="text-2xl font-semibold mb-4">4. Data Sharing & Third Parties</h2>
                            <p>
                                We do not sell, trade, or rent your personal identification information to others. We use the following trusted third-party services:
                            </p>
                            <ul className="list-disc pl-6 space-y-2 mt-2">
                                <li><strong>Supabase:</strong> For secure database hosting and authentication (if you sign in).</li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="text-2xl font-semibold mb-4">5. Data Retention & Deletion</h2>
                            <p>
                                You retain control over your data.
                            </p>
                            <ul className="list-disc pl-6 space-y-2 mt-2">
                                <li><strong>Local Data:</strong> You can clear your local data at any time by uninstalling the extension or clearing your browser's storage.</li>
                                <li><strong>Account Data:</strong> If you have an account, you can request full data deletion by contacting us.</li>
                            </ul>
                            <p>
                                If you have any questions about this Privacy Policy, please contact us at hello@clientflow.app.
                            </p>
                        </section>
                    </div>
                </main>
                <Footer />
            </div>
        </>
    );
};

export default Privacy;

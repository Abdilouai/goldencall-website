import React from 'react';
import { BlogPost } from '../../components/BlogPost';

export const TechEnglish: React.FC = () => {
    const content = (
        <>
            <p className="lead text-xl text-text-muted mb-8">
                The technology sector moves fast, and its language moves even faster. Whether you are a software engineer, IT support specialist, or project manager, mastering Technical English is vital for global collaboration.
            </p>

            <h2 className="text-3xl font-heading font-bold mt-12 mb-6 text-text">Bridging the Gap Between Code and Communication</h2>
            <p>
                In IT, you rarely work alone. You must be able to explain complex technical concepts to non-technical stakeholders, write clear documentation, and participate in Agile stand-ups. This requires a specific blend of technical accuracy and clear, accessible English.
            </p>

            <h2 className="text-3xl font-heading font-bold mt-12 mb-6 text-text">1. Daily Stand-up (Agile Meetings)</h2>
            <p>
                Stand-ups require brevity. Keep your updates focused on progress and blockers.
            </p>
            <ul className="space-y-4 mt-4 list-disc list-inside">
                <li><strong>Past:</strong> <span className="text-text-muted italic">"Yesterday, I was working on debugging the authentication API endpoints and managed to resolve the CORS issue."</span></li>
                <li><strong>Present/Future:</strong> <span className="text-text-muted italic">"Today, my focus is on implementing the new OAuth flow and writing the corresponding unit tests."</span></li>
                <li><strong>Blockers:</strong> <span className="text-text-muted italic">"I'm currently blocked on the database migration step. I need approval from the DevOps team to proceed."</span></li>
            </ul>

            <h2 className="text-3xl font-heading font-bold mt-12 mb-6 text-text">2. Explaining Technical Issues to End-Users</h2>
            <p>
                When dealing with users, avoid deep jargon. Focus on the impact and the solution.
            </p>
            <div className="bg-card p-6 rounded-lg border border-border mt-4">
                <p className="mb-2 text-text"><strong>Don't Say:</strong> "The server ran out of memory because of a memory leak in the background job processor causing a kernel panic."</p>
                <p className="mb-2 text-text"><strong>Say:</strong> <span className="text-text-muted italic">"We experienced a temporary system overload. Our engineers have isolated the issue, restarted the services, and your application should be running smoothly now."</span></p>
            </div>

            <h2 className="text-3xl font-heading font-bold mt-12 mb-6 text-text">3. Code Review Vocabulary</h2>
            <p>
                Code reviews (PR reviews) should be constructive. Use language that focuses on the code, not the developer.
            </p>
            <ul className="space-y-4 mt-4 list-disc list-inside">
                <li><span className="text-text-muted italic">"Could we consider extracting this logic into a separate helper function to improve readability?"</span></li>
                <li><span className="text-text-muted italic">"This looks great! Just a minor suggestion: we might want to handle the edge case where the array is empty."</span></li>
                <li><span className="text-text-muted italic">"I noticed this query isn't indexed; we might see performance bottlenecks as the database scales."</span></li>
            </ul>

            <h2 className="text-3xl font-heading font-bold mt-12 mb-6 text-text">4. Common IT Verbs and Collocations</h2>
            <p>Using the right verb with the right technical noun sounds instantly more natural.</p>
            <div className="grid md:grid-cols-2 gap-4 mt-4">
                <div className="bg-dark/20 p-4 border-l-2 border-primary rounded-r">
                    <strong>To deploy</strong> code/an application
                </div>
                <div className="bg-dark/20 p-4 border-l-2 border-primary rounded-r">
                    <strong>To provision</strong> servers/resources
                </div>
                <div className="bg-dark/20 p-4 border-l-2 border-primary rounded-r">
                    <strong>To refactor</strong> a codebase
                </div>
                <div className="bg-dark/20 p-4 border-l-2 border-primary rounded-r">
                    <strong>To mitigate</strong> a vulnerability/risk
                </div>
                <div className="bg-dark/20 p-4 border-l-2 border-primary rounded-r">
                    <strong>To replicate</strong> a bug/issue
                </div>
                <div className="bg-dark/20 p-4 border-l-2 border-primary rounded-r">
                    <strong>To deprecate</strong> a feature/API
                </div>
            </div>

            <h2 className="text-3xl font-heading font-bold mt-12 mb-6 text-text">Writing Clear Documentation</h2>
            <p>
                Good documentation uses the imperative mood (giving direct commands). Instead of writing "The user should click the button to save," write <strong>"Click the Save button."</strong> This makes README files and API documentation much easier to parse quickly.
            </p>

            <div className="bg-card border-l-4 border-primary p-6 my-8 rounded-r-lg shadow-sm">
                <h3 className="font-heading font-bold text-xl mb-2 text-text">Upgrade Your Tech English</h3>
                <p className="text-text-muted">
                    Our specialized IT English coaching will help you ace technical interviews, write clearer documentation, and communicate your ideas securely to stakeholders. Ready to level up your career? Let's connect.
                </p>
            </div>
        </>
    );

    return (
        <BlogPost
            title="Information Technology (IT): A Guide to Tech English"
            category="IT / Tech"
            readTime="8 min"
            author="Admin"
            content={content}
            imageUrl="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=1200&h=600&fit=crop"
        />
    );
};

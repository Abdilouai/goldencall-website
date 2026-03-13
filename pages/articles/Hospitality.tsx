import React from 'react';
import { BlogPost } from '../../components/BlogPost';

export const Hospitality: React.FC = () => {
    const content = (
        <>
            <p className="lead text-xl text-text-muted mb-8">
                In the premium hospitality sector, the difference between a 4-star and a 5-star experience often comes down to the subtleties of communication. Transform your service with polished terminology.
            </p>

            <h2 className="text-3xl font-heading font-bold mt-12 mb-6 text-text">The Language of Luxury</h2>
            <p>
                Luxury hospitality clients expect anticipation, discretion, and an elevated level of service. The words you choose actively shape their perception of your establishment. Replacing everyday phrases with refined alternatives demonstrates respect and professionalism.
            </p>

            <div className="space-y-6 mt-8">
                <div className="bg-card p-6 rounded-lg border border-border mt-4">
                    <h3 className="text-xl font-heading font-bold mb-3 text-text">1. Welcoming Guests</h3>
                    <p className="mb-2 text-text"><strong>Instead of:</strong> "Hi guys, checking in?"</p>
                    <p className="mb-2 text-text"><strong>Use:</strong></p>
                    <ul className="list-none space-y-2 mt-2">
                        <li className="text-text-muted italic border-l-2 border-primary/50 pl-4 py-2 bg-dark/20">"Good afternoon, welcome to [Hotel Name]. How may I assist you today?"</li>
                        <li className="text-text-muted italic border-l-2 border-primary/50 pl-4 py-2 bg-dark/20">"It's a pleasure to have you with us. May I have the name on the reservation?"</li>
                    </ul>
                </div>

                <div className="bg-card p-6 rounded-lg border border-border mt-4">
                    <h3 className="text-xl font-heading font-bold mb-3 text-text">2. Managing Delays or Issues</h3>
                    <p className="mb-2 text-text"><strong>Instead of:</strong> "I don't know, you'll have to wait."</p>
                    <p className="mb-2 text-text"><strong>Use:</strong></p>
                    <ul className="list-none space-y-2 mt-2">
                        <li className="text-text-muted italic border-l-2 border-primary/50 pl-4 py-2 bg-dark/20">"Please accept our apologies for the delay. I am personally looking into this for you right now."</li>
                        <li className="text-text-muted italic border-l-2 border-primary/50 pl-4 py-2 bg-dark/20">"Thank you for your patience while we prepare your suite to our highest standards."</li>
                    </ul>
                </div>

                <div className="bg-card p-6 rounded-lg border border-border mt-4">
                    <h3 className="text-xl font-heading font-bold mb-3 text-text">3. Offering Alternatives</h3>
                    <p className="mb-2 text-text"><strong>Instead of:</strong> "We don't have that."</p>
                    <p className="mb-2 text-text"><strong>Use:</strong></p>
                    <ul className="list-none space-y-2 mt-2">
                        <li className="text-text-muted italic border-l-2 border-primary/50 pl-4 py-2 bg-dark/20">"While that specific item is currently unavailable, may I highly recommend..."</li>
                        <li className="text-text-muted italic border-l-2 border-primary/50 pl-4 py-2 bg-dark/20">"Allow me to arrange an excellent alternative for you."</li>
                    </ul>
                </div>

                <div className="bg-card p-6 rounded-lg border border-border mt-4">
                    <h3 className="text-xl font-heading font-bold mb-3 text-text">4. Handling Complaints</h3>
                    <p className="mb-2 text-text"><strong>Instead of:</strong> "It's not my fault" or "Calm down."</p>
                    <p className="mb-2 text-text"><strong>Use:</strong></p>
                    <ul className="list-none space-y-2 mt-2">
                        <li className="text-text-muted italic border-l-2 border-primary/50 pl-4 py-2 bg-dark/20">"I completely understand your frustration, and I assure you we will rectify this immediately."</li>
                        <li className="text-text-muted italic border-l-2 border-primary/50 pl-4 py-2 bg-dark/20">"Thank you for bringing this to my attention. Please allow me to resolve this for you."</li>
                    </ul>
                </div>

                <div className="bg-card p-6 rounded-lg border border-border mt-4">
                    <h3 className="text-xl font-heading font-bold mb-3 text-text">5. Anticipating Needs</h3>
                    <p className="mb-2 text-text"><strong>Proactive Service:</strong></p>
                    <ul className="list-none space-y-2 mt-2">
                        <li className="text-text-muted italic border-l-2 border-primary/50 pl-4 py-2 bg-dark/20">"May I arrange transportation for your dinner reservation this evening?"</li>
                        <li className="text-text-muted italic border-l-2 border-primary/50 pl-4 py-2 bg-dark/20">"I've noticed you prefer a quiet environment; I've ensured your suite is located away from the elevators."</li>
                    </ul>
                </div>
            </div>

            <h2 className="text-3xl font-heading font-bold mt-12 mb-6 text-text">The "Never Say No" Rule</h2>
            <p>
                In luxury hospitality, a direct "No" is considered poor service. Always pivot to what you <strong>can</strong> do. When a guest makes a difficult request, respond with: <em>"Allow me a moment to see how we can best accommodate your request."</em> Even if the original request is impossible, offering a thoughtful, curated alternative maintains the 5-star illusion of limitless service.
            </p>

            <div className="bg-card border-l-4 border-primary p-6 my-8 rounded-r-lg shadow-sm">
                <h3 className="font-heading font-bold text-xl mb-2 text-text">Elevate Your Service Career</h3>
                <p className="text-text-muted">
                    Looking to transition into luxury hotels, high-end aviation, or VIP concierge services? Our communication classes will train you in the exact phrasing and demeanor expected by the world's most elite establishments. Let's elevate your career!
                </p>
            </div>
        </>
    );

    return (
        <BlogPost
            title="Hospitality English: How to create a 5-star experience"
            category="Hospitality"
            readTime="7 min"
            author="Admin"
            content={content}
            imageUrl="https://images.unsplash.com/photo-1542314831-c6a4203259ce?w=1200&h=600&fit=crop"
        />
    );
};

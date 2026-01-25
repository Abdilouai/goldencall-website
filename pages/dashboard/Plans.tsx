import React from 'react';
import { Check, CreditCard, Star } from 'lucide-react';
import { Button } from '../../components/Button';

// Mock data (since we can't query the DB directly in frontend without an API)
const PLANS = [
    {
        id: '1',
        name: 'Cabin Crew Assessment',
        price: 49,
        description: 'Master the group exercises, grooming standards, and mindset.',
        features: ['Group Exercise Simulation', 'Grooming & Image Guide', '1-hour Video Coaching', 'CV Review'],
        popular: true,
    },
    {
        id: '2',
        name: 'Final Interview Prep',
        price: 59,
        description: 'Perfect your STAR answers and behavioral responses.',
        features: ['Mock Interview (1 hour)', 'STAR Method Mastery', 'Personalized Feedback Report', 'WhatsApp Support'],
        popular: false,
    },
    {
        id: '3',
        name: 'English Fluency',
        price: 29,
        description: 'Boost your confidence in speaking English.',
        features: ['30-min Conversation Practice', 'Vocabulary List', 'Accent Correction', 'Confidence Building'],
        popular: false,
    },
];

export const Plans: React.FC = () => {
    const handlePurchase = (planName: string) => {
        // In a real app, this would call your backend to create a Stripe Checkout session
        alert(`Redirecting to Stripe Checkout for ${planName}... (Mock)`);
    };

    return (
        <div className="space-y-8">
            <div className="text-center max-w-2xl mx-auto">
                <h1 className="font-heading font-bold text-3xl text-dark mb-4">Choose Your Path to Success</h1>
                <p className="text-gray-500">Select the coaching plan that fits your current needs. All plans include direct access to expert coaching.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {PLANS.map((plan) => (
                    <div
                        key={plan.id}
                        className={`relative bg-white rounded-2xl shadow-sm border ${plan.popular ? 'border-primary ring-2 ring-primary/10' : 'border-gray-100'
                            } p-8 flex flex-col`}
                    >
                        {plan.popular && (
                            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-primary text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide">
                                Most Popular
                            </div>
                        )}

                        <div className="mb-6">
                            <h3 className="font-heading font-bold text-xl text-dark mb-2">{plan.name}</h3>
                            <p className="text-gray-500 text-sm h-10">{plan.description}</p>
                        </div>

                        <div className="mb-6">
                            <span className="text-4xl font-bold text-dark">${plan.price}</span>
                            <span className="text-gray-400">/one-time</span>
                        </div>

                        <ul className="space-y-3 mb-8 flex-1">
                            {plan.features.map((feature, i) => (
                                <li key={i} className="flex items-start gap-3 text-sm text-gray-600">
                                    <Check size={16} className="text-green-500 mt-0.5 flex-shrink-0" />
                                    {feature}
                                </li>
                            ))}
                        </ul>

                        <Button
                            onClick={() => handlePurchase(plan.name)}
                            variant={plan.popular ? 'primary' : 'outline'}
                            fullWidth
                            className={plan.popular ? 'shadow-lg shadow-blue-500/20' : ''}
                        >
                            Select Plan
                        </Button>
                    </div>
                ))}
            </div>

            <div className="bg-slate-900 rounded-2xl p-8 text-white text-center">
                <Star className="w-12 h-12 text-gold mx-auto mb-4" />
                <h3 className="font-heading font-bold text-2xl mb-2">Not sure which plan is right for you?</h3>
                <p className="text-gray-400 mb-6">Take our free AI assessment to get a personalized recommendation based on your current skills.</p>
                <Button className="bg-gold text-dark hover:bg-yellow-400 border-none">Start Free Assessment</Button>
            </div>
        </div>
    );
};

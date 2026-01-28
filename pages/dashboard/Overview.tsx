import React, { useEffect, useState } from 'react';
import { useUser } from '@clerk/clerk-react';
import { ArrowRight, Star, Calendar, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '../../components/Button';

export const Overview: React.FC = () => {
    const { user } = useUser();
    const [aiScore, setAiScore] = useState<string | null>(null);

    useEffect(() => {
        const storedScore = localStorage.getItem('aiScore');
        if (storedScore) {
            setAiScore(storedScore);
        }
    }, []);

    return (
        <div className="space-y-8">
            {/* Welcome Section */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col md:flex-row justify-between items-center gap-6">
                <div>
                    <h1 className="font-heading font-bold text-3xl text-dark mb-2">
                        Welcome back, <span className="text-primary">{user?.firstName || 'Candidate'}</span>
                    </h1>
                    <p className="text-gray-500">You are on the path to your Golden Call. Ready to make progress today?</p>
                </div>
                <Link to="/dashboard/assessment">
                    <Button className="shadow-lg shadow-blue-500/20">Start AI Assessment</Button>
                </Link>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                    <div className="flex items-center gap-4 mb-4">
                        <div className="p-3 bg-blue-50 text-blue-600 rounded-xl">
                            <Zap size={24} />
                        </div>
                        <h3 className="font-bold text-lg text-dark">Current Plan</h3>
                    </div>
                    <p className="text-gray-500 mb-4">You haven't selected a coaching plan yet.</p>
                    <Link to="/services" className="text-sm font-semibold text-primary hover:underline">
                        View Plans &rarr;
                    </Link>
                </div>

                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                    <div className="flex items-center gap-4 mb-4">
                        <div className="p-3 bg-purple-50 text-purple-600 rounded-xl">
                            <Star size={24} />
                        </div>
                        <h3 className="font-bold text-lg text-dark">AI Score</h3>
                    </div>
                    <div className="mt-2">
                        <div className="flex items-baseline gap-1">
                            <span className="text-3xl font-heading font-bold text-dark">{aiScore || '--'}</span>
                            <span className="text-gray-400 font-medium">/100</span>
                        </div>
                        <p className="text-xs text-gray-400 mt-2">
                            {aiScore ? 'Based on your latest assessment' : 'Take an assessment to see your score'}
                        </p>
                    </div>
                </div>

                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                    <div className="flex items-center gap-4 mb-4">
                        <div className="p-3 bg-orange-50 text-orange-600 rounded-xl">
                            <Calendar size={24} />
                        </div>
                        <h3 className="font-bold text-lg text-dark">Next Session</h3>
                    </div>
                    <p className="text-gray-500 mb-4">No upcoming sessions scheduled.</p>
                    <Link to="/book" className="block w-full">
                        <Button variant="outline" size="sm" fullWidth>Book a Session</Button>
                    </Link>
                </div>
            </div>
        </div>
    );
};

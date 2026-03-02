import React, { useEffect, useState } from 'react';
import { useUser } from '@clerk/clerk-react';
import { ArrowRight, Star, Calendar, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '../../components/Button';
import { useTranslation } from 'react-i18next';

export const Overview: React.FC = () => {
    const { user } = useUser();
    const { t } = useTranslation();
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
                        {t('dashboard.welcomeBack')}<span className="text-primary">{user?.firstName || t('dashboard.welcomeDefault')}</span>
                    </h1>
                    <p className="text-gray-500">{t('dashboard.welcomeSubtitle')}</p>
                </div>
                <Link to="/dashboard/assessment">
                    <Button className="shadow-lg shadow-blue-500/20">{t('dashboard.startAssessment')}</Button>
                </Link>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                    <div className="flex items-center gap-4 mb-4">
                        <div className="p-3 bg-blue-50 text-blue-600 rounded-xl">
                            <Zap size={24} />
                        </div>
                        <h3 className="font-bold text-lg text-dark">{t('dashboard.currentPlan')}</h3>
                    </div>
                    <p className="text-gray-500 mb-4">{t('dashboard.noPlan')}</p>
                    <Link to="/services" className="text-sm font-semibold text-primary hover:underline">
                        {t('dashboard.viewPlans')}
                    </Link>
                </div>

                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                    <div className="flex items-center gap-4 mb-4">
                        <div className="p-3 bg-purple-50 text-purple-600 rounded-xl">
                            <Star size={24} />
                        </div>
                        <h3 className="font-bold text-lg text-dark">{t('dashboard.aiScore')}</h3>
                    </div>
                    <div className="mt-2">
                        <div className="flex items-baseline gap-1">
                            <span className="text-3xl font-heading font-bold text-dark">{aiScore || '--'}</span>
                            <span className="text-gray-400 font-medium">/100</span>
                        </div>
                        <p className="text-xs text-gray-400 mt-2">
                            {aiScore ? t('dashboard.basedOnAssessment') : t('dashboard.takeAssessment')}
                        </p>
                    </div>
                </div>

                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                    <div className="flex items-center gap-4 mb-4">
                        <div className="p-3 bg-orange-50 text-orange-600 rounded-xl">
                            <Calendar size={24} />
                        </div>
                        <h3 className="font-bold text-lg text-dark">{t('dashboard.nextSession')}</h3>
                    </div>
                    <p className="text-gray-500 mb-4">{t('dashboard.noSessions')}</p>
                    <Link to="/book" className="block w-full">
                        <Button variant="outline" size="sm" fullWidth>{t('dashboard.bookSession')}</Button>
                    </Link>
                </div>
            </div>
        </div>
    );
};

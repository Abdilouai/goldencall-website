import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router-dom';
import { FreeSessionBooking } from '../components/FreeSessionBooking';
import { PersonalizeForm } from '../components/PersonalizeForm';
import { ProgramType } from '../config/offers';
import { SEO } from '../components/SEO';

export const Offers: React.FC = () => {
    const { t } = useTranslation();
    const location = useLocation();
    const [activeTab, setActiveTab] = useState<ProgramType | 'personalize'>('cabin-crew');

    // Check if we navigated here with a specific tab selected
    useEffect(() => {
        if (location.state && location.state.tab) {
            setActiveTab(location.state.tab as ProgramType | 'personalize');
        }
    }, [location]);

    return (
        <div className="min-h-screen py-24 bg-dark">
            <SEO
                title="Programs & Pricing"
                description="Choose from Cabin Crew English, IELTS Speaking, and Professional Interview coaching programs. Flexible pricing plans tailored to your goals. Start your training today."
                keywords="cabin crew training programs, IELTS coaching prices, interview preparation courses, aviation English pricing"
                canonicalPath="/formations"
            />
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* Header */}
                <div className="text-center mb-16">
                    <h1 className="font-heading font-bold text-4xl md:text-5xl text-text mb-6">
                        Book Your Free Session
                    </h1>
                    <p className="font-sans text-xl text-text-muted max-w-2xl mx-auto">
                        Choose a program and select a convenient time for your free consultation.
                    </p>
                </div>

                {/* Tabs */}
                <div className="flex justify-center px-4 mb-10 md:mb-16">
                    <div className="flex flex-wrap justify-center gap-2 md:gap-3 bg-card border border-border rounded-3xl md:rounded-full p-2">
                        {[
                            { id: 'cabin-crew', label: t('formations.tabCc') },
                            { id: 'ielts', label: t('formations.tabIelts') },
                            { id: 'interview', label: t('formations.tabPro') },
                            { id: 'personalize', label: t('formations.tabPersonalize') }
                        ].map(tab => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id as ProgramType | 'personalize')}
                                className={`font-sans font-bold text-xs sm:text-sm px-4 md:px-8 py-3 rounded-full transition-all whitespace-nowrap ${activeTab === tab.id
                                    ? 'bg-primary text-dark shadow-lg shadow-primary/20'
                                    : 'text-text-muted hover:text-text'
                                    }`}
                            >
                                {tab.label}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Booking or Personalize Form */}
                {activeTab === 'personalize' ? (
                    <PersonalizeForm />
                ) : (
                    <div className="mb-16">
                        <FreeSessionBooking />
                    </div>
                )}

            </div>
        </div>
    );
};

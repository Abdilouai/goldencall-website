import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router-dom';
import { OfferCard } from '../components/OfferCard';
import { PersonalizeForm } from '../components/PersonalizeForm';
import { OFFERS, ProgramType } from '../config/offers';

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

    const filteredOffers = OFFERS.filter(offer => offer.program === activeTab);

    return (
        <div className="min-h-screen py-24 bg-dark">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* Header */}
                <div className="text-center mb-16">
                    <h1 className="font-heading font-bold text-4xl md:text-5xl text-text mb-6">
                        {t('formations.title')}
                    </h1>
                    <p className="font-sans text-xl text-text-muted max-w-2xl mx-auto">
                        {t('formations.subtitle')}
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

                {/* Offers Grid or Personalize Form */}
                {activeTab === 'personalize' ? (
                    <PersonalizeForm />
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-center max-w-5xl mx-auto items-start">
                        {filteredOffers.map((offer) => (
                            <OfferCard key={offer.id} offer={offer} />
                        ))}
                    </div>
                )}

            </div>
        </div>
    );
};

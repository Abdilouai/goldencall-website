import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router-dom';
import { OfferCard } from '../components/OfferCard';
import { OFFERS, ProgramType } from '../config/offers';

export const Offers: React.FC = () => {
    const { t } = useTranslation();
    const location = useLocation();
    const [activeTab, setActiveTab] = useState<ProgramType>('cabin-crew');

    // Check if we navigated here with a specific tab selected
    useEffect(() => {
        if (location.state && location.state.tab) {
            setActiveTab(location.state.tab as ProgramType);
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
                <div className="flex justify-center mb-16 overflow-x-auto pb-4 scrollbar-hide">
                    <div className="inline-flex bg-card border border-border rounded-full p-2">
                        {[
                            { id: 'cabin-crew', label: t('formations.tabCc') },
                            { id: 'ielts', label: t('formations.tabIelts') },
                            { id: 'interview', label: t('formations.tabPro') }
                        ].map(tab => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id as ProgramType)}
                                className={`font-sans font-bold text-sm px-8 py-3 rounded-full transition-all whitespace-nowrap ${activeTab === tab.id
                                        ? 'bg-primary text-dark shadow-lg shadow-primary/20'
                                        : 'text-text-muted hover:text-text'
                                    }`}
                            >
                                {tab.label}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Offers Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-center max-w-5xl mx-auto items-start">
                    {filteredOffers.map((offer) => (
                        <OfferCard key={offer.id} offer={offer} />
                    ))}
                </div>

            </div>
        </div>
    );
};

import React from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { Check } from 'lucide-react';
import type { Offer } from '../config/offers';

export const OfferCard: React.FC<{ offer: Offer }> = ({ offer }) => {
    const { t, i18n } = useTranslation();
    const navigate = useNavigate();

    const isFrench = i18n.language === 'fr';
    const name = isFrench ? offer.nameFr : offer.name;
    const features = isFrench ? offer.featuresFr : offer.featuresEn;

    const handleSelect = () => {
        navigate('/paiement', {
            state: {
                planName: name,
                price: offer.price,
                priceUsd: offer.priceUsd,
                originalPrice: offer.originalPrice,
                originalPriceUsd: offer.originalPriceUsd,
                program: offer.program,
                period: offer.billingPeriod
            }
        });
    };

    return (
        <div className={`relative flex flex-col bg-card rounded-2xl border ${offer.recommended ? 'border-primary' : 'border-border'} p-6 transition-all hover:-translate-y-1 hover:shadow-xl hover:shadow-primary/5`}>
            {offer.recommended && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-primary text-dark font-sans font-bold text-[10px] tracking-wider uppercase px-4 py-1.5 rounded-full z-10">
                    {t('formations.recommended')}
                </div>
            )}

            <div className="mb-6">
                <h3 className="font-heading text-xl text-text font-bold mb-2">{name}</h3>
                <div className="flex items-end gap-2">
                    <span className="font-sans text-3xl font-bold text-primary">
                        {offer.price} DT {offer.priceUsd && `/ ${offer.priceUsd} $`}
                    </span>
                    <span className="font-sans text-sm text-text-muted mb-1">
                        {offer.billingPeriod === 'monthly' ? t('formations.perMonth') : t('formations.oneTime')}
                    </span>
                </div>
                {offer.originalPrice && (
                    <div className="font-sans text-sm text-text-muted line-through mt-1">
                        {offer.originalPrice} DT {offer.originalPriceUsd && `/ ${offer.originalPriceUsd} $`}
                    </div>
                )}
            </div>

            <ul className="flex-grow space-y-4 mb-8">
                {features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                        <span className="mt-0.5 rounded-full bg-primary/10 text-primary shrink-0 p-0.5">
                            <Check size={14} strokeWidth={3} />
                        </span>
                        <span className="font-sans text-sm text-text-muted leading-tight">{feature}</span>
                    </li>
                ))}
            </ul>

            <button
                onClick={handleSelect}
                className={`w-full py-3.5 rounded-xl font-sans font-semibold text-sm transition-colors ${offer.recommended
                    ? 'bg-primary text-dark hover:bg-primary-dark'
                    : 'bg-dark text-text hover:bg-border border border-border'
                    }`}
            >
                {t('formations.choosePlan')}
            </button>
        </div>
    );
};

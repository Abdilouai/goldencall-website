import React from 'react';
import { useTranslation } from 'react-i18next';
import { Check, Sparkles, FileText } from 'lucide-react';
import { FrenchPack } from '../config/frenchCourses';

interface FrenchPackCardProps {
    pack: FrenchPack;
    onSelect: (pack: FrenchPack) => void;
}

export const FrenchPackCard: React.FC<FrenchPackCardProps> = ({ pack, onSelect }) => {
    const { t } = useTranslation();

    const handleMouseEnter = () => {
        if (typeof window !== 'undefined' && (window as any).fbq) {
            (window as any).fbq('track', 'ViewContent', {
                content_name: `${pack.name}${pack.subtitle ? ` — ${pack.subtitle}` : ''}`,
                content_category: 'French Course',
                value: pack.price,
                currency: 'TND'
            });
        }
    };

    const handleClick = () => {
        if (typeof window !== 'undefined' && (window as any).fbq) {
            (window as any).fbq('track', 'InitiateCheckout', {
                content_name: `${pack.name}${pack.subtitle ? ` — ${pack.subtitle}` : ''}`,
                content_category: 'French Course',
                value: pack.price,
                currency: 'TND'
            });
        }
        onSelect(pack);
    };

    return (
        <div
            onMouseEnter={handleMouseEnter}
            className={`relative flex flex-col bg-card rounded-3xl border transition-all duration-300 p-8 hover:-translate-y-1 hover:shadow-2xl ${
                pack.recommended
                    ? 'border-primary/80 shadow-xl shadow-primary/10 ring-1 ring-primary/40'
                    : 'border-border hover:border-primary/30 hover:shadow-primary/5'
            }`}
        >
            {pack.recommended && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-primary text-dark font-sans font-bold text-[10px] tracking-wider uppercase px-4 py-1.5 rounded-full shadow-md shadow-primary/20 flex items-center gap-1.5 z-10">
                    <Sparkles size={12} className="fill-current" />
                    {t('formations.recommended', 'RECOMMANDÉ')}
                </div>
            )}

            {/* Header: Title & Subtitle */}
            <div className="mb-6">
                {pack.subtitle && (
                    <div className="text-[11px] font-sans font-bold uppercase tracking-widest text-primary mb-1">
                        {pack.subtitle}
                    </div>
                )}
                <h3 className="font-heading text-2xl text-text font-bold mb-3 tracking-tight">
                    {pack.name}
                </h3>

                {/* Price Display: 140 DT/mois */}
                <div className="flex items-baseline gap-1.5 pt-2 border-t border-border/40">
                    <span className="font-sans text-4xl font-extrabold text-primary tracking-tight">
                        {pack.price}
                    </span>
                    <span className="font-sans text-base font-bold text-text">
                        DT
                    </span>
                    <span className="font-sans text-sm text-text-muted">
                        {t('formations.perMonth', '/ mois')}
                    </span>
                </div>
            </div>

            {/* Features list strictly in French */}
            <ul className="flex-grow space-y-3.5 mb-8 pt-2">
                {pack.features.map((feature, idx) => {
                    const isPdfSupport = feature.toLowerCase().includes('pdf') || feature.toLowerCase().includes('supports');
                    return (
                        <li key={idx} className="flex items-start gap-3">
                            <span className="mt-0.5 rounded-full bg-primary/10 text-primary shrink-0 p-1">
                                {isPdfSupport ? (
                                    <FileText size={13} className="text-primary" />
                                ) : (
                                    <Check size={13} strokeWidth={3} />
                                )}
                            </span>
                            <span className="font-sans text-sm text-text-muted leading-relaxed">
                                {feature}
                            </span>
                        </li>
                    );
                })}
            </ul>

            {/* Action button */}
            <button
                type="button"
                onClick={handleClick}
                className={`w-full py-4 rounded-xl font-sans font-bold text-sm transition-all duration-200 shadow-md ${
                    pack.recommended
                        ? 'bg-primary text-dark hover:bg-primary-dark shadow-primary/20 hover:shadow-lg hover:shadow-primary/30'
                        : 'bg-dark text-text hover:bg-border border border-border hover:border-primary/40'
                }`}
            >
                {t('formations.choosePlan', 'Choisir ce plan →')}
            </button>
        </div>
    );
};

import React from 'react';
import { useTranslation } from 'react-i18next';
import { Check, Sparkles, FileText, CalendarDays, ArrowRight } from 'lucide-react';
import { FrenchPack } from '../config/frenchCourses';

interface FrenchPackCardProps {
    pack: FrenchPack;
    onSelect: (pack: FrenchPack) => void;
}

// Packs already reported to the Pixel during this page view, so a repeated
// hover on the same card does not send a duplicate ViewContent event.
const viewedPacks = new Set<string>();

export const FrenchPackCard: React.FC<FrenchPackCardProps> = ({ pack, onSelect }) => {
    const { t } = useTranslation();

    const handleMouseEnter = () => {
        if (viewedPacks.has(pack.id)) return;
        viewedPacks.add(pack.id);
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

    // The session count gets its own chip, so it is dropped from the bullet
    // list rather than printed twice.
    const features = pack.sessionsCount
        ? pack.features.filter(f => f !== pack.sessionsCount)
        : pack.features;

    return (
        <div
            onMouseEnter={handleMouseEnter}
            className={`group relative flex flex-col bg-card rounded-3xl border transition-all duration-300 p-7 md:p-8 hover:-translate-y-1.5 ${
                pack.recommended
                    ? 'border-primary/70 shadow-xl shadow-primary/10 ring-1 ring-primary/30'
                    : 'border-border hover:border-primary/40 hover:shadow-2xl hover:shadow-primary/5'
            }`}
        >
            {/* Soft gold wash that fades in on hover */}
            <div className="pointer-events-none absolute inset-0 rounded-3xl bg-gradient-to-b from-primary/[0.07] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

            {pack.recommended && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-primary text-dark font-sans font-bold text-[10px] tracking-wider uppercase px-4 py-1.5 rounded-full shadow-md shadow-primary/20 flex items-center gap-1.5 z-10">
                    <Sparkles size={12} className="fill-current" />
                    {t('formations.recommended', 'RECOMMANDÉ')}
                </div>
            )}

            <div className="relative z-10 flex flex-col flex-grow">
                {/* Level chip on the left, level name on the right */}
                <div className="flex items-center justify-between gap-3 mb-4 min-h-[1.75rem]">
                    {pack.level && (
                        <span className="font-sans font-bold text-xs tracking-wider text-primary bg-primary/10 border border-primary/25 rounded-lg px-2.5 py-1">
                            {pack.level}
                        </span>
                    )}
                    <span className="font-sans font-bold text-[10px] uppercase tracking-widest text-text-muted text-right">
                        {pack.subtitle || ' '}
                    </span>
                </div>

                <h3 className="font-heading text-2xl md:text-[1.7rem] text-text font-bold tracking-tight">
                    {pack.name}
                </h3>

                {/* Sessions per month, promoted out of the bullet list. The row keeps
                    its height when a pack has no session count, so the divider and the
                    feature lists stay level across a row of cards. */}
                <div className="mt-4 min-h-[2.125rem]">
                    {pack.sessionsCount && (
                        <div className="inline-flex items-center gap-2 bg-dark/60 border border-border rounded-xl px-3 py-2">
                            <CalendarDays size={14} className="text-primary shrink-0" />
                            <span className="font-sans font-semibold text-xs text-text">
                                {pack.sessionsCount}
                            </span>
                        </div>
                    )}
                </div>

                <div className="h-px bg-border/70 my-6"></div>

                {/* Programme content — stays in French in every interface language */}
                <ul className="flex-grow space-y-3 mb-7">
                    {features.map((feature, idx) => {
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

                <div className="mt-auto">
                    <p className="font-sans text-[11px] text-text-muted text-center mb-3">
                        {t('frenchCourses.priceOnRequest')}
                    </p>
                    <button
                        type="button"
                        onClick={handleClick}
                        className={`w-full py-3.5 rounded-xl font-sans font-bold text-sm transition-all duration-200 flex items-center justify-center gap-2 ${
                            pack.recommended
                                ? 'bg-primary text-dark hover:bg-primary-dark shadow-lg shadow-primary/20 hover:shadow-primary/30'
                                : 'bg-dark text-text border border-border hover:border-primary/50 hover:text-primary'
                        }`}
                    >
                        {t('frenchCourses.choosePack')}
                        <ArrowRight size={16} className="transition-transform duration-200 group-hover:translate-x-0.5" />
                    </button>
                </div>
            </div>
        </div>
    );
};

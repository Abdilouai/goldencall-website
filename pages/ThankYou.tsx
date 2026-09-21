import React from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation, Link } from 'react-router-dom';
import { CheckCircle2, MessageSquare, ArrowLeft, ShieldCheck } from 'lucide-react';
import { SEO } from '../components/SEO';

export const ThankYou: React.FC = () => {
    const { t } = useTranslation();
    const location = useLocation();
    
    // Retrieve applicant/student name and pack from state if navigated programmatically
    const stateName = location.state?.name;
    const packName = location.state?.packName;
    const subject = location.state?.subject;
    const displayName = stateName || t('thankYou.unknown');

    const whatsappNumber = "+21629373579";
    const customMessage = encodeURIComponent(
        subject === 'French' || packName
            ? `Bonjour Golden Call ! Je viens de m'inscrire au cours de Français : ${packName || 'Pack Français'}. Mon nom est ${displayName}.`
            : `Hello Golden Call! I've just submitted my personalized coaching program request and would love to speed up the confirmation. My name is ${displayName}.`
    );
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${customMessage}`;

    return (
        <div className="min-h-[85vh] flex items-center py-20 relative overflow-hidden bg-dark">
            <SEO
                title="Thank You | Golden Call Consulting"
                description="Your registration has been successfully received. We will contact you within the next 24 hours to begin your customized coaching journey."
                keywords="cabin crew coaching, golden call confirmation, thank you"
                canonicalPath="/thank-you"
            />

            {/* Glowing Accent Orbs */}
            <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[120px] pointer-events-none"></div>
            <div className="absolute bottom-0 right-0 w-80 h-80 bg-primary/5 rounded-full blur-[90px] pointer-events-none"></div>

            <div className="max-w-xl mx-auto px-4 relative z-10 w-full">
                <div className="bg-card border border-border rounded-3xl p-8 md:p-12 shadow-2xl text-center relative overflow-hidden animate-fade-in-up">
                    {/* Corner Accent Line */}
                    <div className="absolute top-0 left-0 w-full h-[3px] bg-gradient-to-r from-primary/50 via-primary to-primary/50"></div>

                    {/* Success Check Badge */}
                    <div className="relative inline-flex items-center justify-center mb-8">
                        <div className="absolute inset-0 bg-primary/20 rounded-full blur-md animate-ping opacity-70" style={{ animationDuration: '3s' }}></div>
                        <div className="relative w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center border border-primary/20 text-primary">
                            <CheckCircle2 size={40} className="stroke-[1.5]" />
                        </div>
                    </div>

                    {/* Localized Heading */}
                    <h1 className="font-heading font-bold text-3xl md:text-4xl text-text mb-4">
                        {t('thankYou.title', { name: displayName })}
                    </h1>
                    
                    <p className="font-sans font-semibold text-primary tracking-wide text-xs uppercase mb-6 flex items-center justify-center gap-1.5">
                        <ShieldCheck size={14} />
                        {t('thankYou.subtitle')}
                    </p>

                    {packName && (
                        <div className="mb-6 p-3 bg-dark/60 border border-primary/30 rounded-2xl">
                            <span className="text-xs text-text-muted font-sans uppercase tracking-wider block mb-1">Pack sélectionné</span>
                            <span className="font-heading font-bold text-lg text-primary">{packName}</span>
                        </div>
                    )}

                    {/* Message Details */}
                    <div className="space-y-4 mb-10 text-text-muted font-sans text-sm md:text-base leading-relaxed">
                        <p>{t('thankYou.msg1')}</p>
                        <p>{t('thankYou.msg2')}</p>
                        <div className="inline-block px-4 py-1.5 bg-dark border border-border rounded-full font-heading font-medium text-xs italic text-primary/80 mt-2">
                            ✨ {t('thankYou.teamNote')}
                        </div>
                    </div>

                    {/* Highly Targeted Call To Actions */}
                    <div className="flex flex-col gap-4">
                        {/* High-Intent WhatsApp Instant Booking Bypass */}
                        <a 
                            href={whatsappUrl} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="flex items-center justify-center gap-2 bg-primary hover:bg-primary-dark text-dark font-sans font-bold text-base md:text-lg py-4 rounded-xl transition-all shadow-lg shadow-primary/20 hover:-translate-y-0.5"
                        >
                            <MessageSquare size={20} className="fill-current" />
                            {t('thankYou.whatsapp')}
                        </a>

                        {/* Back home */}
                        <Link 
                            to="/" 
                            className="flex items-center justify-center gap-1.5 border border-border hover:border-primary/50 text-text-muted hover:text-text font-sans font-semibold text-sm py-3.5 rounded-xl transition-all bg-dark/40"
                        >
                            <ArrowLeft size={16} />
                            {t('thankYou.backHome')}
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

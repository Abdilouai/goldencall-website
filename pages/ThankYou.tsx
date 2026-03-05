import React from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation, Link, Navigate } from 'react-router-dom';
import { CheckCircle, MessageCircle } from 'lucide-react';

export const ThankYou: React.FC = () => {
    const { t } = useTranslation();
    const location = useLocation();

    // Redirect if someone navigates here directly
    if (!location.state || !location.state.name) {
        return <Navigate to="/" replace />;
    }

    const name = location.state.name;
    const whatsappNumber = "+21650000000";

    return (
        <div className="min-h-screen pt-20 pb-32 bg-dark flex items-center justify-center border-t border-border mt-16">
            <div className="max-w-md w-full mx-auto px-4 text-center">
                <div className="relative inline-block mb-8">
                    <div className="absolute inset-0 bg-primary/20 blur-2xl rounded-full animate-pulse"></div>
                    <CheckCircle size={96} className="text-primary relative z-10" strokeWidth={1.5} />
                </div>

                <h1 className="font-heading font-bold text-4xl text-text mb-4">
                    {t('thankYou.title', { name })}
                </h1>

                <p className="font-sans text-lg text-text-muted mb-2">
                    {t('thankYou.msg1')}
                </p>
                <p className="font-sans text-lg text-text-muted mb-12 relative pb-8">
                    {t('thankYou.msg2')}
                    <span className="absolute bottom-0 left-1/4 right-1/4 h-px bg-gradient-to-r from-transparent via-border to-transparent"></span>
                </p>

                <div className="space-y-4">
                    <Link
                        to="/"
                        className="block w-full bg-card hover:bg-border border border-border text-text font-sans font-bold text-lg py-4 rounded-xl transition-all"
                    >
                        {t('thankYou.backHome')}
                    </Link>

                    <a
                        href={`https://wa.me/${whatsappNumber}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-2 w-full bg-green-500/10 hover:bg-green-500/20 border border-green-500/20 text-green-400 font-sans font-bold text-lg py-4 rounded-xl transition-all"
                    >
                        <MessageCircle size={20} />
                        {t('thankYou.whatsapp')}
                    </a>
                </div>
            </div>
        </div>
    );
};

import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation, Link, Navigate } from 'react-router-dom';
import { CheckCircle, MessageCircle, ArrowLeft, Clock, Sparkles } from 'lucide-react';
import { SEO } from '../components/SEO';

export const ThankYou: React.FC = () => {
    const { t } = useTranslation();
    const location = useLocation();
    const [isVisible, setIsVisible] = useState(false);
    const [showContent, setShowContent] = useState(false);
    const [showButtons, setShowButtons] = useState(false);

    // Redirect if someone navigates here directly
    if (!location.state || !location.state.name) {
        return <Navigate to="/" replace />;
    }

    const name = location.state.name;
    const whatsappNumber = "21629373579";

    useEffect(() => {
        // Staggered entrance animations
        const t1 = setTimeout(() => setIsVisible(true), 100);
        const t2 = setTimeout(() => setShowContent(true), 600);
        const t3 = setTimeout(() => setShowButtons(true), 1000);
        return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
    }, []);

    return (
        <div className="min-h-screen pt-20 pb-32 bg-dark flex items-center justify-center border-t border-border mt-16 relative overflow-hidden">
            <SEO
                title="Thank You"
                description="Your registration with Golden Call Consulting has been confirmed. We will contact you within 24 hours."
                canonicalPath="/merci"
            />

            {/* Animated background decorations */}
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-primary/3 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-radial from-primary/5 to-transparent rounded-full blur-2xl"></div>

            {/* Floating particles */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                {[...Array(6)].map((_, i) => (
                    <div
                        key={i}
                        className="absolute w-1 h-1 bg-primary/30 rounded-full"
                        style={{
                            top: `${15 + i * 15}%`,
                            left: `${10 + i * 16}%`,
                            animation: `float ${3 + i * 0.5}s ease-in-out infinite alternate`,
                            animationDelay: `${i * 0.3}s`,
                        }}
                    />
                ))}
            </div>

            <div className="max-w-lg w-full mx-auto px-4 text-center relative z-10">

                {/* Success icon with glow */}
                <div
                    className={`relative inline-block mb-8 transition-all duration-700 ease-out ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-50'}`}
                >
                    {/* Outer glow rings */}
                    <div className="absolute inset-0 bg-primary/10 blur-3xl rounded-full scale-150 animate-pulse"></div>
                    <div className="absolute inset-[-20px] border border-primary/10 rounded-full animate-ping" style={{ animationDuration: '3s' }}></div>
                    <div className="absolute inset-[-40px] border border-primary/5 rounded-full animate-ping" style={{ animationDuration: '4s' }}></div>

                    {/* Inner circle with check */}
                    <div className="relative w-28 h-28 mx-auto bg-gradient-to-br from-primary/20 to-primary/5 border-2 border-primary/40 rounded-full flex items-center justify-center shadow-2xl shadow-primary/20 backdrop-blur-sm">
                        <CheckCircle size={56} className="text-primary drop-shadow-lg" strokeWidth={1.5} />
                    </div>

                    {/* Sparkle accents */}
                    <Sparkles
                        size={20}
                        className="absolute -top-2 -right-2 text-primary/60 animate-bounce"
                        style={{ animationDuration: '2s' }}
                    />
                    <Sparkles
                        size={14}
                        className="absolute -bottom-1 -left-3 text-primary/40 animate-bounce"
                        style={{ animationDuration: '2.5s', animationDelay: '0.5s' }}
                    />
                </div>

                {/* Main content card */}
                <div
                    className={`bg-card/80 backdrop-blur-xl border border-border/50 rounded-3xl p-8 md:p-10 mb-6 shadow-2xl shadow-black/20 transition-all duration-700 ease-out ${showContent ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
                >
                    {/* Title */}
                    <h1 className="font-heading font-bold text-3xl md:text-4xl text-text mb-2">
                        {t('thankYou.title', { name })}
                    </h1>

                    {/* Subtitle badge */}
                    <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 text-primary font-sans text-sm font-medium px-4 py-1.5 rounded-full mb-6">
                        <CheckCircle size={14} />
                        {t('thankYou.subtitle', 'Payment and registration confirmed')}
                    </div>

                    {/* Messages */}
                    <p className="font-sans text-lg text-text-muted mb-3 leading-relaxed">
                        {t('thankYou.msg1')}
                    </p>

                    {/* 24h notice with clock */}
                    <div className="bg-dark/50 border border-border rounded-2xl p-5 mb-6">
                        <div className="flex items-center justify-center gap-3 mb-2">
                            <div className="w-10 h-10 bg-primary/10 border border-primary/20 rounded-full flex items-center justify-center">
                                <Clock size={20} className="text-primary" />
                            </div>
                            <span className="font-heading font-bold text-xl text-primary">24h</span>
                        </div>
                        <p className="font-sans text-text-muted text-sm leading-relaxed">
                            {t('thankYou.msg2')}
                        </p>
                    </div>

                    {/* Team note */}
                    <p className="font-sans text-sm text-primary/80 italic">
                        ✨ {t('thankYou.teamNote', 'Our team is excited to work with you!')}
                    </p>

                    {/* Decorative divider */}
                    <div className="mt-6 relative">
                        <div className="h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent"></div>
                    </div>
                </div>

                {/* Action buttons */}
                <div
                    className={`space-y-3 transition-all duration-700 ease-out ${showButtons ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
                >
                    <Link
                        to="/"
                        className="flex items-center justify-center gap-2 w-full bg-primary text-dark font-sans font-bold text-lg py-4 rounded-xl transition-all hover:-translate-y-1 hover:shadow-xl hover:shadow-primary/20 shadow-lg shadow-primary/10"
                    >
                        <ArrowLeft size={20} />
                        {t('thankYou.backHome')}
                    </Link>

                    <a
                        href={`https://wa.me/${whatsappNumber}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-2 w-full bg-green-500/10 hover:bg-green-500/20 border-2 border-green-500/20 hover:border-green-500/30 text-green-400 font-sans font-bold text-lg py-4 rounded-xl transition-all hover:-translate-y-1"
                    >
                        <MessageCircle size={20} />
                        {t('thankYou.whatsapp')}
                    </a>
                </div>
            </div>

            {/* CSS for custom animations */}
            <style>{`
                @keyframes float {
                    from { transform: translateY(0px) scale(1); opacity: 0.3; }
                    to { transform: translateY(-20px) scale(1.5); opacity: 0.6; }
                }
            `}</style>
        </div>
    );
};

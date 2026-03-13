import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { Sparkles, Send, Loader2, CheckCircle } from 'lucide-react';

export const PersonalizeForm: React.FC = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();

    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsSubmitting(true);

        const formData = new FormData(e.currentTarget);
        const data = {
            fullName: formData.get('fullName'),
            whatsapp: formData.get('whatsapp'),
            email: formData.get('email'),
            objective: formData.get('objective'),
            hoursPerWeek: formData.get('hoursPerWeek'),
        };

        try {
            const response = await fetch('/api/submit-personalized', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            if (response.ok) {
                navigate('/thank-you', { state: { name: data.fullName } });
            } else {
                console.error('Failed to submit');
            }
        } catch (error) {
            console.error('Error submitting form', error);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="bg-card border border-border rounded-3xl p-8 md:p-12 shadow-2xl max-w-3xl mx-auto relative overflow-hidden animate-fade-in-up">
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 blur-3xl rounded-full"></div>

            <div className="relative z-10 mb-8 text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 text-primary rounded-2xl mb-6 border border-primary/20 shadow-lg shadow-primary/10">
                    <Sparkles size={32} />
                </div>
                <h2 className="font-heading font-bold text-3xl md:text-4xl text-text mb-4">
                    {t('personalize.title')}
                </h2>
                <p className="font-sans text-lg text-text-muted">
                    {t('personalize.subtitle')}
                </p>
            </div>

            <form onSubmit={handleSubmit} className="relative z-10 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block font-sans font-medium text-text mb-2 text-sm">{t('personalize.fullName')}</label>
                        <input
                            type="text"
                            name="fullName"
                            required
                            className="w-full bg-dark/50 border border-border rounded-xl px-4 py-3 text-text font-sans focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                            placeholder="John Doe"
                        />
                    </div>
                    <div>
                        <label className="block font-sans font-medium text-text mb-2 text-sm">{t('personalize.email')}</label>
                        <input
                            type="email"
                            name="email"
                            required
                            className="w-full bg-dark/50 border border-border rounded-xl px-4 py-3 text-text font-sans focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                            placeholder="john@example.com"
                        />
                    </div>
                </div>

                <div>
                    <label className="block font-sans font-medium text-text mb-2 text-sm">{t('personalize.whatsapp')}</label>
                    <input
                        type="tel"
                        name="whatsapp"
                        required
                        className="w-full bg-dark/50 border border-border rounded-xl px-4 py-3 text-text font-sans focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                        placeholder="+216 50 000 000"
                    />
                </div>

                <div>
                    <label className="block font-sans font-medium text-text mb-2 text-sm">{t('personalize.objective')}</label>
                    <textarea
                        name="objective"
                        required
                        rows={4}
                        className="w-full bg-dark/50 border border-border rounded-xl px-4 py-3 text-text font-sans focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all resize-none"
                        placeholder={t('personalize.objectivePlaceholder')}
                    ></textarea>
                </div>

                <div>
                    <label className="block font-sans font-medium text-text mb-2 text-sm">{t('personalize.hoursPerWeek')}</label>
                    <textarea
                        name="hoursPerWeek"
                        required
                        rows={2}
                        className="w-full bg-dark/50 border border-border rounded-xl px-4 py-3 text-text font-sans focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all resize-none"
                        placeholder={t('personalize.hoursPlaceholder')}
                    ></textarea>
                </div>

                <div className="pt-4">
                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full flex items-center justify-center gap-2 bg-primary text-dark font-sans font-bold text-lg py-4 rounded-xl transition-all hover:bg-primary-dark hover:-translate-y-1 hover:shadow-xl hover:shadow-primary/20 shadow-lg shadow-primary/10 disabled:opacity-70 disabled:hover:translate-y-0 disabled:cursor-not-allowed"
                    >
                        {isSubmitting ? (
                            <>
                                <Loader2 size={24} className="animate-spin" />
                                {t('personalize.loading')}
                            </>
                        ) : (
                            <>
                                <Send size={24} />
                                {t('personalize.submit')}
                            </>
                        )}
                    </button>
                </div>
            </form>
        </div>
    );
};

import React, { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { GraduationCap, BookCheck, Shield, CheckCircle2, X, MessageSquare, ArrowRight, Loader2 } from 'lucide-react';
import { FRENCH_PACKS, FrenchPack } from '../config/frenchCourses';
import { FrenchPackCard } from '../components/FrenchPackCard';
import { SEO } from '../components/SEO';

export const FrenchCourses: React.FC = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();

    const [activeFilter, setActiveFilter] = useState<'all' | 'general' | 'bac'>('all');
    const [selectedPack, setSelectedPack] = useState<FrenchPack | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const [enrollForm, setEnrollForm] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        city: '',
        contactMethod: 'WhatsApp'
    });

    const filteredPacks = FRENCH_PACKS.filter(pack => {
        if (activeFilter === 'all') return true;
        return pack.category === activeFilter;
    });

    const handleOpenEnroll = (pack: FrenchPack) => {
        setSelectedPack(pack);
        setErrorMessage('');
    };

    const handleCloseEnroll = () => {
        setSelectedPack(null);
    };

    const handleFormSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!selectedPack) return;

        setIsSubmitting(true);
        setErrorMessage('');

        const packFullName = `${selectedPack.name}${selectedPack.subtitle ? ` — ${selectedPack.subtitle}` : ''} (${selectedPack.price} DT/mois)`;
        const todayStr = new Date().toISOString().split('T')[0];

        try {
            const payload = {
                firstName: enrollForm.firstName,
                lastName: enrollForm.lastName,
                email: enrollForm.email,
                phone: enrollForm.phone.startsWith('+') ? enrollForm.phone : `+216 ${enrollForm.phone}`,
                country: 'Tunisia',
                city: enrollForm.city,
                contactMethod: enrollForm.contactMethod,
                interestReason: `French: ${packFullName}`,
                studyMethod: 'Online Classes',
                sessionDate: todayStr,
                sessionTime: '10:00'
            };

            const res = await fetch('/api/book-session', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });

            const data = await res.json().catch(() => null);

            if (res.ok && data?.success) {
                // Fire Meta Pixel Lead Event
                if (typeof window !== 'undefined' && (window as any).fbq) {
                    (window as any).fbq('track', 'Lead', {
                        content_name: packFullName,
                        content_category: 'French Course',
                        value: selectedPack.price,
                        currency: 'TND'
                    });
                }

                // Navigate to thank you page with state
                navigate('/thank-you', {
                    state: {
                        name: `${enrollForm.firstName} ${enrollForm.lastName}`.trim(),
                        packName: packFullName,
                        price: selectedPack.price,
                        subject: 'French'
                    }
                });
            } else {
                setErrorMessage(data?.error || t('frenchCourses.enrollErrorGeneric'));
            }
        } catch (err) {
            console.error('Enrollment error:', err);
            setErrorMessage(t('frenchCourses.enrollErrorNetwork'));
        } finally {
            setIsSubmitting(false);
        }
    };

    // Schema.org Structured Data for French Courses
    const courseSchema = useMemo(() => ({
        "@context": "https://schema.org",
        "@type": "ItemList",
        "name": "Cours de Français en Ligne - Golden Call",
        "description": "Formations de français en ligne de niveau A1 à B2 et préparation intensive au Baccalauréat.",
        "itemListElement": FRENCH_PACKS.map((pack, index) => ({
            "@type": "Course",
            "position": index + 1,
            "name": `${pack.name}${pack.subtitle ? ` — ${pack.subtitle}` : ''}`,
            "description": pack.features.join(', '),
            "provider": {
                "@type": "Organization",
                "name": "Golden Call Consulting",
                "url": "https://www.goldencall.digital"
            },
            "offers": {
                "@type": "Offer",
                "price": pack.price,
                "priceCurrency": "TND",
                "availability": "https://schema.org/InStock"
            },
            "inLanguage": "fr"
        }))
    }), []);

    return (
        <div className="min-h-screen py-24 bg-dark">
            <SEO
                title="Cours de Français en Ligne | Préparation BAC & Niveaux A1-B2"
                description="Packs de français en ligne sur Golden Call : Niveaux A1, A2, B1, B2 et préparation intensive au Baccalauréat. 8 à 12 séances/mois, cours en direct, supports PDF inclus. Paiement en DT."
                keywords="cours francais tunisie, pack bac francais, preparation bac francais en ligne, cours francais baccalaureat, pack a1 a2 b1 b2 francais"
                canonicalPath="/cours-francais"
                jsonLd={courseSchema}
            />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* 1. Header Section */}
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <div className="inline-flex items-center gap-2 bg-card border border-border rounded-full px-4 py-1.5 mb-6">
                        <span className="text-xs">🇫🇷</span>
                        <span className="font-sans font-bold text-[10px] tracking-widest text-primary uppercase">
                            {t('frenchCourses.badge', 'COURS DE FRANÇAIS EN LIGNE · PAIEMENT EN DT')}
                        </span>
                    </div>

                    <h1 className="font-heading font-bold text-4xl md:text-6xl text-text mb-6 tracking-tight">
                        {t('frenchCourses.title', 'Packs Français en Ligne')}
                    </h1>

                    <p className="font-sans text-lg md:text-xl text-text-muted leading-relaxed">
                        {t('frenchCourses.subtitle', 'Des formations complètes adaptées à chaque niveau et une préparation intensive au Baccalauréat. 100% en ligne, avec enseignants certifiés et suivi personnalisé.')}
                    </p>
                </div>

                {/* 2. Category Filter Switcher */}
                <div className="flex justify-center px-4 mb-12 md:mb-16">
                    <div className="flex flex-wrap justify-center gap-2 md:gap-3 bg-card border border-border rounded-3xl md:rounded-full p-2">
                        {[
                            { id: 'all', label: t('frenchCourses.filterAll', 'Tous les packs (6)') },
                            { id: 'general', label: t('frenchCourses.filterGeneral', 'Niveaux A1 — B2 (4)') },
                            { id: 'bac', label: t('frenchCourses.filterBac', 'Spécial BAC (2)') }
                        ].map(filter => (
                            <button
                                key={filter.id}
                                type="button"
                                onClick={() => setActiveFilter(filter.id as any)}
                                className={`font-sans font-bold text-xs sm:text-sm px-5 md:px-8 py-3 rounded-full transition-all whitespace-nowrap ${
                                    activeFilter === filter.id
                                        ? 'bg-primary text-dark shadow-lg shadow-primary/20'
                                        : 'text-text-muted hover:text-text'
                                }`}
                            >
                                {filter.label}
                            </button>
                        ))}
                    </div>
                </div>

                {/* 3. Pack Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-24">
                    {filteredPacks.map(pack => (
                        <FrenchPackCard
                            key={pack.id}
                            pack={pack}
                            onSelect={handleOpenEnroll}
                        />
                    ))}
                </div>

                {/* 4. Trust / Advantages Banner */}
                <div className="bg-card/60 border border-border rounded-3xl p-8 md:p-12 mb-20">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="flex items-start gap-4">
                            <div className="w-12 h-12 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0 text-primary">
                                <GraduationCap size={24} />
                            </div>
                            <div>
                                <h4 className="font-heading font-bold text-lg text-text mb-1">
                                    {t('frenchCourses.feature1Title', 'Enseignants Spécialisés')}
                                </h4>
                                <p className="font-sans text-sm text-text-muted leading-relaxed">
                                    {t('frenchCourses.feature1Desc', 'Des professeurs expérimentés pour vous guider pas à pas dans votre progression orale et écrite.')}
                                </p>
                            </div>
                        </div>

                        <div className="flex items-start gap-4">
                            <div className="w-12 h-12 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0 text-primary">
                                <BookCheck size={24} />
                            </div>
                            <div>
                                <h4 className="font-heading font-bold text-lg text-text mb-1">
                                    {t('frenchCourses.feature2Title', 'Supports & Corrections Inclus')}
                                </h4>
                                <p className="font-sans text-sm text-text-muted leading-relaxed">
                                    {t('frenchCourses.feature2Desc', 'Accédez aux résumés de cours en PDF, aux fiches de révision et aux corrections personnalisées.')}
                                </p>
                            </div>
                        </div>

                        <div className="flex items-start gap-4">
                            <div className="w-12 h-12 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0 text-primary">
                                <Shield size={24} />
                            </div>
                            <div>
                                <h4 className="font-heading font-bold text-lg text-text mb-1">
                                    {t('frenchCourses.feature3Title', 'Paiement Local en DT')}
                                </h4>
                                <p className="font-sans text-sm text-text-muted leading-relaxed">
                                    {t('frenchCourses.feature3Desc', 'Réglez facilement par D17 ou virement bancaire tunisien, sans carte internationale.')}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* 5. Custom / WhatsApp Assistance */}
                <div className="relative py-16 px-8 md:px-12 bg-card border border-primary/20 rounded-3xl overflow-hidden text-center max-w-4xl mx-auto shadow-xl shadow-primary/5">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
                    <div className="relative z-10">
                        <h3 className="font-heading font-bold text-2xl md:text-3xl text-text mb-3">
                            {t('frenchCourses.helpTitle', 'Besoin d’aide pour choisir votre pack ?')}
                        </h3>
                        <p className="font-sans text-text-muted max-w-xl mx-auto mb-8 text-base leading-relaxed">
                            {t('frenchCourses.helpSubtitle', 'Contactez nos conseillers directement sur WhatsApp pour un test de niveau ou pour toute question sur le programme BAC.')}
                        </p>
                        <a
                            href="https://wa.me/21629373579?text=Bonjour%20Golden%20Call%2C%20j%27aimerais%20avoir%20plus%20d%27informations%20sur%20les%20packs%20de%20fran%C3%A7ais."
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 bg-primary hover:bg-primary-dark text-dark font-sans font-bold px-8 py-4 rounded-xl transition-all shadow-lg shadow-primary/20 hover:-translate-y-0.5"
                        >
                            <MessageSquare size={18} className="fill-current" />
                            {t('frenchCourses.chatWhatsapp', 'Discuter sur WhatsApp')}
                            <ArrowRight size={18} />
                        </a>
                    </div>
                </div>
            </div>

            {/* 6. Enrollment Modal */}
            {selectedPack && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-dark/80 backdrop-blur-md animate-fade-in-up">
                    <div className="bg-card border border-border rounded-3xl p-6 md:p-8 max-w-lg w-full relative shadow-2xl overflow-hidden max-h-[90vh] overflow-y-auto">
                        <button
                            type="button"
                            onClick={handleCloseEnroll}
                            className="absolute top-4 right-4 p-2 text-text-muted hover:text-text rounded-full hover:bg-dark transition-colors"
                            aria-label={t('frenchCourses.enrollClose')}
                        >
                            <X size={20} />
                        </button>

                        <div className="mb-6">
                            <div className="inline-block bg-primary/10 border border-primary/20 rounded-full px-3 py-1 mb-2">
                                <span className="font-sans font-bold text-[10px] tracking-wider text-primary uppercase">
                                    {t('frenchCourses.enrollBadge')}
                                </span>
                            </div>
                            <h3 className="font-heading font-bold text-2xl text-text">
                                {selectedPack.name}
                                {selectedPack.subtitle && <span className="text-primary ml-2 font-sans text-base font-semibold">— {selectedPack.subtitle}</span>}
                            </h3>
                            <p className="font-sans text-sm text-text-muted mt-1">
                                {t('frenchCourses.enrollPriceLabel')} <strong className="text-primary font-bold">{selectedPack.price} DT</strong> {t('formations.perMonth')}
                            </p>
                        </div>

                        {errorMessage && (
                            <div className="mb-4 bg-red-500/10 border border-red-500/20 text-red-500 p-3 rounded-xl text-xs font-semibold">
                                {errorMessage}
                            </div>
                        )}

                        <form onSubmit={handleFormSubmit} className="space-y-4">
                            <div className="grid grid-cols-2 gap-3">
                                <div>
                                    <label className="block text-xs font-sans font-semibold text-text mb-1">
                                        {t('frenchCourses.enrollFirstName')} <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        required
                                        value={enrollForm.firstName}
                                        onChange={e => setEnrollForm({ ...enrollForm, firstName: e.target.value })}
                                        placeholder={t('frenchCourses.enrollFirstNamePlaceholder')}
                                        className="w-full bg-dark border border-border rounded-xl px-3.5 py-2.5 text-sm text-text focus:outline-none focus:border-primary transition-colors"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-sans font-semibold text-text mb-1">
                                        {t('frenchCourses.enrollLastName')} <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        required
                                        value={enrollForm.lastName}
                                        onChange={e => setEnrollForm({ ...enrollForm, lastName: e.target.value })}
                                        placeholder={t('frenchCourses.enrollLastNamePlaceholder')}
                                        className="w-full bg-dark border border-border rounded-xl px-3.5 py-2.5 text-sm text-text focus:outline-none focus:border-primary transition-colors"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-xs font-sans font-semibold text-text mb-1">
                                    {t('frenchCourses.enrollEmail')} <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="email"
                                    required
                                    value={enrollForm.email}
                                    onChange={e => setEnrollForm({ ...enrollForm, email: e.target.value })}
                                    placeholder={t('frenchCourses.enrollEmailPlaceholder')}
                                    className="w-full bg-dark border border-border rounded-xl px-3.5 py-2.5 text-sm text-text focus:outline-none focus:border-primary transition-colors"
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-sans font-semibold text-text mb-1">
                                    {t('frenchCourses.enrollPhone')} <span className="text-red-500">*</span>
                                </label>
                                <div className="flex gap-2">
                                    <span className="bg-dark border border-border rounded-xl px-3 py-2.5 text-xs text-text-muted flex items-center font-bold">
                                        🇹🇳 +216
                                    </span>
                                    <input
                                        type="tel"
                                        required
                                        value={enrollForm.phone}
                                        onChange={e => setEnrollForm({ ...enrollForm, phone: e.target.value })}
                                        placeholder={t('frenchCourses.enrollPhonePlaceholder')}
                                        className="flex-1 bg-dark border border-border rounded-xl px-3.5 py-2.5 text-sm text-text focus:outline-none focus:border-primary transition-colors"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-xs font-sans font-semibold text-text mb-1">
                                    {t('frenchCourses.enrollCity')}
                                </label>
                                <input
                                    type="text"
                                    value={enrollForm.city}
                                    onChange={e => setEnrollForm({ ...enrollForm, city: e.target.value })}
                                    placeholder={t('frenchCourses.enrollCityPlaceholder')}
                                    className="w-full bg-dark border border-border rounded-xl px-3.5 py-2.5 text-sm text-text focus:outline-none focus:border-primary transition-colors"
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-sans font-semibold text-text mb-1">
                                    {t('frenchCourses.enrollContactMethod')}
                                </label>
                                <select
                                    value={enrollForm.contactMethod}
                                    onChange={e => setEnrollForm({ ...enrollForm, contactMethod: e.target.value })}
                                    className="w-full bg-dark border border-border rounded-xl px-3.5 py-2.5 text-sm text-text focus:outline-none focus:border-primary transition-colors"
                                >
                                    <option value="WhatsApp">{t('frenchCourses.enrollContactWhatsapp')}</option>
                                    <option value="Phone Call">{t('frenchCourses.enrollContactPhone')}</option>
                                    <option value="Email">{t('frenchCourses.enrollContactEmail')}</option>
                                </select>
                            </div>

                            <div className="pt-2">
                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="w-full bg-primary hover:bg-primary-dark text-dark font-sans font-bold py-3.5 rounded-xl transition-all shadow-lg shadow-primary/20 flex items-center justify-center gap-2 text-sm disabled:opacity-70 disabled:cursor-not-allowed"
                                >
                                    {isSubmitting ? (
                                        <>
                                            <Loader2 size={18} className="animate-spin" />
                                            {t('frenchCourses.enrollSubmitting')}
                                        </>
                                    ) : (
                                        <>
                                            <CheckCircle2 size={18} />
                                            {t('frenchCourses.enrollSubmit', { price: selectedPack.price })}
                                        </>
                                    )}
                                </button>
                            </div>

                            <p className="text-[11px] text-text-muted text-center leading-normal">
                                🔒 {t('frenchCourses.enrollPrivacy')}
                            </p>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

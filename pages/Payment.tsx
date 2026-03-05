import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation, useNavigate, Navigate } from 'react-router-dom';
import { PaymentMethodCard } from '../components/PaymentMethodCard';
import { PAYMENT_CONFIG } from '../config/paymentConfig';
import { UploadCloud, FileImage, X } from 'lucide-react';

export const Payment: React.FC = () => {
    const { t } = useTranslation();
    const location = useLocation();
    const navigate = useNavigate();

    // If user navigates directly to /paiement without selecting a plan, redirect to /formations
    if (!location.state || !location.state.planName) {
        return <Navigate to="/formations" replace />;
    }

    const { planName, price, originalPrice } = location.state;
    const discount = originalPrice ? originalPrice - price : 0;

    const [selectedMethod, setSelectedMethod] = useState<string>('poste');
    const [formData, setFormData] = useState({
        fullName: '',
        phone: '',
        message: ''
    });

    // File upload state
    const [file, setFile] = useState<File | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);

    // Submission state
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);

    // Auto-select poste if it's the only enabled one
    useEffect(() => {
        if (!PAYMENT_CONFIG.poste.enabled) {
            if (PAYMENT_CONFIG.d17.enabled) setSelectedMethod('d17');
            else if (PAYMENT_CONFIG.bank.enabled) setSelectedMethod('bank');
        }
    }, []);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const selectedFile = e.target.files[0];

            // Validate file size and type
            if (selectedFile.size > 5 * 1024 * 1024) {
                setError(t('payment.errorFileSize') || 'File too large (max 5MB)');
                return;
            }

            const validTypes = ['image/jpeg', 'image/png', 'image/webp'];
            if (!validTypes.includes(selectedFile.type)) {
                setError(t('payment.errorFileType') || 'Invalid file type');
                return;
            }

            setFile(selectedFile);
            setPreviewUrl(URL.createObjectURL(selectedFile));
            setError(null);
        }
    };

    const removeFile = () => {
        setFile(null);
        setPreviewUrl(null);
    };

    const copyToClipboard = (text: string) => {
        navigator.clipboard.writeText(text);
        // Add toast notification logic here if desired
    };

    const toBase64 = (file: File): Promise<string> => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => {
                let result = reader.result as string;
                // remove data:image/jpeg;base64, prefix
                result = result.split(',')[1];
                resolve(result);
            };
            reader.onerror = error => reject(error);
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!file || !formData.fullName || !formData.phone) {
            setError(t('payment.errorRequired') || 'A required field is missing');
            return;
        }

        setIsSubmitting(true);
        setError(null);

        try {
            const base64 = await toBase64(file);

            const response = await fetch('/api/payment-request', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    fullName: formData.fullName,
                    phone: formData.phone,
                    method: selectedMethod,
                    planName: planName,
                    amount: price,
                    receiptBase64: base64,
                    receiptFilename: file.name
                })
            });

            if (!response.ok) {
                throw new Error('Payment submission failed');
            }

            // Success
            navigate('/merci', { state: { name: formData.fullName } });

        } catch (err) {
            console.error(err);
            setError(t('payment.errorSubmit') || 'Failed to submit. Try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    const isFormValid = formData.fullName.trim() !== '' && formData.phone.trim() !== '' && file !== null;

    return (
        <div className="min-h-screen py-16 bg-dark">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* Block 1: Order Summary */}
                <div className="bg-card border border-primary/30 rounded-2xl p-6 md:p-8 mb-8 relative overflow-hidden">
                    <div className="absolute -top-12 -right-12 w-40 h-40 bg-primary/5 rounded-full blur-2xl"></div>

                    <h2 className="font-heading font-bold text-2xl text-text mb-6">
                        {t('payment.orderSummary')}
                    </h2>

                    <div className="space-y-4">
                        <div className="flex justify-between items-center py-3 border-b border-border">
                            <span className="font-sans text-text-muted">{t('payment.formation')}</span>
                            <span className="font-sans font-bold text-text">{planName}</span>
                        </div>

                        <div className="flex justify-between items-center py-3 border-b border-border">
                            <span className="font-sans text-text-muted">{t('payment.duration')}</span>
                            <span className="font-sans font-medium text-text">
                                {location.state.period === 'one-time' ? t('payment.oneTime') : t('payment.monthly')}
                            </span>
                        </div>

                        {originalPrice && (
                            <>
                                <div className="flex justify-between items-center py-3 border-b border-border">
                                    <span className="font-sans text-text-muted">{t('payment.originalPriceLabel')}</span>
                                    <span className="font-sans text-text-muted/60 line-through">{originalPrice} {t('payment.tnd')}</span>
                                </div>
                                <div className="flex justify-between items-center py-3 border-b border-border">
                                    <span className="font-sans text-text-muted">{t('payment.discountLabel')}</span>
                                    <span className="font-sans font-medium text-green-400">-{discount} {t('payment.tnd')}</span>
                                </div>
                            </>
                        )}

                        <div className="flex justify-between items-center pt-4">
                            <span className="font-sans font-bold text-lg text-text">{t('payment.totalLabel')}</span>
                            <span className="font-sans font-bold text-3xl text-primary">{price} {t('payment.tnd')}</span>
                        </div>
                    </div>
                </div>

                {/* Block 2: Payment Methods */}
                <h2 className="font-heading font-bold text-2xl text-text mb-6">
                    {t('payment.chooseMethod')}
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                    <PaymentMethodCard
                        id="bank"
                        icon="🏦"
                        title={PAYMENT_CONFIG.bank.label}
                        subtitle={PAYMENT_CONFIG.bank.sublabel}
                        enabled={PAYMENT_CONFIG.bank.enabled}
                        selected={selectedMethod === 'bank'}
                        onSelect={setSelectedMethod}
                    />
                    <PaymentMethodCard
                        id="d17"
                        icon="📱"
                        title={PAYMENT_CONFIG.d17.label}
                        subtitle={PAYMENT_CONFIG.d17.sublabel}
                        enabled={PAYMENT_CONFIG.d17.enabled}
                        selected={selectedMethod === 'd17'}
                        onSelect={setSelectedMethod}
                    />
                    <PaymentMethodCard
                        id="poste"
                        icon="✉️"
                        title={PAYMENT_CONFIG.poste.label}
                        subtitle={PAYMENT_CONFIG.poste.sublabel}
                        enabled={PAYMENT_CONFIG.poste.enabled}
                        selected={selectedMethod === 'poste'}
                        onSelect={setSelectedMethod}
                    />
                </div>

                {/* Block 3: Instructions & Form */}
                <div className="bg-card border border-border rounded-2xl p-6 md:p-8">

                    {/* Instructions Box */}
                    <div className="bg-dark border border-border rounded-xl p-6 mb-8">
                        <h3 className="font-heading font-bold text-xl text-text mb-6">
                            {selectedMethod === 'poste'
                                ? t('payment.postalInstructions')
                                : selectedMethod === 'd17'
                                    ? t('payment.d17Instructions')
                                    : t('payment.bankInstructions')}
                        </h3>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                            {/* Conditional Account Info based on selected method */}
                            <div>
                                <p className="font-sans text-xs text-text-muted uppercase tracking-wider mb-1">
                                    {selectedMethod === 'd17' ? t('payment.d17Phone') : selectedMethod === 'poste' ? t('payment.accountHolder') : t('payment.bankName')}
                                </p>
                                <p className="font-sans font-medium text-text">
                                    {selectedMethod === 'd17'
                                        ? PAYMENT_CONFIG.d17.phone
                                        : selectedMethod === 'poste'
                                            ? PAYMENT_CONFIG.poste.accountHolder
                                            : PAYMENT_CONFIG.bank.bankName}
                                </p>
                            </div>

                            <div>
                                <p className="font-sans text-xs text-text-muted uppercase tracking-wider mb-1">
                                    {selectedMethod === 'd17' ? t('payment.accountHolder') : selectedMethod === 'poste' ? t('payment.ccp') : t('payment.rib')}
                                </p>
                                <div className="flex items-center gap-3">
                                    <p className="font-sans font-medium text-text">
                                        {selectedMethod === 'd17'
                                            ? PAYMENT_CONFIG.d17.accountHolder
                                            : selectedMethod === 'poste'
                                                ? PAYMENT_CONFIG.poste.ccp
                                                : PAYMENT_CONFIG.bank.rib}
                                    </p>
                                    {(selectedMethod === 'poste' || selectedMethod === 'bank') && (
                                        <button
                                            onClick={() => copyToClipboard(selectedMethod === 'poste' ? PAYMENT_CONFIG.poste.ccp : PAYMENT_CONFIG.bank.rib)}
                                            className="text-primary hover:text-primary-dark font-sans text-sm font-bold flex items-center gap-1"
                                        >
                                            {t('payment.copy')}
                                        </button>
                                    )}
                                </div>
                            </div>

                            <div>
                                <p className="font-sans text-xs text-text-muted uppercase tracking-wider mb-1">
                                    {t('payment.amountToTransfer')}
                                </p>
                                <p className="font-sans font-bold text-xl text-primary">
                                    {price} {t('payment.tnd')}
                                </p>
                            </div>
                        </div>

                        <div className="bg-primary/10 border border-primary/20 rounded-lg p-4">
                            <p className="font-sans text-sm text-primary">
                                {selectedMethod === 'poste'
                                    ? t('payment.posteHelp')
                                    : selectedMethod === 'd17'
                                        ? t('payment.d17Help')
                                        : t('payment.bankHelp')}
                            </p>
                        </div>
                    </div>

                    {/* Checkout Form */}
                    <form onSubmit={handleSubmit}>
                        <div className="mb-6">
                            <h3 className="font-heading font-bold text-xl text-text mb-2">
                                {t('payment.confirmFormTitle')}
                            </h3>
                            <p className="font-sans text-text-muted text-sm">
                                {t('payment.confirmFormSubtitle')}
                            </p>
                        </div>

                        {error && (
                            <div className="bg-red-500/10 border border-red-500/20 text-red-500 p-4 rounded-xl mb-6 font-sans text-sm">
                                {error}
                            </div>
                        )}

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                            <div>
                                <label className="block font-sans text-sm font-medium text-text mb-2">
                                    {t('payment.fullName')}
                                </label>
                                <input
                                    type="text"
                                    name="fullName"
                                    value={formData.fullName}
                                    onChange={handleInputChange}
                                    className="w-full bg-dark border border-border rounded-xl px-4 py-3 text-text placeholder-text-muted/50 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block font-sans text-sm font-medium text-text mb-2">
                                    {t('payment.phone')}
                                </label>
                                <input
                                    type="tel"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleInputChange}
                                    placeholder="+216"
                                    className="w-full bg-dark border border-border rounded-xl px-4 py-3 text-text placeholder-text-muted/50 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                                    required
                                />
                            </div>
                        </div>

                        {/* Receipt Upload Area */}
                        <div className="mb-6">
                            <label className="block font-sans text-sm font-medium text-text mb-2">
                                {t('payment.receipt')}
                            </label>

                            {!previewUrl ? (
                                <div className="border-2 border-dashed border-border rounded-xl p-8 hover:border-primary/50 transition-colors bg-dark flex flex-col items-center justify-center relative cursor-pointer">
                                    <input
                                        type="file"
                                        accept="image/jpeg, image/png, image/webp"
                                        onChange={handleFileChange}
                                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                        required
                                    />
                                    <UploadCloud size={32} className="text-text-muted mb-3" />
                                    <p className="font-sans text-sm text-text font-medium mb-1">
                                        {t('payment.receiptHint')}
                                    </p>
                                </div>
                            ) : (
                                <div className="relative border border-border rounded-xl bg-dark p-4 flex flex-col items-center">
                                    <button
                                        type="button"
                                        onClick={removeFile}
                                        className="absolute top-2 right-2 p-1.5 bg-dark border border-border rounded-full hover:bg-border transition-colors z-10"
                                    >
                                        <X size={16} className="text-text" />
                                    </button>
                                    <img
                                        src={previewUrl}
                                        alt="Receipt preview"
                                        className="max-h-48 rounded-lg object-contain"
                                    />
                                    <div className="flex items-center gap-2 mt-4 text-text-muted font-sans text-sm">
                                        <FileImage size={16} />
                                        <span className="truncate max-w-[200px]">{file?.name}</span>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Optional Message */}
                        <div className="mb-8">
                            <label className="block font-sans text-sm font-medium text-text mb-2">
                                {t('payment.message')}
                            </label>
                            <textarea
                                name="message"
                                value={formData.message}
                                onChange={handleInputChange}
                                rows={3}
                                className="w-full bg-dark border border-border rounded-xl px-4 py-3 text-text placeholder-text-muted/50 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all resize-none"
                            ></textarea>
                        </div>

                        <button
                            type="submit"
                            disabled={!isFormValid || isSubmitting}
                            className={`w-full font-sans font-bold text-lg py-4 rounded-xl transition-all shadow-xl shadow-primary/10 ${isFormValid && !isSubmitting
                                    ? 'bg-primary text-dark hover:-translate-y-1 hover:shadow-primary/20'
                                    : 'bg-primary/50 text-dark/50 cursor-not-allowed'
                                }`}
                        >
                            {isSubmitting ? '...' : t('payment.confirmButton')}
                        </button>
                    </form>

                </div>
            </div>
        </div>
    );
};

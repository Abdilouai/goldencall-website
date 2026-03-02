import React, { useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { Building2, Smartphone, Mail, Copy, Check, Upload, AlertCircle, CheckCircle, ArrowLeft } from 'lucide-react';
import { Button } from '../components/Button';
import { PAYMENT_ACCOUNTS } from '../config/paymentConfig';
import { useTranslation } from 'react-i18next';

type PaymentMethod = 'bank' | 'd17' | 'poste' | null;

interface LocationState {
    planName?: string;
    originalPrice?: number;
    discount?: number;
    totalPrice?: number;
}

export const Payment: React.FC = () => {
    const { t } = useTranslation();
    const location = useLocation();
    const state = location.state as LocationState | null;

    // Also support query params as fallback
    const searchParams = new URLSearchParams(location.search);
    const planName = state?.planName || searchParams.get('planName') || 'Coaching Plan';
    const originalPrice = state?.originalPrice || Number(searchParams.get('originalPrice')) || 0;
    const discount = state?.discount || Number(searchParams.get('discount')) || 0;
    const totalPrice = state?.totalPrice || Number(searchParams.get('totalPrice')) || originalPrice - discount;

    const [selectedMethod, setSelectedMethod] = useState<PaymentMethod>(null);
    const [copiedField, setCopiedField] = useState<string | null>(null);
    const [fullName, setFullName] = useState('');
    const [phone, setPhone] = useState('');
    const [receiptFile, setReceiptFile] = useState<File | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
    const [errorMessage, setErrorMessage] = useState('');

    const copyToClipboard = async (text: string, field: string) => {
        try {
            await navigator.clipboard.writeText(text);
            setCopiedField(field);
            setTimeout(() => setCopiedField(null), 2000);
        } catch {
            // Fallback
            const textarea = document.createElement('textarea');
            textarea.value = text;
            document.body.appendChild(textarea);
            textarea.select();
            document.execCommand('copy');
            document.body.removeChild(textarea);
            setCopiedField(field);
            setTimeout(() => setCopiedField(null), 2000);
        }
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        // Validate file type
        const validTypes = ['image/jpeg', 'image/png', 'image/webp'];
        if (!validTypes.includes(file.type)) {
            setErrorMessage(t('payment.errorFileType'));
            return;
        }

        // Validate file size (5MB)
        if (file.size > 5 * 1024 * 1024) {
            setErrorMessage(t('payment.errorFileSize'));
            return;
        }

        setErrorMessage('');
        setReceiptFile(file);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!selectedMethod || !fullName || !phone || !receiptFile) {
            setErrorMessage(t('payment.errorRequired'));
            return;
        }

        setIsSubmitting(true);
        setErrorMessage('');

        try {
            // Convert file to base64
            const reader = new FileReader();
            const base64Promise = new Promise<string>((resolve) => {
                reader.onloadend = () => {
                    const base64 = (reader.result as string).split(',')[1];
                    resolve(base64);
                };
                reader.readAsDataURL(receiptFile);
            });
            const receiptBase64 = await base64Promise;

            const response = await fetch('/api/payment-request', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    fullName,
                    phone,
                    method: selectedMethod,
                    planName,
                    amount: totalPrice.toString(),
                    receiptBase64,
                    receiptFilename: receiptFile.name,
                }),
            });

            if (!response.ok) {
                throw new Error('Failed to submit');
            }

            setSubmitStatus('success');
        } catch {
            setSubmitStatus('error');
            setErrorMessage(t('payment.errorSubmit'));
        } finally {
            setIsSubmitting(false);
        }
    };

    // Success state
    if (submitStatus === 'success') {
        return (
            <div className="min-h-[80vh] flex items-center justify-center bg-light px-4">
                <div className="max-w-lg w-full bg-white p-10 rounded-3xl shadow-lg text-center border border-gray-100">
                    <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                        <CheckCircle className="text-green-500 w-10 h-10" />
                    </div>
                    <h2 className="font-heading font-bold text-3xl text-dark mb-4">{t('payment.successTitle')}</h2>
                    <p className="text-gray-600 mb-8 leading-relaxed">{t('payment.successMessage')}</p>
                    <Link to="/">
                        <Button fullWidth>{t('payment.backToHome')}</Button>
                    </Link>
                </div>
            </div>
        );
    }

    const CopyButton: React.FC<{ text: string; field: string }> = ({ text, field }) => (
        <button
            type="button"
            onClick={() => copyToClipboard(text, field)}
            className="ml-2 p-1.5 rounded-md hover:bg-gray-100 transition-colors text-gray-400 hover:text-primary"
            title={t('payment.copyToClipboard')}
        >
            {copiedField === field ? (
                <span className="flex items-center gap-1 text-green-500 text-xs font-medium">
                    <Check size={14} /> {t('payment.copied')}
                </span>
            ) : (
                <Copy size={14} />
            )}
        </button>
    );

    const paymentMethods = [
        {
            id: 'bank' as const,
            icon: <Building2 size={28} />,
            title: t('payment.bankTransfer'),
            subtitle: t('payment.bankTransferAr'),
            color: 'blue',
        },
        {
            id: 'd17' as const,
            icon: <Smartphone size={28} />,
            title: t('payment.d17'),
            subtitle: `${t('payment.d17Subtitle')} / ${t('payment.d17SubtitleAr')}`,
            color: 'purple',
        },
        {
            id: 'poste' as const,
            icon: <Mail size={28} />,
            title: t('payment.poste'),
            subtitle: `${t('payment.posteSubtitle')} / ${t('payment.posteAr')}`,
            color: 'yellow',
        },
    ];

    return (
        <div className="min-h-screen bg-light py-8 px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto">
                {/* Back Link */}
                <Link to="/dashboard/plans" className="inline-flex items-center gap-2 text-gray-500 hover:text-primary mb-6 text-sm font-medium transition-colors">
                    <ArrowLeft size={16} />
                    <span>{t('plans.title')}</span>
                </Link>

                <h1 className="font-heading font-bold text-3xl text-dark mb-8">{t('payment.pageTitle')}</h1>

                {/* Section 1: Order Summary */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-6">
                    <h2 className="font-heading font-bold text-lg text-dark mb-4">{t('payment.orderSummary')}</h2>
                    <div className="space-y-3">
                        <div className="flex justify-between text-sm">
                            <span className="text-gray-600">{t('payment.plan')}</span>
                            <span className="font-medium text-dark">{planName}</span>
                        </div>
                        {discount > 0 && (
                            <>
                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-600">{t('payment.originalPrice')}</span>
                                    <span className="text-gray-400 line-through">{originalPrice.toFixed(2)} {t('payment.tnd')}</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-600">{t('payment.discount')}</span>
                                    <span className="text-green-500 font-medium">-{discount.toFixed(2)} {t('payment.tnd')}</span>
                                </div>
                            </>
                        )}
                        <div className="border-t border-gray-100 pt-3 flex justify-between">
                            <span className="font-bold text-dark">{t('payment.total')}</span>
                            <span className="font-bold text-xl text-primary">{totalPrice.toFixed(2)} {t('payment.tnd')}</span>
                        </div>
                    </div>
                </div>

                {/* Section 2: Payment Method Selector */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-6">
                    <h2 className="font-heading font-bold text-lg text-dark mb-4">{t('payment.selectMethod')}</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        {paymentMethods.map((method) => (
                            <button
                                key={method.id}
                                type="button"
                                onClick={() => setSelectedMethod(method.id)}
                                className={`p-5 rounded-xl border-2 transition-all text-left flex flex-col items-center text-center gap-3 hover:shadow-md ${selectedMethod === method.id
                                    ? 'border-primary bg-blue-50 shadow-md ring-2 ring-primary/20'
                                    : 'border-gray-200 hover:border-gray-300'
                                    }`}
                            >
                                <div className={`p-3 rounded-full ${selectedMethod === method.id ? 'bg-primary text-white' : 'bg-gray-100 text-gray-600'
                                    }`}>
                                    {method.icon}
                                </div>
                                <div>
                                    <p className="font-semibold text-dark text-sm">{method.title}</p>
                                    <p className="text-xs text-gray-500 mt-0.5">{method.subtitle}</p>
                                </div>
                            </button>
                        ))}
                    </div>
                </div>

                {/* Section 3: Payment Instructions */}
                {selectedMethod && (
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-6 animate-in fade-in">
                        <h2 className="font-heading font-bold text-lg text-dark mb-4">{t('payment.paymentInstructions')}</h2>

                        <div className="bg-gray-50 rounded-xl p-5 space-y-4">
                            {selectedMethod === 'bank' && (
                                <>
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <p className="text-xs text-gray-500 uppercase tracking-wide">{t('payment.bankName')}</p>
                                            <p className="font-medium text-dark">{PAYMENT_ACCOUNTS.bank.bankName}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <p className="text-xs text-gray-500 uppercase tracking-wide">{t('payment.accountHolder')}</p>
                                            <p className="font-medium text-dark">{PAYMENT_ACCOUNTS.bank.accountHolder}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <div className="flex-1">
                                            <p className="text-xs text-gray-500 uppercase tracking-wide">{t('payment.rib')}</p>
                                            <p className="font-mono font-medium text-dark">{PAYMENT_ACCOUNTS.bank.rib}</p>
                                        </div>
                                        <CopyButton text={PAYMENT_ACCOUNTS.bank.rib} field="bank-rib" />
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <p className="text-xs text-gray-500 uppercase tracking-wide">{t('payment.amount')}</p>
                                            <p className="font-bold text-primary text-lg">{totalPrice.toFixed(2)} {t('payment.tnd')}</p>
                                        </div>
                                    </div>
                                </>
                            )}

                            {selectedMethod === 'd17' && (
                                <>
                                    <div className="flex items-center justify-between">
                                        <div className="flex-1">
                                            <p className="text-xs text-gray-500 uppercase tracking-wide">{t('payment.phoneNumber')}</p>
                                            <p className="font-mono font-medium text-dark">{PAYMENT_ACCOUNTS.d17.phone}</p>
                                        </div>
                                        <CopyButton text={PAYMENT_ACCOUNTS.d17.phone} field="d17-phone" />
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <p className="text-xs text-gray-500 uppercase tracking-wide">{t('payment.accountHolder')}</p>
                                            <p className="font-medium text-dark">{PAYMENT_ACCOUNTS.d17.accountHolder}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <p className="text-xs text-gray-500 uppercase tracking-wide">{t('payment.amount')}</p>
                                            <p className="font-bold text-primary text-lg">{totalPrice.toFixed(2)} {t('payment.tnd')}</p>
                                        </div>
                                    </div>
                                    <div className="mt-2 p-3 bg-blue-50 rounded-lg">
                                        <p className="text-sm text-blue-700">{t('payment.d17Instructions')}</p>
                                    </div>
                                </>
                            )}

                            {selectedMethod === 'poste' && (
                                <>
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <p className="text-xs text-gray-500 uppercase tracking-wide">{t('payment.accountHolder')}</p>
                                            <p className="font-medium text-dark">{PAYMENT_ACCOUNTS.poste.accountHolder}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <div className="flex-1">
                                            <p className="text-xs text-gray-500 uppercase tracking-wide">{t('payment.postalRib')}</p>
                                            <p className="font-mono font-medium text-dark">{PAYMENT_ACCOUNTS.poste.ccp}</p>
                                        </div>
                                        <CopyButton text={PAYMENT_ACCOUNTS.poste.ccp} field="poste-ccp" />
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <p className="text-xs text-gray-500 uppercase tracking-wide">{t('payment.amount')}</p>
                                            <p className="font-bold text-primary text-lg">{totalPrice.toFixed(2)} {t('payment.tnd')}</p>
                                        </div>
                                    </div>
                                    <div className="mt-2 p-3 bg-blue-50 rounded-lg">
                                        <p className="text-sm text-blue-700">{t('payment.posteInstructions')}</p>
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                )}

                {/* Section 4: Confirmation Form */}
                {selectedMethod && (
                    <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 animate-in fade-in">
                        <h2 className="font-heading font-bold text-lg text-dark mb-4">{t('payment.confirmationForm')}</h2>

                        {errorMessage && (
                            <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-4">
                                <div className="flex items-center">
                                    <AlertCircle className="text-red-500 mr-2" size={20} />
                                    <p className="text-red-700 text-sm">{errorMessage}</p>
                                </div>
                            </div>
                        )}

                        <div className="space-y-4">
                            {/* Full Name */}
                            <div>
                                <label htmlFor="paymentFullName" className="block text-sm font-medium text-gray-700 mb-1">
                                    {t('payment.fullName')} *
                                </label>
                                <input
                                    type="text"
                                    id="paymentFullName"
                                    required
                                    value={fullName}
                                    onChange={(e) => setFullName(e.target.value)}
                                    placeholder={t('payment.fullNamePlaceholder')}
                                    className="w-full rounded-lg border border-gray-300 shadow-sm focus:border-primary focus:ring-primary py-2.5 px-3 text-sm"
                                />
                            </div>

                            {/* Phone Number */}
                            <div>
                                <label htmlFor="paymentPhone" className="block text-sm font-medium text-gray-700 mb-1">
                                    {t('payment.phone')} *
                                </label>
                                <input
                                    type="tel"
                                    id="paymentPhone"
                                    required
                                    value={phone}
                                    onChange={(e) => setPhone(e.target.value)}
                                    placeholder={t('payment.phonePlaceholder')}
                                    className="w-full rounded-lg border border-gray-300 shadow-sm focus:border-primary focus:ring-primary py-2.5 px-3 text-sm"
                                />
                            </div>

                            {/* Receipt Upload */}
                            <div>
                                <label htmlFor="receiptUpload" className="block text-sm font-medium text-gray-700 mb-1">
                                    {t('payment.receipt')} *
                                </label>
                                <p className="text-xs text-gray-500 mb-2">{t('payment.receiptHint')}</p>
                                <div className="relative">
                                    <input
                                        type="file"
                                        id="receiptUpload"
                                        accept=".jpg,.jpeg,.png,.webp"
                                        required
                                        onChange={handleFileChange}
                                        className="hidden"
                                    />
                                    <label
                                        htmlFor="receiptUpload"
                                        className={`flex items-center justify-center gap-2 w-full py-4 px-4 border-2 border-dashed rounded-xl cursor-pointer transition-colors ${receiptFile
                                            ? 'border-green-300 bg-green-50 text-green-700'
                                            : 'border-gray-300 hover:border-primary hover:bg-blue-50 text-gray-500'
                                            }`}
                                    >
                                        {receiptFile ? (
                                            <>
                                                <Check size={20} className="text-green-500" />
                                                <span className="text-sm font-medium">{receiptFile.name}</span>
                                            </>
                                        ) : (
                                            <>
                                                <Upload size={20} />
                                                <span className="text-sm">{t('payment.receipt')}</span>
                                            </>
                                        )}
                                    </label>
                                </div>
                            </div>
                        </div>

                        {/* Submit */}
                        <div className="mt-6">
                            <Button
                                type="submit"
                                fullWidth
                                disabled={isSubmitting}
                                className={`text-base py-3 ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
                            >
                                {isSubmitting ? (
                                    <span className="flex items-center gap-2">
                                        <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        {t('payment.submitting')}
                                    </span>
                                ) : (
                                    <span>{t('payment.submit')} / {t('payment.submitAr')}</span>
                                )}
                            </Button>
                        </div>
                    </form>
                )}
            </div>
        </div>
    );
};

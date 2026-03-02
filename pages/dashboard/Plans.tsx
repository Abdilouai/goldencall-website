import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Check, Star } from 'lucide-react';
import { Button } from '../../components/Button';
import { useTranslation } from 'react-i18next';

export const Plans: React.FC = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();

    const PLANS = [
        {
            id: '1',
            name: t('plans.plan1Name'),
            price: 150,
            description: t('plans.plan1Desc'),
            features: [t('plans.plan1Feature1'), t('plans.plan1Feature2'), t('plans.plan1Feature3'), t('plans.plan1Feature4')],
            popular: true,
        },
        {
            id: '2',
            name: t('plans.plan2Name'),
            price: 180,
            description: t('plans.plan2Desc'),
            features: [t('plans.plan2Feature1'), t('plans.plan2Feature2'), t('plans.plan2Feature3'), t('plans.plan2Feature4')],
            popular: false,
        },
        {
            id: '3',
            name: t('plans.plan3Name'),
            price: 90,
            description: t('plans.plan3Desc'),
            features: [t('plans.plan3Feature1'), t('plans.plan3Feature2'), t('plans.plan3Feature3'), t('plans.plan3Feature4')],
            popular: false,
        },
    ];

    const handlePurchase = (plan: typeof PLANS[0]) => {
        navigate('/payment', {
            state: {
                planName: plan.name,
                totalPrice: plan.price,
                originalPrice: plan.price,
                discount: 0,
            },
        });
    };

    return (
        <div className="space-y-8">
            <div className="text-center max-w-2xl mx-auto">
                <h1 className="font-heading font-bold text-3xl text-dark mb-4">{t('plans.title')}</h1>
                <p className="text-gray-500">{t('plans.subtitle')}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {PLANS.map((plan) => (
                    <div
                        key={plan.id}
                        className={`relative bg-white rounded-2xl shadow-sm border ${plan.popular ? 'border-primary ring-2 ring-primary/10' : 'border-gray-100'
                            } p-8 flex flex-col`}
                    >
                        {plan.popular && (
                            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-primary text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide">
                                {t('plans.mostPopular')}
                            </div>
                        )}

                        <div className="mb-6">
                            <h3 className="font-heading font-bold text-xl text-dark mb-2">{plan.name}</h3>
                            <p className="text-gray-500 text-sm h-10">{plan.description}</p>
                        </div>

                        <div className="mb-6">
                            <span className="text-4xl font-bold text-dark">{plan.price}</span>
                            <span className="text-gray-400 ml-1">{t('payment.tnd')}</span>
                            <span className="text-gray-400">{t('plans.oneTime')}</span>
                        </div>

                        <ul className="space-y-3 mb-8 flex-1">
                            {plan.features.map((feature, i) => (
                                <li key={i} className="flex items-start gap-3 text-sm text-gray-600">
                                    <Check size={16} className="text-green-500 mt-0.5 flex-shrink-0" />
                                    {feature}
                                </li>
                            ))}
                        </ul>

                        <Button
                            onClick={() => handlePurchase(plan)}
                            variant={plan.popular ? 'primary' : 'outline'}
                            fullWidth
                            className={plan.popular ? 'shadow-lg shadow-blue-500/20' : ''}
                        >
                            {t('plans.getStarted')}
                        </Button>
                    </div>
                ))}
            </div>

            <div className="bg-slate-900 rounded-2xl p-8 text-white text-center">
                <Star className="w-12 h-12 text-gold mx-auto mb-4" />
                <h3 className="font-heading font-bold text-2xl mb-2">{t('plans.notSure')}</h3>
                <p className="text-gray-400 mb-6">{t('plans.notSureDesc')}</p>
                <Button className="bg-gold text-dark hover:bg-yellow-400 border-none">{t('plans.startFreeAssessment')}</Button>
            </div>
        </div>
    );
};

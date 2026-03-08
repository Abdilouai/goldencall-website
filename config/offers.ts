export type ProgramType = 'cabin-crew' | 'ielts' | 'interview';

export type Offer = {
    id: string;
    program: ProgramType;
    name: string;
    nameFr: string;
    price: number;
    priceUsd?: number;
    originalPrice?: number;
    originalPriceUsd?: number;
    billingPeriod: 'monthly' | 'one-time';
    featuresFr: string[];
    featuresEn: string[];
    recommended?: boolean;
};

export const OFFERS: Offer[] = [
    // Cabin Crew Preparations
    {
        id: 'cc-essentiel',
        program: 'cabin-crew',
        name: 'Essentiel',
        nameFr: 'Essentiel',
        price: 199,
        priceUsd: 150,
        originalPrice: 250,
        originalPriceUsd: 190,
        billingPeriod: 'monthly',
        featuresFr: [
            '4 sessions / mois (1h chacune)',
            'Supports de cours en PDF',
            'Accès aux ressources en ligne',
            'Feedback après chaque session'
        ],
        featuresEn: [
            '4 sessions / month (1h each)',
            'Course materials in PDF',
            'Access to online resources',
            'Feedback after each session'
        ]
    },
    {
        id: 'cc-premium',
        program: 'cabin-crew',
        name: 'Premium',
        nameFr: 'Premium',
        price: 349,
        priceUsd: 260,
        originalPrice: 420,
        originalPriceUsd: 315,
        billingPeriod: 'monthly',
        recommended: true,
        featuresFr: [
            '8 sessions / mois (1h chacune)',
            'Mock interview filmé + analyse',
            'Coaching grooming & présentation',
            'Préparation English aviation',
            'Suivi WhatsApp illimité'
        ],
        featuresEn: [
            '8 sessions / month (1h each)',
            'Filmed mock interview + analysis',
            'Grooming & presentation coaching',
            'Aviation English preparation',
            'Unlimited WhatsApp support'
        ]
    },
    {
        id: 'cc-intensif',
        program: 'cabin-crew',
        name: 'Intensif',
        nameFr: 'Intensif',
        price: 599,
        priceUsd: 450,
        billingPeriod: 'one-time',
        featuresFr: [
            'Sessions illimitées',
            'Tout le Premium',
            'CV review + LinkedIn',
            'Garantie résultat'
        ],
        featuresEn: [
            'Unlimited sessions',
            'Everything in Premium',
            'CV review + LinkedIn',
            'Result guarantee'
        ]
    },

    // IELTS / ESL
    {
        id: 'ielts-prep',
        program: 'ielts',
        name: 'IELTS Preparation',
        nameFr: 'Préparation IELTS',
        price: 250,
        priceUsd: 190,
        billingPeriod: 'monthly',
        recommended: true,
        featuresFr: [
            '8 sessions / mois',
            'Tests blancs Speaking & Writing',
            'Correction détaillée',
            'Vocabulaire académique'
        ],
        featuresEn: [
            '8 sessions / month',
            'Speaking & Writing mock tests',
            'Detailed correction',
            'Academic vocabulary'
        ]
    },
    {
        id: 'ielts-intensive',
        program: 'ielts',
        name: 'Intensive Boot Camp',
        nameFr: 'Bootcamp Intensif',
        price: 499,
        priceUsd: 375,
        billingPeriod: 'one-time',
        featuresFr: [
            'Accompagnement quotidien',
            'Mock exams complets',
            "Garantie d'amélioration du score",
            'Support linguistique 7/7'
        ],
        featuresEn: [
            'Daily support',
            'Full mock exams',
            'Score improvement guarantee',
            '24/7 linguistic support'
        ]
    },

    // Professional Interview
    {
        id: 'pro-basic',
        program: 'interview',
        name: 'CV & Review',
        nameFr: 'Révision CV & Profil',
        price: 99,
        priceUsd: 75,
        billingPeriod: 'one-time',
        featuresFr: [
            'Refonte complète du CV',
            'Optimisation LinkedIn',
            '1 session de debriefing (45 min)'
        ],
        featuresEn: [
            'Complete CV redesign',
            'LinkedIn optimization',
            '1 debriefing session (45 min)'
        ]
    },
    {
        id: 'pro-mock',
        program: 'interview',
        name: 'Simulation Master',
        nameFr: 'Master Simulation',
        price: 180,
        priceUsd: 135,
        billingPeriod: 'one-time',
        recommended: true,
        featuresFr: [
            '2 Mock interviews complets',
            'Questions techniques & soft skills',
            'Analyse du langage corporel',
            'Rapport détaillé'
        ],
        featuresEn: [
            '2 Full mock interviews',
            'Technical & soft skill questions',
            'Body language analysis',
            'Detailed report'
        ]
    }
];

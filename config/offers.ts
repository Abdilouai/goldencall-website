export type ProgramType = 'cabin-crew' | 'ielts' | 'interview';

export type Offer = {
    id: string;
    program: ProgramType;
    name: string;
    nameFr: string;
    price: number;
    originalPrice?: number;
    billingPeriod: 'monthly' | 'one-time';
    features: string[];
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
        originalPrice: 250,
        billingPeriod: 'monthly',
        features: [
            '4 sessions / mois (1h chacune)',
            'Supports de cours en PDF',
            'Accès aux ressources en ligne',
            'Feedback après chaque session'
        ]
    },
    {
        id: 'cc-premium',
        program: 'cabin-crew',
        name: 'Premium',
        nameFr: 'Premium',
        price: 349,
        originalPrice: 420,
        billingPeriod: 'monthly',
        recommended: true,
        features: [
            '8 sessions / mois (1h chacune)',
            'Mock interview filmé + analyse',
            'Coaching grooming & présentation',
            'Préparation English aviation',
            'Suivi WhatsApp illimité'
        ]
    },
    {
        id: 'cc-intensif',
        program: 'cabin-crew',
        name: 'Intensif',
        nameFr: 'Intensif',
        price: 599,
        billingPeriod: 'one-time',
        features: [
            'Sessions illimitées',
            'Tout le Premium',
            'CV review + LinkedIn',
            'Garantie résultat'
        ]
    },

    // IELTS / ESL
    {
        id: 'ielts-prep',
        program: 'ielts',
        name: 'IELTS Preparation',
        nameFr: 'Préparation IELTS',
        price: 250,
        billingPeriod: 'monthly',
        recommended: true,
        features: [
            '8 sessions / mois',
            'Tests blancs Speaking & Writing',
            'Correction détaillée',
            'Vocabulaire académique'
        ]
    },
    {
        id: 'ielts-intensive',
        program: 'ielts',
        name: 'Intensive Boot Camp',
        nameFr: 'Bootcamp Intensif',
        price: 499,
        billingPeriod: 'one-time',
        features: [
            'Accompagnement quotidien',
            'Mock exams complets',
            "Garantie d'amélioration du score",
            'Support linguistique 7/7'
        ]
    },

    // Professional Interview
    {
        id: 'pro-basic',
        program: 'interview',
        name: 'CV & Review',
        nameFr: 'Révision CV & Profil',
        price: 99,
        billingPeriod: 'one-time',
        features: [
            'Refonte complète du CV',
            'Optimisation LinkedIn',
            '1 session de debriefing (45 min)'
        ]
    },
    {
        id: 'pro-mock',
        program: 'interview',
        name: 'Simulation Master',
        nameFr: 'Master Simulation',
        price: 180,
        billingPeriod: 'one-time',
        recommended: true,
        features: [
            '2 Mock interviews complets',
            'Questions techniques & soft skills',
            'Analyse du langage corporel',
            'Rapport détaillé'
        ]
    }
];

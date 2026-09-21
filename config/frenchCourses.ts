export interface FrenchPack {
    id: string;
    subject: 'french';
    name: string;
    subtitle?: string;
    level?: string;
    price: number; // in DT
    currency: 'DT';
    billingPeriod: 'monthly';
    sessionsCount?: string;
    category: 'general' | 'bac';
    features: string[];
    recommended?: boolean;
}

export const FRENCH_PACKS: FrenchPack[] = [
    {
        id: 'french-a1',
        subject: 'french',
        name: 'PACK A1',
        subtitle: 'Débutant',
        price: 140,
        currency: 'DT',
        billingPeriod: 'monthly',
        sessionsCount: '8 séances / mois',
        category: 'general',
        features: [
            '8 séances / mois',
            'Grammaire + vocabulaire',
            'Compréhension orale et écrite',
            'Expression orale',
            'Exercices + corrections',
            'Supports PDF inclus'
        ]
    },
    {
        id: 'french-a2',
        subject: 'french',
        name: 'PACK A2',
        subtitle: 'Élémentaire',
        price: 150,
        currency: 'DT',
        billingPeriod: 'monthly',
        sessionsCount: '8 séances / mois',
        category: 'general',
        features: [
            '8 séances / mois',
            'Grammaire + conjugaison',
            'Vocabulaire',
            'Production écrite',
            'Expression orale',
            'Supports + exercices corrigés'
        ]
    },
    {
        id: 'french-b1',
        subject: 'french',
        name: 'PACK B1',
        subtitle: 'Intermédiaire',
        price: 160,
        currency: 'DT',
        billingPeriod: 'monthly',
        sessionsCount: '8 séances / mois',
        category: 'general',
        features: [
            '8 séances / mois',
            'Grammaire avancée',
            'Compréhension de documents',
            'Production écrite',
            'Conversation',
            'Préparation aux évaluations'
        ]
    },
    {
        id: 'french-b2',
        subject: 'french',
        name: 'PACK B2',
        subtitle: 'Avancé',
        price: 170,
        currency: 'DT',
        billingPeriod: 'monthly',
        sessionsCount: '8 séances / mois',
        category: 'general',
        features: [
            '8 séances / mois',
            'Perfectionnement grammatical',
            'Argumentation',
            'Expression orale',
            'Production écrite',
            'Analyse de textes'
        ]
    },
    {
        id: 'french-bac',
        subject: 'french',
        name: 'PACK BAC',
        subtitle: 'Objectif Réussite',
        price: 180,
        currency: 'DT',
        billingPeriod: 'monthly',
        category: 'bac',
        recommended: true,
        features: [
            'Cours de français',
            'Grammaire + conjugaison',
            'Procédés d’écriture',
            'Compréhension de texte',
            'Production écrite',
            'Thèse / antithèse',
            'Connecteurs logiques',
            'Sujets de bac + corrections',
            'Examens blancs',
            'Suivi individuel'
        ]
    },
    {
        id: 'french-bac-intensif',
        subject: 'french',
        name: 'PACK INTENSIF BAC',
        price: 250,
        currency: 'DT',
        billingPeriod: 'monthly',
        sessionsCount: '12 séances / mois',
        category: 'bac',
        features: [
            '12 séances / mois',
            'Exercices supplémentaires',
            'Corrections personnalisées',
            'Suivi des progrès',
            'Sujets type bac',
            'Examens blancs'
        ]
    }
];

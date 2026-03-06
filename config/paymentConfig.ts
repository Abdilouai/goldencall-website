export const PAYMENT_CONFIG = {
    poste: {
        enabled: true,
        accountHolder: 'Golden Call Consulting',
        ccp: '17000000000000000000', // Example placeholder, client will fill in the real one
        label: 'La Poste Tunisienne',
        sublabel: 'Virement CCP',
    },
    d17: {
        enabled: false,  // set to true when ready
        phone: '+216 50 000 000',
        accountHolder: 'Golden Call Consulting',
        label: 'D17',
        sublabel: 'Paiement mobile',
    },
    bank: {
        enabled: false,  // set to true when ready
        bankName: 'Banque de Tunisie',
        accountHolder: 'Golden Call Consulting',
        rib: '05000000000000000000',
        label: 'Virement Bancaire',
        sublabel: 'Virement bancaire',
    },
    stripe: {
        enabled: true,
        label: 'Paiement International',
        sublabel: 'Carte Bancaire (Stripe)',
    },
};

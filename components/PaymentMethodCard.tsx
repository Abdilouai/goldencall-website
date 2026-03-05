import React from 'react';

export const PaymentMethodCard: React.FC<{
    id: string;
    icon: string;
    title: string;
    subtitle: string;
    enabled: boolean;
    selected: boolean;
    onSelect: (id: string) => void;
}> = ({ id, icon, title, subtitle, enabled, selected, onSelect }) => {
    return (
        <button
            disabled={!enabled}
            onClick={() => onSelect(id)}
            className={`relative flex flex-col items-center justify-center p-6 rounded-2xl border-2 transition-all w-full
        ${!enabled ? 'opacity-50 cursor-not-allowed bg-card border-border' : ''}
        ${enabled && !selected ? 'bg-card border-border hover:border-primary/50' : ''}
        ${selected ? 'bg-primary/5 border-primary shadow-lg shadow-primary/10' : ''}
      `}
        >
            <div className="text-4xl mb-3">{icon}</div>
            <div className="font-heading font-bold text-text mb-1">{title}</div>
            <div className="font-sans text-xs text-text-muted text-center">{subtitle}</div>

            {!enabled && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-border text-text-muted font-sans text-[10px] uppercase tracking-wider px-3 py-1 rounded-full whitespace-nowrap">
                    Bientôt disponible
                </div>
            )}
        </button>
    );
};

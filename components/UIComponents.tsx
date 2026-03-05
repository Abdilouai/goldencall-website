import React, { useEffect, useState, useRef } from 'react';
import { Star } from 'lucide-react';

export const TestimonialCard: React.FC<{
    name: string;
    role: string;
    quote: string;
    image?: string;
}> = ({ name, role, quote, image }) => {
    return (
        <div className="min-w-[300px] md:min-w-[400px] bg-card border border-border rounded-2xl p-8 flex flex-col shrink-0">
            <div className="flex gap-1 mb-6">
                {[...Array(5)].map((_, i) => (
                    <Star key={i} size={16} className="fill-primary text-primary" />
                ))}
            </div>
            <p className="font-sans text-text-muted text-base leading-relaxed mb-8 flex-grow">
                "{quote}"
            </p>
            <div className="flex items-center gap-4 mt-auto">
                <div className="w-12 h-12 rounded-full bg-dark overflow-hidden shrink-0 border border-border">
                    {image ? (
                        <img src={image} alt={name} className="w-full h-full object-cover" />
                    ) : (
                        <div className="w-full h-full flex items-center justify-center text-primary font-heading font-bold text-xl">
                            {name.charAt(0)}
                        </div>
                    )}
                </div>
                <div>
                    <h4 className="font-sans font-bold text-text text-sm">{name}</h4>
                    <p className="font-sans text-text-muted text-xs mt-0.5">{role}</p>
                </div>
            </div>
        </div>
    );
};

export const StatCounter: React.FC<{
    target: number;
    label: string;
    prefix?: string;
    suffix?: string;
}> = ({ target, label, prefix = '', suffix = '' }) => {
    const [count, setCount] = useState(0);
    const ref = useRef<HTMLDivElement>(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting) {
                    setIsVisible(true);
                }
            },
            { threshold: 0.1 }
        );

        if (ref.current) {
            observer.observe(ref.current);
        }

        return () => observer.disconnect();
    }, []);

    useEffect(() => {
        if (!isVisible) return;

        let startTimestamp: number;
        const duration = 2000; // 2 seconds

        const step = (timestamp: number) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);

            setCount(Math.floor(progress * target));

            if (progress < 1) {
                window.requestAnimationFrame(step);
            }
        };

        window.requestAnimationFrame(step);
    }, [isVisible, target]);

    return (
        <div ref={ref} className="text-center">
            <div className="font-heading font-bold text-4xl md:text-5xl text-primary mb-2">
                {prefix}{count}{suffix}
            </div>
            <div className="font-sans text-sm text-text-muted uppercase tracking-wider">
                {label}
            </div>
        </div>
    );
};

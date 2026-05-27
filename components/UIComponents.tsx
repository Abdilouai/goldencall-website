import React, { useEffect, useState, useRef } from 'react';
import { Star } from 'lucide-react';

export const TestimonialCard: React.FC<{
    name: string;
    role: string;
    quote: string;
    successMilestone?: string;
    rating?: number;
    image?: string;
}> = ({ name, role, quote, successMilestone, rating = 5, image }) => {
    return (
        <div className="flex flex-col bg-card border border-border/60 rounded-3xl p-8 md:p-10 shadow-xl transition-all duration-300 hover:border-primary/30 hover:shadow-2xl hover:shadow-primary/5 group relative overflow-hidden">
            {/* Top-Right Success Milestone Badge */}
            {successMilestone && (
                <div className="absolute top-4 right-4 bg-primary/10 border border-primary/20 rounded-full px-3 py-1">
                    <span className="font-sans font-bold text-[9px] tracking-wider text-primary uppercase">
                        ✓ {successMilestone}
                    </span>
                </div>
            )}

            {/* Stars */}
            <div className="flex gap-1.5 mb-6">
                {[...Array(rating)].map((_, i) => (
                    <Star key={i} size={14} className="fill-primary text-primary stroke-[1]" />
                ))}
            </div>

            {/* Quote Block */}
            <blockquote className="font-sans text-text/90 text-[15px] md:text-base leading-relaxed mb-8 flex-grow italic relative">
                <span className="text-primary font-heading text-4xl leading-none absolute -top-3 -left-2 opacity-25 pointer-events-none">“</span>
                <p className="relative z-10 pl-4 border-l border-primary/20">
                    {quote}
                </p>
            </blockquote>

            {/* Author details */}
            <div className="flex items-center gap-4 mt-auto pt-6 border-t border-border/30">
                <div className="w-12 h-12 rounded-full overflow-hidden shrink-0 border border-primary/10 bg-dark/60 flex items-center justify-center relative group-hover:border-primary/35 transition-all">
                    {image ? (
                        <img src={image} alt={name} className="w-full h-full object-cover" />
                    ) : (
                        <div className="w-full h-full flex items-center justify-center text-primary font-heading font-semibold text-lg bg-gradient-to-br from-primary/5 to-primary/15">
                            {name.charAt(0)}
                        </div>
                    )}
                </div>
                <div>
                    <h4 className="font-sans font-bold text-text text-sm tracking-wide group-hover:text-primary transition-colors">{name}</h4>
                    <p className="font-sans text-text-muted text-xs mt-0.5 tracking-wider uppercase font-semibold">{role}</p>
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

import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

interface SEOProps {
    title?: string;
    description?: string;
    keywords?: string;
    canonicalPath?: string;
    ogType?: 'website' | 'article';
    ogImage?: string;
    jsonLd?: Record<string, unknown>;
}

/**
 * Lightweight SEO hook-component that manipulates <head> tags directly.
 * No external dependency needed — works with any Vite/React SPA.
 */
export const SEO: React.FC<SEOProps> = ({
    title,
    description,
    keywords,
    canonicalPath,
    ogType = 'website',
    ogImage = 'https://www.goldencall.digital/images/og-image.jpg',
    jsonLd,
}) => {
    const { i18n } = useTranslation();
    const siteName = 'Golden Call Consulting';
    const baseUrl = 'https://www.goldencall.digital';
    const fullTitle = title ? `${title} | ${siteName}` : `${siteName} | Cabin Crew English Training & IELTS Coaching`;
    const currentLang = i18n.language?.startsWith('fr') ? 'fr' : (i18n.language?.startsWith('ar') ? 'ar' : 'en');
    const canonical = canonicalPath ? `${baseUrl}${canonicalPath}` : baseUrl;

    const defaultDesc =
        currentLang === 'fr'
            ? 'Formation personnalisée pour personnel navigant, coaching entretien et préparation IELTS. Réservez votre session individuelle avec Golden Call Consulting.'
            : 'Expert cabin crew English training, interview coaching, and IELTS speaking lessons. Serving candidates worldwide. Book your 1-on-1 session today.';

    const finalDescription = description || defaultDesc;

    useEffect(() => {
        // Title
        document.title = fullTitle;

        // Lang attribute
        document.documentElement.lang = currentLang;

        // Helper to set or create a meta tag
        const setMeta = (attr: string, key: string, content: string) => {
            let el = document.querySelector(`meta[${attr}="${key}"]`) as HTMLMetaElement | null;
            if (!el) {
                el = document.createElement('meta');
                el.setAttribute(attr, key);
                document.head.appendChild(el);
            }
            el.setAttribute('content', content);
        };

        // Primary meta
        setMeta('name', 'description', finalDescription);
        if (keywords) setMeta('name', 'keywords', keywords);

        // Canonical
        let link = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
        if (!link) {
            link = document.createElement('link');
            link.setAttribute('rel', 'canonical');
            document.head.appendChild(link);
        }
        link.setAttribute('href', canonical);

        // Open Graph
        setMeta('property', 'og:type', ogType);
        setMeta('property', 'og:url', canonical);
        setMeta('property', 'og:title', fullTitle);
        setMeta('property', 'og:description', finalDescription);
        setMeta('property', 'og:image', ogImage);
        setMeta('property', 'og:site_name', siteName);

        // Twitter
        setMeta('name', 'twitter:card', 'summary_large_image');
        setMeta('name', 'twitter:url', canonical);
        setMeta('name', 'twitter:title', fullTitle);
        setMeta('name', 'twitter:description', finalDescription);
        setMeta('name', 'twitter:image', ogImage);

        // JSON-LD structured data
        const existingScript = document.getElementById('seo-jsonld');
        if (jsonLd) {
            if (existingScript) {
                existingScript.textContent = JSON.stringify(jsonLd);
            } else {
                const script = document.createElement('script');
                script.id = 'seo-jsonld';
                script.type = 'application/ld+json';
                script.textContent = JSON.stringify(jsonLd);
                document.head.appendChild(script);
            }
        } else if (existingScript) {
            existingScript.remove();
        }

        // Cleanup on unmount — restore defaults
        return () => {
            document.title = `${siteName} | Cabin Crew English Training & IELTS Coaching`;
            if (existingScript) existingScript.remove();
        };
    }, [fullTitle, finalDescription, keywords, canonical, ogType, ogImage, jsonLd, currentLang]);

    return null; // This component renders nothing — it only manages <head>
};

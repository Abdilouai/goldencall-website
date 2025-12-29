import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

// Google Analytics tracking
export const usePageTracking = () => {
  const location = useLocation();

  useEffect(() => {
    // Track page view with Google Analytics
    if (typeof window.gtag !== 'undefined') {
      window.gtag('config', 'G-XXXXXXXXXX', {
        page_path: location.pathname + location.search,
      });
    }

    // Track page view with Vercel Analytics (for SPAs)
    if (typeof window.va !== 'undefined') {
      window.va('pageview', {
        path: location.pathname + location.search,
      });
    }

    // Optional: Track with custom analytics API
    trackPageView(location.pathname);
  }, [location]);
};

// Custom analytics tracking function
const trackPageView = async (path: string) => {
  try {
    await fetch('/api/analytics', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        path,
        timestamp: new Date().toISOString(),
        referrer: document.referrer,
        userAgent: navigator.userAgent,
      }),
    });
  } catch (error) {
    console.error('Analytics tracking failed:', error);
  }
};

// TypeScript declarations
declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
    va?: (event: string, data?: any) => void;
  }
}

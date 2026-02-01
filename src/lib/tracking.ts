import { useLocation } from 'react-router-dom';
import { useEffect } from 'react';

// Extend window interface to include dataLayer
declare global {
    interface Window {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        dataLayer: any[];
    }
}

/**
 * Push an event to the dataLayer
 * @param eventName - The name of the event (e.g., 'page_view', 'form_submit')
 * @param eventData - Additional data to send with the event
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const trackEvent = (eventName: string, eventData: Record<string, any> = {}) => {
    if (typeof window !== 'undefined') {
        window.dataLayer = window.dataLayer || [];
        window.dataLayer.push({
            event: eventName,
            ...eventData,
            timestamp: new Date().toISOString(),
        });
    }
};

/**
 * Hook to track page views automatically on route change
 */
export const usePageTracking = () => {
    const location = useLocation();

    useEffect(() => {
        trackEvent('page_view', {
            page_path: location.pathname + location.search,
            page_title: document.title,
        });
    }, [location]);
};

/**
 * Initialize dataLayer if it doesn't exist
 */
export const initTracking = () => {
    if (typeof window !== 'undefined') {
        window.dataLayer = window.dataLayer || [];
    }
};

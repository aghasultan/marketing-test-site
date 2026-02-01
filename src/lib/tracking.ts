import { useLocation } from 'react-router-dom';
import { useEffect } from 'react';

// Extend window interface to include dataLayer
declare global {
    interface Window {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        dataLayer: any[];
    }
}

// Analytics Event Types
export type AnalyticsEvent =
    | 'page_view'
    | 'wizard_start'
    | 'wizard_step_view'
    | 'wizard_complete'
    | 'calculator_interaction'
    | 'audit_scan_start'
    | 'audit_scan_complete';

/**
 * Push an event to the dataLayer
 * @param eventName - The name of the event (e.g., 'page_view', 'form_submit')
 * @param eventData - Additional data to send with the event
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const trackEvent = (eventName: AnalyticsEvent | string, eventData: Record<string, any> = {}) => {
    if (typeof window !== 'undefined') {
        window.dataLayer = window.dataLayer || [];

        const payload = {
            event: eventName,
            ...eventData,
            timestamp: new Date().toISOString(),
        };

        window.dataLayer.push(payload);

        // Dev Logging
        if (import.meta.env.DEV) {
            console.groupCollapsed(`📊 Analytics: ${eventName}`);
            console.log(payload);
            console.groupEnd();
        }
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

import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { trackVisitor } from '../utils/visitorTracking';

/**
 * Custom hook to track page views on route changes
 */
export const usePageTracking = () => {
    const location = useLocation();

    useEffect(() => {
        // Track visitor on each page change
        trackVisitor();
    }, [location.pathname]);
}; 
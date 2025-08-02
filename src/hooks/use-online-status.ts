import { useState, useEffect } from 'react';

const getOnlineStatus = (): boolean => {
    if (typeof navigator !== 'undefined') {
        return navigator.onLine;
    }
    // Default to true for server-side rendering
    return true;
};

export const useOnlineStatus = (): boolean => {
    const [isOnline, setIsOnline] = useState<boolean>(getOnlineStatus());

    useEffect(() => {
        const handleOnline = () => setIsOnline(true);
        const handleOffline = () => setIsOnline(false);

        window.addEventListener('online', handleOnline);
        window.addEventListener('offline', handleOffline);

        // Clean up event listeners on component unmount
        return () => {
            window.removeEventListener('online', handleOnline);
            window.removeEventListener('offline', handleOffline);
        };
    }, []);

    return isOnline;
};
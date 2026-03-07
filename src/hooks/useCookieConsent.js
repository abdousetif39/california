// hooks/useCookieConsent.js
import { useState, useEffect } from 'react';

export function useCookieConsent() {
    const [consent, setConsent] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        if (typeof window !== "undefined") {
            const storedConsent = localStorage.getItem("cookieConsentData");
            
            if (storedConsent) {
                try {
                    const parsed = JSON.parse(storedConsent);
                    // التحقق من الصلاحية (مثلاً 6 أشهر = 180 يوم)
                    const isExpired = Date.now() - parsed.timestamp > 180 * 24 * 60 * 60 * 1000;
                    
                    if (!isExpired) {
                        setConsent(parsed.preferences);
                    } else {
                        // حذف الكوكيز إذا انتهت صلاحيتها لطلب الموافقة مجدداً
                        localStorage.removeItem("cookieConsentData");
                    }
                } catch (error) {
                    console.error("Error parsing cookie consent data:", error);
                }
            }
            setIsLoaded(true);
        }
    }, []);

    const updateConsent = (preferences) => {
        const consentData = {
            preferences,
            timestamp: Date.now()
        };
        
        localStorage.setItem("cookieConsentData", JSON.stringify(consentData));
        setConsent(preferences);

        // إرسال التحديث إلى Google Consent Mode v2
        if (typeof window !== "undefined" && window.gtag) {
            window.gtag('consent', 'update', {
                ad_storage: preferences.marketing ? 'granted' : 'denied',
                analytics_storage: preferences.analytics ? 'granted' : 'denied',
                ad_user_data: preferences.marketing ? 'granted' : 'denied',
                ad_personalization: preferences.marketing ? 'granted' : 'denied',
            });
        }
    };

    return { consent, updateConsent, isLoaded };
}
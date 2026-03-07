// components/CookieBanner.js
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useCookieConsent } from '../hooks/useCookieConsent';

export default function CookieBanner() {
    const { consent, updateConsent, isLoaded } = useCookieConsent();
    const [showBanner, setShowBanner] = useState(false);
    const [showPreferences, setShowPreferences] = useState(false);
    
    // حالة التفضيلات المؤقتة قبل الحفظ
    const [preferences, setPreferences] = useState({
        necessary: true, // دائماً true ولا يمكن تغييرها
        analytics: false,
        marketing: false
    });

    useEffect(() => {
        // إظهار الشريط فقط إذا تم التحميل ولم تكن هناك موافقة مسبقة
        if (isLoaded && consent === null) {
            // تأخير بسيط لإعطاء تأثير دخول سلس (Animation)
            const timer = setTimeout(() => setShowBanner(true), 500);
            return () => clearTimeout(timer);
        }
    }, [isLoaded, consent]);

    const handleAcceptAll = () => {
        updateConsent({ necessary: true, analytics: true, marketing: true });
        setShowBanner(false);
    };

    const handleRejectAll = () => {
        updateConsent({ necessary: true, analytics: false, marketing: false });
        setShowBanner(false);
    };

    const handleSavePreferences = () => {
        updateConsent(preferences);
        setShowBanner(false);
        setShowPreferences(false);
    };

    const togglePreference = (key) => {
        setPreferences(prev => ({ ...prev, [key]: !prev[key] }));
    };

    if (!isLoaded || (consent !== null && !showBanner)) return null;

    return (
        <div 
            role="dialog" 
            aria-live="polite" 
            aria-label="Cookie consent banner"
            className={`fixed bottom-0 left-0 right-0 z-50 transition-transform duration-700 ease-in-out ${showBanner ? 'translate-y-0' : 'translate-y-full'}`}
        >
            <div className="bg-slate-900 border-t border-slate-700 shadow-[0_-10px_40px_rgba(0,0,0,0.5)]">
                <div className="max-w-7xl mx-auto p-4 md:p-6">
                    
                    {/* واجهة التفضيلات (Manage Preferences) */}
                    {showPreferences ? (
                        <div className="space-y-6 animate-fade-in">
                            <div className="flex justify-between items-center border-b border-slate-700 pb-4">
                                <h3 className="text-xl font-bold text-white">Manage Cookie Preferences</h3>
                                <button onClick={() => setShowPreferences(false)} className="text-slate-400 hover:text-white transition">
                                    ✕
                                </button>
                            </div>
                            
                            <div className="space-y-4">
                                {/* Necessary Cookies */}
                                <div className="flex items-center justify-between">
                                    <div>
                                        <h4 className="font-semibold text-slate-200">Strictly Necessary</h4>
                                        <p className="text-sm text-slate-400">Required for the website to function.</p>
                                    </div>
                                    <div className="text-blue-500 font-bold text-sm bg-blue-500/10 px-3 py-1 rounded-full">Always Active</div>
                                </div>

                                {/* Analytics Cookies */}
                                <div className="flex items-center justify-between border-t border-slate-700 pt-4">
                                    <div>
                                        <h4 className="font-semibold text-slate-200">Analytics</h4>
                                        <p className="text-sm text-slate-400">Help us understand how visitors interact with our website.</p>
                                    </div>
                                    <label className="relative inline-flex items-center cursor-pointer">
                                        <input type="checkbox" className="sr-only peer" checked={preferences.analytics} onChange={() => togglePreference('analytics')} />
                                        <div className="w-11 h-6 bg-slate-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                                    </label>
                                </div>

                                {/* Marketing Cookies */}
                                <div className="flex items-center justify-between border-t border-slate-700 pt-4">
                                    <div>
                                        <h4 className="font-semibold text-slate-200">Marketing & Ads</h4>
                                        <p className="text-sm text-slate-400">Used to deliver personalized advertisements (AdSense).</p>
                                    </div>
                                    <label className="relative inline-flex items-center cursor-pointer">
                                        <input type="checkbox" className="sr-only peer" checked={preferences.marketing} onChange={() => togglePreference('marketing')} />
                                        <div className="w-11 h-6 bg-slate-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                                    </label>
                                </div>
                            </div>

                            <div className="flex gap-4 pt-4">
                                <button onClick={handleSavePreferences} className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-xl transition-all">
                                    Save Preferences
                                </button>
                            </div>
                        </div>
                    ) : (
                        /* الواجهة الأساسية (Banner) */
                        <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
                            <div className="text-slate-300 text-sm md:text-base text-center lg:text-left leading-relaxed flex-grow">
                                We use cookies to enhance your browsing experience, serve personalized ads, and analyze our traffic. 
                                By clicking "Accept All", you consent to our use of cookies.
                                <Link href="/privacy" className="text-blue-400 hover:text-blue-300 font-semibold underline ml-2 whitespace-nowrap">
                                    Privacy Policy
                                </Link>
                            </div>

                            <div className="flex flex-col sm:flex-row w-full lg:w-auto gap-3 flex-shrink-0">
                                <button 
                                    onClick={() => setShowPreferences(true)}
                                    className="w-full sm:w-auto bg-transparent border-2 border-slate-600 text-slate-300 hover:bg-slate-800 hover:text-white font-bold py-2.5 px-6 rounded-xl transition-all focus:outline-none focus:ring-2 focus:ring-slate-500"
                                >
                                    Manage
                                </button>
                                <button 
                                    onClick={handleRejectAll}
                                    className="w-full sm:w-auto bg-slate-700 hover:bg-slate-600 text-white font-bold py-2.5 px-6 rounded-xl transition-all focus:outline-none focus:ring-2 focus:ring-slate-500"
                                >
                                    Reject All
                                </button>
                                <button 
                                    onClick={handleAcceptAll}
                                    className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white font-bold py-2.5 px-8 rounded-xl transition-all shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                >
                                    Accept All
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
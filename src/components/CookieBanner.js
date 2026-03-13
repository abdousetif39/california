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

    // 1. عند الضغط على الموافقة على الكل
    const handleAcceptAll = () => {
        updateConsent({ necessary: true, analytics: true, marketing: true });
        setShowBanner(false);

        // إخبار جوجل بأن المستخدم وافق على الإعلانات والإحصائيات
        if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
            window.gtag('consent', 'update', {
                'ad_storage': 'granted',
                'analytics_storage': 'granted',
                'ad_user_data': 'granted',
                'ad_personalization': 'granted'
            });
        }
    };

    // 2. عند الضغط على الرفض
    const handleRejectAll = () => {
        updateConsent({ necessary: true, analytics: false, marketing: false });
        setShowBanner(false);
        
        // إخبار جوجل بتأكيد الرفض
        if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
            window.gtag('consent', 'update', {
                'ad_storage': 'denied',
                'analytics_storage': 'denied',
                'ad_user_data': 'denied',
                'ad_personalization': 'denied'
            });
        }
    };

    // 3. عند الضغط على حفظ التفضيلات المخصصة
    const handleSavePreferences = () => {
        updateConsent(preferences);
        setShowBanner(false);
        setShowPreferences(false);

        // تحديث جوجل بناءً على اختيارات المستخدم الدقيقة
        if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
            window.gtag('consent', 'update', {
                'ad_storage': preferences.marketing ? 'granted' : 'denied',
                'analytics_storage': preferences.analytics ? 'granted' : 'denied',
                'ad_user_data': preferences.marketing ? 'granted' : 'denied',
                'ad_personalization': preferences.marketing ? 'granted' : 'denied'
            });
        }
    };

    // تبديل أزرار التفضيلات (تشغيل/إيقاف)
    const togglePreference = (key) => {
        setPreferences(prev => ({ ...prev, [key]: !prev[key] }));
    };

    // إذا كان الشريط مخفياً، لا تقم بعرض أي شيء
    if (!showBanner) return null;

    return (
        <div className="fixed bottom-0 left-0 right-0 z-50 p-4 sm:p-6 md:p-8 pointer-events-none">
            <div className="max-w-6xl mx-auto pointer-events-auto">
                <div className="bg-slate-900 text-slate-300 p-6 sm:p-8 rounded-2xl shadow-2xl border border-slate-700/50 backdrop-blur-md">
                    
                    {showPreferences ? (
                        /* ----- واجهة إدارة التفضيلات (Manage) ----- */
                        <div className="space-y-6">
                            <div>
                                <h3 className="text-xl font-bold text-white mb-2">Cookie Preferences</h3>
                                <p className="text-sm text-slate-400">Manage how we use cookies on our site.</p>
                            </div>
                            
                            <div className="space-y-4">
                                {/* ملفات الارتباط الضرورية */}
                                <div className="flex items-center justify-between p-4 bg-slate-800/50 rounded-xl border border-slate-700">
                                    <div>
                                        <h4 className="text-white font-semibold">Strictly Necessary</h4>
                                        <p className="text-xs text-slate-400 mt-1">Required for the website to function properly.</p>
                                    </div>
                                    <div className="text-blue-400 font-bold text-sm">Always Active</div>
                                </div>

                                {/* إحصائيات جوجل */}
                                <div className="flex items-center justify-between p-4 bg-slate-800/50 rounded-xl border border-slate-700">
                                    <div>
                                        <h4 className="text-white font-semibold">Analytics Cookies</h4>
                                        <p className="text-xs text-slate-400 mt-1">Help us improve by measuring website usage (Google Analytics).</p>
                                    </div>
                                    <label className="relative inline-flex items-center cursor-pointer">
                                        <input type="checkbox" className="sr-only peer" checked={preferences.analytics} onChange={() => togglePreference('analytics')} />
                                        <div className="w-11 h-6 bg-slate-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                                    </label>
                                </div>

                                {/* إعلانات جوجل */}
                                <div className="flex items-center justify-between p-4 bg-slate-800/50 rounded-xl border border-slate-700">
                                    <div>
                                        <h4 className="text-white font-semibold">Marketing & Ads</h4>
                                        <p className="text-xs text-slate-400 mt-1">Used to deliver relevant advertisements (Google AdSense).</p>
                                    </div>
                                    <label className="relative inline-flex items-center cursor-pointer">
                                        <input type="checkbox" className="sr-only peer" checked={preferences.marketing} onChange={() => togglePreference('marketing')} />
                                        <div className="w-11 h-6 bg-slate-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                                    </label>
                                </div>
                            </div>

                            <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-slate-700">
                                <button onClick={() => setShowPreferences(false)} className="w-full sm:w-auto bg-transparent border-2 border-slate-600 text-slate-300 hover:bg-slate-800 hover:text-white font-bold py-2.5 px-6 rounded-xl transition-all focus:outline-none focus:ring-2 focus:ring-slate-500">Back</button>
                                <div className="flex-1"></div>
                                <button onClick={handleSavePreferences} className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white font-bold py-2.5 px-8 rounded-xl transition-all shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500">Save Preferences</button>
                            </div>
                        </div>
                    ) : (
                        /* ----- الواجهة الرئيسية لشريط الموافقة ----- */
                        <div className="flex flex-col lg:flex-row items-start lg:items-center gap-6 lg:gap-8">
                            <div className="flex-1">
                                <h3 className="text-xl font-bold text-white mb-2">We value your privacy</h3>
                                <p className="text-sm text-slate-400 leading-relaxed">
                                    We use cookies to enhance your browsing experience, serve personalized ads or content, and analyze our traffic. By clicking "Accept All", you consent to our use of cookies. 
                                    <Link href="/privacy" className="text-blue-400 hover:text-blue-300 hover:underline ml-1">Read our Privacy Policy.</Link>
                                </p>
                            </div>
                            <div className="flex flex-col sm:flex-row w-full lg:w-auto gap-3 shrink-0">
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
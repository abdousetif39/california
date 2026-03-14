import Head from 'next/head';
import Script from 'next/script'; // استيراد مكون Script من Next.js
import { useState, useEffect } from 'react';
import Navbar from './Navbar';
import SiteFooter from './SiteFooter';
import CookieBanner from './CookieBanner'; // استيراد إشعار الكوكيز
import { SpeedInsights } from "@vercel/speed-insights/next"
import { Analytics } from "@vercel/analytics/next"

export default function Layout({ children }) {
    const [currentUrl, setCurrentUrl] = useState("https://californiataxcalculators.com");

    useEffect(() => {
        if (typeof window !== 'undefined') {
            setCurrentUrl(window.location.href);
        }
    }, []);

    return (
        <div className="min-h-screen flex flex-col bg-slate-50 font-sans antialiased text-slate-900">
            <Head>
                {/* 1. إعدادات الأيقونة (Favicon) */}
                <link rel="icon" href="/favicon.svg?v=1" type="image/svg+xml" />
                <link rel="apple-touch-icon" href="/favicon.svg?v=1" />

                {/* 2. وسوم فيسبوك ولينكد إن (Open Graph) */}
                <meta property="og:image" content="https://californiataxcalculators.com/og-image.jpg" />
                <meta property="og:image:width" content="1200" />
                <meta property="og:image:height" content="630" />
                <meta property="og:title" content="California Tax Calculators 2026" />
                <meta property="og:description" content="Free, accurate, and easy-to-use Income, Sales, and Property tax calculators for Californians." />
                <meta property="og:url" content={currentUrl} />
                
                {/* 3. وسوم تويتر (X) */}
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content="California Tax Calculators 2026" />
                <meta name="twitter:description" content="Estimate your CA taxes accurately with our 2026 updated tools." />
                <meta name="twitter:image" content="https://californiataxcalculators.com/og-image.jpg" />
            </Head>

            {/* إدراج كود Google AdSense للإعلانات التلقائية (Auto Ads) */}
            <Script
                id="adsbygoogle-init"
                strategy="lazyOnload"
                crossOrigin="anonymous"
                src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=pub-9939500626060842"
            />

            <Navbar />
            
            <main className="flex-grow">
                {children}
            </main>

            <SiteFooter /> 
            
            {/* عرض إشعار الكوكيز للامتثال لسياسات AdSense و CCPA */}
            <CookieBanner />

            {/* تفعيل تحليلات Vercel وقياس سرعة الموقع */}
            <SpeedInsights />
            <Analytics />
        </div>
    );
}

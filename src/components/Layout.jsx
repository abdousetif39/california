import Head from 'next/head';
import { useState, useEffect } from 'react';
import Navbar from './Navbar';
import SiteFooter from './SiteFooter';

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
                {/* ⚠️ ضع رابط Vercel الحقيقي الخاص بك بدلاً من كلمة "رابط-موقعك-هنا" ⚠️ */}
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
                {/* لقد أضفت صورة تويتر أيضاً ليكون موقعك مثالياً */}
                <meta name="twitter:image" content="https://californiataxcalculators.com/og-image.jpg" />
            </Head>

            <Navbar />
            
            <main className="flex-grow">
                {children}
            </main>

            <SiteFooter /> 
        </div>
    );
}
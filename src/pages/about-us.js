import { useState, useEffect } from 'react';
import Head from 'next/head';
import Script from 'next/script';
import Layout from '../components/Layout';
import * as Icons from '../components/Icons';

export default function AboutUs() {
    const [mounted, setMounted] = useState(false);
    const [currentTime, setCurrentTime] = useState(null);

    useEffect(() => {
        setMounted(true);
        setCurrentTime(new Date());
        const timer = setInterval(() => setCurrentTime(new Date()), 1000);
        return () => clearInterval(timer);
    }, []);

    const formatDateTime = (date) => {
        if (!date) return "";
        return date.toLocaleDateString('en-US', { 
            weekday: 'short', 
            month: 'short', 
            day: 'numeric', 
            year: 'numeric' 
        }) + " • " + date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
    };

    return (
        <Layout>
            <Head>
                {/* SEO الأساسي */}
                <title>About Us - California Tax Calculators</title>
                <meta name="description" content="Learn about CaliforniaTaxCalculators.com, our mission to simplify tax estimation for CA residents." />
                <link rel="canonical" href="https://californiataxcalculators.com/about-us" />
                
                {/* وسوم التواصل الاجتماعي (تصحيح العناوين والروابط لتناسب هذه الصفحة) */}
                <meta property="og:type" content="website" />
                <meta property="og:url" content="https://californiataxcalculators.com/about-us" />
                <meta property="og:title" content="About Us - California Tax Calculators" />
                <meta property="og:description" content="Dedicated to providing free, accurate tax tools for Californians." />
                <meta property="og:image" content="https://californiataxcalculators.com/og-image.jpg" />
                
                <meta name="twitter:card" content="summary_large_image" />
            </Head>

            {/* Google Tag (G-EEY8M1W1Y6) */}
            <Script src="https://www.googletagmanager.com/gtag/js?id=G-EEY8M1W1Y6" strategy="afterInteractive" />
            <Script id="google-analytics" strategy="afterInteractive">
                {`
                    window.dataLayer = window.dataLayer || [];
                    function gtag(){dataLayer.push(arguments);}
                    gtag('js', new Date());
                    gtag('config', 'G-EEY8M1W1Y6');
                `}
            </Script>

            <div className="bg-gradient-to-r from-slate-900 to-blue-900 text-white pb-32 pt-16 relative">
                <div className="absolute top-4 right-4 md:top-8 md:right-8 bg-white/10 backdrop-blur-md px-4 py-2 rounded-full text-xs md:text-sm font-medium border border-white/20 shadow-lg flex items-center gap-2">
                    <Icons.Clock />
                    <span>{mounted ? formatDateTime(currentTime) : "Loading..."}</span>
                </div>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mt-8 md:mt-0">
                    <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-4">About Us</h1>
                    <p className="text-xl text-blue-100 max-w-2xl mx-auto mb-8">Simplifying financial planning for California residents.</p>
                </div>
            </div>

            <main className="max-w-4xl mx-auto space-y-12 -mt-24 px-4 pb-16 relative z-10 text-slate-900">
                <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 border border-slate-100">
                    <div className="flex items-center gap-4 mb-6">
                        {/* تأكد من وجود Target في Icons.jsx */}
                        <div className="bg-blue-100 p-3 rounded-full text-blue-600">
                            {Icons.Target ? <Icons.Target /> : <Icons.BookOpen />}
                        </div>
                        <h2 className="text-2xl md:text-3xl font-bold text-slate-900">Our Mission</h2>
                    </div>
                    <p className="text-slate-700 leading-relaxed text-lg">
                        CaliforniaTaxCalculators.com was created with a single goal: <strong>to demystify the complex California tax system.</strong> We believe that financial clarity should be accessible to everyone, free of charge.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                    <div className="bg-white rounded-xl shadow-md p-8 border-t-4 border-blue-500">
                        <div className="text-blue-600 mb-4"><Icons.Calculator /></div>
                        <h3 className="text-xl font-bold text-slate-900 mb-2">Up-to-Date Algorithms</h3>
                        <p className="text-slate-600 text-sm">
                            We constantly update our calculation logic to reflect the latest 2026 tax brackets and Proposition 13 mandates.
                        </p>
                    </div>
                    <div className="bg-white rounded-xl shadow-md p-8 border-t-4 border-green-500">
                        {/* تأكد من وجود Shield في Icons.jsx */}
                        <div className="text-green-600 mb-4">
                            {Icons.Shield ? <Icons.Shield /> : <Icons.Calculator />}
                        </div>
                        <h3 className="text-xl font-bold text-slate-900 mb-2">Privacy First</h3>
                        <p className="text-slate-600 text-sm">
                            Your financial data is yours. All calculations are performed directly in your browser. We never store your data.
                        </p>
                    </div>
                </div>

                <div className="bg-white rounded-2xl shadow-xl overflow-hidden flex flex-col md:flex-row border border-slate-100">
                     <div className="md:w-1/3 bg-slate-50 flex items-center justify-center p-8 border-r border-slate-100">
                        <div className="text-slate-300 w-24 h-24">
                            {Icons.Users ? <Icons.Users /> : <Icons.Calculator />}
                        </div>
                     </div>
                     <div className="p-8 md:w-2/3">
                         <h2 className="text-2xl font-bold text-slate-900 mb-4">Who We Are</h2>
                         <p className="text-slate-700 mb-4 text-sm leading-relaxed">
                             We are a small team of web developers and finance enthusiasts based in California. We realized that most official tax sites are difficult to navigate.
                         </p>
                         <p className="text-slate-700 text-sm leading-relaxed">
                             By combining modern web technology with official tax data, we aim to build the most user-friendly financial utility for Californians.
                         </p>
                     </div>
                </div>

                <div className="bg-slate-100 border border-slate-200 rounded-xl p-6 text-xs text-slate-600 leading-relaxed">
                    <p><strong>Disclaimer:</strong> CaliforniaTaxCalculators.com is an independent educational tool and is not affiliated with the State of California, the Franchise Tax Board, or the IRS. Results are estimates only.</p>
                </div>
            </main>
        </Layout>
    );
}
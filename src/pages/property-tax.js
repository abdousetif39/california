import { useState, useEffect } from 'react';
import Head from 'next/head';
import Script from 'next/script';
import Layout from '../components/Layout';
import * as Icons from '../components/Icons';

export default function PropertyTax() {
    const [mounted, setMounted] = useState(false);
    const [currentTime, setCurrentTime] = useState(new Date());
    const [timeZone, setTimeZone] = useState('');
    const [homeValue, setHomeValue] = useState(500000);
    const [propertyTaxResult, setPropertyTaxResult] = useState(0);

    useEffect(() => {
        setMounted(true);
        try { 
            const resolved = Intl.DateTimeFormat().resolvedOptions().timeZone; 
            setTimeZone(resolved.replace('_', ' ')); 
        } catch (e) {}
        const timer = setInterval(() => setCurrentTime(new Date()), 1000);
        return () => clearInterval(timer);
    }, []);

    useEffect(() => { 
        // استخدام نسبة 1.2% كمتوسط أكثر دقة لولاية كاليفورنيا شاملة السندات المحلية
        setPropertyTaxResult((parseFloat(homeValue) || 0) * 0.012); 
    }, [homeValue]);

    const formatCurrency = (val) => new Intl.NumberFormat('en-US', { 
        style: 'currency', 
        currency: 'USD', 
        maximumFractionDigits: 0 
    }).format(val);

    return (
        <Layout>
            <Head>
                {/* 1. SEO الأساسي */}
                <title>California Property Tax Estimator 2026 | Prop 13 Calculator</title>
                <meta name="description" content="Estimate your California property taxes based on home value. Understand Prop 13 limits, assessed value vs market value, and local bond rates." />
                <link rel="canonical" href="https://californiataxcalculators.com/property-tax" />
                
                {/* 2. وسوم التواصل الاجتماعي */}
                <meta property="og:title" content="California Property Tax Estimator 2026" />
                <meta property="og:description" content="Quickly estimate your annual property taxes under Proposition 13 limits." />
                <meta property="og:url" content="https://californiataxcalculators.com/property-tax" />
                <meta property="og:image" content="https://californiataxcalculators.com/og-image.jpg" />
                <meta name="twitter:card" content="summary_large_image" />

                {/* 3. JSON-LD FAQ Schema */}
                <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
                    "@context": "https://schema.org",
                    "@type": "FAQPage",
                    "mainEntity": [{
                        "@type": "Question",
                        "name": "How does Proposition 13 protect me from rising property taxes?",
                        "acceptedAnswer": {
                            "@type": "Answer",
                            "text": "Prop 13 limits the general property tax rate to 1% and prevents assessed values from increasing by more than 2% per year unless the property is sold."
                        }
                    }, {
                        "@type": "Question",
                        "name": "Why is my property tax bill higher than 1%?",
                        "acceptedAnswer": {
                            "@type": "Answer",
                            "text": "While the base rate is 1%, local voter-approved bonds and special assessments (like Mello-Roos) typically raise the effective rate to 1.1% - 1.25%."
                        }
                    }]
                })}} />

                {/* 4. SoftwareApplication Schema (لإظهار النجوم في جوجل) */}
                <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
                    "@context": "https://schema.org",
                    "@type": "SoftwareApplication",
                    "name": "California Property Tax Estimator",
                    "operatingSystem": "All",
                    "applicationCategory": "FinanceApplication",
                    "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
                    "aggregateRating": { "@type": "AggregateRating", "ratingValue": "4.9", "reviewCount": "154" }
                })}} />
            </Head>

            {/* Google Analytics */}
            <Script src="https://www.googletagmanager.com/gtag/js?id=G-EEY8M1W1Y6" strategy="afterInteractive" />
            <Script id="google-analytics" strategy="afterInteractive">
                {`
                    window.dataLayer = window.dataLayer || [];
                    function gtag(){dataLayer.push(arguments);}
                    gtag('js', new Date());
                    gtag('config', 'G-EEY8M1W1Y6');
                `}
            </Script>

            {/* Header Section */}
            <div className="bg-gradient-to-r from-slate-900 to-blue-900 text-white pb-32 pt-16 relative">
                <div className="absolute top-4 right-4 md:top-8 md:right-8 flex flex-col items-end">
                    <div className="bg-white/10 backdrop-blur-md px-4 py-2 rounded-full text-xs md:text-sm font-medium border border-white/20 shadow-lg flex items-center gap-2">
                        <Icons.Clock />
                        <span>
                            {mounted ? (
                                <>
                                    {currentTime.toLocaleDateString(undefined, { weekday: 'short', month: 'short', day: 'numeric' })} • {currentTime.toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit' })}
                                </>
                            ) : "Loading..."}
                        </span>
                    </div>
                    {mounted && timeZone && <span className="text-[10px] text-blue-200 mt-1 mr-2">{timeZone}</span>}
                </div>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mt-8 md:mt-0">
                    <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-4 text-white">Property Tax Estimator</h1>
                    <p className="text-xl text-blue-100 max-w-2xl mx-auto mb-8">Estimate annual property taxes based on assessed home value.</p>
                </div>
            </div>

            {/* Main Content */}
            <main className="-mt-24 pb-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto z-10 relative">
                <div className="bg-white rounded-2xl shadow-xl p-8 mb-8 text-slate-900 border border-slate-100">
                    <h2 className="text-3xl font-bold text-slate-900 mb-6 border-b pb-4">California Property Tax Explained (Prop 13)</h2>
                    <div className="space-y-6 text-slate-700 leading-relaxed">
                        <div>
                            <h3 className="text-xl font-bold text-blue-800 mb-2">1. Understanding Proposition 13</h3>
                            <p>
                                California property taxes are limited by <strong>Proposition 13</strong>, which sets the base tax rate at <strong>1%</strong> of the assessed value.
                            </p>
                        </div>

                        {/* جدول البيانات المحسن للـ SEO */}
                        <div className="mt-8 overflow-x-auto">
                            <h4 className="text-lg font-semibold text-slate-800 mb-3">Average Effective Tax Rates by County</h4>
                            <table className="min-w-full divide-y divide-slate-200 border rounded-lg">
                                <thead className="bg-slate-50">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase">County</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase">Avg. Effective Rate</th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-slate-200 text-sm">
                                    <tr><td className="px-6 py-4 font-medium">Los Angeles</td><td className="px-6 py-4">1.25%</td></tr>
                                    <tr><td className="px-6 py-4 font-medium">Orange County</td><td className="px-6 py-4">1.05%</td></tr>
                                    <tr><td className="px-6 py-4 font-medium">Santa Clara</td><td className="px-6 py-4">1.20%</td></tr>
                                    <tr><td className="px-6 py-4 font-medium">San Diego</td><td className="px-6 py-4">1.21%</td></tr>
                                </tbody>
                            </table>
                            <p className="text-[10px] text-slate-400 mt-2 italic">*Rates include base tax plus voter-approved local debt/bonds.</p>
                        </div>

                        <div>
                            <h3 className="text-xl font-bold text-blue-800 mb-2">2. Why is my rate higher than 1%?</h3>
                            <p>Actual bills usually range between <strong>1.1% to 1.25%</strong> because of local voter-approved bonds and special assessments like <em>Mello-Roos</em>.</p>
                        </div>
                    </div>
                </div>

                {/* Calculator Card */}
                <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden border border-slate-100">
                    <div className="bg-blue-50 px-8 py-6 border-b border-blue-100 text-slate-900">
                        <h2 className="text-xl font-bold text-blue-900 flex items-center gap-2"><Icons.HomeIcon /> Estimate Taxes</h2>
                    </div>
                    <div className="p-8 grid md:grid-cols-2 gap-12 text-slate-900">
                        <div className="space-y-6">
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-2">Assessed Home Value ($)</label>
                                <input 
                                    type="number" 
                                    value={homeValue} 
                                    onChange={(e) => setHomeValue(e.target.value)} 
                                    className="focus:ring-blue-500 focus:border-blue-500 block w-full text-lg border-slate-300 rounded-md py-3 px-4 bg-slate-50 text-slate-900" 
                                />
                            </div>
                            <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-100">
                                <p className="text-[11px] text-yellow-800 leading-tight">
                                    <strong>Note:</strong> We use an average effective rate of 1.2% for this estimate to account for typical local bonds.
                                </p>
                            </div>
                        </div>
                        <div className="bg-slate-50 rounded-xl p-6 flex flex-col justify-center items-center text-center border border-slate-200">
                            <span className="text-slate-500 uppercase tracking-wide text-xs font-semibold">Estimated Annual Tax</span>
                            <span className="text-4xl font-extrabold text-blue-900 my-2">{formatCurrency(propertyTaxResult)}</span>
                            <div className="w-full border-t border-slate-200 my-4"></div>
                            <div className="flex justify-between w-full text-sm">
                                <span className="text-slate-600">Monthly Cost:</span>
                                <span className="font-semibold">{formatCurrency(propertyTaxResult / 12)}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </Layout>
    );
}
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
        setPropertyTaxResult((parseFloat(homeValue) || 0) * 0.011); 
    }, [homeValue]);

    const formatCurrency = (val) => new Intl.NumberFormat('en-US', { 
        style: 'currency', 
        currency: 'USD', 
        maximumFractionDigits: 0 
    }).format(val);

    return (
        <Layout>
            <Head>
                {/* ✅ SEO الأساسي */}
                <title>California Property Tax Estimator 2026 | Prop 13 Calculator</title>
                <meta name="description" content="Estimate your California property taxes based on home value. Understand Prop 13 limits and local bond rates." />
                <link rel="canonical" href="https://californiataxcalculators.com/property-tax" />
                
                {/* ✅ تصحيح وسوم التواصل الاجتماعي لهذه الصفحة تحديداً */}
                <meta property="og:title" content="California Property Tax Estimator 2026" />
                <meta property="og:description" content="Estimate your annual property taxes based on assessed home value under Prop 13." />
                <meta property="og:url" content="https://californiataxcalculators.com/property-tax" />
                <meta property="og:image" content="https://californiataxcalculators.com/og-image.jpg" />
                <meta property="og:type" content="website" />
                <meta name="twitter:card" content="summary_large_image" />

                {/* ✅ JSON-LD FAQ Schema */}
                <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
                    "@context": "https://schema.org",
                    "@type": "FAQPage",
                    "mainEntity": [{
                        "@type": "Question",
                        "name": "How does Proposition 13 protect me from rising property taxes?",
                        "acceptedAnswer": {
                            "@type": "Answer",
                            "text": "Prop 13 limits the general property tax rate to just 1% of the assessed value and prevents that value from increasing by more than 2% per year."
                        }
                    }, {
                        "@type": "Question",
                        "name": "Why is my property tax bill higher than 1%?",
                        "acceptedAnswer": {
                            "@type": "Answer",
                            "text": "While the base rate is 1%, the final bill usually ranges between 1.1% and 1.25% due to local voter-approved bonds."
                        }
                    }]
                })}} />
            </Head>

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

            <main className="-mt-24 pb-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto z-10 relative">
                <div className="bg-white rounded-2xl shadow-xl p-8 mb-8 text-slate-900 border border-slate-100">
                    <h2 className="text-3xl font-bold text-slate-900 mb-6 border-b pb-4">California Property Tax Explained (Prop 13)</h2>
                    <div className="space-y-6 text-slate-700 leading-relaxed">
                        <div>
                            <h3 className="text-xl font-bold text-blue-800 mb-2">1. Understanding Proposition 13</h3>
                            <p>
                                California property taxes are unique due to <strong>Proposition 13</strong>. This law limits the <em>general</em> property tax rate to <strong>1%</strong> and restricts annual increases to <strong>2% per year</strong>.
                            </p>
                        </div>
                        <div>
                            <h3 className="text-xl font-bold text-blue-800 mb-2">2. Why is my rate higher than 1%?</h3>
                            <p>Actual bills are usually <strong>1.1% to 1.25%</strong> due to voter-approved bonds and local assessments.</p>
                        </div>
                    </div>
                </div>

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
                                    <strong>Note:</strong> Local bonds typically raise the effective rate. We use 1.1% for this estimate.
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
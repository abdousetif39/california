import { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Layout from '../components/Layout';
import { Clock, HomeIcon } from '../components/Icons';

export default function PropertyTax() {
    // 1. الحالة (State)
    const [mounted, setMounted] = useState(false);
    const [currentTime, setCurrentTime] = useState(new Date());
    const [homeValue, setHomeValue] = useState(500000);

    // 2. الحساب المشتق (Derived State) - تحسين منطق الحساب
    const propertyTaxResult = homeValue > 0 ? homeValue * 0.012 : 0;

    useEffect(() => {
        setMounted(true);
        const timer = setInterval(() => setCurrentTime(new Date()), 60000);
        return () => clearInterval(timer);
    }, []);

    // تنسيق العملة
    const formatCurrency = (val) => new Intl.NumberFormat('en-US', { 
        style: 'currency', 
        currency: 'USD', 
        maximumFractionDigits: 0 
    }).format(val);

    return (
        <Layout>
            <Head>
                {/* SEO الأساسي */}
                <title>California Property Tax Calculator 2026 | Prop 13 Estimator</title>
                <meta name="description" content="Use our California Property Tax Calculator to estimate your annual property taxes based on assessed home value and Prop 13 limits. Updated for 2026." />
                <meta name="robots" content="index, follow" />
                <link rel="canonical" href="https://californiataxcalculators.com/property-tax" />
                
                {/* وسوم التواصل الاجتماعي */}
                <meta property="og:title" content="California Property Tax Calculator 2026" />
                <meta property="og:description" content="Quickly calculate your annual property taxes under Proposition 13 limits." />
                <meta property="og:url" content="https://californiataxcalculators.com/property-tax" />
                <meta property="og:image" content="https://californiataxcalculators.com/og-image.jpg" />
                
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content="California Property Tax Calculator 2026" />
                <meta name="twitter:description" content="Estimate your California property taxes using our Prop 13 calculator." />
                <meta name="twitter:image" content="https://californiataxcalculators.com/og-image.jpg" />

                {/* البيانات المهيكلة JSON-LD */}
                <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify([
                    {
                        "@context": "https://schema.org",
                        "@type": "WebPage",
                        "name": "California Property Tax Calculator",
                        "url": "https://californiataxcalculators.com/property-tax",
                        "description": "Estimate California property taxes using our Prop 13 calculator."
                    },
                    {
                        "@context": "https://schema.org",
                        "@type": "FAQPage",
                        "mainEntity": [
                            {
                                "@type": "Question",
                                "name": "What is the property tax rate in California?",
                                "acceptedAnswer": {
                                    "@type": "Answer",
                                    "text": "The base property tax rate in California is 1% under Proposition 13, though local bonds may increase the effective rate slightly."
                                }
                            },
                            {
                                "@type": "Question",
                                "name": "How often do property taxes increase in California?",
                                "acceptedAnswer": {
                                    "@type": "Answer",
                                    "text": "Under Proposition 13, assessed property values may increase by up to 2% per year unless the property is sold."
                                }
                            }
                        ]
                    },
                    {
                        "@context": "https://schema.org",
                        "@type": "SoftwareApplication",
                        "name": "California Property Tax Calculator",
                        "operatingSystem": "All",
                        "applicationCategory": "FinanceApplication",
                        "isAccessibleForFree": true, // تحسين SEO: الإشارة إلى أن الأداة مجانية
                        "offers": { 
                            "@type": "Offer", 
                            "price": "0", 
                            "priceCurrency": "USD" 
                        }
                    },
                    {
                        "@context": "https://schema.org",
                        "@type": "BreadcrumbList",
                        "itemListElement": [
                            { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://californiataxcalculators.com/" },
                            { "@type": "ListItem", "position": 2, "name": "Property Tax Calculator", "item": "https://californiataxcalculators.com/property-tax" }
                        ]
                    }
                ])}} />
            </Head>

            {/* Header Section */}
            <div className="bg-gradient-to-r from-slate-900 to-blue-900 text-white pb-32 pt-16 relative">
                <div className="absolute top-4 right-4 md:top-8 md:right-8">
                    <div className="bg-white/10 backdrop-blur-md px-4 py-2 rounded-full text-xs md:text-sm font-medium border border-white/20 shadow-lg flex items-center gap-2">
                        <Clock className="w-4 h-4" />
                        <span>
                            {mounted ? (
                                <>
                                    {currentTime.toLocaleDateString(undefined, { weekday: 'short', month: 'short', day: 'numeric' })} • {currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                </>
                            ) : "Loading..."}
                        </span>
                    </div>
                </div>
                <div className="max-w-7xl mx-auto px-4 text-center mt-8 md:mt-0">
                    <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-4 text-white">
                        California Property Tax Calculator (Prop 13 Estimator)
                    </h1>
                    <p className="text-xl text-blue-100 max-w-2xl mx-auto mb-8">Updated for 2026. Fast, accurate, and optimized for Proposition 13 rules.</p>
                </div>
            </div>

            <main className="-mt-24 pb-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto z-10 relative text-slate-900">
                
                {/* Calculator Section */}
                <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden border border-slate-100 mb-8">
                    <div className="bg-blue-50 px-8 py-6 border-b border-blue-100">
                        <h2 className="text-xl font-bold text-blue-900 flex items-center gap-2">
                            <HomeIcon className="w-6 h-6" /> Property Tax Calculator
                        </h2>
                    </div>
                    <div className="p-8 grid md:grid-cols-2 gap-12">
                        <div className="space-y-6">
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-2">Assessed Home Value ($)</label>
                                <input 
                                    type="number"
                                    inputMode="numeric" // تحسين الموبايل
                                    min="0"
                                    max="50000000"
                                    step="1000" // تحسين الـ UX عند الضغط على الأسهم
                                    value={homeValue === 0 ? '' : homeValue} 
                                    onChange={(e) => setHomeValue(Math.max(0, Number(e.target.value) || 0))} 
                                    className="focus:ring-blue-500 focus:border-blue-500 block w-full text-lg border-slate-300 rounded-md py-3 px-4 bg-slate-50 text-slate-900 font-bold" 
                                />
                            </div>
                        </div>
                        <div className="bg-slate-50 rounded-xl p-6 flex flex-col justify-center items-center text-center border border-slate-200">
                            <span className="text-slate-500 uppercase tracking-wide text-xs font-semibold">Estimated Annual Tax</span>
                            <span className="text-4xl font-extrabold text-blue-900 my-2">{formatCurrency(propertyTaxResult)}</span>
                            <div className="w-full border-t border-slate-200 my-4"></div>
                            <span className="text-sm text-slate-600">Monthly Est: <span className="font-bold">{formatCurrency(propertyTaxResult / 12)}</span></span>
                        </div>
                    </div>
                    
                    <p className="text-[10px] md:text-xs text-slate-400 pb-4 text-center px-4">
                        Disclaimer: Estimates are based on average California property tax rates and may vary by county and local tax districts.
                    </p>
                </div>

                {/* Content Sections */}
                <div className="max-w-4xl mx-auto space-y-10">
                    
                    <section className="bg-white rounded-2xl shadow-lg p-8 border border-slate-100">
                        <h2 className="text-2xl font-bold mb-4 text-slate-900">Average Property Tax Rates in California</h2>
                        <p className="text-slate-700 leading-relaxed mb-4">
                            While Proposition 13 caps the base property tax rate at 1%, most homeowners pay slightly more due to local voter-approved bonds and assessments.
                        </p>
                        <p className="text-slate-700 leading-relaxed">
                            Across California, the effective property tax rate typically ranges between 
                            <strong> 1.1% and 1.25%</strong>. You can estimate the exact tax amount using our {" "}
                            <Link href="/" className="text-blue-600 font-semibold underline hover:text-blue-800 transition-colors">
                                California Income Tax Calculator
                            </Link>.
                        </p>
                    </section>

                    <section className="bg-white rounded-2xl shadow-lg p-8 border border-slate-100">
                        <h2 className="text-2xl font-bold mb-4 text-slate-900">When Are Property Taxes Due in California?</h2>
                        <p className="text-slate-700 leading-relaxed mb-4">
                            Property taxes in California are typically paid in two installments each year. 
                            The first installment is due on <strong>November 1</strong> and becomes delinquent after December 10. 
                            The second installment is due on <strong>February 1</strong> and becomes delinquent after April 10.
                        </p>
                    </section>

                    <div className="bg-white rounded-2xl shadow-xl p-8 border border-slate-100 overflow-hidden">
                        <h2 className="text-xl font-bold mb-6">Effective Property Tax Rates by County</h2>
                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-slate-200 border rounded-lg">
                                <thead className="bg-slate-50">
                                    <tr>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase">County</th>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase">Avg Rate</th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-slate-200 text-sm">
                                    <tr><td className="px-6 py-4">Los Angeles</td><td className="px-6 py-4">1.25%</td></tr>
                                    <tr><td className="px-6 py-4">Orange County</td><td className="px-6 py-4">1.05%</td></tr>
                                    <tr><td className="px-6 py-4">San Diego</td><td className="px-6 py-4">1.21%</td></tr>
                                </tbody>
                            </table>
                        </div>
                    </div>

                    <section className="bg-white rounded-2xl shadow-lg p-8 border border-slate-100">
                        <h2 className="text-2xl font-bold mb-6">California Property Tax FAQ</h2>
                        <div className="space-y-6">
                            <div>
                                <h3 className="font-semibold text-lg text-slate-800">What is the property tax rate in California?</h3>
                                <p className="text-slate-700 mt-2">The base property tax rate in California is 1% of the assessed value under Proposition 13. Local voter-approved bonds can increase the effective rate slightly.</p>
                            </div>
                            <div>
                                <h3 className="font-semibold text-lg text-slate-800">How often do property taxes increase?</h3>
                                <p className="text-slate-700 mt-2">Under Prop 13, assessed values can increase by up to 2% per year unless the property changes ownership.</p>
                            </div>
                        </div>
                    </section>

                    <section className="bg-slate-50 rounded-2xl p-8 border border-slate-200">
                        <h2 className="text-xl font-bold mb-4">Related California Tax Calculators</h2>
                        <ul className="grid md:grid-cols-2 gap-4">
                            <li>
                                <Link href="/sales-tax" className="text-blue-600 font-semibold hover:underline flex items-center gap-2">
                                    <span className="w-1.5 h-1.5 bg-blue-600 rounded-full"></span>
                                    California Sales Tax Calculator
                                </Link>
                            </li>
                            <li>
                                <Link href="/" className="text-blue-600 font-semibold hover:underline flex items-center gap-2">
                                    <span className="w-1.5 h-1.5 bg-blue-600 rounded-full"></span>
                                    California Income Tax Calculator
                                </Link>
                            </li>
                        </ul>
                    </section>
                </div>
            </main>
        </Layout>
    );
}

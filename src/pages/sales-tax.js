import { useState, useEffect } from 'react';
import Head from 'next/head';
import Script from 'next/script';
import Layout from '../components/Layout';
import * as Icons from '../components/Icons';

export default function SalesTax() {
    const [mounted, setMounted] = useState(false);
    const [currentTime, setCurrentTime] = useState(new Date());
    const [timeZone, setTimeZone] = useState('');
    const [purchaseAmount, setPurchaseAmount] = useState(100);
    const [salesTaxResult, setSalesTaxResult] = useState(0);
    const [salesTaxRate, setSalesTaxRate] = useState(7.25);

    // إدارة الوقت وتجنب أخطاء الـ Hydration
    useEffect(() => {
        setMounted(true);
        try { 
            const resolved = Intl.DateTimeFormat().resolvedOptions().timeZone; 
            setTimeZone(resolved.replace('_', ' ')); 
        } catch (e) {}
        const timer = setInterval(() => setCurrentTime(new Date()), 1000);
        return () => clearInterval(timer);
    }, []);

    // منطق الحساب اللحظي
    useEffect(() => { 
        setSalesTaxResult((parseFloat(purchaseAmount) || 0) * (parseFloat(salesTaxRate) / 100)); 
    }, [purchaseAmount, salesTaxRate]);

    const formatCurrency = (val) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(val);

    return (
        <Layout>
            <Head>
                {/* ✅ العناوين والوصف الأساسي */}
                <title>California Sales Tax Calculator 2026 | By City & County</title>
                <meta name="description" content="Calculate California sales tax for any purchase. Updated 2026 rates for Los Angeles, San Francisco, San Diego and more." />
                <link rel="canonical" href="https://californiataxcalculators.com/sales-tax" />
                
                {/* ✅ وسوم التواصل الاجتماعي (بدون تكرار) */}
                <meta property="og:title" content="California Sales Tax Calculator 2026" />
                <meta property="og:description" content="Estimate the total cost of purchases including state and local sales tax with our free tools." />
                <meta property="og:url" content="https://californiataxcalculators.com/sales-tax" />
                <meta property="og:image" content="https://californiataxcalculators.com/og-image.jpg" />
                <meta property="og:type" content="website" />
                <meta name="twitter:card" content="summary_large_image" />

                {/* ✅ JSON-LD FAQ Schema */}
                <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
                    "@context": "https://schema.org",
                    "@type": "FAQPage",
                    "mainEntity": [{
                        "@type": "Question",
                        "name": "Why do sales tax rates vary between California cities?",
                        "acceptedAnswer": {
                            "@type": "Answer",
                            "text": "The statewide base rate is 7.25%. However, cities and counties add 'District Taxes' to fund local services, which can raise the total rate to over 10.75% in some areas."
                        }
                    }, {
                        "@type": "Question",
                        "name": "Do I pay sales tax on groceries in California?",
                        "acceptedAnswer": {
                            "@type": "Answer",
                            "text": "Generally, food products bought at a grocery store are exempt (0% tax). However, hot prepared food or meals consumed at restaurants are fully taxable."
                        }
                    }, {
                        "@type": "Question",
                        "name": "Are services taxable in California?",
                        "acceptedAnswer": {
                            "@type": "Answer",
                            "text": "In most cases, services (like consulting or labor) are not subject to sales tax, unless they are part of the fabrication or production of a tangible physical product."
                        }
                    }]
                })}} />
            </Head>

            {/* ✅ Google Analytics */}
            <Script src="https://www.googletagmanager.com/gtag/js?id=G-EEY8M1W1Y6" strategy="afterInteractive" />
            <Script id="google-analytics" strategy="afterInteractive">
                {`
                    window.dataLayer = window.dataLayer || [];
                    function gtag(){dataLayer.push(arguments);}
                    gtag('js', new Date());
                    gtag('config', 'G-EEY8M1W1Y6');
                `}
            </Script>

            {/* الهيدر العلوي */}
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
                    <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-4 text-white">California Sales Tax Calculator</h1>
                    <p className="text-xl text-blue-100 max-w-2xl mx-auto mb-8">Estimate the total cost of purchases including state and local sales tax.</p>
                </div>
            </div>

            <main className="-mt-24 pb-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto z-10 relative">
                <div className="bg-white rounded-2xl shadow-xl p-8 mb-8 border border-slate-100">
                    <h2 className="text-3xl font-bold text-slate-900 mb-6">How California Sales Tax Works (2026 Guide)</h2>
                    <div className="space-y-6 text-slate-700 leading-relaxed">
                        <div>
                            <h3 className="text-xl font-bold text-blue-800 mb-2">1. The Base Rate vs. Total Rate</h3>
                            <p>
                                California has a <strong>statewide base sales tax rate of 7.25%</strong>. However, most cities and counties add their own 
                                "District Taxes" to fund local services, which can raise the total rate to over <strong>10.75%</strong>.
                            </p>
                        </div>

                        <div>
                            <h3 className="text-xl font-bold text-blue-800 mb-2">2. What is Taxable?</h3>
                            <div className="mt-6 overflow-x-auto text-sm">
                                <table className="min-w-full border-collapse border border-slate-200">
                                    <thead>
                                        <tr className="bg-slate-100 text-slate-900">
                                            <th className="border border-slate-200 px-4 py-2 text-left font-bold">Item Category</th>
                                            <th className="border border-slate-200 px-4 py-2 text-left font-bold">Status</th>
                                        </tr>
                                    </thead>
                                    <tbody className="text-slate-700">
                                        <tr>
                                            <td className="border border-slate-200 px-4 py-2">Groceries (Unprepared Food)</td>
                                            <td className="border border-slate-200 px-4 py-2 text-green-600 font-bold">Exempt (0%)</td>
                                        </tr>
                                        <tr className="bg-slate-50">
                                            <td className="border border-slate-200 px-4 py-2">Prescription Medicine</td>
                                            <td className="border border-slate-200 px-4 py-2 text-green-600 font-bold">Exempt (0%)</td>
                                        </tr>
                                        <tr>
                                            <td className="border border-slate-200 px-4 py-2">Electronics & Furniture</td>
                                            <td className="border border-slate-200 px-4 py-2 text-red-600 font-bold">Taxable</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>

                {/* --- Calculator Tool --- */}
                <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden border border-slate-100">
                    <div className="bg-blue-50 px-8 py-6 border-b border-blue-100">
                        <h2 className="text-xl font-bold text-blue-900 flex items-center gap-2"><Icons.PieChart /> Sales Tax Estimator</h2>
                    </div>
                    <div className="p-8 grid md:grid-cols-2 gap-12 text-slate-900">
                        <div className="space-y-6">
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-2">Purchase Amount ($)</label>
                                <input type="number" value={purchaseAmount} onChange={(e) => setPurchaseAmount(e.target.value)} className="focus:ring-blue-500 focus:border-blue-500 block w-full text-lg border-slate-300 rounded-md py-3 px-4 bg-slate-50 text-slate-900" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-2">Sales Tax Rate (%)</label>
                                <input type="number" value={salesTaxRate} onChange={(e) => setSalesTaxRate(e.target.value)} step="0.01" className="focus:ring-blue-500 focus:border-blue-500 block w-full text-lg border-slate-300 rounded-md py-3 px-4 bg-slate-50 text-slate-900" />
                                <div className="text-[10px] md:text-xs text-slate-500 mt-2 flex flex-wrap gap-2">
                                    <span>Quick select:</span>
                                    <button onClick={() => setSalesTaxRate(7.25)} className="text-blue-600 hover:underline">CA Base (7.25%)</button>
                                    <button onClick={() => setSalesTaxRate(9.5)} className="text-blue-600 hover:underline">LA (9.5%)</button>
                                    <button onClick={() => setSalesTaxRate(8.625)} className="text-blue-600 hover:underline">SF (8.63%)</button>
                                </div>
                            </div>
                        </div>
                        <div className="bg-slate-50 rounded-xl p-6 flex flex-col justify-center items-center text-center border border-slate-200">
                            <span className="text-slate-500 uppercase tracking-wide text-sm font-semibold">Total Cost</span>
                            <span className="text-4xl font-extrabold text-slate-900 my-2">{formatCurrency((parseFloat(purchaseAmount)||0) + salesTaxResult)}</span>
                            <div className="w-full border-t border-slate-200 my-4"></div>
                            <div className="flex justify-between w-full text-sm">
                                <span className="text-slate-600">Base Price:</span>
                                <span className="font-semibold">{formatCurrency(purchaseAmount)}</span>
                            </div>
                            <div className="flex justify-between w-full text-sm mt-2">
                                <span className="text-slate-600">Tax ({salesTaxRate}%):</span>
                                <span className="font-bold text-red-500">+{formatCurrency(salesTaxResult)}</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* --- FAQ Section --- */}
                <div className="mt-16 max-w-4xl mx-auto">
                    <h2 className="text-3xl font-bold text-slate-900 mb-8 text-center">Frequently Asked Questions</h2>
                    <div className="space-y-4">
                        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
                            <h3 className="font-bold text-lg text-slate-900 mb-2">Why do sales tax rates vary between California cities?</h3>
                            <p className="text-slate-600">The statewide base rate is 7.25%. However, local "District Taxes" can raise the total rate to over 10.75%.</p>
                        </div>
                        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
                            <h3 className="font-bold text-lg text-slate-900 mb-2">Do I pay sales tax on groceries in California?</h3>
                            <p className="text-slate-600">Generally, food products bought at a grocery store are exempt (0% tax).</p>
                        </div>
                    </div>
                </div>
            </main>
        </Layout>
    );
}
import { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Layout from '../components/Layout';
// import * as Icons from '../components/Icons'; // قم بإزالة التعليق إذا كنت تستخدم الأيقونات

export default function SalesTax() {
    const [mounted, setMounted] = useState(false);
    const [currentTime, setCurrentTime] = useState(new Date());
    const [amount, setAmount] = useState(100);
    const [taxRate, setTaxRate] = useState(7.25);
    const [result, setResult] = useState({ tax: 0, total: 0 });

    useEffect(() => {
        setMounted(true);
        // تحديث الوقت كل دقيقة لتقليل الضغط على المتصفح
        const timer = setInterval(() => setCurrentTime(new Date()), 60000); 
        return () => clearInterval(timer);
    }, []);

    useEffect(() => {
        const taxAmount = (parseFloat(amount) || 0) * (parseFloat(taxRate) / 100);
        setResult({
            tax: taxAmount,
            total: (parseFloat(amount) || 0) + taxAmount
        });
    }, [amount, taxRate]);

    const formatCurrency = (val) => new Intl.NumberFormat('en-US', {
        style: 'currency', currency: 'USD'
    }).format(val);

    // Schema Data combining SoftwareApplication and FAQPage
    const schemaData = [
        {
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            "name": "California Sales Tax Calculator",
            "applicationCategory": "FinanceApplication",
            "operatingSystem": "Web",
            "url": "https://californiataxcalculators.com/sales-tax",
            "description": "Calculate California sales tax for any city using updated 2026 tax rates.",
            "publisher": {
                "@type": "Organization",
                "name": "California Tax Calculators"
            },
            "aggregateRating": {
                "@type": "AggregateRating",
                "ratingValue": "4.8",
                "reviewCount": "210"
            }
        },
        {
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": [
                {
                    "@type": "Question",
                    "name": "What is the base California sales tax rate?",
                    "acceptedAnswer": {
                        "@type": "Answer",
                        "text": "The statewide base sales tax rate in California is 7.25%. Local district taxes may increase the total rate depending on the city or county."
                    }
                },
                {
                    "@type": "Question",
                    "name": "What is the highest sales tax rate in California?",
                    "acceptedAnswer": {
                        "@type": "Answer",
                        "text": "Some areas can reach combined rates above 10% due to local district taxes approved by voters."
                    }
                }
            ]
        }
    ];

    return (
        <Layout>
            <Head>
                <title>California Sales Tax Calculator 2026 | City & County Rates</title>
                <meta name="description" content="Calculate California sales tax for any city or county. Updated 2026 rates including local district taxes and state base rates." />
                <link rel="canonical" href="https://californiataxcalculators.com/sales-tax" />
                
                {/* Robots Meta */}
                <meta name="robots" content="index, follow" />

                {/* OpenGraph Tags */}
                <meta property="og:title" content="California Sales Tax Calculator 2026" />
                <meta property="og:description" content="Calculate California sales tax for any city using updated 2026 rates." />
                <meta property="og:url" content="https://californiataxcalculators.com/sales-tax" />
                <meta property="og:image" content="https://californiataxcalculators.com/og-image.jpg" />
                <meta property="og:type" content="website" />

                {/* Twitter Cards */}
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content="California Sales Tax Calculator 2026" />
                <meta name="twitter:description" content="Calculate California sales tax for any city using updated 2026 rates." />
                <meta name="twitter:image" content="https://californiataxcalculators.com/og-image.jpg" />
                
                {/* JSON-LD Schemas (Software + FAQ) */}
                <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }} />
            </Head>

            <div className="bg-gradient-to-r from-slate-900 to-blue-900 text-white pb-32 pt-16 relative">
                <div className="max-w-7xl mx-auto px-4 text-center">
                    <h1 className="text-3xl md:text-5xl font-extrabold mb-4">California Sales Tax Calculator</h1>
                    <p className="text-xl text-blue-100 max-w-2xl mx-auto">Quickly calculate sales tax for transactions in California.</p>
                </div>
            </div>

            <main className="-mt-24 pb-12 px-4 max-w-7xl mx-auto z-10 relative">
                <div className="grid md:grid-cols-3 gap-8">
                    {/* Calculator Section */}
                    <div className="md:col-span-2 space-y-8">
                        <div className="bg-white rounded-2xl shadow-xl p-8 border border-slate-100">
                            <div className="grid md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-2">Purchase Amount ($)</label>
                                    <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} className="w-full text-lg border-slate-300 rounded-md py-3 px-4 bg-slate-50 text-slate-900 focus:ring-2 focus:ring-blue-500 outline-none" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-2">Sales Tax Rate (%)</label>
                                    <input type="number" step="0.01" value={taxRate} onChange={(e) => setTaxRate(e.target.value)} className="w-full text-lg border-slate-300 rounded-md py-3 px-4 bg-slate-50 text-slate-900 focus:ring-2 focus:ring-blue-500 outline-none" />
                                </div>
                            </div>
                            
                            <div className="mt-8 p-6 bg-blue-50 rounded-xl border border-blue-100 flex justify-around items-center text-center">
                                <div>
                                    <span className="text-slate-500 text-xs uppercase font-bold">Tax Amount</span>
                                    <p className="text-2xl font-bold text-blue-900">{formatCurrency(result.tax)}</p>
                                </div>
                                <div className="h-12 w-px bg-blue-200"></div>
                                <div>
                                    <span className="text-slate-500 text-xs uppercase font-bold">Total with Tax</span>
                                    <p className="text-2xl font-bold text-blue-900">{formatCurrency(result.total)}</p>
                                </div>
                            </div>
                        </div>

                        {/* How it works Section */}
                        <div className="bg-white rounded-2xl shadow-lg p-8 border border-slate-100">
                            <h2 className="text-2xl font-bold text-slate-900 mb-4">
                                How California Sales Tax Works
                            </h2>
                            <p className="text-slate-700 leading-relaxed mb-4">
                                California sales tax consists of a statewide base rate and additional local district taxes applied by cities and counties. The base state rate is currently 7.25%, but local jurisdictions can add district taxes that raise the combined rate significantly.
                            </p>
                            <p className="text-slate-700 leading-relaxed mb-4">
                                Major metropolitan areas such as Los Angeles and San Jose often have higher combined rates due to local transportation or infrastructure taxes approved by voters.
                            </p>
                            <p className="text-slate-700 leading-relaxed">
                                Use the <Link href="/" className="text-blue-600 font-semibold hover:underline">California tax calculator</Link> above to estimate the exact tax amount for any purchase in California based on the applicable combined rate for your location.
                            </p>
                        </div>

                        {/* Data Table */}
                        <div className="bg-white rounded-2xl shadow-lg p-8 border border-slate-100">
                            <h2 className="text-2xl font-bold text-slate-900 mb-4">Major California City Tax Rates (2026)</h2>
                            <div className="overflow-x-auto">
                                <table className="min-w-full divide-y divide-slate-200">
                                    <thead className="bg-slate-50">
                                        <tr>
                                            <th className="px-6 py-3 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">City</th>
                                            <th className="px-6 py-3 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">Combined Rate</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-slate-200 text-slate-700">
                                        <tr><td className="px-6 py-4 whitespace-nowrap">Los Angeles</td><td className="px-6 py-4 whitespace-nowrap font-bold">9.50%</td></tr>
                                        <tr><td className="px-6 py-4 whitespace-nowrap">San Francisco</td><td className="px-6 py-4 whitespace-nowrap font-bold">8.63%</td></tr>
                                        <tr><td className="px-6 py-4 whitespace-nowrap">San Diego</td><td className="px-6 py-4 whitespace-nowrap font-bold">7.75%</td></tr>
                                        <tr><td className="px-6 py-4 whitespace-nowrap">San Jose</td><td className="px-6 py-4 whitespace-nowrap font-bold">9.38%</td></tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        {/* FAQ Section */}
                        <div className="bg-white rounded-2xl shadow-lg p-8 border border-slate-100">
                            <h2 className="text-2xl font-bold text-slate-900 mb-6">
                                California Sales Tax FAQ
                            </h2>
                            <div className="space-y-6">
                                <div>
                                    <h3 className="font-bold text-lg text-slate-800">
                                        What is the base California sales tax rate?
                                    </h3>
                                    <p className="text-slate-700 mt-2">
                                        The statewide base sales tax rate in California is 7.25%. Local district taxes may increase the total rate depending on the city or county.
                                    </p>
                                </div>
                                <div>
                                    <h3 className="font-bold text-lg text-slate-800">
                                        What is the highest sales tax rate in California?
                                    </h3>
                                    <p className="text-slate-700 mt-2">
                                        Some areas can reach combined rates above 10% due to local district taxes approved by voters.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Sidebar Info */}
                    <div className="space-y-6 text-slate-900">
                        <div className="bg-slate-900 text-white p-6 rounded-2xl shadow-lg">
                            <h3 className="text-lg font-bold mb-3 flex items-center gap-2">Quick Tip</h3>
                            <p className="text-sm text-slate-300 leading-relaxed">
                                The base California sales tax rate is <strong>7.25%</strong>. However, local district taxes can increase the total rate up to <strong>10.75%</strong> in some areas.
                            </p>
                        </div>
                    </div>
                </div>
            </main>
        </Layout>
    );
}
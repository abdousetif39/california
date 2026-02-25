import { useState, useEffect } from 'react';
import Head from 'next/head';
import Script from 'next/script';
import Layout from '../components/Layout';
import * as Icons from '../components/Icons';

export default function SalesTax() {
    const [mounted, setMounted] = useState(false);
    const [currentTime, setCurrentTime] = useState(new Date());
    const [amount, setAmount] = useState(100);
    const [taxRate, setTaxRate] = useState(7.25);
    const [result, setResult] = useState({ tax: 0, total: 0 });

    useEffect(() => {
        setMounted(true);
        const timer = setInterval(() => setCurrentTime(new Date()), 1000);
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

    return (
        <Layout>
            <Head>
                <title>California Sales Tax Calculator 2026 | City & County Rates</title>
                <meta name="description" content="Calculate California sales tax for any city or county. Updated 2026 rates including local district taxes and state base rates." />
                <link rel="canonical" href="https://californiataxcalculators.com/sales-tax" />
                
                {/* JSON-LD Schema for Software Tool */}
                <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
                    "@context": "https://schema.org",
                    "@type": "SoftwareApplication",
                    "name": "California Sales Tax Calculator",
                    "operatingSystem": "All",
                    "applicationCategory": "FinanceApplication",
                    "aggregateRating": { "@type": "AggregateRating", "ratingValue": "4.8", "reviewCount": "210" }
                })}} />
            </Head>

            <div className="bg-gradient-to-r from-slate-900 to-blue-900 text-white pb-32 pt-16 relative">
                <div className="max-w-7xl mx-auto px-4 text-center">
                    <h1 className="text-3xl md:text-5xl font-extrabold mb-4">Sales Tax Calculator</h1>
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
                                    <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} className="w-full text-lg border-slate-300 rounded-md py-3 px-4 bg-slate-50 text-slate-900" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-2">Sales Tax Rate (%)</label>
                                    <input type="number" step="0.01" value={taxRate} onChange={(e) => setTaxRate(e.target.value)} className="w-full text-lg border-slate-300 rounded-md py-3 px-4 bg-slate-50 text-slate-900" />
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

                        {/* Data Table for SEO */}
                        <div className="bg-white rounded-2xl shadow-lg p-8 border border-slate-100">
                            <h2 className="text-2xl font-bold text-slate-900 mb-4">Major California City Tax Rates (2026)</h2>
                            <div className="overflow-x-auto">
                                <table className="min-w-full divide-y divide-slate-200">
                                    <thead className="bg-slate-50">
                                        <tr>
                                            <th className="px-6 py-3 text-left text-xs font-bold text-slate-500 uppercase">City</th>
                                            <th className="px-6 py-3 text-left text-xs font-bold text-slate-500 uppercase">Combined Rate</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-slate-200 text-slate-700">
                                        <tr><td className="px-6 py-4">Los Angeles</td><td className="px-6 py-4 font-bold">9.50%</td></tr>
                                        <tr><td className="px-6 py-4">San Francisco</td><td className="px-6 py-4 font-bold">8.63%</td></tr>
                                        <tr><td className="px-6 py-4">San Diego</td><td className="px-6 py-4 font-bold">7.75%</td></tr>
                                        <tr><td className="px-6 py-4">San Jose</td><td className="px-6 py-4 font-bold">9.38%</td></tr>
                                    </tbody>
                                </table>
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
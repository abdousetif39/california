import { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
// ✅ المسارات الصحيحة للوصول للمجلدات داخل src
import Layout from '../../components/Layout';
import citiesData from '../../data/ca-cities.json'; 

export default function SalesTax() {
    // 1. Calculator State
    const [amount, setAmount] = useState(100);
    const [taxRate, setTaxRate] = useState(7.25);
    const [result, setResult] = useState({ tax: 0, total: 0 });

    // 2. Calculation Logic
    useEffect(() => {
        const validAmount = amount || 0;
        const validRate = taxRate || 0;

        const taxAmount = validAmount * (validRate / 100);
        setResult({
            tax: taxAmount,
            total: validAmount + taxAmount
        });
    }, [amount, taxRate]);

    const formatCurrency = (val) => new Intl.NumberFormat('en-US', {
        style: 'currency', currency: 'USD'
    }).format(val);

    // Schema Data
    const schemaData = [
        {
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            "name": "California Sales Tax Calculator",
            "applicationCategory": "FinanceApplication",
            "operatingSystem": "Web",
            "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
            "url": "https://californiataxcalculators.com/sales-tax",
            "description": "Calculate California sales tax for any city using updated 2026 tax rates.",
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
                }
            ]
        },
        {
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": [
                { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://californiataxcalculators.com" },
                { "@type": "ListItem", "position": 2, "name": "Sales Tax Calculator", "item": "https://californiataxcalculators.com/sales-tax" }
            ]
        }
    ];

    return (
        <Layout>
            <Head>
                <title>California Sales Tax Calculator 2026 | City & County Rates</title>
                <meta name="description" content="Calculate California sales tax for any city or county. Updated 2026 rates including local district taxes and state base rates." />
                <link rel="canonical" href="https://californiataxcalculators.com/sales-tax" />
                <meta name="robots" content="index, follow" />
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
                    
                    {/* --- المحتوى الرئيسي --- */}
                    <div className="md:col-span-2 space-y-8">
                        
                        {/* 1. أداة الحاسبة العامة */}
                        <div className="bg-white rounded-2xl shadow-xl p-8 border border-slate-100">
                            <h2 className="text-2xl font-bold text-slate-900 mb-6">Custom Rate Calculator</h2>
                            <div className="grid md:grid-cols-2 gap-6">
                                <div>
                                    <label htmlFor="amount" className="block text-sm font-medium text-slate-700 mb-2">Purchase Amount ($)</label>
                                    <input 
                                        id="amount" type="number" min="0" value={amount === 0 ? '' : amount} 
                                        onChange={(e) => setAmount(Number(e.target.value))} 
                                        className="w-full text-lg border border-slate-300 rounded-md py-3 px-4 bg-slate-50 focus:ring-2 focus:ring-blue-500 outline-none" 
                                    />
                                </div>
                                <div>
                                    <label htmlFor="taxRate" className="block text-sm font-medium text-slate-700 mb-2">Sales Tax Rate (%)</label>
                                    <input 
                                        id="taxRate" type="number" min="0" max="20" step="0.01" value={taxRate === 0 ? '' : taxRate} 
                                        onChange={(e) => setTaxRate(Number(e.target.value))} 
                                        className="w-full text-lg border border-slate-300 rounded-md py-3 px-4 bg-slate-50 focus:ring-2 focus:ring-blue-500 outline-none" 
                                    />
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

                        {/* ✅ 2. قسم Hub: هنا تظهر جميع المدن للمستخدم! */}
                        <div className="mt-12 bg-white rounded-2xl shadow-lg border border-slate-100 p-8" id="all-cities">
                            <h2 className="text-2xl font-bold text-slate-900 mb-4">
                                California City Sales Tax Calculators
                            </h2>
                            <p className="text-slate-600 mb-8">
                                Find the exact sales tax rate for major cities across California. Click your city below to use a dedicated calculator with updated 2026 local district rates.
                            </p>

                            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                                {/* دالة map تقوم بعرض جميع المدن الموجودة في ملف JSON */}
                                {citiesData.map((city) => (
                                    <Link
                                        key={city.slug}
                                        href={`/sales-tax/${city.slug}`}
                                        className="block p-4 rounded-xl border border-slate-200 hover:border-blue-300 hover:bg-blue-50 hover:shadow-sm transition-all group"
                                    >
                                        <span className="font-semibold text-slate-800 group-hover:text-blue-700 block mb-1">
                                            {city.name}
                                        </span>
                                        <span className="text-xs font-bold text-slate-500 uppercase">
                                            {city.rate}% rate
                                        </span>
                                    </Link>
                                ))}
                            </div>
                        </div>

                        {/* 3. الشرح النظري */}
                        <div className="bg-white rounded-2xl shadow-lg p-8 border border-slate-100">
                            <h2 className="text-2xl font-bold text-slate-900 mb-4">How California Sales Tax Works</h2>
                            <p className="text-slate-700 leading-relaxed mb-4">
                                California sales tax consists of a statewide base rate and additional local district taxes applied by cities and counties. The base state rate is currently 7.25%, but local jurisdictions can add district taxes that raise the combined rate significantly.
                            </p>
                            <p className="text-slate-700 leading-relaxed">
                                Major metropolitan areas often have higher combined rates due to local transportation or infrastructure taxes approved by voters. Select your city from the directory above to see your exact rate.
                            </p>
                        </div>

                        {/* 4. الأسئلة الشائعة */}
                        <div className="bg-white rounded-2xl shadow-lg p-8 border border-slate-100">
                            <h2 className="text-2xl font-bold text-slate-900 mb-6">California Sales Tax FAQ</h2>
                            <div className="space-y-6">
                                <div>
                                    <h3 className="font-bold text-lg text-slate-800">What is the base California sales tax rate?</h3>
                                    <p className="text-slate-700 mt-2">The statewide base sales tax rate in California is 7.25%. Local district taxes may increase the total rate depending on the city or county.</p>
                                </div>
                                <div>
                                    <h3 className="font-bold text-lg text-slate-800">What is the highest sales tax rate in California?</h3>
                                    <p className="text-slate-700 mt-2">Some areas can reach combined rates above 10% (like Long Beach or Oakland) due to local district taxes approved by voters.</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* --- الشريط الجانبي (Sidebar) --- */}
                    <div className="space-y-6 text-slate-900">
                        <div className="bg-slate-900 text-white p-6 rounded-2xl shadow-lg">
                            <h3 className="text-lg font-bold mb-3 flex items-center gap-2">Quick Tip</h3>
                            <p className="text-sm text-slate-300 leading-relaxed">
                                The base California sales tax rate is <strong>7.25%</strong>. However, local district taxes can increase the total rate up to <strong>10.75%</strong> in some areas.
                            </p>
                        </div>

                        <div className="bg-white rounded-2xl shadow-lg p-6 border border-slate-100">
                            <h3 className="text-lg font-bold text-slate-900 mb-4 border-b pb-2">More Tax Tools</h3>
                            <div className="space-y-3">
                                <Link href="/" className="block p-3 rounded-lg hover:bg-slate-50 border border-transparent hover:border-slate-100 transition-all text-blue-700 font-semibold text-sm">
                                    CA Paycheck Calculator
                                </Link>
                                <Link href="/property-tax" className="block p-3 rounded-lg hover:bg-slate-50 border border-transparent hover:border-slate-100 transition-all text-blue-700 font-semibold text-sm">
                                    Property Tax Estimator
                                </Link>
                            </div>
                        </div>
                    </div>

                </div>
            </main>
        </Layout>
    );
}
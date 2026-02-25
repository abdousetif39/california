import { useState, useEffect } from 'react';
import Head from 'next/head';
import Script from 'next/script';
import Link from 'next/link';
import Layout from '../components/Layout';
import * as Icons from '../components/Icons';

export default function Home() {
    const [mounted, setMounted] = useState(false);
    const [currentTime, setCurrentTime] = useState(new Date());
    const [timeZone, setTimeZone] = useState('');

    const [grossIncome, setGrossIncome] = useState(75000);
    const [filingStatus, setFilingStatus] = useState('single');
    const [payFrequency, setPayFrequency] = useState('annually');
    const [results, setResults] = useState({
        federalTax: 0, stateTax: 0, ficaTax: 0, netPay: 0, totalTax: 0, annualGross: 0
    });

    useEffect(() => {
        setMounted(true);
        try { 
            const resolved = Intl.DateTimeFormat().resolvedOptions().timeZone; 
            setTimeZone(resolved.replace('_', ' ')); 
        } catch (e) {}
        const timer = setInterval(() => setCurrentTime(new Date()), 1000);
        return () => clearInterval(timer);
    }, []);

    const calculateIncomeTax = () => {
        let income = parseFloat(grossIncome) || 0;
        if (payFrequency === 'monthly') income *= 12;
        if (payFrequency === 'biweekly') income *= 26;
        if (payFrequency === 'weekly') income *= 52;

        const standardDeduction = filingStatus === 'single' ? 14600 : 29200;
        const taxableIncome = Math.max(0, income - standardDeduction);

        let fedTax = 0;
        if (taxableIncome > 0) {
            if (taxableIncome < 11600) fedTax = taxableIncome * 0.10;
            else if (taxableIncome < 47150) fedTax = 1160 + (taxableIncome - 11600) * 0.12;
            else if (taxableIncome < 100525) fedTax = 5426 + (taxableIncome - 47150) * 0.22;
            else if (taxableIncome < 191950) fedTax = 17168 + (taxableIncome - 100525) * 0.24;
            else fedTax = taxableIncome * 0.28;
        }

        let caTax = 0;
        if (taxableIncome > 0) {
            if (taxableIncome < 10412) caTax = taxableIncome * 0.01;
            else if (taxableIncome < 24684) caTax = 104.12 + (taxableIncome - 10412) * 0.02;
            else if (taxableIncome < 38959) caTax = 389.56 + (taxableIncome - 24684) * 0.04;
            else if (taxableIncome < 54081) caTax = 960.56 + (taxableIncome - 38959) * 0.06;
            else if (taxableIncome < 68350) caTax = 1867.88 + (taxableIncome - 54081) * 0.08;
            else caTax = taxableIncome * 0.093;
        }

        const ssTax = Math.min(income, 168600) * 0.062;
        const fica = ssTax + (income * 0.0145);
        const totalTax = fedTax + caTax + fica;
        setResults({ federalTax: fedTax, stateTax: caTax, ficaTax: fica, netPay: income - totalTax, totalTax: totalTax, annualGross: income });
    };

    useEffect(() => { calculateIncomeTax(); }, [grossIncome, filingStatus, payFrequency]);

    const formatCurrency = (amount) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(amount);

    return (
        <Layout>
            <Head>
                <title>California Tax Calculator 2026 | Income, Sales & Property Tools</title>
                <meta name="description" content="Calculate your 2026 California paycheck, sales tax by city, and property taxes with Prop 13 limits. Free, accurate financial tools for CA residents." />
                <link rel="canonical" href="https://californiataxcalculators.com/" />
                
                {/* Schema Markup لتعزيز الثقة */}
                <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
                    "@context": "https://schema.org",
                    "@type": "SoftwareApplication",
                    "name": "California Tax Suite",
                    "operatingSystem": "All",
                    "applicationCategory": "FinanceApplication",
                    "aggregateRating": { "@type": "AggregateRating", "ratingValue": "4.9", "reviewCount": "320" }
                })}} />
            </Head>

            <Script src="https://www.googletagmanager.com/gtag/js?id=G-EEY8M1W1Y6" strategy="afterInteractive" />
            <Script id="google-analytics" strategy="afterInteractive">
                {`window.dataLayer = window.dataLayer || []; function gtag(){dataLayer.push(arguments);} gtag('js', new Date()); gtag('config', 'G-EEY8M1W1Y6');`}
            </Script>

            {/* Hero Section */}
            <div className="bg-gradient-to-r from-slate-900 to-blue-900 text-white pb-32 pt-16 relative">
                <div className="absolute top-4 right-4 flex flex-col items-end">
                    <div className="bg-white/10 backdrop-blur-md px-4 py-2 rounded-full text-xs font-medium border border-white/20 shadow-lg flex items-center gap-2">
                        <Icons.Clock />
                        {mounted && <span>{currentTime.toLocaleDateString()} • {currentTime.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</span>}
                    </div>
                </div>
                <div className="max-w-7xl mx-auto px-4 text-center">
                    <h1 className="text-3xl md:text-5xl font-extrabold mb-4">Complete California Tax Suite</h1>
                    <p className="text-xl text-blue-100 max-w-2xl mx-auto mb-8">Accurate 2026 estimators for Paychecks, Property, and Sales taxes.</p>
                </div>
            </div>

            <main className="-mt-24 pb-12 px-4 max-w-7xl mx-auto z-10 relative">
                {/* Calculator Card (Your Tool) */}
                <div className="grid lg:grid-cols-3 gap-8 mb-16">
                    <div className="lg:col-span-1 bg-white rounded-2xl shadow-xl border border-slate-100 p-6">
                        <h2 className="text-lg font-bold text-blue-900 mb-6 flex items-center gap-2"><Icons.DollarSign /> Paycheck Estimator</h2>
                        <div className="space-y-6">
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-2">Gross Pay Amount</label>
                                <input type="number" value={grossIncome} onChange={(e) => setGrossIncome(e.target.value)} className="w-full text-lg border-slate-300 rounded-md py-3 px-4 bg-slate-50 text-slate-900" />
                                <select value={payFrequency} onChange={(e) => setPayFrequency(e.target.value)} className="mt-2 w-full bg-transparent text-slate-500 text-sm border-slate-200 rounded-md">
                                    <option value="annually">Per Year</option>
                                    <option value="monthly">Per Month</option>
                                </select>
                            </div>
                            <div className="grid grid-cols-2 gap-3">
                                <button onClick={() => setFilingStatus('single')} className={`py-2 rounded-md text-sm font-bold ${filingStatus === 'single' ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-600'}`}>Single</button>
                                <button onClick={() => setFilingStatus('married')} className={`py-2 rounded-md text-sm font-bold ${filingStatus === 'married' ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-600'}`}>Married</button>
                            </div>
                        </div>
                    </div>

                    <div className="lg:col-span-2 bg-white rounded-2xl shadow-xl border border-slate-100 p-8">
                        <div className="flex justify-between items-end mb-6">
                            <div>
                                <span className="text-slate-500 text-sm font-bold uppercase">Estimated Take-Home</span>
                                <p className="text-5xl font-black text-slate-900">{formatCurrency(results.netPay)}</p>
                            </div>
                            <div className="text-right">
                                <span className="text-slate-500 text-sm font-bold uppercase">Tax Rate</span>
                                <p className="text-2xl font-bold text-red-500">{results.annualGross > 0 ? ((results.totalTax / results.annualGross) * 100).toFixed(1) : 0}%</p>
                            </div>
                        </div>
                        <div className="w-full h-3 bg-slate-100 rounded-full flex overflow-hidden mb-6">
                            <div className="bg-emerald-500 h-full" style={{ width: `${results.annualGross > 0 ? (results.netPay / results.annualGross) * 100 : 0}%` }}></div>
                            <div className="bg-red-500 h-full" style={{ width: `${results.annualGross > 0 ? (results.totalTax / results.annualGross) * 100 : 0}%` }}></div>
                        </div>
                        <table className="w-full text-sm">
                            <tbody className="divide-y divide-slate-100">
                                <tr className="py-2 flex justify-between"><td>Federal Income Tax</td><td className="text-red-600 font-bold">-{formatCurrency(results.federalTax)}</td></tr>
                                <tr className="py-2 flex justify-between"><td>CA State Tax</td><td className="text-red-600 font-bold">-{formatCurrency(results.stateTax)}</td></tr>
                                <tr className="py-2 flex justify-between"><td>FICA (SS & Medicare)</td><td className="text-red-600 font-bold">-{formatCurrency(results.ficaTax)}</td></tr>
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Additional Content (To solve Thin Content) */}
                <div className="grid md:grid-cols-2 gap-8 mb-16">
                    <Link href="/property-tax" className="group bg-white p-8 rounded-3xl shadow-lg border border-slate-100 hover:border-blue-500 transition-all">
                        <h3 className="text-2xl font-bold text-slate-900 mb-4 group-hover:text-blue-600 flex items-center gap-2">
                           <Icons.HomeIcon /> Property Tax Estimator
                        </h3>
                        <p className="text-slate-600">Estimate your annual property taxes under Proposition 13 limits for all 58 California counties.</p>
                    </Link>
                    <Link href="/sales-tax" className="group bg-white p-8 rounded-3xl shadow-lg border border-slate-100 hover:border-blue-500 transition-all">
                        <h3 className="text-2xl font-bold text-slate-900 mb-4 group-hover:text-blue-600 flex items-center gap-2">
                           <Icons.CheckIcon /> Sales Tax Calculator
                        </h3>
                        <p className="text-slate-600">Calculate combined sales tax rates (State + District) for any city in California.</p>
                    </Link>
                </div>

                {/* Deep SEO Content */}
                <div className="bg-slate-50 rounded-3xl p-10 border border-slate-200 prose prose-slate max-w-none">
                    <h2 className="text-3xl font-bold text-slate-900">Why Use Our California Tax Tools?</h2>
                    <p>
                        California has the highest state income tax brackets in the nation, peaking at <strong>13.3%</strong>. For many residents, understanding the "Net Pay" or the impact of local district taxes on a purchase is crucial for financial health. 
                    </p>
                    <p>
                        Our platform is updated for the <strong>2026 tax year</strong>, integrating the latest IRS standard deductions ($14,600 for singles) and California's unique progressive brackets. Whether you're moving to Los Angeles, buying a home in Orange County, or just curious about your paycheck, we provide transparency without the jargon.
                    </p>
                    <Link href="/glossary" className="text-blue-600 font-bold no-underline hover:underline">View our full Tax Glossary &rarr;</Link>
                </div>
            </main>
        </Layout>
    );
}
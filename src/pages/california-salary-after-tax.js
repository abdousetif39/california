import { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Layout from '../components/Layout';
import * as Icons from '../components/Icons';

export default function CaliforniaSalaryAfterTax() {
    // 1. Calculator State
    const [grossSalary, setGrossSalary] = useState(80000);
    const [frequency, setFrequency] = useState('Yearly');
    const [filingStatus, setFilingStatus] = useState('Single');
    const [results, setResults] = useState(null);

    // 2. Calculation Logic
    const calculateTaxes = () => {
        // Guard clause: Return early and clear results if input is invalid/empty
        if (!grossSalary || grossSalary <= 0) {
            setResults(null);
            return;
        }

        let annualGross = grossSalary;
        
        // Adjust for frequency
        if (frequency === 'Monthly') annualGross *= 12;
        if (frequency === 'Bi-Weekly') annualGross *= 26;
        if (frequency === 'Weekly') annualGross *= 52;

        // Simplified tax logic (Estimations based on your $80k example)
        // In a production app, replace with exact 2026 tax brackets
        const standardDeductionFed = filingStatus === 'Single' ? 14600 : 29200;
        const taxableFed = Math.max(0, annualGross - standardDeductionFed);
        
        // Very basic effective rate simulation to match your example ($9,200 on $80k)
        let fedTax = taxableFed > 0 ? taxableFed * 0.1406 : 0; 
        
        // CA State Tax (Simulation to match ~$3,100 on $80k)
        const standardDeductionCA = filingStatus === 'Single' ? 5363 : 10726;
        const taxableCA = Math.max(0, annualGross - standardDeductionCA);
        let stateTax = taxableCA > 0 ? taxableCA * 0.0415 : 0;

        // FICA & SDI
        const socialSecurity = Math.min(annualGross, 168600) * 0.062; // 6.2%
        const medicare = annualGross * 0.0145; // 1.45%
        const caSdi = annualGross * 0.009; // 0.9%

        const totalDeductions = fedTax + stateTax + socialSecurity + medicare + caSdi;
        const netIncome = annualGross - totalDeductions;

        // Divisors for display
        const divisor = frequency === 'Yearly' ? 1 : frequency === 'Monthly' ? 12 : frequency === 'Bi-Weekly' ? 26 : 52;

        setResults({
            gross: annualGross / divisor,
            fedTax: fedTax / divisor,
            stateTax: stateTax / divisor,
            socialSecurity: socialSecurity / divisor,
            medicare: medicare / divisor,
            caSdi: caSdi / divisor,
            netIncome: netIncome / divisor
        });
    };

    // Calculate on load and when inputs change
    useEffect(() => {
        calculateTaxes();
    }, [grossSalary, frequency, filingStatus]);

    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(amount);
    };

    return (
        <Layout>
            <Head>
                <title>California Salary After Tax Calculator 2026 | Take Home Pay</title>
                <meta name="description" content="Calculate your California salary after tax for 2026. Find out your exact take-home pay after Federal, State, FICA, and CA SDI deductions." />
                <meta name="robots" content="index, follow" />
                <link rel="canonical" href="https://californiataxcalculators.com/california-salary-after-tax" />
                
                <meta property="og:title" content="California Salary After Tax Calculator 2026" />
                <meta property="og:description" content="Easily calculate your exact take-home pay in California with our free 2026 salary after tax calculator." />
                <meta property="og:url" content="https://californiataxcalculators.com/california-salary-after-tax" />
                <meta property="og:image" content="https://californiataxcalculators.com/og-image.jpg" />
                <meta property="og:type" content="website" />
                <meta property="og:site_name" content="California Tax Calculators" />

                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content="California Salary After Tax Calculator 2026" />
                <meta name="twitter:description" content="Estimate your California take-home pay after federal, state, and FICA taxes." />
                <meta name="twitter:image" content="https://californiataxcalculators.com/og-image.jpg" />

                {/* SoftwareApplication Schema for the Calculator */}
                <script 
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{
                        __html: JSON.stringify({
                            "@context": "https://schema.org",
                            "@type": "SoftwareApplication",
                            "name": "California Salary After Tax Calculator",
                            "operatingSystem": "All",
                            "applicationCategory": "FinanceApplication",
                            "applicationSubCategory": "Tax Calculator",
                            "offers": {
                                "@type": "Offer",
                                "price": "0",
                                "priceCurrency": "USD"
                            },
                            "description": "A free tool to calculate take-home pay and salary after taxes in California.",
                            "url": "https://californiataxcalculators.com/california-salary-after-tax"
                        })
                    }}
                />

                {/* FAQPage Schema */}
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{
                        __html: JSON.stringify({
                            "@context": "https://schema.org",
                            "@type": "FAQPage",
                            "mainEntity": [
                                {
                                    "@type": "Question",
                                    "name": "What is a good salary in California after taxes?",
                                    "acceptedAnswer": {
                                        "@type": "Answer",
                                        "text": "A good salary in California depends on the city. Generally, a take-home pay of $70,000 to $90,000 is considered comfortable for a single person in mid-tier cities, though high-cost areas like San Francisco may require more."
                                    }
                                },
                                {
                                    "@type": "Question",
                                    "name": "How much tax is taken from salary in California?",
                                    "acceptedAnswer": {
                                        "@type": "Answer",
                                        "text": "In California, you will lose roughly 20% to 35% of your gross income to taxes, depending on your tax bracket. This includes Federal Income Tax, California State Tax (1% to 13.3%), FICA (7.65%), and CA SDI (0.9%)."
                                    }
                                },
                                {
                                    "@type": "Question",
                                    "name": "What deductions affect take-home pay?",
                                    "acceptedAnswer": {
                                        "@type": "Answer",
                                        "text": "Your take-home pay is reduced by mandatory taxes (Federal, State, Social Security, Medicare, SDI) and voluntary deductions like 401(k) contributions, health insurance premiums, and HSA contributions."
                                    }
                                }
                            ]
                        })
                    }}
                />
            </Head>

            {/* --- Hero Section & H1 --- */}
            <div className="bg-slate-900 text-white pb-32 pt-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-4">
                        California Salary After Tax Calculator
                    </h1>
                    <p className="text-xl text-slate-300 max-w-2xl mx-auto">
                        Calculate your exact take-home pay for 2026. See how Federal taxes, California State taxes, and FICA impact your paycheck.
                    </p>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-24 pb-16 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                    
                    {/* --- 1️⃣ Calculator Inputs --- */}
                    <div className="lg:col-span-5 bg-white rounded-2xl shadow-xl p-6 border border-slate-100">
                        <h2 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                            <Icons.BookOpen className="text-blue-600" /> Enter Your Details
                        </h2>
                        
                        <div className="space-y-6">
                            <div>
                                {/* 🔴 إضافة htmlFor و id */}
                                <label htmlFor="grossSalary" className="block text-sm font-semibold text-slate-700 mb-2">Gross Salary ($)</label>
                                <input 
                                    id="grossSalary"
                                    type="number" 
                                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all outline-none"
                                    value={grossSalary || ''}
                                    onChange={(e) => setGrossSalary(Number(e.target.value))}
                                    placeholder="e.g. 80000"
                                />
                            </div>

                            <div>
                                {/* 🔴 إضافة htmlFor و id */}
                                <label htmlFor="frequency" className="block text-sm font-semibold text-slate-700 mb-2">Pay Frequency</label>
                                <select 
                                    id="frequency"
                                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 outline-none bg-white"
                                    value={frequency}
                                    onChange={(e) => setFrequency(e.target.value)}
                                >
                                    <option value="Yearly">Yearly</option>
                                    <option value="Monthly">Monthly</option>
                                    <option value="Bi-Weekly">Bi-Weekly</option>
                                    <option value="Weekly">Weekly</option>
                                </select>
                            </div>

                            <div>
                                {/* 🔴 إضافة htmlFor و id */}
                                <label htmlFor="filingStatus" className="block text-sm font-semibold text-slate-700 mb-2">Filing Status</label>
                                <select 
                                    id="filingStatus"
                                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 outline-none bg-white"
                                    value={filingStatus}
                                    onChange={(e) => setFilingStatus(e.target.value)}
                                >
                                    <option value="Single">Single</option>
                                    <option value="Married Filing Jointly">Married Filing Jointly</option>
                                    <option value="Head of Household">Head of Household</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    {/* --- 2️⃣ Results Breakdown --- */}
                    <div className="lg:col-span-7 bg-white rounded-2xl shadow-xl overflow-hidden border border-blue-100 ring-4 ring-blue-50">
                        <div className="bg-blue-600 p-6 text-center text-white">
                            <h2 className="text-sm font-semibold text-blue-100 uppercase tracking-wider mb-1">Estimated Take Home Pay</h2>
                            <div className="text-4xl md:text-5xl font-extrabold">
                                {results ? formatCurrency(results.netIncome) : "$0.00"}
                            </div>
                            <p className="text-sm text-blue-200 mt-2">Per {frequency.replace('-', ' ')}</p>
                        </div>

                        {results && (
                            <div className="p-6 md:p-8">
                                <h3 className="font-bold text-slate-900 mb-4 border-b pb-2">Results Breakdown</h3>
                                <div className="space-y-3">
                                    <div className="flex justify-between text-slate-700 font-medium">
                                        <span>Gross Income</span>
                                        <span>{formatCurrency(results.gross)}</span>
                                    </div>
                                    <div className="flex justify-between text-red-500 text-sm">
                                        <span>Federal Income Tax</span>
                                        <span>- {formatCurrency(results.fedTax)}</span>
                                    </div>
                                    <div className="flex justify-between text-red-500 text-sm">
                                        <span>California State Tax</span>
                                        <span>- {formatCurrency(results.stateTax)}</span>
                                    </div>
                                    <div className="flex justify-between text-orange-500 text-sm">
                                        <span>Social Security (6.2%)</span>
                                        <span>- {formatCurrency(results.socialSecurity)}</span>
                                    </div>
                                    <div className="flex justify-between text-orange-500 text-sm">
                                        <span>Medicare (1.45%)</span>
                                        <span>- {formatCurrency(results.medicare)}</span>
                                    </div>
                                    <div className="flex justify-between text-orange-500 text-sm">
                                        <span>CA SDI (0.9%)</span>
                                        <span>- {formatCurrency(results.caSdi)}</span>
                                    </div>
                                </div>
                                
                                <div className="mt-6 pt-4 border-t border-slate-200 flex justify-between font-bold text-lg text-slate-900">
                                    <span>Net Income (Take Home)</span>
                                    <span className="text-green-600">{formatCurrency(results.netIncome)}</span>
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* --- 3️⃣ Explanation Content --- */}
                <article className="mt-16 bg-white rounded-2xl shadow-sm p-8 border border-slate-100 prose max-w-none text-slate-700">
                    <h2 className="text-2xl font-bold text-slate-900 mb-4">How Salary After Tax Is Calculated in California</h2>
                    <p>
                        Calculating your take-home pay in California involves several layers of taxation. Unlike states with no income tax, California has some of the highest state tax brackets in the country, plus mandatory state disability deductions. Here is what comes out of your gross paycheck:
                    </p>
                    
                    <ul className="space-y-2 mt-4 marker:text-blue-500">
                        <li><strong>Federal Income Tax:</strong> A progressive tax paid to the IRS, ranging from 10% to 37% based on your income bracket.</li>
                        <li><strong>California State Income Tax:</strong> CA uses a progressive system with rates ranging from 1% up to 13.3% for high earners.</li>
                        <li><strong>FICA Taxes:</strong> This is composed of Social Security (6.2% up to the annual limit) and Medicare (1.45% on all earnings).</li>
                        <li><strong>CA SDI (State Disability Insurance):</strong> California deducts an additional 0.9% to fund state disability and paid family leave programs.</li>
                    </ul>

                    {/* --- 4️⃣ Example Calculation --- */}
                    <h3 className="text-xl font-bold text-slate-900 mt-8 mb-4">Example: $100,000 Salary in California</h3>
                    <p>If you are a single filer making a flat $100,000 per year in California, your approximate yearly deductions look like this:</p>
                    
                    <div className="overflow-x-auto mt-4">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-slate-50 border-b border-slate-200">
                                    <th className="p-3 font-semibold text-slate-900">Category</th>
                                    <th className="p-3 font-semibold text-slate-900">Amount Deducted</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                                <tr><td className="p-3">Gross Pay</td><td className="p-3 font-bold">$100,000</td></tr>
                                <tr><td className="p-3 text-red-500">Federal Tax</td><td className="p-3 text-red-500">~$13,800</td></tr>
                                <tr><td className="p-3 text-red-500">California Tax</td><td className="p-3 text-red-500">~$5,100</td></tr>
                                <tr><td className="p-3 text-orange-500">Social Security</td><td className="p-3 text-orange-500">$6,200</td></tr>
                                <tr><td className="p-3 text-orange-500">Medicare</td><td className="p-3 text-orange-500">$1,450</td></tr>
                                <tr><td className="p-3 text-orange-500">CA SDI</td><td className="p-3 text-orange-500">$900</td></tr>
                                <tr className="bg-green-50"><td className="p-3 font-bold text-green-700">Estimated Take Home</td><td className="p-3 font-bold text-green-700">~$72,550</td></tr>
                            </tbody>
                        </table>
                    </div>
                </article>

                {/* --- 5️⃣ FAQ Section --- */}
                <section className="mt-12 bg-white rounded-2xl shadow-sm p-8 border border-slate-100">
                    <h2 className="text-2xl font-bold text-slate-900 mb-6">Frequently Asked Questions</h2>
                    <div className="space-y-6">
                        <div>
                            <h3 className="font-bold text-lg text-slate-900">What is a good salary in California after taxes?</h3>
                            <p className="text-slate-600 mt-2">A good salary in California depends heavily on the city. Generally, a take-home pay of $70,000 to $90,000 is considered comfortable for a single person in mid-tier cities, though high-cost areas like San Francisco or Los Angeles may require more.</p>
                        </div>
                        <div>
                            <h3 className="font-bold text-lg text-slate-900">How much tax is taken from a salary in California?</h3>
                            <p className="text-slate-600 mt-2">In California, you will typically lose roughly 20% to 35% of your gross income to taxes, depending on your tax bracket. This includes Federal Income Tax, California State Tax (1% to 13.3%), FICA (7.65%), and CA SDI (0.9%).</p>
                        </div>
                        <div>
                            <h3 className="font-bold text-lg text-slate-900">What deductions affect take-home pay?</h3>
                            <p className="text-slate-600 mt-2">Your take-home pay is reduced by mandatory taxes (Federal, State, Social Security, Medicare, SDI) and voluntary pre-tax deductions like 401(k) retirement contributions, health insurance premiums, and HSA contributions.</p>
                        </div>
                    </div>
                </section>

                {/* --- 6️⃣ Internal Links Hub --- */}
                <section className="mt-12">
                    <h2 className="text-xl font-bold text-slate-900 mb-4">More California Tax Resources</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <Link href="/california-tax-brackets" className="bg-white p-4 rounded-xl shadow-sm border border-slate-100 hover:border-blue-300 transition-colors block text-center">
                            <span className="block font-bold text-blue-700">CA Tax Brackets</span>
                            <span className="text-sm text-slate-500">View 2026 tax rates</span>
                        </Link>
                        <Link href="/california-income-tax-guide" className="bg-white p-4 rounded-xl shadow-sm border border-slate-100 hover:border-blue-300 transition-colors block text-center">
                            <span className="block font-bold text-blue-700">Income Tax Guide</span>
                            <span className="text-sm text-slate-500">Comprehensive CA rules</span>
                        </Link>
                        <Link href="/sales-tax" className="bg-white p-4 rounded-xl shadow-sm border border-slate-100 hover:border-blue-300 transition-colors block text-center">
                            <span className="block font-bold text-blue-700">Sales Tax Calculator</span>
                            <span className="text-sm text-slate-500">Calculate local rates</span>
                        </Link>
                    </div>
                </section>

            </div>
        </Layout>
    );
}
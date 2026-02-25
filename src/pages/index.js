import { useState, useEffect } from 'react';
import Head from 'next/head';
import Script from 'next/script';
import Link from 'next/link';
import Layout from '../components/Layout';

export default function Home() {
  const [mounted, setMounted] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());

  const [grossIncome, setGrossIncome] = useState(75000);
  const [filingStatus, setFilingStatus] = useState('single');
  const [payFrequency, setPayFrequency] = useState('annually');
  const [results, setResults] = useState({
    federalTax: 0, stateTax: 0, ficaTax: 0, netPay: 0, totalTax: 0, annualGross: 0
  });

  useEffect(() => {
    setMounted(true);
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
        else caTax = taxableIncome * 0.093;
    }

    const fica = Math.min(income, 168600) * 0.062 + (income * 0.0145);
    const totalTax = fedTax + caTax + fica;

    setResults({ 
        federalTax: fedTax, stateTax: caTax, ficaTax: fica, netPay: income - totalTax, totalTax: totalTax, annualGross: income 
    });
  };

  useEffect(() => { calculateIncomeTax(); }, [grossIncome, filingStatus, payFrequency]);

  const formatCurrency = (amount) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(amount);

  return (
    <Layout>
      <Head>
        <title>California Tax Calculator 2026 | Accurate Paycheck & Tax Estimator</title>
        <meta name="description" content="Free 2026 California tax calculators. Estimate your net pay, property tax, and sales tax with updated rates for the Golden State." />
        <link rel="canonical" href="https://californiataxcalculators.com/" />
      </Head>

      <Script src="https://www.googletagmanager.com/gtag/js?id=G-EEY8M1W1Y6" strategy="afterInteractive" />
      <Script id="google-analytics" strategy="afterInteractive">
        {`window.dataLayer = window.dataLayer || []; function gtag(){dataLayer.push(arguments);} gtag('js', new Date()); gtag('config', 'G-EEY8M1W1Y6');`}
      </Script>

      {/* Hero Section */}
      <div className="bg-gradient-to-r from-slate-900 to-blue-900 text-white pb-32 pt-20 text-center px-4">
        <h1 className="text-4xl md:text-6xl font-extrabold mb-6 tracking-tight">California Tax Suite <span className="text-blue-400">2026</span></h1>
        <p className="text-xl text-blue-100 max-w-3xl mx-auto leading-relaxed">
            Fast, secure, and accurate financial tools for homeowners and employees across California.
        </p>
      </div>

      <main className="-mt-24 pb-12 px-4 max-w-7xl mx-auto z-10 relative">
        {/* Main Calculator Card */}
        <div className="grid lg:grid-cols-3 gap-8 mb-16">
          <div className="lg:col-span-1 bg-white rounded-3xl shadow-2xl p-8 border border-slate-100">
            <h2 className="text-xl font-bold text-blue-900 mb-6">💵 Paycheck Calculator</h2>
            <div className="space-y-6">
                <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">Gross Income ($)</label>
                    <input type="number" value={grossIncome} onChange={(e) => setGrossIncome(e.target.value)} className="w-full text-lg border-slate-300 rounded-xl py-3 px-4 bg-slate-50 text-slate-900 focus:ring-2 focus:ring-blue-500 outline-none transition" />
                </div>
                <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">Filing Status</label>
                    <div className="grid grid-cols-2 gap-2">
                        <button onClick={() => setFilingStatus('single')} className={`py-3 rounded-xl font-bold transition ${filingStatus === 'single' ? 'bg-blue-600 text-white shadow-lg' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}>Single</button>
                        <button onClick={() => setFilingStatus('married')} className={`py-3 rounded-xl font-bold transition ${filingStatus === 'married' ? 'bg-blue-600 text-white shadow-lg' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}>Married</button>
                    </div>
                </div>
            </div>
          </div>

          <div className="lg:col-span-2 bg-white rounded-3xl shadow-2xl p-8 border border-slate-100 flex flex-col justify-center">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                <div>
                    <span className="text-slate-500 text-xs font-bold uppercase tracking-widest">Take-Home Pay (Annual)</span>
                    <p className="text-6xl font-black text-slate-900 mt-1">{formatCurrency(results.netPay)}</p>
                </div>
                <div className="text-right">
                    <span className="text-slate-500 text-xs font-bold uppercase tracking-widest">Tax Rate</span>
                    <p className="text-3xl font-bold text-red-500">{results.annualGross > 0 ? ((results.totalTax / results.annualGross) * 100).toFixed(1) : 0}%</p>
                </div>
            </div>
            <div className="space-y-4 border-t border-slate-100 pt-6">
                <div className="flex justify-between text-lg"><span>Federal Tax Withholding</span><span className="text-red-500 font-bold">-{formatCurrency(results.federalTax)}</span></div>
                <div className="flex justify-between text-lg"><span>California State Tax</span><span className="text-red-500 font-bold">-{formatCurrency(results.stateTax)}</span></div>
                <div className="flex justify-between text-lg"><span>FICA (SS & Medicare)</span><span className="text-red-500 font-bold">-{formatCurrency(results.ficaTax)}</span></div>
            </div>
          </div>
        </div>

        {/* Tools Grid */}
        <div className="grid md:grid-cols-2 gap-8 mb-20">
            <Link href="/property-tax" className="group bg-white p-10 rounded-3xl shadow-xl border border-slate-100 hover:border-blue-500 transition-all">
                <h3 className="text-3xl font-bold text-slate-900 mb-4 group-hover:text-blue-600">🏠 Property Tax Tool</h3>
                <p className="text-slate-600 text-lg leading-relaxed">Calculate your annual property tax based on Proposition 13 and local assessments in all CA counties.</p>
            </Link>
            <Link href="/sales-tax" className="group bg-white p-10 rounded-3xl shadow-xl border border-slate-100 hover:border-blue-500 transition-all">
                <h3 className="text-3xl font-bold text-slate-900 mb-4 group-hover:text-blue-600">🛍️ Sales Tax Calculator</h3>
                <p className="text-slate-600 text-lg leading-relaxed">Instantly find combined sales tax rates for every city in California, including district taxes.</p>
            </Link>
        </div>

        {/* SEO Article Section - Deep Content */}
        <div className="bg-slate-50 rounded-3xl p-12 border border-slate-200">
            <h2 className="text-3xl font-bold text-slate-900 mb-8">Navigating California's Tax Landscape in 2026</h2>
            <div className="grid md:grid-cols-2 gap-12 text-slate-700 leading-relaxed text-lg">
                <div className="space-y-4">
                    <p>
                        California's tax system is one of the most complex in the United States. With progressive income tax brackets that range from <strong>1% to 13.3%</strong>, understanding your true take-home pay requires precise calculation.
                    </p>
                    <p>
                        Our 2026 tools are updated with the latest federal standard deductions and California's unique tax laws to ensure your financial planning is based on real-world data.
                    </p>
                </div>
                <div className="space-y-4">
                    <p>
                        Beyond income, California homeowners benefit from <strong>Proposition 13</strong>, which limits property tax increases. However, local bonds and special assessments often add complexity to the final bill. 
                    </p>
                    <p>
                        We provide transparency across all 58 counties, helping you estimate everything from daily sales tax to long-term property investments.
                    </p>
                </div>
            </div>
            <div className="mt-10 border-t pt-8">
                <Link href="/glossary" className="text-blue-600 font-bold text-xl hover:underline">Explore the Tax Glossary &rarr;</Link>
            </div>
        </div>

        {/* FAQ Section */}
        <div className="mt-20 max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-slate-900 mb-10 text-center">Common California Tax Questions</h2>
            <div className="space-y-6">
                <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100">
                    <h3 className="font-bold text-xl text-slate-900 mb-3">Is California's income tax progressive?</h3>
                    <p className="text-slate-600">Yes, California uses a progressive system with multiple brackets. As your income increases, the tax rate on the higher portion of your income also increases, reaching a maximum of 13.3%.</p>
                </div>
                <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100">
                    <h3 className="font-bold text-xl text-slate-900 mb-3">How often are tax rates updated?</h3>
                    <p className="text-slate-600">Our calculators are updated annually to reflect changes in federal and state laws. Local sales tax district changes are monitored throughout the year.</p>
                </div>
            </div>
        </div>
      </main>
    </Layout>
  );
}
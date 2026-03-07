import { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import Layout from '../components/Layout';
import * as Icons from '../components/Icons';
import citiesData from '../data/ca-cities.json'; // ✅ تم استيراد بيانات المدن هنا

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
    
    // التحديث كل 60 ثانية لمنع إعادة التصيير المستمر
    const timer = setInterval(() => setCurrentTime(new Date()), 60000);
    return () => clearInterval(timer);
  }, []);

  const calculateIncomeTax = () => {
    let income = parseFloat(grossIncome) || 0;
    if (payFrequency === 'monthly') income *= 12;
    if (payFrequency === 'biweekly') income *= 26;
    if (payFrequency === 'weekly') income *= 52;

    const standardDeduction = filingStatus === 'single' ? 14600 : 29200;
    const taxableIncome = Math.max(0, income - standardDeduction);

    // شرائح الضرائب الفيدرالية
    let fedTax = 0;
    if (taxableIncome > 0) {
        if (taxableIncome < 11600) fedTax = taxableIncome * 0.10;
        else if (taxableIncome < 47150) fedTax = 1160 + (taxableIncome - 11600) * 0.12;
        else if (taxableIncome < 100525) fedTax = 5426 + (taxableIncome - 47150) * 0.22;
        else if (taxableIncome < 191950) fedTax = 17168 + (taxableIncome - 100525) * 0.24;
        else if (taxableIncome < 243725) fedTax = 39110 + (taxableIncome - 191950) * 0.32;
        else if (taxableIncome < 609350) fedTax = 55678 + (taxableIncome - 243725) * 0.35;
        else fedTax = 183646 + (taxableIncome - 609350) * 0.37;
    }

    // شرائح الضرائب لولاية كاليفورنيا
    let caTax = 0;
    if (taxableIncome > 0) {
        if (taxableIncome < 10412) caTax = taxableIncome * 0.01;
        else if (taxableIncome < 24684) caTax = 104.12 + (taxableIncome - 10412) * 0.02;
        else if (taxableIncome < 38959) caTax = 389.56 + (taxableIncome - 24684) * 0.04;
        else if (taxableIncome < 54081) caTax = 960.56 + (taxableIncome - 38959) * 0.06;
        else if (taxableIncome < 68350) caTax = 1867.88 + (taxableIncome - 54081) * 0.08;
        else if (taxableIncome < 349137) caTax = 3009.40 + (taxableIncome - 68350) * 0.093; 
        else if (taxableIncome < 418961) caTax = 29122.59 + (taxableIncome - 349137) * 0.103;
        else if (taxableIncome < 698271) caTax = 36314.46 + (taxableIncome - 418961) * 0.113;
        else if (taxableIncome < 1000000) caTax = 67876.49 + (taxableIncome - 698271) * 0.123;
        else caTax = 104989.16 + (taxableIncome - 1000000) * 0.133;
    }

    const ssCap = 168600;
    const ssTax = Math.min(income, ssCap) * 0.062;
    const medicareTax = income * 0.0145;
    const fica = ssTax + medicareTax;

    const totalTax = fedTax + caTax + fica;
    const net = income - totalTax;

    setResults({ federalTax: fedTax, stateTax: caTax, ficaTax: fica, netPay: net, totalTax: totalTax, annualGross: income });
  };

  useEffect(() => { calculateIncomeTax(); }, [grossIncome, filingStatus, payFrequency]);

  const formatCurrency = (amount) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(amount);

  return (
    <Layout>
      <Head>
        <title>California Tax Calculator 2026 | Paycheck & Income Estimator</title>
        <meta name="description" content="Free and accurate California tax calculator for 2026. Estimate your net pay, federal tax, state tax, and FICA withholdings." />
        <link rel="canonical" href="https://californiataxcalculators.com/" />
        
        <meta name="robots" content="index, follow" />
        
        {/* WebSite Schema */}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebSite",
            "name": "California Tax Calculators",
            "url": "https://californiataxcalculators.com"
        })}} />

        {/* SoftwareApplication Schema */}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            "name": "California Paycheck Calculator 2026",
            "applicationCategory": "FinanceApplication",
            "operatingSystem": "Web",
            "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" }
        })}} />

        {/* FAQPage Schema */}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": [
                {
                    "@type": "Question",
                    "name": "Does California tax Social Security benefits?",
                    "acceptedAnswer": {
                        "@type": "Answer",
                        "text": "No. California does not tax Social Security retirement benefits."
                    }
                },
                {
                    "@type": "Question",
                    "name": "What is the highest tax rate in California?",
                    "acceptedAnswer": {
                        "@type": "Answer",
                        "text": "The highest marginal income tax rate in California is 13.3%."
                    }
                }
            ]
        })}} />
      </Head>

      <div className="bg-gradient-to-r from-slate-900 to-blue-900 text-white pb-32 pt-16 relative">
        <div className="absolute top-4 right-4 md:top-8 md:right-8 flex flex-col items-end">
            <div className="bg-white/10 backdrop-blur-md px-4 py-2 rounded-full text-xs md:text-sm font-medium border border-white/20 shadow-lg flex items-center gap-2">
                <Icons.Clock />
                {mounted && (
                  <span>
                      {currentTime.toLocaleDateString(undefined, { weekday: 'short', month: 'short', day: 'numeric' })} • {currentTime.toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit' })}
                  </span>
                )}
            </div>
            {mounted && timeZone && <span className="text-[10px] text-blue-200 mt-1 mr-2">{timeZone}</span>}
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mt-8 md:mt-0">
          <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-4">California Paycheck Calculator</h1>
          <p className="text-xl text-blue-100 max-w-2xl mx-auto mb-8">Estimate your 2026 federal and state tax withholding.</p>
        </div>
      </div>

      <main className="-mt-24 pb-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto z-10 relative">
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1 bg-white rounded-2xl shadow-xl overflow-hidden border border-slate-100">
            <div className="bg-blue-50 px-6 py-4 border-b border-blue-100">
              <h2 className="text-lg font-bold text-blue-900 flex items-center gap-2"><Icons.DollarSign /> Income Details</h2>
            </div>
            <div className="p-6 space-y-6">
              <div>
                <label htmlFor="grossIncome" className="block text-sm font-medium text-slate-700 mb-2">Gross Pay Amount</label>
                <div className="relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"><span className="text-slate-500 sm:text-sm">$</span></div>
                  <input 
                    id="grossIncome"
                    type="number" 
                    min="0" 
                    step="1000" 
                    value={grossIncome} 
                    onChange={(e) => setGrossIncome(e.target.value)} 
                    className="focus:ring-blue-500 focus:border-blue-500 block w-full pl-7 pr-12 text-slate-900 sm:text-lg border-slate-300 rounded-md py-3 bg-slate-50" 
                  />
                  <div className="absolute inset-y-0 right-0 flex items-center">
                    <label htmlFor="payFrequency" className="sr-only">Pay Frequency</label>
                    <select id="payFrequency" value={payFrequency} onChange={(e) => setPayFrequency(e.target.value)} className="focus:ring-blue-500 focus:border-blue-500 h-full py-0 pl-2 pr-7 border-transparent bg-transparent text-slate-500 sm:text-sm rounded-md">
                      <option value="annually">/ Year</option>
                      <option value="monthly">/ Month</option>
                      <option value="biweekly">/ 2 Weeks</option>
                    </select>
                  </div>
                </div>
              </div>
              <div>
                <div id="filingStatusLabel" className="block text-sm font-medium text-slate-700 mb-2">Filing Status</div>
                <div role="group" aria-labelledby="filingStatusLabel" className="grid grid-cols-2 gap-3">
                  <button aria-pressed={filingStatus === 'single'} onClick={() => setFilingStatus('single')} className={`px-4 py-2 border rounded-md text-sm font-medium transition-colors ${filingStatus === 'single' ? 'bg-blue-600 text-white border-blue-600' : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-50'}`}>Single</button>
                  <button aria-pressed={filingStatus === 'married'} onClick={() => setFilingStatus('married')} className={`px-4 py-2 border rounded-md text-sm font-medium transition-colors ${filingStatus === 'married' ? 'bg-blue-600 text-white border-blue-600' : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-50'}`}>Married</button>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-2xl shadow-xl border border-slate-100 p-6 md:p-8">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 gap-4">
                    <div><h3 className="text-slate-500 font-medium text-sm uppercase tracking-wide">Estimated Annual Net Pay</h3><div className="text-5xl font-extrabold text-slate-900 mt-2">{formatCurrency(results.netPay)}</div></div>
                </div>
                <div className="overflow-hidden border border-slate-200 rounded-lg">
                    <table className="min-w-full divide-y divide-slate-200 text-slate-900">
                        <thead className="bg-slate-50"><tr><th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase">Tax Type</th><th className="px-6 py-3 text-right text-xs font-medium text-slate-500 uppercase">Amount</th></tr></thead>
                        <tbody className="bg-white divide-y divide-slate-200">
                            <tr><td className="px-6 py-4 text-sm font-medium">Federal Income Tax</td><td className="px-6 py-4 text-sm text-right text-red-600 font-bold">- {formatCurrency(results.federalTax)}</td></tr>
                            <tr><td className="px-6 py-4 text-sm font-medium">California State Tax</td><td className="px-6 py-4 text-sm text-right text-red-600 font-bold">- {formatCurrency(results.stateTax)}</td></tr>
                            <tr><td className="px-6 py-4 text-sm font-medium">FICA (SS & Medicare)</td><td className="px-6 py-4 text-sm text-right text-red-600 font-bold">- {formatCurrency(results.ficaTax)}</td></tr>
                        </tbody>
                    </table>
                </div>
            </div>
          </div>
        </div>

        {/* CTA & Internal Links */}
        <div className="mt-12 bg-white rounded-2xl shadow-lg border border-slate-100 p-8 md:p-10">
            <div className="max-w-3xl">
                <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-4">Understand Your California Taxes</h2>
                <p className="text-lg text-slate-600 mb-8 leading-relaxed">
                    Navigating California's tax brackets can be complicated. Knowing the difference between federal taxes, state taxes, and payroll deductions (like FICA) is crucial for accurate financial planning in 2026.
                </p>
                <div className="flex flex-col sm:flex-row flex-wrap gap-4">
                    <Link href="/california-income-tax-guide" className="inline-flex justify-center items-center bg-blue-50 text-blue-700 font-bold px-6 py-4 rounded-xl hover:bg-blue-100 transition-colors border border-blue-200">
                        Read the Full Income Tax Guide →
                    </Link>
                    <Link href="/property-tax" className="inline-flex justify-center items-center bg-slate-50 text-slate-700 font-semibold px-6 py-4 rounded-xl hover:bg-slate-100 transition-colors border border-slate-200">
                        Estimate Property Tax
                    </Link>
                    <Link href="/sales-tax" className="inline-flex justify-center items-center bg-slate-50 text-slate-700 font-semibold px-6 py-4 rounded-xl hover:bg-slate-100 transition-colors border border-slate-200">
                        Calculate Sales Tax
                    </Link>
                </div>
            </div>
        </div>

        {/* SEO Content Section 1 */}
        <section className="mt-12 bg-white rounded-2xl shadow-lg border border-slate-100 p-8 md:p-10">
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-6">
            How California Income Tax Works
          </h2>
          
          <Image
            src="/og-image.jpg"
            alt="California income tax calculation and planning for 2026"
            width={1200}
            height={630}
            sizes="(max-width: 768px) 100vw, 1200px"
            className="w-full h-auto rounded-xl shadow-md border border-slate-200 my-8 object-cover max-h-96"
          />

          <p className="text-slate-600 leading-relaxed mb-4">
            California uses a progressive income tax system. This means that the tax rate you pay increases as your income rises. Instead of applying one flat rate to all income, California divides taxable income into brackets. Each bracket is taxed at a different rate.
          </p>
          <p className="text-slate-600 leading-relaxed mb-4">
            For example, the first portion of your income may be taxed at only 1%, while higher portions may be taxed at rates above 9%. High-income earners may even pay additional surcharges under certain circumstances.
          </p>
          <p className="text-slate-600 leading-relaxed">
            Our calculator above estimates your combined federal income tax, California state income tax, and payroll deductions such as Social Security and Medicare. This helps you better understand your real take-home pay after taxes.
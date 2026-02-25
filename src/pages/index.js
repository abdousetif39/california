import { useState, useEffect } from 'react';
import Head from 'next/head';
import Script from 'next/script';
import Link from 'next/link';
import Layout from '../components/Layout';
import * as Icons from '../components/Icons';

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
        federalTax: fedTax, 
        stateTax: caTax, 
        ficaTax: fica, 
        netPay: income - totalTax, 
        totalTax: totalTax, 
        annualGross: income 
    });
  };

  useEffect(() => { calculateIncomeTax(); }, [grossIncome, filingStatus, payFrequency]);

  const formatCurrency = (amount) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(amount);

  return (
    <Layout>
      <Head>
        <title>California Tax Calculator 2026 | Paycheck, Sales & Property Estimator</title>
        <meta name="description" content="Calculate your 2026 California paycheck, sales tax, and property taxes with our free, accurate tools." />
      </Head>

      <Script src="https://www.googletagmanager.com/gtag/js?id=G-EEY8M1W1Y6" strategy="afterInteractive" />
      <Script id="google-analytics" strategy="afterInteractive">
        {`window.dataLayer = window.dataLayer || []; function gtag(){dataLayer.push(arguments);} gtag('js', new Date()); gtag('config', 'G-EEY8M1W1Y6');`}
      </Script>

      <div className="bg-gradient-to-r from-slate-900 to-blue-900 text-white pb-32 pt-16 relative text-center px-4">
        <h1 className="text-3xl md:text-5xl font-extrabold mb-4">California Tax Suite 2026</h1>
        <p className="text-xl text-blue-100 max-w-2xl mx-auto">Precise calculators for Income, Property, and Sales Tax.</p>
      </div>

      <main className="-mt-24 pb-12 px-4 max-w-7xl mx-auto z-10 relative">
        <div className="grid lg:grid-cols-3 gap-8 mb-12">
          {/* مدخلات الراتب */}
          <div className="lg:col-span-1 bg-white rounded-2xl shadow-xl p-6 border border-slate-100">
            <h2 className="text-lg font-bold text-blue-900 mb-6 flex items-center gap-2"><Icons.DollarSign /> Paycheck Tool</h2>
            <div className="space-y-4">
                <label className="block text-sm font-medium text-slate-700">Gross Pay Amount</label>
                <input type="number" value={grossIncome} onChange={(e) => setGrossIncome(e.target.value)} className="w-full text-lg border-slate-300 rounded-md py-3 px-4 bg-slate-50 text-slate-900" />
                <div className="grid grid-cols-2 gap-2">
                    <button onClick={() => setFilingStatus('single')} className={`py-2 rounded-md font-bold ${filingStatus === 'single' ? 'bg-blue-600 text-white' : 'bg-slate-100'}`}>Single</button>
                    <button onClick={() => setFilingStatus('married')} className={`py-2 rounded-md font-bold ${filingStatus === 'married' ? 'bg-blue-600 text-white' : 'bg-slate-100'}`}>Married</button>
                </div>
            </div>
          </div>

          {/* نتائج الراتب */}
          <div className="lg:col-span-2 bg-white rounded-2xl shadow-xl p-8 border border-slate-100">
            <div className="flex justify-between items-end mb-6">
                <div>
                    <span className="text-slate-500 text-xs font-bold uppercase">Estimated Annual Net</span>
                    <p className="text-4xl font-black text-slate-900">{formatCurrency(results.netPay)}</p>
                </div>
            </div>
            <div className="space-y-3 border-t pt-4">
                <div className="flex justify-between text-sm"><span>Federal Tax</span><span className="text-red-500">-{formatCurrency(results.federalTax)}</span></div>
                <div className="flex justify-between text-sm"><span>CA State Tax</span><span className="text-red-500">-{formatCurrency(results.stateTax)}</span></div>
            </div>
          </div>
        </div>

        {/* روابط الأدوات الأخرى (لزيادة المحتوى) */}
        <div className="grid md:grid-cols-2 gap-8">
            <Link href="/property-tax" className="bg-white p-8 rounded-2xl shadow-lg border hover:border-blue-500 transition-all">
                <h3 className="text-2xl font-bold text-slate-900 mb-2 flex items-center gap-2">🏠 Property Tax</h3>
                <p className="text-slate-600">Estimate your annual property taxes under Prop 13 limits.</p>
            </Link>
            <Link href="/sales-tax" className="bg-white p-8 rounded-2xl shadow-lg border hover:border-blue-500 transition-all">
                <h3 className="text-2xl font-bold text-slate-900 mb-2 flex items-center gap-2">🛍️ Sales Tax</h3>
                <p className="text-slate-600">Calculate sales tax rates for any city or county in CA.</p>
            </Link>
        </div>
      </main>
    </Layout>
  );
}
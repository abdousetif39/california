import { useState, useEffect } from 'react';
import Head from 'next/head';
import Script from 'next/script'; // إضافة Script لجوجل أناليتكس
import Layout from '../components/Layout';
import * as Icons from '../components/Icons'; // استخدام هذا النمط لتجنب أخطاء الأسماء

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

    // حساب الضريبة الفيدرالية 2026 (تقديري)
    let fedTax = 0;
    if (taxableIncome > 0) {
        if (taxableIncome < 11600) fedTax = taxableIncome * 0.10;
        else if (taxableIncome < 47150) fedTax = 1160 + (taxableIncome - 11600) * 0.12;
        else if (taxableIncome < 100525) fedTax = 5426 + (taxableIncome - 47150) * 0.22;
        else if (taxableIncome < 191950) fedTax = 17168 + (taxableIncome - 100525) * 0.24;
        else fedTax = taxableIncome * 0.28;
    }

    // حساب ضريبة كاليفورنيا 2026
    let caTax = 0;
    if (taxableIncome > 0) {
        if (taxableIncome < 10412) caTax = taxableIncome * 0.01;
        else if (taxableIncome < 24684) caTax = 104.12 + (taxableIncome - 10412) * 0.02;
        else if (taxableIncome < 38959) caTax = 389.56 + (taxableIncome - 24684) * 0.04;
        else if (taxableIncome < 54081) caTax = 960.56 + (taxableIncome - 38959) * 0.06;
        else if (taxableIncome < 68350) caTax = 1867.88 + (taxableIncome - 54081) * 0.08;
        else caTax = taxableIncome * 0.093;
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
        {/* ✅ تصحيح وسوم OG: الصفحة الرئيسية يجب أن تحمل عنوان الموقع العام وليس Sales Tax فقط */}
        <title>California Tax Calculator 2026 | Paycheck, Sales & Property Estimator</title>
        <meta name="description" content="Free and accurate California tax calculators for 2026. Estimate your net pay, sales tax by city, and property taxes." />
        <meta property="og:title" content="California Tax Calculators 2026" />
        <meta property="og:description" content="Calculate your income, sales, and property taxes with our free 2026 tools." />
        <meta property="og:url" content="https://californiataxcalculators.com/" />
        <meta property="og:image" content="https://californiataxcalculators.com/og-image.jpg" />
        <meta property="og:type" content="website" />
        <link rel="canonical" href="https://californiataxcalculators.com/" />
      </Head>

      {/* ✅ إضافة كود تتبع جوجل لضمان احتساب الزيارات من الصفحة الرئيسية */}
      <Script src="https://www.googletagmanager.com/gtag/js?id=G-EEY8M1W1Y6" strategy="afterInteractive" />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-EEY8M1W1Y6');
        `}
      </Script>

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
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8 border border-slate-100">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">California Tax Calculator (2026)</h2>
            <p className="text-slate-700 mb-4 leading-relaxed">
                CaliforniaTaxCalculators.com provides free and accurate California tax calculators to help residents estimate their income tax, paycheck deductions, sales tax, and property tax for the 2026 tax year.
            </p>
            <p className="text-slate-700 mb-4 leading-relaxed">
                Our California tax calculator is designed for employees, freelancers, and self-employed individuals who want a clear breakdown of federal tax, California state tax, and FICA deductions. Simply enter your annual or hourly income to instantly see your estimated take-home pay.
            </p>
            <p className="text-slate-700 leading-relaxed">
                California has one of the most complex tax systems in the United States, with progressive income tax brackets reaching up to 13.3%, varying sales tax rates by county, and property tax rules under Proposition 13. Our tools simplify these calculations so you can plan your finances with confidence.
            </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1 bg-white rounded-2xl shadow-xl overflow-hidden border border-slate-100">
            <div className="bg-blue-50 px-6 py-4 border-b border-blue-100">
              <h2 className="text-lg font-bold text-blue-900 flex items-center gap-2"><Icons.DollarSign /> Income Details</h2>
            </div>
            <div className="p-6 space-y-6">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Gross Pay Amount</label>
                <div className="relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"><span className="text-slate-500 sm:text-sm">$</span></div>
                  <input type="number" value={grossIncome} onChange={(e) => setGrossIncome(e.target.value)} className="focus:ring-blue-500 focus:border-blue-500 block w-full pl-7 pr-12 text-slate-900 sm:text-lg border-slate-300 rounded-md py-3 bg-slate-50" />
                  <div className="absolute inset-y-0 right-0 flex items-center">
                    <select value={payFrequency} onChange={(e) => setPayFrequency(e.target.value)} className="focus:ring-blue-500 focus:border-blue-500 h-full py-0 pl-2 pr-7 border-transparent bg-transparent text-slate-500 sm:text-sm rounded-md">
                      <option value="annually">/ Year</option>
                      <option value="monthly">/ Month</option>
                      <option value="biweekly">/ 2 Weeks</option>
                    </select>
                  </div>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Filing Status</label>
                <div className="grid grid-cols-2 gap-3">
                  <button onClick={() => setFilingStatus('single')} className={`px-4 py-2 border rounded-md text-sm font-medium transition-colors ${filingStatus === 'single' ? 'bg-blue-600 text-white border-blue-600' : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-50'}`}>Single</button>
                  <button onClick={() => setFilingStatus('married')} className={`px-4 py-2 border rounded-md text-sm font-medium transition-colors ${filingStatus === 'married' ? 'bg-blue-600 text-white border-blue-600' : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-50'}`}>Married</button>
                </div>
              </div>
              <div className="pt-4 border-t border-slate-100">
                <button onClick={calculateIncomeTax} className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-lg shadow-md hover:shadow-lg transition-all flex justify-center items-center gap-2">
                    Recalculate <Icons.ChevronRight />
                </button>
                <div className="mt-4 flex items-center justify-center gap-2 text-xs text-green-600 font-medium bg-green-50 py-2 rounded-lg border border-green-100">
                    <Icons.Lock />
                    <span>Privacy First: Data stays on your device</span>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-2xl shadow-xl border border-slate-100 p-6 md:p-8">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 gap-4">
                    <div><h3 className="text-slate-500 font-medium text-sm uppercase tracking-wide">Estimated Annual Net Pay</h3><div className="text-5xl font-extrabold text-slate-900 mt-2">{formatCurrency(results.netPay)}</div></div>
                    <div className="flex flex-col items-end"><div className="text-right"><span className="text-sm font-medium text-slate-500">Effective Tax Rate</span><div className="text-2xl font-bold text-red-500">{results.annualGross > 0 ? ((results.totalTax / results.annualGross) * 100).toFixed(1) : 0}%</div></div></div>
                </div>
                {/* تم استبدال الرسم البياني بمكون بسيط لضمان الأداء */}
                <div className="mb-8">
                    <div className="flex justify-between text-xs font-semibold mb-2"><span className="text-emerald-600">Net Pay</span><span className="text-red-500">Total Taxes</span></div>
                    <div className="w-full h-4 bg-slate-100 rounded-full overflow-hidden flex">
                        <div className="h-full bg-emerald-500" style={{ width: `${results.annualGross > 0 ? (results.netPay / results.annualGross) * 100 : 0}%` }}></div>
                        <div className="h-full bg-red-500" style={{ width: `${results.annualGross > 0 ? (results.totalTax / results.annualGross) * 100 : 0}%` }}></div>
                    </div>
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

        {/* قسم الأسئلة الشائعة - محتواك الكامل بدون اختصار */}
        <div className="mt-16 max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-slate-900 mb-8 text-center">Frequently Asked Questions</h2>
            <div className="space-y-4">
                <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
                    <h3 className="font-bold text-lg text-slate-900 mb-2">Does CaliforniaTaxCalculators.com save my salary data?</h3>
                    <p className="text-slate-600">No, we prioritize privacy. All calculations are performed locally within your browser. No personal financial data (like salary or filing status) is sent to or stored on our servers.</p>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
                    <h3 className="font-bold text-lg text-slate-900 mb-2">What is the maximum California income tax rate for 2026?</h3>
                    <p className="text-slate-600">California has a progressive tax system, with rates starting at 1% and reaching up to 13.3% (plus Mental Health Services Tax) for high-income earners, which is among the highest in the US.</p>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
                    <h3 className="font-bold text-lg text-slate-900 mb-2">Does the calculator include FICA deductions?</h3>
                    <p className="text-slate-600">Yes, the calculator provides a detailed breakdown including Federal Tax, California State Tax, and FICA deductions (Social Security and Medicare) to give you your true take-home pay.</p>
                </div>
            </div>
        </div>
      </main>
    </Layout>
  );
}
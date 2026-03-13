import { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Layout from '../../components/Layout';
import citiesData from '../../data/ca-cities.json';
import AdBanner from '../../components/AdBanner'; // 🟢 تم توحيد اسم مكون الإعلان

export async function getStaticPaths() {
  const paths = citiesData.map((city) => ({
    params: { city: city.slug },
  }));
  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  const cityData = citiesData.find((c) => c.slug === params.city);
  return { props: { cityData } };
}

export default function CitySalesTax({ cityData }) {
  const [amount, setAmount] = useState(100);
  const [result, setResult] = useState({ tax: 0, total: 0 });

  useEffect(() => {
    const validAmount = amount || 0;
    const taxAmount = validAmount * (cityData.rate / 100);
    setResult({ tax: taxAmount, total: validAmount + taxAmount });
  }, [amount, cityData.rate]);

  const formatCurrency = (val) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(val);

  const exampleAmounts = [50, 100, 500, 1000, 5000];
  
  const internalLinks = citiesData.filter(c => c.slug !== cityData.slug).slice(0, 9);

  // حساب الفرق بين ضريبة الولاية الأساسية وضريبة المدينة
  const baseRate = 7.25;
  const localTaxDifference = (cityData.rate - baseRate).toFixed(2);

  const structuredData = [
    {
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      "name": `${cityData.name} Sales Tax Calculator`,
      "applicationCategory": "FinanceApplication",
      "operatingSystem": "Web",
      "description": `Free sales tax calculator for ${cityData.name}, California. Calculate exact local tax amounts.`,
      "url": `https://californiataxcalculators.com/sales-tax/${cityData.slug}`,
      "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "USD"
      }
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": `What is the sales tax rate in ${cityData.name}, CA?`,
          "acceptedAnswer": {
            "@type": "Answer",
            "text": `The current combined sales tax rate in ${cityData.name}, California is ${cityData.rate}%. This includes the California state base rate of 7.25% plus any local district taxes applied by ${cityData.county} County.`
          }
        }
      ]
    }
  ];

  return (
    <Layout>
      <Head>
        <title>{`${cityData.name}, CA Sales Tax Calculator 2026 (${cityData.rate}%)`}</title>
        <meta name="description" content={`Calculate sales tax in ${cityData.name}, California (${cityData.county} County). The 2026 local tax rate is ${cityData.rate}%. See exact tax amounts for your purchases.`} />
        <link rel="canonical" href={`https://californiataxcalculators.com/sales-tax/${cityData.slug}`} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
      </Head>

      <div className="bg-slate-900 text-white pb-24 pt-16 mt-[-64px]">
        <div className="max-w-4xl mx-auto px-4 text-center mt-12">
          <h1 className="text-3xl md:text-5xl font-extrabold mb-4">
            {cityData.name} Sales Tax Calculator
          </h1>
          <p className="text-xl text-blue-100 mb-6">
            Current 2026 tax rate: <strong>{cityData.rate}%</strong>
          </p>
          <div className="inline-flex flex-wrap justify-center items-center gap-4 text-sm font-medium bg-white/10 px-6 py-3 rounded-full shadow-inner border border-slate-700/50">
            <span className="flex items-center gap-2">📍 {cityData.county} County</span>
            <span className="hidden sm:inline text-slate-500">•</span>
            <span className="flex items-center gap-2">👥 Pop: {cityData.population.toLocaleString()}</span>
            <span className="hidden sm:inline text-slate-500">•</span>
            <span className="flex items-center gap-2">💰 Median Inc: ${cityData.median_income.toLocaleString()}</span>
          </div>
        </div>
      </div>

      <main className="-mt-12 pb-12 px-4 max-w-4xl mx-auto z-10 relative">
        <div className="grid md:grid-cols-3 gap-8">
            
          {/* --- 1. أداة الحاسبة --- */}
          <div className="md:col-span-2 space-y-8">
              <div className="bg-white rounded-2xl shadow-xl p-8 border border-slate-100 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-400 to-blue-600"></div>
                <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-3">
                    <svg className="w-6 h-6 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" /></svg>
                    Calculate Tax Amount
                </h2>
                <div className="mb-6">
                  <label htmlFor="amount" className="block text-sm font-semibold text-slate-700 mb-2">Purchase Amount ($)</label>
                  <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                          <span className="text-slate-400 font-bold">$</span>
                      </div>
                      <input 
                        id="amount" type="number" min="0" value={amount === 0 ? '' : amount} 
                        onChange={(e) => setAmount(Number(e.target.value))} 
                        className="w-full text-xl font-medium border border-slate-300 rounded-xl py-4 pl-10 pr-4 bg-slate-50 text-slate-900 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all shadow-sm hover:border-slate-400" 
                        placeholder="e.g. 100"
                      />
                  </div>
                </div>

                <div className="mt-8 p-6 bg-slate-50 rounded-xl border border-slate-200 flex flex-col sm:flex-row justify-between items-center gap-6">
                  <div className="text-center w-full">
                    <span className="block text-slate-500 text-xs uppercase font-bold tracking-wider mb-1">Tax ({cityData.rate}%)</span>
                    <p className="text-3xl font-bold text-amber-600">+{formatCurrency(result.tax)}</p>
                  </div>
                  <div className="hidden sm:block h-16 w-px bg-slate-300"></div>
                  <div className="sm:hidden w-full h-px bg-slate-300"></div>
                  <div className="text-center w-full">
                    <span className="block text-slate-500 text-xs uppercase font-bold tracking-wider mb-1">Total Cost</span>
                    <p className="text-3xl font-extrabold text-green-600">{formatCurrency(result.total)}</p>
                  </div>
                </div>
              </div>

              {/* 🔴 قسم المحتوى النصي الغني */}
              <div className="bg-white rounded-2xl shadow-sm p-8 border border-slate-100 prose prose-slate max-w-none">
                 <h2 className="text-xl font-bold text-slate-900 mb-4 border-b pb-2">Understanding the {cityData.rate}% Sales Tax in {cityData.name}</h2>
                 <p className="leading-relaxed text-slate-700">
                     When you make a retail purchase within the city limits of <strong>{cityData.name}</strong>, you are subject to a combined sales tax rate of <strong>{cityData.rate}%</strong>. This rate is critical for both consumers planning large purchases and businesses calculating point-of-sale transactions in {cityData.county} County.
                 </p>
                 <p className="leading-relaxed text-slate-700">
                     The {cityData.rate}% total is not collected by a single entity. It is a combination of the California state base rate of 7.25% and an additional <strong>{localTaxDifference}%</strong> in local district taxes. These local taxes (which may include county, city, and special district taxes) often fund essential services like public transportation, local infrastructure, and emergency services specific to the {cityData.name} area.
                 </p>
                 <p className="leading-relaxed text-slate-700 mt-4 text-sm bg-blue-50 p-4 rounded-lg border border-blue-100">
                     <strong>Important Note:</strong> The exact tax rate you pay can sometimes vary depending on your precise location (e.g., if you are in an unincorporated area just outside the {cityData.name} city limits, or depending on the 9-digit zip code of the delivery address).
                 </p>
              </div>

              {/* ✅ إعلان AdSense يظهر تحت المحتوى مباشرة */}
              <div className="my-8">
                  <AdBanner dataAdSlot="XXXXXXXXXX" /> 
              </div>
          </div>

          {/* --- 2. الشريط الجانبي (المعلومات وروابط أخرى) --- */}
          <div className="space-y-6">
            <div className="bg-white rounded-2xl shadow-sm p-6 border border-slate-100 text-slate-700">
                <h3 className="text-lg font-bold text-slate-900 mb-3 border-b pb-2">City Profile</h3>
                <ul className="space-y-3 text-sm">
                    <li className="flex justify-between border-b border-slate-50 pb-2">
                        <span className="text-slate-500">City:</span>
                        <span className="font-semibold">{cityData.name}</span>
                    </li>
                    <li className="flex justify-between border-b border-slate-50 pb-2">
                        <span className="text-slate-500">County:</span>
                        <span className="font-semibold">{cityData.county}</span>
                    </li>
                    <li className="flex justify-between border-b border-slate-50 pb-2">
                        <span className="text-slate-500">Base State Rate:</span>
                        <span className="font-semibold text-slate-600">7.25%</span>
                    </li>
                    <li className="flex justify-between font-bold">
                        <span className="text-slate-700">Total Rate:</span>
                        <span className="text-blue-600">{cityData.rate}%</span>
                    </li>
                </ul>
            </div>

            <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200 shadow-inner">
                <h3 className="text-lg font-bold text-slate-900 mb-4">Other Tax Tools</h3>
                <ul className="space-y-3 text-sm font-medium">
                    <li>
                        <Link href="/" className="flex items-center gap-2 text-slate-700 hover:text-blue-600 transition-colors group">
                            <span className="bg-white p-1.5 rounded shadow-sm group-hover:bg-blue-100 transition-colors">💵</span>
                            CA Paycheck Calculator
                        </Link>
                    </li>
                    <li>
                        <Link href="/property-tax" className="flex items-center gap-2 text-slate-700 hover:text-blue-600 transition-colors group">
                            <span className="bg-white p-1.5 rounded shadow-sm group-hover:bg-blue-100 transition-colors">🏠</span>
                            Property Tax Estimator
                        </Link>
                    </li>
                    <li>
                        <Link href="/sales-tax" className="flex items-center gap-2 text-slate-700 hover:text-blue-600 transition-colors group">
                            <span className="bg-white p-1.5 rounded shadow-sm group-hover:bg-blue-100 transition-colors">🗺️</span>
                            All CA City Tax Rates
                        </Link>
                    </li>
                </ul>
            </div>
          </div>
        </div>

        {/* --- 3. جدول البيانات الحقيقية --- */}
        <div className="mt-8 bg-white rounded-2xl shadow-sm p-8 border border-slate-100">
            <h2 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                <svg className="w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M3 14h18m-9-4v8m-7 0h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>
                Quick Reference: {cityData.name} Tax on Common Amounts
            </h2>
            <div className="overflow-x-auto rounded-xl border border-slate-200 shadow-sm">
                <table className="min-w-[500px] w-full divide-y divide-slate-200">
                    <thead className="bg-slate-50">
                        <tr>
                            <th className="px-6 py-4 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">Purchase Amount</th>
                            <th className="px-6 py-4 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">Sales Tax ({cityData.rate}%)</th>
                            <th className="px-6 py-4 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">Total Price</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-slate-100 text-sm">
                        {exampleAmounts.map((amt) => (
                            <tr key={amt} className="hover:bg-blue-50/50 transition-colors">
                                <td className="px-6 py-4 font-semibold text-slate-700">${amt.toLocaleString()}</td>
                                <td className="px-6 py-4 text-amber-600 font-medium">+{formatCurrency(amt * (cityData.rate / 100))}</td>
                                <td className="px-6 py-4 text-green-600 font-bold">{formatCurrency(amt + (amt * (cityData.rate / 100)))}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>

        {/* --- 4. قسم الأسئلة الشائعة (FAQ) الشامل --- */}
        <div className="mt-8 bg-white p-8 rounded-2xl shadow-sm border border-slate-100">
            <h2 className="text-2xl font-bold text-slate-900 mb-8 text-center">
                Frequently Asked Questions ({cityData.name})
            </h2>
            <div className="space-y-6 max-w-3xl mx-auto">
                <div className="bg-slate-50 p-6 rounded-xl border border-slate-200 hover:border-blue-200 transition-colors">
                    <h3 className="font-bold text-lg text-slate-900 mb-3 flex items-start gap-2">
                        <span className="text-blue-500">Q:</span> What is the sales tax rate in {cityData.name}, CA?
                    </h3>
                    <p className="text-slate-600 leading-relaxed ml-6">
                        The current combined sales tax rate in {cityData.name} is <strong>{cityData.rate}%</strong>. This includes the California state base rate of 7.25% plus any applicable local district taxes levied by {cityData.county} County.
                    </p>
                </div>
                
                <div className="bg-slate-50 p-6 rounded-xl border border-slate-200 hover:border-blue-200 transition-colors">
                    <h3 className="font-bold text-lg text-slate-900 mb-3 flex items-start gap-2">
                        <span className="text-blue-500">Q:</span> Are groceries taxed in {cityData.name}?
                    </h3>
                    <p className="text-slate-600 leading-relaxed ml-6">
                        In California, including {cityData.name}, most essential groceries and prescription medications are exempt from the {cityData.rate}% sales tax. However, prepared hot foods, alcohol, and certain carbonated beverages are generally taxable.
                    </p>
                </div>
                
                <div className="bg-slate-50 p-6 rounded-xl border border-slate-200 hover:border-blue-200 transition-colors">
                    <h3 className="font-bold text-lg text-slate-900 mb-3 flex items-start gap-2">
                        <span className="text-blue-500">Q:</span> If I buy a car in {cityData.name}, what tax rate do I pay?
                    </h3>
                    <p className="text-slate-600 leading-relaxed ml-6">
                        For vehicle purchases, the sales tax is based on where you register the vehicle, not where you buy it. If you live in {cityData.name} and register the car to your home address, you will pay the {cityData.rate}% rate.
                    </p>
                </div>
            </div>
        </div>

        {/* --- 5. شبكة الروابط الداخلية (Internal Linking Grid) --- */}
        <div className="mt-12">
            <h2 className="text-xl font-bold text-slate-900 mb-6 px-2">
                Explore Tax Rates in Nearby Cities
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {internalLinks.map((city) => (
                    <Link
                        key={city.slug}
                        href={`/sales-tax/${city.slug}`}
                        className="bg-white block p-5 border border-slate-200 rounded-xl shadow-sm hover:shadow-md hover:border-blue-300 hover:-translate-y-1 transition-all duration-200 group"
                    >
                        <span className="font-bold text-slate-800 group-hover:text-blue-700 block mb-1 text-lg">
                            {city.name}
                        </span>
                        <div className="flex justify-between items-center mt-3">
                            <span className="inline-block bg-slate-100 text-slate-600 text-xs px-2 py-1 rounded font-medium">
                                {city.county}
                            </span>
                            <span className="text-sm font-bold text-amber-600">
                                {city.rate}%
                            </span>
                        </div>
                    </Link>
                ))}
            </div>
            <div className="mt-8 text-center">
                 <Link href="/sales-tax" className="inline-flex items-center justify-center px-6 py-3 border border-slate-300 shadow-sm text-sm font-medium rounded-md text-slate-700 bg-white hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors">
                    View All California Cities
                 </Link>
            </div>
        </div>

      </main>
    </Layout>
  );
}
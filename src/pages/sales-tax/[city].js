import { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Layout from '../../components/Layout';
import citiesData from '../../data/ca-cities.json';
import AdUnit from '../../components/AdUnit';

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
  
  // استبعاد المدينة الحالية من شبكة الروابط الداخلية وجلب أول 9 مدن أخرى
  const internalLinks = citiesData.filter(c => c.slug !== cityData.slug).slice(0, 9);

  // إعداد البيانات المهيكلة (Schema) الشاملة
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
        
        {/* ✅ إدراج الـ Structured Data (Software + FAQ) */}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
      </Head>

      <div className="bg-slate-900 text-white pb-24 pt-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-3xl md:text-5xl font-extrabold mb-4">
            {cityData.name} Sales Tax Calculator
          </h1>
          <p className="text-xl text-blue-100 mb-4">
            Current 2026 tax rate: <strong>{cityData.rate}%</strong>
          </p>
          <div className="inline-flex items-center gap-4 text-sm font-medium bg-white/10 px-4 py-2 rounded-full shadow-inner">
            <span>📍 {cityData.county} County</span>
            <span>👥 Pop: {cityData.population}</span>
            <span>💰 Median Inc: ${cityData.median_income.toLocaleString()}</span>
          </div>
        </div>
      </div>

      <main className="-mt-12 pb-12 px-4 max-w-4xl mx-auto z-10 relative">
        <div className="grid md:grid-cols-3 gap-8">
            
          {/* --- 1. أداة الحاسبة --- */}
          <div className="md:col-span-2 space-y-8">
              <div className="bg-white rounded-2xl shadow-xl p-8 border border-slate-100">
                <h2 className="text-2xl font-bold text-slate-900 mb-6">Calculate Tax Amount</h2>
                <div className="mb-6">
                  <label htmlFor="amount" className="block text-sm font-semibold text-slate-700 mb-2">Purchase Amount ($)</label>
                  <input 
                    id="amount" type="number" min="0" value={amount === 0 ? '' : amount} 
                    onChange={(e) => setAmount(Number(e.target.value))} 
                    className="w-full text-lg border border-slate-300 rounded-lg py-3 px-4 bg-slate-50 text-slate-900 focus:ring-2 focus:ring-blue-500 outline-none transition-all" 
                  />
                </div>

                <div className="mt-8 p-6 bg-blue-50 rounded-xl border border-blue-100 flex justify-around items-center text-center">
                  <div>
                    <span className="text-slate-500 text-xs uppercase font-bold">Tax ({cityData.rate}%)</span>
                    <p className="text-3xl font-bold text-red-500">+{formatCurrency(result.tax)}</p>
                  </div>
                  <div className="h-16 w-px bg-blue-200"></div>
                  <div>
                    <span className="text-slate-500 text-xs uppercase font-bold">Total Cost</span>
                    <p className="text-3xl font-bold text-green-600">{formatCurrency(result.total)}</p>
                  </div>
                </div>
              </div>

              {/* ✅ إعلان AdSense يظهر تحت الحاسبة مباشرة */}
              <AdUnit slot="auto" format="fluid" />
          </div>

          {/* --- 2. الشريط الجانبي (المعلومات وروابط أخرى) --- */}
          <div className="space-y-6">
            <div className="bg-white rounded-2xl shadow-md p-6 border border-slate-100 text-slate-700">
                <h3 className="text-lg font-bold text-slate-900 mb-3">About {cityData.name} Taxes</h3>
                <p className="text-sm leading-relaxed mb-4">
                    The {cityData.rate}% sales tax rate in {cityData.name} consists of the 7.25% California state base rate, plus local district taxes applied by {cityData.county} County and the city.
                </p>
            </div>

            <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200">
                <h3 className="text-lg font-bold text-slate-900 mb-3">Other Tax Tools</h3>
                <ul className="space-y-3 text-sm font-semibold">
                    <li><Link href="/" className="text-blue-600 hover:underline">CA Paycheck Calculator</Link></li>
                    <li><Link href="/property-tax" className="text-blue-600 hover:underline">Property Tax Estimator</Link></li>
                    <li><Link href="/sales-tax" className="text-blue-600 hover:underline">All CA City Tax Rates</Link></li>
                </ul>
            </div>
          </div>
        </div>

        {/* --- 3. جدول البيانات الحقيقية --- */}
        <div className="mt-8 bg-white rounded-2xl shadow-md p-8 border border-slate-100">
            <h2 className="text-2xl font-bold text-slate-900 mb-6">Quick Reference: {cityData.name} Sales Tax on Common Amounts</h2>
            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-slate-200 border rounded-lg">
                    <thead className="bg-slate-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-bold text-slate-500 uppercase">Purchase Amount</th>
                            <th className="px-6 py-3 text-left text-xs font-bold text-slate-500 uppercase">Sales Tax ({cityData.rate}%)</th>
                            <th className="px-6 py-3 text-left text-xs font-bold text-slate-500 uppercase">Total Price</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-slate-200 text-sm">
                        {exampleAmounts.map((amt) => (
                            <tr key={amt} className="hover:bg-slate-50 transition-colors">
                                <td className="px-6 py-4 font-medium">${amt.toLocaleString()}</td>
                                <td className="px-6 py-4 text-red-500 font-medium">+{formatCurrency(amt * (cityData.rate / 100))}</td>
                                <td className="px-6 py-4 text-green-600 font-bold">{formatCurrency(amt + (amt * (cityData.rate / 100)))}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>

        {/* --- 4. قسم الأسئلة الشائعة (FAQ) --- */}
        <div className="mt-8 bg-white p-8 rounded-2xl shadow-md border border-slate-100">
            <h2 className="text-2xl font-bold text-slate-900 mb-6">
                {cityData.name} Sales Tax FAQ
            </h2>
            <div className="space-y-4">
                <div className="bg-slate-50 p-5 rounded-xl border border-slate-100">
                    <h3 className="font-bold text-slate-900 mb-2">What is the sales tax rate in {cityData.name}, CA?</h3>
                    <p className="text-slate-600 leading-relaxed">
                        The current combined sales tax rate in {cityData.name} is <strong>{cityData.rate}%</strong>. This includes the California state base rate of 7.25% plus any applicable local district taxes.
                    </p>
                </div>
            </div>
        </div>

        {/* --- 5. شبكة الروابط الداخلية (Internal Linking Grid) --- */}
        <div className="mt-8 bg-white rounded-2xl shadow-md p-8 border border-slate-100">
            <h2 className="text-xl font-bold text-slate-900 mb-6">
                More California Sales Tax Calculators
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {internalLinks.map((city) => (
                    <Link
                        key={city.slug}
                        href={`/sales-tax/${city.slug}`}
                        className="block p-4 border border-slate-100 rounded-xl hover:bg-blue-50 hover:border-blue-200 transition-all group"
                    >
                        <span className="font-bold text-slate-800 group-hover:text-blue-700 block mb-1 transition-colors">
                            {city.name}
                        </span>
                        <span className="block text-xs font-semibold text-slate-500 uppercase tracking-wider">
                            {city.rate}% tax rate
                        </span>
                    </Link>
                ))}
            </div>
        </div>

      </main>
    </Layout>
  );
}
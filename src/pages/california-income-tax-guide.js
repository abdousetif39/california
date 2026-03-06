import Head from 'next/head';
import Script from 'next/script';
import Layout from '../components/Layout';
import Link from 'next/link';

export default function CaliforniaIncomeTaxGuide() {
    return (
        <Layout>
            <Head>
                <title>California Income Tax Guide 2026 | Brackets & Rates Explained</title>
                <meta name="description" content="A complete guide to California state income tax for 2026. Learn how tax brackets work, federal vs state differences, payroll taxes, and view example calculations." />
                <link rel="canonical" href="https://californiataxcalculators.com/california-income-tax-guide" />
                
                <meta property="og:title" content="California Income Tax Guide 2026" />
                <meta property="og:description" content="Understand how California taxes your income with our comprehensive 2026 guide and tax bracket charts." />
                <meta property="og:url" content="https://californiataxcalculators.com/california-income-tax-guide" />
                <meta property="og:type" content="article" />
                
                <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
                    "@context": "https://schema.org",
                    "@type": "FAQPage",
                    "mainEntity": [{
                        "@type": "Question",
                        "name": "Does California have a flat tax or progressive tax?",
                        "acceptedAnswer": {
                            "@type": "Answer",
                            "text": "California uses a progressive tax system, meaning higher income levels are taxed at higher percentage rates."
                        }
                    }, {
                        "@type": "Question",
                        "name": "What is the highest income tax bracket in California for 2026?",
                        "acceptedAnswer": {
                            "@type": "Answer",
                            "text": "The highest marginal tax rate in California is 13.3%, which applies to single filers earning over $1 million."
                        }
                    }]
                })}} />
            </Head>

            <div className="bg-gradient-to-r from-slate-900 to-blue-900 text-white py-20 relative">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <span className="text-blue-300 font-semibold tracking-wider uppercase text-sm mb-4 block">Official 2026 Tax Year Guide</span>
                    <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-6">How California Income Tax Works</h1>
                    <p className="text-xl text-blue-100 max-w-2xl mx-auto leading-relaxed">
                        Navigate the Golden State's progressive tax system, understand federal vs. state differences, and see exactly where your paycheck goes.
                    </p>
                </div>
            </div>

            <main className="max-w-4xl mx-auto py-16 px-4 sm:px-6 lg:px-8 text-slate-900">
                <article className="prose prose-slate prose-lg max-w-none">
                    
                    <p className="lead text-xl text-slate-700 font-medium mb-8">
                        California is known for having some of the highest state income taxes in the United States. If you live or work in California, understanding how these taxes are calculated is essential for financial planning, budgeting, and avoiding surprises during tax season.
                    </p>

                    <h2 className="text-3xl font-bold text-blue-900 mt-12 mb-6 border-b pb-2">1. Understanding California's Progressive Tax System</h2>
                    <p>
                        California utilizes a <strong>progressive income tax system</strong>. This means that as your income increases, the percentage of tax you pay on that additional income also increases. You do not pay the highest rate on your entire income; instead, your income is divided into "chunks" or brackets, and each bracket is taxed at its specific rate.
                    </p>
                    <p>
                        The Franchise Tax Board (FTB) is the state agency responsible for collecting and administering personal income taxes in California.
                    </p>

                    <h2 className="text-3xl font-bold text-blue-900 mt-12 mb-6 border-b pb-2">2. Federal vs. State Income Tax: What's the Difference?</h2>
                    <div className="bg-slate-50 p-6 rounded-xl border border-slate-200 my-8">
                        <ul className="space-y-4">
                            <li><strong>Federal Income Tax:</strong> Collected by the IRS and applies to everyone working in the U.S. It funds national programs like defense, federal highways, and federal agencies.</li>
                            <li><strong>State Income Tax (California):</strong> Collected by the FTB. This funds state-specific initiatives such as the UC and CSU educational systems, state infrastructure, and local law enforcement grants.</li>
                            <li><strong>Standard Deductions:</strong> The IRS and California have different standard deduction amounts. For 2026, California's standard deduction is generally lower than the federal standard deduction.</li>
                        </ul>
                    </div>

                    {/* ✅ تم إضافة id="brackets" هنا */}
                    <h2 id="brackets" className="text-3xl font-bold text-blue-900 mt-12 mb-6 border-b pb-2">3. California Income Tax Brackets (2026 Estimates)</h2>
                    <p>
                        Below are the estimated marginal tax brackets for Single Filers in California. <em>(Note: Married filing jointly doubles the income thresholds for most brackets).</em>
                    </p>
                    <div className="overflow-x-auto my-8">
                        <table className="min-w-full border-collapse border border-slate-300 rounded-lg overflow-hidden shadow-sm">
                            <thead className="bg-blue-50">
                                <tr>
                                    <th className="border border-slate-300 px-6 py-4 text-left text-sm font-bold text-blue-900">Tax Rate</th>
                                    <th className="border border-slate-300 px-6 py-4 text-left text-sm font-bold text-blue-900">Single Filer Income Range</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white text-sm">
                                <tr><td className="border border-slate-300 px-6 py-3 font-medium">1.00%</td><td className="border border-slate-300 px-6 py-3">$0 - $10,412</td></tr>
                                <tr className="bg-slate-50"><td className="border border-slate-300 px-6 py-3 font-medium">2.00%</td><td className="border border-slate-300 px-6 py-3">$10,413 - $24,684</td></tr>
                                <tr><td className="border border-slate-300 px-6 py-3 font-medium">4.00%</td><td className="border border-slate-300 px-6 py-3">$24,685 - $38,959</td></tr>
                                <tr className="bg-slate-50"><td className="border border-slate-300 px-6 py-3 font-medium">6.00%</td><td className="border border-slate-300 px-6 py-3">$38,960 - $54,081</td></tr>
                                <tr><td className="border border-slate-300 px-6 py-3 font-medium">8.00%</td><td className="border border-slate-300 px-6 py-3">$54,082 - $68,350</td></tr>
                                <tr className="bg-slate-50"><td className="border border-slate-300 px-6 py-3 font-medium">9.30%</td><td className="border border-slate-300 px-6 py-3">$68,351 - $349,137</td></tr>
                                <tr><td className="border border-slate-300 px-6 py-3 font-medium text-red-600">10.30% - 13.30%</td><td className="border border-slate-300 px-6 py-3">Incomes exceeding $349,137</td></tr>
                            </tbody>
                        </table>
                    </div>

                    <h2 className="text-3xl font-bold text-blue-900 mt-12 mb-6 border-b pb-2">4. Payroll Taxes: FICA and CASDI</h2>
                    <p>When you look at your paystub, income tax isn't the only deduction. You will also see:</p>
                    <ul>
                        <li><strong>Social Security (FICA):</strong> 6.2% of your gross pay (up to an annual limit).</li>
                        <li><strong>Medicare:</strong> 1.45% of your gross pay.</li>
                        <li><strong>California State Disability Insurance (CASDI):</strong> A state-specific deduction (historically around 0.9% to 1.1%) that funds paid family leave and disability benefits.</li>
                    </ul>

                    <h2 className="text-3xl font-bold text-blue-900 mt-12 mb-6 border-b pb-2">5. Example Calculation: Earning $75,000 in CA</h2>
                    <div className="bg-blue-50 p-8 rounded-2xl border border-blue-100 my-8">
                        <p className="mb-4">If you are a single filer earning a gross salary of <strong>$75,000</strong> a year, your taxation roughly looks like this (simplified):</p>
                        <ul className="space-y-2 mb-6">
                            <li><strong>Federal Tax:</strong> ~$8,500</li>
                            <li><strong>FICA (SS & Medicare):</strong> ~$5,737</li>
                            <li><strong>California State Tax:</strong> ~$3,200</li>
                        </ul>
                        <p className="font-bold text-lg text-slate-800 border-t border-blue-200 pt-4">Estimated Net Pay: ~$57,563 (approx. 76% of your gross pay)</p>
                    </div>

                    <div className="text-center my-12 bg-slate-900 p-8 rounded-2xl text-white shadow-xl">
                        <h3 className="text-2xl font-bold mb-4 text-white">Want to see your exact numbers?</h3>
                        <p className="mb-6 text-slate-300">Use our free 2026 California Paycheck Calculator to estimate your exact take-home pay based on your unique situation.</p>
                        <Link href="/" className="inline-block bg-blue-500 text-white px-8 py-4 rounded-lg font-bold hover:bg-blue-400 transition-all shadow-md">
                            Go to Paycheck Calculator →
                        </Link>
                    </div>

                    <h2 className="text-3xl font-bold text-blue-900 mt-12 mb-6 border-b pb-2">6. Frequently Asked Questions</h2>
                    <div className="space-y-6">
                        <div>
                            <h4 className="font-bold text-xl text-slate-800">Does California tax Social Security benefits?</h4>
                            <p className="text-slate-600 mt-2">No, California is one of the states that does not tax Social Security retirement benefits, which is a significant advantage for retirees.</p>
                        </div>
                        <div>
                            <h4 className="font-bold text-xl text-slate-800">What is the CA mental health tax?</h4>
                            <p className="text-slate-600 mt-2">California imposes an additional 1% tax surcharge on taxable income over $1 million. The revenue from this tax is dedicated to mental health services.</p>
                        </div>
                    </div>

                </article>
            </main>
        </Layout>
    );
}

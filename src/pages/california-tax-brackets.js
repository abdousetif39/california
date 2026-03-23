import Head from 'next/head';
import Layout from '../components/Layout';
import Link from 'next/link';

export default function CaliforniaTaxBrackets() {
  return (
    <Layout>
      <Head>
        <title>California Tax Brackets 2026 - CA Income Tax Rates & Tables</title>
        <meta name="description" content="Updated 2026 California tax brackets and income tax rates. View CA tax tables for Single and Married Filing Jointly to understand your state tax liability." />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://californiataxcalculators.com/california-tax-brackets" />
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />

        <meta property="og:title" content="California Tax Brackets 2026 - CA Income Tax Rates" />
        <meta property="og:description" content="Updated 2026 California tax brackets and income tax rates. View CA tax tables for Single and Married Filing Jointly." />
        <meta property="og:url" content="https://californiataxcalculators.com/california-tax-brackets" />
        <meta property="og:image" content="https://californiataxcalculators.com/og-image.jpg" />
        <meta property="og:site_name" content="California Tax Calculators" />
        <meta property="og:type" content="article" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="California Tax Brackets 2026" />
        <meta name="twitter:description" content="Check the latest California income tax brackets and rates for 2026." />

        {/* Article Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Article",
              "mainEntityOfPage": {
                "@type": "WebPage",
                "@id": "https://californiataxcalculators.com/california-tax-brackets"
              },
              "headline": "California Tax Brackets 2026",
              "description": "Comprehensive guide and tables for California income tax brackets and rates for 2026.",
              "publisher": {
                "@type": "Organization",
                "name": "California Tax Calculators",
                "url": "https://californiataxcalculators.com"
              },
              "datePublished": "2026-01-01",
              "dateModified": "2026-01-01"
            })
          }}
        />

        {/* FAQ Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FAQPage",
              "mainEntity": [
                {
                  "@type": "Question",
                  "name": "What is the highest tax rate in California?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "The highest marginal income tax rate in California is 13.3%."
                  }
                },
                {
                  "@type": "Question",
                  "name": "Does California have progressive income tax?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Yes. California uses a progressive tax system where higher income levels are taxed at higher rates."
                  }
                }
              ]
            })
          }}
        />
      </Head>

      <main className="min-h-screen bg-slate-50 py-12 px-4 text-slate-900">
        <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg p-8 md:p-12 border border-slate-100">
          
          {/* Main Heading with ID */}
          <h1 id="california-tax-brackets" className="text-3xl md:text-4xl font-bold mb-4 text-slate-900">
            California Tax Brackets 2026
          </h1>
          
          <p className="mb-8 text-lg text-slate-600 leading-relaxed">
            Understanding your California state income tax is crucial for accurate financial planning. 
            Below are the updated <strong>California tax brackets and rates for 2026</strong>. California employs a progressive tax system, meaning your tax rate increases as your income rises.
          </p>

          <div className="overflow-x-auto shadow-sm rounded-lg border border-slate-200">
            <table className="min-w-full text-left border-collapse">
              <thead className="bg-slate-100">
                <tr>
                  <th className="px-6 py-4 border-b font-bold text-slate-800">Tax Rate</th>
                  <th className="px-6 py-4 border-b font-bold text-slate-800">Single Filers</th>
                  <th className="px-6 py-4 border-b font-bold text-slate-800">Married Filing Jointly</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 bg-white">
                <tr className="hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-4 font-semibold text-blue-600">1.0%</td>
                  <td className="px-6 py-4 text-slate-700">$0 – $10,412</td>
                  <td className="px-6 py-4 text-slate-700">$0 – $20,824</td>
                </tr>
                <tr className="hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-4 font-semibold text-blue-600">2.0%</td>
                  <td className="px-6 py-4 text-slate-700">$10,413 – $24,684</td>
                  <td className="px-6 py-4 text-slate-700">$20,825 – $49,368</td>
                </tr>
                <tr className="hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-4 font-semibold text-blue-600">4.0%</td>
                  <td className="px-6 py-4 text-slate-700">$24,685 – $38,959</td>
                  <td className="px-6 py-4 text-slate-700">$49,369 – $77,918</td>
                </tr>
                <tr className="hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-4 font-semibold text-blue-600">6.0%</td>
                  <td className="px-6 py-4 text-slate-700">$38,960 – $54,081</td>
                  <td className="px-6 py-4 text-slate-700">$77,919 – $108,162</td>
                </tr>
                <tr className="hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-4 font-semibold text-blue-600">8.0%</td>
                  <td className="px-6 py-4 text-slate-700">$54,082 – $68,350</td>
                  <td className="px-6 py-4 text-slate-700">$108,163 – $136,700</td>
                </tr>
                <tr className="hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-4 font-semibold text-blue-600">9.3%</td>
                  <td className="px-6 py-4 text-slate-700">$68,351 – $349,137</td>
                  <td className="px-6 py-4 text-slate-700">$136,701 – $698,274</td>
                </tr>
                <tr className="hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-4 font-semibold text-blue-600">10.3%</td>
                  <td className="px-6 py-4 text-slate-700">$349,138 – $418,961</td>
                  <td className="px-6 py-4 text-slate-700">$698,275 – $837,922</td>
                </tr>
                <tr className="hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-4 font-semibold text-blue-600">11.3%</td>
                  <td className="px-6 py-4 text-slate-700">$418,962 – $698,271</td>
                  <td className="px-6 py-4 text-slate-700">$837,923 – $1,396,542</td>
                </tr>
                <tr className="hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-4 font-semibold text-blue-600">12.3%</td>
                  <td className="px-6 py-4 text-slate-700">$698,272+</td>
                  <td className="px-6 py-4 text-slate-700">$1,396,543+</td>
                </tr>
                <tr className="hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-4 font-semibold text-blue-600">13.3%</td>
                  <td className="px-6 py-4 text-slate-700">$1,000,000+</td>
                  <td className="px-6 py-4 text-slate-700">$1,000,000+</td>
                </tr>
              </tbody>
            </table>
          </div>
          
          {/* Data Source Note */}
          <p className="text-sm text-slate-500 mt-3 mb-10 italic">
            Tax brackets are based on estimates from the California Franchise Tax Board.
            Actual thresholds may change each tax year.
          </p>

          {/* California Income Tax Rates Explained Section */}
          <section className="mb-10">
            <h2 className="text-2xl font-bold mb-4 text-slate-900">
              California Income Tax Rates Explained
            </h2>
            <p className="text-slate-700 mb-4">
              California has one of the most progressive income tax systems in the United States.
              Tax rates range from 1% to 13.3% depending on your income level and filing status.
              Each portion of your income is taxed within its bracket rather than applying the
              highest rate to your entire income.
            </p>
            <p className="text-slate-700">
              Understanding these tax brackets helps taxpayers estimate their California state
              tax liability and better plan their finances.
            </p>
          </section>

          {/* Internal Linking Section */}
          <section className="mb-10">
            <h2 className="text-2xl font-bold mb-4 text-slate-900">
              Learn More About California Income Taxes
            </h2>
            <p className="text-slate-700 mb-4">
              If you want to understand how California income taxes are calculated,
              including deductions, payroll taxes, and take-home pay estimates,
              read our complete guide below.
            </p>
            <Link
              href="/california-income-tax-guide"
              className="text-blue-600 font-semibold hover:underline flex items-center gap-1"
            >
              Read the California Income Tax Guide <span aria-hidden="true">→</span>
            </Link>
          </section>

          {/* FAQ Section */}
          <section className="mt-10 mb-12">
            <h2 className="text-2xl font-bold mb-4 text-slate-900">
              California Tax Brackets FAQ
            </h2>
            <div className="space-y-6">
              <div>
                <h3 className="font-semibold text-lg text-slate-800">
                  What is the highest tax rate in California?
                </h3>
                <p className="text-slate-700 mt-2">
                  The highest marginal income tax rate in California is 13.3%, which applies to
                  taxable income above $1 million.
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-lg text-slate-800">
                  Does California have progressive income tax?
                </h3>
                <p className="text-slate-700 mt-2">
                  Yes. California uses a progressive tax system, meaning higher income levels
                  are taxed at higher marginal rates.
                </p>
              </div>
            </div>
          </section>

          {/* Call To Action */}
          <div className="bg-blue-50 border-l-4 border-blue-600 p-6 rounded-r-lg mb-8">
            <h3 className="text-xl font-bold text-blue-900 mb-2">Want to calculate your exact tax?</h3>
            <p className="text-blue-800 mb-4">
              Instead of doing the math manually across different brackets, use our free and instant California State Tax Calculator.
            </p>
            <Link href="/" className="inline-block bg-blue-600 text-white px-6 py-2 rounded-lg font-bold hover:bg-blue-700 transition-all shadow">
              Calculate My Tax Now
            </Link>
          </div>
        </div>
      </main>
    </Layout>
  );
}
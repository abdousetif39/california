import Head from 'next/head';
import Layout from '../components/Layout';
import Link from 'next/link';

export default function Privacy() {
  return (
    <Layout>
      <Head>
        <title>Privacy Policy - California Tax Calculators</title>

        <meta name="description" content="Privacy Policy for CaliforniaTaxCalculators.com." />
        <meta name="robots" content="index, follow" />

        <link rel="canonical" href="https://californiataxcalculators.com/privacy" />
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />

        <meta property="og:title" content="Privacy Policy - California Tax Calculators" />
        <meta property="og:description" content="Your privacy is our priority." />
        <meta property="og:url" content="https://californiataxcalculators.com/privacy" />
        <meta property="og:image" content="https://californiataxcalculators.com/og-image.jpg" />
        <meta property="og:type" content="article" />

        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content="Privacy Policy - California Tax Calculators" />
        <meta name="twitter:description" content="Learn how CaliforniaTaxCalculators.com handles privacy, cookies, and analytics." />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "PrivacyPolicy",
              "name": "Privacy Policy",
              "url": "https://californiataxcalculators.com/privacy",
              "dateModified": "2026-01-01",
              "publisher": {
                "@type": "Organization",
                "name": "California Tax Calculators",
                "url": "https://californiataxcalculators.com"
              }
            })
          }}
        />
      </Head>

      <main className="min-h-screen bg-slate-50 py-12 px-4 text-slate-900">
        <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-lg p-8 md:p-12 border border-slate-100">
          <h1 className="text-3xl font-bold mb-6 text-slate-900">Privacy Policy</h1>
          <p className="mb-4 text-sm text-slate-500 font-medium">Last Updated: January 2026</p>
          
          <div className="prose prose-slate max-w-none">
            <h3 className="text-xl font-bold mt-8 mb-4 text-slate-900 border-b pb-2">1. Data Collection</h3>
            <p className="mb-6 text-slate-700 leading-relaxed">
              We prioritize your privacy. We <strong>do not store</strong> any personal financial data entered into our calculators (such as salary, home value, or filing status). All calculations are performed locally in your browser.
            </p>
            
            {/* التعديل الخاص بـ AdSense يبدأ من هنا */}
            <h3 className="text-xl font-bold mt-8 mb-4 text-slate-900 border-b pb-2">2. Cookies and Advertising</h3>
            <p className="mb-4 text-slate-700 leading-relaxed">
              We use cookies and third-party analytics tools (like Google Analytics) to understand how visitors use our website and to improve the user experience.
            </p>
            <ul className="list-disc pl-6 mb-6 text-slate-700 leading-relaxed space-y-2">
              <li>Third-party vendors, including Google, use cookies to serve ads based on a user's prior visits to our website or other websites.</li>
              <li>Google's use of advertising cookies enables it and its partners to serve ads to our users based on their visit to our site and/or other sites on the Internet.</li>
              <li>Users may opt out of personalized advertising by visiting <a href="https://myadcenter.google.com/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Google Ads Settings</a>.</li>
            </ul>
            {/* التعديل الخاص بـ AdSense ينتهي هنا */}

            <h3 className="text-xl font-bold mt-8 mb-4 text-slate-900 border-b pb-2">3. CCPA Compliance</h3>
            <p className="mb-8 text-slate-700 leading-relaxed">
              Residents of California have specific rights under the CCPA. Since we do not collect personal data, we do not sell your personal information.
            </p>
          </div>

          <div className="mt-12 text-center pt-8 border-t border-slate-100">
            <Link 
              href="/" 
              className="inline-block bg-blue-600 text-white px-8 py-3 rounded-lg font-bold hover:bg-blue-700 transition-all shadow-md hover:shadow-lg"
            >
              Back to Calculator
            </Link>
          </div>
        </div>
      </main>
    </Layout>
  );
}

import Head from 'next/head';
import Script from 'next/script';
import Layout from '../components/Layout';
import Link from 'next/link';

export default function Privacy() {
  return (
    <Layout>
      <Head>
        {/* ✅ العناوين الأساسية */}
        <title>Privacy Policy - California Tax Calculators</title>
        <meta name="description" content="Privacy Policy for CaliforniaTaxCalculators.com. Learn how we handle your data and cookies." />
        <link rel="canonical" href="https://californiataxcalculators.com/privacy" />
        
        {/* ✅ تعديل مسار الأيقونة (إضافة / في البداية) */}
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />

        {/* ✅ تصحيح وسوم التواصل الاجتماعي لتخصيص هذه الصفحة وليس Sales Tax */}
        <meta property="og:title" content="Privacy Policy - California Tax Calculators" />
        <meta property="og:description" content="Your privacy is our priority. Learn how we handle data and CCPA compliance." />
        <meta property="og:url" content="https://californiataxcalculators.com/privacy" />
        <meta property="og:image" content="https://californiataxcalculators.com/og-image.jpg" />
        <meta property="og:type" content="website" />
        
        {/* تويتر */}
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content="Privacy Policy - California Tax Calculators" />
      </Head>

      {/* ✅ كود تتبع جوجل الخاص بك */}
      <Script src="https://www.googletagmanager.com/gtag/js?id=G-EEY8M1W1Y6" strategy="afterInteractive" />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-EEY8M1W1Y6');
        `}
      </Script>

      <main className="min-h-screen bg-slate-50 py-12 px-4 text-slate-900">
        <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-lg p-8 md:p-12 border border-slate-100">
          <h1 className="text-3xl font-bold mb-6 text-slate-900">Privacy Policy</h1>
          <p className="mb-4 text-sm text-slate-500 font-medium">Last Updated: January 2026</p>
          
          <div className="prose prose-slate max-w-none">
            <h3 className="text-xl font-bold mt-8 mb-4 text-slate-900 border-b pb-2">1. Data Collection</h3>
            <p className="mb-6 text-slate-700 leading-relaxed">
              We prioritize your privacy. We <strong>do not store</strong> any personal financial data entered into our calculators (such as salary, home value, or filing status). All calculations are performed locally in your browser.
            </p>
            
            <h3 className="text-xl font-bold mt-8 mb-4 text-slate-900 border-b pb-2">2. Cookies</h3>
            <p className="mb-6 text-slate-700 leading-relaxed">
              We use standard cookies to analyze website traffic and improve user experience via Google Analytics. Third-party vendors, including Google, use cookies to serve ads based on a user's prior visits.
            </p>
            
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
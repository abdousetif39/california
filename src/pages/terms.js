import Head from 'next/head';
import Script from 'next/script';
import Layout from '../components/Layout';
import Link from 'next/link';

export default function TermsOfUse() {
  return (
    <Layout>
      <Head>
        {/* ✅ العناوين الأساسية */}
        <title>Terms of Use - California Tax Calculators</title>
        <meta name="description" content="Terms of Use and Disclaimers for CaliforniaTaxCalculators.com." />
        <link rel="canonical" href="https://californiataxcalculators.com/terms" />
        
        {/* ✅ تصحيح مسار الأيقونة */}
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />

        {/* ✅ تصحيح وسوم التواصل الاجتماعي لهذه الصفحة تحديداً */}
        <meta property="og:title" content="Terms of Use - California Tax Calculators" />
        <meta property="og:description" content="Please read our terms of use and professional disclaimer regarding our tax tools." />
        <meta property="og:url" content="https://californiataxcalculators.com/terms" />
        <meta property="og:image" content="https://californiataxcalculators.com/og-image.jpg" />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary" />
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
          <h1 className="text-3xl font-bold mb-6 text-slate-900">Terms of Use</h1>
          <p className="mb-4 text-sm text-slate-500 font-medium">Last Updated: January 2026</p>
          
          <div className="prose prose-slate max-w-none">
            <h3 className="text-xl font-bold mt-8 mb-4 text-slate-900 border-b pb-2">1. Acceptance</h3>
            <p className="mb-6 text-slate-700 leading-relaxed">
              By accessing CaliforniaTaxCalculators.com, you agree to be bound by these Terms of Use and all applicable laws and regulations.
            </p>
            
            <h3 className="text-xl font-bold mt-8 mb-4 text-slate-900 border-b pb-2">2. Disclaimer</h3>
            <div className="bg-red-50 border-l-4 border-red-500 p-5 mb-6 rounded-r-lg">
              <p className="text-red-800 font-semibold mb-1">Notice:</p>
              <p className="text-red-700 text-sm">This website is for informational purposes only.</p>
            </div>
            <p className="mb-6 text-slate-700 leading-relaxed">
              The results provided by our calculators are estimates based on 2026 tax data. They do not constitute professional financial, tax, or legal advice. Always consult a qualified CPA or tax professional before making financial decisions or filing taxes.
            </p>
            
            <h3 className="text-xl font-bold mt-8 mb-4 text-slate-900 border-b pb-2">3. Limitation of Liability</h3>
            <p className="mb-8 text-slate-700 leading-relaxed">
              We are not liable for any damages or losses resulting from the use of this website or reliance on its calculations.
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
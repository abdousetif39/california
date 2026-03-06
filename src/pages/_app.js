import Head from 'next/head';
import Script from 'next/script';
import '../styles/globals.css';

// المخطط الهيكلي للمنظمة يُعرف مرة واحدة لتحسين الأداء
const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "California Tax Calculators",
  "url": "https://californiataxcalculators.com",
  "logo": "https://californiataxcalculators.com/logo.png"
};

export default function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        <script 
          type="application/ld+json" 
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }} 
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      {/* Google Analytics Global Tag */}
      <Script 
        src="https://www.googletagmanager.com/gtag/js?id=G-EEY8M1W1Y6" 
        strategy="afterInteractive" 
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-EEY8M1W1Y6');
        `}
      </Script>

      <Component {...pageProps} />
    </>
  );
}
import Head from 'next/head';
import Script from 'next/script';
import '../styles/globals.css';
import { Inter } from 'next/font/google';
import { Analytics } from '@vercel/analytics/react'; // تم النقل إلى هنا بنجاح
const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
});

// Schema المنظمة
const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "California Tax Calculators",
  "url": "https://californiataxcalculators.com",
  "logo": "https://californiataxcalculators.com/logo.png"
};

export default function App({ Component, pageProps }) {
  return (
    <div className={inter.className}>

      <Head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      {/* Google Consent Mode */}
      <Script id="google-consent-mode" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          
          gtag('consent', 'default', {
            'ad_storage': 'denied',
            'analytics_storage': 'denied',
            'ad_user_data': 'denied',
            'ad_personalization': 'denied'
          });
        `}
      </Script>

      {/* Google Analytics */}
      <Script 
        src="https://www.googletagmanager.com/gtag/js?id=G-EEY8M1W1Y6"
        strategy="lazyOnload"
      />

      <Script id="google-analytics" strategy="lazyOnload">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-EEY8M1W1Y6');
        `}
      </Script>

      

      <Component {...pageProps} />

    </div>
  );
}

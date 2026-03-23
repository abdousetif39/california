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
      <Script id="google-consent-mode" strategy="lazyOnload">
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
  strategy="afterInteractive"
/>

      <Script id="google-analytics" strategy="lazyOnload">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-EEY8M1W1Y6');
        `}
      </Script>

      <Script
  id="adsense-delayed"
  strategy="lazyOnload"
>
  {`
    setTimeout(function() {
      var script = document.createElement('script');
      script.src = "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-9939500626060842";
      script.async = true;
      script.crossOrigin = "anonymous";
      document.body.appendChild(script);
    }, 4000);
  `}
</Script>

      <Component {...pageProps} />

    </div>
  );
}

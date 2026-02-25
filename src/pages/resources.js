import { useState, useEffect } from 'react';
import Head from 'next/head';
import Script from 'next/script';
import Layout from '../components/Layout';
import * as Icons from '../components/Icons';

export default function Resources() {
    const [mounted, setMounted] = useState(false);
    const [currentTime, setCurrentTime] = useState(new Date());

    useEffect(() => {
        setMounted(true);
        const timer = setInterval(() => setCurrentTime(new Date()), 1000);
        return () => clearInterval(timer);
    }, []);

    const formatDateTime = (date) => {
        if (!date) return "";
        return date.toLocaleDateString('en-US', { 
            weekday: 'short', 
            month: 'short', 
            day: 'numeric', 
            year: 'numeric' 
        }) + " • " + date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
    };

    return (
        <Layout>
            <Head>
                {/* ✅ SEO الأساسي */}
                <title>California Tax Resources 2026 | Official Links & Forms</title>
                <meta name="description" content="Access official California tax resources including FTB filing links, IRS forms, CDTFA sales tax rates, and property tax guides for 2026." />
                <link rel="canonical" href="https://californiataxcalculators.com/resources" />
                
                {/* ✅ تصحيح وسوم التواصل الاجتماعي لهذه الصفحة تحديداً */}
                <meta property="og:title" content="California Tax Resources & Official Links 2026" />
                <meta property="og:description" content="Access official FTB, IRS, and CDTFA resources for California taxes." />
                <meta property="og:url" content="https://californiataxcalculators.com/resources" />
                <meta property="og:image" content="https://californiataxcalculators.com/og-image.jpg" />
                <meta property="og:type" content="website" />
                <meta name="twitter:card" content="summary_large_image" />
            </Head>

            {/* ✅ Google Tag (Analytics) */}
            <Script src="https://www.googletagmanager.com/gtag/js?id=G-EEY8M1W1Y6" strategy="afterInteractive" />
            <Script id="google-analytics" strategy="afterInteractive">
                {`
                    window.dataLayer = window.dataLayer || [];
                    function gtag(){dataLayer.push(arguments);}
                    gtag('js', new Date());
                    gtag('config', 'G-EEY8M1W1Y6');
                `}
            </Script>

            <div className="bg-gradient-to-r from-slate-900 to-blue-900 text-white pb-32 pt-16 relative">
                 <div className="absolute top-4 right-4 md:top-8 md:right-8 bg-white/10 backdrop-blur-md px-4 py-2 rounded-full text-xs md:text-sm font-medium border border-white/20 shadow-lg flex items-center gap-2">
                    <Icons.Clock />
                    <span>{mounted ? formatDateTime(currentTime) : "Loading..."}</span>
                </div>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mt-8 md:mt-0">
                    <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-4 text-white">Official Tax Resources</h1>
                    <p className="text-xl text-blue-100 max-w-2xl mx-auto mb-8">Access government forms, filing guides, and official tax tables for California.</p>
                </div>
            </div>

            <div className="max-w-4xl mx-auto space-y-8 -mt-24 px-4 pb-16 relative z-10">
                {/* --- SEO Text Block (كامل كما طلبت) --- */}
                <div className="bg-white rounded-2xl shadow-xl p-8 border border-slate-100">
                    <h2 className="text-2xl font-bold text-slate-900 mb-4">Navigating California's Tax System (2026)</h2>
                    <p className="text-slate-700 leading-relaxed mb-4">
                        Filing taxes in California involves navigating both state and federal requirements. The <strong>Franchise Tax Board (FTB)</strong> manages state income taxes, while the <strong>California Department of Tax and Fee Administration (CDTFA)</strong> handles sales and use taxes.
                    </p>
                    <p className="text-slate-700 leading-relaxed">
                        Use the official links below to find current tax forms, verify your refund status, or pay your taxes online securely for the 2026 tax year.
                    </p>
                </div>

                {/* Section 1: Official Agencies (كامل بدون اختصار) */}
                <div className="bg-white rounded-xl shadow-md overflow-hidden border border-slate-100 text-slate-900">
                     <div className="p-6 border-b border-slate-100 bg-blue-50">
                         <h2 className="text-xl font-bold text-blue-900 flex items-center gap-2"><Icons.BookOpen /> Official Tax Agencies</h2>
                     </div>
                     <div className="divide-y divide-slate-100">
                         <a href="https://www.ftb.ca.gov/" target="_blank" rel="noopener noreferrer" className="p-6 hover:bg-slate-50 transition-colors flex justify-between items-center group no-underline">
                             <div><h3 className="font-bold text-blue-700 group-hover:underline">Franchise Tax Board (FTB)</h3><p className="text-sm text-slate-600 mt-1">File state income tax, check refund status, and find state-specific forms.</p></div><Icons.ExternalLink />
                         </a>
                         <a href="https://www.irs.gov/" target="_blank" rel="noopener noreferrer" className="p-6 hover:bg-slate-50 transition-colors flex justify-between items-center group no-underline">
                             <div><h3 className="font-bold text-blue-700 group-hover:underline">Internal Revenue Service (IRS)</h3><p className="text-sm text-slate-600 mt-1">Federal tax filing, W-4 forms, and tax withholding estimators.</p></div><Icons.ExternalLink />
                         </a>
                         <a href="https://www.cdtfa.ca.gov/" target="_blank" rel="noopener noreferrer" className="p-6 hover:bg-slate-50 transition-colors flex justify-between items-center group no-underline">
                             <div><h3 className="font-bold text-blue-700 group-hover:underline">CDTFA (Sales Tax)</h3><p className="text-sm text-slate-600 mt-1">Find current sales & use tax rates by city and county.</p></div><Icons.ExternalLink />
                         </a>
                     </div>
                </div>

                {/* Section 2: Tools & Charts (كامل بدون اختصار) */}
                <div className="bg-white rounded-xl shadow-md overflow-hidden border border-slate-100 text-slate-900">
                     <div className="p-6 border-b border-slate-100 bg-green-50">
                         <h2 className="text-xl font-bold text-green-900 flex items-center gap-2"><Icons.BarChart /> Tax Rate Tables & Tools</h2>
                     </div>
                     <div className="divide-y divide-slate-100">
                         <a href="https://www.cdtfa.ca.gov/taxes-and-fees/rates.aspx" target="_blank" rel="noopener noreferrer" className="p-6 hover:bg-slate-50 transition-colors flex justify-between items-center group no-underline">
                             <div><h3 className="font-bold text-blue-700 group-hover:underline">City & County Sales Tax Rates</h3><p className="text-sm text-slate-600 mt-1">Detailed list of sales tax rates for every city in California.</p></div><Icons.ExternalLink />
                         </a>
                         <a href="https://www.boe.ca.gov/proptaxes/proptax.htm" target="_blank" rel="noopener noreferrer" className="p-6 hover:bg-slate-50 transition-colors flex justify-between items-center group no-underline">
                             <div><h3 className="font-bold text-blue-700 group-hover:underline">Property Tax Guidelines</h3><p className="text-sm text-slate-600 mt-1">Board of Equalization guide to understanding property assessments.</p></div><Icons.ExternalLink />
                         </a>
                     </div>
                </div>

                {/* Section 3: Publications (كامل بدون اختصار) */}
                <div className="bg-white rounded-xl shadow-md overflow-hidden border border-slate-100">
                     <div className="p-6 border-b border-slate-100 bg-orange-50">
                         <h2 className="text-xl font-bold text-orange-900 flex items-center gap-2"><Icons.FileText /> Helpful Guides</h2>
                     </div>
                     <div className="p-6 text-slate-700 space-y-4">
                        <div>
                            <h3 className="font-bold text-slate-900">Understanding Proposition 13</h3>
                            <p className="text-sm mt-1">Prop 13 limits property tax to 1% of assessed value and caps increases at 2% per year. <a href="https://www.boe.ca.gov/proptaxes/prop13.htm" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Read the official guide</a>.</p>
                        </div>
                        <div>
                            <h3 className="font-bold text-slate-900">New Homeowner Checklist</h3>
                            <p className="text-sm mt-1">Buying a home in CA triggers a reassessment. Be prepared for a Supplemental Tax Bill roughly 6 months after purchase.</p>
                        </div>
                     </div>
                </div>
            </div>
        </Layout>
    );
}
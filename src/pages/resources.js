import { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Layout from '../components/Layout';
import * as Icons from '../components/Icons';

export default function Resources() {
    const [mounted, setMounted] = useState(false);
    const [currentTime, setCurrentTime] = useState(new Date());

    useEffect(() => {
        setMounted(true);
        const timer = setInterval(() => setCurrentTime(new Date()), 60000);
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
                <title>California Tax Resources 2026 | Guides, Deadlines & Forms</title>
                <meta name="description" content="The complete hub for California tax resources: access our in-depth guides, key filing deadlines for 2026, common tax forms, and official agency links." />
                <meta name="robots" content="index, follow" />
                <link rel="canonical" href="https://californiataxcalculators.com/resources" />
                
                <meta property="og:title" content="California Tax Resources & Official Guides 2026" />
                <meta property="og:description" content="The complete hub for California tax guides, official links, and filing information." />
                <meta property="og:url" content="https://californiataxcalculators.com/resources" />
                <meta property="og:image" content="https://californiataxcalculators.com/og-image.jpg" />
                <meta property="og:type" content="website" />
                <meta property="og:site_name" content="California Tax Calculators" />
                <meta name="twitter:card" content="summary_large_image" />

                <script 
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{
                        __html: JSON.stringify({
                            "@context": "https://schema.org",
                            "@type": "CollectionPage",
                            "@id": "https://californiataxcalculators.com/resources",
                            "name": "California Tax Resources",
                            "url": "https://californiataxcalculators.com/resources",
                            "dateModified": "2026-03-06",
                            "description": "A collection of guides, deadlines, forms, and official links for navigating California taxes.",
                            "mainEntity": [
                                {
                                    "@type": "WebPage",
                                    "@id": "https://californiataxcalculators.com/california-income-tax-guide"
                                },
                                {
                                    "@type": "WebPage",
                                    "@id": "https://californiataxcalculators.com/california-tax-brackets"
                                },
                                {
                                    "@type": "WebPage",
                                    "@id": "https://californiataxcalculators.com/property-tax"
                                }
                            ],
                            "publisher": {
                                "@type": "Organization",
                                "name": "California Tax Calculators",
                                "url": "https://californiataxcalculators.com"
                            }
                        })
                    }}
                />

                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{
                        __html: JSON.stringify({
                            "@context": "https://schema.org",
                            "@type": "FAQPage",
                            "mainEntity": [
                                {
                                    "@type": "Question",
                                    "name": "What is the California tax filing deadline?",
                                    "acceptedAnswer": {
                                        "@type": "Answer",
                                        "text": "The primary deadline to file both federal and California state income taxes is April 15. If an extension is filed, the deadline is October 15."
                                    }
                                },
                                {
                                    "@type": "Question",
                                    "name": "What is the main California tax form?",
                                    "acceptedAnswer": {
                                        "@type": "Answer",
                                        "text": "The main form for residents is Form 540, the California Resident Income Tax Return. Nonresidents use Form 540NR."
                                    }
                                }
                            ]
                        })
                    }}
                />
            </Head>

            <div className="bg-gradient-to-r from-slate-900 to-blue-900 text-white pb-32 pt-16 relative">
                 <div className="absolute top-4 right-4 md:top-8 md:right-8 bg-white/10 backdrop-blur-md px-4 py-2 rounded-full text-xs md:text-sm font-medium border border-white/20 shadow-lg flex items-center gap-2">
                    <Icons.Clock />
                    <span>{mounted ? formatDateTime(currentTime) : "Loading..."}</span>
                </div>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mt-8 md:mt-0">
                    <h1 id="california-tax-resources" className="text-3xl md:text-5xl font-extrabold tracking-tight mb-4 text-white">
                        Tax Resources & Guides
                    </h1>
                    <p className="text-xl text-blue-100 max-w-2xl mx-auto mb-8">Everything you need to navigate California taxes, all in one place.</p>
                </div>
            </div>

            <div className="max-w-4xl mx-auto space-y-8 -mt-24 px-4 pb-16 relative z-10">
                
                {/* --- 1. Comprehensive Tax Guides Hub --- */}
                <section className="bg-white rounded-2xl shadow-xl p-8 border border-blue-100 ring-4 ring-blue-50">
                    <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-3">
                        <Icons.BookOpen className="text-blue-600" /> Our Tax Guides
                    </h2>
                    <div className="grid gap-4">
                        <Link href="/california-income-tax-guide" className="group p-4 rounded-xl border border-slate-100 hover:border-blue-200 hover:bg-blue-50 transition-all flex items-center justify-between">
                            <div className="flex items-center gap-4">
                                <div className="bg-blue-100 p-3 rounded-lg text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                                    <Icons.FileText />
                                </div>
                                <div>
                                    <h3 className="font-bold text-slate-900">California Income Tax Guide</h3>
                                    <p className="text-sm text-slate-500">A complete breakdown of CA income tax rules.</p>
                                </div>
                            </div>
                            <Icons.ChevronRight className="text-slate-300 group-hover:text-blue-500 transition-transform group-hover:translate-x-1" />
                        </Link>

                        <Link
                            href="/california-tax-brackets"
                            className="group p-4 rounded-xl border border-slate-100 hover:border-blue-200 hover:bg-blue-50 transition-all flex items-center justify-between"
                        >
                            <div className="flex items-center gap-4">
                                <div className="bg-purple-100 p-3 rounded-lg text-purple-600 group-hover:bg-purple-600 group-hover:text-white transition-colors">
                                    <Icons.BarChart />
                                </div>

                                <div>
                                    <h3 className="font-bold text-slate-900">
                                        California Tax Brackets
                                    </h3>

                                    <p className="text-sm text-slate-500">
                                        View the official California income tax brackets and rates for 2026.
                                    </p>
                                </div>
                            </div>

                            <Icons.ChevronRight className="text-slate-300 group-hover:text-blue-500 transition-transform transform group-hover:translate-x-1" />
                        </Link>

                        <Link href="/property-tax" className="group p-4 rounded-xl border border-slate-100 hover:border-blue-200 hover:bg-blue-50 transition-all flex items-center justify-between">
                            <div className="flex items-center gap-4">
                                <div className="bg-orange-100 p-3 rounded-lg text-orange-600 group-hover:bg-orange-600 group-hover:text-white transition-colors">
                                    <Icons.HomeIcon />
                                </div>
                                <div>
                                    <h3 className="font-bold text-slate-900">Property Tax Guide</h3>
                                    <p className="text-sm text-slate-500">Understanding Prop 13 and local assessments.</p>
                                </div>
                            </div>
                            <Icons.ChevronRight className="text-slate-300 group-hover:text-blue-500 transition-transform group-hover:translate-x-1" />
                        </Link>
                    </div>
                </section>
                
                {/* --- 2. Tax Filing Deadlines --- */}
                <section className="bg-white rounded-xl shadow-md p-8 border border-slate-100">
                    <h2 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
                        <Icons.Calendar />
                        Important California Tax Deadlines for 2026
                    </h2>
                    <ul className="space-y-3 text-slate-700 list-disc pl-5 marker:text-blue-500">
                        <li><strong>April 15, 2026:</strong> Main deadline for filing federal & California income tax returns.</li>
                        <li><strong>October 15, 2026:</strong> Final deadline to file if you requested an automatic extension.</li>
                        <li><strong>Quarterly Estimated Payments:</strong> Due April 15, June 15, Sept 15, and Jan 15 (of the next year).</li>
                    </ul>
                </section>

                {/* --- 3. Common Tax Forms --- */}
                <section className="bg-white rounded-xl shadow-md p-8 border border-slate-100">
                    <h2 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
                        <Icons.FileText />
                        Common California Tax Forms
                    </h2>
                    <ul className="space-y-3 text-slate-700 list-disc pl-5">
                        <li><strong>Form 540:</strong> The standard California Resident Income Tax Return.</li>
                        <li><strong>Form 540NR:</strong> For nonresidents or part-year residents.</li>
                        <li><strong>W-4 (Federal) / DE 4 (California):</strong> Employee's withholding certificate to set paycheck deductions.</li>
                    </ul>
                </section>
                
                {/* --- 4. Official Tax Agencies --- */}
                <div className="bg-white rounded-xl shadow-md overflow-hidden border border-slate-100 text-slate-900">
                     <div className="p-6 border-b border-slate-100 bg-slate-50">
                         <h2 className="text-xl font-bold text-slate-800 flex items-center gap-3"><Icons.BookOpen /> Official Agency Links</h2>
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
            </div>
        </Layout>
    );
}
import { useState, useEffect } from 'react';
import Link from 'next/link';
import * as Icons from './Icons';

export default function SiteFooter() {
    const [currentUrl, setCurrentUrl] = useState("https://californiataxcalculators.com");
    const currentYear = new Date().getFullYear();

    useEffect(() => {
        if (typeof window !== 'undefined') {
            setCurrentUrl(window.location.href);
        }
    }, []);

    const shareText = "Check out these free California Tax Calculators!";
    
    const shareLinks = {
        facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(currentUrl)}`,
        linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(currentUrl)}`,
        twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(currentUrl)}&text=${encodeURIComponent(shareText)}`,
        whatsapp: `https://wa.me/?text=${encodeURIComponent(shareText + " " + currentUrl)}`
    };

    return (
        <footer className="bg-slate-900 text-slate-400 py-12 mt-12 border-t border-slate-800">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
                    
                    <div className="col-span-1 md:col-span-2">
                        <div className="flex items-center gap-2 mb-4">
                            <div className="text-blue-500">
                                <Icons.Calculator />
                            </div>
                            <span className="text-white font-bold text-lg tracking-tight">
                                CaliforniaTaxCalculators.com
                            </span>
                        </div>
                        <p className="text-sm leading-relaxed max-w-sm mb-6">
                            Simplifying tax estimation for Californians. Free, easy-to-use financial tools for income, sales, and property tax.
                        </p>
                        
                        <div className="space-y-3">
                            {/* تم تحويل h5 إلى p للحفاظ على التسلسل الهرمي للعناوين (SEO & Accessibility) */}
                            <p className="text-white font-semibold text-xs uppercase tracking-wider">Share this tool</p>
                            <div className="flex space-x-3">
                                {/* تم إضافة aria-label لكل رابط ليتعرف عليها قارئ الشاشة */}
                                <a href={shareLinks.facebook} aria-label="Share on Facebook" target="_blank" rel="noopener noreferrer" className="bg-slate-800 hover:bg-[#1877F2] text-white p-2 rounded-full transition-all">
                                    <Icons.Facebook />
                                </a>
                                <a href={shareLinks.twitter} aria-label="Share on X (Twitter)" target="_blank" rel="noopener noreferrer" className="bg-slate-800 hover:bg-[#1DA1F2] text-white p-2 rounded-full transition-all">
                                    <Icons.Twitter />
                                </a>
                                <a href={shareLinks.linkedin} aria-label="Share on LinkedIn" target="_blank" rel="noopener noreferrer" className="bg-slate-800 hover:bg-[#0A66C2] text-white p-2 rounded-full transition-all">
                                    <Icons.Linkedin />
                                </a>
                                <a href={shareLinks.whatsapp} aria-label="Share via WhatsApp" target="_blank" rel="noopener noreferrer" className="bg-slate-800 hover:bg-[#25D366] text-white p-2 rounded-full transition-all">
                                    <Icons.Whatsapp />
                                </a>
                            </div>
                        </div>
                    </div>

                    <div>
                        {/* تم تحويل h4 إلى p للحفاظ على التسلسل الهرمي */}
                        <p className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Calculators</p>
                        <ul className="space-y-2 text-sm">
                            <li><Link href="/" className="hover:text-blue-400 transition-colors">Income Tax</Link></li>
                            <li><Link href="/sales-tax" className="hover:text-blue-400 transition-colors">Sales Tax</Link></li>
                            <li><Link href="/property-tax" className="hover:text-blue-400 transition-colors">Property Tax</Link></li>
                        </ul>
                    </div>

                    <div>
                        <p className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Legal & About</p>
                        <ul className="space-y-2 text-sm">
                            <li><Link href="/privacy" className="hover:text-blue-400 transition-colors">Privacy Policy</Link></li>
                            <li><Link href="/terms" className="hover:text-blue-400 transition-colors">Terms of Use</Link></li>
                            <li><Link href="/contact" className="hover:text-blue-400 transition-colors">Contact Us</Link></li>
                            <li><Link href="/about-us" className="hover:text-blue-400 transition-colors">About Us</Link></li>
                            <li><Link href="/resources" className="hover:text-blue-400 transition-colors">Resources</Link></li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-slate-800 pt-8 mt-8 text-xs text-center flex flex-col md:flex-row justify-between items-center gap-4">
                    <p>&copy; {currentYear} CaliforniaTaxCalculators.com. All rights reserved.</p>
                    {/* تم تحسين التباين من text-slate-500 إلى text-slate-400 ليتوافق مع معايير القراءة */}
                    <p className="text-slate-400">Built with precision for California residents.</p>
                </div>
            </div>
        </footer>
    );
}
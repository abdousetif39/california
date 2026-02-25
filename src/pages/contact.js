import { useState, useEffect } from 'react';
import Head from 'next/head';
import Script from 'next/script';
import Layout from '../components/Layout';
import * as Icons from '../components/Icons';

export default function Contact() {
    const [contactForm, setContactForm] = useState({ name: '', email: '', message: '' });
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    const handleContactSubmit = (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        const serviceID = "service_d7anmfc";
        const templateID = "template_t8ty0d4";
        const publicKey = "tWKxrgXeIfyOYM2C4";
        
        const templateParams = { 
            from_name: contactForm.name, 
            from_email: contactForm.email, 
            message: contactForm.message 
        };
        
        // إرسال البريد عبر نافذة المتصفح
        window.emailjs.send(serviceID, templateID, templateParams, publicKey)
            .then(() => { 
                setIsSubmitting(false); 
                setIsSubmitted(true); 
                setContactForm({ name: '', email: '', message: '' }); 
            }, (error) => { 
                alert("Failed to send message. Please try again later."); 
                setIsSubmitting(false); 
                console.error("EmailJS Error:", error);
            });
    };

    return (
        <Layout>
            <Head>
                {/* ✅ SEO الأساسي */}
                <title>Contact Us - California Tax Calculators</title>
                <meta name="description" content="Get in touch with California Tax Calculators. Send us your feedback, questions, or suggestions." />
                <link rel="canonical" href="https://californiataxcalculators.com/contact" />
                
                {/* ✅ تصحيح وسوم Open Graph لتناسب صفحة التواصل وليس حاسبة المبيعات */}
                <meta property="og:title" content="Contact Us - California Tax Calculators" />
                <meta property="og:description" content="Have questions about California taxes? Reach out to us." />
                <meta property="og:url" content="https://californiataxcalculators.com/contact" />
                <meta property="og:type" content="website" />
                <meta property="og:image" content="https://californiataxcalculators.com/og-image.jpg" />
            </Head>

            {/* Google Tag */}
            <Script src="https://www.googletagmanager.com/gtag/js?id=G-EEY8M1W1Y6" strategy="afterInteractive" />
            <Script id="google-analytics" strategy="afterInteractive">
                {`
                    window.dataLayer = window.dataLayer || [];
                    function gtag(){dataLayer.push(arguments);}
                    gtag('js', new Date());
                    gtag('config', 'G-EEY8M1W1Y6');
                `}
            </Script>

            {/* تحميل EmailJS */}
            <Script src="https://cdn.jsdelivr.net/npm/@emailjs/browser@4/dist/email.min.js" strategy="afterInteractive" />

            <main className="min-h-screen bg-slate-50 pb-20">
                <div className="bg-slate-900 text-white py-16">
                    <div className="max-w-7xl mx-auto px-4 text-center">
                        <h1 className="text-4xl font-bold mb-4">Contact Us</h1>
                        <p className="text-slate-400 max-w-xl mx-auto">
                            Have questions or feedback about our calculators? We'd love to hear from you.
                        </p>
                    </div>
                </div>

                <div className="max-w-2xl mx-auto mt-[-40px] px-4">
                    <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-slate-100">
                         <div className="bg-blue-600 px-8 py-8 text-center text-white">
                            <div className="bg-white/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 backdrop-blur-sm">
                                <Icons.Mail />
                            </div>
                            <h2 className="text-2xl font-bold">Get in Touch</h2>
                         </div>

                         {isSubmitted ? (
                             <div className="p-12 text-center">
                                <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-6 text-green-600">
                                    <Icons.Check />
                                </div>
                                <h3 className="text-2xl font-bold text-slate-900 mb-2">Message Sent!</h3>
                                <p className="text-slate-600 mb-8">Thank you for reaching out. We will get back to you as soon as possible.</p>
                                <button onClick={() => setIsSubmitted(false)} className="text-blue-600 hover:underline font-medium">
                                    Send another message
                                </button>
                             </div>
                         ) : (
                             <form onSubmit={handleContactSubmit} className="p-8 space-y-6">
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-2">Name</label>
                                    <input required type="text" value={contactForm.name} onChange={(e) => setContactForm({...contactForm, name: e.target.value})} className="block w-full border-slate-300 rounded-lg py-3 px-4 bg-slate-50 focus:ring-2 focus:ring-blue-500 outline-none text-slate-900" placeholder="Your full name" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-2">Email</label>
                                    <input required type="email" value={contactForm.email} onChange={(e) => setContactForm({...contactForm, email: e.target.value})} className="block w-full border-slate-300 rounded-lg py-3 px-4 bg-slate-50 focus:ring-2 focus:ring-blue-500 outline-none text-slate-900" placeholder="you@example.com" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-2">Message</label>
                                    <textarea required rows="5" value={contactForm.message} onChange={(e) => setContactForm({...contactForm, message: e.target.value})} className="block w-full border-slate-300 rounded-lg py-3 px-4 bg-slate-50 focus:ring-2 focus:ring-blue-500 outline-none text-slate-900" placeholder="How can we help you?"></textarea>
                                </div>
                                <button type="submit" disabled={isSubmitting} className={`w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-lg shadow-md transition-all flex justify-center items-center gap-2 ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}>
                                    {isSubmitting ? 'Sending...' : 'Send Message'} {!isSubmitting && <Icons.Send />}
                                </button>
                             </form>
                         )}
                    </div>
                </div>
            </main>
        </Layout>
    );
}
import Head from 'next/head';
import Link from 'next/link';
import Layout from '../components/Layout';
import { useState } from 'react';

export default function Contact() {
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        // فحص Honeypot الرسمي الخاص بـ Web3Forms
        if (e.target.botcheck.checked) return;

        setLoading(true);

        const formData = {
            access_key: "23b65aa3-29ea-428e-824b-3d57392a4d08",
            name: e.target.name.value,
            email: e.target.email.value,
            subject: e.target.subject.value, 
            message: e.target.message.value,
            redirect: "https://californiataxcalculators.com/contact",
            captcha: false 
        };

        try {
            const response = await fetch("https://api.web3forms.com/submit", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json"
                },
                body: JSON.stringify(formData)
            });

            if (response.ok) {
                setIsSubmitted(true);
                e.target.reset(); 
                
                // التمرير السلس إلى الأعلى
                window.scrollTo({
                    top: 0,
                    behavior: "smooth"
                });
            } else {
                alert("Something went wrong. Please try again.");
            }
        } catch (error) {
            console.error("Error submitting form:", error);
            alert("An error occurred. Please try again later.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <Layout>
            <Head>
    <title>Contact Us | California Tax Calculators</title>
    <meta name="description" content="Have questions or feedback? Contact the California Tax Calculators team." />
    <meta name="robots" content="index, follow" />
    <link rel="canonical" href="https://californiataxcalculators.com/contact" />
    
    <meta property="og:title" content="Contact California Tax Calculators" />
    <meta property="og:description" content="Have questions or feedback? Contact the California Tax Calculators team." />
    <meta property="og:type" content="website" />
    <meta property="og:url" content="https://californiataxcalculators.com/contact" />
    <meta property="og:image" content="https://californiataxcalculators.com/og-image.jpg" />
    
    <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
            __html: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "ContactPage",
                "name": "Contact California Tax Calculators",
                "url": "https://californiataxcalculators.com/contact"
            })
        }}
    />
</Head>


            <div className="bg-blue-900 text-white py-20">
                <div className="max-w-7xl mx-auto px-4 text-center">
                    <h1 className="text-4xl md:text-5xl font-extrabold mb-6">Get in Touch</h1>
                    <p className="text-xl text-blue-100">We value your feedback and are here to assist with any inquiries.</p>
                </div>
            </div>

            <main className="max-w-6xl mx-auto py-16 px-4 grid grid-cols-1 lg:grid-cols-2 gap-12">
                
                <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-100 p-8 md:p-10">
                    <h2 className="text-2xl font-bold text-slate-900 mb-8">Send us a Message</h2>
                    
                    {isSubmitted ? (
                        <div 
                            className="bg-green-50 border border-green-200 text-green-800 rounded-2xl p-8 text-center animate-fade-in"
                            aria-live="polite" 
                        >
                            <div className="text-4xl mb-4">✅</div>
                            <h3 className="text-2xl font-bold mb-2">Message Sent!</h3>
                            <p className="text-green-700">
                                Thank you for contacting us. Our team will respond within 24–48 hours.
                            </p>
                            <button 
                                onClick={() => setIsSubmitted(false)}
                                className="mt-6 text-sm font-bold text-green-700 hover:text-green-900 underline focus:outline-none"
                            >
                                Send another message
                            </button>
                        </div>
                    ) : (
                        <form className="space-y-6" onSubmit={handleSubmit}>
                            {/* Honeypot */}
                            <input 
                                type="checkbox" 
                                name="botcheck" 
                                className="hidden" 
                                style={{ display: 'none' }} 
                            />

                            <div>
                                {/* 🔴 إضافة htmlFor و id */}
                                <label htmlFor="name" className="block text-sm font-semibold text-slate-700 mb-2">Full Name</label>
                                <input
                                    id="name"
                                    type="text"
                                    name="name"
                                    required
                                    maxLength="100" 
                                    placeholder="Your name"
                                    className="w-full border border-slate-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition disabled:opacity-50"
                                    disabled={loading}
                                />
                            </div>

                            <div>
                                {/* 🔴 إضافة htmlFor و id */}
                                <label htmlFor="email" className="block text-sm font-semibold text-slate-700 mb-2">Email Address</label>
                                <input
                                    id="email"
                                    type="email"
                                    name="email"
                                    required
                                    maxLength="100" 
                                    placeholder="your@email.com"
                                    className="w-full border border-slate-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition disabled:opacity-50"
                                    disabled={loading}
                                />
                            </div>

                            <div>
                                {/* 🔴 إضافة htmlFor و id */}
                                <label htmlFor="subject" className="block text-sm font-semibold text-slate-700 mb-2">Subject</label>
                                <input
                                    id="subject"
                                    type="text"
                                    name="subject"
                                    required
                                    maxLength="150" 
                                    placeholder="How can we help?"
                                    className="w-full border border-slate-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition disabled:opacity-50"
                                    disabled={loading}
                                />
                            </div>

                            <div>
                                {/* 🔴 إضافة htmlFor و id */}
                                <label htmlFor="message" className="block text-sm font-semibold text-slate-700 mb-2">Message</label>
                                <textarea
                                    id="message"
                                    name="message"
                                    rows="5"
                                    required
                                    maxLength="1000" 
                                    placeholder="Write your message..."
                                    className="w-full border border-slate-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition resize-y disabled:opacity-50"
                                    disabled={loading}
                                />
                            </div>

                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full bg-blue-600 text-white font-bold py-3.5 rounded-lg hover:bg-blue-700 transition shadow-md hover:shadow-lg disabled:bg-blue-400 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                            >
                                {loading ? (
                                    <>
                                        <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        Sending...
                                    </>
                                ) : (
                                    "Send Message"
                                )}
                            </button>
                        </form>
                    )}
                </div>

                <div className="flex flex-col gap-8">
                    <div className="prose prose-slate prose-lg text-slate-700 bg-white p-8 rounded-3xl shadow-sm border border-slate-100">
                        <h3 className="text-blue-900 font-bold text-2xl mb-4">Why Contact Us?</h3>
                        <ul className="list-disc pl-5 mb-8 space-y-2 marker:text-blue-500">
                            <li><strong>Report issues:</strong> Found a bug in our calculation logic? Let us know!</li>
                            <li><strong>Request features:</strong> Need a specific local tax rate calculator?</li>
                            <li><strong>Suggest improvements:</strong> We are always looking to improve our user experience.</li>
                        </ul>

                        <h3 className="text-blue-900 font-bold text-2xl mb-4">Frequently Asked Questions</h3>
                        <p className="mb-8">
                            If you're inquiring about specific tax rates for a city not listed, please check our <Link href="/resources" className="text-blue-600 font-semibold hover:underline">Resources page</Link> first, as we update our databases weekly.
                        </p>

                        <h3 className="text-blue-900 font-bold text-2xl mb-4">Response Time</h3>
                        <p>
                            Our support team is dedicated to providing swift assistance. We typically respond to all inquiries within <strong>24-48 business hours</strong>.
                        </p>
                    </div>
                </div>

            </main>
        </Layout>
    );
}

import Head from 'next/head';
import Layout from '../components/Layout';
import * as Icons from '../components/Icons';

export default function Contact() {
    return (
        <Layout>
            <Head>
                <title>Contact Us | California Tax Calculators</title>
                <meta name="description" content="Have questions or feedback? Contact the California Tax Calculators team. We are here to help you with your tax estimation needs." />
                <link rel="canonical" href="https://californiataxcalculators.com/contact" />
            </Head>

            <div className="bg-blue-900 text-white py-20">
                <div className="max-w-7xl mx-auto px-4 text-center">
                    <h1 className="text-4xl md:text-5xl font-extrabold mb-6">Get in Touch</h1>
                    <p className="text-xl text-blue-100">We value your feedback and are here to assist with any inquiries.</p>
                </div>
            </div>

            <main className="max-w-3xl mx-auto py-16 px-4">
                <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-100 p-10">
                    <h2 className="text-2xl font-bold text-slate-900 mb-8">Send us an Email</h2>
                    
                    <div className="flex items-center gap-6 p-6 bg-slate-50 rounded-2xl border border-slate-200 mb-10">
                        <div className="bg-blue-600 p-4 rounded-full text-white">
                            <Icons.EmailIcon /> 
                        </div>
                        <div>
                            <p className="text-sm text-slate-500 uppercase font-bold tracking-wider">Email Address</p>
                            <p className="text-xl font-bold text-slate-900">support@californiataxcalculators.com</p>
                        </div>
                    </div>

                    <div className="prose prose-slate">
                        <h3 className="text-blue-900 font-bold">Frequently Asked Questions</h3>
                        <p className="text-slate-600 text-sm">
                            If you're inquiring about specific tax rates for a city not listed, please check our <strong>Resources</strong> page first as we update it weekly.
                        </p>
                        <h3 className="text-blue-900 font-bold mt-6">Response Time</h3>
                        <p className="text-slate-600 text-sm">
                            Our team typically responds to all inquiries within <strong>24-48 business hours</strong>.
                        </p>
                    </div>
                </div>
            </main>
        </Layout>
    );
}
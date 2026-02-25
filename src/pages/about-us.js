import Head from 'next/head';
import Layout from '../components/Layout';
import * as Icons from '../components/Icons';

export default function AboutUs() {
    return (
        <Layout>
            <Head>
                <title>About Us | California Tax Calculators - Our Mission</title>
                <meta name="description" content="Learn about our mission to provide Californians with the most accurate, updated, and easy-to-use tax estimation tools for 2026." />
                <link rel="canonical" href="https://californiataxcalculators.com/about-us" />
            </Head>

            <div className="bg-slate-900 text-white py-20">
                <div className="max-w-7xl mx-auto px-4 text-center">
                    <h1 className="text-4xl md:text-5xl font-extrabold mb-6">Our Mission</h1>
                    <p className="text-xl text-slate-300 max-w-3xl mx-auto">
                        Empowering Californians with transparent, precise, and accessible tax information.
                    </p>
                </div>
            </div>

            <main className="max-w-4xl mx-auto py-16 px-4 text-slate-900">
                <div className="prose prose-slate lg:prose-xl">
                    <h2 className="text-3xl font-bold mb-6 text-blue-900">Why California Tax Calculators?</h2>
                    <p className="text-lg leading-relaxed mb-6">
                        Navigating California's complex tax landscape—from Prop 13 property limits to localized sales tax rates—can be daunting. We built this platform to simplify financial planning for homeowners, shoppers, and businesses across the Golden State.
                    </p>
                    
                    <div className="grid md:grid-cols-2 gap-8 my-12">
                        <div className="bg-blue-50 p-6 rounded-2xl border border-blue-100">
                            <h3 className="font-bold text-blue-900 mb-2">Accuracy First</h3>
                            <p className="text-sm text-slate-600">We constantly update our algorithms to reflect the latest 2026 state and local tax mandates.</p>
                        </div>
                        <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200">
                            <h3 className="font-bold text-slate-900 mb-2">User Centric</h3>
                            <p className="text-sm text-slate-600">No ads-clutter, no complicated jargon. Just the numbers you need in seconds.</p>
                        </div>
                    </div>

                    <h2 className="text-3xl font-bold mb-6 text-blue-900">Who We Are</h2>
                    <p className="text-lg leading-relaxed">
                        We are a dedicated team of finance enthusiasts and developers focused on creating the best-in-class financial tools for California residents. Our goal is to remain the #1 trusted resource for tax estimations in CA.
                    </p>
                </div>
            </main>
        </Layout>
    );
}
import Head from 'next/head';
import Layout from '../components/Layout';
import Link from 'next/link';

export default function AboutUs() {
    return (
        <Layout>
            <Head>
                <title>About Us | California Tax Calculators - Our Mission</title>
                <meta name="description" content="Learn about our mission to provide Californians with the most accurate, updated, and easy-to-use tax estimation tools for 2026." />
                <link rel="canonical" href="https://californiataxcalculators.com/about-us" />
                
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{
                        __html: JSON.stringify({
                            "@context": "https://schema.org",
                            "@type": "AboutPage",
                            "name": "About California Tax Calculators",
                            "url": "https://californiataxcalculators.com/about-us"
                        })
                    }}
                />
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
                            <p className="text-sm text-slate-600">A clean, distraction-free interface with no complicated jargon. Just the numbers you need in seconds.</p>
                        </div>
                    </div>

                    <h2 className="text-3xl font-bold mb-6 text-blue-900">Who We Are</h2>
                    <p className="text-lg leading-relaxed">
                        We are a dedicated team of finance enthusiasts and developers focused on creating the best-in-class financial tools for California residents. Our goal is to remain the #1 trusted resource for tax estimations in CA. 
                        {" "}If you have any questions or feedback, please <Link href="https://californiataxcalculators.com/contact" className="text-blue-600 hover:underline font-semibold">contact us</Link>.
                    </p>

                    <h2 className="text-3xl font-bold mb-6 mt-12 text-blue-900">How Our Tax Calculators Work</h2>
                    <p className="text-lg leading-relaxed mb-6">
                        Our calculators are designed to provide quick tax estimates based on publicly available federal and California tax brackets. By combining federal income tax rules, California state tax rates, and payroll deductions such as Social Security and Medicare, we provide users with an easy way to estimate their potential take-home pay.
                    </p>

                    <div className="bg-amber-50 border-l-4 border-amber-500 p-6 my-8 rounded-r-lg">
                        <h3 className="text-xl font-bold text-amber-900 mb-3">Our Commitment to Transparency</h3>
                        <p className="text-lg leading-relaxed text-amber-800 m-0">
                            While our tools aim to be as accurate as possible, they are intended for informational purposes only. For official tax advice or filing assistance, we always recommend consulting a qualified tax professional or the California Franchise Tax Board.
                        </p>
                    </div>

                    <h2 className="text-3xl font-bold mb-6 mt-12 text-blue-900">Our Vision</h2>
                    <p className="text-lg leading-relaxed">
                        Our long-term vision is to become the most trusted online resource for California tax estimation tools. As tax laws evolve, we will continue expanding our calculators, guides, and educational resources to help residents make informed financial decisions with confidence.
                    </p>

                </div>
            </main>
        </Layout>
    );
}

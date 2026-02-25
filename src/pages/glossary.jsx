import Head from 'next/head';
import Layout from '../components/Layout';

export default function Glossary() {
    // هذه هي المصفوفة التي تحتوي على جميع المصطلحات
    const terms = [
        {
            term: "Ad Valorem Tax",
            definition: "A tax based on the assessed value of an item, such as real estate or personal property. In California, property taxes are primarily ad valorem."
        },
        {
            term: "Assessed Value",
            definition: "The dollar value assigned to a property for tax purposes. Under Prop 13, this is usually the purchase price plus an annual inflation adjustment."
        },
        {
            term: "Proposition 13",
            definition: "A landmark California law passed in 1978 that limits property tax rates to 1% of assessed value and restricts annual increases in assessed value to 2%."
        },
        {
            term: "Sales and Use Tax",
            definition: "Tax imposed on the sale or consumption of tangible personal property. It combines state-wide base rates with local district taxes."
        },
        {
            term: "Mello-Roos",
            definition: "A special tax district in California where real estate developers or entities issue bonds to fund local infrastructure, repaid by property owners."
        },
        {
            term: "Proposition 19",
            definition: "A law passed in 2020 that allows homeowners over 55, disabled, or wildfire victims to transfer their tax base to a replacement home anywhere in California."
        },
        {
            term: "District Tax",
            definition: "Local taxes added to the statewide base sales tax rate to fund specific local projects like transportation or emergency services."
        },
        {
            term: "Homeowners' Exemption",
            definition: "A $7,000 reduction in the assessed value for owner-occupied residences, typically saving about $70 annually on property taxes."
        },
        {
            term: "Supplemental Property Tax",
            definition: "A one-time tax bill issued after a property sale to cover the difference between the old and new assessed values for the rest of the year."
        },
        {
            term: "Direct Assessments",
            definition: "Non-ad valorem charges on a property tax bill for specific services like sewer or lighting, not based on the property's market value."
        }
    ];

    return (
        <Layout>
            <Head>
                <title>California Tax Glossary | Common Tax Terms Explained</title>
                <meta name="description" content="A comprehensive dictionary of California tax terms. Understand property tax, sales tax, and Prop 13 terminology easily." />
                <link rel="canonical" href="https://californiataxcalculators.com/glossary" />
            </Head>

            <div className="bg-slate-50 border-b border-slate-200 py-16">
                <div className="max-w-7xl mx-auto px-4 text-center">
                    <h1 className="text-4xl font-extrabold text-slate-900 mb-4">Tax Glossary</h1>
                    <p className="text-xl text-slate-500 max-w-2xl mx-auto">
                        Clear explanations for complex California tax terms and terminology.
                    </p>
                </div>
            </div>

            <main className="max-w-4xl mx-auto py-16 px-4">
                <div className="space-y-12">
                    {terms.map((item, index) => (
                        <div key={index} className="border-b border-slate-100 pb-8 last:border-0">
                            <h2 className="text-2xl font-bold text-blue-900 mb-3">{item.term}</h2>
                            <p className="text-lg text-slate-700 leading-relaxed">
                                {item.definition}
                            </p>
                        </div>
                    ))}
                </div>
            </main>
        </Layout>
    );
}
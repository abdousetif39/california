import Head from 'next/head';

export default function Glossary() {
    const terms = [
        { term: "Ad Valorem Tax", definition: "A tax based on the assessed value of an item." },
        { term: "Proposition 13", definition: "Limits property tax rates to 1% of assessed value." }
    ];

    return (
        <div style={{ padding: '20px', fontFamily: 'sans-serif' }}>
            <Head>
                <title>Tax Glossary</title>
            </Head>
            <h1>Tax Glossary</h1>
            {terms.map((item, index) => (
                <div key={index} style={{ marginBottom: '20px' }}>
                    <h2 style={{ color: '#1e40af' }}>{item.term}</h2>
                    <p>{item.definition}</p>
                </div>
            ))}
        </div>
    );
}
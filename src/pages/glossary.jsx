import Head from 'next/head';
import Link from 'next/link';

export default function Glossary() {
  const terms = [
    {
      term: "Ad Valorem Tax",
      definition: "A tax based on the assessed value of an item.",
      example: "If a property is worth $200,000, the tax is calculated based on that value.",
      california: "In California, ad valorem tax mainly applies to property taxes.",
      faqs: [
        {
          q: "What does ad valorem tax mean?",
          a: "It means a tax based on the value of an item such as property."
        },
        {
          q: "How is ad valorem tax calculated?",
          a: "It is calculated as a percentage of the assessed value."
        }
      ]
    },
    {
      term: "Proposition 13",
      definition: "Limits property tax rates to 1% of assessed value.",
      example: "If your home is valued at $300,000, the base tax is about $3,000 per year.",
      california: "Proposition 13 is a California law that controls property tax increases.",
      faqs: [
        {
          q: "What is Proposition 13?",
          a: "It is a California law that limits property tax rates and increases."
        },
        {
          q: "Why is Proposition 13 important?",
          a: "It protects homeowners from large tax increases."
        }
      ]
    }
  ];

  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif', maxWidth: '900px', margin: 'auto' }}>
      <Head>
        <title>Tax Glossary - California Tax Terms Explained</title>
        <meta name="description" content="Learn key tax terms in California including ad valorem tax and Proposition 13 with examples and explanations." />
      </Head>

      <h1>Tax Glossary</h1>

      <p>
        This glossary explains important tax terms used in California. You can also use our{" "}
        <Link href="/california-sales-tax-calculator">Sales Tax Calculator</Link> or{" "}
        <Link href="/property-tax-calculator">Property Tax Calculator</Link>.
      </p>

      {terms.map((item, index) => (
        <div key={index} style={{ marginBottom: '40px' }}>
          <h2 style={{ color: '#1e40af' }}>{item.term}</h2>

          <h3>Definition</h3>
          <p>{item.definition}</p>

          <h3>Example</h3>
          <p>{item.example}</p>

          <h3>In California</h3>
          <p>{item.california}</p>

          <h3>FAQs</h3>
          <ul>
            {item.faqs.map((faq, i) => (
              <li key={i} style={{ marginBottom: '10px' }}>
                <strong>{faq.q}</strong>
                <br />
                {faq.a}
              </li>
            ))}
          </ul>
        </div>
      ))}

      {/* FAQ Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": terms.flatMap(term =>
              term.faqs.map(faq => ({
                "@type": "Question",
                "name": faq.q,
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": faq.a
                }
              }))
            )
          })
        }}
      />
    </div>
  );
}
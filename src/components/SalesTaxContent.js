export default function SalesTaxContent({ city, rate }) {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-8 border border-slate-100">

      <h2 className="text-2xl font-bold text-slate-900 mb-6">
        {city ? `Sales Tax in ${city}, California` : "What is California Sales Tax?"}
      </h2>

      <p className="text-slate-700 mb-4 leading-relaxed">
        {city
          ? `The sales tax rate in ${city}, California is ${rate}%.`
          : `California sales tax is a consumption tax applied to goods and services. The base rate is 7.25%, but it varies by location.`}
      </p>

      {/* ✅ هذا الآن صحيح */}
      {city && (
        <p className="text-slate-700 mb-4 leading-relaxed">
          Sales tax in {city} varies depending on local district taxes, which fund infrastructure, transportation, and public services.
        </p>
      )}

      <h2 className="text-2xl font-bold text-slate-900 mt-10 mb-6">
        How California Sales Tax is Calculated
      </h2>

      <p className="text-slate-700 mb-4 leading-relaxed">
        Sales tax is calculated by multiplying the purchase amount by the applicable tax rate.
        For example, a $100 purchase at 8.75% results in $8.75 tax.
      </p>

      <div className="bg-blue-50 border border-blue-100 p-6 rounded-xl my-6">
        <h3 className="font-semibold text-blue-900 mb-2">Example Calculation</h3>
        <p className="text-slate-700 text-sm">
          Purchase Amount: $250 <br />
          Tax Rate: 9.25% <br />
          Sales Tax: $23.13 <br />
          Total Cost: $273.13
        </p>
      </div>

      <h2 className="text-2xl font-bold text-slate-900 mt-10 mb-6">
        Why Sales Tax Varies by City
      </h2>

      <p className="text-slate-700 mb-4 leading-relaxed">
        Local governments can add district taxes to fund public services, which is why rates differ between cities.
      </p>

      <h2 className="text-2xl font-bold text-slate-900 mt-10 mb-6">
        Tips to Reduce Sales Tax Costs
      </h2>

      <ul className="list-disc pl-6 text-slate-700 space-y-2">
        <li>Shop in areas with lower tax rates when possible.</li>
        <li>Take advantage of tax-free events.</li>
        <li>Compare online vs in-store purchases.</li>
        <li>Use this calculator before large purchases.</li>
      </ul>

      <h2 className="text-2xl font-bold text-slate-900 mt-10 mb-6">
        Important Disclaimer
      </h2>

      <p className="text-slate-600 text-sm leading-relaxed">
        This tool provides estimates only and does not constitute financial or tax advice.
      </p>

    </div>
  );
}
// components/Navbar.jsx
import { useState } from 'react';
import { Calculator, Menu } from './Icons';

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="bg-white border-b border-slate-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20">
          <div className="flex items-center">
            {/* الشعار */}
            <a href="/" className="flex-shrink-0 flex items-center gap-2 group decoration-0">
              <div className="bg-blue-600 p-2 rounded-lg text-white group-hover:bg-blue-700 transition-colors">
                <Calculator />
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-xl text-slate-900 tracking-tight leading-none">California</span>
                <span className="text-xs font-semibold text-blue-600 uppercase tracking-widest leading-none">Tax Calculators</span>
              </div>
            </a>
            {/* روابط سطح المكتب */}
            <div className="hidden md:ml-10 md:flex md:space-x-8">
              <a href="/" className="flex items-center border-b-2 px-1 pt-1 text-sm font-medium border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300">Paycheck Calculator</a>
              <a href="/sales-tax" className="flex items-center border-b-2 px-1 pt-1 text-sm font-medium border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300">Sales Tax</a>
              <a href="/property-tax" className="flex items-center border-b-2 px-1 pt-1 text-sm font-medium border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300">Property Tax</a>
              <a href="/resources" className="flex items-center border-b-2 px-1 pt-1 text-sm font-medium border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300">Resources</a>
            </div>
          </div>
          {/* زر الموبايل */}
          <div className="flex items-center md:hidden">
            <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="p-2"><Menu /></button>
          </div>
        </div>
      </div>
      
      {/* قائمة الموبايل */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-slate-200 shadow-lg absolute w-full z-50">
            {/* ... روابط الموبايل ... */}
        </div>
      )}
    </nav>
  );
}
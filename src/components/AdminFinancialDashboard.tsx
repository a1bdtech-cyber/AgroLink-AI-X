import React, { useState } from 'react';
import { 
  TrendingUp, 
  DollarSign, 
  Calculator, 
  CheckCircle2, 
  AlertTriangle, 
  ShieldCheck, 
  Layers, 
  Calendar, 
  BarChart3, 
  PieChart as PieIcon, 
  ArrowUpRight, 
  ArrowDownRight, 
  Building2, 
  Landmark, 
  Truck, 
  FileCheck, 
  Clock, 
  Percent,
  Info
} from 'lucide-react';
import { 
  ResponsiveContainer, 
  AreaChart, 
  Area, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ReferenceLine 
} from 'recharts';
import { Language } from '../types';
import { BREAKEVEN_FINANCIAL_DATA, MOCK_ORDERS } from '../data/mockData';
import { formatCurrency, calculateLoanAmortization, toBengaliDigits } from '../utils/formatters';

interface AdminFinancialDashboardProps {
  language: Language;
}

export const AdminFinancialDashboard: React.FC<AdminFinancialDashboardProps> = ({ language }) => {
  const isBn = language === 'bn';

  // Loan Calculator Interactive State
  // Default: 10 Lakh (৳1,000,000), 7% annual interest, 5 years tenure (~৳19,801/month EMI)
  const [loanPrincipal, setLoanPrincipal] = useState<number>(1000000);
  const [interestRate, setInterestRate] = useState<number>(7);
  const [loanTenureYears, setLoanTenureYears] = useState<number>(5);

  const loanResult = calculateLoanAmortization(loanPrincipal, interestRate, loanTenureYears);

  // Supplier Verification Queue State
  const [supplierQueue, setSupplierQueue] = useState([
    {
      id: 'SUP-901',
      name: 'মোঃ আফসার আলী',
      location: 'গাবতলী, বগুড়া',
      crop: 'ডায়মন্ড গোল আলু (৫০ টন স্টক)',
      nid: '1984201889021',
      krishiCard: 'KBD-BOG-4412',
      status: 'Pending Verification',
      appliedDate: '10 Nov 2026'
    },
    {
      id: 'SUP-902',
      name: 'আজিজুল হক বেপারী',
      location: 'ঈশ্বরদী, পাবনা',
      crop: 'দেশি লাল পেঁয়াজ (৩০ টন স্টক)',
      nid: '1979401992014',
      krishiCard: 'KBD-PAB-8891',
      status: 'Pending Verification',
      appliedDate: '09 Nov 2026'
    },
    {
      id: 'SUP-903',
      name: 'বেগম রাজিয়া সুলতানা',
      location: 'বীরগঞ্জ, দিনাজপুর',
      crop: 'অটো হাস্কড মিনিকেট চাল (১০০ টন)',
      nid: '1988501223941',
      krishiCard: 'KBD-DIN-2319',
      status: 'Approved',
      appliedDate: '08 Nov 2026'
    }
  ]);

  const handleApproveSupplier = (id: string) => {
    setSupplierQueue(prev => prev.map(s => {
      if (s.id === id) {
        return { ...s, status: 'Approved' };
      }
      return s;
    }));
  };

  // Amortization chart data (condensed yearly for chart display)
  const yearlyChartData = [];
  for (let yr = 1; yr <= loanTenureYears; yr++) {
    const endMonthIdx = Math.min(yr * 12 - 1, loanResult.schedule.length - 1);
    const yrSlice = loanResult.schedule.slice((yr - 1) * 12, yr * 12);
    const yrPrincipalPaid = yrSlice.reduce((sum, item) => sum + item.principal, 0);
    const yrInterestPaid = yrSlice.reduce((sum, item) => sum + item.interest, 0);
    const remaining = loanResult.schedule[endMonthIdx]?.remainingBalance || 0;

    yearlyChartData.push({
      year: isBn ? `বছর ${toBengaliDigits(yr)}` : `Year ${yr}`,
      principalPaid: yrPrincipalPaid,
      interestPaid: yrInterestPaid,
      remainingBalance: remaining
    });
  }

  return (
    <div className="space-y-8">
      {/* Super Admin Top Header */}
      <div className="bg-gradient-to-r from-slate-900 via-emerald-950 to-slate-950 rounded-3xl p-6 sm:p-8 text-white border border-slate-800 shadow-xl relative overflow-hidden">
        <div className="relative z-1 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-semibold border border-emerald-500/30">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>{isBn ? 'সুপার অ্যাডমিন ও ফাইন্যান্সিয়াল কমান্ড সেন্টার' : 'Super Admin & Financial Command Hub'}</span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
              {isBn ? 'প্ল্যাটফর্ম রাজস্ব ও ব্রেক-ইভেন ট্র্যাকার' : 'Platform Revenue & Breakeven Analytics'}
            </h2>

            <p className="text-slate-300 text-xs sm:text-sm max-w-2xl">
              {isBn 
                ? 'AgroLink AI X এর সম্পূর্ণ আর্থিক স্বাস্থ্য, ৪% প্ল্যাটফর্ম কমিশন হিসাব, অপারেশনাল খরচ ও ৫ মাসের ব্রেক-ইভেন মাইলস্টোন ট্র্যাকিং।'
                : 'Live tracking of Monthly GMV, 4% platform take rate, hub logistics expenses, and Month 5 operational break-even realization.'
              }
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="bg-emerald-900/60 border border-emerald-500/40 px-4 py-2 rounded-2xl text-right">
              <span className="text-[10px] text-emerald-300 block">{isBn ? 'প্ল্যাটফর্ম টেক-রেট' : 'Take Rate'}</span>
              <span className="text-xl font-black text-amber-300 font-mono">৪.০%</span>
            </div>
          </div>
        </div>
      </div>

      {/* 4 Real-time Core Financial Metrics (Section 6 Realization) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Metric 1: Monthly GMV */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-2">
          <div className="flex items-center justify-between text-xs text-slate-500 font-semibold">
            <span>{isBn ? 'মাসিক মোট বিক্রি (Monthly GMV)' : 'Monthly Gross GMV'}</span>
            <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center">
              <DollarSign className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-black text-slate-900 font-mono">
            {formatCurrency(12540000, language)}
          </div>
          <div className="text-[11px] text-emerald-700 font-semibold flex items-center gap-1">
            <ArrowUpRight className="w-3.5 h-3.5" />
            <span>{isBn ? '+২৫.৪% গত মাসের তুলনায়' : '+25.4% MoM growth'}</span>
          </div>
        </div>

        {/* Metric 2: 4% Platform Commission Revenue */}
        <div className="bg-white p-5 rounded-2xl border border-emerald-300 shadow-xs space-y-2 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-16 h-16 bg-emerald-500/10 rounded-bl-full pointer-events-none" />
          <div className="flex items-center justify-between text-xs text-slate-500 font-semibold">
            <span>{isBn ? '৪% প্ল্যাটফর্ম কমিশন রাজস্ব' : '4% Platform Commission Revenue'}</span>
            <div className="w-8 h-8 rounded-lg bg-emerald-600 text-white flex items-center justify-center shadow-xs">
              <Percent className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-black text-emerald-800 font-mono">
            {formatCurrency(501600, language)}
          </div>
          <div className="text-[11px] text-slate-500">
            {isBn ? 'মোট জিএমভি-এর ৪% সরাসরি আয়' : 'Calculated exactly at 4% of GMV'}
          </div>
        </div>

        {/* Metric 3: Operational Expenses (OpEx) */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-2">
          <div className="flex items-center justify-between text-xs text-slate-500 font-semibold">
            <span>{isBn ? 'অপারেশনাল খরচ (Monthly OpEx)' : 'Operational Expenses (OpEx)'}</span>
            <div className="w-8 h-8 rounded-lg bg-rose-50 text-rose-700 flex items-center justify-center">
              <Layers className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-black text-slate-800 font-mono">
            {formatCurrency(312000, language)}
          </div>
          <div className="text-[11px] text-slate-500">
            {isBn ? 'কোল্ড ভ্যান, হাব স্টাফ ও টেক্স' : 'Logistics, Reefer fleet & QC Hubs'}
          </div>
        </div>

        {/* Metric 4: Net Profit/Loss */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-2">
          <div className="flex items-center justify-between text-xs text-slate-500 font-semibold">
            <span>{isBn ? 'নিট প্ল্যাটফর্ম লাভ (Net Profit)' : 'Net Platform Margin'}</span>
            <div className="w-8 h-8 rounded-lg bg-teal-50 text-teal-700 flex items-center justify-center">
              <TrendingUp className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-black text-emerald-700 font-mono">
            +{formatCurrency(189600, language)}
          </div>
          <div className="text-[11px] text-emerald-800 font-semibold">
            {isBn ? 'ব্রেক-ইভেন পার হয়ে লাভজনক (+৩৭.৮%)' : 'Profitable post-breakeven (+37.8%)'}
          </div>
        </div>
      </div>

      {/* Break-even Visual Graph Section (Section 6 Milestone Realization) */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-4 border-b border-slate-100">
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-lg font-bold text-slate-900">
                {isBn ? 'ব্রেক-ইভেন ট্র্যাজেক্টরি ও প্ল্যাটফর্ম লাভজনকতার গ্রাফ' : 'Break-Even Trajectory & Financial Milestone'}
              </h3>
              <span className="px-2.5 py-0.5 rounded-full text-xs font-black bg-amber-400 text-slate-950 animate-pulse">
                {isBn ? '★ মাস ৫-এ ব্রেক-ইভেন অর্জিত' : '★ Breakeven at Month 5'}
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-1">
              {isBn 
                ? 'মাস ১ থেকে মাস ১২ পর্যন্ত প্ল্যাটফর্মের ৪% কমিশন আয় এবং অপারেশনাল খরচের (OpEx) লাইভ চার্ট। মাস ৫-এ খরচ ছাড়িয়ে কোম্পানি সম্পূর্ণ লাভজনকতায় প্রবেশ করে।'
                : '12-month trajectory showing monthly 4% platform commission outpacing OpEx at Month 5 milestone.'
              }
            </p>
          </div>

          <div className="flex items-center gap-4 text-xs font-semibold">
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-full bg-emerald-600 inline-block"></span>
              <span className="text-slate-700">{isBn ? '৪% প্ল্যাটফর্ম রাজস্ব' : '4% Revenue'}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-full bg-rose-500 inline-block"></span>
              <span className="text-slate-700">{isBn ? 'অপারেশনাল খরচ (OpEx)' : 'OpEx'}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-full bg-teal-500 inline-block"></span>
              <span className="text-slate-700">{isBn ? 'নিট লাভ (Net Profit)' : 'Net Profit'}</span>
            </div>
          </div>
        </div>

        {/* Visual Progress Bar Milestone Strip */}
        <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-2">
          <div className="flex justify-between text-xs font-bold text-slate-800">
            <span>{isBn ? 'ব্রেক-ইভেন অগ্রগতি মাইলস্টোন:' : 'Breakeven Milestone Progress:'}</span>
            <span className="text-emerald-700 font-mono">
              {isBn ? 'মাস ৫ / ১২ (১০০% ব্রেক-ইভেন অর্জিত)' : 'Month 5 / 12 (100% Breakeven Achieved)'}
            </span>
          </div>

          <div className="w-full bg-slate-200 h-3.5 rounded-full overflow-hidden flex relative">
            <div className="bg-rose-400 h-full w-[33%]" title="Month 1-4: Investment Phase"></div>
            <div className="bg-amber-400 h-full w-[8.3%]" title="Month 5: Breakeven Inflexion Point"></div>
            <div className="bg-emerald-500 h-full flex-1" title="Month 6-12: High Profitability"></div>
          </div>

          <div className="flex justify-between text-[11px] text-slate-500">
            <span>মাস ১ (শুরু)</span>
            <span className="font-bold text-amber-700">★ মাস ৫: ব্রেক-ইভেন জিরো-লস পয়েন্ট</span>
            <span className="font-bold text-emerald-700">মাস ১২ (৳৪.৯ লাখ/মাস নিট লাভ)</span>
          </div>
        </div>

        {/* Recharts Area Chart */}
        <div className="h-72 sm:h-80 w-full pt-2">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={BREAKEVEN_FINANCIAL_DATA} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="revenueGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#059669" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#059669" stopOpacity={0.05}/>
                </linearGradient>
                <linearGradient id="opexGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#e11d48" stopOpacity={0.6}/>
                  <stop offset="95%" stopColor="#e11d48" stopOpacity={0.05}/>
                </linearGradient>
                <linearGradient id="profitGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#0d9488" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#0d9488" stopOpacity={0.1}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis dataKey="month" tick={{ fontSize: 11 }} />
              <YAxis 
                tickFormatter={(val) => `৳${val / 1000}k`} 
                tick={{ fontSize: 11 }}
              />
              <Tooltip 
                formatter={(value: any) => [`৳${Number(value).toLocaleString()}`, '']}
                contentStyle={{ backgroundColor: '#0f172a', borderRadius: '12px', color: '#fff', fontSize: '12px' }}
              />
              <Legend verticalAlign="top" height={36} wrapperStyle={{ fontSize: '12px' }} />
              <ReferenceLine y={0} stroke="#64748b" strokeDasharray="3 3" />
              <Area 
                type="monotone" 
                dataKey="revenue4Percent" 
                name={isBn ? '৪% রাজস্ব' : '4% Revenue'} 
                stroke="#059669" 
                strokeWidth={2.5}
                fillOpacity={1} 
                fill="url(#revenueGrad)" 
              />
              <Area 
                type="monotone" 
                dataKey="opex" 
                name={isBn ? 'মাসিক খরচ (OpEx)' : 'OpEx'} 
                stroke="#e11d48" 
                strokeWidth={2}
                fillOpacity={1} 
                fill="url(#opexGrad)" 
              />
              <Area 
                type="monotone" 
                dataKey="netProfit" 
                name={isBn ? 'নিট লাভ (Net Margin)' : 'Net Profit'} 
                stroke="#0d9488" 
                strokeWidth={2}
                fillOpacity={1} 
                fill="url(#profitGrad)" 
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Bank Loan & Repayment Amortization Calculator (Section 8 Realization) */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-4 border-b border-slate-100">
          <div>
            <div className="flex items-center gap-2">
              <Landmark className="w-5 h-5 text-emerald-700" />
              <h3 className="text-lg font-bold text-slate-900">
                {isBn ? 'ব্যাংক লোন ও কিস্তি পরিশোধ ক্যালকুলেটর (Loan Amortization)' : 'Bank Loan & EMI Repayment Calculator'}
              </h3>
            </div>
            <p className="text-xs text-slate-500 mt-1">
              {isBn 
                ? '১০ লাখ টাকা ব্যাংক লোন @ ৭% সুদে ৫ বছর মেয়াদে (~৳১৯,৮০১/মাস ইএমআই) স্বয়ংক্রিয় পরিশোধ ট্র্যাকার ও সিমুলেটর।'
                : 'Interactive loan amortization model. Default: 10 Lakh Bank Loan @ 7% for 5 years (~৳19,801/month EMI tracker).'
              }
            </p>
          </div>

          <div className="px-3 py-1 bg-emerald-50 text-emerald-800 border border-emerald-300 rounded-xl text-xs font-bold font-mono">
            EMI: {formatCurrency(loanResult.monthlyEmi, language)} / {isBn ? 'মাস' : 'mo'}
          </div>
        </div>

        {/* 3 Interactive Sliders */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-5 rounded-2xl bg-slate-50 border border-slate-200">
          {/* Slider 1: Loan Principal */}
          <div className="space-y-2">
            <div className="flex justify-between items-center text-xs">
              <label className="font-semibold text-slate-700">
                {isBn ? 'লোনের মূল পরিমাণ (Principal):' : 'Loan Principal:'}
              </label>
              <span className="font-mono font-bold text-emerald-800">
                {formatCurrency(loanPrincipal, language)}
              </span>
            </div>
            <input
              type="range"
              min={200000}
              max={5000000}
              step={100000}
              value={loanPrincipal}
              onChange={(e) => setLoanPrincipal(Number(e.target.value))}
              className="w-full accent-emerald-600 cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-500 font-mono">
              <span>৳২ লাখ</span>
              <span className="font-bold text-emerald-700">ডিফল্ট: ১০ লাখ</span>
              <span>৳৫০ লাখ</span>
            </div>
          </div>

          {/* Slider 2: Interest Rate */}
          <div className="space-y-2">
            <div className="flex justify-between items-center text-xs">
              <label className="font-semibold text-slate-700">
                {isBn ? 'বার্ষিক সুদের হার (Annual Interest):' : 'Annual Interest Rate:'}
              </label>
              <span className="font-mono font-bold text-amber-800">
                {interestRate}%
              </span>
            </div>
            <input
              type="range"
              min={4}
              max={15}
              step={0.5}
              value={interestRate}
              onChange={(e) => setInterestRate(Number(e.target.value))}
              className="w-full accent-amber-600 cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-500 font-mono">
              <span>৪% (কৃষি রিফাইন্যান্স)</span>
              <span className="font-bold text-amber-700">ডিফল্ট: ৭%</span>
              <span>১৫%</span>
            </div>
          </div>

          {/* Slider 3: Tenure Years */}
          <div className="space-y-2">
            <div className="flex justify-between items-center text-xs">
              <label className="font-semibold text-slate-700">
                {isBn ? 'পরিশোধের মেয়াদ (Tenure):' : 'Loan Tenure:'}
              </label>
              <span className="font-mono font-bold text-slate-900">
                {loanTenureYears} {isBn ? 'বছর (৬০ কিস্তি)' : 'Years'}
              </span>
            </div>
            <input
              type="range"
              min={1}
              max={10}
              step={1}
              value={loanTenureYears}
              onChange={(e) => setLoanTenureYears(Number(e.target.value))}
              className="w-full accent-slate-700 cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-500 font-mono">
              <span>১ বছর</span>
              <span className="font-bold">ডিফল্ট: ৫ বছর (৬০ মাস)</span>
              <span>১০ বছর</span>
            </div>
          </div>
        </div>

        {/* Loan Calculation Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="p-4 rounded-2xl bg-emerald-900 text-white space-y-1">
            <span className="text-xs text-emerald-200">
              {isBn ? 'মাসিক কিস্তি (Monthly EMI)' : 'Monthly EMI Repayment'}
            </span>
            <div className="text-2xl font-black font-mono text-amber-300">
              {formatCurrency(loanResult.monthlyEmi, language)}
            </div>
            <span className="text-[10px] text-emerald-200 block">
              {isBn ? `মোট ${toBengaliDigits(loanTenureYears * 12)} টি সমান কিস্তিতে` : `Over ${loanTenureYears * 12} monthly installments`}
            </span>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
            <span className="text-xs text-slate-500">
              {isBn ? 'মোট পরিশোধযোগ্য সুদ (Total Interest)' : 'Total Interest Payable'}
            </span>
            <div className="text-xl font-bold font-mono text-rose-700">
              {formatCurrency(loanResult.totalInterest, language)}
            </div>
            <span className="text-[10px] text-slate-500 block">
              {isBn ? `মূল লোনের ${Math.round((loanResult.totalInterest / loanPrincipal) * 100)}% সুদ` : `${Math.round((loanResult.totalInterest / loanPrincipal) * 100)}% of principal`}
            </span>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
            <span className="text-xs text-slate-500">
              {isBn ? 'সর্বমোট পরিশোধ (Principal + Interest)' : 'Total Repayment Amount'}
            </span>
            <div className="text-xl font-bold font-mono text-slate-900">
              {formatCurrency(loanResult.totalPayment, language)}
            </div>
            <span className="text-[10px] text-slate-500 block">
              {isBn ? 'বাংলাদেশ কৃষি ব্যাংক বা কমার্শিয়াল ব্যাংক' : 'Commercial / Krishi Bank'}
            </span>
          </div>
        </div>

        {/* Amortization Bar Chart */}
        <div className="space-y-3 pt-2">
          <h4 className="text-xs font-bold text-slate-700">
            {isBn ? 'বার্ষিক আসল ও সুদ পরিশোধ অনুপাত (Amortization Breakdown):' : 'Yearly Principal vs Interest Payment Distribution:'}
          </h4>
          <div className="h-60 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={yearlyChartData} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="year" tick={{ fontSize: 11 }} />
                <YAxis tickFormatter={(val) => `৳${val / 1000}k`} tick={{ fontSize: 11 }} />
                <Tooltip 
                  formatter={(value: any) => [`৳${Number(value).toLocaleString()}`, '']}
                  contentStyle={{ backgroundColor: '#0f172a', borderRadius: '12px', color: '#fff', fontSize: '12px' }}
                />
                <Legend wrapperStyle={{ fontSize: '12px' }} />
                <Bar 
                  dataKey="principalPaid" 
                  name={isBn ? 'পরিশোধিত আসল (Principal)' : 'Principal Paid'} 
                  fill="#059669" 
                  radius={[4, 4, 0, 0]} 
                />
                <Bar 
                  dataKey="interestPaid" 
                  name={isBn ? 'পরিশোধিত সুদ (Interest)' : 'Interest Paid'} 
                  fill="#f59e0b" 
                  radius={[4, 4, 0, 0]} 
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Supplier & Farmer Approval Queue */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div>
            <h3 className="text-base sm:text-lg font-bold text-slate-900">
              {isBn ? 'কৃষক ও সমবায় অনবোর্ডিং অনুমোদন কিউ' : 'Farmer & Cooperative Onboarding Approvals'}
            </h3>
            <p className="text-xs text-slate-500">
              {isBn ? 'এনআইডি, জমি রেকর্ড ও কৃষি কার্ড ভেরিফিকেশন' : 'Verify NID, land records, and Krishi cards before marketplace listing.'}
            </p>
          </div>
          <span className="text-xs font-semibold px-2.5 py-1 bg-slate-100 rounded-lg text-slate-700">
            {supplierQueue.filter(s => s.status === 'Pending Verification').length} {isBn ? 'টি পেন্ডিং আবেদন' : 'Pending'}
          </span>
        </div>

        <div className="space-y-3">
          {supplierQueue.map(sup => (
            <div 
              key={sup.id}
              className="p-4 rounded-2xl border border-slate-200 hover:border-emerald-500/50 transition-all flex flex-col md:flex-row items-start md:items-center justify-between gap-4 bg-slate-50/50"
            >
              <div className="space-y-1 text-xs">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-slate-900 text-sm">{sup.name}</span>
                  <span className="font-mono text-slate-500">({sup.id})</span>
                  <span className="text-slate-600">• {sup.location}</span>
                </div>
                <div className="text-slate-600 flex flex-wrap gap-3">
                  <span><strong>ফসল:</strong> {sup.crop}</span>
                  <span><strong>এনআইডি:</strong> {sup.nid}</span>
                  <span><strong>কৃষি কার্ড:</strong> {sup.krishiCard}</span>
                </div>
              </div>

              <div className="flex items-center gap-2 self-end md:self-center">
                {sup.status === 'Approved' ? (
                  <span className="text-xs font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-3 py-1.5 rounded-xl flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    {isBn ? 'অনুমোদিত ও ভেরিফাইড' : 'Approved & Live'}
                  </span>
                ) : (
                  <button
                    onClick={() => handleApproveSupplier(sup.id)}
                    className="px-4 py-2 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl text-xs font-bold shadow-xs transition-colors"
                  >
                    {isBn ? 'অনুমোদন দিন (Approve)' : 'Approve & List'}
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

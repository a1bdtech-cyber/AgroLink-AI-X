import React from 'react';
import { 
  ShieldCheck, 
  Truck, 
  Scale, 
  Layers, 
  Salad, 
  Wheat, 
  Flame, 
  Apple, 
  Egg, 
  Fish, 
  ChevronRight,
  TrendingDown,
  Building,
  Home
} from 'lucide-react';
import { ProductCategory, Language } from '../types';

interface MarketplaceHeroProps {
  purchasingMode: 'retail' | 'bulk';
  onTogglePurchasingMode: (mode: 'retail' | 'bulk') => void;
  selectedCategory: ProductCategory;
  onSelectCategory: (cat: ProductCategory) => void;
  language: Language;
  onNavigateToB2BHub: () => void;
}

export const MarketplaceHero: React.FC<MarketplaceHeroProps> = ({
  purchasingMode,
  onTogglePurchasingMode,
  selectedCategory,
  onSelectCategory,
  language,
  onNavigateToB2BHub
}) => {
  const isBn = language === 'bn';

  const categories: Array<{ id: ProductCategory; nameBn: string; nameEn: string; icon: React.ReactNode; count: number }> = [
    { id: 'all', nameBn: 'সকল কৃষি পণ্য', nameEn: 'All Produce', icon: <Layers className="w-4 h-4" />, count: 12 },
    { id: 'vegetables', nameBn: 'তাজা শাকসবজি', nameEn: 'Vegetables', icon: <Salad className="w-4 h-4" />, count: 4 },
    { id: 'spices', nameBn: 'পেঁয়াজ ও মসলা', nameEn: 'Spices & Onion', icon: <Flame className="w-4 h-4" />, count: 3 },
    { id: 'grains', nameBn: 'চাল ও ডাল', nameEn: 'Rice & Grains', icon: <Wheat className="w-4 h-4" />, count: 2 },
    { id: 'dairy_eggs', nameBn: 'ডিম ও দুগ্ধজাত', nameEn: 'Dairy & Eggs', icon: <Egg className="w-4 h-4" />, count: 1 },
    { id: 'fruits', nameBn: 'মৌসুমি ফলমূল', nameEn: 'Seasonal Fruits', icon: <Apple className="w-4 h-4" />, count: 1 },
    { id: 'poultry_fish', nameBn: 'পোল্ট্রি ও মাছ', nameEn: 'Poultry & Fish', icon: <Fish className="w-4 h-4" />, count: 1 },
  ];

  return (
    <div className="space-y-6">
      {/* Hero Banner Section */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-emerald-900 via-emerald-800 to-teal-900 text-white shadow-xl shadow-emerald-950/20 border border-emerald-700/40">
        {/* Background decorative textures */}
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#6ee7b7_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />
        <div className="absolute -right-20 -top-20 w-80 h-80 rounded-full bg-emerald-500/20 blur-3xl pointer-events-none" />
        <div className="absolute -left-20 -bottom-20 w-80 h-80 rounded-full bg-amber-500/15 blur-3xl pointer-events-none" />

        <div className="relative px-6 py-8 sm:px-10 sm:py-12 max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-8">
          <div className="flex-1 space-y-4 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-700/60 border border-emerald-500/40 text-emerald-200 text-xs font-semibold backdrop-blur-xs">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              {isBn ? 'কৃষি মধ্যস্বত্বভোগীমুক্ত স্মার্ট মার্কেটপ্লেস' : 'Disintermediating Bangladesh Agri Supply Chain'}
            </div>

            <h1 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight text-white">
              {isBn ? (
                <>
                  কৃষক থেকে সরাসরি ঘরে ও ব্যবসায় <br className="hidden sm:inline" />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 via-teal-200 to-amber-300">
                    তাজা খাঁটি কৃষিপণ্য
                  </span>
                </>
              ) : (
                <>
                  Direct Farm-to-Table & Business: <br className="hidden sm:inline" />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 via-teal-200 to-amber-300">
                    Fresh Agri Produce at True Value
                  </span>
                </>
              )}
            </h1>

            <p className="text-emerald-100/90 text-sm sm:text-base max-w-2xl leading-relaxed">
              {isBn 
                ? 'বগুড়া, দিনাজপুর ও মেহেরপুরের শীর্ষ কৃষক থেকে সরাসরি আলু, পেঁয়াজ, চাল ও শাকসবজি। ভোক্তাদের জন্য ন্যায্যমূল্য এবং রেস্তোরাঁ-হোটেলের জন্য বাল্ক সেভিংস।'
                : 'Direct from Bogura, Dinajpur & Pabna harvest fields. Retail freshness for households and high-volume commercial supply contracts for restaurants & grocers.'
              }
            </p>

            {/* Dual Purchasing Mode Selector Box */}
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
              <div className="p-1.5 bg-emerald-950/70 rounded-2xl border border-emerald-600/40 inline-flex shadow-inner">
                <button
                  onClick={() => onTogglePurchasingMode('retail')}
                  className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 transition-all ${
                    purchasingMode === 'retail'
                      ? 'bg-emerald-500 text-white shadow-md shadow-emerald-950/40 ring-1 ring-emerald-300'
                      : 'text-emerald-200 hover:text-white hover:bg-emerald-800/50'
                  }`}
                >
                  <Home className="w-4 h-4 text-emerald-200" />
                  <span>{isBn ? 'খুচরা ক্রয় (Retail / D2C)' : 'Retail Purchasing (D2C)'}</span>
                </button>

                <button
                  onClick={() => onTogglePurchasingMode('bulk')}
                  className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 transition-all ${
                    purchasingMode === 'bulk'
                      ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-950/40 ring-1 ring-amber-300'
                      : 'text-emerald-200 hover:text-white hover:bg-emerald-800/50'
                  }`}
                >
                  <Building className="w-4 h-4" />
                  <span>{isBn ? 'পাইকারি ক্রয় (B2B Bulk)' : 'B2B Bulk Purchasing'}</span>
                  <span className="px-1.5 py-0.5 text-[10px] bg-amber-400 text-amber-950 rounded font-black">
                    -25%
                  </span>
                </button>
              </div>

              {purchasingMode === 'bulk' && (
                <button
                  onClick={onNavigateToB2BHub}
                  className="px-4 py-2.5 bg-amber-400/20 hover:bg-amber-400/30 text-amber-200 border border-amber-400/40 rounded-xl text-xs sm:text-sm font-semibold flex items-center gap-1.5 transition-all"
                >
                  <span>{isBn ? 'বি২বি কমার্শিয়াল হাব ও কোটেশন' : 'B2B Commercial Hub & Quotations'}</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>

          {/* Quick Metrics & Mode Indicator Card */}
          <div className="w-full lg:w-80 bg-white/10 backdrop-blur-md rounded-2xl p-5 border border-white/20 text-white space-y-4 shrink-0 shadow-lg">
            <div className="flex items-center justify-between pb-3 border-b border-white/15">
              <span className="text-xs text-emerald-200 font-medium">
                {isBn ? 'বর্তমান মোড বৈশিষ্ট্য' : 'Active Purchasing Mode'}
              </span>
              <span className={`text-xs px-2 py-0.5 rounded-full font-bold uppercase tracking-wider ${
                purchasingMode === 'bulk' 
                  ? 'bg-amber-400 text-slate-950' 
                  : 'bg-emerald-400 text-emerald-950'
              }`}>
                {purchasingMode === 'bulk' ? 'B2B Bulk Tier' : 'Retail D2C'}
              </span>
            </div>

            <div className="space-y-2.5 text-xs">
              <div className="flex items-center justify-between text-slate-200">
                <span>{isBn ? 'ন্যূনতম পরিমাণ (MOQ):' : 'Min Order Qty (MOQ):'}</span>
                <span className="font-bold text-white">
                  {purchasingMode === 'bulk' ? (isBn ? '২০ কেজি / বস্তা' : '20 KG / Crate') : (isBn ? '১ কেজি / ১ পিস' : '1 KG / 1 Pc')}
                </span>
              </div>
              <div className="flex items-center justify-between text-slate-200">
                <span>{isBn ? 'মূল্য নির্ধারণ নীতি:' : 'Pricing Strategy:'}</span>
                <span className="font-bold text-amber-300">
                  {purchasingMode === 'bulk' ? (isBn ? 'সরাসরি আড়ত রেট (-১৫-৩০%)' : 'Mandi Rate (-15-30%)') : (isBn ? 'সরাসরি ফার্ম গেট' : 'Direct Farm Gate')}
                </span>
              </div>
              <div className="flex items-center justify-between text-slate-200">
                <span>{isBn ? 'চালান ও ইনভয়েস:' : 'Tax Invoice & Receipt:'}</span>
                <span className="font-bold text-white">
                  {purchasingMode === 'bulk' ? (isBn ? 'অটো জিএসটি/ভ্যাট চালিত কোটেশন' : 'Automated B2B Proforma') : (isBn ? 'ডিজিটাল ই-রসিদ' : 'Instant e-Receipt')}
                </span>
              </div>
            </div>

            <div className="pt-2 border-t border-white/15 flex items-center justify-between text-xs text-emerald-200">
              <div className="flex items-center gap-1.5">
                <Truck className="w-3.5 h-3.5 text-emerald-300" />
                <span>{isBn ? 'কোল্ড চেইন এক্সপ্রেস' : 'Cold Chain Transit'}</span>
              </div>
              <span className="font-mono text-white font-semibold">
                {isBn ? '৬-১২ ঘণ্টা' : '6-12 Hours'}
              </span>
            </div>
          </div>
        </div>

        {/* 3 Core Trust Badges Bar */}
        <div className="bg-emerald-950/80 border-t border-emerald-700/40 px-6 py-3.5 text-xs text-emerald-200">
          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex items-center gap-2.5 justify-center md:justify-start">
              <div className="w-7 h-7 rounded-lg bg-emerald-800/80 flex items-center justify-center text-emerald-300">
                <ShieldCheck className="w-4 h-4" />
              </div>
              <div>
                <span className="font-bold text-white block">{isBn ? '১০০% যাচাইকৃত কৃষক (NID Verified)' : '100% Verified Farmers'}</span>
                <span className="text-[11px] text-emerald-300/80">{isBn ? 'বগুড়া, ঈশ্বরদী, চুয়াডাঙ্গা ও দিনাজপুরের মাঠ' : 'Authentic geographic origin guarantee'}</span>
              </div>
            </div>

            <div className="flex items-center gap-2.5 justify-center">
              <div className="w-7 h-7 rounded-lg bg-emerald-800/80 flex items-center justify-center text-amber-300">
                <Scale className="w-4 h-4" />
              </div>
              <div>
                <span className="font-bold text-white block">{isBn ? 'স্বচ্ছ মূল্য (মাত্র ৪% প্ল্যাটফর্ম ফি)' : 'Transparent 4% Platform Fee'}</span>
                <span className="text-[11px] text-emerald-300/80">{isBn ? 'কোন গোপন অতিরিক্ত চার্জ বা দালালি নেই' : '96% proceeds straight to the farmer'}</span>
              </div>
            </div>

            <div className="flex items-center gap-2.5 justify-center md:justify-end">
              <div className="w-7 h-7 rounded-lg bg-emerald-800/80 flex items-center justify-center text-teal-300">
                <Truck className="w-4 h-4" />
              </div>
              <div>
                <span className="font-bold text-white block">{isBn ? 'স্মার্ট লজিস্টিকস ও তাপমাত্রা নিয়ন্ত্রণ' : 'Smart Reefer Logistics'}</span>
                <span className="text-[11px] text-emerald-300/80">{isBn ? 'ফার্ম থেকে ভোর ৭টা ও বিকাল ৫টায় সরাসরি ডেলিভারি' : 'Morning & Evening scheduled dock deliveries'}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Category Navigation Bar */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
        {categories.map((cat) => {
          const isActive = selectedCategory === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => onSelectCategory(cat.id)}
              className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold flex items-center gap-2 whitespace-nowrap transition-all border ${
                isActive
                  ? 'bg-emerald-800 text-white border-emerald-900 shadow-md shadow-emerald-900/10'
                  : 'bg-white text-slate-700 hover:bg-slate-100/80 border-slate-200'
              }`}
            >
              <span className={isActive ? 'text-emerald-300' : 'text-emerald-600'}>
                {cat.icon}
              </span>
              <span>{isBn ? cat.nameBn : cat.nameEn}</span>
              <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ${
                isActive ? 'bg-emerald-700 text-emerald-100' : 'bg-slate-100 text-slate-500'
              }`}>
                {cat.count}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

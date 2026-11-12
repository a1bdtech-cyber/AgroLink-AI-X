import React from 'react';
import { 
  Sprout, 
  Search, 
  MapPin, 
  Globe, 
  ShoppingCart, 
  UserCheck, 
  TrendingUp, 
  ShieldCheck, 
  Sparkles,
  Building2,
  Users,
  Tractor,
  SlidersHorizontal
} from 'lucide-react';
import { UserRole, Language } from '../types';
import { MARKET_MANDI_INDEX, DELIVERY_ZONES } from '../data/mockData';
import { formatCurrency } from '../utils/formatters';

interface HeaderProps {
  currentRole: UserRole;
  onRoleChange: (role: UserRole) => void;
  language: Language;
  onLanguageChange: (lang: Language) => void;
  searchQuery: string;
  onSearchChange: (q: string) => void;
  selectedZone: string;
  onZoneChange: (zone: string) => void;
  cartCount: number;
  cartTotal: number;
  onOpenCart: () => void;
  onOpenAIModal: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentRole,
  onRoleChange,
  language,
  onLanguageChange,
  searchQuery,
  onSearchChange,
  selectedZone,
  onZoneChange,
  cartCount,
  cartTotal,
  onOpenCart,
  onOpenAIModal
}) => {
  const isBn = language === 'bn';

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-xs">
      {/* Top Wholesale Mandi Price Ticker */}
      <div className="bg-emerald-950 text-emerald-100 text-xs py-1.5 px-4 overflow-hidden border-b border-emerald-900/40">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          <div className="flex items-center gap-2 shrink-0 font-medium text-emerald-300">
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400"></span>
            </span>
            <TrendingUp className="w-3.5 h-3.5 text-emerald-400" />
            <span>{isBn ? 'লাইভ পাইকারি ও আড়ত ইনডেক্স:' : 'Live Wholesale Mandi Index:'}</span>
          </div>

          <div className="flex items-center gap-6 overflow-x-auto whitespace-nowrap scrollbar-none py-0.5 text-xs text-slate-300">
            {MARKET_MANDI_INDEX.map((item, idx) => (
              <div key={idx} className="inline-flex items-center gap-1.5 shrink-0">
                <span className="font-semibold text-white">{isBn ? item.nameBn : item.nameEn}:</span>
                <span className="text-amber-300 font-mono">{item.mandiPrice}</span>
                <span className={`text-[10px] px-1 py-0.2 rounded font-medium ${
                  item.trend === 'up' ? 'text-emerald-300 bg-emerald-900/60' : 
                  item.trend === 'down' ? 'text-rose-300 bg-rose-950/60' : 'text-slate-300'
                }`}>
                  {item.change}
                </span>
              </div>
            ))}
          </div>

          <div className="hidden lg:flex items-center gap-2 text-[11px] text-emerald-300 shrink-0">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span>{isBn ? 'স্বচ্ছ ৪% প্ল্যাটফর্ম কমিশন' : 'Transparent 4% Platform Fee'}</span>
          </div>
        </div>
      </div>

      {/* Main Header Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3">
        <div className="flex items-center justify-between gap-3 md:gap-6">
          {/* Logo & Brand */}
          <div className="flex items-center gap-3 shrink-0">
            <div className="flex items-center gap-2 cursor-pointer group" onClick={() => onRoleChange('d2c')}>
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-800 to-emerald-600 flex items-center justify-center text-white shadow-md shadow-emerald-900/20 group-hover:scale-105 transition-transform">
                <Sprout className="w-6 h-6 text-emerald-200" />
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-1.5">
                  <span className="text-lg md:text-xl font-bold tracking-tight text-slate-900">
                    AgroLink <span className="text-emerald-600 font-extrabold">AI X</span>
                  </span>
                  <span className="hidden sm:inline-block px-1.5 py-0.5 rounded text-[10px] font-semibold bg-emerald-100 text-emerald-800 border border-emerald-300">
                    B2B & D2C
                  </span>
                </div>
                <span className="text-[11px] text-slate-500 font-medium -mt-1 hidden sm:block">
                  {isBn ? 'অ্যাগ্রোলিংক এআই এক্স • কৃষি মার্কেটপ্লেস' : 'Direct Farmer-to-Business Hub'}
                </span>
              </div>
            </div>
          </div>

          {/* Smart AI Search Bar */}
          <div className="flex-1 max-w-xl hidden md:block">
            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                placeholder={isBn ? 'স্মার্ট সার্চ: আলু, পেঁয়াজ, মিনিকেট চাল বা নিকটস্থ ফার্ম...' : 'Smart AI Search: Potato, Miniket rice, Onion or farm...'}
                className="w-full pl-10 pr-24 py-2 text-sm bg-slate-50 hover:bg-slate-100/80 focus:bg-white border border-slate-200 focus:border-emerald-500 rounded-full outline-hidden transition-all text-slate-900 placeholder:text-slate-400 focus:ring-2 focus:ring-emerald-500/20"
              />
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <button 
                onClick={onOpenAIModal}
                className="absolute right-1.5 top-1/2 -translate-y-1/2 px-2.5 py-1 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white text-xs font-semibold rounded-full flex items-center gap-1 shadow-xs transition-all"
                title="AI Krishi Advisor"
              >
                <Sparkles className="w-3 h-3 text-amber-300" />
                <span className="hidden lg:inline">{isBn ? 'এআই পরামর্শ' : 'AI Advice'}</span>
              </button>
            </div>
          </div>

          {/* Right Action Controls: Zone, Language, Role, Cart */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Delivery Zone Selector */}
            <div className="hidden xl:flex items-center gap-1.5 px-2.5 py-1.5 bg-slate-100 rounded-lg text-xs font-medium text-slate-700 border border-slate-200">
              <MapPin className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
              <select 
                value={selectedZone}
                onChange={(e) => onZoneChange(e.target.value)}
                aria-label={isBn ? 'ডেলিভারি জোন নির্বাচন' : 'Select delivery zone'}
                className="bg-transparent border-none text-xs text-slate-800 font-medium focus:outline-hidden cursor-pointer"
              >
                {DELIVERY_ZONES.map(z => (
                  <option key={z.id} value={z.id}>
                    {isBn ? z.nameBn : z.nameEn}
                  </option>
                ))}
              </select>
            </div>

            {/* Language Switcher */}
            <button
              onClick={() => onLanguageChange(isBn ? 'en' : 'bn')}
              className="px-2.5 py-1.5 rounded-lg border border-slate-200 text-xs font-semibold text-slate-700 hover:bg-slate-100 flex items-center gap-1 transition-colors"
              title="Change Language"
            >
              <Globe className="w-3.5 h-3.5 text-slate-500" />
              <span>{isBn ? 'EN' : 'বাং'}</span>
            </button>

            {/* Cart Trigger */}
            <button
              onClick={onOpenCart}
              className="relative px-3 py-1.5 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 text-emerald-900 rounded-lg flex items-center gap-2 font-semibold text-xs sm:text-sm transition-all"
            >
              <ShoppingCart className="w-4 h-4 text-emerald-700" />
              <div className="flex flex-col items-start leading-tight">
                <span className="text-[10px] text-emerald-700 hidden sm:block">
                  {isBn ? 'কার্ট' : 'Cart'}
                </span>
                <span className="font-bold text-emerald-900">
                  {formatCurrency(cartTotal, language)}
                </span>
              </div>
              {cartCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-amber-500 text-white text-[11px] font-bold w-5 h-5 rounded-full flex items-center justify-center shadow-xs">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Mobile Search Bar */}
        <div className="mt-2.5 md:hidden">
          <div className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder={isBn ? 'খুঁজুন: আলু, চাল, পেঁয়াজ, ডিম...' : 'Search: Potato, Rice, Onion, Eggs...'}
              className="w-full pl-9 pr-20 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg outline-hidden text-slate-900"
            />
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <button 
              onClick={onOpenAIModal}
              className="absolute right-1 top-1/2 -translate-y-1/2 px-2 py-1 bg-emerald-600 text-white text-[11px] font-medium rounded flex items-center gap-1"
            >
              <Sparkles className="w-3 h-3 text-amber-300" />
              <span>AI</span>
            </button>
          </div>
        </div>

        {/* 4 Persona / Role Switcher Bar */}
        <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between flex-wrap gap-2">
          <div className="flex items-center gap-1.5 text-xs text-slate-500 font-medium">
            <SlidersHorizontal className="w-3.5 h-3.5 text-slate-400" />
            <span className="hidden sm:inline">{isBn ? 'ইউজার ভিউ পরিবর্তন করুন:' : 'Switch Persona View:'}</span>
          </div>

          <div className="flex items-center gap-1.5 p-1 bg-slate-100 rounded-xl border border-slate-200/80 overflow-x-auto">
            {/* 1. D2C Household Buyer */}
            <button
              onClick={() => onRoleChange('d2c')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all shrink-0 ${
                currentRole === 'd2c'
                  ? 'bg-white text-emerald-800 shadow-xs border border-emerald-100 ring-1 ring-emerald-500/20'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/50'
              }`}
            >
              <Users className="w-3.5 h-3.5 text-emerald-600" />
              <span>{isBn ? '১. খুচরা ক্রেতা (D2C)' : '1. D2C Buyer'}</span>
            </button>

            {/* 2. B2B Commercial Buyer */}
            <button
              onClick={() => onRoleChange('b2b')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all shrink-0 ${
                currentRole === 'b2b'
                  ? 'bg-emerald-700 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/50'
              }`}
            >
              <Building2 className="w-3.5 h-3.5 text-amber-300" />
              <span>{isBn ? '২. পাইকারি/রেস্তোরাঁ (B2B)' : '2. B2B Commercial'}</span>
            </button>

            {/* 3. Farmer / Producer */}
            <button
              onClick={() => onRoleChange('farmer')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all shrink-0 ${
                currentRole === 'farmer'
                  ? 'bg-amber-600 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/50'
              }`}
            >
              <Tractor className="w-3.5 h-3.5" />
              <span>{isBn ? '৩. কৃষক পোর্টাল (Farmer)' : '3. Farmer Portal'}</span>
            </button>

            {/* 4. Super Admin */}
            <button
              onClick={() => onRoleChange('admin')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all shrink-0 ${
                currentRole === 'admin'
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/50'
              }`}
            >
              <UserCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>{isBn ? '৪. সুপার অ্যাডমিন (Admin)' : '4. Super Admin'}</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

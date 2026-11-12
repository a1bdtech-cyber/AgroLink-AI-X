import React, { useState } from 'react';
import { 
  Tractor, 
  Plus, 
  TrendingUp, 
  CheckCircle2, 
  Clock, 
  DollarSign, 
  AlertCircle, 
  Sparkles, 
  Truck, 
  QrCode, 
  Calendar,
  Layers,
  ArrowUpRight,
  ShieldCheck,
  Building2,
  Users
} from 'lucide-react';
import { Language, ProductCategory } from '../types';
import { MOCK_PRODUCTS } from '../data/mockData';
import { formatCurrency } from '../utils/formatters';

interface FarmerPortalProps {
  language: Language;
}

export const FarmerPortal: React.FC<FarmerPortalProps> = ({ language }) => {
  const isBn = language === 'bn';

  // State for Add Crop Modal
  const [showAddModal, setShowAddModal] = useState<boolean>(false);
  const [cropNameBn, setCropNameBn] = useState<string>('');
  const [cropCategory, setCropCategory] = useState<ProductCategory>('vegetables');
  const [harvestQty, setHarvestQty] = useState<number>(500);
  const [retailAsking, setRetailAsking] = useState<number>(38);
  const [bulkAsking, setBulkAsking] = useState<number>(30);
  const [moqQty, setMoqQty] = useState<number>(20);

  // Incoming Orders Queue State
  const [incomingOrders, setIncomingOrders] = useState([
    {
      id: 'ORD-BG-9921',
      buyer: 'Grand Sultan Restaurant',
      type: 'B2B Commercial (Bulk)',
      item: 'বগুড়ার ডায়মন্ড আলু',
      qty: '২০০ কেজি',
      total: 6000,
      fee4Pct: 240,
      farmerNet: 5760,
      status: 'Ready for Pickup',
      pickupTime: 'আজ বিকাল ৫:০০ টা (Reefer Truck #4)'
    },
    {
      id: 'ORD-DH-4412',
      buyer: 'তানভীর আহমেদ (ধানমন্ডি)',
      type: 'D2C Retail (খুচরা)',
      item: 'বগুড়ার ডায়মন্ড আলু',
      qty: '৫ কেজি',
      total: 200,
      fee4Pct: 8,
      farmerNet: 192,
      status: 'Accepted',
      pickupTime: 'আজ দুপুর ২:৩০ টা (Courier)'
    },
    {
      id: 'ORD-BG-9923',
      buyer: 'Meena Bazar Supermarket',
      type: 'B2B Commercial (Bulk)',
      item: 'বগুড়ার ডায়মন্ড আলু',
      qty: '৫০০ কেজি',
      total: 15000,
      fee4Pct: 600,
      farmerNet: 14400,
      status: 'New Request',
      pickupTime: 'আগামীকাল সকাল ৭:০০ টা'
    }
  ]);

  // Handle Order Accept
  const handleAcceptOrder = (id: string) => {
    setIncomingOrders(prev => prev.map(ord => {
      if (ord.id === id) {
        return { ...ord, status: 'Accepted & QR Ready' };
      }
      return ord;
    }));
  };

  return (
    <div className="space-y-6">
      {/* Farmer Welcome Profile Banner */}
      <div className="bg-gradient-to-r from-amber-700 via-amber-800 to-emerald-950 rounded-3xl p-6 sm:p-8 text-white border border-amber-600/40 shadow-xl relative overflow-hidden">
        <div className="relative z-1 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 text-white text-xs font-semibold backdrop-blur-xs">
              <Tractor className="w-3.5 h-3.5 text-amber-200" />
              <span>{isBn ? 'যাচাইকৃত কৃষক সদস্য পোর্টাল' : 'Verified Farmer Producer Dashboard'}</span>
            </div>

            <div className="flex items-center gap-3">
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
                {isBn ? 'স্বাগতম, মোঃ রফিকুল ইসলাম' : 'Welcome, Md. Rafiqul Islam'}
              </h2>
              <span className="px-2 py-0.5 rounded-full text-xs font-bold bg-emerald-400 text-slate-950 flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" />
                NID Verified
              </span>
            </div>

            <p className="text-amber-100/90 text-xs sm:text-sm">
              {isBn 
                ? 'শেরপুর, বগুড়া হাব • কৃষি কার্ড নং: KBD-BOG-98213 • AgroLink রেটিং: ৪.৯★'
                : 'Sherpur, Bogura Hub • Krishi Card: KBD-BOG-98213 • Rating: 4.9★ (380+ Orders Fulfilled)'
              }
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setShowAddModal(true)}
              className="px-4 py-2.5 bg-white hover:bg-amber-50 text-slate-950 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 shadow-lg transition-all"
            >
              <Plus className="w-4 h-4 text-emerald-700" />
              <span>{isBn ? 'নতুন ফসল লিস্টিং করুন' : 'List New Crop Harvest'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* 4 Financial & Payout Analytics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Metric 1: Gross Sales */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-2">
          <div className="flex items-center justify-between text-xs text-slate-500 font-semibold">
            <span>{isBn ? 'চলতি মাসের মোট বিক্রি (GMV)' : 'Monthly Gross Sales'}</span>
            <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center">
              <DollarSign className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-black text-slate-900 font-mono">
            {formatCurrency(185400, language)}
          </div>
          <div className="text-[11px] text-emerald-700 font-semibold flex items-center gap-1">
            <TrendingUp className="w-3.5 h-3.5" />
            <span>{isBn ? 'গত মাসের তুলনায় +১৮% বৃদ্ধি' : '+18% vs last month'}</span>
          </div>
        </div>

        {/* Metric 2: 96% Farmer Net Share */}
        <div className="bg-white p-5 rounded-2xl border border-emerald-300 shadow-xs space-y-2 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-16 h-16 bg-emerald-500/10 rounded-bl-full pointer-events-none" />
          <div className="flex items-center justify-between text-xs text-slate-500 font-semibold">
            <span>{isBn ? 'কৃষকের সরাসরি আয় (৯৬%)' : 'Farmer Net Payout (96%)'}</span>
            <div className="w-8 h-8 rounded-lg bg-emerald-600 text-white flex items-center justify-center shadow-xs">
              <CheckCircle2 className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-black text-emerald-800 font-mono">
            {formatCurrency(177984, language)}
          </div>
          <div className="text-[11px] text-slate-500">
            {isBn ? 'বিকাশ ও ব্যাংক অ্যাকাউন্টে স্বয়ংক্রিয় ছাড়' : 'Auto-credited directly to bank'}
          </div>
        </div>

        {/* Metric 3: 4% AgroLink Platform Service Fee */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-2">
          <div className="flex items-center justify-between text-xs text-slate-500 font-semibold">
            <span>{isBn ? 'প্ল্যাটফর্ম সার্ভিস ফি (মাত্র ৪%)' : 'Platform Fee (Only 4%)'}</span>
            <div className="w-8 h-8 rounded-lg bg-amber-50 text-amber-700 flex items-center justify-center">
              <ShieldCheck className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-black text-slate-700 font-mono">
            {formatCurrency(7416, language)}
          </div>
          <div className="text-[11px] text-slate-500">
            {isBn ? 'লজিস্টিকস, কিউসি ও সিকিউর পেমেন্ট কভার' : 'Covers QC, cold transport & escrow'}
          </div>
        </div>

        {/* Metric 4: Fulfillments & Orders */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-2">
          <div className="flex items-center justify-between text-xs text-slate-500 font-semibold">
            <span>{isBn ? 'সফল ডেলিভারি ও রেটিং' : 'Fulfillment Success'}</span>
            <div className="w-8 h-8 rounded-lg bg-teal-50 text-teal-700 flex items-center justify-center">
              <Truck className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-black text-slate-900 font-mono">
            {isBn ? '৯৯.২%' : '99.2%'}
          </div>
          <div className="text-[11px] text-emerald-700 font-semibold">
            {isBn ? '০% পচন বা ড্যামেজ ক্লেইম' : 'Zero damage claims this month'}
          </div>
        </div>
      </div>

      {/* AI Krishi Market Price Recommendation Widget */}
      <div className="p-5 rounded-3xl bg-gradient-to-r from-emerald-900 via-teal-900 to-slate-900 text-white border border-emerald-700/60 shadow-md">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-amber-400 to-emerald-400 text-slate-950 flex items-center justify-center shrink-0 shadow-md">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-sm sm:text-base text-white">
                  {isBn ? 'এআই কৃষি প্রাইসিং ও ডিমান্ড অ্যাডভাইজর (AI Price Advisor)' : 'AI Market Price Intelligence Advisor'}
                </h3>
                <span className="px-2 py-0.2 bg-emerald-400/20 text-emerald-300 rounded text-[10px] font-bold border border-emerald-400/30">
                  LIVE MODEL
                </span>
              </div>
              <p className="text-xs text-slate-300 mt-1 max-w-2xl leading-relaxed">
                {isBn 
                  ? 'বগুড়া মহাস্থানগড় আড়ত ও ঢাকা কারওয়ান বাজারের আজকের সরবরাহ ট্র্যাকিং করে দেখা যাচ্ছে: ডায়মন্ড আলুর চাহিদা আজ ১৮% বেশি। পাইকারি দর ৳৩২-৳৩৪ এবং খুচরা ৳৪০ রাখা শতভাগ যৌক্তিক ও দ্রুত বিক্রি নিশ্চিত করবে।'
                  : 'Based on Bogura Mahasthangarh arrivals & Karwan Bazar bulk indices: Diamond Potato demand is high. Setting wholesale at ৳32-৳34/kg guarantees 98% sell-through within 12 hours.'
                }
              </p>
            </div>
          </div>

          <div className="shrink-0 bg-white/10 backdrop-blur-md px-4 py-2.5 rounded-2xl border border-white/20 text-right">
            <span className="text-[10px] text-slate-300 block">{isBn ? 'সুপারিশকৃত আদর্শ দর' : 'Optimal Target Price'}</span>
            <span className="text-lg font-black text-amber-300 font-mono">৳৩২ - ৳৩৪ / কেজি</span>
          </div>
        </div>
      </div>

      {/* Incoming Orders & Dispatch Management */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div>
            <h3 className="text-base sm:text-lg font-bold text-slate-900">
              {isBn ? 'ইনকামিং অর্ডার ও পিকআপ ডিসপ্যাচ বোর্ড' : 'Incoming Orders & Cold Truck Pickup Queue'}
            </h3>
            <p className="text-xs text-slate-500">
              {isBn ? 'অর্ডার গ্রহণ করুন এবং ট্রাক পৌঁছানোর আগে কিউআর কোড ট্যাগ প্রিন্ট করুন।' : 'Accept incoming B2B & retail requests to generate digital loading tags.'}
            </p>
          </div>
          <span className="px-3 py-1 bg-amber-50 text-amber-900 border border-amber-200 rounded-full text-xs font-bold">
            {incomingOrders.length} {isBn ? 'টি সক্রিয় অর্ডার' : 'Active Orders'}
          </span>
        </div>

        <div className="space-y-3">
          {incomingOrders.map((ord) => (
            <div 
              key={ord.id}
              className="p-4 rounded-2xl border border-slate-200 hover:border-emerald-500/60 transition-all flex flex-col md:flex-row items-start md:items-center justify-between gap-4 bg-slate-50/60"
            >
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs font-bold text-slate-900">{ord.id}</span>
                  <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${
                    ord.type.includes('B2B') ? 'bg-amber-100 text-amber-900 border border-amber-300' : 'bg-emerald-100 text-emerald-900'
                  }`}>
                    {ord.type}
                  </span>
                  <span className="text-xs font-semibold text-slate-700">• {ord.buyer}</span>
                </div>

                <div className="text-xs text-slate-600 flex items-center gap-3">
                  <span><strong>পণ্য:</strong> {ord.item} ({ord.qty})</span>
                  <span><strong>মোট:</strong> {formatCurrency(ord.total, language)}</span>
                  <span className="text-emerald-700 font-bold">
                    <strong>কৃষকের পাওনা (৯৬%):</strong> {formatCurrency(ord.farmerNet, language)}
                  </span>
                </div>

                <div className="flex items-center gap-1.5 text-[11px] text-slate-500 pt-0.5">
                  <Clock className="w-3.5 h-3.5 text-slate-400" />
                  <span>পিকআপ স্লট: {ord.pickupTime}</span>
                </div>
              </div>

              <div className="flex items-center gap-2 self-end md:self-center">
                {ord.status === 'New Request' ? (
                  <button
                    onClick={() => handleAcceptOrder(ord.id)}
                    className="px-4 py-2 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl text-xs font-bold shadow-xs transition-colors"
                  >
                    {isBn ? 'অর্ডার গ্রহণ করুন' : 'Accept Order'}
                  </button>
                ) : (
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-1 rounded-lg flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      {ord.status}
                    </span>
                    <button
                      onClick={() => alert(isBn ? 'QR কোড জেনারেট হয়েছে। ট্রাকে লোড করার সময় স্ক্যান হবে।' : 'Dispatch QR generated for Reefer Bay.')}
                      className="p-2 bg-slate-200 hover:bg-slate-300 rounded-lg text-slate-700"
                      title="View QR Dispatch Slip"
                    >
                      <QrCode className="w-4 h-4" />
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Add Crop Harvest Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 space-y-5 shadow-2xl border border-slate-200 text-slate-900">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200">
              <h3 className="font-bold text-lg text-slate-900 flex items-center gap-2">
                <Tractor className="w-5 h-5 text-amber-600" />
                <span>{isBn ? 'নতুন ফসল লিস্টিং ফরম' : 'List New Crop Harvest'}</span>
              </h3>
              <button 
                onClick={() => setShowAddModal(false)}
                className="text-slate-400 hover:text-slate-700 text-sm font-bold"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3.5 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  {isBn ? 'ফসলের নাম ও জাত:' : 'Crop Name & Variety:'}
                </label>
                <input
                  type="text"
                  placeholder="যেমন: বগুড়ার ফ্রেশ ডায়মন্ড গোল আলু"
                  value={cropNameBn}
                  onChange={(e) => setCropNameBn(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl font-medium"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    {isBn ? 'উত্তোলিত পরিমাণ (কেজি):' : 'Harvested Stock (KG):'}
                  </label>
                  <input
                    type="number"
                    value={harvestQty}
                    onChange={(e) => setHarvestQty(parseInt(e.target.value) || 0)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl font-medium font-mono"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    {isBn ? 'বাল্ক MOQ (ন্যূনতম কেজি):' : 'Wholesale MOQ (KG):'}
                  </label>
                  <input
                    type="number"
                    value={moqQty}
                    onChange={(e) => setMoqQty(parseInt(e.target.value) || 0)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl font-medium font-mono"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    {isBn ? 'খুচরা প্রস্তাবিত মূল্য (৳/কেজি):' : 'Retail Asking Price:'}
                  </label>
                  <input
                    type="number"
                    value={retailAsking}
                    onChange={(e) => setRetailAsking(parseInt(e.target.value) || 0)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl font-medium font-mono"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    {isBn ? 'পাইকারি বাল্ক দর (৳/কেজি):' : 'Bulk Wholesale Price:'}
                  </label>
                  <input
                    type="number"
                    value={bulkAsking}
                    onChange={(e) => setBulkAsking(parseInt(e.target.value) || 0)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl font-medium font-mono text-emerald-800 font-bold"
                  />
                </div>
              </div>

              <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 text-amber-900 text-[11px] leading-relaxed">
                ℹ️ AgroLink AI এর মাধ্যমে লিস্টিং করার পর আমাদের বগুড়া কোয়ালিটি কন্ট্রোল টিম পণ্যটি পরিদর্শন করে মাত্র ২ ঘণ্টার মধ্যে লাইভ মার্কেটপ্লেসে প্রদর্শন করবে।
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-2 border-t border-slate-200">
              <button
                onClick={() => setShowAddModal(false)}
                className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-semibold"
              >
                {isBn ? 'বাতিল' : 'Cancel'}
              </button>
              <button
                onClick={() => {
                  alert(isBn ? 'নতুন ফসল লিস্টিং সফলভাবে জমা হয়েছে!' : 'Crop harvest listing submitted successfully!');
                  setShowAddModal(false);
                }}
                className="px-5 py-2 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl text-xs font-bold shadow-md"
              >
                {isBn ? 'লিস্টিং পাবলিশ করুন' : 'Publish Listing'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

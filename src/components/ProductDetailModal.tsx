import React, { useState } from 'react';
import { 
  X, 
  CheckCircle2, 
  MapPin, 
  Star, 
  Truck, 
  ShieldCheck, 
  Leaf, 
  PhoneCall, 
  Layers, 
  Calculator, 
  ShoppingCart, 
  FileText,
  Calendar,
  Thermometer,
  Award
} from 'lucide-react';
import { Product, Language } from '../types';
import { formatCurrency } from '../utils/formatters';

interface ProductDetailModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
  language: Language;
  onAddToCart: (product: Product, quantity: number, mode: 'retail' | 'bulk') => void;
  onRequestQuote: (product: Product) => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  isOpen,
  onClose,
  language,
  onAddToCart,
  onRequestQuote
}) => {
  if (!isOpen || !product) return null;

  const isBn = language === 'bn';
  const [calculatorQty, setCalculatorQty] = useState<number>(product.moq || 20);

  // Compute tier price
  const calculateTierPrice = (qty: number): { unitPrice: number; savings: number; tierName: string } => {
    let unitPrice = product.retailPrice;
    let tierName = isBn ? 'খুচরা মূল্য' : 'Retail Price';

    for (const tier of product.bulkTiers) {
      if (qty >= tier.minQty) {
        unitPrice = tier.pricePerUnit;
        tierName = isBn ? tier.labelBn : tier.labelEn;
      }
    }

    const regularTotal = product.retailPrice * qty;
    const tierTotal = unitPrice * qty;
    const savings = regularTotal - tierTotal;

    return { unitPrice, savings, tierName };
  };

  const { unitPrice, savings, tierName } = calculateTierPrice(calculatorQty);
  const totalAmount = unitPrice * calculatorQty;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      <div 
        className="relative bg-white rounded-3xl max-w-4xl w-full max-h-[92vh] overflow-y-auto shadow-2xl border border-slate-200 text-slate-900"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-black/50 hover:bg-black/70 text-white flex items-center justify-center transition-colors"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* Left Column: Media & Farmer Provenance */}
          <div className="relative bg-slate-900 text-white p-6 flex flex-col justify-between overflow-hidden">
            <div className="absolute inset-0 opacity-40">
              <img
                src={product.image}
                alt={isBn ? product.nameBn : product.nameEn}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/70 to-slate-900/40" />

            <div className="relative z-1 space-y-3">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-amber-400 text-slate-950 shadow-sm">
                  {isBn ? `গ্রেড ${product.qualityGrade} সার্টিফাইড` : `Grade ${product.qualityGrade} Certified`}
                </span>
                {product.organicCert && (
                  <span className="px-2 py-0.5 rounded-full text-xs font-semibold bg-emerald-500/80 text-white flex items-center gap-1 backdrop-blur-xs">
                    <Leaf className="w-3.5 h-3.5" />
                    <span>{isBn ? 'কীটনাশকমুক্ত' : 'Zero Pesticide'}</span>
                  </span>
                )}
              </div>

              <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
                {isBn ? product.nameBn : product.nameEn}
              </h2>

              <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                {isBn ? product.descriptionBn : product.descriptionEn}
              </p>
            </div>

            {/* Farmer Provenance Card */}
            <div className="relative z-1 mt-6 p-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-10 h-10 rounded-full bg-emerald-600 text-white font-bold flex items-center justify-center border-2 border-emerald-300">
                    {product.farmerNameEn.charAt(0)}
                  </div>
                  <div>
                    <div className="flex items-center gap-1 font-bold text-white text-sm">
                      <span>{isBn ? product.farmerNameBn : product.farmerNameEn}</span>
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                    </div>
                    <span className="text-xs text-emerald-300 flex items-center gap-1">
                      <MapPin className="w-3 h-3" />
                      {isBn ? product.farmLocationBn : product.farmLocationEn}
                    </span>
                  </div>
                </div>

                <div className="text-right">
                  <div className="flex items-center gap-1 text-amber-300 font-bold text-xs justify-end">
                    <Star className="w-3.5 h-3.5 fill-amber-300 text-amber-300" />
                    <span>{product.farmerRating}</span>
                  </div>
                  <span className="text-[10px] text-slate-300">
                    {isBn ? 'যাচাইকৃত কৃষক' : 'Verified Producer'}
                  </span>
                </div>
              </div>

              <div className="pt-2 border-t border-white/10 grid grid-cols-2 gap-2 text-[11px] text-slate-200">
                <div className="flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-emerald-300" />
                  <span>{isBn ? product.harvestDateBn : product.harvestDateEn}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Thermometer className="w-3.5 h-3.5 text-teal-300" />
                  <span>{isBn ? 'কোল্ড স্টোরেজ ২-৪°C' : 'Cold Storage 2-4°C'}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Tier Calculator & Ordering */}
          <div className="p-6 sm:p-8 space-y-6 flex flex-col justify-between">
            {/* Interactive Bulk & Tier Calculator Header */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 pb-2 border-b border-slate-200">
                <Calculator className="w-5 h-5 text-emerald-600" />
                <h3 className="font-bold text-slate-900 text-base">
                  {isBn ? 'ইন্টারেক্টিভ বাল্ক টিয়ার ও মূল্য ক্যালকুলেটর' : 'Interactive Bulk Pricing & Tier Calculator'}
                </h3>
              </div>

              {/* Slider & Input */}
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-semibold text-slate-700">
                    {isBn ? 'কাঙ্ক্ষিত অর্ডার পরিমাণ:' : 'Simulate Order Quantity:'}
                  </label>
                  <div className="flex items-center gap-1">
                    <input
                      type="number"
                      min={1}
                      max={product.stockKg}
                      value={calculatorQty}
                      onChange={(e) => setCalculatorQty(Math.max(1, parseInt(e.target.value) || 1))}
                      className="w-20 px-2 py-1 bg-white border border-slate-300 rounded-lg text-right font-mono font-bold text-sm text-slate-900 focus:outline-emerald-500"
                    />
                    <span className="text-xs font-semibold text-slate-600">
                      {isBn ? product.unitBn : product.unitEn}
                    </span>
                  </div>
                </div>

                <input
                  type="range"
                  min={1}
                  max={Math.min(product.stockKg, 500)}
                  value={calculatorQty}
                  onChange={(e) => setCalculatorQty(parseInt(e.target.value))}
                  className="w-full accent-emerald-600 cursor-pointer"
                />

                <div className="flex justify-between text-[11px] text-slate-500 font-mono">
                  <span>১ {isBn ? product.unitBn : product.unitEn}</span>
                  <span>MOQ: {product.moq} {isBn ? product.unitBn : product.unitEn}</span>
                  <span>১০০+ {isBn ? product.unitBn : product.unitEn} (ইনস্টিটিউশনাল)</span>
                </div>
              </div>

              {/* Computed Dynamic Outcome Card */}
              <div className="p-4 rounded-2xl bg-gradient-to-br from-emerald-50 to-teal-50 border border-emerald-200 space-y-2.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-600 font-medium">{isBn ? 'প্রযোজ্য টায়ার:' : 'Applied Pricing Tier:'}</span>
                  <span className="font-bold text-emerald-800 bg-emerald-200/60 px-2.5 py-0.5 rounded-full">
                    {tierName}
                  </span>
                </div>

                <div className="flex items-baseline justify-between pt-1">
                  <span className="text-xs text-slate-600 font-medium">{isBn ? 'কার্যকর একক মূল্য:' : 'Effective Unit Price:'}</span>
                  <span className="text-xl font-black text-emerald-900 font-mono">
                    {formatCurrency(unitPrice, language)} <span className="text-xs font-medium text-slate-500">/{isBn ? product.unitBn : product.unitEn}</span>
                  </span>
                </div>

                <div className="flex items-baseline justify-between pt-1 border-t border-emerald-200/60">
                  <span className="text-xs font-bold text-slate-800">{isBn ? 'মোট প্রদেয় মূল্য:' : 'Estimated Total:'}</span>
                  <span className="text-2xl font-black text-slate-950 font-mono">
                    {formatCurrency(totalAmount, language)}
                  </span>
                </div>

                {savings > 0 && (
                  <div className="p-2 bg-emerald-700 text-white rounded-xl text-xs font-semibold flex items-center justify-between">
                    <span>{isBn ? '🎉 খুচরা দামের তুলনায় সাশ্রয়:' : '🎉 You Save vs Retail:'}</span>
                    <span className="font-mono font-bold text-amber-300">
                      +{formatCurrency(savings, language)}
                    </span>
                  </div>
                )}
              </div>

              {/* Tier Matrix Table */}
              <div className="space-y-1.5">
                <span className="text-xs font-semibold text-slate-500 block">
                  {isBn ? 'সম্পূর্ণ পাইকারি ডিসকাউন্ট টেবিল:' : 'Full Volume Discount Schedule:'}
                </span>
                <div className="divide-y divide-slate-100 border border-slate-200 rounded-xl overflow-hidden text-xs">
                  {product.bulkTiers.map((t, i) => (
                    <div 
                      key={i} 
                      className={`px-3 py-2 flex items-center justify-between ${
                        calculatorQty >= t.minQty && (i === product.bulkTiers.length - 1 || calculatorQty < product.bulkTiers[i + 1].minQty)
                          ? 'bg-emerald-100 font-bold text-emerald-950'
                          : 'bg-white text-slate-700'
                      }`}
                    >
                      <span>{isBn ? t.labelBn : t.labelEn}</span>
                      <div className="flex items-center gap-3">
                        {t.savingsPercent > 0 && (
                          <span className="text-[10px] text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded font-bold">
                            -{t.savingsPercent}% ছাড়
                          </span>
                        )}
                        <span className="font-mono font-bold">{formatCurrency(t.pricePerUnit, language)}/{isBn ? product.unitBn : product.unitEn}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="pt-4 border-t border-slate-200 space-y-2">
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => {
                    const mode = calculatorQty >= product.moq ? 'bulk' : 'retail';
                    onAddToCart(product, calculatorQty, mode);
                    onClose();
                  }}
                  className="w-full py-3 px-4 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl font-bold text-sm flex items-center justify-center gap-2 shadow-lg shadow-emerald-950/10 transition-all"
                >
                  <ShoppingCart className="w-4 h-4 text-emerald-200" />
                  <span>{isBn ? 'কার্টে যোগ করুন' : 'Add to Cart'}</span>
                </button>

                <button
                  onClick={() => {
                    onRequestQuote(product);
                    onClose();
                  }}
                  className="w-full py-3 px-4 bg-amber-500 hover:bg-amber-600 text-slate-950 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-all shadow-xs"
                >
                  <FileText className="w-4 h-4" />
                  <span>{isBn ? 'অফিসিয়াল কোটেশন' : 'Request Proforma'}</span>
                </button>
              </div>

              <div className="flex items-center justify-center gap-2 text-[11px] text-slate-500 pt-1">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span>{isBn ? '৪% স্বচ্ছ প্ল্যাটফর্ম ফি ইতিমধ্যে মূল্যে অন্তর্ভুক্ত' : '4% platform service fee transparently included'}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

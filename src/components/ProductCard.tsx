import React, { useState } from 'react';
import { 
  CheckCircle2, 
  MapPin, 
  Star, 
  Plus, 
  Minus, 
  ShoppingCart, 
  FileText, 
  ShieldCheck, 
  Leaf,
  Layers,
  Clock,
  ArrowRight
} from 'lucide-react';
import { Product, Language } from '../types';
import { formatCurrency } from '../utils/formatters';

interface ProductCardProps {
  product: Product;
  purchasingMode: 'retail' | 'bulk';
  language: Language;
  onAddToCart: (product: Product, quantity: number, mode: 'retail' | 'bulk') => void;
  onSelectProduct: (product: Product) => void;
  onRequestQuote: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  purchasingMode,
  language,
  onAddToCart,
  onSelectProduct,
  onRequestQuote
}) => {
  const isBn = language === 'bn';
  const isBulk = purchasingMode === 'bulk';

  // Default quantity based on mode: 1 unit for retail, or MOQ (e.g. 20 kg) for bulk
  const [quantity, setQuantity] = useState<number>(isBulk ? product.moq : 1);

  // Compute applicable price given current quantity
  const calculateCurrentPrice = (qty: number): number => {
    let unitPrice = product.retailPrice;
    for (const tier of product.bulkTiers) {
      if (qty >= tier.minQty) {
        unitPrice = tier.pricePerUnit;
      }
    }
    return unitPrice;
  };

  const currentUnitPrice = calculateCurrentPrice(quantity);
  const totalPrice = currentUnitPrice * quantity;

  const handleQtyChange = (delta: number) => {
    const step = isBulk ? 5 : 1;
    const minLimit = isBulk ? product.moq : 1;
    const newQty = Math.max(minLimit, quantity + delta * step);
    setQuantity(newQty);
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 hover:border-emerald-500/60 transition-all duration-300 hover:shadow-xl hover:shadow-emerald-950/5 flex flex-col overflow-hidden group">
      {/* Top Image & Badges */}
      <div className="relative h-48 sm:h-52 overflow-hidden bg-slate-100 cursor-pointer" onClick={() => onSelectProduct(product)}>
        <img
          src={product.image}
          alt={isBn ? product.nameBn : product.nameEn}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/10 pointer-events-none" />

        {/* Top Badges */}
        <div className="absolute top-2.5 left-2.5 flex flex-wrap gap-1.5">
          {product.badge && (
            <span className="px-2 py-0.5 rounded-full text-[11px] font-bold bg-amber-500 text-slate-950 shadow-xs">
              {product.badge}
            </span>
          )}
          <span className="px-2 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-900/80 text-emerald-200 backdrop-blur-xs border border-emerald-400/30">
            {isBn ? `গ্রেড ${product.qualityGrade}` : `Grade ${product.qualityGrade}`}
          </span>
          {product.organicCert && (
            <span className="px-1.5 py-0.5 rounded-full text-[10px] font-medium bg-teal-800/80 text-teal-200 flex items-center gap-1 backdrop-blur-xs">
              <Leaf className="w-2.5 h-2.5 text-teal-300" />
              <span>{isBn ? 'ন্যাচারাল' : 'Clean'}</span>
            </span>
          )}
        </div>

        {/* Harvest info chip at bottom of image */}
        <div className="absolute bottom-2 left-2.5 right-2.5 flex items-center justify-between text-[11px] text-white">
          <span className="flex items-center gap-1 bg-black/40 backdrop-blur-xs px-2 py-0.5 rounded-md">
            <Clock className="w-3 h-3 text-emerald-300" />
            <span>{isBn ? product.harvestDateBn : product.harvestDateEn}</span>
          </span>
          <span className="bg-emerald-950/80 text-emerald-300 px-1.5 py-0.5 rounded-md font-mono text-[10px] border border-emerald-500/30">
            {isBn ? `স্টক: ${product.stockKg} ${product.unitBn}` : `Stock: ${product.stockKg} ${product.unitEn}`}
          </span>
        </div>
      </div>

      {/* Card Body */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between space-y-4">
        {/* Title and Farmer Origin */}
        <div className="space-y-1.5">
          <div className="flex items-start justify-between gap-2">
            <h3 
              onClick={() => onSelectProduct(product)}
              className="font-bold text-slate-900 text-base sm:text-lg group-hover:text-emerald-700 transition-colors cursor-pointer line-clamp-1"
            >
              {isBn ? product.nameBn : product.nameEn}
            </h3>
          </div>

          {/* Farmer & Location Info */}
          <div className="flex items-center justify-between text-xs text-slate-600 pt-0.5">
            <div className="flex items-center gap-1.5 font-medium text-slate-800">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
              <span className="truncate max-w-[150px]">{isBn ? product.farmerNameBn : product.farmerNameEn}</span>
            </div>
            <div className="flex items-center gap-1 text-slate-500 text-[11px]">
              <MapPin className="w-3 h-3 text-slate-400 shrink-0" />
              <span>{isBn ? product.farmLocationBn : product.farmLocationEn}</span>
            </div>
          </div>
        </div>

        {/* Dual Pricing Display */}
        <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 space-y-2">
          {/* Main Price Line */}
          <div className="flex items-baseline justify-between">
            <div>
              <span className="text-xl sm:text-2xl font-black text-slate-900 font-mono">
                {formatCurrency(currentUnitPrice, language)}
              </span>
              <span className="text-xs text-slate-500 font-medium ml-1">
                / {isBn ? product.unitBn : product.unitEn}
              </span>
            </div>

            {isBulk ? (
              <span className="text-[11px] font-bold text-amber-900 bg-amber-100 border border-amber-300 px-2 py-0.5 rounded-full">
                {isBn ? `বাল্ক রেট (MOQ: ${product.moq} ${product.unitBn})` : `Bulk Tier (MOQ: ${product.moq} ${product.unitEn})`}
              </span>
            ) : (
              <span className="text-[11px] font-semibold text-emerald-800 bg-emerald-100/80 px-2 py-0.5 rounded-full">
                {isBn ? 'খুচরা মূল্য' : 'Retail Price'}
              </span>
            )}
          </div>

          {/* Tier Discounts Quick Strip */}
          <div className="grid grid-cols-3 gap-1 pt-1.5 border-t border-slate-200/60 text-center">
            {product.bulkTiers.map((tier, idx) => (
              <div 
                key={idx}
                className={`py-1 px-1 rounded text-[10px] leading-tight transition-all ${
                  quantity >= tier.minQty && (idx === product.bulkTiers.length - 1 || quantity < product.bulkTiers[idx + 1].minQty)
                    ? 'bg-emerald-700 text-white font-bold ring-1 ring-emerald-500'
                    : 'bg-white border border-slate-200 text-slate-600'
                }`}
              >
                <div className="truncate font-semibold">{isBn ? tier.labelBn.split(' ')[0] : tier.labelEn.split(' ')[0]}</div>
                <div className="font-mono">{formatCurrency(tier.pricePerUnit, language)}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Quantity Controller & Add to Cart */}
        <div className="space-y-3 pt-1">
          <div className="flex items-center justify-between gap-3">
            <span className="text-xs text-slate-600 font-medium">
              {isBn ? 'পরিমাণ:' : 'Quantity:'}
            </span>

            {/* Stepper */}
            <div className="flex items-center bg-slate-100 rounded-lg p-0.5 border border-slate-200">
              <button
                onClick={() => handleQtyChange(-1)}
                className="w-7 h-7 flex items-center justify-center rounded-md bg-white hover:bg-slate-200 text-slate-700 transition-colors shadow-2xs text-xs font-bold"
                aria-label="Decrease quantity"
              >
                <Minus className="w-3.5 h-3.5" />
              </button>
              <div className="px-3 min-w-[50px] text-center font-bold text-xs font-mono text-slate-900">
                {quantity} {isBn ? product.unitBn : product.unitEn}
              </div>
              <button
                onClick={() => handleQtyChange(1)}
                className="w-7 h-7 flex items-center justify-center rounded-md bg-white hover:bg-slate-200 text-slate-700 transition-colors shadow-2xs text-xs font-bold"
                aria-label="Increase quantity"
              >
                <Plus className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => onAddToCart(product, quantity, purchasingMode)}
              className="w-full py-2.5 px-3 bg-emerald-700 hover:bg-emerald-800 active:scale-[0.98] text-white rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center gap-1.5 shadow-md shadow-emerald-950/10 transition-all"
            >
              <ShoppingCart className="w-4 h-4 text-emerald-200" />
              <span>{isBn ? 'কার্টে যোগ' : 'Add to Cart'}</span>
            </button>

            {isBulk ? (
              <button
                onClick={() => onRequestQuote(product)}
                className="w-full py-2.5 px-3 bg-amber-500 hover:bg-amber-600 active:scale-[0.98] text-slate-950 rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center gap-1.5 transition-all shadow-xs"
              >
                <FileText className="w-4 h-4" />
                <span>{isBn ? 'কোটেশন' : 'Quote'}</span>
              </button>
            ) : (
              <button
                onClick={() => onSelectProduct(product)}
                className="w-full py-2.5 px-3 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-xl text-xs sm:text-sm font-semibold flex items-center justify-center gap-1 transition-all"
              >
                <span>{isBn ? 'বিস্তারিত' : 'Details'}</span>
                <ArrowRight className="w-3.5 h-3.5 text-slate-500" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

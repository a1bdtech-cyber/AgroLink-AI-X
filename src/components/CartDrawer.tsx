import React, { useState } from 'react';
import { 
  X, 
  Trash2, 
  Plus, 
  Minus, 
  ShoppingBag, 
  ArrowRight, 
  Truck, 
  ShieldCheck, 
  CheckCircle2, 
  CreditCard, 
  Building2, 
  MapPin,
  Sparkles
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { CartItem, Language } from '../types';
import { DELIVERY_ZONES } from '../data/mockData';
import { formatCurrency } from '../utils/formatters';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onUpdateQty: (productId: string, newQty: number) => void;
  onRemoveItem: (productId: string) => void;
  onClearCart: () => void;
  language: Language;
  selectedZone: string;
  onZoneChange: (zone: string) => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  cartItems,
  onUpdateQty,
  onRemoveItem,
  onClearCart,
  language,
  selectedZone,
  onZoneChange
}) => {
  if (!isOpen) return null;

  const isBn = language === 'bn';

  // Checkout modal state
  const [isCheckingOut, setIsCheckingOut] = useState<boolean>(false);
  const [paymentMethod, setPaymentMethod] = useState<'bkash' | 'cod' | 'net7' | 'bank'>('bkash');
  const [customerName, setCustomerName] = useState<string>('তানভীর মাহমুদ');
  const [customerPhone, setCustomerPhone] = useState<string>('+880 1711-889900');
  const [customerAddress, setCustomerAddress] = useState<string>('বাসা # ৪২, রোড # ১১, বনানী, ঢাকা');
  const [orderPlacedSuccess, setOrderPlacedSuccess] = useState<boolean>(false);
  const [confirmedOrderId, setConfirmedOrderId] = useState<string>('');

  // Zone info
  const activeZone = DELIVERY_ZONES.find(z => z.id === selectedZone) || DELIVERY_ZONES[0];

  // Separate retail vs bulk items for clear transparency
  const retailItems = cartItems.filter(i => i.mode === 'retail');
  const bulkItems = cartItems.filter(i => i.mode === 'bulk');

  const retailSubtotal = retailItems.reduce((acc, curr) => acc + curr.appliedPrice * curr.quantity, 0);
  const bulkSubtotal = bulkItems.reduce((acc, curr) => acc + curr.appliedPrice * curr.quantity, 0);
  const grossSubtotal = retailSubtotal + bulkSubtotal;

  // Delivery fee: if bulk items present, uses b2b fee (or free if > ৳15k), else retail fee
  const deliveryFee = bulkItems.length > 0 
    ? (grossSubtotal > 15000 ? 0 : activeZone.b2bFee) 
    : (grossSubtotal > 2000 ? 0 : activeZone.fee);

  const grandTotal = grossSubtotal + deliveryFee;

  const handlePlaceOrder = () => {
    const newOrderId = `AGX-${Math.floor(100000 + Math.random() * 900000)}`;
    setConfirmedOrderId(newOrderId);
    setOrderPlacedSuccess(true);

    // Trigger celebration confetti
    try {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });
    } catch (e) {
      // safe fallback
    }
  };

  const handleFinish = () => {
    onClearCart();
    setOrderPlacedSuccess(false);
    setIsCheckingOut(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/60 backdrop-blur-xs flex justify-end animate-in fade-in duration-200">
      <div 
        className="w-full max-w-lg bg-white h-full shadow-2xl flex flex-col justify-between text-slate-900 border-l border-slate-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Drawer Header */}
        <div className="p-4 sm:p-5 border-b border-slate-200 flex items-center justify-between bg-slate-50">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center">
              <ShoppingBag className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 text-base">
                {isBn ? 'আপনার অ্যাগ্রো শপিং ব্যাগ' : 'Your AgroLink Cart'}
              </h3>
              <span className="text-xs text-slate-500">
                {cartItems.length} {isBn ? 'টি আইটেম সিলেক্টেড' : 'items selected'}
              </span>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg bg-white border border-slate-200 hover:bg-slate-100 flex items-center justify-center text-slate-500"
            aria-label="Close cart"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-5">
          {orderPlacedSuccess ? (
            /* Order Success Screen */
            <div className="py-8 text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto shadow-md">
                <CheckCircle2 className="w-10 h-10" />
              </div>

              <div className="space-y-1">
                <h4 className="text-xl font-extrabold text-slate-900">
                  {isBn ? 'অর্ডার সফলভাবে নিশ্চিত হয়েছে!' : 'Order Placed Successfully!'}
                </h4>
                <p className="text-xs font-mono font-bold text-emerald-800">
                  Order ID: {confirmedOrderId}
                </p>
                <p className="text-xs text-slate-500 max-w-xs mx-auto">
                  {isBn 
                    ? 'সরাসরি সংশ্লিষ্ট কৃষক ও সেন্ট্রাল কোল্ড স্টোরেজ হাবে ডিসপ্যাচ রিকুয়েস্ট পাঠানো হয়েছে।'
                    : 'Dispatch request sent directly to verified farmers and central temperature-controlled dock.'
                  }
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-left text-xs space-y-2 max-w-sm mx-auto">
                <div className="flex justify-between">
                  <span className="text-slate-500">গ্রাহক:</span>
                  <span className="font-bold">{customerName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">পেমেন্ট মেথড:</span>
                  <span className="font-bold uppercase font-mono">{paymentMethod}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">মোট পরিশোধযোগ্য:</span>
                  <span className="font-black font-mono text-emerald-800">{formatCurrency(grandTotal, language)}</span>
                </div>
              </div>

              <button
                onClick={handleFinish}
                className="w-full py-3 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl font-bold text-sm shadow-md"
              >
                {isBn ? 'মার্কেটপ্লেসে ফিরে যান' : 'Back to Marketplace'}
              </button>
            </div>
          ) : isCheckingOut ? (
            /* Checkout Form View */
            <div className="space-y-4 text-xs">
              <div className="flex items-center justify-between pb-2 border-b border-slate-200">
                <span className="font-bold text-sm text-slate-900">
                  {isBn ? 'ডেলিভারি ও পেমেন্ট বিবরণ' : 'Checkout & Payment Details'}
                </span>
                <button
                  onClick={() => setIsCheckingOut(false)}
                  className="text-xs text-emerald-700 font-bold hover:underline"
                >
                  {isBn ? 'কার্টে ফিরে যান' : 'Back to Cart'}
                </button>
              </div>

              <div className="space-y-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    {isBn ? 'আপনার নাম / ব্যবসা প্রতিষ্ঠান:' : 'Full Name / Company:'}
                  </label>
                  <input
                    type="text"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl font-medium"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    {isBn ? 'মোবাইল নম্বর:' : 'Contact Phone:'}
                  </label>
                  <input
                    type="text"
                    value={customerPhone}
                    onChange={(e) => setCustomerPhone(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl font-medium"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    {isBn ? 'পূর্ণাঙ্গ ডেলিভারি ঠিকানা:' : 'Delivery Address:'}
                  </label>
                  <input
                    type="text"
                    value={customerAddress}
                    onChange={(e) => setCustomerAddress(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl font-medium"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    {isBn ? 'পেমেন্ট মেথড নির্বাচন করুন:' : 'Select Payment Method:'}
                  </label>
                  <div className="grid grid-cols-2 gap-2 pt-1">
                    <button
                      type="button"
                      onClick={() => setPaymentMethod('bkash')}
                      className={`p-2.5 rounded-xl border text-left font-semibold flex items-center justify-between transition-all ${
                        paymentMethod === 'bkash' 
                          ? 'border-pink-500 bg-pink-50/50 text-pink-900 ring-1 ring-pink-500' 
                          : 'border-slate-200 hover:bg-slate-50'
                      }`}
                    >
                      <span>bKash / Nagad</span>
                      <span className="text-[10px] bg-pink-100 text-pink-800 px-1.5 py-0.2 rounded font-bold">ইনস্ট্যান্ট</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setPaymentMethod('cod')}
                      className={`p-2.5 rounded-xl border text-left font-semibold flex items-center justify-between transition-all ${
                        paymentMethod === 'cod' 
                          ? 'border-emerald-500 bg-emerald-50/50 text-emerald-900 ring-1 ring-emerald-500' 
                          : 'border-slate-200 hover:bg-slate-50'
                      }`}
                    >
                      <span>Cash On Delivery</span>
                      <span className="text-[10px] bg-emerald-100 text-emerald-800 px-1.5 py-0.2 rounded font-bold">ক্যাশ</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setPaymentMethod('net7')}
                      className={`p-2.5 rounded-xl border text-left font-semibold flex items-center justify-between transition-all ${
                        paymentMethod === 'net7' 
                          ? 'border-amber-500 bg-amber-50/50 text-amber-900 ring-1 ring-amber-500' 
                          : 'border-slate-200 hover:bg-slate-50'
                      }`}
                    >
                      <span>Net-7 Corporate Credit</span>
                      <span className="text-[10px] bg-amber-100 text-amber-900 px-1.5 py-0.2 rounded font-bold">B2B</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setPaymentMethod('bank')}
                      className={`p-2.5 rounded-xl border text-left font-semibold flex items-center justify-between transition-all ${
                        paymentMethod === 'bank' 
                          ? 'border-slate-800 bg-slate-100 text-slate-900 ring-1 ring-slate-800' 
                          : 'border-slate-200 hover:bg-slate-50'
                      }`}
                    >
                      <span>Bank Wire Transfer</span>
                      <span className="text-[10px] bg-slate-200 text-slate-800 px-1.5 py-0.2 rounded font-bold">EFT</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ) : cartItems.length === 0 ? (
            /* Empty Cart View */
            <div className="py-16 text-center space-y-3">
              <div className="w-16 h-16 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mx-auto">
                <ShoppingBag className="w-8 h-8" />
              </div>
              <p className="text-slate-600 font-medium text-sm">
                {isBn ? 'আপনার কার্ট এখন খালি।' : 'Your cart is empty.'}
              </p>
              <button
                onClick={onClose}
                className="px-4 py-2 bg-emerald-700 text-white rounded-xl text-xs font-bold"
              >
                {isBn ? 'কৃষিপণ্য ব্রাউজ করুন' : 'Browse Produce'}
              </button>
            </div>
          ) : (
            /* Items List */
            <div className="space-y-4">
              {/* Delivery Zone Selector Inside Cart */}
              <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200 flex items-center justify-between text-xs">
                <div className="flex items-center gap-1.5">
                  <MapPin className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span className="font-semibold text-slate-700">{isBn ? 'ডেলিভারি হাব:' : 'Hub:'}</span>
                </div>
                <select
                  value={selectedZone}
                  onChange={(e) => onZoneChange(e.target.value)}
                  className="bg-white border border-slate-300 rounded-lg px-2 py-1 text-xs font-medium text-slate-800"
                >
                  {DELIVERY_ZONES.map(z => (
                    <option key={z.id} value={z.id}>{isBn ? z.nameBn : z.nameEn}</option>
                  ))}
                </select>
              </div>

              {/* B2B Items section */}
              {bulkItems.length > 0 && (
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-amber-900 bg-amber-100 px-2.5 py-0.5 rounded-full flex items-center gap-1">
                      <Building2 className="w-3.5 h-3.5" />
                      {isBn ? 'পাইকারি বাল্ক আইটেম (B2B Bulk)' : 'B2B Bulk Wholesale Items'}
                    </span>
                    <span className="text-xs font-mono font-bold text-amber-950">
                      {formatCurrency(bulkSubtotal, language)}
                    </span>
                  </div>

                  <div className="divide-y divide-slate-100 border border-slate-200 rounded-2xl overflow-hidden bg-white">
                    {bulkItems.map(item => (
                      <div key={item.product.id} className="p-3 flex items-center justify-between gap-3 text-xs">
                        <img src={item.product.image} alt={item.product.nameBn} className="w-12 h-12 rounded-xl object-cover shrink-0" />
                        <div className="flex-1 min-w-0">
                          <h4 className="font-bold text-slate-900 truncate">
                            {isBn ? item.product.nameBn : item.product.nameEn}
                          </h4>
                          <div className="text-[11px] text-slate-500">
                            {formatCurrency(item.appliedPrice, language)}/{isBn ? item.product.unitBn : item.product.unitEn} (MOQ: {item.product.moq})
                          </div>
                        </div>

                        <div className="flex items-center gap-2">
                          <div className="flex items-center bg-slate-100 rounded-lg p-0.5 border border-slate-200">
                            <button
                              onClick={() => onUpdateQty(item.product.id, Math.max(item.product.moq, item.quantity - 5))}
                              className="w-6 h-6 flex items-center justify-center rounded bg-white text-slate-700"
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="px-2 font-mono font-bold text-xs">{item.quantity}</span>
                            <button
                              onClick={() => onUpdateQty(item.product.id, item.quantity + 5)}
                              className="w-6 h-6 flex items-center justify-center rounded bg-white text-slate-700"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>

                          <button
                            onClick={() => onRemoveItem(item.product.id)}
                            className="text-slate-400 hover:text-rose-600 p-1"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Retail Items section */}
              {retailItems.length > 0 && (
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-emerald-900 bg-emerald-100 px-2.5 py-0.5 rounded-full">
                      {isBn ? 'খুচরা আইটেম (Retail D2C)' : 'Retail D2C Items'}
                    </span>
                    <span className="text-xs font-mono font-bold text-emerald-950">
                      {formatCurrency(retailSubtotal, language)}
                    </span>
                  </div>

                  <div className="divide-y divide-slate-100 border border-slate-200 rounded-2xl overflow-hidden bg-white">
                    {retailItems.map(item => (
                      <div key={item.product.id} className="p-3 flex items-center justify-between gap-3 text-xs">
                        <img src={item.product.image} alt={item.product.nameBn} className="w-12 h-12 rounded-xl object-cover shrink-0" />
                        <div className="flex-1 min-w-0">
                          <h4 className="font-bold text-slate-900 truncate">
                            {isBn ? item.product.nameBn : item.product.nameEn}
                          </h4>
                          <div className="text-[11px] text-slate-500">
                            {formatCurrency(item.appliedPrice, language)}/{isBn ? item.product.unitBn : item.product.unitEn}
                          </div>
                        </div>

                        <div className="flex items-center gap-2">
                          <div className="flex items-center bg-slate-100 rounded-lg p-0.5 border border-slate-200">
                            <button
                              onClick={() => onUpdateQty(item.product.id, Math.max(1, item.quantity - 1))}
                              className="w-6 h-6 flex items-center justify-center rounded bg-white text-slate-700"
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="px-2 font-mono font-bold text-xs">{item.quantity}</span>
                            <button
                              onClick={() => onUpdateQty(item.product.id, item.quantity + 1)}
                              className="w-6 h-6 flex items-center justify-center rounded bg-white text-slate-700"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>

                          <button
                            onClick={() => onRemoveItem(item.product.id)}
                            className="text-slate-400 hover:text-rose-600 p-1"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Drawer Footer & Checkout Trigger */}
        {cartItems.length > 0 && !orderPlacedSuccess && (
          <div className="p-4 sm:p-5 border-t border-slate-200 bg-slate-50 space-y-3">
            {/* Cost Breakdown */}
            <div className="space-y-1.5 text-xs text-slate-600">
              <div className="flex justify-between">
                <span>{isBn ? 'পণ্য সাবটোটাল:' : 'Items Subtotal:'}</span>
                <span className="font-mono font-bold text-slate-900">{formatCurrency(grossSubtotal, language)}</span>
              </div>

              <div className="flex justify-between items-center">
                <span className="flex items-center gap-1">
                  <Truck className="w-3 h-3 text-emerald-600" />
                  <span>{isBn ? 'কোল্ড চেইন ডেলিভারি ফি:' : 'Cold Delivery Fee:'}</span>
                </span>
                <span className="font-mono font-semibold">
                  {deliveryFee === 0 ? (
                    <span className="text-emerald-700 font-bold">{isBn ? 'ফ্রি ডেলিভারি' : 'FREE'}</span>
                  ) : (
                    formatCurrency(deliveryFee, language)
                  )}
                </span>
              </div>

              <div className="flex justify-between text-[11px] text-emerald-700 font-medium">
                <span className="flex items-center gap-1">
                  <ShieldCheck className="w-3 h-3" />
                  <span>{isBn ? 'প্ল্যাটফর্ম ফি নীতি:' : 'Platform Fee Policy:'}</span>
                </span>
                <span>{isBn ? 'ক্রেতার জন্য ০% অতিরিক্ত (কৃষক সেটেলে ৪%)' : '0% extra to buyer (4% from farmer)'}</span>
              </div>

              <div className="flex justify-between py-1.5 border-t border-slate-200 text-sm font-black text-slate-950">
                <span>{isBn ? 'সর্বমোট মূল্য:' : 'Grand Total:'}</span>
                <span className="font-mono text-emerald-900 text-base">{formatCurrency(grandTotal, language)}</span>
              </div>
            </div>

            {/* Action Buttons */}
            {isCheckingOut ? (
              <button
                onClick={handlePlaceOrder}
                className="w-full py-3 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl font-bold text-sm shadow-md flex items-center justify-center gap-2"
              >
                <span>{isBn ? 'অর্ডার কনফার্ম করুন' : 'Confirm Order'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                onClick={() => setIsCheckingOut(true)}
                className="w-full py-3 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl font-bold text-sm shadow-md flex items-center justify-center gap-2"
              >
                <span>{isBn ? 'চেকআউট করুন' : 'Proceed to Checkout'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

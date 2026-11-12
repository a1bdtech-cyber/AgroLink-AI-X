import React, { useState } from 'react';
import { 
  Building2, 
  FileText, 
  Calendar, 
  Printer, 
  Download, 
  CheckCircle, 
  Plus, 
  Trash2, 
  Truck, 
  Clock, 
  ShieldCheck, 
  Layers, 
  Sparkles,
  DollarSign,
  Coffee,
  Store,
  Hotel
} from 'lucide-react';
import { Product, Language, B2BQuotation, B2BQuotationItem } from '../types';
import { MOCK_PRODUCTS, SAMPLE_QUOTATION, DELIVERY_ZONES } from '../data/mockData';
import { formatCurrency } from '../utils/formatters';

interface B2BCommercialHubProps {
  language: Language;
  onAddToCart: (product: Product, quantity: number, mode: 'retail' | 'bulk') => void;
  activeQuoteProduct?: Product | null;
}

export const B2BCommercialHub: React.FC<B2BCommercialHubProps> = ({
  language,
  onAddToCart,
  activeQuoteProduct
}) => {
  const isBn = language === 'bn';

  // Tabs: 'quotation' | 'matrix' | 'recurring' | 'terms'
  const [activeTab, setActiveTab] = useState<'quotation' | 'matrix' | 'recurring'>('quotation');

  // Quotation Builder State
  const [companyName, setCompanyName] = useState<string>('Sultan\'s Dine & Banquets Ltd.');
  const [buyerType, setBuyerType] = useState<string>('restaurant');
  const [contactPerson, setContactPerson] = useState<string>('কাজী তানভীর (Procurement Lead)');
  const [phone, setPhone] = useState<string>('+880 1711-902345');
  const [deliveryAddress, setDeliveryAddress] = useState<string>('House 12, Road 27, Dhanmondi, Dhaka');
  const [zone, setZone] = useState<string>('dhaka-central');
  const [paymentTerms, setPaymentTerms] = useState<string>('net7');
  const [recurringSchedule, setRecurringSchedule] = useState<string>('twice_weekly');
  const [quoteNotes, setQuoteNotes] = useState<string>('প্রতি ডেলিভারিতে গ্রেড-এ মান নিশ্চিত করতে হবে। কিচেন কোল্ড ডকে আনলোড প্রয়োজন।');

  // Quotation Items
  const [quoteItems, setQuoteItems] = useState<Array<{
    productId: string;
    product: Product;
    quantity: number;
  }>>([
    { productId: MOCK_PRODUCTS[0].id, product: MOCK_PRODUCTS[0], quantity: 200 },
    { productId: MOCK_PRODUCTS[1].id, product: MOCK_PRODUCTS[1], quantity: 150 },
    { productId: MOCK_PRODUCTS[2].id, product: MOCK_PRODUCTS[2], quantity: 100 },
    { productId: MOCK_PRODUCTS[3].id, product: MOCK_PRODUCTS[3], quantity: 45 },
  ]);

  // Selected product to add into quote
  const [selectedAddProductId, setSelectedAddProductId] = useState<string>(MOCK_PRODUCTS[4].id);
  const [addQty, setAddQty] = useState<number>(20);

  // Success quotation generation flag
  const [isGenerated, setIsGenerated] = useState<boolean>(true);

  // Add Item to Quotation
  const handleAddItem = () => {
    const prod = MOCK_PRODUCTS.find(p => p.id === selectedAddProductId);
    if (!prod) return;

    const existingIndex = quoteItems.findIndex(i => i.productId === prod.id);
    if (existingIndex >= 0) {
      const updated = [...quoteItems];
      updated[existingIndex].quantity += addQty;
      setQuoteItems(updated);
    } else {
      setQuoteItems([...quoteItems, { productId: prod.id, product: prod, quantity: addQty }]);
    }
  };

  const handleRemoveItem = (idx: number) => {
    setQuoteItems(quoteItems.filter((_, i) => i !== idx));
  };

  const handleUpdateQty = (idx: number, qty: number) => {
    const updated = [...quoteItems];
    updated[idx].quantity = Math.max(1, qty);
    setQuoteItems(updated);
  };

  // Compute live quote totals
  const calculatedItems = quoteItems.map(item => {
    let unitPrice = item.product.retailPrice;
    for (const tier of item.product.bulkTiers) {
      if (item.quantity >= tier.minQty) {
        unitPrice = tier.pricePerUnit;
      }
    }
    const total = unitPrice * item.quantity;
    return {
      ...item,
      unitPrice,
      total
    };
  });

  const subtotal = calculatedItems.reduce((acc, curr) => acc + curr.total, 0);
  const commercialDiscount = Math.round(subtotal * 0.05); // Extra 5% B2B institution volume discount
  const logisticsFee = subtotal > 15000 ? 0 : 500; // Free logistics on orders over ৳15k
  const finalTotal = subtotal - commercialDiscount + logisticsFee;

  // Print quotation
  const handlePrintQuotation = () => {
    window.print();
  };

  return (
    <div className="space-y-6">
      {/* Top B2B Hub Banner */}
      <div className="bg-gradient-to-r from-emerald-950 via-slate-900 to-teal-950 rounded-3xl p-6 sm:p-8 text-white border border-emerald-800/40 shadow-xl relative overflow-hidden">
        <div className="relative z-1 max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400/20 border border-amber-400/40 text-amber-300 text-xs font-bold">
            <Building2 className="w-3.5 h-3.5" />
            <span>{isBn ? 'রেস্তোরাঁ, ক্যাটারার ও গ্রোসারি বাণিজ্যিক পোর্টাল' : 'Enterprise & Restaurant Procurement Portal'}</span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
            {isBn ? 'পাইকারি বাল্ক সোর্সিং ও স্বয়ংক্রিয় কোটেশন জেনারেটর' : 'Bulk Sourcing Hub & Automated Quotation Engine'}
          </h2>

          <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
            {isBn 
              ? 'কৃষকের ফার্মগেট থেকে সরাসরি আড়ত-মুদ্রা বাঁচিয়ে রেস্তোরাঁ ও হোটেলের জন্য সর্বোচ্চ সাশ্রয়ী পাইকারি কৃষি কাঁচামাল। ২০+ কেজি থেকে শুরু করে টন টন অর্ডার ডেলিভারি।'
              : 'Direct from northern farm gates to your commercial kitchen dock. Institutional volume pricing, automated proforma invoices, Net-7 terms, and cold chain logistics.'
            }
          </p>

          <div className="pt-2 flex flex-wrap gap-4 text-xs text-emerald-200">
            <div className="flex items-center gap-1.5">
              <CheckCircle className="w-4 h-4 text-emerald-400" />
              <span>{isBn ? 'সর্বনিম্ন ২০ কেজি বাল্ক টিয়ার' : 'Min 20 KG MOQ for Wholesale'}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle className="w-4 h-4 text-emerald-400" />
              <span>{isBn ? 'দৈনিক/সাপ্তাহিক রিকারিং ডেলিভারি' : 'Scheduled Recurring Deliveries'}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle className="w-4 h-4 text-emerald-400" />
              <span>{isBn ? 'অফিসিয়াল জিএসটি/ভ্যাট চালান' : 'Tax-Compliant Proforma Invoices'}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Pills for B2B Sub-views */}
      <div className="flex items-center gap-2 p-1.5 bg-slate-200/70 rounded-2xl border border-slate-300/60 max-w-xl">
        <button
          onClick={() => setActiveTab('quotation')}
          className={`flex-1 py-2 px-3 rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center gap-1.5 transition-all ${
            activeTab === 'quotation'
              ? 'bg-white text-emerald-900 shadow-sm'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <FileText className="w-4 h-4 text-emerald-600" />
          <span>{isBn ? 'অটো কোটেশন জেনারেটর' : 'Quotation Generator'}</span>
        </button>

        <button
          onClick={() => setActiveTab('matrix')}
          className={`flex-1 py-2 px-3 rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center gap-1.5 transition-all ${
            activeTab === 'matrix'
              ? 'bg-white text-emerald-900 shadow-sm'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <Layers className="w-4 h-4 text-emerald-600" />
          <span>{isBn ? 'বাল্ক ডিসকাউন্ট ম্যাট্রিক্স' : 'Bulk Discount Matrix'}</span>
        </button>

        <button
          onClick={() => setActiveTab('recurring')}
          className={`flex-1 py-2 px-3 rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center gap-1.5 transition-all ${
            activeTab === 'recurring'
              ? 'bg-white text-emerald-900 shadow-sm'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <Calendar className="w-4 h-4 text-emerald-600" />
          <span>{isBn ? 'রিকারিং সাপ্লাই শিডিউল' : 'Recurring Supply'}</span>
        </button>
      </div>

      {/* Tab 1: Automated Quotation Generator & Printable Proforma Invoice */}
      {activeTab === 'quotation' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Column: Quotation Form & Item Picker (5 cols) */}
          <div className="lg:col-span-5 space-y-5 bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="font-bold text-slate-900 text-base flex items-center gap-2">
                <Building2 className="w-4 h-4 text-emerald-700" />
                <span>{isBn ? 'প্রতিষ্ঠান ও অর্ডার কনফিগারেশন' : 'Company & Order Details'}</span>
              </h3>
              <span className="text-[11px] font-mono text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md font-semibold">
                QUOTE-2026-X89
              </span>
            </div>

            <div className="space-y-3.5 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  {isBn ? 'ব্যবসা / প্রতিষ্ঠানের নাম:' : 'Company / Restaurant Name:'}
                </label>
                <input
                  type="text"
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl font-medium text-slate-900 focus:outline-emerald-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    {isBn ? 'ব্যবসার ধরন:' : 'Business Type:'}
                  </label>
                  <select
                    value={buyerType}
                    onChange={(e) => setBuyerType(e.target.value)}
                    className="w-full px-2.5 py-2 bg-slate-50 border border-slate-200 rounded-xl font-medium text-slate-800"
                  >
                    <option value="restaurant">{isBn ? 'রেস্তোরাঁ / হোটেল' : 'Restaurant / Hotel'}</option>
                    <option value="grocery">{isBn ? 'সুপারশপ / গ্রোসারি' : 'Supermarket / Grocery'}</option>
                    <option value="caterer">{isBn ? 'ক্যাটারিং সার্ভিস' : 'Catering Service'}</option>
                    <option value="institution">{isBn ? 'ক্যান্টিন / ইন্সটিটিউশন' : 'Canteen / Institution'}</option>
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    {isBn ? 'যোগাযোগের মোবাইল:' : 'Contact Phone:'}
                  </label>
                  <input
                    type="text"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl font-medium text-slate-900"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  {isBn ? 'ডেলিভারি ঠিকানা ও ড্রপ ডক:' : 'Delivery Dock Address:'}
                </label>
                <input
                  type="text"
                  value={deliveryAddress}
                  onChange={(e) => setDeliveryAddress(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl font-medium text-slate-900"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    {isBn ? 'পেমেন্ট শর্তাবলী:' : 'Payment Terms:'}
                  </label>
                  <select
                    value={paymentTerms}
                    onChange={(e) => setPaymentTerms(e.target.value)}
                    className="w-full px-2.5 py-2 bg-slate-50 border border-slate-200 rounded-xl font-medium text-slate-800"
                  >
                    <option value="cod">{isBn ? 'ক্যাশ অন ডেলিভারি' : 'Cash On Delivery'}</option>
                    <option value="net7">{isBn ? '৭-দিন কর্পোরেট ক্রেডিট (Net-7)' : '7-Day Net Credit'}</option>
                    <option value="net15">{isBn ? '১৫-দিন কর্পোরেট ক্রেডিট (Net-15)' : '15-Day Net Credit'}</option>
                    <option value="advance">{isBn ? 'অগ্রিম ব্যাংক/বিকাশ' : 'Advance Wire / bKash'}</option>
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    {isBn ? 'ডেলিভারি ফ্রিকোয়েন্সি:' : 'Supply Schedule:'}
                  </label>
                  <select
                    value={recurringSchedule}
                    onChange={(e) => setRecurringSchedule(e.target.value)}
                    className="w-full px-2.5 py-2 bg-slate-50 border border-slate-200 rounded-xl font-medium text-slate-800"
                  >
                    <option value="none">{isBn ? 'এককালীন বাল্ক অর্ডার' : 'One-time Bulk'}</option>
                    <option value="daily">{isBn ? 'দৈনিক সকাল ৭টায়' : 'Daily 7:00 AM'}</option>
                    <option value="twice_weekly">{isBn ? 'সপ্তাহে ২ দিন (মঙ্গল/শুক্র)' : 'Twice a week'}</option>
                    <option value="weekly">{isBn ? 'সাপ্তাহিক রিকারিং' : 'Weekly Recurring'}</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Add Products into Quotation Section */}
            <div className="pt-3 border-t border-slate-100 space-y-2">
              <label className="block text-xs font-bold text-slate-800">
                {isBn ? 'কোটেশনে আরও পণ্য যোগ করুন:' : 'Add Produce Item to Quote:'}
              </label>

              <div className="flex gap-2">
                <select
                  value={selectedAddProductId}
                  onChange={(e) => setSelectedAddProductId(e.target.value)}
                  className="flex-1 px-2.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-800"
                >
                  {MOCK_PRODUCTS.map(p => (
                    <option key={p.id} value={p.id}>
                      {isBn ? p.nameBn : p.nameEn} (MOQ: {p.moq} {isBn ? p.unitBn : p.unitEn})
                    </option>
                  ))}
                </select>

                <input
                  type="number"
                  min={5}
                  value={addQty}
                  onChange={(e) => setAddQty(Math.max(1, parseInt(e.target.value) || 1))}
                  className="w-16 px-2 py-2 bg-slate-50 border border-slate-200 rounded-xl text-center font-mono font-bold text-xs"
                />

                <button
                  onClick={handleAddItem}
                  className="px-3 py-2 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl text-xs font-bold flex items-center gap-1 shadow-sm"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>{isBn ? 'যোগ' : 'Add'}</span>
                </button>
              </div>
            </div>
          </div>

          {/* Right Column: Printable Proforma Invoice Preview (7 cols) */}
          <div className="lg:col-span-7 space-y-4">
            {/* Action Bar */}
            <div className="flex items-center justify-between bg-white px-5 py-3 rounded-2xl border border-slate-200 shadow-xs">
              <div className="flex items-center gap-2 text-xs font-bold text-slate-800">
                <FileText className="w-4 h-4 text-emerald-600" />
                <span>{isBn ? 'লাইভ কোটেশন / প্রফরমা ইনভয়েস প্রিভিউ' : 'Live Proforma Invoice Preview'}</span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={handlePrintQuotation}
                  className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors"
                >
                  <Printer className="w-3.5 h-3.5 text-slate-600" />
                  <span>{isBn ? 'প্রিন্ট / PDF' : 'Print / PDF'}</span>
                </button>

                <button
                  onClick={() => {
                    // Add all quote items to cart with bulk mode!
                    quoteItems.forEach(item => {
                      onAddToCart(item.product, item.quantity, 'bulk');
                    });
                    alert(isBn ? 'কোটেশনের সকল পণ্য বাল্ক মূল্যে আপনার কার্টে যুক্ত হয়েছে!' : 'All quotation items added to cart at bulk rates!');
                  }}
                  className="px-3.5 py-1.5 bg-emerald-700 hover:bg-emerald-800 text-white rounded-lg text-xs font-bold flex items-center gap-1.5 shadow-sm"
                >
                  <span>{isBn ? 'এক ক্লিকে অর্ডার কনফার্ম' : 'Confirm as Bulk Order'}</span>
                </button>
              </div>
            </div>

            {/* Printable Proforma Document Body */}
            <div 
              id="printable-quotation"
              className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-300 shadow-md space-y-6 text-slate-900"
            >
              {/* Document Header */}
              <div className="flex flex-col sm:flex-row justify-between items-start gap-4 pb-6 border-b-2 border-emerald-900/20">
                <div>
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-emerald-800 flex items-center justify-center text-white font-black text-sm">
                      AX
                    </div>
                    <span className="text-xl font-extrabold text-emerald-950">AgroLink AI X</span>
                  </div>
                  <p className="text-[11px] text-slate-500 mt-1 max-w-xs">
                    AgroLink Supply Chain Ltd. • Registered Agri Hub Tejgaon, Dhaka-1208. Hotline: 09612-AGRO-X
                  </p>
                </div>

                <div className="text-right sm:text-right">
                  <span className="inline-block px-2.5 py-1 bg-emerald-900 text-white text-xs font-extrabold rounded-md uppercase tracking-wider">
                    {isBn ? 'অফিসিয়াল বাণিজ্যিক কোটেশন' : 'Official B2B Proforma Quote'}
                  </span>
                  <div className="mt-1.5 text-xs font-mono text-slate-600">
                    <div><strong>Quote Ref:</strong> AGX-QT-2026-8902</div>
                    <div><strong>Date:</strong> 10 November 2026</div>
                    <div><strong>Validity:</strong> 7 Days</div>
                  </div>
                </div>
              </div>

              {/* Bill To & Dispatch Details */}
              <div className="grid grid-cols-2 gap-4 text-xs bg-slate-50 p-4 rounded-xl border border-slate-200">
                <div>
                  <span className="font-bold text-slate-500 uppercase tracking-wider text-[10px] block mb-1">
                    {isBn ? 'গ্রাহক / বিলিং তথ্য (Bill To):' : 'Billed To (Client):'}
                  </span>
                  <div className="font-bold text-slate-900 text-sm">{companyName}</div>
                  <div className="text-slate-600">{contactPerson} ({phone})</div>
                  <div className="text-slate-600">{deliveryAddress}</div>
                </div>

                <div className="text-right">
                  <span className="font-bold text-slate-500 uppercase tracking-wider text-[10px] block mb-1">
                    {isBn ? 'লজিস্টিকস ও টার্মস:' : 'Logistics & Terms:'}
                  </span>
                  <div className="font-semibold text-slate-800">
                    {isBn ? 'পেমেন্ট মোড:' : 'Payment:'} <span className="uppercase font-mono text-emerald-800 font-bold">{paymentTerms}</span>
                  </div>
                  <div className="text-slate-600">
                    {isBn ? 'শিডিউল:' : 'Schedule:'} {recurringSchedule}
                  </div>
                  <div className="text-slate-600">
                    {isBn ? 'ডেলিভারি ডক:' : 'Dispatch Hub:'} Tejgaon Central Reefer DC
                  </div>
                </div>
              </div>

              {/* Itemized Table */}
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-100 text-slate-700 font-bold uppercase text-[10px] tracking-wider border-y border-slate-200">
                    <tr>
                      <th className="py-2.5 px-3">SL</th>
                      <th className="py-2.5 px-3">{isBn ? 'কৃষিপণ্যের বিবরণ ও উৎস' : 'Item Description & Source'}</th>
                      <th className="py-2.5 px-3 text-center">{isBn ? 'পরিমাণ' : 'Qty'}</th>
                      <th className="py-2.5 px-3 text-right">{isBn ? 'একক বাল্ক দর' : 'Unit Bulk Rate'}</th>
                      <th className="py-2.5 px-3 text-right">{isBn ? 'মোট টাকা' : 'Total (BDT)'}</th>
                      <th className="py-2.5 px-2 text-center print:hidden"></th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {calculatedItems.map((item, idx) => (
                      <tr key={idx} className="hover:bg-slate-50">
                        <td className="py-2.5 px-3 font-mono text-slate-500">{idx + 1}</td>
                        <td className="py-2.5 px-3">
                          <div className="font-bold text-slate-900">
                            {isBn ? item.product.nameBn : item.product.nameEn}
                          </div>
                          <div className="text-[10px] text-slate-500">
                            উৎস: {isBn ? item.product.farmLocationBn : item.product.farmLocationEn} (গ্রেড {item.product.qualityGrade})
                          </div>
                        </td>
                        <td className="py-2.5 px-3 text-center font-mono">
                          <div className="inline-flex items-center gap-1 print:hidden">
                            <input
                              type="number"
                              min={1}
                              value={item.quantity}
                              onChange={(e) => handleUpdateQty(idx, parseInt(e.target.value) || 1)}
                              className="w-16 px-1.5 py-0.5 border border-slate-300 rounded text-center text-xs font-mono font-bold"
                            />
                            <span className="text-[11px] text-slate-500">{isBn ? item.product.unitBn : item.product.unitEn}</span>
                          </div>
                          <span className="hidden print:inline font-bold">
                            {item.quantity} {isBn ? item.product.unitBn : item.product.unitEn}
                          </span>
                        </td>
                        <td className="py-2.5 px-3 text-right font-mono font-semibold">
                          {formatCurrency(item.unitPrice, language)}
                        </td>
                        <td className="py-2.5 px-3 text-right font-mono font-bold text-slate-900">
                          {formatCurrency(item.total, language)}
                        </td>
                        <td className="py-2.5 px-2 text-center print:hidden">
                          <button
                            onClick={() => handleRemoveItem(idx)}
                            className="text-slate-400 hover:text-rose-600 transition-colors p-1"
                            title="Remove item"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Financial Calculation Summary */}
              <div className="pt-4 border-t-2 border-slate-200 flex flex-col sm:flex-row justify-between items-start gap-4">
                <div className="text-xs text-slate-500 max-w-sm space-y-1">
                  <div className="font-bold text-slate-700">{isBn ? 'বিশেষ নির্দেশিকা ও শর্তাবলী:' : 'Special Instructions:'}</div>
                  <p className="italic bg-amber-50 p-2.5 rounded-lg border border-amber-200/60 text-amber-900 text-[11px]">
                    "{quoteNotes}"
                  </p>
                  <p className="text-[10px] text-slate-400 pt-1">
                    * পণ্যের গুণগত মান নিশ্চিতকরণে ডেলিভারি পয়েন্টে ডিজিটাল ওজন ও কিউসি টেস্ট সুবিধাযুক্ত।
                  </p>
                </div>

                <div className="w-full sm:w-64 space-y-1.5 text-xs text-slate-700">
                  <div className="flex justify-between py-1">
                    <span>{isBn ? 'সাবটোটাল (Subtotal):' : 'Subtotal:'}</span>
                    <span className="font-mono font-bold">{formatCurrency(subtotal, language)}</span>
                  </div>
                  <div className="flex justify-between py-1 text-emerald-700 font-semibold">
                    <span>{isBn ? 'বাণিজ্যিক ছাড় (B2B Volume 5%):' : 'Commercial Discount (5%):'}</span>
                    <span className="font-mono">-{formatCurrency(commercialDiscount, language)}</span>
                  </div>
                  <div className="flex justify-between py-1 text-slate-600">
                    <span>{isBn ? 'কোল্ড চেইন লজিস্টিকস ফি:' : 'Cold Logistics Fee:'}</span>
                    <span className="font-mono">
                      {logisticsFee === 0 ? (isBn ? 'ফ্রি (৳১৫,০০০+ অর্ডার)' : 'FREE') : formatCurrency(logisticsFee, language)}
                    </span>
                  </div>
                  <div className="flex justify-between py-2 border-t-2 border-slate-900 text-sm font-black text-slate-950">
                    <span>{isBn ? 'সর্বমোট প্রদেয় টাকা:' : 'Net Payable Amount:'}</span>
                    <span className="font-mono text-emerald-900 text-base">{formatCurrency(finalTotal, language)}</span>
                  </div>
                </div>
              </div>

              {/* Signatures & Stamp */}
              <div className="pt-8 border-t border-slate-200 flex justify-between items-end text-xs text-slate-500">
                <div className="text-center">
                  <div className="w-32 h-10 border-b border-dashed border-slate-400 mx-auto mb-1 flex items-center justify-center">
                    <span className="text-[10px] text-emerald-800 font-serif italic">AgroLink AI Verified</span>
                  </div>
                  <span>{isBn ? 'অনুমোদিত প্রতিনিধি (AgroLink)' : 'Authorized Signatory'}</span>
                </div>

                <div className="text-center">
                  <div className="w-20 h-20 rounded-full border-2 border-emerald-800/40 text-emerald-800/50 flex flex-col items-center justify-center text-[9px] uppercase font-bold mx-auto -mb-2 rotate-[-12deg]">
                    <span>AgroLink</span>
                    <span className="text-[7px]">OFFICIAL</span>
                    <span>SEAL</span>
                  </div>
                </div>

                <div className="text-center">
                  <div className="w-32 h-10 border-b border-dashed border-slate-400 mx-auto mb-1"></div>
                  <span>{isBn ? 'গ্রাহক স্বাক্ষর ও সিল' : 'Client Signature & Stamp'}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Tiered Bulk Discount Matrix */}
      {activeTab === 'matrix' && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-4 border-b border-slate-100">
            <div>
              <h3 className="text-lg font-bold text-slate-900">
                {isBn ? 'সর্বোচ্চ বিক্রিত কৃষিপণ্যের পাইকারি ডিসকাউন্ট মেট্রিক্স' : 'Key Commodity Tiered Bulk Volume Schedule'}
              </h3>
              <p className="text-xs text-slate-500">
                {isBn ? 'পরিমাণ বাড়লে সাশ্রয় বাড়ে। সরাসরি আড়ত ও কৃষক দর যাচাই করুন।' : 'Compare retail unit pricing vs bulk tiers. Direct from producer hubs.'}
              </p>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border border-slate-200 rounded-2xl overflow-hidden">
              <thead className="bg-emerald-950 text-white uppercase text-[11px] tracking-wider">
                <tr>
                  <th className="py-3 px-4">{isBn ? 'পণ্য' : 'Product'}</th>
                  <th className="py-3 px-4">{isBn ? 'ফার্ম এলাকা' : 'Origin'}</th>
                  <th className="py-3 px-4 text-center">{isBn ? 'খুচরা মূল্য' : 'Retail Price'}</th>
                  <th className="py-3 px-4 text-center bg-emerald-900">{isBn ? 'বাল্ক টিয়ার ১ (২০-৯৯ কেজি)' : 'Tier 1 (20-99 KG)'}</th>
                  <th className="py-3 px-4 text-center bg-emerald-800">{isBn ? 'বাল্ক টিয়ার ২ (১০০+ কেজি)' : 'Tier 2 (100+ KG)'}</th>
                  <th className="py-3 px-4 text-center">{isBn ? 'সর্বোচ্চ সাশ্রয়' : 'Max Savings'}</th>
                  <th className="py-3 px-4 text-center">{isBn ? 'অ্যাকশন' : 'Action'}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 text-slate-800">
                {MOCK_PRODUCTS.map((prod) => {
                  const retail = prod.retailPrice;
                  const tier1 = prod.bulkTiers[1]?.pricePerUnit || prod.bulkPrice;
                  const tier2 = prod.bulkTiers[2]?.pricePerUnit || tier1;
                  const maxSavingsPct = Math.round(((retail - tier2) / retail) * 100);

                  return (
                    <tr key={prod.id} className="hover:bg-slate-50 transition-colors">
                      <td className="py-3.5 px-4 font-bold flex items-center gap-2">
                        <img src={prod.image} alt={prod.nameBn} className="w-9 h-9 rounded-lg object-cover" />
                        <div>
                          <div>{isBn ? prod.nameBn : prod.nameEn}</div>
                          <div className="text-[10px] text-slate-400 font-mono">MOQ: {prod.moq} {isBn ? prod.unitBn : prod.unitEn}</div>
                        </div>
                      </td>
                      <td className="py-3.5 px-4 text-slate-600">
                        {isBn ? prod.farmLocationBn : prod.farmLocationEn}
                      </td>
                      <td className="py-3.5 px-4 text-center font-mono font-medium text-slate-600">
                        {formatCurrency(retail, language)}/{isBn ? prod.unitBn : prod.unitEn}
                      </td>
                      <td className="py-3.5 px-4 text-center font-mono font-bold text-emerald-900 bg-emerald-50/70">
                        {formatCurrency(tier1, language)}
                        <span className="block text-[10px] text-emerald-600 font-sans">
                          (-{Math.round(((retail - tier1) / retail) * 100)}%)
                        </span>
                      </td>
                      <td className="py-3.5 px-4 text-center font-mono font-black text-emerald-950 bg-emerald-100/70">
                        {formatCurrency(tier2, language)}
                        <span className="block text-[10px] text-emerald-700 font-sans">
                          (-{maxSavingsPct}%)
                        </span>
                      </td>
                      <td className="py-3.5 px-4 text-center font-mono font-bold text-amber-700">
                        {maxSavingsPct}%
                      </td>
                      <td className="py-3.5 px-4 text-center">
                        <button
                          onClick={() => onAddToCart(prod, prod.moq, 'bulk')}
                          className="px-3 py-1.5 bg-emerald-700 hover:bg-emerald-800 text-white rounded-lg text-xs font-bold shadow-xs transition-colors"
                        >
                          {isBn ? 'বাল্ক অর্ডার' : 'Order Bulk'}
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Tab 3: Scheduled Recurring Supply Form */}
      {activeTab === 'recurring' && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
          <div className="max-w-2xl space-y-2">
            <h3 className="text-xl font-bold text-slate-900">
              {isBn ? 'রেস্তোরাঁ ও হোটেলের জন্য দৈনিক ও সাপ্তাহিক সাপ্লাই চুক্তি' : 'Scheduled Recurring Supply Contracts'}
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              {isBn 
                ? 'প্রতিদিন ভোরে বা সপ্তাহে নির্দিষ্ট দিনে আপনার কিচেনে তাজা কাঁচা সবজি, আলু ও মসলার নিশ্চিত সরবরাহ। বাজারে গিয়ে সময় অপচয় বন্ধ করুন।'
                : 'Automate your commercial kitchen procurement. Fix your recurring morning delivery slots, lock in weekly volume prices, and enjoy zero stockout worries.'
              }
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center">
                <Clock className="w-5 h-5" />
              </div>
              <h4 className="font-bold text-slate-900 text-sm">
                {isBn ? '১. সকাল ৭:০০ টা এক্সপ্রেস স্লট' : '1. 7:00 AM Morning Slot'}
              </h4>
              <p className="text-xs text-slate-500">
                {isBn ? 'শেফ কিচেন খোলার আগেই তাজা সবজি ও আলু ডকে রিসিভ করুন।' : 'Receive freshly graded produce at your receiving bay before kitchen prep starts.'}
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center">
                <DollarSign className="w-5 h-5" />
              </div>
              <h4 className="font-bold text-slate-900 text-sm">
                {isBn ? '২. প্রাইস লক সুরক্ষা (Price Lock)' : '2. 14-Day Price Lock'}
              </h4>
              <p className="text-xs text-slate-500">
                {isBn ? 'বাজারের আকস্মিক দর ওঠানামায় আপনার মেন্যুর বাজেট থাকবে সুরক্ষিত।' : 'Hedge against Karwan Bazar price surges with transparent contracted rates.'}
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-teal-100 text-teal-800 flex items-center justify-center">
                <Truck className="w-5 h-5" />
              </div>
              <h4 className="font-bold text-slate-900 text-sm">
                {isBn ? '৩. ডেডিকেটেড রীফার ভ্যান' : '3. Temperature Monitored'}
              </h4>
              <p className="text-xs text-slate-500">
                {isBn ? 'তাপমাত্রা নিয়ন্ত্রিত ভ্যানে ডেলিভারি যাতে কাঁচা সবজি শুকিয়ে নষ্ট না হয়।' : 'Insulated and reefer transport preserves crisp freshness and cuts kitchen waste.'}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

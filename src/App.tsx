import React, { useState, useMemo } from 'react';
import { 
  UserRole, 
  Language, 
  Product, 
  CartItem, 
  ProductCategory 
} from './types';
import { MOCK_PRODUCTS, DELIVERY_ZONES } from './data/mockData';
import { Header } from './components/Header';
import { MarketplaceHero } from './components/MarketplaceHero';
import { ProductCard } from './components/ProductCard';
import { ProductDetailModal } from './components/ProductDetailModal';
import { B2BCommercialHub } from './components/B2BCommercialHub';
import { FarmerPortal } from './components/FarmerPortal';
import { AdminFinancialDashboard } from './components/AdminFinancialDashboard';
import { CartDrawer } from './components/CartDrawer';
import { AIAdvisorModal } from './components/AIAdvisorModal';
import { 
  ShieldCheck, 
  Truck, 
  Heart, 
  Building2, 
  Phone, 
  Mail, 
  MapPin, 
  Sparkles,
  ArrowRight,
  HelpCircle,
  CheckCircle2
} from 'lucide-react';

export default function App() {
  // Global State
  const [currentRole, setCurrentRole] = useState<UserRole>('d2c');
  const [language, setLanguage] = useState<Language>('bn');
  const [purchasingMode, setPurchasingMode] = useState<'retail' | 'bulk'>('retail');
  const [selectedCategory, setSelectedCategory] = useState<ProductCategory>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedZone, setSelectedZone] = useState<string>('dhaka-north');

  // Modals & Drawers State
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  const [isAIModalOpen, setIsAIModalOpen] = useState<boolean>(false);
  const [selectedProductForModal, setSelectedProductForModal] = useState<Product | null>(null);
  const [activeQuoteProduct, setActiveQuoteProduct] = useState<Product | null>(null);

  // Cart State (Initialized with sample items to immediately demo the breakdown)
  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      product: MOCK_PRODUCTS[0], // Bogura Diamond Potato
      quantity: 5,
      mode: 'retail',
      appliedPrice: 40
    },
    {
      product: MOCK_PRODUCTS[1], // Pabna Native Onion
      quantity: 20,
      mode: 'bulk',
      appliedPrice: 74
    }
  ]);

  // Toast Notification State
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  };

  const isBn = language === 'bn';

  // Synchronize purchasing mode with role
  const handleRoleChange = (role: UserRole) => {
    setCurrentRole(role);
    if (role === 'b2b') {
      setPurchasingMode('bulk');
    } else if (role === 'd2c') {
      setPurchasingMode('retail');
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleTogglePurchasingMode = (mode: 'retail' | 'bulk') => {
    setPurchasingMode(mode);
    if (mode === 'bulk' && currentRole === 'd2c') {
      // prompt/offer B2B commercial experience
      showToast(isBn ? 'পাইকারি বাল্ক মোড সক্রিয় হয়েছে (MOQ ২০ কেজি)' : 'B2B Wholesale mode active (MOQ 20 KG)');
    } else if (mode === 'retail') {
      showToast(isBn ? 'খুচরা রিটেইল মোড সক্রিয় হয়েছে' : 'Retail D2C mode active');
    }
  };

  // Add to cart handler
  const handleAddToCart = (product: Product, quantity: number, mode: 'retail' | 'bulk') => {
    // compute price
    let appliedPrice = product.retailPrice;
    for (const tier of product.bulkTiers) {
      if (quantity >= tier.minQty) {
        appliedPrice = tier.pricePerUnit;
      }
    }

    setCartItems(prev => {
      const existingIdx = prev.findIndex(item => item.product.id === product.id && item.mode === mode);
      if (existingIdx >= 0) {
        const updated = [...prev];
        updated[existingIdx].quantity += quantity;
        updated[existingIdx].appliedPrice = appliedPrice;
        return updated;
      } else {
        return [...prev, { product, quantity, mode, appliedPrice }];
      }
    });

    showToast(
      isBn 
        ? `${product.nameBn} (${quantity} ${product.unitBn}) কার্টে যুক্ত হয়েছে!` 
        : `${product.nameEn} (${quantity} ${product.unitEn}) added to cart!`
    );
  };

  const handleUpdateCartQty = (productId: string, newQty: number) => {
    setCartItems(prev => prev.map(item => {
      if (item.product.id === productId) {
        let appliedPrice = item.product.retailPrice;
        for (const tier of item.product.bulkTiers) {
          if (newQty >= tier.minQty) {
            appliedPrice = tier.pricePerUnit;
          }
        }
        return { ...item, quantity: newQty, appliedPrice };
      }
      return item;
    }));
  };

  const handleRemoveCartItem = (productId: string) => {
    setCartItems(prev => prev.filter(item => item.product.id !== productId));
    showToast(isBn ? 'আইটেম কার্ট থেকে সরানো হয়েছে' : 'Item removed from cart');
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  const handleRequestQuote = (product: Product) => {
    setActiveQuoteProduct(product);
    setCurrentRole('b2b');
    showToast(
      isBn 
        ? `${product.nameBn} এর জন্য অটো কোটেশন জেনারেটর খোলা হয়েছে` 
        : `Opened quotation generator for ${product.nameEn}`
    );
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Filtered Products
  const filteredProducts = useMemo(() => {
    return MOCK_PRODUCTS.filter(prod => {
      // Category filter
      if (selectedCategory !== 'all' && prod.category !== selectedCategory) {
        return false;
      }
      // Search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesName = prod.nameBn.toLowerCase().includes(q) || prod.nameEn.toLowerCase().includes(q);
        const matchesFarmer = prod.farmerNameBn.toLowerCase().includes(q) || prod.farmerNameEn.toLowerCase().includes(q);
        const matchesLocation = prod.farmLocationBn.toLowerCase().includes(q) || prod.farmLocationEn.toLowerCase().includes(q) || prod.district.toLowerCase().includes(q);
        if (!matchesName && !matchesFarmer && !matchesLocation) return false;
      }
      return true;
    });
  }, [selectedCategory, searchQuery]);

  // Cart total calculations
  const cartCount = cartItems.reduce((acc, curr) => acc + curr.quantity, 0);
  const cartSubtotal = cartItems.reduce((acc, curr) => acc + (curr.appliedPrice * curr.quantity), 0);

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 selection:bg-emerald-500 selection:text-white">
      {/* Toast Notification Floating Pill */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 px-4 py-2.5 bg-slate-950 text-white rounded-2xl shadow-xl flex items-center gap-2 text-xs sm:text-sm font-semibold border border-emerald-500/40 animate-in slide-in-from-bottom-4 duration-200">
          <Sparkles className="w-4 h-4 text-amber-300" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Header with Navigation, Persona Switcher & Mandi Ticker */}
      <Header
        currentRole={currentRole}
        onRoleChange={handleRoleChange}
        language={language}
        onLanguageChange={setLanguage}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        selectedZone={selectedZone}
        onZoneChange={setSelectedZone}
        cartCount={cartCount}
        cartTotal={cartSubtotal}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenAIModal={() => setIsAIModalOpen(true)}
      />

      {/* Main Content Area based on Selected Persona */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-6 space-y-8">
        {/* ROLE 1: D2C Household Buyer */}
        {currentRole === 'd2c' && (
          <div className="space-y-8">
            <MarketplaceHero
              purchasingMode={purchasingMode}
              onTogglePurchasingMode={handleTogglePurchasingMode}
              selectedCategory={selectedCategory}
              onSelectCategory={setSelectedCategory}
              language={language}
              onNavigateToB2BHub={() => handleRoleChange('b2b')}
            />

            {/* Products Grid Section */}
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
                <div>
                  <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900">
                    {isBn ? 'সরাসরি মাঠ থেকে সংগৃহীত তাজা পণ্য' : 'Direct Harvest Agri Produce'}
                  </h2>
                  <p className="text-xs text-slate-500">
                    {isBn 
                      ? `${filteredProducts.length} টি পণ্য পাওয়া গেছে • আজ ভোরের বাছাইকৃত ও গ্রেড-এ সার্টিফাইড` 
                      : `Showing ${filteredProducts.length} verified produce items • Grade-A inspected`}
                  </p>
                </div>

                <div className="flex items-center gap-2 text-xs">
                  <span className="text-slate-500 font-medium">{isBn ? 'সর্ট করুন:' : 'Sort by:'}</span>
                  <select 
                    aria-label={isBn ? 'পণ্য সাজানোর ধরণ' : 'Sort produce'}
                    className="bg-white border border-slate-200 rounded-lg px-2.5 py-1 text-xs font-semibold text-slate-800"
                  >
                    <option>{isBn ? 'সর্বাধিক বিক্রিত (Best Sellers)' : 'Best Sellers'}</option>
                    <option>{isBn ? 'দাম: কম থেকে বেশি' : 'Price: Low to High'}</option>
                    <option>{isBn ? 'সর্বোচ্চ বাল্ক ডিসকাউন্ট' : 'Highest Bulk Discount'}</option>
                  </select>
                </div>
              </div>

              {/* Grid of Product Cards */}
              {filteredProducts.length === 0 ? (
                <div className="p-12 text-center bg-white rounded-3xl border border-slate-200 space-y-3">
                  <p className="text-slate-500 text-sm">
                    {isBn ? 'কোন কৃষিপণ্য খুঁজে পাওয়া যায়নি।' : 'No agricultural products matched your query.'}
                  </p>
                  <button
                    onClick={() => {
                      setSearchQuery('');
                      setSelectedCategory('all');
                    }}
                    className="px-4 py-2 bg-emerald-700 text-white rounded-xl text-xs font-bold"
                  >
                    {isBn ? 'ফিল্টার ক্লিয়ার করুন' : 'Clear Filters'}
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                  {filteredProducts.map(product => (
                    <ProductCard
                      key={product.id}
                      product={product}
                      purchasingMode={purchasingMode}
                      language={language}
                      onAddToCart={handleAddToCart}
                      onSelectProduct={(p) => setSelectedProductForModal(p)}
                      onRequestQuote={handleRequestQuote}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* ROLE 2: B2B Commercial Buyer */}
        {currentRole === 'b2b' && (
          <div className="space-y-6">
            <B2BCommercialHub
              language={language}
              onAddToCart={handleAddToCart}
              activeQuoteProduct={activeQuoteProduct}
            />

            {/* Also show products grid with bulk tier focus */}
            <div className="pt-4 space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-bold text-slate-900">
                    {isBn ? 'রেস্তোরাঁ ও পাইকারি বাল্ক স্টক ক্যাটালগ' : 'Commercial Wholesale Produce Catalog'}
                  </h3>
                  <p className="text-xs text-slate-500">
                    {isBn ? 'ন্যূনতম ২০ কেজি বা ১ ক্যারেট অর্ডারে বিশেষ আড়ত রেট প্রযোজ্য।' : 'Minimum Order Quantities unlock institutional pricing.'}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                {MOCK_PRODUCTS.map(product => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    purchasingMode="bulk"
                    language={language}
                    onAddToCart={handleAddToCart}
                    onSelectProduct={(p) => setSelectedProductForModal(p)}
                    onRequestQuote={handleRequestQuote}
                  />
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ROLE 3: Farmer / Producer Portal */}
        {currentRole === 'farmer' && (
          <FarmerPortal language={language} />
        )}

        {/* ROLE 4: Super Admin & Financial Dashboard */}
        {currentRole === 'admin' && (
          <AdminFinancialDashboard language={language} />
        )}
      </main>

      {/* Interactive Product Details & Tier Calculator Modal */}
      <ProductDetailModal
        product={selectedProductForModal}
        isOpen={!!selectedProductForModal}
        onClose={() => setSelectedProductForModal(null)}
        language={language}
        onAddToCart={handleAddToCart}
        onRequestQuote={handleRequestQuote}
      />

      {/* Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onUpdateQty={handleUpdateCartQty}
        onRemoveItem={handleRemoveCartItem}
        onClearCart={handleClearCart}
        language={language}
        selectedZone={selectedZone}
        onZoneChange={setSelectedZone}
      />

      {/* AI Market Advisor Modal */}
      <AIAdvisorModal
        isOpen={isAIModalOpen}
        onClose={() => setIsAIModalOpen(false)}
        language={language}
      />

      {/* Footer */}
      <footer className="mt-16 bg-slate-900 text-slate-300 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Col 1: Brand */}
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-emerald-600 flex items-center justify-center text-white font-black text-sm">
                  AX
                </div>
                <span className="text-lg font-bold text-white tracking-tight">
                  AgroLink <span className="text-emerald-400">AI X</span>
                </span>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                {isBn 
                  ? 'বাংলাদেশের কৃষিখাতে সরাসরি কৃষক-ভোক্তা ও কৃষক-বাণিজ্যিক সংযোগের প্রথম স্মার্ট এআই চালিত কৃষি মার্কেটপ্লেস।'
                  : 'Empowering local Bangladeshi farmers through AI-driven fair price discovery, 4% transparent fee, and cold-chain B2B/D2C fulfillment.'
                }
              </p>
              <div className="pt-1 flex items-center gap-2 text-xs text-emerald-400">
                <CheckCircle2 className="w-4 h-4" />
                <span>{isBn ? '১০০% মধ্যস্বত্বভোগীমুক্ত ট্রেসেবিলিটি' : '100% Intermediary-free Traceability'}</span>
              </div>
            </div>

            {/* Col 2: Sourcing Hubs */}
            <div className="space-y-2.5 text-xs">
              <h4 className="font-bold text-white uppercase tracking-wider text-[11px]">
                {isBn ? 'সোর্সিং ও কোল্ড স্টোরেজ হাব' : 'Regional Sourcing Hubs'}
              </h4>
              <ul className="space-y-1.5 text-slate-400">
                <li>• বগুড়া শেরপুর হাব (আলু ও মরিচ)</li>
                <li>• পাবনা ঈশ্বরদী হাব (দেশি পেঁয়াজ)</li>
                <li>• দিনাজপুর বীরগঞ্জ হাস্কিং পয়েন্ট (মিনিকেট চাল)</li>
                <li>• চুয়াডাঙ্গা ও যশোর সবজি হাব (টমেটো ও ফুলকপি)</li>
                <li>• তেজগাঁও সেন্ট্রাল কোল্ড ডিসপ্যাচ ডক, ঢাকা</li>
              </ul>
            </div>

            {/* Col 3: Personas & Fast Links */}
            <div className="space-y-2.5 text-xs">
              <h4 className="font-bold text-white uppercase tracking-wider text-[11px]">
                {isBn ? 'ইউজার প্ল্যাটফর্ম অ্যাক্সেস' : 'Platform Portals'}
              </h4>
              <ul className="space-y-1.5 text-slate-400">
                <li>
                  <button onClick={() => handleRoleChange('d2c')} className="hover:text-emerald-400 transition-colors">
                    • খুচরা বাজার (D2C Retail)
                  </button>
                </li>
                <li>
                  <button onClick={() => handleRoleChange('b2b')} className="hover:text-amber-400 transition-colors">
                    • রেস্তোরাঁ ও পাইকারি হাব (B2B Bulk)
                  </button>
                </li>
                <li>
                  <button onClick={() => handleRoleChange('farmer')} className="hover:text-amber-300 transition-colors">
                    • কৃষক লিস্টিং ও পেমেন্ট (Farmer Portal)
                  </button>
                </li>
                <li>
                  <button onClick={() => handleRoleChange('admin')} className="hover:text-teal-400 transition-colors">
                    • অ্যাডমিন ও ফাইন্যান্স ড্যাশবোর্ড (Super Admin)
                  </button>
                </li>
              </ul>
            </div>

            {/* Col 4: Contact & Help */}
            <div className="space-y-2.5 text-xs">
              <h4 className="font-bold text-white uppercase tracking-wider text-[11px]">
                {isBn ? 'যোগাযোগ ও সাপোর্ট' : 'Support & Hotline'}
              </h4>
              <div className="space-y-1.5 text-slate-400">
                <div className="flex items-center gap-2">
                  <Phone className="w-3.5 h-3.5 text-emerald-400" />
                  <span>09612-AGRO-X (24/7 Krishi Helpline)</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="w-3.5 h-3.5 text-emerald-400" />
                  <span>support@agrolink-ai.com</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Tejgaon Commercial Area, Dhaka-1208</span>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-slate-800 text-center text-[11px] text-slate-500 flex flex-col sm:flex-row justify-between items-center gap-2">
            <span>© 2026 AgroLink AI X (অ্যাগ্রোলিংক এআই এক্স). All rights reserved.</span>
            <span className="flex items-center gap-1 text-slate-400">
              Built for Bangladeshi Farmers & Consumers • 4% Transparent Fee
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
}

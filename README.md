# AgroLink AI X (অ্যাগ্রোলিংক এআই এক্স) 🌾🌱

> **AI-Powered B2B & D2C Agricultural Marketplace connecting local Bangladeshi farmers directly with consumers and commercial buyers.**  
> *কৃষক থেকে সরাসরি ঘরে ও ব্যবসায় তাজা ও খাঁটি কৃষিপণ্য — মধ্যস্বত্বভোগীমুক্ত স্মার্ট কৃষি সাপ্লাই চেইন।*

---

## 🌟 Overview (প্রকল্প পরিচিতি)

**AgroLink AI X** is a production-ready agricultural marketplace designed to revolutionize Bangladesh's agricultural supply chain. By eliminating excessive intermediaries and offering a transparent **4% platform fee**, it empowers:
- **D2C Households**: Fresh, Grade-A harvest produce at fair farm-gate prices.
- **B2B Commercial Buyers (Restaurants, Hotels, Grocers)**: High-volume bulk tiers, automated tax-compliant proforma quotations, and scheduled recurring morning deliveries.
- **Farmers / Producers**: 96% direct net payouts, simple 1-click crop listing, AI market price advisory, and digital cold-truck dispatch.
- **Platform Administrators**: Real-time GMV tracking, Month-5 break-even trajectory analytics, and an interactive 10 Lakh @ 7% loan amortization calculator.

---

## 🚀 Key Modules & Capabilities (প্রধান বৈশিষ্ট্যসমূহ)

### 1. 🛒 Dual Purchasing Mode (খুচরা ও পাইকারি ক্রয়)
- **Retail (D2C)**: Everyday household shopping starting from 1 KG / piece / dozen with zone-based cold deliveries.
- **B2B Bulk Wholesale**: Unlocks volume discounts with Minimum Order Quantity (MOQ) thresholds (e.g., 20+ KG), saving 15% to 30% against conventional wholesale market rates.

### 2. 🏢 B2B Commercial Procurement Hub
- **Automated Quotation Generator**: Creates printable and downloadable proforma invoices complete with company details, delivery terms, itemized tables, volume discounts, and authorized seals.
- **Tiered Bulk Discount Matrix**: Multi-tier breakdown (e.g., 1-19 KG, 20-99 KG, 100+ KG) with dynamic price calculation.
- **Recurring Supply Contracts**: Pre-scheduled deliveries (daily at 7:00 AM, twice-weekly, or weekly) to ensure commercial kitchens never face stockouts.

### 3. 👨‍🌾 Farmer & Producer Portal (কৃষক পোর্টাল)
- **Transparent Payouts**: Clear breakdown showing Gross GMV, 4% AgroLink service fee, and 96% direct farmer net share.
- **AI Krishi Price Advisor**: Real-time pricing recommendations based on Karwan Bazar and Bogura Mandi arrival indices.
- **Order Queue & Dispatch**: Accept orders and generate digital QR tags for cold-storage transport loading.

### 4. 📊 Super Admin & Financial Intelligence (আর্থিক ড্যাশবোর্ড)
- **Financial Counters**: Live tracking of Gross Merchandise Value (GMV), 4% Commission, Hub OpEx, and Net Profit Margins.
- **Month-5 Break-Even Graph**: Interactive Recharts visual graph plotting the 12-month operational trajectory reaching profitability at Month 5.
- **Bank Loan Amortization Calculator**: Interactive simulation of a ৳10,00,000 (10 Lakh) loan at 7% for 5 years (~৳19,801/month EMI tracker) with dynamic principal vs. interest breakdown charts.

### 5. 🤖 AI Market Intelligence Assistant
- Smart search across authentic Bangladeshi produce (বগুড়ার ডায়মন্ড আলু, পাবনার দেশি পেঁয়াজ, দিনাজপুর মিনিকেট চাল, মেহেরপুরের রসুন, ইত্যা.).
- Conversational assistant for catering calculations, mandi price trends, and storage advisory.

---

## 🛠️ Tech Stack (প্রযুক্তি)

| Category | Technologies |
|---|---|
| **Frontend Framework** | React 19, TypeScript |
| **Build & Dev Tooling** | Vite 8, Bun / Node.js |
| **Styling & Design System** | Tailwind CSS v4, Lucide Icons |
| **Typography** | Hind Siliguri (Bengali) + Inter (English Numbers & UI) |
| **Data Visualization** | Recharts (Area & Bar Charts) |
| **Micro-Interactions** | Canvas-Confetti, CSS animations |

---

## 📂 Project Structure (প্রজেক্ট কাঠামো)

```
agrolink-ai-x/
├── .github/
│   └── workflows/
│       └── ci.yml              # Automated build & type-check CI workflow
├── src/
│   ├── components/
│   │   ├── Header.tsx                  # Mandi ticker, search, zone & persona switcher
│   │   ├── MarketplaceHero.tsx         # Hero banner, dual mode toggle & categories
│   │   ├── ProductCard.tsx             # Produce card with dual pricing tiers & MOQ
│   │   ├── ProductDetailModal.tsx      # Provenance details & dynamic tier calculator
│   │   ├── B2BCommercialHub.tsx        # Quotation generator & bulk discount matrix
│   │   ├── FarmerPortal.tsx            # Farmer onboarding, AI pricing & dispatch
│   │   ├── AdminFinancialDashboard.tsx # GMV, breakeven graph & loan amortization
│   │   ├── CartDrawer.tsx              # Itemized D2C vs B2B breakdown & checkout
│   │   └── AIAdvisorModal.tsx          # AI Market Intelligence conversational tool
│   ├── data/
│   │   └── mockData.ts                 # Authentic Bangladeshi produce & financial datasets
│   ├── types/
│   │   └── index.ts                    # TypeScript models & role definitions
│   ├── utils/
│   │   └── formatters.ts               # Currency (৳) formatter & loan amortization math
│   ├── App.tsx                         # Core application controller
│   ├── index.css                       # Global styles & Tailwind CSS v4 imports
│   └── main.tsx                        # React application root
├── index.html                          # HTML entry point with Bengali Google Fonts
├── metadata.json                       # Applet configuration & metadata
├── package.json                        # Dependencies & scripts
├── tsconfig.json                       # TypeScript compiler configuration
└── vite.config.ts                      # Vite configuration
```

---

## ⚡ Getting Started (কীভাবে রান করবেন)

### 1. Clone the repository
```bash
git clone https://github.com/<your-username>/agrolink-ai-x.git
cd agrolink-ai-x
```

### 2. Install dependencies
```bash
npm install
```

### 3. Start development server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 4. Build for production
```bash
npm run build
```

### 5. Type-checking & Linting
```bash
npm run lint
```

---

## 🤝 Contributing (অবদান)

Contributions are welcome! Please feel free to submit a Pull Request or open an Issue for feature suggestions, regional mandi data enhancements, or UI improvements.

---

## 📄 License (লাইসেন্স)

Distributed under the Apache 2.0 License.

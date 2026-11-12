export type UserRole = 'd2c' | 'b2b' | 'farmer' | 'admin';

export type Language = 'bn' | 'en';

export type ProductCategory = 
  | 'all'
  | 'vegetables'
  | 'grains'
  | 'spices'
  | 'fruits'
  | 'dairy_eggs'
  | 'poultry_fish';

export interface BulkTier {
  minQty: number;
  pricePerUnit: number;
  savingsPercent: number;
  labelBn: string;
  labelEn: string;
}

export interface Product {
  id: string;
  nameBn: string;
  nameEn: string;
  category: ProductCategory;
  image: string;
  farmerNameBn: string;
  farmerNameEn: string;
  farmLocationBn: string;
  farmLocationEn: string;
  district: string;
  farmerPhone: string;
  farmerRating: number;
  isVerified: boolean;
  unitBn: string;
  unitEn: string;
  retailPrice: number; // ৳ per unit (1-4 or 1-19 kg)
  bulkPrice: number;   // ৳ per unit wholesale
  bulkTiers: BulkTier[];
  moq: number; // Minimum Order Quantity for B2B bulk tier
  stockKg: number;
  harvestDateBn: string;
  harvestDateEn: string;
  shelfLifeDays: number;
  qualityGrade: 'A+' | 'A' | 'B+';
  organicCert: boolean;
  descriptionBn: string;
  descriptionEn: string;
  estimatedDeliveryHours: number;
  badge?: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
  mode: 'retail' | 'bulk';
  appliedPrice: number;
}

export interface B2BQuotationItem {
  productId: string;
  nameBn: string;
  nameEn: string;
  quantity: number;
  unitBn: string;
  unitEn: string;
  unitPrice: number;
  total: number;
}

export interface B2BQuotation {
  quoteId: string;
  companyName: string;
  buyerType: 'restaurant' | 'grocery' | 'hotel' | 'caterer' | 'institution';
  contactPerson: string;
  phone: string;
  email: string;
  deliveryAddress: string;
  zone: string;
  items: B2BQuotationItem[];
  subtotal: number;
  bulkDiscount: number;
  logisticsFee: number;
  estimatedTax: number;
  totalAmount: number;
  paymentTerms: 'cod' | 'net7' | 'net15' | 'advance';
  recurringSchedule: 'none' | 'daily' | 'twice_weekly' | 'weekly';
  notes: string;
  createdDate: string;
  status: 'draft' | 'submitted' | 'approved';
}

export interface FarmerListing {
  id: string;
  productNameBn: string;
  category: ProductCategory;
  harvestQuantity: number;
  unit: string;
  suggestedPrice: number;
  farmerAskingPrice: number;
  bulkDiscountPrice: number;
  harvestDate: string;
  status: 'live' | 'pending_qa' | 'sold';
  ordersReceived: number;
}

export interface OrderRecord {
  id: string;
  customerName: string;
  customerType: 'Retail (D2C)' | 'Restaurant (B2B)' | 'Grocery (B2B)';
  itemsCount: number;
  totalAmount: number;
  commission: number; // 4%
  date: string;
  status: 'Delivered' | 'In Transit' | 'Processing' | 'Pending Dispatch';
  deliveryHub: string;
}

export interface Product {
  id: number;
  price: string;
  title: string;
  description: string;
  average_rating: number | null;
  discount: string;
  stock_total: number;
  sold_quantity: number;
  brand: number;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}

export interface SaleItem {
  id: number;
  quantity: number;
  products: {
    id: number;
    title: string;
    price: number;
    description: string;
    product_image: string[];
  };
}

export interface Addresses {
  id: number;
  street: string;
  number: string;
  additional_info: string;
  neighborhood: string;
  city: string;
  state: string;
  zip_code: string;
  country: string;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}

export interface PaymentMethods {
  id: number;
  method_name: string;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}

export interface Sale {
  id: number;
  sale_date: string;
  payment_method_id: number;
  buyer_user_id: number;
  total_value: string;
  status: string;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
  transaction_id: number;
  shipment_date: string;
  shipment_id: string;
  adress_id: number;
  sale_items: SaleItem[];
  items: SaleItem[];
  quantity: number;
  addresses: Addresses;
  payment_methods: PaymentMethods;
  users: { name: string; };
  deliveryValue: number;
}

export interface ProductImage {
  id: number;
  url: string;
  created_date: string;
  deleted_date: string | null;
  updated_date: string;
  product_id: number;
}

interface ProductColor {
  id: number;
  product_id: number;
  color_id: number;
  created_date: string;
  deleted_date: string | null;
  updated_date: string;
}

interface ProductCategory {
  id: number;
  name: string;
}

export interface Product {
  id: number;
  brand: number;
  description: string;
  discount: string;
  price: string;
  product_image: ProductImage[];
  product_colors: ProductColor[];
  title: string;
  stock_total: number;
  product_categories: ProductCategory[];
}

export interface ResponseProducts {
  products: Product[];
  totalPages: number;
}

export interface CreateProductInterface {
  title: string;
  description: string;
  categories: number[];
  colors: number[];
  discount: number;
  brand: string;
  price: number;
  stock_total: number;
  images?: string[];
}

export interface SalesDays {
  [key: string]: string;
}

export interface MonthSales {
  total: string;
  days: SalesDays;
}

export interface GetSalesGraphResponse {
  currentMonth: MonthSales;
  previousMonth: MonthSales;
}

import api from "./api";

interface SalesDays {
  [key: string]: string;
}

interface MonthSales {
  total: string;
  days: SalesDays;
}

interface GetSalesGraphResponse {
  currentMonth: MonthSales;
  previousMonth: MonthSales;
}

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
  users: {
    name: string;
  }
}

export const getSalesGraph = async () => {
  const { data } = await api.get<GetSalesGraphResponse>("/admin/get-status");
  return data;
};

export const getTopSelling = async () => {
  const { data } = await api.get<Product[]>("/admin/get-top-selling");
  return data;
};

export const getRecentSales = async () => {
  const { data } = await api.get("/admin/get-recent-sales");
  return data;
};

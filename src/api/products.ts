import api from "./api";

interface ProductImage {
  id: number;
  url: string;
  created_date: string;
  deleted_date: string | null;
  updated_date: string;
  product_id: number;
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
  title: string;
  stock_total: number;
  product_categories: ProductCategory[];
}

interface ResponseProducts {
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
  images: string[];
}

export const getProducts = async (page: number, pageSize: number) => {
  const { data } = await api.get<ResponseProducts>(`/admin/list-products?page=${page}&pageSize=${pageSize}`);
  return data;
};

export const searchProducts = async (searchedText: string) => {
  const { data } = await api.get<ResponseProducts>(`/admin/search-products?text=${searchedText}`);
  return data;
};

export const deleteProduct = async (product_id: number) => {
  const { data } = await api.delete(`/admin/delete-product/${product_id}`);
  return data;
};

export const createProduct = async (product: CreateProductInterface) => {
  const { data } = await api.post(`/admin/create-product`, {
    ...product
  });
  return data;
};
import api from "./api";

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
  product_colors: ProductColor[]
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
  const { data } = await api.post<ResponseProducts>(`/admin/list-products?page=${page}&pageSize=${pageSize}`);
  return data;
};

export const searchProducts = async (searchedText: string, page: number, pageSize: number) => {
  const { data } = await api.post<ResponseProducts>(`/admin/list-products?page=${page}&pageSize=${pageSize}`, { search: searchedText });
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

export const getProductById = async (product_id: number) => {
  const { data } = await api.get<Product>(`/admin/get-product/${product_id}`);
  return data;
};

export const updateProductById = async (product_id: number, product_updated: Product) => {
  const { data } = await api.put(`/admin/get-product/${product_id}`, {
    data: {
      price: product_updated.price,
      title: product_updated.title,
      description: product_updated.description,
      discount: product_updated.discount,
      stock_total: product_updated.stock_total,
      brand: product_updated.brand,
    }
  });
  return data;
};

export const deleteProductImageById = async (image_id: number) => {
  const { data } = await api.delete(`/admin/delete-product-images`, {
    data: {
      product_image_id: image_id
    }
  });
  return data;
};

export const createProductImageById = async (product_id: number, image_id: number) => {
  const { data } = await api.post(`/admin/create-product-images`, {
    data: {
      product_id: product_id,
      data: image_id,
    }
  });
  return data;
};

import api from "./api";
import { Product, CreateProductInterface, ResponseProducts } from "./interfaces";

export const getProducts = async (page: number, pageSize: number) => {
  const { data } = await api.post<ResponseProducts>(
    `/admin/list-products?page=${page}&pageSize=${pageSize}`
  );
  return data;
};

export const searchProducts = async (
  searchedText: string,
  page: number,
  pageSize: number
) => {
  const { data } = await api.post<ResponseProducts>(
    `/admin/list-products?page=${page}&pageSize=${pageSize}`,
    { search: searchedText }
  );
  return data;
};

export const deleteProduct = async (product_id: number) => {
  const { data } = await api.delete(`/admin/delete-product/${product_id}`);
  return data;
};

export const createProduct = async (product: CreateProductInterface) => {
  const { data } = await api.post(`/admin/create-product`, {
    ...product,
  });
  return data;
};

export const getProductById = async (product_id: number) => {
  const { data } = await api.get<Product>(`/admin/get-product/${product_id}`);
  return data;
};

export const updateProductById = async (
  product_id: number,
  product_updated: CreateProductInterface
) => {
  const { data } = await api.put(`/admin/update-product/${product_id}`, {
    data: {
      price: product_updated.price,
      title: product_updated.title,
      description: product_updated.description,
      discount: product_updated.discount,
      stock_total: product_updated.stock_total,
      brand: product_updated.brand,
    },
  });
  return data;
};

export const deleteProductImagesById = async (image_ids: number[]) => {
  const { data } = await api.delete(`/admin/delete-product-images`, {
    data: {
      product_image_id: image_ids,
    },
  });
  return data;
};

export const createProductImageById = async (
  product_id: number,
  images: string[]
) => {
  const { data } = await api.post(`/admin/create-product-images`, {
    data: images,
    product_id: product_id,
  });
  return data;
};

export const createProductCategory = async (
  category: string,
  type: string,
  parent: number
) => {
  const { data } = await api.post(`/admin/create-category`, {
    name: category,
    type: type,
    parent: parent,
  });
  return data;
};

export const createProductBrand = async (brand: string) => {
  const { data } = await api.post(`/admin/create-brand`, {
    name: brand,
  });
  return data;
};
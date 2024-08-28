import api from "./api";
import { GetSalesGraphResponse, Product } from "./interfaces";

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

export const getTotalUsers = async () => {
  const { data } = await api.get("/admin/get-total-users");
  return data;
};

import api from "./api";
import { Sale } from "./interfaces";

export const getSales = async () => {
  const { data } = await api.get<Array<Sale>>("/admin/get-sales");
  return data;
};

export const getSaleById = async (id: string) => {
  const { data } = await api.get<Sale>(`/admin/get-sales-by-id/${id}`);
  return data;
};

export const updateSaleWithDelivery = async (deliveryCode: string, saleId: string) => {
  const { data } = await api.post<{shipment_id: number, status: string}>(`/admin/update-sale-with-delivery-code/${deliveryCode}/${saleId}`);
  return data;
};
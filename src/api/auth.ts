import { encrypt } from "@/utils/encryptor";
import api from "./api";

export const authenticate = async (email: string, password: string) => {
  const { data } = await api.post("/admin/login", {
    email,
    password: encrypt(password),
  });

  if (!data.token) {
    throw new Error("Invalid credentials");
  }
  return data as { token: string };
};

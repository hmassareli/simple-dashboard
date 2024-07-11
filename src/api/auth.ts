import { encrypt } from "@/utils/encryptor";
import axios from "axios";

export const authenticate = async (email: string, password: string) => {
  const { data } = await axios.post("http://localhost:8000/admin/login", {
    email,
    password: encrypt(password),
  });

  if (!data.token) {
    throw new Error("Invalid credentials");
  }
  return data as { token: string };
};

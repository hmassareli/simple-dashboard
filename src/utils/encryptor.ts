import CryptoJS from "crypto-js";

export const encrypt = (data: string): string => {
  if (!import.meta.env.VITE_ENCRYPTED_KEY) {
    throw new Error("Please provide the encryption key");
  }
  const ciphertext = CryptoJS.AES.encrypt(
    data,
    import.meta.env.VITE_ENCRYPTED_KEY
  ).toString();
  return ciphertext;
};

export const decrypt = (text: string): string => {
  try {
    if (!import.meta.env.VITE_ENCRYPTED_KEY) {
      throw new Error("Please provide he encryption key");
    }
    const bytes = CryptoJS.AES.decrypt(
      text,
      import.meta.env.VITE_ENCRYPTED_KEY
    );
    const originalText = bytes.toString(CryptoJS.enc.Utf8);
    return originalText;
  } catch (error) {
    console.error("Error decrypting:", error);
    return "";
  }
};

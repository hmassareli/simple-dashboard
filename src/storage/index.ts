import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

if (!import.meta.env.VITE_FIREBASE_STORAGE_KEY) {
  throw new Error("Please provide the firebase storage key");
}

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_STORAGE_KEY,
  authDomain: "toy-city-70596.firebaseapp.com",
  projectId: "toy-city-70596",
  storageBucket: "toy-city-70596.appspot.com",
  messagingSenderId: "323281626212",
  appId: "1:323281626212:web:a60c64453667c9daa66b71",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const imageDb = getStorage(app);

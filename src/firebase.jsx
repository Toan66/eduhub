import { initializeApp } from "firebase/app";
import {getStorage} from "firebase/storage"

const firebaseConfig = {
  apiKey: "AIzaSyCrLVAnmwhaPdJM9kXcuUAeP5v5x--Jy4w",
  authDomain: "eduhub-598c1.firebaseapp.com",
  projectId: "eduhub-598c1",
  storageBucket: "eduhub-598c1.appspot.com",
  messagingSenderId: "871779988076",
  appId: "1:871779988076:web:9a4b3f792dda83f9475e49"
};

const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);

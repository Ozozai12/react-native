import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import {
  initializeAuth,
  getReactNativePersistence,
} from "firebase/auth/react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const firebaseConfig = {
  apiKey: "AIzaSyCmSD9Fz7LFqJ15VyFc6UgQv6pO1sJXYEk",
  authDomain: "react-native-test-f681f.firebaseapp.com",
  projectId: "react-native-test-f681f",
  storageBucket: "react-native-test-f681f.appspot.com",
  messagingSenderId: "324294554180",
  appId: "1:324294554180:web:74bbb436db2f0a82550211",
  measurementId: "G-C6KJR2C1TY",
};

const app = initializeApp(firebaseConfig);

const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});
export { auth };

export const db = getFirestore(app);

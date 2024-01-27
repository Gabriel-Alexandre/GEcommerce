import { getAuth } from "firebase/auth";
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
    apiKey: "AIzaSyDI1r3rO4Pho_gmuwSvQV_T-oA_vLvFOVU",
    authDomain: "gecommerce-55d6b.firebaseapp.com",
    projectId: "gecommerce-55d6b",
    storageBucket: "gecommerce-55d6b.appspot.com",
    messagingSenderId: "229745339908",
    appId: "1:229745339908:web:bebab55a1663ed971b4f51",
    measurementId: "G-KBV81436Z0"
  };
  
// Initialize Firebase
initializeApp(firebaseConfig);
//   const analytics = getAnalytics(app);
export const auth = getAuth();
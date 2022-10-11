import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCRDlVf3x_3r5jtEFVZ2Lutnzj84Nv_bTc",
  authDomain: "otp-app-demo-ce64b.firebaseapp.com",
  projectId: "otp-app-demo-ce64b",
  storageBucket: "otp-app-demo-ce64b.appspot.com",
  messagingSenderId: "833918803407",
  appId: "1:833918803407:web:74db0b88fa4e57153186ba",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export default app;

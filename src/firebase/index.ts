import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBV60lSb6Y1Y8ojVOR4zYn6NBz5U-cd9x4",
  authDomain: "finance-manager-4d396.firebaseapp.com",
  projectId: "finance-manager-4d396",
  storageBucket: "finance-manager-4d396.appspot.com",
  messagingSenderId: "972635535553",
  appId: "1:972635535553:web:d57ed9013af32c2859fc40",
  measurementId: "G-S510X5YFW7",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);

// exports
export { analytics, auth };
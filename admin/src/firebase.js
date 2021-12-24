import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyCJFOAqkOcrbNU4WkKdE-cc_x8e1F2-eCM",
    authDomain: "netflix-clone-387e0.firebaseapp.com",
    projectId: "netflix-clone-387e0",
    storageBucket: "netflix-clone-387e0.appspot.com",
    messagingSenderId: "749818020040",
    appId: "1:749818020040:web:6f99d0f4570d8660b6e5fd",
    measurementId: "G-3M2YS7NTCV",
};

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

export default storage;

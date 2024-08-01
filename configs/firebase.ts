import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage";
import { collection, getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBJiDWsAgDGxKiS_cFhaljyYk7Fo2Yu_EQ",
  authDomain: "directoryb-ddfe5.firebaseapp.com",
  projectId: "directoryb-ddfe5",
  storageBucket: "directoryb-ddfe5.appspot.com",
  messagingSenderId: "592699400888",
  appId: "1:592699400888:web:522789de247680511e0a4d",
  measurementId: "G-QGV6ZB3EL4"
};

export const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

export const BusinessCollection = collection(db, 'BusinessLists')
export const CategoryCollection = collection(db, 'Categories')
export const SliderCollection = collection(db, 'Sliders')
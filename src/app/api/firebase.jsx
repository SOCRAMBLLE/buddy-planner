// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  getDocs,
  where,
  query,
  addDoc,
} from "firebase/firestore";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_apiKey,
  authDomain: import.meta.env.VITE_authDomain,
  projectId: import.meta.env.VITE_projectId,
  storageBucket: import.meta.env.VITE_storageBucket,
  messagingSenderId: import.meta.env.VITE_messagingSenderId,
  appId: import.meta.env.VITE_appId,
};

// Initialize Firebase
export const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp);
export const petsCollectionRef = collection(db, "pets");

export const getPets = async () => {
  const snapshot = await getDocs(petsCollectionRef);
  return snapshot.docs.map((doc) => doc.data());
};

export const queryPets = async (userID) => {
  const snapshot = await query(
    petsCollectionRef,
    where("userID", "==", userID)
  );
  const querySnapshot = await getDocs(snapshot);
  return querySnapshot.docs.map((doc) => doc.data());
};

export const addPet = async (pet) => {
  try {
    await addDoc(petsCollectionRef, pet);
    return { success: true };
  } catch (error) {
    throw new Error(error);
  }
};

export const uploadPhoto = async (file) => {
  const storage = getStorage(firebaseApp);
  const storageRef = ref(storage, "pets/" + file.name);
  await uploadBytes(storageRef, file);
  const photoURL = await getDownloadURL(storageRef);
  return photoURL;
};

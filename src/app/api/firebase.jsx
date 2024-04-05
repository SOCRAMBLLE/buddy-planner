// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  getDocs,
  where,
  query,
  addDoc,
  deleteDoc,
  doc,
  updateDoc,
  getDoc,
  arrayRemove,
} from "firebase/firestore";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import { readAndCompressImage } from "browser-image-resizer";
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
export const usersCollectionRef = collection(db, "users");

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
  return querySnapshot.docs.map((doc) => ({ id: doc.id, data: doc.data() }));
};

export const getPet = async (id) => {
  const pet = doc(petsCollectionRef, id);
  const snapshot = await getDoc(pet);
  const data = {
    id: snapshot.id,
    data: snapshot.data(),
  };
  return data;
};

export const addPet = async (pet, id) => {
  try {
    await addDoc(petsCollectionRef, pet, id);
    return { success: true };
  } catch (error) {
    throw new Error(error);
  }
};

const resizeConfig = {
  quality: 0.9,
  maxWidth: 800,
  maxHeight: 800,
  autoRotate: true,
};
export const uploadUserPhoto = async (file) => {
  try {
    const storage = getStorage(firebaseApp);
    const resizePhoto = await readAndCompressImage(file, resizeConfig);
    const storageRef = ref(storage, "users/" + file.name);
    await uploadBytes(storageRef, resizePhoto);
    const photoURL = await getDownloadURL(storageRef);
    return photoURL;
  } catch (err) {
    throw new Error(err);
  }
};

export const uploadPetPhoto = async (file) => {
  try {
    const storage = getStorage(firebaseApp);
    const resizePhoto = await readAndCompressImage(file, resizeConfig);
    const storageRef = ref(storage, "pets/" + file.name);
    await uploadBytes(storageRef, resizePhoto);
    const photoURL = await getDownloadURL(storageRef);
    return photoURL;
  } catch (err) {
    throw new Error(err);
  }
};

export const editPet = async (id, json) => {
  try {
    const pet = doc(petsCollectionRef, id);
    await updateDoc(pet, json);

    return { message: "File with the id" + id + " was modified successfully." };
  } catch (err) {
    throw new Error(err);
  }
};

export const deletePet = async (id) => {
  try {
    await deleteDoc(doc(petsCollectionRef, id));
    return { message: "File with the id" + id + " was deleted successfully." };
  } catch (err) {
    throw new Error(err);
  }
};

export const fetchTasks = async (id) => {
  const sortTasks = (tasks) => {
    return tasks.sort((a, b) => {
      if (a.done !== b.done) {
        return a.done ? 1 : -1;
      }

      return new Date(b.createdAt) - new Date(a.createdAt);
    });
  };
  try {
    const user = doc(usersCollectionRef, id);
    const snapshot = await getDoc(user);
    const userData = snapshot.data();
    const data = {
      id: snapshot.id,
      tasks: sortTasks(userData.Tasks),
    };
    return data;
  } catch (err) {
    throw new Error(err);
  }
};

export const updateTasks = async (userid, json) => {
  try {
    const tasks = { Tasks: json };
    const userCollection = doc(usersCollectionRef, userid);
    const response = await updateDoc(userCollection, tasks);
    return { success: true, response: response };
  } catch (error) {
    throw new Error(error);
  }
};

export const deleteTask = async (userid, taskid) => {
  const userDoc = doc(usersCollectionRef, userid);
  const docSnap = await getDoc(userDoc);
  if (docSnap.exists()) {
    const userData = docSnap.data();
    const updatedTasks = userData.Tasks.filter((task) => task.id !== taskid);

    await updateDoc(userDoc, {
      Tasks: updatedTasks,
    });
  } else {
    console.log("No such document!");
  }
};

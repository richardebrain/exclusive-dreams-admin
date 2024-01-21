import { create } from "domain";
import { getAnalytics } from "firebase/analytics";
import { initializeApp } from "firebase/app";
import { getStorage, ref } from "firebase/storage";
import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
  updateEmail,
  updatePassword,
} from "firebase/auth";
import {
  DocumentData,
  DocumentReference,
  collection,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  query,
  serverTimestamp,
  setDoc,
  where,
} from "firebase/firestore";
import { AdminType, RegisterAdminForm } from "./type";
import { toast } from "react-toastify";

const firebaseConfig = {
  apiKey: "AIzaSyDWlcN0YzJQK57_nhENEgWjygznoiEhS1Q",
  authDomain: "exclusive-dream.firebaseapp.com",
  projectId: "exclusive-dream",
  storageBucket: "exclusive-dream.appspot.com",
  messagingSenderId: "873308823627",
  appId: "1:873308823627:web:2e739f3907cfa46cbcadce",
  measurementId: "G-VFZGYVVGYQ",
};
const app = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getFirestore();
const adminsCollection = collection(db, "admins");

export const createBasicAdminWithEmail = async (data: RegisterAdminForm) => {
  const admin = await createUserWithEmailAndPassword(
    auth,
    data.email,
    data.password
  )
    .then((userCredential) => {
      // Signed in
      const admin = userCredential.user;
      return admin;
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      // ..
      if (errorCode === "auth/email-already-in-use") {
        toast.error("Email already in use, please sign in");
        return;
      }
    });
  if (admin && admin.uid) {
    const adminRef = doc(adminsCollection, admin.uid);
    const adminSnap = await getDoc(adminRef);
    if (adminSnap.exists()) {
      toast.error("admin already exists, please sign in");
      return;
    } else {
      const { email, password, confirmPassword, ...rest } = data;
      try {
        await setDoc(adminRef, {
          email: admin.email,
          uid: admin.uid,
          ...rest,
          createdAt: serverTimestamp(),
        });
        toast.success("admin created successfully");
        return admin;
      } catch (error) {
        console.log(error, "error creating admin in db");
        return;
      }
    }
  }
};

export const getAdminFromDb = async (uid: string) => {
  const adminRef = doc(adminsCollection, uid);
  const adminSnap = await getDoc(adminRef);
  if (adminSnap.exists()) {
    const { createdAt, ...rest } = adminSnap.data();
    return {
      ...rest,
    };
  } else {
    return;
  }
};

export const signInAdminWithEmail = async (email: string, password: string) => {
  const admin = await signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in
      const admin = userCredential.user;
      return admin;
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      // ..
      if (errorCode === "auth/wrong-password") {
        toast.error("Wrong password.");
      } else if (errorCode === "auth/user-not-found") {
        toast.error("User not found.");
      }
      return;
    });
  if (admin && admin.uid) {
    const adminRef = doc(adminsCollection, admin.uid);
    const adminSnap = await getDoc(adminRef);
    if (adminSnap.exists()) {
      const { createdAt, ...rest } = adminSnap.data();
      toast.success("admin signed in successfully");
      return {
        ...rest as AdminType
      };
    } else {
      toast.error("admin not found");
      return;
    }
  }
};

export const signOutAdmin = async () => {
  try {
    await auth.signOut();
    toast.success("admin signed out successfully");
  } catch (error) {
    console.log(error, "error signing out admin");
  }
};
const storage = getStorage();
const storageRef = ref(storage, "images");
import { create } from "domain";
import { getAnalytics } from "firebase/analytics";
import { initializeApp } from "firebase/app";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
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
  addDoc,
  collection,
  collectionGroup,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  orderBy,
  query,
  serverTimestamp,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";
import {
  AddProductForm,
  AdminType,
  OrderType,
  RegisterAdminForm,
  UploadProductType,
  User,
} from "./type";
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
export const auth = getAuth();
const db = getFirestore();
const adminsCollection = collection(db, "admins");
const userDbCollection = collection(db, "users");
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
      console.log(errorCode, errorMessage, "error creating admin");
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
          role: "admin",
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
      if (rest.role !== "admin") {
        toast.error("User with this email can't sign in as admin");
        await auth.signOut();
        return;
      }
      toast.success("admin signed in successfully");
      return {
        ...(rest as AdminType),
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
export const uploadImage = async (image: File) => {
  const imageRef = ref(storageRef, image.name);
  const returnUrl = await uploadBytes(imageRef, image).then(
    async (snapshot) => {
      if (snapshot) {
        const downloadUrl = await getDownloadURL(snapshot.ref);
        return downloadUrl;
      }
    }
  );
  if (!returnUrl) return;
  return returnUrl;
};
// store db
const storeCollections = collection(db, "store");

export const addProductToStore = async (
  data: Omit<UploadProductType, "href" | "productId">
) => {
  const productRef = doc(storeCollections);
  const productSnap = await getDoc(productRef);
  if (productSnap.exists()) {
    toast.error("product already exists");
    return;
  }
  try {
    await setDoc(productRef, {
      ...data,
      productId: productRef.id,
      href: productRef.id,
      createdAt: serverTimestamp(),
    });
    toast.success("product added successfully");
    return;
  } catch (error) {
    console.log(error, "error adding product to store");
    return;
  }
};

export const updateProductInStore = async (
  productId: string,
  data: Omit<
    UploadProductType,
    "href" | "productId" | "imageUrl" | "productBrand"
  >
) => {
  const productRef = doc(storeCollections, productId);
  console.log(data, "data in store")
  try {
    await updateDoc(productRef, {
      ...data,
      updatedAt: new Date().toLocaleDateString(),
    });
    toast.success("product updated successfully");
    return;
  } catch (error) {
    console.log(error, "error updating product in store");
    return;
  }
};
export const getAllProducts = async () => {
  const products = await getDocs(storeCollections);
  const productsList = products.docs.map((doc) => {
    const { createdAt, ...rest } = doc.data();
    return {
      ...(rest as UploadProductType),
    };
  });
  return productsList;
};
export const getSingleProduct = async (productId: string) => {
  const productRef = doc(storeCollections, productId);
  const productSnap = await getDoc(productRef);
  if (productSnap.exists()) {
    const { createdAt, ...rest } = productSnap.data();
    return {
      ...(rest as UploadProductType),
    };
  } else {
    return;
  }
};
export const deleteProductFromDb= async (productId:string)=>{
  const productRef = doc(storeCollections,productId)
  const productSnap = await getDoc(productRef)
  if(productSnap.exists()){
    await deleteDoc(productRef)
  }
}

const ordersCollections = collection(db, "orders");
export const getAllOrders = async () => {
  const queries = query(collectionGroup(db, "orders"));
  const orders = await getDocs(queries);
  const ordersList = orders.docs.map((doc) => {
    const userId = doc.ref.parent.parent?.id;
    return {
      ...doc.data(),
      userId,
    };
  }) as OrderType[];
  return ordersList;
};

export const updateOrderStatus = async (
  userId: string,
  orderId: string,
  deliveryStatus: string,
  status?: string
) => {
  const orderRef = doc(collection(db, "orders", userId, "orders"), orderId);
  try {
    if (status) {
      await setDoc(orderRef, { status, deliveryStatus }, { merge: true });
      toast.success("order status updated successfully");
      return {
        success: true,
      };
    }
    await setDoc(orderRef, { deliveryStatus }, { merge: true });
    toast.success("order status updated successfully");
    return {
      success: true,
    };
  } catch (error) {
    console.log(error, "error updating order status");
    return {
      success: false,
    };
  }
};

export const getAllUsersDb = async () => {
  const users = await getDocs(userDbCollection);
  const usersList = users.docs.map((doc) => {
    const { createdAt, ...rest } = doc.data();

    return {
      ...rest,
    };
  }) as User[];
  return usersList;
};
export const getUserFromDb = async (uid: string) => {
  const userRef = doc(userDbCollection, uid);
  const userSnap = await getDoc(userRef);
  if (userSnap.exists()) {
    const { createdAt, ...rest } = userSnap.data();
    return {
      ...rest,
    };
  } else {
    return;
  }
};
export const getUserOrderFromDb = async (uid: string) => {
  const userOrdersRef = collection(db, "orders", uid, "orders");
  const userOrders = await getDocs(userOrdersRef);
  const userOrdersList = userOrders.docs.map((doc) => {
    return {
      ...doc.data(),
    };
  }) as OrderType[];
  return userOrdersList;
};

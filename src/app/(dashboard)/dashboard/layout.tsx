"use client";
import { setAdmin } from "@/redux/admin.slice";
import { useAppDispatch, useAppSelector } from "@/redux/type";
import { auth, getAdminFromDb } from "@/utils/firebase";
import { onAuthStateChanged } from "firebase/auth";
import React, { useEffect } from "react";

const Layout = ({ children }: { children: React.ReactNode }) => {
  const { admin } = useAppSelector((state) => state.admin);
  const dispatch = useAppDispatch();
  useEffect(() => {
    const subscribe = onAuthStateChanged(auth, async (userAuth) => {
      if (userAuth) {
        const adminRef = await getAdminFromDb(userAuth.uid)!;
        console.log(adminRef, "userRef");
        if (!admin && adminRef) {
          dispatch(setAdmin(adminRef));
        }
      }
    });
    return () => subscribe();
  }, []);
  return <div>{children}</div>;
};

export default Layout;

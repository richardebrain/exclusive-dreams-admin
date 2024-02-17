"use client";
import { setAdmin } from "@/redux/admin.slice";
import { useAppDispatch, useAppSelector } from "@/redux/type";
import { auth, getAdminFromDb } from "@/utils/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

const Layout = ({ children }: { children: React.ReactNode }) => {
  const { admin } = useAppSelector((state) => state.admin);
  const dispatch = useAppDispatch();
  const router = useRouter();
  useEffect(() => {
    const subscribe = onAuthStateChanged(auth, async (userAuth) => {
      if (userAuth) {
        const adminRef = await getAdminFromDb(userAuth.uid)!;
        if (!admin || adminRef) {
          dispatch(setAdmin(adminRef));
        }
      } else {
        dispatch(setAdmin(null));
      }
    });
    return () => subscribe();
  }, []);

  useEffect(() => {
    if (!admin) {
      router.push("/login");
    }
  }, [admin]);
  return <div>{children}</div>;
};

export default Layout;

"use client";
import store from "@/redux/store";
import React from "react";
import { Provider } from "react-redux";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ProviderWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <Provider store={store}>
        {children}
        <ToastContainer />
      </Provider>
    </div>
  );
};

export default ProviderWrapper;

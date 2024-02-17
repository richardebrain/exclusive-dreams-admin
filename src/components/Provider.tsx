"use client";
import { persistor, store } from "@/redux/store";
import React from "react";
import { Provider } from "react-redux";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { PersistGate } from "redux-persist/integration/react";

const ProviderWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <Provider store={store}>
        <PersistGate persistor={persistor} loading={null}>
          {children}
        </PersistGate>
        <ToastContainer />
      </Provider>
    </div>
  );
};

export default ProviderWrapper;

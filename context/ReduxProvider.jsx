"use client";
import RequestLoading from "@/loaders/RequestLoading";
// import AppLoader from "@/components/loaders/AppLoader";
import { store } from "@/redux/store";
import { useEffect } from "react";
import { Provider } from "react-redux";
import { persistStore } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";

const persistor = typeof window !== null ? persistStore(store) : null;

const ReduxProvider = ({ children }) => {
  useEffect(() => {
    // document.body.style.zoom = "75%";
    // document.body.style.height = "100vh";
  }, []);
  return (
    <Provider store={store}>
      <PersistGate loading={<RequestLoading />} persistor={persistor}>
        <div className="theme_prov_main_container">{children}</div>
      </PersistGate>
    </Provider>
  );
};

export default ReduxProvider;

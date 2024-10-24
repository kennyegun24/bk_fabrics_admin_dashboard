"use client";
import Nav from "@/components/nav/Nav";
import TopNav from "@/components/nav/TopNav";
import { createContext, useContext, useState } from "react";
import { SettingsContext } from "./Settings";
import RequestLoading from "@/loaders/RequestLoading";
import { usePathname } from "next/navigation";
import { Toaster } from "@/components/ui/sonner";

export const MainContext = createContext();

export const MainProvider = ({ children }) => {
  const [fullScreen, setFullScreen] = useState(false);
  const { ltr } = useContext(SettingsContext);
  const [loading, setLoading] = useState(false);
  const routesToIgnore = [
    "/login",
    "/register",
    "/forget_password",
    "/verify_email",
  ];
  // const TopNavRouteToIgnore = [
  //   "/login",
  //   "/register",
  //   "/forget_password",
  //   "/sales",
  //   "/customer",
  //   "/verify_email",
  //   "/organization",
  // ];

  const pathname = usePathname();
  const showNavBar = !routesToIgnore.some((route) =>
    pathname.startsWith(route)
  );

  // const showTopNavBar = !TopNavRouteToIgnore.some((route) =>
  //   pathname.startsWith(route)
  // );
  return (
    <MainContext.Provider value={{ setLoading }}>
      <Toaster richColors />
      <section className={`app_container ${ltr}`}>
        {loading && <RequestLoading />}
        {showNavBar && (
          <div className="app_nav">
            <Nav />
          </div>
        )}
        <div
          className={`app_children ${
            !showNavBar
              ? "full_screen"
              : fullScreen && ltr != "ltr"
              ? "full_screen"
              : fullScreen && ltr === "ltr"
              ? "full_screen_reverse"
              : "half_screen"
          }`}
        >
          {showNavBar && (
            <div className="app_top_nav">
              <TopNav setFullScreen={setFullScreen} />
            </div>
          )}
          {children}
        </div>
      </section>
    </MainContext.Provider>
  );
};

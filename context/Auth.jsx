"use client";
import { logout } from "@/redux/user";
import { useRouter } from "next/navigation";
import { createContext, useEffect } from "react";
import { useSelector } from "react-redux";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const router = useRouter();
  const { currentUser, loginDate } = useSelector((state) => state.user);
  function isMoreThanThreeDaysAgo(dateString) {
    const givenDate = new Date(dateString);
    const currentDate = new Date();
    const timeDifference = currentDate - givenDate;
    const daysDifference = timeDifference / (1000 * 60 * 60 * 24);
    return daysDifference > 3;
  }
  useEffect(() => {
    console.log(currentUser);
    console.log(loginDate);
    if (currentUser?.access_token) {
      if (isMoreThanThreeDaysAgo(loginDate)) {
        console.log("more");
        logout();
        router.push("/login");
        return;
      }
      return router.push("/");
    } else {
      router.push("/login");
    }
  }, [currentUser, loginDate]);
  return <AuthContext.Provider>{children}</AuthContext.Provider>;
};

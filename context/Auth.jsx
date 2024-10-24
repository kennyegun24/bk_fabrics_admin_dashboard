"use client";
import { logout } from "@/redux/user";
import { useRouter } from "next/navigation";
import { createContext, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { currentUser, loginDate } = useSelector((state) => state.user);

  const isMoreThanThreeDaysAgo = (dateString) => {
    const givenDate = new Date(dateString);
    const currentDate = new Date();
    const timeDifference = currentDate - givenDate;
    const daysDifference = timeDifference / (1000 * 60 * 60 * 24);
    return daysDifference > 3;
  };

  useEffect(() => {
    if (!currentUser || !currentUser.access_token) {
      router.push("/login");
      return;
    }

    if (isMoreThanThreeDaysAgo(loginDate)) {
      dispatch(logout());
      router.push("/login");
      return;
    }
  }, [currentUser, loginDate, router, dispatch]);

  return (
    <AuthContext.Provider value={{ currentUser }}>
      {children}
    </AuthContext.Provider>
  );
};

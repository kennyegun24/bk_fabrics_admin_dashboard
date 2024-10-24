"use client";
import { createContext, useEffect, useState } from "react";
import useSWR from "swr";

export const PricesContext = createContext();

export const DashboardProvider = ({ children }) => {
  const [income, setIncome] = useState({
    totalSales: "",
    dashboardSalesCards: [],
  });
  const fetcher = async () => {
    const fetchData = await fetch(
      "https://bk-fabrics-server.vercel.app/api/dashboard/stats"
    );
    const data = await fetchData.json();
    return data;
  };
  const { data, error, isLoading } = useSWR(
    "fetchDashboardSalesStats",
    fetcher,
    {
      refreshInterval: null,
      errorRetryInterval: 500,
      revalidateIfStale: false,
      revalidateOnFocus: false,
      errorRetryCount: 1,
      // revalidateOnMount: true,
    }
  );
  useEffect(() => {
    setIncome(data);
  }, [data]);
  return (
    <PricesContext.Provider value={{ income, setIncome, isLoading, error }}>
      {children}
    </PricesContext.Provider>
  );
};

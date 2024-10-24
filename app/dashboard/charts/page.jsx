"use client";
import Orders from "@/components/charts/Orders";
import React from "react";
import "./style.css";
import useSWR from "swr";

const Page = () => {
  const fetcher = async () => {
    const fetchData = await fetch(
      "https://bk-fabrics-server.vercel.app/api/order_graphs"
    );
    const data = await fetchData.json();
    return data;
  };
  const { data, error, isLoading } = useSWR("fetchCharts", fetcher, {
    refreshInterval: null,
    errorRetryInterval: 500,
    revalidateIfStale: false,
    revalidateOnFocus: false,
    errorRetryCount: 1,
    revalidateOnMount: true,
  });

  return (
    <div className="order_chart">
      <Orders
        data={data}
        label={"Amount($)"}
        type={"amount"}
        text={"Orders Amount ($)"}
      />
      <Orders
        data={data}
        label={"Orders count"}
        type={"count"}
        text={"Number of Orders"}
      />
    </div>
  );
};

export default Page;

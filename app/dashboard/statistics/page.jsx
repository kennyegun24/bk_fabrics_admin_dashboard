"use client";
import DashboardSalesCards from "@/components/cards/DashboardSalesCards";
import React, { useContext } from "react";
import "./style.css";
import OtherCards from "@/components/cards/stats/OtherCards";
import {
  FaUsersViewfinder,
  FaMoneyBill1Wave,
  FaChartLine,
} from "react-icons/fa6";
import { PricesContext } from "@/context/Dashboard";
import useSWR from "swr";
import TableLoading from "@/loaders/TableLoading";
import CountryList from "@/components/cards/CountryList";
const Page = () => {
  const { income } = useContext(PricesContext);
  const fetcher = async () => {
    const fetchData = await fetch(
      "https://bk-fabrics-server.vercel.app/api/delivery/stats"
    );
    const data = await fetchData.json();
    return data;
  };
  const { data, error, isLoading } = useSWR("fetchStats", fetcher, {
    refreshInterval: null,
    errorRetryInterval: 500,
    revalidateIfStale: false,
    revalidateOnFocus: false,
    errorRetryCount: 1,
    revalidateOnMount: true,
  });

  return (
    <section className="stats_page_container">
      {!isLoading && !error ? (
        <>
          <div className="stats_container">
            <>
              {data?.stats?.map((card, _) => (
                <DashboardSalesCards ind={_} data={card} key={_} />
              ))}

              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "1rem",
                }}
              >
                <OtherCards
                  text={"Daily Income"}
                  icon={<FaMoneyBill1Wave color="#22c63d" />}
                  value={`${income?.dashboardSalesCards[0]?.sales}`}
                  key={4283}
                />
                <OtherCards
                  text={"Income this month"}
                  icon={<FaChartLine color="#5ac2ff" />}
                  value={`${income?.dashboardSalesCards[1]?.sales}`}
                  key={78389}
                />
              </div>
              <div style={{ height: "fit-content" }}>
                <OtherCards
                  text={"Customers"}
                  icon={<FaUsersViewfinder color="#fff" />}
                  value={data?.usersCount}
                  key={4283233}
                />
              </div>
            </>
          </div>
          {/* <CountryList /> */}
        </>
      ) : (
        <div className="stats_loading">
          <TableLoading />
        </div>
      )}
    </section>
  );
};

export default Page;

// PENDING ORDERS
// DELIVERED ORDERS
// TOTAL ORDERS
// INCOME THIS MONTH
// TOTAL INCOME
// USERS COUNT

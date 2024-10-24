"use client";
import styles from "./page.module.css";
import DashboardSalesCards from "@/components/cards/DashboardSalesCards";
import SalesLines from "@/components/cards/dashboard/SalesLines";
import UsersCard from "@/components/cards/dashboard/UsersCard";
import { PricesContext } from "@/context/Dashboard";
import TableLoading from "@/loaders/TableLoading";
import { useContext, useEffect } from "react";
import useSWR from "swr";

export default function Home() {
  const { income, isLoading, error } = useContext(PricesContext);
  return (
    <div className={styles.container}>
      {!isLoading && !error ? (
        <>
          <div className={styles.dashboard_sales_cards}>
            {income?.dashboardSalesCards?.map((card, _) => (
              <DashboardSalesCards key={_} ind={_} data={card} />
            ))}
          </div>
          <div className={styles.metricCards}>
            <div className={styles.user_card_container}>
              <UsersCard />
            </div>
            <div className={styles.sales_ilnes_container}>
              <SalesLines total={income?.totalSales} />
            </div>
          </div>{" "}
        </>
      ) : (
        <TableLoading />
      )}
    </div>
  );
}

// I an trying not to make this sound from personal pov, so yeah, it won't be perfect.
// Heard of the story 'Beauty and a Beast'?...
// I get the feeling that no matter who you end up with,
// no matter how handsome he may seem,
// it will still always remain 'Beauty and a Beast'
// Why? Hmmm... You are not only beautiful on the outside...
// You are also beautiful on the inside...
// and that is definitely something that not everyone
// will have the luxury of having in one's partner...
// Sometimes I look at

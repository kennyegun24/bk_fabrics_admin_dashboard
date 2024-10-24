"use client";
import React from "react";
import Flag from "react-world-flags";
import useSWR from "swr";

const arr = [
  {
    country_code: "us",
    country: "United States",
    count: 3,
    percentage: 2,
  },
  {
    country_code: "ng",
    country: "Nigeria",
    count: 10,
    percentage: 7,
  },
  {
    country_code: "gb",
    country: "Great Britain",
    count: 10,
    percentage: 7,
  },
  {
    country_code: "ca",
    country: "Canada",
    count: 9,
    percentage: 6.89,
  },
  {
    country_code: "de",
    country: "Germany",
    count: 10,
    percentage: 7,
  },
];

const CountryList = () => {
  const fetcher = async () => {
    const fetchData = await fetch("/api/country/all");
    const data = await fetchData.json();
    return data?.countriesWithPercentage;
  };
  const { data, error, isLoading } = useSWR("fetchCountries", fetcher, {
    refreshInterval: null,
    errorRetryInterval: 500,
    revalidateIfStale: false,
    revalidateOnFocus: false,
    errorRetryCount: 1,
    revalidateOnMount: true,
  });
  console.log(data);
  return (
    <div className="sales_lines_chart_card max_height_70vh country_list_card">
      <h3>Customers locations by country</h3>
      <hr />
      <div className="country_lists">
        {data?.map((arr, _) => (
          <div className="country" key={_}>
            <div className="country_name_image">
              <Flag code={arr.country_code} />
              <p>{arr.country}</p>
            </div>

            <div className="country_stat_div">
              <p className="country_count">{arr.count}</p>
              <p className="country_percent">{arr.percentage}%</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CountryList;

import React from "react";
import styles from "./styles.module.css";
import "./style.css";

const DashboardSalesCards = ({ ind, data }) => {
  const formatDouble = (value) => {
    return parseFloat(value).toFixed(2);
  };
  console.log(data);
  return (
    <div key={ind} className={`sales_card ${(ind + 1) % 3 === 0 && "diff"}`}>
      <h2 className={"card_header"}>{data?.header}</h2>
      <p className={"card_price"}>{data?.sales}</p>
      <div className={"text"}>
        <p>{data?.prevText}</p>
        {data?.percentageDifference && (
          <div className={"prog_bar"}>
            <div
              className={"prog_bar_color"}
              style={{
                width: `${
                  data?.percentageDifference >= 100
                    ? 100
                    : data?.percentageDifference
                }%`,
              }}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default DashboardSalesCards;

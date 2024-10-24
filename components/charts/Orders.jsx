"use client";
import React, { useEffect, useState } from "react";
import { MdOutlineArrowDropDown } from "react-icons/md";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const options = {};
const data = {};

const Orders = ({ text, data, type, label }) => {
  const [filter, setFilter] = useState("past_week");
  const [graphData, setGraphData] = useState([]);
  useEffect(() => {
    if (filter === "past_week") {
      setGraphData(data?.currentWeekData);
    } else if (filter === "past_month") {
      setGraphData(data?.pastMonthData);
    } else {
      setGraphData(data?.pastYearData);
    }
  }, [filter, data]);
  return (
    <div className="sales_lines_chart_card max_height_70vh order_chart_component">
      <div className="order_chart_sub_component">
        <h3>{text}</h3>

        <div className="select_container">
          <select onChange={(e) => setFilter(e.target.value)} name="" id="">
            <option defaultChecked value="past_week">
              last 7days
            </option>
            <option value="past_month">Past month</option>
            <option value="past_year">Past year</option>
          </select>
          <MdOutlineArrowDropDown />
        </div>
      </div>
      <hr />

      <div>
        <Line
          options={{}}
          data={{
            labels: graphData?.map((each, _) => each.date),
            datasets: [
              {
                label: label,
                data: graphData?.map((each) =>
                  type === "amount" ? each?.totalSales : each?.count
                ),
                backgroundColor: [
                  "rgba(247, 205, 18, 0.795)",
                  "rgba(50, 93, 236, 0.6)",
                  "rgba(143, 142, 140, 0.685)",
                ],
                borderColor: "#fff",
                pointRadius: 1,
                tension: 0.5,
                fill: true,
                borderWidth: 1,
              },
            ],
          }}
        />
      </div>
    </div>
  );
};

export default Orders;

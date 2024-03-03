import React, { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";
import { BarChart } from "@mui/x-charts";
import {
  CartesianGrid,
  Tooltip,
  Legend,
  Line,
  LineChart,
  XAxis,
  YAxis,
  AreaChart,
  Area,
} from "recharts";
import axios from "axios";
import { useSelector } from "react-redux";

const Statistics = ({ setPending }) => {
  const chartSetting = {
    xAxis: [
      {
        label: "Orders",
      },
    ],
    width: 500,
    height: 400,
  };
  const [userChart, setUserChart] = useState([]);
  const [orderChart, setOrderChart] = useState([]);
  const { currentUser } = useSelector((state) => state.user);

  const valueFormatter = (value) => `${value}orders`;
  const months = [
    { month: "Jan", _id: 1 },
    { month: "Feb", _id: 2 },
    { month: "Mar", _id: 3 },
    { month: "Apr", _id: 4 },
    { month: "May", _id: 5 },
    { month: "June", _id: 6 },
    { month: "July", _id: 7 },
    { month: "Aug", _id: 8 },
    { month: "Sept", _id: 9 },
    { month: "Oct", _id: 10 },
    { month: "Nov", _id: 11 },
    { month: "Dec", _id: 12 },
  ];
  const TOKEN = currentUser?.access_token;
  const getStat = async () => {
    setPending(true);
    try {
      const req = await axios.get("http://localhost:4000/api/stats/users", {
        headers: {
          Token: `Bearer ${TOKEN}`,
        },
      });
      const orderReq = await axios.get(
        "http://localhost:4000/api/stats/orders",
        {
          headers: {
            Token: `Bearer ${TOKEN}`,
          },
        }
      );
      const res = (await req).data;
      const orderRes = (await orderReq).data;
      setUserChart(res);
      setOrderChart(orderRes);
      setPending(false);
      return res;
    } catch (error) {
      setPending(false);
    }
  };
  useEffect(() => {
    getStat();
  }, []);

  const missingMonth = (mock_data, months) => {
    const mock = [...mock_data];

    months.forEach((month) => {
      const existing_month = mock.find(
        (existing) => existing._id === month._id
      );

      if (!existing_month) {
        mock.push({ month: month.month, _id: month._id, total: 0 });
      } else {
        existing_month.month = month.month;
      }
    });
    mock.sort((a, b) => a._id - b._id);

    return mock;
  };
  const orderChartData = missingMonth(orderChart, months);
  return (
    <div className="width100">
      <div className="flex column gap1rem">
        <Box sx={{ background: "#a1c9f1" }}>
          <Typography
            variant="h5"
            component={"h5"}
            sx={{
              textAlign: "center",
              mb: 3,
              background: "#6a8db3",
              color: "#fff",
              padding: ".5rem",
            }}
          >
            Users chart
          </Typography>
          <AreaChart
            width={650}
            height={300}
            data={missingMonth(userChart, months)}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            style={{ fontSize: "12px" }}
          >
            <defs>
              <linearGradient id="colorTotal" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#8884d8" stopOpacity={0.2} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis dataKey="total" />
            <Tooltip />
            <Legend />
            <Area
              type="monotone"
              dataKey="total"
              stroke="#8884d8"
              fillOpacity={1}
              fill="url(#colorTotal)"
            />
          </AreaChart>
        </Box>
      </div>
      <div className="flex gap05rem width100 mrt1rem">
        <Box sx={{ background: "#c9f1a1", width: "50%" }}>
          <Typography
            variant="h5"
            component={"h5"}
            sx={{
              textAlign: "center",
              mb: 3,
              background: "#a1f1c9",
              color: "#000",
              padding: ".5rem",
            }}
          >
            Orders Line chart
          </Typography>
          <LineChart
            width={500}
            height={300}
            data={orderChartData}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            style={{ fontSize: "12px" }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis dataKey="total" />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="total" stroke="#8884d8" />
          </LineChart>
        </Box>
        <Box sx={{ background: "#f1a1c9", width: "50%" }}>
          <Typography
            variant="h5"
            component={"h5"}
            sx={{
              textAlign: "center",
              mb: 3,
              background: "#f8bbd0",
              color: "#000",
              padding: ".5rem",
            }}
          >
            Orders Bar Chart
          </Typography>
          <BarChart
            dataset={orderChartData}
            yAxis={[{ scaleType: "band", dataKey: "month" }]}
            series={[{ dataKey: "total", label: "Orders", valueFormatter }]}
            layout="horizontal"
            {...chartSetting}
          />
        </Box>
      </div>
    </div>
  );
};

export default Statistics;

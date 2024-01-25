import React from "react";
import { Box, Typography } from "@mui/material";
import { BarChart, LineChart } from "@mui/x-charts";
const Statistics = () => {
  const chartSetting = {
    xAxis: [
      {
        label: "rainfall (mm)",
      },
    ],
    width: 500,
    height: 400,
  };
  const dataset = [
    {
      london: 59,
      month: "Jan",
    },
    {
      london: 50,
      month: "Fev",
    },
    {
      london: 47,
      month: "Mar",
    },
    {
      london: 54,
      month: "Apr",
    },
    {
      london: 57,
      month: "May",
    },
    {
      london: 60,
      month: "June",
    },
    {
      london: 59,
      month: "July",
    },
    {
      london: 65,
      month: "Aug",
    },
    {
      london: 51,
      month: "Sept",
    },
    {
      london: 60,
      month: "Oct",
    },
    {
      london: 67,
      month: "Nov",
    },
    {
      london: 61,
      month: "Dec",
    },
  ];
  const valueFormatter = (value) => `${value}mm`;
  return (
    <div>
      <div className="flex">
        <Box>
          <Typography
            variant="h5"
            component={"h5"}
            sx={{ textAlign: "center", mt: 3, mb: 3 }}
          >
            Users chart
          </Typography>
          <LineChart
            xAxis={[{ data: [1, 2, 3, 5, 8, 10] }]}
            series={[
              {
                data: [2, 5.5, 2, 8.5, 1.5, 5],
              },
            ]}
            width={500}
            height={300}
          />
        </Box>
        <Box>
          <Typography
            variant="h5"
            component={"h5"}
            sx={{ textAlign: "center", mt: 3, mb: 3 }}
          >
            Sales chart
          </Typography>
          <LineChart
            xAxis={[{ data: [1, 2, 3, 5, 8, 10] }]}
            series={[
              {
                data: [2, 5.5, 2, 8.5, 1.5, 5],
              },
            ]}
            width={500}
            height={300}
          />
        </Box>
      </div>
      <Typography
        variant="h5"
        component={"h5"}
        sx={{ textAlign: "center", mt: 3, mb: 3 }}
      >
        Orders Chart
      </Typography>
      <BarChart
        dataset={dataset}
        yAxis={[{ scaleType: "band", dataKey: "month" }]}
        series={[
          { dataKey: "london", label: "Seoul rainfall", valueFormatter },
        ]}
        layout="horizontal"
        {...chartSetting}
      />
    </div>
  );
};

export default Statistics;

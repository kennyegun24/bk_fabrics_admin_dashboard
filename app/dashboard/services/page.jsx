"use client";
import * as React from "react";
import { useRouter } from "next/navigation";
import useSWR from "swr";
import TableComponent from "@/components/table/Table";
import {
  StyledTableCell,
  StyledTableRow,
} from "@/components/mui/StyledComponents";

const tableHead = [
  {
    label: "Service Name",
    width: "250px",
  },
  {
    label: "Price",
    width: "100px",
  },
  {
    label: "Timing",
    width: "150px",
  },
];

export default function CustomizedTables() {
  const router = useRouter();
  const navigate = () => {
    router.push("/add/service");
  };
  const fetcher = async () => {
    const fetchData = await fetch("/api/services/all");
    const data = await fetchData.json();
    return data?.allServices;
  };
  const { data, error, isLoading } = useSWR("fetchServices", fetcher, {
    refreshInterval: null,
    errorRetryInterval: 500,
    revalidateIfStale: false,
    revalidateOnFocus: false,
    errorRetryCount: 1,
    revalidateOnMount: true,
  });
  return (
    <TableComponent
      data={data}
      error={error}
      isLoading={isLoading}
      tableHead={tableHead}
      navigate={navigate}
      btn={"Add new service"}
      tableBody={data?.map((row, _) => (
        <>
          <StyledTableRow key={_}>
            <StyledTableCell align="left">{row.service_name}</StyledTableCell>
            <StyledTableCell align="left">{row.price}</StyledTableCell>
            <StyledTableCell align="left">{row.timing}</StyledTableCell>
          </StyledTableRow>
        </>
      ))}
    />
  );
}

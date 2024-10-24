"use client";
import * as React from "react";
import { useRouter } from "next/navigation";
import useSWR from "swr";
import TableComponent from "@/components/table/Table";
import {
  StyledTableCell,
  StyledTableRow,
} from "@/components/mui/StyledComponents";
import { useSelector } from "react-redux";
import axios from "axios";

const tableHead = [
  {
    label: "First Name",
    width: "250px",
  },
  {
    label: "Last Name",
    width: "250px",
  },
  {
    label: "Admin",
    width: "100px",
  },
  {
    label: "Email",
    width: "100px",
  },
  {
    label: "Created At",
    width: "200px",
  },
];

export default function CustomizedTables() {
  const router = useRouter();
  const navigate = () => {
    router.push("/add/user");
  };
  const { currentUser } = useSelector((state) => state.user);
  const TOKEN = currentUser?.access_token;
  const getAllUsers = async () => {
    // setPending(true);
    console.log(currentUser);
    console.log(TOKEN);
    try {
      const req = await axios.get(
        `https://bk-fabrics-server.vercel.app/api/stats/`,
        {
          headers: {
            Token: `Bearer ${TOKEN}`,
          },
        }
      );

      const res = req.data;
      console.log(res);
      return res;
      // setUsers(res || []);
      // setPending(false);
    } catch (error) {
      // setPending(false);
      console.error("Error fetching products", error);
    }
  };

  // React.useEffect(() => {
  //   getAllUsers();
  // }, []);
  const { data, error, isLoading } = useSWR("fetchAllUsers", getAllUsers, {
    refreshInterval: null,
    errorRetryInterval: 500,
    revalidateIfStale: false,
    revalidateOnFocus: false,
    errorRetryCount: 1,
    revalidateOnMount: true,
  });
  return (
    <div style={{ height: 400, width: "100%", padding: "2rem", color: "#fff" }}>
      <TableComponent
        data={data}
        error={error}
        isLoading={isLoading}
        tableHead={tableHead}
        navigate={navigate}
        // btn={"Create new user"}
        tableBody={data?.map((row, _) => (
          <>
            <StyledTableRow key={_}>
              <StyledTableCell component="th" scope="row">
                {row.first_name}
              </StyledTableCell>
              <StyledTableCell component="th" scope="row">
                {row.last_name}
              </StyledTableCell>
              <StyledTableCell component="th" scope="row">
                {row.is_admin}
              </StyledTableCell>
              <StyledTableCell align="left">{row.email}</StyledTableCell>
              <StyledTableCell align="left">{row.createdAt}</StyledTableCell>
            </StyledTableRow>
          </>
        ))}
      />
    </div>
  );
}

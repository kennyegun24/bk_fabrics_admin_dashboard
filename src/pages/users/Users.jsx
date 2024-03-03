import React, { useEffect, useState } from "react";
import { useMemo } from "react";
import { Box, Typography } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { rows } from "../../data/tables_data";
import NoRow from "../../components/NoRow";
import axios from "axios";
import { useSelector } from "react-redux";
const Users = ({ setPending }) => {
  const columns = useMemo(
    () => [
      {
        field: "first_name",
        headerName: "First Name",
        width: 150,
        headerClassName: "super-app-theme--header",
      },
      {
        field: "last_name",
        headerName: "Last Name",
        width: 150,
        headerClassName: "super-app-theme--header",
      },
      {
        field: "is_admin",
        headerName: "Admin",
        width: 100,
        valueOptions: ["true", "false"],
        editable: true,
        type: "singleSelect",
        headerClassName: "super-app-theme--header",
      },
      {
        field: "email",
        headerName: "Email",
        width: 200,
        headerClassName: "super-app-theme--header",
      },
      {
        field: "createdAt",
        headerName: "Created At",
        width: 200,
        headerClassName: "super-app-theme--header",
      },
    ],
    []
  );
  const [users, setUsers] = useState([]);
  const { currentUser } = useSelector((state) => state.user);

  const TOKEN = currentUser?.access_token;
  const getAllUsers = async () => {
    setPending(true);
    try {
      const req = await axios.get(`http://localhost:4000/api/stats`, {
        headers: {
          Token: `Bearer ${TOKEN}`,
        },
      });

      const res = req.data;
      setUsers(res || []);
      setPending(false);
    } catch (error) {
      setPending(false);
      console.error("Error fetching products", error);
    }
  };

  useEffect(() => {
    getAllUsers();
  }, []);
  return (
    <div>
      <Box
        sx={{
          "& .super-app-theme--header": {
            backgroundColor: "rgba(255, 7, 0, 0.55)",
          },
        }}
      >
        <Typography
          variant="h4"
          component={"h4"}
          sx={{
            textAlign: "center",
            mt: 3,
            mb: 3,
          }}
        >
          Manage Users
        </Typography>
        <DataGrid
          rowsPerPageOptions={[2, 4, 5]}
          columns={columns}
          rows={users}
          getRowId={(row) => row._id}
          pageSizeOptions={[10, 20, 30]}
          initialState={{
            pagination: { paginationModel: { pageSize: 10 } },
          }}
          slots={{ noRowsOverlay: NoRow }}
          sx={{ "--DataGrid-overlayHeight": "300px" }}
          autoHeight
        />
      </Box>
    </div>
  );
};

export default Users;

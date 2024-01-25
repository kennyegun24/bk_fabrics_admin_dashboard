import React from "react";
import { useMemo } from "react";
import { Box, Typography } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { rows } from "../../data/tables_data";
const Users = () => {
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
          rows={rows}
          getRowId={(row) => row._id}
          pageSizeOptions={[10, 20, 30]}
          initialState={{
            pagination: { paginationModel: { pageSize: 10 } },
          }}
        />
      </Box>
    </div>
  );
};

export default Users;

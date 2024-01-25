import React from "react";
import { useMemo } from "react";
import { Box, Typography } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { ordersRows } from "../../data/tables_data";
const Order = () => {
  const columns = useMemo(
    () => [
      {
        field: "userId",
        headerName: "ID",
        width: 100,
        headerClassName: "super-app-theme--header",
      },
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
        field: "email",
        headerName: "Email",
        width: 200,
        headerClassName: "super-app-theme--header",
      },
      {
        field: "amount",
        headerName: "Amount",
        width: 100,
        headerClassName: "super-app-theme--header",
      },
      {
        field: "postalCode",
        headerName: "Postal Code",
        width: 100,
        headerClassName: "super-app-theme--header",
      },
      {
        field: "phoneNumber",
        headerName: "Phone Number",
        width: 150,
        headerClassName: "super-app-theme--header",
      },
      {
        field: "city",
        headerName: "City",
        width: 100,
        headerClassName: "super-app-theme--header",
      },
      {
        field: "state",
        headerName: "State",
        width: 100,
        headerClassName: "super-app-theme--header",
      },
      {
        field: "country",
        headerName: "Country",
        width: 100,
        headerClassName: "super-app-theme--header",
      },
      {
        field: "status",
        headerName: "Status",
        width: 100,
        headerClassName: "super-app-theme--header",
      },
      {
        field: "address",
        headerName: "Address",
        width: 400,
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
      {" "}
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
            Manage Orders
          </Typography>
          <DataGrid
            rowsPerPageOptions={[2, 4, 5]}
            columns={columns}
            rows={ordersRows}
            getRowId={(row) => row.userId}
            pageSizeOptions={[10, 20, 30]}
            initialState={{
              pagination: { paginationModel: { pageSize: 10 } },
            }}
          />
        </Box>
      </div>
    </div>
  );
};

export default Order;

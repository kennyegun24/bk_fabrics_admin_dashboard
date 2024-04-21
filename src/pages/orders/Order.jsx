import React, { useEffect, useState } from "react";
import { useMemo } from "react";
import { Box, Typography } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { ordersRows } from "../../data/tables_data";
import NoRow from "../../components/NoRow";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useSelector } from "react-redux";
const Order = ({ setPending }) => {
  const navigate = useNavigate();
  const columns = useMemo(
    () => [
      {
        field: "_id",
        headerName: "ID",
        width: 100,
        headerClassName: "super-app-theme--header",
      },
      {
        field: "firstName",
        headerName: "First Name",
        width: 150,
        headerClassName: "super-app-theme--header",
      },
      {
        field: "lastName",
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
  const [orders, setOrders] = useState([]);
  const { currentUser } = useSelector((state) => state.user);

  const TOKEN = currentUser?.access_token;
  const getOrders = async () => {
    try {
      setPending(true);
      const req = await axios.get(
        "https://bk-fabrics-server.vercel.app/api/orders/all",
        {
          headers: {
            Token: `Bearer ${TOKEN}`,
          },
        }
      );
      const res = await req.data;
      console.log(res);
      setOrders(res);
      setPending(false);
    } catch (error) {
      setPending(false);
    }
  };
  useEffect(() => {
    setPending(true);
    getOrders();
  }, []);
  console.log(orders);
  return (
    <div>
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
            rows={orders}
            getRowId={(row) => row._id}
            pageSizeOptions={[10, 20, 30]}
            initialState={{
              pagination: { paginationModel: { pageSize: 10 } },
            }}
            slots={{ noRowsOverlay: NoRow }}
            sx={{ "--DataGrid-overlayHeight": "300px" }}
            autoHeight
            onRowClick={({ row }) => navigate(`/orders/${row._id}`)}
          />
        </Box>
      </div>
    </div>
  );
};

export default Order;

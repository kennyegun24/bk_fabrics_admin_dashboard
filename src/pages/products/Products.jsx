import React, { useEffect, useState } from "react";
import { useMemo } from "react";
import { Box, Button, Typography } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import NoRow from "../../components/NoRow";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import ItemAdded from "../../components/ItemAdded";
import { useSelector } from "react-redux";

const Products = ({ setPending }) => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [addItem, setAddItem] = useState(null);
  const { currentUser } = useSelector((state) => state.user);

  const TOKEN = currentUser?.access_token;
  const deleteProduct = async (event, rowData) => {
    event.stopPropagation();
    setPending(true);
    try {
      const req = await axios.delete(
        `https://bk-fabrics-server.vercel.app/api/product/delete/${rowData._id}`,
        {
          headers: {
            Token: `Bearer ${TOKEN}`,
          },
        }
      );
      setProducts((prevProducts) =>
        prevProducts.filter((init) => init._id !== rowData._id)
      );
      setPending(false);
      setAddItem("Product Deleted");
    } catch (error) {
      setPending(false);
      setAddItem("Product not deleted");
    }
  };
  const columns = useMemo(
    () => [
      {
        field: "_id",
        headerName: "ID",
        width: 200,
        headerClassName: "super-app-theme--header",
      },
      {
        field: "price",
        headerName: "Price ($) ",
        width: 150,
        headerClassName: "super-app-theme--header",
      },
      {
        field: "product_name",
        headerName: "Product Name",
        width: 250,
        editable: true,
        headerClassName: "super-app-theme--header",
      },
      {
        field: "in_stock",
        headerName: "In Stock",
        width: 150,
        headerClassName: "super-app-theme--header",
      },
      {
        field: "sold",
        headerName: "Sold",
        width: 150,
        headerClassName: "super-app-theme--header",
      },
      {
        field: "rating",
        headerName: "Ratings",
        width: 150,
        headerClassName: "super-app-theme--header",
        valueGetter: (params) => params.row?.rating?.ratings || "N/A",
      },
      {
        headerName: "Delete",
        width: 150,
        headerClassName: "super-app-theme--header",
        renderCell: (params) => (
          <Button
            variant="contained"
            onClick={(e) => deleteProduct(e, params.row)}
          >
            Click Me
          </Button>
        ),
      },
    ],
    []
  );
  const [loading, setLoading] = useState(false);

  const getAllProducts = async () => {
    setLoading(true);
    try {
      const req = await axios.get(
        `https://bk-fabrics-server.vercel.app/api/product/all/admin`,
        {
          headers: {
            Token: `Bearer ${TOKEN}`,
          },
        }
      );

      const res = req.data;
      setProducts(res || []);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error("Error fetching products", error);
    }
  };

  useEffect(() => {
    setLoading(true);
    getAllProducts();
  }, []);

  return (
    <div>
      {addItem &&
        setTimeout(() => {
          setAddItem(false);
        }, 5000) && <ItemAdded text={addItem} />}
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
            Manage Products
          </Typography>
          <DataGrid
            rowsPerPageOptions={[2, 4, 5]}
            columns={columns}
            rows={products}
            getRowId={(row) => row._id}
            pageSizeOptions={[10, 20, 30]}
            initialState={{
              pagination: { paginationModel: { pageSize: 10 } },
            }}
            pagination
            slots={{ noRowsOverlay: NoRow }}
            sx={{ "--DataGrid-overlayHeight": "300px" }}
            autoHeight
            onRowClick={({ row }) => navigate(`/products/${row._id}`)}
            loading={loading}
          />
        </Box>
      </div>
    </div>
  );
};

export default Products;

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
import { toast } from "sonner";
import axios from "axios";
import { useState, useEffect } from "react";
import EditProduct from "./EditProduct";

const tableHead = [
  {
    label: "Product Name",
    width: "250px",
  },
  {
    label: "Price",
    width: "100px",
  },
  {
    label: "In Stock",
    width: "150px",
  },
  {
    label: "Ratings",
    width: "200px",
  },
  {
    label: "Delete",
    width: "fit-content",
  },
  {
    label: "Edit",
    width: "fit-content",
  },
];

export default function CustomizedTables() {
  const router = useRouter();
  const { currentUser } = useSelector((state) => state.user);
  const [products, setProducts] = useState([]);
  const TOKEN = currentUser?.access_token;
  const navigate = () => {
    router.push("/add/product");
  };
  const fetcher = async () => {
    const fetchData = await fetch(
      "https://bk-fabrics-server.vercel.app/api/product/all/admin",
      {
        headers: {
          Token: `Bearer ${TOKEN}`,
        },
      }
    );
    const data = await fetchData.json();
    return data;
  };
  const { data, error, isLoading } = useSWR("fetchProducts", fetcher, {
    refreshInterval: null,
    errorRetryInterval: 500,
    revalidateIfStale: false,
    revalidateOnFocus: false,
    errorRetryCount: 1,
    revalidateOnMount: true,
  });

  useEffect(() => {
    setProducts(data);
  }, [data]);

  const deleteProduct = async (event, rowData) => {
    // event.stopPropagation();
    // setPending(true);
    const toastId = toast.loading("Deleting Product...");
    try {
      const req = await axios.delete(
        `https://bk-fabrics-server.vercel.app/api/product/delete/${rowData}`,
        {
          headers: {
            Token: `Bearer ${TOKEN}`,
          },
        }
      );
      setProducts((prevProducts) =>
        prevProducts.filter((init) => init._id !== rowData)
      );
      return toast.success("Product successfully deleted", {
        id: toastId,
      });
    } catch (error) {
      return toast.error("Something went wrong when deleting product", {
        id: toastId,
      });
    }
  };

  return (
    <TableComponent
      data={data}
      error={error}
      isLoading={isLoading}
      tableHead={tableHead}
      navigate={navigate}
      btn={"Create new product"}
      tableBody={products?.map((row, _) => (
        <>
          <StyledTableRow key={_}>
            <StyledTableCell component="th" scope="row">
              {row.product_name}
            </StyledTableCell>
            <StyledTableCell align="left">{row.price}</StyledTableCell>
            <StyledTableCell align="left">{row.in_stock}</StyledTableCell>
            <StyledTableCell align="left">{row.rating.ratings}</StyledTableCell>
            <StyledTableCell align="left">
              <button
                style={{
                  background: "red",
                  padding: ".3rem 1rem",
                  border: "1px solid #fff",
                  color: "#fff",
                  borderRadius: "4px",
                  fontSize: "12px",
                }}
                onClick={(e) => deleteProduct(e, row._id)}
              >
                Delete
              </button>
            </StyledTableCell>
            <StyledTableCell align="left">
              <EditProduct details={row} />
            </StyledTableCell>
          </StyledTableRow>
        </>
      ))}
    />
  );
}

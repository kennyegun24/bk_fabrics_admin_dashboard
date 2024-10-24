"use client";
import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { useSelector } from "react-redux";
import axios from "axios";

const EditProduct = ({ details }) => {
  const [updatedProduct, setUpdatedProduct] = useState(null);
  useEffect(() => {
    setUpdatedProduct(details);
  }, [details]);
  const { currentUser } = useSelector((state) => state.user);

  const TOKEN = currentUser?.access_token;
  const editProduct = async () => {
    const toastId = toast.loading("Creating product", {
      style: { background: "transparent", color: "#fff" },
    });
    if (updatedProduct) {
      try {
        const req = await axios.put(
          `https://bk-fabrics-server.vercel.app/api/product/update/${details?._id}`,
          {
            ...updatedProduct,
          },
          {
            headers: {
              Token: `Bearer ${TOKEN}`,
            },
          }
        );
        window.location.reload();
        return toast.success("Product successfully updated", {
          id: toastId,
          style: {},
        });
      } catch (error) {
        console.log(error);
        return toast.error("Something went wrong when updating product", {
          id: toastId,
          style: {},
        });
      }
    } else {
      return toast.error("Something went wrong when updating product", {
        id: toastId,
        style: {},
      });
    }
  };

  return (
    <Dialog className="main_dialog_container">
      <DialogTrigger asChild>
        <button
          style={{
            background: "#91C3F4",
            padding: ".3rem 1rem",
            border: "1px solid #fff",
            color: "#000",
            fontWeight: "700",
            borderRadius: "4px",
            fontSize: "12px",
          }}
          className="text-[50px]"
        >
          Edit
        </button>
      </DialogTrigger>
      <DialogContent className="main_dialog_container sm:max-w-[650px]">
        <DialogHeader>
          <DialogTitle>Edit product</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 gap-4">
            <Label htmlFor="name" className="text-right text-[12px]">
              Product Name
            </Label>
            <Input
              id="name"
              value={updatedProduct?.product_name}
              className="col-span-3 text-[12px]"
              name="product_name"
              onChange={(e) =>
                setUpdatedProduct((prev) => ({
                  ...prev,
                  product_name: e.target.value,
                }))
              }
            />
          </div>
          <div className="grid grid-cols-4 gap-4">
            <Label htmlFor="username" className="text-right text-[12px]">
              Category
            </Label>
            <Input
              id="username"
              className="col-span-3 text-[12px]"
              value={updatedProduct?.categories[0]}
              name="categories"
              onChange={(e) =>
                setUpdatedProduct((prev) => ({
                  ...prev,
                  categories: [e.target.value],
                }))
              }
            />
          </div>
          <div className="grid grid-cols-4 gap-4">
            <Label htmlFor="username" className="text-right text-[12px]">
              Price
            </Label>
            <Input
              id="username"
              value={updatedProduct?.price}
              className="col-span-3 text-[12px]"
              type="number"
              name="price"
              onChange={(e) =>
                setUpdatedProduct((prev) => ({
                  ...prev,
                  price: e.target.value,
                }))
              }
            />
          </div>
          <div className="grid grid-cols-4 gap-4">
            <Label htmlFor="username" className="text-right text-[12px]">
              In Stock
            </Label>
            <Input
              id="username"
              className="col-span-3 text-[12px]"
              value={updatedProduct?.in_stock}
              type="number"
              name="in_stock"
              onChange={(e) =>
                setUpdatedProduct((prev) => ({
                  ...prev,
                  in_stock: e.target.value,
                }))
              }
            />
          </div>
          <div className="grid grid-cols-4 gap-4">
            <Label htmlFor="username" className="text-right text-[12px]">
              Description
            </Label>
            <textarea
              id="username"
              value={updatedProduct?.product_desc}
              name="product_desc"
              className="col-span-3 text-[12px]"
              onChange={(e) =>
                setUpdatedProduct((prev) => ({
                  ...prev,
                  product_desc: e.target.value,
                }))
              }
              style={{
                height: "75px",
                padding: "0.25rem",
                resize: "none",
                outline: "1px solid #fff",
              }}
            />
          </div>
        </div>
        <DialogFooter>
          <button
            style={{
              background: "#91C3F4 !important",
              padding: ".3rem 1rem",
              border: "1px solid #fff",
              color: "#000",
              fontWeight: "700",
              borderRadius: "4px",
              fontSize: "12px",
            }}
            className="text-[5px] save_changes"
            onClick={editProduct}
          >
            Save changes
          </button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default EditProduct;

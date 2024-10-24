"use client";
import { Form, Input, Upload, message } from "antd";
import axios from "axios";
import React, { useContext, useState } from "react";
import { FaPlus } from "react-icons/fa6";
import { useSelector } from "react-redux";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import { toastError, toastSuccess } from "@/libs/sonner";
import { toast } from "sonner";
import { createProduct } from "@/redux/products";

const beforeUpload = (file) => {
  const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
  if (!isJpgOrPng) {
    message.error("You can only upload JPG/PNG file!");
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error("Image must smaller than 2MB!");
  }
  return isJpgOrPng && isLt2M;
};

const Page = () => {
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [items, setItems] = useState({
    product_name: "",
    product_desc: "",
    price: "",
    in_stock: "",
    categories: [],
  });
  const handleChange = (e) => {
    if (e.target.name === "categories") {
      setItems((prev) => ({
        ...prev,
        categories: [e.target.value],
      }));
    } else {
      setItems((prev) => ({
        ...prev,

        [e.target.name]: e.target.value,
      }));
    }
  };
  const { currentUser } = useSelector((state) => state.user);

  const handleUploadToCloudinary = async (file) => {
    const uploadPreset = "ml_default";
    // const cloud_name = process.env.CLOUDINARY_CLOUD_NAME
    const cloud_name = "drfqge33t";
    setLoading(true);
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", uploadPreset);
    const cloudinaryUrl = `https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`;

    try {
      const response = await axios.post(cloudinaryUrl, formData);
      const imageUrl = response.data.secure_url;
      setImageUrl(imageUrl);
      setLoading(false);
      message.success("Upload successful!");
    } catch (error) {
      setLoading(false);
      message.error("Upload failed!");
      console.error("Error uploading image:", error);
    }
  };

  const handleImageChange = async (info) => {
    if (info.file.status === "uploading") {
      setLoading(true);
      return;
    }
    if (info.file.status === "done" || info.file.originFileObj) {
      setLoading(false);
      setImageFile(info.file.originFileObj);
    }
  };

  const submit = async (e) => {
    // e.preventDefault();
    const toastId = toast.loading("Creating product");
    // alert("first");
    try {
      if (imageFile) {
        await handleUploadToCloudinary(imageFile);
        await createProduct({
          ...items,
          product_image: imageUrl,
          TOKEN: currentUser?.access_token,
        });
        return toast.success("Product successfully created", {
          id: toastId,
        });
      } else {
        return toast.error("Image not uploaded", {
          id: toastId,
        });
      }
    } catch (error) {
      console.log(error);
      return toast.error("Something went wrong when creating product", {
        id: toastId,
      });
    }
  };

  const uploadButton = (
    <span
      style={{
        border: 0,
        background: "none",
      }}
      type="button"
    >
      {loading ? (
        <LoadingOutlined color="#fff" size={40} />
      ) : (
        <PlusOutlined color="#fff" size={40} />
      )}
      <div
        style={{
          marginTop: 8,
          color: "#fff",
        }}
      >
        Upload
      </div>
    </span>
  );

  return (
    <div className="new_form_container">
      <Form onFinish={submit}>
        <h1>Add new product</h1>
        <hr />
        <div className="flex column">
          <div className="flex column gap4rem">
            <div className="horizontal_inputs_container">
              <Form.Item
                required
                name={"product_name"}
                label={<span style={{ color: "#fff" }}>Product Name</span>}
                rules={[
                  {
                    required: true,
                    message: "Product Name should not be empty",
                  },
                ]}
                layout="vertical"
              >
                <Input
                  type="text"
                  name="product_name"
                  placeholder="Product Name"
                  value={items.product_name}
                  onChange={(e) =>
                    setItems((prev) => ({
                      ...prev,
                      product_name: e.target.value,
                    }))
                  }
                  style={{ height: "calc(2rem + 14px)" }}
                />
              </Form.Item>

              <Form.Item
                required
                name={"price"}
                label={<span style={{ color: "#fff" }}>Product Price</span>}
                rules={[
                  {
                    required: true,
                    message: "Product Price should not be empty",
                  },
                ]}
                layout="vertical"
              >
                <Input
                  type="number"
                  placeholder="Product Price"
                  value={items.price}
                  name="price"
                  onChange={(e) =>
                    setItems((prev) => ({ ...prev, price: e.target.value }))
                  }
                  style={{ height: "calc(2rem + 14px)" }}
                />
              </Form.Item>
            </div>
            <div className="horizontal_inputs_container">
              <Form.Item
                required
                name={"in_stock"}
                label={<span style={{ color: "#fff" }}>In Stock</span>}
                rules={[
                  {
                    required: true,
                    message: "Product Price should not be empty",
                  },
                ]}
                layout="vertical"
              >
                <Input
                  type="number"
                  placeholder="In Stock"
                  value={items.in_stock}
                  name="in_stock"
                  onChange={(e) =>
                    setItems((prev) => ({ ...prev, in_stock: e.target.value }))
                  }
                  style={{ height: "calc(2rem + 14px)" }}
                />
              </Form.Item>
              <Form.Item
                required
                name={"product_desc"}
                label={<span style={{ color: "#fff" }}>In Stock</span>}
                rules={[
                  {
                    required: true,
                    message: "Product Price should not be empty",
                  },
                ]}
                layout="vertical"
                style={{ position: "relative" }}
                noStyle
              >
                <Input.TextArea
                  placeholder="Enter Product Description..."
                  value={items.product_desc}
                  onChange={(e) => handleChange(e)}
                  name="product_desc"
                  style={{
                    resize: "none",
                    height: "100px ",
                    width: "48%",
                    position: "relative",
                  }}
                />
              </Form.Item>
            </div>
            <div className="horizontal_inputs_container">
              <Form.Item
                required
                name={"categories"}
                label={<span style={{ color: "#fff" }}>Product Category</span>}
                rules={[
                  {
                    required: true,
                    message: "Product Category should not be empty",
                  },
                ]}
                layout="vertical"
              >
                <Input
                  type="number"
                  placeholder="Product Category"
                  value={items.in_stock}
                  name="categories"
                  onChange={(e) =>
                    setItems((prev) => ({
                      ...prev,
                      categories: e.target.value,
                    }))
                  }
                  style={{ height: "calc(2rem + 14px)" }}
                />
              </Form.Item>
              <Upload
                name="avatar"
                listType="picture-card"
                className="avatar-uploader"
                showUploadList={false}
                beforeUpload={beforeUpload}
                onChange={handleImageChange}
              >
                {imageUrl ? (
                  <img
                    src={imageUrl}
                    alt="avatar"
                    style={{
                      width: "100%",
                    }}
                  />
                ) : (
                  uploadButton
                )}
              </Upload>
            </div>
          </div>
          <button
            style={{
              background: "#91C3F4",
              padding: "1rem 1.5rem",
              border: "none",
              width: "fit-content",
              fontWeight: 700,
              borderRadius: "8px",
              alignSelf: "center",
              display: "flex",
              gap: "0.5rem",
              alignItems: "center",
              cursor: "pointer",
              marginTop: "3rem",
            }}
            // onClick={submit}
            type="submit"
          >
            <FaPlus style={{ background: "transparent" }} />
            Add New Product
          </button>
        </div>
      </Form>
    </div>
  );
};

export default Page;

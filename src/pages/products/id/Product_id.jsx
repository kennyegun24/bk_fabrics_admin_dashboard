import React, { useEffect, useState } from "react";
import "./style.css";
import { orderData } from "../../../data/order_details";
import image from "../../../images/fake_image.jpg";
import ItemAdded from "../../../components/ItemAdded";
import axios from "axios";
import { useSelector } from "react-redux";

const Product_id = ({ setPending }) => {
  const [addItem, setAddItem] = useState(null);
  const [edit, setEdit] = useState(false);
  const path = window.location.pathname.split("/");
  const id = path[path.length - 1];
  const [product, setProduct] = useState(null);
  const [updatedProduct, setUpdatedProduct] = useState(null);
  const { currentUser } = useSelector((state) => state.user);

  const TOKEN = currentUser?.access_token;
  const getProduct = async () => {
    setPending(true);
    try {
      const req = await axios.get(`http://localhost:4000/api/product/${id}`, {
        headers: {
          Token: `Bearer ${TOKEN}`,
        },
      });
      const res = await req.data;
      setProduct(res);
      setPending(false);
    } catch (error) {
      setPending(false);
    }
  };

  const editProduct = async () => {
    if (updatedProduct) {
      setPending(true);
      try {
        const req = await axios.put(
          `http://localhost:4000/api/product/update/${id}`,
          {
            ...updatedProduct,
          },
          {
            headers: {
              Token: `Bearer ${TOKEN}`,
            },
          }
        );
        setPending(false);
        setEdit(false);
        setAddItem("Product Successfully Edited");
        window.location.reload();
      } catch (error) {
        setPending(false);
        setAddItem("Something went wrong");
      }
    } else {
      setAddItem("You must edit ATLEAST ONE parameter");
      setPending(false);
    }
  };
  console.log(updatedProduct);
  useEffect(() => {
    getProduct();
  }, []);
  return (
    <div className="flex justify_between product_details_container">
      {addItem &&
        setTimeout(() => {
          setAddItem(false);
        }, 5000) && <ItemAdded text={addItem} />}
      <img src={product?.product_image} alt="" className="product_image" />
      <section className="product_details_section flex column gap1rem">
        {!edit ? (
          <section className="flex column gap1rem width100">
            <h5 className="product_name">{product?.product_name}</h5>
            <h5 className="product_desc">{product?.product_desc}</h5>
            <div className="product_ratings">
              <p>({product?.rating?.num_of_users_rated} people reviewed)</p>
            </div>
            <div className="product_price_container flex align_center gap1rem">
              <p className="in_stock_text">Price:</p>
              <div className="flex align_center gap1rem">
                <p className="product_price">{product?.price}</p>
                {/* <p className="product_price_off">2000</p>
                <p className="percent_off">70% off</p> */}
              </div>
            </div>
            <div className="flex gap1rem align_center">
              <p className="in_stock_text">Stocks:</p>
              <p className="in_stock">{product?.in_stock}</p>
            </div>
            <div className="flex gap1rem align_center">
              <p className="products_sold_text">Sold:</p>
              <p className="products_sold">{product?.sold}</p>
            </div>
          </section>
        ) : (
          <form
            onChange={(e) =>
              setUpdatedProduct((prev) => ({
                ...prev,
                [e.target.name]: e.target.value,
              }))
            }
            className="edit_product flex column gap1rem width100"
          >
            <h2 className="edtit_header">Edit Product Details</h2>
            <div className="flex column gap03rem">
              <label htmlFor="product_name">Edit Product Name</label>

              <input
                className="edit_product_input"
                type="text"
                name="product_name"
                id="product_name"
              />
            </div>
            <div className="flex column gap03rem">
              <label htmlFor="product_name">Edit Product Desc</label>

              <textarea
                className="edit_product_desc"
                type="text"
                name="product_desc"
                id="product_desc"
              />
            </div>
            <div className="flex justify_between">
              <div className="flex column gap03rem">
                <label htmlFor="">Edit Price</label>
                <input
                  className="edit_product_input"
                  type="number"
                  name="price"
                  id="product_price"
                />
              </div>

              <div className="flex column gap03rem">
                <label htmlFor="">Edit Price Percent</label>
                <input
                  className="edit_product_input"
                  type="number"
                  name=""
                  id="product_price_percentage"
                />
              </div>
            </div>

            <div className="flex column gap03rem">
              <label htmlFor="">Edit Stock</label>

              <input
                className="edit_product_input"
                type="number"
                name="in_stock"
                id="product_stock"
              />
            </div>
          </form>
        )}
        <div className="buttons">
          {!edit ? (
            <button
              onClick={() => setEdit(true)}
              className="edit_order_status_btn"
            >
              Edit product details
            </button>
          ) : (
            <div className="flex gap1rem">
              <button onClick={editProduct} className="edit_order_status_btn">
                Done
              </button>
              <button
                onClick={() => setEdit(false)}
                className="edit_order_status_btn"
              >
                Cancel
              </button>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Product_id;

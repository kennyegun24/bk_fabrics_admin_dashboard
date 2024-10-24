"use client";
import React, { useContext, useState } from "react";
// import "../style.css";
import { FaPlus } from "react-icons/fa6";
import { MainContext } from "@/context/Main";

const Page = () => {
  const [productToAdd, setProductToAdd] = useState({
    full_name: "",
    mobile_number: "",
    email_address: "",
    address: "",
  });
  const { setLoading } = useContext(MainContext);
  const onTextChange = (e) => {
    const { name, value } = e.target;
    setProductToAdd((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const createNewProduct = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const api = `/api/users/new`;

      const req = await fetch(api, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(productToAdd),
      });
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };
  return (
    <div className="new_form_container">
      <form onChange={(e) => onTextChange(e)} onSubmit={createNewProduct}>
        <h1>Add new user</h1>
        <hr />
        <div className="horizontal_inputs_container">
          <div>
            <label htmlFor="">Full Name:</label>
            <input placeholder="Full name" type="text" name="full_name" id="" />
            <p>Enter a user names here</p>
          </div>
          <div>
            <label htmlFor="">Email Address</label>
            <input
              placeholder="Email..."
              type="email"
              name="email_address"
              id=""
            />
            <p>Enter a valid email address.</p>
          </div>
        </div>
        <div className="horizontal_inputs_container">
          <div>
            <label htmlFor="">Mobile Number</label>
            <input
              placeholder="Mobile Number"
              type="number"
              name="mobile_number"
              id=""
            />
            <p>Customer Mobile Number</p>
          </div>
          <div>
            <label htmlFor="">Address</label>
            <input
              placeholder="Customer Address..."
              type="text"
              name="address"
              id=""
            />
            <p>Customer Address</p>
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
          }}
        >
          <FaPlus style={{ background: "transparent" }} />
          Add Customer
        </button>
      </form>
    </div>
  );
};

export default Page;

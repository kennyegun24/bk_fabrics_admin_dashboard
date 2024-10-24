"use client";
import React, { useContext, useState } from "react";
import { FaPlus } from "react-icons/fa6";
import { MainContext } from "@/context/Main";

const Page = () => {
  const { setLoading } = useContext(MainContext);
  const [productToAdd, setProductToAdd] = useState({
    service_name: "",
    service_description: "",
    price: null,
    timing: null,
    service_image: "",
  });
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
      const api = `https://reiki-crm.vercel.app/api/services/new`;

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
        <h1>Add new service</h1>
        <hr />
        <div className="horizontal_inputs_container">
          <div>
            <label htmlFor="">Nervice Name:</label>
            <input
              placeholder="Nervice name"
              type="text"
              name="service_name"
              id=""
            />
            <p>Enter a valid product name here</p>
          </div>
          <div>
            <label htmlFor="">Service Price:</label>
            <input placeholder="Price" type="number" name="price" id="" />
            <p>Enter a valid number here</p>
          </div>
        </div>
        <div className="horizontal_inputs_container">
          <div>
            <label htmlFor="">Timing:</label>
            <input placeholder="Timing" type="number" name="timing" id="" />
            <p>How long will this service take?</p>
          </div>
          <div>
            <label htmlFor="">Service Description:</label>
            <textarea
              placeholder="Service Description..."
              type="number"
              name="service_description"
              id=""
            />
            <p>Description of the Service</p>
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
          Add New Product
        </button>
      </form>
    </div>
  );
};

export default Page;

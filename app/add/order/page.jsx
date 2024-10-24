"use client";
import React, { useContext, useState } from "react";
import { FaPlus } from "react-icons/fa6";
import { MainContext } from "@/context/Main";
import { IoTrashOutline } from "react-icons/io5";

const Page = () => {
  const [fields, setFields] = useState([
    {
      id: Math.random(),
      product_name: "",
      quantity: "",
      price: "",
    },
  ]);
  const [newOrder, setNewOrder] = useState({
    customer_name: "",
    price: null,
    customer_email_address: null,
  });
  const { setLoading } = useContext(MainContext);
  const onTextChange = (e) => {
    const { name, value } = e.target;
    setNewOrder((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const createNewProduct = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const api = `/api/orders/new`;

      const req = await fetch(api, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...newOrder, products: fields }),
      });
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  const deleteField = (id) => {
    const newFields = fields.filter((each) => each.id !== id);
    setFields(newFields);
  };

  const addNewField = (e) => {
    e.preventDefault();
    setFields((prev) => [
      ...prev,
      {
        id: Math.random(),
        product_name: "",
        quantity: "",
        price: "",
      },
    ]);
  };

  const editField = (id, name, value) => {
    setFields((prev) =>
      prev.map((field) =>
        field.id === id ? { ...field, [name]: value } : field
      )
    );
  };

  console.log(newOrder);

  return (
    <div className="new_form_container">
      <form onChange={(e) => onTextChange(e)}>
        <h1>New Order Creation</h1>
        <hr />
        <div className="flex">
          <div className="order_inputs_container">
            <div>
              <label htmlFor="">Add products purchased:</label>
              {fields.map((field, _) => (
                <div key={_}>
                  <input
                    type="text"
                    placeholder="Product name"
                    value={field.product_name}
                    name="product_name"
                    onChange={(e) =>
                      editField(field.id, "product_name", e.target.value)
                    }
                  />
                  <input
                    type="text"
                    placeholder="Quantity"
                    value={field.quantity}
                    name="quantity"
                    onChange={(e) =>
                      editField(field.id, "quantity", e.target.value)
                    }
                  />
                  <input
                    type="text"
                    placeholder="Price"
                    value={field.price}
                    name="price"
                    onChange={(e) =>
                      editField(field.id, "price", e.target.value)
                    }
                  />

                  <div
                    onClick={() => deleteField(field.id)}
                    className="delete_new_field"
                  >
                    <IoTrashOutline color="#fff" />
                  </div>
                </div>
              ))}
            </div>
            <button
              className="create_new_fields add_new_button"
              onClick={addNewField}
            >
              <FaPlus style={{ background: "transparent" }} />
              New field
            </button>
          </div>
          <div className="vertical_inputs_container">
            <div>
              <label htmlFor="">Order Price:</label>
              <input placeholder="Price" type="number" name="price" id="" />
              <p>Enter a price of products purchased</p>
            </div>
            <div>
              <label htmlFor="">Customer Email Address:</label>
              <input
                placeholder="Email address..."
                type="email"
                name="customer_email_address"
                id=""
              />
              <p>Customer Email.</p>
            </div>
            <div>
              <label htmlFor="">Full Name:</label>
              <input
                placeholder="Full Name..."
                type="text"
                name="customer_name"
                id=""
              />
              <p>Customer Name.</p>
            </div>
          </div>
        </div>

        <button className="add_new_button" onClick={createNewProduct}>
          <FaPlus style={{ background: "transparent" }} />
          Add New Product
        </button>
      </form>
    </div>
  );
};

export default Page;

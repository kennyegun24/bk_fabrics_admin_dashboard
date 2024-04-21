import axios from "axios";
import React, { useState } from "react";
import { FaInfo } from "react-icons/fa";
import ItemAdded from "../ItemAdded";
import { useSelector } from "react-redux";
const DeliveryDetails = ({ order, id, setPending }) => {
  const [edit, setEdit] = useState(false);
  const delivered = order?.status;
  const [val, setVal] = useState("pending");
  const { currentUser } = useSelector((state) => state.user);

  const TOKEN = currentUser?.access_token;
  const [addItem, setAddItem] = useState(null);

  const updateStatus = async () => {
    setPending(true);
    try {
      const req = await axios.put(
        `https://bk-fabrics-server.vercel.app/api/orders/update/${id}`,
        {
          status: val,
          order_id: id,
        },
        {
          headers: {
            Token: `Bearer ${TOKEN}`,
          },
        }
      );
      setPending(false);
      setAddItem("Delivery Status Updated Successfully");
    } catch (error) {
      setPending(false);
      setAddItem("Delivery Status Couldn't get Updated");
      // console.log(error);
    }
  };
  return (
    <div className="flex column gap1rem">
      <h2 className="shipping_addres_text">Delivery Status</h2>
      {addItem &&
        setTimeout(() => {
          setAddItem(false);
        }, 5000) && <ItemAdded text={addItem} />}
      <div>
        <h5>
          {delivered?.toLowerCase() === "on delivery"
            ? "Product is on delivery"
            : delivered?.toLowerCase() === "pending"
            ? "Product is still yet to be sent for delivery"
            : delivered?.toLowerCase() === "delivered" &&
              "Product has been delivered"}
        </h5>
      </div>
      {edit && (
        <div className="flex column gap05rem">
          <select
            onChange={(e) => setVal(e.target.value)}
            className="edit_delivery_status"
            name="edit"
            id="edit"
          >
            <option value="pending">Pending</option>
            <option value="on delivery">On Delivery</option>
            <option value="delivered">Delivered</option>
          </select>
          <button onClick={updateStatus} className="edit_order_status_btn">
            Save
          </button>
        </div>
      )}
      <div className="flex column gap05rem">
        <div
          className="flex gap03rem align_center"
          style={{ fontSize: "12px" }}
        >
          <FaInfo />
          <p>
            Product delivery status has changed? If yes, then click the button
            below to edit status
          </p>
        </div>
        <button
          onClick={() => setEdit((prev) => !prev)}
          className="edit_order_status_btn"
        >
          {!edit ? "Edit" : "Cancel"}
        </button>
      </div>
    </div>
  );
};

export default DeliveryDetails;

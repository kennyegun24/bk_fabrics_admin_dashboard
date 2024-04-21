import React, { useEffect, useState } from "react";
import { orderData } from "../../../data/order_details";
import DeliveryDetails from "../../../components/orders/DeliveryDetails";
import axios from "axios";
import { addDays, format } from "date-fns";
import { useSelector } from "react-redux";

const Order_id = ({ setPending }) => {
  const amount = orderData.reduce((prev, init) => prev + init.price, 0);
  const path = window.location.pathname.split("/");
  const id = path[path.length - 1];
  const [order, setOrder] = useState(null);
  const { currentUser } = useSelector((state) => state.user);

  const TOKEN = currentUser?.access_token;
  const getOrder = async () => {
    setPending(true);
    try {
      const req = await axios.get(
        `https://bk-fabrics-server.vercel.app/api/orders/${id}`,
        {
          headers: {
            Token: `Bearer ${TOKEN}`,
          },
        }
      );
      const res = await req.data;
      setOrder(res);
      setPending(false);
      console.log(res);
    } catch (error) {
      setPending(false);
    }
  };
  console.log(order);
  const skjask = "65a7c70cad7688f78805253d";
  // const parsedDate = new Date(order?.createdAt);
  // const newDate = addDays(parsedDate, 3);

  // const formattedDate = format(parsedDate, "do, MMMM, yyyy");
  // const futureDate = format(newDate, "do, MMMM, yyyy");
  useEffect(() => {
    getOrder();
  }, []);

  return (
    order && (
      <div className="flex width100 column gap2rem justify_between order_details_page">
        <section className="flex column gap1rem width100 details_first_div">
          <h2 className="shipping_addres_text">Shipping Address</h2>
          <section className="details_first_sm_div flex column gap1rem">
            <div className="flex justify_between">
              <h4>Customer Name: </h4>
              <p>
                {order?.firstName} {order?.lastName}
              </p>
            </div>
            <hr />
            <div className="flex justify_between">
              <h4>Customer Email: </h4>
              <p>{order?.email}.</p>
            </div>
            <hr />
            <div className="flex justify_between">
              <h4>Telephone Number: </h4>
              <p>{order?.phoneNumber}.</p>
            </div>
            <hr />
            <div className="flex justify_between">
              <h4>Address: </h4>
              <p>{order?.address}</p>
            </div>
            <hr />
            <div className="flex justify_between">
              <h4>Zip Code: </h4>
              <p>{order?.postalCode}</p>
            </div>
            <hr />
            <div className="flex justify_between">
              <h4>City: </h4>
              <p>{order?.city}</p>
            </div>
            <hr />
            <div className="flex justify_between">
              <h4>State: </h4>
              <p>{order?.state}</p>
            </div>
            <hr />
            <div className="flex justify_between">
              <h4>Country: </h4>
              <p>{order?.country}</p>
            </div>
            <hr />
            <div className="flex justify_between">
              <h4>Order Date: </h4>
              <p>{format(new Date(order?.createdAt), "do, MMMM, yyyy")}</p>
            </div>
            <hr />
            <div className="flex justify_between">
              <h4>Expected delivery date: </h4>
              <p>
                {format(
                  addDays(new Date(order?.createdAt), 3),
                  "do, MMMM, yyyy"
                )}
              </p>
            </div>
          </section>
        </section>

        <section className="flex column gap1rem details_second_div">
          <h2 className="shipping_addres_text">Products Details</h2>

          <section className="width100 details_first_sm_div flex column gap1rem">
            <div className="width100 flex column gap05rem">
              <div className="product_Details_header flex justify_between">
                <h4 className="large_order_details">Item</h4>
                <h4 className="small_order_details">Quantity</h4>
                {/* <h4 className="small_order_details">Price</h4> */}
              </div>
              <hr />
            </div>
            <div className="flex gap1rem column">
              {order?.products?.map((order, _index) => (
                <>
                  <div className="flex justify_between align_center">
                    <div className="large_order_details flex align_center gap1rem">
                      {/* <img
                        src={order?.product_image}
                        style={{ width: 50, height: 50, borderRadius: "50%" }}
                        alt=""
                      /> */}
                      <p className="">{order.product_name}</p>
                    </div>
                    <p className="small_order_details">{order.quantity}</p>
                    {/* <p className="small_order_details">
                    {order?.price?.toFixed(2)}
                  </p> */}
                  </div>
                  <hr />
                </>
              ))}
              {/* <div className="flex align_center justify_between">
              <strong>TOTAL ($)</strong>
              <strong>{amount?.toFixed(2)}</strong>
            </div> */}
            </div>
          </section>
        </section>

        <section className="flex column gap1rem details_second_div">
          <DeliveryDetails order={order} id={id} setPending={setPending} />
        </section>
      </div>
    )
  );
};

export default Order_id;

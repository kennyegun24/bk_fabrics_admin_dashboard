// import { loadStripe } from "@stripe/stripe-js";
import { loginFailure, loginPending, loginSuccess } from "./user";
// import { resetOrder } from "./order";
// import { clearCart } from "./cart";
import axios from "axios";
const API_URL = "http://localhost:4000";

export const loginUser = async ({ email, password }, dispatch) => {
  try {
    dispatch(loginPending(true));
    const body = {
      password: password,
      email: email,
    };

    const axio = axios.create({
      baseURL: "http://localhost:4000/api/",
    });
    const req = await axio.post("/auth/login", body);
    const data = await req.data;
    dispatch(loginSuccess(await data));
  } catch (error) {
    dispatch(loginFailure(true));
    alert(error);
  }
};

import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import Users from "./pages/users/Users";
import Products from "./pages/products/Products";
import Order from "./pages/orders/Order";
import OrderId from "./pages/orders/id/Order_id";
import ProductId from "./pages/products/id/Product_id";
import SidENav from "./components/Side_nav";
import Statistics from "./pages/statistics/Statistics";
import NewProduct from "./pages/NewProduct";
import { useState } from "react";
import Loader from "./components/Loader";
import Login from "./pages/auth/Login";
import { useSelector } from "react-redux";

function App() {
  const [pending, setPending] = useState(false);
  const { currentUser } = useSelector((state) => state.user);
  const [pathName, setPathName] = useState(null);

  return (
    <div className="flex justify_between">
      {pathName !== "/login" && (
        <div className="sideNavMainDiv">
          <SidENav />
        </div>
      )}
      <div className="routesMainDiv">
        {pending && <Loader />}

        <Routes>
          <Route
            index
            element={
              !currentUser ? (
                <Navigate to={"/login"} />
              ) : (
                <Users setPending={setPending} />
              )
            }
          />
          <Route
            path="/products"
            element={
              !currentUser ? (
                <Navigate to={"/login"} />
              ) : (
                <Products setPending={setPending} />
              )
            }
          />
          <Route
            path="/orders"
            element={
              !currentUser ? (
                <Navigate to={"/login"} />
              ) : (
                <Order setPending={setPending} />
              )
            }
          />
          <Route
            path="/orders/:id"
            element={
              !currentUser ? (
                <Navigate to={"/login"} />
              ) : (
                <OrderId setPending={setPending} />
              )
            }
          />
          <Route
            path="/products/:id"
            element={
              !currentUser ? (
                <Navigate to={"/login"} />
              ) : (
                <ProductId setPending={setPending} />
              )
            }
          />
          <Route
            path="/product/new"
            element={
              !currentUser ? (
                <Navigate to={"/login"} />
              ) : (
                <NewProduct pending={pending} setPending={setPending} />
              )
            }
          />
          <Route
            path="/statistics"
            element={
              !currentUser ? (
                <Navigate to={"/login"} />
              ) : (
                <Statistics setPending={setPending} />
              )
            }
          />
          <Route
            path="/login"
            element={
              !currentUser ? (
                <Login setPathName={setPathName} />
              ) : (
                <Navigate to={"/"} />
              )
            }
          />
        </Routes>
      </div>
    </div>
  );
}

export default App;

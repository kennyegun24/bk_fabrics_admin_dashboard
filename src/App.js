import { Route, Routes } from "react-router-dom";
import "./App.css";
import Users from "./pages/users/Users";
import Products from "./pages/products/Products";
import Order from "./pages/orders/Order";
import OrderId from "./pages/orders/id/Order_id";
import ProductId from "./pages/products/id/Product_id";
import SidENav from "./components/Side_nav";
import Statistics from "./pages/statistics/Statistics";

function App() {
  return (
    <div className="flex justify_between">
      <div className="sideNavMainDiv">
        <SidENav />
      </div>
      <div className="routesMainDiv">
        <Routes>
          <Route index element={<Users />} />
          <Route path="/products" element={<Products />} />
          <Route path="/orders" element={<Order />} />
          <Route path="/orders/:id" element={<OrderId />} />
          <Route path="/products/:id" element={<ProductId />} />
          <Route path="/statistics" element={<Statistics />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;

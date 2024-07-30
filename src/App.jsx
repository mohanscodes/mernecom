import React, { useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useDispatch } from "react-redux";
import { get_category } from "./store/reducers/homeReducer";
import Home from "./pages/Home";
import Shops from "./pages/Shops";
import Card from "./pages/Card";
import Shipping from "./pages/Shipping";
import Details from "./pages/Details";
import Login from "./pages/Login";
import Register from "./pages/Register";
import CategoryShop from "./pages/CategoryShop";
import SearchProducts from "./pages/SearchProducts";
import Payment from "./pages/Payment";
import Dashboard from "./pages/Dashboard";
import ProtectUser from "./utils/ProtectUser";
import Index from "./components/dashboard/Index";
import Orders from "./components/dashboard/Orders";
import ChangePassword from "./components/dashboard/ChangePassword";
import Wishlist from "./components/dashboard/Wishlist";
import OrderDetails from "./components/dashboard/OrderDetails";
import Chat from "./components/dashboard/Chat";
import ConfirmOrder from "./pages/ConfirmOrder";
import OrderSuccess from "./pages/OrderSuccess";

import { useSelector } from "react-redux";

function App() {
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(get_category());
  }, [dispatch]);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/shops" element={<Shops />} />
        <Route path="/card" element={<Card />} />
        <Route path="/shipping" element={<Shipping />} />
        <Route path="/payment" element={<Payment />} />
        <Route path="/products" element={<CategoryShop />} />
        <Route path="/products/search" element={<SearchProducts />} />
        <Route path="/product/details/:slug" element={<Details />} />

        {userInfo && <Route path="/orderSuccess" element={<OrderSuccess />} />}

        <Route path="/dashboard" element={<ProtectUser />}>
          <Route path="" element={<Dashboard />}>
            <Route index element={<Index />} />
            <Route path="my-orders" element={<Orders />} />
            <Route path="change-password" element={<ChangePassword />} />
            <Route path="my-wishlist" element={<Wishlist />} />
            <Route path="order/details/:orderId" element={<OrderDetails />} />
            <Route path="order/confirm" element={<ConfirmOrder />} />
            <Route path="chat" element={<Chat />} />
            <Route path="chat/:sellerId" element={<Chat />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

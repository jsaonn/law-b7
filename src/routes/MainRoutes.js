import React from "react";
import { Routes, Route } from "react-router-dom";

import { Dashboard } from "../pages/dashboard/Dashboard";
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import RestaurantList from "../pages/restaurant/list/RestaurantList";
import RestaurantDetail from "../pages/restaurant/detail/RestaurantDetail";
import Cart from "../pages/cart/Cart";
import Order from "../pages/order/Order";
import OrderDetails from "../pages/order/OrderDetails"

const MainRoutes = () => {

    return(
        <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/restaurant" element={<RestaurantList />} />
            <Route path="/restaurant/:idRestaurant" element={<RestaurantDetail />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/order" element={<Order />} />
            <Route path="/order-details" element={<OrderDetails />} />
        </Routes>
    )

}

export default MainRoutes;

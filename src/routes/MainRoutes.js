import React from "react";
import { Routes, Route } from "react-router-dom";

import { Dashboard } from "../pages/dashboard/Dashboard";
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import RestaurantList from "../pages/restaurant/list/RestaurantList";
import RestaurantDetail from "../pages/restaurant/detail/RestaurantDetail";
import Cart from "../pages/cart/Cart"

const MainRoutes = () => {

    return(
        <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/restaurant" element={<RestaurantList />} />
            <Route path="/restaurant/:idRestaurant" element={<RestaurantDetail />} />
            <Route path="/cart" element={<Cart />} />
        </Routes>
    )

}

export default MainRoutes;

import React, {useContext} from "react";
import { Routes, Route } from "react-router-dom";

import { Dashboard } from "../pages/dashboard/Dashboard";
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import RestaurantList from "../pages/restaurant/list/RestaurantList";
import RestaurantDetail from "../pages/restaurant/detail/RestaurantDetail";
import Cart from "../pages/cart/Cart"
import { UserContext } from "../pages/auth/UserContext"
import { Navigate } from "react-router-dom";

const MainRoutes = () => {
    const { user } = useContext(UserContext);

    return(
        <Routes>
            <Route path="/" element={<Dashboard />} />
            {
                !user && ( 
                    <>
                        <Route path="/login" element={<Login />} />
                        <Route path="/register" element={<Register />} />
                    </>
                )
            }
            {
                user && (
                    <>
                        <Route path="/restaurant" element={<RestaurantList />} />
                        <Route path="/restaurant/:idRestaurant" element={<RestaurantDetail />} />
                        <Route path="/cart" element={<Cart />} />
                    </>
                )
            }
            {/* if routes unaccessible, redirect to dashboard */}
            <Route path="*" element={<Navigate to="/" />}/>
        </Routes>
    )

}

export default MainRoutes;

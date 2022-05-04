import React from "react";
import { Routes, Route } from "react-router-dom";

import { Dashboard } from "../Pages/Dashboard/Dashboard";

const MainRoutes = () => {

    return(
        <Routes>
            <Route path="/" element={<Dashboard />} />
        </Routes>
    )

}

export default MainRoutes;
import React, { useContext } from "react";
import './Dashboard.css';
import { Navigate } from "react-router-dom";
import { UserContext } from "../auth/UserContext";

export const Dashboard = () => {
    const { user } = useContext(UserContext);
    if (user !== null) {return <Navigate to='/restaurant' />}

    return(
        <div className="dash">
            <h1 className="dash-header">Selamat Datang di TK LAW B7</h1>
            <p>Silahkan login terlebih dahulu untuk melihat menu restoran dan memesan makanan.</p>
            <div className="dash-buttons">
                <a href="/login"><button className="dash-btn-block dash-btn-dark">Login</button></a><br/>
                <a href="/register"><button className="dash-btn-block dash-btn">Register</button></a>
            </div>
        </div>
    )
    
}
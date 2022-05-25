import React, { useContext } from 'react';
import './Header.css';
import axiosInstance from '../../pages/auth/axiosAuth';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../pages/auth/UserContext';

function Header() {
    const { user, setUser } = useContext(UserContext);

    const navigate = useNavigate();
    const handleLogout = () => {
        const response = axiosInstance.post('user/logout/blacklist/', {
            refresh_token: localStorage.getItem('refresh_token'),
        });
        console.log(response);
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        axiosInstance.defaults.headers['Authorization'] = null;
        setUser(null);
        navigate('/login');
    } 

    return (
        <div>
            <div className="nav">
                <a href="/">TK LAW B7</a>
                {user === null ? 
                <div className="nav-leftbtn">
                    <a href="/login">Login</a>
                    <a href="/register">Register</a>
                </div>
                :
                <div className="nav-leftbtn">
                    <a href="" onClick={handleLogout}>Logout</a>
                </div>}
            </div>

        </div>
    );
}

export default Header;
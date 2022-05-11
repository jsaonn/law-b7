import React, { useState, useContext } from "react";
import './Auth.css';
import axiosInstance from './axiosAuth';
import { useNavigate, Navigate } from 'react-router-dom';
import { UserContext } from "./UserContext";

const Register = () => {
    const navigate = useNavigate();
    const { user } = useContext(UserContext);

    const [formData, setFormData] = useState({email:'', username:'', password:''});

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value.trim(),
        });
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(formData);

        axiosInstance.post('user/register/', {
            email: formData.email,
            user_name: formData.username,
            password: formData.password,
        })
        .then((res) => {
            navigate('/login');
        });
    }

    if (user !== null) {return <Navigate to='/restaurant' />}

    return(
        <div className="auth">
            <div className="auth-form">
            <form action="" className="reg-padding">
                <h2 className="auth-header">Register</h2><br/>
                <div className="form-group">
                    <label>Username</label>
                    <input 
                        name="username"
                        type="text" 
                        class="form-control"
                        required="required"
                        onChange={handleChange}
                    />
                    <br/>
                    <label>Email</label>
                    <input 
                        name="email"
                        type="text" 
                        class="form-control"
                        required="required"
                        onChange={handleChange}
                    />
                    <br/>
                    <label>Password</label>
                    <input 
                        name="password"
                        type="password" 
                        class="form-control"
                        required="required"
                        onChange={handleChange}
                    />
                    <br/><br/>
                    <div className="pt-3">
                        <button type="submit" className="auth-btn-block auth-btn-dark" onClick={handleSubmit}>Register</button>
                    </div>
                </div>
                <div className="auth-center"><br/>
                    <p>Sudah punya akun? <a href="/login">Login</a></p>
                </div>        
            </form>
            </div>
        </div>
    )
    
}

export default Register;
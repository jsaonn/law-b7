import React, { useContext, useState } from "react";
import './Auth.css';
import axiosInstance from './axiosAuth';
import { useNavigate, Navigate } from 'react-router-dom';
import { UserContext } from "./UserContext";
import jwt_decode from "jwt-decode";

const Login = () => {
    const { user, setUser } = useContext(UserContext);

    const navigate = useNavigate();

    const [formData, setFormData] = useState({email: '', password: '',});

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value.trim(),
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        axiosInstance
            .post('token/', {
                email: formData.email,
                password: formData.password,
            })
            .then((res) => {
                localStorage.setItem('access_token', res.data.access);
                localStorage.setItem('refresh_token', res.data.refresh);
                axiosInstance.defaults.headers['Authorization'] =
                    'JWT ' + res.data.access;
                axiosInstance.get('user/').then((res) => {
                    let loggedUser = res.data;
                    loggedUser['user_id'] = jwt_decode(localStorage.getItem('access_token'))['user_id'];
                    setUser(loggedUser);
                    localStorage.setItem('user', JSON.stringify(loggedUser));
                    navigate('/');
                }, (err) => {
                    console.log(err.response.data);
                    alert("Terdapat error fetch data user. Coba kembali beberapa saat lagi.")
                })
            }, (err) => {
                console.log(err.response.data);
                alert("Terdapat error saat login. Pastikan email dan password Anda sudah benar.")
            });
    };

    if (user !== null) {return <Navigate to='/restaurant' />}

    return(
        <div className="auth">
            <div className="auth-form">
            <form action="">
                <h2 className="auth-header login-header">Login</h2><br/>
                <div className="form-group">
                    <label>Email</label><br/>
                    <input 
                        name="email"
                        type="text" 
                        class="form-control"
                        required="required"
                        onChange={handleChange}
                    />
                    <br/>
                    <label>Password</label><br/>
                    <input 
                        name="password"
                        type="password" 
                        class="form-control"
                        required="required"
                        onChange={handleChange}
                    />
                    <br/><br/>
                    <div className="pt-3">
                        <button type="submit" className="auth-btn-block auth-btn-dark" onClick={handleSubmit}>Login</button>
                    </div>
                </div>
                <div className="auth-center"><br/>
                    <p>Belum punya akun? <a href="/register">Buat akun baru</a></p>
                </div>        
            </form>
            </div>
        </div>
    )
    
}

export default Login;
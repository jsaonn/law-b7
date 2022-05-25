import React, { useState, useContext } from "react";
import './Auth.css';
import axiosInstance from './axiosAuth';
import { useNavigate, Navigate } from 'react-router-dom';
import { UserContext } from "./UserContext";

const Register = () => {
    const navigate = useNavigate();
    const { user } = useContext(UserContext);

    const [formData, setFormData] = useState({email:'', username:'', password:'', firstname:'', lastname:'', phonenumber:''});

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value.trim(),
        });
    }

    function valid() {
        let inputs = document.getElementsByTagName("input");
        for(var input of inputs) {
            if (input.value === "") {
                return false
            }
        }
        return true;
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (valid()) {
            axiosInstance.post('user/register/', {
                email: formData.email,
                user_name: formData.username,
                password: formData.password,
                first_name: formData.firstname,
                last_name: formData.lastname,
                phone_number: formData.phonenumber
            })
            .then((res) => {
                navigate('/login');
            }, (err) => {
                alert("Terdapat error saat register")
            });
        } else {
            alert("Pastikan semua field terisi")
        }
    }

    if (user !== null) {return <Navigate to='/restaurant' />}

    return(
        <div className="auth">
            <div className="auth-form reg-form">
            <form action="" className="reg-padding">
                <h2 className="reg-header">Register</h2><br/>
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
                    <label>First Name</label>
                    <input 
                        name="firstname"
                        type="text" 
                        class="form-control"
                        required="required"
                        onChange={handleChange}
                    />
                    <label>Last Name</label>
                    <input 
                        name="lastname"
                        type="text" 
                        class="form-control"
                        required="required"
                        onChange={handleChange}
                    />
                    <label>Phone Number</label>
                    <input 
                        name="phonenumber"
                        type="text" 
                        class="form-control"
                        pattern='[0-9]*'
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
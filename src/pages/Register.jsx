import axios from 'axios';
import React from 'react'
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import styled from 'styled-components';
import logo from '../assets/logo.svg';
import { registerRoute } from '../utils/APIRoutes';
import 'react-toastify/dist/ReactToastify.css';
import { useEffect } from 'react';

const Register = () => {
    const [values, setValues] = useState({
        username: "",
        email: "",
        password: "",
        confirmPassword: ""
    });

    const navigate = useNavigate();

    const toastOptions = {
        position: "top-right",
        autoClose: 5000,
        pauseOnHover: true,
        draggable: true,
        theme: "dark"
    }

    useEffect(() => {
        if (localStorage.snappyUser) {
            navigate("/chat");
        }
    }, [])

    const handleValidation = () => {
        const { username, email, password, confirmPassword } = values;

        if (username.trim() === "" && email.trim() === "" && password.trim() === "" && confirmPassword.trim() === "") {
            toast.error("Fields cannot be blank!!!", toastOptions);
            return false;

        } else if (email === "") {
            toast.error("Email field cannot be blank", toastOptions);
            return false;

        } else if (password !== confirmPassword) {
            toast.error("Password does not match", toastOptions);
            return false;

        } else if (username.length < 3) {
            toast.error("Username must be more than three characters", toastOptions);
            return false;

        } else if (password.length < 8) {
            toast.error("Password should be 8 characters of more", toastOptions);
            return false;

        } else {
            return true;
        }

    }

    // Signup
    const handleSubmit = async (e) => {
        e.preventDefault();


        if (handleValidation()) {
            const userData = {
                username: values.username,
                email: values.email,
                password: values.password
            }
            
            const { data } = await axios.post(registerRoute, userData);
            
            if (data.status === true) {
                // localStorage.setItem("snappyUser", JSON.stringify(data.user));
                toast.success("Registration succesfull!!", toastOptions);

                setTimeout(() => {  
                    navigate("/login");
                }, 2500);
            } else {
                toast.error(data.message, toastOptions);
            }
        }
    }

    const handleChange = (e) => {
        e.preventDefault()

        setValues({ ...values, [e.target.name]: e.target.value })
    }


    return (
        <>
            <FormContainer>
                <form onSubmit={(e) => handleSubmit(e)}>
                    <div className="brand">
                        <img src={logo} alt="logo" />
                        <h1>snappy</h1>
                    </div>

                    <input
                        type="text"
                        placeholder="Username"
                        name="username"
                        onChange={(e) => handleChange(e)}
                    />
                    <input
                        type="text"
                        placeholder="Email"
                        name="email"
                        onChange={(e) => handleChange(e)}
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        name="password"
                        autoComplete="true"
                        onChange={(e) => handleChange(e)}
                    />
                    <input
                        type="password"
                        placeholder="Confirm Password"
                        name="confirmPassword"
                        autoComplete="true"
                        onChange={(e) => handleChange(e)}
                    />

                    <button type='submit'>Register</button>
                    <span>
                        Already have an account? <Link to='/login'>Login</Link>
                    </span>
                </form>

                <ToastContainer />
            </FormContainer>
        </>
    );
}

const FormContainer = styled.div`
    height: 100vh;
    width: 100vw;
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 1rem;
    align-items: center;
    background-color: #131324;
    
    .brand {
        display: flex;
        align-items: center;
        gap: 1rem;
        justify-content: center;
    
        img {
            height: 5rem;
        }

        h1 {
            color: white;
            text-transform: uppercase;
        }
    }

    form {
        display: flex;
        flex-direction: column;
        gap: 2rem;
        background-color: #00000076;
        border-radius: 2rem;
        padding: 3rem 5rem;

        input {
            background-color: transparent;
            padding: 1rem;
            border: 0.1rem solid #4e0eff;
            border-radius: 0.4rem;
            color: white;
            width: 100%;
            font-size: 1rem;
            &: focus {
                border: 0.1rem solid #997af0;
                outline: none;
            }
        }

        button {
            background-color: #997af0;
            color: white;
            padding: 1rem 2rem;
            border: none;
            font-weight: bold;
            cursor: pointer;
            border-radius: 0.4rem;
            font-size: 1rem;
            text-transform: uppercase;
            transition: 0.5s ease-in-out;
            &:hover {
                background-color: #4e0eff;
            }
        }

        span {
            color: white;
            text-transform: uppercase;

            a {
                text-decoration: none;
                font-weight: bold;
                color: #4e0eff; 
            }
        }
    }
`;


export default Register
import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from './AuthContext'; // Ensure you have created this context
import '../styles/SignIn.css';

const SignIn = () => {
    const [formData, setFormData] = useState({
        username: '',
        password: ''
    });
    const [errors, setErrors] = useState({});
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();

    const validateForm = () => {
        let tempErrors = {};
        tempErrors.username = formData.username ? "" : "Username is required.";
        tempErrors.password = formData.password.length >= 8 ? "" : "Password must be at least 8 characters long.";
        setErrors(tempErrors);
        return Object.values(tempErrors).every(x => x === "");
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (validateForm()) {
            try {
                // Simulate API call
                login({ username: formData.username }); // Update the login logic as per your API
                navigate('/'); // Redirect to home on successful login
            } catch (error) {
                console.error('Login error:', error);
                setErrors(prevErrors => ({ ...prevErrors, form: 'Failed to log in.' }));
            }
        }
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData(prevFormData => ({
            ...prevFormData,
            [name]: value
        }));
    };

    return (
        <div className="signin-container">
            <div className="form-box">
                <h2>Welcome Back</h2>
                <p>Enter your credentials to login</p>
                <form onSubmit={handleSubmit}>
                    <input type="text" name="username" placeholder="Username" value={formData.username} onChange={handleChange} />
                    {errors.username && <p className="error">{errors.username}</p>}
                    <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} />
                    {errors.password && <p className="error">{errors.password}</p>}
                    <button type="submit">Login</button>
                    {errors.form && <p className="error">{errors.form}</p>}
                </form>
            </div>
        </div>
    );
};

export default SignIn;

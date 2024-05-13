import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from './AuthContext'; // Ensure this context is created
import '../styles/SignUp.css';

const SignUp = () => {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: ''
    });
    const [errors, setErrors] = useState({});
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();

    const validateForm = () => {
        let tempErrors = {};
        tempErrors.username = formData.username ? "" : "Username is required.";
        tempErrors.email = formData.email.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i) ? "" : "Email is not valid.";
        tempErrors.password = formData.password.length >= 8 ? "" : "Password must be at least 8 characters long.";
        tempErrors.confirmPassword = formData.password === formData.confirmPassword ? "" : "Passwords do not match.";
        setErrors(tempErrors);
        return Object.values(tempErrors).every(x => x === "");
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (validateForm()) {
            try {
                // Simulate API call
                login({ username: formData.username }); // Update as per your API
                navigate('/'); // Navigate to home on successful signup
            } catch (error) {
                console.error('Signup error:', error);
                setErrors(prevErrors => ({ ...prevErrors, form: 'Failed to sign up.' }));
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
        <div className="signup-container">
            <div className="form-box">
                <h2>Sign Up</h2>
                <p>Create your account</p>
                <form onSubmit={handleSubmit}>
                    <input type="text" name="username" placeholder="Username" value={formData.username} onChange={handleChange} />
                    {errors.username && <p className="error">{errors.username}</p>}
                    <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} />
                    {errors.email && <p className="error">{errors.email}</p>}
                    <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} />
                    {errors.password && <p className="error">{errors.password}</p>}
                    <input type="password" name="confirmPassword" placeholder="Confirm Password" value={formData.confirmPassword} onChange={handleChange} />
                    {errors.confirmPassword && <p className="error">{errors.confirmPassword}</p>}
                    <button type="submit">Sign Up</button>
                    {errors.form && <p className="error">{errors.form}</p>}
                </form>
            </div>
        </div>
    );
};

export default SignUp;

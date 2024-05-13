import React, { useState } from 'react';
import '../styles/SignIn.css';

const SignIn = () => {
    // State to hold form values
    const [formData, setFormData] = useState({
        username: '',
        password: ''
    });

    // Function to handle form input changes
    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    // Function to handle form submission
    const handleSubmit = async (event) => {
        event.preventDefault();

        // Post credentials to the backend via API for validation
        try {
            const response = await fetch('http://localhost:3000/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    username: formData.username,
                    password: formData.password
                })
            });
            const data = await response.json();
            if (!response.ok) {
                throw new Error(data.message || "Login failed");
            }
            alert('Login successful');
            // Here you could handle navigation to another route or set user session details
        } catch (error) {
            alert(error.message);
        }
    };

    return (
        <div className="signin-container">
            <div className="form-box">
                <h2>Welcome Back</h2>
                <p>Enter your credentials to login</p>
                <form onSubmit={handleSubmit}>
                    <input type="text" name="username" placeholder="Username" value={formData.username} onChange={handleChange} />
                    <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} />
                    <button type="submit">Login</button>
                </form>
            </div>
        </div>
    );
};

export default SignIn;

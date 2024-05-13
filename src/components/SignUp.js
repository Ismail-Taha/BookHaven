import React, { useState } from 'react';
import '../styles/SignUp.css';

const SignUp = () => {
    // State to hold form values
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: ''
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
        // Add validation for passwords match or any other checks

        if (formData.password !== formData.confirmPassword) {
            alert("Passwords do not match.");
            return;
        }

        // Post data to the backend via API
        try {
            const response = await fetch('http://localhost:3000/users', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name: formData.username,
                    email: formData.email,
                    password: formData.password // Assuming your backend does the hashing
                })
            });
            const data = await response.json();
            if (!response.ok) {
                throw new Error(data.message || "An error occurred while registering");
            }
            alert('Registration successful');
            // Redirect user or clear form
            setFormData({ username: '', email: '', password: '', confirmPassword: '' });
        } catch (error) {
            alert(error.message);
        }
    };

    return (
        <div className="signup-container">
            <div className="form-box">
                <h2>Sign Up</h2>
                <p>Create your account</p>
                <form onSubmit={handleSubmit}>
                    <input type="text" name="username" placeholder="Username" value={formData.username} onChange={handleChange} />
                    <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} />
                    <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} />
                    <input type="password" name="confirmPassword" placeholder="Confirm Password" value={formData.confirmPassword} onChange={handleChange} />
                    <button type="submit">Sign Up</button>
                </form>
            </div>
        </div>
    );
};

export default SignUp;

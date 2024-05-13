import { useState } from 'react';

const BASE_URL = 'http://localhost:3000';

export const useAuth = () => {
    const [authToken, setAuthToken] = useState(localStorage.getItem('token') || null);

    const loginUser = async (email, password) => {
        try {
            const response = await fetch(`${BASE_URL}/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, password })
            });
            const data = await response.json();
            if (!response.ok) {
                throw new Error(data.message || "Login failed");
            }
            localStorage.setItem('token', data.token); // Save the token to local storage
            setAuthToken(data.token);
            return data;
        } catch (error) {
            console.error('Login Error:', error);
            return { error };
        }
    };

    const registerUser = async (username, email, password) => {
        try {
            const response = await fetch(`${BASE_URL}/users`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${authToken}` // Include the auth token in the header
                },
                body: JSON.stringify({ username, email, password })
            });
            const data = await response.json();
            if (!response.ok) {
                throw new Error(data.message || "Registration failed");
            }
            return data;
        } catch (error) {
            console.error('Registration Error:', error);
            return { error };
        }
    };

    const logoutUser = () => {
        localStorage.removeItem('token'); // Clear the token from local storage
        setAuthToken(null);
    };

    return { loginUser, registerUser, logoutUser, authToken };
};

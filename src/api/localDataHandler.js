// Base URL for the JSON-Server;
const BASE_URL = 'http://localhost:3000';

export const registerUser = async (email, password) => {
    try {
        const response = await fetch(`${BASE_URL}/users`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        });
        const data = await response.json();
        if (!response.ok) {
            throw new Error(data.message || 'Failed to register');
        }
        return { success: true, message: 'User registered successfully.', data };
    } catch (error) {
        return { success: false, message: error.message };
    }
};

export const loginUser = async (email, password) => {
    try {
        const response = await fetch(`${BASE_URL}/users`);
        const users = await response.json();
        const user = users.find(u => u.email === email);
        if (!user) {
            return { success: false, message: 'User not found.' };
        }
        // Assuming the server checks the password and returns a flag or token
        const isValid = await fetch(`${BASE_URL}/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        }).then(res => res.json());

        if (!isValid) {
            return { success: false, message: 'Invalid credentials.' };
        }

        return { success: true, message: 'Login successful.' };
    } catch (error) {
        return { success: false, message: error.message };
    }
};

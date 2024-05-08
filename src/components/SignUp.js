import React, { useState } from 'react';
import { registerUser } from '../api/localDataHandler';

const SignUp = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        registerUser(email, password);
        alert('Registration successful!');
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
            />
            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
            />
            <button type="submit">Sign Up</button>
        </form>
    );
};

export default SignUp;

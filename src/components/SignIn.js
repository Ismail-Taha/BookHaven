import React from 'react';
import '../styles/SignIn.css';

const SignIn = () => {
    return (
        <div className="signin-container">
            <div className="form-box">
                <h2>Welcome Back</h2>
                <p>Enter your credentials to login</p>
                <form>
                    <input type="text" placeholder="Username" />
                    <input type="password" placeholder="Password" />
                    <button type="submit">Login</button>
                </form>
            </div>
        </div>
    );
};

export default SignIn;

import React from 'react';
import '../styles/SignUp.css';

const SignUp = () => {
    return (
        <div className="signup-container">
            <div className="form-box">
                <h2>Sign Up</h2>
                <p>Create your account</p>
                <form>
                    <input type="text" placeholder="Username" />
                    <input type="email" placeholder="Email" />
                    <input type="password" placeholder="Password" />
                    <input type="password" placeholder="Confirm Password" />
                    <button type="submit">Sign Up</button>
                </form>
            </div>
        </div>
    );
};

export default SignUp;

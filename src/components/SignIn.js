//components/SignIn.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../AuthContext';
import '../styles/SignIn.css';

const SignIn = () => {
  const { login } = useAuth();
  const [formData, setFormData] = useState({ username: '', password: '' });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const validateForm = () => {
    let tempErrors = {};
    tempErrors.username = formData.username ? "" : "Username is required.";
    tempErrors.password = formData.password.length >= 8 ? "" : "Password must be at least 8 characters long.";
    setErrors(tempErrors);
    return Object.values(tempErrors).every(x => x === "");
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (validateForm()) {
      login({ username: formData.username });
      navigate('/books');  // Navigate to /books after login
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData(prevFormData => ({ ...prevFormData, [name]: value }));
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
        </form>
      </div>
    </div>
  );
};

export default SignIn;

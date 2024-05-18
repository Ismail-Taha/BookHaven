//components/NavBar.js
import React from 'react';
import { NavLink } from 'react-router-dom';  // Use NavLink for navigation
import '../styles/NavBar.css';
import logo from '../assets/logoBH.png';

const NavBar = () => {
  return (
    <nav className="navbar">
      <img src={logo} alt="Logo" className="nav-logo"/>
      <ul className="nav-links">
        <li><NavLink to="/">Home</NavLink></li>
        <li><NavLink to="/books">Browse Books</NavLink></li>
        <li><NavLink to="/signin">Sign In</NavLink></li>
        <li><NavLink to="/signup">Sign Up</NavLink></li>
      </ul>
    </nav>
  );
};

export default NavBar;

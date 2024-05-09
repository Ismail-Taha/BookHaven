import React from 'react';
import '../styles/NavBar.css';
import logo from '../assets/logoBH.png';

const NavBar = () => {
    return (
        <nav className="navbar">
            <img src={logo} alt="Logo" className="nav-logo"/>
            <ul className="nav-links">
                <li><a href="/">Home</a></li>
                <li><a href="/books">Browse Books</a></li>
                <li><a href="/signin">Sign In</a></li>
                <li><a href="/signup">Sign Up</a></li>
            </ul>
        </nav>
    );
};

export default NavBar;

import React from 'react';
import '../styles/NavBar.css';

const NavBar = () => {
    return (
        <nav className="navbar">
            <ul className="nav-links">
                <li><a href="#home">Home</a></li>
                <li><a href="#books">Browse Books</a></li>
                <li><a href="#signin">Sign In</a></li>
                <li><a href="#signup">Sign Up</a></li>
            </ul>
        </nav>
    );
};

export default NavBar;

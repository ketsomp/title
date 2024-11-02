import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css'; // You can style this file as needed

const Navbar = () => {
  return (
    <header className="navbar">
      <div className="logo">MediaPlanner</div>
      <nav>
      <Link to="#home">Features</Link>
        <Link to="#features">Features</Link>
        <Link to="#about">About</Link>
        <Link to="/contact">Contact</Link>
      </nav>
    </header>
  );
};

export default Navbar;

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/NavBar.css';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };

  const closeNavbar = () => {
    setIsOpen(false);  // Close the navbar when any link is clicked
  };

  return (
    <nav className="navbar">
      {/* Logo */}
      <div className="logo">
        <Link className="logo-link" to="./live">
          <h1>Logo</h1>
        </Link>
      </div>

      {/* Hamburger Icon */}
      <div className="hamburger" onClick={toggleNavbar}>
        <span className="hamburger-icon">&#9776;</span>
      </div>

      {/* Navbar Links - Toggle visibility based on screen size */}
      <div className={`navbar-links ${isOpen ? 'open' : ''}`}>
        <div className="close-btn" onClick={toggleNavbar}>
          &times; {/* Close icon */}
        </div>
        <Link to="/live" onClick={closeNavbar}>Live Scores</Link>
        <Link to="/upcoming" onClick={closeNavbar}>Upcoming Matches</Link>
        <Link to="/standings" onClick={closeNavbar}>Standings</Link>
        <Link to="/score" onClick={closeNavbar}>Top Scorers</Link>
      </div>
    </nav>
  );
};

export default Navbar;

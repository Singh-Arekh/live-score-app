import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/NavBar.css'
const Navbar = () => {
  return (
    <nav className="navbar">
      {/* Logo */}
      <div className="logo">
        <h1>Logo</h1>
      </div>

      {/* Navbar Links */}
      <div className="navbar-links">
        <Link to="/live">Live Scores</Link>
        <Link to="/upcoming">Upcoming Matches</Link>
        <Link to="/standings">Standings</Link>
        <Link to="/score">Top Scorers</Link>
      </div>
    </nav>
  );
};

export default Navbar;

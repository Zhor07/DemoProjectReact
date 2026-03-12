import React from "react";
import "../Navbar.css";

function Navbar({ onLogout, goToPatients, goToData }) {
  return (
    <nav className="navbar">
      <div className="navbar-logo">MyPortfolio</div>
      <ul className="navbar-links">
        <li>
          <a href="#doc" onClick={goToPatients}>
            Documents
          </a>
        </li>
       
        <li>
          <a href="#projects" onClick={onLogout}>
            Logout
          </a>
        </li>
        <li>
          <a href="#contact">Contact</a>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
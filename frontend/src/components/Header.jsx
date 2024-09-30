import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <nav className="header">
      <ul className="nav-list">
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/login">Login</Link>
        </li>
        <li>
          <Link to="/signup">Signup</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Header;

// Header.js
import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Header = () => {
  const location = useLocation();

  return (
    <header>
      <div>
       <nav id="navmenu" className="navmenu">
        <ul>
          <li>
            <Link to="/" className={location.pathname === '/' ? 'active' : ''}>Home</Link>
          </li>
          <li>
            <Link to="/about" className={location.pathname === '/about' ? 'active' : ''}>About</Link>
          </li>
          <li>
            <Link to="/services" className={location.pathname === '/services' ? 'active' : ''}>Services</Link>
          </li>
          <li>
            <Link to="/pricing" className={location.pathname === '/pricing' ? 'active' : ''}>Pricing</Link>
          </li>
          <li>
            <Link to="/contact" className={location.pathname === '/contact' ? 'active' : ''}>Contact</Link>
          </li>
        </ul>        
        <i className="mobile-nav-toggle d-xl-none bi bi-list"></i>
      </nav>
      
      </div>
    </header>
  );
};

export default Header;

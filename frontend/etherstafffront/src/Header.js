import React from 'react';
import Navbar from './Navbar';
import { Link, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Header = () => {
  const location = useLocation();
  const user = useSelector(state => state.user.user); 
  console.log('User state:', user);

  return (
    <header id="header" className="header d-flex align-items-center fixed-top">
      <div className="container-fluid container-xl position-relative d-flex align-items-center">
        <a href="/" className="logo d-flex align-items-center me-auto">
          
          {/* <img src="assets/img/logo.png" alt="logo" /> */}
          <h1 className="sitename">Etherstaff Ltd.</h1>
        </a>
        <Navbar />

        {/* Conditional rendering based on user authentication */}
        {!user && (
          <Link to="/login" className={location.pathname === '/login' ? 'active btn-getstarted' : 'btn-getstarted'}>
            Login
          </Link>
        )}
        {user && (
          <Link to="/dashboard" className={location.pathname === '/dashboard' ? 'active btn-getstarted' : 'btn-getstarted'}>
            Dashboard
          </Link>
        )}
      </div>
    </header>
  );
}

export default Header;

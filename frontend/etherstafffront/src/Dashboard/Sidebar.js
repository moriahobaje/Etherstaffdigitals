// src/Dashboard/Sidebar.js
import React from 'react';
// import { Link } from 'react-router-dom';

const Sidebar = () => {
  return (
    <aside id="sidebar" className="sidebar">
      <ul className="sidebar-nav" id="sidebar-nav">
        <li className="nav-item">
          <a className="nav-link collapsed" href="/dashboard">
            <i className="bi bi-card-list"></i>
            <span>Dashboard</span>
          </a>
          {/* <Link className="nav-link" to="/dashboard">
            <i className="bi bi-grid"></i>
            <span>Dashboard</span>
          </Link> */}
        </li>
        <li className="nav-heading">Pages</li>
        <li className="nav-item">
          <a className="nav-link collapsed" href="/profile">
            <i className="bi bi-card-list"></i>
            <span>Profile</span>
          </a>
          {/* <Link className="nav-link collapsed" to="/profile">
            <i className="bi bi-person"></i>
            <span>Profile</span>
          </Link> */}
        </li>
        <li className="nav-item">
          <a className="nav-link collapsed" href="/contact">
            <i className="bi bi-envelope"></i>
            <span>Contact</span>
          </a>
        </li>
        <li className="nav-item">
          <a className="nav-link collapsed" href="/Signup">
            <i className="bi bi-card-list"></i>
            <span>Create New Worker</span>
          </a>
        </li>
        <li className="nav-item">
          <a className="nav-link collapsed" href="/signupagent">
            <i className="bi bi-card-list"></i>
            <span>Create New Agent</span>
          </a>
        </li>
        <li className="nav-item">
          <a className="nav-link collapsed" href="/ViewAgents">
            <i className="bi bi-card-list"></i>
            <span>View Agents</span>
          </a>
        </li>
        <li className="nav-item">
          <a className="nav-link collapsed" href="/ViewWorkers">
            <i className="bi bi-card-list"></i>
            <span>View Workers</span>
          </a>
        </li>
        {/* <li className="nav-item">
          <a className="nav-link collapsed" href="/login">
            <i className="bi bi-box-arrow-in-right"></i>
            <span>Login</span>
          </a>
        </li> */}
      </ul>
    </aside>
  );
};

export default Sidebar;

import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import '../App.css';

const Header = () => {
  const { user, logout } = useAuth();
  const location = useLocation();

  const isActive = (path) => location.pathname.startsWith(path);

  return (
    <header className="header">
      <div className="header-left">
        <h1 className="header-title">📋 Task Manager</h1>
        <nav className="header-nav">
          <Link to="/dashboard" className={isActive('/dashboard') ? 'active' : ''}>
            Dashboard
          </Link>
          <Link to="/projects" className={isActive('/projects') ? 'active' : ''}>
            Projects
          </Link>
        </nav>
      </div>
      <div className="header-right">
        <div className="user-info">
          <p className="user-name">{user?.name}</p>
          <p className="user-role">{user?.role}</p>
        </div>
        <button className="logout-btn" onClick={logout}>
          Logout
        </button>
      </div>
    </header>
  );
};

export default Header;

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './../css/NavigationBar.css'; // Include CSS for styling

const NavigationBar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('token')); // Track login status

  const handleLogout = () => {
    localStorage.clear(); // Clear all items from localStorage
    setIsLoggedIn(false); // Update state to reflect logout
    window.location.href = '/'; // Redirect to the login page
  };

  useEffect(() => {
    // Listen for changes in localStorage to update login status
    const handleStorageChange = () => {
      setIsLoggedIn(!!localStorage.getItem('token'));
    };

    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <Link to="/" className="navbar-logo">
          Hiru Capital Investment
        </Link>
      </div>
      <ul className="navbar-links">
        {isLoggedIn ? (
          // Show only Logout button if the user is logged in
          <li>
            <button className="navbar-link logout-button" onClick={handleLogout}>
              Logout
            </button>
          </li>
        ) : (
          // Show only Login and Register links if the user is not logged in
          <>
            <li>
              <Link to="/" className="navbar-link">
                Login
              </Link>
            </li>
            <li>
              <Link to="/register" className="navbar-link">
                Register
              </Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default NavigationBar;

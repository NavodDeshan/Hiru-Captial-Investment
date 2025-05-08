import React from 'react';
import { Link } from 'react-router-dom';
import './../css/NavigationBar.css'; // Include CSS for styling

const NavigationBar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <Link to="/" className="navbar-logo">
          Hiru Capital Investment 
        </Link>
      </div>
      <ul className="navbar-links">
        <li>
          <Link to="/AddLoan" className="navbar-link">
            Loan
          </Link>
        </li>
        <li>
          <Link to="/ViewAllLoans" className="navbar-link">
            My Collection
          </Link>
        </li>
        <li>
          <Link to="/AddPayment" className="navbar-link">
            Payment
          </Link>
        </li>
        <li>
          <Link to="/AddCustomers" className="navbar-link">
            Add Customers
          </Link>
        </li>
        <li>
          <Link to="/ViewAllCustomers" className="navbar-link">
            View All Customers
          </Link>
        </li>
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
      </ul>
    </nav>
  );
};

export default NavigationBar;

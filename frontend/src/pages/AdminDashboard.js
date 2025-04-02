import React from 'react';
import { Link } from 'react-router-dom';
import './../css/AdminDashboard.css'; // Ensure you have a CSS file for styling

const AdminDashboard = () => {
  return (
    
    <div className="admin-dashboard">
      <h1>Admin Dashboard</h1>
      <div className="admin-actions">
        <Link to="/AddLoan" className="admin-action">
          <i className="fas fa-plus-circle"></i>
          <span>Add Loan</span>
        </Link>
        <Link to="/AddCustomers" className="admin-action">
          <i className="fas fa-user-plus"></i>
          <span>Add Customers</span>
        </Link>
        <Link to="/ViewAllCustomers" className="admin-action">
          <i className="fas fa-users"></i>
          <span>View All Customers</span>
        </Link>
        <Link to="/ViewAllUsers" className="admin-action">
          <i className="fas fa-user-friends"></i>
          <span>View All Users</span>
        </Link>
        <Link to="/ViewAllLoans" className="admin-action">
          <i className="fas fa-file-invoice-dollar"></i>
          <span>View All Loans</span>
        </Link>
        <Link to="/AddPayment" className="admin-action">
          <i className="fas fa-money-check-alt"></i>
          <span>Add Payment</span>
        </Link>
        <Link to="/ViewAllPayments" className="admin-action">
          <i className="fas fa-receipt"></i>
          <span>View All Payments</span>
        </Link>
      </div>
    </div>
  );
};

export default AdminDashboard;
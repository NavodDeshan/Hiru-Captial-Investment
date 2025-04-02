import React from 'react';
import { Link } from 'react-router-dom';
import './../css/UserDashboard.css'; // Ensure you have a CSS file for styling

const UserDashboard = () => {
  return (
    <div className="user-dashboard">
      <h1>User Dashboard</h1>
      <div className="user-actions">
        
        <Link to="/AddLoan" className="user-action">View All Loans</Link>
      
        <Link to="/AddPayment" className="user-action">Add Payment</Link>
      </div>
    </div>
  );
};

export default UserDashboard;
import React from 'react';
import { useNavigate } from 'react-router-dom';
import './../css/Home.css'; // Assuming you have a CSS file for styling

const Home = () => {
  const navigate = useNavigate(); // React Router's hook for navigation

  // Function for handling Loan
  const handleLoan = () => {
    navigate('/AddLoan'); // Navigate to the Add Loan page
  };

  // Function for handling My Collection
  const handleMyCollection = () => {
    navigate('/ViewAllLoans'); // Navigate to the View All Loans page
  };

  // Function for handling Payment
  const handlePayment = () => {
    navigate('/AddPayment'); // Navigate to the Add Payment page
  };

  // Function to navigate to Add Customer page
  const handleAddCustomer = () => {
    navigate('/AddCustomers'); // Navigate to the Add Customer page
  };

  // Function to navigate to View All Payments page
  const handleViewAllPayments = () => {
    navigate('/ViewAllPayments'); // Navigate to the View All Payments page
  };

  return (
    <div className="Home">
      <h1>Dashboard</h1>
      <div className="home-buttons">
        <button className="btn" onClick={handleLoan}>
          Loan
        </button>
        <button className="btn" onClick={handleMyCollection}>
          My Collection
        </button>
        <button className="btn" onClick={handlePayment}>
          Payment
        </button>
        <button className="btn" onClick={handleAddCustomer}>
          Add Customers
        </button>
        <button className="btn" onClick={handleViewAllPayments}>
          View All Payments
        </button>
      </div>
    </div>
  );
};

export default Home;

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './../css/ViewAllCustomers.css'; // Correct path to ViewAllCustomers.css

const ViewAllCustomers = () => {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/customers');
        setCustomers(response.data);
        setLoading(false);
      } catch (err) {
        setError('An error occurred while fetching customers.');
        setLoading(false);
      }
    };

    fetchCustomers();
  }, []);

  return (
    <div className="view-all-customers">
      <h2>All Customers</h2>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p className="error">{error}</p>
      ) : (
        <div className="customers-list">
          {customers.map((customer) => (
            <div key={customer._id} className="customer-card">
              <h3>{customer.fullName}</h3>
              <p><strong>Customer ID:</strong> {customer._id}</p>
              <p><strong>Birthday:</strong> {new Date(customer.birthday).toLocaleDateString()}</p>
              <p><strong>Address:</strong> {customer.address}</p>
              <p><strong>ID Number:</strong> {customer.idNumber}</p>
              {customer.idImage && (
                <div className="image-section">
                  <strong>ID Image:</strong>
                  <img src={`http://localhost:5000/${customer.idImage}`} alt={`${customer.fullName}'s ID`} />
                </div>
              )}
              {customer.electricityBillImage && (
                <div className="image-section">
                  <strong>Electricity Bill:</strong>
                  <img src={`http://localhost:5000/${customer.electricityBillImage}`} alt={`${customer.fullName}'s Electricity Bill`} />
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ViewAllCustomers;
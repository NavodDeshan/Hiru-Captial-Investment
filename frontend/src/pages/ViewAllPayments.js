import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './../css/ViewAllPayments.css'; // Correct path to ViewAllPayments.css
import withAdminAuth from './withAdminAuth'; // Correct import path

const ViewAllPayments = () => {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchPayments = async () => {
      try {
        const token = localStorage.getItem('token'); // Assuming the token is stored in localStorage
        const response = await axios.get('http://localhost:5000/api/payment', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setPayments(response.data);
        setLoading(false);
      } catch (err) {
        setError('An error occurred while fetching payments.');
        setLoading(false);
      }
    };

    fetchPayments();
  }, []);

  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem('token'); // Assuming the token is stored in localStorage
      await axios.delete(`http://localhost:5000/api/payment/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setPayments(payments.filter(payment => payment._id !== id));
    } catch (err) {
      setError('An error occurred while deleting the payment.');
    }
  };

  return (
    <div className="view-all-payments">
      <h2>All Payments</h2>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p className="error">{error}</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Loan ID</th>
              <th>Full Name</th>
              <th>Address</th>
              <th>ID Number</th>
              <th>Amount</th>
              <th>Rider ID</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {payments.map((payment) => (
              <tr key={payment._id}>
                <td>{payment._id}</td>
                <td>{payment.LoanID}</td>
                <td>{payment.fullName}</td>
                <td>{payment.address}</td>
                <td>{payment.idNumber}</td>
                <td>{payment.Amount}</td>
                <td>{payment.RiderID}</td>
                <td>
                  <button onClick={() => handleDelete(payment._id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default withAdminAuth(ViewAllPayments); // Wrap the component with the HOC
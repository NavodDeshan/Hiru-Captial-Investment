import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './../css/ViewAllCustomers.css'; // Correct path to ViewAllCustomers.css

const ViewAllCustomers = () => {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [paymentHistory, setPaymentHistory] = useState([]); // Store payment history for the selected customer
  const [selectedCustomer, setSelectedCustomer] = useState(null); // Track the selected customer
  const [paymentLoading, setPaymentLoading] = useState(false); // Track loading state for payment history
  const [paymentError, setPaymentError] = useState(''); // Track errors for payment history

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const response = await axios.get('https://hiru-captial-investment.onrender.com/api/customers');
        setCustomers(response.data);
        setLoading(false);
      } catch (err) {
        setError('An error occurred while fetching customers.');
        setLoading(false);
      }
    };

    fetchCustomers();
  }, []);

  const fetchPaymentHistory = async (fullName) => {
    setPaymentLoading(true);
    setPaymentError('');
    try {
      const response = await axios.get(`https://hiru-captial-investment.onrender.com/api/customers/${fullName}/payments`);
      setPaymentHistory(response.data); // Store the payment history
      setSelectedCustomer(fullName); // Set the selected customer
      setPaymentLoading(false);
    } catch (err) {
      console.error('Error fetching payment history:', err);
      setPaymentHistory([]); // Clear payment history on error
      setPaymentError('Failed to fetch payment history. Please try again.');
      setPaymentLoading(false);
    }
  };

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
                  <img src={`https://hiru-captial-investment.onrender.com/${customer.idImage}`} alt={`${customer.fullName}'s ID`} />
                </div>
              )}
              {customer.electricityBillImage && (
                <div className="image-section">
                  <strong>Electricity Bill:</strong>
                  <img src={`https://hiru-captial-investment.onrender.com/${customer.electricityBillImage}`} alt={`${customer.fullName}'s Electricity Bill`} />
                </div>
              )}
              {/* Button to fetch payment history */}
              <button
                className="view-payments-button"
                onClick={() => fetchPaymentHistory(customer.fullName)}
              >
                View Payment History
              </button>
              {/* Display payment history if this customer is selected */}
              {selectedCustomer === customer.fullName && (
                <div className="payment-history">
                  <h4>Payment History</h4>
                  {paymentLoading ? (
                    <p>Loading payment history...</p>
                  ) : paymentError ? (
                    <p className="error">{paymentError}</p>
                  ) : paymentHistory.length > 0 ? (
                    <table>
                      <thead>
                        <tr>
                          <th>Date</th>
                          <th>Amount</th>
                          <th>Loan ID</th>
                        </tr>
                      </thead>
                      <tbody>
                        {paymentHistory.map((payment) => (
                          <tr key={payment._id}>
                            <td>{new Date(payment.date).toLocaleDateString()}</td>
                            <td>{payment.Amount}</td>
                            <td>{payment.LoanID}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  ) : (
                    <p>No payment history found for this customer.</p>
                  )}
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
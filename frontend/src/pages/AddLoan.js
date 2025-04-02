import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './../css/AddLoan.css'; // Correct path to AddLoan.css

const AddLoan = () => {
  const [formData, setFormData] = useState({
    CustomerID: '',
    fullname: '',
    email: '',
    nic: '',
    garantter1: '',
    garantter1id: '',
    garantter1address: '',
    garantter2: '',
    garantter2id: '',
    garantter2address: '',
    amount: '',
    installment: '',
    installmentrate: '',
    interest: '',
    loanEndDate: '',
    createDate: new Date().toISOString().split('T')[0], // Default to today's date
  });
  const [customers, setCustomers] = useState([]);
  const [statusMessage, setStatusMessage] = useState({ type: '', text: '' });

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/customers');
        setCustomers(response.data);
      } catch (error) {
        console.error('Error fetching customers:', error);
      }
    };

    fetchCustomers();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));

    if (name === 'fullname') {
      const selectedCustomer = customers.find((customer) => customer.fullName === value);
      if (selectedCustomer) {
        setFormData((prevData) => ({
          ...prevData,
          CustomerID: selectedCustomer._id,
          nic: selectedCustomer.idNumber,
        }));
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/loan/createLoan', formData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      setStatusMessage({ type: 'success', text: response.data.message });

      // Clear the form
      setFormData({
        CustomerID: '',
        fullname: '',
        email: '',
        nic: '',
        garantter1: '',
        garantter1id: '',
        garantter1address: '',
        garantter2: '',
        garantter2id: '',
        garantter2address: '',
        amount: '',
        installment: '',
        installmentrate: '',
        interest: '',
        loanEndDate: '',
        createDate: new Date().toISOString().split('T')[0], // Reset to today's date
      });
    } catch (error) {
      console.error('Error:', error);
      setStatusMessage({ type: 'error', text: error.response?.data?.message || 'Failed to add loan. Please try again.' });
    }
  };

  return (
    <div className="add-loan">
      <h2>Add Loan</h2>

      {statusMessage.text && (
        <div className={`status-message ${statusMessage.type}`}>
          {statusMessage.text}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="fullname">Full Name</label>
          <select
            id="fullname"
            name="fullname"
            value={formData.fullname}
            onChange={handleChange}
            required
          >
            <option value="">Select Customer</option>
            {customers.map((customer) => (
              <option key={customer._id} value={customer.fullName}>
                {customer.fullName}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="nic">NIC</label>
          <input
            type="text"
            id="nic"
            name="nic"
            value={formData.nic}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="garantter1">Guarantor 1</label>
          <input
            type="text"
            id="garantter1"
            name="garantter1"
            value={formData.garantter1}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="garantter1id">Guarantor 1 ID</label>
          <input
            type="text"
            id="garantter1id"
            name="garantter1id"
            value={formData.garantter1id}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="garantter1address">Guarantor 1 Address</label>
          <input
            type="text"
            id="garantter1address"
            name="garantter1address"
            value={formData.garantter1address}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="garantter2">Guarantor 2</label>
          <input
            type="text"
            id="garantter2"
            name="garantter2"
            value={formData.garantter2}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="garantter2id">Guarantor 2 ID</label>
          <input
            type="text"
            id="garantter2id"
            name="garantter2id"
            value={formData.garantter2id}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="garantter2address">Guarantor 2 Address</label>
          <input
            type="text"
            id="garantter2address"
            name="garantter2address"
            value={formData.garantter2address}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="amount">Amount</label>
          <input
            type="number"
            id="amount"
            name="amount"
            value={formData.amount}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="installment">Installment</label>
          <input
            type="number"
            id="installment"
            name="installment"
            value={formData.installment}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="installmentrate">Installment Rate</label>
          <input
            type="number"
            id="installmentrate"
            name="installmentrate"
            value={formData.installmentrate}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="interest">Interest</label>
          <input
            type="number"
            id="interest"
            name="interest"
            value={formData.interest}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="createDate">Create Date</label>
          <input
            type="date"
            id="createDate"
            name="createDate"
            value={formData.createDate}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="loanEndDate">Loan End Date</label>
          <input
            type="date"
            id="loanEndDate"
            name="loanEndDate"
            value={formData.loanEndDate}
            onChange={handleChange}
            required
          />
        </div>
        
        <button type="submit">Add Loan</button>
      </form>
    </div>
  );
};

export default AddLoan;
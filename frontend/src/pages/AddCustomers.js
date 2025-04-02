import React, { useState } from 'react';
import './../css/AddCustomers.css'; // Correct path to AddCustomers.css

const AddCustomers = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    birthday: '',
    address: '',
    idNumber: '',
    idImage: null,
    electricityBillImage: null,
  });
  const [statusMessage, setStatusMessage] = useState({ type: '', text: '' });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      setFormData((prevData) => ({ ...prevData, [name]: files[0] }));
    } else {
      setFormData((prevData) => ({ ...prevData, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formDataToSend = new FormData();
    formDataToSend.append('fullName', formData.fullName);
    formDataToSend.append('birthday', formData.birthday);
    formDataToSend.append('address', formData.address);
    formDataToSend.append('idNumber', formData.idNumber);
    formDataToSend.append('idImage', formData.idImage);
    formDataToSend.append('electricityBillImage', formData.electricityBillImage);

    try {
      const response = await fetch('http://localhost:5000/api/customers', {
        method: 'POST',
        body: formDataToSend,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Network response was not ok');
      }

      const data = await response.json();
      setStatusMessage({ type: 'success', text: data.message });

      // Clear the form
      setFormData({
        fullName: '',
        birthday: '',
        address: '',
        idNumber: '',
        idImage: null,
        electricityBillImage: null,
      });
    } catch (error) {
      console.error('Error:', error);
      setStatusMessage({ type: 'error', text: error.message || 'Failed to add customer. Please try again.' });
    }
  };

  return (
    <div className="add-customers">
      <h2>Add Customer</h2>

      {statusMessage.text && (
        <div className={`status-message ${statusMessage.type}`}>
          {statusMessage.text}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <label>
          Full Name:
          <input type="text" name="fullName" value={formData.fullName} onChange={handleChange} required />
        </label>
        <label>
          Birthday:
          <input type="date" name="birthday" value={formData.birthday} onChange={handleChange} required />
        </label>
        <label>
          Address:
          <input type="text" name="address" value={formData.address} onChange={handleChange} required />
        </label>
        <label>
          ID Number:
          <input type="text" name="idNumber" value={formData.idNumber} onChange={handleChange} required />
        </label>
        <label>
          ID Image:
          <input type="file" name="idImage" onChange={handleChange} required />
        </label>
        <label>
          Electricity Bill Image:
          <input type="file" name="electricityBillImage" onChange={handleChange} required />
        </label>
        <button type="submit">Add Customer</button>
      </form>
    </div>
  );
};

export default AddCustomers;
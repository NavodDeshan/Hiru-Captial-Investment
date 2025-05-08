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
  const [errors, setErrors] = useState({}); // State to track validation errors

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      setFormData((prevData) => {
        const updatedData = { ...prevData, [name]: files[0] };
        console.log('Updated Form Data:', updatedData); // Debugging log
        return updatedData;
      });
    } else {
      setFormData((prevData) => {
        const updatedData = { ...prevData, [name]: value };
        console.log('Updated Form Data:', updatedData); // Debugging log
        return updatedData;
      });
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full Name is required.';
    }

    if (!formData.birthday) {
      newErrors.birthday = 'Birthday is required.';
    }

    if (!formData.address.trim()) {
      newErrors.address = 'Address is required.';
    }

    if (!formData.idNumber.trim()) {
      newErrors.idNumber = 'ID Number is required.';
    } else if (!/^[0-9a-zA-Z]+$/.test(formData.idNumber)) {
      newErrors.idNumber = 'ID Number must be alphanumeric.';
    }

    if (!formData.idImage) {
      newErrors.idImage = 'ID Image is required.';
    }

    if (!formData.electricityBillImage) {
      newErrors.electricityBillImage = 'Electricity Bill Image is required.';
    }

    console.log('Validation Errors:', newErrors); // Debugging log
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // Return true if no errors
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return; // Stop submission if validation fails
    }

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
      setErrors({});
    } catch (error) {
      console.error('Error:', error);
      setStatusMessage({ type: 'error', text: error.message || 'Failed to add customer. Please try again.' });

      // If the error is related to a duplicate ID Number, set it in the errors state
      if (error.message === 'ID Number must be unique!') {
        setErrors((prevErrors) => ({ ...prevErrors, idNumber: error.message }));
      }
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
          <input
            type="text"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            required
          />
          {errors.fullName && <span className="error">{errors.fullName}</span>}
        </label>
        <label>
          Birthday:
          <input
            type="date"
            name="birthday"
            value={formData.birthday}
            onChange={handleChange}
            required
          />
          {errors.birthday && <span className="error">{errors.birthday}</span>}
        </label>
        <label>
          Address:
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
            required
          />
          {errors.address && <span className="error">{errors.address}</span>}
        </label>
        <label>
          ID Number:
          <input
            type="text"
            name="idNumber"
            value={formData.idNumber}
            onChange={handleChange}
            required
          />
          {errors.idNumber && <span className="error">{errors.idNumber}</span>}
        </label>
        <label>
          ID Image:
          <input
            type="file"
            name="idImage"
            onChange={handleChange}
            required
          />
          {errors.idImage && <span className="error">{errors.idImage}</span>}
        </label>
        <label>
          Electricity Bill Image:
          <input
            type="file"
            name="electricityBillImage"
            onChange={handleChange}
            required
          />
          {errors.electricityBillImage && <span className="error">{errors.electricityBillImage}</span>}
        </label>
        <button type="submit">Add Customer</button>
      </form>
    </div>
  );
};

export default AddCustomers;
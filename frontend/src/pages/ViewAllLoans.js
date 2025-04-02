import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './../css/ViewAllLoans.css'; // Correct path to ViewAllLoans.css

const ViewAllLoans = () => {
  const [loans, setLoans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [editLoan, setEditLoan] = useState(null);

  useEffect(() => {
    const fetchLoans = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/loan');
        setLoans(response.data);
        setLoading(false);
      } catch (err) {
        setError('An error occurred while fetching loans.');
        setLoading(false);
      }
    };

    fetchLoans();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/loan/${id}`);
      setLoans(loans.filter(loan => loan._id !== id));
    } catch (err) {
      setError('An error occurred while deleting the loan.');
    }
  };

  const handleEdit = (loan) => {
    setEditLoan(loan);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:5000/api/loan/${editLoan._id}`, editLoan);
      setLoans(loans.map(loan => (loan._id === editLoan._id ? editLoan : loan)));
      setEditLoan(null);
    } catch (err) {
      setError('An error occurred while updating the loan.');
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditLoan({ ...editLoan, [name]: value });
  };

  return (
    <div className="ViewAllLoans">
      <h1>All Loans</h1>

      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p className="error">{error}</p>
      ) : (
        <>
          {editLoan && (
            <form onSubmit={handleUpdate}>
              <label>
                Customer ID:
                <input type="text" name="CustomerID" value={editLoan.CustomerID} onChange={handleChange} required />
              </label>
              <label>
                Full Name:
                <input type="text" name="fullname" value={editLoan.fullname} onChange={handleChange} required />
              </label>
              <label>
                Email:
                <input type="email" name="email" value={editLoan.email} onChange={handleChange} required />
              </label>
              <label>
                NIC:
                <input type="text" name="nic" value={editLoan.nic} onChange={handleChange} required />
              </label>
              <label>
                Guarantor 1:
                <input type="text" name="garantter1" value={editLoan.garantter1} onChange={handleChange} required />
              </label>
              <label>
                Guarantor 1 ID:
                <input type="text" name="garantter1id" value={editLoan.garantter1id} onChange={handleChange} required />
              </label>
              <label>
                Guarantor 1 Address:
                <input type="text" name="garantter1address" value={editLoan.garantter1address} onChange={handleChange} required />
              </label>
              <label>
                Guarantor 2:
                <input type="text" name="garantter2" value={editLoan.garantter2} onChange={handleChange} required />
              </label>
              <label>
                Guarantor 2 ID:
                <input type="text" name="garantter2id" value={editLoan.garantter2id} onChange={handleChange} required />
              </label>
              <label>
                Guarantor 2 Address:
                <input type="text" name="garantter2address" value={editLoan.garantter2address} onChange={handleChange} required />
              </label>
              <label>
                Amount:
                <input type="number" name="amount" value={editLoan.amount} onChange={handleChange} required />
              </label>
              <label>
                Installment:
                <input type="number" name="installment" value={editLoan.installment} onChange={handleChange} required />
              </label>
              <label>
                Installment Rate:
                <input type="number" name="installmentrate" value={editLoan.installmentrate} onChange={handleChange} required />
              </label>
              <label>
                Interest:
                <input type="number" name="interest" value={editLoan.interest} onChange={handleChange} required />
              </label>
              <label>
                Loan End Date:
                <input type="date" name="loanEndDate" value={editLoan.loanEndDate} onChange={handleChange} required />
              </label>
              <label>
                Total Payment:
                <input type="number" name="totalPayment" value={editLoan.totalPayment} onChange={handleChange} required />
              </label>
              <label>
                Due Payment:
                <input type="number" name="duePayment" value={editLoan.duePayment} onChange={handleChange} required />
              </label>
              <label>
                Fine:
                <input type="number" name="fine" value={editLoan.fine} onChange={handleChange} required />
              </label>
              <label>
                Create Date:
                <input type="date" name="createDate" value={new Date(editLoan.createDate).toISOString().split('T')[0]} onChange={handleChange} required />
              </label>
              <button type="submit">Update Loan</button>
              <button type="button" onClick={() => setEditLoan(null)}>Cancel</button>
            </form>
          )}
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Customer ID</th>
                <th>Full Name</th>
                <th>Email</th>
                <th>NIC</th>
                <th>Guarantor 1</th>
                <th>Guarantor 1 ID</th>
                <th>Guarantor 1 Address</th>
                <th>Guarantor 2</th>
                <th>Guarantor 2 ID</th>
                <th>Guarantor 2 Address</th>
                <th>Amount</th>
                <th>Installment</th>
                <th>Installment Rate</th>
                <th>Interest</th>
                <th>Loan End Date</th>
                <th>Total Payment</th>
                <th>Due Payment</th>
                <th>Fine</th>
                <th>Create Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {loans.map((loan) => (
                <tr key={loan._id}>
                  <td>{loan._id}</td>
                  <td>{loan.CustomerID}</td>
                  <td>{loan.fullname}</td>
                  <td>{loan.email}</td>
                  <td>{loan.nic}</td>
                  <td>{loan.garantter1}</td>
                  <td>{loan.garantter1id}</td>
                  <td>{loan.garantter1address}</td>
                  <td>{loan.garantter2}</td>
                  <td>{loan.garantter2id}</td>
                  <td>{loan.garantter2address}</td>
                  <td>{loan.amount}</td>
                  <td>{loan.installment}</td>
                  <td>{loan.installmentrate}</td>
                  <td>{loan.interest}</td>
                  <td>{loan.loanEndDate}</td>
                  <td>{loan.totalPayment}</td>
                  <td>{loan.duePayment}</td>
                  <td>{loan.fine}</td>
                  <td>{new Date(loan.createDate).toLocaleDateString()}</td>
                  <td>
                    <button onClick={() => handleEdit(loan)}>Edit</button>
                    <button onClick={() => handleDelete(loan._id)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
    </div>
  );
};

export default ViewAllLoans;
const Payment = require('../models/Payment'); // Adjust the path as needed
const Loan = require('../models/Loan'); // Adjust the path as needed

// Helper function to update loan payments
const updateLoanPayments = async (LoanID) => {
  const loan = await Loan.findById(LoanID);
  if (loan) {
    const payments = await Payment.find({ LoanID });
    loan.totalPayment = parseFloat(
      payments.reduce((total, payment) => total + parseFloat(payment.Amount), 0).toFixed(2)
    );
    loan.duePayment = Math.max(
      (loan.amount + (loan.amount * loan.installmentrate / 100)) - loan.totalPayment,
      0
    );
    await loan.save();
  }
};

// Create a new payment
const createPayment = async (req, res) => {
  try {
    const { LoanID, fullName, address, idNumber, Amount, RiderID } = req.body;

    // Validate required fields
    if (!LoanID || !fullName || !address || !idNumber || !Amount) {
      return res.status(400).json({ message: 'LoanID, fullName, address, idNumber, and Amount are required!' });
    }

    const newPayment = new Payment({
      LoanID,
      fullName,
      address,
      idNumber,
      Amount,
      RiderID,
    });

    await newPayment.save();

    // Update the loan's total payment and due payment
    await updateLoanPayments(LoanID);

    res.status(201).json({ message: 'Payment created successfully!', payment: newPayment });
  } catch (error) {
    console.error('Error creating payment:', error);
    res.status(500).json({ message: 'Internal server error', error: error.message });
  }
};

// Get all payments (admin only)
const getAllPayments = async (req, res) => {
  try {
    const payments = await Payment.find();
    res.status(200).json(payments);
  } catch (error) {
    console.error('Error fetching payments:', error);
    res.status(500).json({ message: 'Internal server error', error: error.message });
  }
};

// Get a payment by ID
const getPaymentById = async (req, res) => {
  try {
    const payment = await Payment.findById(req.params.id);
    if (!payment) {
      return res.status(404).json({ message: 'Payment not found!' });
    }
    res.status(200).json(payment);
  } catch (error) {
    console.error('Error fetching payment:', error);
    res.status(500).json({ message: 'Internal server error', error: error.message });
  }
};

// Update a payment
const updatePayment = async (req, res) => {
  try {
    const { LoanID, fullName, address, idNumber, Amount, RiderID } = req.body;

    const updatedData = {
      LoanID,
      fullName,
      address,
      idNumber,
      Amount,
      RiderID,
    };

    const updatedPayment = await Payment.findByIdAndUpdate(req.params.id, updatedData, { new: true });

    if (!updatedPayment) {
      return res.status(404).json({ message: 'Payment not found!' });
    }

    // Update the loan's total payment and due payment
    await updateLoanPayments(LoanID);

    res.status(200).json({ message: 'Payment updated successfully!', payment: updatedPayment });
  } catch (error) {
    console.error('Error updating payment:', error);
    res.status(500).json({ message: 'Internal server error', error: error.message });
  }
};

// Delete a payment
const deletePayment = async (req, res) => {
  try {
    const deletedPayment = await Payment.findByIdAndDelete(req.params.id);

    if (!deletedPayment) {
      return res.status(404).json({ message: 'Payment not found!' });
    }

    // Update the loan's total payment and due payment
    await updateLoanPayments(deletedPayment.LoanID);

    res.status(200).json({ message: 'Payment deleted successfully!' });
  } catch (error) {
    console.error('Error deleting payment:', error);
    res.status(500).json({ message: 'Internal server error', error: error.message });
  }
};

// Add a payment
const addPayment = async (req, res) => {
  try {
    const { LoanID, Amount } = req.body;

    // Save the payment
    const payment = new Payment(req.body);
    await payment.save();

    // Update the loan's total payment and due payment
    await updateLoanPayments(LoanID);

    res.status(201).json({ message: 'Payment added successfully and loan updated', payment });
  } catch (error) {
    console.error('Error adding payment:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  createPayment,
  getAllPayments,
  getPaymentById,
  updatePayment,
  deletePayment,
  addPayment,
};


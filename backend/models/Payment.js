const mongoose = require('mongoose');

const PaymentSchema = new mongoose.Schema({
  LoanID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Loan',
    required: true,
  },
  fullName: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  idNumber: {
    type: String,
    required: true,
  },
  Amount: {
    type: Number,
    required: true,
  },
  RiderID: {
    type: String,
  },
});

module.exports = mongoose.model('Payment', PaymentSchema);
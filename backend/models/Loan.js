const mongoose = require('mongoose');

const LoanSchema = new mongoose.Schema({
  CustomerID: {
    type: String,
    required: true,
  },
  fullname: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  nic: {
    type: String,
    required: true,
  },
  garantter1: {
    type: String,
    required: true,
  },
  garantter1id: {
    type: String,
    required: true,
  },
  garantter1address: {
    type: String,
    required: true,
  },
  garantter2: {
    type: String,
    required: true,
  },
  garantter2id: {
    type: String,
    required: true,
  },
  garantter2address: {
    type: String,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  installment: {
    type: Number,
    required: true,
  },
  installmentrate: {
    type: Number,
    required: true,
  },
  interest: {
    type: Number,
    required: true,
  },
  totalPayment: {
    type: Number,
    default: 0,
  },
  duePayment: {
    type: Number,
    default: function() {
      return this.amount + (this.amount * this.interest / 100);
    },
  },
  fine: {
    type: Number,
    default: 0,
  },
  createDate: {
    type: Date,
    default: Date.now,
  },
  loanEndDate: {
    type: Date,
    required: true,
  },
});

// Method to calculate fine
LoanSchema.methods.calculateFine = function() {
  const today = new Date();
  const loanEndDate = new Date(this.loanEndDate);
  const daysPastDue = Math.floor((today - loanEndDate) / (1000 * 60 * 60 * 24));
  if (daysPastDue > 0) {
    this.fine = daysPastDue * (this.amount * 0.02);
  } else {
    this.fine = 0;
  }
};

module.exports = mongoose.model('Loan', LoanSchema);

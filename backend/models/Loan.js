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
  loanDuration: { // Duration in days or weeks depending on loanType
    type: Number,
    required: true,
  },
  loanType: { // 'Daily' or 'Weekly'
    type: String,
    required: true,
    enum: ['Daily', 'Weekly'],
  },
});

// Virtual for duePayment
LoanSchema.virtual('duePayment').get(function() {
  return this.amount + this.calculateInterest() - this.totalPayment;
});

// Ensure virtuals are included in JSON output
LoanSchema.set('toJSON', { virtuals: true });
LoanSchema.set('toObject', { virtuals: true });

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

// Method to calculate interest based on loan type
LoanSchema.methods.calculateInterest = function() {
  if (this.loanType === 'Daily') {
    // interest = principal * (rate/100) * duration (in days)
    return this.amount * (this.installmentrate / 100) * this.loanDuration;
  } else if (this.loanType === 'Weekly') {
    // interest = principal * (rate/100) * duration (in weeks)
    return this.amount * (this.installmentrate / 100) * this.loanDuration;
  } else {
    return 0;
  }
};

module.exports = mongoose.model('Loan', LoanSchema);

const mongoose = require('mongoose');

const CustomersSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true,
  },
  birthday: {
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
    unique: true, // Ensure idNumber is unique
  },
  idImage: {
    type: String,
    required: true,
  },
  electricityBillImage: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('Customer', CustomersSchema);
const express = require('express');
const CustomerController = require('../controllers/Customers');
const upload = require('../middleware/fileUpload'); // Import the middleware

const router = express.Router();

// Create a new customer (with file upload)
router.post('/', upload.fields([
  { name: 'idImage', maxCount: 1 },
  { name: 'electricityBillImage', maxCount: 1 },
]), CustomerController.createCustomer);

// Get all customers
router.get('/', CustomerController.getAllCustomers);

// Get a single customer by ID
router.get('/:id', CustomerController.getCustomerById);

// Get payment history for a specific customer
router.get('/:fullName/payments', CustomerController.getCustomerPaymentHistory);

// Update a customer by ID (with file upload)
router.put('/:id', upload.fields([
  { name: 'idImage', maxCount: 1 },
  { name: 'electricityBillImage', maxCount: 1 },
]), CustomerController.updateCustomer);

// Delete a customer by ID
router.delete('/:id', CustomerController.deleteCustomer);

module.exports = router;

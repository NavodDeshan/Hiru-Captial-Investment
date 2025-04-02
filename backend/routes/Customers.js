const express = require('express');
const CustomerController = require('../controllers/Customers');
const upload = require('../middleware/fileUpload'); // Import the middleware

const router = express.Router();

// Create a new customer (with file upload)
router.post('/', upload.fields([
  { name: 'idImage', maxCount: 1 },
  { name: 'electricityBillImage', maxCount: 1 },
]), CustomerController.createCustomer);

// Other routes
router.get('/', CustomerController.getAllCustomers);
router.get('/:id', CustomerController.getCustomerById);
router.put('/:id', upload.fields([
  { name: 'idImage', maxCount: 1 },
  { name: 'electricityBillImage', maxCount: 1 },
]), CustomerController.updateCustomer);
router.delete('/:id', CustomerController.deleteCustomer);

module.exports = router;

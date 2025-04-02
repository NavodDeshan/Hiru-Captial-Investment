const mongoose = require('mongoose');

const CustomersSchema = new mongoose.Schema({
    
    fullName: {
        type: String,
        required: true
    },
    
    birthday: {
        type: String,
        required: true
    },

    address: {
        type: String,
        required: true
    },

    idNumber: {
        type: String,
        required: true
    },
    
    idImage: {
        type: String,
        required: true,
    }
    ,
    electricityBillImage: {
        type: String,
        required: true,
    }
    ,
  
    
});

module.exports = mongoose.model('Customers', CustomersSchema);
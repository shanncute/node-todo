var mongoose = require('mongoose');

module.exports = mongoose.model('Product', {
    productName: {
        type: String,
        default: ''
    }
});
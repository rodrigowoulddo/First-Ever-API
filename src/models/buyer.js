const mongoose = require('mongoose')
const mongoosePaginate = require('mongoose-paginate')

const BuyerSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true
    },

    email: {
        type: String,
        required: true
    },

    buyedProduct: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product'
    }

});

mongoose.model('Buyer', BuyerSchema);
const mongoose = require('mongoose')
const mongoosePaginate = require('mongoose-paginate')

const ProductSchema = new mongoose.Schema({

    title: {
        type: String,
        required: true
    },

    description: {
        type: String,
        required: true
    },

    url: {
        type: String,
        required: true
    },

    buyers: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Buyer'
        }
    ],

    createdAt: {
        type: Date,
        default: Date.now
    }

})

ProductSchema.plugin(mongoosePaginate);
mongoose.model('Product', ProductSchema);


/**
 * @swagger
 * definitions:
 *      Product:
 *        type: object
 *        required:
 *          - title
 *          - description
 *          - url
 *        properties:
 *          ttile:
 *            type: string
 *          description:
 *            type: string 
 *          url:
 *            type: string
 *            format: URL
 *          buyers:
 *            type: array
 *            items:
 *              type: string
 *        example:
 *           title: iPhone 11 Pro
 *           description: An awesome device from Apple.
 *           url: https://www.apple.com/br/iphone-11-pro
 *           buyers: [5ef4ebbb598fa9001747148e, 5ef4ebbb598fa900174a56sf, gh4g5673598fa9001747148e]
 *           createdAt: 2020-06-25T18:23:55.979Z
 */
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
 *          title:
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
 */

 /**
 * @swagger
 * definitions:
 *      ProductResponse:
 *        type: object
 *        required:
 *          - _id
 *          - title
 *          - description
 *          - url
 *        properties:
 *          _id:
 *             type: long 
 *          title:
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
 *           _id: 5ef56313c292ee66c1e98b73
 *           title: iPhone 11 Pro
 *           description: An awesome device from Apple.
 *           url: https://www.apple.com/br/iphone-11-pro
 *           buyers: []
 *           createdAt: 2020-06-25T18:23:55.979Z
 */
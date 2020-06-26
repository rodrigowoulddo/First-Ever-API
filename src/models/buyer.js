const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');

const BuyerSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true
    },

    email: {
        type: String,
        required: true
    },
});

mongoose.model('Buyer', BuyerSchema);

/*
 *  Swagger Models
 */ 

/**
 * @swagger
 * definitions:
 *      Buyer:
 *        type: object
 *        required:
 *          - name
 *          - email
 *        properties:
 *          name:
 *            type: string
 *          email:
 *            type: string 
 *        example:
 *           name: Matito
 *           email: matito@mail.com
 */

 /**
 * @swagger
 * definitions:
 *      BuyerResponse:
 *        type: object
 *        required:
 *          - _id
 *          - name
 *          - email
 *        properties:
 *          _id:
 *            type: string 
 *          name:
 *            type: string
 *          email:
 *            type: string
 *          buyedProduct:
 *            type: string 
 *        example:
 *           _id: 5ef5723b623ab66dc00d1fd7
 *           name: Matito
 *           email: matito@mail.com
 */
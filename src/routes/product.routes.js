const express = require('express');
const routes = express.Router();
const verify = require('../helpers/token.helper')
const ProductController = require('../controllers/product.controller.js')
const { validateParam, schemas } = require('../helpers/route.helper')

/**
 *  @swagger
 * '/api/products':
 *  get:
 *    tags: [Product]
 *    description: Requests all products
 *    produces: application/json
 *    parameters:
 *      - name: page
 *        in: path
 *        type: int
 *        description: The pagination index
 *        required: false
 *        default: 1
 *    responses:
 *      '200':
 *        description: A sucessful response
 *        schema:
 *          type: array
 *          items:
 *              $ref: '#definitions/Product'
 */
routes.get('/products', verify, ProductController.index);

/**
 *  @swagger
 * '/api/products/:id':
 *  get:
 *    tags: [Product]
 *    description: Requests a product
 *    produces: application/json
 *    parameters:
 *      - id: page
 *        in: form
 *        type: string
 *        description: The product id
 *        required: true
 *    responses:
 *      '200':
 *        description: A sucessful response
 *        schema: 
 *          $ref: '#definitions/Product'
 */
routes.get('/products/:id', verify, validateParam(schemas.idSchema, 'id'), ProductController.show);

// Todo: Document with Swagger
routes.post('/products', verify, ProductController.store);
routes.put('/products/:id', verify, validateParam(schemas.idSchema, 'id'), ProductController.update);
routes.delete('/products/:id', verify, validateParam(schemas.idSchema, 'id'), ProductController.destroy);

routes.get('/products/:id/buyers', verify, validateParam(schemas.idSchema, 'id'), ProductController.indexBuyers);
routes.post('/products/:id/buyers', verify, validateParam(schemas.idSchema, 'id'), ProductController.storeBuyer);
routes.delete('/products/:id/buyers/:buyerId', verify, validateParam(schemas.idSchema, 'id'), validateParam(schemas.idSchema, 'buyerId'),  ProductController.destroyBuyer);

 module.exports = routes;
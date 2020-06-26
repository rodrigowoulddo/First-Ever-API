const routes = require('express').Router();
const verify = require('../helpers/token.helper');
const ProductController = require('../controllers/product.controller.js');
const { validateParam, schemas } = require('../helpers/route.helper');

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
 *              $ref: '#definitions/ProductResponse'
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
 *      - in: path
 *        name: id
 *        type: string
 *        description: The product id
 *        required: true
 *    responses:
 *      '200':
 *        description: A sucessful response
 *        schema: 
 *          $ref: '#definitions/ProductResponse'
 */
routes.get('/products/:id', verify, validateParam(schemas.idSchema, 'id'), ProductController.show);

/**
 * @swagger
 *
 * '/api/products':
 *  post:
 *    tags: [Product]
 *    description: Creates new product
 *    consumes: application/json
 *    produces: application/json
 *    parameters:
 *      - in: body
 *        name: product
 *        schema:
 *          type: object
 *          $ref: '#definitions/Product'
 *    responses:
 *      '200':
 *        description: A sucessful response
 *        schema: 
 *          $ref: '#definitions/ProductResponse'
 */
routes.post('/products', verify, ProductController.store);

/**
 * @swagger
 *
 * '/api/products/:id':
 *  put:
 *    tags: [Product]
 *    description: Updates a product
 *    consumes: application/json
 *    produces: application/json
 *    parameters:
 *      - in: path
 *        name: id
 *        type: string
 *        description: The product id
 *        required: true
 *      - in: body
 *        name: product
 *        schema:
 *          type: object
 *          $ref: '#definitions/Product'
 *    responses:
 *      '200':
 *        description: A sucessful response
 *        schema: 
 *          $ref: '#definitions/ProductResponse'
 */
routes.put('/products/:id', verify, validateParam(schemas.idSchema, 'id'), ProductController.update);

/**
 *  @swagger
 * '/api/products/:id':
 *  delete:
 *    tags: [Product]
 *    description: Deletes a product
 *    consumes: application/json
 *    parameters:
 *      - in: path
 *        name: id
 *        type: string
 *        description: The product id
 *        required: true
 *    responses:
 *      '200':
 *        description: A sucessful response
 */
routes.delete('/products/:id', verify, validateParam(schemas.idSchema, 'id'), ProductController.destroy);

/**
 *  @swagger
 * '/api/products/:id/buyers':
 *  get:
 *    tags: [Buyer]
 *    description: Requests buyers of a product
 *    produces: application/json
 *    parameters:
 *      - in: path
 *        name: id
 *        type: string
 *        description: The product id
 *        required: true
 *    responses:
 *      '200':
 *        description: A sucessful response
 *        schema:
 *          type: array
 *          items: 
 *              $ref: '#definitions/BuyerResponse'
 */
routes.get('/products/:id/buyers', verify, validateParam(schemas.idSchema, 'id'), ProductController.indexBuyers);

/**
 * @swagger
 *
 * '/api/products/:id/buyers':
 *  post:
 *    tags: [Buyer]
 *    description: Creates new buyer to product
 *    consumes: application/json
 *    produces: application/json
 *    parameters:
 *      - in: path
 *        name: id 
 *        type: string
 *        description: The product id
 *      - in: body
 *        name: buyer
 *        schema:
 *          type: object
 *          $ref: '#definitions/Buyer'
 *    responses:
 *      '200':
 *        description: A sucessful response
 *        schema: 
 *          $ref: '#definitions/BuyerResponse'
 */
routes.post('/products/:id/buyers', verify, validateParam(schemas.idSchema, 'id'), ProductController.storeBuyer);

/**
 * @swagger
 *
 * '/api/products/:id/buyers/:buyerId':
 *  delete:
 *    tags: [Buyer]
 *    description: Deletes a buyer from product
 *    consumes: application/json
 *    parameters:
 *      - in: path
 *        name: id 
 *        type: string
 *        description: The product id
 *      - in: path
 *        name: buyerId 
 *        type: string
 *        description: The buyer id
 *    responses:
 *      '200':
 *        description: A sucessful response
 */
routes.delete('/products/:id/buyers/:buyerId', verify, validateParam(schemas.idSchema, 'id'), validateParam(schemas.idSchema, 'buyerId'),  ProductController.destroyBuyer);

 module.exports = routes;
const express = require('express');
const routes = express.Router();

const ProductController = require('../controllers/product.controller.js')

const { validateParam, schemas } = require('../helpers/route.helper')

routes.get('/products', ProductController.index);
routes.get('/products/:id', validateParam(schemas.idSchema, 'id'), ProductController.show);
routes.post('/products', ProductController.store);
routes.put('/products/:id', validateParam(schemas.idSchema, 'id'), ProductController.update);
routes.delete('/products/:id', validateParam(schemas.idSchema, 'id'), ProductController.destroy);

routes.get('/products/:id/buyers', validateParam(schemas.idSchema, 'id'), ProductController.indexBuyers);
routes.post('/products/:id/buyers', validateParam(schemas.idSchema, 'id'), ProductController.storeBuyer);
routes.delete('/products/:id/buyers/:buyerId', validateParam(schemas.idSchema, 'id'), validateParam(schemas.idSchema, 'buyerId'),  ProductController.destroyBuyer);

 module.exports = routes;
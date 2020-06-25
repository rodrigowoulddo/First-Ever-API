const express = require('express');
const routes = express.Router();
const verify = require('../helpers/token.helper')

const ProductController = require('../controllers/product.controller.js')

const { validateParam, schemas } = require('../helpers/route.helper')

routes.get('/products', verify, ProductController.index);
routes.get('/products/:id', verify, validateParam(schemas.idSchema, 'id'), ProductController.show);
routes.post('/products', verify, ProductController.store);
routes.put('/products/:id', verify, validateParam(schemas.idSchema, 'id'), ProductController.update);
routes.delete('/products/:id', verify, validateParam(schemas.idSchema, 'id'), ProductController.destroy);

routes.get('/products/:id/buyers', verify, validateParam(schemas.idSchema, 'id'), ProductController.indexBuyers);
routes.post('/products/:id/buyers', verify, validateParam(schemas.idSchema, 'id'), ProductController.storeBuyer);
routes.delete('/products/:id/buyers/:buyerId', verify, validateParam(schemas.idSchema, 'id'), validateParam(schemas.idSchema, 'buyerId'),  ProductController.destroyBuyer);

 module.exports = routes;
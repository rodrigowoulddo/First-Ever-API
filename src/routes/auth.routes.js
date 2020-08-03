const routes = require('express').Router();
const AuthController = require('../controllers/auth.controller');
const { register } = require('../controllers/auth.controller');

/**
 * @swagger
 *
 * '/api/user/register':
 *  post:
 *    tags: [User]
 *    description: Creates new user
 *    consumes: application/json
 *    produces: application/json
 *    parameters:
 *      - in: body
 *        name: user
 *        schema:
 *          type: object
 *          $ref: '#definitions/User'
 *    responses:
 *      '200':
 *        description: A sucessful response
 *        schema: 
 *          $ref: '#definitions/UserResponse'
 */
routes.post('/register', AuthController.register);

/**
 * @swagger
 *
 * '/api/user/login':
 *  post:
 *    tags: [User]
 *    description: Authenticates user
 *    consumes: application/json
 *    produces: application/json
 *    parameters:
 *      - in: body
 *        name: user
 *        schema:
 *          type: object
 *          $ref: '#definitions/Login'
 *    responses:
 *      '200':
 *        description: A sucessful response
 *        schema: 
 *          $ref: '#definitions/LoginResponse'
 */
routes.post('/login', AuthController.login);

module.exports = routes;
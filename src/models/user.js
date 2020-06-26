const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true,
        min: 6,
        max: 255
    },

    email: {
        type: String,
        required: true,
        min: 6,
        max: 255
    },

    password: {
        type: String,
        required: true,
        min: 6,
        max: 1024
    }

});

module.exports = mongoose.model('User', UserSchema);

/*
 *  Swagger Models
 */

/**
 * @swagger
 * definitions:
 *      User:
 *        type: object
 *        required:
 *          - name
 *          - email
 *          - password
 *        properties:
 *          name:
 *            type: string
 *          email:
 *            type: string 
 *          password:
 *            type: string 
 *        example:
 *           name: Matito
 *           email: matito@mail.com
 *           password: P4$$w0rd_123
 */

 /**
 * @swagger
 * definitions:
 *      UserResponse:
 *        type: object
 *        required:
 *          - userID
 *          - name
 *          - email
 *        properties:
 *          userID:
 *            type: string 
 *          name:
 *            type: string
 *          email:
 *            type: string 
 *        example:
 *           userId: 5ef60d11097eba7dc3eacd9f
 *           name: Matito
 *           email: matito@mail.com
 */

  /**
 * @swagger
 * definitions:
 *      Login:
 *        type: object
 *        required:
 *          - email
 *          - password
 *        properties:
 *          email:
 *            type: string
 *          password:
 *            type: string 
 *        example:
 *           email: matito@mail.com
 *           password: P4$$w0rd_123
 */

   /**
 * @swagger
 * definitions:
 *      LoginResponse:
 *        type: object
 *        required:
 *          - token
 *        properties:
 *          token:
 *            type: string
 *        example:
 *            token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZWY2MGQxMTA5N2ViYTdkYzNlYWNkOWYiLCJpYXQiOjE1OTMxODQyMTZ9.cB6vgGO_fxVFAzdBJMNQ0w1UED9Z2GUHHloPJAHuFjo
 */
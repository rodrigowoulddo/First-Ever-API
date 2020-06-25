const { array, string } = require("@hapi/joi");

module.exports = {
    swaggerDefinition: {
        info: {
            title: 'APIs Document',
            description: 'A basic Node.JS mongodb application',
            contact: {
                name: 'Rodrigo Giglio',
                email: 'rodrigofgiglio@gmail.com',
            },
            servers: ["http://localhost:3001"],
        },
    },
    apis: ["./src/routes/*.routes.js", "./src/models/*.js"],
}
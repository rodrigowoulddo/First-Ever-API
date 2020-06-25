const Joi = require('@hapi/joi');

module.exports = {

    validateParam: (schema, name) => {

        return (req, res, next) => {
            
            const result = schema.validate({ param: req['params'][name]})
            
            if (result.error) { 
                return res.status(400).json(result.error) 
            }

            else { 

                if (!req.value) { req.value = {} }
                if (!req.value['params']) { req.value['params'] = {} }

                req.value['params'][name] = result.value.param;

                next(); 
            }
        }

    },

    schemas: {
        idSchema: Joi.object({
            param: Joi.string().regex(/^[0-9a-fA-F]{24}$/).required()
        })
    }

}


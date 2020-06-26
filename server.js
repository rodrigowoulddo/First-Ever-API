

// Loads .env
require('dotenv').config();const express = require('express');
const mongoose = require('mongoose');
const requireDir = require('require-dir');
const cors = require('cors');
const swaggerUI = require('swagger-ui-express');
const log = require('./src/helpers/log.helper');
const swaggerDocument = require('./swagger');
const swaggerJSDoc = require('swagger-jsdoc');

/// Start App
const app = express();
app.use(express.json());
app.use(cors());

/// Configure Swagger
const swaggerDocs = swaggerJSDoc(swaggerDocument);
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocs));

/// Start MongoDB
mongoose.connect(process.env.DB_CONNECT, 
    // Configs
    { 
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false
    });

log('🟢 Connected to database');

/// Requires Models
requireDir('./src/models');

/// Routes
app.use('/api', require('./src/routes/product.routes'));
app.use('/api/user', require('./src/routes/auth.routes'));

app.listen(process.env.PORT);
log('Listening now on port ' + process.env.PORT);

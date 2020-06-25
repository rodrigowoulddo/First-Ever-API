

// Loads .env
require('dotenv').config();const express = require('express');
const mongoose = require('mongoose');
const requireDir = require('require-dir');
const cors = require('cors');
const log = require('./src/helpers/log.helper')



/// Start App
const app = express();
app.use(express.json());
app.use(cors())

/// Start MongoDB
mongoose.connect(process.env.DB_CONNECT, 
    // Configs
    { 
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false
    });

log('🟢 Connected to database')

/// Requires Models
requireDir('./src/models');

/// Routes
app.use('/api', require('./src/routes/product.routes'));
app.use('/api/user', require('./src/routes/auth.routes'));

app.listen(process.env.PORT);
log('Listening now on port ' + process.env.PORT)

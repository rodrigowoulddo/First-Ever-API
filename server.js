const express = require('express');
const mongoose = require('mongoose');
const requireDir = require('require-dir');
const cors = require('cors');

/// Start App
const app = express();
app.use(express.json());
app.use(cors())

/// Start MongoDB
mongoose.connect('mongodb://localhost:27017/nodeapi', 
    // Configs
    { 
        useNewUrlParser: true, 
        useUnifiedTopology: true,
        useFindAndModify: false
    });

/// Requires Models
requireDir('./src/models');

/// Routes
app.use('/api', require('./src/routes/product.routes'));
app.use('/api/user', require('./src/routes/auth.routes'));

app.listen(3001);
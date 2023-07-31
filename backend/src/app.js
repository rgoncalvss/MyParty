const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());

// DB Connection
const conn = require('../config/db');

conn();

// Routes
const routes = require('./routes/router');

app.use('/api', routes);

module.exports = app;

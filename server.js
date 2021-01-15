const express = require('express');
const bodyParser = require('body-parser');
const db         = require('./app/models/db');

const app = express();

db.sequelize.sync();

app.use(bodyParser.json());

app.listen(3000);
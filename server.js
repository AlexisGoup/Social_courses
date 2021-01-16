const express    = require('express');
const bodyParser = require('body-parser');
const db         = require('./app/models/db');
const user       = require('./app/routers/users.router');

const app = express();

db.sequelize.sync();

app.use(bodyParser.json());
app.use('/user', user);

app.listen(3000);
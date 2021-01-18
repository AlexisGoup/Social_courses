const express    = require('express');
const bodyParser = require('body-parser');
const db         = require('./app/models/db');
const user       = require('./app/routers/users.router');
const teacher    = require('./app/routers/teachers.router');

const app = express();

db.sequelize.sync();

app.use(bodyParser.json());
app.use('/user', user);
app.use('/teacher', teacher)

app.listen(3000);
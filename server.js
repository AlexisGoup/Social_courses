const express    = require('express');
const bodyParser = require('body-parser');
const db         = require('./app/models/db');

const user        = require('./app/routers/users.router');
const teacher     = require('./app/routers/teachers.router');
const student     = require('./app/routers/students.router');
const publication = require('./app/routers/publications.router');
const lesson      = require('./app/routers/lessons.router');
const comment     = require('./app/routers/comments.router');

const app = express();

db.sequelize.sync();

app.use(bodyParser.json());

app.use('/user', user);
app.use('/teacher', teacher);
app.use('/student', student);
app.use('/publication', publication);
app.use('/lesson', lesson);
app.use('/comment', comment);

app.listen(3000);
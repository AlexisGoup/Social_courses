const Sequelize = require('sequelize');
const config    = require('../config/db.config');

const sequelize = new Sequelize(config.DB, config.USER, config.PASSWORD, {
    host: config.HOST,
    dialect: config.DIALECT
});

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.lesson       = require("./lessons.model") (db.sequelize, db.Sequelize);
db.user         = require("./users.model") (db.sequelize, db.Sequelize);
db.student      = require("./students.model") (db.sequelize, db.Sequelize);
db.teacher      = require("./teachers.model") (db.sequelize, db.Sequelize);
db.comment      = require("./comments.models") (db.sequelize, db.Sequelize);
db.publication  = require("./publications.model") (db.sequelize, db.Sequelize);

// User est en relation One-to-One avec Student et Teacher
db.user.hasOne(db.student);
db.user.hasOne(db.teacher);

// Student est en relation One-to-Many avec Publication
db.student.hasMany(db.publication);
db.publication.belongsTo(db.student);

// Student est en relation One-To-Many avec Comment 
db.student.hasMany(db.comment);
db.comment.belongsTo(db.student);

// Student est en relation Many-To-Many avec Student
db.student.belongsToMany(student, {trough: 'friendship'});
db.student.belongsToMany(student, {trough: 'friendship'});

// Student est en relation Many-To-Many avec Lesson 
db.student.belongsToMany(lesson, {trough: 'participation'});
db.lesson.belongsToMany(student, {trough: 'participation'});

// Teacher est en relation One-to-Many avec Comment
db.teacher.hasMany(db.comment);
db.comment.belongsTo(db.teacher);

// Teacher est en relation One-to-Many avec Publication
db.teacher.hasMany(db.publication);
db.publication.belongsTo(db.teacher);

// Teacher est en relation Many-to-Many avec Lesson
db.teacher.belongsToMany(lesson, {trough: 'teacherLesson'});
db.lesson.belongsToMany(teacher, {trough: 'teacherLesson'});

// Publication est en relation One-to-Many avec Comment
db.publication.hasMany(db.comment);
db.comment.belongsTo(db.publication);

// Lesson est en relation One-to-Many avec Publication
db.lesson.hasMany(db.publication);
db.publication.belongsTo(db.lesson);

module.exports = db;
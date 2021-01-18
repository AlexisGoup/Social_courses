const db      = require('../models/db');
let jwt       = require('../services/auth.services');
let StudentService = require('../services/student.services');

const Student = db.student;

const StudentC = require('../models/student');

exports.getAllStudents = async (req, res) => {
    let token = req.headers['x-access-token'];
    let verifytoken = await jwt.verifyToken(token);

    if (!verifytoken) {
        res.status(401);
        res.json({ error :"Veuillez vous identifier" });

    } else { 
        try {
            let allStudents = await Student.findAll();

            let newResult = allStudents.map((result) => {
                let age = StudentService.getYears(result.dataValues.birthdate);

                return new StudentC(result.dataValues.id, result.dataValues.first_name, result.dataValues.last_name, result.dataValues.bio, result.dataValues.level, result.dataValues.birthdate, age);
            });

            res.json(newResult);

        } catch (err) {
            console.log(err);
            
            res.status(500);
            res.json({ error: err });

        }
    }
}

exports.getStudentById = async (req, res) => {
    let token = req.headers['x-access-token'];
    let verifytoken = await jwt.verifyToken(token);

    if (!verifytoken) {
        res.status(401);
        res.json({ error :"Veuillez vous identifier" });

    } else { 
        try {
            let student = await Student.findByPk(req.params.id);
            let age = StudentService.getYears(student.birthdate);

            let new_student = new StudentC(student.dataValues.id, student.dataValues.first_name, student.dataValues.last_name, student.dataValues.bio, student.dataValues.level, student.dataValues.birthdate, age);

            res.json(new_student);

        } catch (err) {
            console.log(err);
            
            res.status(500);
            res.json({ error: err });
        }
    }
}
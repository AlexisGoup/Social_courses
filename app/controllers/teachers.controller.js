const db      = require('../models/db');
let jwt       = require('../services/auth.services');

const Teacher = db.teacher;

const TeacherC = require('../models/teacher');

exports.getAllTeachers = async (req, res) => {
    let token = req.headers['x-access-token'];
    let verifytoken = await jwt.verifyToken(token);

    if (!verifytoken) {
        res.status(401);
        res.json({ error :"Veuillez vous identifier" });

    } else { 
        try {
            let allTeachers = await Teacher.findAll();

            let newResult = allTeachers.map((result) => {
                return new TeacherC(result.dataValues.id, result.dataValues.first_name, result.dataValues.last_name, result.dataValues.bio, result.dataValues.subject)
            });

            res.json(newResult);

        } catch (err) {
            console.log(err);
            
            res.status(500);
            res.json({ error: err });

        }
    }
}

exports.getTeacherById = async (req, res) => {
    let token = req.headers['x-access-token'];
    let verifytoken = await jwt.verifyToken(token);

    if (!verifytoken) {
        res.status(401);
        res.json({ error :"Veuillez vous identifier" });

    } else { 
        try {
            let teacher = await Teacher.findByPk(req.params.id);

            let new_teacher = new TeacherC(teacher.dataValues.id, teacher.dataValues.first_name, teacher.dataValues.last_name, teacher.dataValues.bio, teacher.dataValues.subject);

            res.json(new_teacher);

        } catch (err) {
            console.log(err);
            
            res.status(500);
            res.json({ error: err });
        }
    }
}
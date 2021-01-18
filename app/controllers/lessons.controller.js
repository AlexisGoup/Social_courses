const db = require('../models/db');
let jwt  = require('../services/auth.services');
let LessonServices = require('../services/lesson.services');

let Lesson  = db.lesson;
let User    = db.user;
let Teacher = db.teacher;

const LessonC = require('../models/lesson');

exports.createLesson = async (req, res) => {
    let token = req.headers['x-access-token'];
    let verifytoken = await jwt.verifyToken(token);

    if (!verifytoken) {
        res.status(401);
        res.json({ error :"Veuillez vous identifier" });

    } else { 
        try {
            let user = await User.findByPk(verifytoken);

            if(user.type === 1) {
                return res.json({error: "Vous devez être professeur pour créer un cours"}); 

            } else if (user.type === 2){
                if (req.body.title && req.body.hours && req.body.description && req.body.starting_date && req.body.ending_date) {
                    const alreadyExist = await Lesson.findOne({
                        where: {title: req.body.title}
                    });

                    if(alreadyExist) {
                        console.log(alreadyExist);
                        return res.json({error: "Désolé mais cette publication existe deja"});
                    }

                    const teacher = await Teacher.findOne({
                        where: {userId: user.d}
                    });

                    let newLesson = await Lesson.create(req.body);
                    //await teacher.setLesson(newLesson);

                    console.log(teacher);

                    return res.json(newLesson);
                }
            }


        } catch (err) {
            console.log(err);
            
            res.status(500);
            res.json({ error: err });
        }
    }
}

exports.getAll = async (req, res) => {
    let token = req.headers['x-access-token'];
    let verifytoken = await jwt.verifyToken(token);

    if (!verifytoken) {
        res.status(401);
        res.json({ error :"Veuillez vous identifier" });

    } else {
        try {
            let allLessons = await Lesson.findAll();

            let newResult = allLessons.map((result) => {
                return LessonServices.checkFinished(result);  
            });

            res.json(newResult);

        } catch (err) {
            console.log(err);
            
            res.status(500);
            res.json({ error: err });
        }
    }
}

exports.updateLessonById = async (req, res) => {
    let token = req.headers['x-access-token'];
    let verifytoken = await jwt.verifyToken(token);

    if (!verifytoken) {
        res.status(401);
        res.json({ error :"Veuillez vous identifier" });

    } else { 
        try {
            let updatedLesson = await Lesson.update(req.body, {
                where: {id: req.params.id}
            });

            res.json(updatedLesson);

        } catch (err) {
            console.log(err);
            
            res.status(500);
            res.json({ error: err });
        }
    }
}

exports.deleteLessonById = async (req, res) => {
    let token = req.headers['x-access-token'];
    let verifytoken = await jwt.verifyToken(token);

    if (!verifytoken) {
        res.status(401);
        res.json({ error :"Veuillez vous identifier" });

    } else { 
        try {
            let response = await Lesson.destroy({
                where: {id: req.params.id}
            });

            res.json(response);

        } catch (err) {
            console.log(err);
            
            res.status(500);
            res.json({ error: err });
        }
    }
}
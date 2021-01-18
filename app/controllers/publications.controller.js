const db         = require('../models/db');
let jwt          = require('../services/auth.services');

let Publication  = db.publication;
let User         = db.user;
let Lesson       = db.lesson;

const PublicationC = require('../models/publication');

exports.createPub = async (req, res) => {
    let token = req.headers['x-access-token'];
    let verifytoken = await jwt.verifyToken(token);

    if (!verifytoken) {
        res.status(401);
        res.json({ error :"Veuillez vous identifier" });

    } else { 
        if(req.body.title && req.body.body_text && req.body.type && req.body.lesson_id) {
            const user = await User.findByPk(verifytoken);

            if(user.studentId === null && user.teacherId === null) {
                return res.json({error: "Vous devez être etudiant ou professeur pour créer une publication"}); 
            }

            const cours = await Lesson.findByPk(req.body.lesson_id);

            if(!cours) {               
                return res.json({error: "Le cours n'existe pas"});
            }

            const dateP = new Date();
            req.body.creation_date = datePubli.getFullYear() + "-" + (datePubli.getMonth() + 1) + "-" + datePubli.getDate();
            const newPubli = await Publication.create(req.body);

            await publi.setLesson(cours);

            res.json(newPubli);
            
        } else {
            res.status(400);
            res.json({error: "Veuillez remplir tous les champs"});
        }
    }
}

exports.getAllPub = async (req, res) => {
    let token = req.headers['x-access-token'];
    let verifytoken = await jwt.verifyToken(token);

    if (!verifytoken) {
        res.status(401);
        res.json({ error :"Veuillez vous identifier" });

    } else { 
        try {
            let allPublications = await Publication.findAll();

            let newResult = allPublications.map((result) => {
                return new StudentC(result.dataValues.id, result.dataValues.title, result.dataValues.body_text, result.dataValues.type);
            });

            res.json(newResult);
        } catch (err) {
            if (err) console.log(err);

            res.status(500);
            res.json({ error: err });
        }
    }
}


const db = require('../models/db');
const jwt = require('../services/auth.services');

let Comment     = db.comment;
let User        = db.user;
let Student     = db.student;
let Publication = db.publication;
let Teacher     = db.teacher;

exports.getCommentById = async (req, res) => {
    let token = req.headers['x-access-token'];
    let verifytoken = await jwt.verifyToken(token);

    if (!verifytoken) {
        res.status(401);
        res.json({ error :"Veuillez vous identifier" });

    } else { 
        try {
            let comment = await Comment.findOne({
                where: {id: req.params.id}
            });

            return res.json(comment);
        } catch (err) {
            console.log(err);
            
            res.status(500);
            res.json({ error: err });
        }
    }
}

exports.createComment = async (req, res) => {
    let token = req.headers['x-access-token'];
    let verifytoken = await jwt.verifyToken(token);

    if (!verifytoken) {
        res.status(401);
        res.json({ error :"Veuillez vous identifier" });

    } else { 
        try {
            if (req.body.body_text) {
                let publicationP = await Publication.findByPk(req.params.id);
                let user = await User.findByPk(verifytoken);
                let newComment = await Comment.create(req.body);

                if (user.type === 1) {
                    let student = await Student.findOne({
                        where: {userId: user.id}
                    });

                    await newComment.setStudent(student);
                    await newComment.setPublication(publicationP);
                    return res.json(newComment);

                } else if (user.type === 2) {
                    let teacher = await Teacher.findOne({
                        where: {userId: user.id}
                    });

                    await newComment.setTeacher(teacher);
                    await newComment.setPublication(publicationP);
                    return res.json(newComment);
                }
               

            } else {
                return res.json({error: "Veuillez remplir tous les champs"});

            }

        } catch (err) {
            console.log(err);
            
            res.status(500);
            res.json({ error: err });
        }
    }
}

exports.updateCommentById = async (req, res) => {
    let token = req.headers['x-access-token'];
    let verifytoken = await jwt.verifyToken(token);

    if (!verifytoken) {
        res.status(401);
        res.json({ error :"Veuillez vous identifier" });

    } else { 
        try {
            let updatedComment = await Comment.update(req.body, {
                where: {id: req.params.id}
            })

            return res.json(updatedComment);

        } catch (err) {
            console.log(err);
            
            res.status(500);
            res.json({ error: err });
        }
    }
}

exports.deleteCommentById = async (req, res) => {
    let token = req.headers['x-access-token'];
    let verifytoken = await jwt.verifyToken(token);

    if (!verifytoken) {
        res.status(401);
        res.json({ error :"Veuillez vous identifier" });

    } else { 
        try {
            let deletedComment = Comment.destroy({
                where: {id : req.params.id}
            })

            return res.json(deletedComment);
        } catch (err) {
            
        }
    }
}
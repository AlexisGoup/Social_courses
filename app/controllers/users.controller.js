const db           = require('../models/db');
let jwt            = require('../services/auth.services');
let StudentService = require('../services/student.services');

const User    = db.user;
const Student = db.student;
const Teacher = db.teacher;

exports.login = async (req, res) => {

    if (req.body.email && req.body.password) {

        try {
            const user = await User.findOne({ where: { email: req.body.email } });
    
            if (!user) {
                res.status(404);
                res.json({ "message": "Aucun utilisateur n'existe avec cet email" })
                return;
            }
    
    
            if (req.body.password == user.dataValues.password) {       
                let student = await user.getStudent()
                let token = jwt.signToken(user.dataValues.id);
    
                res.json({user : user,
                    student: student,
                    token : token
                });
    
            } else {
                res.status(401);
                res.json({ "message": "Le mot de passe est erroné" })
            }
     
    
    
        } catch (err) {
            res.status(500);
            res.json({ "message": err })
        }



    } else {
        res.status(400);
        res.json({error: "Veuillez remplir tous les champs neccessaire"});
    }  
}

exports.register = async (req, res) => {

    if (req.body.email && req.body.password) {

        try {
            const user = await User.findOne({ where: { email: req.body.email } });
    
            if (!user) {   
                let result = await User.create(req.body);
                res.json(result);
                
            } else {
                res.status(409);
                res.json({ "message": 'Cet email est déja utilisé' })
            }      
    
    
        } catch (err) {
            res.status(500);
                res.json({ "message": err })
        }
    } else {
        res.status(400);
        res.json({error: "Veuillez remplir tous les champs neccessaire"});
    }   
}


exports.updateUser = async (req, res) => {
    let token = req.headers['x-access-token'];
    let verifytoken = await jwt.verifyToken(token);

    if (!verifytoken) {
        res.status(401);
        res.json({ error :"Veuillez vous identifier" });

    } else {
        try {
            await User.update(req.body, {
                where: {
                    id: req.params.id
                }
            });

            res.json({id : req.params.id,...req.body});

        } catch (err) {
           resp.json(500);
           resp.json({ error: err });
        }
    }
}




exports.deleteUser = async (req, res) => {
    let token = req.headers['x-access-token'];
    let verifytoken = await jwt.verifyToken(token);

    if (!verifytoken) {
        res.status(401);
        res.json({ error :"Veuillez vous identifier" });

    } else {
        try {
            await User.destroy({
                where: {
                    id: req.params.id
                }
            });
        res.status(200);
                res.json({"message":"element removed"});

        } catch (err) {
            console.log(err);

            res.status(500);
            res.json({ error: err });
        }
    }
}




exports.registerStudentOrTeacher = async (req, res) => {
    let token = req.headers['x-access-token'];
    let verifytoken = await jwt.verifyToken(token);

    if (!verifytoken) {
        res.status(401);
        res.json({ error :"Veuillez vous identifier" });

    } else {
        try {
            const user = await User.findOne({
                where : {id : verifytoken}
            })
    
            if (req.body.type === null) {
                res.json({error: 'Veuillez renseigner un type'});                   
    
            }  else if (req.body.type === 1) {
                let newStudent = await Student.create(req.body);
                await user.setStudent(newStudent);
                await user.update({type: req.body.type});
                
                res.status(200);
                res.json(newStudent);

            }  else if (req.body.type === 2) {
                let newTeacher = await Teacher.create(req.body);
                await user.setTeacher(newTeacher);
                await user.update({type: req.body.type});
                
                res.status(200);
                res.json(newTeacher);

            } 


        } catch(err) {
            console.log(err);
            
            res.status(500);
            res.json({ error: err });
        }
        
    }
}




/*exports.modifyStudentOrTeacherById = async (req, res) => {
    let token = req.headers['x-access-token'];
    let verifytoken = await jwt.verifyToken(token);

    if (!verifytoken) {
        res.status(401);
        res.json({ error :"Veuillez vous identifier" });

    } else {
        try {
            const student = await Student.findByPk({
                where : {id : req.params.id}
            });

            const teacher = await Teacher.findByPk({
                where: {id : req.params.id}
            })

            if (!student && !teacher) {
                res.status(404);
                res.json({error: "Pas d'étudiants ou de professeurs correspondants"});

            } else if (student) {}

        } catch (err) {
            console.log(err);
            
            res.status(500);
            res.json({ error: err });
        }
    }
}
*/
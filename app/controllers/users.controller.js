const db   = require('../models/db');
const User = db.user;
let jwt    = require('../services/auth.services');

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
   /* let token = req.headers['x-access-token'];
    let verifytoken = await jwt.verifyToken(token);

    if (!verifytoken) {
        res.status(401);
        res.json({ error :"Veuillez vous identifier" });

    } else {
    */

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

exports.deleteUser = async (req, res) => {
    try {
        await User.destroy({
            where: {
                id: req.params.id
            }
        });
    res.status(200);
            res.json({"message":"element removed"});

    } catch (err) {
        res.status(500);
        res.json({ error: err });
    }
}
const express           = require('express');
const router            = express.Router();
const userController = require('../controllers/users.controller');

router.post('/login', userController.login);
router.post('/register', userController.register);
router.post('/me/new', userController.registerStudentOrTeacher);

router.put('/me/modify-email/:id', userController.updateUser);
router.put('/me/modify-password/:id', userController.updateUser);

router.delete('/me/delete/:id', userController.deleteUser);


/*
router.get('/me', userController.getCurrAuthUser);
router.put('/me', userController.modifyStudentOrTeacherById);
*/
module.exports = router;
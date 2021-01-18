const express           = require('express');
const router            = express.Router();
const userController = require('../controllers/users.controller');



router.post('/me', userController.registerStudentOrTeacher);
router.post('/login', userController.login);
router.post('/register', userController.register);

router.put('/me/modify-email/:id', userController.updateUser);
router.put('/me/modify-password/:id', userController.updateUser);
//router.put('/me', userController.modifyStudentOrTeacherById);

router.delete('/me/delete/:id', userController.deleteUser);



module.exports = router;
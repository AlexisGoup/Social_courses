const express           = require('express');
const router            = express.Router();
const userController = require('../controllers/users.controller');

router.post('./login', userController.login);
router.post('/register', userController.register);
router.put('/me/modify-email', userController.modifyEmail);
router.put('/me/modify-password', userController.modifyPassword);
router.delete('/me/delete', userController.deleteUser);
router.get('/me', userController.getCurrAuthUser);
router.post('/me', userController.registerStudentOrTeacher);
router.put('/me', userController.modifyStudentOrTeacherById);

module.exports = router;
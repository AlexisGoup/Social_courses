const express           = require('express');
const router            = express.Router();
const teacherController = require('../controllers/teachers.controller');

router.get('/', teacherController.getAllTeachers);
router.get('/:id', teacherController.getTeacherById);

module.exports = router;
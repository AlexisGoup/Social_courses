const express = require('express');
const router  = express.Router();
const lessonController = require('../controllers/lessons.controller');

router.get('/', lessonController.getAll);
router.post('/', lessonController.createLesson);
router.put('/:id', lessonController.updateLessonById);
router.delete('/:id', lessonController.deleteLessonById);

module.exports = router;
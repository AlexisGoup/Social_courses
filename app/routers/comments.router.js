const express = require('express');
const router  = express.Router();
const commentController = require('../controllers/comments.controller');

router.get('/:id', commentController.getCommentById);
router.post('/publication/:id', commentController.createComment);
router.put('/:id', commentController.updateCommentById);
router.delete('/:id', commentController.deleteCommentById);

module.exports = router;

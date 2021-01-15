const express = require('express');
const router  = express.Router();
const publicationController = require('../controllers/publications.controller');

router.get('/', publicationController.getAllPub);
router.get('/:id', publicationController.getPubById);
router.post('/', publicationController.createPub);
router.put('/:id', publicationController.updatePubById);
router.delete('/:id', publicationController.deletePubById);

module.exports = router;
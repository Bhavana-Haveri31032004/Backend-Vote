const express = require('express');
const router = express.Router();
const candidateController = require('../controllers/candidateController');

// CREATE
router.post('/', candidateController.createCandidate);

// READ ALL
router.get('/', candidateController.getCandidates);

// READ BY ID
router.get('/:id', candidateController.getCandidateById);

// UPDATE
router.put('/:id', candidateController.updateCandidate);

// DELETE
router.delete('/:id', candidateController.deleteCandidate);

module.exports = router;

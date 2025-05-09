const express = require('express');
const router = express.Router();
const feedbackController = require('../controllers/feedbackController');

// POST - Add feedback
router.post('/', feedbackController.createFeedback);

// GET - Retrieve all feedback
router.get('/', feedbackController.getAllFeedback);

// PUT - Update feedback by ID (Add this for PUT)
router.put('/:id', feedbackController.updateFeedback);

// DELETE - Delete feedback by ID (Add this for DELETE)
router.delete('/:id', feedbackController.deleteFeedback);

module.exports = router;

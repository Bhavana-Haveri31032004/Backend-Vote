const mongoose = require('mongoose');

// Set what info a Candidate should have
const candidateSchema = new mongoose.Schema({
    name: String,
    party: String,
    age: Number,
    description: String
});

module.exports = mongoose.model('Candidate', candidateSchema);

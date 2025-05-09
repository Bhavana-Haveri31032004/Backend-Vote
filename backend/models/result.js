const mongoose = require('mongoose');

const resultSchema = new mongoose.Schema({
  electionId: { type: mongoose.Schema.Types.ObjectId, ref: 'Election' },
  results: [
    {
      candidateId: { type: mongoose.Schema.Types.ObjectId, ref: 'Candidate' },
      voteCount: Number
    }
  ]
});

module.exports = mongoose.model('Result', resultSchema);


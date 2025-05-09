const mongoose = require('mongoose');

const electionSchema = new mongoose.Schema({
  title: String,
  description: String,
  startDate: Date,
  endDate: Date,
  isActive: Boolean
});

module.exports = mongoose.model('Election', electionSchema);

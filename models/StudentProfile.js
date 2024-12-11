const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  dateOfBirth: {
    type: Date,
    required: true
  },
  gender: {
    type: String,
    required: true
  },
  contactNumber: {
    type: String
  },
  address: {
    type: String
  }
}, { timestamps: true });

module.exports = mongoose.model('Student', studentSchema);

const mongoose = require('mongoose');

const TestResultSchema = new mongoose.Schema({
  test_id: { type: Number, unique: true, required: true },
  student_id: { type: Number, required: true },
  total_questions: { type: Number, required: true },
  correct_answers: { type: Number, required: true },
  test_date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('TestResult', TestResultSchema);

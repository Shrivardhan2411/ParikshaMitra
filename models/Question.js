const mongoose = require('mongoose');

const QuestionSchema = new mongoose.Schema({
  question_id: { type: Number, unique: true, required: true },
  exercise_id: { type: Number, required: true },
  question_text: { type: String, required: true },
  options: [{ type: String, required: true }],
  correct_option: { type: Number, required: true }
});

module.exports = mongoose.model('Question', QuestionSchema);

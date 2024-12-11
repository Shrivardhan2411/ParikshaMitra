const mongoose = require('mongoose');

const ExerciseSchema = new mongoose.Schema({
  exercise_id: { type: Number, unique: true, required: true },
  chapter_id: { type: Number, required: true },
  title: { type: String, required: true },
  description: { type: String },
  question_count: { type: Number, required: true }
});

module.exports = mongoose.model('Exercise', ExerciseSchema);

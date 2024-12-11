const mongoose = require('mongoose');

const ChapterStructureSchema = new mongoose.Schema({
  chapter_id: { type: Number, unique: true, required: true },
  subject: { type: String, required: true },
  class: { type: String, required: true },
  chapter_name: { type: String, required: true },
  sequence_number: { type: Number, required: true }
});

module.exports = mongoose.model('ChapterStructure', ChapterStructureSchema);

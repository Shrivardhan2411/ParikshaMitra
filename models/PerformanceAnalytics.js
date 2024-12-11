const mongoose = require('mongoose');

const PerformanceAnalyticsSchema = new mongoose.Schema({
  student_id: { type: Number, required: true },
  total_tests: { type: Number, default: 0 },
  average_score: { type: Number, default: 0 },
  last_test_score: { type: Number }
});

module.exports = mongoose.model('PerformanceAnalytics', PerformanceAnalyticsSchema);
